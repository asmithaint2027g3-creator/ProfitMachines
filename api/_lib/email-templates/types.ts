/**
 * api/_lib/email-templates/types.ts
 *
 * Full type definitions for the ProfitMachines Industry Email Template System:
 * - 8 Industries
 * - 6 Engagement Types + Welcome + Industry Campaign
 * - Rich content sections, fallback content, personalization fields, and CTAs.
 */

export type IndustryId =
  | 'saas'
  | 'fintech'
  | 'healthcare'
  | 'ecommerce'
  | 'manufacturing'
  | 'professional-services'
  | 'crypto'
  | 'other-enterprise';

export type EngagementType =
  | 'new-lead-followup'
  | 'consultation-demo-followup'
  | 'resource-sharing'
  | 'product-service-update'
  | 're-engagement'
  | 'industry-engagement'
  | 'welcome'
  | 'industry-campaign';

export interface EmailPersonalization {
  recipientName?: string;
  recipientEmail?: string;
  companyName?: string;
  industry?: string;
  jobTitle?: string;
  customNotes?: string;
  consultationDate?: string;
  resourceTitle?: string;
  resourceLink?: string;
}

export interface ContentSection {
  heading: string;
  body: string;
  bulletPoints?: string[];
  calloutBox?: {
    title: string;
    text: string;
    metric?: string;
  };
}

export interface EmailTemplateConfig {
  id: string; // e.g. 'saas-welcome', 'fintech-new-lead-followup'
  name: string;
  industry: IndustryId;
  industryLabel: string;
  engagementType: EngagementType;
  engagementLabel: string;
  heroImage: string; // Local relative or stable HTTPS
  heroImageAlt: string;
  headline: string;
  introduction: string;
  sections: ContentSection[];
  subjectSuggestions: string[];
  defaultSubject: string;
  preheader: string;
  primaryCta: {
    label: string;
    url: string;
  };
  secondaryCta?: {
    label: string;
    url: string;
  };
  closing: {
    signoff: string;
    senderName: string;
    senderTitle: string;
    senderCompany: string;
  };
  footerNote?: string;
}

export interface GeneratedEmailContent {
  subject: string;
  preheader: string;
  headline: string;
  introduction: string;
  sections: ContentSection[];
  ctaLabel?: string;
  closingNote?: string;
}
