/**
 * api/_lib/email-templates/cohere-service.ts
 *
 * Secure server-side Cohere integration for industry email content generation.
 * Generates subject lines, preheaders, headlines, industry-specific content,
 * engagement-specific angles, and professional closings.
 *
 * Falls back to high-grade static template content when COHERE_API_KEY is not configured.
 */

import type { EmailTemplateConfig, EmailPersonalization, GeneratedEmailContent } from './types';

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
      const recipientContext = `
Recipient Name: ${personalization?.recipientName || 'Enterprise Leader'}
Company: ${personalization?.companyName || 'your organization'}
Job Title: ${personalization?.jobTitle || 'Executive'}
Industry: ${template.industryLabel}
Engagement Type: ${template.engagementLabel}
${personalization?.customNotes ? `Notes: ${personalization.customNotes}` : ''}
`;

      const systemPrompt = `You are an elite B2B enterprise revenue copywriter for ProfitMachines (https://profitmachines.ai).
ProfitMachines builds autonomous revenue infrastructure, multi-agent SDR pipelines, dark-funnel buying signal discovery (via DemandPulse AI), and margin expansion systems.
Strict requirements:
1. Do NOT invent false customer results, fake customer names, or unverified statistics.
2. Maintain an executive, confident, data-grounded tone.
3. Return ONLY valid JSON with no markdown backticks, with the following exact shape:
{
  "subjectOptions": ["Option 1", "Option 2", "Option 3"],
  "selectedSubject": "Best option from the 3",
  "preheader": "1-sentence inbox snippet",
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

      const userPrompt = `Generate customized email content for the following context:
${recipientContext}
Base Template Title: ${template.name}
Default Subject: ${template.defaultSubject}
Default Headline: ${template.headline}
Default Intro: ${template.introduction}
${promptInstruction ? `Special Instruction: ${promptInstruction}` : ''}

Ensure the content is deeply specific to the ${template.industryLabel} industry and ${template.engagementLabel} workflow.`;

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
      });

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
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

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
      console.warn('[CohereEmailService] Failed to generate with Cohere, using fallback:', err);
      return {
        content: this.buildStaticFallback(template, personalization),
        source: 'STATIC_FALLBACK',
      };
    }
  }

  private static buildStaticFallback(
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
