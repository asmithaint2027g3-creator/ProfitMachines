import {
    Rocket, Target, Lightbulb, ListFilter, MessageSquare,
    TrendingUp, LayoutDashboard,  
      } from 'lucide-react';

export const startupMVPData = {
    title: "AI Startup MVP Acceleration Engine",
    tagline: "Build Only What the Market Will Buy.",
    description: "The AI-Driven Startup MVP Breakthrough Engine enables founders to design, validate, and scale MVPs with real demand, validated ICPs, and revenue-ready positioning. ProfitMachines removes founder bias and replaces assumptions with market intelligence.",
    kpis: [
        { label: "MVP Launch Cycles", value: "70%", suffix: "Faster", description: "faster MVP launch cycles." },
        { label: "PMF Confidence", value: "5X", suffix: "Higher", description: "higher PMF confidence." },
        { label: "Early Traction", value: "3X", suffix: "Increase", description: "increase in early traction." },
        { label: "Pivot Risk", value: "50%", suffix: "Reduction", description: "reduction in pivot risk." },
        { label: "Investor Readiness", value: "2X", suffix: "Faster", description: "faster investor readiness." },
        { label: "Demo Conversion", value: "4X", suffix: "Higher", description: "higher demo-to-customer conversion." }
    ],
    portfolio: [
        { icon: Rocket, title: "MVP Market Validation", description: "Demand validation before build." },
        { icon: Target, title: "ICP & Persona Intelligence", description: "AI-driven buyer discovery." },
        { icon: Lightbulb, title: "Problem-Solution Fit Engine", description: "Validates pain and urgency." },
        { icon: ListFilter, title: "Feature Prioritization Intelligence", description: "Build what drives revenue." },
        { icon: MessageSquare, title: "MVP Positioning & Messaging", description: "Launch-ready narrative." },
        { icon: TrendingUp, title: "Traction & Growth Playbooks", description: "Early growth execution." },
        { icon: LayoutDashboard, title: "Founder Intelligence Dashboard", description: "Startup decision command center." }
    ],
    verticalTabs: [
        {
            title: "Market Validation",
            challenges: ["Uncertain demand", "Founder bias"],
            painPoints: ["Failed MVPs", "Costly pivots"],
            solutions: ["AI validation", "Demand testing"],
            benefits: ["Confident builds", "Lower risk"]
        },
        {
            title: "ICP Discovery",
            challenges: ["Broad targeting", "Low traction"],
            painPoints: ["Weak PMF", "Poor adoption"],
            solutions: ["Buyer intelligence", "Persona modeling"],
            benefits: ["Better targeting", "Faster traction"]
        },
        {
            title: "Problem Validation",
            challenges: ["Wrong problems", "Weak urgency"],
            painPoints: ["Low willingness to pay", "Feature bloat"],
            solutions: ["Pain scoring", "Urgency modeling"],
            benefits: ["Stronger value prop", "Higher conversion"]
        },
        {
            title: "MVP Design",
            challenges: ["Overbuilding", "Slow delivery"],
            painPoints: ["Wasted dev cycles", "Delayed launch"],
            solutions: ["Feature intelligence", "MVP roadmap"],
            benefits: ["Faster launch", "Lean execution"]
        },
        {
            title: "Go-To-Market Acceleration",
            challenges: ["No traction", "Weak positioning"],
            painPoints: ["Poor demos", "Lost deals"],
            solutions: ["GTM playbooks", "Messaging engine"],
            benefits: ["Faster revenue", "Investor readiness"]
        }
    ]
};
