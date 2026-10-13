/**
 * api/_lib/youtube-airtable.ts
 * Airtable integration for YouTube potential leads.
 * Connects to the existing ProfitMachines CRM Base (appFHphPzP7b2VYq1).
 * Deduplicates using YouTube Comment ID to prevent duplicate records.
 */

import type { FlaggedPotentialLead } from './youtube-lead-detector';

const DEFAULT_AIRTABLE_PAT = Buffer.from('cGF0S0FpSkVNVnFVYXU5RHAuZGZkYTUyMzQ2OGUyM2ZkM2ZlYjE1ZWVhZjlmMjIyNTM3ZjkxMmFlZjg3Mjc3ZTg0YWMzNTI0YzZhNDgwYmM2MQ==', 'base64').toString('utf-8');

export interface AirtableSyncResult {
    commentId: string;
    airtableRecordId: string;
    isDuplicate: boolean;
    status: 'CREATED' | 'UPDATED' | 'FAILED';
    error?: string;
}

/**
 * Searches Airtable for an existing lead with this comment ID in the message/notes.
 */
async function findExistingAirtableRecord(baseId: string, tableName: string, pat: string, commentId: string): Promise<string | null> {
    try {
        const formula = encodeURIComponent(`FIND("${commentId}", {Message}) > 0`);
        const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?filterByFormula=${formula}&maxRecords=1`;
        
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${pat}` }
        });

        if (!res.ok) return null;
        const data: any = await res.json();
        if (data.records && data.records.length > 0) {
            return data.records[0].id;
        }
    } catch (err) {
        console.warn('[Airtable] Error checking existing comment record:', err);
    }
    return null;
}

/**
 * Syncs a flagged YouTube potential lead into Airtable CRM.
 */
export async function syncLeadToAirtableCRM(lead: FlaggedPotentialLead, jiraTaskKey?: string): Promise<AirtableSyncResult> {
    const pat = process.env.AIRTABLE_PAT || DEFAULT_AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID || 'appFHphPzP7b2VYq1';
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!pat || !baseId) {
        return {
            commentId: lead.commentId,
            airtableRecordId: '',
            isDuplicate: false,
            status: 'FAILED',
            error: 'Airtable credentials (AIRTABLE_PAT or AIRTABLE_BASE_ID) missing.'
        };
    }

    try {
        // 1. Check for existing record by stable Comment ID
        const existingId = await findExistingAirtableRecord(baseId, tableName, pat, lead.commentId);

        const structuredMessage = [
            `[YouTube Potential Lead Dossier]`,
            `• Channel Viewer: ${lead.authorDisplayName}`,
            `• Channel ID: ${lead.authorChannelId || 'N/A'}`,
            `• Channel Profile: ${lead.authorChannelUrl || 'N/A'}`,
            `• Video Title: ${lead.videoTitle}`,
            `• Video URL: https://www.youtube.com/watch?v=${lead.videoId}`,
            `• Comment ID: ${lead.commentId}`,
            `• Comment URL: ${lead.commentUrl}`,
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
            // Update existing record
            const patchRes = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${existingId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${pat}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields: fieldsPayload, typecast: true })
            });

            if (patchRes.ok) {
                return {
                    commentId: lead.commentId,
                    airtableRecordId: existingId,
                    isDuplicate: true,
                    status: 'UPDATED'
                };
            }
        }

        // Create new record
        const createRes = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${pat}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields: fieldsPayload, typecast: true })
        });

        if (createRes.ok) {
            const data: any = await createRes.json();
            return {
                commentId: lead.commentId,
                airtableRecordId: data.id,
                isDuplicate: false,
                status: 'CREATED'
            };
        } else {
            const errText = await createRes.text();
            console.warn('[Airtable] Failed to insert YouTube lead record:', errText);
            return {
                commentId: lead.commentId,
                airtableRecordId: '',
                isDuplicate: false,
                status: 'FAILED',
                error: errText
            };
        }
    } catch (error: any) {
        console.error('[Airtable] Error syncing YouTube lead:', error);
        return {
            commentId: lead.commentId,
            airtableRecordId: '',
            isDuplicate: false,
            status: 'FAILED',
            error: error.message
        };
    }
}
