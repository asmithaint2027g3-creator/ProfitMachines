import type { VercelRequest, VercelResponse } from "@vercel/node";
import { RptCtl } from "../src/controllers/rptCtl.ts";

/**
 * api/process-report.ts
 * ProfitMachines Report Automation API — Unified Report Endpoint
 *
 * Supports DAY (daily), WEK (weekly), MON (monthly) report generation via:
 *   GET  /api/process-report?type=daily&secret=CRON_SECRET
 *   POST /api/process-report  body: { type: "daily"|"weekly"|"monthly", secret: "..." }
 *
 * Coordinates execution through RptCtl → GshService → JirService → EmlService.
 * Vercel Cron invokes this with x-vercel-cron header and ?type= query param.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return RptCtl.handle(req, res);
}
