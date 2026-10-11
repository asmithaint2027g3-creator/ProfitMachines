import {
    Target,
    Zap,
    Users,
    TrendingUp,
    Shield,
    BarChart3,
    Compass,
    Rocket,
    Brain,
    LineChart,
    PieChart,
    Briefcase,
    Globe,
    Workflow,
    RefreshCw,
    Clock,
    AlertTriangle,
    Layers,
    Scale,
    BookOpen,
    CheckSquare,
    Infinity,
    AlertOctagon,
    Search,
    Signal,
    Map,
    EyeOff,
    CheckCircle2,
    DollarSign,
    ArrowRight,
    Activity,
    MousePointer2,
    Maximize2,
    Heart
} from 'lucide-react';

export const salesAccelerationContent = [
    {
        title: "Enterprise Sales Acceleration",
        tagline: "Win Complex Deals Faster. Forecast with Confidence.",
        description: "Enterprise sales cycles are long, political, and multi-stakeholder. AI-Driven Enterprise Sales Acceleration brings intent intelligence, deal health visibility, and predictive guidance to help sales teams engage earlier, align stakeholders faster, and close high-value deals with confidence.",
        icon: Briefcase,
        metrics: [
            { label: "Reduction in sales cycle time", value: "35–50%" },
            { label: "Improvement in win rates", value: "20–30%" },
            { label: "Forecast accuracy", value: "90%+" },
            { label: "Deal confidence", value: "High" }
        ],
        portfolioCards: [
            { title: "Buying Committee Visibility", icon: Users },
            { title: "Deal Health & Risk Prediction", icon: Target },
            { title: "Enterprise Forecast Intelligence", icon: LineChart },
            { title: "Executive Deal Insights", icon: Shield }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Long deal cycles, stalled approvals, weak visibility into deal health", icon: Clock },
            { title: "Pain Points", content: "Late-stage surprises, internal buyer misalignment, forecast volatility", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Early risk detection, stakeholder mapping, predictive deal scoring", icon: Brain },
            { title: "Business Impact", content: "Faster closures, higher win rates, predictable enterprise revenue", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Enterprise Acceleration?",
            audience: [
                "CROs & VPs managing complex deal cycles",
                "Teams selling 6-7 figure ACV solutions",
                "Organizations with multi-stakeholder buying committees",
                "Sales leaders demanding accurate forecasts"
            ],
            outcome: "Close high-value deals faster with less ecosystem risk."
        }
    },
    {
        title: "Digital & Inside Sales Acceleration",
        tagline: "Turn Volume into Velocity.",
        description: "Digital sales teams face high lead volumes but struggle with prioritization and consistency. AI-Driven Digital Sales Acceleration ensures every rep focuses on the right opportunities at the right time, improving productivity and conversion without increasing headcount.",
        icon: Zap,
        metrics: [
            { label: "Improvement in revenue per rep", value: "2X" },
            { label: "Faster lead response time", value: "40–60%" },
            { label: "Uplift in conversion rates", value: "25–35%" },
            { label: "Onboarding speed", value: "Faster" }
        ],
        portfolioCards: [
            { title: "Lead & Deal Prioritization", icon: Target },
            { title: "AI Sales Guidance", icon: Compass },
            { title: "Rep Productivity Intelligence", icon: BarChart3 },
            { title: "Digital Funnel Optimization", icon: Workflow }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "High lead volume, inconsistent follow-ups, uneven rep performance", icon: Layers },
            { title: "Pain Points", content: "Manual prioritization, missed high-intent leads, low rep efficiency", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "AI-guided prioritization, next-best actions, automated workflows", icon: Brain },
            { title: "Business Impact", content: "Higher productivity, consistent execution, scalable digital revenue", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs High-Velocity Sales?",
            audience: [
                "SDR/BDR Managers scaling outreach",
                "High-growth tech companies scaling teams",
                "Teams drowning in unqaulified leads",
                "Sales Ops seeking efficiency gains"
            ],
            outcome: "Scale revenue per rep without linearly adding headcount."
        }
    },
    {
        title: "D2C & High-Velocity Sales Growth",
        tagline: "Convert Demand into Repeat Revenue.",
        description: "In D2C, attention is abundant but demand is fragile. AI-Driven D2C Sales Acceleration identifies real buying intent, optimizes funnels, and increases repeat purchases—driving growth without escalating acquisition costs.",
        icon: Rocket,
        metrics: [
            { label: "Increase in conversion rates", value: "20–35%" },
            { label: "Uplift in repeat purchases", value: "30%" },
            { label: "Reduction in paid media dependency", value: "25%" },
            { label: "Customer LTV", value: "Higher" }
        ],
        portfolioCards: [
            { title: "Intent-Based Conversion", icon: Target },
            { title: "Funnel Leakage Detection", icon: AlertTriangle },
            { title: "Repeat Purchase Prediction", icon: RefreshCw },
            { title: "Personalization at Scale", icon: Users }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "High traffic, low conversion, rising CAC", icon: Globe },
            { title: "Pain Points", content: "Generic targeting, weak personalization, low loyalty", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Intent detection, micro-segmentation, predictive engagement", icon: Brain },
            { title: "Business Impact", content: "Higher ROAS, repeat revenue, sustainable growth", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs D2C Acceleration?",
            audience: [
                "E-commerce & D2C Brands",
                "Subscription Services optimizing churn",
                "Growth Marketers focused on LTV",
                "Retention Teams fighting churn"
            ],
            outcome: "Transformation from one-time transactions to lifetime value."
        }
    },
    {
        title: "BFSI Sales Acceleration",
        tagline: "Qualified Demand. Faster Approvals. Compliant Growth.",
        description: "BFSI sales require precision, trust, and compliance. AI-Driven BFSI Sales Acceleration ensures only eligible, approval-ready demand enters the pipeline—reducing cost, risk, and time-to-revenue.",
        icon: Shield,
        metrics: [
            { label: "Reduction in acquisition cost", value: "30–45%" },
            { label: "Increase in approval-ready leads", value: "2.5X" },
            { label: "Faster lead-to-disbursement", value: "40%" },
            { label: "Portfolio quality", value: "Improved" }
        ],
        portfolioCards: [
            { title: "Eligibility & Intent Scoring", icon: CheckCircle2 },
            { title: "Risk-Aware Lead Prioritization", icon: Shield },
            { title: "Sales-to-Disbursement Intelligence", icon: LineChart },
            { title: "Compliance-Aligned Growth", icon: Scale }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "High inquiries, low approvals, compliance complexity", icon: Layers },
            { title: "Pain Points", content: "Manual verification, high drop-offs, slow monetization", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Pre-qualification, risk scoring, compliant prioritization", icon: Brain },
            { title: "Business Impact", content: "Higher approvals, faster revenue, lower risk", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs BFSI Acceleration?",
            audience: [
                "Banks & Fintech Lenders",
                "Insurance Providers & Brokers",
                "Wealth Management Firms",
                "Compliance-heavy sales organizations"
            ],
            outcome: "Acquire high-quality, eligible customers faster and compliant-first."
        }
    },
    {
        title: "Transition from Traditional to Digital Sales",
        tagline: "Modernize Selling Without Losing Relationships.",
        description: "Organizations moving from relationship-led selling to digital GTM need visibility, discipline, and scalability. AI-Driven Sales Transformation enables a smooth shift to digital-enabled sales without sacrificing trust or deal quality.",
        icon: RefreshCw,
        metrics: [
            { label: "Reduction in cost of sales", value: "25–40%" },
            { label: "Coverage increase", value: "Higher" },
            { label: "Deal velocity", value: "Faster" },
            { label: "Data-driven adoption", value: "Yes" }
        ],
        portfolioCards: [
            { title: "Digital Deal Visibility", icon: Globe },
            { title: "AI Sales Playbooks", icon: BookOpen },
            { title: "Cost-to-Revenue Optimization", icon: DollarSign },
            { title: "Sales Execution Standardization", icon: CheckSquare }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Field-heavy sales, limited digital insight, rising costs", icon: Users },
            { title: "Pain Points", content: "Gut-based decisions, poor scalability, slow growth", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Digital intelligence, AI guidance, scalable execution", icon: Brain },
            { title: "Business Impact", content: "Lower cost of sales, predictable growth, future-ready GTM", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Sales Transformation?",
            audience: [
                "Traditional Manufacturers going D2C/B2B",
                "Logistics & Supply Chain Firms",
                "Legacy Service Providers digitizing sales",
                "Sales Leaders bridging field & digital"
            ],
            outcome: "Modernize sales execution without losing the human touch."
        }
    },
    {
        title: "Sales to Customer Success Continuity",
        tagline: "Close with Context. Retain with Intelligence.",
        description: "Revenue doesn’t end at deal closure. AI-Driven Sales-to-CS Acceleration ensures seamless handoff, intent continuity, and lifecycle intelligence—maximizing retention, expansion, and lifetime value.",
        icon: Infinity,
        metrics: [
            { label: "Improvement in retention", value: "20–30%" },
            { label: "Expansion rates", value: "Higher" },
            { label: "Time-to-value", value: "Faster" },
            { label: "Churn risk", value: "Reduced" }
        ],
        portfolioCards: [
            { title: "Sales-to-CS Handoff Intelligence", icon: ArrowRight },
            { title: "Expansion Opportunity Detection", icon: TrendingUp },
            { title: "Churn Risk Prediction", icon: AlertOctagon },
            { title: "Lifecycle Revenue Optimization", icon: RefreshCw }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Sales closes deals without long-term context", icon: Layers },
            { title: "Pain Points", content: "Poor onboarding, churn risk, missed expansion", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Contextual handoff, predictive lifecycle insights", icon: Brain },
            { title: "Business Impact", content: "Higher LTV, stronger relationships, compounding ARR", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Lifecycle Intelligence?",
            audience: [
                "VP Customer Success & Account Mgmt",
                "SaaS companies with high churn risk",
                "Usage-based pricing models",
                "Teams focused on NRR (Net Revenue Retention)"
            ],
            outcome: "Zero-drop handoffs that drive expansion and retention."
        }
    }
];

export const growthEnginesContent = [
    {
        title: "AI Demand Discovery",
        tagline: "Identify Real Buying Intent—Before the Market Reacts.",
        description: "AI Demand Discovery shifts organizations from reactive lead generation to proactive demand creation. It continuously scans buyer behavior, market signals, and ecosystem activity to surface latent and active demand early—allowing GTM teams to engage prospects before competitors and before buying intent becomes obvious.",
        icon: Search,
        metrics: [
            { label: "Increase in high-intent demand signals", value: "15X–30X" },
            { label: "Improvement in lead quality", value: "3X" },
            { label: "Reduction in wasted spend", value: "40–60%" },
            { label: "Pipeline velocity", value: "Faster" }
        ],
        portfolioCards: [
            { title: "Intent Signal Intelligence", icon: Signal },
            { title: "Market & Category Sensing", icon: Globe },
            { title: "Account-Level Demand Mapping", icon: Map },
            { title: "Buyer Readiness Prediction", icon: Clock }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Demand is invisible until too late; teams react after buyers shortlist vendors.", icon: EyeOff },
            { title: "Pain Points", content: "Late pipeline entry, low differentiation, poor timing.", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Early intent detection, buyer journey visibility, predictive demand scoring.", icon: Brain },
            { title: "Business Impact", content: "First-mover advantage, higher win rates, predictable pipeline creation.", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Demand Discovery?",
            audience: [
                "CMOs & Demand Gen Leaders",
                "ABM Teams targeting strategic accounts",
                "Companies in crowded markets",
                "Teams needing efficient pipeline growth"
            ],
            outcome: "Engage buyers before they even fill out a form."
        }
    },
    {
        title: "AI-Driven Revenue Acceleration",
        tagline: "Turn Pipeline into Predictable Revenue—Faster.",
        description: "AI-Driven Revenue Acceleration connects demand, sales execution, and customer lifecycle into a single revenue intelligence layer. It removes friction from the revenue journey by predicting deal outcomes, identifying revenue leakage, and guiding teams toward actions that directly impact ARR.",
        icon: Zap,
        metrics: [
            { label: "Improvement in revenue velocity", value: "30–50%" },
            { label: "Increase in win rates", value: "25–40%" },
            { label: "Forecast accuracy", value: "90%+" },
            { label: "Revenue leakage", value: "Reduced" }
        ],
        portfolioCards: [
            { title: "Deal Health Intelligence", icon: Heart },
            { title: "Revenue Forecasting & Risk Detection", icon: LineChart },
            { title: "Pipeline-to-ARR Optimization", icon: TrendingUp },
            { title: "Expansion & Renewal Signals", icon: RefreshCw }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Strong pipeline exists, but revenue delivery is inconsistent.", icon: Activity },
            { title: "Pain Points", content: "Forecast surprises, stalled deals, missed expansion.", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Predictive deal scoring, early risk alerts, revenue orchestration.", icon: Brain },
            { title: "Business Impact", content: "Faster ARR realization, higher confidence forecasts, sustained growth.", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Revenue Acceleration?",
            audience: [
                "CROs & RevOps Leaders",
                "Companies preparing for funding/IPO",
                "Boards demanding forecast predictability",
                "Complex revenue orgs (Direct + Partner + PLG)"
            ],
            outcome: "Turn pipeline potential into banked revenue with high confidence."
        }
    },
    {
        title: "AI-Driven Growth Hacking",
        tagline: "Discover What Works—Scale What Wins.",
        description: "AI-Driven Growth Hacking replaces intuition-based experimentation with continuous, AI-led learning loops. It rapidly tests acquisition, activation, engagement, and expansion strategies—identifying high-impact growth levers and scaling them with precision.",
        icon: Rocket,
        metrics: [
            { label: "Faster experimentation cycles", value: "5X–10X" },
            { label: "Improvement in growth conversion", value: "2X" },
            { label: "Cost of experimentation", value: "Reduced" },
            { label: "Time-to-growth inflection", value: "Faster" }
        ],
        portfolioCards: [
            { title: "Experiment Intelligence Engine", icon: Brain },
            { title: "Funnel Breakpoint Detection", icon: AlertTriangle },
            { title: "Growth Lever Identification", icon: MousePointer2 },
            { title: "Scale Readiness Scoring", icon: Maximize2 }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Growth plateaus despite effort; teams don’t know what to optimize next.", icon: Layers },
            { title: "Pain Points", content: "Slow experiments, inconclusive results, wasted spend.", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Automated experimentation, AI-validated insights, rapid iteration.", icon: Brain },
            { title: "Business Impact", content: "Repeatable growth playbooks, faster scaling, lower risk innovation.", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Growth Acceleration?",
            audience: [
                "Growth Product Managers",
                "Startup Founders & Scale-up Leads",
                "Innovation Labs & Ventures",
                "Marketing teams seeking efficiency"
            ],
            outcome: "Systematic, data-driven scaling that eliminates guesswork."
        }
    },
    {
        title: "AI-Driven Performance Marketing",
        tagline: "Maximize ROI. Minimize Waste. Scale with Intelligence.",
        description: "AI-Driven Performance Marketing continuously optimizes channels, creatives, audiences, and budgets in real time. It focuses spending on what converts, not what attracts clicks—ensuring marketing directly contributes to pipeline and revenue outcomes.",
        icon: BarChart3,
        metrics: [
            { label: "Improvement in ROAS", value: "25–45%" },
            { label: "Reduction in CPA", value: "30–50%" },
            { label: "Conversion across funnels", value: "Higher" },
            { label: "Dependency on paid channels", value: "Lower" }
        ],
        portfolioCards: [
            { title: "Channel & Budget Optimization", icon: PieChart },
            { title: "Creative Performance Intelligence", icon: Brain },
            { title: "Conversion Path Optimization", icon: Workflow },
            { title: "Attribution & ROI Intelligence", icon: Target }
        ],
        verticalTabs: [
            { title: "Business Situation", content: "Marketing spend increases, but revenue impact is unclear.", icon: DollarSign },
            { title: "Pain Points", content: "High CAC, low attribution clarity, diminishing returns.", icon: AlertTriangle },
            { title: "AI-Driven Outcome", content: "Real-time optimization, intent-aligned targeting, outcome-based attribution.", icon: Brain },
            { title: "Business Impact", content: "Higher ROI, efficient spend, scalable performance marketing.", icon: TrendingUp }
        ],
        icp: {
            title: "Who Needs Performance AI?",
            audience: [
                "Performance Marketers",
                "User Acquisition (UA) Managers",
                "E-commerce Growth Teams",
                "CFOs monitoring Ad Spend efficiency"
            ],
            outcome: "Maximize return on every marketing dollar spent."
        }
    }
];
