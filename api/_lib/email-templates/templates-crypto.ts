/**
 * api/_lib/email-templates/templates-crypto.ts
 *
 * Full template definitions for Crypto & Web3 Protocol (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const cryptoTemplates: EmailTemplateConfig[] = [
  {
    id: 'crypto-new-lead-followup',
    name: 'Crypto & Web3: New Lead Follow-Up',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/hero-market-radar.jpg',
    heroImageAlt: 'Crypto protocol market radar and on-chain telemetry visualization',
    headline: 'Accelerating Web3 Protocol Ecosystem Growth & Enterprise Institutional Adoption',
    introduction:
      'Thank you for connecting with ProfitMachines, {{name}}. In blockchain protocols, decentralized infrastructure, and digital assets, sustainable traction requires moving beyond retail speculative cycles into verifiable enterprise adoption.',
    sections: [
      {
        heading: 'Solving Web3 Enterprise Go-to-Market Friction',
        body: 'Web3 foundations and protocols struggle with developer churn, ambiguous institutional compliance requirements, and non-converting grant programs. ProfitMachines deploys automated developer telemetry and institutional buyer intelligence that converts on-chain activity into enterprise partnerships.',
        bulletPoints: [
          'Continuous on-chain and GitHub repository telemetry tracking high-velocity developer teams',
          'Autonomous institutional partnership outreach mapped directly to FinTech and enterprise treasury leaders',
          'Ecosystem grant qualification and milestone verification workflows that protect treasury capital',
        ],
        calloutBox: {
          title: 'Protocol Benchmark',
          text: 'Enterprise Web3 protocols utilizing automated intent telemetry achieve a 3.4× acceleration in institutional partner onboarding.',
          metric: '3.4× Institutional Onboarding',
        },
      },
    ],
    subjectSuggestions: [
      'Accelerating protocol ecosystem adoption for {{company}}',
      'Web3 institutional partnership growth for {{company}}',
      'Follow-up: Scaling enterprise blockchain revenue operations',
    ],
    defaultSubject: 'Explore Enterprise Web3 and Blockchain Opportunities',
    preheader: 'Explore automated ecosystem intelligence and institutional adoption for Web3 protocols.',
    primaryCta: {
      label: 'Schedule Protocol Growth Briefing',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Soran M.',
      senderTitle: 'Head of Decentralized Infrastructure Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-consultation-demo-followup',
    name: 'Crypto & Web3: Consultation & Demo Follow-Up',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-agentic-ai.png',
    heroImageAlt: 'Decentralized autonomous node mesh and protocol intelligence topology',
    headline: 'Web3 Protocol Strategy Briefing Summary for {{company}}',
    introduction:
      'Thank you for joining our recent protocol briefing, {{name}}. We examined how {{company}} can leverage automated intelligence to scale active developer retention and secure institutional validation.',
    sections: [
      {
        heading: 'Key Takeaways from Our Discussion',
        body: 'During our briefing, we explored how on-chain behavioral telemetry can be linked directly with enterprise CRM workflows to nurture institutional node operators and liquidity partners.',
        bulletPoints: [
          'Deploying real-time alerts when enterprise crypto custody providers or payments firms test your testnet',
          'Automating developer onboarding sequences to boost 30-day smart contract deployment rates',
          'Structuring institutional proof packs addressing custody security, node uptime, and governance decentralization',
        ],
      },
    ],
    subjectSuggestions: [
      'Protocol Growth Briefing Summary & Next Steps — {{company}}',
      'Executive Summary: Institutional Web3 Adoption for {{company}}',
      'Following up on our blockchain infrastructure discussion',
    ],
    defaultSubject: 'Web3 Protocol Strategy Briefing Summary for {{company}}',
    preheader: 'Key protocol growth insights and developer telemetry frameworks from our session.',
    primaryCta: {
      label: 'Review Protocol Roadmap',
      url: '/solutions',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Soran M.',
      senderTitle: 'Head of Decentralized Infrastructure Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-resource-sharing',
    name: 'Crypto & Web3: Resource & Research Sharing',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'resource-sharing',
    engagementLabel: 'Web3 Research Dossier',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'Blockchain network analytics and protocol adoption data curves',
    headline: '2026 Enterprise Blockchain & Real-World Asset (RWA) Adoption Dossier',
    introduction:
      'Hi {{name}}, our Web3 & Digital Assets practice has released a comprehensive empirical report on how Fortune 500 enterprises and institutional financial firms are adopting blockchain rails in 2026.',
    sections: [
      {
        heading: 'Highlights from the Protocol Dossier',
        body: 'Analyzing data across 110 enterprise blockchain pilots, this whitepaper breaks down where real enterprise demand is crystallizing across tokenized assets, cross-border settlement, and decentralized compute.',
        bulletPoints: [
          'The Real-World Asset (RWA) Landscape: Institutional Requirements for Tokenized Treasuries',
          'Why Traditional Crypto Grant Programs Fail and How to Structure Milestone-Gated Incentives',
          'Enterprise Security Auditing: What Institutional CISOs Demand Before Whitelisting Smart Contracts',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 Enterprise Web3 Adoption Dossier for {{company}}',
      'Research Report: Institutional blockchain adoption and RWA trends',
      'Empirical data on enterprise crypto partnerships and developer retention',
    ],
    defaultSubject: 'New Research: 2026 Enterprise Blockchain & Institutional Adoption',
    preheader: 'Empirical data on institutional blockchain adoption, RWA rails, and developer retention.',
    primaryCta: {
      label: 'Download Web3 Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Web3 Research Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-product-service-update',
    name: 'Crypto & Web3: Product & Service Update',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'product-service-update',
    engagementLabel: 'Protocol Telemetry Update',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'Real-time blockchain node telemetry and smart contract data ingestion',
    headline: 'Introducing ProtocolPulse™: On-Chain & Developer Intent Telemetry',
    introduction:
      'We are excited to unveil ProtocolPulse™, an intelligent surveillance module designed specifically for L1/L2 networks, DeFi protocols, and decentralized infrastructure teams, {{name}}.',
    sections: [
      {
        heading: 'Engineered for Web3 Commercial Expansion',
        body: 'ProtocolPulse™ bridges on-chain transactions and off-chain developer activity with enterprise CRM workflows, turning anonymous wallet interactions into qualified institutional partnerships.',
        bulletPoints: [
          'Real-time alerts when enterprise treasuries or Tier-1 funds interact with protocol smart contracts',
          'Automated tracking of high-reputation GitHub developers building on competing blockchain ecosystems',
          'Institutional KYC/AML compliance pre-screening for incoming liquidity and validator candidates',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: ProtocolPulse™ for Web3 Protocol Foundations',
      'Product Update: Connecting on-chain activity to enterprise CRM with ProfitMachines',
      'Accelerating institutional blockchain partnerships in 2026',
    ],
    defaultSubject: 'Platform Update: Transforming On-Chain Activity Into Enterprise Partnerships',
    preheader: 'Bridge on-chain wallet transactions with enterprise commercial pipeline in real time.',
    primaryCta: {
      label: 'Explore ProtocolPulse™',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Web3 Product Engineering',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-re-engagement',
    name: 'Crypto & Web3: Executive Re-Engagement',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-profit-pool.png',
    heroImageAlt: 'Crypto ecosystem profit pool discovery and protocol treasury analytics',
    headline: 'Revisiting Protocol Ecosystem Growth for {{company}}',
    introduction:
      'Hi {{name}}, as institutional digital asset regulations solidify and capital flows toward sustainable protocol infrastructure, we wanted to reconnect and see how {{company}} is pacing against your ecosystem goals.',
    sections: [
      {
        heading: 'Protocol Ecosystem Health Check',
        body: 'Building enduring protocol value requires continuous developer activity and enterprise integration. When we last connected, we discussed opportunities to streamline institutional partnership pipelines.',
        bulletPoints: [
          'Has active monthly developer retention on your network met your quarterly targets?',
          'Are institutional partners taking longer than expected to deploy production validators or smart contracts?',
          'Would updated enterprise blockchain intent data help focus your foundation BD team?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on Web3 ecosystem strategy for {{company}}',
      'Checking in: Protocol developer velocity at {{company}}',
      'Enterprise blockchain market updates for {{company}}',
    ],
    defaultSubject: 'Revisiting Protocol Ecosystem Growth Strategy for {{company}}',
    preheader: 'A brief executive check-in on developer adoption, institutional partnerships, and treasury velocity.',
    primaryCta: {
      label: 'Schedule Protocol Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Soran M.',
      senderTitle: 'Head of Decentralized Infrastructure Practice',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-industry-engagement',
    name: 'Crypto & Web3: Industry Engagement & Trend Analysis',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'industry-engagement',
    engagementLabel: 'Protocol Trend Analysis',
    heroImage: '/images/revenue-acceleration-engine.png',
    heroImageAlt: 'Web3 revenue acceleration engine and on-chain fee generation metrics',
    headline: 'From Speculation to Protocol Revenue: The 2026 Shift to Real Utility',
    introduction:
      'The era of unbacked protocol token emissions is concluding. Institutional capital is demanding verifiable fee generation, cash-flow accrual, and real-world commercial utility. Here is our analysis.',
    sections: [
      {
        heading: 'Strategic Realities for Web3 Protocol Leadership',
        body: 'Sustainable protocols are designing economic architectures that monetize actual computational throughput, data availability, and settlement velocity.',
        bulletPoints: [
          'Transitioning protocol governance from speculative voting to institutional stakeholder alignment',
          'Structuring B2B enterprise service level agreements (SLAs) on top of decentralized networks',
          'Deploying autonomous telemetry to verify validator decentralization and node latency',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Analysis: The Transition to Real Protocol Revenue in 2026',
      'Strategic Briefing: How enterprise buyers evaluate decentralized infrastructure',
      'Structuring institutional SLAs for public blockchain networks',
    ],
    defaultSubject: 'Industry Analysis: Protocol Revenue Architecture & Real Utility in 2026',
    preheader: 'Strategic insights for Web3 protocol executives on enterprise adoption and sustainable revenue.',
    primaryCta: {
      label: 'Read Full Protocol Briefing',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Web3 Advisory Council',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-welcome',
    name: 'Crypto & Web3: Welcome & Orientation Briefing',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/hero-market-radar.jpg',
    heroImageAlt: 'Welcome to ProfitMachines Crypto & Web3 intelligence platform',
    headline: 'Welcome to ProfitMachines Decentralized Infrastructure Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined an elite network of protocol founders, foundation executive directors, and Web3 enterprise architects leveraging autonomous commercial intelligence to build lasting network value.',
    sections: [
      {
        heading: 'Your Protocol Growth Suite Privileges',
        body: 'As a verified protocol ecosystem partner, you receive ongoing access to our developer intent radar, institutional partnership playbooks, and on-chain commercial telemetry.',
        bulletPoints: [
          'Monthly Web3 Institutional Intent Telemetry Reports tracking enterprise blockchain pilots',
          'Milestone-gated grant framework calculators designed to protect protocol treasury assets',
          'Invitations to our exclusive Protocol Founders & Institutional BD Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines Web3 Intelligence, {{name}}',
      'Your orientation to the protocol growth network',
      'Welcome aboard: Scaling decentralized protocol adoption with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: Web3 Protocol Growth Architecture',
    preheader: 'Your orientation guide to protocol commercialization and institutional adoption models.',
    primaryCta: {
      label: 'Access Protocol Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Web3 Practice Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'crypto-industry-campaign',
    name: 'Crypto & Web3: Executive Industry Campaign',
    industry: 'crypto',
    industryLabel: 'Crypto & Web3 Protocol',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/hero-market-radar.jpg',
    heroImageAlt: 'Crypto industry campaign dashboard with on-chain protocol metrics',
    headline: 'Explore Enterprise Web3 and Blockchain Opportunities',
    introduction:
      'Transitioning a blockchain protocol or decentralized application from speculative hype into sustainable enterprise adoption requires structured institutional partnerships and developer retention, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue OS for Web3 Protocols',
        body: 'ProfitMachines bridges on-chain transactions with enterprise commercial pipelines. We help foundation leadership and protocol growth teams identify institutional buyers, track active developers, and execute high-value enterprise integrations.',
        bulletPoints: [
          'Surveil on-chain wallet activity and GitHub repositories to surface enterprise developers actively building on your category',
          'Automate institutional stakeholder mapping across FinTech, enterprise treasury, and digital asset managers',
          'Accelerate institutional partner onboarding by 3.4× with pre-packaged compliance and security blueprints',
        ],
        calloutBox: {
          title: 'Protocol Impact Metric',
          text: 'Enterprise Web3 protocols achieve a 3.4× acceleration in institutional partner onboarding velocity.',
          metric: '3.4× Partner Onboarding Velocity',
        },
      },
      {
        heading: 'Build Sustainable Enterprise Protocol Demand',
        body: 'Schedule an exploratory briefing with our decentralized infrastructure practice leaders to see how our autonomous revenue mesh accelerates protocol adoption.',
      },
    ],
    subjectSuggestions: [
      'Explore Enterprise Web3 and Blockchain Opportunities',
      'Institutional adoption and developer retention for Web3 protocols',
      'Scaling protocol ecosystem revenue with autonomous intelligence',
    ],
    defaultSubject: 'Explore Enterprise Web3 and Blockchain Opportunities',
    preheader: 'Discover how autonomous intelligence accelerates institutional adoption for Web3 protocols.',
    primaryCta: {
      label: 'Explore Protocol Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Soran M.',
      senderTitle: 'Head of Decentralized Infrastructure Practice',
      senderCompany: 'ProfitMachines',
    },
  },
];
