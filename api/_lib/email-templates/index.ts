/**
 * api/_lib/email-templates/index.ts
 *
 * Master Email Template Library for ProfitMachines:
 * - Aggregates all 8 industries x 8 templates (64 distinct configurations)
 * - 48 industry-and-engagement template configurations
 * - 8 industry-specific Welcome Email templates
 * - 8 industry-specific Industry Campaign templates
 * - 1 general Welcome Email fallback
 * - Lookup and selection functions
 */

import type { EmailTemplateConfig, IndustryId, EngagementType } from './types';
import { saasTemplates } from './templates-saas';
import { fintechTemplates } from './templates-fintech';
import { healthcareTemplates } from './templates-healthcare';
import { ecommerceTemplates } from './templates-ecommerce';
import { manufacturingTemplates } from './templates-manufacturing';
import { servicesTemplates } from './templates-services';
import { cryptoTemplates } from './templates-crypto';
import { enterpriseTemplates } from './templates-enterprise';

export * from './types';
export * from './renderer';
export * from './cohere-service';

/**
 * General Welcome Email Fallback (when industry is unspecified or unknown)
 */
export const generalWelcomeFallback: EmailTemplateConfig = {
  id: 'general-welcome-fallback',
  name: 'General Welcome Email Fallback',
  industry: 'other-enterprise',
  industryLabel: 'Enterprise Intelligence',
  engagementType: 'welcome',
  engagementLabel: 'Welcome to ProfitMachines',
  heroImage: '/images/hero-ai-transformation.png',
  heroImageAlt: 'Welcome to ProfitMachines Autonomous Revenue OS',
  headline: 'Welcome to ProfitMachines: Autonomous Revenue Architecture',
  introduction:
    'Welcome, {{name}}. You have connected with ProfitMachines, the autonomous revenue infrastructure and growth intelligence platform engineered for enterprise leaders and high-growth operators.',
  sections: [
    {
      heading: 'What We Solve',
      body: 'ProfitMachines helps forward-thinking companies eliminate sales pipeline leakage, deploy autonomous multi-agent outreach swarms, sense dark-funnel buying signals, and capture hidden profit pools.',
      bulletPoints: [
        'DemandPulse AI™: Ingesting buyer intent signals across global market verticals',
        'Autonomous SDR Swarms: Continuous qualification without manual sales rep drag',
        'Board-Ready Economic Defense Models: Accelerating C-suite approvals with quantified ROI',
      ],
      calloutBox: {
        title: 'Platform Benchmark',
        text: 'Enterprise teams deploying ProfitMachines achieve up to 5.4× pipeline velocity and a 54% reduction in targeted CAC.',
        metric: '5.4× Pipeline Velocity',
      },
    },
    {
      heading: 'Next Step: Explore Your Capabilities',
      body: 'Explore our solutions matrix or schedule a 30-minute architecture briefing to run a complimentary revenue diagnostic for {{company}}.',
    },
  ],
  subjectSuggestions: [
    'Welcome to ProfitMachines, {{name}}',
    'Your orientation to ProfitMachines Autonomous Revenue OS',
    'Scaling enterprise revenue with autonomous intelligence',
  ],
  defaultSubject: 'Welcome to ProfitMachines: Enterprise Autonomous Revenue OS',
  preheader: 'Your orientation guide to autonomous revenue systems and predictable pipeline acceleration.',
  primaryCta: {
    label: 'Explore Our Solutions',
    url: '/offerings',
  },
  closing: {
    signoff: 'Warm regards',
    senderName: 'The ProfitMachines Team',
    senderTitle: 'Client Success & Advisory',
    senderCompany: 'ProfitMachines',
  },
};

/**
 * Master List of All 64 Configured Templates + 1 Fallback (65 total)
 */
export const allEmailTemplates: EmailTemplateConfig[] = [
  ...saasTemplates,
  ...fintechTemplates,
  ...healthcareTemplates,
  ...ecommerceTemplates,
  ...manufacturingTemplates,
  ...servicesTemplates,
  ...cryptoTemplates,
  ...enterpriseTemplates,
  generalWelcomeFallback,
];

