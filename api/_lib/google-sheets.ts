
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec";
const GOOGLE_ANALYTICS_SCRIPT_URL = process.env.GOOGLE_ANALYTICS_SCRIPT_URL || process.env.VITE_GOOGLE_ANALYTICS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz1gK24YtOmFpuTspRub3iQ5YGEhyvW_S3SqEmIwUg-OmFRbu4WRstiLEaQtOB32U5y/exec";
const ANALYTICS_API_KEY = process.env.ANALYTICS_API_KEY;

export async function submitToGoogleScript(payload: any) {
    if (!GOOGLE_SCRIPT_URL) {
        throw new Error('GOOGLE_SCRIPT_URL configuration missing');
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status === 'error') {
        throw new Error(result.message || 'Error from Google Script');
    }

    return result;
}

const ALLOWED_ANALYTICS_ACTIONS = new Set(['daily_analytics', 'weekly_analytics', 'dashboard_data', 'stats', 'sheet2_dashboard', 'sheet2_tab']);

/**
 * Server-side proxy for read-only analytics endpoints exposed by the Apps Script
 * backend. Keeps ANALYTICS_API_KEY out of the browser bundle.
 */
export async function fetchAnalyticsFromGoogleScript(action: string, tab?: string) {
    const targetUrl = GOOGLE_ANALYTICS_SCRIPT_URL || GOOGLE_SCRIPT_URL;
    if (!targetUrl) {
        throw new Error('Analytics Google Script URL configuration missing');
    }
    if (!ALLOWED_ANALYTICS_ACTIONS.has(action)) {
        throw new Error('Invalid analytics action');
    }

    const url = new URL(targetUrl);
    url.searchParams.set('action', action);
    if (tab) {
        url.searchParams.set('tab', tab);
    }
    if (ANALYTICS_API_KEY) {
        url.searchParams.set('key', ANALYTICS_API_KEY);
    }

    const response = await fetch(url.toString(), { method: 'GET' });
    const result = await response.json();

    if (result.status === 'error') {
        throw new Error(result.message || 'Error from Google Script');
    }

    return result;
}

