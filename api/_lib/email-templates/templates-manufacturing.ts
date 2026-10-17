/**
 * api/_lib/email-templates/templates-manufacturing.ts
 *
 * Full template definitions for Manufacturing & Supply Chain (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const manufacturingTemplates: EmailTemplateConfig[] = [
  {
    id: 'manufacturing-new-lead-followup',
    name: 'Manufacturing: New Lead Follow-Up',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/industry-manufacturing.png',
    heroImageAlt: 'Industrial manufacturing plant robotics and supply chain logistics analytics',
    headline: 'Accelerating B2B Industrial OEM Sales & Distributor Network Velocity',
    introduction:
      'Thank you for connecting with ProfitMachines, {{name}}. In manufacturing, industrial equipment, and global supply chains, commercial growth demands coordinating distributor networks, managing long quotation cycles, and defending factory utilization.',
    sections: [
      {
        heading: 'Solving the Industrial Commercial Bottleneck',
        body: 'Manufacturing sales teams frequently face months of sluggish quote turnarounds, opaque distributor pipelines, and uncoordinated procurement bids. ProfitMachines deploys automated account-based intelligence that identifies plant modernization projects and replacement cycles before public tenders are issued.',
        bulletPoints: [
          'Continuous capital expenditure (CapEx) intent surveillance tracking industrial plant modernization signals',
          'Autonomous multi-channel outreach engaging Plant Managers, Operations VPs, and Chief Procurement Officers',
          'Automated distributor quoting assistance to shorten bid-to-contract cycle times',
        ],
        calloutBox: {
          title: 'Manufacturing Benchmark',
          text: 'Industrial OEM clients compress quote-to-close turnaround times by 46% through automated distributor deal tracking.',
          metric: '46% Faster Quote Turnaround',
        },
      },
    ],
    subjectSuggestions: [
      'Accelerating industrial OEM sales pipeline for {{company}}',
      'Manufacturing supply chain commercial optimization for {{company}}',
      'Follow-up: Scaling industrial distributor velocity',
    ],
    defaultSubject: 'Discover New Industrial and Supply Chain Opportunities',
    preheader: 'Explore automated pipeline acceleration and distributor management for industrial manufacturers.',
    primaryCta: {
      label: 'Schedule Industrial Strategy Briefing',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'David K. Hoffman',
      senderTitle: 'Partner, Industrial & Supply Chain Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-consultation-demo-followup',
    name: 'Manufacturing: Consultation & Demo Follow-Up',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-enterprise-board.jpg',
    heroImageAlt: 'Industrial executive leadership reviewing supply chain efficiency curves',
    headline: 'Industrial Commercial Briefing Summary for {{company}}',
    introduction:
      'Thank you for joining our recent manufacturing briefing, {{name}}. We examined how {{company}} can leverage automated revenue systems to stabilize order flow, optimize plant utilization, and win competitive Tier-1 supplier contracts.',
    sections: [
      {
        heading: 'Key Takeaways & Proposed Implementation Focus',
        body: 'During our consultation, we identified opportunities to streamline distributor quote workflows, monitor buyer intent signals across tier-1 assembly plants, and build automated proposal models.',
        bulletPoints: [
          'Ingestion of plant expansion and equipment leasing signals across regional industrial parks',
          'Autonomous lead routing ensuring distributor partners receive pre-qualified procurement opportunities',
          'Standardized total-cost-of-operation (TCO) calculators for industrial purchasing committees',
        ],
      },
    ],
    subjectSuggestions: [
      'Industrial Consultation Summary & Next Steps — {{company}}',
      'Executive Briefing Summary: Manufacturing Sales Acceleration for {{company}}',
      'Following up on our industrial revenue operations discussion',
    ],
    defaultSubject: 'Industrial Commercial Briefing Summary for {{company}}',
    preheader: 'Key manufacturing insights and next steps from our recent strategy consultation.',
    primaryCta: {
      label: 'Review Manufacturing Blueprint',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'David K. Hoffman',
      senderTitle: 'Partner, Industrial & Supply Chain Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-resource-sharing',
    name: 'Manufacturing: Resource & Research Sharing',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'resource-sharing',
    engagementLabel: 'Industrial Research Dossier',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'Global supply chain logistics data and industrial CapEx trends',
    headline: '2026 Industrial Manufacturing & Supply Chain Commercial Dossier',
    introduction:
      'Hi {{name}}, our Industrial and Supply Chain Practice has published an empirical study detailing how top-tier manufacturers and equipment distributors are modernizing their commercial operations.',
    sections: [
      {
        heading: 'Highlights from the Industrial Dossier',
        body: 'Evaluating data across 220+ North American and European industrial manufacturers, this whitepaper explores how supply chain uncertainty and digital procurement are shifting buyer behavior.',
        bulletPoints: [
          'The Rise of Digital Industrial Procurement: How B2B Buyers Research Equipment in 2026',
          'Mitigating Margin Erosion in Fixed-Price Long-Term Supply Agreements',
          'Case Studies: How an Industrial Robotics OEM Grew High-Margin Service Contracts by 62%',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 Industrial Commercial Dossier for {{company}}',
      'Research Report: Supply chain commercialization and CapEx trends',
      'Data-driven manufacturing sales benchmarks and distributor models',
    ],
    defaultSubject: 'New Research: 2026 Industrial Manufacturing Commercial Intelligence',
    preheader: 'Empirical data on industrial procurement cycles, distributor networks, and CapEx intent.',
    primaryCta: {
      label: 'Download Manufacturing Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Industrial Research Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-product-service-update',
    name: 'Manufacturing: Product & Service Update',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'product-service-update',
    engagementLabel: 'Industrial Telemetry Update',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'Industrial IoT and supply chain telemetry analytics architecture',
    headline: 'Introducing CapExRadar™: Industrial Procurement Intent Telemetry',
    introduction:
      'We are proud to unveil CapExRadar™, our proprietary industrial demand surveillance module engineered specifically for manufacturers, OEMs, and heavy industrial suppliers, {{name}}.',
    sections: [
      {
        heading: 'Purpose-Built for Industrial Commercial Teams',
        body: 'CapExRadar™ analyzes public regulatory filings, industrial zoning approvals, facility expansion permits, and supply chain trade data to identify companies actively purchasing equipment.',
        bulletPoints: [
          'Real-time alerts when enterprise industrial buyers request facility permits or submit grant applications',
          'Automated mapping of Plant Engineers, Procurement Directors, and Regional Operations Heads',
          'Direct synchronization with industrial ERPs (SAP, Oracle NetSuite, Epicor)',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: CapExRadar™ for Industrial Manufacturers',
      'Product Update: Detecting factory modernization projects with ProfitMachines',
      'Accelerating industrial commercial velocity in 2026',
    ],
    defaultSubject: 'Platform Update: Detecting Industrial CapEx Projects in Real Time',
    preheader: 'Identify factory expansion and equipment procurement projects months before competitors.',
    primaryCta: {
      label: 'Explore CapExRadar™',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Industrial Product Team',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-re-engagement',
    name: 'Manufacturing: Executive Re-Engagement',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-profit-pool.png',
    heroImageAlt: 'Industrial margin optimization and supplier contract revenue curves',
    headline: 'Revisiting Industrial Commercial Growth for {{company}}',
    introduction:
      'Hi {{name}}, as industrial raw material costs and global supply chain trade patterns fluctuate, we wanted to reconnect and see how {{company}} is pacing against your manufacturing commercial goals.',
    sections: [
      {
        heading: 'Commercial Health Check for Industrial Leadership',
        body: 'Maintaining full capacity utilization requires a consistent pipeline of profitable commercial contracts. When we last connected, we discussed potential areas to strengthen distributor coordination.',
        bulletPoints: [
          'Has your quotation win rate remained consistent across your primary distributor network?',
          'Are long sales cycles still causing unpredictable factory scheduling spikes?',
          'Would updated industrial CapEx intent data provide strategic clarity for your next quarterly review?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on industrial growth strategy for {{company}}',
      'Checking in: Manufacturing commercial pipeline at {{company}}',
      'Industrial supply chain market updates for {{company}}',
    ],
    defaultSubject: 'Revisiting Industrial Commercial Growth Strategy for {{company}}',
    preheader: 'A brief executive check-in on manufacturing order flow, distributor velocity, and plant utilization.',
    primaryCta: {
      label: 'Schedule Industrial Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'David K. Hoffman',
      senderTitle: 'Partner, Industrial & Supply Chain Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-industry-engagement',
    name: 'Manufacturing: Industry Engagement & Trend Analysis',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'industry-engagement',
    engagementLabel: 'Supply Chain Trends',
    heroImage: '/images/hero-ai-transformation.png',
    heroImageAlt: 'Smart factory manufacturing transformation and predictive maintenance metrics',
    headline: 'The Nearshoring Wave: Capitalizing on Regional Supply Chain Relocation',
    introduction:
      'The strategic relocation of industrial production and assembly operations to regional hubs is reshaping B2B supplier selection. Here is our analysis on how manufacturers can capture this momentum.',
    sections: [
      {
        heading: 'Capturing High-Value Nearshoring Contracts',
        body: 'OEMs and Tier-1 suppliers are prioritizing suppliers with verifiable local resilience, transparent quality auditing, and fast turnaround capacity over pure low-cost offshore providers.',
        bulletPoints: [
          'How to position domestic manufacturing resilience as a risk mitigation premium in B2B bids',
          'Automating compliance verification for defense, automotive, and medical device supply chains',
          'Connecting predictive demand telemetry to production line changeovers to minimize idle time',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Analysis: Winning Nearshoring Contracts in 2026',
      'Strategic Briefing: How regional supply chain relocation impacts manufacturers',
      'Modernizing industrial supplier procurement and bid positioning',
    ],
    defaultSubject: 'Industry Analysis: Capturing Nearshoring Opportunities in 2026',
    preheader: 'Strategic insights for manufacturing leaders on regional supply chain shifts and OEM bids.',
    primaryCta: {
      label: 'Read Full Industrial Briefing',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Industrial Advisory Council',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-welcome',
    name: 'Manufacturing: Welcome & Orientation Briefing',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/industry-manufacturing.png',
    heroImageAlt: 'Welcome to ProfitMachines Manufacturing intelligence platform',
    headline: 'Welcome to ProfitMachines Industrial Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined an esteemed network of industrial CEOs, OEM executives, and supply chain innovators who use autonomous commercial intelligence to secure high-value production contracts.',
    sections: [
      {
        heading: 'Your Industrial Growth Suite Privileges',
        body: 'As a verified manufacturing ecosystem participant, you receive ongoing access to our proprietary industrial intent telemetry, distributor benchmarking playbooks, and CapEx forecast data.',
        bulletPoints: [
          'Monthly Industrial CapEx Project Telemetry Reports tracking regional plant expansions',
          'Standardized Total Cost of Operation (TCO) proposal calculators for industrial buyers',
          'Invitations to our exclusive Industrial Manufacturing & Supply Chain Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Industrial Intelligence, {{name}}',
      'Your orientation to the manufacturing revenue network',
      'Welcome aboard: Scaling industrial production revenue with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Industrial Manufacturing Growth Architecture',
    preheader: 'Your orientation guide to industrial revenue acceleration and supply chain commercialization.',
    primaryCta: {
      label: 'Access Industrial Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Industrial Practice Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'manufacturing-industry-campaign',
    name: 'Manufacturing: Executive Industry Campaign',
    industry: 'manufacturing',
    industryLabel: 'Manufacturing & Supply Chain',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/industry-manufacturing.png',
    heroImageAlt: 'Manufacturing industry campaign dashboard with industrial output curves',
    headline: 'Discover New Industrial and Supply Chain Opportunities',
    introduction:
      'Winning long-term industrial OEM contracts and expanding distributor throughput requires identifying plant modernization initiatives long before public bids are published, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue OS for Industrial Manufacturers',
        body: 'ProfitMachines provides unified revenue architecture designed specifically for manufacturers and industrial equipment suppliers. We track real-time CapEx permits, plant expansion signals, and procurement cycles across thousands of industrial facilities.',
        bulletPoints: [
          'Uncover facility expansion permits and equipment replacement cycles across North America and Europe',
          'Deploy automated multi-stakeholder orchestration engaging Plant Managers, Operations VPs, and CFOs',
          'Compress distributor quote-to-close turnaround times by 46% with automated proposal frameworks',
        ],
        calloutBox: {
          title: 'Manufacturing Impact Metric',
          text: 'Industrial OEM clients achieve a 46% compression in quote-to-contract cycle times.',
          metric: '46% Faster Deal Cycles',
        },
      },
      {
        heading: 'Protect Plant Capacity and Expand High-Margin Contracts',
        body: 'Schedule an exploratory briefing with our industrial practice leaders to see how our autonomous revenue mesh accelerates commercial contract flow.',
      },
    ],
    subjectSuggestions: [
      'Discover New Industrial and Supply Chain Opportunities',
      'Industrial OEM commercial acceleration and distributor velocity',
      'Securing high-margin manufacturing contracts with autonomous intelligence',
    ],
    defaultSubject: 'Discover New Industrial and Supply Chain Opportunities',
    preheader: 'Discover active industrial CapEx projects and accelerate manufacturing commercial pipeline.',
    primaryCta: {
      label: 'Explore Manufacturing Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'David K. Hoffman',
      senderTitle: 'Partner, Industrial & Supply Chain Practice',
      senderCompany: 'ProfitMachines',
    },
  },
];
