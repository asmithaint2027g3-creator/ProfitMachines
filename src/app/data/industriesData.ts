export interface IndustryKPI {
    value: string;
    label: string;
    desc: string;
}

export interface IndustrySolutionItem {
    title: string;
    linkPath: string;
    iconName: string;
    modules: string[];
}

export interface IndustryBlueprint {
    id: string;
    slugId: string;
    aliases: string[];
    category: string;
    categoryLabel: string;
    badge: string;
    title: string;
    tagline: string;
    description: string;
    image?: string;
    kpis: IndustryKPI[];
    challenges: string[];
    methodologies: string[];
    solutions: IndustrySolutionItem[];
    outcome: string;
}

export const industryCategories = [
    { id: 'all', label: 'All Industries' },
    { id: 'b2b', label: 'B2B & Professional Services' },
    { id: 'saas', label: 'Technology & SaaS' },
    { id: 'fintech', label: 'Financial Services & FinTech' },
    { id: 'manufacturing', label: 'Manufacturing & Industrial' },
    { id: 'healthcare', label: 'Healthcare & Life Sciences' },
    { id: 'retail', label: 'Retail & E-commerce' },
    { id: 'real-estate', label: 'Real Estate & Construction' },
    { id: 'education', label: 'Education & EdTech' },
    { id: 'logistics', label: 'Logistics & Supply Chain' },
    { id: 'consumer', label: 'Consumer & Local Services' }
];

