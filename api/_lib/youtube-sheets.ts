/**
 * api/_lib/youtube-sheets.ts
 * Dedicated Google Sheets integration for "ProfitMachines YouTube Analytics"
 * Maintains 4 separate tabs:
 * 1. Video Analytics
 * 2. Comments
 * 3. Potential Leads
 * 4. Sync Logs
 * Uses stable Video IDs and Comment IDs for upserts (updates existing rows without duplicates).
 */

import type { YouTubeVideoData, YouTubeCommentData } from './youtube';
import type { FlaggedPotentialLead } from './youtube-lead-detector';
import { getYouTubeAccessToken } from './youtube';

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

const TAB_HEADERS = {
    'Video Analytics': [
        'Video ID', 'Video Title', 'Video URL', 'Publication Date',
        'Views', 'Likes', 'Comments Count', 'Watch Time',
        'Average View Duration', 'Subscribers Gained', 'Last Synced At', 'Sync Status'
    ],
    'Comments': [
        'Comment ID', 'Video ID', 'Video Title', 'Comment Text',
        'Public Commenter Channel Name', 'Public Commenter Channel ID',
        'Comment Date', 'Comment URL', 'Potential Lead Status',
        'Airtable Record ID', 'Jira Issue Key', 'Last Synced At'
    ],
    'Potential Leads': [
        'Lead Record ID', 'Video ID', 'Video Title', 'Comment ID',
        'Comment Text', 'Public Commenter Channel Name', 'Public Commenter Channel ID',
        'Reason Flagged', 'Review Status', 'Contacted Status',
        'Airtable Record ID', 'Jira Issue Key', 'Created At', 'Updated At'
    ],
    'Sync Logs': [
        'Sync Run ID', 'Started At', 'Completed At', 'Status',
        'Videos Processed', 'Comments Processed', 'Potential Leads Flagged',
        'Airtable Records Created or Updated', 'Jira Issues Created or Updated', 'Error Details'
    ]
};

// In-memory sliding log for instant dashboard review even prior to Sheets setup
const inMemorySyncLogs: SyncLogEntry[] = [];

export function getLatestSyncLogs(): SyncLogEntry[] {
    return [...inMemorySyncLogs];
}

export function recordLocalSyncLog(entry: SyncLogEntry) {
    inMemorySyncLogs.unshift(entry);
    if (inMemorySyncLogs.length > 50) inMemorySyncLogs.pop();
}

/**
 * Gets the configured spreadsheet ID
 */
export function getYouTubeSpreadsheetId(): string | null {
    return process.env.YOUTUBE_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID || '1E6Yf0dr0QbwSnnWAZUBrndEW5dAUSNgBR5scadxyw3E';
}

/**
 * Synchronizes video analytics, comments, flagged leads, and sync log to Google Sheets.
 */
export async function syncToYouTubeGoogleSheet(params: {
    videos: YouTubeVideoData[];
    comments: YouTubeCommentData[];
    leads: FlaggedPotentialLead[];
    syncLog: SyncLogEntry;
}): Promise<{ success: boolean; message: string; rowsUpdated?: number }> {
    const spreadsheetId = getYouTubeSpreadsheetId();
    recordLocalSyncLog(params.syncLog);

    if (!spreadsheetId) {
        return {
            success: false,
            message: 'YOUTUBE_SPREADSHEET_ID is not configured. Logged to local memory only.'
        };
    }

    const token = await getYouTubeAccessToken();
    if (!token) {
        return {
            success: false,
            message: 'OAuth access token not available for Google Sheets API. Ensure spreadsheet permissions are granted.'
        };
    }

    try {
        // 1. Verify and initialize sheet tabs if needed
        await ensureSheetTabsExist(spreadsheetId, token);

        // 2. Upsert Video Analytics
        await upsertVideoAnalyticsTab(spreadsheetId, token, params.videos);

        // 3. Upsert Comments
        await upsertCommentsTab(spreadsheetId, token, params.comments, params.leads);

        // 4. Upsert Potential Leads
        await upsertPotentialLeadsTab(spreadsheetId, token, params.leads);

        // 5. Append Sync Log
        await appendSyncLogTab(spreadsheetId, token, params.syncLog);

        return {
            success: true,
            message: `Successfully updated spreadsheet "${spreadsheetId}".`
        };
    } catch (err: any) {
        console.error('[YouTube Sheets Sync] Error:', err);
        return {
            success: false,
            message: err.message || 'Error updating Google Spreadsheet.'
        };
    }
}

/**
 * Ensures required tabs and header rows exist.
 */
