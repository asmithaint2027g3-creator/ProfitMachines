import type { ReportType } from "./report-validation.ts";
import { triggerGoogleSheetReport, type SheetsReportResult } from "./report-sheets-service.ts";
import { createOrUpdateJiraReportTask, type JiraReportResult } from "./report-jira-service.ts";
import { sendEmailNotification, type EmailNotificationResult } from "./report-email-service.ts";

export interface PipelineExecutionResult {
  now: string;
  type: ReportType;
  sheetsResult: SheetsReportResult;
  jiraResult: JiraReportResult;
  emailResult: EmailNotificationResult;
  errors: string[];
}

/**
 * Executes the complete report automation pipeline:
 *  1. Trigger Google Sheets / Apps Script calculation and digest
 *  2. Create or idempotently update Jira Task
 *  3. Dispatch notification email
 */
export async function executeReportPipeline(type: ReportType): Promise<PipelineExecutionResult> {
  const now = new Date().toISOString();
  const errors: string[] = [];

  console.log(`[report-service] Step 1 - Triggering Apps Script for ${type} report...`);
  const sheetsResult = await triggerGoogleSheetReport(type);
  if (!sheetsResult.ok) {
    errors.push(`Sheets: ${sheetsResult.message}`);
  }

  console.log("[report-service] Step 2 - Creating/updating Jira report task...");
  const jiraResult = await createOrUpdateJiraReportTask(type, now);
  if (jiraResult.error) {
    errors.push(`Jira: ${jiraResult.error}`);
  }

  console.log("[report-service] Step 3 - Sending email notification...");
  const emailResult = await sendEmailNotification(
    type,
    now,
    jiraResult.key,
    jiraResult.url,
    sheetsResult.ok
  );
  if (!emailResult.sent && emailResult.error) {
    console.warn(`[report-service] Notification warning: ${emailResult.error}`);
  }

  return {
    now,
    type,
    sheetsResult,
    jiraResult,
    emailResult,
    errors,
  };
}
