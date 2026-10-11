import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitToGoogleScript } from './_lib/google-sheets';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { companyName, contactName, email, industry, companySize, annualRevenue, website, geography, challenges, objectives } = req.body;

    if (!companyName || !contactName || !email || !industry || !geography || !challenges) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`[Diagnostic Submit] Received submission for company: ${companyName}`);

    try {
        await submitToGoogleScript({
            table: 'Diagnostics',
            fields: {
                companyName,
                contactName,
                email,
                industry,
                companySize,
                annualRevenue,
                website,
                geography,
                challenges,
                objectives,
                submitted_at: new Date().toISOString()
            }
        });
        console.log('[Diagnostic Submit] Saved successfully.');

        return res.status(200).json({
            success: true
        });
    } catch (error: any) {
        console.error('Diagnostic Submission Error:', error);
        // Return 200/success anyway to prevent blocking the UI, as we also save to localStorage in the client
        return res.status(200).json({
            success: true,
            warning: 'Failed to write to sheets, but saved locally',
            details: error.message
        });
    }
}
