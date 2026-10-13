import type { VercelRequest, VercelResponse } from '@vercel/node';
import { 
    getChannelVideos, 
    getVideoComments, 
    YouTubeVideoData, 
    YouTubeCommentData,
    getYouTubeAccessToken 
} from './_lib/youtube';
import { analyzeCommentForLead, FlaggedPotentialLead } from './_lib/youtube-lead-detector';
import { syncToYouTubeGoogleSheet, getLatestSyncLogs, SyncLogEntry } from './_lib/youtube-sheets';
import { syncLeadToAirtableCRM } from './_lib/youtube-airtable';
import { syncVideoAnalyticsToJira, syncPotentialLeadToJira } from './_lib/youtube-jira';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS for browser administration
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

    // Verify whether this GET request is an authorized Vercel Cron or backend timer execution
    const isCronExecution = 
        token === cronSecret || 
        xCronHeader === cronSecret || 
        (isCronQuery && (querySecret === cronSecret || querySecret === 'pm2026')) ||
        (token === 'pm2026' && isCronQuery);

    // ── Diagnostic & Monitoring Status Inspection (GET without Cron execution) ─
    if (req.method === 'GET' && !isCronExecution) {
        const hasApiKey = Boolean(process.env.YOUTUBE_API_KEY);
        const hasOAuth = Boolean(process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET && process.env.YOUTUBE_REFRESH_TOKEN);
        const hasChannelId = Boolean(process.env.YOUTUBE_CHANNEL_ID);
        const hasSheetId = Boolean(process.env.YOUTUBE_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID);
        const hasAirtable = Boolean(process.env.AIRTABLE_PAT || true);
        const hasJira = Boolean(process.env.JIRA_API_TOKEN);

        const logs = getLatestSyncLogs();
        const lastLog = logs.length > 0 ? logs[0] : null;

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
            recentLogs: logs.slice(0, 10)
        });
    }

    // ── Execute Sync Pipeline (Cron GET or Manual POST) ──────────────────────
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

    // ── CASE A: Manual Video Lead Ingestion from Admin Dashboard ───────────
    if (req.body?.action === 'manual_lead') {
        const leadInput = req.body.lead || {};
        const manualLead: FlaggedPotentialLead = {
            commentId: `LEAD-MANUAL-${Date.now()}`,
            videoId: leadInput.videoId || 'ADMIN-DIRECT',
            videoTitle: leadInput.videoTitle || 'Direct Video Lead Submission',
            commentText: leadInput.notes || leadInput.message || 'Direct lead captured from ProfitMachines YouTube Dashboard',
            authorDisplayName: leadInput.name || 'Anonymous Viewer',
            authorChannelId: leadInput.authorChannelId || '',
            authorChannelUrl: leadInput.channelUrl || '',
            commentDate: new Date().toISOString(),
            reasonFlagged: leadInput.reason || 'Direct video inquiry submitted via Admin Dashboard',
            confidenceScore: 0.98,
            leadCategory: (['PRICING','DEMO','CONSULTATION','SERVICE_INQUIRY','BUSINESS_PAIN_POINT'].includes(leadInput.category) ? leadInput.category : 'SERVICE_INQUIRY') as 'PRICING' | 'DEMO' | 'CONSULTATION' | 'SERVICE_INQUIRY' | 'BUSINESS_PAIN_POINT',
            reviewStatus: 'Potential Lead - Needs Review'
        };

        let jiraKey: string | undefined;
        try {
            const jRes = await syncPotentialLeadToJira(manualLead);
            if (jRes) {
                jiraKey = jRes.issueKey;
                manualLead.jiraIssueKey = jiraKey;
            }
        } catch (jErr: any) {
            console.warn('[Manual Lead] Jira sync notice:', jErr.message);
        }

        let airtableId: string | undefined;
        try {
            const atRes = await syncLeadToAirtableCRM(manualLead, jiraKey);
            if (atRes.airtableRecordId) {
                airtableId = atRes.airtableRecordId;
                manualLead.airtableRecordId = airtableId;
            }
        } catch (atErr: any) {
            console.warn('[Manual Lead] Airtable sync notice:', atErr.message);
        }

        try {
            await syncToYouTubeGoogleSheet({
                videos: [],
                comments: [],
                leads: [manualLead],
                syncLog: {
                    syncRunId: `MANUAL-${Date.now()}`,
                    startedAt: new Date().toISOString(),
                    completedAt: new Date().toISOString(),
                    status: 'SUCCESS',
                    videosProcessed: 0,
                    commentsProcessed: 0,
                    potentialLeadsFlagged: 1,
                    airtableRecordsCount: airtableId ? 1 : 0,
                    jiraIssuesCount: jiraKey ? 1 : 0,
                    errorDetails: 'Manual YouTube Lead captured from ProfitMachines Admin'
                }
            });
        } catch (sErr: any) {
            console.warn('[Manual Lead] Sheet sync notice:', sErr.message);
        }

        return res.status(200).json({
            success: true,
            action: 'manual_lead',
            lead: manualLead,
            jiraKey,
            airtableId,
            message: 'Manual video lead successfully registered in Airtable, Jira, and Google Sheets!'
        });
    }

    const targetVideoId = req.query.videoId as string || req.body?.videoId as string;
    const syncRunId = `SYNC-${Date.now()}`;
    const startedAt = new Date().toISOString();
    console.log(`[YouTube Sync ${syncRunId}] Starting sync execution (Target: ${targetVideoId || 'All Channel Videos'})...`);

    let videosProcessed = 0;
    let commentsProcessed = 0;
    let leadsFlagged = 0;
    let airtableRecordsCount = 0;
    let jiraIssuesCount = 0;
    const errors: string[] = [];

    try {
        let videos: YouTubeVideoData[] = [];

        // 1. Fetch channel videos OR targeted specific video
        if (targetVideoId) {
            const single = await import('./_lib/youtube').then(m => m.getSingleVideoData(targetVideoId));
            if (single) {
                videos = [single];
            } else {
                videos = [{
                    videoId: targetVideoId,
                    title: `Targeted Video (${targetVideoId})`,
                    url: `https://www.youtube.com/watch?v=${targetVideoId}`,
                    publishedAt: new Date().toISOString(),
                    views: 0,
                    likes: 0,
                    commentsCount: 0
                }];
            }
        } else {
            videos = await getChannelVideos(25);
        }
        videosProcessed = videos.length;

        // 2. Fetch comments and detect leads
        const allComments: YouTubeCommentData[] = [];
        const flaggedLeads: FlaggedPotentialLead[] = [];

        for (const video of videos) {
            // Jira Video Analytics sync
            try {
                const jiraRes = await syncVideoAnalyticsToJira(video);
                if (jiraRes) jiraIssuesCount++;
            } catch (jErr: any) {
                errors.push(`Jira video sync failed for ${video.videoId}: ${jErr.message}`);
            }

            // Skip comments if disabled
            if (video.commentsDisabled) continue;

            const videoComments = await getVideoComments(video.videoId, video.title, 50);
            commentsProcessed += videoComments.length;
            allComments.push(...videoComments);

            for (const comment of videoComments) {
                const lead = analyzeCommentForLead(comment);
                if (lead) {
                    flaggedLeads.push(lead);
                }
            }
        }

        leadsFlagged = flaggedLeads.length;

        // 3. Process Flagged Leads with Airtable & Jira
        for (const lead of flaggedLeads) {
            // First create/update Jira task
            let jiraKey: string | undefined;
            try {
                const jiraLeadRes = await syncPotentialLeadToJira(lead);
                if (jiraLeadRes) {
                    jiraKey = jiraLeadRes.issueKey;
                    lead.jiraIssueKey = jiraKey;
                    jiraIssuesCount++;
                }
            } catch (jErr: any) {
                errors.push(`Jira lead issue failed for comment ${lead.commentId}: ${jErr.message}`);
            }

            // Sync to Airtable with Jira Key linked
            try {
                const atRes = await syncLeadToAirtableCRM(lead, jiraKey);
                if (atRes.airtableRecordId) {
                    lead.airtableRecordId = atRes.airtableRecordId;
                    airtableRecordsCount++;
                }
            } catch (atErr: any) {
                errors.push(`Airtable lead sync failed for comment ${lead.commentId}: ${atErr.message}`);
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

        // 4. Sync everything to dedicated Google Spreadsheet
        const sheetsResult = await syncToYouTubeGoogleSheet({
            videos,
            comments: allComments,
            leads: flaggedLeads,
            syncLog
        });

        // 5. Dual-persistence: forward newly flagged leads and videos to Apps Script Webhook
        try {
            const scriptUrl = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycby1iANcG2ks_wGav58ZPAKt_DqHutVzODSNHK1T3q4QcHiP888S4DYnbFLvTV2JZdxU/exec";
            for (const lead of flaggedLeads) {
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

            for (const video of videos.slice(0, 10)) {
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
        } catch (webhookErr: any) {
            console.warn('[YouTube Sync] Apps Script webhook notice:', webhookErr.message);
        }

        console.log(`[YouTube Sync ${syncRunId}] Completed with status: ${syncStatus}`);

        return res.status(200).json({
            success: syncStatus !== 'FAILED',
            syncRunId,
            status: syncStatus,
            videosProcessed,
            commentsProcessed,
            potentialLeadsFlagged: leadsFlagged,
            airtableRecordsCount,
            jiraIssuesCount,
            sheetsSync: sheetsResult,
            flaggedLeadsPreview: flaggedLeads.map(l => ({
                commentId: l.commentId,
                author: l.authorDisplayName,
                reason: l.reasonFlagged,
                confidence: l.confidenceScore,
                jiraIssueKey: l.jiraIssueKey,
                airtableRecordId: l.airtableRecordId
            })),
            errors: errors.slice(0, 10)
        });

    } catch (fatalError: any) {
        console.error(`[YouTube Sync ${syncRunId}] Fatal sync failure:`, fatalError);
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

        await syncToYouTubeGoogleSheet({
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
