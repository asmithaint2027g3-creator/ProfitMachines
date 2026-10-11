import {
    BarChart2, Target, MousePointer, PieChart, PenTool,
     Zap, Monitor,   
     Share2
} from 'lucide-react';

export const performanceMarketingData = {
    title: "AI-Powered Performance Revenue Engine",
    tagline: "Turn Every Marketing Dollar into Predictable Revenue Growth",
    description: "The AI-Driven Performance Marketing Engine transforms marketing from a cost center into a revenue engine. By combining real-time audience intelligence, autonomous campaign optimization, conversion science, and predictive attribution, ProfitMachines enables enterprises to drive sustained growth with precision, speed, and accountability. The platform continuously learns from customer behavior, channel performance, and revenue outcomes — ensuring every campaign delivers measurable business impact.",
    kpis: [
        { label: "ROI on Ad Spend", value: "5X–12X", suffix: "Return", description: "ROI on marketing spend." },
        { label: "Conversion Rates", value: "3X", suffix: "Increase", description: "increase in conversion rates." },
        { label: "CAC Reduction", value: "40%–65%", suffix: "Lower", description: "reduction in customer acquisition cost (CAC)." },
        { label: "Optimization Cycles", value: "2X", suffix: "Faster", description: "faster campaign optimization cycles." },
        { label: "Revenue Per Visitor", value: "30%–50%", suffix: "Uplift", description: "increase in revenue per visitor." },
        { label: "Attribution Accuracy", value: "90%+", suffix: "Precision", description: "attribution accuracy across channels." },
        { label: "Pipeline Contribution", value: "25%+", suffix: "Uplift", description: "uplift in pipeline contribution from marketing." }
    ],
    portfolio: [
        { icon: BarChart2, title: "AI Media Buying & Optimization", description: "Autonomous campaign execution across paid channels with continuous bid, budget, and creative optimization." },
        { icon: Target, title: "Predictive Audience Targeting", description: "AI identifies high-intent buyer segments and dynamically builds precision targeting models." },
        { icon: MousePointer, title: "Conversion Rate Optimization (CRO)", description: "Machine-guided experimentation to improve funnel performance across every touchpoint." },
        { icon: PieChart, title: "Revenue Attribution & Intelligence", description: "Closed-loop attribution connecting marketing actions directly to revenue outcomes." },
        { icon: PenTool, title: "AI Creative Intelligence", description: "Automated testing and optimization of messaging, creatives, and formats." },
        { icon: Share2, title: "Multi-Channel Performance Orchestration", description: "Unified performance execution across paid, owned, and earned channels." },
        { icon: Zap, title: "Revenue Funnel Acceleration", description: "AI-driven funnel diagnostics and optimization recommendations." },
        { icon: Monitor, title: "Performance Command Center", description: "Real-time dashboard for spend efficiency, pipeline impact, and ROI tracking." }
    ],
    verticalTabs: [
        {
            title: "AI Media Buying & Optimization",
            challenges: ["Rising ad costs", "Inconsistent campaign performance", "Manual optimization cycles"],
            painPoints: ["Budget wastage", "Low ROAS", "Slow learning loops"],
            solutions: ["Autonomous bidding and budget allocation", "Real-time performance optimization", "Continuous model learning"],
            benefits: ["Higher ROAS", "Lower CAC", "Scalable growth"]
        },
        {
            title: "Predictive Audience Targeting",
            challenges: ["Broad targeting", "Low engagement", "Poor lead quality"],
            painPoints: ["Low CTR", "High bounce rates", "Low conversion"],
            solutions: ["AI intent segmentation", "Behavioral clustering", "Lookalike modeling"],
            benefits: ["Higher engagement", "Better lead quality", "Stronger pipeline"]
        },
        {
            title: "Conversion Optimization Engine",
            challenges: ["Funnel leakage", "Low landing page performance", "Poor UX"],
            painPoints: ["High drop-offs", "Weak CTAs", "Low activation"],
            solutions: ["AI experimentation", "Personalization", "Funnel diagnostics"],
            benefits: ["Higher conversions", "Faster funnel velocity", "Better user experience"]
        },
        {
            title: "Revenue Attribution Intelligence",
            challenges: ["Unclear ROI", "Channel confusion", "Budget misallocation"],
            painPoints: ["Blind decision-making", "Wasted spend", "Misaligned priorities"],
            solutions: ["Predictive attribution", "Revenue mapping", "Spend optimization"],
            benefits: ["Clear ROI visibility", "Smarter investments", "Higher revenue impact"]
        },
        {
            title: "Performance Orchestration",
            challenges: ["Disconnected channels", "Siloed teams", "Fragmented execution"],
            painPoints: ["Inefficiencies", "Lost opportunities", "Slow growth"],
            solutions: ["Unified execution engine", "AI recommendations", "Closed-loop learning"],
            benefits: ["Faster growth", "Better coordination", "Predictable performance"]
        }
    ]
};
