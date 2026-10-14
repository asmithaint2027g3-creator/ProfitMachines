import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

/**
 * api/cancel-calendar.ts
 * Secure server-side endpoint for cancelling or rescheduling a Google Calendar consultation.
 * Keeps Google Calendar events, Airtable records, and notification emails synchronized.
 *
 * POST /api/cancel-calendar
 * Body:
 * {
 *   eventId: string;
 *   email: string;
 *   action: 'cancel' | 'reschedule';
 *   reason?: string;
 *   newStartTime?: string;
 *   newEndTime?: string;
 * }
 */

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

// ── Check if new slot is available ──────────────────────────────────────────
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

    const busySlots = freeBusy.data.calendars?.[calendarId]?.busy || [];
    const reqStart = new Date(startTime).getTime();
    const reqEnd = new Date(endTime).getTime();

    for (const b of busySlots) {
        if (!b.start || !b.end) continue;
        const bStart = new Date(b.start).getTime();
        const bEnd = new Date(b.end).getTime();
        if (reqStart < bEnd && reqEnd > bStart) {
            return false;
        }
    }
    return true;
}

// ── Update Airtable Record Status ───────────────────────────────────────────
async function updateAirtableRecord(
    eventId: string,
    updates: { status: string; newStart?: string; newEnd?: string; reason?: string }
) {
    const pat = process.env.AIRTABLE_PAT;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    if (!pat || !baseId) {
        console.warn('[CancelCalendar] Airtable credentials missing, skipping sync.');
        return null;
    }

    try {
        // Query record by Google Calendar Event ID
        const filterFormula = encodeURIComponent(`{Google Calendar Event ID} = '${eventId}'`);
        const searchRes = await fetch(
            `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?filterByFormula=${filterFormula}`,
            {
                headers: { 'Authorization': `Bearer ${pat}` },
            }
        );

        if (!searchRes.ok) return null;
        const searchData = await searchRes.json();
        const record = searchData.records?.[0];
        if (!record) return null;

        const fieldsToUpdate: any = {
            'Booking Status': updates.status,
            'Last Updated At': new Date().toISOString(),
        };

        if (updates.newStart && updates.newEnd) {
            fieldsToUpdate['Consultation Date'] = updates.newStart;
            fieldsToUpdate['Consultation End'] = updates.newEnd;
        }

        if (updates.reason) {
            fieldsToUpdate['Cancellation Reason'] = updates.reason;
        }

        const patchRes = await fetch(
            `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${record.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${pat}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fields: fieldsToUpdate }),
            }
        );

        return patchRes.ok;
    } catch (err) {
        console.warn('[CancelCalendar] Failed to update Airtable:', err);
        return null;
    }
}

// ── Send Notification Emails ────────────────────────────────────────────────
async function sendSyncEmails(params: {
    action: 'cancel' | 'reschedule';
    visitorEmail: string;
    visitorName: string;
    reason?: string;
    newStartTime?: string;
    newEndTime?: string;
}) {
    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.GCAL_OWNER_EMAIL || process.env.TEAM_NOTIFICATION_EMAIL;

    if (!resendKey) return;

    const isCancel = params.action === 'cancel';
    const subjectVisitor = isCancel
        ? '⚠️ Consultation Cancelled — ProfitMachines'
        : '🔄 Consultation Rescheduled — ProfitMachines';

    const subjectOwner = isCancel
        ? `⚠️ Consultation Cancelled by ${params.visitorName || params.visitorEmail}`
        : `🔄 Consultation Rescheduled by ${params.visitorName || params.visitorEmail}`;

    const newTimeFormatted = params.newStartTime
        ? new Date(params.newStartTime).toLocaleString('en-US', {
            timeZone: CONFIG.OWNER_TIMEZONE,
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : '';

    const visitorHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: ${isCancel ? '#b91c1c' : '#2878B5'}; padding: 24px; color: #ffffff;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700;">${isCancel ? 'Consultation Cancelled' : 'Consultation Rescheduled'}</h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">ProfitMachines Executive Strategy Session</p>
            </div>
            <div style="padding: 24px; color: #334155;">
                <p>Hi ${params.visitorName || 'there'},</p>
                <p>${isCancel
                    ? 'Your consultation session has been cancelled as requested. If you wish to re-engage, you may book a new slot on our website at any time.'
                    : `Your consultation session has been successfully moved to <strong>${newTimeFormatted}</strong> (${CONFIG.OWNER_TIMEZONE}). An updated calendar invitation has been sent.`
                }</p>
                ${params.reason ? `<p><strong>Reason provided:</strong> ${params.reason}</p>` : ''}
                <p style="font-size: 13px; color: #64748b; margin-top: 24px;">ProfitMachines Strategy Operations Team</p>
            </div>
        </div>
    `;

    try {
        await Promise.allSettled([
            fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: 'ProfitMachines Notifications <onboarding@resend.dev>',
                    to: [params.visitorEmail],
                    subject: subjectVisitor,
                    html: visitorHtml,
                }),
            }),
            ownerEmail
                ? fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        from: 'ProfitMachines Notifications <onboarding@resend.dev>',
                        to: [ownerEmail],
                        subject: subjectOwner,
                        html: visitorHtml,
                    }),
                })
                : Promise.resolve(),
        ]);
    } catch (err) {
        console.warn('[CancelCalendar] Email dispatch error:', err);
    }
}

