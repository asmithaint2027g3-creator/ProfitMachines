// src/app/data/offeringsSupplementalData.ts
// Supplemental intelligence data for all 14 Profit Pool Discovery Strategies:
// Contains SPIN Matrix, Applied Frameworks, Profit Pool Capture Points,
// Performance & Revenue Metrics Tables, Related Offerings, and Strategy-specific layout helpers.

export interface SpinAnalysis {
    situation: string;
    problem: string;
    implication: string;
    needPayoff: string;
}

export interface PerformanceMetricRow {
    category: string;
    metric: string;
    definition: string;
    baseline: string;
    target: string;
    frequency: string;
}

export interface RelatedOfferingLink {
    name: string;
    code: string;
    path: string;
    desc: string;
}

export interface StrategySupplementalContent {
    id: string;
    code: string;
    eyebrow: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    strategyLayoutType: 'market' | 'demand' | 'value' | 'channel' | 'competitive' | 'customer' | 'pmf';
    layer01Opportunity: {
        headline: string;
        copy: string;
        badge: string;
        metric: string;
        subtext: string;
    };
    spin: SpinAnalysis;
    appliedFrameworks: { name: string; description: string }[];
    profitPoolCapturePoints: string[];
    performanceMetrics: PerformanceMetricRow[];
    relatedOfferings: RelatedOfferingLink[];
    layoutFeatureData?: Record<string, any>;
}

