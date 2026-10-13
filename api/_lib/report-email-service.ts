import type { ReportType } from "./report-validation.ts";
import { SPREADSHEET_URL } from "./report-sheets-service.ts";
import { TEAM_EMAIL } from "./report-jira-service.ts";

export const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();

export interface EmailNotificationResult {
  sent: boolean;
  id?: string;
  error?: string;
  note?: string;
}

export function buildNotificationHtml(
  type: ReportType,
  now: string,
  jiraKey: string | undefined,
  jiraUrl: string | undefined,
  sheetsOk: boolean
): string {
  const label =
    type === "all" ? "Daily + Weekly + Monthly" : type.charAt(0).toUpperCase() + type.slice(1);
  const status = sheetsOk ? "Success" : "Partial - check Apps Script logs";
  const statusBg = sheetsOk ? "#064e3b" : "#78350f";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>ProfitMachines Report Alert</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155;">
    <div style="background:linear-gradient(135deg,#6d28d9,#4f46e5);padding:28px 32px;">
      <div style="font-size:22px;font-weight:800;color:#ffffff;">PROFITMACHINES Report Automation</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.75);margin-top:4px;">${label} Executive Digest</div>
    </div>
    <div style="background:${statusBg};padding:12px 32px;font-size:13px;color:#ffffff;font-weight:600;">${status}</div>
    <div style="padding:28px 32px;">
      <p style="color:#cbd5e1;font-size:14px;margin:0 0 20px;">
        Your <strong style="color:#a5b4fc;">${label}</strong> report pipeline completed at
        <strong style="color:#a5b4fc;">${now}</strong>.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#94a3b8;" cellpadding="10">
        <tr style="border-bottom:1px solid #334155;">
          <td style="color:#64748b;font-weight:600;width:40%;">Report Type</td>
          <td style="color:#e2e8f0;">${label}</td>
        </tr>
        <tr style="border-bottom:1px solid #334155;">
          <td style="color:#64748b;font-weight:600;">Google Sheets</td>
          <td style="color:#e2e8f0;">${
            sheetsOk
              ? "Summaries updated and digest emails dispatched"
              : "Check Apps Script logs"
          }</td>
        </tr>
        <tr style="border-bottom:1px solid #334155;">
          <td style="color:#64748b;font-weight:600;">Jira Task</td>
          <td>${
            jiraKey && jiraUrl
              ? `<a href="${jiraUrl}" style="color:#818cf8;font-weight:600;">${jiraKey}</a>`
              : '<span style="color:#f87171;">Not created - check JIRA_API_TOKEN</span>'
          }</td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Recipient</td>
          <td style="color:#e2e8f0;">${TEAM_EMAIL}</td>
        </tr>
      </table>
      <div style="margin-top:28px;">
        <a href="${SPREADSHEET_URL}" target="_blank"
           style="display:inline-block;background:#6d28d9;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;">
          Open Google Sheets
        </a>
        ${
          jiraUrl
            ? `<a href="${jiraUrl}" target="_blank"
               style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;margin-left:12px;">
               View Jira Task
             </a>`
            : ""
        }
      </div>
    </div>
    <div style="background:#0f172a;padding:16px 32px;text-align:center;font-size:11px;color:#475569;">
      ProfitMachines Report Automation - Vercel API -&gt; Google Apps Script -&gt; Gmail
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends a notification email via Resend if RESEND_API_KEY is configured.
 * Does not block if unconfigured since Google Apps Script already dispatches digest emails.
 */
export async function sendEmailNotification(
  type: ReportType,
  now: string,
  jiraKey: string | undefined,
  jiraUrl: string | undefined,
  sheetsOk: boolean
): Promise<EmailNotificationResult> {
  if (!RESEND_API_KEY.startsWith("re_")) {
    return {
      sent: false,
      note: "Resend skipped - Apps Script digest emails still dispatched",
      error: "RESEND_API_KEY not configured — Apps Script email still dispatched.",
    };
  }

  const label =
    type === "all" ? "Daily + Weekly + Monthly" : type.charAt(0).toUpperCase() + type.slice(1);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ProfitMachines Reports <onboarding@resend.dev>",
        to: [TEAM_EMAIL],
        subject: `[${label} Report] ProfitMachines Automation Complete - ${now.slice(0, 10)}`,
        html: buildNotificationHtml(type, now, jiraKey, jiraUrl, sheetsOk),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      return {
        sent: true,
        id: (data as Record<string, unknown>).id as string | undefined,
        note: `Resend notification sent to ${TEAM_EMAIL}`,
      };
    }
    return {
      sent: false,
      error: `Resend ${res.status}: ${JSON.stringify(data).slice(0, 200)}`,
      note: "Resend failed — Apps Script digest emails still dispatched",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      sent: false,
      error: `Resend fetch error: ${msg}`,
      note: "Resend error — Apps Script digest emails still dispatched",
    };
  }
}
