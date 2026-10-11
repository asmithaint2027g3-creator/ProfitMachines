
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitToGoogleScript } from './_lib/google-sheets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers for browser requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { table, fields } = req.body;

    if (!table || !fields) {
        return res.status(400).json({ error: 'Missing table or fields' });
    }

    console.log(`[Submit] Received request for table: ${table}`);

    try {
        // 1. Save to Google Sheets (existing behavior)
        console.log('[Submit] Attempting to save to Google Sheets...');
        await submitToGoogleScript({
            table,
            fields: {
                ...fields,
                submitted_at: new Date().toISOString()
            }
        });
        console.log('[Submit] Saved to Google Sheets successfully.');

        return res.status(200).json({
            success: true
        });

    } catch (error: any) {
        console.error('Google Script Submission Error:', error);
        return res.status(500).json({
            error: 'Failed to submit',
            details: error.message
        });
    }
}