// ── Main Request Handler ────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

    const { eventId, email, action, reason, newStartTime, newEndTime } = req.body || {};

    if (!eventId) {
        return res.status(400).json({ error: 'Google Calendar eventId is required.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Email of the booking attendee is required.' });
    }

    if (action !== 'cancel' && action !== 'reschedule') {
        return res.status(400).json({ error: "Action must be either 'cancel' or 'reschedule'." });
    }

    const calendarId = process.env.GCAL_CALENDAR_ID || 'primary';

    try {
        const auth = getOAuth2Client();
        const calendar = google.calendar({ version: 'v3', auth });

        // Retrieve existing event to confirm existence and match attendee email
        let existingEvent;
        try {
            const getRes = await calendar.events.get({ calendarId, eventId });
            existingEvent = getRes.data;
        } catch (fetchErr: any) {
            return res.status(404).json({ error: 'Google Calendar event not found or already deleted.' });
        }

        // Verify that the requester email matches an attendee
        const isAttendee = existingEvent.attendees?.some(
            a => a.email?.toLowerCase() === email.toLowerCase()
        );
        const isOwner = email.toLowerCase() === (process.env.GCAL_OWNER_EMAIL || '').toLowerCase();

        if (!isAttendee && !isOwner) {
            return res.status(403).json({ error: 'Unauthorized: The provided email is not an attendee on this event.' });
        }

        const visitorName = existingEvent.attendees?.find(a => a.email?.toLowerCase() === email.toLowerCase())?.displayName || '';

        if (action === 'cancel') {
            // Delete Google Calendar event and notify attendees
            await calendar.events.delete({
                calendarId,
                eventId,
                sendUpdates: 'all',
            });

            // Update Airtable status
            await updateAirtableRecord(eventId, { status: 'Cancelled', reason });

            // Send sync emails
            await sendSyncEmails({
                action: 'cancel',
                visitorEmail: email,
                visitorName,
                reason,
            });

            return res.status(200).json({
                success: true,
                action: 'cancel',
                eventId,
                message: 'Consultation has been cancelled and Google Calendar event removed.',
            });
        }

        if (action === 'reschedule') {
            if (!newStartTime || !newEndTime) {
                return res.status(400).json({ error: 'newStartTime and newEndTime are required for rescheduling.' });
            }

            // Check if new slot is not in the past
            const slotStart = new Date(newStartTime);
            const now = new Date();
            const minAllowed = new Date(now.getTime() + CONFIG.MIN_NOTICE_HOURS * 60 * 60 * 1000);
            if (slotStart < minAllowed) {
                return res.status(400).json({
                    error: `Rescheduled slot must be at least ${CONFIG.MIN_NOTICE_HOURS} hours in advance.`,
                });
            }

            // Check if new slot is available
            const available = await isSlotAvailable(calendar, calendarId, newStartTime, newEndTime);
            if (!available) {
                return res.status(409).json({
                    error: 'The requested new slot is occupied. Please pick a different time.',
                    slotUnavailable: true,
                });
            }

            // Patch existing event with new start/end
            const patched = await calendar.events.patch({
                calendarId,
                eventId,
                sendUpdates: 'all',
                requestBody: {
                    start: { dateTime: new Date(newStartTime).toISOString(), timeZone: CONFIG.OWNER_TIMEZONE },
                    end: { dateTime: new Date(newEndTime).toISOString(), timeZone: CONFIG.OWNER_TIMEZONE },
                    description: `${existingEvent.description || ''}\n\n[Rescheduled on ${new Date().toISOString()}] Reason: ${reason || 'Requested by attendee'}`,
                },
            });

            // Update Airtable
            await updateAirtableRecord(eventId, {
                status: 'Rescheduled',
                newStart: newStartTime,
                newEnd: newEndTime,
                reason,
            });

            // Send sync emails
            await sendSyncEmails({
                action: 'reschedule',
                visitorEmail: email,
                visitorName,
                reason,
                newStartTime,
                newEndTime,
            });

            return res.status(200).json({
                success: true,
                action: 'reschedule',
                eventId,
                newStartTime,
                newEndTime,
                eventLink: patched.data.htmlLink,
                message: 'Consultation successfully rescheduled. Updated calendar invitations have been sent.',
            });
        }

    } catch (err: any) {
        console.error('[CancelCalendar] Handler error:', err);
        return res.status(500).json({
            error: 'Failed to process cancellation or rescheduling.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }
}
