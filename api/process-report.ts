import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ReportController } from "./_lib/report-controller.ts";

/**
 * api/process-report.ts
 * ProfitMachines Secure Report Automation Route Entrypoint
 *
 * Coordinates execution via ReportController, maintaining a clean
 * separation of concerns between HTTP routing, controller orchestration,
 * and service integrations (Sheets, Jira, and Email).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return ReportController.handle(req, res);
}
