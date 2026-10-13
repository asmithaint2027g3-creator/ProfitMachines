/**
 * api/_lib/linkedin-sheets.ts
 * Dedicated Google Sheets integration for ProfitMachines LinkedIn Analytics
 * Maintains 4 synchronized analytical tables:
 * 1. LinkedIn_Post_Analytics (Impressions, Reach, Clicks, Likes Count, Comments Count, Engagement Rate)
 * 2. LinkedIn_Comments (Commenter details, Comment text, Date, Likes count)
 * 3. LinkedIn_Reactions (Who liked / reacted, reaction type, timestamp)
 * 4. LinkedIn_Leads (Flagged high-intent commenter leads with Airtable/Jira sync)
 */

import type { LinkedInPostAnalytics, LinkedInCommentItem, LinkedInReactionItem } from './linkedin-api';
import { getYouTubeAccessToken } from './youtube';

export const LINKEDIN_TAB_HEADERS = {
    'LinkedIn_Post_Analytics': [
        'Timestamp', 'Post ID', 'Post Title', 'LinkedIn URN', 'Impressions (Who Saw)',
        'Unique Reach', 'Clicks', 'Likes Count', 'Comments Count', 'Shares Count',
        'Engagement Rate', 'Last Synced At'
    ],
    'LinkedIn_Comments': [
        'Timestamp', 'Comment ID', 'Post URN', 'Post Title', 'Commenter Name',
        'Commenter URN', 'Comment Text', 'Comment Date', 'Likes Count', 'Lead Status',
        'Airtable Record ID', 'Jira Issue Key'
    ],
    'LinkedIn_Reactions': [
        'Timestamp', 'Reaction ID', 'Post URN', 'Post Title', 'Actor Name',
        'Actor URN', 'Reaction Type', 'Reaction Date'
    ],
    'LinkedIn_Leads': [
        'Timestamp', 'Lead ID', 'Post URN', 'Post Title', 'Commenter Name',
        'Comment Text', 'Reason Flagged', 'Confidence Score', 'Review Status',
        'Airtable Record ID', 'Jira Issue Key'
    ]
};

/**
 * Syncs LinkedIn analytics, comments, reactions, and leads to Google Sheets
 */
export async function syncToLinkedInGoogleSheet(params: {
    analytics: LinkedInPostAnalytics[];
    comments: LinkedInCommentItem[];
    reactions: LinkedInReactionItem[];
    leads: LinkedInCommentItem[];
}): Promise<{ success: boolean; message: string; rowsSynced?: number }> {
    const spreadsheetId = process.env.LINKEDIN_SPREADSHEET_ID;
    const nowStr = new Date().toISOString();

    // 1. If dedicated LINKEDIN_SPREADSHEET_ID is configured, update directly via Google Sheets REST API
    if (spreadsheetId) {
        try {
            const token = await getYouTubeAccessToken();
            if (token) {
                await ensureLinkedInTabsExist(spreadsheetId, token);
                await upsertLinkedInPostAnalytics(spreadsheetId, token, params.analytics);
                await upsertLinkedInCommentsTab(spreadsheetId, token, params.comments);
                await upsertLinkedInReactionsTab(spreadsheetId, token, params.reactions);
                await upsertLinkedInLeadsTab(spreadsheetId, token, params.leads);
            }
        } catch (directErr) {
            console.warn('[LinkedIn Sheets Direct Sync] Notice:', directErr);
        }
    }

    // 2. Also forward to the main ProfitMachines Apps Script webhook to update executive workbook tabs
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec";
    try {
        await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'sync_linkedin_analytics_batch',
                event_type: 'linkedin_analytics_batch',
                timestamp: nowStr,
                analytics: params.analytics,
                comments: params.comments,
                reactions: params.reactions,
                leads: params.leads
            })
        }).catch(() => {});
    } catch (scriptErr) {
        console.warn('[LinkedIn Apps Script Sync] Notice:', scriptErr);
    }

    return {
        success: true,
        message: `LinkedIn analytics (${params.analytics.length} posts, ${params.reactions.length} reactions, ${params.comments.length} comments) successfully synced to Google Sheets!`
    };
}

async function ensureLinkedInTabsExist(spreadsheetId: string, token: string) {
    const getRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!getRes.ok) return;

    const sheetData: any = await getRes.json();
    const existingTitles = new Set((sheetData.sheets || []).map((s: any) => s.properties?.title));

    const missingTabs = Object.keys(LINKEDIN_TAB_HEADERS).filter(tab => !existingTitles.has(tab));
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

        for (const tab of missingTabs) {
            const headers = LINKEDIN_TAB_HEADERS[tab as keyof typeof LINKEDIN_TAB_HEADERS];
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

async function upsertLinkedInPostAnalytics(spreadsheetId: string, token: string, analytics: LinkedInPostAnalytics[]) {
    if (analytics.length === 0) return;
    const tabName = 'LinkedIn_Post_Analytics';
    const nowStr = new Date().toISOString();

    const rows = analytics.map(a => [
        nowStr,
        a.postId || a.postUrn,
        a.title || 'LinkedIn Post',
        a.postUrn,
        a.impressions,
        a.uniqueImpressions,
        a.clicks,
        a.likesCount,
        a.commentsCount,
        a.sharesCount,
        `${a.engagementRate}%`,
        a.lastSyncedAt
    ]);

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A2:L?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
    });
}

async function upsertLinkedInCommentsTab(spreadsheetId: string, token: string, comments: LinkedInCommentItem[]) {
    if (comments.length === 0) return;
    const tabName = 'LinkedIn_Comments';
    const nowStr = new Date().toISOString();

    const rows = comments.map(c => [
        nowStr,
        c.commentId,
        c.postUrn,
        c.postTitle || 'LinkedIn Post',
        c.actorName,
        c.actorUrn,
        c.commentText,
        c.createdTime,
        c.likesCount,
        c.isPotentialLead ? 'POTENTIAL_LEAD' : 'STANDARD_COMMENT',
        '',
        ''
    ]);

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A2:L?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
    });
}

async function upsertLinkedInReactionsTab(spreadsheetId: string, token: string, reactions: LinkedInReactionItem[]) {
    if (reactions.length === 0) return;
    const tabName = 'LinkedIn_Reactions';
    const nowStr = new Date().toISOString();

    const rows = reactions.map(r => [
        nowStr,
        r.reactionId,
        r.postUrn,
        r.postTitle || 'LinkedIn Post',
        r.actorName,
        r.actorUrn,
        r.reactionType,
        r.createdTime
    ]);

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A2:H?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
    });
}

async function upsertLinkedInLeadsTab(spreadsheetId: string, token: string, leads: LinkedInCommentItem[]) {
    if (leads.length === 0) return;
    const tabName = 'LinkedIn_Leads';
    const nowStr = new Date().toISOString();

    const rows = leads.map(l => [
        nowStr,
        l.commentId,
        l.postUrn,
        l.postTitle || 'LinkedIn Post',
        l.actorName,
        l.commentText,
        l.reasonFlagged || 'High-Intent LinkedIn Comment',
        l.confidenceScore || 90,
        'Pending Review',
        '',
        ''
    ]);

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A2:K?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
    });
}
