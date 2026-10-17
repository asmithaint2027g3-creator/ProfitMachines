/**
 * api/_lib/email-templates/templates-fintech.ts
 *
 * Full template definitions for FinTech & Financial Services (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const fintechTemplates: EmailTemplateConfig[] = [
  {
    id: 'fintech-new-lead-followup',
    name: 'FinTech: New Lead Follow-Up',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/industry-fintech.png',
    heroImageAlt: 'Financial technology institutional analytics and transaction topology',
    headline: 'Accelerating Institutional Pipeline & Commercial Velocity',
    introduction:
      'Thank you for reaching out to ProfitMachines, {{name}}. In institutional financial services and wealth technology, closing deals requires rigorous compliance proofs, institutional trust, and precise stakeholder engagement.',
    sections: [
      {
        heading: 'Solving Institutional FinTech Deal Latency',
        body: 'FinTech commercial motions typically stall during risk committee, legal compliance, and infosec evaluations. ProfitMachines automates multi-threaded institutional stakeholder alignment, ensuring that CFOs, CISOs, and compliance heads receive board-ready economic defense models early in the cycle.',
        bulletPoints: [
          'Pre-packaged SOC2, ISO27001, and financial data isolation proof packs',
          'Algorithmic deal slippage detection across 6-to-12 month institutional evaluation cycles',
          'Autonomous buyer intent detection across tier-1 banks, asset managers, and insurance carriers',
        ],
        calloutBox: {
          title: 'FinTech Benchmark',
          text: 'Institutional financial technology clients compress sales cycles by 42% through automated multi-threaded consensus.',
          metric: '42% Shorter Sales Cycles',
        },
      },
    ],
    subjectSuggestions: [
      'Accelerating institutional FinTech pipeline for {{company}}',
      'Follow-up: Enterprise financial technology growth architecture',
      'Scaling institutional adoption at {{company}}',
    ],
    defaultSubject: 'Explore New Opportunities in Financial Services',
    preheader: 'Explore institutional revenue acceleration and compliance-ready sales architecture.',
    primaryCta: {
      label: 'Schedule FinTech Strategy Session',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Marcus Vance',
      senderTitle: 'Managing Director, FinTech Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-consultation-demo-followup',
    name: 'FinTech: Consultation & Demo Follow-Up',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-enterprise-board.jpg',
    heroImageAlt: 'Executive financial boardroom intelligence graph and institutional decision modeling',
    headline: 'FinTech Architecture Briefing Summary for {{company}}',
    introduction:
      'Thank you for joining our recent financial systems briefing, {{name}}. We examined how {{company}} can leverage autonomous revenue intelligence to navigate complex risk committees and accelerate institutional revenue.',
    sections: [
      {
        heading: 'Summary of Key Architectural Insights',
        body: 'During our consultation, we reviewed key friction points in your current institutional go-to-market motions, specifically addressing regulatory compliance overhead and enterprise bank procurement hurdles.',
        bulletPoints: [
          'Deployment of autonomous bank procurement risk mitigation workflows',
          'Continuous ingestion of financial institution buying telemetry and executive leadership shifts',
          'Integration with enterprise financial CRM databases with full audit trail compliance',
        ],
      },
    ],
    subjectSuggestions: [
      'FinTech Consultation Summary & Next Steps — {{company}}',
      'Executive Briefing Summary: Institutional Sales Acceleration for {{company}}',
      'Following up on our financial technology strategy session',
    ],
    defaultSubject: 'FinTech Architecture Briefing Summary for {{company}}',
    preheader: 'Key institutional insights and next steps from our recent consultation.',
    primaryCta: {
      label: 'Review FinTech Blueprint',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Marcus Vance',
      senderTitle: 'Managing Director, FinTech Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-resource-sharing',
    name: 'FinTech: Resource & Research Sharing',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'resource-sharing',
    engagementLabel: 'Financial Research Dossier',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'FinTech market research and capital allocation analytics',
    headline: '2026 Institutional FinTech Adoption & Revenue Report',
    introduction:
      'Hi {{name}}, our Financial Services Intelligence team has released an authoritative study on how top-tier financial technology firms are winning enterprise bank and asset management mandates.',
    sections: [
      {
        heading: 'Key Themes Explored in This Dossier',
        body: 'This report compiles empirical findings from over 180 financial institutions, evaluating how procurement expectations, security audits, and budget approvals have evolved.',
        bulletPoints: [
          'How Regulatory Sandboxes Impact Procurement Velocity for Emerging FinTechs',
          'Addressing the Top 5 Objections Raised by Bank Risk Committees in 2026',
          'Quantifying Economic Value to Customer (EVC) in Multi-Billion Dollar Asset Environments',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 Institutional FinTech Adoption Dossier for {{company}}',
      'Research: How tier-1 banks evaluate financial software in 2026',
      'Institutional FinTech revenue benchmarks and case studies',
    ],
    defaultSubject: 'New Research: 2026 Institutional FinTech Adoption & Revenue Models',
    preheader: 'Empirical data on bank procurement trends and enterprise financial sales velocity.',
    primaryCta: {
      label: 'Download FinTech Research Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Financial Advisory Practice',
      senderTitle: 'Institutional Intelligence Group',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-product-service-update',
    name: 'FinTech: Product & Service Update',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'product-service-update',
    engagementLabel: 'Compliance Platform Update',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'FinTech compliance telemetry and automated risk management pipeline',
    headline: 'Announcing Institutional Compliance Shields for Financial Pipeline',
    introduction:
      'We are pleased to introduce our specialized FinTech Compliance Module, engineered specifically to satisfy strict financial sector regulatory expectations, {{name}}.',
    sections: [
      {
        heading: 'New Capabilities for Financial Services',
        body: 'The FinTech Compliance Module equips revenue teams with automated security verification, verified data isolation boundaries, and SOC2/GLBA pre-qualification documentation.',
        bulletPoints: [
          'Pre-configured security questionnaire acceleration reducing audit response times by 80%',
          'Zero-knowledge telemetry ingestion preserving confidential institutional client records',
          'Automated financial buyer persona classification across banking and capital markets',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: Institutional Compliance Shields for FinTech',
      'Product Update: Streamlining bank compliance reviews with ProfitMachines',
      'Enhancing financial institutional deal velocity in 2026',
    ],
    defaultSubject: 'Platform Update: Institutional Compliance Shields for Financial Services',
    preheader: 'Accelerate institutional deal closures with automated financial risk mitigation.',
    primaryCta: {
      label: 'Explore FinTech Compliance Module',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Financial Product Engineering',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-re-engagement',
    name: 'FinTech: Executive Re-Engagement',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-revenue-acceleration.png',
    heroImageAlt: 'Financial transaction telemetry and margin optimization analytics',
    headline: 'Revisiting Institutional Growth Strategy for {{company}}',
    introduction:
      'Hi {{name}}, as interest rate dynamics and institutional technology budgets shift, we wanted to reconnect and explore how {{company}} is positioning its commercial pipeline this year.',
    sections: [
      {
        heading: 'Strategic Reflection for FinTech Leadership',
        body: 'With banking partners prioritizing vendor consolidation and demonstrable ROI, maintaining an agile, automated pipeline generation engine has become paramount.',
        bulletPoints: [
          'Have your institutional close rates met planned quarterly projections?',
          'Are your commercial leads encountering resistance during bank risk evaluations?',
          'Would updated enterprise financial market telemetry help refine your go-to-market posture?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on FinTech commercial expansion for {{company}}',
      'Checking in: Institutional pipeline velocity at {{company}}',
      'Financial services market updates for {{company}}',
    ],
    defaultSubject: 'Revisiting Financial Services Pipeline Strategy for {{company}}',
    preheader: 'A brief executive check-in on institutional pipeline velocity and bank partnerships.',
    primaryCta: {
      label: 'Schedule Executive Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Marcus Vance',
      senderTitle: 'Managing Director, FinTech Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-industry-engagement',
    name: 'FinTech: Industry Engagement & Trend Analysis',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'industry-engagement',
    engagementLabel: 'Financial Macro Trends',
    heroImage: '/images/hero-market-radar.jpg',
    heroImageAlt: 'Financial markets radar graph and macroeconomic liquidity curves',
    headline: 'Macro Trends in Enterprise Banking Procurement & FinTech Allocation',
    introduction:
      'Commercial banking institutions are overhauling how they select and deploy software infrastructure. Here is what financial technology executives need to know.',
    sections: [
      {
        heading: 'Navigating Bank Procurement Modernization',
        body: 'The days of multi-year RFP committees without verifiable proof-of-concepts are waning. Banks now demand live sandboxes and automated risk scores before opening commercial contract negotiations.',
        bulletPoints: [
          'The growing primacy of API latency and data residency in tier-1 bank RFPs',
          'How automated economic defense calculators protect FinTech contract pricing',
          'Strategies for orchestrating simultaneous buy-in from Treasury, IT, and Compliance',
        ],
      },
    ],
    subjectSuggestions: [
      'Macro Analysis: Modernizing Bank Procurement in 2026',
      'Strategic Briefing: How banks select FinTech partners today',
      'Navigating enterprise banking vendor risk evaluations',
    ],
    defaultSubject: 'Industry Analysis: Enterprise Banking Procurement Trends in 2026',
    preheader: 'Strategic insights for financial technology leaders navigating bank procurement.',
    primaryCta: {
      label: 'Read Full FinTech Analysis',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Financial Advisory Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-welcome',
    name: 'FinTech: Welcome & Orientation Briefing',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/industry-fintech.png',
    heroImageAlt: 'Welcome to ProfitMachines FinTech intelligence platform',
    headline: 'Welcome to ProfitMachines Financial Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined an exclusive community of financial technology executives, wealth managers, and institutional fintech founders who rely on ProfitMachines to accelerate high-value pipeline.',
    sections: [
      {
        heading: 'Your Financial Growth Suite Privileges',
        body: 'As a verified financial ecosystem partner, you gain access to our proprietary institutional demand radar, compliance-ready deal accelerators, and banking market telemetry.',
        bulletPoints: [
          'Bi-weekly Institutional Intent Telemetry Reports tracking bank tech buying cycles',
          'Pre-packaged Economic Value to Customer (EVC) models for C-suite bank proposals',
          'Invitations to our quarterly Financial Services Innovation Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Financial Intelligence, {{name}}',
      'Your orientation to the FinTech revenue network',
      'Welcome aboard: Scaling institutional financial revenue',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Financial Services Growth Architecture',
    preheader: 'Your orientation guide to institutional revenue acceleration and bank pipeline models.',
    primaryCta: {
      label: 'Access FinTech Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Financial Practice Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'fintech-industry-campaign',
    name: 'FinTech: Executive Industry Campaign',
    industry: 'fintech',
    industryLabel: 'FinTech & Financial Services',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/industry-fintech.png',
    heroImageAlt: 'FinTech industry campaign dashboard with institutional transaction curves',
    headline: 'Explore New Opportunities in Financial Services',
    introduction:
      'Winning institutional financial deals requires more than exceptional technology; it demands verified risk mitigation, rigorous compliance alignment, and systematic buyer committee orchestration, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue OS for Institutional FinTech',
        body: 'ProfitMachines equips financial technology companies with predictive revenue engines that compress institutional buying cycles. We detect active buying signals across commercial banks, asset managers, and insurance carriers weeks before formal procurement begins.',
        bulletPoints: [
          'Automated multi-threaded alignment for CFOs, CISOs, and bank risk committees',
          'Continuous buying intent tracking across 12,000+ institutional financial accounts',
          'Pre-formatted regulatory defense kits that preempt security questionnaire delays',
        ],
        calloutBox: {
          title: 'Institutional Impact Metric',
          text: 'Financial services clients achieve a 42% compression in deal closing velocity.',
          metric: '42% Cycle Compression',
        },
      },
      {
        heading: 'Unlock Predictable Institutional Growth',
        body: 'Schedule an exploratory briefing with our financial practice leaders to see how our autonomous revenue mesh accelerates enterprise pipeline.',
      },
    ],
    subjectSuggestions: [
      'Explore New Opportunities in Financial Services',
      'Institutional pipeline acceleration for FinTech leaders',
      'Closing tier-1 bank deals with autonomous revenue intelligence',
    ],
    defaultSubject: 'Explore New Opportunities in Financial Services',
    preheader: 'Discover how autonomous intelligence accelerates institutional pipeline for financial services.',
    primaryCta: {
      label: 'Explore FinTech Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Marcus Vance',
      senderTitle: 'Managing Director, FinTech Practice',
      senderCompany: 'ProfitMachines',
    },
  },
];
