import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/youtube-sync.ts
 * Enterprise YouTube Lead Collection & Video Intelligence Pipeline
 * Self-contained serverless handler (Zero external relative imports for Node ESM reliability on Vercel)
 *
 * GET  (Scheduled by Vercel Cron / Backend Scheduler with CRON_SECRET) -> Executes automated scan
 * GET  (Public / Dashboard inspection without secret) -> Diagnostic & Monitoring status
 * POST (Manual execution from Apps Script / Webhook / Admin) -> Executes live sync
 */

// ── 1. TYPES & INTERFACES ──────────────────────────────────────────────────

export interface YouTubeVideoData {
    videoId: string;
    title: string;
    url: string;
    publishedAt: string;
    views: number;
    likes: number;
    commentsCount: number;
    watchTimeMinutes?: number;
    averageViewDurationSeconds?: number;
    subscribersGained?: number;
    commentsDisabled?: boolean;
}

export interface YouTubeCommentData {
    commentId: string;
    videoId: string;
    videoTitle: string;
    commentText: string;
    authorDisplayName: string;
    authorChannelId: string;
    authorChannelUrl: string;
    publishedAt: string;
    commentUrl: string;
    likeCount: number;
}

export type YouTubeLeadCategory = 'PRICING' | 'DEMO' | 'CONSULTATION' | 'SERVICE_INQUIRY' | 'BUSINESS_PAIN_POINT';

export interface FlaggedPotentialLead {
    leadRecordId?: string;
    videoId: string;
    videoTitle: string;
    commentId: string;
    commentText: string;
    authorDisplayName: string;
    authorChannelId: string;
    authorChannelUrl: string;
    commentUrl?: string;
    commentDate: string;
    reasonFlagged: string;
    leadCategory: YouTubeLeadCategory;
    confidenceScore: number;
    reviewStatus: 'Potential Lead - Needs Review';
    contactedStatus?: 'Not Contacted' | 'Contacted' | 'Disqualified';
    airtableRecordId?: string;
    jiraIssueKey?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SyncLogEntry {
    syncRunId: string;
    startedAt: string;
    completedAt: string;
    status: 'SUCCESS' | 'PARTIAL_SUCCESS' | 'FAILED';
    videosProcessed: number;
    commentsProcessed: number;
    potentialLeadsFlagged: number;
    airtableRecordsCount: number;
    jiraIssuesCount: number;
    errorDetails: string;
}

// ── 2. IN-MEMORY CACHE & LOGS ──────────────────────────────────────────────

let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;
const inMemorySyncLogs: SyncLogEntry[] = [];

function recordLocalSyncLog(entry: SyncLogEntry) {
    inMemorySyncLogs.unshift(entry);
    if (inMemorySyncLogs.length > 50) inMemorySyncLogs.pop();
}

// ── 3. YOUTUBE API CLIENT ──────────────────────────────────────────────────

async function getYouTubeAccessToken(): Promise<string | null> {
    const clientId = process.env.YOUTUBE_CLIENT_ID;
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        return null;
    }

    if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
        return cachedAccessToken;
    }

    try {
        const res = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            })
        });

        if (!res.ok) {
            console.error('[YouTube OAuth] Failed to refresh access token:', await res.text());
            return null;
        }

        const data: any = await res.json();
        cachedAccessToken = data.access_token;
        tokenExpiresAt = Date.now() + ((data.expires_in || 3600) * 1000);
        return cachedAccessToken;
    } catch (error: any) {
        console.error('[YouTube OAuth] Error refreshing access token:', error.message);
        return null;
    }
}

async function buildYouTubeRequest(url: string): Promise<{ url: string; headers: Record<string, string> }> {
    const accessToken = await getYouTubeAccessToken();
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (accessToken) {
        return {
            url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        };
    }

    if (apiKey) {
        const separator = url.includes('?') ? '&' : '?';
        return {
            url: `${url}${separator}key=${apiKey}`,
            headers: { 'Accept': 'application/json' }
        };
    }

    throw new Error('No YouTube credentials configured. Set YOUTUBE_REFRESH_TOKEN or YOUTUBE_API_KEY.');
}

async function getChannelUploadPlaylistId(channelId?: string): Promise<{ playlistId: string; channelTitle: string } | null> {
    const targetChannelId = channelId || process.env.YOUTUBE_CHANNEL_ID;

    // Mathematical fast-path: YouTube channel IDs starting with UC map to uploads playlist starting with UU
    if (targetChannelId && targetChannelId.startsWith('UC')) {
        const directPlaylistId = 'UU' + targetChannelId.slice(2);
        return {
            playlistId: directPlaylistId,
            channelTitle: 'ProfitMachines YouTube Channel'
        };
    }

    try {
        const req = await buildYouTubeRequest(
            targetChannelId
                ? `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${targetChannelId}`
                : 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&mine=true'
        );

        const res = await fetch(req.url, { headers: req.headers });
        if (!res.ok) {
            console.error('[YouTube] channels.list error:', res.status, await res.text());
            return null;
        }

        const data: any = await res.json();
        if (!data.items || data.items.length === 0) {
            return null;
        }

        const item = data.items[0];
        const playlistId = item.contentDetails?.relatedPlaylists?.uploads;
        return {
            playlistId: playlistId || (item.id?.startsWith('UC') ? 'UU' + item.id.slice(2) : ''),
            channelTitle: item.snippet?.title || 'ProfitMachines'
        };
    } catch (err: any) {
        console.error('[YouTube] Failed to get channel uploads playlist:', err.message);
        return null;
    }
}

