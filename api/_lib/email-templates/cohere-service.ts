/**
 * api/_lib/email-templates/cohere-service.ts
 *
 * Secure server-side Cohere integration for industry email content generation.
 * Generates subject lines, preheaders, headlines, industry-specific content,
 * engagement-specific angles, and professional closings.
 *
 * Enforces strict enterprise business logic:
 * - Application controls approved URLs, hero images, contact numbers, and footers (Cohere NEVER invents them)
 * - Strict JSON schema output with runtime validation
 * - Graceful fallback to verified static templates if API key is unset or Cohere errors/timeouts
 * - Never leaks private keys to client side
 */

import type { EmailTemplateConfig, EmailPersonalization, GeneratedEmailContent } from './types';
import { getVerifiedDestinationUrl, BUSINESS_CONFIG } from './config';

export class CohereEmailService {
  private static readonly COHERE_API_KEY = (process.env.COHERE_API_KEY || '').trim();

  public static isConfigured(): boolean {
    return Boolean(this.COHERE_API_KEY && this.COHERE_API_KEY.length > 10);
  }

  /**
   * Generates or regenerates content for a given template and recipient context.
   */
  public static async generateContent(
    template: EmailTemplateConfig,
    personalization?: EmailPersonalization,
    promptInstruction?: string
  ): Promise<{ content: GeneratedEmailContent; source: 'COHERE_AI' | 'STATIC_FALLBACK' }> {
    if (!this.isConfigured()) {
      return {
        content: this.buildStaticFallback(template, personalization),
        source: 'STATIC_FALLBACK',
      };
    }

    try {
      const recipientName = personalization?.recipientName ? personalization.recipientName.trim() : '';
      const companyName = personalization?.companyName ? personalization.companyName.trim() : '';
      const jobTitle = personalization?.jobTitle ? personalization.jobTitle.trim() : '';
      const notes = personalization?.customNotes ? personalization.customNotes.trim() : '';

      const recipientContext = `
Recipient Name: ${recipientName || 'Valued Executive Leader'}
Company: ${companyName || 'your enterprise'}
Job Title: ${jobTitle || 'Executive'}
Industry: ${template.industryLabel}
Engagement Stage: ${template.engagementLabel}
${notes ? `Expressed Challenges/Notes: ${notes}` : ''}
`;

      const systemPrompt = `You are a senior enterprise revenue strategist and copywriter for ProfitMachines (${BUSINESS_CONFIG.siteUrl}).
ProfitMachines builds autonomous B2B revenue infrastructure, multi-agent SDR pipeline automation, dark-funnel intent telemetry (DemandPulse AI), and margin expansion systems.

STRICT INSTRUCTIONS:
1. Do NOT invent customer case studies, unverified statistics, fake testimonials, or false product claims.
2. Maintain an executive, clear, credible, and consultative tone.
3. Keep the content deeply relevant to ${template.industryLabel} and the ${template.engagementLabel} engagement phase.
4. Output MUST be valid JSON only. Do NOT include markdown code blocks or conversational text.
5. Exact JSON schema:
{
  "subjectOptions": ["Option 1", "Option 2", "Option 3"],
  "selectedSubject": "Primary compelling subject line",
  "preheader": "1-sentence executive inbox snippet",
  "headline": "Compelling value-driven headline",
  "introduction": "2-3 sentences addressing the recipient and their industry context",
  "sections": [
    {
      "heading": "Section 1 Heading",
      "body": "Paragraph explaining specific pain points or opportunities",
      "bulletPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
      "calloutBox": {
        "title": "Callout Title",
        "text": "Key strategic insight",
        "metric": "Key benchmark or metric"
      }
    },
    {
      "heading": "Section 2 Heading",
      "body": "Clear operational next steps and how ProfitMachines solves this"
    }
  ],
  "ctaLabel": "Action-oriented CTA button label"
}`;

      const userPrompt = `Generate customized executive email copy for:
${recipientContext}
Base Template Title: ${template.name}
Default Subject: ${template.defaultSubject}
Default Headline: ${template.headline}
Default Intro: ${template.introduction}
${promptInstruction ? `Additional Prompt: ${promptInstruction}` : ''}

Ensure natural phrasing without repetitive AI buzzwords.`;

      // Timeout guard of 9 seconds to stay well within Vercel serverless execution limits
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const response = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${systemPrompt}\n\n${userPrompt}`,
          model: 'command-r-plus',
          temperature: 0.3,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.warn('[CohereEmailService] Cohere API error, falling back to static:', errText);
        return {
          content: this.buildStaticFallback(template, personalization),
          source: 'STATIC_FALLBACK',
        };
      }

      const json = await response.json();
      const rawText = json.text || json.message?.content?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      // Validate required fields
      if (!parsed.headline || !parsed.introduction) {
        throw new Error('Incomplete response structure from Cohere');
      }

      const generated: GeneratedEmailContent = {
        subject: parsed.selectedSubject || parsed.subjectOptions?.[0] || template.defaultSubject,
        preheader: parsed.preheader || template.preheader,
        headline: parsed.headline || template.headline,
        introduction: parsed.introduction || template.introduction,
        sections: Array.isArray(parsed.sections) && parsed.sections.length > 0 ? parsed.sections : template.sections,
        ctaLabel: parsed.ctaLabel || template.primaryCta.label,
      };

      return {
        content: generated,
        source: 'COHERE_AI',
      };
    } catch (err) {
      console.warn('[CohereEmailService] Failed to generate with Cohere, using verified static fallback:', err);
      return {
        content: this.buildStaticFallback(template, personalization),
        source: 'STATIC_FALLBACK',
      };
    }
  }

  public static buildStaticFallback(
    template: EmailTemplateConfig,
    personalization?: EmailPersonalization
  ): GeneratedEmailContent {
    return {
      subject: template.defaultSubject,
      preheader: template.preheader,
      headline: template.headline,
      introduction: template.introduction,
      sections: template.sections,
      ctaLabel: template.primaryCta.label,
    };
  }
}
