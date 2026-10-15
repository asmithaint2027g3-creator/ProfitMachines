export interface VerticalKPI {
    name: string;
    benchmark?: string;
    explanation: string;
    whyItMatters: string;
}

export interface VerticalCapability {
    title: string;
    description: string;
    problemAddressed: string;
    expectedBusinessValue: string;
    linkPath: string;
}

export interface VerticalUseCase {
    title: string;
    scenario: string;
    application: string;
    outcome: string;
}

export interface VerticalOfferingLink {
    name: string;
    path: string;
}

export interface GrowthVertical {
    id: string;
    slug: string;
    number: string;
    name: string;
    shortName: string;
    tagline: string;
    description?: string;
    icon: string;
    badge: string;
    targetAudience: {
        headline: string;
        description: string;
        examples: string[];
    };
    challenges: Array<{
        title: string;
        impact: string;
    }>;
    capabilities: VerticalCapability[];
    kpis: VerticalKPI[];
    useCases: VerticalUseCase[];
    businessOutcomes: {
        summary: string;
        points: string[];
    };
    relevantOfferings: VerticalOfferingLink[];
}

export const solutionsVerticalsData: GrowthVertical[] = [
    {
        id: "b2b-growth-intelligence",
        slug: "b2b-growth-intelligence",
        number: "01",
        name: "B2B Growth Intelligence",
        shortName: "B2B Growth Intelligence",
        tagline: "Precision market segmentation, ideal customer profiling, and high-probability prospect prioritization.",
        icon: "Target",
        badge: "STRATEGIC PIPELINE ARCHITECTURE",
        targetAudience: {
            headline: "Mid-Market to Enterprise B2B Companies, Professional Services & Consultancies",
            description: "Built for B2B commercial leaders, founders, and sales organizations managing multi-stakeholder deals with 6-to-18 month sales cycles.",
            examples: [
                "Enterprise software and technical solutions providers",
                "Management consulting, legal, and professional service practices",
                "Corporate engineering, capital goods, and manufacturing suppliers"
            ]
        },
        challenges: [
            {
                title: "Poorly Defined or Static Ideal Customer Profiles (ICPs)",
                impact: "Sales reps pursue accounts that churn within 12 months or request endless non-standard custom features, eroding gross margins."
            },
            {
                title: "Low Account-to-Opportunity Conversion on Outbound",
                impact: "Cold outreach response rates stall under 2% as buyers ignore generic sales copy that fails to address specific corporate 10-K priorities."
            },
            {
                title: "Siloed Account Intent Data Across Disconnected Tools",
                impact: "Buying signals go unnoticed until a competitor is already short-listed and drafts the technical RFP specifications."
            },
            {
                title: "Subjective Deal Prioritization and Inaccurate Forecasting",
                impact: "Account executives focus on responsive but low-budget contacts rather than influential commercial decision-makers."
            }
        ],
        capabilities: [
            {
                title: "AI Account-Based Market Segmentation",
                description: "Dynamically models your total addressable market (TAM) into micro-tiers based on historical margin yield, deal velocity, and renewal stability.",
                problemAddressed: "Replaces broad, inaccurate industry lists with validated high-propensity account clusters.",
                expectedBusinessValue: "3× higher account engagement rates and prioritized sales rep time allocation.",
                linkPath: "/offerings/b2b/market-discovery"
            },
            {
                title: "Ideal Customer Profile (ICP) Scoring & Qualification",
                description: "Analyzes 40+ corporate telemetry data points—including tech stack adoption, hiring velocity, and revenue shifts—to grade inbound and target accounts.",
                problemAddressed: "Stops sales teams from wasting time on low-budget or high-support tire-kickers.",
                expectedBusinessValue: "50%+ reduction in unqualified discovery meetings.",
                linkPath: "/offerings/b2b/customer-discovery"
            },
            {
                title: "Predictive Buying Committee Intent Mapping",
                description: "Identifies hidden internal champions, technical evaluators, and economic buyers across target enterprise accounts.",
                problemAddressed: "Prevents single-threaded enterprise deals that stall when an internal sponsor changes roles.",
                expectedBusinessValue: "Accelerates deal advancement through committee sign-off by 35%.",
                linkPath: "/solutions#sales-optimization"
            }
        ],
        kpis: [
            {
                name: "Qualified Lead Rate (QLR)",
                benchmark: "3.5× Uplift",
                explanation: "The percentage of discovered accounts meeting strict economic buying criteria before outreach starts.",
                whyItMatters: "Directly protects sales rep capacity from low-yield meetings."
            },
            {
                name: "Lead-to-Opportunity Conversion",
                benchmark: "+45% Higher",
                explanation: "The rate at which initial discovery conversations advance to active, scoped pipeline proposals.",
                whyItMatters: "Validates that target accounts have genuine budget authority and immediate business need."
            },
            {
                name: "Customer Acquisition Cost (CAC)",
                benchmark: "35–50% Reduction",
                explanation: "Blended sales and marketing expenditure required to win a closed-won enterprise contract.",
                whyItMatters: "Improves cash runway and shortens payback period on commercial investments."
            }
        ],
        useCases: [
            {
                title: "Enterprise Account Penetration",
                scenario: "A technical services firm wanted to expand from small pilot projects into Fortune 1000 master service agreements.",
                application: "Deployed B2B Growth Intelligence to map parent-subsidiary trees and surface unserved division initiatives.",
                outcome: "Expanded from a single $80K engagement into $1.4M across 4 enterprise business units."
            },
            {
                title: "Outbound SDR Prioritization",
                scenario: "A 10-person SDR team struggled with declining cold-email response rates across a generic database of 25,000 contacts.",
                application: "Segmented the database into dynamic intent cohorts, triggering outreach only when accounts registered active expansion signals.",
                outcome: "Tripled qualified meetings booked per rep while reducing total email send volume by 60%."
            },
            {
                title: "Market Expansion Feasibility",
                scenario: "A consulting firm evaluated entering the healthcare sector without clear data on demand intensity.",
                application: "Conducted automated demand mapping and regulatory readiness profiling across 400 hospital networks.",
                outcome: "Identified high-margin compliance sub-segments and launched targeted outreach within 30 days."
            }
        ],
        businessOutcomes: {
            summary: "Eliminates outbound guesswork and aligns commercial resources strictly with high-margin, closed-won enterprise demand.",
            points: [
                "Predictable multi-million dollar enterprise pipeline generation",
                "Higher win rates through multi-threaded committee positioning",
                "Faster sales cycles with pre-cleared budgetary alignment"
            ]
        },
        relevantOfferings: [
            { name: "Market Discovery", path: "/offerings/b2b/market-discovery" },
            { name: "AI Business Strategy", path: "/solutions#ai-business-strategy" },
            { name: "AI SDR Co-Pilot", path: "/solutions#ai-auto-sales-pilot" }
        ]
    },
    {
        id: "sales-revenue-optimization",
        slug: "sales-revenue-optimization",
        number: "02",
        name: "Sales and Revenue Optimization",
        shortName: "Sales & Revenue Optimization",
        tagline: "Conversion bottleneck removal, autonomous follow-up execution, and sales cycle compression.",
        description: "Even strong inbound pipelines fail when sales processes suffer from delayed response times, poor objection handling, and lack of deal intelligence. ProfitMachines optimizes every stage of the sales pipeline, deploying autonomous agents to assist reps, eliminate deal slippage, and accelerate revenue realization.",
        icon: "Workflow",
        badge: "CONVERSION VELOCITY ENGINE",
        targetAudience: {
            headline: "High-Growth Sales Teams, CROs, Sales Ops Directors & Account Executives",
            description: "Designed for commercial teams experiencing deal stagnation, inconsistent rep quotas, and unpredictable quarter-end closes.",
            examples: [
                "B2B inside sales teams handling 50+ monthly deal evaluations",
                "High-ticket consultative sales organizations with complex closing phases",
                "Distributed commercial sales networks requiring standardized sales playbooks"
            ]
        },
        challenges: [
            {
                title: "Inbound Lead Decay Due to Delayed Follow-Up",
                impact: "Inquiries going unanswered for more than 15 minutes experience an 80% drop in qualification conversion."
            },
            {
                title: "Protracted Deal Cycles Stalling in Mid-Funnel",
                impact: "Deals get stuck in technical review or procurement without clear next steps, stretching quarterly forecasts."
            },
            {
                title: "Inconsistent Rep Performance and Playbook Adherence",
                impact: "Top 20% of reps generate 80% of revenue while the remaining team misses quota due to unstructured follow-ups."
            },
            {
                title: "Unreliable End-of-Quarter Revenue Projections",
                impact: "Sales forecasts rely on subjective rep intuition rather than verified buyer engagement milestones."
            }
        ],
        capabilities: [
            {
                title: "Autonomous Sales Pilot (24/7 SDR Agents)",
                description: "Engages inbound prospects in under 60 seconds, qualifies requirements against commercial criteria, and books confirmed discovery calls.",
                problemAddressed: "Eliminates lead drop-off during off-hours, weekends, and rep bandwidth crunches.",
                expectedBusinessValue: "3× increase in discovery meeting volume from existing web traffic.",
                linkPath: "/solutions#ai-auto-sales-pilot"
            },
            {
                title: "Funnel Friction & Bottleneck Analytics",
                description: "Tracks stage duration, document review latency, and buyer interaction gaps to pinpoint where deals stall.",
                problemAddressed: "Reveals exact objection points and internal roadblocks stalling mid-funnel deals.",
                expectedBusinessValue: "Compresses sales cycle duration by 40–50%.",
                linkPath: "/solutions#sales-optimization"
            },
            {
                title: "Dynamic Deal Risk & Forecasting Intelligence",
                description: "Evaluates email sentiment, stakeholder engagement frequency, and executive attendance to forecast close probability.",
                problemAddressed: "Eliminates surprise quarter-end deal slippages.",
                expectedBusinessValue: "Achieves 95%+ forecast precision for board and executive reporting.",
                linkPath: "/solutions#ai-revenue-operations"
            }
        ],
        kpis: [
            {
                name: "Lead-to-Customer Conversion",
                benchmark: "2.4× Lift",
                explanation: "The percentage of incoming inquiries that successfully complete onboarding and become paying accounts.",
                whyItMatters: "Maximizes the revenue yield of every dollar spent on lead generation."
            },
            {
                name: "Sales Cycle Duration",
                benchmark: "40–60% Faster",
                explanation: "The total calendar days elapsed from initial lead touchpoint to signed contract.",
                whyItMatters: "Accelerates cash collection and allows sales reps to manage higher pipeline volumes."
            },
            {
                name: "Average Revenue per Customer (ARPC)",
                benchmark: "+30% Growth",
                explanation: "The contract value secured at initial deal closing through structured multi-tier proposals.",
                whyItMatters: "Increases sales efficiency and protects operating profit margins."
            }
        ],
        useCases: [
            {
                title: "Autonomous Inbound Lead Capture",
                scenario: "A software firm received 300+ monthly web inquiries but rep response times averaged 4 hours.",
                application: "Deployed 24/7 autonomous SDR agents to triage inquiries and book discovery calls instantly.",
                outcome: "Lifted inbound meeting conversion from 18% to 46% with zero additional SDR headcount."
            },
            {
                title: "Mid-Funnel Deal Rescue",
                scenario: "A consultative sales team had $4M in enterprise pipeline stalled between proposal and contract review.",
                application: "Applied bottleneck analytics to identify missing CFO ROI justification and triggered tailored business cases.",
                outcome: "Re-engaged and closed 65% of stalled deals within 30 days."
            },
            {
                title: "Standardized Sales Onboarding",
                scenario: "A scaling commercial team experienced wide productivity gaps between veteran and junior account executives.",
                application: "Integrated guided sales co-pilot playbooks providing real-time objection responses during calls.",
                outcome: "Shortened ramp time for new account executives from 6 months to 7 weeks."
            }
        ],
        businessOutcomes: {
            summary: "Reclaims lost selling hours, eliminates lead leakage, and turns erratic sales execution into a predictable closing machine.",
            points: [
                "Under 60-second response times across all digital channels",
                "Halved deal cycle duration with proactive bottleneck removal",
                "Executive-grade forecasting accuracy across active pipelines"
            ]
        },
        relevantOfferings: [
            { name: "AI Sales Optimization", path: "/solutions#sales-optimization" },
            { name: "Autonomous Sales Pilot", path: "/solutions#ai-auto-sales-pilot" },
            { name: "AI RevOps", path: "/solutions#ai-revenue-operations" }
        ]
    },
    {
        id: "marketing-customer-acquisition",
        slug: "marketing-customer-acquisition",
        number: "03",
        name: "Marketing and Customer Acquisition",
        shortName: "Marketing & Acquisition",
        tagline: "High-ROI customer acquisition, channel efficiency modeling, and performance marketing optimization.",
        description: "Customer acquisition costs across paid channels continue to rise while attribution models break under privacy shifts. ProfitMachines models cross-channel performance, eliminates ad spend leakage, and continuously reallocates budget toward highest-yielding commercial segments.",
        icon: "BarChart3",
        badge: "CAPITAL-EFFICIENT ACQUISITION",
        targetAudience: {
            headline: "CMOs, Growth Marketers, Performance Marketing Directors & Demand Gen Teams",
            description: "Built for companies spending $10K+ monthly on digital acquisition channels seeking sustainable CAC:LTV economics.",
            examples: [
                "B2B firms balancing paid search, LinkedIn ads, and content syndication",
                "Direct-to-consumer and subscription brands battling ad network CAC inflation",
                "Multi-channel commercial enterprises requiring unified revenue attribution"
            ]
        },
        challenges: [
            {
                title: "Escalating Customer Acquisition Costs (CAC)",
                impact: "Rising ad auction costs erode margins, making paid marketing unprofitable without high repeat purchase rates."
            },
            {
                title: "Creative and Channel Ad Fatigue",
                impact: "Ad sets perform well for two weeks before conversion rates plummet, requiring endless manual creative updates."
            },
            {
                title: "Broken Multi-Touch Attribution",
                impact: "Marketing teams cannot verify which channel initiated the initial prospect interest versus which claimed final click."
            },
            {
                title: "Lead Volume Without Revenue Intent",
                impact: "Campaigns generate thousands of clicks and superficial leads that never translate into closed-won business."
            }
        ],
        capabilities: [
            {
                title: "Predictive Channel & Segment Allocation",
                description: "Continuously tracks revenue yield per ad dollar across channels and algorithmically shifts budgets toward top-converting segments.",
                problemAddressed: "Stops budget waste on underperforming keywords and ad sets.",
                expectedBusinessValue: "35–60% reduction in customer acquisition costs.",
                linkPath: "/solutions#performance-marketing"
            },
            {
                title: "Dynamic Creative & Offer Vector Generation",
                description: "Deploys targeted value propositions and high-conversion landing page variants tailored to buyer industry context.",
                problemAddressed: "Overcomes ad fatigue and generic one-size-fits-all messaging.",
                expectedBusinessValue: "2–4× improvement in landing page conversion rates.",
                linkPath: "/solutions#growth-hacking"
            },
            {
                title: "First-Party Intent Harvesting",
                description: "Captures high-intent organic search and website interaction signals to build proprietary lookalike audiences.",
                problemAddressed: "Reduces dependency on increasingly restricted third-party tracking cookies.",
                expectedBusinessValue: "Preserves audience targeting accuracy and lowers blended CPL.",
                linkPath: "/offerings/b2b/channel-discovery"
            }
        ],
        kpis: [
            {
                name: "Customer Acquisition Cost (CAC)",
                benchmark: "35–50% Reduction",
                explanation: "Total sales and marketing expenditure required to secure one paying customer.",
                whyItMatters: "Directly determines how aggressively a company can scale without running out of cash."
            },
            {
                name: "Cost per Qualified Lead (CPQL)",
                benchmark: "40% Lower",
                explanation: "Expenditure spent to acquire a lead that satisfies all commercial ICP criteria.",
                whyItMatters: "Filters out vanity metrics and focuses budget on revenue-generating opportunities."
            },
            {
                name: "Marketing Return on Investment (ROAS)",
                benchmark: "2.5–4.5× ROAS",
                explanation: "Direct revenue generated for every dollar invested in acquisition campaigns.",
                whyItMatters: "Ensures paid growth remains profitable on a cash-flow basis."
            }
        ],
        useCases: [
            {
                title: "B2B LinkedIn Ad Optimization",
                scenario: "A B2B SaaS company was spending $30K/month on LinkedIn ads with a cost-per-SQL exceeding $1,200.",
                application: "Restructured targeting around intent-scored account lists and deployed persona-specific video vectors.",
                outcome: "Reduced cost-per-SQL to $480 while doubling monthly SQL volume."
            },
            {
                title: "Multi-Channel Budget Rebalancing",
                scenario: "A multi-service company allocated equal spend across Google Search, Meta, and partner listings with unclear returns.",
                application: "Implemented unified revenue attribution to link closed transactions directly to initial touchpoints.",
                outcome: "Reallocated 40% of ad spend away from dead-end channels, increasing net revenue by 32% on the same total budget."
            },
            {
                title: "High-Intent Retargeting Loops",
                scenario: "An enterprise platform experienced a 96% bounce rate on high-value pricing page visitors.",
                application: "Deployed automated account-level identification and triggered personalized email cadences to verified visitors.",
                outcome: "Recovered 24 enterprise opportunities worth $680K in pipeline in 90 days."
            }
        ],
        businessOutcomes: {
            summary: "Transforms marketing from an unpredictable cost center into an engineered, high-yielding revenue investment engine.",
            points: [
                "Drastically lower blended customer acquisition costs",
                "Predictable return on marketing ad spend across channels",
                "High-conversion personalized landing page ecosystems"
            ]
        },
        relevantOfferings: [
            { name: "Performance Marketing", path: "/solutions#performance-marketing" },
            { name: "Growth Hacking Engine", path: "/solutions#growth-hacking" },
            { name: "Channel Discovery", path: "/offerings/b2b/channel-discovery" }
        ]
    },
    {
        id: "market-discovery-demand-intelligence",
        slug: "market-discovery-demand-intelligence",
        number: "04",
        name: "Market Discovery and Demand Intelligence",
        shortName: "Market & Demand Discovery",
        tagline: "Unmapped revenue pool discovery, buyer demand validation, and competitor displacement.",
        description: "Entering new markets or launching new offerings without empirical demand data burns valuable capital. ProfitMachines scans market white spaces, evaluates buyer willingness-to-pay, and detects rival vulnerability signals before you invest significant engineering or GTM capital.",
        icon: "Search",
        badge: "OPPORTUNITY MAPPING RADAR",
        targetAudience: {
            headline: "CEOs, Corporate Strategists, VP of Product & GTM Leadership",
            description: "Built for companies evaluating geographic expansion, new product lines, or entering adjacent vertical markets.",
            examples: [
                "Tech startups seeking verified product-market fit signals before scaling",
                "Established enterprises expanding into new regional or vertical territories",
                "Corporate development teams validating acquisition and partnership targets"
            ]
        },
        challenges: [
            {
                title: "GTM Strategies Built on Assumptions Rather Than Empirical Demand",
                impact: "Companies spend months building features or launching regions only to find low market appetite."
            },
            {
                title: "Inability to Detect Early Competitor Vulnerabilities",
                impact: "Rival accounts look secure until sudden contract renegotiation windows pass unnoticed."
            },
            {
                title: "Opaque Total Addressable Market (TAM) Sizing",
                impact: "Investor decks and board targets rely on top-down macroeconomic numbers that fail in ground reality."
            },
            {
                title: "Slow Product-Market Fit Iteration Cycles",
                impact: "Founders spend precious runway on R&D roadmaps that solve low-priority buyer problems."
            }
        ],
        capabilities: [
            {
                title: "AI Market Opportunity & White-Space Discovery",
                description: "Scans corporate filings, hiring registries, and search signals to identify unserved buyer demand pools.",
                problemAddressed: "Prevents entering saturated markets with entrenched incumbents.",
                expectedBusinessValue: "Maps unserved revenue pools worth tens of millions in addressable pipeline.",
                linkPath: "/offerings/b2b/market-discovery"
            },
            {
                title: "Buyer Willingness-to-Pay & Demand Validation",
                description: "Tests pricing elasticity and commercial feature appetite with live target buyer cohorts before coding.",
                problemAddressed: "Stops under-pricing or over-engineering products.",
                expectedBusinessValue: "Ensures 85%+ initial POC conversion and validates premium pricing.",
                linkPath: "/offerings/b2b/demand-discovery"
            },
            {
                title: "AI Competitor Displacement Surveillance",
                description: "Surfaces public dissatisfaction, contract renewal milestones, and pricing changes across rival user bases.",
                problemAddressed: "Transforms competitor customer bases into active pipeline targets.",
                expectedBusinessValue: "60%+ win-back rate on accounts dissatisfied with competitor tools.",
                linkPath: "/solutions#ai-demand-discovery"
            }
        ],
        kpis: [
            {
                name: "Qualified Market Opportunities",
                benchmark: "3.2× Increase",
                explanation: "The number of verified, actionable market white spaces with demonstrated buyer willingness to pay.",
                whyItMatters: "Provides high-confidence direction for product and sales expansion."
            },
            {
                name: "Segment Conversion Rate",
                benchmark: "+35% Uplift",
                explanation: "The win rate achieved in newly entered vertical segments compared to legacy markets.",
                whyItMatters: "Validates that the offering directly solves burning industry pain points."
            },
            {
                name: "Cost per Validated Opportunity",
                benchmark: "50% Savings",
                explanation: "Capital expended to confirm economic viability before building full production infrastructure.",
                whyItMatters: "Protects millions in engineering and commercial runway."
            }
        ],
        useCases: [
            {
                title: "New Vertical Expansion",
                scenario: "A fintech infrastructure company wanted to expand from banking into insurance but lacked demand clarity.",
                application: "Conducted automated demand discovery across 150 insurance carriers, identifying urgent claims automation needs.",
                outcome: "Launched a targeted solution that secured 8 enterprise contracts within 6 months."
            },
            {
                title: "Competitor Takeover Campaign",
                scenario: "A major competitor announced an unexpected 40% price hike and deprecated key legacy features.",
                application: "Deployed automated competitor displacement playbooks targeting affected enterprise users.",
                outcome: "Displaced 32 enterprise accounts worth $1.8M in ARR in 90 days."
            },
            {
                title: "Pricing Elasticity Test",
                scenario: "A B2B SaaS startup debated whether to price its platform at $500/mo or $2,500/mo.",
                application: "Used demand validation cohorts to test perceived value and economic ROI with target VP buyers.",
                outcome: "Successfully launched at $2,200/mo with zero resistance to value."
            }
        ],
        businessOutcomes: {
            summary: "Replaces speculation with verified buyer demand signals, dramatically reducing risk and accelerating time-to-revenue in new markets.",
            points: [
                "Empirical validation before significant GTM capital commitment",
                "High-conversion competitive displacement playbooks",
                "Targeted positioning that commands premium pricing power"
            ]
        },
        relevantOfferings: [
            { name: "Demand Discovery", path: "/offerings/b2b/demand-discovery" },
            { name: "Market Discovery", path: "/offerings/b2b/market-discovery" },
            { name: "Competitive Discovery", path: "/offerings/b2b/competitive-discovery" }
        ]
    },
    {
        id: "workflow-automation-operational-efficiency",
        slug: "workflow-automation-operational-efficiency",
        number: "05",
        name: "Workflow Automation and Operational Efficiency",
        shortName: "Workflow Automation",
        tagline: "Repetitive manual task reduction, handoff orchestration, and operational cost compression.",
        description: "Operational friction between sales, marketing, and delivery slows down execution and inflates overhead. ProfitMachines identifies manual workflow bottlenecks, automates administrative handoffs, and connects disparate software systems into unified, autonomous operations.",
        icon: "Zap",
        badge: "OPERATIONAL SCALE ENGINE",
        targetAudience: {
            headline: "COOs, VP of Operations, RevOps Leaders & Managing Directors",
            description: "Designed for businesses whose headcount costs are scaling faster than revenue due to manual coordination overhead.",
            examples: [
                "Professional service firms bogged down by manual client onboarding and reporting",
                "Commercial sales organizations requiring complex quote approvals and legal handoffs",
                "Operations teams managing manual data reconciliation across legacy CRMs and ERPs"
            ]
        },
        challenges: [
            {
                title: "Disproportionate Administrative Workload on Skilled Talent",
                impact: "High-paid engineers, consultants, and sales reps spend 30%+ of their day on manual data entry and status updates."
            },
            {
                title: "Fragmented Tool Sprawl and Disconnected Systems",
                impact: "Teams manually copy-paste data between CRM, billing, project management, and customer support tools."
            },
            {
                title: "Slow Deal Desk and Procurement Approval Cycles",
                impact: "Deals languish for weeks waiting for manual finance, legal, and operational sign-offs."
            },
            {
                title: "Lack of Operational Visibility and Error Tracking",
                impact: "Customer onboarding delays and billing errors cause immediate early client dissatisfaction."
            }
        ],
        capabilities: [
            {
                title: "Autonomous RevOps & CRM Orchestration",
                description: "Automates deal logging, customer communication history sync, and pipeline hygiene without manual rep effort.",
                problemAddressed: "Reclaims 15+ selling hours per sales representative per week.",
                expectedBusinessValue: "Zero data leakage and 100% CRM hygiene.",
                linkPath: "/solutions#ai-revenue-operations"
            },
            {
                title: "Intelligent Workflow Handoff Automation",
                description: "Coordinates contract signing, automated client provisioning, onboarding task creation, and team notifications.",
                problemAddressed: "Eliminates post-sale onboarding friction and delivery delays.",
                expectedBusinessValue: "Reduces onboarding time from weeks to hours.",
                linkPath: "/solutions#sales-optimization"
            },
            {
                title: "Operational Cost & Labor Compression",
                description: "Replaces repetitive manual verification and data entry tasks with intelligent agentic micro-workflows.",
                problemAddressed: "Scales business transaction volume without requiring proportional headcount expansion.",
                expectedBusinessValue: "40–60% reduction in operating cost per transaction.",
                linkPath: "/solutions#ai-revenue-acceleration"
            }
        ],
        kpis: [
            {
                name: "Processing Time Reduction",
                benchmark: "65% Faster",
                explanation: "The total time required to process a commercial transaction from initiation to final completion.",
                whyItMatters: "Directly improves customer satisfaction and accelerates time-to-revenue."
            },
            {
                name: "Manual Effort per Transaction",
                benchmark: "-50% Hours",
                explanation: "The number of human employee labor hours dedicated to routine administrative tasks per deal.",
                whyItMatters: "Allows high-value team members to focus on client delivery and revenue growth."
            },
            {
                name: "Operating Cost per Process",
                benchmark: "35% Lower",
                explanation: "The total blended operational overhead required to execute recurring business functions.",
                whyItMatters: "Protects and expands bottom-line gross and net operating margins."
            }
        ],
        useCases: [
            {
                title: "Automated Enterprise Client Onboarding",
                scenario: "A fintech company took 21 days to onboard new business clients due to manual document review and setup.",
                application: "Deployed automated intake verification, instant API credential generation, and automated compliance checks.",
                outcome: "Reduced client onboarding time to 48 hours, eliminating 90% of manual back-and-forth."
            },
            {
                title: "Sales Rep CRM Automation",
                scenario: "A 25-person sales org suffered from incomplete CRM data and reps spending 2 hours daily logging notes.",
                application: "Integrated background conversational intelligence to auto-log meeting summaries, action items, and next steps.",
                outcome: "Reclaimed 12 hours/week per rep, directly boosting weekly sales calls by 35%."
            },
            {
                title: "Automated Deal Desk Clearances",
                scenario: "Custom enterprise contract proposals took 10 days to circulate among legal, finance, and product heads.",
                application: "Built automated deal desk rules that instantly approved standard terms and flagged only genuine edge cases.",
                outcome: "Compressed contract approval turnaround from 10 days to 4 hours."
            }
        ],
        businessOutcomes: {
            summary: "Decouples revenue growth from headcount expansion by eliminating administrative drag across your commercial engine.",
            points: [
                "Reclaim 15+ hours per employee per week for revenue-producing work",
                "Sub-48-hour client onboarding and service delivery velocity",
                "Substantial operational margin expansion across recurring workflows"
            ]
        },
        relevantOfferings: [
            { name: "AI RevOps", path: "/solutions#ai-revenue-operations" },
            { name: "Sales Optimization", path: "/solutions#sales-optimization" },
            { name: "Value Discovery", path: "/offerings/b2b/value-discovery" }
        ]
    },
    {
        id: "customer-retention-expansion",
        slug: "customer-retention-expansion",
        number: "06",
        name: "Customer Retention and Expansion",
        shortName: "Retention & Expansion",
        tagline: "Net revenue retention maximization, proactive churn prediction, and automated account upsell loops.",
        description: "Acquiring customers is only half the battle; the true profitability engine lies in expansion and retention. ProfitMachines monitors customer health telemetry, predicts churn before renewal notices are served, and surfaces timely expansion opportunities to compound customer lifetime value.",
        icon: "TrendingUp",
        badge: "NET REVENUE RETENTION (NRR)",
        targetAudience: {
            headline: "Chief Customer Officers, VP of Customer Success, Account Managers & CROs",
            description: "Built for subscription, SaaS, and recurring-revenue businesses where a 5% improvement in retention drives a 25%+ surge in profit.",
            examples: [
                "SaaS platforms managing multi-tier seat licensing and usage tiers",
                "Retainer-based consulting, creative, and professional service agencies",
                "E-commerce brands with high repeat-order potential seeking lifetime value expansion"
            ]
        },
        challenges: [
            {
                title: "Silent Churn and Sudden Contract Non-Renewals",
                impact: "Accounts disengage months before their contract expires, leaving customer success teams completely unaware until the cancellation email."
            },
            {
                title: "Reactive, Ad-Hoc Account Expansion Motions",
                impact: "Account managers pitch upsells during awkward quarterly reviews rather than when the client experiences peak organic product usage."
            },
            {
                title: "Net Revenue Retention (NRR) Hovering Below 100%",
                impact: "The company must continuously acquire new customers just to replace lost churned revenue, capping overall growth."
            },
            {
                title: "Fragmented Visibility into Multi-Division Account Footprints",
                impact: "One team may be having success with a client while another division at the same corporate account cancels."
            }
        ],
        capabilities: [
            {
                title: "Predictive Churn Sentinel & Health Telemetry",
                description: "Monitors login frequency, support ticket tone, and feature utilization to assign a real-time account health score.",
                problemAddressed: "Detects account disengagement 90 days before renewal windows.",
                expectedBusinessValue: "Reduces annual customer churn by 40–60%.",
                linkPath: "/solutions#ai-revenue-acceleration"
            },
            {
                title: "Autonomous Seat & License Expansion Triggers",
                description: "Alerts account managers when client usage reaches 85% capacity and drafts tailored tier-upgrade proposals.",
                problemAddressed: "Capitalizes on natural client growth moments without manual monitoring.",
                expectedBusinessValue: "Triples expansion ARR yield across existing customer accounts.",
                linkPath: "/solutions#sales-optimization"
            },
            {
                title: "Hidden Revenue & Cross-Sell Mapping",
                description: "Analyzes client tech stacks, business expansions, and seasonal cycles to surface secondary service requirements.",
                problemAddressed: "Unlocks untapped wallet share within established client relationships.",
                expectedBusinessValue: "Elevates Net Revenue Retention past 130%.",
                linkPath: "/solutions#hidden-revenue-capture"
            }
        ],
        kpis: [
            {
                name: "Customer Retention Rate (CRR)",
                benchmark: "92%+ Annual",
                explanation: "The percentage of active customers who maintain their subscription or contract over a 12-month period.",
                whyItMatters: "Directly stabilizes ARR baseline and protects cash flow."
            },
            {
                name: "Net Revenue Retention (NRR)",
                benchmark: "130%+ Target",
                explanation: "Total recurring revenue retained and expanded from existing customer cohorts, factoring in upgrades, downgrades, and churn.",
                whyItMatters: "Enables compounding business growth even without new customer acquisition."
            },
            {
                name: "Customer Lifetime Value (LTV)",
                benchmark: "2–4× Expansion",
                explanation: "Total gross profit generated across the entire duration of the customer relationship.",
                whyItMatters: "Allows the business to justify higher initial customer acquisition investments."
            }
        ],
        useCases: [
            {
                title: "SaaS License Expansion Autopilot",
                scenario: "A 50-person SaaS company managed 400 customer accounts with only 3 customer success managers.",
                application: "Deployed automated usage threshold triggers alerting CSMs when accounts were ready for 20+ additional seats.",
                outcome: "Increased expansion revenue by $640K in two quarters with zero extra account managers."
            },
            {
                title: "Predictive Churn Intervention",
                scenario: "An agency noticed a 25% annual client attrition rate that consistently occurred around the 9-month mark.",
                application: "Implemented early sentiment analysis on deliverables and automated proactive executive check-in milestones at month 6.",
                outcome: "Reduced annual client churn from 25% to 8%, saving $1.2M in recurring revenue."
            },
            {
                title: "Multi-Division Enterprise Cross-Sell",
                scenario: "A B2B provider served the marketing team of a multinational bank but had no access to the risk or operations units.",
                application: "Used account footprint mapping to identify warm introduction paths based on corporate success metrics.",
                outcome: "Expanded from a single $120K contract into a $750K multi-department enterprise agreement."
            }
        ],
        businessOutcomes: {
            summary: "Turns existing customer accounts into compounding growth engines, stabilizing annual cash flow and maximizing enterprise valuation.",
            points: [
                "Achieve Net Revenue Retention exceeding 130%",
                "90-day early warning detection for at-risk accounts",
                "Substantial compounding increase in customer lifetime value"
            ]
        },
        relevantOfferings: [
            { name: "Revenue Acceleration", path: "/solutions#ai-revenue-acceleration" },
            { name: "Hidden Revenue Capture", path: "/solutions#hidden-revenue-capture" },
            { name: "Customer Discovery", path: "/offerings/b2b/customer-discovery" }
        ]
    },
    {
        id: "business-intelligence-profitability",
        slug: "business-intelligence-profitability",
        number: "07",
        name: "Business Intelligence and Profitability",
        shortName: "BI & Profitability",
        tagline: "Total margin transparency, customer cohort profitability, and executive decision intelligence.",
        description: "Revenue is vanity, but profit is sanity. High top-line growth often masks unprofitable customer segments, wasteful marketing spend, and margin-eroding delivery practices. ProfitMachines connects financial data with commercial activity, delivering board-level transparency into unit economics and operating margins.",
        icon: "LineChart",
        badge: "MARGIN & PROFIT COMMAND CENTER",
        targetAudience: {
            headline: "CFOs, CEOs, Board Members & Private Equity Operating Partners",
            description: "Built for executive leadership teams preparing for financing, scaling, or turnaround initiatives requiring uncompromising visibility into unit economics.",
            examples: [
                "Private equity-backed enterprises optimizing EBITDA margins",
                "Scale-ups transitioning from growth-at-all-costs to sustainable profitability",
                "Multi-product businesses requiring precise contribution margin visibility by SKU or client tier"
            ]
        },
        challenges: [
            {
                title: "Top-Line Growth Masking Declining Bottom-Line Net Margins",
                impact: "Revenue numbers increase while cash reserves drain due to hidden operational delivery and acquisition costs."
            },
            {
                title: "No Visibility into Customer Cohort Profitability",
                impact: "The largest revenue-generating clients often consume so much custom support and labor that they operate at a net loss."
            },
            {
                title: "Fragmented Financial and Operational Reporting Silos",
                impact: "Leadership spends weeks manually stitching together Excel models that are outdated the day they are finalized."
            },
            {
                title: "Guesswork in Pricing Strategies and Volume Discounting",
                impact: "Sales reps discount deals to hit quota without understanding the catastrophic impact on project gross margin."
            }
        ],
        capabilities: [
            {
                title: "Unified AI RevOps & Financial Data Command Center",
                description: "Consolidates CRM data, billing software, and operational delivery metrics into an automated executive command dashboard.",
                problemAddressed: "Replaces conflicting spreadsheets with a single, real-time source of commercial truth.",
                expectedBusinessValue: "CFO-ready visibility updated continuously in real-time.",
                linkPath: "/solutions#ai-revenue-operations"
            },
            {
                title: "Customer & Segment Profitability Analytics",
                description: "Calculates the true net margin per client account by combining direct service hours, software costs, and CAC.",
                problemAddressed: "Identifies loss-making client relationships and informs pricing renegotiations.",
                expectedBusinessValue: "15–25% improvement in blended operating EBITDA.",
                linkPath: "/offerings/b2b/value-discovery"
            },
            {
                title: "Data-Driven Price Elasticity & Margin Modeling",
                description: "Provides sales teams with algorithmic pricing boundaries that preserve minimum project margin thresholds.",
                problemAddressed: "Stops indiscriminate deal discounting during quarter-end negotiations.",
                expectedBusinessValue: "Protects gross margin integrity across all new contract closings.",
                linkPath: "/solutions#ai-business-strategy"
            }
        ],
        kpis: [
            {
                name: "Gross Operating Margin",
                benchmark: "+15–25 Points",
                explanation: "The percentage of revenue retained after deducting all direct costs of customer delivery and service.",
                whyItMatters: "Provides the underlying fuel to fund expansion, R&D, and shareholder return."
            },
            {
                name: "Revenue per Customer (RPC)",
                benchmark: "2.2× Expansion",
                explanation: "The blended annual economic yield produced per active customer account.",
                whyItMatters: "Allows the business to grow revenue without requiring an exponential increase in client accounts."
            },
            {
                name: "Operating Cost per Transaction",
                benchmark: "30% Reduction",
                explanation: "Total overhead expenditure incurred to fulfill a single unit of service or product delivery.",
                whyItMatters: "Ensures operational leverage improves as the business scales in volume."
            }
        ],
        useCases: [
            {
                title: "Client Cohort Profitability Audit",
                scenario: "A 100-person service firm was doing $15M in revenue but net profit margins were stagnating at 4%.",
                application: "Applied segment profitability modeling to analyze delivery labor across all 80 client accounts.",
                outcome: "Discovered the bottom 15 clients generated $3M in revenue but consumed $3.8M in delivery costs; renegotiated terms to unlock an instant 12% EBITDA lift."
            },
            {
                title: "Automated Board Financial Reporting",
                scenario: "A finance team spent the first 12 days of every month preparing quarterly investor decks manually.",
                application: "Integrated the unified BI Command Center connecting Stripe, Salesforce, and QuickBooks.",
                outcome: "Reduced board reporting preparation from 12 days to 30 minutes with zero manual errors."
            },
            {
                title: "Margin-Protected Sales Pricing",
                scenario: "Enterprise sales reps were offering 30% discounts to close deals, severely damaging first-year profitability.",
                application: "Implemented dynamic pricing guardrails that calculated real-time margin impact before quotes were issued.",
                outcome: "Restored average contract gross margin from 48% to 68% across all new enterprise deals."
            }
        ],
        businessOutcomes: {
            summary: "Empowers executive leadership with total economic clarity, protecting margins and ensuring growth delivers real bottom-line profitability.",
            points: [
                "Unflinching transparency into true customer cohort profitability",
                "Protected gross margins through data-driven pricing discipline",
                "Automated, real-time board reporting and operational forecasting"
            ]
        },
        relevantOfferings: [
            { name: "AI RevOps", path: "/solutions#ai-revenue-operations" },
            { name: "Value Discovery", path: "/offerings/b2b/value-discovery" },
            { name: "AI Business Strategy", path: "/solutions#ai-business-strategy" }
        ]
    }
];