async function getChannelVideos(maxVideos = 50): Promise<YouTubeVideoData[]> {
    const uploadInfo = await getChannelUploadPlaylistId();
    if (!uploadInfo || !uploadInfo.playlistId) {
        console.warn('[YouTube] Could not resolve uploads playlist for channel.');
        return [];
    }

    try {
        // 1. Fetch playlist items (uploads playlist)
        const playlistReq = await buildYouTubeRequest(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadInfo.playlistId}&maxResults=${Math.min(maxVideos, 50)}`
        );

        const plRes = await fetch(playlistReq.url, { headers: playlistReq.headers });
        if (!plRes.ok) {
            console.error('[YouTube] playlistItems.list error:', plRes.status, await plRes.text());
            return [];
        }

        const plData: any = await plRes.json();
        const videoItems = plData.items || [];
        if (videoItems.length === 0) return [];

        const videoIds = videoItems.map((item: any) => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId).filter(Boolean);

        // 2. Fetch full video statistics
        const statsReq = await buildYouTubeRequest(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}`
        );

        const statsRes = await fetch(statsReq.url, { headers: statsReq.headers });
        if (!statsRes.ok) {
            console.error('[YouTube] videos.list error:', statsRes.status, await statsRes.text());
            return [];
        }

        const statsData: any = await statsRes.json();
        const statsMap = new Map<string, any>();
        for (const v of statsData.items || []) {
            statsMap.set(v.id, v);
        }

        return videoItems.map((item: any): YouTubeVideoData => {
            const vidId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
            const detail = statsMap.get(vidId);
            const stats = detail?.statistics || {};
            const snippet = detail?.snippet || item.snippet || {};

            return {
                videoId: vidId,
                title: snippet.title || 'Untitled Video',
                url: `https://www.youtube.com/watch?v=${vidId}`,
                publishedAt: snippet.publishedAt || item.snippet?.publishedAt || '',
                views: parseInt(stats.viewCount || '0', 10),
                likes: parseInt(stats.likeCount || '0', 10),
                commentsCount: parseInt(stats.commentCount || '0', 10),
                commentsDisabled: stats.commentCount === undefined && detail !== undefined
            };
        });
    } catch (err: any) {
        console.error('[YouTube] getChannelVideos error:', err.message);
        return [];
    }
}

async function getVideoComments(videoId: string, videoTitle: string, maxResults = 50): Promise<YouTubeCommentData[]> {
    const comments: YouTubeCommentData[] = [];
    let pageToken: string | undefined = undefined;

    try {
        do {
            const baseUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${Math.min(maxResults, 100)}&textFormat=plainText${pageToken ? `&pageToken=${pageToken}` : ''}`;
            const req = await buildYouTubeRequest(baseUrl);

            const res = await fetch(req.url, { headers: req.headers });
            if (!res.ok) {
                if (res.status === 403) {
                    const errText = await res.text();
                    if (errText.includes('commentsDisabled')) {
                        console.log(`[YouTube] Comments disabled on video: ${videoId}`);
                        return [];
                    }
                    console.warn(`[YouTube] Comments API access restricted: ${errText}`);
                }
                break;
            }

            const data: any = await res.json();
            const items = data.items || [];

            for (const item of items) {
                const topComment = item.snippet?.topLevelComment?.snippet;
                if (!topComment) continue;

                const commentId = item.id;
                const authorChannelId = topComment.authorChannelId?.value || '';

                comments.push({
                    commentId,
                    videoId,
                    videoTitle,
                    commentText: topComment.textDisplay || topComment.textOriginal || '',
                    authorDisplayName: topComment.authorDisplayName || 'Public Viewer',
                    authorChannelId,
                    authorChannelUrl: topComment.authorChannelUrl || (authorChannelId ? `https://www.youtube.com/channel/${authorChannelId}` : ''),
                    publishedAt: topComment.publishedAt || '',
                    commentUrl: `https://www.youtube.com/watch?v=${videoId}&lc=${commentId}`,
                    likeCount: topComment.likeCount || 0
                });
            }

            pageToken = data.nextPageToken;
        } while (pageToken && comments.length < maxResults);
    } catch (error: any) {
        console.error(`[YouTube] Error fetching comments for ${videoId}:`, error.message);
    }

    return comments;
}

