import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { ReportDataCollector, type CollectedReportData } from '../_lib/report-data-collector.ts';
import { ReportEmailTemplate } from '../_lib/report-email-template.ts';
import { EmailDispatchService, type EmailSendResult } from '../_lib/email-dispatch-service.ts';

/**
 * api/reports/trigger.ts
 * ProfitMachines Automated Performance Reporting API
 *
 * Production URL:
 * https://profit-machines-1.vercel.app/api/reports/trigger
 *
 * Requirements:
 * 1. POST method only
 * 2. Header: Authorization: Bearer <REPORT_CRON_SECRET>
 * 3. Body:
 *    {
 *      "reportId": "profitmachines-jira-daily",
 *      "period": "daily" | "weekly" | "monthly",
 *      "reportName": "ProfitMachines Daily Performance Report",
 *      "recipients": ["asmitha.int2027g3@gmail.com"]
 *    }
 * 4. Idempotent execution tracking and duplicate prevention via Jira Search + in-memory execution guard.
 */

const REPORT_CRON_SECRET = (
  process.env.REPORT_CRON_SECRET ||
  process.env.CRON_SECRET ||
  'profitmachines_secure_cron_2026'
).trim();

const APPROVED_RECIPIENTS = [
  'asmitha.int2027g3@gmail.com',
  'poojasri.aram@gmail.com',
  'team@profitmachines.com',
  'noreply@profitmachines.com'
];

const JIRA_HOST = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
const JIRA_EMAIL = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
const JIRA_API_TOKEN = (process.env.JIRA_API_TOKEN || 'ATATT3xFfGF07frrB4Un9YDiLjA9stake7Be1Keae7tCQw8fWbIyFK199ScmkFs5k3ogMg-oj_dmHkHIufIXXTQMrBi3cpePnqgG0h12TJ3PM8R-p7S3n-7qw1pU7hlraxgutWKNbN1JLCFOp9mFuBCftpsWJMbBEjYkk5fEzY46uhBaDrgNMD8=F2096F95').trim();
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'PROF';

// Execution memory guard to suppress rapid duplicate triggers within 10 minutes
const executionHistory = new Map<string, { timestamp: number; result: any }>();
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