export const offeringsSupplemental: Record<string, StrategySupplementalContent> = {
    // ══════════════════════════════════════════════════════════════════════
    // B2B STRATEGIES (1 to 7)
    // ══════════════════════════════════════════════════════════════════════

    "b2b-market-discovery": {
        id: "b2b-market-discovery",
        code: "B2B-1",
        eyebrow: "B2B GROWTH INTELLIGENCE",
        primaryCtaText: "Explore Market Opportunities",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "market",
        layer01Opportunity: {
            headline: "LAYER 01 — MARKET OPPORTUNITY",
            copy: "Identify underserved customer segments, validate unmet needs and prioritise opportunities based on demand, market attractiveness and commercial feasibility.",
            badge: "Illustrative Strategic Model",
            metric: "$300M+ Addressable Opportunity",
            subtext: "Validated through bottom-up enterprise sizing, account accessibility filters, and willingness-to-pay research."
        },
        spin: {
            situation: "The business targets broad industries or geographies using static market reports and historical customer lists.",
            problem: "Market size alone does not reveal which segments have urgent needs, accessible buyers or commercially attractive opportunities.",
            implication: "Sales and marketing resources may be allocated to segments with weak demand, poor fit or expensive acquisition requirements.",
            needPayoff: "Build an evidence-based market prioritisation model combining market sizing, customer validation, account characteristics and commercial feasibility."
        },
        appliedFrameworks: [
            { name: "TAM / SAM / SOM Estimation", description: "Bottom-up account sizing using verified enterprise registries, average contract values, and regulatory eligibility." },
            { name: "Segment Attractiveness Scoring", description: "Multi-factor evaluation indexing market growth, margin potential, buying urgency, and barrier to entry." },
            { name: "ICP Development & Boundaries", description: "Explicit firmographic, technographic, and organizational parameters defining tier-1 winnable accounts." },
            { name: "Customer Discovery Research", description: "20-30 structured qualitative discovery interviews validating problem severity and willingness to pay." },
            { name: "Competitive Landscape Mapping", description: "Cross-referencing incumbent coverage to locate unserved micro-vertical white spaces." },
            { name: "Market-Entry Prioritisation", description: "Sequenced roadmap ranking segments by time-to-first-deal and long-term customer lifetime value." }
        ],
        profitPoolCapturePoints: [
            "Prioritise commercially attractive segments with highest margin potential.",
            "Identify underserved customer groups with zero direct incumbent competition.",
            "Quantify potential account and segment opportunities using bottom-up data.",
            "Reduce uncertainty and prevent costly resource waste before committing to market expansion."
        ],
        performanceMetrics: [
            { category: "Market Sizing", metric: "TAM Accuracy", definition: "Variance between bottom-up account modeling and audited corporate registries.", baseline: "±25%", target: "±5%", frequency: "Quarterly" },
            { category: "Market Sizing", metric: "SAM Coverage", definition: "Share of serviceable addressable market enriched with verified executive contacts.", baseline: "42%", target: "88%", frequency: "Quarterly" },
            { category: "Market Sizing", metric: "SOM Capture Rate", definition: "Percentage of realistically obtainable market accounts converted to pipeline.", baseline: "7.5%", target: "18.0%", frequency: "Annually" },
            { category: "Account Quality", metric: "ICP Fit Density", definition: "Share of pipeline accounts matching at least 4 primary firmographic/urgency criteria.", baseline: "48%", target: "82%", frequency: "Monthly" },
            { category: "Validation", metric: "Customer Discovery Coverage", definition: "Number of completed, transcribed qualitative interviews across segment sub-types.", baseline: "6 interviews", target: "25-30 interviews", frequency: "Per segment" },
            { category: "Economics", metric: "Estimated Opportunity ACV", definition: "Modeled annualized contract value supported by verified willingness-to-pay ranges.", baseline: "$45K", target: "$120K+", frequency: "Quarterly" },
            { category: "Execution", metric: "Time-to-Market Entry", definition: "Calendar weeks from market identification to first qualified sales conversation.", baseline: "36 weeks", target: "8 weeks", frequency: "Per initiative" }
        ],
        relatedOfferings: [
            { name: "B2B Demand Discovery", code: "B2B-2", path: "/offerings/b2b/demand-discovery", desc: "Detect buying signals and purchasing triggers across mapped market segments." },
            { name: "B2B Customer Discovery", code: "B2B-6", path: "/offerings/b2b/customer-discovery", desc: "Profile buying committees, technographics, and ICP scoring for priority accounts." }
        ]
    },

    "b2b-demand-discovery": {
        id: "b2b-demand-discovery",
        code: "B2B-2",
        eyebrow: "PRE-PIPELINE DEMAND INTELLIGENCE",
        primaryCtaText: "Activate Demand Signals",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "demand",
        layer01Opportunity: {
            headline: "LAYER 01 — LATENT DEMAND DETECTION",
            copy: "Identify business problems, purchasing triggers and emerging buyer intent to help revenue teams prioritise accounts and engage prospects at the right stage.",
            badge: "Intent Signal Network",
            metric: "2.8x Pipeline Velocity Lift",
            subtext: "Engage decision-makers 6-9 months before formal procurement and RFP issuance."
        },
        spin: {
            situation: "Sales teams often engage when a prospect submits a form or issues a formal RFP.",
            problem: "Late engagement can leave little time to influence requirements or understand the buying committee dynamics.",
            implication: "Teams compete on price against entrenched incumbents and invest in opportunities with limited differentiation.",
            needPayoff: "Combine permitted buying signals, customer research and qualification criteria to identify relevant accounts earlier."
        },
        appliedFrameworks: [
            { name: "Buying-Trigger Analysis", description: "Mapping corporate events (leadership changes, funding rounds, regulatory deadlines) that force operational change." },
            { name: "Demand Validation Interviews", description: "Uncovering unarticulated operational bottlenecks directly from director-level practitioners." },
            { name: "Buyer-Intent Classification", description: "Categorizing digital search spikes and content consumption into Research, Consideration, and Procurement phases." },
            { name: "Buying-Committee Mapping", description: "Identifying the 5-7 distinct roles involved in sign-off across Technical, Operational, and Economic vectors." },
            { name: "Lead & Account Qualification (MEDDPICC)", description: "Scoring metrics, economic buyer engagement, decision criteria, and identified pain early." },
            { name: "Pre-RFP Engagement Planning", description: "Co-creating evaluation criteria with internal champions before commercial requirements are finalized." }
        ],
        profitPoolCapturePoints: [
            "Identify commercial demand before formal procurement processes begin.",
            "Prioritise accounts with validated business needs over static title matches.",
            "Improve qualification quality and protect AE time from dead-end deals.",
            "Reduce sales cycle duration by establishing vendor preference at the problem-definition stage."
        ],
        performanceMetrics: [
            { category: "Demand Volume", metric: "Qualified Demand Accounts", definition: "Accounts with validated operational pain and confirmed buying conditions.", baseline: "120/mo", target: "380/mo", frequency: "Monthly" },
            { category: "Intent Quality", metric: "Signal-to-Meeting Conversion", definition: "Percentage of intent-flagged target accounts that accept an executive briefing.", baseline: "4.2%", target: "16.5%", frequency: "Monthly" },
            { category: "Urgency", metric: "Validated Buying Triggers", definition: "Number of target accounts exhibiting 2+ confirmed purchasing triggers in 30 days.", baseline: "35 accounts", target: "140 accounts", frequency: "Bi-weekly" },
            { category: "Coverage", metric: "Validation Coverage Rate", definition: "Share of prioritized Tier-1 accounts with confirmed problem severity data.", baseline: "22%", target: "75%", frequency: "Quarterly" },
            { category: "Pipeline", metric: "Demand-to-Pipeline Conversion", definition: "Progression rate from validated demand meeting to Stage 2 sales qualified opportunity.", baseline: "18%", target: "44%", frequency: "Quarterly" },
            { category: "Velocity", metric: "Pre-RFP Influence Share", definition: "Proportion of closed-won opportunities where requirements were co-designed pre-RFP.", baseline: "12%", target: "58%", frequency: "Annually" }
        ],
        relatedOfferings: [
            { name: "B2B Market Discovery", code: "B2B-1", path: "/offerings/b2b/market-discovery", desc: "Size and prioritize high-growth market segments before activating demand capture." },
            { name: "B2B Channel Discovery", code: "B2B-4", path: "/offerings/b2b/channel-discovery", desc: "Scale demand capture across indirect partner and systems integrator ecosystems." }
        ]
    },

    "b2b-value-discovery": {
        id: "b2b-value-discovery",
        code: "B2B-3",
        eyebrow: "ECONOMIC VALUE & PRICING ARCHITECTURE",
        primaryCtaText: "Quantify Deal Economics",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "value",
        layer01Opportunity: {
            headline: "LAYER 01 — ECONOMIC VALUE QUANTIFICATION",
            copy: "Connect product capabilities to measurable customer outcomes, develop credible economic cases and improve pricing, packaging and commercial decisions.",
            badge: "Value-Based Architecture",
            metric: "CFO Approval Rate: 88%+",
            subtext: "Eliminate avoidable discounting with defensible business-case modeling."
        },
        spin: {
            situation: "Sales proposals describe product features, service capabilities and generic potential savings.",
            problem: "The proposal may not demonstrate how those benefits affect the customer's actual financial or operational outcomes.",
            implication: "Procurement may demand discounts, finance may delay approval and high-value deals stall in committee review.",
            needPayoff: "Build a customer-specific value model using documented assumptions, financial inputs and measurable business outcomes."
        },
        appliedFrameworks: [
            { name: "Economic Value to Customer (EVC)", description: "Quantifying positive differentiation value against the customer's next-best competitive alternative." },
            { name: "Willingness-to-Pay (WTP) Research", description: "Van Westendorp and conjoint analysis calibrated for enterprise decision-maker budgets." },
            { name: "Pricing Sensitivity Analysis", description: "Evaluating price elasticity curves across contract tiers and usage-based dimensions." },
            { name: "Packaging & Tiering Design", description: "Structuring Good/Better/Best tiers aligned with customer operational maturity milestones." },
            { name: "Customer Business-Case Modeling", description: "Dynamic financial models projecting 12-month net savings, productivity gains, and payback periods." },
            { name: "Discount & Margin Governance", description: "Empirical discounting rules tied directly to contract duration and multi-year payment terms." }
        ],
        profitPoolCapturePoints: [
            "Improve price-value alignment to capture fair share of economic surplus.",
            "Identify sustainable premium pricing opportunities in differentiated capabilities.",
            "Reduce unnecessary discounting during late-stage procurement reviews.",
            "Equip champions with defensible financial decks that fast-track CFO sign-off."
        ],
        performanceMetrics: [
            { category: "Deal Economics", metric: "Average Contract Value (ACV)", definition: "Annualized contract value across new logo and expansion agreements.", baseline: "$62K", target: "$145K", frequency: "Quarterly" },
            { category: "Pricing Defense", metric: "Discount Realization Rate", definition: "Effective price collected as a percentage of published list price.", baseline: "68%", target: "89%", frequency: "Monthly" },
            { category: "Profitability", metric: "Contribution Margin", definition: "Revenue less direct delivery, infrastructure, and variable servicing costs.", baseline: "54%", target: "76%", frequency: "Quarterly" },
            { category: "Sales Velocity", metric: "Proposal-to-Close Conversion", definition: "Proportion of formal economic proposals converted to signed contracts.", baseline: "24%", target: "52%", frequency: "Monthly" },
            { category: "Customer Proof", metric: "Measured Customer ROI", definition: "Audited financial benefit realized by customer relative to total solution investment.", baseline: "1.8x", target: "4.6x", frequency: "Annually" },
            { category: "Cycle Time", metric: "Procurement Review Duration", definition: "Average business days elapsed between business case presentation and final sign-off.", baseline: "58 days", target: "21 days", frequency: "Quarterly" }
        ],
        relatedOfferings: [
            { name: "B2B Competitive Discovery", code: "B2B-5", path: "/offerings/b2b/competitive-discovery", desc: "Map competitor pricing positions and strengthen differentiation claims." },
            { name: "B2B Product-Market Fit Discovery", code: "B2B-7", path: "/offerings/b2b/product-market-fit-discovery", desc: "Verify feature adoption to protect renewals and drive expansion pricing." }
        ]
    },

    "b2b-channel-discovery": {
        id: "b2b-channel-discovery",
        code: "B2B-4",
        eyebrow: "PARTNER & DISTRIBUTION ARCHITECTURE",
        primaryCtaText: "Evaluate Channel Economics",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "channel",
        layer01Opportunity: {
            headline: "LAYER 01 — CHANNEL PROFITABILITY ANALYSIS",
            copy: "Evaluate direct sales, inbound, outbound, reseller and partner channels to identify where qualified pipeline and profitable customer acquisition are most achievable.",
            badge: "Ecosystem Distribution Model",
            metric: "+28 Points Channel Margin",
            subtext: "Scale distribution velocity while optimizing customer acquisition economics."
        },
        spin: {
            situation: "Growth depends on a limited number of direct sales or outbound marketing channels.",
            problem: "The business may not know which alternative channels provide efficient, sustainable access to target accounts.",
            implication: "Market reach remains limited, acquisition costs increase and the sales organisation becomes difficult to scale profitably.",
            needPayoff: "Compare channel economics, target-customer access, sales-cycle requirements and partner capabilities."
        },
        appliedFrameworks: [
            { name: "Channel Attribution Modeling", description: "Multi-touch evaluation measuring sourced, influenced, and co-delivered enterprise pipeline." },
            { name: "Direct vs. Partner Unit Economics", description: "Comparative margin analysis accounting for partner rev-share, enablement, and direct SDR/AE costs." },
            { name: "Partner Capability Assessment", description: "Evaluating systems integrators and VARs on technical bench strength, client trust, and vertical access." },
            { name: "Channel Conflict Matrix", description: "Rules of engagement preventing overlap between internal direct sales and ecosystem partners." },
            { name: "Co-Selling Account Mapping", description: "Account-level overlap analysis identifying shared target accounts ready for warm introductions." },
            { name: "Channel Investment Prioritisation", description: "Capital allocation framework funding highest-margin distribution paths with shortest ramp." }
        ],
        profitPoolCapturePoints: [
            "Identify underutilised acquisition channels with lower competitive bidding intensity.",
            "Improve partner-sourced opportunity quality through programmatic qualification standards.",
            "Allocate marketing and co-sell investment to economically attractive routes.",
            "Scale market coverage without proportional linear headcount expansion."
        ],
        performanceMetrics: [
            { category: "Efficiency", metric: "Channel CAC", definition: "Fully-loaded customer acquisition cost allocated by specific distribution channel.", baseline: "$48K", target: "$19K", frequency: "Quarterly" },
            { category: "Volume", metric: "Qualified Channel Pipeline", definition: "Value of partner-sourced opportunities meeting agreed MEDDPICC qualification standards.", baseline: "$1.8M", target: "$6.5M", frequency: "Monthly" },
            { category: "Mix", metric: "Partner Sourced Contribution", definition: "Percentage of total closed-won revenue originated by ecosystem partners.", baseline: "14%", target: "42%", frequency: "Quarterly" },
            { category: "Speed", metric: "Sales Cycle Duration", definition: "Average days to contract close comparing partner-influenced vs. cold outbound deals.", baseline: "112 days", target: "64 days", frequency: "Monthly" },
            { category: "Margins", metric: "Channel Contribution Margin", definition: "Net margin retained after partner commissions, referral fees, and technical support costs.", baseline: "48%", target: "71%", frequency: "Quarterly" },
            { category: "Return", metric: "Channel Program ROI", definition: "Gross profit generated per dollar invested in partner enablement and channel managers.", baseline: "1.9x", target: "4.8x", frequency: "Annually" }
        ],
        relatedOfferings: [
            { name: "B2B Customer Discovery", code: "B2B-6", path: "/offerings/b2b/customer-discovery", desc: "Map shared target accounts with partner ecosystems for targeted co-selling." },
            { name: "B2B Demand Discovery", code: "B2B-2", path: "/offerings/b2b/demand-discovery", desc: "Equip partner sales teams with validated intent triggers to initiate outreach." }
        ]
    },

    "b2b-competitive-discovery": {
        id: "b2b-competitive-discovery",
        code: "B2B-5",
        eyebrow: "COMPETITIVE ADVANTAGE & DISPLACEMENT",
        primaryCtaText: "Analyze Competitive Position",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "competitive",
        layer01Opportunity: {
            headline: "LAYER 01 — COMPETITIVE POSITIONING MATRIX",
            copy: "Map competing solutions, uncover differentiation opportunities and understand the decision criteria that influence enterprise purchasing.",
            badge: "Displacement Architecture",
            metric: "+32% Head-to-Head Win Rate",
            subtext: "Displace entrenched legacy incumbents before procurement enters formal price negotiations."
        },
        spin: {
            situation: "Competitive reviews rely primarily on publicly available messaging or anecdotal information collected after a deal closes.",
            problem: "Teams overlook the actual criteria customers use to compare providers or the operational weaknesses in competing offers.",
            implication: "Positioning becomes generic, and sales teams struggle to communicate defensible differentiation in contested deals.",
            needPayoff: "Build a structured competitive intelligence framework grounded in customer evidence, public data and documented win/loss analysis."
        },
        appliedFrameworks: [
            { name: "Competitor Landscape Mapping", description: "Classification of incumbent platforms, point-solution disruptors, and internal DIY alternatives." },
            { name: "Positioning & White-Space Analysis", description: "Mapping 2x2 capability frontiers to identify unserved buyer requirements." },
            { name: "Customer Decision-Criteria Research", description: "Uncovering the weighted scorecards buying committees use during final vendor selection." },
            { name: "Win/Loss Deal Post-Mortems", description: "Structured executive interviews on won and lost evaluations isolating true deciding factors." },
            { name: "Switching-Trigger Assessment", description: "Detecting vendor renewal windows, price increases, support degradation, and platform outages." },
            { name: "Evidence-Backed Differentiation Validation", description: "Replacing subjective marketing claims with empirical benchmark proof points." }
        ],
        profitPoolCapturePoints: [
            "Identify underserved requirements overlooked by legacy category leaders.",
            "Strengthen evidence-backed differentiation to win contested deals on value.",
            "Equip enterprise sales reps with battlecards that anticipate competitor trap-setting.",
            "Target accounts experiencing contract renewal friction with incumbent solutions."
        ],
        performanceMetrics: [
            { category: "Market Intelligence", metric: "Competitor Coverage", definition: "Percentage of active competitors with audited capability matrices and pricing models.", baseline: "30%", target: "95%", frequency: "Quarterly" },
            { category: "Win Performance", metric: "Competitive Win Rate", definition: "Proportion of head-to-head contested evaluations won against named competitors.", baseline: "28%", target: "56%", frequency: "Monthly" },
            { category: "Displacement", metric: "Incumbent Replacement Rate", definition: "Share of closed-won deals involving direct displacement of an active vendor.", baseline: "18%", target: "48%", frequency: "Quarterly" },
            { category: "Loss Analysis", metric: "Documented Loss Reasons", definition: "Percentage of lost opportunities with verified root-cause analysis from customer interviews.", baseline: "15%", target: "85%", frequency: "Monthly" },
            { category: "Pricing Power", metric: "Price Position Index", definition: "Average realized price premium relative to closest competitive alternative.", baseline: "-10%", target: "+22%", frequency: "Quarterly" },
            { category: "Intent Tracking", metric: "Switching Intent Accounts", definition: "Monitored enterprise accounts displaying active frustration or displacement chatter.", baseline: "25 accounts", target: "120 accounts", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2B Value Discovery", code: "B2B-3", path: "/offerings/b2b/value-discovery", desc: "Quantify economic value advantages over competing alternatives." },
            { name: "B2B Market Discovery", code: "B2B-1", path: "/offerings/b2b/market-discovery", desc: "Identify uncontested white spaces outside direct competitor footprints." }
        ]
    },

    "b2b-customer-discovery": {
        id: "b2b-customer-discovery",
        code: "B2B-6",
        eyebrow: "ICP DEFINITION & BUYING COMMITTEE MAPPING",
        primaryCtaText: "Configure ICP Scoring Model",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "customer",
        layer01Opportunity: {
            headline: "LAYER 01 — TARGET ACCOUNT QUALIFICATION",
            copy: "Develop actionable customer segments and Ideal Customer Profiles to prioritise target accounts, identify buying committees and improve qualification.",
            badge: "Algorithmic ICP Engine",
            metric: "-52% Sales Qualification Waste",
            subtext: "Prioritize accounts based on validated problem fit, budget authority, and purchasing readiness."
        },
        spin: {
            situation: "Account lists are frequently prioritised by company size, brand recognition or broad industry classification.",
            problem: "These characteristics alone do not establish whether an account has a relevant problem, suitable technology or a viable buying process.",
            implication: "Sales teams spend valuable time on accounts that may never become commercially viable opportunities.",
            needPayoff: "Rank accounts using transparent criteria such as business fit, problem evidence, buying triggers, access and commercial suitability."
        },
        appliedFrameworks: [
            { name: "100-Point ICP Scoring Architecture", description: "Configurable scoring indexing firmographics (25 pts), problem fit (25 pts), buying triggers (20 pts), tech readiness (15 pts), and commercial viability (15 pts)." },
            { name: "Firmographic & Technographic Segmentation", description: "Filtering accounts by cloud maturity, security compliance requirements, and installed software stacks." },
            { name: "Buying-Committee Stakeholder Mapping", description: "Documenting the specific roles, concerns, and veto powers across the enterprise purchasing committee." },
            { name: "Account Opportunity Potential Scoring", description: "Predictive sizing of multi-year contract value based on employee count and business volume." },
            { name: "Qualification Workflow Design", description: "Standardized stage gates ensuring sales reps only invest proposal effort in fully qualified opportunities." },
            { name: "Account Tiering (Tier 1 / 2 / 3)", description: "Operationalizing account routing between high-touch ABM, digital nurture, and automated marketing." }
        ],
        profitPoolCapturePoints: [
            "Improve target-account prioritisation to eliminate outreach to low-propensity prospects.",
            "Focus AE and SDR time on accounts with validated technical and commercial readiness.",
            "Identify all essential buying committee members early to prevent late-stage deal vetoes.",
            "Reduce avoidable qualification waste and shorten sales cycles."
        ],
        performanceMetrics: [
            { category: "Scoring Accuracy", metric: "ICP Fit Score Distribution", definition: "Proportion of active pipeline accounts scoring 75+ points on the 100-point index.", baseline: "34%", target: "78%", frequency: "Monthly" },
            { category: "Target Quality", metric: "Qualified Target Accounts", definition: "Verified enterprise accounts satisfying all five qualification dimensions.", baseline: "420 accounts", target: "1,850 accounts", frequency: "Quarterly" },
            { category: "Committee Access", metric: "Buying Committee Coverage", definition: "Average number of validated decision-makers engaged per active enterprise opportunity.", baseline: "1.8 roles", target: "5.2 roles", frequency: "Monthly" },
            { category: "Sales Productivity", metric: "Sales Qualified Account Rate", definition: "Percentage of worked accounts progressing from initial discovery to active pipeline.", baseline: "11%", target: "36%", frequency: "Monthly" },
            { category: "Pipeline Value", metric: "Opportunity ACV Potential", definition: "Average annualized pipeline value generated per qualified Tier-1 account.", baseline: "$45K", target: "$135K", frequency: "Quarterly" },
            { category: "Efficiency", metric: "Disqualification Velocity", definition: "Days elapsed to disqualify poor-fit accounts, freeing rep bandwidth for high-fit targets.", baseline: "38 days", target: "7 days", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2B Market Discovery", code: "B2B-1", path: "/offerings/b2b/market-discovery", desc: "Identify broad market segments and TAM bounds before individual account scoring." },
            { name: "B2B Demand Discovery", code: "B2B-2", path: "/offerings/b2b/demand-discovery", desc: "Sense urgent buying triggers across scored Tier-1 accounts." }
        ]
    },

    "b2b-product-market-fit-discovery": {
        id: "b2b-product-market-fit-discovery",
        code: "B2B-7",
        eyebrow: "RETENTION, ADOPTION & EXPANSION INTELLIGENCE",
        primaryCtaText: "Validate Product Value",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "pmf",
        layer01Opportunity: {
            headline: "LAYER 01 — PRODUCT-MARKET FIT METRICS",
            copy: "Understand which customer needs the product solves, which capabilities are adopted and where retention or expansion opportunities exist.",
            badge: "Value Realization Engine",
            metric: "128% Net Revenue Retention (NRR)",
            subtext: "Prioritize high-impact roadmap improvements backed by verified customer usage data."
        },
        spin: {
            situation: "Product and engineering teams receive feature requests from sales, customer success and individual enterprise customers.",
            problem: "Individual requests may not reflect broader customer demand or long-term product strategy.",
            implication: "Development resources may be diverted toward one-off custom features with limited adoption or weak commercial value.",
            needPayoff: "Validate demand across customer segments, measure adoption and retention, and prioritise features according to customer value and business impact."
        },
        appliedFrameworks: [
            { name: "Customer Validation Research", description: "Structured product interviews evaluating whether delivered capabilities solve mission-critical workflows." },
            { name: "Feature Demand & Impact Prioritisation", description: "RICE scoring (Reach, Impact, Confidence, Effort) cross-referenced against customer contract value." },
            { name: "Product Adoption Cohort Analysis", description: "Tracking user activation, daily active usage (DAU/WAU), and sticky workflow completion across customer cohorts." },
            { name: "Retention & Renewal Forecasting", description: "Predictive health scoring identifying churn risks 90 days before contract renewal deadlines." },
            { name: "Roadmap Commercialization Framework", description: "Validating willingness to pay for major new feature modules prior to engineering sprint allocation." },
            { name: "Customer Feedback Classification", description: "Categorizing incoming support tickets, NPS feedback, and CSM notes into structured feature clusters." }
        ],
        profitPoolCapturePoints: [
            "Prioritise high-value product improvements that directly drive account renewals.",
            "Identify and remove operational adoption barriers preventing full organizational rollout.",
            "Improve multi-year customer retention and contract expansion velocity.",
            "Eliminate costly engineering investment in low-demand, speculative features."
        ],
        performanceMetrics: [
            { category: "Adoption", metric: "Enterprise Activation Rate", definition: "Percentage of licensed enterprise seats completing key onboarding workflows within 30 days.", baseline: "42%", target: "84%", frequency: "Monthly" },
            { category: "Engagement", metric: "Feature Adoption Depth", definition: "Proportion of active customer accounts regularly utilizing 3+ core platform modules.", baseline: "31%", target: "68%", frequency: "Monthly" },
            { category: "Retention", metric: "Gross Revenue Retention (GRR)", definition: "Percentage of recurring revenue retained from existing customers excluding expansion.", baseline: "84%", target: "96%", frequency: "Quarterly" },
            { category: "Expansion", metric: "Net Revenue Retention (NRR)", definition: "Total retained recurring revenue including expansions, cross-sells, and upgrades.", baseline: "102%", target: "128%", frequency: "Quarterly" },
            { category: "Advocacy", metric: "Customer Satisfaction (CSAT/NPS)", definition: "Executive and end-user sentiment measured across quarterly business reviews.", baseline: "+28 NPS", target: "+62 NPS", frequency: "Quarterly" },
            { category: "Efficiency", metric: "R&D Waste Reduction", definition: "Percentage of engineering sprint capacity allocated exclusively to validated revenue-driving features.", baseline: "45%", target: "90%", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2B Value Discovery", code: "B2B-3", path: "/offerings/b2b/value-discovery", desc: "Turn validated product outcomes into quantifiable customer ROI models." },
            { name: "B2B Customer Discovery", code: "B2B-6", path: "/offerings/b2b/customer-discovery", desc: "Identify which customer segments demonstrate highest long-term retention and expansion." }
        ]
    },

    // ══════════════════════════════════════════════════════════════════════
    // B2C STRATEGIES (1 to 7)
    // ══════════════════════════════════════════════════════════════════════

    "b2c-market-discovery": {
        id: "b2c-market-discovery",
        code: "B2C-1",
        eyebrow: "CONSUMER MARKET INTELLIGENCE",
        primaryCtaText: "Discover Consumer Niches",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "market",
        layer01Opportunity: {
            headline: "LAYER 01 — CONSUMER NICHE OPPORTUNITY",
            copy: "Identify promising consumer categories, understand market demand and prioritise customer segments with commercially viable growth potential.",
            badge: "Consumer Market Model",
            metric: "$180M+ High-Margin Niche Sizing",
            subtext: "Discover underserved consumer cohorts before saturated mass-market ad costs erode contribution margin."
        },
        spin: {
            situation: "Marketing teams target broad demographics or established product categories based on generic industry reports.",
            problem: "Broad categories conceal profound differences in consumer needs, purchase behaviour, channel preferences and willingness to pay.",
            implication: "Marketing spend is directed toward saturated or low-margin segments where ad auction costs exceed customer lifetime value.",
            needPayoff: "Compare consumer cohorts using granular category demand, spending patterns, purchase motivations and competitive conditions."
        },
        appliedFrameworks: [
            { name: "Consumer TAM / SAM / SOM Sizing", description: "Bottom-up sizing evaluating total addressable consumer households, regional reachability, and realistic penetration." },
            { name: "Category Trend & Growth Analysis", description: "Evaluating search volume velocity, social discourse sentiment, and retail sales growth across emerging sub-categories." },
            { name: "Behavioral Consumer Segmentation", description: "Grouping consumers by lifestyle triggers, purchase motivations, and willingness to pay rather than static age/gender demographics." },
            { name: "Geographic Opportunity Mapping", description: "Identifying high-density regional pockets with high disposable income and low local retail availability." },
            { name: "Niche Prioritisation Matrix", description: "Ranking consumer categories by customer acquisition cost, gross margin potential, and repeat purchase frequency." },
            { name: "Market-Entry Feasibility Review", description: "Auditing supply chain lead times, logistics unit costs, and regulatory compliance for new consumer product lines." }
        ],
        profitPoolCapturePoints: [
            "Identify fast-growing, high-margin consumer niches overlooked by mass-market legacy brands.",
            "Prioritise product categories with validated organic search demand and low competitive bid pressure.",
            "Target geographic clusters with high purchasing power and underserved product selection.",
            "De-risk product line expansion by pre-testing consumer demand before holding inventory."
        ],
        performanceMetrics: [
            { category: "Market Bounds", metric: "Consumer TAM / SAM / SOM", definition: "Estimated addressable consumer population and spending volume across target sub-categories.", baseline: "$1.2B TAM", target: "$280M SAM", frequency: "Quarterly" },
            { category: "Growth Trajectory", metric: "Category Growth Rate", definition: "Year-over-year expansion in search volume and category retail transaction volume.", baseline: "+8% YoY", target: "+34% YoY", frequency: "Quarterly" },
            { category: "Addressability", metric: "Addressable Consumer Segments", definition: "Number of distinct, reachable consumer cohorts identified with positive unit economics.", baseline: "2 cohorts", target: "6 cohorts", frequency: "Bi-annually" },
            { category: "Economics", metric: "Estimated Spending Potential", definition: "Modeled annual category spend per consumer household within target niche segments.", baseline: "$140/yr", target: "$380/yr", frequency: "Annually" },
            { category: "Penetration", metric: "Market Penetration Velocity", definition: "Speed of acquiring first 10,000 active customers in a newly launched consumer category.", baseline: "14 months", target: "4 months", frequency: "Per launch" },
            { category: "Profitability", metric: "Niche Gross Margin", definition: "Gross margin retained on niche consumer products after direct manufacturing and freight costs.", baseline: "42%", target: "68%", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2C Demand Discovery", code: "B2C-2", path: "/offerings/b2c/demand-discovery", desc: "Sense consumer purchase intent and search demand micro-moments." },
            { name: "B2C Customer Discovery", code: "B2C-6", path: "/offerings/b2c/customer-discovery", desc: "Build behavioral cohort retention models and lifetime value roadmaps." }
        ]
    },

    "b2c-demand-discovery": {
        id: "b2c-demand-discovery",
        code: "B2C-2",
        eyebrow: "REAL-TIME INTENT & TREND INTELLIGENCE",
        primaryCtaText: "Capture Consumer Demand",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "demand",
        layer01Opportunity: {
            headline: "LAYER 01 — CONSUMER INTENT DETECTION",
            copy: "Understand changing search interest, purchase intent, consumer problems and seasonal or event-driven demand to improve marketing timing and product availability.",
            badge: "Intent Pulse Engine",
            metric: "3.4x Demand-to-Purchase Lift",
            subtext: "Capitalize on micro-moment purchase triggers before ad auction prices escalate."
        },
        spin: {
            situation: "Consumer marketing campaigns are planned around fixed annual calendars, broad demographic assumptions or historical seasonal averages.",
            problem: "Emerging consumer needs, sudden viral trends and localized demand shifts are not detected in time to adjust campaign messaging or inventory.",
            implication: "Marketing budgets are spent during periods of low purchase intent, while peak demand opportunities are missed or under-resourced.",
            needPayoff: "Combine real-time search trend monitoring, social intent listening and conversion funnel analysis to capitalize on demand as it emerges."
        },
        appliedFrameworks: [
            { name: "Search-Demand & Keyword Velocity", description: "Tracking sudden acceleration in long-tail purchase intent queries across Google, Amazon, and TikTok search." },
            { name: "Trend Detection & Sentiment Listening", description: "Monitoring consumer conversation clusters on social channels to identify emerging product desires and frustrations." },
            { name: "Consumer Intent Classification", description: "Distinguishing informational curiosity from immediate transactional purchase intent." },
            { name: "Seasonal & Event-Driven Demand Modeling", description: "Algorithmic forecasting of demand spikes tied to holidays, weather events, and cultural moments." },
            { name: "Campaign Timing & Surge Activation", description: "Automated campaign budget scaling triggered when local search interest crosses designated demand thresholds." },
            { name: "Conversion Rate Optimization (CRO)", description: "Dynamic landing page customization reflecting the exact search term or intent trigger that initiated the visit." }
        ],
        profitPoolCapturePoints: [
            "Detect emerging consumer product trends 4-8 weeks before mass-market adoption.",
            "Synchronize advertising spend with verified search demand peaks to lower cost per acquisition.",
            "Prioritise products and landing page experiences aligned with high-intent search terms.",
            "Reallocate budget away from declining seasonal categories toward emerging demand waves."
        ],
        performanceMetrics: [
            { category: "Intent Volume", metric: "Search Demand Index", definition: "Indexed query volume for prioritized high-intent category keywords.", baseline: "12,000/mo", target: "85,000/mo", frequency: "Weekly" },
            { category: "Engagement", metric: "Demand-to-Visit CTR", definition: "Click-through rate from intent-targeted search and social creative to product landing pages.", baseline: "1.8%", target: "4.9%", frequency: "Daily" },
            { category: "Conversion", metric: "Demand-to-Purchase Conversion", definition: "Proportion of intent-driven site visitors completing a checkout transaction.", baseline: "1.4%", target: "3.8%", frequency: "Weekly" },
            { category: "Efficiency", metric: "Cost Per Qualified Visit (CPV)", definition: "Fully-loaded advertising spend divided by visits with >45s active dwell time.", baseline: "$2.40", target: "$0.85", frequency: "Weekly" },
            { category: "Responsiveness", metric: "Trend Activation Latency", definition: "Hours elapsed between detecting an emerging search spike and launching live campaigns.", baseline: "14 days", target: "24 hours", frequency: "Per trend" },
            { category: "Commercial Impact", metric: "Intent-Driven Revenue Share", definition: "Percentage of total online sales originating from automated intent-triggered campaigns.", baseline: "12%", target: "46%", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2C Market Discovery", code: "B2C-1", path: "/offerings/b2c/market-discovery", desc: "Map broad consumer categories before tracking daily demand fluctuations." },
            { name: "B2C Channel Discovery", code: "B2C-4", path: "/offerings/b2c/channel-discovery", desc: "Route high-intent consumer traffic to the most profitable acquisition channel." }
        ]
    },

    "b2c-value-discovery": {
        id: "b2c-value-discovery",
        code: "B2C-3",
        eyebrow: "PRICING, PACKAGING & MARGIN OPTIMIZATION",
        primaryCtaText: "Optimize Consumer Pricing",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "value",
        layer01Opportunity: {
            headline: "LAYER 01 — CONSUMER VALUE & PRICE ELASTICITY",
            copy: "Understand how consumers perceive product value, how price affects purchasing decisions and how offers can improve conversion without sacrificing contribution margin.",
            badge: "Pricing & Elasticity Lab",
            metric: "+38% Contribution Per Order",
            subtext: "Engineer value bundles that maximize average order value without resorting to margin-eroding discounts."
        },
        spin: {
            situation: "Product pages and seasonal promotions rely heavily on sitewide discounts, coupon codes and generic feature bullet points.",
            problem: "The offer does not articulate specific value for distinct consumer motivations or demonstrate price justification for premium tiers.",
            implication: "Shoppers abandon carts, choose lower-priced commodity alternatives or become conditioned to purchase only during heavy discount events.",
            needPayoff: "Test value propositions, offer structures, bundle mechanics and pricing hypotheses using controlled experiments and consumer research."
        },
        appliedFrameworks: [
            { name: "Van Westendorp Price Sensitivity Meter", description: "Survey methodology identifying the acceptable price range and optimal price point for consumer products." },
            { name: "Price Elasticity & Demand Curve Modeling", description: "Measuring how unit sales volume and gross revenue fluctuate across distinct price points." },
            { name: "Bundle & Packaging Optimization", description: "Designing multi-pack, subscription, and accessory bundles that increase average order value (AOV)." },
            { name: "Value Proposition Testing", description: "Split-testing visual copy framing (convenience vs. quality vs. status) to identify highest-converting messaging." },
            { name: "Checkout Friction & Urgency Architecture", description: "Optimizing cart pages with free-shipping progress bars, clear value assurances, and transparent payment options." },
            { name: "Contribution-Margin Protection Framework", description: "Ensuring all promotional offers retain positive unit contribution after payment processing and shipping." }
        ],
        profitPoolCapturePoints: [
            "Improve price-value alignment to capture higher average order value from willing buyers.",
            "Identify high-margin bundles and complementary cross-sells that protect overall gross margin.",
            "Improve checkout conversion rates without relying on margin-eroding promotional discounts.",
            "Reduce discount dependency by highlighting defensible product quality and social proof."
        ],
        performanceMetrics: [
            { category: "Order Value", metric: "Average Order Value (AOV)", definition: "Mean gross revenue generated per completed consumer checkout transaction.", baseline: "$48.00", target: "$78.50", frequency: "Weekly" },
            { category: "Funnel Efficiency", metric: "Storefront Conversion Rate", definition: "Percentage of unique product page visitors who complete a purchase.", baseline: "1.6%", target: "3.4%", frequency: "Weekly" },
            { category: "Profitability", metric: "Contribution Margin Per Order", definition: "Revenue less cost of goods sold, pick/pack fees, payment processing, and ad acquisition cost.", baseline: "$11.20", target: "$26.80", frequency: "Monthly" },
            { category: "Promotional Health", metric: "Discount Dependency Rate", definition: "Share of total orders utilizing a promotional coupon or markdown code.", baseline: "52%", target: "18%", frequency: "Monthly" },
            { category: "Cart Health", metric: "Cart-to-Checkout Completion", definition: "Proportion of visitors who add items to cart and successfully complete payment.", baseline: "34%", target: "58%", frequency: "Daily" },
            { category: "Lifetime Value", metric: "First-Order Margin Realization", definition: "Net profit generated on customer acquisition transaction before repeat purchase.", baseline: "-$4.00 (Loss)", target: "+$8.50 (Profitable)", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2C Competitive Discovery", code: "B2C-5", path: "/offerings/b2c/competitive-discovery", desc: "Benchmark price points and promotional strategies against market rivals." },
            { name: "B2C Product-Market Fit Discovery", code: "B2C-7", path: "/offerings/b2c/product-market-fit-discovery", desc: "Validate that product quality delivers on the pricing promise to ensure repeat purchases." }
        ]
    },

    "b2c-channel-discovery": {
        id: "b2c-channel-discovery",
        code: "B2C-4",
        eyebrow: "OMNICHANNEL ACQUISITION & ATTRIBUTION",
        primaryCtaText: "Compare Acquisition Channels",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "channel",
        layer01Opportunity: {
            headline: "LAYER 01 — CHANNEL ACQUISITION ECONOMICS",
            copy: "Compare paid media, organic search, social commerce, marketplaces, affiliates, email and direct-to-consumer channels using acquisition economics and customer quality.",
            badge: "Omnichannel Profit Engine",
            metric: "4.2x Blended ROAS",
            subtext: "Reallocate ad spend away from low-retention channels to maximize customer lifetime value."
        },
        spin: {
            situation: "Consumer brands distribute budget across Meta, Google Ads, Amazon, TikTok, influencers and affiliate platforms based on platform reporting.",
            problem: "Channel allocation relies on self-reported, last-click attribution models with inconsistent conversion windows and duplicate credit.",
            implication: "Marketing spend is escalated on channels that drive low-margin, one-time coupon buyers with near-zero repeat purchase rates.",
            needPayoff: "Compare channel performance using unified incrementality attribution, net contribution margin, customer quality and 90-day repeat purchase behaviour."
        },
        appliedFrameworks: [
            { name: "Incrementality & Multi-Touch Attribution", description: "Evaluating true net-new customer acquisition using geo-lift experiments and fractional credit models." },
            { name: "Customer Acquisition Cost (CAC) by Channel", description: "Calculating fully-loaded CAC including creative production, agency fees, and platform spend." },
            { name: "D2C vs. Marketplace Unit Economics", description: "Comparing direct website margins against Amazon and retail marketplace take rates and advertising costs." },
            { name: "Organic vs. Paid Acquisition Velocity", description: "Measuring the multiplier effect of organic search (SEO), content marketing, and brand social." },
            { name: "Cohort Repeat-Purchase Analysis", description: "Tracking whether customers acquired via TikTok, Meta, or Google demonstrate higher 6-month LTV." },
            { name: "Channel Portfolio Reallocation", description: "Dynamic budgeting shifting weekly spend to channels with the highest marginal return on ad spend (ROAS)." }
        ],
        profitPoolCapturePoints: [
            "Identify underpriced acquisition channels before auction saturation drives up CPMs.",
            "Eliminate ad spend on channels delivering one-time coupon hunters with high return rates.",
            "Optimize the mix between direct website sales and marketplace distribution.",
            "Boost organic search and referral traffic to lower blended customer acquisition costs."
        ],
        performanceMetrics: [
            { category: "Acquisition Cost", metric: "Blended Customer Acquisition Cost (CAC)", definition: "Total marketing spend divided by total new customer count across all channels.", baseline: "$38.00", target: "$17.50", frequency: "Weekly" },
            { category: "Ad Efficiency", metric: "Return on Ad Spend (ROAS)", definition: "Direct tracked revenue generated per dollar spent on digital performance media.", baseline: "1.9x", target: "4.2x", frequency: "Daily" },
            { category: "Channel Mix", metric: "Organic & Direct Traffic Share", definition: "Percentage of total store visits originating from non-paid search, email, and direct visits.", baseline: "22%", target: "48%", frequency: "Monthly" },
            { category: "Conversion Quality", metric: "Click-to-Purchase Conversion", definition: "Storewide conversion rate comparing traffic quality across paid traffic sources.", baseline: "1.2%", target: "3.1%", frequency: "Weekly" },
            { category: "Cohort Quality", metric: "90-Day Repeat Purchase Rate", definition: "Percentage of newly acquired customers from a channel who make a second purchase within 90 days.", baseline: "14%", target: "32%", frequency: "Monthly" },
            { category: "Channel Margin", metric: "Net Contribution Margin by Channel", definition: "Revenue minus ad spend, product COGS, and marketplace fees by acquisition source.", baseline: "18%", target: "38%", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2C Demand Discovery", code: "B2C-2", path: "/offerings/b2c/demand-discovery", desc: "Align channel creative and ad budgets with real-time search demand surges." },
            { name: "B2C Customer Discovery", code: "B2C-6", path: "/offerings/b2c/customer-discovery", desc: "Analyze customer cohort retention and maximize lifetime value post-acquisition." }
        ]
    },

    "b2c-competitive-discovery": {
        id: "b2c-competitive-discovery",
        code: "B2C-5",
        eyebrow: "BRAND DIFFERENTIATION & ALTERNATIVES",
        primaryCtaText: "Benchmark Brand Position",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "competitive",
        layer01Opportunity: {
            headline: "LAYER 01 — COMPETITOR BENCHMARKING",
            copy: "Compare competing products, pricing, positioning and consumer feedback to discover unmet needs and strengthen differentiation.",
            badge: "Brand Positioning Lab",
            metric: "+42% Brand Preference Index",
            subtext: "Analyze thousands of competitor reviews to identify recurring consumer frustrations and unmet needs."
        },
        spin: {
            situation: "Brands review competitors through occasional manual price checks and superficial marketing observation.",
            problem: "They overlook recurring consumer complaints in competitor reviews, unmet customer expectations and the real reasons consumers switch brands.",
            implication: "Product positioning becomes generic, marketing claims sound identical to rivals, and campaigns compete primarily on destructive price cuts.",
            needPayoff: "Combine public competitive research, consumer review sentiment analysis and head-to-head feature comparisons to build distinctive brand moats."
        },
        appliedFrameworks: [
            { name: "Competitor Positioning & Offer Mapping", description: "Mapping rival consumer brands across price tiering, target demographics, and brand ethos." },
            { name: "Review Sentiment & Complaint Mining", description: "Natural language processing of thousands of competitor Amazon/Trustpilot reviews to extract common product flaws." },
            { name: "Price & Promotional Benchmarking", description: "Tracking competitor markdown cadences, shipping thresholds, and seasonal bundle structures." },
            { name: "Consumer Switching Motivations", description: "Surveying customers who abandoned rival brands to isolate the exact tipping points." },
            { name: "Differentiation Proof Points", description: "Developing verifiable product claims (e.g., ingredients, durability, sustainability) that competitors cannot match." },
            { name: "Search & Ad Conquesting Intelligence", description: "Analyzing competitor paid search keywords and creative messaging to identify messaging vulnerabilities." }
        ],
        profitPoolCapturePoints: [
            "Identify underserved consumer needs frequently complained about in competitor reviews.",
            "Craft high-converting ad creative highlighting unique advantages over named alternatives.",
            "Establish premium positioning that justifies higher prices without losing deal volume.",
            "Target dissatisfied customers of incumbent brands during service disruptions or price hikes."
        ],
        performanceMetrics: [
            { category: "Intelligence", metric: "Competitor Price Coverage", definition: "Share of key market competitors monitored for daily price and promotional changes.", baseline: "25%", target: "90%", frequency: "Weekly" },
            { category: "Customer Voice", metric: "Competitor Review Pain Themes", definition: "Categorized volume of recurring consumer complaints extracted from rival product reviews.", baseline: "4 themes", target: "18 validated themes", frequency: "Monthly" },
            { category: "Brand Strength", metric: "Brand Preference Rate", definition: "Proportion of surveyed consumers who choose your product in blinded side-by-side evaluations.", baseline: "32%", target: "64%", frequency: "Quarterly" },
            { category: "Switching", metric: "Competitor Switcher Share", definition: "Percentage of new customer acquisitions that previously used a direct competitor product.", baseline: "12%", target: "38%", frequency: "Monthly" },
            { category: "Ad Conquesting", metric: "Conquest Campaign ROAS", definition: "Return on ad spend achieved on search and social campaigns targeting rival brand keywords.", baseline: "1.4x", target: "3.2x", frequency: "Weekly" },
            { category: "Positioning", metric: "Price-to-Value Index", definition: "Perceived consumer value rating relative to the market average price tier.", baseline: "0.95 (Parity)", target: "1.42 (Premium)", frequency: "Quarterly" }
        ],
        relatedOfferings: [
            { name: "B2C Value Discovery", code: "B2C-3", path: "/offerings/b2c/value-discovery", desc: "Transform competitive differentiation points into high-converting storefront offers." },
            { name: "B2C Market Discovery", code: "B2C-1", path: "/offerings/b2c/market-discovery", desc: "Identify emerging niche categories with low competitor density." }
        ]
    },

    "b2c-customer-discovery": {
        id: "b2c-customer-discovery",
        code: "B2C-6",
        eyebrow: "CONSUMER COHORTS, RETENTION & LTV",
        primaryCtaText: "Explore Consumer Cohorts",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "customer",
        layer01Opportunity: {
            headline: "LAYER 01 — CONSUMER COHORT RETENTION",
            copy: "Identify meaningful consumer segments, understand purchasing patterns and develop retention strategies that reflect customer behaviour and economic value.",
            badge: "LTV Optimization Engine",
            metric: "2.6x Customer Lifetime Value",
            subtext: "Segment customers by Recency, Frequency, and Monetary value to build automated lifecycle flows."
        },
        spin: {
            situation: "Marketing teams segment consumers using basic demographic buckets (age, gender, state) or broad email blast lists.",
            problem: "Basic demographics fail to explain why consumers return, disengage, refer friends or abandon the brand after a single purchase.",
            implication: "Retention campaigns are generic, discounts are sent to customers who would have bought anyway, and high-value buyers churn unnoticed.",
            needPayoff: "Combine behavioural cohort analysis, RFM transaction segmentation, product usage data and automated lifecycle campaigns."
        },
        appliedFrameworks: [
            { name: "RFM (Recency, Frequency, Monetary) Segmentation", description: "Scoring customer database into Champions, Loyal Customers, Potential Loyalists, At Risk, and Hibernating." },
            { name: "Customer Lifetime Value (LTV) Modeling", description: "Predicting 12-month customer equity based on first-order basket composition and acquisition channel." },
            { name: "Retention & Churn Cohort Tracking", description: "Measuring month-over-month repurchase curves across acquisition cohorts to isolate retention inflection points." },
            { name: "Automated Lifecycle Journey Design", description: "Triggering personalized email, SMS, and app notifications based on individual predicted repurchase cycles." },
            { name: "Win-Back & Reactivation Sequences", description: "Deploying targeted incentives to at-risk customers precisely before the predicted churn horizon." },
            { name: "VIP Customer Engagement & Advocacy", description: "Providing early product access, exclusive bundles, and concierge service to the top 5% revenue cohort." }
        ],
        profitPoolCapturePoints: [
            "Identify the top 10% high-value customer cohort responsible for over 50% of total profits.",
            "Automate repurchase reminder flows calibrated to individual product consumption velocity.",
            "Reactivate dormant customers with personalized win-back offers before permanent attrition.",
            "Feed high-LTV customer seed lists into paid media platforms for high-performing lookalike targeting."
        ],
        performanceMetrics: [
            { category: "Customer Value", metric: "12-Month Customer Lifetime Value (LTV)", definition: "Average net cumulative profit generated per customer in their first year.", baseline: "$54.00", target: "$142.00", frequency: "Quarterly" },
            { category: "Repurchase Rate", metric: "Repeat Purchase Rate", definition: "Percentage of customers who complete two or more purchases within a 12-month period.", baseline: "18%", target: "42%", frequency: "Monthly" },
            { category: "Cadence", metric: "Average Purchase Frequency", definition: "Mean number of distinct orders placed per active customer per year.", baseline: "1.3 orders/yr", target: "2.8 orders/yr", frequency: "Quarterly" },
            { category: "Retention", metric: "6-Month Cohort Retention Rate", definition: "Proportion of an acquisition cohort remaining active and purchasing after 180 days.", baseline: "12%", target: "34%", frequency: "Monthly" },
            { category: "Reactivation", metric: "Dormant Customer Reactivation", definition: "Percentage of lapsed customers (>120 days inactive) brought back through targeted lifecycle flows.", baseline: "3.2%", target: "11.5%", frequency: "Monthly" },
            { category: "Revenue Efficiency", metric: "Owned-Media Revenue Share", definition: "Percentage of total gross revenue generated from automated email, SMS, and loyalty programs.", baseline: "14%", target: "38%", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2C Value Discovery", code: "B2C-3", path: "/offerings/b2c/value-discovery", desc: "Build subscription and refill bundle offers that increase repeat purchase frequency." },
            { name: "B2C Channel Discovery", code: "B2C-4", path: "/offerings/b2c/channel-discovery", desc: "Optimize acquisition channels based on 90-day customer retention quality." }
        ]
    },

    "b2c-product-market-fit-discovery": {
        id: "b2c-product-market-fit-discovery",
        code: "B2C-7",
        eyebrow: "CONSUMER ADOPTION, SATISFACTION & LOYALTY",
        primaryCtaText: "Validate Product Experience",
        secondaryCtaText: "Talk to an Expert",
        strategyLayoutType: "pmf",
        layer01Opportunity: {
            headline: "LAYER 01 — PRODUCT EXPERIENCE & ADOPTION",
            copy: "Understand whether consumers value a product, identify obstacles to adoption and improve the experiences that influence satisfaction, repeat usage and referrals.",
            badge: "Product Adoption Lab",
            metric: "-48% Return & Cancellation Rate",
            subtext: "Eliminate onboarding friction and unboxing barriers to drive organic word-of-mouth advocacy."
        },
        spin: {
            situation: "Consumer product teams monitor aggregate top-line revenue, return rates and general customer service ticket volume.",
            problem: "Aggregate sales numbers conceal unboxing confusion, poor initial product experiences, usability friction and high early churn.",
            implication: "Products experience high initial ad-driven trial followed by severe customer churn, negative social reviews and suppressed repeat purchases.",
            needPayoff: "Combine post-purchase onboarding research, unboxing feedback analysis, product return reason tracking and cohort satisfaction scoring."
        },
        appliedFrameworks: [
            { name: "Discovery-to-First-Use Funnel Analysis", description: "Mapping friction points between product package delivery and successful first consumer usage." },
            { name: "Unboxing & First-Mile Experience Audits", description: "Evaluating packaging clarity, quick-start guides, and digital setup workflows to prevent user frustration." },
            { name: "Return & Cancellation Root-Cause Analysis", description: "Categorizing returns into sizing, product defect, unmet expectation, or buyer remorse clusters." },
            { name: "Customer Satisfaction (CSAT) & Net Promoter Score", description: "Surveying customer sentiment immediately post-delivery and again at 30 days of active usage." },
            { name: "Product Improvement Roadmap Prioritisation", description: "Ranking physical and digital product enhancements by their projected impact on repurchase retention." },
            { name: "Referral & Organic Word-of-Mouth Engine", description: "Designing post-satisfaction referral prompts that encourage delighted consumers to invite friends." }
        ],
        profitPoolCapturePoints: [
            "Identify and remove unboxing friction that causes first-time customers to abandon or return products.",
            "Reduce avoidable product return and refund rates through clearer onboarding guidance.",
            "Transform satisfied first-time buyers into active brand advocates who drive low-CAC referrals.",
            "Prioritise product formulation, packaging, and digital improvements using verified customer feedback."
        ],
        performanceMetrics: [
            { category: "Adoption", metric: "Activation / First-Use Rate", definition: "Percentage of purchasers who successfully complete initial product setup or unboxing workflow.", baseline: "58%", target: "89%", frequency: "Monthly" },
            { category: "Satisfaction", metric: "30-Day Customer Satisfaction (CSAT)", definition: "Percentage of customers rating product quality 4 or 5 stars out of 5 at 30 days post-delivery.", baseline: "72%", target: "94%", frequency: "Monthly" },
            { category: "Quality", metric: "Product Return & Refund Rate", definition: "Percentage of fulfilled orders returned by customers for refund or replacement.", baseline: "14.2%", target: "4.8%", frequency: "Weekly" },
            { category: "Advocacy", metric: "Net Promoter Score (NPS)", definition: "Measure of consumer willingness to recommend the product to friends and family.", baseline: "+24 NPS", target: "+68 NPS", frequency: "Quarterly" },
            { category: "Organic Growth", metric: "Customer Referral Rate", definition: "Percentage of new orders originating from customer referral links and word-of-mouth codes.", baseline: "3.5%", target: "16.0%", frequency: "Monthly" },
            { category: "Long-Term Value", metric: "Second-Purchase Velocity", definition: "Median days elapsed between first order delivery and second order placement.", baseline: "84 days", target: "38 days", frequency: "Monthly" }
        ],
        relatedOfferings: [
            { name: "B2C Customer Discovery", code: "B2C-6", path: "/offerings/b2c/customer-discovery", desc: "Track long-term retention curves across satisfied customer cohorts." },
            { name: "B2C Value Discovery", code: "B2C-3", path: "/offerings/b2c/value-discovery", desc: "Leverage high customer satisfaction ratings to test premium pricing and subscriptions." }
        ]
    }
};
