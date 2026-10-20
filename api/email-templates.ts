/**
 * api/email-templates.ts
 *
 * Vercel Server-Side Endpoint for ProfitMachines Email Templates:
 * - GET: List available templates, inspect template details, live HTML preview, or generate test-suite results
 * - POST: Generate customized email (using Cohere if available) or safely dispatch to TEST_EMAIL_RECIPIENT
 *
 * Query params (GET):
 * - ?action=list -> returns metadata for all 65 templates
 * - ?action=preview&templateId=saas-new-lead-followup -> returns rendered HTML preview
 * - ?action=test-suite -> dry-run evaluation of all 48 combinations (no emails sent)
 * - ?action=test-status -> dry-run or dispatch status for all 8 industries
 *
 * Body (POST):
 * - { action: 'generate-only', templateId?: string, industry?: string, engagementType?: string, personalization?: {...} }
 *   -> Generates copy with Cohere / static fallback, renders HTML & text, returns payload WITHOUT sending any email!
 * - { action: 'test-eight', confirmSend: true, recipient?: string }
 *   -> Triggers the 8 industry test emails to verified recipient only when confirmSend is true
 * - { action: 'send-single', templateId: string, recipient?: string, confirmSend: true }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  allEmailTemplates,
  getTemplate,
  getTemplateById,
  getEightIndustryCampaignTemplates,
  getAllFortyEightCombinations,
  EmailTemplateRenderer,
  CohereEmailService,
  BUSINESS_CONFIG,
  INDUSTRY_IMAGE_MAP,
  getVerifiedDestinationUrl,
  type EmailPersonalization,
  type IndustryId,
  type EngagementType,
} from './_lib/email-templates';
import { EmailDispatchService } from './_lib/email-dispatch-service';
import { SecurityController } from './_lib/security.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    SecurityController.applySecurityHeaders(res);
    return res.status(200).end();
  }

  const testRecipient = (
    process.env.TEST_EMAIL_RECIPIENT ||
    process.env.TEAM_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    process.env.GMAIL_USER ||
    'asmitha.int2027g3@gmail.com'
  ).trim();

  // ─────────────────────────────────────────────────────────────
  // GET: Inspection, List, and Preview (Public / Diagnostic)
  // ─────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const isPublicAllowed = await SecurityController.enforcePublic(req, res, {
      allowedMethods: ['GET'],
      rateLimit: { windowMs: 60000, max: 60 },
      actionName: 'email-templates:get',
    });
    if (!isPublicAllowed) return;

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
        businessConfig: {
          companyName: BUSINESS_CONFIG.companyName,
          phone: BUSINESS_CONFIG.phone,
          contactEmail: BUSINESS_CONFIG.contactEmail,
          siteUrl: BUSINESS_CONFIG.siteUrl,
          brandTheme: 'emerald-green',
        },
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
      const templateId = (req.query.templateId as string) || 'saas-new-lead-followup';
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

    // 3. Dry-run test of all 48 industry-and-engagement combinations (NO EMAILS SENT)
    if (action === 'test-suite') {
      const combinations = getAllFortyEightCombinations();
      const testReport = combinations.map(t => {
        const destUrl = getVerifiedDestinationUrl(t.industry, t.engagementType);
        const imageInfo = INDUSTRY_IMAGE_MAP[t.industry];
        const personalization: EmailPersonalization = {
          recipientName: 'Test Recipient',
          companyName: 'Evaluation Corp',
          jobTitle: 'Director',
        };
        const html = EmailTemplateRenderer.renderHtml(t, personalization);
        const text = EmailTemplateRenderer.renderPlainText(t, personalization);

        return {
          id: t.id,
          name: t.name,
          industry: t.industry,
          industryLabel: t.industryLabel,
          engagementType: t.engagementType,
          engagementLabel: t.engagementLabel,
          defaultSubject: t.defaultSubject,
          preheader: t.preheader,
          heroImage: imageInfo.url,
          heroImageAlt: imageInfo.alt,
          destinationUrl: destUrl,
          primaryCtaLabel: t.primaryCta.label,
          senderName: t.closing.senderName,
          senderTitle: t.closing.senderTitle,
          htmlLengthBytes: html.length,
          textLengthBytes: text.length,
          hasBrandHeader: html.includes('PROFIT') && html.includes('MACHINES'),
          hasEmeraldButton: html.includes('#059669'),
          hasVerifiedPhone: html.includes(BUSINESS_CONFIG.phone),
          hasVerifiedEmail: html.includes(BUSINESS_CONFIG.contactEmail),
          passed: Boolean(
            t.id &&
            t.defaultSubject &&
            t.preheader &&
            imageInfo.url &&
            destUrl &&
            html.includes('#059669') &&
            html.includes(BUSINESS_CONFIG.phone) &&
            html.includes(BUSINESS_CONFIG.contactEmail)
          ),
        };
      });

      const totalPassed = testReport.filter(r => r.passed).length;
      return res.status(200).json({
        totalCombinations: combinations.length,
        totalPassed,
        totalFailed: combinations.length - totalPassed,
        allPassed: totalPassed === combinations.length,
        businessConfig: {
          phone: BUSINESS_CONFIG.phone,
          contactEmail: BUSINESS_CONFIG.contactEmail,
          siteUrl: BUSINESS_CONFIG.siteUrl,
          brandTheme: 'emerald-green (#059669)',
        },
        results: testReport,
      });
    }

    // 4. Status of the 8 Industry Campaign Tests
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
          heroImage: INDUSTRY_IMAGE_MAP[t.industry]?.url || t.heroImage,
        })),
      });
    }

    // 5. Lead notification diagnostic
    if (action === 'notify-lead' || action === 'notify-diagnostic') {
      const targetRecipient = (process.env.TEAM_NOTIFICATION_EMAIL || 'asmitha.int2027g3@gmail.com').trim();
      return res.status(200).json({
        status: 'READY',
        targetRecipient,
        smtpConfigured: Boolean(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD),
        resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')),
        message: 'Lead notification dispatcher active in consolidated email endpoint.',
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
      industry?: string;
      engagementType?: string;
      confirmSend?: boolean;
      recipient?: string;
      promptInstruction?: string;
      personalization?: EmailPersonalization;
    };

    const action = body.action || 'generate-only';

    // ─────────────────────────────────────────────────────────────
    // POST Action 1: Generate Content & Render (SAFE: NEVER SENDS EMAIL)
    // ─────────────────────────────────────────────────────────────
    if (action === 'generate-only' || action === 'preview-generate') {
      let template;
      if (body.templateId) {
        template = getTemplateById(body.templateId);
      } else if (body.industry && body.engagementType) {
        template = getTemplate(body.industry, body.engagementType);
      } else {
        template = getTemplateById('saas-new-lead-followup');
      }

      const personalization: EmailPersonalization = body.personalization || {
        recipientName: 'Valued Partner',
        companyName: 'Enterprise Partner',
        jobTitle: 'Executive Leader',
      };

      const { content, source } = await CohereEmailService.generateContent(
        template,
        personalization,
        body.promptInstruction
      );

      const html = EmailTemplateRenderer.renderHtml(template, personalization, content);
      const text = EmailTemplateRenderer.renderPlainText(template, personalization, content);
      const verifiedDest = getVerifiedDestinationUrl(template.industry, template.engagementType);

      return res.status(200).json({
        success: true,
        templateId: template.id,
        industry: template.industryLabel,
        engagementType: template.engagementLabel,
        contentSource: source,
        verifiedDestinationUrl: verifiedDest,
        heroImage: INDUSTRY_IMAGE_MAP[template.industry]?.url || template.heroImage,
        heroImageAlt: INDUSTRY_IMAGE_MAP[template.industry]?.alt || template.heroImageAlt,
        content: {
          subject: content.subject,
          preheader: content.preheader,
          headline: content.headline,
          introduction: content.introduction,
          sections: content.sections,
          ctaLabel: content.ctaLabel || template.primaryCta.label,
        },
        renderedHtml: html,
        plainText: text,
        sent: false,
        note: 'Content generated successfully. No email was dispatched.',
      });
    }

    // ─────────────────────────────────────────────────────────────
    // POST Action 2: Send 8 Industry Test Emails (Requires confirmSend: true)
    // ─────────────────────────────────────────────────────────────
    if (action === 'test-eight') {
      const isAuthorized = await SecurityController.enforcePrivate(req, res, {
        allowedMethods: ['POST'],
        requiredScope: 'admin:email',
        actionName: 'email:test-eight',
      });
      if (!isAuthorized) return;

      if (!body.confirmSend) {
        return res.status(400).json({
          error: 'Explicit confirmation required. Please set confirmSend: true to authorize test delivery.',
        });
      }

      const recipient = (body.recipient || testRecipient).trim();
      if (!recipient || !recipient.includes('@')) {
        return res.status(400).json({
          success: false,
          error: 'TEST_EMAIL_RECIPIENT is missing or invalid.',
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
          companyName: 'ProfitMachines Partner',
          jobTitle: 'Executive Leader',
          ...body.personalization,
        };

        const { content, source } = await CohereEmailService.generateContent(
          t,
          personalization,
          body.promptInstruction
        );
        const html = EmailTemplateRenderer.renderHtml(t, personalization, content);
        const text = EmailTemplateRenderer.renderPlainText(t, personalization, content);

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

      return res.status(200).json({
        success: results.every(r => r.accepted),
        totalSent: results.filter(r => r.accepted).length,
        totalFailed: results.filter(r => !r.accepted).length,
        recipient,
        individualResults: results,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // POST Action 3: Send Single Template (Requires confirmSend: true)
    // ─────────────────────────────────────────────────────────────
    if (action === 'send-single') {
      const isAuthorized = await SecurityController.enforcePrivate(req, res, {
        allowedMethods: ['POST'],
        requiredScope: 'admin:email',
        actionName: 'email:send-single',
      });
      if (!isAuthorized) return;

      if (!body.confirmSend) {
        return res.status(400).json({
          error: 'Explicit confirmation required. Please set confirmSend: true to authorize test delivery.',
        });
      }

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

    // ─────────────────────────────────────────────────────────────
    // POST Action 4: Inbound Lead Notification (Public Website Form Alert)
    // ─────────────────────────────────────────────────────────────
    if (action === 'notify-lead') {
      const isPublicAllowed = await SecurityController.enforcePublic(req, res, {
        allowedMethods: ['POST'],
        enableHoneypot: true,
        validateEmail: true,
        actionName: 'email:notify-lead',
      });
      if (!isPublicAllowed) return;

      const { leadType, fields } = body as any;
      if (!fields) {
        return res.status(400).json({ error: 'Missing lead fields payload' });
      }

      const fullName = fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`.trim() || 'Prospect';
      const company = fields.company ? ` (${fields.company})` : '';
      const targetRecipient = (process.env.TEAM_NOTIFICATION_EMAIL || 'asmitha.int2027g3@gmail.com').trim();
      const subject = `🚀 [New Lead Alert] ${leadType || 'Inquiry'} - ${fullName}${company}`;

      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #064e3b; padding: 24px; color: #ffffff;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700;">New ProfitMachines Lead Alert</h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Type: <strong>${leadType || 'Quick Inquiry'}</strong></p>
            </div>
            <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569; width: 140px;">Name:</td><td style="color: #0f172a;">${fullName}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Email:</td><td><a href="mailto:${fields.email}" style="color: #059669; text-decoration: none; font-weight: 600;">${fields.email || 'N/A'}</a></td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Phone:</td><td style="color: #0f172a;">${fields.phone || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Company:</td><td style="color: #0f172a;">${fields.company || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Service / Interest:</td><td style="color: #0f172a;">${fields.interest || fields.service || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px 0; font-weight: 600; color: #475569;">Message / Scope:</td><td style="color: #0f172a;">${fields.message || fields.requirement || 'None provided'}</td></tr>
                </table>
            </div>
        </div>
      `;

      const text = `New Lead Alert: ${fullName} (${fields.email || 'N/A'})\nCompany: ${fields.company || 'N/A'}\nMessage: ${fields.message || 'None'}`;

      const dispatchRes = await EmailDispatchService.dispatch({
        to: [targetRecipient],
        subject,
        html,
        text,
      });

      return res.status(200).json({
        success: true,
        emailSent: dispatchRes.sent,
        provider: dispatchRes.provider,
        id: dispatchRes.messageId,
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
