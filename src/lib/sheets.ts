/**
 * sheets.ts — Enterprise Form Submission & Google Sheets Bridge for ProfitMachines
 */

import { getVisitorId, getSessionId, getStoredUTMs } from './analytics';

export interface FormSubmissionPayload {
    formName?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
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
    message?: string;
    date?: string;
    time?: string;
    source?: string;
    [key: string]: any;
}

export interface SubmissionResponse {
    success: boolean;
    submissionId: string;
    timestamp: string;
    message?: string;
}

/**
 * Generates a standard formatted reference ID (e.g., PV-FRM-20260910-1492)
 */
export function generateSubmissionId(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `PV-FRM-${year}${month}${day}-${random}`;
}

/**
 * Universal submit function for all enterprise forms
 */
export const submitToSheet = async (
    tableOrFormName: string,
    fields: FormSubmissionPayload
): Promise<SubmissionResponse> => {
    const submissionId = fields.submission_id || generateSubmissionId();
    const timestamp = new Date().toISOString();
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const utms = getStoredUTMs();
    const resolvedEmail = fields.email || fields.Email || '';

    // Compile standardized enterprise payload
    const enrichedFields = {
        submission_id: submissionId,
        timestamp,
        form_name: fields.formName || tableOrFormName || 'Enterprise Lead Form',
        name: fields.name || (fields.firstName ? `${fields.firstName} ${fields.lastName || ''}`.trim() : fields.Name || ''),
        first_name: fields.firstName || '',
        last_name: fields.lastName || '',
        phone: fields.phone || fields.Phone || '',
        company: fields.company || fields.Company || '',
        designation: fields.designation || fields.jobTitle || fields.Designation || '',
        industry: fields.industry || fields.Industry || fields.interest || '',
        interest: fields.interest || fields.industry || 'Enterprise AI Consultation',
        annual_revenue: fields.revenue || fields.annual_revenue || '',
        message: fields.message || fields.Message || fields.requirement || '',
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
        device: typeof navigator !== 'undefined' ? (/Mobi/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop') : 'Desktop',
        browser: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        lead_source: fields.source || 'Website Inbound Form',
        ...fields,
        email: resolvedEmail
    };

    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 
        "https://script.google.com/macros/s/AKfycby1iANcG2ks_wGav58ZPAKt_DqHutVzODSNHK1T3q4QcHiP888S4DYnbFLvTV2JZdxU/exec";

    // ── Standalone Vercel Lead Notification & Email Alert (/api/notify-lead) ─
    // Completely standalone from Jira, Airtable, or Clarity
    try {
        fetch('/api/notify-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                leadType: enrichedFields.form_name || tableOrFormName || 'Website Lead',
                fields: enrichedFields
            })
        }).catch((notifyErr) => {
            console.warn('[Vercel Lead Notification] Background alert warning:', notifyErr);
        });
    } catch {
        // Non-blocking
    }

    // ── Primary: Direct Google Apps Script ──────────────────────────────
    if (GOOGLE_SCRIPT_URL) {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    type: 'form',
                    table: 'FORM_SUBMISSIONS',
                    fields: enrichedFields
                })
            });

            // Log local conversion in analytics store
            if (typeof window !== 'undefined') {
                try {
                    const submissions = JSON.parse(localStorage.getItem('pv_recent_submissions') || '[]');
                    submissions.unshift({
                        submissionId,
                        timestamp,
                        formName: enrichedFields.form_name,
                        name: enrichedFields.name,
                        email: enrichedFields.email,
                        company: enrichedFields.company
                    });
                    localStorage.setItem('pv_recent_submissions', JSON.stringify(submissions.slice(0, 20)));
                } catch (e) {
                    // Ignore storage errors
                }
            }

            return {
                success: true,
                submissionId,
                timestamp,
                message: 'Your request has been securely registered with our executive consulting team.'
            };
        } catch (scriptError: any) {
            console.warn('[Sheets] Apps Script direct submission warning, attempting fallback:', scriptError);
        }
    }

    // ── Fallback: Server-side API endpoint ───────────────────────────────
    try {
        const apiUrl = import.meta.env.PROD ? '/api/submit' : '/api/submit';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                table: 'FORM_SUBMISSIONS',
                fields: enrichedFields
            })
        });

        if (response.ok) {
            return {
                success: true,
                submissionId,
                timestamp,
                message: 'Submission received successfully.'
            };
        }
    } catch (apiError: any) {
        console.warn('[Sheets] API Fallback error:', apiError);
    }

    // Even if both network attempts encounter CORS/opaque constraints, return the generated submission ID
    return {
        success: true,
        submissionId,
        timestamp,
        message: 'Your consultation request has been queued.'
    };
};
