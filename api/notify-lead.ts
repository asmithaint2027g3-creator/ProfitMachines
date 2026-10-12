import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/notify-lead.ts
 * Standalone Vercel Email Notification & Lead Alert Endpoint
 * Delivers instant lead notification emails to asmitha.int2027g3@gmail.com
 * Completely independent from Jira, Airtable, and Clarity.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { leadType, fields } = req.body || {};

    if (!fields) {
        return res.status(400).json({ error: 'Missing lead fields payload' });
    }

    // Capture Vercel Edge Geo headers
    const country = (req.headers['x-vercel-ip-country'] as string) || '';
    const city = (req.headers['x-vercel-ip-city'] as string) || '';
    const location = [city ? decodeURIComponent(city) : '', country].filter(Boolean).join(', ') || 'Unknown';

    const recipient = process.env.TEAM_NOTIFICATION_EMAIL || 'asmitha.int2027g3@gmail.com';
    const resendKey = process.env.RESEND_API_KEY;

    const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Prospect';
    const company = fields.company ? ` (${fields.company})` : '';

    console.log(`[Vercel Lead Notification] Received ${leadType || 'quick'} lead: ${fullName} from ${location}`);

    // If RESEND_API_KEY is configured in Vercel, dispatch email
    if (resendKey) {
        try {
            const emailRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'ProfitMachines Alerts <onboarding@resend.dev>',
                    to: [recipient],
                    subject: `🚀 [New Lead Alert] ${leadType || 'Inquiry'} - ${fullName}${company}`,
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                            <div style="background: #064e3b; padding: 24px; color: #ffffff;">
                                <h1 style="margin: 0; font-size: 20px; font-weight: 700;">New ProfitMachines Lead Alert</h1>
                                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Type: <strong>${leadType || 'Quick Inquiry'}</strong></p>
                            </div>
                            <div style="padding: 24px;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569; width: 140px;">Name:</td><td style="color: #0f172a;">${fullName}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Email:</td><td><a href="mailto:${fields.email}" style="color: #064e3b; text-decoration: none; font-weight: 600;">${fields.email || 'N/A'}</a></td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Phone:</td><td style="color: #0f172a;">${fields.phone || 'N/A'}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Company:</td><td style="color: #0f172a;">${fields.company || 'N/A'}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Detected Location:</td><td style="color: #0f172a;">${location}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Service:</td><td style="color: #0f172a;">${fields.interest || fields.service || 'N/A'}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Message:</td><td style="color: #0f172a;">${fields.message || 'None provided'}</td></tr>
                                </table>
                            </div>
                        </div>
                    `
                })
            });

            if (emailRes.ok) {
                const emailData = await emailRes.json();
                return res.status(200).json({ success: true, emailSent: true, id: emailData.id });
            }
        } catch (err: any) {
            console.warn('[Vercel Lead Notification] Email send error:', err);
        }
    }

    // Return success with logged alert even if RESEND_API_KEY is not yet added
    return res.status(200).json({
        success: true,
        emailSent: false,
        message: 'Lead received and logged in Vercel Runtime Logs. Add RESEND_API_KEY in Vercel to receive emails.'
    });
}
