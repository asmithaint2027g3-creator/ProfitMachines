/**
 * api/_lib/email-templates/config.ts
 *
 * Central Verified Business, Brand, Routing & Navigation Configuration
 * for ProfitMachines Email Templates.
 *
 * All values are strictly derived from verified project assets, routes, and environment settings.
 * NO invented telephone numbers, addresses, broken routes, or fake credentials.
 */

import type { IndustryId, EngagementType } from './types';

export const BUSINESS_CONFIG = {
  companyName: 'ProfitMachines',
  brandTagline: 'Enterprise Autonomous Revenue Systems',
  siteUrl: (process.env.PROFITMACHINES_SITE_URL || 'https://profit-machines-1.vercel.app').replace(/\/+$/, ''),
  appUrl: (process.env.PROFITMACHINES_APP_URL || 'https://profit-machines-1.vercel.app').replace(/\/+$/, ''),
  phone: (process.env.PROFITMACHINES_PHONE || '7339693105').trim(),
  contactEmail: (process.env.PROFITMACHINES_CONTACT_EMAIL || process.env.TEAM_NOTIFICATION_EMAIL || 'asmitha.int2027g3@gmail.com').trim(),
  address: (process.env.PROFITMACHINES_ADDRESS || '').trim(), // Optional; omitted if empty
  replyTo: 'asmitha.int2027g3@gmail.com',

  // Verified brand visual identity
  colors: {
    primaryEmerald: '#059669', // Emerald Green 600
    primaryEmeraldDark: '#047857', // Emerald Green 700
    primaryEmeraldLight: '#10b981', // Emerald Green 500
    primaryEmeraldSoft: '#ecfdf5', // Emerald Green 50
    primaryEmeraldBorder: '#a7f3d0', // Emerald Green 200
    accentTeal: '#0d9488',
    darkNavy: '#0a2540',
    deepNavy: '#071526',
    slateBody: '#334155',
    slateMuted: '#64748b',
    borderGray: '#e2e8f0',
    bgLight: '#f8fafc',
  },

  // Verified existing routes in App.tsx
  routes: {
    home: '/',
    solutions: '/solutions',
    industries: '/industries',
    offerings: '/offerings',
    resources: '/resources',
    company: '/company',
    bookConsultation: '/book-consultation',
    privacy: '/privacy',
    terms: '/terms',
    security: '/security',
    crypto: '/crypto',
    demandPulse: '/demand-pulse',
    partners: '/partners',
    career: '/career',
  },
};

/**
 * Verified Industry-Specific Hero Images (approx 2.5:1 - 3:1 aspect ratio)
 * Using existing verified high-resolution assets in /static/images/
 */
export const INDUSTRY_IMAGE_MAP: Record<IndustryId, { url: string; alt: string; fallbackAlt: string }> = {
  saas: {
    url: '/images/industry-saas.png',
    alt: 'SaaS recurring revenue operations and cloud telemetry dashboard',
    fallbackAlt: 'ProfitMachines SaaS & Cloud Software Architecture',
  },
  fintech: {
    url: '/images/industry-fintech.png',
    alt: 'Financial services institutional risk modeling and real-time deal telemetry',
    fallbackAlt: 'ProfitMachines FinTech & Financial Services Architecture',
  },
  healthcare: {
    url: '/images/industry-healthcare.png',
    alt: 'Healthcare technology workflow automation and clinical operations telemetry',
    fallbackAlt: 'ProfitMachines Healthcare & HealthTech Architecture',
  },
  ecommerce: {
    url: '/images/industry-retail.png',
    alt: 'Retail customer journey orchestration and e-commerce conversion analytics',
    fallbackAlt: 'ProfitMachines E-Commerce & Retail Architecture',
  },
  manufacturing: {
    url: '/images/industry-manufacturing.png',
    alt: 'Manufacturing supply chain visibility and industrial operational intelligence',
    fallbackAlt: 'ProfitMachines Manufacturing & Supply Chain Architecture',
  },
  'professional-services': {
    url: '/images/hero-enterprise-board.jpg',
    alt: 'Executive boardroom advisory and professional services business development',
    fallbackAlt: 'ProfitMachines Professional Services & Legal Advisory Architecture',
  },
  crypto: {
    url: '/images/hero-market-radar.jpg',
    alt: 'Web3 protocol on-chain developer telemetry and institutional adoption network',
    fallbackAlt: 'ProfitMachines Crypto & Web3 Protocol Architecture',
  },
  'other-enterprise': {
    url: '/images/hero-ai-transformation.png',
    alt: 'Enterprise AI digital transformation dashboard and neural revenue graph',
    fallbackAlt: 'ProfitMachines Enterprise Autonomous Revenue Architecture',
  },
};

/**
 * Verified Destination Page Mapping for Each Industry & Engagement Type
 * Maps strictly to working routes in App.tsx. Never invents URLs.
 */
export function getVerifiedDestinationUrl(industry: IndustryId, engagement: EngagementType): string {
  // Engagement-specific primary overrides
  if (engagement === 'consultation-demo-followup' || engagement === 'new-lead-followup') {
    return BUSINESS_CONFIG.routes.bookConsultation;
  }
  if (engagement === 'resource-sharing') {
    return BUSINESS_CONFIG.routes.resources;
  }
  if (engagement === 'product-service-update') {
    return BUSINESS_CONFIG.routes.offerings;
  }

  // Industry-specific routes
  switch (industry) {
    case 'saas':
      return `${BUSINESS_CONFIG.routes.solutions}#b2b-growth-intelligence`;
    case 'fintech':
      return `${BUSINESS_CONFIG.routes.solutions}#sales-revenue-optimization`;
    case 'healthcare':
      return `${BUSINESS_CONFIG.routes.solutions}#workflow-automation`;
    case 'ecommerce':
      return `${BUSINESS_CONFIG.routes.solutions}#marketing-customer-acquisition`;
    case 'manufacturing':
      return `${BUSINESS_CONFIG.routes.solutions}#bi-profitability`;
    case 'professional-services':
      return `${BUSINESS_CONFIG.routes.solutions}#market-discovery-demand`;
    case 'crypto':
      return BUSINESS_CONFIG.routes.crypto;
    case 'other-enterprise':
    default:
      return BUSINESS_CONFIG.routes.offerings;
  }
}
