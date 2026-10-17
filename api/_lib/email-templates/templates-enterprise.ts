/**
 * api/_lib/email-templates/templates-enterprise.ts
 *
 * Full template definitions for Other Enterprise Sector (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const enterpriseTemplates: EmailTemplateConfig[] = [
  {
    id: 'other-enterprise-new-lead-followup',
    name: 'Enterprise Sector: New Lead Follow-Up',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'Enterprise AI digital transformation dashboard and neural revenue graph',
    headline: 'Eliminating Pipeline Drag & Architecting Autonomous Enterprise ARR',
    introduction:
      'Thank you for contacting ProfitMachines, {{name}}. In multi-divisional enterprises, legacy commercial operations create significant pipeline drag, delayed forecasting, and escalating acquisition friction.',
    sections: [
      {
        heading: 'Deploying Autonomous Revenue Infrastructure',
        body: 'ProfitMachines replaces manual, fragmented commercial processes with a connected intelligence mesh. We orchestrate real-time buyer intent telemetry, multi-agent SDR qualification swarms, and executive CFO defense models across complex business units.',
        bulletPoints: [
          'Continuous dark-funnel intent telemetry tracking procurement and competitive evaluation signals',
          'Autonomous multi-threaded alignment across Board, Finance, and Line-of-Business decision makers',
          'Verifiable revenue forecasting backed by sub-second deal telemetry and algorithmic diagnostics',
        ],
        calloutBox: {
          title: 'Enterprise Benchmark',
          text: 'Enterprise organizations deploying autonomous revenue telemetry achieve an average 5.4× increase in ARR velocity.',
          metric: '5.4× ARR Velocity',
        },
      },
    ],
    subjectSuggestions: [
      'Accelerating enterprise ARR velocity for {{company}}',
      'Follow-up: Autonomous revenue architecture for {{company}}',
      'Eliminating enterprise pipeline friction at {{company}}',
    ],
    defaultSubject: 'Discover New Opportunities for Your Business',
    preheader: 'Explore how autonomous revenue intelligence accelerates ARR velocity for enterprise organizations.',
    primaryCta: {
      label: 'Schedule Enterprise Architecture Call',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Pooja K.',
      senderTitle: 'Director of Enterprise Architecture',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-consultation-demo-followup',
    name: 'Enterprise Sector: Consultation & Demo Follow-Up',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-enterprise-board.jpg',
    heroImageAlt: 'Enterprise executive board consultation and strategic planning',
    headline: 'Executive Consultation Summary for {{company}}',
    introduction:
      'Thank you for our recent strategic consultation, {{name}}. We examined how {{company}} can eliminate commercial pipeline leaks and unify revenue operations across your divisions.',
    sections: [
      {
        heading: 'Strategic Discussion Summary',
        body: 'During our briefing, we explored how multi-agent revenue pipelines and real-time deal diagnostics can be integrated into your existing tech stack without operational disruption.',
        bulletPoints: [
          'Connecting disparate CRM streams (Salesforce, HubSpot, Snowflake) into a unified predictive fabric',
          'Deploying autonomous objection resolution playbooks to recover stalled mid-funnel deals',
          'Structuring conservative sensitivity models for executive boardroom sign-off',
        ],
      },
    ],
    subjectSuggestions: [
      'Enterprise Consultation Summary & Next Steps — {{company}}',
      'Executive Briefing Summary: Revenue Acceleration for {{company}}',
      'Following up on our enterprise revenue strategy session',
    ],
    defaultSubject: 'Executive Consultation Summary for {{company}}',
    preheader: 'Key enterprise insights and architecture roadmap from our recent strategy consultation.',
    primaryCta: {
      label: 'Review Architecture Blueprint',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Pooja K.',
      senderTitle: 'Director of Enterprise Architecture',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-resource-sharing',
    name: 'Enterprise Sector: Resource & Research Sharing',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'resource-sharing',
    engagementLabel: 'Executive Research Dossier',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'Enterprise market intelligence telemetry and revenue radar graph',
    headline: 'The 2026 Autonomous Enterprise Revenue Dossier',
    introduction:
      'Hi {{name}}, our Enterprise Advisory Practice has published a comprehensive study on how Global 2000 companies are re-architecting commercial operations in response to market volatility.',
    sections: [
      {
        heading: 'Key Insights from the Enterprise Dossier',
        body: 'Drawing on analysis from over 350 enterprise revenue teams, this whitepaper breaks down why traditional sales organizations stall and how autonomous telemetry restores predictable deal flow.',
        bulletPoints: [
          'The 5 Critical Failure Points in Legacy Enterprise B2B Sales Funnels',
          'How Dark-Funnel Intent Signals Uncover Active Buying Committees Months Ahead of RFPs',
          'Comparative Benchmarks: Top-Quartile Revenue Leaders vs. Industry Averages',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 Enterprise Revenue Dossier for {{company}}',
      'Research Report: The Autonomous Enterprise Revenue Playbook',
      'Data-driven enterprise pipeline benchmarks and case studies',
    ],
    defaultSubject: 'New Research: The 2026 Autonomous Enterprise Revenue Playbook',
    preheader: 'Empirical data on enterprise buying cycles, pipeline velocity, and CAC efficiency.',
    primaryCta: {
      label: 'Download Enterprise Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Enterprise Intelligence Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-product-service-update',
    name: 'Enterprise Sector: Product & Service Update',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'product-service-update',
    engagementLabel: 'Platform Release Notes',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'Enterprise data fabric architecture with distributed neural pipelines',
    headline: 'Announcing Enterprise Telemetry Mesh 3.0',
    introduction:
      'We are pleased to introduce Enterprise Telemetry Mesh 3.0, engineered specifically for multi-divisional corporations seeking unified real-time buyer intelligence, {{name}}.',
    sections: [
      {
        heading: 'New Capabilities for Enterprise Revenue Teams',
        body: 'Enterprise Telemetry Mesh 3.0 delivers zero-latency deal diagnostics, automated pipeline triage, and multi-tenant sandboxing designed for strict enterprise governance.',
        bulletPoints: [
          'Unified data lakehouse integration connecting Salesforce, SAP, and Snowflake without complex ETL',
          'Sub-second deal slippage alerts flagging unexpected stalls in active multi-million dollar deals',
          'Role-based access controls (RBAC) and enterprise SSO/SAML integration out of the box',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: Enterprise Telemetry Mesh 3.0',
      'Platform Update: Unified buyer intelligence for enterprise leaders',
      'Accelerating enterprise deal velocity with ProfitMachines',
    ],
    defaultSubject: 'Platform Update: Enterprise Telemetry Mesh 3.0',
    preheader: 'Discover how Enterprise Telemetry Mesh 3.0 unifies commercial intelligence across divisions.',
    primaryCta: {
      label: 'Explore New Capabilities',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Product Engineering Team',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-re-engagement',
    name: 'Enterprise Sector: Executive Re-Engagement',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-profit-pool.png',
    heroImageAlt: 'Enterprise profit pool discovery and market topology analytics',
    headline: 'Revisiting Enterprise Commercial Growth for {{company}}',
    introduction:
      'Hi {{name}}, as corporate budget priorities and market conditions evolve this quarter, we wanted to reconnect and see how {{company}} is pacing against your strategic growth goals.',
    sections: [
      {
        heading: 'Strategic Reflection for Enterprise Leaders',
        body: 'Maintaining capital-efficient revenue growth requires continuous evaluation of commercial unit economics and rep productivity models.',
        bulletPoints: [
          'Has your customer acquisition cost remained within targeted enterprise ranges?',
          'Are extended buying committees still causing unpredictable deal slippage?',
          'Would updated enterprise revenue benchmarks provide helpful calibration for your upcoming executive offsite?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on enterprise growth strategy for {{company}}',
      'Checking in: Revenue velocity at {{company}}',
      'Enterprise market updates and benchmarks for {{company}}',
    ],
    defaultSubject: 'Revisiting Enterprise Revenue Growth Strategy for {{company}}',
    preheader: 'A brief executive check-in on pipeline acceleration and ARR expansion models.',
    primaryCta: {
      label: 'Schedule Strategic Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Pooja K.',
      senderTitle: 'Director of Enterprise Architecture',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-industry-engagement',
    name: 'Enterprise Sector: Industry Engagement & Trend Analysis',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'industry-engagement',
    engagementLabel: 'Strategic Trend Analysis',
    heroImage: '/images/revenue-acceleration-engine.png',
    heroImageAlt: 'Enterprise revenue acceleration engine curves and telemetry metrics',
    headline: 'The Autonomous Enterprise: Redefining Commercial Competitiveness',
    introduction:
      'Enterprise organizations that continue to rely on manual, disconnected sales and marketing workflows are being outpaced by competitors with unified autonomous revenue architectures. Here is our strategic analysis.',
    sections: [
      {
        heading: 'Strategic Imperatives for Modern Enterprise Leadership',
        body: 'To protect operating margins and drive sustained ARR velocity, market leaders are adopting algorithmic demand sensing and multi-agent commercial orchestration.',
        bulletPoints: [
          'Eliminating manual rep prospecting drag to focus human talent on high-stakes negotiations',
          'Deploying continuous dark-funnel intent surveillance across global accounts',
          'Aligning board-level growth mandates with automated front-line execution triggers',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Analysis: The Autonomous Enterprise Revenue Architecture in 2026',
      'Strategic Briefing: How enterprise leaders eliminate commercial drag',
      'Protecting enterprise operating margins with autonomous intelligence',
    ],
    defaultSubject: 'Industry Analysis: The Autonomous Enterprise Revenue Model in 2026',
    preheader: 'Strategic insights for corporate leadership on modernizing commercial operations.',
    primaryCta: {
      label: 'Read Full Strategic Analysis',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Enterprise Advisory Council',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-welcome',
    name: 'Enterprise Sector: Welcome & Orientation Briefing',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'Welcome to ProfitMachines Enterprise intelligence platform',
    headline: 'Welcome to ProfitMachines Enterprise Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined an elite network of enterprise leaders, corporate CROs, and digital transformation executives leveraging autonomous revenue architecture to outpace competitors.',
    sections: [
      {
        heading: 'Your Enterprise Growth Suite Privileges',
        body: 'As a verified enterprise partner, you receive priority access to our proprietary demand surveillance radar, commercial transformation playbooks, and empirical revenue benchmarks.',
        bulletPoints: [
          'Quarterly Enterprise ARR Velocity & Pipeline Benchmark Reports',
          'Proprietary CFO Economic Defense models for large-scale enterprise proposals',
          'Invitations to our exclusive C-Suite Revenue Strategy Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Enterprise Intelligence, {{name}}',
      'Your orientation to the enterprise revenue network',
      'Welcome aboard: Scaling enterprise revenue with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Enterprise Revenue Growth Architecture',
    preheader: 'Your orientation guide to autonomous revenue systems and enterprise growth models.',
    primaryCta: {
      label: 'Access Enterprise Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Enterprise Client Advisory Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'other-enterprise-industry-campaign',
    name: 'Enterprise Sector: Executive Industry Campaign',
    industry: 'other-enterprise',
    industryLabel: 'Other Enterprise Sector',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'Enterprise industry campaign dashboard with corporate revenue curves',
    headline: 'Discover New Opportunities for Your Business',
    introduction:
      'In today’s hyper-competitive commercial environment, enterprise organizations can no longer afford disconnected sales workflows, untracked pipeline leaks, or uncoordinated buyer outreach, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue OS for Global Enterprises',
        body: 'ProfitMachines delivers an integrated revenue architecture designed for multi-divisional corporations. By unifying real-time buyer intent telemetry, autonomous SDR swarms, and predictive deal diagnostics, we help enterprise leaders eliminate commercial drag and accelerate ARR.',
        bulletPoints: [
          'Detect hidden buying intent and untracked TAM across global enterprise accounts',
          'Deploy persistent multi-agent swarms that qualify pipeline 24/7 without manual sales rep drag',
          'Achieve up to 5.4× pipeline velocity with verifiable CFO-ready economic defense models',
        ],
        calloutBox: {
          title: 'Enterprise Impact Metric',
          text: 'Enterprise organizations achieve an average 54% reduction in targeted customer acquisition cost.',
          metric: '54% Targeted CAC Reduction',
        },
      },
      {
        heading: 'Scale Capital-Efficient Enterprise Revenue',
        body: 'Discover how ProfitMachines integrates with your existing tech stack to create an autonomous revenue engine that runs 24/7.',
      },
    ],
    subjectSuggestions: [
      'Discover New Opportunities for Your Business',
      'Enterprise pipeline acceleration and commercial velocity',
      'The autonomous revenue engine for corporate leaders',
    ],
    defaultSubject: 'Discover New Opportunities for Your Business',
    preheader: 'Discover how autonomous intelligence accelerates enterprise pipeline and ARR velocity.',
    primaryCta: {
      label: 'Explore Enterprise Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Pooja K.',
      senderTitle: 'Director of Enterprise Architecture',
      senderCompany: 'ProfitMachines',
    },
  },
];
