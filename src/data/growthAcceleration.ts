import {
    FlaskConical, Repeat, Layers, UserCheck, Shield, TrendingUp,
    LayoutDashboard,     
    } from 'lucide-react';

export const growthAccelerationData = {
    title: "AI Growth Acceleration Engine",
    tagline: "Engineer Growth. Automate Scale. Dominate Markets.",
    description: "The AI-Driven Growth Hacking Engine is designed to systematically unlock exponential growth by automating experimentation, optimizing user journeys, and continuously discovering scalable growth levers. ProfitMachines replaces guesswork with machine-driven insights, enabling companies to achieve compounding growth across acquisition, activation, engagement, retention, and monetization.",
    kpis: [
        { label: "Experimentation Cycles", value: "10X", suffix: "Faster", description: "faster growth experimentation cycles." },
        { label: "Activation Rates", value: "3X–5X", suffix: "Improvement", description: "improvement in activation rates." },
        { label: "User Engagement", value: "2X–4X", suffix: "Uplift", description: "uplift in user engagement." },
        { label: "Churn Rate", value: "40%–60%", suffix: "Reduction", description: "reduction in churn." },
        { label: "Referral & Virality", value: "3X", suffix: "Increase", description: "increase in referral and virality loops." },
        { label: "LTV/CAC Ratio", value: "2.5X", suffix: "Improvement", description: "improvement in LTV/CAC ratio." }
    ],
    portfolio: [
        { icon: FlaskConical, title: "AI Growth Experimentation Lab", description: "Automated hypothesis testing across product, marketing, and sales funnels." },
        { icon: Repeat, title: "Viral Loop Engineering", description: "Designs and optimizes self-propagating growth loops." },
        { icon: Layers, title: "Product-Led Growth (PLG) Optimization", description: "AI-guided onboarding, activation, and feature adoption." },
        { icon: UserCheck, title: "Behavioral Engagement Engine", description: "Personalized engagement journeys driven by behavioral intelligence." },
        { icon: Shield, title: "Retention Intelligence", description: "Predictive churn modeling and intervention strategies." },
        { icon: TrendingUp, title: "Monetization Optimization", description: "AI-driven pricing, packaging, and upsell optimization." },
        { icon: LayoutDashboard, title: "Growth Intelligence Dashboard", description: "Unified growth analytics and experimentation control center." }
    ],
    verticalTabs: [
        {
            title: "Growth Experimentation",
            challenges: ["Slow growth", "Unclear growth drivers"],
            painPoints: ["Guesswork decisions", "Long test cycles"],
            solutions: ["AI hypothesis engine", "Automated testing"],
            benefits: ["Faster learning", "Scalable growth"]
        },
        {
            title: "Viral & Referral Growth",
            challenges: ["High CAC", "Weak organic growth"],
            painPoints: ["Paid dependency", "Poor referrals"],
            solutions: ["Viral mechanics", "Referral optimization"],
            benefits: ["Lower CAC", "Organic scale"]
        },
        {
            title: "Activation & Engagement",
            challenges: ["Low activation", "Feature drop-off"],
            painPoints: ["Poor onboarding", "Weak retention"],
            solutions: ["AI onboarding flows", "Engagement journeys"],
            benefits: ["Higher retention", "Better product adoption"]
        },
        {
            title: "Retention Intelligence",
            challenges: ["Rising churn", "Flat LTV"],
            painPoints: ["Reactive retention", "Late interventions"],
            solutions: ["Churn prediction", "Behavior scoring"],
            benefits: ["Lower churn", "Higher LTV"]
        },
        {
            title: "Monetization Optimization",
            challenges: ["Revenue stagnation", "Pricing inefficiency"],
            painPoints: ["Poor upsell", "Revenue leakage"],
            solutions: ["AI pricing models", "Expansion intelligence"],
            benefits: ["Faster ARR growth", "Better monetization"]
        }
    ]
};
