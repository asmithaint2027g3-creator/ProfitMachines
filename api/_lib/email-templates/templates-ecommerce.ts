/**
 * api/_lib/email-templates/templates-ecommerce.ts
 *
 * Full template definitions for E-Commerce & Retail (8 templates)
 */

import type { EmailTemplateConfig } from './types';

export const ecommerceTemplates: EmailTemplateConfig[] = [
  {
    id: 'ecommerce-new-lead-followup',
    name: 'E-Commerce: New Lead Follow-Up',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'new-lead-followup',
    engagementLabel: 'New Lead Inbound',
    heroImage: '/images/industry-retail.png',
    heroImageAlt: 'E-commerce analytics dashboard with omnichannel transaction topology',
    headline: 'Maximizing Omnichannel Customer Lifetime Value & Cart Conversion',
    introduction:
      'Thank you for reaching out to ProfitMachines, {{name}}. In modern retail and e-commerce, sustained profitability hinges on dynamic customer acquisition, cart friction resolution, and repeat purchase velocity.',
    sections: [
      {
        heading: 'Solving Omnichannel Commerce Margin Compression',
        body: 'Rising paid ad costs (CAC) and high checkout abandonment erode digital retail margins. ProfitMachines deploys autonomous behavioral telemetry and dynamic checkout recovery triggers that recapture lost revenue in real time.',
        bulletPoints: [
          'Algorithmic intent detection identifying high-LTV customer cohorts across paid and organic channels',
          'Autonomous multi-stage cart and checkout abandonment recovery playbooks',
          'Real-time inventory and margin-optimized product recommendation triggers',
        ],
        calloutBox: {
          title: 'Retail Benchmark',
          text: 'Enterprise e-commerce brands utilizing autonomous checkout recovery recapture up to 18% of abandoned carts.',
          metric: '18% Cart Recovery Lift',
        },
      },
    ],
    subjectSuggestions: [
      'Maximizing e-commerce LTV and margin velocity for {{company}}',
      'Follow-up: Omnichannel revenue optimization for {{company}}',
      'Solving retail customer acquisition friction at {{company}}',
    ],
    defaultSubject: 'Explore New Opportunities in E-Commerce and Retail',
    preheader: 'Discover automated revenue architecture for high-growth e-commerce and retail brands.',
    primaryCta: {
      label: 'Schedule E-Commerce Audit',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Chloe Davies',
      senderTitle: 'Director of Omnichannel Commerce',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-consultation-demo-followup',
    name: 'E-Commerce: Consultation & Demo Follow-Up',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'consultation-demo-followup',
    engagementLabel: 'Consultation Follow-Up',
    heroImage: '/images/hero-revenue-team.jpg',
    heroImageAlt: 'E-commerce revenue operations team analyzing transaction conversion funnels',
    headline: 'E-Commerce Strategy Briefing Summary for {{company}}',
    introduction:
      'Thank you for our recent retail optimization session, {{name}}. We examined how {{company}} can eliminate friction across your digital storefront and expand high-margin repeat order velocity.',
    sections: [
      {
        heading: 'Summary of Key Discussion Points',
        body: 'During our walkthrough, we pinpointed specific checkout stages where prospective shoppers drop off and outlined automated interventions to restore transaction completion rates.',
        bulletPoints: [
          'Deploying personalized trust badges and frictionless payment routing for first-time buyers',
          'Automating post-purchase re-engagement cadences tailored to customer replenishment cycles',
          'Integrating multi-touch attribution to reallocate ad spend from low-converting campaigns',
        ],
      },
    ],
    subjectSuggestions: [
      'E-Commerce Briefing Summary & Next Steps — {{company}}',
      'Retail Growth Strategy Summary for {{company}}',
      'Following up on our digital commerce discussion',
    ],
    defaultSubject: 'E-Commerce Strategy Briefing Summary for {{company}}',
    preheader: 'Actionable retail optimization frameworks from our recent strategy consultation.',
    primaryCta: {
      label: 'Review Commerce Roadmap',
      url: '/solutions',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Chloe Davies',
      senderTitle: 'Director of Omnichannel Commerce',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-resource-sharing',
    name: 'E-Commerce: Resource & Research Sharing',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'resource-sharing',
    engagementLabel: 'Retail Intelligence Dossier',
    heroImage: '/images/demand-pulse-dashboard.png',
    heroImageAlt: 'E-commerce consumer trends and transaction analytics graph',
    headline: '2026 Omnichannel Retail & D2C Margin Benchmark Report',
    introduction:
      'Hi {{name}}, our Commerce Intelligence group has just published our comprehensive 2026 Retail Benchmark Report evaluating conversion, retention, and fulfillment economics.',
    sections: [
      {
        heading: 'Highlights from the Commerce Dossier',
        body: 'Evaluating data across 300+ fast-growing e-commerce and retail brands, this report highlights the commercial playbooks that top-performing merchants use to outpace category peers.',
        bulletPoints: [
          'The Real Cost of Paid Acquisition: Blended ROAS vs. Incremental Contribution Margin',
          'How Leading D2C Brands Structure 60-Day Repeat Purchase Flywheels',
          'Case Studies: Modernizing Fulfillment and Checkout for Millennial and Gen-Z Consumers',
        ],
      },
    ],
    subjectSuggestions: [
      '2026 E-Commerce Margin Dossier for {{company}}',
      'Research Report: Omnichannel retail benchmarks for 2026',
      'Data-driven retail conversion playbooks and LTV models',
    ],
    defaultSubject: 'New Research: 2026 Omnichannel Retail & D2C Margin Benchmarks',
    preheader: 'Discover empirical benchmarks on customer acquisition, cart recovery, and retail margins.',
    primaryCta: {
      label: 'Download Retail Dossier',
      url: '/resources',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Retail Intelligence Practice',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-product-service-update',
    name: 'E-Commerce: Product & Service Update',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'product-service-update',
    engagementLabel: 'Commerce Engine Update',
    heroImage: '/images/hero-data-intelligence.png',
    heroImageAlt: 'E-commerce real-time data intelligence and customer behavioral tracking',
    headline: 'Announcing SmartRecover™: Autonomous Checkout Abandonment Engine',
    introduction:
      'We are thrilled to announce SmartRecover™, an intelligent cart and checkout abandonment recovery engine built specifically for high-volume retail brands, {{name}}.',
    sections: [
      {
        heading: 'Next-Generation Cart Recovery Capabilities',
        body: 'Unlike generic email sequences, SmartRecover™ dynamically assesses why a shopper abandoned their basket and triggers personalized multi-channel resolutions.',
        bulletPoints: [
          'Real-time exit intent triggers delivering targeted shipping or volume discount incentives',
          'Two-way SMS and email synchronization for seamless mobile checkout resumption',
          'Zero impact on site load speeds with our ultra-lightweight client-side telemetry SDK',
        ],
      },
    ],
    subjectSuggestions: [
      'New Release: SmartRecover™ for E-Commerce Leaders',
      'Product Update: Recapturing abandoned retail revenue with ProfitMachines',
      'Supercharging e-commerce checkout conversion in 2026',
    ],
    defaultSubject: 'Platform Update: Autonomous Checkout Recovery for E-Commerce',
    preheader: 'Recapture lost retail revenue with dynamic cart abandonment interventions.',
    primaryCta: {
      label: 'Explore SmartRecover™',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Commerce Product Team',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-re-engagement',
    name: 'E-Commerce: Executive Re-Engagement',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 're-engagement',
    engagementLabel: 'Executive Check-In',
    heroImage: '/images/hero-profit-pool.png',
    heroImageAlt: 'Retail profit pool discovery and customer cohort analytics',
    headline: 'Revisiting E-Commerce Revenue Growth for {{company}}',
    introduction:
      'Hi {{name}}, as consumer spending patterns and digital acquisition channels evolve this quarter, we wanted to reconnect and see how {{company}} is pacing against commercial revenue goals.',
    sections: [
      {
        heading: 'Strategic Reflection for Retail Operators',
        body: 'Maintaining healthy contribution margins in e-commerce requires constant optimization across your customer acquisition and retention funnels.',
        bulletPoints: [
          'Have your blended acquisition costs remained aligned with seasonal targets?',
          'Are your store conversion rates keeping pace with top-quartile retail benchmarks?',
          'Would updated digital commerce intent data provide actionable clarity for your upcoming campaign?',
        ],
      },
    ],
    subjectSuggestions: [
      'Reconnecting on e-commerce growth strategy for {{company}}',
      'Checking in: Retail revenue velocity at {{company}}',
      'Omnichannel commerce market updates for {{company}}',
    ],
    defaultSubject: 'Revisiting Digital Commerce Growth Strategy for {{company}}',
    preheader: 'A brief executive check-in on retail margins, conversion velocity, and customer LTV.',
    primaryCta: {
      label: 'Schedule Commerce Review',
      url: '/book-consultation',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Chloe Davies',
      senderTitle: 'Director of Omnichannel Commerce',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-industry-engagement',
    name: 'E-Commerce: Industry Engagement & Trend Analysis',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'industry-engagement',
    engagementLabel: 'Retail Trend Analysis',
    heroImage: '/images/revenue-acceleration-engine.png',
    heroImageAlt: 'Retail revenue acceleration engine curves and transaction metrics',
    headline: 'Navigating the Post-Cookie Era in Omnichannel Retail',
    introduction:
      'The erosion of third-party tracking cookies has forced digital merchants to rethink customer acquisition. Here is how modern retail brands are building resilient first-party data architectures.',
    sections: [
      {
        heading: 'The Shift to First-Party Commerce Telemetry',
        body: 'Merchants who rely solely on ad platform algorithms face diminishing returns. Building a proprietary first-party telemetry layer enables predictive re-engagement before shoppers churn.',
        bulletPoints: [
          'Why server-side tracking and zero-party customer preference data are vital in 2026',
          'Deploying cohort-based replenishment reminders that drive predictable subscription revenue',
          'Connecting in-store point-of-sale data with digital storefront profiles for unified customer journeys',
        ],
      },
    ],
    subjectSuggestions: [
      'Industry Analysis: The Post-Cookie Playbook for Retail Brands',
      'Strategic Briefing: First-party data architecture in e-commerce',
      'Protecting retail acquisition margins against platform volatility',
    ],
    defaultSubject: 'Industry Analysis: Post-Cookie Omnichannel Retail in 2026',
    preheader: 'Strategic insights for e-commerce executives on first-party data and acquisition resilience.',
    primaryCta: {
      label: 'Read Full Commerce Briefing',
      url: '/solutions',
    },
    closing: {
      signoff: 'Sincerely',
      senderName: 'Retail Advisory Council',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-welcome',
    name: 'E-Commerce: Welcome & Orientation Briefing',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'welcome',
    engagementLabel: 'Welcome to ProfitMachines',
    heroImage: '/images/industry-retail.png',
    heroImageAlt: 'Welcome to ProfitMachines Retail intelligence platform',
    headline: 'Welcome to ProfitMachines E-Commerce Intelligence',
    introduction:
      'Welcome, {{name}}. You have joined an elite network of retail brand founders, digital commerce directors, and growth marketers using autonomous intelligence to maximize customer lifetime value.',
    sections: [
      {
        heading: 'Your Commerce Growth Suite Privileges',
        body: 'As a verified commerce partner, you receive ongoing access to empirical retail conversion benchmarks, checkout optimization playbooks, and consumer intent telemetry.',
        bulletPoints: [
          'Quarterly E-Commerce Margin & Conversion Rate Benchmarks',
          'Proprietary Checkout Friction Auditing frameworks and recovery scripts',
          'Invitations to our exclusive Retail Growth & Omnichannel Roundtables',
        ],
      },
    ],
    subjectSuggestions: [
      'Welcome to ProfitMachines E-Commerce Intelligence, {{name}}',
      'Your orientation to the retail growth network',
      'Welcome aboard: Scaling digital commerce revenue with precision',
    ],
    defaultSubject: 'Welcome to ProfitMachines: E-Commerce Growth Architecture',
    preheader: 'Your orientation guide to omnichannel retail acceleration and customer LTV models.',
    primaryCta: {
      label: 'Access Commerce Growth Suite',
      url: '/offerings',
    },
    closing: {
      signoff: 'Warm regards',
      senderName: 'Commerce Practice Group',
      senderTitle: 'ProfitMachines',
      senderCompany: 'ProfitMachines',
    },
  },

  {
    id: 'ecommerce-industry-campaign',
    name: 'E-Commerce: Executive Industry Campaign',
    industry: 'ecommerce',
    industryLabel: 'E-Commerce & Retail',
    engagementType: 'industry-campaign',
    engagementLabel: 'Executive Industry Brief',
    heroImage: '/images/industry-retail.png',
    heroImageAlt: 'E-commerce industry campaign dashboard with retail transaction curves',
    headline: 'Explore New Opportunities in E-Commerce and Retail',
    introduction:
      'In a competitive consumer market, scaling high-margin digital revenue requires systematic cart friction elimination, predictive customer re-engagement, and precision first-party telemetry, {{name}}.',
    sections: [
      {
        heading: 'The Autonomous Revenue OS for E-Commerce & Retail',
        body: 'ProfitMachines delivers an integrated revenue architecture built specifically for fast-scaling digital merchants. We combine automated customer intent signals with dynamic checkout recovery to turn browse abandonment into sustained revenue.',
        bulletPoints: [
          'Automated checkout abandonment recovery recapturing up to 18% of stalled transactions',
          'First-party customer telemetry tracking high-intent buyer cohorts across all touchpoints',
          'Dynamic post-purchase re-engagement cadences driving measurable increases in repeat LTV',
        ],
        calloutBox: {
          title: 'Retail Impact Metric',
          text: 'Enterprise merchants achieve an average 24% increase in net customer lifetime value.',
          metric: '+24% Customer Lifetime Value',
        },
      },
      {
        heading: 'Maximize Your Digital Storefront Margin',
        body: 'Discover how ProfitMachines integrates with Shopify Plus, Magento, BigCommerce, and custom commerce stacks to unlock predictable revenue growth.',
      },
    ],
    subjectSuggestions: [
      'Explore New Opportunities in E-Commerce and Retail',
      'Accelerating digital storefront revenue and repeat LTV',
      'Recapturing abandoned retail carts with autonomous intelligence',
    ],
    defaultSubject: 'Explore New Opportunities in E-Commerce and Retail',
    preheader: 'Discover automated revenue architecture for high-growth e-commerce and retail brands.',
    primaryCta: {
      label: 'Explore Commerce Solutions',
      url: '/offerings',
    },
    closing: {
      signoff: 'Best regards',
      senderName: 'Chloe Davies',
      senderTitle: 'Director of Omnichannel Commerce',
      senderCompany: 'ProfitMachines',
    },
  },
];
