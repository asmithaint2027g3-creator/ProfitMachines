import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Target, TrendingUp, BarChart3, ShieldCheck, Users, Rocket,
    ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, ChevronRight, HelpCircle, Layers,
    DollarSign, Building2, ShoppingBag, Sparkles, Network, Landmark
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { submitToSheet } from '../../lib/sheets';
import ProfitPoolDiscoveryDiagram from '../components/ProfitPoolDiscoveryDiagram';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

interface DiscoveryData {
    title: string;
    route: string;
    question: string;
    spin: {
        situation: string;
        problem: string;
        implication: string;
        needPayoff: string;
    };
    frameworks: string[];
    profitPool: string[];
    metrics: {
        category: string;
        metric: string;
        baseline: string;
        target: string;
        frequency: string;
    }[];
    impact: string;
    treeOfThoughts: {
        phase: string;
        thought: string;
        deduction: string;
        actionableTakeaway: string;
    }[];
}

export const discoveryPagesData: Record<string, DiscoveryData> = {
    "market-discovery": {
        title: "Market Discovery",
        route: "/offerings/profit-pool-discovery/market-discovery",
        question: "Where is the revenue we haven't mapped?",
        spin: {
            situation: "Your current TAM/SAM analysis is built on annual reports, analyst forecasts, and internal assumptions — refreshed once per planning cycle.",
            problem: "Markets shift in weeks, not years. By the time your strategy deck is approved, the opportunity has moved or been captured by a faster competitor.",
            implication: "You enter markets already saturated, miss $300M+ white spaces, and allocate capital to shrinking segments while high-growth adjacencies go unserved.",
            needPayoff: "Dynamic market sizing that updates continuously, identifies uncontested spaces, and quantifies entry timing before competitors react."
        },
        frameworks: [
            "Jobs-to-be-Done (JTBD) — What \"job\" is your customer hiring AI to do that no one serves?",
            "Blue Ocean Strategy — Which factors can you eliminate, reduce, raise, or create to open new market space?",
            "Adjacent Market Expansion — Where does your current capability create asymmetric advantage in an untapped vertical?"
        ],
        profitPool: [
            "Unserved market identification with zero direct competition",
            "Vertical prioritization based on readiness-to-buy, not just size",
            "Entry window mapping: 12-18 month head start before competitive response"
        ],
        metrics: [
            { category: "Market Sizing", metric: "TAM Accuracy", baseline: "±25%", target: "±5%", frequency: "Quarterly" },
            { category: "Market Sizing", metric: "SAM Coverage", baseline: "40%", target: "85%", frequency: "Quarterly" },
            { category: "Market Sizing", metric: "SOM Capture Rate", baseline: "8%", target: "18%", frequency: "Annually" },
            { category: "Growth", metric: "Market Entry Speed", baseline: "18 months", target: "3 months", frequency: "Per market" },
            { category: "Growth", metric: "New Market Revenue Contribution", baseline: "5%", target: "25%", frequency: "Annually" },
            { category: "Growth", metric: "Adjacent Market Attach Rate", baseline: "12%", target: "35%", frequency: "Quarterly" },
            { category: "Competitive", metric: "White Space Identification", baseline: "2/year", target: "8/year", frequency: "Annually" },
            { category: "Competitive", metric: "First-Mover Advantage Window", baseline: "6 months", target: "18 months", frequency: "Per opportunity" },
            { category: "Financial", metric: "New Market CAC", baseline: "$45K", target: "$18K", frequency: "Quarterly" },
            { category: "Financial", metric: "New Market LTV:CAC Ratio", baseline: "2.5:1", target: "5:1", frequency: "Annually" },
            { category: "Financial", metric: "New Market Payback Period", baseline: "24 months", target: "9 months", frequency: "Per market" }
        ],
        impact: "$300M unserved market identified",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Static annual TAM models create dangerous strategy latency when customer buying shifts happen in real time.",
                deduction: "Capital is allocated to saturated legacy segments while high-growth micro-adjacencies remain unmonitored.",
                actionableTakeaway: "Deploy dynamic signal ingestion across real-time web, regulatory, and purchasing triggers to calculate rolling SAM."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Hypothesis A: Deepen penetration in existing TAM. Hypothesis B: Enter unserved adjacent verticals using core capabilities.",
                deduction: "Hypothesis B yields 3.2x higher margin velocity due to zero direct competitor pricing pressure.",
                actionableTakeaway: "Prioritize adjacent market expansion where existing technology stack offers a 12-18 month head start."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Combining Jobs-to-be-Done analysis with Blue Ocean elimination rules pinpoints the exact unserved profit pool.",
                deduction: "Entering the unserved micro-segment at Month 3 captures 18% SOM before competitive reaction.",
                actionableTakeaway: "Execute targeted GTM on the top 3 high-readiness micro-verticals immediately."
            }
        ]
    },
    "demand-discovery": {
        title: "Demand Discovery",
        route: "/offerings/profit-pool-discovery/demand-discovery",
        question: "What are customers struggling to articulate they need?",
        spin: {
            situation: "Your demand generation relies on explicit signals — inbound forms, RFPs, sales conversations. These capture only buyers already in-market.",
            problem: "67% of enterprise AI demand is latent: employees using shadow tools, compliance officers scrambling for governance, operations leaders tolerating inefficiency because \"no solution exists.\"",
            implication: "Your pipeline is 30% of what it could be. Competitors with better demand sensing capture the \"unarticulated need\" before you know it exists. Sales cycles stretch to 18 months because you're educating, not fulfilling.",
            needPayoff: "Surface latent demand before it becomes explicit — engage buyers 6-9 months earlier, when relationship and solution design advantages are still yours to claim."
        },
        frameworks: [
            "Voice of Customer (VoC) Deep Mining — Analyze support tickets, call transcripts, and employee behavior patterns for \"problem statements without solutions\"",
            "Derived Demand Tracking — Map upstream regulatory, supply chain, and technology shifts that create downstream AI demand",
            "FOMO & Competitive Pressure Modeling — Quantify the cost of inaction when peers adopt AI"
        ],
        profitPool: [
            "12,400+ intent signals captured monthly from accounts not yet in your CRM",
            "Shadow AI usage converted to governed, revenue-generating engagements",
            "Regulatory deadline demand spikes captured 6 months pre-deadline"
        ],
        metrics: [
            { category: "Pipeline", metric: "Marketing Qualified Leads (MQLs)", baseline: "200/month", target: "800/month", frequency: "Monthly" },
            { category: "Pipeline", metric: "Sales Qualified Leads (SQLs)", baseline: "40/month", target: "200/month", frequency: "Monthly" },
            { category: "Pipeline", metric: "SQL Conversion Rate", baseline: "15%", target: "35%", frequency: "Monthly" },
            { category: "Pipeline", metric: "Pipeline Velocity", baseline: "$500K/month", target: "$2M/month", frequency: "Monthly" },
            { category: "Pipeline", metric: "Pipeline Coverage Ratio", baseline: "2.5x", target: "4.5x", frequency: "Quarterly" },
            { category: "Demand", metric: "Intent Signal Capture", baseline: "2,000/month", target: "12,400/month", frequency: "Monthly" },
            { category: "Demand", metric: "Latent Demand Surfaced", baseline: "15%", target: "67%", frequency: "Quarterly" },
            { category: "Demand", metric: "Shadow AI-to-Governed Conversion", baseline: "5%", target: "35%", frequency: "Annually" },
            { category: "Sales Cycle", metric: "Average Sales Cycle Length", baseline: "18 months", target: "8 months", frequency: "Quarterly" },
            { category: "Sales Cycle", metric: "Time-to-First-Meeting", baseline: "14 days", target: "3 days", frequency: "Monthly" },
            { category: "Sales Cycle", metric: "Proposal-to-Close Rate", baseline: "18%", target: "42%", frequency: "Quarterly" },
            { category: "Engagement", metric: "Lead Response Time", baseline: "48 hours", target: "4 hours", frequency: "Daily" },
            { category: "Engagement", metric: "Nurture Email Open Rate", baseline: "18%", target: "38%", frequency: "Weekly" },
            { category: "Engagement", metric: "Content Engagement Score", baseline: "25", target: "72", frequency: "Monthly" },
            { category: "Revenue", metric: "Marketing Sourced Revenue", baseline: "20%", target: "55%", frequency: "Quarterly" },
            { category: "Revenue", metric: "Demand Capture Efficiency", baseline: "$0.40", target: "$1.20", frequency: "Quarterly" }
        ],
        impact: "Pipeline: +300%",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Relying strictly on inbound forms captures under 33% of active market intent.",
                deduction: "The majority of high-budget buyers experience latent operational pain before formalizing an RFP.",
                actionableTakeaway: "Implement multi-channel intent data ingestion across shadow tool usage, job posts, and search behavior."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Option 1: Increase ad spend on explicit keywords. Option 2: Build derived demand models tracking upstream regulatory changes.",
                deduction: "Option 2 reaches decision makers 6-9 months before RFP generation at 60% lower acquisition cost.",
                actionableTakeaway: "Construct automated triggers for upstream industry events to capture pre-RFP buyer conversations."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Synthesizing VoC call analytics with competitive pressure modeling converts unarticulated pain into structured pipeline.",
                deduction: "Compressing sales cycles from 18 to 8 months increases pipeline velocity to $2M/month.",
                actionableTakeaway: "Deploy automated nurture playbooks tailored to latent pain points across target enterprise accounts."
            }
        ]
    },
    "value-discovery": {
        title: "Value Discovery",
        route: "/offerings/profit-pool-discovery/value-discovery",
        question: "How do we prove ROI before the PO is signed?",
        spin: {
            situation: "Your AI proposals rely on case studies, benchmarks, and projected savings. Procurement demands customer-specific ROI proof.",
            problem: "60% of AI deals stall at procurement because value is \"soft\" — efficiency, innovation, strategic positioning. CFOs kill projects without hard numbers tied to their P&L.",
            implication: "POCs fail to convert. \"Pilot purgatory\" consumes 12-18 months. Sales cycles extend. Win rates drop against vendors who can quantify value in the customer's language.",
            needPayoff: "Customer-specific value quantification delivered in the first sales conversation — economic, time, quality, risk, and strategic value modeled to their actual data."
        },
        frameworks: [
            "Economic Value Estimation (EVE) — Build the business case from customer's cost structure, not vendor benchmarks",
            "Time-to-Value Compression — Map process mining insights to 90-day proof points",
            "Total Cost of Ownership (TCO) Reframing — Shift conversation from \"AI costs\" to \"cost of not using AI\""
        ],
        profitPool: [
            "90-day value proof guaranteed before full commitment",
            "Deal velocity acceleration through procurement confidence",
            "POC conversion from industry average 55% to 85%"
        ],
        metrics: [
            { category: "Value Quantification", metric: "ROI Model Accuracy", baseline: "±40%", target: "±8%", frequency: "Per deal" },
            { category: "Value Quantification", metric: "Customer-Specific Value Proof", baseline: "20%", target: "100%", frequency: "Per deal" },
            { category: "Sales Velocity", metric: "Deal Velocity", baseline: "$25K/month", target: "$75K/month", frequency: "Monthly" },
            { category: "Sales Velocity", metric: "Sales Cycle Length", baseline: "9 months", target: "4.5 months", frequency: "Quarterly" },
            { category: "Sales Velocity", metric: "Time-to-Proposal", baseline: "6 weeks", target: "10 days", frequency: "Per deal" },
            { category: "Conversion", metric: "POC Conversion Rate", baseline: "55%", target: "85%", frequency: "Quarterly" },
            { category: "Conversion", metric: "Proposal Win Rate", baseline: "22%", target: "48%", frequency: "Quarterly" },
            { category: "Conversion", metric: "Procurement Pass-Through Rate", baseline: "40%", target: "82%", frequency: "Quarterly" },
            { category: "Deal Size", metric: "Average Contract Value (ACV)", baseline: "$85K", target: "$185K", frequency: "Quarterly" },
            { category: "Deal Size", metric: "Average Deal Size Growth", baseline: "5%", target: "28%", frequency: "Annually" },
            { category: "Deal Size", metric: "Expansion Revenue Rate", baseline: "12%", target: "35%", frequency: "Annually" },
            { category: "Customer Success", metric: "Time-to-First-Value", baseline: "120 days", target: "45 days", frequency: "Per customer" },
            { category: "Customer Success", metric: "90-Day Value Realization", baseline: "30%", target: "90%", frequency: "Per customer" },
            { category: "Customer Success", metric: "Customer Satisfaction (CSAT)", baseline: "72", target: "92%", frequency: "Quarterly" },
            { category: "Customer Success", metric: "Net Promoter Score (NPS)", baseline: "18", target: "52", frequency: "Annually" },
            { category: "Retention", metric: "Gross Revenue Retention", baseline: "85%", target: "95%", frequency: "Annually" },
            { category: "Retention", metric: "Net Revenue Retention", baseline: "105%", target: "125%", frequency: "Annually" }
        ],
        impact: "Deal velocity: +50% · POC conversion: 85%",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Generic vendor ROI benchmarks fail CFO scrutiny, causing 60% of enterprise AI pilots to stall in procurement.",
                deduction: "Proposals must incorporate the buyer's granular P&L data and operational metrics directly.",
                actionableTakeaway: "Replace standard slide decks with interactive Economic Value Estimation (EVE) financial models."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Approach A: Offer discounts to pass procurement. Approach B: Reframe project around Cost of Inaction (COI) and 90-day milestone value.",
                deduction: "Approach B maintains premium ACV ($185K) and increases procurement pass-through from 40% to 82%.",
                actionableTakeaway: "Deliver customer-specific financial impact models in the initial evaluation meeting."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Compressing Time-to-First-Value to 45 days guarantees 85% POC conversion and doubles deal velocity.",
                deduction: "Procurement resistance converts to executive sponsorship when risk is quantified and capped.",
                actionableTakeaway: "Embed 90-day value realization milestones into all enterprise proposal frameworks."
            }
        ]
    },
    "channel-discovery": {
        title: "Channel Discovery",
        route: "/offerings/profit-pool-discovery/channel-discovery",
        question: "How do we distribute without platform dependency?",
        spin: {
            situation: "Your AI services or products rely on partner networks, app stores, or algorithm-dependent platforms. A single algorithm change or partner defection threatens 70% of revenue.",
            problem: "Platform dependency creates margin compression (8-12% net), unpredictable visibility, and zero customer relationship ownership. You're renting your distribution.",
            implication: "Competitors with owned channels capture 2-3x margin on equivalent offerings. Your growth ceiling is set by someone else's API or policy team.",
            needPayoff: "Algorithm-resilient distribution architecture with owned channels, productized service automation, and partner intelligence that optimizes — not replaces — your go-to-market."
        },
        frameworks: [
            "Channel Mix Optimization — Model owned vs. earned vs. paid vs. partner contribution to margin and control",
            "Productized Service Design — Convert 60% of bespoke delivery to scalable, margin-rich offerings",
            "Partner Ecosystem Intelligence — Score partners by culture fit, co-sell velocity, and strategic alignment, not just revenue"
        ],
        profitPool: [
            "Platform dependency reduced from 70% to 30%",
            "Service margins expanded from 25% to 55% through productization",
            "Partner ROI improved 60% through data-driven selection and enablement"
        ],
        metrics: [
            { category: "Channel Mix", metric: "Owned Channel Revenue %", baseline: "15%", target: "55%", frequency: "Quarterly" },
            { category: "Channel Mix", metric: "Partner Revenue %", baseline: "60%", target: "30%", frequency: "Quarterly" },
            { category: "Channel Mix", metric: "Platform Dependency %", baseline: "70%", target: "30%", frequency: "Quarterly" },
            { category: "Margin", metric: "Gross Margin (Services)", baseline: "25%", target: "55%", frequency: "Quarterly" },
            { category: "Margin", metric: "Gross Margin (Productized)", baseline: "40%", target: "72%", frequency: "Quarterly" },
            { category: "Margin", metric: "Net Margin by Channel", baseline: "8%", target: "22%", frequency: "Quarterly" },
            { category: "Partner", metric: "Partner Activation Rate", baseline: "35%", target: "75%", frequency: "Quarterly" },
            { category: "Partner", metric: "Partner-Sourced Revenue", baseline: "$2M", target: "$8M", frequency: "Annually" },
            { category: "Partner", metric: "Partner CAC", baseline: "$15K", target: "$6K", frequency: "Quarterly" },
            { category: "Partner", metric: "Partner Churn Rate", baseline: "25%", target: "8%", frequency: "Annually" },
            { category: "Partner", metric: "Co-Sell Win Rate", baseline: "18%", target: "45%", frequency: "Quarterly" },
            { category: "Digital", metric: "Organic Traffic %", baseline: "12%", target: "40%", frequency: "Monthly" },
            { category: "Digital", metric: "Direct Traffic Growth", baseline: "5%", target: "35%", frequency: "Monthly" },
            { category: "Digital", metric: "Customer Acquisition Cost (CAC)", baseline: "$45K", target: "$18K", frequency: "Quarterly" },
            { category: "Digital", metric: "Lifetime Value (LTV)", baseline: "$180K", target: "$420K", frequency: "Annually" },
            { category: "Digital", metric: "LTV:CAC Ratio", baseline: "4:1", target: "12:1", frequency: "Annually" },
            { category: "Productization", metric: "Productized Revenue %", baseline: "20%", target: "60%", frequency: "Quarterly" },
            { category: "Productization", metric: "Time-to-Delivery (Productized)", baseline: "12 weeks", target: "2 weeks", frequency: "Per engagement" },
            { category: "Productization", metric: "Delivery Cost Reduction", baseline: "—", target: "45%", frequency: "Annually" }
        ],
        impact: "Margin: +30 points",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Over-reliance on third-party ecosystems or single app stores caps net margins at 8-12% and risks revenue extinction on API updates.",
                deduction: "Building owned distribution channels is mandatory to secure customer data ownership and margin control.",
                actionableTakeaway: "Conduct a Channel Mix Audit to map current platform vulnerability and revenue concentration."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Path 1: Continue renting traffic via paid partner programs. Path 2: Convert custom services into productized assets sold direct.",
                deduction: "Path 2 expands gross margins from 25% to 55% while reducing delivery time from 12 weeks to 2 weeks.",
                actionableTakeaway: "Productize core service delivery modules into standardized, automated offerings."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Rebalancing distribution to 55% owned channels drives LTV:CAC to 12:1 and secures net margins of 22%.",
                deduction: "Partner networks become high-yield force multipliers when scored for strategic alignment rather than sheer volume.",
                actionableTakeaway: "Shift top marketing resources toward owned digital properties and high-converting direct channels."
            }
        ]
    },
    "competitive-discovery": {
        title: "Competitive Discovery",
        route: "/offerings/profit-pool-discovery/competitive-discovery",
        question: "How do we win before the RFP is issued?",
        spin: {
            situation: "Your competitive intelligence is quarterly: win/loss reviews, analyst reports, sales anecdotes. By the time you react, the deal is lost.",
            problem: "Competitors launch features, drop prices, or shift messaging in days. Your battlecards are outdated before they're printed. Response time averages 2-3 weeks.",
            implication: "You win on price, not value. Premium positioning erodes. Deals lost to \"surprise\" competitors cost $2M+ annually. Market share shifts before your next board meeting.",
            needPayoff: "Real-time competitive sensing with automated response playbooks — detect moves in hours, counter in days, maintain premium pricing through superior positioning intelligence."
        },
        frameworks: [
            "Competitive Early Warning System — Monitor pricing, messaging, hiring, patent filings, and product releases across 50+ signal types",
            "Game Theory Pricing — Model competitor response to your moves before you make them",
            "Win/Loss Pattern Recognition — Identify the 3-4 factors that actually determine wins, not what sales thinks determines wins"
        ],
        profitPool: [
            "Competitive response time compressed from weeks to under 4 hours",
            "Premium pricing maintained through differentiated positioning",
            "Win rate against top 3 competitors improved 25%"
        ],
        metrics: [
            { category: "Competitive Intelligence", metric: "Competitive Response Time", baseline: "14 days", target: "4 hours", frequency: "Per event" },
            { category: "Competitive Intelligence", metric: "Battlecard Refresh Rate", baseline: "Quarterly", target: "Real-time", frequency: "Continuous" },
            { category: "Competitive Intelligence", metric: "Competitive Signal Types Monitored", baseline: "8", target: "50+", frequency: "Monthly" },
            { category: "Win/Loss", metric: "Win Rate (Overall)", baseline: "28%", target: "48%", frequency: "Quarterly" },
            { category: "Win/Loss", metric: "Win Rate vs. Top 3 Competitors", baseline: "22%", target: "47%", frequency: "Quarterly" },
            { category: "Win/Loss", metric: "Win Rate (Premium Priced)", baseline: "15%", target: "38%", frequency: "Quarterly" },
            { category: "Win/Loss", metric: "Loss Rate to Price", baseline: "45%", target: "18%", frequency: "Quarterly" },
            { category: "Win/Loss", metric: "Loss Rate to \"Surprise\" Competitor", baseline: "22%", target: "5%", frequency: "Quarterly" },
            { category: "Pricing", metric: "Average Selling Price (ASP)", baseline: "$75K", target: "$155K", frequency: "Quarterly" },
            { category: "Pricing", metric: "Discount Rate", baseline: "28%", target: "8%", frequency: "Per deal" },
            { category: "Pricing", metric: "Price Premium Maintained", baseline: "0%", target: "35%", frequency: "Quarterly" },
            { category: "Market Share", metric: "Market Share (Addressable)", baseline: "4%", target: "12%", frequency: "Annually" },
            { category: "Market Share", metric: "Market Share Growth Rate", baseline: "1%", target: "5%", frequency: "Annually" },
            { category: "Market Share", metric: "Competitor Share Erosion", baseline: "—", target: "8%", frequency: "Annually" },
            { category: "Deal Protection", metric: "At-Risk Deal Identification", baseline: "60%", target: "95%", frequency: "Weekly" },
            { category: "Deal Protection", metric: "Deal Recovery Rate", baseline: "25%", target: "65%", frequency: "Quarterly" }
        ],
        impact: "Win rate: +25%",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Quarterly competitive reviews miss rapid competitor pricing changes, product releases, and executive hires.",
                deduction: "Sales reps discount heavily (28%) because they lack real-time differentiation data during live deal negotiations.",
                actionableTakeaway: "Deploy automated tracking across 50+ competitive signal vectors (hiring, patents, web updates)."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Scenario A: Match competitor price cuts. Scenario B: Apply Game Theory Positioning to highlight competitor structural limitations.",
                deduction: "Scenario B preserves a 35% price premium and increases win rates vs. top 3 competitors from 22% to 47%.",
                actionableTakeaway: "Equip sales teams with dynamic, auto-updating battlecards integrated into CRM."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Compressing competitive response time to 4 hours allows pre-emptive positioning before RFPs are issued.",
                deduction: "Identifies 95% of at-risk deals early, improving deal recovery rates to 65%.",
                actionableTakeaway: "Institute real-time competitive early warning alerts across active sales opportunities."
            }
        ]
    },
    "customer-discovery": {
        title: "Customer Discovery",
        route: "/offerings/profit-pool-discovery/customer-discovery",
        question: "Who is actually ready to buy AI — and who will waste our time?",
        spin: {
            situation: "Your ICP is defined by firmographics: company size, industry, revenue. Marketing generates MQLs; sales qualifies. The funnel is linear and noisy.",
            problem: "50% of \"target\" accounts lack AI readiness: no data infrastructure, no executive sponsor, no change appetite. SDRs burn 60% of capacity on accounts that will never convert this year.",
            implication: "$1.2M+ in wasted sales capacity annually. CAC inflates 3x above benchmark. Marketing ROI is unmeasurable because the targeting is wrong, not the messaging.",
            needPayoff: "Segment by AI readiness, behavioral signals, and psychographic alignment — prioritize the 20% of accounts with 80% conversion probability, and personalize engagement to their specific maturity and values."
        },
        frameworks: [
            "Technographic + Digital Maturity Scoring — Assess stack, data quality, and cloud posture as readiness predictors",
            "Psychographic AI Segmentation — Cluster by attitudes toward innovation, risk tolerance, and automation philosophy",
            "Propensity Modeling — Predict 12-month purchase likelihood with 85%+ accuracy"
        ],
        profitPool: [
            "CAC reduced 65% through precision targeting",
            "SDR efficiency improved 80% by disqualifying early",
            "Messaging resonance increased 3x through psychographic alignment"
        ],
        metrics: [
            { category: "Targeting", metric: "ICP Accuracy", baseline: "45%", target: "88%", frequency: "Quarterly" },
            { category: "Targeting", metric: "AI Readiness Score Coverage", baseline: "20%", target: "100%", frequency: "Quarterly" },
            { category: "Targeting", metric: "Propensity Model Accuracy", baseline: "62%", target: "88%", frequency: "Quarterly" },
            { category: "Lead Quality", metric: "MQL-to-SQL Conversion", baseline: "12%", target: "38%", frequency: "Monthly" },
            { category: "Lead Quality", metric: "SQL-to-Opportunity Conversion", baseline: "35%", target: "72%", frequency: "Monthly" },
            { category: "Lead Quality", metric: "Lead Scoring Accuracy", baseline: "55%", target: "90%", frequency: "Monthly" },
            { category: "Efficiency", metric: "SDR Efficiency (Meetings/SDR/Month)", baseline: "8", target: "28", frequency: "Monthly" },
            { category: "Efficiency", metric: "SDR Time on Qualified Accounts", baseline: "40%", target: "85%", frequency: "Monthly" },
            { category: "Efficiency", metric: "Disqualification Speed", baseline: "3 weeks", target: "3 days", frequency: "Per lead" },
            { category: "CAC", metric: "Customer Acquisition Cost (CAC)", baseline: "$85K", target: "$30K", frequency: "Quarterly" },
            { category: "CAC", metric: "CAC Payback Period", baseline: "18 months", target: "7 months", frequency: "Quarterly" },
            { category: "CAC", metric: "CAC Trend (YoY)", baseline: "+15%", target: "-25%", frequency: "Annually" },
            { category: "Engagement", metric: "Email Personalization Rate", baseline: "10%", target: "85%", frequency: "Weekly" },
            { category: "Engagement", metric: "Content Relevance Score", baseline: "32", target: "78", frequency: "Monthly" },
            { category: "Engagement", metric: "Account Engagement Score", baseline: "25", target: "68", frequency: "Monthly" },
            { category: "Conversion", metric: "Opportunity Win Rate (Targeted)", baseline: "22%", target: "52%", frequency: "Quarterly" },
            { category: "Conversion", metric: "Account Penetration Rate", baseline: "15%", target: "45%", frequency: "Annually" },
            { category: "Retention", metric: "Customer Fit Score (Post-Sale)", baseline: "65", target: "90", frequency: "Quarterly" },
            { category: "Retention", metric: "Early Churn Risk Identification", baseline: "40%", target: "90%", frequency: "Monthly" }
        ],
        impact: "CAC: -65%",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Traditional firmographic ICPs fail to detect whether an account possesses the technical data maturity or leadership alignment to implement AI.",
                deduction: "SDRs waste over 60% of their outreach bandwidth on unready accounts destined to stall.",
                actionableTakeaway: "Combine technographic stack analysis with psychographic risk profiling to score AI readiness upfront."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Option A: Broad outbound volume. Option B: Algorithmic propensity filtering targeting the top 20% highest-readiness accounts.",
                deduction: "Option B lowers CAC from $85K to $30K while increasing SDR booked meetings per month from 8 to 28.",
                actionableTakeaway: "Implement automated early disqualification within 3 days for accounts scoring below readiness thresholds."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Aligning outreach messaging with psychographic maturity increases targeted win rates to 52%.",
                deduction: "Disqualifying unready leads early optimizes sales capacity and shortens CAC payback to 7 months.",
                actionableTakeaway: "Focus reps exclusively on high-propensity, high-readiness target account clusters."
            }
        ]
    },
    "product-market-fit-discovery": {
        title: "Product-Market Fit Discovery",
        route: "/offerings/profit-pool-discovery/product-market-fit-discovery",
        question: "How do we stop building features no one uses?",
        spin: {
            situation: "Your product roadmap is built on customer requests, competitive parity, and engineering capability. Features ship; adoption is assumed.",
            problem: "70% of AI features are never used. $3M+ in annual R&D waste. Feature bloat confuses users. Engineering velocity slows maintaining unused code.",
            implication: "Churn rises 30% above benchmark as users fail to find value. Competitors with leaner, validated offerings win on simplicity. Your roadmap becomes a graveyard of good intentions.",
            needPayoff: "Validate features before build with simulated user behavior, cohort retention prediction, and rapid prototyping — ship only what users will adopt, pay for, and expand."
        },
        frameworks: [
            "Wizard of Oz Testing — Simulate AI features with human backend to validate demand before model training",
            "Cohort Retention Prediction — Model which features drive 90-day retention before development",
            "Feature Adoption Path Analysis — Map the sequence of features that leads from trial to expansion, not just activation"
        ],
        profitPool: [
            "Feature success rate improved from 30% to 70%",
            "$2M annual R&D waste eliminated",
            "Time-to-PMF accelerated through validated learning"
        ],
        metrics: [
            { category: "Product Development", metric: "Feature Success Rate", baseline: "30%", target: "70%", frequency: "Per release" },
            { category: "Product Development", metric: "R&D Waste (Unused Features)", baseline: "$3M/year", target: "$500K/year", frequency: "Annually" },
            { category: "Product Development", metric: "Time-to-Validate (Pre-Build)", baseline: "0 days", target: "14 days", frequency: "Per feature" },
            { category: "Product Development", metric: "Build-vs-Buy Decision Accuracy", baseline: "55%", target: "88%", frequency: "Quarterly" },
            { category: "Adoption", metric: "Feature Adoption Rate (30 days)", baseline: "15%", target: "65%", frequency: "Per feature" },
            { category: "Adoption", metric: "Feature Adoption Rate (90 days)", baseline: "25%", target: "78%", frequency: "Per feature" },
            { category: "Adoption", metric: "Power User Feature Utilization", baseline: "8 features", target: "22 features", frequency: "Monthly" },
            { category: "Retention", metric: "30-Day Retention (New Feature)", baseline: "40%", target: "82%", frequency: "Per feature" },
            { category: "Retention", metric: "90-Day Retention (Cohort)", baseline: "55%", target: "85%", frequency: "Per cohort" },
            { category: "Retention", metric: "Feature-Driven Churn Reduction", baseline: "—", target: "25%", frequency: "Annually" },
            { category: "Expansion", metric: "Feature Expansion Revenue", baseline: "8%", target: "32%", frequency: "Annually" },
            { category: "Expansion", metric: "Upsell Rate (Feature-Driven)", baseline: "12%", target: "38%", frequency: "Quarterly" },
            { category: "Expansion", metric: "Net Revenue Retention", baseline: "105%", target: "128%", frequency: "Annually" },
            { category: "Efficiency", metric: "Time-to-PMF", baseline: "18 months", target: "8 months", frequency: "Per product" },
            { category: "Efficiency", metric: "Engineering Velocity (Story Points)", baseline: "120/sprint", target: "200/sprint", frequency: "Per sprint" },
            { category: "Efficiency", metric: "Technical Debt Ratio", baseline: "35%", target: "12%", frequency: "Quarterly" },
            { category: "Customer Success", metric: "Time-to-First-Value", baseline: "90 days", target: "21 days", frequency: "Per customer" },
            { category: "Customer Success", metric: "Product-Market Fit Score", baseline: "35", target: "72", frequency: "Quarterly" },
            { category: "Customer Success", metric: "Customer Effort Score (CES)", baseline: "5.2", target: "2.1", frequency: "Quarterly" }
        ],
        impact: "R&D waste: -$2M/year",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Building roadmap features based solely on customer requests leads to 70% feature non-adoption and $3M+ in R&D waste.",
                deduction: "Stated customer preferences rarely equal actual post-build product usage.",
                actionableTakeaway: "Mandate pre-build demand validation using Wizard of Oz prototypes and behavioral intent testing."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Hypothesis 1: Build full custom feature set requested by top accounts. Hypothesis 2: Run 14-day pre-build simulation to model retention impact.",
                deduction: "Hypothesis 2 cuts R&D waste to under $500K/year and increases feature adoption from 15% to 65%.",
                actionableTakeaway: "Establish a strict 14-day validation gate before allocating engineering sprints."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Validating feature adoption paths prior to deployment increases engineering velocity to 200 story points/sprint.",
                deduction: "Reduces technical debt ratio from 35% to 12% while boosting Net Revenue Retention to 128%.",
                actionableTakeaway: "Focus product teams exclusively on high-retention, revenue-expanding feature vectors."
            }
        ]
    },
    "b2b": {
        title: "B2B Profit Pool Discovery",
        route: "/offerings/profit-pool-discovery/b2b",
        question: "Where are the hidden margin drivers in our enterprise sales cycles?",
        spin: {
            situation: "Enterprise sales involve 8-12 decision makers across procurement, IT, security, and business units, with data fragmented across legacy CRMs and email chains.",
            problem: "Deals stall in late stages because key stakeholders remain unengaged, discount pressure erodes margins by 20%, and sales teams focus on low-margin buyers.",
            implication: "Sales cycles drag to 9+ months, win rates fall below 30%, and competitive intelligence is only gathered when an RFP is lost, costing millions in lost margin.",
            needPayoff: "A systematic B2B profit pool mapping engine that detects procurement-ready intent, maps stakeholder networks, and identifies pricing leverage to secure full-margin contracts."
        },
        frameworks: [
            "Economic Value to Customer (EVC) — Quantifying clear business value to eliminate discount pressures",
            "Account Stakeholder Influence Mapping — Tracking influence coefficients of buying committee members",
            "Contract Value Optimization — Predictive modeling of contract terms, pricing tiers, and renewal margins"
        ],
        profitPool: [
            "Identification of high-margin cross-sell adjacencies within target accounts",
            "Securing 15-20% higher initial contract value (ACV) through structured value proofing",
            "Early risk detection to prevent late-stage deal slippage and protect margins"
        ],
        metrics: [
            { category: "Market Sizing", metric: "TAM Accuracy", baseline: "±20%", target: "±3%", frequency: "Quarterly" },
            { category: "Sales Acceleration", metric: "Win Rate", baseline: "28%", target: "45%", frequency: "Quarterly" },
            { category: "Sales Acceleration", metric: "ACV Growth", baseline: "—", target: "+25%", frequency: "Annually" },
            { category: "Sales Acceleration", metric: "Sales Cycle Time", baseline: "10 months", target: "6 months", frequency: "Per deal" },
            { category: "Financial", metric: "Margin Capture Rate", baseline: "80%", target: "96%", frequency: "Annually" },
            { category: "Financial", metric: "Discount Reduction", baseline: "22%", target: "8%", frequency: "Quarterly" }
        ],
        impact: "$450M enterprise revenue unlocked",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Relying on raw deal volume rather than profit-pool mapping leads to margin erosion from generic discounting.",
                deduction: "Capital and resources are wasted trying to close low-margin deals with generic proposals.",
                actionableTakeaway: "Apply account propensity scoring and map early signals of buying committee formation."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Option A: Push generic discounting to close deals faster. Option B: Implement Economic Value to Customer (EVC) framework to justify premium pricing.",
                deduction: "Option B reduces sales cycles by 40% while preserving a 20-point margin gain.",
                actionableTakeaway: "Deploy automated value calculators tailored to procurement stakeholder interests."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "EVC and Stakeholder mapping reduces sales cycle time by 40% while preserving a 20-point margin gain.",
                deduction: "CROs and VPs receive high-confidence forecast models reflecting active buyer intent.",
                actionableTakeaway: "Direct sales execution towards qualified, high-readiness stakeholder accounts."
            }
        ]
    },
    "b2c": {
        title: "B2C Profit Pool Discovery",
        route: "/offerings/profit-pool-discovery/b2c",
        question: "How do we identify and capture micro-segment margins in high-velocity consumer paths?",
        spin: {
            situation: "B2C acquisition relies on broad demographic ad targeting and dynamic pricing engines trying to convert high traffic volumes with generic journeys.",
            problem: "98% of traffic bounces without buying. CAC increases by 50% year-over-year due to ad network bidding inflation. Cart abandonment sits at 75%.",
            implication: "Margins are squeezed to near-zero, making long-term growth unsustainable. Ad budgets are wasted on non-converting users while high-value cohorts are ignored.",
            needPayoff: "Real-time user behavior analysis and dynamic cohort personalization that identifies high-LTV buyers instantly and delivers custom checkout funnels."
        },
        frameworks: [
            "Behavioral Cohorting & LTV Modeling — Classifying traffic by active engagement triggers instead of demographics",
            "Dynamic Funnel Synthesis — Synthesizing micro-personalized customer journeys based on real-time intent",
            "Price Elasticity Testing — Algorithmic sensitivity modeling to maximize margin without hurting conversion"
        ],
        profitPool: [
            "Capturing incremental margin from high-intent cohorts through targeted upsells",
            "Optimization of ad spend allocation, reducing CAC for high-value customer acquisitions",
            "Recovering 15% of lost cart abandonment revenue through real-time path refinement"
        ],
        metrics: [
            { category: "Funnel Analysis", metric: "Conversion Rate", baseline: "1.8%", target: "4.2%", frequency: "Real-time" },
            { category: "Funnel Analysis", metric: "Cart Abandonment", baseline: "76%", target: "48%", frequency: "Weekly" },
            { category: "Ad Acquisition", metric: "CAC Reduction", baseline: "—", target: "35%", frequency: "Monthly" },
            { category: "Customer Value", metric: "LTV:CAC Ratio", baseline: "1.8:1", target: "4.5:1", frequency: "Quarterly" },
            { category: "Financial", metric: "Margin Capture Rate", baseline: "85%", target: "97%", frequency: "Annually" }
        ],
        impact: "$180M consumer margin optimized",
        treeOfThoughts: [
            {
                phase: "Root Analysis (Premise)",
                thought: "Mass ad-targeting and generic checkout flows lead to customer attrition and rising CAC.",
                deduction: "Marketing budgets are inefficiently spent on cohorts with low buying potential.",
                actionableTakeaway: "Incorporate real-time event logging to trigger cohort-specific pricing and navigation paths."
            },
            {
                phase: "Branch Evaluation (Exploration)",
                thought: "Option A: Increase retargeting budgets. Option B: Deploy real-time behavioral cohorting to personalize high-intent checkouts.",
                deduction: "Option B lowers CAC by 35% and lifts LTV:CAC ratio by 2.5x.",
                actionableTakeaway: "Integrate behavioral analytics engines with custom landing page layouts."
            },
            {
                phase: "Terminal Synthesis (Decision)",
                thought: "Personalizing paths for high-intent cohorts yields a 35% CAC drop and a 3x lift in LTV:CAC ratio.",
                deduction: "Increases conversions and average order value without increasing advertising costs.",
                actionableTakeaway: "Automate dynamic checkout options based on instant user engagement cues."
            }
        ]
    },
    "b2b-market-discovery": {
        title: "B2B Market Discovery",
        route: "/offerings/profit-pool-discovery/b2b-market-discovery",
        question: "Where is the unmapped enterprise revenue?",
        spin: {
            situation: "Your B2B strategy targets broad sectors (e.g. Finance, Healthcare) based on legacy static databases.",
            problem: "You miss dynamic purchasing triggers like leadership changes, compliance deadlines, or tech stack migrations that indicate immediate buying intent.",
            implication: "Sales reps waste time on cold accounts, while high-intent prospects buy from competitors who detected their signals first.",
            needPayoff: "A real-time signal engine that maps accounts with active, unmapped budget for AI transformation."
        },
        frameworks: [
            "B2B Account Buying Signals Tracking",
            "Buying Committee Intent Signal Ingestion",
            "High-Readiness Account Scoring Framework"
        ],
        profitPool: [
            "$450M unserved enterprise TAM mapped",
            "Lead scoring precision lifted by 85%",
            "4.2x higher opportunity pipeline rate"
        ],
        metrics: [
            { category: "Market", metric: "TAM Precision", baseline: "±25%", target: "±4%", frequency: "Quarterly" },
            { category: "Efficiency", metric: "Account Conversion", baseline: "12%", target: "38%", frequency: "Monthly" }
        ],
        impact: "Enterprise TAM: +45% · Pipeline: +3.2x",
        treeOfThoughts: [
            {
                phase: "Strategic Analysis",
                thought: "Broad industry classifications mask active buying committees forming inside target accounts.",
                deduction: "We must prioritize accounts showing active technology stack hiring and expansion signals.",
                actionableTakeaway: "Target the top 5% highest-scoring accounts showing intent signals this week."
            }
        ]
    },
    "b2b-demand-discovery": {
        title: "B2B Demand Discovery",
        route: "/offerings/profit-pool-discovery/b2b-demand-discovery",
        question: "How do we sense hidden buying committee intent?",
        spin: {
            situation: "B2B sales teams engage only when an inbound form is filled or an RFP is received.",
            problem: "At that stage, competitors have already spent months shaping the requirements to fit their solution.",
            implication: "You enter a price-driven bidding war with a sub-30% win rate.",
            needPayoff: "Algorithmic sensing of shadow IT projects, developer search signals, and employee pain points."
        },
        frameworks: [
            "Stakeholder Latent Pain Modeling",
            "Shadow IT Usage Pattern Tracking",
            "Pre-RFP Engagement Strategy"
        ],
        profitPool: [
            "Pipeline growth: +250%",
            "Engage accounts 6 months prior to RFP",
            "60% reduction in customer acquisition cost"
        ],
        metrics: [
            { category: "Pipeline", metric: "Pre-RFP Deals Sourced", baseline: "5%", target: "45%", frequency: "Monthly" }
        ],
        impact: "Enterprise pipeline: +250% · CAC: -60%",
        treeOfThoughts: [
            {
                phase: "Demand Tracking",
                thought: "Latent operational bottlenecks inside enterprises generate indirect online search trails.",
                deduction: "Analyzing developer forum activity and hiring trends predicts software need before official purchase request.",
                actionableTakeaway: "Alert account teams when target accounts start searching for specialized API integrations."
            }
        ]
    },
    "b2b-value-discovery": {
        title: "B2B Value Discovery",
        route: "/offerings/profit-pool-discovery/b2b-value-discovery",
        question: "How do we build economic proof for procurement?",
        spin: {
            situation: "Proposals focus on feature sets and soft savings that procurement officers dismiss as marketing fluff.",
            problem: "Deals stall in late-stage reviews because the CFO cannot see the direct impact on the corporate P&L.",
            implication: "Cycle times stretch to 12+ months and sales teams resort to heavy discounting to close.",
            needPayoff: "Interactive Economic Value Estimation (EVE) models built from the customer's actual cost structure."
        },
        frameworks: [
            "Economic Value to Customer (EVC) Modeling",
            "CFO-Level Financial Case Formulation",
            "Discount Mitigation Strategy"
        ],
        profitPool: [
            "CFO approval rate lifted to 90%",
            "Initial contract value (ACV) increased by 25%",
            "Preserving 95% of planned profit margin"
        ],
        metrics: [
            { category: "Financial", metric: "Discount Rate", baseline: "22%", target: "6%", frequency: "Monthly" }
        ],
        impact: "CFO Approval: 90% · ACV: +25%",
        treeOfThoughts: [
            {
                phase: "Financial Modeling",
                thought: "Procurement teams exist to cut software cost unless custom financial proof is presented.",
                deduction: "We must map every line of savings directly to specific corporate budget codes.",
                actionableTakeaway: "Deliver custom P&L impact models in the very first executive meeting."
            }
        ]
    },
    "b2b-channel-discovery": {
        title: "B2B Channel Discovery",
        route: "/offerings/profit-pool-discovery/b2b-channel-discovery",
        question: "How do we scale sales via strategic integrators?",
        spin: {
            situation: "Sales rely entirely on direct sales reps, which is expensive and slow to scale globally.",
            problem: "You miss out on trust networks built by global systems integrators and regional consulting firms.",
            implication: "Your market coverage is limited, leaving major accounts open to competitors.",
            needPayoff: "A co-selling intelligence platform that aligns your software with channel partner incentives."
        },
        frameworks: [
            "Co-Selling Account Mapping System",
            "Channel Partner Incentive Optimization",
            "Global Integrator Alliance Design"
        ],
        profitPool: [
            "Channel margin contribution: +25 points",
            "3x increase in partner-sourced revenue",
            "Market penetration cycle compressed by 50%"
        ],
        metrics: [
            { category: "Channel", metric: "Partner-Sourced Pipeline", baseline: "10%", target: "48%", frequency: "Quarterly" }
        ],
        impact: "Channel Margin: +25 pts · Partner pipeline: +3x",
        treeOfThoughts: [
            {
                phase: "Alliance Optimization",
                thought: "System integrators ignore software recommendations unless it increases their own consulting hours.",
                deduction: "We should position our software as a driver for $3 of implementation services for every $1 of license.",
                actionableTakeaway: "Build partner enablement kits highlighting implementation service revenues."
            }
        ]
    },
    "b2b-competitive-discovery": {
        title: "B2B Competitive Discovery",
        route: "/offerings/profit-pool-discovery/b2b-competitive-discovery",
        question: "How do we influence specifications pre-RFP?",
        spin: {
            situation: "Competitive analysis looks at competitor datasheets and website messaging after a deal is lost.",
            problem: "You fail to counter competitor product positioning during the crucial early advisory stages.",
            implication: "The final RFP is drafted with requirements that favor your competitor's unique architecture.",
            needPayoff: "Competitor trap-setting playbooks that educate clients on what questions to ask vendors."
        },
        frameworks: [
            "Pre-RFP Technical Specification Influencing",
            "Competitor Vulnerability Mapping",
            "Technical Trap-Setting Architecture"
        ],
        profitPool: [
            "Enterprise win rate increased to 45%",
            "RFP influence rate lifted from 5% to 60%",
            "Late-stage competitive displacement minimized"
        ],
        metrics: [
            { category: "Win Rate", metric: "Competitive Win Rate", baseline: "24%", target: "48%", frequency: "Monthly" }
        ],
        impact: "Enterprise Win Rate: +35% · RFP Influence: 60%",
        treeOfThoughts: [
            {
                phase: "Competitive Playbook",
                thought: "If we don't help write the customer's technical requirements, our competitor will.",
                deduction: "Identify architectural gaps in competitor solutions that translate to customer security risks.",
                actionableTakeaway: "Equip sponsors with diagnostic question lists that highlight competitor weaknesses."
            }
        ]
    },
    "b2b-customer-discovery": {
        title: "B2B Customer Discovery",
        route: "/offerings/profit-pool-discovery/b2b-customer-discovery",
        question: "Which key accounts have active budget for AI?",
        spin: {
            situation: "Sales reps target accounts based on size or name recognition without knowing their real budget constraints.",
            problem: "Months are wasted chasing accounts that have zero budget allocated for AI development.",
            implication: "High-velocity sales reps burn out, and average contract values remain low.",
            needPayoff: "Budget-ready intent mapping that targets accounts with active AI project funding."
        },
        frameworks: [
            "AI Budget Allocation Tracking",
            "Target Account Propensity Modeling",
            "Sales Pipeline Waste Reduction"
        ],
        profitPool: [
            "50% reduction in sales resource waste",
            "Focusing team on high-likelihood buyers",
            "ACV growth of 2.8x on targeted accounts"
        ],
        metrics: [
            { category: "Sales Waste", metric: "Unqualified Opportunity Pipeline", baseline: "55%", target: "12%", frequency: "Monthly" }
        ],
        impact: "Sales Resource Waste: -50% · ACV: +2.8x",
        treeOfThoughts: [
            {
                phase: "Account Qualification",
                thought: "Large revenue does not equal willingness to spend on AI innovation.",
                deduction: "We must analyze public job postings for AI heads and executive innovation statements.",
                actionableTakeaway: "Prioritize accounts showing senior-level AI hires in the last 90 days."
            }
        ]
    },
    "b2b-product-market-fit-discovery": {
        title: "B2B Product-Market Fit Discovery",
        route: "/offerings/profit-pool-discovery/b2b-product-market-fit-discovery",
        question: "How do we validate custom roadmap requests?",
        spin: {
            situation: "Product teams build custom features promised by sales reps to close individual enterprise deals.",
            problem: "These features are rarely adopted by the rest of the client base, leading to high maintenance costs.",
            implication: "R&D resources are drained by technical debt, slowing down the core product roadmap.",
            needPayoff: "Pre-build simulation and behavioral testing gates for custom enterprise requests."
        },
        frameworks: [
            "Enterprise Feature Demand Validation",
            "R&D Resource Allocation Gatekeeping",
            "Net Revenue Retention Alignment"
        ],
        profitPool: [
            "R&D waste reduced by $1.5M/year",
            "Feature adoption rate lifted to 65%",
            "Net Revenue Retention boosted to 128%"
        ],
        metrics: [
            { category: "R&D Efficiency", metric: "Feature Adoption Rate", baseline: "18%", target: "65%", frequency: "Quarterly" }
        ],
        impact: "R&D Savings: $1.5M/yr · Feature Adoption: 65%",
        treeOfThoughts: [
            {
                phase: "PMF Validation",
                thought: "Sponsor feature requests must be backed by multi-account commitment before coding starts.",
                deduction: "A 14-day pre-build signup campaign identifies if a request is a true market need or a one-off request.",
                actionableTakeaway: "Implement feature signup gates inside the application before coding starts."
            }
        ]
    },
    "b2c-market-discovery": {
        title: "B2C Market Discovery",
        route: "/offerings/profit-pool-discovery/b2c-market-discovery",
        question: "Where are the high-value consumer niches?",
        spin: {
            situation: "B2C campaigns run broad demographic ad campaigns targetting everyone from ages 18-54.",
            problem: "Ad bidding inflation squeezes product margins, making generic customer acquisition unprofitable.",
            implication: "CAC rises by 50% YoY, limiting customer acquisition velocity.",
            needPayoff: "Real-time micro-cohort mapping that identifies high-value consumer niches before competitors bid."
        },
        frameworks: [
            "Consumer Cohort Signal Ingestion",
            "Ad Network Bid Inflation Hedging",
            "High-LTV Micro-Segment Prioritization"
        ],
        profitPool: [
            "$200M new niche opportunities found",
            "CAC reduced by 35%",
            "LTV:CAC ratio lifted to 4.5:1"
        ],
        metrics: [
            { category: "Ad Spend", metric: "CAC Reduction Rate", baseline: "0%", target: "35%", frequency: "Monthly" }
        ],
        impact: "New Niches: $200M · CAC: -35%",
        treeOfThoughts: [
            {
                phase: "Niche Mapping",
                thought: "demographic targeting is saturated and expensive. Behavioral search patterns are cheaper to target.",
                deduction: "Consumers searching for specific, unaddressed solutions convert at a 4x higher rate.",
                actionableTakeaway: "Redirect ad budgets to micro-niche keyword groups immediately."
            }
        ]
    },
    "b2c-demand-discovery": {
        title: "B2C Demand Discovery",
        route: "/offerings/profit-pool-discovery/b2c-demand-discovery",
        question: "What micro-moment triggers drive search spikes?",
        spin: {
            situation: "You launch B2C marketing campaigns based on seasonal plans or fixed calendar events.",
            problem: "You miss real-time demand triggers caused by social trends, local weather shifts, or news events.",
            implication: "You spend ad budget when interest is low, and miss high-intent consumer search waves.",
            needPayoff: "A dynamic demand sensor that links ad bidding directly to online search spikes."
        },
        frameworks: [
            "Real-Time Trend Signal Ingestion",
            "Dynamic Search Demand Bidding",
            "Consumer Trend Capture Model"
        ],
        profitPool: [
            "Consumer Traffic Lift of 4x during spikes",
            "CTR increased from 2% to 8%",
            "Ad cost savings of 45%"
        ],
        metrics: [
            { category: "Ad Spend", metric: "CTR Lift", baseline: "1.8%", target: "8%", frequency: "Real-time" }
        ],
        impact: "Traffic Lift: 4x · CTR: 8%",
        treeOfThoughts: [
            {
                phase: "Trend Analysis",
                thought: "Viral consumer interest spikes last only 48-72 hours.",
                deduction: "We must automate ad bidding adjustments based on Google Trends and Twitter spikes.",
                actionableTakeaway: "Integrate trend api triggers with ad bidding management software."
            }
        ]
    },
    "b2c-value-discovery": {
        title: "B2C Value Discovery",
        route: "/offerings/profit-pool-discovery/b2c-value-discovery",
        question: "How do we showcase instant value in checkout?",
        spin: {
            situation: "Consumers add items to their cart but leave before buying because of a lack of clear benefits.",
            problem: "Checkout funnels focus on billing details rather than reinforcing trust and purchase value.",
            implication: "Cart abandonment remains high at 75%, leading to lost marketing budget.",
            needPayoff: "A checkout optimization engine that dynamically displays reviews, saving proof, and trust seals."
        },
        frameworks: [
            "Checkout Value Reinforcement",
            "Dynamic Proof Presentation",
            "Trust Optimization Model"
        ],
        profitPool: [
            "Conversion Rate increased by 85%",
            "Cart abandonment reduced by 30%",
            "Average Order Value (AOV) lifted by 18%"
        ],
        metrics: [
            { category: "Funnel", metric: "Cart Abandonment Rate", baseline: "75%", target: "48%", frequency: "Weekly" }
        ],
        impact: "Conversion Rate: +85% · Cart Abandonment: -30%",
        treeOfThoughts: [
            {
                phase: "Checkout Optimization",
                thought: "Consumers experience purchase anxiety the moment they enter their credit card.",
                deduction: "Displaying customer reviews and shipping guarantees next to the payment field reduces friction.",
                actionableTakeaway: "A/B test value proof widgets right above the payment button."
            }
        ]
    },
    "b2c-channel-discovery": {
        title: "B2C Channel Discovery",
        route: "/offerings/profit-pool-discovery/b2c-channel-discovery",
        question: "How do we run direct paths without platform fees?",
        spin: {
            situation: "Your B2C brand relies on Amazon or App Store sales, paying up to 30% in platform fees.",
            problem: "You have zero control over customer data, making it impossible to drive repeat purchases.",
            implication: "Your customer lifetime value is low, and your margins are controlled by third-party platforms.",
            needPayoff: "A direct-to-consumer (D2C) checkout path that bypasses traditional app stores."
        },
        frameworks: [
            "Direct-to-Consumer Path Optimization",
            "App Store Fee Mitigation Strategy",
            "Customer Relationship Ownership Model"
        ],
        profitPool: [
            "D2C margin: +30 points",
            "LTV increase of 40% through repeat sales",
            "Ownership of 100% of customer emails"
        ],
        metrics: [
            { category: "Margin", metric: "Direct Channel Revenue Share", baseline: "15%", target: "65%", frequency: "Quarterly" }
        ],
        impact: "D2C Margin: +30 pts · Customer LTV: +40%",
        treeOfThoughts: [
            {
                phase: "Direct GTM",
                thought: "Paying 30% App Store tax makes consumer software margins unsustainable.",
                deduction: "We must build a PWA (Progressive Web App) with Stripe checkout to bypass app store policies.",
                actionableTakeaway: "Migrate high-volume traffic to web-based checkout channels immediately."
            }
        ]
    },
    "b2c-competitive-discovery": {
        title: "B2C Competitive Discovery",
        route: "/offerings/profit-pool-discovery/b2c-competitive-discovery",
        question: "How do we capture search intent before rivals bid?",
        spin: {
            situation: "Ad campaigns target broad keywords where dozens of competitors are bidding prices up.",
            problem: "You spend your entire margin competing for top search results on generic terms.",
            implication: "Acquisition becomes unprofitable, and ad networks capture all the profit pool.",
            needPayoff: "A keyword scanner that targets long-tail search intent with low bidding competition."
        },
        frameworks: [
            "Long-Tail Keyword Opportunity Mapping",
            "Competitor Ad Spend Signal Detection",
            "Ad Bid Arbitrage Modeling"
        ],
        profitPool: [
            "Ad efficiency increased by 40%",
            "Cost-per-click (CPC) reduced by 50%",
            "Ad campaign ROI lifted from 1.5x to 3.5x"
        ],
        metrics: [
            { category: "Ad Spend", metric: "Average CPC Reduction", baseline: "$1.80", target: "$0.90", frequency: "Monthly" }
        ],
        impact: "Ad Efficiency: +40% · CPC: -50%",
        treeOfThoughts: [
            {
                phase: "Search Strategy",
                thought: "Generic search phrases are dominated by major brands with unlimited ad budgets.",
                deduction: "Consumers searching for long-tail, hyper-specific terms have higher intent and cost less to acquire.",
                actionableTakeaway: "Pause broad keyword groups and prioritize long-tail search terms."
            }
        ]
    },
    "b2c-customer-discovery": {
        title: "B2C Customer Discovery",
        route: "/offerings/profit-pool-discovery/b2c-customer-discovery",
        question: "Which behavioral cohorts convert in minutes?",
        spin: {
            situation: "Users are treated as a single demographic group, showing them the same homepage layout.",
            problem: "You waste ad retargeting budget on users who bounce within 3 seconds and will never buy.",
            implication: "Your conversion funnel is inefficient, and ad budgets are wasted on non-buyers.",
            needPayoff: "Real-time cohort identification that targets high-intent visitors with custom offers."
        },
        frameworks: [
            "Real-Time Behavioral Cohorting",
            "Dynamic User Funnel Personalization",
            "Conversion Rate Optimization Model"
        ],
        profitPool: [
            "Ad spend waste reduced by 60%",
            "Targeting high-intent buyers with custom offers",
            "Funnel conversion rate lifted to 4.2%"
        ],
        metrics: [
            { category: "Funnel", metric: "Visitor-to-Buyer Conversion", baseline: "1.2%", target: "4.2%", frequency: "Real-time" }
        ],
        impact: "Ad Waste: -60% · Conversion Rate: +2.5x",
        treeOfThoughts: [
            {
                phase: "Visitor Profiling",
                thought: "A user who visits the pricing page twice in 2 minutes is 10x more likely to convert.",
                deduction: "We must trigger live support chat or exit discount popups only for high-intent cohorts.",
                actionableTakeaway: "Activate real-time behavior tracking script on all key product pages."
            }
        ]
    },
    "b2c-product-market-fit-discovery": {
        title: "B2C Product-Market Fit Discovery",
        route: "/offerings/profit-pool-discovery/b2c-product-market-fit-discovery",
        question: "Which cart-abandonment loops should we fix?",
        spin: {
            situation: "Product analytics look at monthly cart metrics without knowing why consumers abandon.",
            problem: "You miss checkout failures like broken coupon codes, slow page loads, or confusing shipping options.",
            implication: "Cart abandonment rate remains stuck at 75%, costing millions in lost revenue.",
            needPayoff: "Session recording analysis that identifies exact cart abandonment friction points."
        },
        frameworks: [
            "Cart Abandonment Friction Resolution",
            "Consumer Session Recording Diagnostics",
            "Abandoned Funnel Revenue Recovery"
        ],
        profitPool: [
            "Recovering 35% of lost cart abandonment revenue",
            "Identifying 4 main checkout bugs",
            "Checkout load time reduced by 50%"
        ],
        metrics: [
            { category: "Performance", metric: "Checkout Page Load Time", baseline: "3.5s", target: "1.2s", frequency: "Daily" }
        ],
        impact: "Recovered Revenue: +35% · Load Time: -65%",
        treeOfThoughts: [
            {
                phase: "Checkout Performance",
                thought: "Every additional second of page load time reduces mobile conversions by 20%.",
                deduction: "Optimizing image assets and third-party scripts on the checkout page is the fastest way to boost revenue.",
                actionableTakeaway: "Defer all non-essential analytics tracking scripts until after payment confirmation."
            }
        ]
    },
    "ai-demand-discovery": {
        title: "AI Demand Discovery",
        route: "/offerings/ai-growth/ai-demand-discovery",
        question: "How do we sense hidden buying signals across web and dark social?",
        spin: {
            situation: "Your demand generation relies on inbound forms and active sales conversations.",
            problem: "67% of enterprise AI demand is latent: employees using shadow tools, compliance officers scrambling for governance.",
            implication: "You capture only 30% of addressable market pipeline.",
            needPayoff: "Surface latent demand before competitors reach the prospect."
        },
        frameworks: [
            "Voice of Customer Deep Mining",
            "Derived Demand Tracking",
            "FOMO & Competitive Pressure Modeling"
        ],
        profitPool: [
            "12,400+ intent signals captured monthly",
            "Pipeline growth: +300%",
            "Engage prospects 6 months pre-RFP"
        ],
        metrics: [
            { category: "Demand", metric: "Latent Intent Surfaced", baseline: "15%", target: "67%", frequency: "Monthly" }
        ],
        impact: "Pipeline: +300% · Latent Intent: 67%",
        treeOfThoughts: [
            {
                phase: "Demand Sensing",
                thought: "Shadow tool usage and forum activity indicate upcoming corporate procurement requirements.",
                deduction: "Automated intent tracking identifies enterprise buying committees early.",
                actionableTakeaway: "Deploy real-time buyer signal ingestion across active account profiles."
            }
        ]
    },
    "revenue-acceleration": {
        title: "AI-Driven Revenue Acceleration",
        route: "/offerings/ai-growth/revenue-acceleration",
        question: "How do we compress deal cycles and scale revenue velocity?",
        spin: {
            situation: "Sales teams spend 65% of their working hours on manual task administration.",
            problem: "40% of pipeline deals stall indefinitely due to unhandled friction.",
            implication: "Forecast accuracy drops below 70% and win rates erode.",
            needPayoff: "Autonomous sales orchestration that dynamically moves deals forward."
        },
        frameworks: [
            "Predictive Opportunity Prioritization",
            "Autonomous Sales Workflows",
            "Conversational AI Deal Acceleration"
        ],
        profitPool: [
            "4-6x faster sales velocity",
            "35-50% shorter sales cycles",
            "85%+ forecast accuracy"
        ],
        metrics: [
            { category: "Sales Velocity", metric: "Deal Cycle Compression", baseline: "90 days", target: "45 days", frequency: "Monthly" }
        ],
        impact: "Sales Velocity: +4x · Win Rate: +35%",
        treeOfThoughts: [
            {
                phase: "Velocity Optimization",
                thought: "Predictive deal health scoring pinpoints exactly when a deal is stalling.",
                deduction: "Triggering automated objection resolution nudges buyers forward without rep overhead.",
                actionableTakeaway: "Activate predictive deal scoring across all active CRM opportunities."
            }
        ]
    },
    "growth-hacking": {
        title: "AI-Driven Growth Hacking",
        route: "/offerings/ai-growth/growth-hacking",
        question: "How do we run rapid multi-channel experiments to acquire buyers at scale?",
        spin: {
            situation: "Traditional growth experiments take weeks to configure, test, and analyze.",
            problem: "High campaign setup costs slow down iteration speed and limit channel expansion.",
            implication: "Competitors test 10x faster and capture emerging acquisition channels first.",
            needPayoff: "Autonomous growth loops that test messaging, audiences, and offers continuously."
        },
        frameworks: [
            "Autonomous Growth Loop Engineering",
            "Algorithmic Audience Discovery",
            "Rapid Experimentation Flywheel"
        ],
        profitPool: [
            "2.5x higher conversion rate",
            "40% CAC payback reduction",
            "Continuous multi-channel acquisition"
        ],
        metrics: [
            { category: "Growth", metric: "Experiment Iteration Speed", baseline: "1/month", target: "20/week", frequency: "Weekly" }
        ],
        impact: "Conversion Lift: 2.5x · CAC: -40%",
        treeOfThoughts: [
            {
                phase: "Growth Experimentation",
                thought: "AI agents can generate and test 50 messaging variants simultaneously.",
                deduction: "Budget automatically flows to top-performing ad vectors within 4 hours.",
                actionableTakeaway: "Automate dynamic copy and image generation across active channels."
            }
        ]
    },
    "performance-marketing": {
        title: "AI-Driven Performance Marketing",
        route: "/offerings/ai-growth/performance-marketing",
        question: "How do we optimize programmatic ad budgets in real-time across channels?",
        spin: {
            situation: "Ad budgets are allocated manually across Google, LinkedIn, and Meta based on historical reports.",
            problem: "Hourly CPM fluctuations and ad fatigue waste 30%+ of ad budget.",
            implication: "CAC inflates while marketing attribution remains opaque.",
            needPayoff: "Algorithmic budget re-allocation that checks performance and adjusts bids hourly."
        },
        frameworks: [
            "Hourly Ad Bid Arbitrage",
            "Multi-Touch Attribution Engine",
            "Dynamic Persona Ad Personalization"
        ],
        profitPool: [
            "90%+ attribution accuracy",
            "35% lower customer acquisition cost",
            "3x return on ad spend (ROAS)"
        ],
        metrics: [
            { category: "Ad Performance", metric: "Return on Ad Spend (ROAS)", baseline: "1.2x", target: "3.5x", frequency: "Real-time" }
        ],
        impact: "ROAS: +300% · CAC: -35%",
        treeOfThoughts: [
            {
                phase: "Ad Optimization",
                thought: "Hourly bid adjustments prevent budget waste on low-converting time slots.",
                deduction: "Cross-platform attribution models isolate the exact campaigns driving revenue.",
                actionableTakeaway: "Deploy automated hourly ad bidding triggers on all major ad platforms."
            }
        ]
    },
    "enterprise-sales": {
        title: "Enterprise Sales Acceleration",
        route: "/offerings/sales-acceleration/enterprise-sales",
        question: "How do we navigate 10+ stakeholder buying committees in enterprise deals?",
        spin: {
            situation: "Enterprise deals involve legal, procurement, IT, and business stakeholders.",
            problem: "Sales reps engage only 1-2 champions, leaving 80% of the buying committee unaddressed.",
            implication: "Late-stage procurement blocks and unexpected stakeholder vetoes kill deals.",
            needPayoff: "Full-committee influence mapping and customized stakeholder value proofing."
        },
        frameworks: [
            "Account Stakeholder Influence Mapping",
            "Economic Value to Customer (EVC)",
            "Procurement Risk Mitigation"
        ],
        profitPool: [
            "35% higher enterprise win rate",
            "CFO approval rate: 90%",
            "Average Contract Value (ACV) growth: +25%"
        ],
        metrics: [
            { category: "Enterprise", metric: "Committee Engagement Coverage", baseline: "20%", target: "85%", frequency: "Quarterly" }
        ],
        impact: "Enterprise Win Rate: +35% · ACV: +25%",
        treeOfThoughts: [
            {
                phase: "Enterprise Navigation",
                thought: "Procurement requires clear line-item P&L savings proof to approve contracts.",
                deduction: "Delivering customized financial models early converts procurement from blocker to sponsor.",
                actionableTakeaway: "Build custom EVC financial calculators for every target enterprise opportunity."
            }
        ]
    },
    "digital-sales": {
        title: "Digital & Inside Sales Acceleration",
        route: "/offerings/sales-acceleration/digital-sales",
        question: "How do we systemize inside sales motions without manual rep entry?",
        spin: {
            situation: "Inside sales reps spend hours drafting initial emails and logging CRM updates.",
            problem: "Follow-up delays cause prospect interest to cool rapidly.",
            implication: "MQL-to-SQL conversion stays stuck below 15%.",
            needPayoff: "Autonomous SDR co-pilots that handle prospecting, follow-ups, and calendar booking."
        },
        frameworks: [
            "Autonomous SDR Co-Pilot",
            "Cadence Personalization Autopilot",
            "Real-Time Objection Resolution"
        ],
        profitPool: [
            "10x output from existing sales reps",
            "15 hours/week saved per SDR",
            "3x increase in qualified booked meetings"
        ],
        metrics: [
            { category: "Productivity", metric: "Booked Meetings per Rep", baseline: "8/month", target: "28/month", frequency: "Monthly" }
        ],
        impact: "Rep Productivity: +10x · SDR Meetings: +300%",
        treeOfThoughts: [
            {
                phase: "Inside Sales Automation",
                thought: "Instant follow-up within 5 minutes increases meeting booking probability by 9x.",
                deduction: "AI agents handling initial inquiries guarantee 24/7 immediate responses.",
                actionableTakeaway: "Enable automated SDR response playbooks for all inbound leads."
            }
        ]
    },
    "d2c-sales": {
        title: "D2C & High-Velocity Sales Acceleration",
        route: "/offerings/sales-acceleration/d2c-sales",
        question: "How do we maximize instant checkout conversions for high-volume buyers?",
        spin: {
            situation: "High-volume D2C traffic encounters static checkout pages with high bounce rates.",
            problem: "75% of buyers abandon cart due to friction or lack of instant trust proof.",
            implication: "CAC inflation squeezes direct-to-consumer profit margins.",
            needPayoff: "Dynamic checkout personalization that adapts in real-time to visitor behavior."
        },
        frameworks: [
            "Behavioral Checkout Personalization",
            "Cart Abandonment Friction Resolution",
            "Dynamic Social Proof Engine"
        ],
        profitPool: [
            "Cart abandonment reduced by 35%",
            "85% conversion rate improvement",
            "D2C margin expanded by +30 points"
        ],
        metrics: [
            { category: "D2C Conversion", metric: "Cart Abandonment Rate", baseline: "75%", target: "48%", frequency: "Real-time" }
        ],
        impact: "Conversion: +85% · Cart Abandonment: -35%",
        treeOfThoughts: [
            {
                phase: "D2C Checkout",
                thought: "Removing payment friction and displaying live social proof increases conversion instantly.",
                deduction: "A/B testing dynamic trust elements pinpoints optimal checkout layouts.",
                actionableTakeaway: "Implement dynamic trust and shipping widgets on checkout pages."
            }
        ]
    },
    "bfsi-sales": {
        title: "BFSI Sales Acceleration",
        route: "/offerings/sales-acceleration/bfsi-sales",
        question: "How do we execute compliant, high-trust sales in regulated financial services?",
        spin: {
            situation: "Financial services sales face strict compliance, audit, and security requirements.",
            problem: "Manual compliance reviews delay deal execution by weeks.",
            implication: "High-net-worth prospects drop out during lengthy onboarding cycles.",
            needPayoff: "SOC2 and ISO 27001 compliant automated sales workflows."
        },
        frameworks: [
            "Regulatory Compliance Automation",
            "Audit-Ready Lead Attribution",
            "Secure Banking Funnel Architecture"
        ],
        profitPool: [
            "100% compliance pass rate",
            "45% reduction in onboarding friction",
            "Higher high-net-worth customer retention"
        ],
        metrics: [
            { category: "BFSI Compliance", metric: "Onboarding Cycle Time", baseline: "30 days", target: "5 days", frequency: "Monthly" }
        ],
        impact: "Compliance Pass: 100% · Processing Time: -45%",
        treeOfThoughts: [
            {
                phase: "BFSI Compliance",
                thought: "Automating document verification within a secure vault speeds up account opening.",
                deduction: "Compliant automated workflows prevent deal drop-offs while satisfying auditors.",
                actionableTakeaway: "Deploy single-tenant secure onboarding modules for financial leads."
            }
        ]
    }
};

