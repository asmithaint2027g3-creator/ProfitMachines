import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * api/get-visitors.ts
 * Reads all visitor records from Airtable "Visitors" table.
 * Used exclusively by the /admin/visitors dashboard.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = 'Visitors';

  if (!pat || !baseId) {
    return res.status(500).json({ error: 'Airtable credentials not configured.' });
  }

  try {
    // Fetch up to 100 most recent records, sorted by Visited At descending
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?sort[0][field]=Visited At&sort[0][direction]=desc&maxRecords=200`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${pat}` },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[get-visitors] Airtable error:', err);
      return res.status(response.status).json({ error: 'Failed to fetch from Airtable', detail: err });
    }

    const data = await response.json();
    const records = data.records || [];

    // Map Airtable field names → clean visitor objects
    const visitors = records.map((record: any) => ({
      id: record.id,
      ip: record.fields['IP Address'] || 'Unknown',
      country: record.fields['Country'] || 'Unknown',
      city: record.fields['City'] || 'Unknown',
      region: record.fields['Region'] || '',
      timezone: record.fields['Timezone'] || '',
      page: record.fields['Page Visited'] || '/',
      referrer: record.fields['Referrer'] || 'Direct',
      device: record.fields['Device Type'] || 'Desktop',
      browser: record.fields['Browser'] || 'Unknown',
      os: record.fields['Operating System'] || 'Unknown',
      coordinates: record.fields['Coordinates'] || null,
      visitedAt: record.fields['Visited At'] || record.createdTime,
      sessionId: record.fields['Session ID'] || '',
    }));

    return res.status(200).json({ success: true, visitors, total: visitors.length });
  } catch (err) {
    console.error('[get-visitors] Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
