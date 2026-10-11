import {
    Map, AlertOctagon, User, GitMerge, Lightbulb,
    Workflow, Layout,    
      } from 'lucide-react';

export const customerJourneyData = {
    title: "AI Customer Journey Intelligence Engine",
    tagline: "Decode Buyer Behavior. Engineer Conversion.",
    description: "The AI-Driven Customer Journey Discovery Engine reconstructs real buyer journeys across channels, touchpoints, and decision stages. ProfitMachines reveals how customers move, decide, hesitate, and convert — enabling enterprises to design frictionless, high-conversion experiences.",
    kpis: [
        { label: "Journey Conversion", value: "3X", suffix: "Increase", description: "increase in journey conversion rates." },
        { label: "Funnel Friction", value: "50%", suffix: "Reduction", description: "reduction in funnel friction." },
        { label: "Engagement Velocity", value: "2.5X", suffix: "Improvement", description: "improvement in engagement velocity." },
        { label: "MQL→SQL Conversion", value: "40%–60%", suffix: "Uplift", description: "uplift in MQL→SQL conversion." },
        { label: "Deal Size", value: "30%", suffix: "Increase", description: "increase in deal size." },
        { label: "Sales Cycles", value: "25%", suffix: "Faster", description: "faster sales cycles." }
    ],
    portfolio: [
        { icon: Map, title: "Journey Mapping Intelligence", description: "AI reconstruction of real buyer journeys." },
        { icon: AlertOctagon, title: "Friction & Drop-Off Detection", description: "Pinpoints conversion blockers." },
        { icon: User, title: "Persona Path Modeling", description: "Buyer-specific journey optimization." },
        { icon: GitMerge, title: "Touchpoint Optimization", description: "Omnichannel experience enhancement." },
        { icon: Lightbulb, title: "Decision Trigger Analysis", description: "Identifies purchase catalysts." },
        { icon: Workflow, title: "Journey Orchestration Engine", description: "Automated journey execution." },
        { icon: Layout, title: "Experience Command Center", description: "Journey intelligence dashboard." }
    ],
    verticalTabs: [
        {
            title: "Journey Mapping",
            challenges: ["Unknown buyer paths", "Funnel leakage"],
            painPoints: ["Blind engagement", "Poor CX"],
            solutions: ["AI journey reconstruction", "Path analytics"],
            benefits: ["Clear visibility", "Higher conversions"]
        },
        {
            title: "Friction Detection",
            challenges: ["Drop-offs", "Low engagement"],
            painPoints: ["Lost deals", "Poor UX"],
            solutions: ["AI friction modeling", "Drop-off analytics"],
            benefits: ["Faster journeys", "Higher completion"]
        },
        {
            title: "Persona Optimization",
            challenges: ["Generic journeys", "Low relevance"],
            painPoints: ["Poor personalization", "Low trust"],
            solutions: ["Persona journeys", "Behavior modeling"],
            benefits: ["Better engagement", "Higher loyalty"]
        },
        {
            title: "Touchpoint Optimization",
            challenges: ["Channel gaps", "Inconsistent CX"],
            painPoints: ["Poor experience", "Brand dilution"],
            solutions: ["Journey orchestration", "Touchpoint design"],
            benefits: ["Seamless journeys", "Stronger brand"]
        },
        {
            title: "Decision Intelligence",
            challenges: ["Slow buying", "Lost momentum"],
            painPoints: ["Hesitation", "Deal stalls"],
            solutions: ["Trigger detection", "Decision modeling"],
            benefits: ["Faster deals", "Higher win rates"]
        }
    ]
};
