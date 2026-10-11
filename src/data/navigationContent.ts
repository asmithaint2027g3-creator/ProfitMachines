export interface ServiceData {
    title: string;
    category: string;
    heroDescription: string;
    features: { title: string; description: string }[];
    benefits: string[];
    faqs: { question: string; answer: string }[];
    useCases?: { title: string; description: string }[];
    technologies?: string[];
    architectureDiagrams?: { src: string; title: string; description: string }[];
    kpis?: { metric: string; label: string }[];
    successStories?: { title: string; description: string }[];
    serviceModels?: { title: string; description: string }[];
    projectLifecycle?: { step: string; description: string; desc?: string }[];
}

export const servicesData: Record<string, ServiceData> = {
    "ai-intent-lead-gen": {
        title: "AI Intent-Based Lead Generation",
        category: "Industries",
        heroDescription: "Capture active buyer intent in real-time. Target accounts visiting high-value pages, reading comparison articles, or searching for specific solutions before they contact your competitors.",
        features: [
            { title: "Real-Time Signal Ingestion", description: "Monitor web activity, social triggers, and custom data streams instantly." }
        ],
        benefits: [
            "Higher quality pipeline generation",
            "Shorter sales cycle duration"
        ],
        faqs: [
            { question: "How does intent matching work?", answer: "We leverage secure IP lookup and buyer behavior signals to identify interested accounts." }
        ]
    },
    "ai-icp-matching": {
        title: "AI ICP Matching & Dynamic Scoring",
        category: "Industries",
        heroDescription: "Automatically refine your Ideal Customer Profile. Map incoming accounts against historical wins to dynamically score and route high-probability deals.",
        features: [
            { title: "Dynamic Propensity Scoring", description: "Score leads continuously based on account fit and firmographic shifts." }
        ],
        benefits: [
            "Increased lead qualification accuracy",
            "Optimized sales team allocation"
        ],
        faqs: [
            { question: "Can we customize scoring factors?", answer: "Yes, you can adjust weightings for industry, size, and technographics." }
        ]
    },
    "ai-lead-nurturing-autopilot": {
        title: "AI Lead Nurturing Autopilot",
        category: "Industries",
        heroDescription: "Deploy autonomous email and chat nurturing sequences. Our adaptive AI personalizes outreach based on historical customer responses and interest cues.",
        features: [
            { title: "Adaptive Sequencing", description: "Sequence emails dynamically matching individual buyer engagement rates." }
        ],
        benefits: [
            "Consistent lead engagement autopilot",
            "Higher meeting booking conversion"
        ],
        faqs: [
            { question: "Is it compliant with CAN-SPAM/GDPR?", answer: "Yes, double opt-ins and secure unsubscribe headers are fully supported." }
        ]
    },
    "ai-multi-touch-attribution": {
        title: "AI Multi-Touch Attribution Engine",
        category: "Industries",
        heroDescription: "Map marketing touchpoints back to P&L revenue. Optimize your advertising budget allocation using algorithmic fractional credit models.",
        features: [
            { title: "Revenue Attributed Insights", description: "Attribute pipeline velocity to specific campaigns, ads, and webinars." }
        ],
        benefits: [
            "Optimized ad spend efficiency",
            "Transparent ROI reporting"
        ],
        faqs: [
            { question: "Does it support offline touchpoints?", answer: "Yes, sales calls and offline events can be imported via CRM integrations." }
        ]
    },
    "ai-pipeline-velocity": {
        title: "AI Pipeline Velocity & Next-Best-Action",
        category: "Industries",
        heroDescription: "Accelerate deal velocity using next-best-action recommendations. Analyze email threads and meeting notes to identify blockers and nudge deals forward.",
        features: [
            { title: "Deal Health Scoring", description: "Assess deal progress using email sentiment and stakeholder response gaps." }
        ],
        benefits: [
            "Shorter sales cycle lengths",
            "Fewer stalled opportunities"
        ],
        faqs: [
            { question: "How are next actions generated?", answer: "Our models analyze successful deal patterns to suggest next steps." }
        ]
    },
    "abm-autopilot": {
        title: "AI Account-Based Marketing (ABM) Autopilot",
        category: "Industries",
        heroDescription: "Orchestrate end-to-end target account campaigns. Trigger personalized ads, custom landing pages, and automated SDR outreach simultaneously.",
        features: [
            { title: "Target Account Ingestion", description: "Sync key target accounts directly from your CRM for custom ABM campaigns." }
        ],
        benefits: [
            "Higher enterprise account penetration",
            "Seamless marketing and sales alignment"
        ],
        faqs: [
            { question: "Can we segment by account list?", answer: "Yes, you can upload specific lists or auto-generate them using scoring rules." }
        ]
    },
    "competitor-displacement": {
        title: "AI Competitor Displacement Engine",
        category: "Industries",
        heroDescription: "Identify competitor pain points to win back accounts. Detect when accounts search for migration support or complain about rival tools online.",
        features: [
            { title: "Competitor Pain Detection", description: "Monitor competitor review sites and search patterns for win-back triggers." }
        ],
        benefits: [
            "Higher competitive win rates",
            "Targeted replacement messaging"
        ],
        faqs: [
            { question: "Which competitors can we target?", answer: "You can track any major industry competitor with public search keywords." }
        ]
    },
    "ai-sdr-copilot": {
        title: "AI SDR Co-Pilot / Autopilot",
        category: "Industries",
        heroDescription: "Automate prospecting and calendar bookings. Our autonomous SDR assistant drafts outreach, handles objections, and schedules meetings for AEs.",
        features: [
            { title: "Objection Resolution Library", description: "Draft context-aware replies to pricing, timing, and feature objections." }
        ],
        benefits: [
            "More booked meetings on autopilot",
            "Reclaimed sales rep prospecting time"
        ],
        faqs: [
            { question: "Does it sync with Google/Outlook calendars?", answer: "Yes, meetings are booked directly using live calendar availability." }
        ]
    },
    "rql-predictor": {
        title: "AI Revenue Qualified Lead (RQL) Predictor",
        category: "Industries",
        heroDescription: "Predict close probability, deal size, and timelines accurately. Shift from subjective sales gut feelings to data-driven revenue forecasting.",
        features: [
            { title: "Predictive Forecast Dashboard", description: "Visualize pipeline revenue predictions with built-in confidence intervals." }
        ],
        benefits: [
            "Accurate board-level forecasting",
            "Clear prioritization of high-value deals"
        ],
        faqs: [
            { question: "How accurate is the forecast?", answer: "Our models achieve up to 92% forecasting accuracy within 90 days." }
        ]
    },
    "contract-expansion": {
        title: "AI Contract & Expansion Opportunity Finder",
        category: "Industries",
        heroDescription: "Uncover upsell and cross-sell opportunities. Monitor software usage trends to identify accounts that are ready for seat expansion or premium features.",
        features: [
            { title: "Usage Threshold Triggers", description: "Trigger alerts when accounts approach user limits or show high-value activity." }
        ],
        benefits: [
            "Increased Net Revenue Retention (NRR)",
            "Predictable customer expansion pipeline"
        ],
        faqs: [
            { question: "Does it integrate with product analytics?", answer: "Yes, it connects with Mixpanel, Amplitude, Segment, and custom databases." }
        ]
    },
    "omnichannel-lead-gen": {
        title: "AI Omnichannel Lead Generation",
        category: "Industries",
        heroDescription: "Automate campaign execution across social, search, and email. Optimize ad budget distribution in real-time to capture lowest-cost conversions.",
        features: [
            { title: "Cross-Platform Ad Manager", description: "Adjust budgets instantly across Google, Meta, LinkedIn, and programmatic networks." }
        ],
        benefits: [
            "Lower cost per lead (CPL)",
            "Broader campaign audience reach"
        ],
        faqs: [
            { question: "How often are budgets adjusted?", answer: "Our bidding algorithms check performance and adjust budgets hourly." }
        ]
    },
    "personalized-offers": {
        title: "AI Personalized Offer Generation at Scale",
        category: "Industries",
        heroDescription: "Deliver 1:1 dynamic pricing and promotions. Analyze user location, browsing history, and cart value to trigger personalized discounts.",
        features: [
            { title: "Dynamic Coupon Triggering", description: "Generate custom checkout coupons matching active user propensity scores." }
        ],
        benefits: [
            "Increased cart conversion rate",
            "Optimized profit margin preservation"
        ],
        faqs: [
            { question: "Will it hurt brand value?", answer: "Discounts are targeted strictly to high-risk cohorts to protect core pricing." }
        ]
    },
    "behavioral-retargeting": {
        title: "AI Behavioral Retargeting Autopilot",
        category: "Industries",
        heroDescription: "Recover abandoned checkouts automatically. Trigger context-aware emails and SMS messages within minutes of a cart bounce.",
        features: [
            { title: "Exit Intent Session Logging", description: "Log exact checkout abandonment events to trigger customized recovery paths." }
        ],
        benefits: [
            "Recovered cart abandonment revenue",
            "Higher mobile conversion rates"
        ],
        faqs: [
            { question: "What channels are supported?", answer: "We support recovery emails, SMS, push notifications, and social retargeting." }
        ]
    },
    "lookalike-audience": {
        title: "AI Lookalike Audience Auto-Scaling",
        category: "Industries",
        heroDescription: "Replicate your highest-converting buyer cohorts. Automatically feed ad networks with custom seed lists to target high-value profiles.",
        features: [
            { title: "Seed List Automation", description: "Update custom audiences daily with details of newly converted customers." }
        ],
        benefits: [
            "Lower ad bidding CAC inflation",
            "Higher programmatic ad relevance"
        ],
        faqs: [
            { question: "Does it support privacy compliance?", answer: "Yes, customer data is hashed securely before upload to ad networks." }
        ]
    },
    "global-account-penetration": {
        title: "AI Global Account Penetration",
        category: "Industries",
        heroDescription: "Expand enterprise accounts across multiple divisions and regions. Identify parent-subsidiary relationships and maps internal buying circles.",
        features: [
            { title: "Division Relationship Mapping", description: "Map enterprise corporate structures to identify warm intro paths." }
        ],
        benefits: [
            "Higher enterprise account contract value",
            "Faster expansion into global divisions"
        ],
        faqs: [
            { question: "Which directories are supported?", answer: "We pull structures from major corporate registries and LinkedIn lists." }
        ]
    },
    "partnership-opportunity": {
        title: "AI Strategic Partnership Opportunity Finder",
        category: "Industries",
        heroDescription: "Discover high-yield alliance opportunities. Scan ecosystem players, integrators, and distributors to find high-probability partners.",
        features: [
            { title: "Partner Profile Assessment", description: "Score potential partners matching target audience overlap." }
        ],
        benefits: [
            "Scalable indirect channel pipeline",
            "Wider distribution ecosystem"
        ],
        faqs: [
            { question: "How are partners prioritized?", answer: "We analyze alignment in product capability, audience size, and GTM strategy." }
        ]
    },
    "executive-engagement": {
        title: "AI Executive Engagement Automation",
        category: "Industries",
        heroDescription: "Engage C-level executives with automated, board-level ROI proof. Draft custom value cases tailored to specific corporate initiatives.",
        features: [
            { title: "Initiative Alignment Engine", description: "Map your software features directly to corporate annual report goals." }
        ],
        benefits: [
            "Higher response rate from C-suite",
            "Faster executive sign-off cycles"
        ],
        faqs: [
            { question: "How does it read corporate goals?", answer: "We scan public SEC filings, press releases, and earnings transcripts." }
        ]
    },
    "rapid-market-entry": {
        title: "AI Rapid Market Entry Engine",
        category: "Industries",
        heroDescription: "Accelerate speed-to-revenue in new verticals. Deploy pre-configured vertical outreach campaigns and content vectors in days, not months.",
        features: [
            { title: "Vertical Content Generator", description: "Auto-generate industry-specific case studies and messaging templates." }
        ],
        benefits: [
            "Faster time-to-market for new segments",
            "Reduced vertical GTM setup costs"
        ],
        faqs: [
            { question: "Which verticals have pre-built sets?", answer: "We cover SaaS, BFSI, Manufacturing, Healthcare, Retail, and Logistics." }
        ]
    },
    "niche-domination": {
        title: "AI Niche Market Domination",
        category: "Industries",
        heroDescription: "Capture market share in highly concentrated verticals. Map and engage every single key account within specialized niches.",
        features: [
            { title: "Niche Account Identification", description: "Discover and catalog 100% of addressable accounts in narrow segments." }
        ],
        benefits: [
            "Dominant market share in vertical",
            "Eliminated generic messaging waste"
        ],
        faqs: [
            { question: "Is it suitable for micro-niches?", answer: "Yes, it is designed specifically for markets with under 5,000 target accounts." }
        ]
    },
    "lean-team-productivity": {
        title: "AI Lean Team Productivity Amplifier",
        category: "Industries",
        heroDescription: "Multiply sales output without adding headcount. Automate routine prospecting, data entry, and follow-ups to keep teams selling.",
        features: [
            { title: "RevOps Task Automation", description: "Eliminate manual CRM entry, status updates, and email logging." }
        ],
        benefits: [
            "10x output from existing sales reps",
            "Reduced overhead resource costs"
        ],
        faqs: [
            { question: "How much time is reclaimed?", answer: "Sales reps reclaim up to 15 hours per week from administrative tasks." }
        ]
    },
    "zero-to-one-lead-gen": {
        title: "AI Zero-to-One Lead Generation",
        category: "Industries",
        heroDescription: "Automate your first customer acquisition campaigns. Perfect for early-stage companies needing to validate market interest quickly.",
        features: [
            { title: "Rapid Outreach Ingestion", description: "Load prospect lists and launch targeted campaigns in under 48 hours." }
        ],
        benefits: [
            "Accelerated path to first customer",
            "Valuable early buyer feedback loops"
        ],
        faqs: [
            { question: "Does it require prior CRM data?", answer: "No, we can scrape and enrich lead lists from scratch." }
        ]
    },
    "pmf-signal-detection": {
        title: "AI Product-Market Fit Signal Detection",
        category: "Industries",
        heroDescription: "Validate product-market fit using behavioral analytics. Measure user retention, feature adoption, and organic referral velocity.",
        features: [
            { title: "PMF Cohort Scoring", description: "Score active cohorts to identify target profiles showing highest retention." }
        ],
        benefits: [
            "Data-driven PMF validation proof",
            "Clear prioritization of product roadmap"
        ],
        faqs: [
            { question: "How long is the tracking period?", answer: "We recommend a minimum 30-day cohort tracking window." }
        ]
    },
    "founder-sales-automation": {
        title: "AI Founder-Led Sales Automation",
        category: "Industries",
        heroDescription: "Reclaim founder time for product development and strategy. Automate lead scheduling, follow-ups, and baseline contract generation.",
        features: [
            { title: "Founder Email Delegation", description: "AI schedules and responds to initial inquiries using founder templates." }
        ],
        benefits: [
            "Reclaimed founder strategy hours",
            "Consistent professional GTM presence"
        ],
        faqs: [
            { question: "Does it require daily management?", answer: "No, founders only step in once a meeting is booked or terms are reached." }
        ]
    },
    "burn-rate-optimized-lead-capture": {
        title: "AI Burn-Rate Optimized Lead Capture",
        category: "Industries",
        heroDescription: "Maximize customer acquisition per dollar spent. Optimize campaign budgets strictly for high-conversion keywords and low-cost channels.",
        features: [
            { title: "Burn-Rate Efficiency Tracker", description: "Track acquisition costs against runway and remaining budgets." }
        ],
        benefits: [
            "Extended corporate financial runway",
            "Maximum lead volume per dollar"
        ],
        faqs: [
            { question: "How are budgets controlled?", answer: "Algorithms pause low-performing campaigns instantly when daily caps are met." }
        ]
    },
"demand-pulse": {

        title: "Demand Pulse",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Demand Pulse capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Demand Pulse Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Demand Pulse execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Demand Pulse?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-demand-discovery": {

        title: "AI Demand Discovery",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Demand Discovery capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Demand Discovery Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Demand Discovery execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Demand Discovery?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-lead-generation": {

        title: "AI Lead Generation",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Lead Generation capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Lead Generation Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Lead Generation execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Lead Generation?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-lead-nurturing": {

        title: "AI Lead Nurturing",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Lead Nurturing capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Lead Nurturing Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Lead Nurturing execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Lead Nurturing?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-mvp-validation": {

        title: "AI MVP Validation",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI MVP Validation capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI MVP Validation Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI MVP Validation execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI MVP Validation?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-sales-transformation": {

        title: "AI Sales Transformation",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Sales Transformation capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Sales Transformation Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Sales Transformation execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Sales Transformation?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-revenue-operations": {

        title: "AI Revenue Operations",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Revenue Operations capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Revenue Operations Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Revenue Operations execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Revenue Operations?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-revenue-acceleration": {

        title: "AI Revenue Acceleration",
        category: "Capabilities",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Revenue Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Revenue Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Revenue Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Revenue Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-revenue": {

        title: "Crypto Revenue Acceleration",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Crypto Revenue Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Crypto Revenue Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Crypto Revenue Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Crypto Revenue Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-demand-discovery": {

        title: "Crypto Demand Discovery",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Crypto Demand Discovery capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Crypto Demand Discovery Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Crypto Demand Discovery execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Crypto Demand Discovery?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-performance": {

        title: "Crypto Performance Revenue",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Crypto Performance Revenue capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Crypto Performance Revenue Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Crypto Performance Revenue execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Crypto Performance Revenue?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-growth": {

        title: "Crypto Growth Acceleration",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Crypto Growth Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Crypto Growth Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Crypto Growth Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Crypto Growth Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-market-validation": {

        title: "Market Validation Intelligence",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Market Validation Intelligence capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Market Validation Intelligence Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Market Validation Intelligence execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Market Validation Intelligence?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-journey": {

        title: "Customer Journey Intelligence",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Customer Journey Intelligence capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Customer Journey Intelligence Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Customer Journey Intelligence execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Customer Journey Intelligence?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-startup": {

        title: "Startup MVP Acceleration",
        category: "Crypto",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Startup MVP Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Startup MVP Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Startup MVP Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Startup MVP Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"revenue-acceleration": {

        title: "AI-Driven Revenue Acceleration",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI-Driven Revenue Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI-Driven Revenue Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI-Driven Revenue Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI-Driven Revenue Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"growth-hacking": {

        title: "AI-Driven Growth Hacking",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI-Driven Growth Hacking capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI-Driven Growth Hacking Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI-Driven Growth Hacking execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI-Driven Growth Hacking?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"performance-marketing": {

        title: "AI-Driven Performance Marketing",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI-Driven Performance Marketing capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI-Driven Performance Marketing Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI-Driven Performance Marketing execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI-Driven Performance Marketing?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"enterprise-sales": {

        title: "Enterprise Sales Acceleration",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Enterprise Sales Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Enterprise Sales Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Enterprise Sales Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Enterprise Sales Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"digital-sales": {

        title: "Digital & Inside Sales",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Digital & Inside Sales capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Digital & Inside Sales Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Digital & Inside Sales execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Digital & Inside Sales?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"d2c-sales": {

        title: "D2C & High-Velocity Sales",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade D2C & High-Velocity Sales capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive D2C & High-Velocity Sales Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate D2C & High-Velocity Sales execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy D2C & High-Velocity Sales?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"bfsi-sales": {

        title: "BFSI Sales Acceleration",
        category: "Outcomes",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade BFSI Sales Acceleration capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive BFSI Sales Acceleration Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate BFSI Sales Acceleration execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy BFSI Sales Acceleration?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-business-strategy": {

        title: "AI Business Growth Strategy",
        category: "Solutions",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Business Growth Strategy capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Business Growth Strategy Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Business Growth Strategy execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Business Growth Strategy?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-market-strategy": {

        title: "AI Market Strategy & Demand",
        category: "Solutions",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Market Strategy & Demand capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Market Strategy & Demand Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Market Strategy & Demand execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Market Strategy & Demand?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ai-auto-sales-pilot": {

        title: "AI Auto Sales Pilot",
        category: "Solutions",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Auto Sales Pilot capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Auto Sales Pilot Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Auto Sales Pilot execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Auto Sales Pilot?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"sales-optimization": {

        title: "AI Sales Process Optimization",
        category: "Solutions",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI Sales Process Optimization capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI Sales Process Optimization Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI Sales Process Optimization execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI Sales Process Optimization?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"ecommerce": {

        title: "E-commerce & D2C",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade E-commerce & D2C capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive E-commerce & D2C Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate E-commerce & D2C execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy E-commerce & D2C?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"consumer-durables": {

        title: "Consumer Durables",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Consumer Durables capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Consumer Durables Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Consumer Durables execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Consumer Durables?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"bfsi": {

        title: "BFSI & FinTech",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade BFSI & FinTech capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive BFSI & FinTech Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate BFSI & FinTech execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy BFSI & FinTech?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"fmcg": {

        title: "FMCG",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade FMCG capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive FMCG Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate FMCG execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy FMCG?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"saas": {

        title: "SaaS & Enterprise Software",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade SaaS & Enterprise Software capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive SaaS & Enterprise Software Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate SaaS & Enterprise Software execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy SaaS & Enterprise Software?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"manufacturing": {

        title: "Manufacturing",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Manufacturing capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Manufacturing Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Manufacturing execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Manufacturing?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"real-estate": {

        title: "Real Estate",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Real Estate capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Real Estate Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Real Estate execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Real Estate?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"crypto-industry": {

        title: "Crypto & Web3",
        category: "Industries",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Crypto & Web3 capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Crypto & Web3 Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Crypto & Web3 execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Crypto & Web3?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"sales-intelligence": {

        title: "AI-Powered Sales Intelligence",
        category: "Offerings",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade AI-Powered Sales Intelligence capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive AI-Powered Sales Intelligence Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate AI-Powered Sales Intelligence execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy AI-Powered Sales Intelligence?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"revenue-ops-intelligence": {

        title: "Revenue Operations & Intelligence",
        category: "Offerings",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Revenue Operations & Intelligence capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Revenue Operations & Intelligence Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Revenue Operations & Intelligence execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Revenue Operations & Intelligence?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"digital-marketing": {

        title: "Digital Marketing & Demand Gen",
        category: "Offerings",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Digital Marketing & Demand Gen capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Digital Marketing & Demand Gen Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Digital Marketing & Demand Gen execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Digital Marketing & Demand Gen?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"market-intelligence": {

        title: "Market & Demand Intelligence",
        category: "Offerings",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Market & Demand Intelligence capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Market & Demand Intelligence Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Market & Demand Intelligence execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Market & Demand Intelligence?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"market-validation-offering": {

        title: "Market Validation & Research",
        category: "Offerings",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Market Validation & Research capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Market Validation & Research Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Market Validation & Research execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Market Validation & Research?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"product-scaling": {

        title: "Product Scaling & Growth",
        category: "Offerings",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Product Scaling & Growth capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Product Scaling & Growth Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Product Scaling & Growth execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Product Scaling & Growth?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"partner-overview": {

        title: "Partner Program Overview",
        category: "Partners",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Partner Program Overview capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Partner Program Overview Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Partner Program Overview execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Partner Program Overview?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"solution-partners": {

        title: "Solution Partners",
        category: "Partners",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Solution Partners capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Solution Partners Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Solution Partners execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Solution Partners?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"technology-partners": {

        title: "Technology Partners",
        category: "Partners",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Technology Partners capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Technology Partners Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Technology Partners execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Technology Partners?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
},
"referral-partners": {

        title: "Referral Partners",
        category: "Partners",
        heroDescription: "Empower your organization with ProfitMachines' enterprise-grade Referral Partners capabilities. We deliver autonomous AI agents, predictive deal dynamics, and scalable infrastructure designed to increase revenue velocity by 5X.",
        features: [
            { title: "Predictive Referral Partners Intelligence", description: "Deploy proprietary AI models trained to identify high-intent buyer behavior and automate Referral Partners execution." },
            { title: "Autonomous Execution Agents", description: "Self-healing workflow agents that continuously optimize pipeline conversion, deal prioritization, and engagement." },
            { title: "Enterprise Systems Integration", description: "Bi-directional sync with Salesforce, HubSpot, SAP, and Snowflake with strict SOC2 Type II compliance." },
            { title: "Real-time Deal Dynamics", description: "Live opportunity scoring and risk detection to prevent deal slippage and maximize win rates by 4X." }
        ],
        benefits: [
            "Accelerated revenue velocity by up to 500% in 12 months",
            "4X increase in qualified win rates via predictive deal scoring",
            "Zero manual data entry with 100% automated CRM RevOps",
            "Enterprise bank-grade security & ISO 27001 / SOC2 compliance"
        ],
        faqs: [
            { question: "How quickly can ProfitMachines deploy Referral Partners?", answer: "Initial setup and data ingestion take under 14 days, with full AI model calibration achieved within 4 weeks." },
            { question: "What infrastructure integrations are supported?", answer: "ProfitMachines seamlessly connects with leading CRMs, ERPs, Data Warehouses, and Communication platforms out-of-the-box." },
            { question: "Is my corporate data kept confidential and secure?", answer: "Yes, all customer data is processed in dedicated single-tenant environments with end-to-end encryption." }
        ],
        useCases: [
            { title: "High-Growth Enterprise Scaling", description: "Scale sales operations exponentially without linear headcount expansion using automated AI sales drivers." },
            { title: "Complex B2B Deal Navigation", description: "Map stakeholder influence and sentiment across multi-buyer committees to accelerate close times." }
        ],
        kpis: [
            { metric: "5X", label: "Revenue Velocity" },
            { metric: "4X", label: "Win Rate Multiplier" },
            { metric: "85%", label: "Manual Effort Reduction" }
        ],
        projectLifecycle: [
            { step: "Discovery & Audit", description: "In-depth pipeline analysis and intent data source integration." },
            { step: "Model Calibration", description: "Customizing predictive AI scoring for your target audience." },
            { step: "Autonomous Launch", description: "Deploying AI agents across outreach and RevOps channels." },
            { step: "Continuous Optimization", description: "Closed-loop feedback to continuously elevate conversions." }
        ]
}
};

export const smNavItems = [
    {
        "name": "Home",
        "path": "/"
    },
    {
        "name": "Offerings",
        "path": "/offerings",
        "dropdown": {
            "categories": [
                {
                    "id": "profit-pools",
                    "title": "Profit Pools",
                    "desc": "Maximize industry profit share",
                    "items": [
                        { "name": "Market Discovery", "path": "/offerings/profit-pool-discovery/market-discovery", "icon": "Search" },
                        { "name": "Demand Discovery", "path": "/offerings/profit-pool-discovery/demand-discovery", "icon": "Target" },
                        { "name": "Value Discovery", "path": "/offerings/profit-pool-discovery/value-discovery", "icon": "DollarSign" },
                        { "name": "Channel Discovery", "path": "/offerings/profit-pool-discovery/channel-discovery", "icon": "Network" },
                        { "name": "Competitive Discovery", "path": "/offerings/profit-pool-discovery/competitive-discovery", "icon": "ShieldCheck" },
                        { "name": "Customer Discovery", "path": "/offerings/profit-pool-discovery/customer-discovery", "icon": "Users" },
                        { "name": "Product-Market Fit Discovery", "path": "/offerings/profit-pool-discovery/product-market-fit-discovery", "icon": "Sparkles" }
                    ],
                    "b2bItems": [
                        { "name": "B2B Market Discovery", "path": "/offerings/b2b/market-discovery", "icon": "Search" },
                        { "name": "B2B Demand Discovery", "path": "/offerings/b2b/demand-discovery", "icon": "Target" },
                        { "name": "B2B Value Discovery", "path": "/offerings/b2b/value-discovery", "icon": "DollarSign" },
                        { "name": "B2B Channel Discovery", "path": "/offerings/b2b/channel-discovery", "icon": "Network" },
                        { "name": "B2B Competitive Discovery", "path": "/offerings/b2b/competitive-discovery", "icon": "ShieldCheck" },
                        { "name": "B2B Customer Discovery", "path": "/offerings/b2b/customer-discovery", "icon": "Users" },
                        { "name": "B2B Product-Market Fit Discovery", "path": "/offerings/b2b/product-market-fit-discovery", "icon": "Sparkles" }
                    ],
                    "b2cItems": [
                        { "name": "B2C Market Discovery", "path": "/offerings/b2c/market-discovery", "icon": "Search" },
                        { "name": "B2C Demand Discovery", "path": "/offerings/b2c/demand-discovery", "icon": "Target" },
                        { "name": "B2C Value Discovery", "path": "/offerings/b2c/value-discovery", "icon": "DollarSign" },
                        { "name": "B2C Channel Discovery", "path": "/offerings/b2c/channel-discovery", "icon": "Network" },
                        { "name": "B2C Competitive Discovery", "path": "/offerings/b2c/competitive-discovery", "icon": "ShieldCheck" },
                        { "name": "B2C Customer Discovery", "path": "/offerings/b2c/customer-discovery", "icon": "Users" },
                        { "name": "B2C Product-Market Fit Discovery", "path": "/offerings/b2c/product-market-fit-discovery", "icon": "Sparkles" }
                    ]
                },
                {
                    "id": "ai-growth",
                    "title": "AI Growth Engines",
                    "path": "/offerings/ai-growth",
                    "desc": "Automated pipeline & market expansion",
                    "items": [
                        { "name": "AI Demand Discovery", "path": "/offerings/ai-growth/ai-demand-discovery", "icon": "Search" },
                        { "name": "AI-Driven Revenue Acceleration", "path": "/offerings/ai-growth/revenue-acceleration", "icon": "TrendingUp" },
                        { "name": "AI-Driven Growth Hacking", "path": "/offerings/ai-growth/growth-hacking", "icon": "Rocket" },
                        { "name": "AI-Driven Performance Marketing", "path": "/offerings/ai-growth/performance-marketing", "icon": "BarChart" }
                    ]
                },
                {
                    "id": "sales-acceleration",
                    "title": "Sales Acceleration",
                    "path": "/offerings/sales-acceleration",
                    "desc": "High-velocity sales execution",
                    "items": [
                        { "name": "Enterprise Sales Acceleration", "path": "/offerings/sales-acceleration/enterprise-sales", "icon": "Building2" },
                        { "name": "Digital & Inside Sales", "path": "/offerings/sales-acceleration/digital-sales", "icon": "Layout" },
                        { "name": "D2C & High-Velocity Sales", "path": "/offerings/sales-acceleration/d2c-sales", "icon": "ShoppingBag" },
                        { "name": "BFSI Sales Acceleration", "path": "/offerings/sales-acceleration/bfsi-sales", "icon": "Landmark" }
                    ]
                }
            ],
            "highlight": {
                "title": "Enterprise Offerings",
                "desc": "Turnkey AI sales engines and revenue intelligence.",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
                "linkText": "View All Offerings",
                "linkPath": "/offerings"
            }
        }
    },
    {
        "name": "Industries",
        "path": "/industries",
        "dropdown": {
            "categories": [
                {
                    "id": "b2b",
                    "title": "B2B Focus",
                    "desc": "Targeted enterprise pipeline scaling",
                    "path": "/industries/b2b",
                    "items": [
                        { "name": "AI Account-Based Marketing (ABM) Autopilot", "path": "/industries/b2b#abm-autopilot", "icon": "Building2" },
                        { "name": "AI Competitor Displacement Engine", "path": "/industries/b2b#competitor-displacement", "icon": "ShieldCheck" },
                        { "name": "AI SDR Co-Pilot / Autopilot", "path": "/industries/b2b#ai-sdr-copilot", "icon": "Bot" },
                        { "name": "AI Revenue Qualified Lead (RQL) Predictor", "path": "/industries/b2b#rql-predictor", "icon": "TrendingUp" },
                        { "name": "AI Contract & Expansion Opportunity Finder", "path": "/industries/b2b#contract-expansion", "icon": "Search" }
                    ]
                },
                {
                    "id": "b2c",
                    "title": "B2C Focus",
                    "desc": "High-velocity consumer acquisition",
                    "path": "/industries/b2c",
                    "items": [
                        { "name": "AI Omnichannel Lead Generation", "path": "/industries/b2c#omnichannel-lead-gen", "icon": "Network" },
                        { "name": "AI Personalized Offer Generation at Scale", "path": "/industries/b2c#personalized-offers", "icon": "Coins" },
                        { "name": "AI Behavioral Retargeting Autopilot", "path": "/industries/b2c#behavioral-retargeting", "icon": "Activity" },
                        { "name": "AI Lookalike Audience Auto-Scaling", "path": "/industries/b2c#lookalike-audience", "icon": "Users" }
                    ]
                },
                {
                    "id": "enterprise",
                    "title": "Enterprise / Large Business",
                    "desc": "Multi-stakeholder, global penetration",
                    "path": "/industries/enterprise",
                    "items": [
                        { "name": "AI Global Account Penetration", "path": "/industries/enterprise#global-account-penetration", "icon": "Globe" },
                        { "name": "AI Strategic Partnership Opportunity Finder", "path": "/industries/enterprise#partnership-opportunity", "icon": "Handshake" },
                        { "name": "AI Executive Engagement Automation", "path": "/industries/enterprise#executive-engagement", "icon": "Briefcase" }
                    ]
                },
                {
                    "id": "mid-market",
                    "title": "Mid-Market",
                    "desc": "Accelerated vertical market capture",
                    "path": "/industries/mid-market",
                    "items": [
                        { "name": "AI Rapid Market Entry Engine", "path": "/industries/mid-market#rapid-market-entry", "icon": "Rocket" },
                        { "name": "AI Niche Market Domination", "path": "/industries/mid-market#niche-domination", "icon": "Target" },
                        { "name": "AI Lean Team Productivity Amplifier", "path": "/industries/mid-market#lean-team-productivity", "icon": "Users" }
                    ]
                },
                {
                    "id": "startup",
                    "title": "Startup",
                    "desc": "Zero-to-one traction & PMF validation",
                    "path": "/industries/startup",
                    "items": [
                        { "name": "AI Zero-to-One Lead Generation", "path": "/industries/startup#zero-to-one-lead-gen", "icon": "Lightbulb" },
                        { "name": "AI Product-Market Fit Signal Detection", "path": "/industries/startup#pmf-signal-detection", "icon": "Sparkles" },
                        { "name": "AI Founder-Led Sales Automation", "path": "/industries/startup#founder-sales-automation", "icon": "Bot" },
                        { "name": "AI Burn-Rate Optimized Lead Capture", "path": "/industries/startup#burn-rate-optimized-lead-capture", "icon": "DollarSign" }
                    ]
                },
                {
                    "id": "specialized-sectors",
                    "title": "Specialized Sectors",
                    "desc": "Service, Industrial, FinTech, SaaS, Healthcare & Energy",
                    "path": "/industries/specialized-sectors",
                    "items": [
                        { "name": "Service & Industrial Industries", "path": "/industries/specialized-sectors#service-industrial", "icon": "Briefcase" },
                        { "name": "D2C Companies & Retail FMCG", "path": "/industries/specialized-sectors#d2c-retail", "icon": "ShoppingBag" },
                        { "name": "FinTech, Lending & SaaS Products", "path": "/industries/specialized-sectors#fintech-saas", "icon": "Landmark" },
                        { "name": "Healthcare & Life Sciences", "path": "/industries/specialized-sectors#healthcare-life-sciences", "icon": "HeartPulse" },
                        { "name": "Education & EdTech", "path": "/industries/specialized-sectors#education-edtech", "icon": "GraduationCap" },
                        { "name": "Real Estate, Construction & Energy", "path": "/industries/specialized-sectors#real-estate-energy", "icon": "Zap" }
                    ]
                }
            ],
            "highlight": {
                "title": "Industry Focus",
                "desc": "Sector-specific solutions tailored for your regulatory and growth needs.",
                "linkText": "Explore All Industries",
                "linkPath": "/industries"
            }
        }
    },
    {
        "name": "Solutions",
        "path": "/solutions",
        "dropdown": {
            "highlight": {
                "title": "Comprehensive Solutions",
                "desc": "End-to-end AI-driven growth capabilities & solutions for enterprises.",
                "linkText": "View Solutions",
                "linkPath": "/solutions"
            },
            "categories": [
                {
                    "id": "strategy",
                    "title": "Strategy & Growth",
                    "desc": "Market intelligence and growth planning",
                    "path": "/solutions/strategy",
                    "items": [
                        { "name": "AI Business Growth Strategy", "path": "/solutions/strategy#ai-business-strategy", "icon": "TrendingUp" },
                        { "name": "AI Market Strategy & Demand", "path": "/solutions/strategy#ai-market-strategy", "icon": "Target" },
                        { "name": "AI-Driven Growth Hacking", "path": "/solutions/strategy#growth-hacking", "icon": "Rocket" },
                        { "name": "AI-Driven Performance Marketing", "path": "/solutions/strategy#performance-marketing", "icon": "BarChart" }
                    ]
                },
                {
                    "id": "sales-ops",
                    "title": "Sales & Operations",
                    "desc": "Autonomous sales execution and revenue ops",
                    "path": "/solutions/sales-ops",
                    "items": [
                        { "name": "AI Auto Sales Pilot", "path": "/solutions/sales-ops#ai-auto-sales-pilot", "icon": "Bot" },
                        { "name": "AI Sales Process Optimization", "path": "/solutions/sales-ops#sales-optimization", "icon": "Settings" },
                        { "name": "AI Revenue Operations", "path": "/solutions/sales-ops#ai-revenue-operations", "icon": "Server" },
                        { "name": "AI Revenue Acceleration", "path": "/solutions/sales-ops#ai-revenue-acceleration", "icon": "Zap" }
                    ]
                },
                {
                    "id": "intelligence",
                    "title": "Demand & Intelligence",
                    "desc": "Predictive deal and demand signals",
                    "path": "/solutions/intelligence",
                    "items": [
                        { "name": "Demand Discovery & Acceleration", "path": "/solutions/intelligence#ai-demand-discovery", "icon": "Search" },
                        { "name": "Hidden Revenue Capture", "path": "/solutions/intelligence#hidden-revenue-capture", "icon": "TrendingUp" },
                        { "name": "AI Revenue Acceleration", "path": "/solutions/intelligence#revenue-acceleration", "icon": "Zap" }
                    ]
                },
                {
                    "id": "brand-reputation",
                    "title": "Brand & Reputation",
                    "desc": "AI-driven brand and reputation engines",
                    "path": "/solutions/brand-reputation",
                    "items": [
                        { "name": "AI Brand Acceleration", "path": "/solutions/brand-reputation#ai-brand-acceleration", "icon": "Sparkles" },
                        { "name": "AI Reputation Acceleration", "path": "/solutions/brand-reputation#ai-reputation-acceleration", "icon": "ShieldCheck" },
                        { "name": "Autonomous Sales Pilot", "path": "/solutions/brand-reputation#ai-auto-sales-pilot", "icon": "Bot" }
                    ]
                }
            ]
        }
    },
    {
        "name": "Crypto",
        "path": "/crypto",
        "dropdown": {
            "highlight": {
                "title": "High-Velocity Web3",
                "desc": "Built for High-Velocity Web3 & Crypto Ecosystems.",
                "linkText": "Explore Solutions",
                "linkPath": "/crypto"
            },
            "categories": [
                {
                    "id": "crypto-growth",
                    "title": "Growth & Revenue",
                    "desc": "Accelerate revenue in Web3 ecosystems",
                    "path": "/crypto#crypto-growth",
                    "items": [
                        { "name": "Crypto Revenue Acceleration", "path": "/crypto#crypto-revenue", "icon": "TrendingUp" },
                        { "name": "Crypto Performance Revenue", "path": "/crypto#crypto-performance", "icon": "Coins" },
                        { "name": "Crypto Growth Acceleration", "path": "/crypto#crypto-growth", "icon": "Rocket" }
                    ]
                },
                {
                    "id": "crypto-intelligence",
                    "title": "Intelligence & Discovery",
                    "desc": "Market insights for Web3 ventures",
                    "path": "/crypto#crypto-intelligence",
                    "items": [
                        { "name": "Crypto Demand Discovery", "path": "/crypto#crypto-demand-discovery", "icon": "Search" },
                        { "name": "Market Validation Intelligence", "path": "/crypto#crypto-market-validation", "icon": "Target" },
                        { "name": "Customer Journey Intelligence", "path": "/crypto#crypto-journey", "icon": "MapPin" },
                        { "name": "Startup MVP Acceleration", "path": "/crypto#crypto-startup", "icon": "Lightbulb" }
                    ]
                }
            ]
        }
    },
    {
        "name": "Partners",
        "path": "/partners",
        "dropdown": {
            "highlight": {
                "title": "Global Partner Ecosystem",
                "desc": "Co-sell and build next-gen AI revenue systems together.",
                "linkText": "Become a Partner",
                "linkPath": "/partners"
            },
            "categories": [
                {
                    "id": "partner-types",
                    "title": "Partner Types",
                    "desc": "Different ways to partner with us",
                    "path": "/partners",
                    "items": [
                        { "name": "Partner Program Overview", "path": "/partners#overview", "icon": "Handshake" },
                        { "name": "Solution Partners", "path": "/partners#solution-partners", "icon": "Building2" },
                        { "name": "Technology Partners", "path": "/partners#technology-partners", "icon": "Cpu" },
                        { "name": "Referral Partners", "path": "/partners#referral-partners", "icon": "UserPlus" }
                    ]
                }
            ]
        }
    },
    {
        "name": "Company",
        "path": "/company",
        "dropdown": {
            "highlight": {
                "title": "ProfitMachines",
                "desc": "We are engineering growth and automating scale.",
                "linkText": "Meet the Team",
                "linkPath": "/company"
            },
            "categories": [
                {
                    "id": "about",
                    "title": "About Us",
                    "desc": "Who we are and what drives us",
                    "path": "/company",
                    "items": [
                        { "name": "About Us", "path": "/company#about", "icon": "Info" },
                        { "name": "Mission", "path": "/company#mission", "icon": "Target" },
                        { "name": "Leadership & Culture", "path": "/company#leadership", "icon": "Users" },
                        { "name": "Our Offices", "path": "/company#offices", "icon": "MapPin" }
                    ]
                },
                {
                    "id": "connect",
                    "title": "Connect",
                    "desc": "Careers, contact, and partnership",
                    "items": [
                        { "name": "Careers", "path": "/careers", "icon": "Briefcase" },
                        { "name": "Contact Us", "path": "/book-consultation", "icon": "Phone" }
                    ]
                }
            ]
        }
    },
    {
        "name": "Contact Us",
        "path": "/book-consultation"
    }
];
