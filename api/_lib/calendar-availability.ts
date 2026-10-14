import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

/**
 * api/calendar-availability.ts
 * Secure server-side endpoint — fetches owner's available time slots.
 * Uses Google Calendar FreeBusy API with service-account or OAuth2 credentials.
 *
 * GET /api/calendar-availability?date=YYYY-MM-DD&timezone=Asia/Kolkata
 *  → returns available slots for the requested date
 */

// ── Booking Configuration ──────────────────────────────────────────────────
const CONFIG = {
    // Consultation duration in minutes
    DURATION_MINUTES: 45,
    // Working hours (24h format) in owner timezone
    WORK_START_HOUR: 9,   // 9:00 AM
    WORK_END_HOUR: 18,    // 6:00 PM
    // Days of week available (0=Sun, 1=Mon, … 6=Sat)
    AVAILABLE_DAYS: [1, 2, 3, 4, 5], // Mon–Fri
    // Owner's primary timezone
    OWNER_TIMEZONE: process.env.GCAL_OWNER_TIMEZONE || 'Asia/Kolkata',
    // Minimum booking notice in hours
    MIN_NOTICE_HOURS: 24,
    // Max days in advance to allow booking
    MAX_ADVANCE_DAYS: 60,
};

function getOAuth2Client() {
    const clientId = process.env.GCAL_CLIENT_ID;
    const clientSecret = process.env.GCAL_CLIENT_SECRET;
    const refreshToken = process.env.GCAL_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Google Calendar OAuth2 credentials not configured. Set GCAL_CLIENT_ID, GCAL_CLIENT_SECRET, GCAL_REFRESH_TOKEN.');
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });
    return auth;
}

function parseLocalDate(dateStr: string, timezone: string): Date {
    // Parse YYYY-MM-DD as local date in owner timezone
    const [year, month, day] = dateStr.split('-').map(Number);
    // We'll work with UTC-based calculations using timezone offsets
    const dt = new Date(`${dateStr}T00:00:00`);
    return dt;
}

function getSlotCandidates(dateStr: string): Array<{ start: string; end: string; label: string }> {
    const ownerTZ = CONFIG.OWNER_TIMEZONE;
    const slots: Array<{ start: string; end: string; label: string }> = [];
    const [year, month, day] = dateStr.split('-').map(Number);

    // Generate every DURATION_MINUTES slot within working hours
    for (
        let h = CONFIG.WORK_START_HOUR;
        h < CONFIG.WORK_END_HOUR;
    ) {
        const startH = h;
        const startM = 0;
        const endMinutes = startH * 60 + startM + CONFIG.DURATION_MINUTES;
        const endH = Math.floor(endMinutes / 60);
        const endMin = endMinutes % 60;

        if (endH > CONFIG.WORK_END_HOUR || (endH === CONFIG.WORK_END_HOUR && endMin > 0)) break;

        // Build ISO strings in owner timezone
        const pad = (n: number) => String(n).padStart(2, '0');
        const startLocal = `${dateStr}T${pad(startH)}:${pad(startM)}:00`;
        const endLocal = `${dateStr}T${pad(endH)}:${pad(endMin)}:00`;

        // Convert local owner time to UTC for Google Calendar API
        // We'll pass these as-is and let Google handle TZ conversion via calendar ID
        const label12 = formatTime12h(startH, startM);
        const labelEnd12 = formatTime12h(endH, endMin);

        slots.push({
            start: startLocal,
            end: endLocal,
            label: `${label12} – ${labelEnd12}`,
        });

        // Advance by DURATION_MINUTES
        h = endH;
        // If endMin > 0, next slot starts at endH:endMin — but we only do on-the-hour slots
        // Add DURATION_MINUTES from current startH:00
        const nextStart = startH * 60 + CONFIG.DURATION_MINUTES;
        h = Math.floor(nextStart / 60);
        if (Math.floor(nextStart / 60) === startH) break; // safety
    }

    return slots;
}

