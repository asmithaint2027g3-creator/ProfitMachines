import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/geo.ts
 * Native Vercel Edge Geo-Location Endpoint
 * Detects visitor country, region, city, and timezone using Vercel infrastructure headers.
 * Fully independent from Jira, Airtable, and Clarity.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const country = (req.headers['x-vercel-ip-country'] as string) || 'Unknown';
    const city = decodeURIComponent((req.headers['x-vercel-ip-city'] as string) || 'Unknown');
    const region = (req.headers['x-vercel-ip-country-region'] as string) || 'Unknown';
    const timezone = (req.headers['x-vercel-ip-timezone'] as string) || 'UTC';
    const latitude = (req.headers['x-vercel-ip-latitude'] as string) || null;
    const longitude = (req.headers['x-vercel-ip-longitude'] as string) || null;

    return res.status(200).json({
        success: true,
        geo: {
            country,
            city,
            region,
            timezone,
            coordinates: latitude && longitude ? { latitude, longitude } : null
        }
    });
}
