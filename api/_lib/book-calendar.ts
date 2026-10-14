import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

/**
 * api/book-calendar.ts
 * Secure server-side endpoint — creates a Google Calendar event for a consultation booking.
 *
 * POST /api/book-calendar
 * Body: { name, email, phone, company, jobTitle, interest, message, startTime, endTime }
 *
 * 1. Validates all fields server-side
 * 2. Rechecks the slot against Google Calendar (double-booking prevention)
 * 3. Creates the event with attendee + notifications
 * 4. Saves booking record to Airtable (if configured)
 * 5. Creates Jira task (via existing jira-lead endpoint)
 * 6. Sends confirmation emails to visitor + owner (via Resend)
 * 7. Returns event ID + confirmation
 */

// ── Booking Configuration (keep in sync with calendar-availability.ts) ─────
const CONFIG = {
    DURATION_MINUTES: 45,
    OWNER_TIMEZONE: process.env.GCAL_OWNER_TIMEZONE || 'Asia/Kolkata',
    MIN_NOTICE_HOURS: 24,
};

function getOAuth2Client() {
    const clientId = process.env.GCAL_CLIENT_ID;
    const clientSecret = process.env.GCAL_CLIENT_SECRET;
    const refreshToken = process.env.GCAL_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Google Calendar OAuth2 credentials not configured.');
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });
    return auth;
}

// ── Server-side validation helpers ─────────────────────────────────────────
function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
    const digits = phone.replace(/[\s\-\(\)\+]/g, '');
    return digits.length >= 7 && digits.length <= 15;
}

async function isSlotAvailable(
    calendar: ReturnType<typeof google.calendar>,
    calendarId: string,
    startTime: string,
    endTime: string
): Promise<boolean> {
    const freeBusy = await calendar.freebusy.query({
        requestBody: {
            timeMin: new Date(startTime).toISOString(),
            timeMax: new Date(endTime).toISOString(),
            timeZone: CONFIG.OWNER_TIMEZONE,
            items: [{ id: calendarId }],
        },
    });

    const busy = freeBusy.data?.calendars?.[calendarId]?.busy || [];
    return busy.length === 0;
}

// ── Send confirmation emails via Resend ────────────────────────────────────
async function sendConfirmationEmails(booking: {
    name: string;
    email: string;
    company: string;
    interest: string;
    message: string;
    startTime: string;
    endTime: string;
    eventId: string;
    eventLink: string;
}) {
    const resendKey = (process.env.RESEND_API_KEY || '').trim().replace(/^["']|["']$/g, '');
    if (!resendKey || !resendKey.startsWith('re_')) {
        console.warn('[BookCalendar] RESEND_API_KEY not configured — skipping confirmation emails.');
        return { visitorSent: false, ownerSent: false };
    }

    const recipient = (process.env.TEAM_NOTIFICATION_EMAIL || 'asmitha.int2027g3@gmail.com').trim();
    const startDt = new Date(booking.startTime);
    const endDt = new Date(booking.endTime);

    const dateFormatted = startDt.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: CONFIG.OWNER_TIMEZONE,
    });
    const timeFormatted = `${startDt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: CONFIG.OWNER_TIMEZONE,
    })} – ${endDt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: CONFIG.OWNER_TIMEZONE,
    })} (${CONFIG.OWNER_TIMEZONE})`;

    const results = { visitorSent: false, ownerSent: false };

    // 1) Email to visitor (confirmation)
    try {
        const visitorRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: 'ProfitMachines <onboarding@resend.dev>',
                to: [booking.email],
                subject: `✅ Consultation Confirmed — ${dateFormatted}`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <div style="background: #064e3b; padding: 24px; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">✅ Consultation Confirmed</h1>
                            <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">ProfitMachines Executive Strategy Session</p>
                        </div>
                        <div style="padding: 24px;">
                            <p style="font-size: 15px; color: #0f172a;">Hi ${booking.name},</p>
                            <p style="font-size: 14px; color: #475569;">Your consultation has been successfully scheduled. You should receive a Google Calendar invitation shortly.</p>
                            <div style="margin: 20px 0; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                    <tr><td style="padding: 6px 0; font-weight: 600; color: #475569; width: 100px;">Date:</td><td style="color: #0f172a;">${dateFormatted}</td></tr>
                                    <tr><td style="padding: 6px 0; font-weight: 600; color: #475569;">Time:</td><td style="color: #0f172a;">${timeFormatted}</td></tr>
                                    <tr><td style="padding: 6px 0; font-weight: 600; color: #475569;">Duration:</td><td style="color: #0f172a;">${CONFIG.DURATION_MINUTES} minutes</td></tr>
                                    <tr><td style="padding: 6px 0; font-weight: 600; color: #475569;">Focus:</td><td style="color: #0f172a;">${booking.interest}</td></tr>
                                </table>
                            </div>
                            <p style="font-size: 13px; color: #64748b;">Need to reschedule? Reply to this email or visit our website to book a new slot.</p>
                        </div>
                    </div>
                `,
            }),
        });
        if (visitorRes.ok) results.visitorSent = true;
    } catch (err) {
        console.error('[BookCalendar] Failed to send visitor email:', err);
    }

    // 2) Email to owner (new booking alert)
    try {
        const ownerRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: 'ProfitMachines Alerts <onboarding@resend.dev>',
                to: [recipient],
                subject: `📅 New Consultation Booked — ${booking.name} (${booking.company})`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <div style="background: #1e3a5f; padding: 24px; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">📅 New Consultation Booking</h1>
                            <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">${dateFormatted} • ${timeFormatted}</p>
                        </div>
                        <div style="padding: 24px;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr><td style="padding: 8px 0; font-weight: 600; color: #475569; width: 120px;">Name:</td><td style="color: #0f172a;">${booking.name}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Email:</td><td><a href="mailto:${booking.email}" style="color: #064e3b;">${booking.email}</a></td></tr>
                                <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Company:</td><td style="color: #0f172a;">${booking.company}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Focus Area:</td><td style="color: #0f172a;">${booking.interest}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Notes:</td><td style="color: #0f172a;">${booking.message || 'None provided'}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Calendar:</td><td><a href="${booking.eventLink}" style="color: #064e3b;">View in Google Calendar</a></td></tr>
                            </table>
                        </div>
                    </div>
                `,
            }),
        });
        if (ownerRes.ok) results.ownerSent = true;
    } catch (err) {
        console.error('[BookCalendar] Failed to send owner email:', err);
    }

    return results;
}

