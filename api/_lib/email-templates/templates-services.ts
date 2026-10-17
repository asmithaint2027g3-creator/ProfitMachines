/**
 * api/_lib/email-templates/templates-services.ts
 *
 * Full template definitions for Professional Services & Legal (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const servicesTemplates: EmailTemplateConfig[] = [
  {
    id: 'services-new-lead-followup',
    name: 'Professional Services: New Lead Follow-Up',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/hero-enterprise-board.jpg',
    heroImageAlt: 'Executive management consulting boardroom and corporate advisory strategy',
    headline: 'Accelerating High-Value Advisory Mandates & Enterprise Retainers',
    introduction:
      'Thank you for connecting with ProfitMachines, {{name}}. In management consulting, legal advisory, and corporate accounting, winning premium multi-quarter retainers requires establishing verifiable authority and engaging C-suite buyers early.',
    sections: [
      {
        heading: 'Overcoming Professional Services Growth Friction',
        body: 'Advisory firms often struggle with unbillable senior partner prospecting hours, protracted committee procurement, and commoditization pressure. ProfitMachines deploys automated account-based intelligence that detects corporate restructuring, regulatory compliance triggers, and M&A activities before formal RFP issuance.',
        bulletPoints: [
          'Continuous monitoring of corporate 10-K filings, executive turnover, and regulatory enforcement actions',
          'Autonomous multi-stakeholder mapping connecting senior partners with General Counsels, CFOs, and Board Directors',
          'Economic proof packs and advisory ROI models that justify premium billing rates',
        ],
        calloutBox: {
          title: 'Advisory Benchmark',
          text: 'Professional services firms leveraging autonomous account intelligence achieve an 82% executive meeting conversion rate.',
          metric: '82% C-Suite Conversion',
        },
      },
    ],
    subjectSuggestions: [
      'Accelerating high-value advisory mandates for {{company}}',
      'Professional services business development for {{company}}',
      'Follow-up: Scaling corporate advisory pipeline',
    ],
    defaultSubject: 'Explore New Business Development Opportunities',
    preheader: 'Explore automated business development and high-value retainer acquisition for advisory firms.',
    primaryCta: {
      label: 'Schedule Practice Growth Briefing',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Arthur Sterling',
      senderTitle: 'Managing Partner, Professional Services Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-consultation-demo-followup',
    name: 'Professional Services: Consultation & Demo Follow-Up',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-consulting-team.jpg',
    heroImageAlt: 'Executive consulting leadership team reviewing corporate client strategy',
    headline: 'Practice Growth Briefing Summary for {{company}}',
    introduction:
      'Thank you for our recent strategic consultation, {{name}}. We examined how {{company}} can eliminate non-billable partner business development drag and systematically land enterprise retainers.',
    sections: [
      {
        heading: 'Strategic Discussion Summary',
        body: 'During our briefing, we identified key opportunities to institutionalize business development across your practice groups, reducing reliance on ad-hoc partner networking.',
        bulletPoints: [
          'Deploying automated intent surveillance across target corporate accounts entering restructuring or audit phases',
          'Streamlining pre-meeting executive dossiers so partners walk into discovery calls fully briefed on corporate pain points',
          'Standardizing value-based advisory proposal structures that protect realization rates',
        ],
      },
    ],
    subjectSuggestions: [
      'Practice Growth Briefing Summary & Next Steps — {{company}}',
      'Executive Briefing Summary: Advisory Pipeline Acceleration for {{company}}',
      'Following up on our professional services discussion',
    ],
    defaultSubject: 'Practice Growth Briefing Summary for {{company}}',
    preheader: 'Actionable business development frameworks and partner enablement strategies from our session.',
    primaryCta: {
      label: 'Review Practice Blueprint',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Arthur Sterling',
      senderTitle: 'Managing Partner, Professional Services Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-resource-sharing',
    name: 'Professional Services: Resource & Research Sharing',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'resource-sharing',
    engagementLabel: 'Advisory Intelligence Report',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'Professional services market intelligence and billing realization data',
    headline: '2026 Professional Services & Corporate Advisory Business Development Report',
    introduction:
      'Hi {{name}}, our Professional Services Practice has published an empirical study examining how top-tier consulting firms, law practices, and advisory groups are winning high-margin corporate engagements.',
    sections: [
      {
        heading: 'Highlights from the Advisory Dossier',
        body: 'Compiling survey data from over 160 managing partners and corporate legal counsels, this report details how corporate procurement of advisory services has evolved.',
        bulletPoints: [
          'Why General Counsels and CFOs are Demanding Fixed-Fee, Milestone-Linked Retainers',
          'How Automated Account Signals Enable Boutique Firms to Win Against Big-Four Competitors',
          'Realization Rate Benchmarks: Protecting Hourly and Project Margins Against Inflation',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 Professional Services Business Development Report for {{company}}',
      'Research: How corporate boards select external advisory firms',
      'Data-driven legal and consulting revenue benchmarks',
    ],
    defaultSubject: 'New Research: 2026 Professional Services Commercial Intelligence',
    preheader: 'Empirical data on corporate advisory procurement, realization rates, and retainer acquisition.',
    primaryCta: {
      label: 'Download Advisory Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Advisory Research Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-product-service-update',
    name: 'Professional Services: Product & Service Update',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'product-service-update',
    engagementLabel: 'Practice Intelligence Update',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'Advisory pipeline intelligence and corporate governance data stream',
    headline: 'Introducing MandateRadar™: Corporate Advisory Intent Telemetry',
    introduction:
      'We are pleased to introduce MandateRadar™, an autonomous corporate intelligence module engineered specifically for law firms, management consultants, and specialized advisory practices, {{name}}.',
    sections: [
      {
        heading: 'Designed for High-Touch Advisory Business Development',
        body: 'MandateRadar™ continuously monitors regulatory filings, executive departures, corporate litigation dockets, and cross-border transactions to identify companies requiring advisory support.',
        bulletPoints: [
          'Real-time alerts on corporate restructuring, antitrust investigations, and CFO transitions',
          'Automated profiling of General Counsels, Chief Compliance Officers, and Board Committees',
          'Direct integration with practice management systems to streamline partner relationship tracking',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: MandateRadar™ for Professional Services & Legal',
      'Product Update: Detecting corporate advisory mandates with ProfitMachines',
      'Scaling advisory practice business development in 2026',
    ],
    defaultSubject: 'Platform Update: Detecting Corporate Advisory Mandates in Real Time',
    preheader: 'Identify corporate restructuring and advisory triggers months ahead of public RFPs.',
    primaryCta: {
      label: 'Explore MandateRadar™',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Advisory Technology Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-re-engagement',
    name: 'Professional Services: Executive Re-Engagement',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-profit-pool.png',
    heroImageAlt: 'Advisory profit pool discovery and partner realization analytics',
    headline: 'Revisiting Practice Growth & Retainer Acquisition for {{company}}',
    introduction:
      'Hi {{name}}, as corporate budget planning cycles and regulatory demands adapt this quarter, we wanted to reconnect and see how {{company}} is pacing against your practice development goals.',
    sections: [
      {
        heading: 'Practice Growth Health Check',
        body: 'Maintaining high partner billing realization requires a disciplined, predictable inbound and referral flow. When we last spoke, we discussed opportunities to systematize corporate outreach.',
        bulletPoints: [
          'Have your average engagement values and realization rates met your quarterly expectations?',
          'Are senior partners still spending disproportionate time on unbilled outbound networking?',
          'Would updated corporate advisory market intelligence offer helpful strategic perspective?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on practice growth strategy for {{company}}',
      'Checking in: Advisory pipeline velocity at {{company}}',
      'Professional services market updates for {{company}}',
    ],
    defaultSubject: 'Revisiting Practice Growth Strategy for {{company}}',
    preheader: 'A brief executive check-in on corporate retainer acquisition and partner realization.',
    primaryCta: {
      label: 'Schedule Practice Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Arthur Sterling',
      senderTitle: 'Managing Partner, Professional Services Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-industry-engagement',
    name: 'Professional Services: Industry Engagement & Trend Analysis',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'industry-engagement',
    engagementLabel: 'Advisory Trend Analysis',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'AI transformation in corporate consulting and legal workflows',
    headline: 'The Decoupling of Hours and Value: Modernizing Advisory Billing',
    introduction:
      'The billable hour is undergoing fundamental scrutiny as corporate clients demand outcome-linked pricing and automated delivery efficiencies. Here is our strategic analysis.',
    sections: [
      {
        heading: 'Sustaining Premium Advisory Margins',
        body: 'Forward-thinking law firms and consulting practices are bundling proprietary analytical tools with expert counsel to command value-based retainer premiums.',
        bulletPoints: [
          'Transitioning from pure billable hours to subscription-based corporate advisory retainers',
          'Deploying automated telemetry to provide ongoing executive advisory monitoring',
          'Protecting firm intellectual property and transforming client engagements into recurring assets',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Analysis: The Evolution of Advisory Billing Models',
      'Strategic Briefing: Value-based pricing in legal and management consulting',
      'Protecting partner realization against AI-driven commoditization',
    ],
    defaultSubject: 'Industry Analysis: Modernizing Advisory Retainers in 2026',
    preheader: 'Strategic insights for managing partners on value-based pricing and retainer durability.',
    primaryCta: {
      label: 'Read Full Advisory Analysis',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Advisory Advisory Council',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-welcome',
    name: 'Professional Services: Welcome & Orientation Briefing',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/hero-enterprise-board.jpg',
    heroImageAlt: 'Welcome to ProfitMachines Professional Services intelligence platform',
    headline: 'Welcome to ProfitMachines Professional Services Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined an elite network of managing partners, legal counsels, and consulting leaders who use autonomous commercial intelligence to secure high-value corporate mandates.',
    sections: [
      {
        heading: 'Your Practice Growth Suite Privileges',
        body: 'As a verified professional services network participant, you receive continuous access to corporate trigger telemetry, partner business development frameworks, and advisory pricing benchmarks.',
        bulletPoints: [
          'Monthly Corporate Mandate Telemetry Reports tracking corporate restructuring and M&A triggers',
          'Value-based proposal and retainer calculators tailored for corporate procurement reviews',
          'Invitations to our exclusive Managing Partner & Practice Leader Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Professional Services Intelligence, {{name}}',
      'Your orientation to the advisory growth network',
      'Welcome aboard: Scaling high-value corporate mandates with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Professional Services Growth Architecture',
    preheader: 'Your orientation guide to corporate business development and retainer acquisition models.',
    primaryCta: {
      label: 'Access Practice Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Professional Services Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'services-industry-campaign',
    name: 'Professional Services: Executive Industry Campaign',
    industry: 'professional-services',
    industryLabel: 'Professional Services & Legal',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/hero-enterprise-board.jpg',
    heroImageAlt: 'Professional services industry campaign dashboard with corporate advisory metrics',
    headline: 'Explore New Business Development Opportunities',
    introduction:
      'Landing premier corporate advisory mandates and high-margin enterprise retainers requires identifying corporate distress, regulatory scrutiny, and strategic inflection points months before competitors, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Business Development OS for Advisory Firms',
        body: 'ProfitMachines delivers specialized business development infrastructure for consulting practices, law firms, and corporate advisory teams. We eliminate unbillable partner prospecting by systematically surfacing qualified corporate mandates.',
        bulletPoints: [
          'Monitor corporate restructuring, leadership transitions, and regulatory investigations across 15,000+ enterprises',
          'Automate high-touch C-suite relationship mapping engaging General Counsels, CFOs, and Board Directors',
          'Achieve an 82% executive meeting conversion rate with verified corporate pain briefings',
        ],
        calloutBox: {
          title: 'Advisory Impact Metric',
          text: 'Professional services firms achieve an 82% executive meeting conversion rate with targeted intent telemetry.',
          metric: '82% Meeting Conversion',
        },
      },
      {
        heading: 'Scale High-Value Retainer Acquisition',
        body: 'Schedule an exploratory briefing with our professional services practice leaders to see how our autonomous revenue mesh accelerates advisory pipeline.',
      },
    ],
    subjectSuggestions: [
      'Explore New Business Development Opportunities',
      'High-value retainer acquisition for consulting and legal practices',
      'Winning corporate advisory mandates with autonomous intelligence',
    ],
    defaultSubject: 'Explore New Business Development Opportunities',
    preheader: 'Discover how autonomous intelligence accelerates business development for advisory firms.',
    primaryCta: {
      label: 'Explore Advisory Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Arthur Sterling',
      senderTitle: 'Managing Partner, Professional Services Practice',
      senderCompany: 'ProfitMachines',
    },
  },
];