function formatTime12h(h: number, m: number): string {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const mm = String(m).padStart(2, '0');
    return `${h12}:${mm} ${ampm}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const dateStr = req.query.date as string;
    const calendarId = process.env.GCAL_CALENDAR_ID || 'primary';

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return res.status(400).json({ error: 'Missing or invalid date. Use YYYY-MM-DD format.' });
    }

    // ── Validate date is not in the past or too far in the future ──────────
    const now = new Date();
    const requestedDate = new Date(`${dateStr}T00:00:00`);
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    if (requestedDate < todayMidnight) {
        return res.status(400).json({ error: 'Cannot book past dates.', slots: [] });
    }

    const maxDate = new Date(todayMidnight);
    maxDate.setDate(maxDate.getDate() + CONFIG.MAX_ADVANCE_DAYS);
    if (requestedDate > maxDate) {
        return res.status(400).json({ error: `Cannot book more than ${CONFIG.MAX_ADVANCE_DAYS} days in advance.`, slots: [] });
    }

    // ── Validate day of week ───────────────────────────────────────────────
    const dayOfWeek = requestedDate.getDay();
    if (!CONFIG.AVAILABLE_DAYS.includes(dayOfWeek)) {
        return res.status(200).json({
            date: dateStr,
            available: false,
            reason: 'Consultations are available Monday through Friday only.',
            slots: [],
        });
    }

    try {
        // ── Authenticate with Google Calendar ─────────────────────────────
        const auth = getOAuth2Client();
        const calendar = google.calendar({ version: 'v3', auth });

        // Query FreeBusy for the requested day in owner timezone
        const timeMin = `${dateStr}T00:00:00`;
        const timeMax = `${dateStr}T23:59:59`;

        const freeBusyResponse = await calendar.freebusy.query({
            requestBody: {
                timeMin: new Date(`${dateStr}T00:00:00`).toISOString(),
                timeMax: new Date(`${dateStr}T23:59:59`).toISOString(),
                timeZone: CONFIG.OWNER_TIMEZONE,
                items: [{ id: calendarId }],
            },
        });

        const busySlots = (freeBusyResponse.data?.calendars?.[calendarId]?.busy) || [];

        // ── Build candidate slots then filter out busy + past times ───────
        const candidates = getSlotCandidates(dateStr);
        const minNoticeMs = CONFIG.MIN_NOTICE_HOURS * 60 * 60 * 1000;
        const minAllowedStart = now.getTime() + minNoticeMs;

        const availableSlots = candidates.filter(slot => {
            // Filter past / within notice period
            const slotStart = new Date(`${slot.start}`).getTime();
            if (slotStart < minAllowedStart) return false;

            // Filter conflicts with Google Calendar busy intervals
            const slotStartMs = new Date(`${slot.start}`).getTime();
            const slotEndMs = new Date(`${slot.end}`).getTime();

            for (const busy of busySlots) {
                if (!busy.start || !busy.end) continue;
                const busyStart = new Date(busy.start).getTime();
                const busyEnd = new Date(busy.end).getTime();
                // Overlap check: slot overlaps with busy if not (slotEnd <= busyStart || slotStart >= busyEnd)
                if (!(slotEndMs <= busyStart || slotStartMs >= busyEnd)) {
                    return false;
                }
            }

            return true;
        });

        return res.status(200).json({
            date: dateStr,
            timezone: CONFIG.OWNER_TIMEZONE,
            durationMinutes: CONFIG.DURATION_MINUTES,
            available: availableSlots.length > 0,
            totalSlots: candidates.length,
            availableCount: availableSlots.length,
            slots: availableSlots.map(s => ({
                label: s.label,
                startTime: s.start,
                endTime: s.end,
            })),
        });

    } catch (err: any) {
        console.error('[CalendarAvailability] Error fetching availability:', err);

        // If credentials not configured, return fallback static slots for development
        if (err.message?.includes('not configured')) {
            return res.status(503).json({
                error: 'Google Calendar not configured',
                details: err.message,
                setupRequired: true,
            });
        }

        return res.status(500).json({
            error: 'Failed to fetch availability. Please try again.',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }
}
