/**
 * api/_lib/youtube-jira.ts
 * Enterprise Jira Cloud Integration for YouTube Video Analytics & Potential Leads
 * Space / Project: PROF on trustworkz.atlassian.net
 * Deduplicates issues via JQL labels so repeated synchronizations update existing issues.
 */

import type { YouTubeVideoData } from './youtube';
import type { FlaggedPotentialLead } from './youtube-lead-detector';

interface JiraCredentials {
    host: string;
    authHeader: string;
    projectKey: string;
}

function getJiraCredentials(): JiraCredentials | null {
    const host = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
    const email = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
    const token = process.env.JIRA_API_TOKEN;
    const projectKey = process.env.JIRA_PROJECT_KEY || 'PROF';

    if (!token) {
        return null;
    }

    const authHeader = 'Basic ' + Buffer.from(`${email}:${token}`).toString('base64');
    return { host, authHeader, projectKey };
}

/**
 * Searches for an existing Jira issue by label.
 */
async function findIssueByLabel(creds: JiraCredentials, label: string): Promise<string | null> {
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

/**
 * Upserts a YouTube Video Analytics task in Jira.
 */
export async function syncVideoAnalyticsToJira(video: YouTubeVideoData): Promise<{ issueKey: string; isUpdated: boolean } | null> {
    const creds = getJiraCredentials();
    if (!creds) {
        console.warn('[Jira] JIRA_API_TOKEN is not configured.');
        return null;
    }

    const sanitizedVidId = video.videoId.replace(/[^a-zA-Z0-9_-]/g, '');
    const label = `yt-video-${sanitizedVidId}`;
    const summary = `[YouTube Analytics] ${video.title.slice(0, 100)} (${video.videoId})`;
    const nowStr = new Date().toISOString();

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
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Video Title: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.title }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Video URL: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.url }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Publication Date: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.publishedAt }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Views: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.views.toLocaleString() }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Likes: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.likes.toLocaleString() }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Comments: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.commentsDisabled ? 'Disabled' : video.commentsCount.toLocaleString() }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Estimated Watch Time: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: video.watchTimeMinutes !== undefined ? `${video.watchTimeMinutes} min` : 'Pending Channel Owner Authorization' }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Last Synchronized: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: nowStr }
                            ]
                        }]
                    }
                ]
            }
        ]
    };

    try {
        const existingKey = await findIssueByLabel(creds, label);

        if (existingKey) {
            // Update existing issue
            await fetch(`https://${creds.host}/rest/api/3/issue/${existingKey}`, {
                method: 'PUT',
                headers: {
                    'Authorization': creds.authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: {
                        summary,
                        description: descriptionDoc
                    }
                })
            });
            return { issueKey: existingKey, isUpdated: true };
        }

        // Create new issue
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

/**
 * Upserts a YouTube Potential Lead task in Jira.
 */
export async function syncPotentialLeadToJira(lead: FlaggedPotentialLead, airtableRecordId?: string): Promise<{ issueKey: string; isUpdated: boolean } | null> {
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
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Commenter Channel: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: lead.authorChannelUrl || lead.authorDisplayName }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Comment Link: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: lead.commentUrl }
                            ]
                        }]
                    },
                    {
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Source Video: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: `${lead.videoTitle} (https://www.youtube.com/watch?v=${lead.videoId})` }
                            ]
                        }]
                    },
                    ...(airtableRecordId ? [{
                        type: 'listItem',
                        content: [{
                            type: 'paragraph',
                            content: [
                                { type: 'text', text: 'Airtable CRM Record: ', marks: [{ type: 'strong' }] },
                                { type: 'text', text: `https://airtable.com/appFHphPzP7b2VYq1/tblLeads/${airtableRecordId} (ID: ${airtableRecordId})` }
                            ]
                        }]
                    }] : [])
                ]
            }
        ]
    };

    try {
        const existingKey = await findIssueByLabel(creds, label);

        if (existingKey) {
            await fetch(`https://${creds.host}/rest/api/3/issue/${existingKey}`, {
                method: 'PUT',
                headers: {
                    'Authorization': creds.authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: {
                        summary,
                        description: descriptionDoc
                    }
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
