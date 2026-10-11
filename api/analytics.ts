

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitToGoogleScript, fetchAnalyticsFromGoogleScript } from './_lib/google-sheets';

const ALLOWED_GET_ACTIONS = ['daily_analytics', 'weekly_analytics', 'dashboard_data', 'sheet2_dashboard', 'sheet2_tab'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const action = String(req.query.action || 'sheet2_dashboard');
        const tab = req.query.tab ? String(req.query.tab) : undefined;
        if (!ALLOWED_GET_ACTIONS.includes(action)) {
            return res.status(400).json({ error: 'Invalid action' });
        }

        try {
            const result = await fetchAnalyticsFromGoogleScript(action, tab);
            return res.status(200).json(result);
        } catch (error: any) {
            console.error('Analytics Fetch Error:', error);
            return res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
        }
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { events } = req.body;

    if (!events || !Array.isArray(events)) {
        return res.status(400).json({ error: 'Invalid events payload' });
    }

    try {
        await submitToGoogleScript({
            table: 'User Behavior',
            events: events
        });

        return res.status(200).json({ success: true, count: events.length });

    } catch (error: any) {
        console.error('Google Script Analytics Error:', error);
        return res.status(500).json({ error: 'Failed to ingest events to Google Sheets via Script', details: error.message });
    }
}