/**
 * Normalizes industry string input to recognized IndustryId
 */
export function normalizeIndustry(raw?: string): IndustryId {
  if (!raw) return 'other-enterprise';
  const clean = raw.toLowerCase().trim();
  if (clean.includes('saas') || clean.includes('software') || clean.includes('cloud') || clean.includes('tech')) {
    return 'saas';
  }
  if (clean.includes('fintech') || clean.includes('finance') || clean.includes('banking') || clean.includes('wealth') || clean.includes('bfsi')) {
    return 'fintech';
  }
  if (clean.includes('health') || clean.includes('medical') || clean.includes('clinic') || clean.includes('pharma') || clean.includes('bio')) {
    return 'healthcare';
  }
  if (clean.includes('commerce') || clean.includes('retail') || clean.includes('d2c') || clean.includes('shop') || clean.includes('store')) {
    return 'ecommerce';
  }
  if (clean.includes('manufactur') || clean.includes('industrial') || clean.includes('supply') || clean.includes('factory') || clean.includes('logistics')) {
    return 'manufacturing';
  }
  if (clean.includes('service') || clean.includes('legal') || clean.includes('consult') || clean.includes('advisory') || clean.includes('agency')) {
    return 'professional-services';
  }
  if (clean.includes('crypto') || clean.includes('web3') || clean.includes('blockchain') || clean.includes('token') || clean.includes('defi')) {
    return 'crypto';
  }
  return 'other-enterprise';
}

/**
 * Normalizes engagement string input to recognized EngagementType
 */
export function normalizeEngagementType(raw?: string): EngagementType {
  if (!raw) return 'industry-campaign';
  const clean = raw.toLowerCase().trim();
  if (clean.includes('welcome') || clean.includes('onboard')) return 'welcome';
  if (clean.includes('lead') || clean.includes('new') || clean.includes('inbound')) return 'new-lead-followup';
  if (clean.includes('consult') || clean.includes('demo') || clean.includes('briefing') || clean.includes('meeting')) return 'consultation-demo-followup';
  if (clean.includes('resource') || clean.includes('report') || clean.includes('whitepaper') || clean.includes('dossier')) return 'resource-sharing';
  if (clean.includes('product') || clean.includes('service') || clean.includes('update') || clean.includes('release')) return 'product-service-update';
  if (clean.includes('re-engage') || clean.includes('check') || clean.includes('reconnect')) return 're-engagement';
  if (clean.includes('industry-engage') || clean.includes('trend')) return 'industry-engagement';
  if (clean.includes('campaign')) return 'industry-campaign';
  return 'industry-campaign';
}

/**
 * Selects a template by industry and engagement type
 */
export function getTemplate(industry: IndustryId | string, engagement: EngagementType | string): EmailTemplateConfig {
  const normInd = normalizeIndustry(industry);
  const normEng = normalizeEngagementType(engagement);

  const found = allEmailTemplates.find(t => t.industry === normInd && t.engagementType === normEng);
  if (found) return found;

  // Fallback to industry-campaign for that industry
  const indFallback = allEmailTemplates.find(t => t.industry === normInd && t.engagementType === 'industry-campaign');
  if (indFallback) return indFallback;

  return generalWelcomeFallback;
}

/**
 * Selects a template by exact template ID
 */
export function getTemplateById(templateId: string): EmailTemplateConfig {
  const found = allEmailTemplates.find(t => t.id === templateId);
  return found || generalWelcomeFallback;
}

/**
 * Returns all 8 Industry Campaign templates (for Phase 6 test emails)
 */
export function getEightIndustryCampaignTemplates(): EmailTemplateConfig[] {
  const industries: IndustryId[] = [
    'saas',
    'fintech',
    'healthcare',
    'ecommerce',
    'manufacturing',
    'professional-services',
    'crypto',
    'other-enterprise',
  ];

  return industries.map(ind => getTemplate(ind, 'industry-campaign'));
}