// ── Save booking record to Airtable ────────────────────────────────────────
async function saveToAirtable(booking: {
    name: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    interest: string;
    message: string;
    startTime: string;
    endTime: string;
    eventId: string;
    status: string;
}) {
    const pat = process.env.AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!pat || !baseId) {
        console.warn('[BookCalendar] Airtable not configured — skipping record save.');
        return null;
    }

    try {
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${pat}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    'Name': booking.name,
                    'Email': booking.email,
                    'Phone': booking.phone,
                    'Company': booking.company,
                    'Job Title': booking.jobTitle,
                    'Interest': booking.interest,
                    'Message': booking.message,
                    'Consultation Date': booking.startTime,
                    'Consultation End': booking.endTime,
                    'Google Calendar Event ID': booking.eventId,
                    'Booking Status': booking.status,
                    'Lead Source': 'Book Consultation (Calendar)',
                    'Created At': new Date().toISOString(),
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`[BookCalendar] Airtable record created: ${data.id}`);
            return data.id;
        } else {
            const errData = await response.json().catch(() => ({}));
            console.warn('[BookCalendar] Airtable API error:', errData);
            return null;
        }
    } catch (err) {
        console.warn('[BookCalendar] Airtable save failed:', err);
        return null;
    }
}

// ── Main Handler ───────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

    const {
        firstName, lastName, email, phone, company, jobTitle,
        revenue, interest, message, startTime, endTime,
    } = req.body || {};

    const name = `${firstName || ''} ${lastName || ''}`.trim();

    // ── Server-side field validation ───────────────────────────────────────
    const errors: string[] = [];
    if (!name) errors.push('Name is required.');
    if (!email || !validateEmail(email)) errors.push('A valid email address is required.');
    if (!phone || !validatePhone(phone)) errors.push('A valid phone number is required.');
    if (!company) errors.push('Company name is required.');
    if (!startTime || !endTime) errors.push('Consultation start and end times are required.');

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Validation failed.', details: errors });
    }

    // ── Validate time is not in the past ───────────────────────────────────
    const slotStart = new Date(startTime);
    const now = new Date();
    const minAllowed = new Date(now.getTime() + CONFIG.MIN_NOTICE_HOURS * 60 * 60 * 1000);

    if (slotStart < minAllowed) {
        return res.status(400).json({
            error: `Selected slot is too soon. Please book at least ${CONFIG.MIN_NOTICE_HOURS} hours in advance.`,
            slotUnavailable: true,
        });
    }

    const calendarId = process.env.GCAL_CALENDAR_ID || 'primary';

    try {
        // ── Authenticate & recheck availability ───────────────────────────
        const auth = getOAuth2Client();
        const calendar = google.calendar({ version: 'v3', auth });

        const available = await isSlotAvailable(calendar, calendarId, startTime, endTime);
        if (!available) {
            return res.status(409).json({
                error: 'This time slot has just been booked by someone else. Please select a different time.',
                slotUnavailable: true,
            });
        }

        // ── Create Google Calendar Event ──────────────────────────────────
        const ownerEmail = process.env.GCAL_OWNER_EMAIL || process.env.TEAM_NOTIFICATION_EMAIL || '';

        const eventBody: any = {
            summary: `ProfitMachines Consultation — ${name} (${company})`,
            description: [
                `**Consultation Booking**`,
                ``,
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Company: ${company}`,
                `Designation: ${jobTitle || 'N/A'}`,
                `Revenue Stage: ${revenue || 'N/A'}`,
                `Strategic Focus: ${interest || 'N/A'}`,
                ``,
                `Requirements / Notes:`,
                message || 'None provided',
                ``,
                `---`,
                `Booked via ProfitMachines Consultation Portal`,
                `Booking Time: ${new Date().toISOString()}`,
            ].join('\n'),
            start: {
                dateTime: new Date(startTime).toISOString(),
                timeZone: CONFIG.OWNER_TIMEZONE,
            },
            end: {
                dateTime: new Date(endTime).toISOString(),
                timeZone: CONFIG.OWNER_TIMEZONE,
            },
            attendees: [
                { email: email, displayName: name, comment: `Company: ${company}` },
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 60 },
                    { method: 'popup', minutes: 15 },
                ],
            },
            conferenceData: undefined,
            guestsCanModify: false,
            guestsCanSeeOtherGuests: false,
            status: 'confirmed',
            visibility: 'default',
        };

        // Add owner as organizer attendee if configured
        if (ownerEmail) {
            eventBody.attendees.push({
                email: ownerEmail,
                displayName: 'ProfitMachines Team',
                organizer: true,
                responseStatus: 'accepted',
            });
        }

        const event = await calendar.events.insert({
            calendarId,
            requestBody: eventBody,
            sendUpdates: 'all', // Send Google Calendar invitations to all attendees
        });

        const eventId = event.data.id || '';
        const eventLink = event.data.htmlLink || '';

        console.log(`[BookCalendar] Event created successfully: ${eventId} for ${name} (${email})`);

        // ── Save to Airtable (non-blocking) ───────────────────────────────
        const airtablePromise = saveToAirtable({
            name, email, phone, company, jobTitle: jobTitle || '',
            interest: interest || '', message: message || '',
            startTime, endTime, eventId, status: 'confirmed',
        });

        // ── Send confirmation emails (non-blocking) ──────────────────────
        const emailPromise = sendConfirmationEmails({
            name, email, company: company || '',
            interest: interest || '', message: message || '',
            startTime, endTime, eventId, eventLink,
        });

        // ── Trigger Jira lead capture (non-blocking) ─────────────────────
        // We POST to our own jira-lead endpoint to reuse existing subtask logic
        const jiraPromise = fetch(`${getBaseUrl(req)}/api/jira-lead`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                leadType: 'consultation',
                fields: {
                    name, email, phone, company,
                    designation: jobTitle, revenue, interest, message,
                    date: startTime, time: endTime,
                    source: 'Book Consultation (Calendar Integration)',
                    google_calendar_event_id: eventId,
                    google_calendar_link: eventLink,
                },
            }),
        }).catch(err => console.warn('[BookCalendar] Jira capture notice:', err));

        // ── Submit to Google Sheets (non-blocking) ────────────────────────
        const sheetsUrl = process.env.GOOGLE_SCRIPT_URL;
        const sheetsPromise = sheetsUrl
            ? fetch(sheetsUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formName: 'Executive Consultation Booking (Calendar)',
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email, phone, company,
                    designation: jobTitle || '',
                    revenue: revenue || '',
                    interest: interest || '',
                    message: message || '',
                    preferredDate: startTime,
                    preferredTime: endTime,
                    source: 'Book Consultation (Calendar)',
                    googleCalendarEventId: eventId,
                    bookingStatus: 'confirmed',
                }),
            }).catch(err => console.warn('[BookCalendar] Sheets capture notice:', err))
            : Promise.resolve();

        // Wait for critical side-effects
        const [airtableId, emailResults] = await Promise.all([
            airtablePromise,
            emailPromise,
            jiraPromise,
            sheetsPromise,
        ]);

        return res.status(200).json({
            success: true,
            eventId,
            eventLink,
            startTime,
            endTime,
            durationMinutes: CONFIG.DURATION_MINUTES,
            timezone: CONFIG.OWNER_TIMEZONE,
            airtableRecordId: airtableId || null,
            confirmationEmails: emailResults,
            message: `Consultation successfully booked for ${name}. A Google Calendar invitation has been sent to ${email}.`,
        });

    } catch (err: any) {
        console.error('[BookCalendar] Critical error creating event:', err);

        if (err.message?.includes('not configured')) {
            return res.status(503).json({
                error: 'Google Calendar integration is not yet configured.',
                details: err.message,
                setupRequired: true,
            });
        }

        return res.status(500).json({
            error: 'Failed to create the consultation booking. Please try again or contact us directly.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }
}

function getBaseUrl(req: VercelRequest): string {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    return `${proto}://${host}`;
}
