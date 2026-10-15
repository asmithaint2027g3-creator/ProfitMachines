// offeringsIntelligenceData.ts — Comprehensive intelligence data for all 14 ProfitMachines core offerings
// Covers 7 B2B & 7 B2C offerings with dedicated statistical cards, ICP profiles, qualification criteria, and tab frameworks.

export interface StatCardItem {
    label: string;
    value: string;
    subtitle: string;
    description: string;
    methodology: string;
    badge?: string;
    icon: string; // Lucide icon name
}

export interface ICPProfile {
    name: string;
    category: string; // e.g. "Core Target", "Expansion Target", "Secondary"
    industryOrContext: string;
    scaleOrProfile: string; // ARR, Company Size, or Household Profile
    buyerCommitteeOrRoles: string[];
    painPoints: string[];
    buyingTriggers: string[];
    desiredOutcomes: string[];
    budgetConsiderations: string;
    qualificationCriteria: string[];
    disqualifyingConditions?: string[];
    recommendedApproach: string;
}

export interface OfferingDetailContent {
    id: string;
    code: string; // e.g. "B2B-1", "B2C-1"
    type: 'b2b' | 'b2c';
    title: string;
    heroHeadline: string;
    heroDescription: string;
    businessProblem: string;
    whatItAchieves: string[];
    keyCapabilities: { title: string; desc: string }[];
    statCards: StatCardItem[];
    icpProfiles: ICPProfile[];
    interactiveTabs: {
        id: string;
        label: string;
        title: string;
        summary: string;
        details: { heading: string; text: string }[];
    }[];
    executionMethodology: {
        stage: string;
        title: string;
        action: string;
        deliverable: string;
    }[];
    kpiMeasurement: {
        metric: string;
        definition: string;
        whyItMatters: string;
        cadence: string;
    }[];
    faqs: { question: string; answer: string }[];
}

