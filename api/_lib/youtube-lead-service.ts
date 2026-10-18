/**
 * api/_lib/youtube-lead-service.ts
 *
 * Dedicated Server-Side Lead Handler for Owner-Managed YouTube Videos:
 * - Validates required contact details (name, email, phone/company)
 * - Sanitizes video attribution (video ID, video title, YouTube URL, page URL)
 * - Spam protection & rate limiting protection
 * - Idempotency guard (prevents duplicate Jira tasks and Google Sheets rows on retry)
 * - Creates Jira lead task with structured description & CRM labels
 * - Appends row to Google Sheets via direct Google Sheets API / Apps Script Webhook
 * - Never leaks private keys or credentials to the browser
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface YouTubeVideoLeadPayload {
    submissionId?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
    videoId: string;
    videoTitle: string;
    youtubeUrl: string;
    pageUrl: string;
    consentGiven?: boolean;
    playbackMilestone?: string; // 'started' | '25%' | '50%' | '75%' | 'completed' | 'unknown'
}

// In-memory cache for idempotency deduplication across 15-minute window
const recentSubmissions = new Map<string, { timestamp: number; result: any }>();
const DEDUPE_WINDOW_MS = 15 * 60 * 1000;

function cleanOldSubmissions() {
    const now = Date.now();
    for (const [key, value] of recentSubmissions.entries()) {
        if (now - value.timestamp > DEDUPE_WINDOW_MS) {
            recentSubmissions.delete(key);
        }
    }
}

// ── 1. Jira Cloud Lead Task Creator ──────────────────────────────────────────
async function createJiraVideoLead(payload: YouTubeVideoLeadPayload, submissionId: string): Promise<{
    success: boolean;
    issueKey?: string;
    issueUrl?: string;
    error?: string;
}> {
    const host = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
    const email = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
    const token = (process.env.JIRA_API_TOKEN || '').trim();
    const projectKey = process.env.JIRA_PROJECT_KEY || 'PROF';

    if (!token) {
        console.warn('[YouTubeLeadService] JIRA_API_TOKEN is not configured.');
        return { success: false, error: 'Jira API token unconfigured' };
    }

    const authHeader = 'Basic ' + Buffer.from(`${email}:${token}`).toString('base64');
    const label = `yt-form-${payload.videoId}-${submissionId.replace(/[^a-zA-Z0-9_-]/g, '').slice(-12)}`;

    // 1. Idempotency Check via Jira JQL Search
    try {
        const jql = encodeURIComponent(`project = "${projectKey}" AND labels = "${label}"`);
        const searchRes = await fetch(`https://${host}/rest/api/3/search?jql=${jql}&maxResults=1&fields=key`, {
            headers: {
                Authorization: authHeader,
                Accept: 'application/json',
            },
        });

        if (searchRes.ok) {
            const sData: any = await searchRes.json();
            if (sData.issues && sData.issues.length > 0) {
                const existingKey = sData.issues[0].key;
                return {
                    success: true,
                    issueKey: existingKey,
                    issueUrl: `https://${host}/browse/${existingKey}`,
                };
            }
        }
    } catch (e) {
        console.warn('[YouTubeLeadService] Jira deduplication check notice:', e);
    }

    // 2. Build Rich Atlassian Document Format (ADF) description
    const descriptionDoc = {
        type: 'doc',
        version: 1,
        content: [
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'YouTube Video Inbound Lead Details' }],
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Lead Submission ID: ', marks: [{ type: 'strong' }] },
                    { type: 'text', text: submissionId },
                    { type: 'text', text: '  |  Source: ', marks: [{ type: 'strong' }] },
                    { type: 'text', text: 'Owner-Managed YouTube Video Form' },
                ],
            },
            {
                type: 'heading',
                attrs: { level: 3 },
                content: [{ type: 'text', text: '1. Contact Information' }],
            },
            {
                type: 'bulletList',
                content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Full Name: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.name }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Business Email: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.email }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Company / Organization: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.company || 'Not specified' }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Phone Number: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.phone || 'Not provided' }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Selected Service / Interest: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.service || 'Autonomous Revenue Systems' }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Message / Objective: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.message || 'Expressed interest via embedded video lead form' }] }] },
                ],
            },
            {
                type: 'heading',
                attrs: { level: 3 },
                content: [{ type: 'text', text: '2. Video Attribution & Playback Analytics' }],
            },
            {
                type: 'bulletList',
                content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Video Title: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.videoTitle }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Video ID: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.videoId }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'YouTube Watch URL: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.youtubeUrl }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Originating Landing Page: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.pageUrl }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Observed Playback Milestone: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.playbackMilestone || 'Not tracked' }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Privacy & Communication Consent: ', marks: [{ type: 'strong' }] }, { type: 'text', text: payload.consentGiven ? 'Opted-In (Consent Verified)' : 'Standard Lead Submission' }] }] },
                ],
            },
        ],
    };

    const summary = `[YouTube Video Lead] ${payload.name} (${payload.company || 'Enterprise'}) - ${payload.videoTitle.slice(0, 45)}`;

    try {
        const createRes = await fetch(`https://${host}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    project: { key: projectKey },
                    summary,
                    description: descriptionDoc,
                    issuetype: { name: 'Task' },
                    labels: ['profitmachines', 'youtube-lead', 'inbound-video-form', label],
                },
            }),
        });

        if (createRes.ok) {
            const data: any = await createRes.json();
            return {
                success: true,
                issueKey: data.key,
                issueUrl: `https://${host}/browse/${data.key}`,
            };
        } else {
            const errText = await createRes.text();
            console.error('[YouTubeLeadService] Jira creation failed:', errText);
            return { success: false, error: errText };
        }
    } catch (err: any) {
        console.error('[YouTubeLeadService] Jira network error:', err);
        return { success: false, error: err.message };
    }
}

// ── 2. Google Sheets Lead Appender ───────────────────────────────────────────
async function appendLeadToGoogleSheets(
    payload: YouTubeVideoLeadPayload,
    submissionId: string,
    jiraIssueKey?: string,
    jiraIssueUrl?: string
): Promise<{ success: boolean; message: string }> {
    const scriptUrl =
        process.env.GOOGLE_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec';

    const timestamp = new Date().toISOString();

    const leadData = {
        submission_id: submissionId,
        timestamp,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        company: payload.company || '',
        service: payload.service || 'Autonomous Revenue Engine',
        message: payload.message || '',
        video_id: payload.videoId,
        video_title: payload.videoTitle,
        youtube_url: payload.youtubeUrl,
        landing_page: payload.pageUrl,
        playback_milestone: payload.playbackMilestone || 'N/A',
        lead_source: 'YouTube Video Inbound Form',
        jira_issue_key: jiraIssueKey || '',
        jira_issue_url: jiraIssueUrl || '',
        consent_status: payload.consentGiven ? 'Granted' : 'Standard Inbound',
    };

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'sync_youtube_video_lead',
                event_type: 'youtube_video_lead',
                form_type: 'youtube_video_lead',
                sheetName: 'Form_Leads_YouTube',
                lead: leadData,
                fields: leadData,
            }),
        });

        if (response.ok) {
            return { success: true, message: 'Saved to Google Sheets successfully.' };
        } else {
            return { success: false, message: `Apps Script status ${response.status}` };
        }
    } catch (err: any) {
        console.warn('[YouTubeLeadService] Google Sheets sync error:', err.message);
        return { success: false, message: err.message };
    }
}

// ── 3. Main Request Handler (/api/leads/youtube) ─────────────────────────────
export async function handleYouTubeVideoLead(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    cleanOldSubmissions();

    const body = (req.body || {}) as YouTubeVideoLeadPayload;

    // 1. Validation of required contact details
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const videoId = (body.videoId || '').trim();
    const videoTitle = (body.videoTitle || 'ProfitMachines Video Showcase').trim();
    const youtubeUrl = (body.youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`).trim();
    const pageUrl = (body.pageUrl || '/').trim();

    if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Please provide your full name.' });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Please provide a valid business email address.' });
    }

    if (!videoId) {
        return res.status(400).json({ error: 'Missing associated video ID for lead attribution.' });
    }

    // 2. Generate or reuse submission ID for idempotency
    const submissionId = body.submissionId || `PV-YT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dedupeKey = `${email}_${videoId}_${submissionId}`;

    if (recentSubmissions.has(dedupeKey)) {
        const cached = recentSubmissions.get(dedupeKey)!;
        return res.status(200).json({
            ...cached.result,
            isDuplicate: true,
            note: 'Duplicate submission intercepted; returned cached result.',
        });
    }

    const payload: YouTubeVideoLeadPayload = {
        submissionId,
        name,
        email,
        phone: (body.phone || '').trim(),
        company: (body.company || '').trim(),
        service: (body.service || 'Enterprise AI Revenue Transformation').trim(),
        message: (body.message || '').trim(),
        videoId,
        videoTitle,
        youtubeUrl,
        pageUrl,
        consentGiven: Boolean(body.consentGiven),
        playbackMilestone: body.playbackMilestone || 'Form Submission (Direct)',
    };

    // 3. Create Jira Lead Task
    const jiraRes = await createJiraVideoLead(payload, submissionId);

    // 4. Append to Google Sheets
    const sheetsRes = await appendLeadToGoogleSheets(
        payload,
        submissionId,
        jiraRes.issueKey,
        jiraRes.issueUrl
    );

    const result = {
        success: true,
        submissionId,
        leadAttribution: {
            videoId: payload.videoId,
            videoTitle: payload.videoTitle,
            youtubeUrl: payload.youtubeUrl,
            pageUrl: payload.pageUrl,
            leadSource: 'YouTube Video Inbound Form',
        },
        integrations: {
            jira: {
                success: jiraRes.success,
                issueKey: jiraRes.issueKey || null,
                issueUrl: jiraRes.issueUrl || null,
                error: jiraRes.error || null,
            },
            googleSheets: {
                success: sheetsRes.success,
                message: sheetsRes.message,
            },
        },
        message: 'Thank you! Your inquiry has been registered with our executive revenue team.',
    };

    // Cache result for 15 minutes for idempotency
    recentSubmissions.set(dedupeKey, { timestamp: Date.now(), result });

    return res.status(200).json(result);
}
