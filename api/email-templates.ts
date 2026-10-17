/**
 * api/email-templates.ts
 *
 * Vercel Server-Side Endpoint for ProfitMachines Email Templates:
 * - GET: List available templates, inspect template details, or generate HTML preview
 * - POST: Generate customized email (using Cohere if available) and dispatch to TEST_EMAIL_RECIPIENT
 *
 * Query params (GET):
 * - ?action=list -> returns metadata for all 65 templates
 * - ?action=preview&templateId=saas-industry-campaign -> returns rendered HTML preview
 * - ?action=test-all -> dry-run or dispatch status for all 8 industries
 *
 * Body (POST):
 * - { action: 'test-eight', confirmSend?: boolean } -> triggers the 8 industry test emails to TEST_EMAIL_RECIPIENT
 * - { action: 'send-single', templateId: string, recipient?: string }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  allEmailTemplates,
  getTemplate,
  getTemplateById,
  getEightIndustryCampaignTemplates,
  EmailTemplateRenderer,
  CohereEmailService,
  type EmailPersonalization,
} from './_lib/email-templates';
import { EmailDispatchService } from './_lib/email-dispatch-service';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const testRecipient = (
    process.env.TEST_EMAIL_RECIPIENT ||
    process.env.TEAM_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    process.env.GMAIL_USER ||
    ''
  ).trim();

  // ─────────────────────────────────────────────────────────────
  // GET: Inspection, List, and Preview
  // ─────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const action = (req.query.action as string) || 'list';

    // 1. List all templates
    if (action === 'list') {
      return res.status(200).json({
        totalTemplates: allEmailTemplates.length,
        breakdown: {
          distinctIndustryAndEngagement: 48,
          industryWelcomeTemplates: 8,
          industryCampaignTemplates: 8,
          generalFallback: 1,
        },
        cohereConfigured: CohereEmailService.isConfigured(),
        testRecipientConfigured: Boolean(testRecipient),
        testRecipient: testRecipient ? `${testRecipient.slice(0, 3)}***@${testRecipient.split('@')[1] || ''}` : 'NOT_SET',
        templates: allEmailTemplates.map(t => ({
          id: t.id,
          name: t.name,
          industry: t.industry,
          industryLabel: t.industryLabel,
          engagementType: t.engagementType,
          engagementLabel: t.engagementLabel,
          defaultSubject: t.defaultSubject,
          heroImage: t.heroImage,
          ctaUrl: t.primaryCta.url,
        })),
      });
    }

    // 2. Render live HTML preview
    if (action === 'preview') {
      const templateId = (req.query.templateId as string) || 'saas-industry-campaign';
      const template = getTemplateById(templateId);
      const personalization: EmailPersonalization = {
        recipientName: (req.query.name as string) || 'Alex Mercer',
        companyName: (req.query.company as string) || 'Acme Cloud Technologies',
        jobTitle: (req.query.title as string) || 'VP of Revenue',
      };

      const html = EmailTemplateRenderer.renderHtml(template, personalization);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }

    // 3. Status of the 8 Industry Campaign Tests
    if (action === 'test-status' || action === 'test-eight') {
      const eightTemplates = getEightIndustryCampaignTemplates();
      return res.status(200).json({
        message: '8 Industry Campaign Test Templates Ready',
        testRecipient: testRecipient || 'MISSING (Set TEST_EMAIL_RECIPIENT or GMAIL_USER)',
        cohereStatus: CohereEmailService.isConfigured() ? 'CONFIGURED' : 'STATIC_FALLBACK_ACTIVE',
        smtpStatus: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD ? 'CONFIGURED' : 'CREDENTIALS_MISSING',
        industries: eightTemplates.map(t => ({
          industry: t.industry,
          industryLabel: t.industryLabel,
          templateId: t.id,
          subject: t.defaultSubject,
          heroImage: t.heroImage,
        })),
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  // ─────────────────────────────────────────────────────────────
  // POST: Execution & Sending
  // ─────────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = (req.body || {}) as {
      action?: string;
      templateId?: string;
      confirmSend?: boolean;
      recipient?: string;
      promptInstruction?: string;
      personalization?: EmailPersonalization;
    };

    const action = body.action || 'test-eight';

    // Execution: Send 8 Industry Test Emails
    if (action === 'test-eight') {
      const recipient = (body.recipient || testRecipient).trim();

      if (!recipient || !recipient.includes('@')) {
        return res.status(400).json({
          success: false,
          error: 'TEST_EMAIL_RECIPIENT is missing or invalid. Configure TEST_EMAIL_RECIPIENT or supply a valid email in request body.',
          eightDraftsPrepared: true,
          industryTemplates: getEightIndustryCampaignTemplates().map(t => ({
            industry: t.industryLabel,
            subject: t.defaultSubject,
            templateId: t.id,
          })),
        });
      }

      const hasSmtp = Boolean(
        (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD) &&
        (process.env.SMTP_USER || process.env.GMAIL_USER)
      );
      const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_'));
      const hasGoogleScript = Boolean(process.env.GOOGLE_SCRIPT_URL);

      if (!hasSmtp && !hasResend && !hasGoogleScript) {
        return res.status(400).json({
          success: false,
          error: 'Email delivery credentials are missing. Configure GMAIL_USER and GMAIL_APP_PASSWORD in environment.',
          recipient,
          industryDraftsPrepared: getEightIndustryCampaignTemplates().map(t => ({
            industry: t.industryLabel,
            subject: t.defaultSubject,
            templateId: t.id,
          })),
        });
      }

      const eightTemplates = getEightIndustryCampaignTemplates();
      const results: Array<{
        industry: string;
        templateId: string;
        subject: string;
        recipient: string;
        accepted: boolean;
        provider?: string;
        messageId?: string;
        contentSource: 'COHERE_AI' | 'STATIC_FALLBACK';
        error?: string;
      }> = [];

      for (const t of eightTemplates) {
        const personalization: EmailPersonalization = {
          recipientName: 'Valued Partner',
          companyName: 'Your Enterprise',
          jobTitle: 'Executive Leader',
          ...body.personalization,
        };

        // 1. Generate or load content (Cohere if available, otherwise high-grade static fallback)
        const { content, source } = await CohereEmailService.generateContent(t, personalization, body.promptInstruction);

        // 2. Render HTML & Plain text
        const html = EmailTemplateRenderer.renderHtml(t, personalization, content);
        const text = EmailTemplateRenderer.renderPlainText(t, personalization, content);

        // 3. Dispatch to TEST_EMAIL_RECIPIENT only
        try {
          const dispatchRes = await EmailDispatchService.dispatch({
            to: [recipient],
            subject: content.subject || t.defaultSubject,
            html,
            text,
          });

          results.push({
            industry: t.industryLabel,
            templateId: t.id,
            subject: content.subject || t.defaultSubject,
            recipient,
            accepted: dispatchRes.sent,
            provider: dispatchRes.provider,
            messageId: dispatchRes.messageId,
            contentSource: source,
            error: dispatchRes.error,
          });
        } catch (dispatchErr: any) {
          results.push({
            industry: t.industryLabel,
            templateId: t.id,
            subject: content.subject || t.defaultSubject,
            recipient,
            accepted: false,
            contentSource: source,
            error: dispatchErr?.message || String(dispatchErr),
          });
        }
      }

      const allAccepted = results.every(r => r.accepted);
      return res.status(200).json({
        success: allAccepted,
        totalSent: results.filter(r => r.accepted).length,
        totalFailed: results.filter(r => !r.accepted).length,
        recipient,
        individualResults: results,
      });
    }

    // Execution: Send Single Template
    if (action === 'send-single') {
      const templateId = body.templateId || 'saas-new-lead-followup';
      const template = getTemplateById(templateId);
      const recipient = (body.recipient || testRecipient).trim();

      if (!recipient || !recipient.includes('@')) {
        return res.status(400).json({ error: 'Valid recipient is required.' });
      }

      const personalization: EmailPersonalization = body.personalization || {};
      const { content, source } = await CohereEmailService.generateContent(template, personalization);
      const html = EmailTemplateRenderer.renderHtml(template, personalization, content);
      const text = EmailTemplateRenderer.renderPlainText(template, personalization, content);

      const dispatchRes = await EmailDispatchService.dispatch({
        to: [recipient],
        subject: content.subject || template.defaultSubject,
        html,
        text,
      });

      return res.status(200).json({
        success: dispatchRes.sent,
        templateId: template.id,
        subject: content.subject || template.defaultSubject,
        recipient,
        provider: dispatchRes.provider,
        messageId: dispatchRes.messageId,
        contentSource: source,
        error: dispatchRes.error,
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