async function ensureSheetTabsExist(spreadsheetId: string, token: string) {
    const getRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!getRes.ok) {
        throw new Error(`Could not access spreadsheet: ${await getRes.text()}`);
    }

    const sheetData: any = await getRes.json();
    const existingTitles = new Set((sheetData.sheets || []).map((s: any) => s.properties?.title));

    const missingTabs = Object.keys(TAB_HEADERS).filter(tab => !existingTitles.has(tab));
    if (missingTabs.length > 0) {
        const addRequests = missingTabs.map(tab => ({
            addSheet: { properties: { title: tab } }
        }));

        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ requests: addRequests })
        });

        // Add headers for the new tabs
        for (const tab of missingTabs) {
            const headers = TAB_HEADERS[tab as keyof typeof TAB_HEADERS];
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A1?valueInputOption=RAW`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [headers] })
            });
        }
    }
}

/**
 * Upserts video analytics rows by Video ID.
 */
async function upsertVideoAnalyticsTab(spreadsheetId: string, token: string, videos: YouTubeVideoData[]) {
    const tabName = 'Video Analytics';
    const nowStr = new Date().toISOString();

    // Fetch existing rows to match on Video ID (Col A)
    const readRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:A`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const readData: any = await readRes.json();
    const existingIds = (readData.values || []).map((row: any[]) => row[0]);

    for (const video of videos) {
        const rowIndex = existingIds.indexOf(video.videoId);
        const rowValues = [
            video.videoId,
            video.title,
            video.url,
            video.publishedAt,
            video.views,
            video.likes,
            video.commentsCount,
            video.watchTimeMinutes !== undefined ? `${video.watchTimeMinutes} min` : 'N/A',
            video.averageViewDurationSeconds !== undefined ? `${video.averageViewDurationSeconds}s` : 'N/A',
            video.subscribersGained !== undefined ? video.subscribersGained : 'N/A',
            nowStr,
            video.commentsDisabled ? 'Comments Disabled' : 'Synced'
        ];

        if (rowIndex > 0) {
            // Update existing row
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A${rowIndex + 1}?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [rowValues] })
            });
        } else {
            // Append new row
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:A:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [rowValues] })
            });
            existingIds.push(video.videoId);
        }
    }
}

/**
 * Upserts comments by Comment ID.
 */
async function upsertCommentsTab(spreadsheetId: string, token: string, comments: YouTubeCommentData[], leads: FlaggedPotentialLead[]) {
    const tabName = 'Comments';
    const nowStr = new Date().toISOString();
    const leadMap = new Map<string, FlaggedPotentialLead>();
    for (const lead of leads) leadMap.set(lead.commentId, lead);

    const readRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:A`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const readData: any = await readRes.json();
    const existingIds = (readData.values || []).map((row: any[]) => row[0]);

    for (const comment of comments) {
        const lead = leadMap.get(comment.commentId);
        const rowIndex = existingIds.indexOf(comment.commentId);
        const rowValues = [
            comment.commentId,
            comment.videoId,
            comment.videoTitle,
            comment.commentText,
            comment.authorDisplayName,
            comment.authorChannelId,
            comment.publishedAt,
            comment.commentUrl,
            lead ? lead.reviewStatus : 'Regular Viewer',
            lead?.airtableRecordId || '',
            lead?.jiraIssueKey || '',
            nowStr
        ];

        if (rowIndex > 0) {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A${rowIndex + 1}?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [rowValues] })
            });
        } else {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:A:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [rowValues] })
            });
            existingIds.push(comment.commentId);
        }
    }
}

/**
 * Upserts potential leads by Comment ID.
 */
async function upsertPotentialLeadsTab(spreadsheetId: string, token: string, leads: FlaggedPotentialLead[]) {
    const tabName = 'Potential Leads';
    const readRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!D:D`, { // Comment ID in Col D
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const readData: any = await readRes.json();
    const existingCommentIds = (readData.values || []).map((row: any[]) => row[0]);

    for (const lead of leads) {
        const rowIndex = existingCommentIds.indexOf(lead.commentId);
        const rowValues = [
            lead.leadRecordId,
            lead.videoId,
            lead.videoTitle,
            lead.commentId,
            lead.commentText,
            lead.authorDisplayName,
            lead.authorChannelId,
            lead.reasonFlagged,
            lead.reviewStatus,
            lead.contactedStatus,
            lead.airtableRecordId || '',
            lead.jiraIssueKey || '',
            lead.createdAt,
            lead.updatedAt
        ];

        if (rowIndex > 0) {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A${rowIndex + 1}?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [rowValues] })
            });
        } else {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:A:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: [rowValues] })
            });
            existingCommentIds.push(lead.commentId);
        }
    }
}

/**
 * Appends a record to Sync Logs tab.
 */
async function appendSyncLogTab(spreadsheetId: string, token: string, log: SyncLogEntry) {
    const tabName = 'Sync Logs';
    const rowValues = [
        log.syncRunId,
        log.startedAt,
        log.completedAt,
        log.status,
        log.videosProcessed,
        log.commentsProcessed,
        log.potentialLeadsFlagged,
        log.airtableRecordsCount,
        log.jiraIssuesCount,
        log.errorDetails || 'None'
    ];

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:A:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: [rowValues] })
    });
}
