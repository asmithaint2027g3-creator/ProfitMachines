/**
 * api/_lib/email-templates/templates-saas.ts
 *
 * Full template definitions for SaaS & Cloud Software:
 * 1. New lead follow-up
 * 2. Consultation/demo follow-up
 * 3. Resource sharing
 * 4. Product/service update
 * 5. Re-engagement
 * 6. Industry engagement
 * 7. Welcome email
 * 8. Industry campaign
 */

import type { EmailTemplateConfig } from './types';

export const saasTemplates: EmailTemplateConfig[] = [
  {
    id: 'saas-new-lead-followup',
    name: 'SaaS: New Lead Follow-Up',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/industry-saas.png',
    heroImageAlt: 'SaaS cloud analytics and recurring revenue growth dashboard',
    headline: 'Accelerating Net Revenue Retention & Product Pipeline Velocity',
    introduction:
      'Thank you for connecting with ProfitMachines, {{name}}. In enterprise SaaS, sustainable valuation is driven by capital-efficient customer acquisition and continuous net revenue expansion.',
    sections: [
      {
        heading: 'Overcoming Modern SaaS Growth Headwinds',
        body: 'SaaS operators today face longer enterprise buying cycles, rising customer acquisition costs (CAC), and increased scrutiny on software seat utilization. ProfitMachines deploys autonomous demand generation engines that identify in-market buyers before they submit formal RFPs.',
        bulletPoints: [
          'Continuous dark-funnel intent telemetry tracking enterprise software procurement signals',
          'Autonomous multi-threaded outreach mapped directly to CFO and engineering committee stakeholders',
          'Algorithmic deal slippage detection that flags stalled enterprise software evaluations',
        ],
        calloutBox: {
          title: 'SaaS Benchmark',
          text: 'Enterprise SaaS teams leveraging autonomous revenue intelligence achieve up to 3.8× pipeline velocity.',
          metric: '3.8× Pipeline Velocity',
        },
      },
      {
        heading: 'Recommended Next Step for {{company}}',
        body: 'We would love to share a personalized SaaS pipeline audit evaluating your current inbound conversion rates against top-quartile cloud software benchmarks.',
      },
    ],
    subjectSuggestions: [
      'Accelerating SaaS pipeline velocity for {{company}}',
      'Quick follow-up on your ProfitMachines inquiry',
      'Scaling recurring revenue efficiency for {{company}}',
    ],
    defaultSubject: 'Discover New Growth Opportunities for Your SaaS Business',
    preheader: 'Explore how autonomous revenue intelligence accelerates ARR velocity for cloud software companies.',
    primaryCta: {
      label: 'Schedule a SaaS Architecture Briefing',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Asmitha V',
      senderTitle: 'Head of Enterprise SaaS Solutions',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-consultation-demo-followup',
    name: 'SaaS: Consultation & Demo Follow-Up',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation & Demo Briefing',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'SaaS platform architecture and autonomous intelligence nodes',
    headline: 'Executive Summary: SaaS Pipeline Transformation for {{company}}',
    introduction:
      'Thank you for your time during our recent architectural briefing, {{name}}. We reviewed how ProfitMachines integrates with existing cloud tech stacks to eliminate pipeline friction and accelerate recurring revenue.',
    sections: [
      {
        heading: 'Key Takeaways from Our Discussion',
        body: 'During our session, we identified specific opportunities where autonomous buyer surveillance and multi-channel orchestration can reduce sales rep drag and improve quota attainment across {{company}}.',
        bulletPoints: [
          'Integration with Salesforce/HubSpot to automatically enrich dark-funnel buying signals',
          'Autonomous SDR copilot workflows handling tier-2 outbound qualification and discovery scheduling',
          'Board-ready economic value models demonstrating clear ARR acceleration within 90 days',
        ],
      },
      {
        heading: 'Next Phase: Proof of Concept Staging',
        body: 'Our engineering team is prepared to configure a 14-day telemetry sandbox scoped to your ideal customer profile (ICP).',
        calloutBox: {
          title: 'Deployment Timeline',
          text: 'Full telemetry sandbox deployment takes under 48 hours with zero disruption to active SDR workflows.',
          metric: '48-Hour Sandbox Staging',
        },
      },
    ],
    subjectSuggestions: [
      'Following up on our SaaS architecture briefing — {{company}}',
      'Executive summary & sandbox proposal for {{company}}',
      'Next steps: SaaS pipeline acceleration for {{company}}',
    ],
    defaultSubject: 'Executive Summary: SaaS Growth Architecture for {{company}}',
    preheader: 'Key takeaways and sandbox deployment details from our recent SaaS consultation.',
    primaryCta: {
      label: 'Review Architecture Sandbox Scope',
      url: '/solutions',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Asmitha V',
      senderTitle: 'Head of Enterprise SaaS Solutions',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-resource-sharing',
    name: 'SaaS: Resource & Research Sharing',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'resource-sharing',
    engagementLabel: 'Market Intelligence Report',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'SaaS market intelligence telemetry and demand radar graph',
    headline: '2026 SaaS Revenue Architecture: The Autonomous Playbook',
    introduction:
      'Hi {{name}}, we recently published an in-depth research briefing on modern cloud revenue operations and thought it would be directly relevant to your growth initiatives at {{company}}.',
    sections: [
      {
        heading: 'What You Will Find in the Dossier',
        body: 'Drawing on analysis from over 250 enterprise B2B SaaS deployments, this whitepaper breaks down why traditional outbound SDR playbooks are stalling and how algorithmic telemetry restores predictable deal flow.',
        bulletPoints: [
          'The 4 Critical Leakage Points in Modern Cloud Software Sales Funnels',
          'How Dark-Funnel Intent Signals Uncover Active Buying Committees 60 Days Ahead of RFPs',
          'Comparative Benchmarks: Rule of 40 Leaders vs. Median SaaS Operators in 2026',
        ],
        calloutBox: {
          title: 'Key Finding',
          text: 'SaaS organizations using multi-agent signal mesh experience a 65% reduction in blended CAC.',
          metric: '-65% Blended CAC',
        },
      },
    ],
    subjectSuggestions: [
      'SaaS Market Intelligence Dossier for {{company}}',
      'Research Report: The Autonomous SaaS Revenue Playbook',
      'New data on enterprise software buying cycles (Q1 2026)',
    ],
    defaultSubject: 'New Research: The 2026 Enterprise SaaS Revenue Playbook',
    preheader: 'Explore empirical data and strategic models for accelerating cloud software ARR.',
    primaryCta: {
      label: 'Download the SaaS Revenue Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Research & Strategy Team',
      senderTitle: 'Enterprise Intelligence Group',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-product-service-update',
    name: 'SaaS: Product & Service Update',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'product-service-update',
    engagementLabel: 'Platform Release Notes',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'Cloud data pipeline intelligence and connected API architecture',
    headline: 'Announcing DemandPulse AI™ for Cloud Software Enterprises',
    introduction:
      'We are pleased to introduce our latest enterprise engine enhancement designed specifically for SaaS platforms seeking real-time buyer intent telemetry, {{name}}.',
    sections: [
      {
        heading: 'What is New in the Latest Release',
        body: 'DemandPulse AI™ now features native bi-directional synchronization with modern cloud data warehouses (Snowflake, BigQuery) and major CRM ecosystems.',
        bulletPoints: [
          'Real-time webhook triggers when target ICP accounts spike in unbranded research queries',
          'Autonomous account qualification scoring based on actual software stack compatibility',
          'Zero-latency handoff to sales engineering teams with auto-generated deal briefs',
        ],
      },
      {
        heading: 'Impact for Enterprise Cloud Teams',
        body: 'SaaS teams can now activate cold pipeline segments with surgical precision, reducing time-to-first-response from hours to under 3 minutes.',
      },
    ],
    subjectSuggestions: [
      'New Release: DemandPulse AI™ for Cloud Software Leaders',
      'Platform Update: Real-time buyer intent engine for SaaS',
      'Enhancing your SaaS pipeline telemetry with ProfitMachines',
    ],
    defaultSubject: 'New Platform Capabilities: Autonomous Intent for Enterprise SaaS',
    preheader: 'Discover how DemandPulse AI™ transforms dark-funnel buying signals into qualified SaaS pipeline.',
    primaryCta: {
      label: 'Explore New Capabilities',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Product Engineering Team',
      senderTitle: 'Platform Architecture Group',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-re-engagement',
    name: 'SaaS: Executive Re-Engagement',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-profit-pool.png',
    heroImageAlt: 'Strategic SaaS profit pool discovery and revenue topology',
    headline: 'Revisiting Cloud Revenue Optimization for {{company}}',
    introduction:
      'Hi {{name}}, as enterprise SaaS market dynamics continue to evolve in 2026, we wanted to reconnect and share new strategic frameworks designed to protect margins and accelerate ARR.',
    sections: [
      {
        heading: 'Has Your Software Pipeline Topology Shifted?',
        body: 'Many cloud leaders we advise are currently re-evaluating their outbound unit economics and rep productivity models. When we last connected, we discussed potential alignment opportunities around {{company}}.',
        bulletPoints: [
          'Has your target customer acquisition cost remained within planned model targets?',
          'Are your sales engineers still burdened by non-qualified discovery calls?',
          'Would updated enterprise SaaS benchmarks provide helpful strategic calibration?',
        ],
        calloutBox: {
          title: 'Market Update',
          text: 'Over 80% of top-performing SaaS organizations now rely on autonomous intent filters.',
          metric: '80% Adoption Rate',
        },
      },
    ],
    subjectSuggestions: [
      'Reconnecting on SaaS growth initiatives for {{company}}',
      'Checking in: Cloud pipeline efficiency at {{company}}',
      'Updated SaaS revenue benchmarks for {{company}}',
    ],
    defaultSubject: 'Revisiting Enterprise SaaS Revenue Efficiency for {{company}}',
    preheader: 'A brief executive check-in on pipeline acceleration and ARR expansion models.',
    primaryCta: {
      label: 'Reopen Strategy Conversation',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Asmitha V',
      senderTitle: 'Head of Enterprise SaaS Solutions',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-industry-engagement',
    name: 'SaaS: Industry Engagement & Trend Analysis',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'industry-engagement',
    engagementLabel: 'Industry Deep Dive',
    heroImage: '/images/revenue-acceleration-engine.png',
    heroImageAlt: 'SaaS revenue acceleration engine analytics curves',
    headline: 'Navigating the 2026 Shift from Seat-Based to Value-Based SaaS',
    introduction:
      'The cloud industry is experiencing a profound architectural shift. As AI agents reduce human seat count, enterprise SaaS businesses must pivot commercial packaging toward value metrics.',
    sections: [
      {
        heading: 'Strategic Imperatives for Modern SaaS Founders & CROs',
        body: 'To protect annual contract value (ACV) and drive sustained net expansion, cloud software companies are adopting consumption and outcome-linked pricing tiers.',
        bulletPoints: [
          'De-risking seat contraction through autonomous platform utilization telemetry',
          'Deploying AI-native expansion triggers within your product analytics fabric',
          'Aligning executive incentives with customer margin creation rather than vanity log-ins',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Briefing: Navigating the 2026 SaaS Pricing Evolution',
      'Protecting ACV in the era of autonomous software',
      'Strategic analysis: Value-based pricing in cloud software',
    ],
    defaultSubject: 'Industry Analysis: Protecting Enterprise SaaS Valuations in 2026',
    preheader: 'Strategic insights for cloud software leadership navigating evolving pricing models.',
    primaryCta: {
      label: 'Read Full SaaS Briefing',
      url: '/solutions',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Strategic Advisory Council',
      senderTitle: 'Cloud Economics Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-welcome',
    name: 'SaaS: Welcome & Orientation Briefing',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/industry-saas.png',
    heroImageAlt: 'Welcome to ProfitMachines SaaS intelligence platform',
    headline: 'Welcome to ProfitMachines Autonomous SaaS Intelligence',
    introduction:
      'Welcome {{name}}. You have joined an elite network of enterprise SaaS leaders and cloud operators leveraging autonomous revenue architecture to outpace competitors.',
    sections: [
      {
        heading: 'What You Can Expect',
        body: 'As a verified member of our cloud software ecosystem, you will receive priority access to empirical SaaS research, market signal telemetry, and proprietary playbooks.',
        bulletPoints: [
          'Quarterly SaaS Pipeline Velocity & ICP benchmark reports',
          'Invitations to closed-door roundtable sessions with venture-backed CROs',
          'Early access to new DemandPulse AI™ cloud connector modules',
        ],
      },
      {
        heading: 'Quick Start: Explore Your Growth Suite',
        body: 'Begin by reviewing our comprehensive SaaS solutions matrix or running a complimentary pipeline diagnostic for {{company}}.',
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Autonomous SaaS Intelligence, {{name}}',
      'Your orientation to the ProfitMachines SaaS network',
      'Welcome aboard: Scaling cloud software ARR with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Enterprise SaaS Growth Architecture',
    preheader: 'Your orientation guide to autonomous revenue systems and cloud growth models.',
    primaryCta: {
      label: 'Access Your SaaS Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Welcome aboard',
      senderName: 'The ProfitMachines Team',
      senderTitle: 'Client Success & Advisory',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'saas-industry-campaign',
    name: 'SaaS: Executive Industry Campaign',
    industry: 'saas',
    industryLabel: 'SaaS & Cloud Software',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/industry-saas.png',
    heroImageAlt: 'SaaS industry campaign intelligence dashboard with cloud ARR curves',
    headline: 'Discover New Growth Opportunities for Your SaaS Business',
    introduction:
      'In today’s hyper-competitive software landscape, leading B2B SaaS companies no longer rely on spray-and-pray outbound prospecting or disconnected marketing funnels, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue Advantage for Cloud Platforms',
        body: 'ProfitMachines provides unified revenue architecture designed specifically for venture-backed and enterprise SaaS operators. By synthesizing real-time intent telemetry, autonomous SDR orchestration, and predictive deal scoring, we help cloud leaders unlock hidden ARR velocity.',
        bulletPoints: [
          'Uncover untracked TAM and dark-funnel buying committees actively evaluating your category',
          'Deploy persistent multi-agent swarms that qualify enterprise accounts without manual SDR drag',
          'Achieve 5.4× pipeline velocity with verifiable CFO-ready economic defense models',
        ],
        calloutBox: {
          title: 'SaaS Impact Metric',
          text: 'Enterprise cloud providers using ProfitMachines report an average 54% reduction in targeted CAC.',
          metric: '54% Targeted CAC Reduction',
        },
      },
      {
        heading: 'Take the Next Step Toward Capital-Efficient ARR',
        body: 'Explore how ProfitMachines integrates with your existing CRM and marketing automation stacks to create an autonomous revenue engine that runs 24/7.',
      },
    ],
    subjectSuggestions: [
      'Discover New Growth Opportunities for Your SaaS Business',
      'Accelerating ARR velocity for cloud software enterprises',
      'The modern revenue engine for B2B SaaS leaders',
    ],
    defaultSubject: 'Discover New Growth Opportunities for Your SaaS Business',
    preheader: 'Unlock predictable pipeline acceleration and lower CAC for your cloud software business.',
    primaryCta: {
      label: 'Explore SaaS Growth Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Asmitha V',
      senderTitle: 'Head of Enterprise SaaS Solutions',
      senderCompany: 'ProfitMachines',
    },
  },
];
