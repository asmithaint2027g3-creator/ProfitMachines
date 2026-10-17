/**
 * api/_lib/email-templates/templates-healthcare.ts
 *
 * Full template definitions for Healthcare & HealthTech (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const healthcareTemplates: EmailTemplateConfig[] = [
  {
    id: 'healthcare-new-lead-followup',
    name: 'Healthcare: New Lead Follow-Up',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/industry-healthcare.png',
    heroImageAlt: 'Healthcare life sciences analytics and hospital telemetry dashboard',
    headline: 'Accelerating HealthTech Commercial Adoption & Hospital Health System Pipeline',
    introduction:
      'Thank you for connecting with ProfitMachines, {{name}}. In healthcare technology, scaling commercial adoption requires navigating complex clinical committees, HIPAA/HITRUST compliance, and multi-year health system procurement cycles.',
    sections: [
      {
        heading: 'Overcoming Health System Procurement Barriers',
        body: 'Health systems and clinical networks evaluate technology with extreme caution. ProfitMachines deploys specialized healthcare commercial engines that establish clinical validity, regulatory compliance, and quantifiable hospital operational ROI.',
        bulletPoints: [
          'Pre-configured clinical risk mitigation models for CMIOs and hospital purchasing committees',
          'Continuous buying intent tracking across integrated delivery networks (IDNs) and regional clinics',
          'HIPAA-compliant commercial outreach workflows designed for healthcare leadership',
        ],
        calloutBox: {
          title: 'Healthcare Benchmark',
          text: 'HealthTech innovators compress hospital committee sign-off times by 35% using clinical proof frameworks.',
          metric: '35% Faster Health System Buy-In',
        },
      },
    ],
    subjectSuggestions: [
      'Accelerating HealthTech commercial adoption for {{company}}',
      'Hospital network pipeline expansion for {{company}}',
      'Follow-up: Scaling healthcare revenue operations',
    ],
    defaultSubject: 'Discover Healthcare Technology Market Opportunities',
    preheader: 'Explore commercial pipeline acceleration for healthcare technology and hospital systems.',
    primaryCta: {
      label: 'Schedule HealthTech Strategy Session',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Elena Rostova',
      senderTitle: 'Lead Healthcare Strategist',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-consultation-demo-followup',
    name: 'Healthcare: Consultation & Demo Follow-Up',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-data-strategy.jpg',
    heroImageAlt: 'Clinical data strategy and healthcare enterprise intelligence visualization',
    headline: 'Healthcare Strategy Session Summary for {{company}}',
    introduction:
      'Thank you for your time during our healthcare commercial briefing, {{name}}. We examined how {{company}} can streamline hospital executive buy-in and compress clinical evaluation timelines.',
    sections: [
      {
        heading: 'Strategic Summary & Recommended Actions',
        body: 'We identified key leverage points to enhance your clinical value proposition, overcome EHR integration objections, and coordinate hospital procurement committees.',
        bulletPoints: [
          'Framing technology adoption in terms of nurse/physician burnout reduction and clinical throughput',
          'Deploying automated intent triggers across regional hospital purchasing consortiums',
          'Structuring pilot programs with strict milestone gates and predefined hospital ROI metrics',
        ],
      },
    ],
    subjectSuggestions: [
      'Healthcare Consultation Summary & Next Steps — {{company}}',
      'Executive Summary: Hospital pipeline acceleration for {{company}}',
      'Following up on our HealthTech growth discussion',
    ],
    defaultSubject: 'Healthcare Strategy Session Summary for {{company}}',
    preheader: 'Clinical value frameworks and hospital procurement strategies from our recent session.',
    primaryCta: {
      label: 'Review Healthcare Growth Plan',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Elena Rostova',
      senderTitle: 'Lead Healthcare Strategist',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-resource-sharing',
    name: 'Healthcare: Resource & Research Sharing',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'resource-sharing',
    engagementLabel: 'Clinical Market Report',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'HealthTech market opportunity analysis and clinical adoption curves',
    headline: '2026 Health System Technology Procurement Intelligence Report',
    introduction:
      'Hi {{name}}, our Life Sciences and HealthTech Practice has published a comprehensive study on how integrated delivery networks (IDNs) and ambulatory care systems are procuring technology in 2026.',
    sections: [
      {
        heading: 'Key Findings in the Healthcare Dossier',
        body: 'Analyzing data across 140+ hospital executive leadership teams, this report highlights the shifting priorities of hospital CFOs, CMIOs, and procurement directors.',
        bulletPoints: [
          'Why Clinical ROI Must Outweigh Pure Cost Savings in 2026 Health System Budgets',
          'Strategies for Navigating Multi-Department Value Analysis Committees (VACs)',
          'Case Studies: How Emerging HealthTech Firms Closed 7-Figure Enterprise Hospital Mandates',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 Health System Procurement Report for {{company}}',
      'Research: How hospital networks evaluate digital health technology',
      'HealthTech market opportunity analysis and hospital buyer trends',
    ],
    defaultSubject: 'New Research: 2026 Health System Technology Procurement Intelligence',
    preheader: 'Empirical data on hospital buying committees, VAC reviews, and HealthTech adoption.',
    primaryCta: {
      label: 'Download HealthTech Report',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Healthcare Research Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-product-service-update',
    name: 'Healthcare: Product & Service Update',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'product-service-update',
    engagementLabel: 'Clinical Intelligence Update',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'Healthcare clinical data ingestion and automated regulatory auditing',
    headline: 'Introducing HealthNetwork Intent Radar™ for HealthTech',
    introduction:
      'We are excited to announce the launch of our dedicated HealthNetwork Intent Radar™, tailored specifically for digital health, medical device, and life sciences commercial teams, {{name}}.',
    sections: [
      {
        heading: 'Engineered for Healthcare Commercial Complexity',
        body: 'HealthNetwork Intent Radar™ continuously monitors digital signals across hospital networks, academic medical centers, and clinical practices to identify active technology modernization initiatives.',
        bulletPoints: [
          'Pre-cleared healthcare taxonomy tracking clinical workflow pain points and EHR replacements',
          'Automated mapping of hospital Value Analysis Committee (VAC) members and decision-makers',
          'Strict zero-PHI data handling ensuring total compliance with healthcare privacy regulations',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: HealthNetwork Intent Radar™ for HealthTech Leaders',
      'Product Update: Detecting hospital buying signals with ProfitMachines',
      'Accelerating digital health commercial adoption in 2026',
    ],
    defaultSubject: 'Platform Update: Detecting Health System Buying Signals in Real Time',
    preheader: 'Discover active hospital modernization initiatives with our dedicated HealthTech radar.',
    primaryCta: {
      label: 'Explore HealthTech Intent Radar',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Healthcare Technology Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-re-engagement',
    name: 'Healthcare: Executive Re-Engagement',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-consulting-team.jpg',
    heroImageAlt: 'Healthcare advisory team reviewing clinical revenue models',
    headline: 'Revisiting Healthcare Commercial Growth for {{company}}',
    introduction:
      'Hi {{name}}, as hospital system operating margins and health technology procurement priorities adjust in 2026, we wanted to reconnect and see how {{company}} is pacing against commercial targets.',
    sections: [
      {
        heading: 'Commercial Check-In for HealthTech Leaders',
        body: 'Selling to health systems requires agility and precise timing. When we last spoke, we discussed opportunities to streamline clinical champion enablement and hospital procurement buy-in.',
        bulletPoints: [
          'Are your sales reps still facing extended delays during hospital committee reviews?',
          'Has your customer acquisition cost within regional health systems remained sustainable?',
          'Would updated hospital procurement benchmarks offer helpful strategic validation?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on HealthTech commercial strategy for {{company}}',
      'Checking in: Hospital pipeline velocity at {{company}}',
      'Healthcare market updates and procurement insights for {{company}}',
    ],
    defaultSubject: 'Revisiting Health System Commercial Pipeline for {{company}}',
    preheader: 'A brief executive check-in on health system adoption and commercial pipeline velocity.',
    primaryCta: {
      label: 'Schedule Commercial Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Elena Rostova',
      senderTitle: 'Lead Healthcare Strategist',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-industry-engagement',
    name: 'Healthcare: Industry Engagement & Trend Analysis',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'industry-engagement',
    engagementLabel: 'Clinical Trend Analysis',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'AI in healthcare digital transformation curves and clinical workflows',
    headline: 'Navigating Value-Based Care & Technology Ingestion in 2026',
    introduction:
      'The transition toward value-based reimbursement models is reshaping how hospitals and ambulatory networks invest in software infrastructure. Here is our strategic breakdown.',
    sections: [
      {
        heading: 'Strategic Realities in Modern Healthcare Procurement',
        body: 'Hospitals are transitioning away from fragmented point solutions in favor of unified platforms that directly improve patient outcomes or operational margins.',
        bulletPoints: [
          'How health systems evaluate total cost of ownership (TCO) across clinical software',
          'Overcoming the “pilot paralysis” trap common in hospital digital health initiatives',
          'Aligning commercial packaging with CMS quality metrics and physician workflow incentives',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Analysis: Value-Based Care Technology Adoption in 2026',
      'Strategic Briefing: Escaping the HealthTech "pilot paralysis" trap',
      'Navigating hospital IT consolidation and clinical workflows',
    ],
    defaultSubject: 'Industry Analysis: Modernizing Health System Procurement in 2026',
    preheader: 'Strategic insights for healthcare technology leadership on hospital adoption models.',
    primaryCta: {
      label: 'Read Full Healthcare Analysis',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Healthcare Advisory Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-welcome',
    name: 'Healthcare: Welcome & Orientation Briefing',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/industry-healthcare.png',
    heroImageAlt: 'Welcome to ProfitMachines Healthcare intelligence platform',
    headline: 'Welcome to ProfitMachines Healthcare Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined a dedicated community of health system executives, HealthTech founders, and life sciences innovators leveraging autonomous intelligence to scale commercial adoption.',
    sections: [
      {
        heading: 'Your Healthcare Growth Suite Privileges',
        body: 'As a verified healthcare network participant, you gain access to our proprietary health system intent radar, clinical procurement benchmarks, and hospital decision-maker playbooks.',
        bulletPoints: [
          'Bi-weekly Health System Buying Intent Reports tracking hospital modernization priorities',
          'Clinical Economic Value models tailored for hospital CFOs and Value Analysis Committees',
          'Invitations to our exclusive Healthcare Commercial Innovation Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Healthcare Intelligence, {{name}}',
      'Your orientation to the HealthTech commercial network',
      'Welcome aboard: Scaling health system adoption with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Healthcare Technology Growth Architecture',
    preheader: 'Your orientation guide to health system commercialization and clinical pipeline models.',
    primaryCta: {
      label: 'Access Healthcare Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Healthcare Practice Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'healthcare-industry-campaign',
    name: 'Healthcare: Executive Industry Campaign',
    industry: 'healthcare',
    industryLabel: 'Healthcare & HealthTech',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/industry-healthcare.png',
    heroImageAlt: 'Healthcare industry campaign dashboard with clinical adoption curves',
    headline: 'Discover Healthcare Technology Market Opportunities',
    introduction:
      'Scaling adoption across integrated delivery networks, hospital consortiums, and ambulatory care groups requires proven clinical alignment and automated stakeholder orchestration, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue OS for HealthTech Enterprises',
        body: 'ProfitMachines empowers healthcare technology firms with intelligent revenue infrastructure designed for complex clinical environments. We identify active hospital modernization initiatives months before formal RFPs are issued.',
        bulletPoints: [
          'Clinical Value Analysis Committee (VAC) alignment frameworks that prevent proposal stalls',
          'Real-time buying signal surveillance across 8,000+ health systems and clinic networks',
          'Autonomous multi-stakeholder orchestration engaging CMIOs, nursing leadership, and hospital CFOs',
        ],
        calloutBox: {
          title: 'Healthcare Impact Metric',
          text: 'HealthTech innovators achieve a 35% compression in health system committee sign-off timelines.',
          metric: '35% Faster Hospital Approvals',
        },
      },
      {
        heading: 'Accelerate Your Clinical Adoption Trajectory',
        body: 'Explore how ProfitMachines can expand your hospital and health system footprint while dramatically lowering commercial customer acquisition costs.',
      },
    ],
    subjectSuggestions: [
      'Discover Healthcare Technology Market Opportunities',
      'Health system commercial acceleration for digital health leaders',
      'Navigating hospital procurement with autonomous revenue intelligence',
    ],
    defaultSubject: 'Discover Healthcare Technology Market Opportunities',
    preheader: 'Discover active hospital modernization initiatives and accelerate clinical pipeline.',
    primaryCta: {
      label: 'Explore Healthcare Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Elena Rostova',
      senderTitle: 'Lead Healthcare Strategist',
      senderCompany: 'ProfitMachines',
    },
  },
];
