import type { VercelRequest } from "@vercel/node";

export type ReportType = "daily" | "weekly" | "monthly" | "all";

export const VALID_REPORT_TYPES: readonly ReportType[] = ["daily", "weekly", "monthly", "all"] as const;

export const CRON_SECRET = process.env.CRON_SECRET || "profitmachines_secure_cron_2026";

/**
 * Checks whether the incoming request is authorized via CRON_SECRET or Vercel Cron header.
 */
export function isAuthorized(req: VercelRequest): boolean {
  const cronHeader = req.headers["x-vercel-cron"];
  if (cronHeader === "1" || cronHeader === "true") return true;

  const qSecret = typeof req.query.secret === "string" ? req.query.secret : "";
  const bSecret = typeof req.body?.secret === "string" ? req.body.secret : "";
  const hSecret = (req.headers["x-cron-secret"] as string) || "";

  return (qSecret || bSecret || hSecret) === CRON_SECRET;
}

/**
 * Parses and validates the requested report type.
 */
export function parseReportType(req: VercelRequest): ReportType {
  const raw =
    (typeof req.query.type === "string" ? req.query.type : "") ||
    (typeof req.body?.type === "string" ? req.body.type : "") ||
    "all";

  const lower = raw.toLowerCase().trim();
  if (VALID_REPORT_TYPES.includes(lower as ReportType)) {
    return lower as ReportType;
  }
  return "all";
}
