/**
 * src/services/jirService.ts
 * Jira Integration Service (JIR) for ProfitMachines Automated Reporting
 *
 * Responsibilities:
 * - Create or idempotently update Jira Cloud issues for DAY, WEK, and MON reports
 * - Prevent duplicate issues for the same report period using JQL search
 * - Format structured Jira Atlassian Document Format (ADF) description
 * - Include metrics, summary, Google Sheets links, and execution timestamp
 */

import type { GshReportData, ReportInterval } from './gshService.ts';

export interface JirServiceResult {
  ok: boolean;
  key?: string;
  url?: string;
  updated?: boolean;
  error?: string;
}

const JIRA_HOST = process.env.JIRA_HOST || 'trustworkz.atlassian.net';
const JIRA_EMAIL = process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com';
const JIRA_API_TOKEN = (process.env.JIRA_API_TOKEN || '').trim();
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY || 'PROF';
const JIRA_TASK_ISSUE_TYPE = process.env.JIRA_TASK_ISSUE_TYPE || 'Task';

export class JirService {
  /**
   * Creates or idempotently updates a Jira issue for the given report data.
   */
  public static async createOrUpdateReportIssue(
    interval: ReportInterval,
    reportData: GshReportData
  ): Promise<JirServiceResult> {
    if (!JIRA_API_TOKEN) {
      console.warn('[JirService] JIRA_API_TOKEN not configured. Skipping Jira issue creation.');
      return {
        ok: false,
        error: 'JIRA_API_TOKEN is not configured in environment variables.',
      };
    }

    const intervalTag = interval; // DAY, WEK, MON
    const periodLabel = reportData.period.formattedPeriod;
    const summary = `[ProfitMachines ${intervalTag}] Executive Intelligence Report — ${periodLabel}`;

    const apiBase = `https://${JIRA_HOST}/rest/api/3`;
    const authHeader = 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

    const descAdf = JirService.buildAdfDocument(interval, reportData);

    // 1. Search for existing task created for this interval and period (Idempotency)
    try {
      // JQL query for exact project and summary tag
      const jql = `project = "${JIRA_PROJECT_KEY}" AND summary ~ "${intervalTag}" AND summary ~ "${reportData.period.formattedPeriod.split(' ')[0]}" ORDER BY created DESC`;
      const searchRes = await fetch(
        `${apiBase}/search/jql?jql=${encodeURIComponent(jql)}&fields=key,summary&maxResults=1`,
        {
          headers: {
            Authorization: authHeader,
            Accept: 'application/json',
          },
        }
      );

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData?.issues?.length > 0 && searchData.issues[0]?.key) {
          const existingKey: string = searchData.issues[0].key;
          console.log(`[JirService] Found existing task ${existingKey} for ${intervalTag} report. Updating...`);

          const updateRes = await fetch(`${apiBase}/issue/${existingKey}`, {
            method: 'PUT',
            headers: {
              Authorization: authHeader,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fields: {
                description: descAdf,
              },
            }),
          });

          if (updateRes.ok || updateRes.status === 204) {
            return {
              ok: true,
              key: existingKey,
              url: `https://${JIRA_HOST}/browse/${existingKey}`,
              updated: true,
            };
          }
        }
      }
    } catch (searchErr) {
      console.warn('[JirService] Jira search check failed, proceeding to creation:', searchErr);
    }

    // 2. Create new Jira Issue
    try {
      const payload = {
        fields: {
          project: { key: JIRA_PROJECT_KEY },
          summary,
          description: descAdf,
          issuetype: { name: JIRA_TASK_ISSUE_TYPE },
          labels: [
            'profitmachines',
            'automated-report',
            `${interval.toLowerCase()}-report`,
            'executive-intelligence',
          ],
        },
      };

      const createRes = await fetch(`${apiBase}/issue`, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (createRes.ok) {
        const createData = await createRes.json();
        console.log(`[JirService] Successfully created Jira task: ${createData.key}`);
        return {
          ok: true,
          key: createData.key,
          url: `https://${JIRA_HOST}/browse/${createData.key}`,
          updated: false,
        };
      }

      const errText = await createRes.text();
      console.error(`[JirService] Jira creation failed (${createRes.status}):`, errText);
      return {
        ok: false,
        error: `Jira API error (${createRes.status}): ${errText.slice(0, 300)}`,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[JirService] Jira network exception:', msg);
      return {
        ok: false,
        error: `Jira request failure: ${msg}`,
      };
    }
  }

  /**
   * Constructs Atlassian Document Format (ADF) description.
   */
  private static buildAdfDocument(interval: ReportInterval, data: GshReportData) {
    const m = data.metrics;
    const p = data.period;

    const listItem = (label: string, value: string) => ({
      type: 'listItem',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: `${label}: `, marks: [{ type: 'strong' }] },
            { type: 'text', text: value },
          ],
        },
      ],
    });

    return {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [
            { type: 'text', text: `ProfitMachines — ${p.intervalName}` },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `Automated intelligence report generated for the period ${p.formattedPeriod} (Timezone: ${p.timezone}). Processing Status: SUCCESS.`,
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Executive Performance Summary' }],
        },
        {
          type: 'bulletList',
          content: data.executiveSummary.map(bullet => ({
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: bullet }] }],
          })),
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Core Telemetry & Pipeline Metrics' }],
        },
        {
          type: 'bulletList',
          content: [
            listItem('Total Site Visitors', m.totalVisitors.toLocaleString()),
            listItem('Unique Visitors', m.uniqueVisitors.toLocaleString()),
            listItem('Total Pageviews', m.totalPageviews.toLocaleString()),
            listItem('Avg Session Duration', `${Math.floor(m.avgSessionSeconds / 60)}m ${m.avgSessionSeconds % 60}s`),
            listItem('Bounce Rate', `${m.bounceRatePct}%`),
            listItem('Total Inbound Leads', `${m.totalLeads} qualified`),
            listItem('Consultation Bookings', `${m.consultationBookings} booked`),
            listItem('Quick Form Inquiries', `${m.quickInquiries}`),
            listItem('Profit Pool Audits', `${m.auditRequests}`),
            listItem('AI Chatbot Inquiries', `${m.chatbotConversations}`),
            listItem('Overall Conversion Rate', `${m.conversionRatePct}%`),
          ],
        },
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Google Spreadsheets & Data Sources' }],
        },
        {
          type: 'bulletList',
          content: [
            listItem('Main Data Collection Sheet', data.spreadsheetLinks.primaryDataCollection),
            listItem('Executive Dashboards (16 Tabs)', data.spreadsheetLinks.executiveDashboards),
            listItem('Telemetry Verification', data.dataSource.status),
            listItem('Generated At', p.referenceTimestamp),
          ],
        },
      ],
    };
  }
}
