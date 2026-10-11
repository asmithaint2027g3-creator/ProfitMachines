export interface ServicePageData {
    title: string;
    category: string;
    heroDescription: string;
    heroStats: { value: string; label: string }[];
    heroPoints: string[];
    overviewTitle: string;
    overviewText: string;
    overviewSub: string;
    overviewCards: { icon: string; title: string; desc: string }[];
    problemTitle: string;
    problemText: string;
    problems: { title: string; desc: string }[];
    challengesTitle: string;
    industryChallenges: { title: string; desc: string }[];
    whyTitle: string;
    whyText: string;
    whyPoints: { title: string; desc: string }[];
    whyMetrics: { label: string; value: string }[];
    servicesTitle: string;
    servicesIncluded: { icon: string; title: string; desc: string; points: string[] }[];
    subVerticalsTitle?: string;
    subVerticals?: { title: string; desc: string; items: string[] }[];
    processTitle: string;
    process: { title: string; desc: string; duration: string }[];
    techStack?: string[];
    benefitsTitle: string;
    benefits: { title: string; desc: string }[];
    metrics?: { value: string; label: string }[];
    testimonials?: { quote: string; author: string; role: string; company: string }[];
    faqs: { question: string; answer: string }[];
}

export const servicesPageData: Record<string, ServicePageData> = {

    /* ───────────────────────────────────────────────
     *  1. AI Growth Engine
     * ─────────────────────────────────────────────── */
    "ai-growth-engine": {
        title: "AI Growth Engine",
        category: "AI-Powered Growth",
        heroDescription: "A unified AI command center that orchestrates demand generation, pipeline acceleration, and autonomous revenue execution across every touchpoint in your growth flywheel.",
        heroStats: [
            { value: "3.2×", label: "Avg Pipeline Increase" },
            { value: "67%", label: "Faster Deal Cycles" },
            { value: "94%", label: "Lead Quality Score" },
            { value: "90d", label: "Time-to-Value" }
        ],
        heroPoints: [
            "AI-driven demand signals updated in real-time",
            "Autonomous SDR co-pilot handles first-touch at scale",
            "Revenue intelligence dashboard for C-suite visibility"
        ],
        overviewTitle: "What is the AI Growth Engine?",
        overviewText: "The AI Growth Engine is ProfitMachines' flagship platform that combines demand discovery, predictive scoring, autonomous outreach, and pipeline acceleration into a single always-on revenue operating system.",
        overviewSub: "Unlike point solutions, the engine learns from every interaction and continuously optimises across the full funnel — from first impression to closed-won.",
        overviewCards: [
            { icon: "Brain", title: "Predictive Intelligence", desc: "AI models that identify high-propensity buyers before they raise their hand" },
            { icon: "Zap", title: "Autonomous Outreach", desc: "Personalised, compliance-ready sequences without human intervention" },
            { icon: "BarChart3", title: "Revenue Analytics", desc: "Real-time attribution across every campaign and channel" },
            { icon: "Target", title: "ICP Targeting", desc: "Dynamic ideal customer profiling refined with every conversion signal" }
        ],
        problemTitle: "The Revenue Growth Bottleneck",
        problemText: "Most B2B companies operate with disconnected tools, manual processes, and delayed insights — resulting in wasted pipeline and missed quotas.",
        problems: [
            { title: "Fragmented Toolstack", desc: "Teams juggling 12+ disconnected tools lose 30% of pipeline to data gaps and handoff failures." },
            { title: "Delayed Buyer Signals", desc: "By the time your team acts on intent data, competitors have already booked the meeting." },
            { title: "Manual SDR Overhead", desc: "Human-only prospecting is expensive, inconsistent, and doesn't scale with growth targets." },
            { title: "Poor Forecasting Accuracy", desc: "CRM data decays at 30% per year, making quarterly forecasts unreliable for board reporting." },
            { title: "Low Conversion Rates", desc: "Industry average MQL-to-SQL conversion sits at 13% — leaving 87% of budget value on the table." },
            { title: "Revenue Leakage", desc: "Undetected churn signals and upsell opportunities leak an estimated 20–25% of NRR annually." }
        ],
        challengesTitle: "Industry Challenges We Solve",
        industryChallenges: [
            { title: "B2B Enterprise Sales Complexity", desc: "Multi-stakeholder buying committees with 8+ decision makers require coordinated, personalised engagement at scale." },
            { title: "Increasing CAC", desc: "Rising paid media costs force teams to find more efficient acquisition channels without sacrificing quality." },
            { title: "GTM Misalignment", desc: "Marketing, Sales, and RevOps operating in silos leads to conflicting priorities and wasted effort." },
            { title: "Data Privacy Compliance", desc: "GDPR, CCPA, and sector-specific regulations require AI systems that are privacy-first by design." },
            { title: "Talent Scarcity", desc: "Exceptional sales talent is scarce and expensive — AI augmentation multiplies the output of existing teams." },
            { title: "Global Expansion", desc: "Entering new markets requires localised intelligence that generalised platforms cannot provide." }
        ],
        whyTitle: "Why ProfitMachines' AI Growth Engine?",
        whyText: "We don't sell software — we deploy outcomes. Our engine is tuned to your industry, your ICP, and your existing tech stack from day one.",
        whyPoints: [
            { title: "Integrated by Design", desc: "Native connectors to Salesforce, HubSpot, Outreach, Gong, and 40+ enterprise tools" },
            { title: "Privacy-First Architecture", desc: "SOC2 Type II, GDPR-compliant data pipelines with single-tenant vault isolation" },
            { title: "90-Day Value Guarantee", desc: "Measurable pipeline impact within the first quarter or we extend your engagement free" },
            { title: "Continuous Learning Loop", desc: "Models retrain on your conversion data weekly, improving precision over time" },
            { title: "Dedicated Revenue Team", desc: "Every engagement includes strategy, implementation, and ongoing optimisation" }
        ],
        whyMetrics: [
            { label: "Average Pipeline Increase", value: "3.2×" },
            { label: "Reduction in Sales Cycle", value: "−42%" },
            { label: "Improvement in Lead Quality", value: "+78%" }
        ],
        servicesTitle: "Everything Included in the AI Growth Engine",
        servicesIncluded: [
            { icon: "Target", title: "Intent-Based Lead Generation", desc: "Capture active buyer signals across web, social, and third-party intent networks.", points: ["Real-time intent ingestion", "IP-level visitor identification", "Priority queue routing to SDRs"] },
            { icon: "Brain", title: "AI ICP Matching & Scoring", desc: "Dynamically score every inbound and outbound account against your ideal customer profile.", points: ["Continuous propensity scoring", "Firmographic enrichment", "Custom weighting per vertical"] },
            { icon: "Zap", title: "Autonomous Nurture Sequences", desc: "Deploy adaptive email and chat sequences that personalise based on engagement history.", points: ["Adaptive sequencing AI", "A/B testing at scale", "CAN-SPAM / GDPR compliant"] },
            { icon: "BarChart3", title: "Multi-Touch Revenue Attribution", desc: "Map every marketing touchpoint to closed revenue with algorithmic credit models.", points: ["Full-funnel attribution", "Offline touchpoint import", "Board-ready reporting"] },
            { icon: "Rocket", title: "Pipeline Velocity Acceleration", desc: "Identify deal blockers and trigger next-best-action recommendations automatically.", points: ["Deal health scoring", "Sentiment analysis on emails", "Auto-escalation playbooks"] },
            { icon: "Shield", title: "ABM Autopilot", desc: "Orchestrate end-to-end target account campaigns with coordinated ads, outreach, and landing pages.", points: ["CRM-synced target accounts", "Personalised landing pages", "Co-selling intelligence"] }
        ],
        subVerticalsTitle: "Specialised Growth Modules",
        subVerticals: [
            {
                title: "Startup & Scale-up Growth",
                desc: "Founder-led sales optimisation with burn-rate-aware automation",
                items: ["Zero-to-one lead generation", "PMF signal detection", "Investor-ready forecasting", "Lean team amplification"]
            },
            {
                title: "Enterprise & Mid-Market Expansion",
                desc: "Complex multi-stakeholder navigation with global account penetration",
                items: ["Global account penetration engine", "Executive engagement automation", "Strategic partnership discovery", "Territory optimisation AI"]
            }
        ],
        processTitle: "How We Deploy Your AI Growth Engine",
        process: [
            { title: "Discovery & Data Audit", desc: "We audit your existing CRM, campaign data, and ICP definitions to establish an accurate baseline and identify immediate opportunities.", duration: "Week 1–2" },
            { title: "Platform Integration & Configuration", desc: "Native connectors are deployed to your existing stack. Custom models are trained on your historical conversion data.", duration: "Week 3–4" },
            { title: "Pilot Launch & Validation", desc: "A controlled pilot runs across a segment of your pipeline. We validate signal quality, conversion rates, and attribution accuracy.", duration: "Week 5–6" },
            { title: "Full Deployment & Optimisation", desc: "The engine goes live across all channels. Weekly model retraining and bi-weekly strategy reviews keep performance climbing.", duration: "Week 7–12" },
            { title: "Continuous Growth Management", desc: "Ongoing management, reporting, and quarterly strategy reviews with your dedicated ProfitMachines revenue team.", duration: "Ongoing" }
        ],
        techStack: ["GPT-4 Turbo", "Salesforce Einstein", "HubSpot", "Clearbit", "6sense", "Bombora", "Outreach", "Gong", "AWS", "Snowflake", "dbt", "Tableau"],
        benefitsTitle: "Business Benefits You'll Measure",
        benefits: [
            { title: "More Qualified Pipeline", desc: "AI-sourced leads convert at 3× the rate of traditional outbound due to real-time intent matching." },
            { title: "Shorter Sales Cycles", desc: "Automated nurturing and deal-health scoring compress average deal cycles by 40%+." },
            { title: "Higher Win Rates", desc: "Next-best-action recommendations informed by thousands of historical deals improve close rates significantly." },
            { title: "Accurate Revenue Forecasting", desc: "Machine-learning models provide ±5% forecast accuracy vs the industry average of ±25%." },
            { title: "Reduced CAC", desc: "Efficient, AI-powered prospecting cuts customer acquisition cost by an average of 38%." },
            { title: "Team Productivity Uplift", desc: "Sales reps spend 70% more time in meaningful conversations instead of manual research and data entry." }
        ],
        metrics: [
            { value: "3.2×", label: "Pipeline Growth" },
            { value: "−42%", label: "Sales Cycle Reduction" },
            { value: "38%", label: "CAC Reduction" },
            { value: "98%", label: "Forecast Accuracy" }
        ],
        testimonials: [
            { quote: "The AI Growth Engine transformed our entire GTM motion. We hit our annual pipeline target in Q2.", author: "Sarah Jenkins", role: "CRO", company: "Vanguard Pay" },
            { quote: "Autonomous SDR sequences handle 80% of our first-touch engagement at a fraction of the cost.", author: "David Chen", role: "VP of Sales", company: "ShipFlow" },
            { quote: "Revenue attribution is finally accurate. We cut wasted ad spend by 45% in the first month.", author: "Elena Rodriguez", role: "RevOps Director", company: "CloudScale Systems" }
        ],
        faqs: [
            { question: "How quickly can the AI Growth Engine be deployed?", answer: "Most deployments are fully live within 6–8 weeks, with measurable pipeline impact visible by week 10." },
            { question: "Does it work with our existing CRM?", answer: "Yes. We have native integrations for Salesforce, HubSpot, Pipedrive, and Microsoft Dynamics, plus custom API connectors for any other CRM." },
            { question: "How is our data protected?", answer: "All data is processed in SOC2 Type II certified, single-tenant environments. We are fully GDPR and CCPA compliant with zero data-sharing across customers." },
            { question: "What's the minimum contract term?", answer: "We offer flexible 6-month pilot engagements with quarterly performance reviews, and annual enterprise agreements for sustained growth programs." },
            { question: "Can we start with just one module?", answer: "Absolutely. Many clients start with Intent-Based Lead Generation or ABM Autopilot and expand as they see results." }
        ]
    },

    /* ───────────────────────────────────────────────
     *  2. Revenue Acceleration
     * ─────────────────────────────────────────────── */
    "revenue-acceleration": {
        title: "Revenue Acceleration",
        category: "Revenue Operations",
        heroDescription: "AI-driven revenue operations that compress deal cycles, recover hidden revenue, and build a predictable, compounding growth machine your board can rely on.",
        heroStats: [
            { value: "2.8×", label: "ARR Growth Rate" },
            { value: "45%", label: "Faster Deals" },
            { value: "$2.1M", label: "Avg Hidden Revenue Found" },
            { value: "98%", label: "Forecast Accuracy" }
        ],
        heroPoints: [
            "AI RevOps platform connecting marketing, sales, and CS data",
            "Hidden revenue capture from existing accounts and churned customers",
            "Board-ready revenue intelligence dashboard"
        ],
        overviewTitle: "Accelerate Revenue Across Every Stage",
        overviewText: "Revenue acceleration is not about working harder — it's about eliminating the revenue leakage and friction points that silently erode your growth. Our AI models surface opportunities your team would never find manually.",
        overviewSub: "From pipeline velocity to expansion revenue and churn prevention, we orchestrate every lever in your revenue engine simultaneously.",
        overviewCards: [
            { icon: "TrendingUp", title: "Pipeline Velocity", desc: "Compress time-in-stage with AI-triggered next actions" },
            { icon: "BarChart3", title: "Hidden Revenue", desc: "Identify upsell and cross-sell signals in existing accounts" },
            { icon: "Users", title: "Churn Prevention", desc: "Predict and intercept churn 90 days before it happens" },
            { icon: "Rocket", title: "Expansion Revenue", desc: "Systematic NRR growth through account intelligence" }
        ],
        problemTitle: "Why Revenue Stalls",
        problemText: "Revenue stalls are rarely caused by bad products. They're caused by invisible friction: delayed actions, missed signals, and data that arrives too late to act on.",
        problems: [
            { title: "Revenue Leakage", desc: "Up to 25% of ARR leaks through undetected churn, missed upsells, and stalled deals annually." },
            { title: "Inaccurate Forecasting", desc: "CRM-based forecasts are wrong 60% of the time, making board communication and planning unreliable." },
            { title: "Siloed Revenue Data", desc: "Marketing, Sales, and Customer Success data living in separate tools creates blind spots across the funnel." },
            { title: "Slow Deal Progression", desc: "Deals that stall in late-stage pipeline are 80% less likely to close — but most teams don't know they're stalling." }
        ],
        challengesTitle: "Revenue Challenges Across Industries",
        industryChallenges: [
            { title: "SaaS & Subscription Models", desc: "Combating churn while driving net revenue retention above 120% in competitive categories." },
            { title: "Enterprise B2B Sales", desc: "Managing complex multi-stakeholder deals with long cycles and high acquisition costs." },
            { title: "D2C & Retail", desc: "Converting one-time buyers into repeat purchasers with personalised lifecycle revenue models." },
            { title: "Financial Services", desc: "Cross-selling and upselling regulated products with compliant, AI-assisted outreach at scale." },
            { title: "Professional Services", desc: "Expanding account revenue through project completion signals and strategic relationship intelligence." },
            { title: "Healthcare & Life Sciences", desc: "Navigating long procurement cycles with precision outreach timed to budget cycles." }
        ],
        whyTitle: "Why ProfitMachines for Revenue Acceleration?",
        whyText: "Our approach combines data science, sales psychology, and enterprise-grade AI infrastructure to unlock the revenue that's already within reach.",
        whyPoints: [
            { title: "Full Funnel Visibility", desc: "Single unified view across marketing, sales, and customer success data streams" },
            { title: "AI-Powered Deal Intelligence", desc: "Real-time scoring, sentiment analysis, and deal health monitoring on every opportunity" },
            { title: "Expansion Revenue Programs", desc: "Systematic identification and pursuit of upsell/cross-sell within existing accounts" },
            { title: "Executive Reporting Suite", desc: "Board-ready dashboards with predictive ARR models updated in real-time" }
        ],
        whyMetrics: [
            { label: "Average ARR Growth Acceleration", value: "2.8×" },
            { label: "Revenue Recovered from Existing Accounts", value: "$2.1M avg" },
            { label: "Reduction in Deal Cycle Length", value: "−45%" }
        ],
        servicesTitle: "Revenue Acceleration Services",
        servicesIncluded: [
            { icon: "BarChart3", title: "AI Revenue Operations (RevOps)", desc: "Unify your entire revenue stack with intelligent orchestration across CRM, marketing automation, and CS platforms.", points: ["Data unification layer", "Cross-system revenue attribution", "Automated reporting pipelines"] },
            { icon: "TrendingUp", title: "Pipeline Velocity Engine", desc: "Identify stalled deals and trigger automated intervention sequences to keep pipeline moving.", points: ["Stage-progression scoring", "Deal health monitoring", "Auto-escalation rules"] },
            { icon: "Zap", title: "Hidden Revenue Capture", desc: "Surface and pursue revenue opportunities hiding in your existing customer base and churned accounts.", points: ["Upsell signal detection", "Churn prediction AI", "Win-back campaign automation"] },
            { icon: "Shield", title: "Predictive Revenue Forecasting", desc: "Replace manual CRM forecasts with AI models that achieve ±5% accuracy.", points: ["ML-based forecast models", "Scenario planning tools", "Variance alert system"] }
        ],
        processTitle: "Our Revenue Acceleration Process",
        process: [
            { title: "Revenue Audit & Baseline", desc: "We analyse your full revenue stack: win/loss data, churn patterns, pricing model, and historical ARR trends.", duration: "Week 1–2" },
            { title: "Data Infrastructure Setup", desc: "Unify all revenue data sources into a single warehouse with clean, actionable models.", duration: "Week 3–4" },
            { title: "Quick Wins Execution", desc: "Immediate actions on highest-probability upsell and recovery opportunities identified in the audit.", duration: "Week 5–6" },
            { title: "Full Program Launch", desc: "All acceleration programs live: velocity engine, hidden revenue capture, forecast model, and expansion plays.", duration: "Week 7–12" },
            { title: "Quarterly Revenue Reviews", desc: "Ongoing strategy, optimisation, and quarterly board-ready performance reporting.", duration: "Ongoing" }
        ],
        techStack: ["Salesforce Revenue Cloud", "Clari", "Gong", "Snowflake", "dbt", "Tableau", "Churnzero", "Gainsight", "AWS SageMaker"],
        benefitsTitle: "Measurable Revenue Impact",
        benefits: [
            { title: "Predictable ARR Growth", desc: "Replace lumpy revenue with a compounding, data-driven growth engine that improves quarter over quarter." },
            { title: "Recovered Hidden Revenue", desc: "Identify millions in upsell and expansion opportunities that would otherwise be missed." },
            { title: "Board-Grade Forecasting", desc: "Achieve ±5% forecast accuracy with machine-learning revenue models." },
            { title: "Reduced Revenue Leakage", desc: "Stop the silent drain of undetected churn and missed expansion with proactive AI monitoring." }
        ],
        metrics: [
            { value: "2.8×", label: "ARR Acceleration" },
            { value: "−45%", label: "Deal Cycle Reduction" },
            { value: "$2.1M", label: "Avg Revenue Recovered" },
            { value: "±5%", label: "Forecast Accuracy" }
        ],
        testimonials: [
            { quote: "We found $1.8M in hidden upsell opportunities in the first 60 days. The ROI was immediate.", author: "Michael Torres", role: "CFO", company: "ScalePoint SaaS" },
            { quote: "Forecast accuracy went from 60% to 97%. Our board finally trusts the numbers.", author: "Jennifer Walsh", role: "VP Revenue", company: "Meridian Health Tech" }
        ],
        faqs: [
            { question: "How do you identify hidden revenue?", answer: "We analyse product usage data, support ticket sentiment, contract renewal dates, and engagement patterns to surface upsell and cross-sell signals that aren't visible in standard CRM reports." },
            { question: "What CRM systems do you support?", answer: "Salesforce, HubSpot, Microsoft Dynamics, Pipedrive, and custom CRMs via API. We can also work with data warehouse sources like Snowflake or BigQuery." },
            { question: "How long until we see results?", answer: "Quick-win revenue opportunities are typically actioned within 30 days. Full program results compound over 90–180 days." }
        ]
    },

    /* ───────────────────────────────────────────────
     *  3. Lead Generation
     * ─────────────────────────────────────────────── */
    "lead-generation": {
        title: "Lead Generation",
        category: "B2B Pipeline",
        heroDescription: "AI-powered lead generation that delivers high-intent, sales-ready pipeline at scale — across inbound, outbound, and account-based channels.",
        heroStats: [
            { value: "5×", label: "More Qualified Leads" },
            { value: "72%", label: "Lower Cost Per Lead" },
            { value: "89%", label: "ICP Match Rate" },
            { value: "21d", label: "Avg First Meeting" }
        ],
        heroPoints: [
            "Multi-channel lead capture across web, social, email, and intent networks",
            "AI scoring ensures only high-propensity leads reach your sales team",
            "Automated nurture sequences convert cold leads to warm opportunities"
        ],
        overviewTitle: "Modern B2B Lead Generation, Powered by AI",
        overviewText: "Traditional lead generation is broken. Spray-and-pray outreach yields diminishing returns and wastes your sales team's time. Our AI-driven approach identifies buyers who are actively in-market and engages them with hyper-personalised messaging.",
        overviewSub: "We combine intent data, firmographic matching, and behavioural signals to build a pipeline of leads that actually convert.",
        overviewCards: [
            { icon: "Target", title: "Intent-Based Targeting", desc: "Identify buyers actively researching your category" },
            { icon: "Brain", title: "AI Lead Scoring", desc: "Prioritise leads by conversion probability" },
            { icon: "Zap", title: "Automated Outreach", desc: "Personalised sequences without manual effort" },
            { icon: "BarChart3", title: "Lead Analytics", desc: "Full attribution from first touch to close" }
        ],
        problemTitle: "The Lead Quality Crisis",
        problemText: "Most B2B teams generate plenty of leads — they just can't tell which ones are worth pursuing until they've wasted time and money finding out.",
        problems: [
            { title: "Low-Quality Inbound", desc: "Form fills from unqualified leads waste SDR bandwidth and distort pipeline metrics." },
            { title: "Outbound Fatigue", desc: "Generic cold outreach open rates have dropped below 5% as buyers filter noise automatically." },
            { title: "No Intent Visibility", desc: "Without real-time intent data, teams are always a step behind buyers who are already evaluating competitors." },
            { title: "Poor Lead Routing", desc: "Leads reaching the wrong rep or taking too long to respond results in 50%+ conversion loss." }
        ],
        challengesTitle: "Lead Generation Challenges by Segment",
        industryChallenges: [
            { title: "B2B Technology", desc: "Cutting through crowded inboxes and reaching technical buyers who actively avoid sales outreach." },
            { title: "Financial Services", desc: "Generating compliant leads for regulated products without triggering privacy and advertising restrictions." },
            { title: "Healthcare", desc: "Identifying procurement decision-makers within complex hospital and health system hierarchies." },
            { title: "Manufacturing & Industrial", desc: "Reaching engineering and procurement buyers through traditional channels that resist digital outreach." },
            { title: "SaaS & Startups", desc: "Building pipeline efficiently on constrained budgets with limited brand recognition in competitive categories." },
            { title: "Professional Services", desc: "Generating relationship-based pipeline where trust and referrals traditionally dominate acquisition." }
        ],
        whyTitle: "Why Our Lead Generation Works",
        whyText: "We combine the best of inbound, outbound, and account-based approaches — all orchestrated by AI that learns what converts for your specific business.",
        whyPoints: [
            { title: "Multi-Channel Coverage", desc: "Email, LinkedIn, paid social, content syndication, and intent networks working in concert" },
            { title: "Real-Time Lead Intelligence", desc: "Every lead enriched with 40+ firmographic and technographic data points on capture" },
            { title: "Compliant by Default", desc: "GDPR, CCPA, and CAN-SPAM compliant outreach with automated consent management" },
            { title: "CRM-Native Delivery", desc: "Leads delivered directly into your CRM with full context, scoring, and routing rules" }
        ],
        whyMetrics: [
            { label: "Improvement in Lead Quality", value: "+89%" },
            { label: "Reduction in Cost Per Lead", value: "−72%" },
            { label: "Increase in Pipeline Volume", value: "5×" }
        ],
        servicesTitle: "Lead Generation Services",
        servicesIncluded: [
            { icon: "Target", title: "Intent-Based Lead Generation", desc: "Capture buyers actively researching your category across the web.", points: ["Real-time intent signals", "Competitor comparison tracking", "Research behaviour monitoring"] },
            { icon: "Brain", title: "AI ICP Matching", desc: "Score and filter every lead against your ideal customer profile automatically.", points: ["Dynamic ICP scoring", "Firmographic enrichment", "Custom qualification rules"] },
            { icon: "Zap", title: "Automated Outreach Sequences", desc: "Personalised multi-touch campaigns that engage prospects at the right moment.", points: ["AI-personalised messaging", "Optimal send-time optimisation", "Reply detection and routing"] },
            { icon: "Users", title: "Account-Based Lead Gen", desc: "Target specific named accounts with coordinated advertising and outreach.", points: ["Target account list management", "Personalised landing pages", "Executive-level engagement"] }
        ],
        processTitle: "Our Lead Generation Process",
        process: [
            { title: "ICP Definition & Data Mapping", desc: "We define your precise ideal customer profile and map available data sources to build the targeting foundation.", duration: "Week 1" },
            { title: "Channel Setup & Integration", desc: "Configure all lead capture channels — intent data, LinkedIn, email infrastructure, and CRM routing.", duration: "Week 2–3" },
            { title: "Pilot Campaign Launch", desc: "Launch targeted campaigns to a defined market segment. Measure quality, response rates, and conversion.", duration: "Week 4–5" },
            { title: "Optimise & Scale", desc: "Iterate on messaging, targeting, and channel mix based on pilot results. Scale to full program.", duration: "Week 6–12" },
            { title: "Continuous Pipeline Management", desc: "Ongoing campaign management, lead scoring refinement, and monthly performance reporting.", duration: "Ongoing" }
        ],
        techStack: ["6sense", "Bombora", "ZoomInfo", "Apollo", "LinkedIn Sales Navigator", "Outreach", "HubSpot", "Salesforce", "Clearbit", "Phantom Buster"],
        benefitsTitle: "Lead Generation Benefits",
        benefits: [
            { title: "Higher Quality Pipeline", desc: "AI-scored leads convert at 5× the rate of traditional outbound." },
            { title: "Lower Cost Per Lead", desc: "Targeted, AI-efficient outreach reduces CPL by up to 72% vs traditional methods." },
            { title: "Faster Sales Cycles", desc: "Warm, intent-matched leads move through stages 40% faster than cold outbound." },
            { title: "Scalable Without Headcount", desc: "Autonomous outreach scales your lead generation without proportionally increasing team size." }
        ],
        metrics: [
            { value: "5×", label: "Pipeline Volume" },
            { value: "72%", label: "CPL Reduction" },
            { value: "89%", label: "ICP Match Rate" },
            { value: "40%", label: "Faster Sales Cycle" }
        ],
        testimonials: [
            { quote: "We went from 20 qualified leads a month to 140. The quality improvement was even more impressive than the volume.", author: "Chris Patel", role: "Head of Growth", company: "Nexus Analytics" }
        ],
        faqs: [
            { question: "How do you ensure lead quality?", answer: "Every lead is scored against your ICP using 40+ data points including firmographics, intent signals, and behavioural data before it ever reaches your CRM." },
            { question: "Do you build the lists or use ours?", answer: "Both. We can work with your existing target lists, build new lists from intent and firmographic databases, or combine both approaches." },
            { question: "What industries do you specialise in?", answer: "We have deep playbooks for B2B Technology, SaaS, Financial Services, Healthcare, Manufacturing, and Professional Services." }
        ]
    },

    /* ───────────────────────────────────────────────
     *  4. Demand Discovery
     * ─────────────────────────────────────────────── */
    "demand-discovery": {
        title: "Demand Discovery",
        category: "Market Intelligence",
        heroDescription: "Identify where demand exists before your competitors do — with AI-powered market mapping, buyer signal analysis, and profit pool discovery across your entire addressable market.",
        heroStats: [
            { value: "300M+", label: "Demand Signals Analysed" },
            { value: "8×", label: "White Space Identified" },
            { value: "18mo", label: "Avg First-Mover Window" },
            { value: "±5%", label: "TAM Accuracy" }
        ],
        heroPoints: [
            "Real-time market sizing updated continuously, not annually",
            "Uncontested white space identification across your TAM/SAM",
            "Entry timing intelligence for 12–18 month competitive head start"
        ],
        overviewTitle: "See Demand Before It Surfaces",
        overviewText: "Most companies discover market opportunities after competitors have already captured them. Demand Discovery flips this equation — using AI to map latent demand, unserved segments, and emerging opportunities before they become obvious.",
        overviewSub: "Our models analyse purchasing behaviour, search intent, market movements, and competitive positioning to surface profit pools that traditional research misses.",
        overviewCards: [
            { icon: "Target", title: "Profit Pool Mapping", desc: "Quantify revenue available in every market segment you serve or could serve" },
            { icon: "Brain", title: "Latent Demand Detection", desc: "Find buyers who have the problem but haven't started searching for solutions yet" },
            { icon: "BarChart3", title: "White Space Analysis", desc: "Identify uncontested market segments with high revenue potential" },
            { icon: "Rocket", title: "Entry Timing Intelligence", desc: "Know when to enter a market for maximum competitive advantage" }
        ],
        problemTitle: "The Demand Visibility Gap",
        problemText: "Companies spend millions on strategy without knowing where actual demand lives. By the time the data arrives, the window has closed.",
        problems: [
            { title: "Stale Market Data", desc: "Annual analyst reports and planning-cycle research are 6–18 months out of date by the time teams act on them." },
            { title: "Missed Profit Pools", desc: "High-value, underserved market segments remain invisible without AI-powered mapping tools." },
            { title: "Capital Misallocation", desc: "Without demand intelligence, budgets flow to saturated segments while high-growth adjacencies go unfunded." },
            { title: "Reactive Competitive Positioning", desc: "Reacting to competitor moves means you're always catching up — not setting the pace." }
        ],
        challengesTitle: "Demand Discovery Challenges",
        industryChallenges: [
            { title: "Fast-Moving Tech Markets", desc: "Categories evolving in weeks require demand signals updated in real-time, not annual planning cycles." },
            { title: "Emerging Market Entry", desc: "Identifying which geographies to prioritise requires granular demand intelligence at the country or city level." },
            { title: "Adjacent Market Expansion", desc: "Knowing when your capabilities create asymmetric advantage in an adjacent vertical before competitors realise it." },
            { title: "Niche B2B Categories", desc: "In small TAM markets, finding every reachable buyer requires AI-powered exhaustive mapping rather than sampling." },
            { title: "Regulatory-Constrained Industries", desc: "Healthcare, BFSI, and education markets require sector-specific demand mapping with compliance guardrails." },
            { title: "Global GTM Planning", desc: "Multi-market demand discovery requires a global data infrastructure that traditional research firms cannot provide." }
        ],
        whyTitle: "Why ProfitMachines for Demand Discovery?",
        whyText: "We turn market intelligence from a quarterly PDF into a living, queryable intelligence platform your GTM team accesses daily.",
        whyPoints: [
            { title: "Continuous Signal Monitoring", desc: "300M+ demand signals analysed daily across web, social, firmographic, and intent networks" },
            { title: "Quantified Profit Pools", desc: "Every market segment comes with revenue potential, entry cost, and competitive density scoring" },
            { title: "GTM-Integrated Insights", desc: "Demand intelligence delivered directly into your planning workflows, not as a separate report" },
            { title: "Vertical-Specific Playbooks", desc: "20+ industry-specific demand mapping playbooks built from thousands of engagements" }
        ],
        whyMetrics: [
            { label: "Markets Analysed Daily", value: "300M+ signals" },
            { label: "Avg White Spaces Found per Client", value: "8 opportunities" },
            { label: "Improvement in TAM Accuracy", value: "±25% → ±5%" }
        ],
        servicesTitle: "Demand Discovery Services",
        servicesIncluded: [
            { icon: "Target", title: "Market Discovery", desc: "Continuous TAM/SAM analysis identifying unserved market segments.", points: ["Real-time market sizing", "White space identification", "Competitive density mapping"] },
            { icon: "Brain", title: "Demand Signal Intelligence", desc: "AI analysis of purchase intent, search behaviour, and category engagement across your TAM.", points: ["Intent signal aggregation", "Latent demand detection", "Category velocity tracking"] },
            { icon: "BarChart3", title: "Profit Pool Mapping", desc: "Quantify the revenue available across every segment in your addressable market.", points: ["Segment revenue sizing", "Entry cost modelling", "ROI prioritisation matrix"] },
            { icon: "Rocket", title: "Entry Timing Intelligence", desc: "Know precisely when to enter a market or category for maximum first-mover advantage.", points: ["Competitive window analysis", "Market readiness scoring", "Timing recommendation engine"] }
        ],
        processTitle: "Demand Discovery Process",
        process: [
            { title: "Market Landscape Mapping", desc: "Define the universe of your TAM, SAM, and SOM with AI-powered boundary detection beyond traditional analyst estimates.", duration: "Week 1–2" },
            { title: "Signal Network Deployment", desc: "Deploy monitoring across 300M+ demand signals: intent data, search trends, job postings, funding signals, and competitive moves.", duration: "Week 3" },
            { title: "Profit Pool Analysis", desc: "Quantify and rank every identified market segment by revenue potential, competitive density, and entry feasibility.", duration: "Week 4–5" },
            { title: "GTM Prioritisation", desc: "Translate demand intelligence into an actionable GTM roadmap with specific segment entry recommendations.", duration: "Week 6" },
            { title: "Ongoing Intelligence Monitoring", desc: "Live dashboard updated daily with new demand signals, market movements, and emerging opportunity alerts.", duration: "Ongoing" }
        ],
        techStack: ["Bombora", "G2", "6sense", "TechTarget", "Semrush", "SimilarWeb", "LinkedIn Insights", "CB Insights", "Crunchbase", "Snowflake"],
        benefitsTitle: "Demand Discovery Benefits",
        benefits: [
            { title: "First-Mover Market Advantage", desc: "Enter markets 12–18 months ahead of competitors with AI-sourced demand intelligence." },
            { title: "Capital Efficiency", desc: "Allocate marketing and sales budgets to segments with the highest validated demand density." },
            { title: "Reduced Market Risk", desc: "Quantified profit pools replace intuition-based market entry decisions with data-driven confidence." },
            { title: "Continuous Market Visibility", desc: "Replace annual planning-cycle research with a living intelligence platform updated daily." }
        ],
        metrics: [
            { value: "300M+", label: "Daily Demand Signals" },
            { value: "8×", label: "Opportunities Found" },
            { value: "±5%", label: "TAM Accuracy" },
            { value: "18mo", label: "First-Mover Window" }
        ],
        testimonials: [
            { quote: "We identified a $300M unserved market segment that we've since captured 40% of. The demand discovery ROI was 200×.", author: "Priya Nair", role: "Chief Strategy Officer", company: "Apex Logistics" }
        ],
        faqs: [
            { question: "How is this different from market research?", answer: "Traditional market research is a snapshot in time based on surveys and analyst estimates. Our demand discovery is continuous, AI-powered, and grounded in real buying behaviour signals — not opinions." },
            { question: "How granular can the market mapping go?", answer: "We can map demand at the company, geography, vertical, company size, and buying role level — giving you precision that aggregate market reports simply cannot provide." },
            { question: "What data sources do you use?", answer: "We combine 40+ data sources including intent networks, job posting data, funding signals, search trend analysis, competitive intelligence, and proprietary enrichment databases." }
        ]
    },

    /* ───────────────────────────────────────────────
     *  5. Customer Discovery
     * ─────────────────────────────────────────────── */
    "customer-discovery": {
        title: "Customer Discovery",
        category: "ICP Intelligence",
        heroDescription: "Build precise, living customer intelligence — mapping personas, journeys, sentiment, and lifetime value signals to make every GTM decision sharper.",
        heroStats: [
            { value: "94%", label: "ICP Accuracy" },
            { value: "3.1×", label: "LTV Improvement" },
            { value: "65%", label: "Lower Churn Risk" },
            { value: "48h", label: "Persona Delivery" }
        ],
        heroPoints: [
            "AI-powered customer segmentation across 50+ behavioural dimensions",
            "Real-time persona updates as market and product evolve",
            "Journey mapping that reveals hidden conversion blockers"
        ],
        overviewTitle: "Know Your Customer Like Never Before",
        overviewText: "Most companies operate on 2-year-old personas built from surveys that never quite represent their actual best customers. Customer Discovery builds living customer intelligence from real behavioural, firmographic, and outcome data.",
        overviewSub: "The result is a continuously updated picture of who your best customers are, what drives them, and how to acquire more of them at scale.",
        overviewCards: [
            { icon: "Users", title: "AI Segmentation", desc: "Cluster your customer base by 50+ behavioural and firmographic dimensions" },
            { icon: "Brain", title: "Persona Intelligence", desc: "Living personas updated with real purchase and engagement behaviour" },
            { icon: "Target", title: "Journey Mapping", desc: "End-to-end customer journey with friction point identification" },
            { icon: "BarChart3", title: "LTV Prediction", desc: "Identify which customers will be your most valuable over 3+ years" }
        ],
        problemTitle: "The Customer Insight Gap",
        problemText: "Decisions made on outdated or inaccurate customer data cost companies 20–30% of revenue through misaligned products, messaging, and channels.",
        problems: [
            { title: "Stale Personas", desc: "Survey-based personas updated annually can't keep pace with how your market and customers are actually evolving." },
            { title: "Poor Segmentation", desc: "Treating all customers the same results in generic messaging that resonates with nobody and converts poorly." },
            { title: "Hidden Churn Risk", desc: "Without behavioural intelligence, churn signals are invisible until the cancellation request arrives." },
            { title: "Missed Expansion Revenue", desc: "Not knowing which customers are ready for upsell results in leaving significant NRR on the table." }
        ],
        challengesTitle: "Customer Discovery Challenges",
        industryChallenges: [
            { title: "SaaS Products", desc: "Correlating product usage patterns with retention, expansion, and churn outcomes for intelligent lifecycle management." },
            { title: "Enterprise B2B", desc: "Understanding multi-stakeholder buying committees and mapping individual personas within complex accounts." },
            { title: "D2C & E-commerce", desc: "Building predictive LTV models from purchase history, browsing behaviour, and channel engagement data." },
            { title: "Financial Services", desc: "Segmenting customers by financial behaviour and life event triggers for compliant, timely cross-sell." },
            { title: "Healthcare", desc: "Mapping patient or provider decision journeys with privacy-compliant, HIPAA-safe intelligence." },
            { title: "Education & EdTech", desc: "Understanding learner personas and institutional buyer journeys across complex procurement cycles." }
        ],
        whyTitle: "Why ProfitMachines for Customer Discovery?",
        whyText: "We build customer intelligence that your entire organisation can act on — not just read in a report.",
        whyPoints: [
            { title: "Behavioural Data Foundation", desc: "Real purchase, engagement, and usage data — not survey responses" },
            { title: "50+ Segmentation Dimensions", desc: "Firmographic, technographic, behavioural, and outcome-based clustering" },
            { title: "Living Intelligence Platform", desc: "Personas and segments updated continuously as your customer base evolves" },
            { title: "GTM-Integrated Output", desc: "Insights delivered in your CRM, marketing automation, and customer success tools" }
        ],
        whyMetrics: [
            { label: "Customer Segmentation Accuracy", value: "94%" },
            { label: "Average LTV Improvement", value: "3.1×" },
            { label: "Churn Risk Reduction", value: "−65%" }
        ],
        servicesTitle: "Customer Discovery Services",
        servicesIncluded: [
            { icon: "Users", title: "AI Customer Segmentation", desc: "Cluster your customer base using machine learning across 50+ dimensions.", points: ["Behavioural clustering", "Firmographic grouping", "Outcome-based segments"] },
            { icon: "Brain", title: "Living Persona Development", desc: "Build continuously updated buyer personas grounded in real behavioural data.", points: ["Data-driven persona profiles", "Persona evolution tracking", "Sales enablement integration"] },
            { icon: "Target", title: "Customer Journey Mapping", desc: "Map the full customer journey with friction point identification and optimisation recommendations.", points: ["Multi-touchpoint journey analysis", "Friction point heatmaps", "Conversion path optimisation"] },
            { icon: "BarChart3", title: "LTV & Churn Prediction", desc: "Predict customer lifetime value and churn risk up to 90 days in advance.", points: ["LTV prediction models", "Churn risk scoring", "Expansion trigger detection"] }
        ],
        processTitle: "Customer Discovery Process",
        process: [
            { title: "Customer Data Audit", desc: "Assess all available customer data: CRM, product analytics, support tickets, purchase history, and engagement data.", duration: "Week 1" },
            { title: "AI Segmentation Analysis", desc: "Run clustering algorithms across all data sources to identify natural customer segments and their characteristics.", duration: "Week 2–3" },
            { title: "Persona Development", desc: "Build detailed, data-grounded personas for each key segment with messaging, channel, and offer recommendations.", duration: "Week 4" },
            { title: "Journey Mapping & Friction Analysis", desc: "Map the end-to-end customer journey for each persona, identifying conversion blockers and optimisation opportunities.", duration: "Week 5–6" },
            { title: "GTM Integration & Ongoing Updates", desc: "Deliver insights into CRM and marketing tools. Set up continuous persona update cycles as new data arrives.", duration: "Ongoing" }
        ],
        techStack: ["Python ML", "AWS SageMaker", "Mixpanel", "Amplitude", "Salesforce", "HubSpot", "Segment", "Heap Analytics", "Looker"],
        benefitsTitle: "Customer Discovery Benefits",
        benefits: [
            { title: "Precision GTM Targeting", desc: "Market to the right customers with the right message at the right time." },
            { title: "Higher Conversion Rates", desc: "Persona-aligned messaging improves conversion rates across every channel." },
            { title: "Proactive Churn Prevention", desc: "Detect and intercept churn risk 90 days before it happens." },
            { title: "Increased LTV", desc: "Identify and pursue the highest-value customers for maximum revenue impact." }
        ],
        metrics: [
            { value: "94%", label: "ICP Accuracy" },
            { value: "3.1×", label: "LTV Uplift" },
            { value: "65%", label: "Churn Reduction" },
            { value: "48h", label: "Insight Delivery" }
        ],
        testimonials: [
            { quote: "The persona intelligence transformed our messaging. Conversion rates went up 82% in the first quarter.", author: "Lisa Chang", role: "CMO", company: "Orbit Software" }
        ],
        faqs: [
            { question: "Do you need access to our customer data?", answer: "We work with data you securely share — either through direct integration with your CRM and analytics tools, or via anonymised data exports. We never require raw PII beyond what's necessary." },
            { question: "How often are personas updated?", answer: "Personas are updated on a monthly cadence with immediate alerts triggered when significant segment shifts are detected." },
            { question: "Can this work for pre-launch companies?", answer: "Yes. For pre-launch products, we use market proxy data, competitor customer intelligence, and job-to-be-done analysis to build predictive personas." }
        ]
    },

    /* ───────────────────────────────────────────────
     *  6. Competitive Discovery
     * ─────────────────────────────────────────────── */
    "competitive-discovery": {
        title: "Competitive Discovery",
        category: "Competitive Intelligence",
        heroDescription: "Gain a decisive competitive edge with AI-powered intelligence that monitors, analyses, and responds to competitor moves in real time — before they impact your pipeline.",
        heroStats: [
            { value: "24/7", label: "Competitive Monitoring" },
            { value: "89%", label: "Win Rate on Competitive Deals" },
            { value: "3d", label: "Alert to Action Time" },
            { value: "50+", label: "Tracked Signals Per Competitor" }
        ],
        heroPoints: [
            "Real-time competitor monitoring across pricing, product, messaging, and hiring",
            "AI-generated competitive battlecards updated as intel arrives",
            "Win/loss analysis that reveals exactly why deals are being lost"
        ],
        overviewTitle: "Know What Competitors Are Doing Before They Do It",
        overviewText: "Competitive intelligence traditionally means reading press releases and attending industry events. Our AI monitors 50+ signals per competitor continuously — surfacing strategic moves, pricing changes, product launches, and hiring signals that predict their next actions.",
        overviewSub: "The result is a competitive advantage that compounds: every insight makes your positioning sharper and your win rate higher.",
        overviewCards: [
            { icon: "Shield", title: "Competitor Monitoring", desc: "50+ real-time signals per tracked competitor, 24/7" },
            { icon: "Brain", title: "AI Battlecard Generation", desc: "Auto-updated competitive positioning assets for your sales team" },
            { icon: "Target", title: "Win/Loss Intelligence", desc: "AI analysis of every competitive deal outcome" },
            { icon: "BarChart3", title: "Market Share Tracking", desc: "Continuous share of voice and market positioning analysis" }
        ],
        problemTitle: "The Competitive Blind Spot",
        problemText: "Most companies don't know why they're losing competitive deals until it's too late to respond — and they have no early warning when competitors make strategic moves.",
        problems: [
            { title: "Reactive Positioning", desc: "Learning about competitor price cuts or product launches from customers who've already switched." },
            { title: "Stale Battlecards", desc: "Competitive materials updated quarterly can't keep pace with competitors who ship updates weekly." },
            { title: "Unknown Win/Loss Drivers", desc: "Without structured competitive analysis, teams repeat the same mistakes in competitive deals." },
            { title: "No Displacement Intelligence", desc: "Missing the early signals that indicate a competitor customer is ready to switch — and not having a plan to capture them." }
        ],
        challengesTitle: "Competitive Intelligence Challenges",
        industryChallenges: [
            { title: "Fast-Moving SaaS Markets", desc: "Competitors ship product updates weekly — intelligence needs to match that cadence." },
            { title: "Price-Sensitive B2B", desc: "Detecting competitor pricing moves before they impact your renewal and new business conversations." },
            { title: "Enterprise Sales", desc: "Understanding competitor relationships, contract structures, and expansion strategies within named accounts." },
            { title: "Emerging Market Categories", desc: "Tracking new entrants before they achieve the awareness needed to appear in analyst reports." },
            { title: "Global Competition", desc: "Monitoring competitive moves across multiple geographies with different market dynamics." },
            { title: "Talent War Intelligence", desc: "Understanding competitor hiring patterns to anticipate product roadmap and go-to-market moves." }
        ],
        whyTitle: "Why ProfitMachines for Competitive Discovery?",
        whyText: "We turn competitive intelligence from a periodic research project into a daily strategic advantage for your sales and GTM teams.",
        whyPoints: [
            { title: "50+ Signals Per Competitor", desc: "Pricing, product, messaging, hiring, funding, partnerships, and customer reviews — all monitored continuously" },
            { title: "AI-Generated Battlecards", desc: "Competitive positioning assets auto-updated in hours, not weeks — always current for your sales team" },
            { title: "Win/Loss AI Analysis", desc: "Every competitive deal outcome analysed to identify patterns and improve future win rates" },
            { title: "Displacement Campaign Engine", desc: "Identify and target competitor customers showing dissatisfaction signals with precision outreach" }
        ],
        whyMetrics: [
            { label: "Win Rate on Competitive Deals", value: "89%" },
            { label: "Average Alert-to-Action Time", value: "< 3 days" },
            { label: "Signals Monitored Per Competitor", value: "50+" }
        ],
        servicesTitle: "Competitive Discovery Services",
        servicesIncluded: [
            { icon: "Shield", title: "Competitor Monitoring Platform", desc: "Continuous 24/7 monitoring of 50+ signals per tracked competitor.", points: ["Pricing change detection", "Product launch tracking", "Hiring signal analysis", "Messaging shift alerts"] },
            { icon: "Brain", title: "AI Battlecard Generation", desc: "Auto-updated competitive positioning documents for every selling scenario.", points: ["Feature comparison matrices", "Objection handling scripts", "Proof point recommendations"] },
            { icon: "Target", title: "Win/Loss Intelligence", desc: "Structured analysis of every competitive deal outcome with pattern recognition.", points: ["Win/loss interview automation", "Competitive pattern detection", "Coaching recommendations"] },
            { icon: "Rocket", title: "Displacement Campaign Engine", desc: "Identify competitor customers showing dissatisfaction and launch precision displacement campaigns.", points: ["Competitor review monitoring", "Contract expiry tracking", "Targeted displacement outreach"] }
        ],
        processTitle: "Competitive Discovery Process",
        process: [
            { title: "Competitive Landscape Mapping", desc: "Identify and categorise all direct, indirect, and emerging competitors relevant to your market position.", duration: "Week 1" },
            { title: "Signal Network Deployment", desc: "Configure monitoring for 50+ signals per competitor across product, pricing, messaging, hiring, and customer sentiment.", duration: "Week 2" },
            { title: "Battlecard Development", desc: "Create initial competitive battlecards and positioning frameworks for your sales team.", duration: "Week 3" },
            { title: "Win/Loss Analysis Programme", desc: "Launch structured competitive deal analysis to identify patterns in wins and losses.", duration: "Week 4–6" },
            { title: "Ongoing Intelligence & Alerts", desc: "Daily monitoring, weekly intelligence digests, and real-time alerts for significant competitive moves.", duration: "Ongoing" }
        ],
        techStack: ["G2", "Trustpilot", "LinkedIn", "Crunchbase", "ProductHunt", "Klue", "Crayon", "Semrush", "SimilarWeb", "BambooHR APIs"],
        benefitsTitle: "Competitive Intelligence Benefits",
        benefits: [
            { title: "Higher Win Rates", desc: "AI-informed competitive positioning significantly improves win rates in competitive deals." },
            { title: "Proactive Market Positioning", desc: "Anticipate competitor moves and adjust your positioning before they impact pipeline." },
            { title: "Faster Battlecard Updates", desc: "Competitive materials updated in hours when competitor moves are detected — not weeks later." },
            { title: "New Revenue from Displacement", desc: "Systematic competitor customer targeting creates a new pipeline source from existing market demand." }
        ],
        metrics: [
            { value: "89%", label: "Competitive Win Rate" },
            { value: "3d", label: "Alert Response Time" },
            { value: "50+", label: "Signals Monitored" },
            { value: "24/7", label: "Live Monitoring" }
        ],
        testimonials: [
            { quote: "We spotted a competitor pricing change 3 days before our renewal conversations. We pre-empted every objection and had our best renewal quarter ever.", author: "James Park", role: "VP Sales", company: "DataStream AI" }
        ],
        faqs: [
            { question: "How many competitors can you track?", answer: "Our standard programmes cover 5–10 competitors in depth. We can scale to 20+ for enterprise clients with broader competitive landscapes." },
            { question: "How quickly do battlecards update when a competitor makes a move?", answer: "Significant moves trigger an alert within hours and a battlecard update within 24–48 hours — far faster than any manual research process." },
            { question: "Can you track private companies?", answer: "Yes. We use hiring signals, product review platforms, customer feedback, and partnership announcements to track private competitors effectively even without financial disclosures." }
        ]
    },

    /* ───────────────────────────────────────────────
     *  7. Product Market Fit
     * ─────────────────────────────────────────────── */
    "product-market-fit": {
        title: "Product Market Fit",
        category: "PMF Intelligence",
        heroDescription: "Validate, measure, and accelerate product-market fit with AI-powered customer feedback analysis, adoption signal tracking, and retention intelligence.",
        heroStats: [
            { value: "6×", label: "Faster PMF Validation" },
            { value: "91%", label: "Retention Rate Post-PMF" },
            { value: "40%", label: "Faster GTM Pivot Speed" },
            { value: "30d", label: "First PMF Signal" }
        ],
        heroPoints: [
            "Real-time PMF signal detection from product usage and NPS data",
            "Customer cohort analysis revealing retention patterns and expansion triggers",
            "AI-guided pivot recommendations when PMF is not yet achieved"
        ],
        overviewTitle: "Stop Guessing, Start Knowing Your PMF",
        overviewText: "Product-market fit isn't binary — it's a spectrum. Our AI models track 20+ PMF signals continuously, giving you a precise, real-time view of where you stand and what to do to improve it.",
        overviewSub: "Whether you're pre-PMF and validating, or post-PMF and looking to expand, our intelligence platform guides every product and GTM decision with data.",
        overviewCards: [
            { icon: "BarChart3", title: "PMF Signal Tracking", desc: "20+ real-time indicators of product-market fit status" },
            { icon: "Users", title: "Cohort Retention Analysis", desc: "Deep retention analytics by segment, channel, and use case" },
            { icon: "Brain", title: "NPS Intelligence", desc: "AI analysis of qualitative feedback at scale" },
            { icon: "Lightbulb", title: "Pivot Recommendations", desc: "Data-driven guidance when signals indicate PMF misalignment" }
        ],
        problemTitle: "The PMF Measurement Problem",
        problemText: "Founders and product teams often feel PMF rather than measure it — leading to premature scaling or prolonged pivoting that burns runway.",
        problems: [
            { title: "Vanity Metrics vs Real Signals", desc: "Downloads, signups, and DAUs don't tell you if you have PMF — only the right combination of retention and engagement signals do." },
            { title: "Premature Scaling", desc: "Companies that scale before achieving genuine PMF waste capital on growth that churn immediately reverses." },
            { title: "Survey Bias", desc: "NPS surveys and customer interviews give biased, incomplete pictures of actual product-market alignment." },
            { title: "Slow Feedback Loops", desc: "Monthly or quarterly reviews of retention data are too slow to inform rapid product iteration decisions." }
        ],
        challengesTitle: "PMF Challenges by Stage",
        industryChallenges: [
            { title: "Pre-Seed & Seed Startups", desc: "Validating PMF with limited users before committing to a full product build and GTM investment." },
            { title: "Series A Scale-ups", desc: "Proving repeatable, scalable PMF to investors while simultaneously expanding into new customer segments." },
            { title: "Enterprise Product Teams", desc: "Measuring PMF for internal platform products where traditional market signals don't apply." },
            { title: "Vertical SaaS", desc: "Validating fit within a specific industry vertical where the ICP is narrow and every data point is precious." },
            { title: "Platform & Marketplace Products", desc: "Understanding two-sided PMF across both supply and demand, with distinct signals for each." },
            { title: "International Expansion", desc: "Validating that PMF achieved in one market genuinely transfers to new geographies with different buyer behaviours." }
        ],
        whyTitle: "Why ProfitMachines for PMF Intelligence?",
        whyText: "We've helped companies across 20+ industries navigate from pre-PMF to confident scaling — and our AI models know exactly which signals matter at each stage.",
        whyPoints: [
            { title: "20+ PMF Signal Tracking", desc: "Retention curves, NPS cohorts, usage depth, expansion revenue, and word-of-mouth — all measured simultaneously" },
            { title: "Real-Time PMF Dashboard", desc: "Daily visibility into your PMF status, not a quarterly retrospective" },
            { title: "Qualitative at Scale", desc: "AI analysis of support tickets, reviews, and interview transcripts to surface recurring themes instantly" },
            { title: "Investor-Ready Reporting", desc: "PMF evidence packages prepared for Series A through C fundraising conversations" }
        ],
        whyMetrics: [
            { label: "PMF Validation Speed", value: "6× faster" },
            { label: "Post-PMF Retention Rate", value: "91%" },
            { label: "GTM Pivot Speed", value: "−40% time" }
        ],
        servicesTitle: "Product Market Fit Services",
        servicesIncluded: [
            { icon: "BarChart3", title: "PMF Signal Dashboard", desc: "Real-time monitoring of 20+ product-market fit indicators.", points: ["Retention curve analysis", "Engagement depth scoring", "Expansion signal detection"] },
            { icon: "Users", title: "Customer Cohort Analysis", desc: "Deep cohort segmentation revealing which customers have genuine product-market fit.", points: ["Cohort retention heatmaps", "Feature adoption analysis", "Expansion cohort identification"] },
            { icon: "Brain", title: "Qualitative Intelligence at Scale", desc: "AI analysis of NPS responses, support tickets, reviews, and interviews.", points: ["Theme extraction AI", "Sentiment trend tracking", "Product gap identification"] },
            { icon: "Lightbulb", title: "PMF Pivot Intelligence", desc: "When signals indicate misalignment, AI-guided recommendations on what to change and how.", points: ["Segment pivot analysis", "Positioning reframing guidance", "Priority feature recommendations"] }
        ],
        processTitle: "PMF Discovery Process",
        process: [
            { title: "Current State PMF Audit", desc: "Assess all available usage, retention, and feedback data to establish a precise baseline PMF score.", duration: "Week 1" },
            { title: "Signal Infrastructure Setup", desc: "Deploy tracking for all 20+ PMF signals across your product analytics, CRM, and customer success tools.", duration: "Week 2" },
            { title: "First Cohort Analysis", desc: "Analyse existing customer cohorts to identify which segments show the strongest PMF characteristics.", duration: "Week 3" },
            { title: "Qualitative Intelligence Programme", desc: "Launch structured NPS, interview, and review analysis to surface what's driving retention and churn.", duration: "Week 4–6" },
            { title: "Ongoing PMF Monitoring & Reporting", desc: "Daily PMF dashboard, weekly signal alerts, and monthly strategy reviews with your product and GTM teams.", duration: "Ongoing" }
        ],
        techStack: ["Mixpanel", "Amplitude", "Segment", "Heap", "Typeform", "Intercom", "Zendesk", "App Store APIs", "G2", "Trustpilot", "Python NLP"],
        benefitsTitle: "PMF Intelligence Benefits",
        benefits: [
            { title: "Validate Faster", desc: "Reduce PMF discovery time from 12–18 months to 3–6 months with systematic signal tracking." },
            { title: "Scale with Confidence", desc: "Know precisely when you have genuine PMF before committing to aggressive GTM spending." },
            { title: "Reduce Churn", desc: "Identify and fix PMF gaps before they manifest as churn at scale." },
            { title: "Fundraise with Evidence", desc: "Present investors with quantitative PMF evidence that goes far beyond anecdotal customer quotes." }
        ],
        metrics: [
            { value: "6×", label: "Faster Validation" },
            { value: "91%", label: "Post-PMF Retention" },
            { value: "30d", label: "First Signal" },
            { value: "40%", label: "Faster Pivots" }
        ],
        testimonials: [
            { quote: "We went from 'we think we have PMF' to 'we can prove we have PMF' in 8 weeks. The Series A closed at 2× our target valuation.", author: "Aisha Mensah", role: "CEO & Co-Founder", company: "HealthLoop" }
        ],
        faqs: [
            { question: "When should we start tracking PMF?", answer: "As soon as you have your first 10 paying customers. The earlier you instrument PMF signals, the faster you can iterate to genuine fit." },
            { question: "Is there a standard PMF threshold?", answer: "The famous '40% rule' (40% of customers saying they'd be 'very disappointed' without your product) is a useful benchmark, but true PMF is multi-dimensional. We track 20+ signals to give you a complete picture." },
            { question: "Can you help us figure out what to change if we don't have PMF?", answer: "Yes. Pivot intelligence is a core part of our programme — AI analysis of your customer data surfaces the specific changes (segment, positioning, features, pricing) most likely to unlock PMF." }
        ]
    }
};
