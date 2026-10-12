import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/notify-lead.ts
 * Standalone Vercel Email Notification & Lead Alert Endpoint
 * Delivers instant lead notification emails to asmitha.int2027g3@gmail.com
 * Completely independent from Jira, Airtable, and Clarity.
 *
 * GET  /api/notify-lead -> Diagnostic check & instant test email delivery
 * POST /api/notify-lead -> Live lead notification dispatcher
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const recipient = (process.env.TEAM_NOTIFICATION_EMAIL || 'asmitha.int2027g3@gmail.com').trim();
    const rawResendKey = process.env.RESEND_API_KEY || '';
    const resendKey = rawResendKey.trim().replace(/^["']|["']$/g, '');

    // ── GET: Instant Browser Diagnostic & Test Email Dispatch ───────────────
    if (req.method === 'GET') {
        const hasKey = Boolean(resendKey && resendKey.startsWith('re_'));
        const maskedKey = hasKey
            ? `${resendKey.slice(0, 6)}...${resendKey.slice(-4)}`
            : (resendKey ? 'INVALID_FORMAT (Must start with re_)' : 'NOT_FOUND');

        // If no key is set yet, return helpful setup guidance
        if (!hasKey) {
            return res.status(200).json({
                status: 'RESEND_API_KEY_NOT_FOUND',
                emailSent: false,
                recipient,
                keyStatus: maskedKey,
                message: 'RESEND_API_KEY is not detected in your active Vercel runtime.',
                troubleshooting: [
                    '1. In Vercel Project Settings -> Environment Variables, verify RESEND_API_KEY is added.',
                    '2. Ensure it is checked for Production, Preview, and Development environments.',
                    '3. CRITICAL: In Vercel, after adding an environment variable, you MUST REDEPLOY (Deployments -> click latest -> Redeploy) for the variable to be injected into the serverless function runtime.',
                    '4. Resend API keys start with "re_" (from https://resend.com/api-keys).'
                ]
            });
        }

        // Key is present, send an instant verification test email
        try {
            console.log(`[Vercel Lead Notification] Sending test email to ${recipient}...`);
            const testRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'ProfitMachines Alerts <onboarding@resend.dev>',
                    to: [recipient],
                    subject: '✅ ProfitMachines Lead Alert Verification (Vercel Endpoint Test)',
                    html: `
                        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                            <div style="background: #064e3b; padding: 24px; color: #ffffff;">
                                <h1 style="margin: 0; font-size: 20px; font-weight: 700;">✅ Vercel Lead Alert System Online</h1>
                                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Endpoint: <code>/api/notify-lead</code></p>
                            </div>
                            <div style="padding: 24px;">
                                <p style="font-size: 15px; color: #0f172a; margin-top: 0;">
                                    Great news! Your Vercel notification endpoint is properly connected to Resend.
                                </p>
                                <p style="font-size: 14px; color: #475569;">
                                    Whenever a visitor submits a consultation, quick inquiry, demo, or contact form on ProfitMachines, an instant notification with full lead details and geographic location will be delivered directly to this inbox.
                                </p>
                                <div style="margin-top: 20px; padding: 14px; background: #f8fafc; border-radius: 8px; font-size: 13px; color: #334155;">
                                    <strong>Target Recipient:</strong> ${recipient}<br/>
                                    <strong>Timestamp:</strong> ${new Date().toISOString()}<br/>
                                    <strong>Status:</strong> Active & Ready
                                </div>
                            </div>
                        </div>
                    `
                })
            });

            const testData = await testRes.json().catch(() => ({}));

            if (testRes.ok) {
                return res.status(200).json({
                    status: 'SUCCESS',
                    emailSent: true,
                    recipient,
                    resendMessageId: testData.id,
                    message: `Test email successfully dispatched to ${recipient}! Check your inbox (or Spam/Promotions folder).`
                });
            } else {
                console.error('[Vercel Lead Notification] Test email failed:', testData);
                return res.status(testRes.status).json({
                    status: 'RESEND_REJECTED',
                    emailSent: false,
                    recipient,
                    resendStatusCode: testRes.status,
                    resendError: testData,
                    explanation: testRes.status === 403 
                        ? 'Resend Free Tier allows sending from onboarding@resend.dev ONLY to the email address registered with your Resend account. If your Resend account was registered with a different email, either change recipient or verify your custom domain on Resend.'
                        : 'Resend rejected the request. Please inspect resendError for details.'
                });
            }
        } catch (err: any) {
            console.error('[Vercel Lead Notification] Network error during test:', err);
            return res.status(500).json({
                status: 'ERROR',
                emailSent: false,
                error: err.message
            });
        }
    }

    // ── POST: Live Inbound Lead Notification ────────────────────────────────
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
    }

    const { leadType, fields } = req.body || {};

    if (!fields) {
        return res.status(400).json({ error: 'Missing lead fields payload' });
    }

    // Capture Vercel Edge Geo headers
    const country = (req.headers['x-vercel-ip-country'] as string) || '';
    const city = (req.headers['x-vercel-ip-city'] as string) || '';
    const location = [city ? decodeURIComponent(city) : '', country].filter(Boolean).join(', ') || 'Unknown';

    const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Prospect';
    const company = fields.company ? ` (${fields.company})` : '';

    console.log(`[Vercel Lead Notification] Inbound lead received: ${fullName} (${leadType || 'Inquiry'}) from ${location}`);

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
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Service / Interest:</td><td style="color: #0f172a;">${fields.interest || fields.service || 'N/A'}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Message / Scope:</td><td style="color: #0f172a;">${fields.message || fields.requirement || 'None provided'}</td></tr>
                                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Source:</td><td style="color: #0f172a;">${fields.source || fields.lead_source || 'Website'}</td></tr>
                                </table>
                            </div>
                        </div>
                    `
                })
            });

            const emailData = await emailRes.json().catch(() => ({}));

            if (emailRes.ok) {
                console.log(`[Vercel Lead Notification] Email successfully sent to ${recipient}. ID: ${emailData.id}`);
                return res.status(200).json({ success: true, emailSent: true, id: emailData.id });
            } else {
                console.error('[Vercel Lead Notification] Resend API error response:', emailData);
                return res.status(200).json({
                    success: true,
                    emailSent: false,
                    warning: 'Lead received and logged, but Resend API rejected the email',
                    resendError: emailData
                });
            }
        } catch (err: any) {
            console.error('[Vercel Lead Notification] Email send exception:', err);
            return res.status(200).json({
                success: true,
                emailSent: false,
                warning: 'Lead logged, email send encountered exception',
                error: err.message
            });
        }
    }

    // RESEND_API_KEY is not configured
    console.warn('[Vercel Lead Notification] RESEND_API_KEY not configured. Lead logged only.');
    return res.status(200).json({
        success: true,
        emailSent: false,
        message: 'Lead received and logged in Vercel Runtime Logs. Add RESEND_API_KEY in Vercel to receive emails.'
    });
}

