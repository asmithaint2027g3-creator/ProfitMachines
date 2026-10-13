import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized, parseReportType, type ReportType } from "./report-validation.ts";
import { GOOGLE_SCRIPT_URL, SPREADSHEET_URL } from "./report-sheets-service.ts";
import { JIRA_HOST, JIRA_API_TOKEN, TEAM_EMAIL } from "./report-jira-service.ts";
import { RESEND_API_KEY } from "./report-email-service.ts";
import { executeReportPipeline } from "./report-service.ts";

export class ReportController {
  /**
   * Main entry point for the report processing route.
   */
  public static async handle(req: VercelRequest, res: VercelResponse) {
    // 1. CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-cron-secret, x-vercel-cron");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // 2. Unauthenticated Diagnostic / Health Check (GET without secret and without cron header)
    if (req.method === "GET" && !req.query.secret && req.headers["x-vercel-cron"] !== "1") {
      return res.status(200).json({
        status: "online",
        controller: "ReportController",
        endpoint: "/api/process-report",
        description: "ProfitMachines Report Automation API",
        usage: {
          trigger_daily:   "GET /api/process-report?secret=CRON_SECRET&type=daily",
          trigger_weekly:  "GET /api/process-report?secret=CRON_SECRET&type=weekly",
          trigger_monthly: "GET /api/process-report?secret=CRON_SECRET&type=monthly",
          trigger_all:     "GET /api/process-report?secret=CRON_SECRET&type=all",
          post:            "POST /api/process-report  body: { secret, type }",
        },
        integrations: {
          google_sheets: GOOGLE_SCRIPT_URL ? "Configured" : "Missing GOOGLE_SCRIPT_URL",
          jira: JIRA_API_TOKEN ? "Configured" : "Missing JIRA_API_TOKEN",
          email_notification: RESEND_API_KEY.startsWith("re_")
            ? "Configured via Resend"
            : "Apps Script Gmail Digest Active",
          recipient: TEAM_EMAIL,
          spreadsheet_url: SPREADSHEET_URL,
        },
        cron_schedules: {
          daily:   "0 14 * * *   (8:00 PM IST every day)",
          weekly:  "30 3 * * 1   (9:00 AM IST every Monday)",
          monthly: "30 3 1 * *   (9:00 AM IST on 1st of month)",
        },
      });
    }

    // 3. Authentication Validation
    if (!isAuthorized(req)) {
      return res.status(401).json({
        status: "error",
        error: "Unauthorized - invalid or missing CRON_SECRET",
      });
    }

    // 4. Request Parameter Parsing & Validation
    const type: ReportType = parseReportType(req);

    console.log(`[ReportController] Handling ${type} report pipeline request...`);

    // 5. Workflow Execution
    try {
      const { now, sheetsResult, jiraResult, emailResult, errors } =
        await executeReportPipeline(type);

      const isFullSuccess = sheetsResult.ok;

      return res.status(isFullSuccess ? 200 : 207).json({
        status: isFullSuccess ? "success" : "partial",
        type,
        timestamp: now,
        pipeline: {
          google_sheets: {
            ok: sheetsResult.ok,
            message: sheetsResult.message,
          },
          jira: {
            ok: Boolean(jiraResult.key),
            key: jiraResult.key,
            url: jiraResult.url,
            ...(jiraResult.error && { error: jiraResult.error }),
          },
          email_notification: {
            ok: emailResult.sent,
            resend_id: emailResult.id,
            note: emailResult.note,
          },
        },
        ...(errors.length > 0 && { warnings: errors }),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[ReportController] Pipeline failure:", msg);
      return res.status(500).json({
        status: "error",
        error: msg,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