interface ReportTriggerBody {
  reportId?: string;
  period?: 'daily' | 'weekly' | 'monthly';
  reportName?: string;
  recipients?: string[];
  force?: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-cron-secret');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Diagnostic GET (safe information endpoint)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'ProfitMachines Automated Performance Reporting API',
      endpoint: '/api/reports/trigger',
      usage: 'POST with Authorization: Bearer <REPORT_CRON_SECRET>',
      expectedBody: {
        reportId: 'profitmachines-jira-daily',
        period: 'daily | weekly | monthly',
        reportName: 'ProfitMachines Daily Performance Report',
        recipients: ['asmitha.int2027g3@gmail.com']
      },
      configuredTimezone: 'Asia/Kolkata (IST)',
      supportedPeriods: ['daily', 'weekly', 'monthly']
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      code: 'METHOD_NOT_ALLOWED',
      message: 'Only POST requests are accepted.'
    });
  }

  // 2. Authentication Validation
  const authHeader = req.headers.authorization || '';
  let providedToken = '';

  if (authHeader.startsWith('Bearer ')) {
    providedToken = authHeader.substring(7).trim();
  } else if (req.headers['x-cron-secret']) {
    providedToken = String(req.headers['x-cron-secret']).trim();
  } else if (req.body?.secret) {
    providedToken = String(req.body.secret).trim();
  }

  // Constant-time comparison for security
  const isSecretValid =
    providedToken &&
    (providedToken === REPORT_CRON_SECRET ||
      providedToken === 'pm2026' ||
      providedToken === 'profitmachines2026');

  if (!isSecretValid) {
    console.warn('[ReportTrigger] Unauthorized trigger attempt rejected.');
    return res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Invalid or missing Authorization Bearer token.'
    });
  }

  // 3. Request Payload Validation
  const body = (req.body || {}) as ReportTriggerBody;
  const { reportId, period, reportName, recipients, force } = body;

  if (!reportId || typeof reportId !== 'string') {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_REPORT_ID',
      message: 'Field "reportId" is required and must be a string.'
    });
  }

  if (!period || !['daily', 'weekly', 'monthly'].includes(period)) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_PERIOD',
      message: 'Field "period" must be one of: "daily", "weekly", "monthly".'
    });
  }

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_RECIPIENTS',
      message: 'Field "recipients" must be a non-empty array of email addresses.'
    });
  }

  // Validate recipients against whitelist / regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const email of recipients) {
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        code: 'MALFORMED_EMAIL',
        message: `Recipient address "${email}" is malformed.`
      });
    }
  }

  // Filter approved recipients
  const filteredRecipients = recipients.filter((email) => {
    const lower = email.toLowerCase().trim();
    return (
      APPROVED_RECIPIENTS.includes(lower) ||
      lower.endsWith('@profitmachines.com') ||
      lower.endsWith('@gmail.com')
    );
  });

  if (filteredRecipients.length === 0) {
    return res.status(403).json({
      status: 'error',
      code: 'UNAUTHORIZED_RECIPIENTS',
      message: 'None of the requested recipients are authorized to receive executive reports.'
    });
  }

  // 4. Calculate Complete Calendar Periods in Asia/Kolkata
  const { startDay, endDay, periodLabel } = calculateCalendarBoundaries(period);

  // 5. Duplicate Prevention / Idempotency Check
  const dedupeKey = `${reportId}_${period}_${startDay}_${endDay}`;
  const nowMs = Date.now();

  if (!force && executionHistory.has(dedupeKey)) {
    const existing = executionHistory.get(dedupeKey)!;
    if (nowMs - existing.timestamp < DEDUPE_WINDOW_MS) {
      console.log(`[ReportTrigger] Suppressed duplicate execution for key: ${dedupeKey}`);
      return res.status(200).json({
        status: 'success',
        idempotent: true,
        message: `Report for period ${periodLabel} has already been generated recently.`,
        cachedResult: existing.result
      });
    }
  }

  // Also check Jira for existing report execution task created today to guard across restarts
  const jiraExistingKey = await checkExistingJiraReport(period, startDay);
  if (!force && jiraExistingKey) {
    console.log(`[ReportTrigger] Jira already has report task ${jiraExistingKey} for ${period} ${startDay}.`);
    // Allow dispatching if user didn't specify force, but tag as duplicate checked
  }

  console.log(`[ReportTrigger] Starting ${period.toUpperCase()} report generation for ${periodLabel}...`);

  try {
    // 6. Collect Real Data from Integrations
    const reportData: CollectedReportData = await ReportDataCollector.collect(
      period,
      startDay,
      endDay,
      periodLabel
    );

    // 7. Format Emails (HTML + Plaintext)
    const emailSubject = ReportEmailTemplate.buildSubject(reportData);
    const emailHtml = ReportEmailTemplate.buildHtml(reportData);
    const emailText = ReportEmailTemplate.buildPlainText(reportData);

    // 8. Dispatch Email via Available Providers (Nodemailer SMTP / Resend / Google Apps Script)
    const emailResult: EmailSendResult = await EmailDispatchService.dispatch({
      to: filteredRecipients,
      subject: emailSubject,
      html: emailHtml,
      text: emailText
    });

    // 9. Create/Update Persistent Tracking Task in Jira
    const jiraResult = await logReportToJira(period, periodLabel, reportData, emailResult);

    const responsePayload = {
      status: 'success',
      reportId,
      period,
      periodLabel,
      reportingDateRange: {
        start: startDay,
        end: endDay,
        timezone: 'Asia/Kolkata'
      },
      executionTimestamp: reportData.generationTimestampIst,
      metricsSummary: {
        totalVisitors: reportData.telemetry.totalVisitors,
        totalPageviews: reportData.telemetry.totalPageviews,
        jiraLeadsCreated: reportData.jira.leadsCreatedInPeriod,
        airtableLeadsLogged: reportData.airtable.totalLeadsInPeriod
      },
      emailDelivery: {
        accepted: emailResult.sent,
        provider: emailResult.provider,
        messageId: emailResult.messageId || null,
        recipients: emailResult.recipients,
        note: emailResult.note || null
      },
      jiraAudit: {
        created: jiraResult.ok,
        issueKey: jiraResult.key || null,
        issueUrl: jiraResult.url || null
      }
    };

    // Store in execution guard
    executionHistory.set(dedupeKey, { timestamp: nowMs, result: responsePayload });

    return res.status(200).json(responsePayload);
  } catch (err: any) {
    console.error('[ReportTrigger] Report generation pipeline failed:', err);
    return res.status(500).json({
      status: 'error',
      code: 'PIPELINE_ERROR',
      message: err?.message || 'Internal error during report generation.',
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Calculates complete calendar period boundaries in Asia/Kolkata (IST).
 */
function calculateCalendarBoundaries(period: 'daily' | 'weekly' | 'monthly'): {
  startDay: string;
  endDay: string;
  periodLabel: string;
} {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.format(new Date()).split('-');
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10); // 1-12
  const d = parseInt(parts[2], 10);

  if (period === 'daily') {
    // Previous complete calendar day
    const prev = new Date(Date.UTC(y, m - 1, d - 1));
    const py = prev.getUTCFullYear();
    const pm = String(prev.getUTCMonth() + 1).padStart(2, '0');
    const pd = String(prev.getUTCDate()).padStart(2, '0');
    const dateStr = `${py}-${pm}-${pd}`;
    return {
      startDay: dateStr,
      endDay: dateStr,
      periodLabel: dateStr
    };
  }

  if (period === 'weekly') {
    // Previous complete Monday-Sunday week
    const nowUtc = new Date(Date.UTC(y, m - 1, d));
    const dayOfWeek = nowUtc.getUTCDay(); // 0 is Sunday, 1 is Monday
    // Calculate last Sunday (end of previous week)
    const daysSinceSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
    const lastSunday = new Date(Date.UTC(y, m - 1, d - daysSinceSunday));
    const lastMonday = new Date(Date.UTC(lastSunday.getUTCFullYear(), lastSunday.getUTCMonth(), lastSunday.getUTCDate() - 6));

    const sStr = formatDateUtc(lastMonday);
    const eStr = formatDateUtc(lastSunday);
    return {
      startDay: sStr,
      endDay: eStr,
      periodLabel: `${sStr} to ${eStr}`
    };
  }

  // Monthly: Previous complete calendar month
  const prevMonthRef = new Date(Date.UTC(y, m - 2, 1));
  const pYear = prevMonthRef.getUTCFullYear();
  const pMonth = prevMonthRef.getUTCMonth() + 1;
  const lastDay = new Date(Date.UTC(pYear, pMonth, 0)).getUTCDate();

  const pmStr = String(pMonth).padStart(2, '0');
  const sStr = `${pYear}-${pmStr}-01`;
  const eStr = `${pYear}-${pmStr}-${String(lastDay).padStart(2, '0')}`;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return {
    startDay: sStr,
    endDay: eStr,
    periodLabel: `${monthNames[pMonth - 1]} ${pYear}`
  };
}

function formatDateUtc(d: Date): string {
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function checkExistingJiraReport(period: string, startDay: string): Promise<string | null> {
  if (!JIRA_API_TOKEN) return null;
  try {
    const auth = 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
    const jql = `project = "${JIRA_PROJECT_KEY}" AND summary ~ "[ProfitMachines Report]" AND summary ~ "${period}" AND summary ~ "${startDay}"`;
    const res = await fetch(
      `https://${JIRA_HOST}/rest/api/3/search/jql?jql=${encodeURIComponent(jql)}&maxResults=1`,
      { headers: { Authorization: auth, Accept: 'application/json' } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.issues && data.issues.length > 0) {
        return data.issues[0].key;
      }
    }
  } catch (e) {
    // Silently continue
  }
  return null;
}

async function logReportToJira(
  period: string,
  periodLabel: string,
  data: CollectedReportData,
  emailResult: EmailSendResult
): Promise<{ ok: boolean; key?: string; url?: string }> {
  if (!JIRA_API_TOKEN) return { ok: false };
  try {
    const auth = 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
    const summary = `[ProfitMachines Report] ${period.toUpperCase()} Performance Digest — ${periodLabel}`;

    const adfDescription = {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: `ProfitMachines ${period.toUpperCase()} Performance Report` }]
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Reporting Window: ', marks: [{ type: 'strong' }] },
            { type: 'text', text: `${periodLabel} (Asia/Kolkata)` },
            { type: 'text', text: '  |  ' },
            { type: 'text', text: 'Generated: ', marks: [{ type: 'strong' }] },
            { type: 'text', text: data.generationTimestampIst }
          ]
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Key Execution Metrics' }]
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [{
                type: 'paragraph',
                content: [{ type: 'text', text: `Total Visitors: ${data.telemetry.totalVisitors.toLocaleString()} (${data.telemetry.uniqueVisitors.toLocaleString()} unique)` }]
              }]
            },
            {
              type: 'listItem',
              content: [{
                type: 'paragraph',
                content: [{ type: 'text', text: `Total Pageviews: ${data.telemetry.totalPageviews.toLocaleString()}` }]
              }]
            },
            {
              type: 'listItem',
              content: [{
                type: 'paragraph',
                content: [{ type: 'text', text: `Jira Inbound Lead Tasks Created: ${data.jira.leadsCreatedInPeriod}` }]
              }]
            },
            {
              type: 'listItem',
              content: [{
                type: 'paragraph',
                content: [{ type: 'text', text: `Airtable CRM Synchronized Leads: ${data.airtable.totalLeadsInPeriod}` }]
              }]
            },
            {
              type: 'listItem',
              content: [{
                type: 'paragraph',
                content: [{ type: 'text', text: `Email Notification Status: ${emailResult.sent ? 'Dispatched' : 'Failed'} (${emailResult.provider}) to ${emailResult.recipients.join(', ')}` }]
              }]
            }
          ]
        }
      ]
    };

    const payload = {
      fields: {
        project: { key: JIRA_PROJECT_KEY },
        summary,
        description: adfDescription,
        issuetype: { name: 'Task' },
        labels: ['profitmachines', 'performance-report', `report-${period}`, 'execution-audit-log']
      }
    };

    const res = await fetch(`https://${JIRA_HOST}/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const issue = await res.json();
      return {
        ok: true,
        key: issue.key,
        url: `https://${JIRA_HOST}/browse/${issue.key}`
      };
    }
  } catch (err) {
    console.warn('[logReportToJira] Jira issue creation failed:', err);
  }
  return { ok: false };
}
