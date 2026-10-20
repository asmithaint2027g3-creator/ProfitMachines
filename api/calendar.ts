import type { VercelRequest, VercelResponse } from '@vercel/node';
import bookHandler from './_lib/book-calendar.ts';
import availabilityHandler from './_lib/calendar-availability.ts';
import cancelHandler from './_lib/cancel-calendar.ts';
import { SecurityController } from './_lib/security.ts';

/**
 * api/calendar.ts
 * Unified Calendar API Router — consolidates 3 calendar endpoints into 1 serverless function.
 *
 * Routes:
 *   GET  /api/calendar?action=availability&date=YYYY-MM-DD  → calendar-availability (Public, rate-limited)
 *   POST /api/calendar?action=book   body: {...}             → book-calendar (Public, honeypot & spam protected)
 *   POST /api/calendar?action=cancel body: {...}             → cancel-calendar (Private, API_SECURITY_SECRET protected)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    SecurityController.applySecurityHeaders(res);
    return res.status(200).end();
  }

  const action = (req.query.action as string) || '';

  // 1. Privileged Calendar Cancellation / Reschedule
  if (action === 'cancel') {
    const isAuthorized = await SecurityController.enforcePrivate(req, res, {
      allowedMethods: ['POST'],
      requiredScope: 'admin:calendar',
      actionName: 'calendar:cancel',
    });
    if (!isAuthorized) return;
    return cancelHandler(req, res);
  }

  // 2. Public Availability Inspection
  if (action === 'availability' || (req.method === 'GET' && !action)) {
    const isAllowed = await SecurityController.enforcePublic(req, res, {
      allowedMethods: ['GET'],
      rateLimit: { windowMs: 60000, max: 60 },
      actionName: 'calendar:availability',
    });
    if (!isAllowed) return;
    return availabilityHandler(req, res);
  }

  // 3. Public Consultation Booking
  if (action === 'book' || (req.method === 'POST' && !action)) {
    const isAllowed = await SecurityController.enforcePublic(req, res, {
      allowedMethods: ['POST'],
      enableHoneypot: true,
      validateEmail: true,
      rateLimit: { windowMs: 60000, max: 15 },
      actionName: 'calendar:book',
    });
    if (!isAllowed) return;
    return bookHandler(req, res);
  }

  return res.status(400).json({
    error: 'Missing or invalid action parameter',
    usage: '?action=availability | book | cancel',
  });
}

