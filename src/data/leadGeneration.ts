import {
    Users, Scan, Share2, TrendingUp, CheckCircle, RotateCcw,
    Settings, FastForward,     } from 'lucide-react';

export const leadGenerationData = {
    title: "AI-Driven Lead Generation Acceleration",
    tagline: "Generate More of the Right Leads. Convert Faster. Scale Predictably.",
    description: "The AI-Driven Lead Generation Acceleration offering enables enterprises to move beyond volume-based lead generation to precision-driven, intent-led pipeline creation. By leveraging AI for audience intelligence, intent detection, multi-channel orchestration, and continuous optimization, this solution identifies and engages high-propensity buyers at the right time with the right message. The result is a consistent flow of sales-ready leads that convert faster, cost less, and drive sustainable revenue growth.",
    kpis: [
        { label: "High-Quality Leads", value: "12-24X", suffix: "Increase", description: "increase in high-quality inbound and outbound leads" },
        { label: "Conversion Rate", value: "2.5-3.5X", suffix: "Improvement", description: "improvement in lead-to-opportunity conversion" },
        { label: "Cost Per Lead", value: "35-50%", suffix: "Reduction", description: "reduction in cost per qualified lead (CPL)" },
        { label: "Qualification Speed", value: "40-60%", suffix: "Faster", description: "faster lead qualification and routing" },
        { label: "Scoring Accuracy", value: "90%+", suffix: "Accuracy", description: "accuracy in AI-based lead scoring" },
        { label: "Pipeline Uplift", value: "25-45%", suffix: "Contribution", description: "uplift in pipeline contribution from marketing" },
        { label: "Sales Accepted Leads", value: "30%+", suffix: "Increase", description: "increase in sales-accepted leads (SALs)" }
    ],
    portfolio: [
        { icon: Users, title: "AI Audience & ICP Intelligence", description: "AI-driven identification and refinement of ideal customer profiles, personas, and buying committees." },
        { icon: Scan, title: "Intent-Based Lead Identification", description: "Detects active buying signals across digital touchpoints to surface high-intent prospects early." },
        { icon: Share2, title: "Multi-Channel Lead Orchestration", description: "AI-coordinated engagement across email, web, paid media, social, and outbound channels." },
        { icon: TrendingUp, title: "Predictive Lead Scoring", description: "ML models that prioritize leads based on likelihood to convert and revenue potential." },
        { icon: CheckCircle, title: "Automated Lead Qualification", description: "Real-time enrichment, validation, and qualification to deliver sales-ready leads." },
        { icon: RotateCcw, title: "Always-On Lead Nurturing", description: "Adaptive AI-powered nurture flows that evolve based on prospect behavior." },
        { icon: Settings, title: "Campaign Performance Optimization", description: "Continuous AI optimization of messaging, timing, channels, and budgets." },
        { icon: FastForward, title: "Lead-to-Pipeline Acceleration", description: "Seamless handoff of qualified leads into sales workflows with next-best-action guidance." }
    ],
    verticalTabs: [
        {
            title: "Intelligent Audience & Intent Discovery",
            challenges: ["Lead volumes are high, but conversions are low", "Sales teams complain about poor lead quality", "ICP definition is outdated or unclear"],
            painPoints: ["Generic targeting", "High bounce and disengagement rates", "Wasted marketing spend"],
            solutions: ["AI-driven ICP and persona modeling", "Real-time intent and behavioral signal detection", "Continuous refinement of target audiences"],
            benefits: ["Higher relevance and engagement", "Better lead quality", "Improved marketing ROI"]
        },
        {
            title: "Precision Lead Acquisition",
            challenges: ["Difficulty reaching enterprise decision-makers", "Overdependence on a single acquisition channel", "Inconsistent campaign performance"],
            painPoints: ["Channel saturation", "Low response rates", "Manual campaign adjustments"],
            solutions: ["AI-orchestrated multi-channel acquisition", "Dynamic audience and message adaptation", "Automated A/B and multivariate testing"],
            benefits: ["Broader yet more precise reach", "Higher response rates", "Scalable acquisition performance"]
        },
        {
            title: "Predictive Lead Scoring & Qualification",
            challenges: ["Sales teams overwhelmed by unqualified leads", "Slow lead follow-ups", "Missed high-intent prospects"],
            painPoints: ["Rule-based scoring inaccuracies", "Manual qualification processes", "Delayed routing"],
            solutions: ["ML-based predictive lead scoring", "Real-time enrichment and validation", "Automated prioritization and routing"],
            benefits: ["Faster sales engagement", "Higher sales acceptance rates", "Increased win probability"]
        },
        {
            title: "Automated Lead Nurturing & Engagement",
            challenges: ["Leads go cold before sales engagement", "Generic nurture campaigns underperform", "Limited visibility into buyer readiness"],
            painPoints: ["Static drip campaigns", "Poor timing and personalization", "Low engagement metrics"],
            solutions: ["Behavior-based, AI-driven nurture journeys", "Contextual content and cadence optimization", "Continuous learning from engagement outcomes"],
            benefits: ["Increased engagement", "Shorter qualification cycles", "Stronger buyer relationships"]
        },
        {
            title: "Lead-to-Pipeline Conversion Acceleration",
            challenges: ["Marketing impact on revenue is unclear", "Leads don’t convert into pipeline consistently", "Sales and marketing misalignment"],
            painPoints: ["Broken handoffs", "Lack of accountability", "Delayed pipeline creation"],
            solutions: ["AI-enabled lead-to-pipeline orchestration", "CRM and GTM tool integrations", "Closed-loop performance tracking"],
            benefits: ["Faster pipeline generation", "Clear attribution to revenue", "Improved GTM alignment"]
        },
        {
            title: "Continuous Optimization & Growth Scaling",
            challenges: ["Performance plateaus after initial gains", "Hard to scale without increasing costs", "Limited learning from past campaigns"],
            painPoints: ["Manual optimization", "Siloed data", "Slow experimentation cycles"],
            solutions: ["AI-driven continuous experimentation", "Cross-channel performance intelligence", "Budget and resource optimization"],
            benefits: ["Sustained performance gains", "Lower marginal cost of growth", "Predictable, scalable lead generation"]
        }
    ]
};
