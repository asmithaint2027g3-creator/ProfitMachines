/**
 * src/lib/jira.ts
 * Enterprise Jira Cloud Integration Service for ProfitMachines
 * Captures 7 Lead Types as Tasks with Auto-Generated Subtasks in Jira Space (Project: PROF)
 *
 * NOTE: Independent CRM pipeline decoupled from Google Sheets.
 */

import { getVisitorId, getSessionId, getStoredUTMs } from './analytics';

export type LeadType = 
    | 'quick'
    | 'enterprise'
    | 'demo'
    | 'consultation'
    | 'audit'
    | 'chatbot'
    | 'partner'
    | 'career';

export interface JiraLeadPayload {
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    Email?: string;
    phone?: string;
    Phone?: string;
    company?: string;
    Company?: string;
    designation?: string;
    jobTitle?: string;
    industry?: string;
    interest?: string;
    revenue?: string;
    annual_revenue?: string;
    message?: string;
    requirement?: string;
    date?: string;
    time?: string;
    timezone?: string;
    source?: string;
    service?: string;
    submission_id?: string;
    [key: string]: any;
}

export interface JiraCaptureResponse {
    success: boolean;
    taskKey?: string;
    taskId?: string;
    boardUrl?: string;
    issueUrl?: string;
    leadType?: string;
    subtasks?: Array<{ key: string; summary: string }>;
    message?: string;
    error?: string;
}

/**
 * Generates an Enterprise Jira Lead Reference ID (e.g., PROF-LEAD-20261011-8492)
 */
export function generateJiraSubmissionId(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `PROF-LEAD-${year}${month}${day}-${rand}`;
}

/**
 * Dispatches an inbound lead to Jira Cloud Space (Project: PROF)
 * Automatically creates a parent Task with categorized subtasks.
 */
export async function captureLeadInJira(
    leadType: LeadType,
    fields: JiraLeadPayload
): Promise<JiraCaptureResponse> {
    const submissionId = fields.submission_id || generateJiraSubmissionId();
    const timestamp = new Date().toISOString();
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const utms = getStoredUTMs();

    const normalizedEmail = fields.email || fields.Email || '';
    const normalizedPhone = fields.phone || fields.Phone || '';
    const normalizedCompany = fields.company || fields.Company || '';
    const normalizedName = fields.name || 
        (fields.firstName ? `${fields.firstName} ${fields.lastName || ''}`.trim() : fields.Name || '');

    const enrichedFields = {
        submission_id: submissionId,
        timestamp,
        lead_type: leadType,
        name: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone,
        company: normalizedCompany,
        designation: fields.designation || fields.jobTitle || fields.Designation || '',
        industry: fields.industry || fields.Industry || '',
        interest: fields.interest || fields.service || '',
        annual_revenue: fields.revenue || fields.annual_revenue || '',
        message: fields.message || fields.requirement || fields.Message || '',
        date: fields.date || '',
        time: fields.time || '',
        timezone: fields.timezone || '',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        page_title: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        utm_source: utms.utm_source || 'direct',
        utm_medium: utms.utm_medium || '',
        utm_campaign: utms.utm_campaign || '',
        utm_term: utms.utm_term || '',
        utm_content: utms.utm_content || '',
        visitor_id: visitorId,
        session_id: sessionId,
        lead_source: fields.source || `ProfitMachines ${leadType.toUpperCase()} Form`,
        ...fields
    };

    try {
        const response = await fetch('/api/jira-lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                leadType,
                fields: enrichedFields
            })
        });

        if (response.ok) {
            const data = await response.json();

            // Cache in local storage for transparency
            if (typeof window !== 'undefined') {
                try {
                    const cache = JSON.parse(localStorage.getItem('pm_recent_jira_leads') || '[]');
                    cache.unshift({
                        taskKey: data.taskKey,
                        leadType,
                        name: enrichedFields.name,
                        email: enrichedFields.email,
                        company: enrichedFields.company,
                        timestamp,
                        boardUrl: data.boardUrl
                    });
                    localStorage.setItem('pm_recent_jira_leads', JSON.stringify(cache.slice(0, 20)));
                } catch (e) {
                    // Ignore localStorage quotas
                }
            }

            return {
                success: true,
                taskKey: data.taskKey,
                taskId: data.taskId,
                boardUrl: data.boardUrl,
                issueUrl: data.issueUrl,
                subtasks: data.subtasks || [],
                message: `Lead successfully registered in Jira (${data.taskKey}) with ${data.subtasks?.length || 0} action subtasks.`
            };
        } else {
            const errData = await response.json().catch(() => ({}));
            console.warn('[Jira] Server returned error status:', response.status, errData);
            return {
                success: false,
                error: errData.message || `HTTP ${response.status}`
            };
        }
    } catch (error: any) {
        console.warn('[Jira] Network error capturing lead in Jira:', error);
        return {
            success: false,
            error: error.message || 'Network request failed'
        };
    }
}