interface QuestionStep {
    id: string;
    label: string;
    type: 'text' | 'email' | 'url' | 'select' | 'textarea';
    placeholder?: string;
    options?: string[];
    required?: boolean;
}

const diagnosticSteps: QuestionStep[] = [
    { id: 'contactName', label: 'What is your contact name?', type: 'text', placeholder: 'Enter your full name...', required: true },
    { id: 'email', label: 'What is your work email address?', type: 'email', placeholder: 'Enter your work email address...', required: true },
    { id: 'companyName', label: 'What is your company name?', type: 'text', placeholder: 'Enter your company name...', required: true },
    { id: 'geography', label: 'Which geography/market do you serve?', type: 'text', placeholder: 'e.g. North America, Global...', required: true },
    { id: 'challenges', label: 'What are your current business challenges?', type: 'textarea', placeholder: 'Briefly describe your key pipeline, margin, or sales speed challenges...', required: true }
];

function DiagnosticForm({ offeringName }: { offeringName: string }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({
        contactName: '',
        email: '',
        companyName: '',
        industry: '',
        companySize: '',
        annualRevenue: '',
        website: '',
        geography: '',
        challenges: '',
        objectives: '',
        tools: '',
        outcome: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [stepError, setStepError] = useState<string | null>(null);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

    const handleInputChange = (val: string) => {
        setFormData(prev => ({
            ...prev,
            [diagnosticSteps[currentStep].id]: val
        }));
        setStepError(null);
    };

    const validateStep = (): boolean => {
        const step = diagnosticSteps[currentStep];
        const value = formData[step.id].trim();

        if (step.required && !value) {
            setStepError(`${step.label.replace('?', '')} is required.`);
            return false;
        }

        if (step.type === 'email' && value) {
            if (!/\S+@\S+\.\S+/.test(value)) {
                setStepError("Please enter a valid email address.");
                return false;
            }
        }

        if (step.type === 'url' && value) {
            try {
                new URL(value);
            } catch (_) {
                if (!value.startsWith('http://') && !value.startsWith('https://')) {
                    try {
                        new URL('https://' + value);
                    } catch (_) {
                        setStepError("Please enter a valid website URL.");
                        return false;
                    }
                } else {
                    setStepError("Please enter a valid website URL.");
                    return false;
                }
            }
        }

        return true;
    };

    const handleNext = () => {
        if (!validateStep()) return;

        if (currentStep < diagnosticSteps.length - 1) {
            setDirection('forward');
            setCurrentStep(prev => prev + 1);
            setStepError(null);
        } else {
            handleSubmit();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setDirection('backward');
            setCurrentStep(prev => prev - 1);
            setStepError(null);
        }
    };

    const handleSubmit = async () => {
        setStatus('submitting');
        try {
            await submitToSheet('Diagnostic Forms', {
                "Contact Name": formData.contactName,
                "Email": formData.email,
                "Company": formData.companyName,
                "Geography": formData.geography,
                "Challenges": formData.challenges,
                "Offering": offeringName,
                "Status": "New",
                "Source": "Diagnostic Form - " + offeringName,
                "Submitted At": new Date().toISOString()
            });

            // Also save to localStorage as a local backup
            const submissions = JSON.parse(localStorage.getItem('diagnostic_submissions') || '[]');
            submissions.push({ ...formData, offering: offeringName, submittedAt: new Date().toISOString() });
            localStorage.setItem('diagnostic_submissions', JSON.stringify(submissions));

            setStatus('success');
        } catch (error) {
            console.error('[DiagnosticForm] Submission error:', error);
            // Still save locally and show success to avoid user frustration
            const submissions = JSON.parse(localStorage.getItem('diagnostic_submissions') || '[]');
            submissions.push({ ...formData, offering: offeringName, submittedAt: new Date().toISOString() });
            localStorage.setItem('diagnostic_submissions', JSON.stringify(submissions));
            setStatus('success');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-50 border border-emerald-200 p-8 sm:p-12 rounded-3xl text-center shadow-xl max-w-2xl mx-auto my-12 animate-in fade-in-50 duration-500">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-3xl font-extrabold text-slate-900 mb-3 font-heading">Diagnostic Form Submitted!</h3>
                <p className="text-slate-600 font-medium max-w-md mx-auto text-base">
                    Thank you! Your strategic profile has been captured and stored locally. Our AI revenue agents will review your inputs and custom insights will be prepared.
                </p>
            </div>
        );
    }

    const step = diagnosticSteps[currentStep];
    const progressPercent = Math.round(((currentStep + 1) / diagnosticSteps.length) * 100);

    return (
        <div className="bg-white border border-slate-200/80 p-8 sm:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto my-12 relative overflow-hidden flex flex-col min-h-[420px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2878B5]">
                        {offeringName} Diagnostic
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold text-slate-500">
                        Question {currentStep + 1} of {diagnosticSteps.length}
                    </span>
                </div>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
                <div 
                    className="bg-[#2878B5] h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="w-full flex flex-col gap-4"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-heading">
                            {step.label}
                        </h2>

                        {step.type === 'select' ? (
                            <div className="flex flex-col gap-2 mt-4">
                                {step.options?.map((opt, oIdx) => (
                                    <button
                                        key={oIdx}
                                        type="button"
                                        onClick={() => handleInputChange(opt)}
                                        className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-semibold transition-all focus:outline-none ${formData[step.id] === opt ? 'bg-[#2878B5] border-[#2878B5] text-white shadow-md' : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-slate-50'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        ) : step.type === 'textarea' ? (
                            <textarea
                                value={formData[step.id]}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder={step.placeholder}
                                rows={4}
                                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-base font-medium mt-2 resize-none"
                            />
                        ) : (
                            <input
                                type={step.type}
                                value={formData[step.id]}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder={step.placeholder}
                                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none text-base font-medium mt-2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleNext();
                                    }
                                }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {stepError && (
                    <div className="flex items-center gap-2 mt-4 text-red-500 text-xs font-bold uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{stepError}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={status === 'submitting'}
                    className="flex items-center gap-2 bg-[#2878B5] hover:bg-[#1E6297] text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    {currentStep === diagnosticSteps.length - 1 ? (status === 'submitting' ? 'Submitting...' : 'Submit Profile') : 'Next Question'}
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function ConsolidatedOfferingsView({ mode }: { mode: 'b2b' | 'b2c' | 'ai-growth' | 'sales-acceleration' }) {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const rawHash = location.hash.substring(1);
            setTimeout(() => {
                const el = document.getElementById(rawHash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 150);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.hash, mode]);

    const isB2B = mode === 'b2b';

    const titleMap: Record<string, string> = {
        'b2b': "B2B Focus & Profit Pools",
        'b2c': "B2C Focus & Profit Pools",
        'ai-growth': "AI Growth Suite",
        'sales-acceleration': "Sales Acceleration Suite"
    };

    const badgeMap: Record<string, string> = {
        'b2b': "B2B Autonomous Revenue Engine",
        'b2c': "High-Velocity B2C Growth Suite",
        'ai-growth': "Autonomous Pipeline & Expansion Engine",
        'sales-acceleration': "High-Velocity Sales Execution Suite"
    };

    const descMap: Record<string, string> = {
        'b2b': "Unified B2B Architecture: All 7 autonomous AI revenue, demand sensing, and pipeline execution engines consolidated on a single enterprise platform.",
        'b2c': "Unified B2C Architecture: All 7 high-velocity consumer acquisition, offer personalization, and margin expansion engines consolidated on a single enterprise platform.",
        'ai-growth': "Unified AI Growth Architecture: All 4 predictive pipeline, performance marketing, and revenue acceleration engines consolidated on a single enterprise platform.",
        'sales-acceleration': "Unified Sales Execution Architecture: All 4 enterprise, inside sales, D2C, and BFSI acceleration engines consolidated on a single enterprise platform."
    };

    const title = titleMap[mode] || "Enterprise Solutions";
    const badgeText = badgeMap[mode] || "Enterprise Suite";
    const heroDesc = descMap[mode] || "Consolidated Architecture.";

    let modules: Array<{ key: string; id: string; aliases?: string[]; name: string; icon: any }> = [];

    if (mode === 'b2b') {
        modules = [
            { key: "b2b-market-discovery", id: "market-discovery", aliases: ["ai-revenue-acceleration", "revenue-acceleration"], name: "B2B Market Discovery / Revenue Acceleration", icon: Search },
            { key: "b2b-demand-discovery", id: "demand-discovery", aliases: ["ai-sales-acceleration", "sales-acceleration"], name: "B2B Demand Discovery / Sales Acceleration", icon: Target },
            { key: "b2b-value-discovery", id: "value-discovery", aliases: ["ai-growth-engine", "growth-engine"], name: "B2B Value Discovery / Growth Engine", icon: DollarSign },
            { key: "b2b-channel-discovery", id: "channel-discovery", aliases: ["ai-lead-generation", "lead-generation"], name: "B2B Channel Discovery / Lead Generation", icon: Network },
            { key: "b2b-competitive-discovery", id: "competitive-discovery", aliases: ["ai-demand-discovery"], name: "B2B Competitive Discovery / Pre-RFP Sensing", icon: ShieldCheck },
            { key: "b2b-customer-discovery", id: "customer-discovery", aliases: ["ai-customer-intelligence"], name: "B2B Customer Discovery / Account Intelligence", icon: Users },
            { key: "b2b-product-market-fit-discovery", id: "product-market-fit-discovery", aliases: ["ai-automation", "product-market-fit"], name: "B2B Product-Market Fit / Roadmap Validation", icon: Sparkles }
        ];
    } else if (mode === 'b2c') {
        modules = [
            { key: "b2c-market-discovery", id: "market-discovery", aliases: ["ai-revenue-acceleration", "revenue-acceleration"], name: "B2C Market Discovery / Revenue Acceleration", icon: Search },
            { key: "b2c-demand-discovery", id: "demand-discovery", aliases: ["ai-sales-acceleration", "sales-acceleration"], name: "B2C Demand Discovery / Sales Acceleration", icon: Target },
            { key: "b2c-value-discovery", id: "value-discovery", aliases: ["ai-growth-engine", "growth-engine"], name: "B2C Value Discovery / Growth Engine", icon: DollarSign },
            { key: "b2c-channel-discovery", id: "channel-discovery", aliases: ["ai-lead-generation", "lead-generation"], name: "B2C Channel Discovery / Lead Generation", icon: Network },
            { key: "b2c-competitive-discovery", id: "competitive-discovery", aliases: ["ai-demand-discovery"], name: "B2C Competitive Discovery / Keyword Arbitrage", icon: ShieldCheck },
            { key: "b2c-customer-discovery", id: "customer-discovery", aliases: ["ai-customer-intelligence"], name: "B2C Customer Discovery / Cohort Intelligence", icon: Users },
            { key: "b2c-product-market-fit-discovery", id: "product-market-fit-discovery", aliases: ["ai-automation", "product-market-fit"], name: "B2C Product-Market Fit / Cart Abandonment Resolution", icon: Sparkles }
        ];
    } else if (mode === 'ai-growth') {
        modules = [
            { key: "ai-demand-discovery", id: "ai-demand-discovery", aliases: ["demand-discovery"], name: "AI Demand Discovery Engine", icon: Search },
            { key: "revenue-acceleration", id: "revenue-acceleration", aliases: ["ai-revenue-acceleration"], name: "AI-Driven Revenue Acceleration", icon: TrendingUp },
            { key: "growth-hacking", id: "growth-hacking", aliases: ["ai-growth-hacking"], name: "AI-Driven Growth Hacking", icon: Rocket },
            { key: "performance-marketing", id: "performance-marketing", aliases: ["ai-performance-marketing"], name: "AI-Driven Performance Marketing", icon: BarChart3 }
        ];
    } else if (mode === 'sales-acceleration') {
        modules = [
            { key: "enterprise-sales", id: "enterprise-sales", aliases: ["enterprise"], name: "Enterprise Sales Acceleration", icon: Building2 },
            { key: "digital-sales", id: "digital-sales", aliases: ["digital"], name: "Digital & Inside Sales Acceleration", icon: Layers },
            { key: "d2c-sales", id: "d2c-sales", aliases: ["d2c"], name: "D2C & High-Velocity Sales Acceleration", icon: ShoppingBag },
            { key: "bfsi-sales", id: "bfsi-sales", aliases: ["bfsi"], name: "BFSI Sales Acceleration", icon: Landmark }
        ];
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 lg:pt-32 pb-24">
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/offerings" className="hover:text-[#2878B5] transition-colors">Offerings</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#2878B5] font-bold">{title}</span>
                </nav>
            </div>

            {/* Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <Reveal width="100%">
                    <div className={`rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden ${isB2B ? 'bg-gradient-to-br from-slate-900 via-[#164E78] to-slate-900' : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900'}`}>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                            <Building2 className="w-4 h-4 text-emerald-400" />
                            {badgeText}
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-heading leading-tight text-white drop-shadow-md">
                            {title}
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-3xl mb-8 leading-relaxed">
                            {heroDesc}
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <a href="#market-discovery" className="inline-flex items-center justify-center px-6 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/20">
                                Explore All 7 Engines
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <Link to="/book-consultation" className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base rounded-xl transition-all backdrop-blur-md">
                                Talk to an Expert
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* All 7 Offering Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {modules.map((mod, idx) => {
                    const data = discoveryPagesData[mod.key];
                    if (!data) return null;
                    const IconComp = mod.icon;

                    return (
                        <section key={idx} id={mod.id} className="mb-24 scroll-mt-28 relative bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-lg overflow-hidden">
                            {/* Additional Invisible Anchor Divs for Aliases */}
                            {mod.aliases?.map(alias => (
                                <div key={alias} id={alias} className="absolute -top-28 left-0 pointer-events-none" />
                            ))}

                            {/* Engine Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#2878B5] bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                                            <IconComp className="w-4 h-4 text-[#2878B5]" />
                                            Engine 0{idx + 1}
                                        </span>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                                            {data.impact}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                                        {data.title}
                                    </h2>
                                    <p className="text-lg text-slate-600 italic mt-2 font-medium">
                                        "{data.question}"
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Link to="/book-consultation" className="inline-flex items-center justify-center px-5 py-3 bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm rounded-xl transition-all shadow-md">
                                        Activate Engine
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* SPIN Matrix */}
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 font-heading flex items-center gap-2">
                                    <Target className="w-5 h-5 text-[#2878B5]" />
                                    SPIN Matrix Analysis
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Situation</div>
                                        <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{data?.spin?.situation || data?.spin?.situation || ''}</p>
                                    </div>
                                    <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
                                        <div className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Problem</div>
                                        <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{data?.spin?.problem || data?.spin?.problem || ''}</p>
                                    </div>
                                    <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100">
                                        <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Implication</div>
                                        <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{data?.spin?.implication || data?.spin?.implication || ''}</p>
                                    </div>
                                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Need-Payoff</div>
                                        <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{data?.spin?.needPayoff || data?.spin?.needPayoff || ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Frameworks & Profit Pool Grid */}
                            <div className="grid lg:grid-cols-2 gap-6 mb-10">
                                <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
                                    <h4 className="text-base font-bold text-slate-900 mb-4 font-heading flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-amber-500" />
                                        Applied Frameworks
                                    </h4>
                                    <ul className="space-y-3">
                                        {data.frameworks.map((fw, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                                                <CheckCircle2 className="w-4 h-4 text-[#2878B5] mt-0.5 shrink-0" />
                                                <span>{fw}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100/60">
                                    <h4 className="text-base font-bold text-slate-900 mb-4 font-heading flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                                        Profit Pool Capture Points
                                    </h4>
                                    <ul className="space-y-3">
                                        {data.profitPool.map((pp, pIdx) => (
                                            <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                                                <Rocket className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                                <span>{pp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Metrics Summary Table */}
                            {data.metrics && data.metrics.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4 text-[#2878B5]" />
                                        Performance & Revenue Metrics
                                    </h4>
                                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                        <table className="w-full text-left text-xs font-medium border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                                                    <th className="py-3 px-4">Category</th>
                                                    <th className="py-3 px-4">Metric</th>
                                                    <th className="py-3 px-4 text-center">Baseline</th>
                                                    <th className="py-3 px-4 text-center">Target</th>
                                                    <th className="py-3 px-4 text-right">Frequency</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                                {data.metrics.map((m, mIdx) => (
                                                    <tr key={mIdx} className="hover:bg-slate-50/60">
                                                        <td className="py-3 px-4 font-bold text-slate-900">{m.category}</td>
                                                        <td className="py-3 px-4 font-semibold text-blue-900">{m.metric}</td>
                                                        <td className="py-3 px-4 text-center text-slate-500">{m.baseline}</td>
                                                        <td className="py-3 px-4 text-center font-bold text-emerald-600 bg-emerald-50/40">{m.target}</td>
                                                        <td className="py-3 px-4 text-right text-slate-500">{m.frequency}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>

            {/* Bottom Assessment Callout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <Reveal width="100%">
                    <div className="bg-gradient-to-r from-slate-900 via-[#164E78] to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
                        <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 font-heading">Ready to Deploy Your Consolidated {isB2B ? 'B2B' : 'B2C'} Engine?</h2>
                        <p className="text-base sm:text-lg text-emerald-100 mb-8 max-w-2xl mx-auto font-medium">
                            Schedule a 45-minute revenue architecture session with our AI strategy team.
                        </p>
                        <Link 
                            to="/book-consultation"
                            className="inline-flex items-center gap-2 bg-[#2878B5] text-white hover:bg-emerald-600 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            Schedule Strategic Audit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

export default function DiscoveryPage() {
    const { type, slug } = useParams<{ type?: string; slug: string }>();
    const { openLongForm, openQuickForm } = useLeadModal();
    const [activePoolTab, setActivePoolTab] = useState<'overview' | 'b2b' | 'b2c'>('overview');

    if (slug === 'b2b' || slug === 'b2c' || slug === 'ai-growth' || slug === 'sales-acceleration') {
        return <ConsolidatedOfferingsView mode={slug as any} />;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug, type]);

    const isParentOverview = !slug || slug === 'profit-pool-discovery';

    if (isParentOverview) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 lg:pt-32 pb-24">
                {/* Breadcrumb Navigation */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/offerings" className="hover:text-[#2878B5] transition-colors">Offerings</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-[#2878B5] font-bold" title="Identify and capture hidden margin drivers and high-margin revenue streams.">Profit Pool Discovery</span>
                    </nav>
                </div>

                {/* Hero Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <Reveal width="100%">
                        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                                <Layers className="w-4 h-4 text-emerald-400" />
                                Parent Offering
                            </div>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-heading leading-tight text-white drop-shadow-md">
                                <span title="Identify and capture hidden margin drivers and high-margin revenue streams.">Profit Pool Discovery</span>
                            </h1>
                            <p className="text-xl sm:text-2xl text-emerald-200 font-medium italic mb-8 max-w-3xl">
                                "Unlocking hidden value, identifying unmapped demand, and capturing high-margin revenue streams."
                            </p>
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                                <span className="text-sm text-slate-300 font-medium">Total Strategic Modules:</span>
                                <span className="text-lg font-bold text-amber-300">
                                    {activePoolTab === 'overview' ? '9 Specialized Engines' : '7 Specialized Engines'}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-8">
                                <Link to="/book-consultation" className="inline-flex items-center justify-center px-6 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-[#2878B5]/35">
                                    Discover Your Next Profit Pool
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <a href="#modules" className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base rounded-xl transition-all backdrop-blur-md">
                                    Explore Modules
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Premium B2B/B2C Tabs & Diagram */}
                <div id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center scroll-mt-24">
                    <div className="flex justify-center mb-12">
                        <div className="flex gap-2 p-1.5 bg-slate-100/90 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-inner">
                            <button
                                onClick={() => setActivePoolTab('overview')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    activePoolTab === 'overview'
                                        ? 'bg-[#2878B5] text-white shadow-md'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActivePoolTab('b2b')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    activePoolTab === 'b2b'
                                        ? 'bg-[#2878B5] text-white shadow-md'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                                }`}
                            >
                                B2B Profit Pools
                            </button>
                            <button
                                onClick={() => setActivePoolTab('b2c')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    activePoolTab === 'b2c'
                                        ? 'bg-[#2878B5] text-white shadow-md'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                                }`}
                            >
                                B2C Profit Pools
                            </button>
                        </div>
                    </div>

                    {activePoolTab === 'overview' && (
                        <div className="flex justify-center my-8">
                            <ProfitPoolDiscoveryDiagram />
                        </div>
                    )}
                </div>

                {/* Sub-Offerings Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <Reveal width="100%">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(() => {
                                const overviewItems = [
                                    { name: "Market Discovery", slug: "market-discovery", question: "Where is the revenue we haven't mapped?", impact: "$300M unserved market identified", icon: Search },
                                    { name: "Demand Discovery", slug: "demand-discovery", question: "What are customers struggling to articulate they need?", impact: "Pipeline: +300%", icon: Target },
                                    { name: "Value Discovery", slug: "value-discovery", question: "How do we prove ROI before the PO is signed?", impact: "Deal velocity: +50% · POC conversion: 85%", icon: DollarSign },
                                    { name: "Channel Discovery", slug: "channel-discovery", question: "How do we distribute without platform dependency?", impact: "Margin: +30 points", icon: Network },
                                    { name: "Competitive Discovery", slug: "competitive-discovery", question: "How do we win before the RFP is issued?", impact: "Win rate: +25%", icon: ShieldCheck },
                                    { name: "Customer Discovery", slug: "customer-discovery", question: "Who is actually ready to buy AI — and who will waste our time?", impact: "CAC: -65%", icon: Users },
                                    { name: "Product-Market Fit Discovery", slug: "product-market-fit-discovery", question: "How do we stop building features no one uses?", impact: "R&D waste: -$2M/year", icon: Sparkles },
                                    { name: "B2B Profit Pool Discovery", slug: "b2b", question: "Where are the hidden margin drivers in our enterprise sales cycles?", impact: "$450M enterprise revenue unlocked", icon: Building2 },
                                    { name: "B2C Profit Pool Discovery", slug: "b2c", question: "How do we identify and capture micro-segment margins in high-velocity consumer paths?", impact: "$180M consumer margin optimized", icon: ShoppingBag }
                                ];

                                const b2bItems = [
                                    { name: "B2B Market Discovery", slug: "b2b-market-discovery", question: "Where is the unmapped enterprise revenue?", impact: "$450M unserved enterprise TAM mapped", icon: Search },
                                    { name: "B2B Demand Discovery", slug: "b2b-demand-discovery", question: "How do we sense hidden buying committee intent?", impact: "Enterprise Pipeline: +250%", icon: Target },
                                    { name: "B2B Value Discovery", slug: "b2b-value-discovery", question: "How do we build economic proof for procurement?", impact: "CFO approval rate: 90%", icon: DollarSign },
                                    { name: "B2B Channel Discovery", slug: "b2b-channel-discovery", question: "How do we scale sales via strategic integrators?", impact: "Channel margin: +25 points", icon: Network },
                                    { name: "B2B Competitive Discovery", slug: "b2b-competitive-discovery", question: "How do we influence specifications pre-RFP?", impact: "Enterprise win rate: +35%", icon: ShieldCheck },
                                    { name: "B2B Customer Discovery", slug: "b2b-customer-discovery", question: "Which key accounts have active budget for AI?", impact: "Sales waste: -50%", icon: Users },
                                    { name: "B2B Product-Market Fit Discovery", slug: "b2b-product-market-fit-discovery", question: "How do we validate custom roadmap requests?", impact: "R&D savings: $1.5M/year", icon: Sparkles }
                                ];

                                const b2cItems = [
                                    { name: "B2C Market Discovery", slug: "b2c-market-discovery", question: "Where are the high-value consumer niches?", impact: "$200M new niche opportunities found", icon: Search },
                                    { name: "B2C Demand Discovery", slug: "b2c-demand-discovery", question: "What micro-moment triggers drive search spikes?", impact: "Consumer Traffic Lift: 4x", icon: Target },
                                    { name: "B2C Value Discovery", slug: "b2c-value-discovery", question: "How do we showcase instant value in checkout?", impact: "Conversion Rate: +85%", icon: DollarSign },
                                    { name: "B2C Channel Discovery", slug: "b2c-channel-discovery", question: "How do we run direct paths without platform fees?", impact: "D2C margin: +30 points", icon: Network },
                                    { name: "B2C Competitive Discovery", slug: "b2c-competitive-discovery", question: "How do we capture search intent before rivals bid?", impact: "Ad efficiency: +40%", icon: ShieldCheck },
                                    { name: "B2C Customer Discovery", slug: "b2c-customer-discovery", question: "Which behavioral cohorts convert in minutes?", impact: "Ad waste: -60%", icon: Users },
                                    { name: "B2C Product-Market Fit Discovery", slug: "b2c-product-market-fit-discovery", question: "Which cart-abandonment loops should we fix?", impact: "Abandoned revenue: -35%", icon: Sparkles }
                                ];

                                const items = activePoolTab === 'b2b' 
                                    ? b2bItems 
                                    : activePoolTab === 'b2c' 
                                        ? b2cItems 
                                        : overviewItems;

                                return items.map((disc, idx) => {
                                    const IconComp = disc.icon;
                                    return (
                                        <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-[#2878B5] bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                                                        <IconComp className="w-3.5 h-3.5" />
                                                        Module 0{idx + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                                                        {disc.impact}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#2878B5] transition-colors">
                                                    {disc.name}
                                                </h3>
                                                <p className="text-slate-600 text-sm font-medium italic mb-6">
                                                    "{disc.question}"
                                                </p>
                                            </div>
                                            <Link 
                                                to={`/offerings/profit-pool-discovery/${disc.slug}`}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-[#2878B5] hover:text-[#1E6297] transition-colors pt-4 border-t border-slate-100"
                                            >
                                                Explore Discovery Layer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </Reveal>

                    <div className="text-center mt-12">
                        <Link to="/book-consultation" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-lg">
                            Talk to an AI Consultant
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Trust Metrics Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <Reveal width="100%">
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl text-center">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
                                Trusted by Leading Enterprises
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                                <div>
                                    <div className="text-4xl sm:text-5xl font-black text-[#2878B5] mb-2">150+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projects Delivered</div>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl font-black text-[#2878B5] mb-2">25+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industries Served</div>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl font-black text-[#2878B5] mb-2">92%</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Retention</div>
                                </div>
                                <div>
                                    <div className="text-4xl sm:text-5xl font-black text-[#2878B5] mb-2">$10M+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue Generated</div>
                                </div>
                            </div>
                            <Link to="/#case-studies" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors">
                                See Client Success Stories
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>

                {/* Opportunity Assessment Section (Urgency Banner) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <Reveal width="100%">
                        <div className="bg-gradient-to-br from-[#02241e] via-slate-900 to-[#02241e] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="max-w-2xl">
                                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                                    Limited Opportunity
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
                                    Get Your Free AI Opportunity Assessment
                                </h2>
                                <p className="text-lg text-slate-300 mb-2">
                                    Discover Hidden Revenue Opportunities in 30 Minutes.
                                </p>
                                <p className="text-sm text-amber-400 font-semibold">
                                    Note: Limited to 10 Enterprise Consultations Per Month.
                                </p>
                            </div>
                            <Link to="/book-consultation" className="shrink-0 inline-flex items-center justify-center px-6 py-4 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/20">
                                Talk to Our AI Experts Today
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </div>
        );
    }

    let pageSlug = slug || 'market-discovery';
    if (type && type !== 'profit-pool-discovery' && discoveryPagesData[`${type}-${slug}`]) {
        pageSlug = `${type}-${slug}`;
    }
    const data = discoveryPagesData[pageSlug] || discoveryPagesData[slug];

    if (!data) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Discovery Layer Not Found</h2>
                <Link to="/offerings" className="text-[#2878B5] font-semibold hover:underline">Back to Offerings</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 lg:pt-32 pb-24">
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/offerings" className="hover:text-[#2878B5] transition-colors">Offerings</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#2878B5] font-bold">{data.title}</span>
                </nav>
            </div>

            {/* Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <Reveal width="100%">
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                            <Layers className="w-4 h-4 text-emerald-400" />
                            Discovery Layer
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-heading leading-tight text-white drop-shadow-md">
                            {data.title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-emerald-200 font-medium italic mb-8 max-w-3xl">
                            "{data.question}"
                        </p>
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                            <span className="text-sm text-slate-300 font-medium">Quantified Business Impact:</span>
                            <span className="text-lg font-bold text-amber-300">{data.impact}</span>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* SPIN Element Matrix */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <Reveal width="100%">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 font-heading flex items-center gap-3">
                        <Target className="w-7 h-7 text-[#2878B5]" />
                        SPIN Discovery Matrix
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SPIN Element</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Situation
                            </h3>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{data.spin.situation || data.spin.situation}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SPIN Element</div>
                            <h3 className="text-xl font-bold text-rose-600 mb-3 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Problem
                            </h3>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{data.spin.problem || data.spin.problem}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SPIN Element</div>
                            <h3 className="text-xl font-bold text-amber-600 mb-3 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Implication
                            </h3>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{data.spin.implication || data.spin.implication}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SPIN Element</div>
                            <h3 className="text-xl font-bold text-emerald-600 mb-3 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Need-Payoff
                            </h3>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{data.spin.needPayoff || data.spin.needPayoff}</p>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Discovery Frameworks & Profit Pool Capture */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid lg:grid-cols-2 gap-8">
                    <Reveal width="100%">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-3">
                                <Lightbulb className="w-6 h-6 text-amber-500" />
                                Discovery Frameworks Applied
                            </h2>
                            <ul className="space-y-4">
                                {data.frameworks.map((fw, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <CheckCircle2 className="w-5 h-5 text-[#2878B5] mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-semibold text-sm leading-snug">{fw}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal width="100%">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-3">
                                <TrendingUp className="w-6 h-6 text-emerald-500" />
                                Profit Pool Capture
                            </h2>
                            <ul className="space-y-4">
                                {data.profitPool.map((pp, idx) => (
                                    <li key={idx} className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                        <Rocket className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                                        <span className="text-slate-800 font-bold text-sm leading-snug">{pp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Sales Acceleration Intelligence System */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <Reveal width="100%">
                    <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                                    Autonomous Revenue Architecture
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading flex items-center gap-3">
                                    <HelpCircle className="w-7 h-7 text-emerald-400" />
                                    Sales Acceleration Intelligence Matrix
                                </h2>
                            </div>
                            <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-300 font-bold text-xs">
                                Executive Strategic Framework
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {data.treeOfThoughts.map((tot, idx) => (
                                <div key={idx} className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-[#02241e] px-3 py-1 rounded-full border border-indigo-800">
                                                Stage 0{idx + 1}
                                            </span>
                                            <span className="text-xs text-slate-400 font-medium">{tot.phase}</span>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Thought Hypothesis</h4>
                                            <p className="text-sm text-slate-200 font-medium leading-relaxed">{tot.thought}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Logical Deduction</h4>
                                            <p className="text-sm text-indigo-200 font-medium leading-relaxed">{tot.deduction}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-slate-700/60 mt-2">
                                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Actionable Takeaway</h4>
                                        <p className="text-xs text-emerald-300 font-semibold leading-normal">{tot.actionableTakeaway}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Standard Marketing, Sales & KPI Metrics Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <Reveal width="100%">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 font-heading flex items-center gap-3">
                        <BarChart3 className="w-7 h-7 text-[#2878B5]" />
                        Standard Marketing, Sales & KPI Metrics
                    </h2>
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                        <th className="py-4 px-6">Metric Category</th>
                                        <th className="py-4 px-6">Specific Metric</th>
                                        <th className="py-4 px-6 text-center">Baseline</th>
                                        <th className="py-4 px-6 text-center">Target</th>
                                        <th className="py-4 px-6 text-right">Measurement Frequency</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                                    {data.metrics.map((m, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">{m.category}</td>
                                            <td className="py-4 px-6 text-blue-900 font-semibold">{m.metric}</td>
                                            <td className="py-4 px-6 text-center text-slate-500">{m.baseline}</td>
                                            <td className="py-4 px-6 text-center font-bold text-emerald-600 bg-emerald-50/40">{m.target}</td>
                                            <td className="py-4 px-6 text-right text-slate-500">{m.frequency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Diagnostic Form Placement */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal width="100%">
                    <DiagnosticForm offeringName={data.title} />
                </Reveal>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContextualCtaSection
                    badge="Profit Pool Diagnostic"
                    title={`Schedule a 45-Minute ${data.title} Diagnostic`}
                    subtitle="We'll map your current blind spots, identify 3 addressable profit pools, and outline the validation path to capture them in the next 12 months."
                    defaultService={`${data.title} - Diagnostic`}
                />
            </div>
        </div>
    );
}
