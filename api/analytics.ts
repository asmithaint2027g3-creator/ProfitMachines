

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitToGoogleScript, fetchAnalyticsFromGoogleScript } from './_lib/google-sheets';
import { SecurityController } from './_lib/security.ts';

const ALLOWED_GET_ACTIONS = ['daily_analytics', 'weekly_analytics', 'dashboard_data', 'sheet2_dashboard', 'sheet2_tab'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'OPTIONS') {
        SecurityController.applySecurityHeaders(res);
        return res.status(200).end();
    }

    const isPublicAllowed = await SecurityController.enforcePublic(req, res, {
        allowedMethods: ['GET', 'POST'],
        rateLimit: { windowMs: 60000, max: 90 },
        maxPayloadBytes: 250 * 1024,
        actionName: 'analytics:events',
    });
    if (!isPublicAllowed) return;

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

    const { events, table, fields } = req.body || {};

    // Support single table submission (consolidated from submit.ts)
    if (table && fields) {
        try {
            await submitToGoogleScript({
                table,
                fields: {
                    ...fields,
                    submitted_at: new Date().toISOString()
                }
            });
            return res.status(200).json({ success: true });
        } catch (error: any) {
            console.error('Google Script Submission Error:', error);
            return res.status(500).json({ error: 'Failed to submit', details: error.message });
        }
    }

    if (!events || !Array.isArray(events)) {
        return res.status(400).json({ error: 'Invalid events or table payload' });
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



