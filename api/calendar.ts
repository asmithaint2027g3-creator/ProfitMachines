import type { VercelRequest, VercelResponse } from '@vercel/node';
import bookHandler from './_lib/book-calendar';
import availabilityHandler from './_lib/calendar-availability';
import cancelHandler from './_lib/cancel-calendar';

/**
 * api/calendar.ts
 * Unified Calendar API Router — consolidates 3 calendar endpoints into 1 serverless function.
 *
 * Routes:
 *   GET  /api/calendar?action=availability&date=YYYY-MM-DD  → calendar-availability
 *   POST /api/calendar?action=book   body: {...}             → book-calendar
 *   POST /api/calendar?action=cancel body: {...}             → cancel-calendar
 *
 * Backward-compatible: also handles requests without ?action by guessing from method.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = (req.query.action as string) || '';

  switch (action) {
    case 'availability':
      return availabilityHandler(req, res);
    case 'book':
      return bookHandler(req, res);
    case 'cancel':
      return cancelHandler(req, res);
    default:
      // Fallback: if no action param, route GET → availability, POST → book
      if (req.method === 'GET') return availabilityHandler(req, res);
      if (req.method === 'POST') return bookHandler(req, res);
      return res.status(400).json({
        error: 'Missing action parameter',
        usage: '?action=availability | book | cancel',
      });
  }
}
