/**
 * api/_lib/linkedin-sheets-lead.ts
 * Dedicated Google Sheets Integration for ProfitMachines LinkedIn Lead Dashboard
 *
 * Implements the 3 required tabs:
 * 1. Post Analytics
 * 2. Organic Engagement
 * 3. Potential Leads
 */

import { getYouTubeAccessToken } from './youtube';

export interface SheetPostAnalyticsRow {
    post_id: string;
    post_url: string;
    post_text: string;
    published_at: string;
    impressions: string | number;
    unique_impressions: string | number;
    clicks: string | number;
    reaction_count: string | number;
    comment_count: string | number;
    repost_count: string | number;
    engagement_rate: string | number;
    last_synced_at: string;
    sync_status: string;
}

export interface SheetOrganicEngagementRow {
    engagement_id: string;
    post_id: string;
    post_url: string;
    engagement_type: string;
    comment_text: string;
    comment_created_at: string;
    member_id: string;
    member_name: string;
    profile_url: string;
    lead_classification: string;
    review_status: string;
    last_synced_at: string;
}

export interface SheetPotentialLeadRow {
    lead_id: string;
    source_platform: string;
    source_type: string;
    source_record_id: string;
    source_post_id: string;
    source_post_url: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    job_title: string;
    linkedin_profile_url: string;
    comment_text: string;
    service_interest: string;
    business_requirement: string;
    lead_score: number | string;
    qualification_status: string;
    created_at: string;
    jira_issue_key: string;
    airtable_record_id: string;
    sync_status: string;
}

export const LINKEDIN_SHEET_TABS = {
    POST_ANALYTICS: 'Post Analytics',
    ORGANIC_ENGAGEMENT: 'Organic Engagement',
    POTENTIAL_LEADS: 'Potential Leads',
};

export const LINKEDIN_TAB_COLUMNS: Record<string, string[]> = {
    [LINKEDIN_SHEET_TABS.POST_ANALYTICS]: [
        'post_id', 'post_url', 'post_text', 'published_at', 'impressions',
        'unique_impressions', 'clicks', 'reaction_count', 'comment_count',
        'repost_count', 'engagement_rate', 'last_synced_at', 'sync_status'
    ],
    [LINKEDIN_SHEET_TABS.ORGANIC_ENGAGEMENT]: [
        'engagement_id', 'post_id', 'post_url', 'engagement_type', 'comment_text',
        'comment_created_at', 'member_id', 'member_name', 'profile_url',
        'lead_classification', 'review_status', 'last_synced_at'
    ],
    [LINKEDIN_SHEET_TABS.POTENTIAL_LEADS]: [
        'lead_id', 'source_platform', 'source_type', 'source_record_id', 'source_post_id',
        'source_post_url', 'name', 'email', 'phone', 'company', 'job_title',
        'linkedin_profile_url', 'comment_text', 'service_interest', 'business_requirement',
        'lead_score', 'qualification_status', 'created_at', 'jira_issue_key',
        'airtable_record_id', 'sync_status'
    ],
};

/**
 * Ensures the 3 required tabs exist in the Google Spreadsheet.
 */
async function ensureTabsExist(spreadsheetId: string, accessToken: string) {
    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!metaRes.ok) return;

    const metadata = await metaRes.json();
    const existingSheetTitles = new Set(metadata.sheets?.map((s: any) => s.properties?.title) || []);

    const missingTabs = Object.values(LINKEDIN_SHEET_TABS).filter(t => !existingSheetTitles.has(t));
    if (missingTabs.length === 0) return;

    const requests = missingTabs.map(tabName => ({
        addSheet: { properties: { title: tabName } }
    }));

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
    });

    // Write header rows for newly created tabs
    for (const tab of missingTabs) {
        const headers = LINKEDIN_TAB_COLUMNS[tab];
        if (headers) {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A1?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: [headers] }),
            });
        }
    }
}

/**
 * Fetches existing values from a sheet tab to find row indices by primary key.
 */
async function getSheetValues(spreadsheetId: string, accessToken: string, tabName: string): Promise<string[][]> {
    try {
        const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:Z`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.values || [];
    } catch {
        return [];
    }
}

/**
 * Syncs Post Analytics rows to Tab 1 (upserts by post_id).
 */
export async function syncPostAnalyticsToSheet(
    spreadsheetId: string,
    rows: SheetPostAnalyticsRow[]
): Promise<{ success: boolean; updatedCount: number }> {
    if (!spreadsheetId || rows.length === 0) return { success: false, updatedCount: 0 };

    try {
        const token = await getYouTubeAccessToken();
        if (!token) throw new Error('No Google OAuth token available for Sheets.');

        await ensureTabsExist(spreadsheetId, token);
        const tab = LINKEDIN_SHEET_TABS.POST_ANALYTICS;
        const existingData = await getSheetValues(spreadsheetId, token, tab);

        // Header index 0 is post_id
        const postIndexMap = new Map<string, number>(); // post_id -> 1-based row index
        if (existingData.length > 0) {
            for (let i = 1; i < existingData.length; i++) {
                const postId = existingData[i][0];
                if (postId) postIndexMap.set(postId, i + 1);
            }
        } else {
            // Write header
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A1?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [LINKEDIN_TAB_COLUMNS[tab]] }),
            });
        }

        let updated = 0;
        const toAppend: any[][] = [];

        for (const row of rows) {
            const rowValues = [
                row.post_id,
                row.post_url,
                row.post_text,
                row.published_at,
                row.impressions,
                row.unique_impressions,
                row.clicks,
                row.reaction_count,
                row.comment_count,
                row.repost_count,
                row.engagement_rate,
                row.last_synced_at,
                row.sync_status
            ];

            const existingRow = postIndexMap.get(row.post_id);
            if (existingRow) {
                // Update in place
                await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A${existingRow}:M${existingRow}?valueInputOption=USER_ENTERED`, {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ values: [rowValues] }),
                });
                updated++;
            } else {
                toAppend.push(rowValues);
            }
        }

        if (toAppend.length > 0) {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A:M:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: toAppend }),
            });
            updated += toAppend.length;
        }

        return { success: true, updatedCount: updated };
    } catch (err) {
        console.warn('[syncPostAnalyticsToSheet] Error:', err);
        return { success: false, updatedCount: 0 };
    }
}

