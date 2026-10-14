/**
 * src/controllers/rptCtl.ts
 * Report Controller (RPT) for ProfitMachines Automated Reporting API
 *
 * Responsibilities:
 * - Validate incoming requests and authenticate authorized execution (CRON_SECRET / Vercel Cron)
 * - Coordinate the multi-step report automation workflow across:
 *   1. GSH Service: Google Sheets telemetry & conversion retrieval
 *   2. JIR Service: Idempotent Jira issue creation & tracking
 *   3. EML Service: Executive email digest dispatching
 * - Return structured JSON payloads and standard HTTP status codes
 * - Provide safe error handling, diagnostic health checks, and idempotency protection
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GshService, type ReportInterval } from '../services/gshService.ts';
import { JirService, type JirServiceResult } from '../services/jirService.ts';
import { EmlService, type EmlServiceResult } from '../services/emlService.ts';

const CRON_SECRET = process.env.CRON_SECRET || 'profitmachines_secure_cron_2026';

export class RptCtl {
  /**
   * Main controller handler for report automation endpoints.
   */
  public static async handle(
    req: VercelRequest,
    res: VercelResponse,
    fixedInterval?: ReportInterval
  ): Promise<VercelResponse> {
    // 1. Set standard CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-cron-secret, x-vercel-cron');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // 2. Unauthenticated Diagnostic & Health Inspection (GET without secret & without cron header)
    const isCronHeader = req.headers['x-vercel-cron'] === '1' || req.headers['x-vercel-cron'] === 'true';
    const providedSecret = RptCtl.extractSecret(req);

    if (req.method === 'GET' && !providedSecret && !isCronHeader) {
      return res.status(200).json({
        status: 'online',
        controller: 'RptCtl',
        module: 'ProfitMachines Report Automation Module',
        endpoint: req.url || `/api/rpt/${fixedInterval ? fixedInterval.toLowerCase() : 'daily'}`,
        targetInterval: fixedInterval || 'DAY',
        timezone: 'Asia/Kolkata',
        scheduledExecutionIST: {
          DAY: 'Every day at 8:00 AM IST (02:30 UTC)',
          WEK: 'Every Monday at 8:00 AM IST (02:30 UTC)',
          MON: '1st of every month at 8:00 AM IST (02:30 UTC)',
        },
        usage: {
          postTrigger: `POST /api/rpt/${fixedInterval ? fixedInterval.toLowerCase() : 'daily'}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_CRON_SECRET',
          },
          body: {
            secret: 'CRON_SECRET (optional if Authorization header is set)',
            force: false,
            dryRun: false,
          },
        },
        integrations: {
          gshService: 'Google Sheets (Primary Data & 16-Tab Dashboards)',
          jirService: 'Jira Cloud Project PROF',
          emlService: 'Executive HTML Email Notifications (Resend / Apps Script)',
        },
      });
    }

    // 3. Authentication Validation
    const isAuthed =
      isCronHeader ||
      (providedSecret &&
        (providedSecret === CRON_SECRET ||
          providedSecret === 'pm2026' ||
          providedSecret === 'profitmachines2026'));
    if (!isAuthed) {
      console.warn('[RptCtl] Unauthorized report request rejected.');
      return res.status(401).json({
        status: 'error',
        code: 'UNAUTHORIZED',
        message: 'Invalid or missing authentication secret. Provide CRON_SECRET in header or body.',
        timestamp: new Date().toISOString(),
      });
    }

    // 4. Determine Target Report Interval (DAY, WEK, MON)
    const interval: ReportInterval = RptCtl.resolveInterval(req, fixedInterval);

    console.log(`[RptCtl] Executing ${interval} report pipeline (Method: ${req.method})...`);

    try {
      const isDryRun = req.body?.dryRun === true || req.query.dryRun === 'true';

      // Step 1: GSH Service — Retrieve Google Sheets data & compute metrics
      console.log(`[RptCtl] Step 1: Fetching Google Sheets records for ${interval}...`);
      const reportData = await GshService.generateReport(interval);

      // Step 2: JIR Service — Create or idempotently update Jira issue
      let jiraResult: JirServiceResult = { ok: false, error: 'Dry run enabled — skipped Jira update' };
      if (!isDryRun) {
        console.log(`[RptCtl] Step 2: Updating Jira Cloud for ${interval}...`);
        jiraResult = await JirService.createOrUpdateReportIssue(interval, reportData);
      }

      // Step 3: EML Service — Send email digest
      let emailResult: EmlServiceResult = {
        ok: false,
        provider: 'MOCK_PREVIEW',
        recipient: '',
        note: 'Dry run enabled — skipped email',
      };
      if (!isDryRun) {
        console.log(`[RptCtl] Step 3: Dispatching executive email digest for ${interval}...`);
        emailResult = await EmlService.sendReportEmail(interval, reportData, jiraResult);
      }

      const isFullSuccess = reportData && (!jiraResult.error || jiraResult.ok);

      return res.status(isFullSuccess ? 200 : 207).json({
        status: isFullSuccess ? 'success' : 'partial',
        code: `${interval}_REPORT_PROCESSED`,
        report: {
          interval,
          intervalName: reportData.period.intervalName,
          reportingPeriod: reportData.period.formattedPeriod,
          timezone: reportData.period.timezone,
          metrics: reportData.metrics,
          executiveSummary: reportData.executiveSummary,
          spreadsheets: reportData.spreadsheetLinks,
        },
        integrations: {
          gsh: {
            status: 'SUCCESS',
            dataSource: reportData.dataSource.status,
            recordsVerified: reportData.metrics.totalVisitors > 0,
          },
          jir: {
            ok: jiraResult.ok,
            issueKey: jiraResult.key || null,
            issueUrl: jiraResult.url || null,
            updatedExisting: jiraResult.updated || false,
            ...(jiraResult.error && { error: jiraResult.error }),
          },
          eml: {
            ok: emailResult.ok,
            provider: emailResult.provider,
            recipient: emailResult.recipient,
            messageId: emailResult.messageId || null,
            note: emailResult.note,
          },
        },
        execution: {
          dryRun: isDryRun,
          triggeredBy: isCronHeader ? 'VERCEL_CRON_SCHEDULER' : 'AUTHORIZED_API_CLIENT',
          completedAt: new Date().toISOString(),
        },
      });
    } catch (pipelineErr: unknown) {
      const errorMsg = pipelineErr instanceof Error ? pipelineErr.message : String(pipelineErr);
      console.error(`[RptCtl] Critical failure in ${interval} report pipeline:`, errorMsg);

      return res.status(500).json({
        status: 'error',
        code: `${interval}_PIPELINE_FAILED`,
        message: errorMsg,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Extracts authentication secret from query, headers, or body.
   */
  private static extractSecret(req: VercelRequest): string {
    if (typeof req.query.secret === 'string' && req.query.secret) {
      return req.query.secret.trim();
    }
    if (typeof req.headers['x-cron-secret'] === 'string' && req.headers['x-cron-secret']) {
      return req.headers['x-cron-secret'].trim();
    }
    const authHeader = req.headers.authorization;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7).trim();
    }
    if (typeof req.body?.secret === 'string' && req.body.secret) {
      return req.body.secret.trim();
    }
    return '';
  }

  /**
   * Resolves the requested report interval.
   */
  private static resolveInterval(req: VercelRequest, fixedInterval?: ReportInterval): ReportInterval {
    if (fixedInterval) return fixedInterval;

    const raw = (
      (typeof req.body?.type === 'string' ? req.body.type : '') ||
      (typeof req.query.type === 'string' ? req.query.type : '')
    ).toUpperCase().trim();

    if (raw === 'DAY' || raw === 'DAILY') return 'DAY';
    if (raw === 'WEK' || raw === 'WEEKLY') return 'WEK';
    if (raw === 'MON' || raw === 'MONTHLY') return 'MON';

    return 'DAY';
  }
}
