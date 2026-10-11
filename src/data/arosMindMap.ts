export interface AROSMindMapNode {
    id: string
    label: string
    items: string[]
}

export interface AROSMindMap {
    center: string
    nodes: AROSMindMapNode[]
}

export const arosMindMap: AROSMindMap = {
    center: "AROS",
    nodes: [
        {
            id: "demand",
            label: "Demand Discovery",
            items: ["Market Signals", "Intent Data", "Competitor Tracking", "Micro-Segmentation"],
        },
        {
            id: "generate",
            label: "Lead Generation",
            items: ["Multi-Channel", "Cold Outreach", "Inbound Capture", "Workflow Automation"],
        },
        {
            id: "nurture",
            label: "Nurturing & Education",
            items: ["Personalized Content", "Behavioral Triggers", "Drip Campaigns", "Scoring Models"],
        },
        {
            id: "sales",
            label: "Sales Execution",
            items: ["Deal Acceleration", "Predictive Analytics", "Meeting Scheduling", "Follow-up AI"],
        },
        {
            id: "revops",
            label: "Revenue Operations",
            items: ["Forecasting", "Pipeline Health", "Attribution", "Data Hygiene"],
        },
        {
            id: "success",
            label: "Customer Success",
            items: ["Churn Prediction", "Upsell/Cross-sell", "Onboarding", "Usage Analytics"],
        },
    ],
}