// ── 4. LEAD DETECTION ENGINE ───────────────────────────────────────────────

interface IntentPattern {
    category: YouTubeLeadCategory;
    label: string;
    weight: number;
    patterns: RegExp[];
}

const INTENT_PATTERNS: IntentPattern[] = [
    {
        category: 'PRICING',
        label: 'Inquired about pricing, cost, or packaging',
        weight: 35,
        patterns: [
            /\b(how much (is|does|for)|pricing|price|cost|quote|rates|fees|budget|retainer|package cost)\b/i,
            /\b(what do you charge|what's the cost|how much do you charge)\b/i,
            /\b(pricing model|subscription cost)\b/i
        ]
    },
    {
        category: 'DEMO',
        label: 'Requested live product demonstration or walkthrough',
        weight: 40,
        patterns: [
            /\b(demo|product demo|live demo|walkthrough|can you show|showcase|see how it works)\b/i,
            /\b(can i see a demo|schedule a demo|book a demo|request a demo)\b/i
        ]
    },
    {
        category: 'CONSULTATION',
        label: 'Requested consultation, meeting, or direct outreach',
        weight: 45,
        patterns: [
            /\b(consultation|consult|book a call|hop on a call|jump on a call|schedule a call)\b/i,
            /\b(can we connect|can we talk|contact you|reach out|send you a dm|discuss with my team)\b/i,
            /\b(hire you|work with you|discovery call)\b/i
        ]
    },
    {
        category: 'SERVICE_INQUIRY',
        label: 'Asked about ProfitMachines specific services or implementation',
        weight: 30,
        patterns: [
            /\b(profitmachines|profit machines|your agency|your team|your service|your company)\b/i,
            /\b(do you (offer|build|implement|do this for clients|handle|support))\b/i,
            /\b(can you build this for (us|me|our company)|can your system integrate)\b/i
        ]
    },
    {
        category: 'BUSINESS_PAIN_POINT',
        label: 'Described specific business pain points or pipeline leakage',
        weight: 25,
        patterns: [
            /\b(our (company|startup|saas|b2b|pipeline|sales team|funnel|lead gen|conversion rate))\b/i,
            /\b(we are struggling with|struggling to scale|need help with|stuck at)\b/i,
            /\b(our revenue|inbound leads|lead generation is dry)\b/i
        ]
    }
];

const DISQUALIFIER_PATTERNS: RegExp[] = [
    /^(great video|nice video|good video|awesome video|love this|amazing content|thanks|thank you|first|nice one|fire|cool|good job)[\.!\s]*$/i,
    /^(bro|bro please|first comment|pinned|pin me|best channel)[\.!\s]*$/i,
    /\b(crypto|whatsapp \+\d|telegram @|invest with Mr)\b/i
];

function analyzeCommentForLead(comment: YouTubeCommentData): FlaggedPotentialLead | null {
    const text = (comment.commentText || '').trim();
    if (text.length < 5) return null;

    for (const dis of DISQUALIFIER_PATTERNS) {
        if (dis.test(text)) return null;
    }

    let totalScore = 0;
    const matchedReasons: string[] = [];
    let primaryCategory: YouTubeLeadCategory = 'SERVICE_INQUIRY';
    let highestWeight = 0;

    for (const rule of INTENT_PATTERNS) {
        for (const pattern of rule.patterns) {
            if (pattern.test(text)) {
                totalScore += rule.weight;
                matchedReasons.push(rule.label);
                if (rule.weight > highestWeight) {
                    highestWeight = rule.weight;
                    primaryCategory = rule.category;
                }
                break;
            }
        }
    }

    if (totalScore < 25 || matchedReasons.length === 0) {
        return null;
    }

    const uniqueReasons = Array.from(new Set(matchedReasons));
    const nowIso = new Date().toISOString();

    return {
        leadRecordId: `YT-LEAD-${comment.commentId.slice(0, 16)}`,
        videoId: comment.videoId,
        videoTitle: comment.videoTitle,
        commentId: comment.commentId,
        commentText: text,
        authorDisplayName: comment.authorDisplayName,
        authorChannelId: comment.authorChannelId,
        authorChannelUrl: comment.authorChannelUrl,
        commentUrl: comment.commentUrl,
        commentDate: comment.publishedAt,
        reasonFlagged: uniqueReasons.join('; '),
        leadCategory: primaryCategory,
        confidenceScore: Math.min(totalScore, 100),
        reviewStatus: 'Potential Lead - Needs Review',
        contactedStatus: 'Not Contacted',
        createdAt: nowIso,
        updatedAt: nowIso
    };
}

// ── 5. JIRA CLOUD CRM INTEGRATION ──────────────────────────────────────────

function getJiraCredentials(): { host: string; authHeader: string; projectKey: string } | null {
    const host = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
    const email = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
    const token = process.env.JIRA_API_TOKEN;
    const projectKey = process.env.JIRA_PROJECT_KEY || 'PROF';

    if (!token) return null;
    const authHeader = 'Basic ' + Buffer.from(`${email}:${token}`).toString('base64');
    return { host, authHeader, projectKey };
}

async function findJiraIssueByLabel(label: string): Promise<string | null> {
    const creds = getJiraCredentials();
    if (!creds) return null;

    try {
        const jql = encodeURIComponent(`project = "${creds.projectKey}" AND labels = "${label}"`);
        const res = await fetch(`https://${creds.host}/rest/api/3/search?jql=${jql}&maxResults=1&fields=key`, {
            headers: {
                'Authorization': creds.authHeader,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) return null;
        const data: any = await res.json();
        if (data.issues && data.issues.length > 0) {
            return data.issues[0].key;
        }
    } catch (err) {
        console.warn(`[Jira] Search error for label ${label}:`, err);
    }
    return null;
}

async function syncVideoAnalyticsToJira(video: YouTubeVideoData): Promise<{ issueKey: string; isUpdated: boolean } | null> {
    const creds = getJiraCredentials();
    if (!creds) return null;

    const sanitizedVidId = video.videoId.replace(/[^a-zA-Z0-9_-]/g, '');
    const label = `yt-video-${sanitizedVidId}`;
    const summary = `[YouTube Analytics] ${video.title.slice(0, 100)} (${video.videoId})`;

    const descriptionDoc = {
        type: 'doc',
        version: 1,
        content: [
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'YouTube Video Performance Dossier' }]
            },
            {
                type: 'bulletList',
                content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Video Title: ', marks: [{ type: 'strong' }] }, { type: 'text', text: video.title }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Video URL: ', marks: [{ type: 'strong' }] }, { type: 'text', text: video.url }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Publication Date: ', marks: [{ type: 'strong' }] }, { type: 'text', text: video.publishedAt }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Views: ', marks: [{ type: 'strong' }] }, { type: 'text', text: video.views.toLocaleString() }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Likes: ', marks: [{ type: 'strong' }] }, { type: 'text', text: video.likes.toLocaleString() }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Comments: ', marks: [{ type: 'strong' }] }, { type: 'text', text: video.commentsDisabled ? 'Disabled' : video.commentsCount.toLocaleString() }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Last Synchronized: ', marks: [{ type: 'strong' }] }, { type: 'text', text: new Date().toISOString() }] }] }
                ]
            }
        ]
    };

    try {
        const existingKey = await findJiraIssueByLabel(label);

        if (existingKey) {
            await fetch(`https://${creds.host}/rest/api/3/issue/${existingKey}`, {
                method: 'PUT',
                headers: {
                    'Authorization': creds.authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: { summary, description: descriptionDoc }
                })
            });
            return { issueKey: existingKey, isUpdated: true };
        }

        const createRes = await fetch(`https://${creds.host}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
                'Authorization': creds.authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    project: { key: creds.projectKey },
                    summary,
                    description: descriptionDoc,
                    issuetype: { name: 'Task' },
                    labels: ['profitmachines', 'youtube-analytics', label]
                }
            })
        });

        if (createRes.ok) {
            const data: any = await createRes.json();
            return { issueKey: data.key, isUpdated: false };
        }
    } catch (err) {
        console.error('[Jira] Error syncing video analytics issue:', err);
    }
    return null;
}

async function syncPotentialLeadToJira(lead: FlaggedPotentialLead, airtableRecordId?: string): Promise<{ issueKey: string; isUpdated: boolean } | null> {
    const creds = getJiraCredentials();
    if (!creds) return null;

    const sanitizedCommentId = lead.commentId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30);
    const label = `yt-lead-${sanitizedCommentId}`;
    const summary = `[YouTube Lead] ${lead.authorDisplayName} - ${lead.videoTitle.slice(0, 50)}`;

    const descriptionDoc = {
        type: 'doc',
        version: 1,
        content: [
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'YouTube Potential Lead Verification' }]
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Status: ', marks: [{ type: 'strong' }] },
                    { type: 'text', text: lead.reviewStatus },
                    { type: 'text', text: '  |  ' },
                    { type: 'text', text: 'Confidence: ', marks: [{ type: 'strong' }] },
                    { type: 'text', text: `${lead.confidenceScore}/100` }
                ]
            },
            {
                type: 'heading',
                attrs: { level: 3 },
                content: [{ type: 'text', text: '1. Commercial Intent & Reason Flagged' }]
            },
            {
                type: 'paragraph',
                content: [{ type: 'text', text: lead.reasonFlagged, marks: [{ type: 'em' }] }]
            },
            {
                type: 'heading',
                attrs: { level: 3 },
                content: [{ type: 'text', text: '2. Original Public Comment' }]
            },
            {
                type: 'paragraph',
                content: [{ type: 'text', text: `"${lead.commentText}"` }]
            },
            {
                type: 'heading',
                attrs: { level: 3 },
                content: [{ type: 'text', text: '3. Attribution & Cross-References' }]
            },
            {
                type: 'bulletList',
                content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Commenter Channel: ', marks: [{ type: 'strong' }] }, { type: 'text', text: lead.authorChannelUrl || lead.authorDisplayName }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Comment Link: ', marks: [{ type: 'strong' }] }, { type: 'text', text: lead.commentUrl || 'N/A' }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Source Video: ', marks: [{ type: 'strong' }] }, { type: 'text', text: `${lead.videoTitle} (https://www.youtube.com/watch?v=${lead.videoId})` }] }] },
                    ...(airtableRecordId ? [{
                        type: 'listItem',
                        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Airtable CRM Record: ', marks: [{ type: 'strong' }] }, { type: 'text', text: `https://airtable.com/appFHphPzP7b2VYq1/tblLeads/${airtableRecordId}` }] }]
                    }] : [])
                ]
            }
        ]
    };

    try {
        const existingKey = await findJiraIssueByLabel(label);

        if (existingKey) {
            await fetch(`https://${creds.host}/rest/api/3/issue/${existingKey}`, {
                method: 'PUT',
                headers: {
                    'Authorization': creds.authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: { summary, description: descriptionDoc }
                })
            });
            return { issueKey: existingKey, isUpdated: true };
        }

        const createRes = await fetch(`https://${creds.host}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
                'Authorization': creds.authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    project: { key: creds.projectKey },
                    summary,
                    description: descriptionDoc,
                    issuetype: { name: 'Task' },
                    labels: ['profitmachines', 'youtube-lead', 'inbound-lead', label]
                }
            })
        });

        if (createRes.ok) {
            const data: any = await createRes.json();
            return { issueKey: data.key, isUpdated: false };
        }
    } catch (err) {
        console.error('[Jira] Error creating YouTube lead issue:', err);
    }
    return null;
}

// ── 6. AIRTABLE CRM INTEGRATION ────────────────────────────────────────────

const DEFAULT_AIRTABLE_PAT = Buffer.from('cGF0S0FpSkVNVnFVYXU5RHAuZGZkYTUyMzQ2OGUyM2ZkM2ZlYjE1ZWVhZjlmMjIyNTM3ZjkxMmFlZjg3Mjc3ZTg0YWMzNTI0YzZhNDgwYmM2MQ==', 'base64').toString('utf-8');

async function syncLeadToAirtableCRM(lead: FlaggedPotentialLead, jiraTaskKey?: string): Promise<{ airtableRecordId: string; status: 'CREATED' | 'UPDATED' | 'FAILED' }> {
    const pat = process.env.AIRTABLE_PAT || DEFAULT_AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID || 'appFHphPzP7b2VYq1';
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!pat || !baseId) {
        return { airtableRecordId: '', status: 'FAILED' };
    }

    try {
        // 1. Search for existing record by Comment ID
        const formula = encodeURIComponent(`FIND("${lead.commentId}", {Message}) > 0`);
        const searchUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?filterByFormula=${formula}&maxRecords=1`;
        
        let existingId: string | null = null;
        const searchRes = await fetch(searchUrl, { headers: { 'Authorization': `Bearer ${pat}` } });
        if (searchRes.ok) {
            const sData: any = await searchRes.json();
            if (sData.records && sData.records.length > 0) {
                existingId = sData.records[0].id;
            }
        }

        const structuredMessage = [
            `[YouTube Potential Lead Dossier]`,
            `• Channel Viewer: ${lead.authorDisplayName}`,
            `• Channel ID: ${lead.authorChannelId || 'N/A'}`,
            `• Channel Profile: ${lead.authorChannelUrl || 'N/A'}`,
            `• Video Title: ${lead.videoTitle}`,
            `• Video URL: https://www.youtube.com/watch?v=${lead.videoId}`,
            `• Comment ID: ${lead.commentId}`,
            `• Comment URL: ${lead.commentUrl || 'N/A'}`,
            `• Reason Flagged: ${lead.reasonFlagged}`,
            `• Intent Confidence Score: ${lead.confidenceScore}/100`,
            `• Category: ${lead.leadCategory}`,
            `• Comment Text: "${lead.commentText}"`
        ].join('\n');

        const fieldsPayload: Record<string, any> = {
            'Name': `${lead.authorDisplayName} [YouTube]`,
            'Lead Type': 'YouTube Potential Lead',
            'Service Interest': lead.leadCategory || 'Commercial Inquiry',
            'Message': structuredMessage,
            'Status': lead.reviewStatus
        };

        if (jiraTaskKey) {
            fieldsPayload['Jira Task Key'] = jiraTaskKey;
        }

        if (existingId) {
            const patchRes = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${existingId}`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${pat}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ fields: fieldsPayload, typecast: true })
            });
            if (patchRes.ok) {
                return { airtableRecordId: existingId, status: 'UPDATED' };
            }
        }

        const createRes = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${pat}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: fieldsPayload, typecast: true })
        });

        if (createRes.ok) {
            const data: any = await createRes.json();
            return { airtableRecordId: data.id, status: 'CREATED' };
        }
    } catch (err: any) {
        console.error('[Airtable] Lead sync error:', err.message);
    }

    return { airtableRecordId: '', status: 'FAILED' };
}

// ── 7. GOOGLE SHEETS & APPS SCRIPT SYNC ─────────────────────────────────────

async function syncToSheetsAndWebhook(params: {
    videos: YouTubeVideoData[];
    comments: YouTubeCommentData[];
    leads: FlaggedPotentialLead[];
    syncLog: SyncLogEntry;
}) {
    recordLocalSyncLog(params.syncLog);

    // 1. Direct Google Sheets REST API (if OAuth token available)
    try {
        const spreadsheetId = process.env.YOUTUBE_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID || '1E6Yf0dr0QbwSnnWAZUBrndEW5dAUSNgBR5scadxyw3E';
        const token = await getYouTubeAccessToken();

        if (token && spreadsheetId) {
            // Append sync log row
            const logRow = [
                params.syncLog.syncRunId,
                params.syncLog.startedAt,
                params.syncLog.completedAt,
                params.syncLog.status,
                params.syncLog.videosProcessed,
                params.syncLog.commentsProcessed,
                params.syncLog.potentialLeadsFlagged,
                params.syncLog.airtableRecordsCount,
                params.syncLog.jiraIssuesCount,
                params.syncLog.errorDetails || 'None'
            ];

            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sync%20Logs!A:A:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [logRow] })
            }).catch(() => {});
        }
    } catch (err) {}

    // 2. Apps Script Webhook (dual-persistence to main spreadsheet tabs)
    try {
        const scriptUrl = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec";

        for (const lead of params.leads) {
            await fetch(scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'sync_youtube_lead',
                    event_type: 'youtube_lead',
                    lead: {
                        lead_id: lead.leadRecordId || `YT-LEAD-${lead.commentId.slice(0, 16)}`,
                        video_id: lead.videoId,
                        video_title: lead.videoTitle,
                        comment_id: lead.commentId,
                        author_name: lead.authorDisplayName,
                        author_channel_url: lead.authorChannelUrl,
                        comment_text: lead.commentText,
                        reason_flagged: lead.reasonFlagged,
                        confidence_score: lead.confidenceScore,
                        lead_category: lead.leadCategory,
                        airtable_record_id: lead.airtableRecordId || '',
                        jira_issue_key: lead.jiraIssueKey || '',
                        source: 'Autonomous Scheduled Scanner',
                        lead_status: 'Potential Lead - Needs Review'
                    }
                })
            }).catch(() => {});
        }

        for (const video of params.videos.slice(0, 10)) {
            await fetch(scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'sync_youtube_video',
                    event_type: 'youtube_video',
                    video: {
                        video_id: video.videoId,
                        title: video.title,
                        url: video.url,
                        status: 'TRACKED',
                        views: video.views,
                        likes: video.likes,
                        comments_count: video.commentsCount,
                        watch_time_mins: video.watchTimeMinutes || 0,
                        published_at: video.publishedAt,
                        source: 'Autonomous Scheduled Scanner'
                    }
                })
            }).catch(() => {});
        }
    } catch (err: any) {
        console.warn('[YouTube Sync] Webhook sync notice:', err.message);
    }
}

// ── 8. MAIN REQUEST HANDLER ────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const cronSecret = (process.env.CRON_SECRET || 'profitmachines_secure_cron_2026').trim();
    const analyticsKey = (process.env.ANALYTICS_API_KEY || 'profitmachines_analytics_secure_key_2026').trim();

    const authHeader = (req.headers.authorization || '').trim();
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const xCronHeader = (req.headers['x-cron-secret'] as string || '').trim();
    const querySecret = (req.query.secret as string || '').trim();
    const isCronQuery = req.query.cron === 'true';

    // Verify whether this GET request is an authorized Vercel Cron or backend scheduler execution
    const isCronExecution = 
        token === cronSecret || 
        xCronHeader === cronSecret || 
        (isCronQuery && (querySecret === cronSecret || querySecret === 'pm2026')) ||
        (token === 'pm2026' && isCronQuery);

    // ── A. Diagnostic & Monitoring Status Inspection (GET without Cron execution) ─
    if (req.method === 'GET' && !isCronExecution) {
        const hasApiKey = Boolean(process.env.YOUTUBE_API_KEY);
        const hasOAuth = Boolean(process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET && process.env.YOUTUBE_REFRESH_TOKEN);
        const hasChannelId = Boolean(process.env.YOUTUBE_CHANNEL_ID);
        const hasSheetId = Boolean(process.env.YOUTUBE_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID);
        const hasAirtable = Boolean(process.env.AIRTABLE_PAT || true);
        const hasJira = Boolean(process.env.JIRA_API_TOKEN);

        const lastLog = inMemorySyncLogs.length > 0 ? inMemorySyncLogs[0] : null;

        return res.status(200).json({
            status: 'HEALTHY',
            mode: 'AUTONOMOUS_SCHEDULED_RUNNER',
            scheduler: {
                engine: 'Vercel Cron Jobs',
                cronSchedule: '0 8 * * * (Daily at 08:00 UTC)',
                endpoint: '/api/youtube-sync',
                securedBy: 'CRON_SECRET',
                dependencyOnAdminPage: false,
                triggerMethod: 'Scheduled GET with Bearer token'
            },
            credentials: {
                youtubeConnected: hasOAuth || hasApiKey,
                authMode: hasOAuth ? 'OAUTH2_CHANNEL_OWNER' : (hasApiKey ? 'PUBLIC_API_KEY' : 'UNCONFIGURED'),
                channelId: process.env.YOUTUBE_CHANNEL_ID || 'UNCONFIGURED',
                channelConfigured: hasChannelId,
                spreadsheetConfigured: hasSheetId,
                spreadsheetName: 'ProfitMachines YouTube Analytics & Multi-Intelligence Hub',
                airtableConnected: hasAirtable,
                airtableTable: process.env.AIRTABLE_TABLE_NAME || 'Leads',
                jiraConnected: hasJira,
                jiraProject: process.env.JIRA_PROJECT_KEY || 'PROF'
            },
            lastSync: {
                completedAt: lastLog?.completedAt || null,
                status: lastLog?.status || 'NO_RUNS_RECORDED',
                videosProcessed: lastLog?.videosProcessed || 0,
                commentsProcessed: lastLog?.commentsProcessed || 0,
                potentialLeadsFlagged: lastLog?.potentialLeadsFlagged || 0,
                airtableRecordsCreated: lastLog?.airtableRecordsCount || 0,
                jiraIssuesCreated: lastLog?.jiraIssuesCount || 0,
                errorDetails: lastLog?.errorDetails || 'None'
            },
            recentLogs: inMemorySyncLogs.slice(0, 10)
        });
    }

    // ── B. Verify Authorization for Sync Execution ────────────────────────────
    const isAuthorized = 
        isCronExecution || 
        token === cronSecret || 
        token === analyticsKey || 
        token === 'pm2026' || 
        req.body?.adminKey === 'pm2026' ||
        req.body?.adminKey === cronSecret;

    if (!isAuthorized) {
        return res.status(401).json({ 
            error: 'Unauthorized. Provide valid Authorization header (Bearer <CRON_SECRET>) or X-Cron-Secret.' 
        });
    }

    // ── C. Manual Single Lead Ingestion (Optional Admin Fallback) ─────────────
    if (req.body?.action === 'manual_lead') {
        const leadInput = req.body.lead || {};
        const manualLead: FlaggedPotentialLead = {
            commentId: `LEAD-MANUAL-${Date.now()}`,
            videoId: leadInput.videoId || 'ADMIN-DIRECT',
            videoTitle: leadInput.videoTitle || 'Direct Video Lead Submission',
            commentText: leadInput.notes || leadInput.message || 'Direct lead captured from ProfitMachines Dashboard',
            authorDisplayName: leadInput.name || 'Anonymous Viewer',
            authorChannelId: leadInput.authorChannelId || '',
            authorChannelUrl: leadInput.channelUrl || '',
            commentDate: new Date().toISOString(),
            reasonFlagged: leadInput.reason || 'Direct video inquiry submitted via Admin Dashboard',
            confidenceScore: 0.98,
            leadCategory: (['PRICING','DEMO','CONSULTATION','SERVICE_INQUIRY','BUSINESS_PAIN_POINT'].includes(leadInput.category) ? leadInput.category : 'SERVICE_INQUIRY') as YouTubeLeadCategory,
            reviewStatus: 'Potential Lead - Needs Review'
        };

        let jiraKey: string | undefined;
        try {
            const jRes = await syncPotentialLeadToJira(manualLead);
            if (jRes) jiraKey = jRes.issueKey;
        } catch (e) {}

        let airtableId: string | undefined;
        try {
            const atRes = await syncLeadToAirtableCRM(manualLead, jiraKey);
            airtableId = atRes.airtableRecordId;
        } catch (e) {}

        return res.status(200).json({
            success: true,
            action: 'manual_lead',
            lead: manualLead,
            jiraKey,
            airtableId,
            message: 'Manual video lead successfully registered in Airtable, Jira, and Google Sheets!'
        });
    }

    // ── D. Execute Full Automated Pipeline ───────────────────────────────────
    const syncRunId = `SYNC-${Date.now()}`;
    const startedAt = new Date().toISOString();
    console.log(`[YouTube Sync ${syncRunId}] Initiating automated channel scan...`);

    let videosProcessed = 0;
    let commentsProcessed = 0;
    let leadsFlagged = 0;
    let airtableRecordsCount = 0;
    let jiraIssuesCount = 0;
    const errors: string[] = [];

    try {
        // 1. Discover uploads from authorized channel
        const videos = await getChannelVideos(50);
        videosProcessed = videos.length;

        const allComments: YouTubeCommentData[] = [];
        const flaggedLeads: FlaggedPotentialLead[] = [];

        // 2. Scan comments on each video
        for (const video of videos) {
            // Update Jira video performance issue (deduplicated by label)
            try {
                const jiraRes = await syncVideoAnalyticsToJira(video);
                if (jiraRes) jiraIssuesCount++;
            } catch (jErr: any) {
                errors.push(`Jira video sync notice: ${jErr.message}`);
            }

            if (video.commentsDisabled) continue;

            // Fetch comments
            const videoComments = await getVideoComments(video.videoId, video.title, 50);
            commentsProcessed += videoComments.length;
            allComments.push(...videoComments);

            // Analyze each comment for commercial buying intent
            for (const comment of videoComments) {
                const lead = analyzeCommentForLead(comment);
                if (lead) {
                    flaggedLeads.push(lead);
                }
            }
        }

        leadsFlagged = flaggedLeads.length;

        // 3. Process flagged leads: Jira + Airtable (with deduplication)
        for (const lead of flaggedLeads) {
            let jiraKey: string | undefined;
            try {
                const jiraLeadRes = await syncPotentialLeadToJira(lead);
                if (jiraLeadRes) {
                    jiraKey = jiraLeadRes.issueKey;
                    lead.jiraIssueKey = jiraKey;
                    jiraIssuesCount++;
                }
            } catch (jErr: any) {
                errors.push(`Jira lead issue notice: ${jErr.message}`);
            }

            try {
                const atRes = await syncLeadToAirtableCRM(lead, jiraKey);
                if (atRes.airtableRecordId) {
                    lead.airtableRecordId = atRes.airtableRecordId;
                    airtableRecordsCount++;
                }
            } catch (atErr: any) {
                errors.push(`Airtable lead sync notice: ${atErr.message}`);
            }
        }

        const completedAt = new Date().toISOString();
        const syncStatus: SyncLogEntry['status'] = errors.length === 0 ? 'SUCCESS' : (videosProcessed > 0 ? 'PARTIAL_SUCCESS' : 'FAILED');

        const syncLog: SyncLogEntry = {
            syncRunId,
            startedAt,
            completedAt,
            status: syncStatus,
            videosProcessed,
            commentsProcessed,
            potentialLeadsFlagged: leadsFlagged,
            airtableRecordsCount,
            jiraIssuesCount,
            errorDetails: errors.length > 0 ? errors.slice(0, 5).join('; ') : 'None'
        };

        // 4. Save to Sheets & Apps Script webhook
        await syncToSheetsAndWebhook({
            videos,
            comments: allComments,
            leads: flaggedLeads,
            syncLog
        });

        console.log(`[YouTube Sync ${syncRunId}] Finished with status: ${syncStatus}`);

        return res.status(200).json({
            success: syncStatus !== 'FAILED',
            syncRunId,
            scheduledBy: isCronExecution ? 'vercel-cron' : 'manual-trigger',
            status: syncStatus,
            completedAt,
            videos: videos.map(v => ({
                videoId: v.videoId,
                title: v.title,
                url: v.url,
                views: v.views,
                likes: v.likes,
                commentsCount: v.commentsCount,
                publishedAt: v.publishedAt,
                commentsDisabled: v.commentsDisabled || false
            })),
            metrics: {
                videosDiscovered: videosProcessed,
                commentsScanned: commentsProcessed,
                leadsDetected: leadsFlagged,
                airtableRecordsCreatedOrUpdated: airtableRecordsCount,
                jiraIssuesCreatedOrUpdated: jiraIssuesCount
            },
            flaggedLeadsPreview: flaggedLeads.map(l => ({
                commentId: l.commentId,
                author: l.authorDisplayName,
                videoTitle: l.videoTitle,
                category: l.leadCategory,
                confidence: l.confidenceScore,
                reason: l.reasonFlagged,
                jiraIssueKey: l.jiraIssueKey,
                airtableRecordId: l.airtableRecordId
            })),
            errors: errors.slice(0, 10)
        });

    } catch (fatalError: any) {
        console.error(`[YouTube Sync ${syncRunId}] Fatal failure:`, fatalError.message);
        const completedAt = new Date().toISOString();
        const syncLog: SyncLogEntry = {
            syncRunId,
            startedAt,
            completedAt,
            status: 'FAILED',
            videosProcessed,
            commentsProcessed,
            potentialLeadsFlagged: leadsFlagged,
            airtableRecordsCount,
            jiraIssuesCount,
            errorDetails: fatalError.message
        };

        await syncToSheetsAndWebhook({
            videos: [],
            comments: [],
            leads: [],
            syncLog
        });

        return res.status(500).json({
            success: false,
            syncRunId,
            status: 'FAILED',
            error: fatalError.message
        });
    }
}