/**
 * Syncs Organic Engagement rows to Tab 2 (upserts by engagement_id).
 */
export async function syncOrganicEngagementToSheet(
    spreadsheetId: string,
    rows: SheetOrganicEngagementRow[]
): Promise<{ success: boolean; updatedCount: number }> {
    if (!spreadsheetId || rows.length === 0) return { success: false, updatedCount: 0 };

    try {
        const token = await getYouTubeAccessToken();
        if (!token) return { success: false, updatedCount: 0 };

        await ensureTabsExist(spreadsheetId, token);
        const tab = LINKEDIN_SHEET_TABS.ORGANIC_ENGAGEMENT;
        const existingData = await getSheetValues(spreadsheetId, token, tab);

        const idMap = new Map<string, number>();
        if (existingData.length > 0) {
            for (let i = 1; i < existingData.length; i++) {
                const id = existingData[i][0];
                if (id) idMap.set(id, i + 1);
            }
        } else {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A1?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [LINKEDIN_TAB_COLUMNS[tab]] }),
            });
        }

        let updated = 0;
        const toAppend: any[][] = [];

        for (const row of rows) {
            const rowValues = [
                row.engagement_id,
                row.post_id,
                row.post_url,
                row.engagement_type,
                row.comment_text,
                row.comment_created_at,
                row.member_id,
                row.member_name,
                row.profile_url,
                row.lead_classification,
                row.review_status,
                row.last_synced_at
            ];

            const existingRow = idMap.get(row.engagement_id);
            if (existingRow) {
                await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A${existingRow}:L${existingRow}?valueInputOption=USER_ENTERED`, {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ values: [rowValues] }),
                });
                updated++;
            } else {
                toAppend.push(rowValues);
            }
        }

        if (toAppend.length > 0) {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A:L:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: toAppend }),
            });
            updated += toAppend.length;
        }

        return { success: true, updatedCount: updated };
    } catch (err) {
        console.warn('[syncOrganicEngagementToSheet] Error:', err);
        return { success: false, updatedCount: 0 };
    }
}

/**
 * Syncs Potential Leads to Tab 3 (upserts by lead_id or source_record_id).
 */
export async function syncPotentialLeadToSheet(
    spreadsheetId: string,
    lead: SheetPotentialLeadRow
): Promise<{ success: boolean; leadId: string }> {
    if (!spreadsheetId) return { success: false, leadId: lead.lead_id };

    try {
        const token = await getYouTubeAccessToken();
        if (!token) return { success: false, leadId: lead.lead_id };

        await ensureTabsExist(spreadsheetId, token);
        const tab = LINKEDIN_SHEET_TABS.POTENTIAL_LEADS;
        const existingData = await getSheetValues(spreadsheetId, token, tab);

        let targetRowIndex: number | null = null;
        if (existingData.length > 0) {
            for (let i = 1; i < existingData.length; i++) {
                const rowLeadId = existingData[i][0];
                const rowSourceRecordId = existingData[i][3];
                if (rowLeadId === lead.lead_id || (lead.source_record_id && rowSourceRecordId === lead.source_record_id)) {
                    targetRowIndex = i + 1;
                    break;
                }
            }
        } else {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A1?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [LINKEDIN_TAB_COLUMNS[tab]] }),
            });
        }

        const rowValues = [
            lead.lead_id,
            lead.source_platform,
            lead.source_type,
            lead.source_record_id,
            lead.source_post_id,
            lead.source_post_url,
            lead.name,
            lead.email,
            lead.phone,
            lead.company,
            lead.job_title,
            lead.linkedin_profile_url,
            lead.comment_text,
            lead.service_interest,
            lead.business_requirement,
            lead.lead_score,
            lead.qualification_status,
            lead.created_at,
            lead.jira_issue_key,
            lead.airtable_record_id,
            lead.sync_status
        ];

        if (targetRowIndex) {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A${targetRowIndex}:U${targetRowIndex}?valueInputOption=USER_ENTERED`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [rowValues] }),
            });
        } else {
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tab)}!A:U:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: [rowValues] }),
            });
        }

        return { success: true, leadId: lead.lead_id };
    } catch (err) {
        console.warn('[syncPotentialLeadToSheet] Error:', err);
        return { success: false, leadId: lead.lead_id };
    }
}