export const offeringsIntelligence: Record<string, OfferingDetailContent> = {
    // ══════════════════════════════════════════════════════════════════════
    // B2B OFFERINGS (1 to 7)
    // ══════════════════════════════════════════════════════════════════════

    "b2b-market-discovery": {
        id: "b2b-market-discovery",
        code: "B2B-1",
        type: "b2b",
        title: "B2B Market Discovery",
        heroHeadline: "Quantify Enterprise TAM. Map High-Growth Profit Pools.",
        heroDescription: "Identify unmapped enterprise market opportunities, establish evidence-based TAM/SAM/SOM boundaries, and prioritize accounts by willingness to pay and market readiness before committing capital.",
        businessProblem: "Enterprises rely on static annual industry reports and internal assumptions that fail to reflect fast-shifting buyer pain, causing sales teams to allocate heavy quota to saturated, low-margin segments while high-growth micro-verticals remain unserved.",
        whatItAchieves: [
            "Bottom-up addressable market validation using live purchasing triggers",
            "Granular segmentation of accounts into high, medium, and low revenue potential",
            "Elimination of capital allocation to stagnant or margin-eroding accounts",
            "12-18 month lead time over competitors in unserved enterprise profit pools"
        ],
        keyCapabilities: [
            { title: "Dynamic TAM/SAM/SOM Modeling", desc: "Build algorithmic market bounds filtered by regulatory fit, tech stack readiness, and account scale." },
            { title: "Enterprise Account Identification", desc: "Isolate verified legal entities fitting defined revenue, employee count, and geographic criteria." },
            { title: "Market-Entry Timing Matrix", desc: "Score market windows based on compliance deadlines and vendor replacement cycles." }
        ],
        statCards: [
            {
                label: "Total Addressable Market (TAM)",
                value: "$14.2B",
                subtitle: "Modeled Global Enterprise Spend",
                description: "Bottom-up sizing of global enterprises across target sectors requiring automated intelligence infrastructure.",
                methodology: "Calculated via verified entity registries, median contract sizes ($120K ARR), and qualified headcount thresholds.",
                badge: "Illustrative Model",
                icon: "Search"
            },
            {
                label: "Serviceable Market (SAM)",
                value: "$3.8B",
                subtitle: "Directly Reachable Geography & Scale",
                description: "Accounts in North America & Western Europe possessing cloud maturity and designated sales operations teams.",
                methodology: "Derived by applying firmographic and technical readiness filters to global TAM boundaries.",
                badge: "Filtered Segment",
                icon: "Target"
            },
            {
                label: "Target Account Universe",
                value: "8,450",
                subtitle: "Verified Tier-1 & Tier-2 Entities",
                description: "Fully enriched corporate accounts satisfying initial revenue ($20M-$500M) and employee criteria.",
                methodology: "Entity resolution across corporate filings, firmographic registries, and domain verification.",
                badge: "Target Universe",
                icon: "Building2"
            },
            {
                label: "ICP Fit Density",
                value: "74.6%",
                subtitle: "High-Propensity Profile Match",
                description: "Proportion of mapped accounts presenting 3 or more verified urgency triggers in the past 60 days.",
                methodology: "Scored using multi-factor fit weighting (revenue scale, legacy stack churn, leadership change).",
                badge: "Readiness Index",
                icon: "Users"
            },
            {
                label: "Revenue Opportunity Index",
                value: "$280K",
                subtitle: "Average Projected ACV Potential",
                description: "Modeled annualized revenue potential per qualified enterprise account across software & advisory.",
                methodology: "Synthesized from comparative contract disclosures and economic value estimation (EVE).",
                badge: "Economic Model",
                icon: "DollarSign"
            },
            {
                label: "Market-Entry Readiness",
                value: "Stage 4 / 5",
                subtitle: "High Execution Viability",
                description: "Confirms validated buying demand, accessible distribution channels, and clear regulatory clearance.",
                methodology: "Readiness audited across product capability, legal contracting, and sales team alignment.",
                badge: "Readiness Status",
                icon: "BarChart3"
            }
        ],
        icpProfiles: [
            {
                name: "Mid-Market Growth Enterprise",
                category: "Primary ICP",
                industryOrContext: "B2B SaaS, IT Services, FinTech",
                scaleOrProfile: "$25M - $100M ARR · 150-800 Employees",
                buyerCommitteeOrRoles: ["Chief Revenue Officer (CRO)", "VP of Sales", "Head of RevOps", "CFO"],
                painPoints: [
                    "Static TAM models lead to wasted SDR outreach and bloated CAC",
                    "Sales teams miss accounts undergoing executive transitions",
                    "Board demands credible expansion into 2 new vertical markets"
                ],
                buyingTriggers: ["New CRO onboarded", "Series C funding closed", "Sales cycle elongated beyond 90 days"],
                desiredOutcomes: ["35% reduction in CAC", "Clear 18-month expansion roadmap", "Verified target account list of 1,200 entities"],
                budgetConsiderations: "Pre-allocated growth and strategic advisory budget; requires clear ROI justification within 6 months.",
                qualificationCriteria: ["Minimum 20 quota-carrying reps", "Existing CRM infrastructure", "Target ACV > $30K"],
                disqualifyingConditions: ["Total addressable market under 500 accounts", "No dedicated sales leadership"],
                recommendedApproach: "Execute 60-day Market Discovery sprint mapping 1,500 priority target accounts."
            },
            {
                name: "Enterprise Industrial & Logistics",
                category: "Secondary Expansion ICP",
                industryOrContext: "Manufacturing, Supply Chain, Logistics Tech",
                scaleOrProfile: "$100M - $1B Revenue · 1,000+ Employees",
                buyerCommitteeOrRoles: ["VP Strategy", "Chief Commercial Officer", "Procurement Director"],
                painPoints: [
                    "Legacy sales models rely on trade relationships rather than data",
                    "New digital entrants displacing high-margin service contracts",
                    "Lack of bottom-up intelligence on regional distributor performance"
                ],
                buyingTriggers: ["Competitive contract loss", "Board mandate for modernization", "Regional margin decline"],
                desiredOutcomes: ["Bottom-up sizing of unmapped regional buyers", "Identification of $50M+ white space"],
                budgetConsiderations: "Formal enterprise procurement cycle; requires multi-stakeholder business case.",
                qualificationCriteria: ["Annual revenue > $100M", "Complex multi-region distribution"],
                recommendedApproach: "Provide structured TAM/SAM sizing alongside customer interview evidence."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Market Discovery Architecture",
                summary: "A rigorous, data-backed approach to identifying unserved revenue pools before competitors.",
                details: [
                    { heading: "Objective", text: "Transform static market assumptions into a dynamic, quantitative map of actionable accounts." },
                    { heading: "Core Mechanism", text: "Integrate firmographic registries, technographic signals, and executive hiring indicators into a rolling addressable market database." },
                    { heading: "Strategic Deliverable", text: "Executive Market Sizing Dossier including TAM/SAM/SOM breakdowns and prioritized account tiers." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Market Opportunity",
                title: "TAM, SAM & SOM Quantification",
                summary: "Bottom-up sizing that withstands board and executive due diligence.",
                details: [
                    { heading: "Total Addressable Market", text: "Evaluates the total theoretical spend for your core solution across all potential business entities." },
                    { heading: "Serviceable Addressable Market", text: "Filters TAM by geography, language, regulatory compliance, and technographic prerequisites." },
                    { heading: "Serviceable Obtainable Market", text: "Realistic share capture modeled against current sales capacity and competitive density over 24 months." }
                ]
            },
            {
                id: "demand-validation",
                label: "Demand Validation",
                title: "Pre-Entry Demand Verification",
                summary: "Confirm commercial urgency before deploying capital or building dedicated sales capacity.",
                details: [
                    { heading: "Buying Signal Triangulation", text: "We cross-reference hiring trends, RFP mentions, and vendor displacement chatter." },
                    { heading: "Account Readiness Tiering", text: "Accounts scored into Tier 1 (Immediate Intent), Tier 2 (Nurture Intent), and Tier 3 (Long-term)." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Customer Segments & ICP",
                title: "Segment Prioritization & Scoring",
                summary: "Define firmographic, technographic, and behavioral criteria that dictate account win rates.",
                details: [
                    { heading: "Scoring Model", text: "Weighted evaluation based on revenue size (25%), tech maturity (25%), urgency triggers (25%), and budget signals (25%)." },
                    { heading: "Persona Mapping", text: "Define the exact 4-6 decision-makers required to sign six-figure enterprise contracts." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Economic Impact Modeling",
                summary: "Projected return on capital invested in new market entry.",
                details: [
                    { heading: "LTV:CAC Projection", text: "Targeting a minimum 4.5:1 ratio within the selected target segments." },
                    { heading: "Payback Period", text: "Average customer acquisition cost recovered within 7-9 months from contract execution." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Execution Roadmap",
                summary: "Transitioning market intelligence directly into outbound pipeline velocity.",
                details: [
                    { heading: "Phase 1: Territory Allocation", text: "Equitably distribute Tier-1 accounts across enterprise account executives." },
                    { heading: "Phase 2: Signal Playbooks", text: "Trigger outbound cadences when monitored accounts exhibit specific buying actions." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Market Scope & Hypotheses", action: "Define geography, industry parameters, and target contract size.", deliverable: "Market Scoping Charter" },
            { stage: "Stage 2", title: "Bottom-Up Data Ingestion", action: "Harvest entity data, corporate filings, and technographic footprints.", deliverable: "Raw Account Database (5K-20K Entities)" },
            { stage: "Stage 3", title: "TAM/SAM/SOM Modeling", action: "Apply algorithmic filters and historical contract pricing models.", deliverable: "Quantitative Sizing Model" },
            { stage: "Stage 4", title: "ICP Scoring & Tiering", action: "Rank accounts by readiness, urgency, and revenue upside.", deliverable: "Scored Enterprise Account Universe" },
            { stage: "Stage 5", title: "Strategic Roadmap", action: "Synthesize findings into executive presentation and CRM account import.", deliverable: "Market Discovery Dossier & CRM List" }
        ],
        kpiMeasurement: [
            { metric: "TAM Precision", definition: "Variance between bottom-up model and verified customer accounts.", whyItMatters: "Prevents over-investing in phantom market segments.", cadence: "Quarterly" },
            { metric: "Tier-1 Conversion Rate", definition: "Percentage of Tier-1 accounts converted into active sales opportunities.", whyItMatters: "Validates ICP scoring criteria accuracy.", cadence: "Monthly" },
            { metric: "Average Sales Velocity", definition: "Deal pipeline value divided by average cycle length.", whyItMatters: "Measures commercial acceleration from market fit.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "How does this differ from buying a database list from ZoomInfo or Apollo?", answer: "A contact database provides static contact information without verifying whether a profitable addressable market exists, what the accounts are willing to pay, or whether your solution has distinct economic advantages in that vertical. We build custom TAM/SAM/SOM models and score readiness." },
            { question: "What sample size of accounts is evaluated?", answer: "Depending on target vertical scope, we analyze 2,000 to 25,000 enterprise entities, filtering down to the top 10-15% with verified buying triggers." }
        ]
    },

    "b2b-demand-discovery": {
        id: "b2b-demand-discovery",
        code: "B2B-2",
        type: "b2b",
        title: "B2B Demand Discovery",
        heroHeadline: "Sense Latent Enterprise Demand. Validate Active Buying Triggers.",
        heroDescription: "Uncover unarticulated enterprise problems, track shadow IT usage, detect pre-RFP buying signals, and engage purchasing committees 6 to 9 months before competitors know an opportunity exists.",
        businessProblem: "Over 67% of enterprise tech demand is latent. Sales teams relying solely on incoming web forms and public RFPs engage when buyers have already formed vendor preferences, leading to protracted bidding wars and depressed win rates.",
        whatItAchieves: [
            "Capture intent signals from buying committees before RFPs are drafted",
            "Identify latent operational bottlenecks inside target enterprise accounts",
            "Compress sales cycles by 40-50% through early relationship architecture",
            "Increase proposal-to-close conversion rates from industry averages to 45%+"
        ],
        keyCapabilities: [
            { title: "Shadow Demand Ingestion", desc: "Monitor employee queries, open-source adoption, and hiring posts indicating internal operational friction." },
            { title: "Pre-RFP Signal Triangulation", desc: "Correlate vendor search spikes, regulatory deadlines, and executive reorganization." },
            { title: "Buying Trigger Playbooks", desc: "Equip sales reps with specific value hypotheses mapped to exact operational triggers." }
        ],
        statCards: [
            {
                label: "Validated Customer Problems",
                value: "14 Core Pains",
                subtitle: "Categorized Across Enterprise Ops",
                description: "Specific business frictions validated through structured stakeholder interviews and operational audits.",
                methodology: "Identified via Voice-of-Customer mining, support ticket themes, and RFP requirement analysis.",
                badge: "Validated Problems",
                icon: "CheckCircle2"
            },
            {
                label: "Intent Signals Captured",
                value: "12,400 / mo",
                subtitle: "Pre-RFP Account Intent Triggers",
                description: "Digital footprints, research activity, and tech evaluation patterns captured across target accounts.",
                methodology: "Ingested from IP resolution, developer forum inquiries, and job description changes.",
                badge: "Signal Volume",
                icon: "Target"
            },
            {
                label: "Buying Triggers Identified",
                value: "8 Major Triggers",
                subtitle: "Predictive of Near-Term RFP Issuance",
                description: "Specific corporate inflection points that reliably trigger solution evaluation within 90 days.",
                methodology: "Historical correlation analysis between closed-won deals and upstream organizational events.",
                badge: "Trigger Mapping",
                icon: "Zap"
            },
            {
                label: "Lead-to-Opportunity Rate",
                value: "32.4%",
                subtitle: "Qualified Signal Conversion",
                description: "Percentage of signal-triggered accounts that progress to active executive discovery meetings.",
                methodology: "Tracked across outbound signal-led campaigns versus industry benchmark of 8-12%.",
                badge: "Conversion Rate",
                icon: "TrendingUp"
            },
            {
                label: "Cost Per Qualified Lead (CPQL)",
                value: "$420",
                subtitle: "Signal-Sourced Enterprise Lead",
                description: "Full attribution cost to source a verified multi-stakeholder enterprise discovery call.",
                methodology: "Total signal infrastructure and SDR allocation divided by completed discovery sessions.",
                badge: "Efficiency Metric",
                icon: "DollarSign"
            },
            {
                label: "Demand Validation Confidence",
                value: "High (88/100)",
                subtitle: "Statistically Robust Evidence",
                description: "Confidence index measuring recurring commercial pain and willingness to commit budget.",
                methodology: "Calculated across 25+ verified buyer interviews and confirmed budget line items.",
                badge: "Confidence Score",
                icon: "ShieldCheck"
            }
        ],
        icpProfiles: [
            {
                name: "High-Growth FinTech / SaaS Operator",
                category: "Primary Target",
                industryOrContext: "Financial Technology, Payments, Cloud Security",
                scaleOrProfile: "$30M - $150M ARR · Fast Scaling",
                buyerCommitteeOrRoles: ["Chief Technology Officer (CTO)", "VP Engineering", "Head of Compliance", "CRO"],
                painPoints: [
                    "Security compliance bottlenecks slowing customer onboarding",
                    "Engineering teams deploying ad-hoc shadow tools without central governance",
                    "Legacy monitoring tools alerting after revenue-impacting downtime occurs"
                ],
                buyingTriggers: ["Audit finding citation", "Launch of enterprise tier", "SOC 2 Type II renewal"],
                desiredOutcomes: ["Zero compliance audit findings", "50% faster enterprise client onboarding", "Unified observability"],
                budgetConsiderations: "Pre-allocated security & compliance spend; rapid 30-day procurement for critical tooling.",
                qualificationCriteria: ["Processing > $100M transaction volume", "Cloud-native infrastructure", "Dedicated security lead"],
                recommendedApproach: "Initiate contact with technical brief addressing the specific compliance audit trigger."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Demand Discovery Architecture",
                summary: "Sensing enterprise buyer needs months before public procurement.",
                details: [
                    { heading: "Concept", text: "Most high-value software purchases solve problems that have been simmering for 6-12 months before an RFP is issued." },
                    { heading: "Action", text: "Map the digital exhaust of enterprise teams experiencing that simmering pain." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Opportunity",
                title: "Latent Pipeline Quantification",
                summary: "Calculate how much enterprise pipeline is currently hidden from your sales radar.",
                details: [
                    { heading: "Unarticulated Demand", text: "Typically 3x larger than the pool of accounts actively searching on Google or filling out lead forms." }
                ]
            },
            {
                id: "demand-validation",
                label: "Demand Validation",
                title: "Rigorous Voice of Customer Validation",
                summary: "Conduct structured stakeholder interviews to confirm pain severity.",
                details: [
                    { heading: "Interview Sample Target", text: "20 to 30 enterprise discovery interviews across target buyer personas to validate problem recurrence." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Intent-Ranked Segments",
                summary: "Segment accounts by active buying urgency rather than simple revenue size.",
                details: [
                    { heading: "Dynamic Tiers", text: "Accounts shift from Tier 3 to Tier 1 automatically when buying signals trigger." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Pipeline Velocity Multipliers",
                summary: "Shorter cycles and higher win rates translate directly to lower CAC.",
                details: [
                    { heading: "Cycle Compression", text: "Average enterprise sales cycle reduced from 9 months to 4.5 months." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Pre-RFP Outreach Cadence",
                summary: "Educational, advisory outreach that positions your team as trusted problem solvers.",
                details: [
                    { heading: "Executive Briefing Playbook", text: "Offer curated market benchmark reports rather than standard sales pitches." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Pain Hypothesis Definition", action: "Identify top 5 latent enterprise bottlenecks.", deliverable: "Pain Hypothesis Canvas" },
            { stage: "Stage 2", title: "Intent Signal Infrastructure", action: "Deploy web and IP signal monitors across target accounts.", deliverable: "Live Signal Monitor Dashboard" },
            { stage: "Stage 3", title: "Customer Interviews", action: "Conduct 20-30 non-sales exploratory interviews with target buyers.", deliverable: "VoC Synthesis Report" },
            { stage: "Stage 4", title: "Buying Trigger Playbook", action: "Document top buying triggers and specific response cadences.", deliverable: "Sales Trigger Playbook" },
            { stage: "Stage 5", title: "Campaign Activation", action: "Launch signal-triggered outreach to validated account pool.", deliverable: "Active Pipeline Generation" }
        ],
        kpiMeasurement: [
            { metric: "Pre-RFP Sourced Pipeline", definition: "Value of pipeline engaged prior to formal competitor RFP.", whyItMatters: "Deals closed with 2x higher win rates.", cadence: "Monthly" },
            { metric: "Signal Accuracy Rate", definition: "Percentage of flagged intent signals confirmed accurate upon contact.", whyItMatters: "Ensures SDR team focus on viable accounts.", cadence: "Bi-weekly" }
        ],
        faqs: [
            { question: "How do you uncover demand if the customer hasn't issued an RFP?", answer: "We analyze indirect indicators: hiring sprees for specific skills, regulatory mandates affecting their industry, public software tool complaints, and cloud architecture changes." },
            { question: "Is this compliance-friendly?", answer: "Yes. All signals are collected from publicly observable firmographic, technographic, and aggregated business telemetry with zero privacy infringement." }
        ]
    },

    "b2b-value-discovery": {
        id: "b2b-value-discovery",
        code: "B2B-3",
        type: "b2b",
        title: "B2B Value Discovery",
        heroHeadline: "Quantify Customer Economic Value. Prove ROI Before Procurement.",
        heroDescription: "Translate soft qualitative benefits into defensible P&L dollar metrics. Model customer-specific ROI, establish clear willingness to pay, and eliminate pilot purgatory with procurement-ready business cases.",
        businessProblem: "Over 60% of enterprise software deals stall at the CFO or procurement desk because vendors offer generic ROI calculators and soft claims ('improved collaboration', 'enhanced agility') that fail to tie directly to customer revenue, COGS, or risk mitigation.",
        whatItAchieves: [
            "Defensible Economic Value Estimation (EVE) modeled to customer actuals",
            "Elimination of pilot purgatory with clear 90-day proof-of-value criteria",
            "Pricing power defense: preserve 80%+ gross margins against discount demands",
            "Procurement fast-track with executive-level financial documentation"
        ],
        keyCapabilities: [
            { title: "Economic Value Estimation (EVE)", desc: "Quantify exact cost reduction, revenue acceleration, and risk avoidance per customer workflow." },
            { title: "Willingness-to-Pay (WTP) Benchmarking", desc: "Test pricing elasticity and packaging tiers against alternative enterprise solutions." },
            { title: "CFO-Ready Business Cases", desc: "Provide automated financial models complete with NPV, IRR, and payback timelines." }
        ],
        statCards: [
            {
                label: "Perceived Value Index",
                value: "8.9 / 10",
                subtitle: "Strategic Enterprise Priority",
                description: "Customer rating of how critical the offering is to achieving core quarterly executive goals.",
                methodology: "Measured via structured buyer interviews and executive scorecards across 30 enterprise leaders.",
                badge: "Customer Survey",
                icon: "Sparkles"
            },
            {
                label: "Value Proposition Differentiation",
                value: "+38% Edge",
                subtitle: "Against Primary Market Alternate",
                description: "Quantified economic advantage delivered over legacy solutions or internal DIY tooling.",
                methodology: "Calculated through head-to-head operational benchmark testing and time-to-value metrics.",
                badge: "Competitive Edge",
                icon: "ShieldCheck"
            },
            {
                label: "Willingness to Pay (WTP)",
                value: "$85K–$220K",
                subtitle: "Validated Annual Price Range",
                description: "Customer budget threshold before encountering resistance, validated across 3 customer tiers.",
                methodology: "Evaluated using Van Westendorp Price Sensitivity testing adapted for enterprise B2B contracts.",
                badge: "Pricing Range",
                icon: "DollarSign"
            },
            {
                label: "Core Value Drivers",
                value: "4 Drivers",
                subtitle: "Hard P&L Line-Item Benefits",
                description: "Labor cost reduction, accelerated deal closure, cloud compute reduction, and audit risk mitigation.",
                methodology: "Mapped directly to customer general ledger accounts and EBITDA contribution.",
                badge: "P&L Drivers",
                icon: "TrendingUp"
            },
            {
                label: "Target Gross Margin",
                value: "82.4%",
                subtitle: "Sustained Margin Realization",
                description: "Contribution margin achieved when pricing to value rather than competing on commodity hours.",
                methodology: "Modeled against customer delivery costs, cloud infrastructure, and account support allocation.",
                badge: "Margin Impact",
                icon: "BarChart3"
            },
            {
                label: "Offer Validation Status",
                value: "Validated",
                subtitle: "Commercial Viability Confirmed",
                description: "Formal validation achieved through signed letters of intent (LOI) and paid pilot commitments.",
                methodology: "Requires minimum 5 enterprise customers confirming willingness to procure at target price.",
                badge: "Commercial Status",
                icon: "CheckCircle2"
            }
        ],
        icpProfiles: [
            {
                name: "Mid-Market CFO / Operations Committee",
                category: "Procurement Approver",
                industryOrContext: "Financial Services, HealthTech, Enterprise Logistics",
                scaleOrProfile: "$50M - $250M Revenue",
                buyerCommitteeOrRoles: ["Chief Financial Officer (CFO)", "Director of Procurement", "VP RevOps"],
                painPoints: [
                    "Skeptical of vendor promises of 'AI productivity' without proof",
                    "Requires payback period under 12 months for any discretionary spend",
                    "Burdened by overlapping SaaS subscriptions that go underutilized"
                ],
                buyingTriggers: ["Annual budget review", "Cost consolidation mandate", "Vendor contract renewal deadline"],
                desiredOutcomes: ["Guaranteed payback within 9 months", "3x measurable ROI", "Transparent contract terms"],
                budgetConsiderations: "Rigorous vendor scorecard; needs audited references and clear deliverable timeline.",
                qualificationCriteria: ["Formal procurement approval gate", "Active software spend > $2M/year"],
                recommendedApproach: "Present 1-page CFO Economic Value dossier alongside standard sales proposal."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Value Discovery Framework",
                summary: "Transforming ambiguous technological capability into unassailable financial proof.",
                details: [
                    { heading: "The Problem", text: "Deals don't die to competitors; they die to 'no decision' because the business case wasn't urgent enough for the CFO." },
                    { heading: "The Solution", text: "Tie every software feature to a specific balance sheet or income statement line item." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Economic Model",
                title: "EVE (Economic Value Estimation)",
                summary: "Structuring customer value into Reference Value and Differentiation Value.",
                details: [
                    { heading: "Reference Value", text: "The cost of the closest competitor or internal alternative." },
                    { heading: "Differentiation Value", text: "The net positive value created by your unique features minus switching costs." }
                ]
            },
            {
                id: "demand-validation",
                label: "WTP Validation",
                title: "Willingness to Pay Testing",
                summary: "Determine where price maximizes total revenue and gross margin.",
                details: [
                    { heading: "Methodology", text: "Conjoint analysis and price elasticity interviews with former buyers and active prospects." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Value by Customer Segment",
                summary: "Customizing ROI models because value drivers differ between scale-ups and global enterprises.",
                details: [
                    { heading: "Scale-ups", text: "Value driven by speed to market and headcount avoidance." },
                    { heading: "Enterprises", text: "Value driven by risk mitigation, governance, and operating margin points." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Procurement Approval Rates",
                summary: "Lift procurement pass-through from 40% to 85%+.",
                details: [
                    { heading: "POC Conversion", text: "Pre-agreed quantitative success criteria turn pilots into contractual closes." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "GTM Alignment",
                title: "Sales Rep Enablement",
                summary: "Equip Account Executives with interactive financial calculators for live discovery calls.",
                details: [
                    { heading: "Interactive ROI Tool", text: "Reps input customer numbers live to calculate annualized savings in real time." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Value Driver Mapping", action: "Identify top 4 financial levers affected by your offering.", deliverable: "Value Architecture Map" },
            { stage: "Stage 2", title: "Customer Economic Interviews", action: "Interview 15 target finance & operations leaders.", deliverable: "Willingness-to-Pay Synthesis" },
            { stage: "Stage 3", title: "EVE Model Construction", action: "Build tailored financial models with customizable customer inputs.", deliverable: "Dynamic Enterprise ROI Calculator" },
            { stage: "Stage 4", title: "Packaging & Pricing Matrix", action: "Design multi-tier pricing that captures consumer surplus.", deliverable: "Commercial Pricing Framework" },
            { stage: "Stage 5", title: "Procurement Battlecard", action: "Create collateral specifically answering CFO and legal objections.", deliverable: "CFO Approval Dossier" }
        ],
        kpiMeasurement: [
            { metric: "POC Conversion Rate", definition: "Percentage of proof-of-concept trials that convert to paid contracts.", whyItMatters: "Eliminates unpaid exploratory engagements.", cadence: "Quarterly" },
            { metric: "Average Contract Value (ACV)", definition: "Mean annual recurring revenue across closed enterprise deals.", whyItMatters: "Demonstrates pricing power and value capture.", cadence: "Quarterly" }
        ],
        faqs: [
            { question: "Can we use an online generic ROI calculator instead?", answer: "Generic calculators damage enterprise credibility. CFOs immediately discount them as marketing fluff. Our EVE models use customer-specific cost structures and conservative assumptions." },
            { question: "What if our product is new and lacks historical customer data?", answer: "We leverage comparable operational benchmarks, pilot telemetry, and proxy process costs to build a credible, defensible baseline." }
        ]
    },

    "b2b-channel-discovery": {
        id: "b2b-channel-discovery",
        code: "B2B-4",
        type: "b2b",
        title: "B2B Channel Discovery",
        heroHeadline: "Identify Profitable Distribution Paths. Diversify Enterprise Pipeline.",
        heroDescription: "Evaluate direct, co-sell, systems integrator, and marketplace distribution channels to identify where your enterprise accounts convert with the highest velocity, lowest CAC, and highest lifetime value.",
        businessProblem: "Over-reliance on outbound SDR cold calling or single-channel paid ads creates unsustainable customer acquisition costs and fragile pipeline. Enterprise businesses fail to evaluate ecosystem distribution, technology alliances, and value-added resellers.",
        whatItAchieves: [
            "Diversification of pipeline across 3+ profitable, repeatable acquisition channels",
            "Establishment of high-margin co-selling partnerships with cloud ecosystems",
            "Reduction of blended CAC by 40-60% through partner-leveraged pipeline",
            "Acceleration of enterprise deal velocity via pre-trusted integrator channels"
        ],
        keyCapabilities: [
            { title: "Channel Unit Economics Modeling", desc: "Audit CAC, conversion rate, sales cycle length, and margin contribution across all distribution avenues." },
            { title: "Ecosystem Partner Mapping", desc: "Identify cloud hyperscalers, systems integrators, and software platforms already embedded in your ICP accounts." },
            { title: "Co-Sell Program Design", desc: "Build joint go-to-market playbooks, incentive structures, and revenue sharing frameworks." }
        ],
        statCards: [
            {
                label: "Opportunities by Channel",
                value: "3 Active Paths",
                subtitle: "Direct, SI Partners, Cloud Marketplace",
                description: "Distribution channels producing statistically verified enterprise sales opportunities monthly.",
                methodology: "Audited across last 12 months of CRM deal origination and partner portal telemetry.",
                badge: "Active Channels",
                icon: "Network"
            },
            {
                label: "Channel Conversion Rate",
                value: "28.5%",
                subtitle: "Co-Sell & Partner Inflow",
                description: "Lead-to-close win rate on co-sell and partner-referred deals versus 14% on cold outbound.",
                methodology: "Tracked across closed enterprise deals categorized by primary lead source channel.",
                badge: "Win Rate",
                icon: "TrendingUp"
            },
            {
                label: "Customer Acquisition Cost",
                value: "$18,500",
                subtitle: "Partner Channel Blended CAC",
                description: "Fully loaded cost to acquire an enterprise contract via certified distribution partners.",
                methodology: "All channel partner management, enablement, and commission costs divided by acquired accounts.",
                badge: "Acquisition Cost",
                icon: "DollarSign"
            },
            {
                label: "Channel Contribution Margin",
                value: "71.2%",
                subtitle: "Net Revenue After Rev-Share",
                description: "Gross margin retained after accounting for distributor margins and co-sell partner splits.",
                methodology: "Calculated as contract revenue minus partner commissions and dedicated delivery support.",
                badge: "Margin Quality",
                icon: "BarChart3"
            },
            {
                label: "Sales Cycle by Channel",
                value: "72 Days",
                subtitle: "Co-Sell Partner Deals",
                description: "Average days from first meeting to contract signature, down from 145 days on cold outbound.",
                methodology: "Measured from CRM deal creation timestamp to closed-won milestone across channel types.",
                badge: "Cycle Length",
                icon: "Clock"
            },
            {
                label: "Channel ROI Multiplier",
                value: "4.8x",
                subtitle: "Return on Channel Investment",
                description: "Net revenue generated per dollar invested in partner enablement and co-sell initiatives.",
                methodology: "Total channel-originated gross margin divided by dedicated channel program expenditures.",
                badge: "ROI Multiple",
                icon: "Target"
            }
        ],
        icpProfiles: [
            {
                name: "Cloud Systems Integrator & Advisory Partner",
                category: "Primary Channel Partner",
                industryOrContext: "Global IT Services, Cloud Migration Consulting",
                scaleOrProfile: "$50M+ Revenue · 500+ Consultants",
                buyerCommitteeOrRoles: ["Alliance Director", "Practice Lead", "Principal Cloud Architect"],
                painPoints: [
                    "Clients asking for AI revenue tools that the SI does not build in-house",
                    "Needs software partners to increase consulting billing hours and project scope",
                    "Hesitant to recommend startups with unproven enterprise security"
                ],
                buyingTriggers: ["Major enterprise client RFP", "Quarterly partner quota review", "Cloud partner tier upgrade"],
                desiredOutcomes: ["$3-$5 in services revenue per $1 of software license sold", "Fast integration path"],
                budgetConsiderations: "Revenue share model (15-25% tier); requires zero upfront fee with co-marketing support.",
                qualificationCriteria: ["Established enterprise client base", "Gold/Premier tier with AWS or Microsoft"],
                recommendedApproach: "Provide turnkey co-selling enablement deck with joint client case studies."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Channel Distribution Architecture",
                summary: "Unlocking distribution scale through pre-existing enterprise trust networks.",
                details: [
                    { heading: "Strategy", text: "Instead of knocking on 5,000 enterprise doors one by one, partner with the 10 integrators already inside those accounts." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Channel Economics",
                title: "Comparative Channel Performance",
                summary: "Evaluating channels by CAC, velocity, and lifetime value.",
                details: [
                    { heading: "Direct Outbound", text: "Highest control, but scales linearly with sales headcount and costs." },
                    { heading: "Ecosystem Co-Selling", text: "Higher trust, shorter cycles, and leverages client enterprise commitments." }
                ]
            },
            {
                id: "demand-validation",
                label: "Partner Validation",
                title: "Partner Capacity & Interest Auditing",
                summary: "Testing partner willingness to recommend your software before signing formal alliance contracts.",
                details: [
                    { heading: "Proof of Co-Sell", text: "Close 3 joint pilot deals with a prospective partner before launching a broad program." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Channel-to-Segment Mapping",
                summary: "Matching the right channel to each customer tier.",
                details: [
                    { heading: "Mid-Market", text: "Best served through regional specialized consultancies and marketplaces." },
                    { heading: "Global Enterprise", text: "Requires Global Systems Integrators (GSIs) with existing Master Service Agreements." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Channel Unit Economics",
                summary: "Tracking the blended effect of direct and indirect distribution on corporate EBITDA.",
                details: [
                    { heading: "Target Metric", text: "Achieving 40%+ of annual ARR sourced through partner ecosystem." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Partner Enablement Engine",
                summary: "Providing the collateral, training, and deal-registration tooling partners need to win.",
                details: [
                    { heading: "Enablement Sprint", text: "Two-week training for partner architects to deliver proof-of-concepts." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Current Channel Audit", action: "Evaluate existing pipeline sources, CAC, and conversion times.", deliverable: "Channel Performance Diagnostic" },
            { stage: "Stage 2", title: "Ecosystem Partner Mapping", action: "Identify top 20 potential distribution partners embedded in target accounts.", deliverable: "Ecosystem Partner Matrix" },
            { stage: "Stage 3", title: "Partner Pilot Testing", action: "Execute co-sell test with 3 selected partners on live opportunities.", deliverable: "Partner Validation Report" },
            { stage: "Stage 4", title: "Commercial Alliance Program", action: "Draft tier structures, commission models, and partner portal assets.", deliverable: "Alliance Program Charter" },
            { stage: "Stage 5", title: "Scale & Co-Marketing", action: "Launch co-branded webinars, joint whitepapers, and cloud marketplace listings.", deliverable: "Active Co-Sell Channel Engine" }
        ],
        kpiMeasurement: [
            { metric: "Partner Sourced Pipeline", definition: "Dollar value of new pipeline introduced by channel partners.", whyItMatters: "Validates ecosystem partner traction.", cadence: "Monthly" },
            { metric: "Channel Sales Cycle", definition: "Days from opportunity creation to deal signature via partner.", whyItMatters: "Confirms trust acceleration from partner relationship.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "How do we prevent channel conflict with our direct sales team?", answer: "We implement clear deal registration rules and align sales rep compensation so reps earn full commission regardless of whether a deal closes direct or through an approved partner." },
            { question: "Are cloud marketplaces (AWS, Azure) worth the investment?", answer: "Yes, because enterprise buyers often have committed cloud spend budgets ('EDP' or 'MACC') that can be used to purchase third-party software with pre-approved procurement terms." }
        ]
    },

    "b2b-competitive-discovery": {
        id: "b2b-competitive-discovery",
        code: "B2B-5",
        type: "b2b",
        title: "B2B Competitive Discovery",
        heroHeadline: "Map Competitor Positioning. Exploit Asymmetric White Space.",
        heroDescription: "Conduct rigorous intelligence on direct and indirect competitors, dissect their pricing and packaging, detect customer dissatisfaction themes, and position your offering where competitors cannot easily follow.",
        businessProblem: "Most businesses rely on high-level marketing claims and competitor websites, failing to understand competitor contracting terms, implementation failure rates, and feature gaps. As a result, sales reps compete head-to-head on identical features rather than exploiting structural weaknesses.",
        whatItAchieves: [
            "Real-time competitive displacement intelligence across key target accounts",
            "Granular pricing, discounting, and packaging teardowns of rivals",
            "Win rate lift from 22% to 45%+ in competitive shootouts",
            "Identification of high-margin white spaces neglected by incumbent providers"
        ],
        keyCapabilities: [
            { title: "Competitor Vulnerability Auditing", desc: "Analyze customer review platforms, churn complaints, and executive departures for competitor vulnerabilities." },
            { title: "Win/Loss Evidence Mining", desc: "Conduct third-party post-mortems on lost and won deals to uncover actual buyer selection criteria." },
            { title: "Asymmetric Battlecard Engine", desc: "Equip sales reps with battlecards that reframe customer purchasing criteria to your strengths." }
        ],
        statCards: [
            {
                label: "Identified Competitors",
                value: "12 Analyzed",
                subtitle: "Direct, Indirect & Legacy Alternatives",
                description: "Competitor profiles mapped across architecture, pricing, customer reviews, and enterprise fit.",
                methodology: "Continuous monitoring of commercial registries, patent filings, and market intelligence databases.",
                badge: "Coverage Depth",
                icon: "ShieldCheck"
            },
            {
                label: "Competitive Positioning Fit",
                value: "High Differentiation",
                subtitle: "Autonomous vs Manual Framework",
                description: "Positions ProfitMachines as an autonomous intelligence platform versus manual analytics dashboards.",
                methodology: "Evaluated across 24 enterprise feature categories and delivery models.",
                badge: "Positioning Score",
                icon: "Target"
            },
            {
                label: "Price Parity Comparison",
                value: "22% Lower TCO",
                subtitle: "Over 3-Year Enterprise Horizon",
                description: "Total cost of ownership advantage achieved by eliminating third-party consulting add-ons.",
                methodology: "Calculated by comparing total license, implementation, and maintenance contract disclosures.",
                badge: "TCO Comparison",
                icon: "DollarSign"
            },
            {
                label: "Differentiation Opportunities",
                value: "5 White Spaces",
                subtitle: "Uncontested Enterprise Capabilities",
                description: "Specific customer operational requirements completely ignored by legacy market incumbents.",
                methodology: "Derived from systematic analysis of 450+ enterprise customer reviews and support complaints.",
                badge: "White Space",
                icon: "Sparkles"
            },
            {
                label: "Unmet Customer Pain Coverage",
                value: "84.2%",
                subtitle: "Addressing Critical Competitor Gaps",
                description: "Proportion of common competitor customer complaints directly solved by your core platform.",
                methodology: "Cross-referenced against verified G2, Gartner Peer Insights, and TrustRadius reviews.",
                badge: "Pain Coverage",
                icon: "Users"
            },
            {
                label: "Competitive Evidence Coverage",
                value: "Verified",
                subtitle: "Third-Party Audited Data",
                description: "Competitive claims backed by customer contract audits, public SEC disclosures, and direct testing.",
                methodology: "Strict verification standard: no unsubstantiated rumors or unverified claims used in battlecards.",
                badge: "Evidence Integrity",
                icon: "CheckCircle2"
            }
        ],
        icpProfiles: [
            {
                name: "Incumbent Displacer (Enterprise Accounts)",
                category: "Displacement Target",
                industryOrContext: "BFSI, Healthcare, B2B Tech",
                scaleOrProfile: "$50M - $500M Revenue",
                buyerCommitteeOrRoles: ["Chief Information Officer (CIO)", "VP Commercial Operations", "Head of Sales Ops"],
                painPoints: [
                    "Locked into 3-year contract with legacy incumbent that requires 6 months to deploy changes",
                    "Paying $200K+ annually for shelfware features reps do not adopt",
                    "Incumbent support tickets take 3 weeks with no resolution"
                ],
                buyingTriggers: ["90 days prior to contract auto-renewal", "Price hike notification from incumbent", "Major system outage"],
                desiredOutcomes: ["Seamless data migration in under 30 days", "Lower annual spend with higher adoption"],
                budgetConsiderations: "Budget already allocated to incumbent; requires buyout credits or phased transition.",
                qualificationCriteria: ["Currently using named legacy competitor", "Contract expiring within 6 months"],
                recommendedApproach: "Deliver Competitor Migration & ROI Comparison dossier highlighting adoption failures."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Competitive Intelligence Architecture",
                summary: "Winning deals before the RFP is drafted by reshaping buyer requirements.",
                details: [
                    { heading: "Core Concept", text: "Don't fight on competitor home turf. Redefine the RFP questions so that only your architecture satisfies the requirements." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Positioning Matrix",
                title: "Asymmetric Positioning Map",
                summary: "Plotting market solutions on Axes of Autonomy and Time-to-Value.",
                details: [
                    { heading: "Incumbent Quadrant", text: "High cost, heavy manual consulting, low real-time signal velocity." },
                    { heading: "ProfitMachines Quadrant", text: "Autonomous intelligence, continuous signal ingestion, 90-day time-to-value." }
                ]
            },
            {
                id: "demand-validation",
                label: "Displacement Signals",
                title: "Competitor Churn Triggers",
                summary: "Detecting when an account is actively unhappy with their current vendor.",
                details: [
                    { heading: "Signal Monitoring", text: "Track when enterprise employees post about migration tools or search for alternative documentation." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Vulnerable Accounts by Competitor",
                summary: "Target accounts segmented by which specific competitor product they currently license.",
                details: [
                    { heading: "Competitor A Accounts", text: "Targeted with our automated data ingestion messaging." },
                    { heading: "Competitor B Accounts", text: "Targeted with our predictable pricing and zero-hidden-fee messaging." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Win Rate Acceleration",
                summary: "Measuring head-to-head competitive win rates over 12 months.",
                details: [
                    { heading: "Target Metric", text: "Lifting competitive win rate from baseline 20% to target 45%+." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Competitive Battlecards",
                summary: "Equipping reps with landmine questions that expose rival weaknesses.",
                details: [
                    { heading: "Landmine Questions", text: "Questions the buyer asks the competitor that the competitor cannot answer positively." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Competitor Landscape Mapping", action: "Identify top 5 direct and 5 indirect market alternatives.", deliverable: "Competitive Landscape Map" },
            { stage: "Stage 2", title: "Pricing & Feature Teardown", action: "Dissect public filings, pricing pages, and contract quotes.", deliverable: "Feature & Pricing Parity Matrix" },
            { stage: "Stage 3", title: "Dissatisfaction Mining", action: "Analyze 500+ reviews and conduct 10 churned customer interviews.", deliverable: "Competitor Vulnerability Audit" },
            { stage: "Stage 4", title: "Battlecard & Playbook Creation", action: "Draft rep battlecards with trap-setting questions.", deliverable: "Sales Battlecard Library" },
            { stage: "Stage 5", title: "Displacement Campaign Launch", action: "Deploy targeted outreach to accounts with expiring competitor contracts.", deliverable: "Active Competitive Win-Back Pipeline" }
        ],
        kpiMeasurement: [
            { metric: "Competitive Win Rate", definition: "Percentage of head-to-head deals won when competitor is involved.", whyItMatters: "Direct measure of positioning differentiation.", cadence: "Quarterly" },
            { metric: "Discounting Rate", definition: "Average percentage discount conceded to close deals against competitors.", whyItMatters: "Measures value retention against price pressure.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "Do you publish negative attacks against competitors?", answer: "No. Professional competitive positioning highlights architectural and economic differences using verified facts. Aggressive disparagement diminishes enterprise credibility." },
            { question: "How often are competitive battlecards updated?", answer: "Monthly. We track competitor release notes, pricing adjustments, and executive hires continuously." }
        ]
    },

    "b2b-customer-discovery": {
        id: "b2b-customer-discovery",
        code: "B2B-6",
        type: "b2b",
        title: "B2B Customer Discovery",
        heroHeadline: "Interview Enterprise Decision-Makers. Uncover True Buying Intent.",
        heroDescription: "Conduct rigorous, non-leading customer discovery interviews across the multi-stakeholder buying committee. Validate problem severity, map internal political dynamics, and establish evidentiary confidence before scaling sales outreach.",
        businessProblem: "Founders and revenue leaders frequently pitch products during customer interviews, hearing polite false encouragement ('That looks interesting!') that never translates into signed purchase orders. Without structured discovery, companies build features for users rather than economic buyers.",
        whatItAchieves: [
            "20-30 structured, non-sales customer discovery interviews conducted with target buyers",
            "Accurate mapping of the 4-6 stakeholders in the enterprise buying committee",
            "Clear validation of problem severity: distinguishing 'nice-to-have' from 'hair-on-fire'",
            "Drastic reduction of wasted sales rep hours on un-winnable exploratory accounts"
        ],
        keyCapabilities: [
            { title: "Mom-Test Qualitative Interviews", desc: "Execute neutral, past-behavior-focused discovery that uncovers actual workflow workarounds." },
            { title: "Buying Committee Mapping", desc: "Chart the relationships, incentives, and veto powers between economic buyers, technical evaluators, and end users." },
            { title: "Evidence Confidence Scoring", desc: "Quantify research findings into an explainable evidentiary index to guide product and sales prioritization." }
        ],
        statCards: [
            {
                label: "Customer Interviews Completed",
                value: "26 In-Depth",
                subtitle: "Suggested Initial Target 20–30",
                description: "Executive discovery sessions conducted with VP & C-level enterprise stakeholders across target sectors.",
                methodology: "Based on evidence saturation methodology; sample adjusted for sector diversity and evidence repetition.",
                badge: "Research Target",
                icon: "Users"
            },
            {
                label: "Problem Validation Rate",
                value: "81.5%",
                subtitle: "Active Budgeted Pain",
                description: "Proportion of interviewed buyers confirming they have actively allocated budget or headcount to solve this pain.",
                methodology: "Calculated based on verified past expenditures on tools, consulting, or internal development.",
                badge: "Validation Rate",
                icon: "CheckCircle2"
            },
            {
                label: "Buying Triggers Uncovered",
                value: "6 Core Triggers",
                subtitle: "Inflection Points Compelling Action",
                description: "Events that turn a dormant problem into an urgent board-level mandate with approved funding.",
                methodology: "Derived from chronological review of past software purchases made by interviewed enterprises.",
                badge: "Trigger Mapping",
                icon: "Zap"
            },
            {
                label: "Decision-Maker Coverage",
                value: "4.8 Roles / Deal",
                subtitle: "Buying Committee Multi-Threading",
                description: "Average number of distinct stakeholder roles required to approve a six-figure contract.",
                methodology: "Identified roles: Economic Buyer (CRO/CFO), Technical Evaluator (IT/Sec), User (Sales Rep), Admin (RevOps).",
                badge: "Committee Mapping",
                icon: "Building2"
            },
            {
                label: "Customer Segment Fit",
                value: "Tier 1: 91/100",
                subtitle: "Mid-Market B2B Tech & FinTech",
                description: "Evaluated fit score confirming this specific segment possesses the highest pain and lowest friction.",
                methodology: "Scored across urgency, budget authority, tech readiness, and sales cycle duration.",
                badge: "Segment Fit",
                icon: "Target"
            },
            {
                label: "Evidence Confidence Index",
                value: "High (89/100)",
                subtitle: "Statistical Saturation Reached",
                description: "Indicates that additional interviews in this segment yield recurring patterns rather than new surprises.",
                methodology: "Evaluated using qualitative research saturation standards across multiple independent interviews.",
                badge: "Confidence Level",
                icon: "ShieldCheck"
            }
        ],
        icpProfiles: [
            {
                name: "The Economic Buyer (CRO / EVP Sales)",
                category: "Primary Decision-Maker",
                industryOrContext: "Enterprise Tech & Commercial Services",
                scaleOrProfile: "$50M - $300M Revenue",
                buyerCommitteeOrRoles: ["Chief Revenue Officer (CRO)", "EVP Global Sales"],
                painPoints: [
                    "Missed quarterly revenue targets due to unpredictable deal slip",
                    "Reps wasting time manually logging CRM data instead of meeting prospects",
                    "Board scrutinizing high sales headcount costs with plateauing revenue"
                ],
                buyingTriggers: ["Quarterly forecast miss", "New fiscal year quota planning", "Board expansion directive"],
                desiredOutcomes: ["25% increase in rep quota attainment", "Reliable quarterly forecasting within 5%"],
                budgetConsiderations: "Controls discretionary sales tools budget; can authorize up to $150K without board vote.",
                qualificationCriteria: ["Direct authority over commercial software budget", "Team size > 25 sales reps"],
                recommendedApproach: "Focus discovery on quota attainment variability and forecast reliability."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Customer Discovery Methodology",
                summary: "Separating polite enterprise feedback from true commercial commitment.",
                details: [
                    { heading: "Foundational Rule", text: "Never ask a customer if they would buy your idea in the future. Ask what they have spent money and time doing in the past." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Buying Committee",
                title: "Mapping the 6-Person Enterprise Committee",
                summary: "Why single-threaded enterprise sales fail 80% of the time.",
                details: [
                    { heading: "The Champion", text: "Feels the operational pain daily but lacks final signature authority." },
                    { heading: "The Economic Buyer", text: "Holds the budget and cares strictly about P&L impact." },
                    { heading: "The Technical Evaluator", text: "Can kill the deal on security, API, or compliance grounds." }
                ]
            },
            {
                id: "demand-validation",
                label: "Interview Evidence",
                title: "Structured 20–30 Interview Sprints",
                summary: "How our interviewers extract objective workflow evidence.",
                details: [
                    { heading: "Target Cadence", text: "Execute 20-30 interviews over a 3-4 week period with recorded, transcribed audits." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "ICP Refinement from Live Evidence",
                summary: "Eliminating segment assumptions based on actual buyer feedback.",
                details: [
                    { heading: "Key Discovery", text: "Discovered that Mid-Market accounts convert 3x faster than Large Enterprises with identical contract value." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Sales Cycle Optimization",
                summary: "How customer discovery cuts months off your enterprise sales cycle.",
                details: [
                    { heading: "Outcome", text: "SDRs qualify out non-buyers in the first 10 minutes, doubling AE meeting efficiency." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Discovery-Led Messaging",
                summary: "Using the customer's exact words in your outbound campaigns.",
                details: [
                    { heading: "Customer Verbatim", text: "Replace corporate jargon with the raw problem statements articulated by interviewed buyers." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Hypothesis Matrix", action: "Draft core customer problem hypotheses and interview guide.", deliverable: "Discovery Interview Protocol" },
            { stage: "Stage 2", title: "Executive Recruitment", action: "Source and recruit 25 qualified enterprise decision-makers.", deliverable: "Vetted Executive Interview Pool" },
            { stage: "Stage 3", title: "Discovery Interviews", action: "Conduct 45-minute structured interviews focused on past behavior.", deliverable: "Interview Audio/Transcript Archives" },
            { stage: "Stage 4", title: "Theme & Signal Coding", action: "Tag and synthesize recurring pains, buying triggers, and objections.", deliverable: "Qualitative Evidence Synthesis" },
            { stage: "Stage 5", title: "ICP & Messaging Blueprint", action: "Update customer personas and qualification criteria.", deliverable: "Definitive B2B ICP Blueprint" }
        ],
        kpiMeasurement: [
            { metric: "Evidence Saturation Index", definition: "Measure of when successive interviews yield zero new problem statements.", whyItMatters: "Signals readiness to scale GTM with confidence.", cadence: "Post-Sprint" },
            { metric: "Qualification Speed", definition: "Time required for sales reps to accurately qualify or disqualify accounts.", whyItMatters: "Directly frees up rep selling bandwidth.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "Why is 20–30 customer interviews the recommended target?", answer: "In qualitative B2B discovery, 20–30 properly targeted interviews typically reach theoretical saturation, where patterns recur reliably. The appropriate sample depends on segment diversity, research quality, and evidence saturation." },
            { question: "How do you get busy C-level executives to agree to an interview?", answer: "We approach them as peer industry researchers conducting an executive benchmarking study on operational efficiency, with zero sales pitch involved." }
        ]
    },

    "b2b-product-market-fit-discovery": {
        id: "b2b-product-market-fit-discovery",
        code: "B2B-7",
        type: "b2b",
        title: "B2B Product-Market Fit Discovery",
        heroHeadline: "Measure Product-Market Fit. Eliminate Feature R&D Waste.",
        heroDescription: "Measure quantitative enterprise PMF through cohort retention, workflow adoption depth, and willingness-to-recommend metrics. Stop engineering custom features for churn-prone accounts and focus R&D on high-margin expansion drivers.",
        businessProblem: "Many enterprise software companies confuse early sales traction with true Product-Market Fit. Heavy sales efforts can push a flawed product into 10 enterprise accounts, only to face catastrophic churn, painful customization requests, and negative word-of-mouth 12 months later.",
        whatItAchieves: [
            "Quantitative verification of B2B Product-Market Fit before aggressive sales hiring",
            "Dissection of cohort retention: identifying the specific workflows that drive zero-churn accounts",
            "Elimination of expensive custom engineering for non-repeatable customer requests",
            "Identification of the 'Sean Ellis 40%+' PMF tipping point for enterprise modules"
        ],
        keyCapabilities: [
            { title: "Enterprise Cohort Retention Auditing", desc: "Track logo, gross revenue, and net revenue retention (NRR) across onboarding vintages." },
            { title: "Workflow Adoption Telemetry", desc: "Measure feature engagement depth: identifying which features correlate with multi-year contract renewals." },
            { title: "B2B Sean Ellis PMF Survey", desc: "Deploy targeted surveys measuring how disappointed enterprise stakeholders would be if your product vanished." }
        ],
        statCards: [
            {
                label: "Net Revenue Retention (NRR)",
                value: "128.4%",
                subtitle: "Annual Expansion Cohort",
                description: "Revenue expansion from existing accounts exceeding churn and downgrades over 12 months.",
                methodology: "Calculated across enterprise cohorts active for 12+ months including upsells and add-ons.",
                badge: "Expansion Quality",
                icon: "TrendingUp"
            },
            {
                label: "Product Adoption Depth",
                value: "78.2%",
                subtitle: "Weekly Active Stakeholders",
                description: "Proportion of licensed enterprise users executing core analytical workflows at least 3 times weekly.",
                methodology: "Tracked via platform telemetry measuring API calls, report generation, and lead actioning.",
                badge: "Adoption Rate",
                icon: "Sparkles"
            },
            {
                label: "Repeat Contract Usage",
                value: "92.0%",
                subtitle: "Annual Contract Renewal Rate",
                description: "Proportion of enterprise accounts opting to renew or expand multi-year service commitments.",
                methodology: "Calculated from trailing 12-month commercial renewal events across target segments.",
                badge: "Retention Score",
                icon: "CheckCircle2"
            },
            {
                label: "Sean Ellis PMF Score",
                value: "54.0%",
                subtitle: "Threshold for Scale is 40%",
                description: "Percentage of surveyed enterprise users answering they would be 'very disappointed' if platform ceased.",
                methodology: "Standardized Sean Ellis survey administered to 140 active enterprise users across 15 accounts.",
                badge: "PMF Benchmark",
                icon: "Target"
            },
            {
                label: "Sales Motion Win Rate",
                value: "42.0%",
                subtitle: "Qualified Proposal Close Rate",
                description: "Win rate on qualified proposals demonstrating product-market pull over sales friction.",
                methodology: "Measured across standard commercial proposals delivered to validated ICP accounts.",
                badge: "Close Rate",
                icon: "DollarSign"
            },
            {
                label: "PMF Evidentiary Confidence",
                value: "High (92/100)",
                subtitle: "Sustainable Scalability Confirmed",
                description: "Comprehensive index confirming retention, adoption, and organic account expansion.",
                methodology: "Synthesized from cohort retention, Sean Ellis score, NPS, and organic referral rates.",
                badge: "Confidence Index",
                icon: "ShieldCheck"
            }
        ],
        icpProfiles: [
            {
                name: "High-Adoption Enterprise Power User",
                category: "Ideal Retained Profile",
                industryOrContext: "FinTech, B2B SaaS, HealthTech",
                scaleOrProfile: "$25M - $250M ARR",
                buyerCommitteeOrRoles: ["Head of RevOps", "Director of Revenue Enablement", "Senior Growth Lead"],
                painPoints: [
                    "Manual reporting taking 15 hours weekly",
                    "Needs seamless integration with Salesforce/HubSpot and Slack",
                    "Needs predictable automated workflows rather than black-box AI"
                ],
                buyingTriggers: ["Immediate team onboarding", "Board revenue audit"],
                desiredOutcomes: ["3x time savings on pipeline analysis", "Accurate weekly executive forecast updates"],
                budgetConsiderations: "Expands seat count annually if adoption targets are met.",
                qualificationCriteria: ["Uses modern CRM", "Dedicated RevOps manager on staff"],
                recommendedApproach: "Incorporate into VIP advisory council to guide upcoming feature roadmap."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2B Product-Market Fit Architecture",
                summary: "Verifying true organic customer pull before scaling your go-to-market engine.",
                details: [
                    { heading: "Core Premise", text: "Scaling sales before achieving Product-Market Fit is the #1 cause of enterprise startup capital destruction." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Retention Dynamics",
                title: "Cohort Retention & NRR Analysis",
                summary: "Examining retention curves to ensure they flatten into sustainable multi-year retention.",
                details: [
                    { heading: "Logo Retention", text: "Maintaining 90%+ annual enterprise logo retention." },
                    { heading: "Net Revenue Retention", text: "Targeting 120%+ NRR driven by natural account seat and feature expansion." }
                ]
            },
            {
                id: "demand-validation",
                label: "PMF Testing",
                title: "The Sean Ellis 40% Benchmark",
                summary: "Deploying the gold-standard survey to measure true customer indispensability.",
                details: [
                    { heading: "Survey Benchmark", text: "If >40% of users say 'very disappointed', the product has achieved sustainable PMF." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Super-User Cohort Isolation",
                summary: "Identify the specific segment driving 80% of retention and zero churn.",
                details: [
                    { heading: "Segment Pivot", text: "Focus GTM exclusively on the high-retention cohort while de-prioritizing churn-prone fringe segments." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "R&D Efficiency & Capital Preservation",
                summary: "Halting the engineering of one-off custom features that do not scale.",
                details: [
                    { heading: "R&D Waste Reduction", text: "Saves an estimated $1.5M annually by aligning engineering with proven core adoption." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "The Transition from Discovery to Scale",
                summary: "The green light to aggressively hire quota-carrying reps and scale outbound marketing.",
                details: [
                    { heading: "Scaling Gate", text: "Scaling is authorized only after NRR exceeds 115% and PMF score tops 40%." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Usage Telemetry Audit", action: "Instrument product analytics to monitor exact feature workflows.", deliverable: "Product Telemetry Dashboard" },
            { stage: "Stage 2", title: "Cohort Retention Analysis", action: "Chart logo and revenue retention across historical account vintages.", deliverable: "Cohort Retention Dossier" },
            { stage: "Stage 3", title: "Sean Ellis PMF Survey", action: "Administer standardized survey across all active client users.", deliverable: "PMF Statistical Report" },
            { stage: "Stage 4", title: "Super-User & Churn Interviews", action: "Interview top 5 happiest and top 5 churned enterprise accounts.", deliverable: "Retention Driver Matrix" },
            { stage: "Stage 5", title: "Roadmap Alignment", action: "Realign product roadmap to double down on high-retention workflows.", deliverable: "Evidence-Based Product Roadmap" }
        ],
        kpiMeasurement: [
            { metric: "Net Revenue Retention", definition: "Expansion revenue minus churn and contraction from existing accounts.", whyItMatters: "Single best metric of enterprise health and PMF.", cadence: "Quarterly" },
            { metric: "Sean Ellis Score", definition: "Percentage answering 'very disappointed' if product went away.", whyItMatters: "Validates emotional and operational indispensability.", cadence: "Semi-Annually" }
        ],
        faqs: [
            { question: "Can a company with $5M ARR lack Product-Market Fit?", answer: "Absolutely. Brilliant enterprise sales teams can sell millions in contract value, but if customers don't adopt the software and renew, the company will hit an insurmountable churn wall." },
            { question: "What should we do if our Sean Ellis score is below 40%?", answer: "Pause sales expansion immediately. Interview the users who responded 'very disappointed' to isolate the specific core value that resonated with them, and reorient the product around that." }
        ]
    },

    // ══════════════════════════════════════════════════════════════════════
    // B2C OFFERINGS (8 to 14)
    // ══════════════════════════════════════════════════════════════════════

    "b2c-market-discovery": {
        id: "b2c-market-discovery",
        code: "B2C-1",
        type: "b2c",
        title: "B2C Market Discovery",
        heroHeadline: "Size Addressable Consumer Audiences. Pinpoint High-Yield Niches.",
        heroDescription: "Evaluate consumer market demographics, geographic spending power, micro-segment volumes, and category growth trends to uncover lucrative consumer profit pools before ad costs spike.",
        businessProblem: "Consumer brands often launch broad national campaigns targeting generic demographics (e.g. 'Women 25-45'), burning millions on crowded ad platforms without understanding micro-niche buying power, category saturation, or household disposable income constraints.",
        whatItAchieves: [
            "Bottom-up sizing of high-propensity consumer audience clusters",
            "Geographic and demographic purchase frequency modeling",
            "Identification of overlooked consumer niches with low competitor ad saturation",
            "Evidence-based capital allocation for high-velocity D2C and retail expansion"
        ],
        keyCapabilities: [
            { title: "Consumer Demographic Sizing", desc: "Model addressable consumer populations filtered by disposable income, household formation, and digital spending habits." },
            { title: "Category CAGR & Headwind Analysis", desc: "Evaluate macro category growth trajectories versus emerging consumer behavioral shifts." },
            { title: "Micro-Niche Opportunity Mapping", desc: "Isolate sub-segments showing high intent and low incumbent marketing presence." }
        ],
        statCards: [
            {
                label: "Addressable Consumer Audience",
                value: "4.8M Consumers",
                subtitle: "High-Propensity Core Target",
                description: "Bottom-up sizing of consumer households matching exact behavioral and economic qualification criteria.",
                methodology: "Synthesized from national demographic registries, credit spend benchmarks, and digital platform reach.",
                badge: "Audience Size",
                icon: "Users"
            },
            {
                label: "Market Size by Geography",
                value: "$420M TAM",
                subtitle: "North America Metro Clusters",
                description: "Annual consumer spending across target metro areas for this specific product category.",
                methodology: "Calculated via median basket size ($85), annual purchase frequency, and target population density.",
                badge: "Regional TAM",
                icon: "Globe"
            },
            {
                label: "Target Consumer Segment Size",
                value: "620,000",
                subtitle: "Early Adopter Micro-Cohort",
                description: "Immediate high-conversion audience showing zero price friction and active category search behavior.",
                methodology: "Filtered by category search volume, lifestyle affinity data, and prior purchase telemetry.",
                badge: "Micro-Segment",
                icon: "Target"
            },
            {
                label: "Category Growth Rate (CAGR)",
                value: "+16.8%",
                subtitle: "Annual Sector Expansion",
                description: "Projected annual growth rate of target consumer category over the next 36 months.",
                methodology: "Aggregated from retail audit consortiums, e-commerce transaction volumes, and consumer trend surveys.",
                badge: "Category Growth",
                icon: "TrendingUp"
            },
            {
                label: "Annual Purchase Frequency",
                value: "4.2 Orders / yr",
                subtitle: "Modeled Consumer Re-Order Rate",
                description: "Estimated annual repurchase frequency per consumer, critical for lifetime value projections.",
                methodology: "Modeled from comparative product lifecycle data, subscription churn rates, and consumable lifespans.",
                badge: "Frequency Model",
                icon: "ShoppingBag"
            },
            {
                label: "Consumer Revenue Opportunity",
                value: "$64M SOM",
                subtitle: "Realistic 24-Month Capture",
                description: "Serviceable obtainable revenue based on realistic marketing ad spend and retail distribution capacity.",
                methodology: "Derived from conversion assumptions across direct-to-consumer and retail channel partners.",
                badge: "Revenue Potential",
                icon: "DollarSign"
            }
        ],
        icpProfiles: [
            {
                name: "The Time-Constrained Urban Professional",
                category: "Primary Consumer Segment",
                industryOrContext: "Metro Households, Dual-Income No Kids (DINKs)",
                scaleOrProfile: "$90K - $160K Individual Income · Age 26-40",
                buyerCommitteeOrRoles: ["Primary Household Shopper", "Mobile-First Purchaser"],
                painPoints: [
                    "Lacks time to research and compare complex consumer options",
                    "Frustrated by poor subscription management and hidden cancellation fees",
                    "Wants premium, sustainably sourced products with transparent ingredients/materials"
                ],
                buyingTriggers: ["Life event (relocation, promotion)", "Social proof endorsement from trusted creator", "Limited-edition launch"],
                desiredOutcomes: ["Convenience without quality compromise", "Seamless 2-day delivery", "Effortless auto-replenishment"],
                budgetConsiderations: "Price-insensitive within reason; prioritizes convenience and product efficacy over discount hunting.",
                qualificationCriteria: ["Active mobile e-commerce buyer", "Values verified product certifications"],
                recommendedApproach: "Target with mobile-first lifestyle video ads highlighting time-savings and transparent reviews."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Consumer Market Discovery Architecture",
                summary: "Finding uncontested consumer demand before customer acquisition costs surge.",
                details: [
                    { heading: "Strategy", text: "Consumer brands succeed by finding micro-audiences whose needs are poorly served by generic mass-market brands." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Demographic Sizing",
                title: "Audience & Spend Sizing",
                summary: "Quantifying addressable consumer populations and annual category spend.",
                details: [
                    { heading: "Geographic Clusters", text: "Map top 15 metropolitan markets exhibiting the highest density of target consumers." }
                ]
            },
            {
                id: "demand-validation",
                label: "Category Momentum",
                title: "Tracking Consumer Behavior Shifts",
                summary: "Analyze Google Trends, TikTok search queries, and Amazon category rank.",
                details: [
                    { heading: "Search Trajectory", text: "Category search volume growing 35% faster than legacy product alternatives." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Behavioral Consumer Profiles",
                summary: "Profiling consumers by lifestyle values, mobile shopping habits, and brand affinities.",
                details: [
                    { heading: "Lifestyle Mapping", text: "Targeting based on values (sustainability, performance, convenience) rather than age alone." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Consumer Unit Economics",
                summary: "Targeting a 3.5:1 LTV:CAC ratio across consumer cohorts over a 12-month horizon.",
                details: [
                    { heading: "Payback Model", text: "First-order contribution margin covers acquisition cost; profit realized on repeat orders 2 through 4." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Launch Velocity Roadmap",
                summary: "Executing targeted micro-launches on social and creator distribution.",
                details: [
                    { heading: "Seeding Strategy", text: "Deploy initial product batches to 100 niche micro-influencers to build initial social proof." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Consumer Persona Hypotheses", action: "Define target demographic and psychographic boundaries.", deliverable: "Consumer Audience Charter" },
            { stage: "Stage 2", title: "Search & Social Scraping", action: "Harvest search trends, hashtag momentum, and forum chatter.", deliverable: "Consumer Intent Landscape" },
            { stage: "Stage 3", title: "Bottom-Up Market Sizing", action: "Model population clusters, basket sizes, and re-order rates.", deliverable: "B2C Market Sizing Model" },
            { stage: "Stage 4", title: "Micro-Segment Prioritization", action: "Rank consumer niches by CAC efficiency and margin potential.", deliverable: "Ranked Consumer Niches Matrix" },
            { stage: "Stage 5", title: "Go-to-Market Brief", action: "Synthesize findings into creative ad angles and channel selection.", deliverable: "Consumer Launch Blueprint" }
        ],
        kpiMeasurement: [
            { metric: "Estimated Market Size", definition: "Addressable consumer spend within target demographic boundary.", whyItMatters: "Validates runway before market saturation.", cadence: "Annual" },
            { metric: "Audience Saturation Point", definition: "Ad frequency at which customer acquisition cost increases by 50%.", whyItMatters: "Tells performance marketers when to diversify audience targeting.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "How do you size consumer markets without expensive Nielsen data?", answer: "We combine census data, Google search intent volume, social media audience targeting data, and e-commerce platform category GMV proxies." },
            { question: "How small is too small for a consumer micro-segment?", answer: "For a D2C brand, a micro-segment of 500,000 highly targeted consumers with $100+ annual spend represents a $50M market, which is more than enough to build a profitable, defensible business." }
        ]
    },

    "b2c-demand-discovery": {
        id: "b2c-demand-discovery",
        code: "B2C-2",
        type: "b2c",
        title: "B2C Demand Discovery",
        heroHeadline: "Sense Consumer Intent Signals. Validate Real Purchasing Demand.",
        heroDescription: "Analyze real-time search volume, social sentiment, pre-launch landing page conversions, and cost-per-acquisition benchmarks to prove consumer purchasing demand before spending on inventory.",
        businessProblem: "Consumer startups routinely build products, manufacture inventory, and order packaging based on friends' compliments or survey responses, only to find zero conversion when real credit cards are required to purchase.",
        whatItAchieves: [
            "Validation of credit-card-backed purchase intent before manufacturing inventory",
            "Real-time tracking of emerging consumer search surges and TikTok/Instagram micro-trends",
            "Determination of baseline Customer Acquisition Cost (CAC) via live test campaigns",
            "Elimination of unsold warehouse inventory and dead-stock capital write-downs"
        ],
        keyCapabilities: [
            { title: "Smoke Test Landing Pages", desc: "Deploy high-converting landing pages with pre-order or waitlist mechanics to measure actual conversion rates." },
            { title: "Search Intent Arbitrage", desc: "Isolate high-intent commercial keywords competitors haven't bid up yet." },
            { title: "Consumer Sentiment Mining", desc: "Mine thousands of Amazon and Reddit reviews to identify features consumers are begging brands to create." }
        ],
        statCards: [
            {
                label: "Consumer Demand Signals",
                value: "185,000 / mo",
                subtitle: "Category Intent Searches",
                description: "Monthly commercial search and social inquiries demonstrating active product search in target geography.",
                methodology: "Calculated across Google Ads search volume, TikTok hashtag views, and Amazon search index.",
                badge: "Intent Volume",
                icon: "Search"
            },
            {
                label: "Purchase Intent Validation",
                value: "8.4% Pre-Order",
                subtitle: "Landing Page Deposit Rate",
                description: "Conversion rate of cold landing page traffic paying a refundable deposit to reserve the product.",
                methodology: "Tested across 3,500 targeted consumer visitors via controlled paid social smoke test.",
                badge: "Purchase Intent",
                icon: "CheckCircle2"
            },
            {
                label: "Landing Page Conversion",
                value: "14.2%",
                subtitle: "Email / SMS Waitlist Opt-In",
                description: "Visitor-to-lead conversion rate on pre-launch product validation pages.",
                methodology: "Traffic split-tested across 3 distinct value proposition angles and price points.",
                badge: "Page Conversion",
                icon: "TrendingUp"
            },
            {
                label: "Estimated Baseline CPA",
                value: "$24.50",
                subtitle: "Cost Per Acquisition",
                description: "Modeled paid social customer acquisition cost based on live validation ad spend.",
                methodology: "Ad spend divided by modeled purchase conversions at target market conversion rates.",
                badge: "Acquisition Cost",
                icon: "DollarSign"
            },
            {
                label: "Segment-Specific Interest",
                value: "Gen-Z & Millennial",
                subtitle: "76% Share of Demand",
                description: "Consumer age and lifestyle cohort generating the highest engagement and lowest cost-per-click.",
                methodology: "Audited across Meta and TikTok ad manager demographic breakdown reports.",
                badge: "Audience Distribution",
                icon: "Users"
            },
            {
                label: "Demand Validation Status",
                value: "Demand Confirmed",
                subtitle: "Green Light for Manufacturing",
                description: "Formal validation threshold passed: 500+ pre-orders achieved with profitable projected unit economics.",
                methodology: "Requires validated deposit volume that proves production run will break even on launch day.",
                badge: "Validation Status",
                icon: "ShieldCheck"
            }
        ],
        icpProfiles: [
            {
                name: "The Trend-Conscious Early Adopter",
                category: "Primary Consumer ICP",
                industryOrContext: "E-Commerce, Lifestyle & Wellness",
                scaleOrProfile: "Age 22-35 · Urban / Suburban",
                buyerCommitteeOrRoles: ["Solo Consumer Decision-Maker"],
                painPoints: [
                    "Dissatisfied with mass-market legacy brands",
                    "Wants aesthetic, functional products that fit modern home/personal decor",
                    "Shares discoveries actively on social platforms when delighted"
                ],
                buyingTriggers: ["Visual hook in first 2 seconds of social ad", "Limited first-batch availability"],
                desiredOutcomes: ["Social status and personal wellness enhancement", "Unboxing delight"],
                budgetConsiderations: "Impulse buy threshold under $100; accepts Apple Pay and Shop Pay.",
                qualificationCriteria: ["Discovers new brands through Instagram/TikTok", "High mobile checkout frequency"],
                recommendedApproach: "Deploy short-form UGC video ads demonstrating immediate product problem-solution contrast."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Demand Validation Architecture",
                summary: "Proving consumers will open their wallets before you spend on manufacturing.",
                details: [
                    { heading: "The Principle", text: "Surveys lie; credit card transactions tell the truth. Always test with real purchase mechanics." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Demand Testing",
                title: "The Pre-Order Smoke Test Framework",
                summary: "How to ethically test product appeal using waitlists and reservation deposits.",
                details: [
                    { heading: "Mechanics", text: "Clear disclosure: 'Back this product in pre-production to receive 30% off launch price and priority delivery.'" }
                ]
            },
            {
                id: "demand-validation",
                label: "Social Sentiment",
                title: "Mining Consumer Complaint Forums",
                summary: "Scraping thousands of customer reviews on competitor Amazon listings.",
                details: [
                    { heading: "Insight Discovery", text: "Identify recurring 2-star review complaints: packaging leaks, poor taste, difficult instructions." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Identifying the True Buying Cohort",
                summary: "Discovering which demographic actually buys versus who claims to like the concept.",
                details: [
                    { heading: "Surprise Findings", text: "Often a product intended for college students converts 4x higher with busy working moms." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Customer Acquisition Cost Feasibility",
                summary: "Ensuring marketing CPA leaves healthy gross profit margin.",
                details: [
                    { heading: "Unit Economics", text: "Targeting CPA under 30% of Average Order Value (AOV)." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Pre-Launch Audience Seeding",
                summary: "Building an engaged waitlist of 5,000+ buyers before opening the checkout.",
                details: [
                    { heading: "Day 1 Sales", text: "Converting the pre-launch waitlist guarantees immediate Day 1 profitability." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Value Proposition Angles", action: "Draft 3 distinct marketing hooks and visual concepts.", deliverable: "Creative Hook Matrix" },
            { stage: "Stage 2", title: "Validation Landing Pages", action: "Build fast, mobile-optimized pre-order landing pages.", deliverable: "Live Test Landing Pages" },
            { stage: "Stage 3", title: "Micro-Budget Ad Spend", action: "Run $1,000-$2,000 in targeted Meta/TikTok traffic to test pages.", deliverable: "Ad Telemetry & Cost Per Click Data" },
            { stage: "Stage 4", title: "Conversion & CPA Analysis", action: "Calculate actual waitlist conversion rate and projected CPA.", deliverable: "Demand Validation Audit" },
            { stage: "Stage 5", title: "Inventory Decision", action: "Provide executive recommendation on batch size and pricing.", deliverable: "Production Authorization Report" }
        ],
        kpiMeasurement: [
            { metric: "Waitlist Conversion Rate", definition: "Percentage of cold ad traffic opting in with email or deposit.", whyItMatters: "Direct indicator of product-market messaging resonance.", cadence: "Weekly during test" },
            { metric: "Projected First-Order Margin", definition: "AOV minus (COGS + Shipping + CPA).", whyItMatters: "Confirms whether product can scale profitably on paid ads.", cadence: "Post-Test" }
        ],
        faqs: [
            { question: "Is a smoke test legal and ethical?", answer: "Yes, provided you are fully transparent that the product is in pre-order/development, offer immediate full refunds, and clearly set expected delivery expectations." },
            { question: "What ad budget is required to validate consumer demand?", answer: "Typically $1,500 to $3,000 across 2 weeks is sufficient to generate statistically significant conversion and CPA data." }
        ]
    },

    "b2c-value-discovery": {
        id: "b2c-value-discovery",
        code: "B2C-3",
        type: "b2c",
        title: "B2C Value Discovery",
        heroHeadline: "Calibrate Consumer Price Sensitivity. Maximize Contribution Margin.",
        heroDescription: "Evaluate consumer perceived value, price sensitivity thresholds, product packaging bundles, and willingness to pay to optimize retail pricing and protect unit gross margins.",
        businessProblem: "Consumer brands frequently underprice their products out of fear or overprice them based on vanity, failing to test the price elasticity curve. This leaves millions in profit margin on the table or causes conversion rates to collapse at checkout.",
        whatItAchieves: [
            "Accurate calibration of the Van Westendorp Price Sensitivity Meter",
            "Optimization of Average Order Value (AOV) through tiered bundles and upsells",
            "Maintenance of 75%+ gross margins across direct and retail channels",
            "Identification of the emotional value drivers that justify premium consumer pricing"
        ],
        keyCapabilities: [
            { title: "Van Westendorp Price Modeling", desc: "Identify the Point of Marginal Cheapness and Point of Marginal Expensiveness among target buyers." },
            { title: "Bundle & Add-On Elasticity Testing", desc: "Design multi-item bundles that lift cart value without increasing acquisition cost." },
            { title: "Value Anchor Storytelling", desc: "Construct brand messaging that reframes the product against expensive alternatives." }
        ],
        statCards: [
            {
                label: "Consumer Value Drivers",
                value: "Efficacy & Time",
                subtitle: "Top Ranked Emotional Drivers",
                description: "Primary psychological reasons consumers justify paying premium prices for this category.",
                methodology: "Ranked via conjoint analysis and qualitative customer purchase debriefs across 200 buyers.",
                badge: "Value Drivers",
                icon: "Sparkles"
            },
            {
                label: "Price Sensitivity Index",
                value: "Low Elasticity",
                subtitle: "Between $45 and $68",
                description: "Price increase from $45 to $60 yields zero drop in conversion rate, maximizing revenue.",
                methodology: "Calculated using live A/B price elasticity testing on active e-commerce checkout traffic.",
                badge: "Price Elasticity",
                icon: "DollarSign"
            },
            {
                label: "Median Willingness to Pay",
                value: "$58.00",
                subtitle: "Optimized Unit Retail Price",
                description: "Price point where consumer perceived quality and commercial conversion are maximized.",
                methodology: "Derived from intersection of 'expensive but acceptable' and 'bargain' survey curves.",
                badge: "Optimal Price",
                icon: "Target"
            },
            {
                label: "Offer Appeal Rating",
                value: "84.6%",
                subtitle: "Hero Bundle Configuration",
                description: "Percentage of target consumers selecting the 3-item starter bundle over single unit purchase.",
                methodology: "Tested across 400 consumer panel choices simulating e-commerce checkout options.",
                badge: "Bundle Appeal",
                icon: "ShoppingBag"
            },
            {
                label: "Perceived Differentiation",
                value: "+42% vs Rivals",
                subtitle: "Ingredient & Design Superiority",
                description: "Consumer rating of product distinction compared to mass-market drugstore alternatives.",
                methodology: "Double-blind consumer product comparison testing measuring tactile and brand perception.",
                badge: "Differentiation",
                icon: "ShieldCheck"
            },
            {
                label: "Gross Margin Contribution",
                value: "78.5%",
                subtitle: "Unit Margin After COGS & Packaging",
                description: "Product contribution margin at the optimized $58 retail price point.",
                methodology: "Calculated: ($58.00 Price - $12.47 Total Landed Cost) / $58.00 Price = 78.5% Gross Margin.",
                badge: "Unit Margin",
                icon: "BarChart3"
            }
        ],
        icpProfiles: [
            {
                name: "The Quality-Focused Lifestyle Consumer",
                category: "High-Margin Consumer",
                industryOrContext: "Premium Consumer Goods, Wellness, Home",
                scaleOrProfile: "Household Income > $100K · Discerning Buyer",
                buyerCommitteeOrRoles: ["Individual Consumer"],
                painPoints: [
                    "Tired of cheap products that break or fail within 3 months",
                    "Suspicious of ultra-cheap options; associates low price with toxic materials or poor labor standards",
                    "Willing to pay a 30-50% premium for design that looks beautiful in their home"
                ],
                buyingTriggers: ["Replacing broken legacy item", "Gift purchase", "Influencer aesthetic tour"],
                desiredOutcomes: ["Longevity, aesthetic pride, superior sensory experience"],
                budgetConsiderations: "Happy to spend $50-$120 on superior quality; motivated by bundle discounts.",
                qualificationCriteria: ["Appreciates industrial design and premium packaging", "Follows curated brands"],
                recommendedApproach: "Emphasize craftsmanship, premium materials, and 100-day satisfaction guarantee."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Value & Pricing Architecture",
                summary: "Setting prices based on perceived consumer value rather than cost-plus markup.",
                details: [
                    { heading: "The Mistake", text: "Cost-plus pricing (Cost x 3) guarantees you underprice exceptional products and overprice mediocre ones." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Price Sensitivity",
                title: "The Van Westendorp Price Meter",
                summary: "Mapping consumer price psychology across four key questions.",
                details: [
                    { heading: "Too Cheap", text: "Price is so low consumer doubts quality." },
                    { heading: "Bargain", text: "Great value for money." },
                    { heading: "Expensive", text: "High price, but still warrants consideration." },
                    { heading: "Too Expensive", text: "Consumer will not consider purchase." }
                ]
            },
            {
                id: "demand-validation",
                label: "AOV Expansion",
                title: "The Bundle Architecture",
                summary: "Lifting Average Order Value from $45 to $85 using strategic add-ons.",
                details: [
                    { heading: "Anchor Pricing", text: "Display a premium complete set alongside the single item to make the bundle look like irresistible value." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Price Sensitivity by Channel",
                summary: "How willingness to pay shifts between TikTok Shop, Amazon, and direct web checkout.",
                details: [
                    { heading: "Direct Web", text: "Highest willingness to pay driven by immersive brand storytelling." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Contribution Margin Optimization",
                summary: "Protecting margins against paid advertising cost inflation.",
                details: [
                    { heading: "Breakeven Math", text: "An 80% gross margin absorbs higher ad costs far better than a 55% margin." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Promotional Guardrails",
                summary: "Preventing chronic discounting that erodes brand prestige.",
                details: [
                    { heading: "Gift-with-Purchase", text: "Offer value-add gifts instead of slashing prices with 40% discount codes." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Cost Structure Deconstruction", action: "Audit bill of materials, packaging, freight, and fulfillment fees.", deliverable: "Unit Economics Baseline" },
            { stage: "Stage 2", title: "Price Sensitivity Survey", action: "Administer Van Westendorp survey to 300 target consumers.", deliverable: "Price Elasticity Curve Report" },
            { stage: "Stage 3", title: "Bundle Architecture Design", action: "Design Starter, Complete, and Subscription bundle tiers.", deliverable: "Product Bundling Matrix" },
            { stage: "Stage 4", title: "A/B Checkout Testing", action: "Test $48 vs $58 vs $68 price points on live paid traffic.", deliverable: "Empirical Pricing Optimization Data" },
            { stage: "Stage 5", title: "Pricing & Margin Masterplan", action: "Finalize retail MSRP, wholesale pricing, and D2C margin targets.", deliverable: "Commercial Pricing Dossier" }
        ],
        kpiMeasurement: [
            { metric: "Average Order Value (AOV)", definition: "Total revenue divided by number of completed orders.", whyItMatters: "Directly determines ad spend affordability.", cadence: "Daily" },
            { metric: "Gross Contribution Margin", definition: "Revenue minus COGS, shipping, and merchant fees as a percentage.", whyItMatters: "Measures cash generated to fund growth.", cadence: "Weekly" }
        ],
        faqs: [
            { question: "Won't higher prices reduce our conversion rate?", answer: "Often yes, but total gross profit is what matters. In many categories, raising price by 30% reduces conversion by only 5%, yielding significantly more gross profit dollars." },
            { question: "How do we justify a premium price against Amazon competitors?", answer: "Through superior unboxing, verified third-party lab testing, sustainable materials, and responsive customer service." }
        ]
    },

    "b2c-channel-discovery": {
        id: "b2c-channel-discovery",
        code: "B2C-4",
        type: "b2c",
        title: "B2C Channel Discovery",
        heroHeadline: "Evaluate Acquisition Channels. Build Resilient Omnichannel Growth.",
        heroDescription: "Evaluate paid social, organic search, creator partnerships, Amazon marketplace, retail distribution, and SMS/Email retention channels to identify your most profitable consumer distribution mix.",
        businessProblem: "Over-reliance on Meta (Facebook/Instagram) ads leaves consumer brands vulnerable to sudden algorithm shifts, account bans, and rising ad costs. Brands fail to test retail wholesale, creator affiliate networks, and organic search.",
        whatItAchieves: [
            "Diversification across paid, earned, owned, and marketplace channels",
            "Identification of low-CAC creator affiliate and influencer distribution models",
            "Profitable expansion into Amazon and retail without cannibalizing direct web sales",
            "Maximization of customer lifetime value through high-converting owned SMS/Email channels"
        ],
        keyCapabilities: [
            { title: "Cross-Channel Unit Economics Modeling", desc: "Compare CPA, ROAS, re-order rate, and net contribution across every acquisition inflow." },
            { title: "Creator Affiliate Engine Design", desc: "Build commission-based creator partnerships that scale organic social sales with zero upfront ad risk." },
            { title: "Retail & Marketplace Synergy Mapping", desc: "Sequence direct-to-consumer demand into wholesale retail buyer presentations." }
        ],
        statCards: [
            {
                label: "Channel Performance Mix",
                value: "4 Profitable Paths",
                subtitle: "Meta, TikTok Creators, Amazon, Email",
                description: "Distribution channels generating positive first-order contribution margin after fully loaded costs.",
                methodology: "Audited using multi-touch attribution modeling and channel-specific post-purchase surveys.",
                badge: "Active Channels",
                icon: "Network"
            },
            {
                label: "Channel Conversion Rate",
                value: "3.85%",
                subtitle: "Direct Web Storefront",
                description: "E-commerce visitor-to-order conversion rate across blended mobile and desktop traffic.",
                methodology: "Calculated across 85,000 monthly unique store visitors.",
                badge: "Storefront Rate",
                icon: "TrendingUp"
            },
            {
                label: "Blended Customer Acquisition Cost",
                value: "$28.40",
                subtitle: "Across All Inflow Channels",
                description: "Blended acquisition cost weighted across paid social, creator referrals, and organic traffic.",
                methodology: "Total marketing expenditures divided by total new customer count over trailing 90 days.",
                badge: "Blended CAC",
                icon: "DollarSign"
            },
            {
                label: "Repeat Purchase by Channel",
                value: "34.2%",
                subtitle: "Creator-Referred Cohort",
                description: "Creator and influencer-referred customers exhibit 35% higher 90-day repeat re-order rates than paid ad clicks.",
                methodology: "Cohort retention tracked via customer discount code and UTM tracking parameters.",
                badge: "Retention Edge",
                icon: "ShoppingBag"
            },
            {
                label: "Revenue Contribution Mix",
                value: "52% D2C / 48% Mkt",
                subtitle: "Direct Web vs Amazon/Retail",
                description: "Balanced channel revenue distribution preventing platform risk.",
                methodology: "Tracked in unified accounting telemetry across Shopify and Amazon Seller Central.",
                badge: "Channel Balance",
                icon: "BarChart3"
            },
            {
                label: "Channel ROAS Multiplier",
                value: "3.6x ROAS",
                subtitle: "Blended Marketing Efficiency Ratio",
                description: "Gross revenue generated per dollar spent across all paid marketing channels.",
                methodology: "Total gross sales divided by total paid ad spend (Marketing Efficiency Ratio - MER).",
                badge: "MER Multiple",
                icon: "Target"
            }
        ],
        icpProfiles: [
            {
                name: "The Creator-Influenced Consumer",
                category: "High-LTV Acquisition Profile",
                industryOrContext: "Social Commerce, TikTok, Instagram",
                scaleOrProfile: "Mobile Shopper · Engaged with Video Content",
                buyerCommitteeOrRoles: ["Direct Consumer"],
                painPoints: [
                    "Ignores traditional corporate advertisements",
                    "Trusts authentic creator recommendations and unedited demonstrations",
                    "Appreciates exclusive creator discount codes and bundle recommendations"
                ],
                buyingTriggers: ["Seeing 3 different creators using the product in the same week", "Limited flash promotion"],
                desiredOutcomes: ["Verified results seen in creator video", "Fast seamless checkout"],
                budgetConsiderations: "Converts rapidly via mobile wallet with creator code.",
                qualificationCriteria: ["Discovers products via creator feeds", "Values peer reviews"],
                recommendedApproach: "Scale micro-creator seeding with 50 product packages sent monthly to niche creators."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Omnichannel Distribution Architecture",
                summary: "Breaking free from single-ad-network dependency.",
                details: [
                    { heading: "The Trap", text: "Brands that rely 100% on Meta ads live in constant fear of CPA spikes and platform policy changes." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Channel Comparison",
                title: "Paid vs Organic vs Marketplace",
                summary: "Auditing channel unit economics and payback timelines.",
                details: [
                    { heading: "Paid Social", text: "Fast volume, immediate feedback, highest variable cost." },
                    { heading: "Creator Affiliate", text: "Pay-on-performance, high trust, lower upfront financial risk." },
                    { heading: "Amazon", text: "High intent, immense search volume, but platform controls the customer data." }
                ]
            },
            {
                id: "demand-validation",
                label: "Creator Seeding",
                title: "The Creator Seeding Flywheel",
                summary: "Generating authentic organic user-generated content (UGC) at scale.",
                details: [
                    { heading: "Process", text: "Gift product to 100 targeted creators; turn top-performing organic videos into paid whitelisted ads." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Channel-to-Cohort Alignment",
                summary: "Deploying the right channel for each consumer demographic.",
                details: [
                    { heading: "Under 30", text: "TikTok Shop and creator storefronts." },
                    { heading: "Over 40", text: "Meta, Google Search, and Amazon Marketplace." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Marketing Efficiency Ratio (MER)",
                summary: "Tracking blended business profitability instead of unreliable platform-reported ROAS.",
                details: [
                    { heading: "The True Metric", text: "Total Revenue divided by Total Marketing Spend tells the truth about profitability." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Owned Channel Retention (Email/SMS)",
                summary: "Turning one-time buyers into 4x repeat purchasers with automated flows.",
                details: [
                    { heading: "Automated Flows", text: "Welcome series, post-purchase replenishment reminders, and VIP early access drops." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Channel Diagnostic", action: "Audit historical customer acquisition sources and blended MER.", deliverable: "Channel Performance Baseline" },
            { stage: "Stage 2", title: "Creator Seeding Infrastructure", action: "Set up affiliate tracking and outreach to 100 micro-creators.", deliverable: "Creator Outreach Engine" },
            { stage: "Stage 3", title: "Amazon Optimization", action: "Audit listing SEO, A+ content, and brand registry storefront.", deliverable: "Marketplace Optimization Plan" },
            { stage: "Stage 4", title: "Retention Automation", action: "Deploy 6 automated Klaviyo email & SMS flows.", deliverable: "Automated Retention Engine" },
            { stage: "Stage 5", title: "Omnichannel Reporting Dashboard", action: "Connect Shopify, Amazon, and ad accounts into unified dashboard.", deliverable: "Omnichannel P&L Dashboard" }
        ],
        kpiMeasurement: [
            { metric: "Marketing Efficiency Ratio (MER)", definition: "Total store revenue divided by total marketing expenditure.", whyItMatters: "Single best measure of overall business marketing leverage.", cadence: "Weekly" },
            { metric: "Owned Channel Revenue Share", definition: "Percentage of total sales generated from Email & SMS without ad spend.", whyItMatters: "Direct indicator of brand health and recurring profit.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "Should a new brand launch on Amazon immediately?", answer: "We usually recommend establishing proof of concept and building your customer email list on your own Shopify store first, then launching on Amazon to capture search spillover." },
            { question: "How do you track sales if someone sees an ad on Instagram but buys on Amazon?", answer: "We use post-purchase surveys on both platforms and look at geo-lift correlation when scaling spend in specific media markets." }
        ]
    },

    "b2c-competitive-discovery": {
        id: "b2c-competitive-discovery",
        code: "B2C-5",
        type: "b2c",
        title: "B2C Competitive Discovery",
        heroHeadline: "Analyze Consumer Competitors. Exploit Market Basket & Review Gaps.",
        heroDescription: "Conduct exhaustive competitive audits on pricing tiers, discount strategies, consumer review complaints, packaging flaws, and advertising creatives to position your product where rivals are vulnerable.",
        businessProblem: "Consumer brands often enter markets blindly trying to outspend entrenched rivals on identical keywords and creative angles, quickly running out of capital rather than analyzing competitor review complaints to identify unmet consumer needs.",
        whatItAchieves: [
            "Comprehensive teardown of competitor pricing, bundle structures, and promo calendars",
            "Identification of negative consumer review patterns in competitor products",
            "Creation of disruptive ad angles that address competitor quality failures",
            "Protection of consumer market share through unique product formulation/packaging"
        ],
        keyCapabilities: [
            { title: "Review Sentiment Mining", desc: "Scan 1,000+ Amazon, Trustpilot, and retail reviews of top 5 competitors to uncover recurring defects and complaints." },
            { title: "Competitor Ad Library Surveillance", desc: "Monitor competitor Meta and TikTok ad libraries to see which creative hooks they are running heavily." },
            { title: "Price & Bundle Basket Comparison", desc: "Map retail price per ounce/unit against competitor product sizes and subscriptions." }
        ],
        statCards: [
            {
                label: "Competitor Coverage",
                value: "8 Brands Audited",
                subtitle: "Direct D2C & Retail Incumbents",
                description: "Top brands analyzed across pricing, packaging, supply chain origins, and review sentiment.",
                methodology: "Systematic review of retail shelf placement, e-commerce stores, and ad transparency registries.",
                badge: "Competitor Scope",
                icon: "ShieldCheck"
            },
            {
                label: "Price Comparison Index",
                value: "15% Premium Justified",
                subtitle: "Higher Quality Perception",
                description: "Consumers willing to pay a 15% premium over market leader based on superior ingredients/materials.",
                methodology: "Verified through blind panel testing and consumer purchase intention surveys.",
                badge: "Pricing Power",
                icon: "DollarSign"
            },
            {
                label: "Offer Differentiation Factor",
                value: "+34% Edge",
                subtitle: "Eco-Friendly Refillable System",
                description: "Unique refillable packaging innovation that competitors cannot easily copy without retooling.",
                methodology: "Evaluated across consumer sustainability preferences and repeat re-order economics.",
                badge: "Differentiation",
                icon: "Sparkles"
            },
            {
                label: "Consumer Review Themes",
                value: "3 Dominant Complaints",
                subtitle: "Competitor Vulnerability Areas",
                description: "Competitor products criticized for: broken pumps, artificial fragrance, and slow customer support.",
                methodology: "Synthesized from 1,450 verified Amazon and Trustpilot 1-star and 2-star consumer reviews.",
                badge: "Review Themes",
                icon: "Users"
            },
            {
                label: "Unmet Consumer Needs",
                value: "Fragrance-Free Option",
                subtitle: "Completely Ignored by Incumbents",
                description: "42% of complaining consumers specifically requested a clean, fragrance-free version.",
                methodology: "Identified via frequency keyword analysis of negative competitor product reviews.",
                badge: "Unmet Need",
                icon: "Target"
            },
            {
                label: "Positioning Opportunity",
                value: "High White Space",
                subtitle: "Clean Clinical Efficacy",
                description: "Category dominated by either cheap synthetic products or expensive all-natural products that don't work.",
                methodology: "Positioning gap identified at intersection of verified clinical results and clean ingredients.",
                badge: "Positioning Edge",
                icon: "CheckCircle2"
            }
        ],
        icpProfiles: [
            {
                name: "The Disappointed Category Switcher",
                category: "Displacement Consumer",
                industryOrContext: "Consumer Wellness & Personal Care",
                scaleOrProfile: "Active Buyer of Competitor Products",
                buyerCommitteeOrRoles: ["Individual Consumer"],
                painPoints: [
                    "Currently uses market leader brand but experiences skin irritation or packaging breaks",
                    "Feels the market leader has reduced product quality while increasing prices",
                    "Actively looking for a modern, higher-quality alternative"
                ],
                buyingTriggers: ["Another broken pump on competitor product", "Reading an honest comparison article"],
                desiredOutcomes: ["A product that solves the core problem with zero irritating side effects"],
                budgetConsiderations: "Already spending $40-$70 every 60 days on the incumbent.",
                qualificationCriteria: ["Uses competitor product regularly", "Values verified clean ingredients"],
                recommendedApproach: "Deploy comparison ads highlighting the specific ingredient/packaging difference."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Competitive Intelligence Architecture",
                summary: "Turning competitor customer dissatisfaction into your most profitable ad angles.",
                details: [
                    { heading: "Strategy", text: "Let your competitors spend millions educating the market; step in and capture their dissatisfied customers." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Review Mining",
                title: "Amazon 2-Star Review Analysis",
                summary: "Why 2-star reviews are more valuable than 1-star or 5-star reviews.",
                details: [
                    { heading: "The 2-Star Sweet Spot", text: "2-star reviewers love the concept but were let down by execution. Their reviews tell you exactly what product to build." }
                ]
            },
            {
                id: "demand-validation",
                label: "Ad Surveillance",
                title: "Competitor Creative Hook Analysis",
                summary: "Auditing what ads rivals keep active for 90+ days.",
                details: [
                    { heading: "The Ad Rule", text: "If a competitor has run an ad for 90+ days, it is profitable. Study their hook structure." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Targeting Churned Competitor Buyers",
                summary: "Using custom audience targeting to reach consumers who interact with competitor brand pages.",
                details: [
                    { heading: "Targeting Tactics", text: "Social keyword and interest targeting centered on incumbent brand followers." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Comparison Landing Page Conversion",
                summary: "Deploying objective comparison tables that increase conversion by 45%.",
                details: [
                    { heading: "Fair Comparison Tables", text: "Highlight third-party testing, ingredient transparency, and money-back guarantees." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Ethical Comparison Advertising",
                summary: "Positioning your product as the next-generation upgrade over legacy options.",
                details: [
                    { heading: "Creative Angle", text: "'Why 10,000 people switched from [Brand X] to [Our Brand] this year.'" }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Competitor Roster Selection", action: "Identify top 3 direct competitors and top 2 legacy alternatives.", deliverable: "Competitive Benchmark Roster" },
            { stage: "Stage 2", title: "Review Scraping & NLP Analysis", action: "Scrape and categorize 1,500 negative reviews across competitor products.", deliverable: "Review Vulnerability Synthesis" },
            { stage: "Stage 3", title: "Packaging & Ingredient Audit", action: "Compare formulas, cost per unit, and packaging sustainability.", deliverable: "Product Quality Parity Report" },
            { stage: "Stage 4", title: "Comparison Creative Briefs", action: "Write ad copy and design comparison landing page tables.", deliverable: "Comparison Ad & Landing Page Kit" },
            { stage: "Stage 5", title: "Displacement Campaign Execution", action: "Launch comparison ad sets on Meta and TikTok.", deliverable: "Active Competitive Win-Back Flow" }
        ],
        kpiMeasurement: [
            { metric: "Comparison Page Conversion", definition: "Visitor-to-purchase rate on competitor comparison landing pages.", whyItMatters: "Direct indicator of superior value proposition perception.", cadence: "Weekly" },
            { metric: "Competitor Displacement CPA", definition: "Cost to acquire a customer using competitive comparison ad angles.", whyItMatters: "Measures efficiency of conquesting campaigns.", cadence: "Bi-weekly" }
        ],
        faqs: [
            { question: "Is comparison advertising legal in B2C?", answer: "Yes, provided all claims are strictly factual, verifiable, and do not misuse competitor trademarks deceptively." },
            { question: "Won't competitors retaliate with lawsuits?", answer: "Not if you adhere to truthful comparative advertising laws, cite third-party lab tests, and use neutral phrasing." }
        ]
    },

    "b2c-customer-discovery": {
        id: "b2c-customer-discovery",
        code: "B2C-6",
        type: "b2c",
        title: "B2C Customer Discovery",
        heroHeadline: "Interview Everyday Consumers. Uncover Raw Purchase Motivations.",
        heroDescription: "Conduct non-leading consumer discovery sessions, unboxing diary studies, and post-purchase customer interviews to identify true emotional purchase triggers, usage barriers, and delightful unboxing moments.",
        businessProblem: "Consumer marketing teams often rely on abstract demographic survey graphs, never talking directly to the human beings who buy their products. They miss the real emotional reason a consumer purchased: insecurity, desire for status, convenience, or gift-giving anxiety.",
        whatItAchieves: [
            "20-30 in-depth consumer discovery interviews capturing exact customer vocabulary",
            "Identification of the hidden friction points in unboxing, onboarding, and first use",
            "Discovery of surprising alternative use-cases that expand total addressable market",
            "Creation of high-converting UGC video scripts that mirror real customer thought patterns"
        ],
        keyCapabilities: [
            { title: "Jobs-to-be-Done (JTBD) Consumer Interviews", desc: "Uncover what life event or emotional trigger pushed the consumer to finally buy." },
            { title: "Unboxing & First-Use Video Audits", desc: "Watch consumers open packaging in real time to spot usability friction and packaging defects." },
            { title: "Customer Vocabulary Synthesis", desc: "Extract the exact words and phrases consumers use to describe their problem and satisfaction." }
        ],
        statCards: [
            {
                label: "Consumer Research Sample",
                value: "30 In-Depth",
                subtitle: "Interviews & Diary Studies",
                description: "45-minute qualitative discovery sessions conducted with verified purchasers and category shoppers.",
                methodology: "Based on qualitative research saturation methodology; recruited across verified consumer cohorts.",
                badge: "Research Target",
                icon: "Users"
            },
            {
                label: "Core Needs & JTBD Uncovered",
                value: "3 Core Jobs",
                subtitle: "Psychological Motivations",
                description: "The primary 'jobs' consumers hire the product to do: morning energy, mental calm, and guilt-free snacking.",
                methodology: "Derived from Clayton Christensen's Jobs-to-be-Done framework applied to consumer diaries.",
                badge: "Jobs to be Done",
                icon: "Sparkles"
            },
            {
                label: "Primary Purchase Barriers",
                value: "Taste & Price",
                subtitle: "Resolved via Sample Packs",
                description: "Identified fear of bad taste as the #1 reason consumers abandoned cart before purchasing full size.",
                methodology: "Discovered through post-abandonment phone interviews and heat-map telemetry.",
                badge: "Barrier Resolution",
                icon: "Target"
            },
            {
                label: "Key Purchase Triggers",
                value: "Sunday Routine Prep",
                subtitle: "Peak Purchase Intent Window",
                description: "Over 65% of target consumers make health and wellness purchase decisions on Sunday evenings.",
                methodology: "Correlated purchase timestamps with qualitative consumer interview recollections.",
                badge: "Trigger Timing",
                icon: "Zap"
            },
            {
                label: "Demographic Segment Fit",
                value: "92 / 100",
                subtitle: "Active Health-Conscious Mothers",
                description: "Segment exhibiting highest brand affinity, lowest price sensitivity, and highest repeat referral rate.",
                methodology: "Evaluated across interview enthusiasm, NPS response, and re-order commitment.",
                badge: "Segment Fit",
                icon: "ShieldCheck"
            },
            {
                label: "CX Friction Points Resolved",
                value: "4 Friction Points",
                subtitle: "Eliminated in Product Packaging",
                description: "Resolved packaging reseal failure, confusing scoop size, difficult website cancellation, and shipping alerts.",
                methodology: "Identified through unboxing video audits and recorded customer onboarding sessions.",
                badge: "Friction Eliminated",
                icon: "CheckCircle2"
            }
        ],
        icpProfiles: [
            {
                name: "The Wellness-Focused Household Leader",
                category: "Core Customer Profile",
                industryOrContext: "Consumer Health, Nutrition, Home",
                scaleOrProfile: "Parent · Age 28-44 · Suburban Household",
                buyerCommitteeOrRoles: ["Household Primary Decision-Maker"],
                painPoints: [
                    "Wants family to consume clean, nutritious products without artificial sweeteners",
                    "Children reject unpalatable health foods; needs superior taste",
                    "Overwhelmed by confusing nutritional jargon on supplement labels"
                ],
                buyingTriggers: ["Start of school semester", "Health scare or checkup", "Friend's passionate recommendation"],
                desiredOutcomes: ["Peace of mind knowing family gets clean nutrition without morning arguments"],
                budgetConsiderations: "Allocates $100-$150 monthly to family health consumables; values subscription discounts.",
                qualificationCriteria: ["Buys organic when practical", "Reads ingredient labels"],
                recommendedApproach: "Highlight taste guarantees, kid-approved testimonials, and clean label certifications."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Qualitative Discovery Architecture",
                summary: "Understanding the real emotional lives of the people who buy your product.",
                details: [
                    { heading: "Foundational Rule", text: "People don't buy products; they buy better versions of themselves. Discovery reveals who they want to become." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Jobs to be Done",
                title: "Clayton Christensen's JTBD Framework",
                summary: "Why consumers 'hire' and 'fire' products in their daily routine.",
                details: [
                    { heading: "Functional Job", text: "What practical task does the product perform?" },
                    { heading: "Emotional Job", text: "How does the consumer feel when using the product?" },
                    { heading: "Social Job", text: "How does the consumer want to be perceived by peers?" }
                ]
            },
            {
                id: "demand-validation",
                label: "Unboxing Audits",
                title: "First-Moment-of-Truth Auditing",
                summary: "Recording consumers opening the package for the first time.",
                details: [
                    { heading: "Friction Discovery", text: "Spotting tiny frustrations: hard-to-open tear strips, missing instructions, underwhelming presentation." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Extracting Customer Language",
                summary: "Using the customer's exact vocabulary in ad copywriting.",
                details: [
                    { heading: "Copywriting Gold", text: "Transcribe verbatim phrases from interviews to write ads that sound like a friend talking, not a corporation." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "Reducing Product Return Rates",
                summary: "How customer discovery cuts e-commerce returns by 50%.",
                details: [
                    { heading: "Expectation Alignment", text: "Clarifying product instructions and setting honest expectations stops post-purchase remorse." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Customer-Led Community Building",
                summary: "Turning early enthusiastic consumers into a passionate VIP brand community.",
                details: [
                    { heading: "Community Council", text: "Invite the top 50 interviewed consumers into a private advisory group to test future flavors/products." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Consumer Interview Guide", action: "Draft non-leading qualitative protocol focused on JTBD.", deliverable: "Consumer Discovery Protocol" },
            { stage: "Stage 2", title: "Customer Recruitment", action: "Recruit 25 verified purchasers and 5 competitor customers.", deliverable: "Consumer Participant Cohort" },
            { stage: "Stage 3", title: "Video Discovery Sessions", action: "Conduct 45-minute recorded video interviews and unboxing audits.", deliverable: "Video Recording & Transcript Library" },
            { stage: "Stage 4", title: "Verbatim Vocabulary Synthesis", action: "Code common emotional hooks, objections, and delight points.", deliverable: "Customer Language Playbook" },
            { stage: "Stage 5", title: "Ad Script & Packaging Overhaul", action: "Rewrite social ad hooks and redesign onboarding package insert.", deliverable: "Optimized Ad & Packaging Assets" }
        ],
        kpiMeasurement: [
            { metric: "First-Order Satisfaction (CSAT)", definition: "Percentage of first-time buyers rating satisfaction 5 out of 5.", whyItMatters: "Direct predictor of repeat re-order probability.", cadence: "Weekly" },
            { metric: "Product Return / Refund Rate", definition: "Percentage of orders returned or refunded.", whyItMatters: "Validates product expectation alignment.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "How do you incentivize consumers to spend 45 minutes on a video call?", answer: "We offer a $75-$100 gift card or free annual product credit, which consumer shoppers gladly accept." },
            { question: "What is the biggest mistake founders make in consumer interviews?", answer: "Explaining the product and defending its features rather than shutting up and listening to how the customer actually lives." }
        ]
    },

    "b2c-product-market-fit-discovery": {
        id: "b2c-product-market-fit-discovery",
        code: "B2C-7",
        type: "b2c",
        title: "B2C Product-Market Fit Discovery",
        heroHeadline: "Measure Consumer PMF. Drive High Repeat Purchase Rates.",
        heroDescription: "Evaluate consumer retention curves, 30/60/90-day repeat purchase velocity, unprompted word-of-mouth referral rates, and cart-abandonment recovery to prove genuine consumer product-market fit.",
        businessProblem: "Many D2C brands experience a temporary surge in sales from viral ad campaigns, but because the underlying product does not delight consumers or encourage repeat orders, customer lifetime value remains low and the brand collapses once paid ad costs rise.",
        whatItAchieves: [
            "Measurement of true consumer PMF through multi-cohort repeat re-order rates",
            "Identification of the specific product SKUs and bundles driving 80% of retention",
            "Resolution of checkout friction and cart abandonment to recover lost revenue",
            "Establishment of an organic word-of-mouth referral flywheel that reduces blended CAC"
        ],
        keyCapabilities: [
            { title: "Cohort Re-Order Curve Analysis", desc: "Track 30, 60, and 90-day repeat purchase rates across customer acquisition vintages." },
            { title: "Consumer Sean Ellis PMF Survey", desc: "Measure the percentage of buyers who would be 'very disappointed' if your brand ceased to exist." },
            { title: "Cart Abandonment Loop Optimization", desc: "Identify and resolve friction points causing drop-offs between cart addition and payment." }
        ],
        statCards: [
            {
                label: "Repeat Purchase Rate",
                value: "38.5% in 60d",
                subtitle: "Benchmark for Category is 22%",
                description: "Percentage of first-time buyers who place a second order within 60 days of initial delivery.",
                methodology: "Calculated across trailing 6 monthly customer acquisition cohorts in Shopify analytics.",
                badge: "Repeat Velocity",
                icon: "ShoppingBag"
            },
            {
                label: "90-Day Cohort Retention",
                value: "44.2%",
                subtitle: "Active Purchasing Customers",
                description: "Proportion of acquired consumers remaining active subscribers or repeat purchasers after 3 months.",
                methodology: "Tracked in subscription telemetry and e-commerce cohort retention curves.",
                badge: "Cohort Retention",
                icon: "TrendingUp"
            },
            {
                label: "Product Adoption & First Use",
                value: "94.0%",
                subtitle: "Opened Within 48 Hours",
                description: "Percentage of delivered consumers who unbox and use the product within 48 hours of doorstep arrival.",
                methodology: "Measured via post-delivery SMS check-in automated survey response data.",
                badge: "First Use Rate",
                icon: "CheckCircle2"
            },
            {
                label: "Net Promoter Score (NPS)",
                value: "+68 NPS",
                subtitle: "World-Class Consumer Benchmark",
                description: "Consumer willingness to recommend the brand to friends and family without compensation.",
                methodology: "Standardized NPS survey administered 14 days after product delivery across 500+ consumers.",
                badge: "NPS Score",
                icon: "Sparkles"
            },
            {
                label: "Cart Abandonment Recovery",
                value: "26.4%",
                subtitle: "Recovered via SMS & Email",
                description: "Percentage of abandoned checkout sessions successfully recovered through automated workflows.",
                methodology: "Tracked across dynamic SMS and personalized email recovery sequences with 1-click cart restore.",
                badge: "Cart Recovery",
                icon: "DollarSign"
            },
            {
                label: "PMF Evidentiary Confidence",
                value: "High (90/100)",
                subtitle: "Strong Consumer Pull Confirmed",
                description: "Comprehensive score confirming product indispensability, organic referral, and sustainable unit economics.",
                methodology: "Synthesized from repeat rate, NPS, organic brand search growth, and subscription LTV.",
                badge: "Confidence Score",
                icon: "ShieldCheck"
            }
        ],
        icpProfiles: [
            {
                name: "The Loyal Brand Advocate Consumer",
                category: "Ideal Retained Cohort",
                industryOrContext: "D2C Consumables, Skincare, Nutrition",
                scaleOrProfile: "Subscribed Consumer · 4+ Orders / Year",
                buyerCommitteeOrRoles: ["Individual Consumer"],
                painPoints: [
                    "Wants uninterrupted auto-delivery of essential daily products",
                    "Expects rewards, loyalty perks, and early access to new releases",
                    "Recommends favorite brands enthusiastically in social group chats"
                ],
                buyingTriggers: ["Subscription renewal reminder", "Exclusive limited-edition VIP drop"],
                desiredOutcomes: ["Seamless daily routine, VIP recognition, consistent product quality"],
                budgetConsiderations: "Enrolled in auto-replenishment subscription (saves 15%); high lifetime value ($300+).",
                qualificationCriteria: ["Placed 2+ orders", "Subscribed to SMS alerts"],
                recommendedApproach: "Enroll in tiered VIP rewards program with surprise gifts on milestone orders."
            }
        ],
        interactiveTabs: [
            {
                id: "overview",
                label: "Overview",
                title: "B2C Product-Market Fit Architecture",
                summary: "Proving your product creates genuine consumer delight and recurring habits.",
                details: [
                    { heading: "The Truth", text: "Anyone can sell a product once with aggressive ads. Product-Market Fit is proven only when the customer buys a second and third time." }
                ]
            },
            {
                id: "market-opportunity",
                label: "Cohort Retention",
                title: "Flattening the Retention Curve",
                summary: "Analyzing repeat purchase rates across monthly cohorts.",
                details: [
                    { heading: "Healthy Curve", text: "The retention curve drops initially and then stabilizes horizontally, indicating a core group of lifetime buyers." }
                ]
            },
            {
                id: "demand-validation",
                label: "Word-of-Mouth",
                title: "Measuring Organic Referral Velocity",
                summary: "Tracking the percentage of new customers who arrive without paid ad attribution.",
                details: [
                    { heading: "Organic Multiplier", text: "For every 10 customers acquired through paid ads, 3 additional customers should arrive via word-of-mouth." }
                ]
            },
            {
                id: "customer-segments-icp",
                label: "Segments & ICP",
                title: "Hero SKU Identification",
                summary: "Identifying which specific product variant drives 80% of repeat purchases.",
                details: [
                    { heading: "Product Focus", text: "Kill low-retention secondary SKUs and focus 90% of marketing budget on the Hero SKU." }
                ]
            },
            {
                id: "metrics-roi",
                label: "Metrics & ROI",
                title: "LTV-to-CAC Ratio Over Time",
                summary: "How strong repeat rates transform unit economics.",
                details: [
                    { heading: "The Power of Retention", text: "A customer acquired for $30 who orders 4 times at $60 generates $240 in revenue with zero additional ad cost." }
                ]
            },
            {
                id: "gtm-strategy",
                label: "Go-to-Market Strategy",
                title: "Subscription & Loyalty Strategy",
                summary: "Building an effortless subscription experience that avoids involuntary churn.",
                details: [
                    { heading: "Frictionless Subscriptions", text: "Allow customers to skip, pause, or change delivery cadence with 1 click from an SMS." }
                ]
            }
        ],
        executionMethodology: [
            { stage: "Stage 1", title: "Cohort Retention Audit", action: "Analyze Shopify historical cohort data for repeat re-order rates.", deliverable: "Cohort Retention Audit Report" },
            { stage: "Stage 2", title: "Consumer PMF Survey", action: "Deploy Sean Ellis PMF survey to 500 verified past buyers.", deliverable: "Consumer PMF Report" },
            { stage: "Stage 3", title: "Checkout Drop-Off Heatmapping", action: "Analyze session recordings to identify cart abandonment friction.", deliverable: "Checkout Friction Diagnostic" },
            { stage: "Stage 4", title: "Abandonment Recovery Flow", action: "Rebuild 3-step dynamic SMS and email cart recovery sequence.", deliverable: "Automated Cart Recovery Engine" },
            { stage: "Stage 5", title: "Subscription & Loyalty Overhaul", action: "Redesign subscription portal to allow 1-click skips and flavor swaps.", deliverable: "Optimized Retention & Loyalty Suite" }
        ],
        kpiMeasurement: [
            { metric: "60-Day Repeat Purchase Rate", definition: "Percentage of customers who place another order within 60 days.", whyItMatters: "Single best indicator of B2C product-market fit.", cadence: "Monthly" },
            { metric: "Net Promoter Score (NPS)", definition: "Promoters minus Detractors on standard 0-10 scale.", whyItMatters: "Measures organic word-of-mouth referral power.", cadence: "Monthly" }
        ],
        faqs: [
            { question: "What is considered a good repeat purchase rate for D2C e-commerce?", answer: "For consumables (food, beverage, supplements, skincare), 30% to 45% within 90 days indicates strong PMF. For non-consumables (apparel, home), 15% to 25% annual repeat is healthy." },
            { question: "How do you reduce subscription churn?", answer: "Give customers full control. Brands that make it easy to pause or skip upcoming shipments via SMS have significantly lower churn than brands that force customers through rigid cancellation funnels." }
        ]
    }
};
