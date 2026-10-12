import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/track-visitor.ts
 * Visitor Tracking Endpoint — captures IP, geo, device, page, referrer
 * and saves every visitor to Airtable "Visitors" table.
 * Fully independent from Jira and lead capture logic.
 */

interface VisitorRecord {
  ip: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  latitude: string | null;
  longitude: string | null;
  page: string;
  referrer: string;
  userAgent: string;
  device: string;
  browser: string;
  os: string;
  visitedAt: string;
  sessionId: string;
}

function parseDevice(ua: string): { device: string; browser: string; os: string } {
  const device = /mobile|android|iphone|ipad|tablet/i.test(ua)
    ? /ipad|tablet/i.test(ua) ? 'Tablet' : 'Mobile'
    : 'Desktop';

  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/chrome/i.test(ua) && !/chromium/i.test(ua)) browser = 'Chrome';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr\//i.test(ua)) browser = 'Opera';

  let os = 'Unknown';
  if (/windows nt 10/i.test(ua)) os = 'Windows 10/11';
  else if (/windows nt/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone os/i.test(ua)) os = 'iOS (iPhone)';
  else if (/ipad/i.test(ua)) os = 'iOS (iPad)';
  else if (/mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { device, browser, os };
}

async function saveToAirtable(visitor: VisitorRecord): Promise<void> {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = 'Visitors';

  if (!pat || !baseId) {
    console.warn('[track-visitor] Airtable credentials missing — skipping save.');
    return;
  }

  const fields: Record<string, string> = {
    'IP Address': visitor.ip,
    'Country': visitor.country,
    'City': visitor.city,
    'Region': visitor.region,
    'Timezone': visitor.timezone,
    'Page Visited': visitor.page,
    'Referrer': visitor.referrer || 'Direct',
    'Device Type': visitor.device,
    'Browser': visitor.browser,
    'Operating System': visitor.os,
    'User Agent': visitor.userAgent.substring(0, 255),
    'Visited At': visitor.visitedAt,
    'Session ID': visitor.sessionId,
  };

  if (visitor.latitude && visitor.longitude) {
    fields['Coordinates'] = `${visitor.latitude}, ${visitor.longitude}`;
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[track-visitor] Airtable error:', error);
    } else {
      console.log('[track-visitor] Visitor saved to Airtable');
    }
  } catch (err) {
    console.error('[track-visitor] Network error:', err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    // Real IP from Vercel forwarded headers
    const forwarded = req.headers['x-forwarded-for'] as string;
    const ip = (forwarded ? forwarded.split(',')[0].trim() : req.headers['x-real-ip'] as string) || 'Unknown';

    // Geo from Vercel Edge headers (auto-injected by Vercel CDN)
    const country = (req.headers['x-vercel-ip-country'] as string) || 'Unknown';
    const city = decodeURIComponent((req.headers['x-vercel-ip-city'] as string) || 'Unknown');
    const region = (req.headers['x-vercel-ip-country-region'] as string) || 'Unknown';
    const timezone = (req.headers['x-vercel-ip-timezone'] as string) || 'UTC';
    const latitude = (req.headers['x-vercel-ip-latitude'] as string) || null;
    const longitude = (req.headers['x-vercel-ip-longitude'] as string) || null;

    // Body from client
    const body = req.body || {};
    const page = body.page || req.headers['referer'] || '/';
    const referrer = body.referrer || '';
    const sessionId = body.sessionId || `sess_${Date.now()}`;

    // Parse user agent for device/browser/OS
    const userAgent = (req.headers['user-agent'] as string) || 'Unknown';
    const { device, browser, os } = parseDevice(userAgent);

    const visitor: VisitorRecord = {
      ip, country, city, region, timezone, latitude, longitude,
      page, referrer, userAgent, device, browser, os,
      visitedAt: new Date().toISOString(),
      sessionId,
    };

    // Save to Airtable asynchronously
    saveToAirtable(visitor).catch(console.error);

    return res.status(200).json({
      success: true,
      visitor: { ip, country, city, device, browser, os },
    });
  } catch (err) {
    console.error('[track-visitor] Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
