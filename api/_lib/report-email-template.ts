/**
 * api/_lib/report-email-template.ts
 * Responsive, Emerald-Green Executive HTML Email Template for ProfitMachines
 * Strict requirement:
 * - Brand identity with emerald-green header (#059669 / #10b981 / #064e3b), clean typography, white background.
 * - Table & card-based layouts compatible with Gmail, Apple Mail, Outlook, mobile.
 * - Safe HTML escaping for dynamic text.
 * - Plain-text fallback alternative.
 * - No dependency on JavaScript or external fonts.
 */

import type { CollectedReportData } from './report-data-collector';

export class ReportEmailTemplate {
  public static escape(text: unknown): string {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  public static buildSubject(data: CollectedReportData): string {
    if (data.periodType === 'daily') {
      return `[ProfitMachines] Daily Performance Report — ${data.periodLabel}`;
    }
    if (data.periodType === 'weekly') {
      return `[ProfitMachines] Weekly Performance Report — ${data.periodLabel}`;
    }
    return `[ProfitMachines] Monthly Performance Report — ${data.periodLabel}`;
  }

  public static buildPlainText(data: CollectedReportData): string {
    const esc = (t: string) => t;
    const title = ReportEmailTemplate.buildSubject(data);

    let txt = `=================================================================\n`;
    txt += `${title}\n`;
    txt += `Generated: ${data.generationTimestampIst} (Asia/Kolkata)\n`;
    txt += `=================================================================\n\n`;

    txt += `EXECUTIVE SUMMARY\n`;
    txt += `-----------------------------------------------------------------\n`;
    data.executiveSummary.forEach((s) => {
      txt += `• ${s}\n`;
    });
    txt += `\n`;

    txt += `WEBSITE TRAFFIC & AUDIENCE\n`;
    txt += `-----------------------------------------------------------------\n`;
    txt += `• Total Visitors: ${data.telemetry.totalVisitors.toLocaleString()}\n`;
    txt += `• Unique Visitors: ${data.telemetry.uniqueVisitors.toLocaleString()}\n`;
    txt += `• Pageviews: ${data.telemetry.totalPageviews.toLocaleString()}\n`;
    txt += `• Avg Session Duration: ${Math.floor(data.telemetry.avgSessionSeconds / 60)}m ${data.telemetry.avgSessionSeconds % 60}s\n`;
    txt += `• Bounce Rate: ${data.telemetry.bounceRatePct}%\n\n`;

    txt += `INBOUND LEAD GENERATION & PIPELINE (JIRA + AIRTABLE)\n`;
    txt += `-----------------------------------------------------------------\n`;
    txt += `• Jira Inbound Lead Tasks Created: ${data.jira.leadsCreatedInPeriod}\n`;
    txt += `• Total Jira Project Issues Logged: ${data.jira.totalIssuesInPeriod}\n`;
    txt += `• Airtable CRM Records in Period: ${data.airtable.totalLeadsInPeriod}\n\n`;

    if (Object.keys(data.jira.leadTypesBreakdown).length > 0) {
      txt += `Lead Breakdown by Source:\n`;
      for (const [t, c] of Object.entries(data.jira.leadTypesBreakdown)) {
        txt += `  - ${t}: ${c}\n`;
      }
      txt += `\n`;
    }

    txt += `TOP PERFORMING PAGES\n`;
    txt += `-----------------------------------------------------------------\n`;
    data.telemetry.topPages.forEach((p) => {
      txt += `• ${p.path} (${p.count} views)\n`;
    });
    txt += `\n`;

    txt += `KEY OBSERVATIONS\n`;
    txt += `-----------------------------------------------------------------\n`;
    data.keyObservations.forEach((o) => {
      txt += `• ${o}\n`;
    });
    txt += `\n`;

    txt += `RECOMMENDED ACTIONS\n`;
    txt += `-----------------------------------------------------------------\n`;
    data.recommendedActions.forEach((a) => {
      txt += `• ${a}\n`;
    });
    txt += `\n`;

    txt += `DATA-SOURCE LIMITATIONS & STATUS\n`;
    txt += `-----------------------------------------------------------------\n`;
    txt += `• Jira Connection: ${data.jira.connectionStatus}\n`;
    txt += `• Airtable Connection: ${data.airtable.connectionStatus}\n`;
    data.dataSourceLimitations.forEach((l) => {
      txt += `• ${l}\n`;
    });
    txt += `\n=================================================================\n`;
    txt += `ProfitMachines Autonomous Performance Intelligence Engine\n`;
    return txt;
  }

  public static buildHtml(data: CollectedReportData): string {
    const esc = ReportEmailTemplate.escape;
    const title = ReportEmailTemplate.buildSubject(data);

    // Period pill badge
    const badgeText =
      data.periodType === 'daily'
        ? 'Daily Performance Pulse'
        : data.periodType === 'weekly'
        ? 'Weekly Executive Brief'
        : 'Monthly Strategic Dossier';

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    .card { background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
    @media only screen and (max-width: 620px) {
      .responsive-table { width: 100% !important; }
      .stack-column { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9;">
  <!-- Main Container -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 24px 12px 40px 12px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="responsive-table" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #cbd5e1;">

          <!-- 1. Emerald Header Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #064e3b 0%, #059669 100%); padding: 32px 32px 28px 32px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.35); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                      ${esc(badgeText)}
                    </div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; line-height: 1.25; letter-spacing: -0.5px;">
                      PROFITMACHINES
                    </h1>
                    <div style="font-size: 15px; font-weight: 500; color: #d1fae5; margin-top: 6px;">
                      ${esc(data.periodLabel)} &bull; Asia/Kolkata
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Timestamp Subhead -->
          <tr>
            <td style="background-color: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 10px 32px; font-size: 12px; color: #065f46; font-weight: 600;" class="mobile-padding">
              Generated: ${esc(data.generationTimestampIst)} &bull; Automated Jira Scheduler
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 32px;" class="mobile-padding">

              <!-- 2. Executive Summary -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #10b981; padding-bottom: 6px; display: inline-block;">
                      Executive Summary
                    </h2>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px;">
                      <tr>
                        <td>
                          <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 14px; line-height: 1.6;">
                            ${data.executiveSummary.map((item) => `<li style="margin-bottom: 6px;">${esc(item)}</li>`).join('')}
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 3. Key Performance Cards Grid -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #10b981; padding-bottom: 6px; display: inline-block;">
                      Core Pipeline & Traffic Metrics
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <!-- Card 1: Visitors -->
                        <td width="31%" class="stack-column" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; text-align: center;">
                          <div style="font-size: 11px; font-weight: 700; color: #15803d; text-transform: uppercase;">Total Visitors</div>
                          <div style="font-size: 26px; font-weight: 800; color: #14532d; margin: 4px 0;">${data.telemetry.totalVisitors.toLocaleString()}</div>
                          <div style="font-size: 11px; color: #16a34a;">${data.telemetry.uniqueVisitors.toLocaleString()} unique</div>
                        </td>
                        <td width="3%">&nbsp;</td>
                        <!-- Card 2: Pageviews -->
                        <td width="31%" class="stack-column" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; text-align: center;">
                          <div style="font-size: 11px; font-weight: 700; color: #15803d; text-transform: uppercase;">Pageviews</div>
                          <div style="font-size: 26px; font-weight: 800; color: #14532d; margin: 4px 0;">${data.telemetry.totalPageviews.toLocaleString()}</div>
                          <div style="font-size: 11px; color: #16a34a;">Avg: ${Math.floor(data.telemetry.avgSessionSeconds / 60)}m ${data.telemetry.avgSessionSeconds % 60}s</div>
                        </td>
                        <td width="3%">&nbsp;</td>
                        <!-- Card 3: Inbound Leads -->
                        <td width="31%" class="stack-column" style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 14px; text-align: center;">
                          <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase;">Jira Leads</div>
                          <div style="font-size: 26px; font-weight: 800; color: #064e3b; margin: 4px 0;">${data.jira.leadsCreatedInPeriod}</div>
                          <div style="font-size: 11px; color: #059669;">Project: PROF</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 4. Lead Source & Type Breakdown -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #1e293b;">
                      Lead Capture Breakdown
                    </h3>
                    <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; border-collapse: collapse; border: 1px solid #e2e8f0;">
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">
                        <td align="left">Channel / Inbound Type</td>
                        <td align="right">Count / Volume</td>
                        <td align="right">Status in CRM</td>
                      </tr>
                      ${
                        Object.keys(data.jira.leadTypesBreakdown).length > 0
                          ? Object.entries(data.jira.leadTypesBreakdown)
                              .map(
                                ([type, count]) => `
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                          <td style="color: #0f172a; font-weight: 600;">${esc(type)}</td>
                          <td align="right" style="color: #047857; font-weight: 700;">${count}</td>
                          <td align="right" style="color: #64748b;">Synchronized</td>
                        </tr>`
                              )
                              .join('')
                          : `<tr><td colspan="3" style="text-align: center; color: #94a3b8; padding: 14px;">No new inbound lead events recorded in this calendar period.</td></tr>`
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 5. Top Performing Pages -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #1e293b;">
                      Top Converting & Visited Pages
                    </h3>
                    <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; border-collapse: collapse; border: 1px solid #e2e8f0;">
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">
                        <td align="left">Page Path</td>
                        <td align="right">Estimated Views</td>
                      </tr>
                      ${data.telemetry.topPages
                        .map(
                          (p) => `
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                          <td style="color: #1e293b; font-family: monospace;">${esc(p.path)}</td>
                          <td align="right" style="font-weight: 700; color: #047857;">${p.count.toLocaleString()}</td>
                        </tr>`
                        )
                        .join('')}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 6. Jira Cloud Tasks & Airtable CRM Pipeline -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #1e293b;">
                      Jira Cloud Tasks (Project: PROF)
                    </h3>
                    <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 12px; border-collapse: collapse; border: 1px solid #e2e8f0;">
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">
                        <td align="left">Issue Key</td>
                        <td align="left">Summary</td>
                        <td align="right">Status</td>
                      </tr>
                      ${
                        data.jira.recentLeadKeys.length > 0
                          ? data.jira.recentLeadKeys
                              .slice(0, 5)
                              .map(
                                (issue) => `
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                          <td style="font-weight: 700; color: #047857; font-family: monospace;">
                            <a href="https://trustworkz.atlassian.net/browse/${esc(issue.key)}" target="_blank" style="color: #047857; text-decoration: none;">${esc(issue.key)}</a>
                          </td>
                          <td style="color: #334155;">${esc(issue.summary)}</td>
                          <td align="right" style="color: #475569; font-weight: 600;">${esc(issue.status)}</td>
                        </tr>`
                              )
                              .join('')
                          : `<tr><td colspan="3" style="text-align: center; color: #94a3b8; padding: 12px;">No active Jira tickets updated in this window.</td></tr>`
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 7. Key Observations & Recommendations -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td width="48%" class="stack-column" valign="top" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                    <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 8px;">Key Observations</div>
                    <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #475569; line-height: 1.5;">
                      ${data.keyObservations.map((o) => `<li style="margin-bottom: 4px;">${esc(o)}</li>`).join('')}
                    </ul>
                  </td>
                  <td width="4%">&nbsp;</td>
                  <td width="48%" class="stack-column" valign="top" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                    <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 8px;">Recommended Actions</div>
                    <ul style="margin: 0; padding-left: 16px; font-size: 12px; color: #475569; line-height: 1.5;">
                      ${data.recommendedActions.map((a) => `<li style="margin-bottom: 4px;">${esc(a)}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- 8. Data-Source Limitations & Report Verification -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding-top: 14px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Integration Verification & System Health</div>
                    <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
                      &bull; Jira Cloud Space: <strong>Connected (${esc(data.jira.connectionStatus)})</strong> &bull; Airtable Base: <strong>${esc(data.airtable.connectionStatus)}</strong><br />
                      ${data.dataSourceLimitations.map((l) => `&bull; ${esc(l)}`).join('<br />')}
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px 32px; text-align: center;" class="mobile-padding">
              <div style="font-size: 12px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
                PROFITMACHINES ENTERPRISE AI REVENUE INTELLIGENCE
              </div>
              <div style="font-size: 11px; color: #94a3b8;">
                Triggered via Jira Automation Webhook &bull; Hosted on Vercel Edge Infrastructure<br />
                Report Delivery to Authorized Enterprise Recipient: asmitha.int2027g3@gmail.com
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}
