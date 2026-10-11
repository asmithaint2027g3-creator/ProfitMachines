import {
    Radio, Crosshair, Radar, Users, Map, Share2, Search, LayoutDashboard,
         
       } from 'lucide-react';

export const demandDiscoveryData = {
    title: "AI-Powered Demand Discovery Engine",
    tagline: "Uncover Real Buying Intent. Create Demand Before the Market Asks.",
    description: "The AI-Powered Demand Discovery Engine is designed to identify, qualify, and prioritize latent and active demand across markets, accounts, and buyer personas—before competitors react. By combining intent intelligence, behavioral signals, market sensing, and predictive analytics, the engine transforms scattered data into a continuous stream of actionable demand insights. It enables enterprises to move from reactive lead generation to proactive demand creation, aligning sales, marketing, and product teams around high-confidence revenue opportunities.",
    kpis: [
        { label: "Demand Signals Identified", value: "15X–30X", suffix: "Increase", description: "in high-intent demand signals identified." },
        { label: "SAL Quality", value: "3X", suffix: "Improvement", description: "in sales-accepted lead (SAL) quality." },
        { label: "Marketing Efficiency", value: "40%–60%", suffix: "Reduction", description: "in wasted marketing spend." },
        { label: "Pipeline Velocity", value: "2.5X", suffix: "Faster", description: "pipeline creation velocity." },
        { label: "Intent Prediction", value: "90%+", suffix: "Accuracy", description: "in account-level intent prediction." },
        { label: "Win Probability", value: "35%–50%", suffix: "Increase", description: "for targeted accounts." },
        { label: "Deal Value", value: "25%+", suffix: "Uplift", description: "in average deal value through better-fit demand." }
    ],
    portfolio: [
        { icon: Radio, title: "AI Intent Signal Intelligence", description: "Aggregates and analyzes multi-source intent signals to detect real buying readiness at account and persona levels." },
        { icon: Crosshair, title: "Predictive Demand Scoring", description: "AI models rank accounts, industries, and opportunities based on likelihood to convert and revenue potential." },
        { icon: Radar, title: "Market & Category Sensing", description: "Continuously monitors market movements, competitor activity, and emerging demand patterns." },
        { icon: Users, title: "Account-Based Demand Discovery (ABDD)", description: "Identifies whitespace opportunities within named accounts and ICP-aligned segments." },
        { icon: Map, title: "Buyer Journey Mapping", description: "AI-driven reconstruction of buyer journeys to understand triggers, blockers, and conversion paths." },
        { icon: Share2, title: "Demand-to-Pipeline Orchestration", description: "Automates routing of discovered demand into GTM motions with next-best-action recommendations." },
        { icon: Search, title: "Opportunity Whitespace Analysis", description: "Uncovers unmet needs, cross-sell, and upsell demand across existing and new customers." },
        { icon: LayoutDashboard, title: "Demand Intelligence Dashboard", description: "A centralized, real-time command center for demand insights, trends, and revenue impact." }
    ],
    verticalTabs: [
        {
            title: "Demand Signal Discovery & Intent Intelligence",
            challenges: ["Markets feel saturated, yet revenue growth stalls", "Teams chase leads instead of uncovering real demand", "Buying intent is invisible until too late"],
            painPoints: ["Overreliance on form fills and cold outreach", "Poor differentiation between curiosity and intent", "Late entry into buying cycles"],
            solutions: ["AI aggregation of digital, behavioral, firmographic, and ecosystem signals", "Real-time intent classification and confidence scoring", "Early detection of buying triggers and demand inflection points"],
            benefits: ["Earlier access to in-market buyers", "Higher signal-to-noise ratio", "First-mover advantage in deal pursuit"]
        },
        {
            title: "Account-Based Demand Discovery",
            challenges: ["Named accounts show low engagement", "ABM campaigns fail to convert", "Limited visibility into account-level needs"],
            painPoints: ["Generic account targeting", "No insight into internal buying committees", "Missed expansion opportunities"],
            solutions: ["AI-driven account behavior and intent clustering", "Buying group and persona-level demand mapping", "Account readiness and opportunity scoring"],
            benefits: ["Stronger ABM ROI", "Higher enterprise deal success rates", "Increased account penetration and expansion"]
        },
        {
            title: "Predictive Market & Category Intelligence",
            challenges: ["GTM strategy lags market shifts", "Emerging demand goes unnoticed", "Product-market fit erodes silently"],
            painPoints: ["Static market research", "Lagging indicators", "Reactive product and sales decisions"],
            solutions: ["Continuous AI-based market sensing", "Trend detection across industries, regions, and segments", "Predictive demand forecasts by category"],
            benefits: ["Proactive GTM strategy", "Better product positioning", "Early entry into emerging demand pockets"]
        },
        {
            title: "Buyer Journey & Demand Context Mapping",
            challenges: ["Buyers stall mid-funnel", "Sales teams misread buyer intent", "Messaging fails to resonate"],
            painPoints: ["One-size-fits-all outreach", "Lack of journey visibility", "Poor alignment between marketing and sales"],
            solutions: ["AI reconstruction of buyer journeys across touchpoints", "Identification of friction points and conversion triggers", "Context-aware messaging and engagement guidance"],
            benefits: ["Higher engagement rates", "Faster progression through funnels", "Improved buyer experience"]
        },
        {
            title: "Demand-to-Pipeline Conversion Orchestration",
            challenges: ["Demand insights don’t translate into pipeline", "Slow response to high-intent signals", "GTM teams operate in silos"],
            painPoints: ["Manual handoffs", "Missed timing windows", "Fragmented execution"],
            solutions: ["Automated routing of demand insights into CRM and GTM tools", "AI-driven next-best-action recommendations", "Closed-loop learning from outcomes"],
            benefits: ["Faster pipeline creation", "Higher conversion efficiency", "Aligned revenue execution"]
        },
        {
            title: "Revenue Whitespace & Expansion Discovery",
            challenges: ["Existing customers under-monetized", "Expansion depends on intuition", "Churn risk not anticipated"],
            painPoints: ["Limited insight into unmet needs", "Reactive upsell strategies", "Missed renewal signals"],
            solutions: ["AI-driven whitespace and expansion opportunity detection", "Predictive churn and growth indicators", "Contextual expansion recommendations"],
            benefits: ["Increased customer lifetime value", "Lower churn risk", "Compounding ARR growth"]
        }
    ]
};
