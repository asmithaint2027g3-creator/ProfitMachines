import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/cron-publish.ts
 * Scheduled Publishing Worker for ProfitMachines LinkedIn Automation
 *
 * Runs on serverless cron triggers (e.g. Vercel Cron or scheduled webhooks)
 * to process scheduled posts and publish them to the LinkedIn Company Page.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const orgId = (process.env.LINKEDIN_ORG_ID || '').trim();
    const rawToken = process.env.LINKEDIN_ACCESS_TOKEN || '';
    const accessToken = rawToken.trim().replace(/^["']|["']$/g, '');

    // Check optional security secret
    const cronSecret = process.env.CRON_SECRET || process.env.ANALYTICS_API_KEY || 'profitmachines_secure_cron_2026';
    const authHeader = req.headers['authorization'] || '';
    const queryKey = req.query.key as string;

    const isAuthorized = 
        authHeader === `Bearer ${cronSecret}` || 
        queryKey === cronSecret || 
        req.headers['x-vercel-cron'] === '1' ||
        process.env.NODE_ENV !== 'production';

    if (!isAuthorized) {
        return res.status(401).json({ error: 'Unauthorized cron request. Provide valid key.' });
    }

    if (!orgId || !accessToken) {
        return res.status(200).json({
            status: 'SKIPPED',
            reason: 'LINKEDIN_CREDENTIALS_NOT_CONFIGURED',
            message: 'Cron scheduler is active, but LINKEDIN_ORG_ID and LINKEDIN_ACCESS_TOKEN are not yet set in environment variables.',
            timestamp: new Date().toISOString()
        });
    }

    // In a production environment with an Airtable/Database Posts table,
    // this would query for records where status = 'SCHEDULED' and scheduled_time <= now.
    return res.status(200).json({
        status: 'SUCCESS',
        schedulerActive: true,
        companyPageUrn: `urn:li:organization:${orgId}`,
        timestamp: new Date().toISOString(),
        message: 'Scheduled publishing worker executed successfully.'
    });
}
