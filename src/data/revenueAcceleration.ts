import {
    Target, TrendingUp,  BarChart3,  Zap,  MessageSquare,
    Settings, RefreshCw,       
           Rocket,  } from 'lucide-react';

export const revenueAccelerationData = {
    title: "AI-Powered Revenue Acceleration",
    tagline: "Predictive AI That Drives Demand, Boosts Conversions & Scales Revenue",
    description: "ProfitMachines delivers an integrated suite of AI-driven growth solutions that transform how B2B organizations generate demand, accelerate sales cycles, optimize revenue operations, and unlock predictable growth. By combining advanced machine learning, automated workflows, and predictive insights, we help enterprises reduce manual friction, amplify pipeline velocity, and turn data into measurable revenue outcomes — from demand discovery to closed-won deals.",
    kpis: [
        { label: "High-Quality Leads", value: "24X", suffix: "Increase", description: "generated through automated demand discovery and nurturing." },
        { label: "Conversion Rates", value: "3X", suffix: "Boost", description: "across key funnel stages." },
        { label: "Sales Cycle", value: "50%+", suffix: "Reduction", description: "in duration via AI-orchestrated workflows." },
        { label: "Pipeline Velocity", value: "20-40%", suffix: "Uplift", description: "through intelligent lead scoring and prioritization." },
        { label: "Forecast Accuracy", value: "85%+", suffix: "Predictive", description: "in sales forecasting and deal outcomes." },
        { label: "Campaign Engagement", value: "30-60%", suffix: "Improvement", description: "via adaptive segmentation and personalization." }
    ],
    portfolio: [
        { icon: Target, title: "AI Demand Generation", description: "Fuel your pipeline with automated, AI-driven demand discovery, micro-segmentation, and multi-channel outreach that activates prospects at scale and delivers quality leads 24/7." },
        { icon: Rocket, title: "AI Growth Hacking", description: "Accelerate top-line growth with AI-optimized engagement pathways and high-impact experiments that amplify conversion rates and discover untapped revenue levers." },
        { icon: Zap, title: "AI Lean Sales", description: "Streamline and scale your sales engine with data-driven workflows, automated nurturing touchpoints, and AI-powered insights to eliminate bottlenecks and close deals faster." },
        { icon: Settings, title: "AI Revenue Ops", description: "Transform operations with real-time visibility into revenue performance, predictive analytics, and automated optimization to unlock seamless execution across marketing, sales, and revenue teams." },
        { icon: MessageSquare, title: "Automated Lead Nurturing", description: "Keep prospects engaged with AI-orchestrated nurturing journeys that deliver contextual content and prompts based on behavior, boosting conversion likelihood." },
        { icon: BarChart3, title: "Predictive Sales Analytics", description: "Leverage advanced forecasting models that identify trends, score deals, and anticipate churn — translating data into actionable decisions for predictable growth." },
        { icon: RefreshCw, title: "Conversion Optimization", description: "Optimize every customer touchpoint using AI-driven tests, personalized value messaging, and adaptive engagement logic that maximizes conversion efficiency." },
        { icon: TrendingUp, title: "ARR Acceleration", description: "Increase your annual recurring revenue with strategic automation, churn mitigation modeling, and revenue expansion tactics powered by AI intelligence." }
    ],
    verticalTabs: [
        {
            id: "ai-demand",
            title: "AI Demand Generation",
            challenges: ["Low demand visibility", "Stagnant lead flow", "High acquisition costs"],
            painPoints: ["Poor audience segmentation", "Manual prospecting drains resources", "Irregular lead quality"],
            solutions: ["AI-powered demand discovery maps target segments", "Automated multi-channel outreach", "Behavioral micro-segmentation for precision targeting"],
            benefits: ["Consistent high-quality lead inflow", "Lower acquisition cost per lead", "Scalable demand activation"]
        },
        {
            id: "ai-growth",
            title: "AI Growth Hacking",
            challenges: ["Growth plateau", "Ineffective campaign performance", "Slow feedback loops for optimization"],
            painPoints: ["Siloed analytics", "Inconsistent experimentation", "Low conversion velocity"],
            solutions: ["Intelligent campaign orchestration", "AI-driven engagement optimization", "Self-learning funnel experiments"],
            benefits: ["Rapid discovery of growth levers", "Improved engagement rates", "Increased top-line acceleration"]
        },
        {
            id: "ai-sales",
            title: "AI Lean Sales",
            challenges: ["Sales bottlenecks", "Long sales cycles", "Manual follow-ups"],
            painPoints: ["Lost opportunities due to slow response", "Inefficient lead prioritization", "Inconsistent sales execution"],
            solutions: ["Automated nurturing & follow-ups", "Predictive lead scoring", "Streamlined sales workflows"],
            benefits: ["Shorter sales cycles", "Higher win rates", "Reduced operational overhead"]
        },
        {
            id: "ai-revops",
            title: "AI Revenue Ops",
            challenges: ["Disconnected revenue systems", "Forecasting inaccuracies", "Limited operational visibility"],
            painPoints: ["Fragmented data sources", "Reactive decision-making", "Manual reconciliation"],
            solutions: ["Unified revenue dashboards", "Predictive ops analytics", "Automated performance insights"],
            benefits: ["Reliable revenue forecasts", "Continuous performance optimization", "Enhanced team alignment"]
        },
        {
            id: "predictive-analytics",
            title: "Predictive Sales Analytics",
            challenges: ["Guesswork in forecasts", "Inability to anticipate churn", "Weak sales planning"],
            painPoints: ["Over-reliance on historical data", "Delayed insights", "Reactive risk management"],
            solutions: ["Machine-learning forecasting models", "Real-time pipeline health signals", "AI risk detection & churn alerts"],
            benefits: ["Predictable revenue outcomes", "Proactive pipeline management", "Better resource allocation"]
        }
    ]
};
