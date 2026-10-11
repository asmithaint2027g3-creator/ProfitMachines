import {
    Activity, Tag, UserCheck, MessageSquare, Globe, Swords,
    LayoutDashboard,    
      } from 'lucide-react';

export const marketValidationData = {
    title: "AI Market Validation Intelligence Engine",
    tagline: "Validate Demand Before You Build. Win Markets Before You Enter.",
    description: "The AI-Driven Market Validation Engine eliminates market risk by validating demand, pricing, positioning, and buyer readiness before product launches and GTM investments. ProfitMachines enables enterprises and startups to test, measure, and validate real market signals using live demand data — not assumptions.",
    kpis: [
        { label: "Launch Risk", value: "70%–90%", suffix: "Reduction", description: "reduction in product launch risk." },
        { label: "GTM Readiness", value: "3X", suffix: "Faster", description: "faster go-to-market readiness." },
        { label: "PMF Confidence", value: "5X", suffix: "Improvement", description: "improvement in product-market fit confidence." },
        { label: "Failed Initiatives", value: "40%", suffix: "Reduction", description: "reduction in failed product initiatives." },
        { label: "Revenue Realization", value: "2X", suffix: "Faster", description: "faster revenue realization." },
        { label: "Launch Success", value: "30%", suffix: "Higher", description: "higher launch success rates." }
    ],
    portfolio: [
        { icon: Activity, title: "Demand Validation Intelligence", description: "Real-world demand testing using live market signals." },
        { icon: Tag, title: "Pricing & Packaging Intelligence", description: "AI-driven willingness-to-pay modeling." },
        { icon: UserCheck, title: "ICP Validation Engine", description: "Identifies best-fit buyer profiles." },
        { icon: MessageSquare, title: "Message-Market Fit Testing", description: "Validates positioning before scale." },
        { icon: Globe, title: "Market Entry Simulation", description: "Predictive GTM success modeling." },
        { icon: Swords, title: "Competitive Readiness Mapping", description: "AI competitor intelligence." },
        { icon: LayoutDashboard, title: "Validation Command Center", description: "Centralized market intelligence hub." }
    ],
    verticalTabs: [
        {
            title: "Demand Validation",
            challenges: ["Uncertain demand", "Launch risk"],
            painPoints: ["Assumptions", "Costly failures"],
            solutions: ["AI demand testing", "Signal validation"],
            benefits: ["Confident launches", "Reduced risk"]
        },
        {
            title: "ICP Validation",
            challenges: ["Broad targeting", "Low traction"],
            painPoints: ["Weak PMF", "Poor adoption"],
            solutions: ["AI ICP modeling", "Persona validation"],
            benefits: ["Better targeting", "Higher conversion"]
        },
        {
            title: "Pricing Intelligence",
            challenges: ["Pricing confusion", "Low revenue"],
            painPoints: ["Discounting", "Lost deals"],
            solutions: ["Willingness-to-pay modeling", "Price optimization"],
            benefits: ["Higher margins", "Better win rates"]
        },
        {
            title: "Positioning Validation",
            challenges: ["Weak differentiation", "Poor messaging"],
            painPoints: ["Low engagement", "Confused buyers"],
            solutions: ["Message testing", "Buyer feedback loops"],
            benefits: ["Clear positioning", "Higher traction"]
        },
        {
            title: "GTM Simulation",
            challenges: ["Risky launches", "Slow traction"],
            painPoints: ["Budget wastage", "Delayed growth"],
            solutions: ["Predictive GTM modeling", "Scenario planning"],
            benefits: ["Faster GTM", "Higher success"]
        }
    ]
};
