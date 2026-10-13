import type { ReportType } from "./report-validation.ts";

export const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec";

export const GOOGLE_SHEET_ID =
  process.env.GOOGLE_SHEET_ID || "1E6Yf0dr0QbwSnnWAZUBrndEW5dAUSNgBR5scadxyw3E";

export const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;

export interface SheetsReportResult {
  ok: boolean;
  message: string;
}

/**
 * Triggers Google Apps Script to compute report metrics, update sheets, and dispatch digest emails.
 */
export async function triggerGoogleSheetReport(type: ReportType): Promise<SheetsReportResult> {
  try {
    // 1. Try GET with action=send_reports (supported by doGet in Code.gs)
    const url = new URL(GOOGLE_SCRIPT_URL);
    url.searchParams.set("action", "send_reports");
    const getRes = await fetch(url.toString(), { method: "GET" });
    const text = await getRes.text();

    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      /* raw text or redirect */
    }

    if (parsed?.status === "success" || parsed?.status === "ok") {
      return {
        ok: true,
        message: String(parsed.message || `${type} report dispatched via Apps Script.`),
      };
    }

    // 2. Fallback: POST with send_reports payload (handled by doPost in Code.gs)
    const postRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "send_reports",
        send_reports: true,
        report_type: type,
        source: "vercel_api",
      }),
    });
    const postText = await postRes.text();
    let postParsed: Record<string, unknown> = {};
    try {
      postParsed = JSON.parse(postText);
    } catch {
      /* raw text */
    }

    if (postParsed?.status === "success" || postRes.ok) {
      return {
        ok: true,
        message: String(
          postParsed.message || `${type} report triggered via Apps Script POST.`
        ),
      };
    }

    return {
      ok: false,
      message: `Apps Script responded (${getRes.status}): ${text.slice(0, 200)}`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, message: `Apps Script fetch error: ${msg}` };
  }
}