export const industriesData: IndustryBlueprint[] = [
    {
        id: "b2b-services",
        slugId: "b2b-services",
        aliases: ["b2b", "b2b-focus", "abm-autopilot", "competitor-displacement", "ai-sdr-copilot", "rql-predictor", "contract-expansion", "services"],
        category: "b2b",
        categoryLabel: "B2B & Professional Services",
        badge: "ENTERPRISE B2B & CONSULTING",
        title: "Autonomous Pipeline Generation, Account Intelligence & Enterprise Deal Velocity",
        tagline: "High-value corporate buyer mapping, multi-stakeholder intent alignment, and automated sales pipeline acceleration.",
        description: "Professional services and B2B enterprises face protracted 9-to-18 month sales cycles, complex buying committees, and escalating customer acquisition costs. ProfitMachines orchestrates automated account-based intelligence, continuous buying intent surveillance, and data-driven pipeline qualification so commercial teams focus exclusively on high-probability deals.",
        image: "/images/hero-enterprise-board.jpg",
        kpis: [
            {
                value: "3.8×",
                label: "Pipeline Velocity Acceleration",
                desc: "Compresses opportunity-to-close timelines by automating multi-stakeholder buying committee engagement."
            },
            {
                value: "54%",
                label: "Targeted CAC Reduction",
                desc: "Eliminates low-yield outbound waste by filtering strictly for verified high-propensity buying intent signals."
            },
            {
                value: "82%",
                label: "Executive Meeting Conversion",
                desc: "Secures C-suite engagement through automated corporate 10-K alignment and economic proof packs."
            }
        ],
        challenges: [
            "Sales reps spending 60%+ of their working hours on manual prospect discovery and routine data entry",
            "Enterprise deals stalling repeatedly at C-suite sign-off due to generic proposals lacking quantified CFO-ready ROI",
            "Uncoordinated outbound campaigns creating lead fatigue and low response rates across saturated corporate inboxes",
            "Siloed sales and marketing databases preventing unified visibility into active buying committee intentions"
        ],
        methodologies: [
            "Account-Based Intent Scoring",
            "Committee Matrix Mapping",
            "Throughput RevOps",
            "Dynamic Playbook Orchestration",
            "Executive Value Engineering"
        ],
        solutions: [
            {
                title: "AI Account-Based Marketing (ABM) Autopilot",
                linkPath: "/offerings/b2b/market-discovery",
                iconName: "Target",
                modules: [
                    "Automated target account ingestion and corporate structure mapping",
                    "Dynamic intent signal sync triggering personalized executive messaging vectors",
                    "Real-time cross-channel advertising and bespoke landing page deployment"
                ]
            },
            {
                title: "AI SDR Co-Pilot / Autopilot",
                linkPath: "/solutions#sales-optimization",
                iconName: "Bot",
                modules: [
                    "24/7 autonomous outbound prospecting and multi-touch email sequence execution",
                    "Real-time commercial objection handling and executive calendar synchronization",
                    "Zero prospect drop-off with automated context-aware meeting preparation"
                ]
            },
            {
                title: "AI Revenue Qualified Lead (RQL) Predictor",
                linkPath: "/solutions#ai-revenue-operations",
                iconName: "TrendingUp",
                modules: [
                    "Predictive deal close probability scoring based on stakeholder engagement sentiment",
                    "Early warning detection for stalling accounts and deal slip risks",
                    "Board-ready quarterly pipeline revenue forecasting with 92%+ historical precision"
                ]
            }
        ],
        outcome: "Systematically eliminate outbound guesswork, compress 12-month enterprise sales cycles by 40%, and achieve predictable multi-million-dollar ARR pipeline generation."
    },
    {
        id: "technology-saas",
        slugId: "technology-saas",
        aliases: ["saas", "saas-products", "tech", "software", "enterprise-software"],
        category: "saas",
        categoryLabel: "Technology & SaaS",
        badge: "SOFTWARE & ENTERPRISE SAAS",
        title: "Bridge Product-Led and Sales-Led Motions to Maximize Net Revenue Retention",
        tagline: "Early buying signal discovery, seat expansion telemetry, and automated trial-to-paid conversion.",
        description: "Software companies struggle with soaring CAC inflation, free trial users failing to convert, and reactive customer success models that trigger churn at renewal windows. ProfitMachines bridges product usage telemetry with sales motions, detecting high-intent account thresholds and orchestrating proactive upsell campaigns.",
        image: "/images/industry-saas.png",
        kpis: [
            {
                value: "2.8×",
                label: "Trial-to-Paid Conversion Lift",
                desc: "Behavioral telemetry triggers timely sales intervention at peak product activation moments."
            },
            {
                value: "40%",
                label: "ARR Compounding Expansion",
                desc: "Predictive seat and feature utilization triggers alert account teams before annual renewals."
            },
            {
                value: "66%",
                label: "Sales Cycle Compression",
                desc: "Automated security validation and enterprise compliance packs accelerate procurement approval."
            }
        ],
        challenges: [
            "High product-led signup volume producing disproportionately low enterprise sales-ready pipeline",
            "Sales and CSM teams lacking real-time visibility into account seat saturation and upsell readiness",
            "Competitor discounting and commoditization leading to unexpected churn during annual renewal cycles",
            "Lengthy procurement reviews stalling software rollout due to missing security and compliance documentation"
        ],
        methodologies: [
            "Product-Market Fit Scoring",
            "Cohort Retention Analytics",
            "NRR Expansion Triggers",
            "PLG Intent Harvesting",
            "Churn Risk Sentinel"
        ],
        solutions: [
            {
                title: "AI Contract & Expansion Opportunity Finder",
                linkPath: "/solutions#sales-optimization",
                iconName: "Zap",
                modules: [
                    "Continuous monitoring of account feature consumption and user threshold alerts",
                    "Automated upsell playbooks deployed to customer success managers at peak usage",
                    "Proactive identification of inactive seats to prevent renewal downsizing"
                ]
            },
            {
                title: "AI Competitor Displacement Engine",
                linkPath: "/solutions#ai-demand-discovery",
                iconName: "ShieldCheck",
                modules: [
                    "Surfaces rival platform downtime, pricing spikes, and customer dissatisfaction signals",
                    "Automated displacement campaigns targeting dissatisfied competitor user cohorts",
                    "Tailored migration ROI calculators and competitive feature comparison matrices"
                ]
            },
            {
                title: "AI Product-Market Fit Signal Engine",
                linkPath: "/offerings/b2b/product-market-fit-discovery",
                iconName: "Sparkles",
                modules: [
                    "Data-backed PMF scoring across retention cohorts and feature adoption rates",
                    "Validation of custom enterprise roadmap requests to protect engineering runway",
                    "Investor-ready cohort retention curves and viral expansion metrics"
                ]
            }
        ],
        outcome: "Elevate Net Revenue Retention (NRR) past 130%, convert product engagement into predictable ARR, and build a defensible competitive moat."
    },
    {
        id: "financial-services-fintech",
        slugId: "financial-services-fintech",
        aliases: ["fintech", "banking", "financial-services", "fintech-saas", "fintech-lending", "bfsi"],
        category: "fintech",
        categoryLabel: "Financial Services & FinTech",
        badge: "BFSI & FINTECH PLATFORMS",
        title: "High-Trust Acquisition, Risk-Calibrated Lead Scoring & Frictionless Onboarding",
        tagline: "Compliant applicant qualification, underwriting friction reduction, and lifetime value optimization.",
        description: "Banking institutions, digital lenders, and wealth platforms operate under rigorous compliance mandates while battling severe CAC inflation on aggregator channels. ProfitMachines isolates credit-ready, compliant applicants, reduces KYC/underwriting drop-off, and automates multi-product lifecycle cross-selling.",
        image: "/images/industry-fintech.png",
        kpis: [
            {
                value: "45%",
                label: "Verified CAC Reduction",
                desc: "Eliminates spend on unqualified applicants via automated credit readiness and intent scoring."
            },
            {
                value: "2.5×",
                label: "Approval-Ready Leads",
                desc: "Pre-screened financial applicant data matched strictly to institutional underwriting criteria."
            },
            {
                value: "50%",
                label: "Faster Disbursement Turnaround",
                desc: "Automated documentation collection and risk verification accelerating time-to-funded account."
            }
        ],
        challenges: [
            "Skyrocketing acquisition costs across financial aggregators with sub-15% final loan or account approval yields",
            "Complex regulatory documentation (KYC, AML) causing severe applicant drop-offs during digital onboarding",
            "Advisors and loan officers overwhelmed by low-intent inquiries that never convert to funded accounts",
            "Difficulty discovering and engaging high-net-worth individuals in need of wealth advisory services"
        ],
        methodologies: [
            "Readiness Propensity Scoring",
            "KYC Drop-off Prevention",
            "LTV-to-CAC Ratio Maximization",
            "Compliance-First Funnels",
            "Wealth Intent Triggering"
        ],
        solutions: [
            {
                title: "AI Demand & Propensity Discovery",
                linkPath: "/offerings/b2b/demand-discovery",
                iconName: "Search",
                modules: [
                    "Identifies compliant, high-intent consumer and commercial borrower cohorts before rivals bid",
                    "Pre-scores applicant financial propensity and credit documentation readiness",
                    "Reduces reliance on expensive third-party lead aggregator brokers"
                ]
            },
            {
                title: "Bank-Grade Conversion Qualification Engine",
                linkPath: "/solutions#ai-revenue-operations",
                iconName: "Landmark",
                modules: [
                    "Automated intake screening against central regulatory guidelines and underwriting standards",
                    "Contextual nudges on incomplete applications to recover abandoned onboarding flows",
                    "Continuous compliance audit trail generation and model risk transparency"
                ]
            },
            {
                title: "Automated Wealth Advisory & Renewal Cross-Sell",
                linkPath: "/solutions#hidden-revenue-capture",
                iconName: "Coins",
                modules: [
                    "Detects financial lifecycle milestones triggering relevant insurance and investment needs",
                    "Automates personalized advisor outreach tailored to portfolio diversification goals",
                    "Elevates client account density and lifetime value retention"
                ]
            }
        ],
        outcome: "Maximize funded account conversion, cut customer acquisition costs by 45%, and build an institutional-grade loan and deposit generation engine."
    },
    {
        id: "manufacturing-industrial",
        slugId: "manufacturing-industrial",
        aliases: ["manufacturing", "industrial", "industrial-industries", "industrial-manufacturing", "oem"],
        category: "manufacturing",
        categoryLabel: "Manufacturing & Industrial",
        badge: "DISCRETE & PROCESS INDUSTRIAL",
        title: "Industrial Demand Discovery, OEM-Dealer Synchronization & Cycle Compression",
        tagline: "Plant equipment replacement cycle sensing, dealer opportunity routing, and tender pipeline acceleration.",
        description: "Capital equipment manufacturers and industrial suppliers operate through complex distributor tiers and multi-year procurement cycles. ProfitMachines shifts operations from speculative supply-push to precision demand-pull, detecting facility replacement triggers and synchronizing OEM marketing directly with authorized regional dealers.",
        image: "/images/industry-manufacturing.png",
        kpis: [
            {
                value: "47%",
                label: "Sales Cycle Compression",
                desc: "Accelerated quote-to-order turnaround through automated engineering specification pre-clearing."
            },
            {
                value: "2.4×",
                label: "Dealer Network Pipeline Yield",
                desc: "Direct allocation of factory-verified commercial leads to authorized regional distributor networks."
            },
            {
                value: "3.5×",
                label: "Procurement Reach Expansion",
                desc: "Systematic mapping of corporate engineering heads and procurement chiefs across tier-1 supply chains."
            }
        ],
        challenges: [
            "Zero visibility into factory machine wear, expansion plans, and capital equipment replacement cycles",
            "Friction between OEM marketing campaigns and regional dealer sales follow-up creating massive lead decay",
            "Slow, manual engineering quote turnarounds causing buyers to consider alternative international suppliers",
            "Multi-stakeholder plant buying committees involving plant managers, safety heads, and corporate procurement"
        ],
        methodologies: [
            "Replacement Cycle Modeling",
            "OEM-Dealer Co-Selling",
            "Plant Telemetry Intent",
            "Throughput Accounting",
            "Tender Window Prediction"
        ],
        solutions: [
            {
                title: "Industrial Demand & Replacement Signal Engine",
                linkPath: "/offerings/b2b/demand-discovery",
                iconName: "Factory",
                modules: [
                    "Surfaces factory capacity expansions, new facility permits, and equipment vintage signals",
                    "Identifies corporate capital expenditure announcements across industrial clusters",
                    "Predicts scheduled maintenance and overhaul cycles before official RFPs are released"
                ]
            },
            {
                title: "Dealer Alignment & Opportunity Distribution",
                linkPath: "/solutions#sales-optimization",
                iconName: "Workflow",
                modules: [
                    "Automatically dispatches verified equipment inquiries to certified local distributors",
                    "Enforces 24-hour dealer follow-up SLAs with automated performance dashboards",
                    "Provides co-branded technical sales collateral and commercial pricing calculators"
                ]
            },
            {
                title: "Digital Procurement Outreach Autopilot",
                linkPath: "/solutions#ai-revenue-acceleration",
                iconName: "Rocket",
                modules: [
                    "Maps vendor registration portals and supply chain tender requirements systematically",
                    "Generates tailored technical specification compliance documentation for engineering buyers",
                    "Tracks long-cycle EPC infrastructure tenders with automated milestone engagement"
                ]
            }
        ],
        outcome: "Transform legacy distributor networks into coordinated revenue channels and win high-margin industrial OEM supply agreements."
    },
    {
        id: "healthcare-life-sciences",
        slugId: "healthcare-life-sciences",
        aliases: ["healthcare", "life-sciences", "biotech", "pharma", "hospitals", "medical"],
        category: "healthcare",
        categoryLabel: "Healthcare & Life Sciences",
        badge: "CLINICAL & HEALTHCARE SYSTEMS",
        title: "HIPAA-Compliant Patient Acquisition, Institutional Trust & Intake Acceleration",
        tagline: "Encrypted patient intake qualification, clinical authority positioning, and hospital committee access.",
        description: "Healthcare providers, diagnostic networks, and life sciences companies must navigate strict privacy mandates while driving commercial growth. ProfitMachines automates compliant intake qualification, optimizes appointment scheduling, and builds institutional authority with healthcare networks and hospital procurement boards.",
        image: "/images/industry-healthcare.png",
        kpis: [
            {
                value: "3.2×",
                label: "Appointment Booking Lift",
                desc: "Real-time clinical intake triage matching patient inquiries accurately to provider specialties."
            },
            {
                value: "42%",
                label: "Patient Acquisition Cost Reduction",
                desc: "Organic intent discovery reducing dependency on hyper-competitive medical pay-per-click terms."
            },
            {
                value: "100%",
                label: "HIPAA Compliance Assurance",
                desc: "Zero-data-leakage architecture strictly safeguarding Protected Health Information (PHI)."
            }
        ],
        challenges: [
            "Prospective patients abandoning intake forms due to clinical ambiguity, delayed call-backs, or confusing options",
            "Severe privacy restrictions (HIPAA, GDPR) limiting standard digital retargeting and marketing analytics",
            "High cost per confirmed appointment on search engines compounded by high patient no-show rates",
            "Medtech and life sciences sales teams struggling to navigate complex hospital procurement committees"
        ],
        methodologies: [
            "Compliant Intent Routing",
            "Intake Velocity Optimization",
            "Institutional Trust Auditing",
            "No-Show Minimization",
            "Clinical Authority Signaling"
        ],
        solutions: [
            {
                title: "Compliant Demand Intake Engine",
                linkPath: "/solutions#sales-optimization",
                iconName: "HeartPulse",
                modules: [
                    "Encrypted, HIPAA-compliant patient intake screening and appointment slot recommendations",
                    "Automated SMS/WhatsApp appointment confirmations and clinical prep instructions",
                    "Reduces front-desk phone congestion while accelerating patient booking confirmation"
                ]
            },
            {
                title: "Medical Reputation & Trust Acceleration",
                linkPath: "/solutions#ai-reputation-acceleration",
                iconName: "ShieldCheck",
                modules: [
                    "Showcases verified treatment outcomes, physician credentials, and academic accreditations",
                    "Automated post-care patient satisfaction loops capturing positive verified clinical reviews",
                    "Establishes undisputed specialty authority across regional search territories"
                ]
            },
            {
                title: "Healthcare Enterprise Committee Mapping",
                linkPath: "/offerings/b2b/market-discovery",
                iconName: "Users",
                modules: [
                    "Maps medical directors, procurement heads, and chief medical officers across hospital chains",
                    "Deploys evidence-based clinical efficacy studies tailored to hospital budget priorities",
                    "Accelerates formulary and medical device tender approvals"
                ]
            }
        ],
        outcome: "Expand patient booking volume, maximize diagnostic facility capacity, and secure high-value institutional healthcare contracts."
    },
    {
        id: "retail-ecommerce",
        slugId: "retail-ecommerce",
        aliases: ["retail", "ecommerce", "d2c", "d2c-retail", "fmcg", "retail-fmcg"],
        category: "retail",
        categoryLabel: "Retail & E-commerce",
        badge: "RETAIL & OMNICHANNEL CONSUMER",
        title: "Predictive Intent Separation, Margin-Safe Dynamic Offers & Cart Recovery",
        tagline: "Window shopper vs buyer intent triage, real-time margin preservation, and sub-5-minute cart recovery loops.",
        description: "Retailers and consumer brands battle escalating ad acquisition costs and declining profit margins. ProfitMachines separates casual window shoppers from high-propensity buyers in real-time, executing dynamic margin-protected discounts and automated omnichannel recovery loops.",
        image: "/images/industry-retail.png",
        kpis: [
            {
                value: "34%",
                label: "Checkout Conversion Uplift",
                desc: "1:1 dynamic personalized offer triggers driving immediate purchase urgency without eroding margin."
            },
            {
                value: "40%",
                label: "Ad Network CAC Reduction",
                desc: "Algorithmic budget reallocation toward high-converting buyer cohorts and intent signals."
            },
            {
                value: "2.8×",
                label: "Repeat Purchase Compounding",
                desc: "Predictive replenishment alerts re-engaging consumer cohorts at peak repurchase windows."
            }
        ],
        challenges: [
            "Cart abandonment rates exceeding 70% with standard delayed email blasts producing diminishing returns",
            "Escalating customer acquisition costs eroding product gross margins across major social ad channels",
            "Blanket promo codes devaluing brand positioning and training shoppers to never purchase at full retail price",
            "Fragmented consumer touchpoints across mobile apps, online storefronts, and physical brick-and-mortar stores"
        ],
        methodologies: [
            "Margin-Protected Dynamic Pricing",
            "Cart Bounce Telemetry",
            "LTV Cohort Lookalike Scaling",
            "Omnichannel Recovery Cadence",
            "Replenishment Modeling"
        ],
        solutions: [
            {
                title: "AI Personalized Offer Generation at Scale",
                linkPath: "/industries/b2c#personalized-offers",
                iconName: "Sparkles",
                modules: [
                    "Calculates individual shopper price elasticity in real-time based on session behavior and cart value",
                    "Deploys dynamic, time-limited discount vouchers preserving minimum product gross margin targets",
                    "Increases checkout conversion velocity for hesitant high-value consumers"
                ]
            },
            {
                title: "AI Behavioral Retargeting Autopilot",
                linkPath: "/industries/b2c#behavioral-retargeting",
                iconName: "TrendingUp",
                modules: [
                    "Captures exact abandonment cart context and initiates contextual recovery sequences in under 5 minutes",
                    "Coordinates multi-channel SMS and email cadences with personalized product recommendations",
                    "Recovers hundreds of thousands in abandoned cart revenue on automated autopilot"
                ]
            },
            {
                title: "AI Lookalike Audience Auto-Scaling",
                linkPath: "/industries/b2c#lookalike-audience",
                iconName: "Users",
                modules: [
                    "Continuously syncs verified high-LTV customer seed lists with major advertising networks",
                    "Suppresses fatigued creative assets and targets fresh lookalike buyer cohorts automatically",
                    "Maintains profitable ROAS thresholds during peak seasonal promotional events"
                ]
            }
        ],
        outcome: "Unlock sustainable consumer unit economics, recover abandoned cart revenue on autopilot, and build compounding repeat customer sales."
    },
    {
        id: "real-estate-construction",
        slugId: "real-estate-construction",
        aliases: ["real-estate", "construction", "real-estate-energy", "property", "infrastructure"],
        category: "real-estate",
        categoryLabel: "Real Estate & Construction",
        badge: "REAL ESTATE & INFRASTRUCTURE",
        title: "High-Intent Buyer Discovery, Site-Visit Automation & Inventory Velocity",
        tagline: "Pre-screened buyer purchasing power qualification, viewing scheduling automation, and institutional capital trust.",
        description: "Property developers and commercial builders contend with thousands of low-intent digital inquiries, slow site inspection conversions, and mounting debt costs tied to unsold inventory. ProfitMachines qualifies buyer purchasing power and automates private tour bookings to compress inventory sales cycles.",
        image: "/images/hero-profit-pool.png",
        kpis: [
            {
                value: "2.6×",
                label: "Booking Velocity Acceleration",
                desc: "Automated qualification identifying genuine buyer timeline and verified financing capacity."
            },
            {
                value: "40%",
                label: "Inventory Cycle Compression",
                desc: "Faster inventory turnover reducing holding debt expenses across residential and commercial phases."
            },
            {
                value: "50%",
                label: "Broker Productivity Lift",
                desc: "Sales agents focus exclusively on confirmed, pre-screened buyers with clear budget readiness."
            }
        ],
        challenges: [
            "Digital marketing campaigns generating hundreds of casual inquiries with sub-5% physical site-visit show rates",
            "Sales teams spending valuable selling hours calling unresponsive leads or non-qualified speculators",
            "High carrying costs on unsold luxury units during macroeconomic and interest rate shifts",
            "Commercial infrastructure developers struggling to present structured risk evidence to institutional financiers"
        ],
        methodologies: [
            "Purchasing Power Qualification",
            "Site-Visit Commitment Loops",
            "Broker Network Orchestration",
            "Institutional Capital Positioning",
            "Phase Velocity Management"
        ],
        solutions: [
            {
                title: "High-Intent Real Estate Buyer Discovery",
                linkPath: "/offerings/b2b/demand-discovery",
                iconName: "Home",
                modules: [
                    "Filters prospective buyers by investment readiness, property portfolio size, and financing status",
                    "Eliminates speculative leads to safeguard sales team focus and commercial energy",
                    "Prioritizes high-net-worth inquiries for private VIP viewing allocations"
                ]
            },
            {
                title: "Site-Visit & Viewing Automation Co-Pilot",
                linkPath: "/solutions#sales-optimization",
                iconName: "Calendar",
                modules: [
                    "Automates multi-channel SMS and WhatsApp tour scheduling with calendar synchronization",
                    "Sends instant directions, property spec sheets, and automated appointment confirmations",
                    "Dramatically increases physical site inspection arrival rates"
                ]
            },
            {
                title: "Investor Confidence & Structural Risk Auditing",
                linkPath: "/solutions#ai-reputation-acceleration",
                iconName: "Building2",
                modules: [
                    "Compiles regulatory compliance proofs, architectural certifications, and financial milestone models",
                    "Builds institutional investor trust packs for commercial debt and equity financing",
                    "Accelerates capital deployment for large-scale development phases"
                ]
            }
        ],
        outcome: "Sell out development phases quarters ahead of schedule, drastically reduce inventory carrying costs, and optimize return on invested capital."
    },
    {
        id: "education-edtech",
        slugId: "education-edtech",
        aliases: ["education", "edtech", "schools", "universities", "training", "higher-ed"],
        category: "education",
        categoryLabel: "Education & EdTech",
        badge: "HIGHER ED & EDTECH PLATFORMS",
        title: "Enrollment Readiness Scoring, Counselor Efficiency & Program-Fit Optimization",
        tagline: "Candidate readiness profiling, counselor screening offload, and verified placement outcome proof.",
        description: "Educational institutions and online learning platforms manage heavy inquiry spikes that yield disappointingly low final matriculations. ProfitMachines scores candidate readiness, automates administrative follow-ups, and empowers admissions counselors to focus exclusively on committed learners.",
        image: "/images/hero-data-intelligence.png",
        kpis: [
            {
                value: "45%",
                label: "Enrollment Yield Lift",
                desc: "Predictive candidate readiness scoring prioritizing applicants with strong program affinity."
            },
            {
                value: "40%",
                label: "Counselor Time Reclaimed",
                desc: "Autonomous conversational screening eliminating repetitive administrative inquiry qualification."
            },
            {
                value: "2.8×",
                label: "Faster Admissions Decisions",
                desc: "Automated document verification and tuition financing guidance accelerating seat confirmation."
            }
        ],
        challenges: [
            "High inquiry volumes during seasonal admission cycles resulting in sub-5% final enrollment yields",
            "Admissions counselors overwhelmed by unqualified leads and spending hours on unanswered phone calls",
            "Severe applicant drop-off between initial application submission and final tuition deposit",
            "Prospective students and parents hesitant to commit due to lack of transparent graduate career outcome data"
        ],
        methodologies: [
            "Learner Readiness Profiling",
            "Admissions Velocity Modeling",
            "Financing Assistance Nudging",
            "Institutional Authority Building",
            "Parent Trust Engineering"
        ],
        solutions: [
            {
                title: "Learner Propensity & Program Match Engine",
                linkPath: "/offerings/b2b/customer-discovery",
                iconName: "GraduationCap",
                modules: [
                    "Evaluates applicant educational background and career goals to recommend the highest-fit program",
                    "Identifies scholarship and financing eligibility automatically to remove financial hesitation",
                    "Screens out uncommitted inquiries to preserve counselor bandwidth"
                ]
            },
            {
                title: "Autonomous Admissions Outreach Co-Pilot",
                linkPath: "/solutions#sales-optimization",
                iconName: "Bot",
                modules: [
                    "Answers student curriculum questions and admission prerequisites instantly over chat and WhatsApp",
                    "Schedules one-on-one admissions interviews directly into counselor calendars",
                    "Sends automated deadline reminders for transcript submissions and fee deposits"
                ]
            },
            {
                title: "Institutional Reputation & Placement Trust Layer",
                linkPath: "/solutions#ai-reputation-acceleration",
                iconName: "ShieldCheck",
                modules: [
                    "Showcases verified alumni hiring statistics, median salary outcomes, and corporate employer partners",
                    "Strengthens institutional credibility with parents through transparent placement metrics",
                    "Accelerates enrollment decision velocity across competitive program options"
                ]
            }
        ],
        outcome: "Fill academic programs with high-retention learners, lower cost per enrolled student, and establish unquestioned institutional authority."
    },
    {
        id: "logistics-supply-chain",
        slugId: "logistics-supply-chain",
        aliases: ["logistics", "supply-chain", "freight", "warehousing", "transportation"],
        category: "logistics",
        categoryLabel: "Logistics & Supply Chain",
        badge: "FREIGHT & GLOBAL LOGISTICS",
        title: "Enterprise Shipper Acquisition, Contract Opportunity Discovery & Margin Protection",
        tagline: "Commercial shipper tender mapping, lane profitability modeling, and strategic carrier partner alliances.",
        description: "Freight forwarders, contract logistics providers, and 3PLs navigate volatile spot freight rates and aggressive price wars. ProfitMachines maps high-volume enterprise shippers, identifies upcoming annual contract tender windows, and equips commercial teams to win high-margin dedicated lanes.",
        image: "/images/hero-market-radar.jpg",
        kpis: [
            {
                value: "3.2×",
                label: "Shipper Pipeline Growth",
                desc: "Automated discovery of manufacturing and retail shippers with expanding freight volume demands."
            },
            {
                value: "30%",
                label: "Contract Margin Improvement",
                desc: "Focusing sales outreach on specialized high-margin lanes rather than commoditized spot auctions."
            },
            {
                value: "45%",
                label: "Quote Turnaround Acceleration",
                desc: "Automated lane pricing and equipment capacity matching converting quotes into confirmed freight."
            }
        ],
        challenges: [
            "Heavy dependence on low-margin spot freight boards with volatile, unpredictable shipment volume",
            "Commercial sales reps missing annual contract logistics tender deadlines for major enterprise shippers",
            "Delayed freight rate quoting causing prospective shippers to award loads to faster competitors",
            "Lack of intelligence on which regional shippers are currently suffering capacity bottlenecks"
        ],
        methodologies: [
            "Shipper Lane Intent Detection",
            "Tender Window Tracking",
            "Gross Margin Optimization",
            "Capacity Matching RevOps",
            "Network Co-Loading Alliances"
        ],
        solutions: [
            {
                title: "Enterprise Shipper Discovery Engine",
                linkPath: "/offerings/b2b/market-discovery",
                iconName: "Search",
                modules: [
                    "Analyzes trade registries, import customs data, and facility permits to surface high-volume shippers",
                    "Identifies manufacturing accounts experiencing transportation bottlenecks or expanding freight lanes",
                    "Delivers direct contact details for corporate logistics and supply chain directors"
                ]
            },
            {
                title: "Commercial Freight Deal Acceleration",
                linkPath: "/solutions#ai-revenue-acceleration",
                iconName: "TrendingUp",
                modules: [
                    "Automates RFP response workflows with pre-built lane performance and reliability proof points",
                    "Models contract lane profitability to prevent commercial reps from under-pricing complex freight",
                    "Compresses tender negotiation cycles from months to days"
                ]
            },
            {
                title: "Strategic Carrier & Warehouse Alliance Finder",
                linkPath: "/industries/enterprise#partnership-opportunity",
                iconName: "Briefcase",
                modules: [
                    "Discovers regional 3PL and warehousing partners to expand geographic bid capability",
                    "Orchestrates co-selling alliances for complex multi-modal international freight projects",
                    "Scales contract capacity without heavy capital asset expenditure"
                ]
            }
        ],
        outcome: "Lock in multi-year enterprise shipping contracts, transition away from low-margin spot freight boards, and protect operating margins."
    },
    {
        id: "consumer-local-services",
        slugId: "consumer-local-services",
        aliases: ["consumer", "local-services", "service-industrial", "franchise", "home-services"],
        category: "consumer",
        categoryLabel: "Consumer & Local Services",
        badge: "MULTI-LOCATION & LOCAL SERVICES",
        title: "High-Intent Local Discovery, Instant Booking Automation & Review Acceleration",
        tagline: "Sub-60-second inbound response, local directory dominance, and automated post-service review capture.",
        description: "Multi-location service franchises, professional clinics, and regional services battle customer call drop-offs and predatory lead aggregator fees. ProfitMachines captures high-urgency local demand, responds in under 60 seconds, and automates booking straight into service provider calendars.",
        image: "/images/hero-revenue-acceleration.png",
        kpis: [
            {
                value: "2.9×",
                label: "Local Booking Conversion",
                desc: "Sub-60-second automated response to incoming inquiries before competitors can answer."
            },
            {
                value: "48%",
                label: "Customer Acquisition Cost Reduction",
                desc: "Direct local intent capture bypassing shared-lead platforms that auction customers to 5 competitors."
            },
            {
                value: "85%",
                label: "Review Velocity Acceleration",
                desc: "Automated post-service satisfaction surveys capturing verified local customer Google reviews."
            }
        ],
        challenges: [
            "Over 40% of customer inquiries and calls going to voicemail during peak hours or after business hours",
            "Exorbitant fees paid to third-party lead aggregator brokers who sell the identical customer to five rivals",
            "Unmanaged negative reviews suppressing local map pack visibility and damaging consumer trust",
            "Inconsistent follow-up practices across distributed branch managers or franchise operators"
        ],
        methodologies: [
            "Local Urgency Sensing",
            "Sub-60s Response Automation",
            "Reputation Flywheel Acceleration",
            "Franchise GTM Standardization",
            "Territory Demand Mapping"
        ],
        solutions: [
            {
                title: "Instant Local Lead Qualification Co-Pilot",
                linkPath: "/solutions#sales-optimization",
                iconName: "Bot",
                modules: [
                    "Engages web and messaging inquiries in under 60 seconds with automated scheduling intelligence",
                    "Books verified appointments directly into branch or field technician calendars 24/7",
                    "Eliminates missed inquiry revenue during evenings, weekends, and holidays"
                ]
            },
            {
                title: "Local Digital Reputation & Trust Acceleration",
                linkPath: "/solutions#ai-reputation-acceleration",
                iconName: "ShieldCheck",
                modules: [
                    "Triggers automated post-appointment review requests via SMS after successful service delivery",
                    "Directs satisfied clients to Google Maps and verified directories to boost local search rank",
                    "Alerts management instantly to negative feedback for immediate resolution before public posting"
                ]
            },
            {
                title: "Hyper-Local Micro-Demand Mapping",
                linkPath: "/offerings/b2b/demand-discovery",
                iconName: "Target",
                modules: [
                    "Identifies underserved postal codes and high-income clusters ready for franchise territory expansion",
                    "Analyzes local competitor pricing and service gaps to position promotional offers",
                    "Maximizes regional market share with optimized local ad spend distribution"
                ]
            }
        ],
        outcome: "Capture 100% of local inbound demand, eliminate third-party lead broker commissions, and establish undisputed local market dominance."
    }
];
