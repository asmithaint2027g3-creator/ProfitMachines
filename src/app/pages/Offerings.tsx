import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Check,
    Brain,
    TrendingUp,
    Zap,
    Target,
    BarChart3,
    ShieldCheck,
    Users,
    Workflow,
    Lightbulb,
    Search,
    Rocket,
    Globe,
    AlertTriangle,
    ArrowRight,
    Layout,
    Activity,
    ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Reveal } from '../components/ui/Reveal';
import ProfitJourneyNavigator from '../components/ProfitJourneyNavigator';
import LeadCaptureSection from '../components/LeadCaptureSection';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Offerings() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();
    const [activePoolTab, setActivePoolTab] = useState<'overview' | 'b2b' | 'b2c'>('overview');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');

        if (section) {
            setTimeout(() => {
                const elementId = section.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const element = document.getElementById(elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [location]);

    const offeringStages: Record<string, { name: string; subtitle?: string; points: string[] }[]> = {
        "AI-Powered Sales Intelligence & Execution": [
            {
                name: "Startups",
                subtitle: "Pre-Series A, <$2M ARR",
                points: [
                    "Foundational pipeline discipline - Track every deal without CRM complexity",
                    "Early-stage pattern recognition - Identify what winning looks like from limited data",
                    "Founder-led sales optimization - Maximize founder time on highest-probability deals",
                    "Investor-ready forecasting - Credible projections for funding rounds",
                    "Essential automation only - Focus on what moves needles, not features"
                ]
            },
            {
                name: "Scale-ups",
                subtitle: "Series A-C, $2M-$20M ARR",
                points: [
                    "Sales team scaling intelligence - Hire and onboard with predictive success models",
                    "Repeatable sales motion design - Systemize what's working across growing teams",
                    "Deal velocity acceleration - Reduce cycle times as complexity increases",
                    "Channel partner enablement - Scale through partners with co-selling intelligence",
                    "Mid-market readiness - Transition from SMB to mid-market with confidence"
                ]
            },
            {
                name: "SMEs",
                subtitle: "$20M-$100M Revenue",
                points: [
                    "Territory optimization - Balance coverage across expanding markets",
                    "Sales manager enablement - Coach teams with data-driven insights",
                    "Complex deal navigation - Handle multi-stakeholder enterprise sales",
                    "Competitive displacement strategies - Systematically take market share",
                    "Sales process standardization - Create consistency across regions"
                ]
            },
            {
                name: "Mid-Market",
                subtitle: "$100M-$500M Revenue",
                points: [
                    "Sales operations scaling - Support 50-200 sales reps efficiently",
                    "Vertical specialization - Customize approaches for industry verticals",
                    "Deal desk integration - Streamline legal, finance, and sales collaboration",
                    "Global sales coordination - Manage multi-region, multi-timezone teams",
                    "Board-level forecasting - Executive confidence in quarterly projections"
                ]
            },
            {
                name: "Large Enterprises",
                subtitle: "$500M-$2B Revenue",
                points: [
                    "Global sales standardization - Consistent processes across 10+ countries",
                    "Strategic account intelligence - 360-degree view of top 100 customers",
                    "M&A sales integration - Rapidly incorporate acquired sales teams",
                    "Sales compensation optimization - Align incentives with strategic goals",
                    "Regulatory compliance automation - Ensure sales practices meet global standards"
                ]
            },
            {
                name: "Global Enterprises",
                subtitle: "$2B+ Revenue",
                points: [
                    "Multi-product sales orchestration - Coordinate complex solution selling",
                    "Global pricing harmonization - Balance local market needs with global strategy",
                    "Sales talent intelligence - Identify and develop future sales leaders",
                    "Emerging market entry strategies - Data-driven expansion into new regions",
                    "Corporate sales innovation - Test and scale new sales methodologies"
                ]
            },
            {
                name: "Industry-Specific",
                points: [
                    "Regulatory sales frameworks - Industry-specific compliance automation",
                    "Vertical ecosystem selling - Coordinate with partners, distributors, integrators",
                    "Long-cycle deal management - Navigate 12+ month sales cycles with precision",
                    "Solution complexity management - Handle $1M+ deals with multiple stakeholders",
                    "Public sector/GOV sales - Specialized processes for government procurement"
                ]
            }
        ],
        "Revenue Operations & Intelligence": [
            {
                name: "Startups",
                points: [
                    "Lightweight RevOps foundation - Essential processes without bureaucracy",
                    "Founder-friendly reporting - Simple dashboards that founders actually use",
                    "Early-stage KPI definition - Establish metrics that matter for growth stage",
                    "Investor narrative building - Tell compelling growth stories with data",
                    "Budget-conscious tools - Maximum value from minimum investment"
                ]
            },
            {
                name: "Scale-ups",
                points: [
                    "First RevOps hire enablement - Tools to multiply impact of initial hire",
                    "Cross-functional alignment - Connect marketing, sales, and success data",
                    "Process documentation - Systemize what works before scaling chaos",
                    "Board deck automation - Reduce monthly reporting from days to hours",
                    "Fundraising data room - Investor-ready metrics for next round"
                ]
            },
            {
                name: "SMEs",
                points: [
                    "Dedicated RevOps team scaling - Support 3-5 person team efficiency",
                    "Territory planning automation - Optimize coverage as headcount grows",
                    "Sales tool stack consolidation - Reduce cost and complexity",
                    "Marketing-sales handoff optimization - Improve lead-to-revenue conversion",
                    "Executive dashboard creation - C-suite visibility without manual work"
                ]
            },
            {
                name: "Mid-Market",
                points: [
                    "Enterprise system integration - Connect Salesforce, Marketo, HubSpot, etc.",
                    "Regional performance tracking - Compare and optimize across locations",
                    "Advanced forecasting models - Predictive analytics beyond simple spreadsheets",
                    "Audit-ready reporting - Financial compliance and transparency",
                    "M&A integration frameworks - Rapidly incorporate acquired company data"
                ]
            },
            {
                name: "Large Enterprises",
                points: [
                    "Global RevOps standardization - Consistent processes worldwide",
                    "Real-time revenue intelligence - Minute-by-minute visibility across business units",
                    "Regulatory compliance automation - GDPR, CCPA, SOX requirements built-in",
                    "Strategic planning integration - Connect RevOps to annual planning cycles",
                    "Multi-currency, multi-language support - Global business complexity handled"
                ]
            },
            {
                name: "Global Enterprises",
                points: [
                    "24/7 operations monitoring - Continuous intelligence across time zones",
                    "Public company reporting - SEC-compliant revenue disclosures",
                    "Corporate strategy alignment - Connect revenue data to 5-year plans",
                    "Global benchmarking - Compare performance across regions and business units",
                    "Advanced scenario modeling - What-if analysis for strategic decisions"
                ]
            },
            {
                name: "Regulated Industries",
                points: [
                    "Industry-specific compliance - Healthcare, finance, government requirements",
                    "Audit trail automation - Complete transparency for regulatory reviews",
                    "Partner revenue tracking - Complex channel and distribution models",
                    "Contract compliance monitoring - Ensure revenue recognition follows agreements",
                    "Security certification readiness - SOC 2, ISO 27001, etc. built-in"
                ]
            }
        ],
        "AI-Driven Digital Marketing & Demand Generation": [
            {
                name: "Startups",
                points: [
                    "Founder-led marketing efficiency - Maximize impact with minimal budget",
                    "Organic growth optimization - SEO and content that delivers early pipeline",
                    "Early adopter targeting - Find ideal first customers with precision",
                    "Product-led growth integration - Connect marketing to product usage signals",
                    "Investor story validation - Prove market demand for funding rounds"
                ]
            },
            {
                name: "Scale-ups",
                points: [
                    "First marketing team scaling - Enable small team to punch above weight",
                    "Channel diversification intelligence - Identify best-performing new channels",
                    "ABM foundation building - Start account-based marketing before enterprise",
                    "Marketing-sales SLA optimization - Improve handoffs and conversion rates",
                    "Event ROI measurement - Track conference and webinar impact clearly"
                ]
            },
            {
                name: "SMEs",
                points: [
                    "Multi-channel campaign coordination - Manage 5-7 channels efficiently",
                    "Marketing automation scaling - Beyond basic email to sophisticated nurturing",
                    "Regional campaign optimization - Tailor messaging for different markets",
                    "Competitive response intelligence - Monitor and respond to competitor moves",
                    "Content ROI optimization - Focus on what drives pipeline, not vanity metrics"
                ]
            },
            {
                name: "Mid-Market",
                points: [
                    "Enterprise ABM implementation - Full account-based marketing programs",
                    "Multi-touch attribution - Understand complex buyer journeys",
                    "Global campaign management - Coordinate across regions and languages",
                    "Partner marketing optimization - Scale through channel partners effectively",
                    "Brand tracking integration - Connect demand gen to brand health metrics"
                ]
            },
            {
                name: "Large Enterprises",
                points: [
                    "Global brand consistency - Maintain messaging integrity worldwide",
                    "Corporate vs. BU marketing alignment - Balance central and local needs",
                    "M&A marketing integration - Rapidly incorporate acquired company campaigns",
                    "Privacy-compliant targeting - Navigate cookie restrictions and regulations",
                    "Executive visibility dashboards - CMO to CEO pipeline transparency"
                ]
            },
            {
                name: "Global Enterprises",
                points: [
                    "24/7 campaign optimization - Continuous improvement across time zones",
                    "Localization intelligence - Optimize content and campaigns by region",
                    "Global budget optimization - Allocate spend across 20+ countries",
                    "Crisis response monitoring - Track and respond to market events",
                    "Market share tracking - Monitor position against global competitors"
                ]
            },
            {
                name: "Complex Sales Cycles",
                points: [
                    "Long-funnel optimization - Nurture leads over 6-18 month cycles",
                    "Committee buying intelligence - Target all stakeholders in complex deals",
                    "Regulatory messaging compliance - Industry-specific content requirements",
                    "Channel conflict avoidance - Manage direct vs. indirect marketing",
                    "RFP response optimization - Improve win rates on formal bids"
                ]
            }
        ],
        "Market & Demand Intelligence": [
            {
                name: "Startups",
                points: [
                    "Early market validation - Prove demand before building product",
                    "Initial ICP refinement - Continuously improve ideal customer profile",
                    "Competitor gap analysis - Find openings against established players",
                    "Early trend detection - Spot emerging opportunities in your space",
                    "Founder-led research efficiency - Maximum insights with minimal resources"
                ]
            },
            {
                name: "Scale-ups",
                points: [
                    "Expansion market identification - Where to grow after initial success",
                    "Competitor response tracking - Monitor how incumbents react to you",
                    "Market size validation - Prove TAM for next funding round",
                    "New persona discovery - Identify additional buyer types to target",
                    "Channel opportunity mapping - Find indirect routes to market"
                ]
            },
            {
                name: "SMEs",
                points: [
                    "Market segmentation optimization - Focus resources on best segments",
                    "Competitor pricing intelligence - Optimize pricing against market",
                    "Regional expansion analysis - Data-driven decisions on new geographies",
                    "Industry vertical prioritization - Which verticals offer most potential",
                    "Partner ecosystem mapping - Identify key influencers and partners"
                ]
            },
            {
                name: "Mid-Market",
                points: [
                    "Market share tracking - Monitor position relative to competitors",
                    "M&A opportunity identification - Strategic acquisition targets",
                    "Global market entry analysis - Data-driven international expansion",
                    "Technology trend monitoring - Stay ahead of disruptive innovations",
                    "Customer advisory board insights - Formalize feedback from key accounts"
                ]
            },
            {
                name: "Large Enterprises",
                points: [
                    "Market disruption early warning - Detect threats before they impact revenue",
                    "Regulatory change impact analysis - How new regulations affect markets",
                    "Global economic trend correlation - Connect macro trends to micro impacts",
                    "Competitor strategy decoding - Reverse engineer competitor moves",
                    "Innovation opportunity scanning - Identify white space for R&D investment"
                ]
            },
            {
                name: "Global Enterprises",
                points: [
                    "Geopolitical risk assessment - Monitor political impacts on markets",
                    "Global competitor intelligence - Track 20+ competitors worldwide",
                    "Cross-border opportunity analysis - Identify international synergies",
                    "Emerging market volatility monitoring - Risk assessment for developing regions",
                    "Global regulatory landscape tracking - Compliance across 50+ countries"
                ]
            },
            {
                name: "Technology/SaaS",
                points: [
                    "Developer community intelligence - Monitor open source and tech trends",
                    "API ecosystem analysis - Partner and integration opportunities",
                    "Platform shift detection - Cloud, mobile, AI adoption trends",
                    "Startup competitor tracking - Monitor emerging disruptors",
                    "Technology adoption curves - Predict when markets will mature"
                ]
            }
        ],
        "Market Validation & Research": [
            {
                name: "Startups",
                points: [
                    "Idea validation framework - Test concepts before writing code",
                    "Early adopter identification - Find ideal first users for feedback",
                    "Minimum viable pricing testing - Simple experiments to gauge willingness to pay",
                    "Competitive positioning clarity - How to stand out with limited resources",
                    "Investor validation evidence - Data to support funding pitches"
                ]
            },
            {
                name: "Scale-ups",
                points: [
                    "Product expansion validation - Test new features before development",
                    "Market expansion testing - Validate new segments or geographies",
                    "Pricing tier optimization - Refine packages based on customer value",
                    "Channel validation - Test distribution partners before signing deals",
                    "Brand positioning refinement - Evolve messaging as company grows"
                ]
            },
            {
                name: "SMEs",
                points: [
                    "New product line validation - Expand offerings with confidence",
                    "Enterprise readiness assessment - When and how to move upmarket",
                    "International market testing - Validate expansion before heavy investment",
                    "M&A target validation - Assess acquisition opportunities rigorously",
                    "Customer segmentation refinement - Identify most profitable segments"
                ]
            },
            {
                name: "Mid-Market",
                points: [
                    "Strategic initiative validation - Test major bets before full commitment",
                    "Corporate venture testing - Validate innovation investments",
                    "Channel partner program validation - Test new distribution models",
                    "Brand extension testing - New markets under existing brand",
                    "Technology partnership validation - Assess integration opportunities"
                ]
            },
            {
                name: "Large Enterprises",
                points: [
                    "Business unit strategy validation - Test divisional initiatives independently",
                    "Market disruption response testing - Validate competitive counter-moves",
                    "Corporate innovation validation - Test startup-like initiatives",
                    "Global rollout validation - Test in one region before worldwide launch",
                    "Strategic alliance validation - Test partnership opportunities"
                ]
            },
            {
                name: "Global Enterprises",
                points: [
                    "Cross-border initiative validation - Test global programs locally first",
                    "Emerging market entry validation - High-risk market testing",
                    "Global brand campaign testing - Validate messaging across cultures",
                    "Regulatory impact validation - Test compliance initiatives",
                    "Crisis response validation - Test communication strategies"
                ]
            },
            {
                name: "Product-Led Growth",
                points: [
                    "Freemium conversion validation - Test upgrade triggers and pricing",
                    "Product virality testing - Validate referral and network effects",
                    "Usage-based pricing validation - Test different metric and pricing models",
                    "In-product messaging testing - Validate upgrade prompts and CTAs",
                    "Community-driven validation - Leverage user communities for insights"
                ]
            }
        ],
        "Product-Market Fit Validation": [
            {
                name: "Startups",
                subtitle: "Pre-PMF",
                points: [
                    "Early user behavior tracking - Simple metrics that actually matter",
                    "Problem-solution fit validation - Are you solving a real problem?",
                    "Core value prop testing - Does the product deliver promised value?",
                    "User feedback triage - Prioritize what to fix vs. what to ignore",
                    "PMF signal detection - Early indicators of product-market fit"
                ]
            },
            {
                name: "Scale-ups",
                subtitle: "Achieving PMF",
                points: [
                    "Expansion use case validation - Beyond early adopters to mainstream",
                    "Retention optimization - Improve stickiness and reduce churn",
                    "Feature adoption analysis - What features drive value and retention",
                    "User segment PMF analysis - Different fit for different segments",
                    "Scalability signal detection - When to shift from validation to scaling"
                ]
            },
            {
                name: "SMEs",
                subtitle: "Post-PMF Optimization",
                points: [
                    "Market segment expansion validation - New customer types",
                    "Geographic expansion testing - PMF in new regions",
                    "Product line extension validation - New features and modules",
                    "Pricing model optimization - Maximize value capture",
                    "Competitive response testing - How PMF holds up vs. new entrants"
                ]
            },
            {
                name: "Mid-Market",
                subtitle: "Enterprise PMF",
                points: [
                    "Enterprise feature validation - What large companies need vs. SMBs",
                    "Integration ecosystem validation - Partner and API requirements",
                    "Security and compliance validation - Enterprise buyer requirements",
                    "Implementation process validation - Onboarding and time-to-value",
                    "Support and success validation - Post-sale requirements"
                ]
            },
            {
                name: "Large Enterprises",
                subtitle: "Platform PMF",
                points: [
                    "Platform ecosystem validation - Developer and partner adoption",
                    "Multi-product synergy validation - Cross-selling opportunities",
                    "Global localization validation - PMF across cultures and languages",
                    "Industry vertical validation - Specialized versions and features",
                    "Acquisition integration validation - PMF for acquired products"
                ]
            },
            {
                name: "Global Enterprises",
                subtitle: "Multi-Market PMF",
                points: [
                    "Regional PMF variation analysis - Different fits in different markets",
                    "Cultural adaptation validation - Product adjustments for local markets",
                    "Regulatory compliance validation - Local legal requirements",
                    "Local competitor response testing - How PMF holds up locally",
                    "Global feature prioritization - What to build for which markets"
                ]
            },
            {
                name: "B2B2C/Platform",
                points: [
                    "Two-sided market validation - Both buyer and seller PMF",
                    "Network effects validation - Do more users create more value?",
                    "Marketplace liquidity validation - Supply-demand balance",
                    "Platform governance validation - Rules and standards that work",
                    "Ecosystem health metrics - Overall platform vitality"
                ]
            }
        ],
        "Product Scaling & Growth Intelligence": [
            {
                name: "Startups",
                points: [
                    "Core feature optimization - Maximize adoption of essential features",
                    "User onboarding improvement - Reduce time to first value",
                    "Early expansion signals - Identify upsell opportunities in first users",
                    "Product-led growth foundations - Build virality and referrals early",
                    "Usage-based pricing validation - Test different monetization models"
                ]
            },
            {
                name: "Scale-ups",
                points: [
                    "Feature adoption acceleration - Drive usage across growing user base",
                    "Expansion revenue optimization - Systematize upsell and cross-sell",
                    "User segmentation strategies - Different approaches for different segments",
                    "Product-qualified lead generation - Turn usage into sales pipeline",
                    "Community building integration - Leverage users to drive growth"
                ]
            },
            {
                name: "SMEs",
                points: [
                    "Enterprise feature adoption - Drive usage in larger accounts",
                    "Multi-product expansion - Cross-sell additional products successfully",
                    "International feature adoption - Scale usage across regions",
                    "Partner ecosystem adoption - Drive usage through channel partners",
                    "Customer advocacy scaling - Turn users into references and case studies"
                ]
            },
            {
                name: "Mid-Market",
                points: [
                    "Product suite optimization - Coordinate adoption across product portfolio",
                    "Industry vertical adoption - Customize for specific verticals",
                    "Global feature rollout - Coordinate worldwide feature releases",
                    "Platform ecosystem adoption - Drive third-party integration usage",
                    "Customer education scaling - Systematize training and enablement"
                ]
            },
            {
                name: "Large Enterprises",
                points: [
                    "Product portfolio management - Optimize across 10+ products",
                    "Global adoption benchmarking - Compare usage across regions",
                    "M&A product integration - Incorporate acquired product usage",
                    "Enterprise deployment optimization - Large-scale rollout management",
                    "Product governance frameworks - Standards and best practices"
                ]
            },
            {
                name: "Global Enterprises",
                points: [
                    "24/7 adoption monitoring - Continuous optimization across time zones",
                    "Cross-cultural adoption patterns - Understand regional usage differences",
                    "Global user community management - Scale advocacy worldwide",
                    "Multi-language feature adoption - Optimize for local languages",
                    "International compliance adoption - Ensure features meet local regulations"
                ]
            },
            {
                name: "API/Developers",
                points: [
                    "Developer adoption optimization - Drive API usage and integration",
                    "Partner ecosystem scaling - Grow third-party app development",
                    "API usage monetization - Optimize pricing based on usage patterns",
                    "Developer experience optimization - Improve documentation and support",
                    "Platform health monitoring - Overall ecosystem vitality"
                ]
            }
        ],
        "Customer Success & Retention Intelligence": [
            {
                name: "Startups",
                points: [
                    "Early warning churn detection - Spot risks in first 100 customers",
                    "Founder-led success scaling - Maximize impact with minimal team",
                    "Product usage health scoring - Simple metrics that predict retention",
                    "Early expansion opportunity identification - First upsell signals",
                    "Customer feedback systemization - Collect and act on feedback efficiently"
                ]
            },
            {
                name: "Scale-ups",
                points: [
                    "First CS team enablement - Scale success beyond founders",
                    "Segmentation-based success - Different approaches for different segments",
                    "Expansion revenue systemization - Turn ad-hoc upsells into processes",
                    "Customer advocacy program building - Reference and case study generation",
                    "Cross-functional success integration - Connect success to product and sales"
                ]
            },
            {
                name: "SMEs",
                points: [
                    "Enterprise success scaling - Handle larger, more complex customers",
                    "Multi-product success management - Success across product portfolio",
                    "Partner success enablement - Success through channel partners",
                    "Customer community building - Scale advocacy through communities",
                    "Executive business reviews - Systematize strategic customer meetings"
                ]
            },
            {
                name: "Mid-Market",
                points: [
                    "Global success coordination - Manage customers across regions",
                    "Industry vertical specialization - Success processes by industry",
                    "Customer health standardization - Consistent scoring across segments",
                    "Expansion forecasting accuracy - Predictable growth from existing customers",
                    "Success technology stack optimization - Tools for scaling efficiency"
                ]
            },
            {
                name: "Large Enterprises",
                points: [
                    "Strategic account success - Top 100 customer management",
                    "Global success standardization - Consistent processes worldwide",
                    "M&A customer integration - Success for acquired company customers",
                    "Executive sponsorship programs - C-level relationship management",
                    "Customer advisory board management - Formal strategic feedback"
                ]
            },
            {
                name: "Global Enterprises",
                points: [
                    "24/7 success monitoring - Continuous coverage across time zones",
                    "Cross-cultural success approaches - Adapt methods to local cultures",
                    "Global customer advocacy - Reference customers worldwide",
                    "International compliance success - Ensure success meets local regulations",
                    "Global customer community - Worldwide user networking"
                ]
            },
            {
                name: "Enterprise/Complex",
                points: [
                    "Multi-stakeholder success - Manage relationships across buyer committee",
                    "Implementation success tracking - Onboarding and deployment health",
                    "Integration success management - Third-party integration health",
                    "Regulatory compliance success - Ensure customers meet requirements",
                    "Partner co-success management - Success with implementation partners"
                ]
            }
        ],
        "Behaviour Analytics": [
            {
                name: "Startups",
                points: [
                    "Chatbot lead capture - Simple 24/7 engagement for early websites",
                    "Basic engagement tracking - Visibility into first user interests",
                    "Daily traffic summaries - Essential growth metrics",
                    "User behaviour library - Understand anonymous users before they convert"
                ]
            },
            {
                name: "Growth Teams",
                points: [
                    "Lead scoring automation - Identify hot prospects instantly",
                    "Segmentation metrics - Group users by intent and technology",
                    "Weekly trends - Comparative analysis of traffic growth",
                    "Engagement depth mapping - Optimize conversion paths"
                ]
            },
            {
                name: "Enterprise",
                points: [
                    "Global traffic analytics - Performance across 100+ cities",
                    "Predictive behaviour logs - Audit trail of system triggers",
                    "Advanced UTM attribution - Multi-channel ROI visibility",
                    "Custom reporting swarms - Domain-specific intelligence reports"
                ]
            }
        ]
    };

    const offerings = [
        {
            title: "AI-Powered Sales Intelligence & Execution",
            subtitle: "Close more deals with predictive precision",
            icon: <Zap className="h-6 w-6 text-[#2878B5]" />,
            challenges: [
                { title: "Deal Stagnation", desc: "Sales teams waste 65% of their time on low-probability deals" },
                { title: "Pipeline Bloat", desc: "Average sales teams have 40% stalled opportunities that never progress" },
                { title: "Forecast Inaccuracy", desc: "72% of sales forecasts miss by more than 25%" },
                { title: "Manual Sales Processes", desc: "Reps spend only 28% of their time actually selling" }
            ],
            kpiPainPoints: [
                "Low win rates (<30%)",
                "Long sales cycles (>90 days)",
                "High discounting (>20% average)",
                "Poor forecast accuracy (<70%)",
                "Low quota attainment (<60%)"
            ],
            solutions: [
                "Predictive Deal Scoring & Opportunity Prioritization – AI identifies winnable deals",
                "Autonomous Sales Orchestration – Automated workflows that adapt in real-time",
                "Conversational AI for Sales – Intelligent engagement across outbound & inbound channels",
                "Quote-to-Cash Automation – Streamlined CPQ, proposals, and contract management",
                "Account Intelligence & Expansion Insights – Data-driven growth strategies for existing customers",
                "Revenue Forecasting & Risk Intelligence – Real-time predictions with actionable insights"
            ],
            outcomes: [
                "4–6× faster sales velocity",
                "30–45% higher win rates",
                "35–50% shorter sales cycles",
                "85%+ forecast accuracy",
                "15% reduction in discounting"
            ]
        },
        {
            title: "Revenue Operations & Intelligence",
            subtitle: "Predictable growth through unified data",
            icon: <Workflow className="h-6 w-6 text-cyan-600" />,
            challenges: [
                { title: "Data Silos", desc: "63% of companies have revenue data spread across 5+ disconnected systems" },
                { title: "Revenue Leakage", desc: "Average B2B company loses 15-25% of potential revenue to process gaps" },
                { title: "Manual Reporting", desc: "RevOps teams spend 12+ hours weekly on manual KPI aggregation" },
                { title: "Forecast Discrepancies", desc: "58% of executives don't trust their revenue forecasts" }
            ],
            kpiPainPoints: [
                "Revenue leakage (>15% of pipeline)",
                "Poor pipeline coverage (<3x quota)",
                "Manual data entry time (>10 hrs/week/rep)",
                "Board confidence score (<6/10)",
                "Mismatched attribution models"
            ],
            solutions: [
                "Unified Revenue Command Center – Cross-functional visibility across marketing, sales, and success",
                "Pipeline Integrity & Leakage Detection – AI identifies and remedies revenue gaps",
                "Sales Performance Intelligence – Personalized coaching recommendations",
                "Board-Ready Analytics – Standardized KPIs and executive dashboards"
            ],
            outcomes: [
                "95%+ forecast accuracy",
                "20–30% reduction in revenue leakage",
                "Enhanced investor confidence with transparent reporting",
                "40% reduction in manual reporting time",
                "Unified attribution across marketing-sales-success"
            ]
        },
        {
            title: "AI-Driven Digital Marketing & Demand Generation",
            subtitle: "Transform awareness into pipeline with precision",
            icon: <Target className="h-6 w-6 text-[#2878B5]" />,
            challenges: [
                { title: "Lead Quality Issues", desc: "61% of marketers send all leads directly to sales, despite 80% being unqualified" },
                { title: "Channel Fragmentation", desc: "Average marketers use 8+ channels with siloed performance data" },
                { title: "Attribution Blindness", desc: "67% of marketing spend cannot be accurately attributed to revenue" },
                { title: "Content Waste", desc: "70% of marketing content goes unused by sales teams" }
            ],
            kpiPainPoints: [
                "High cost per lead (>$500 enterprise B2B)",
                "Low MQL-to-SQL conversion (<13%)",
                "Unattributed pipeline (>40%)",
                "Content utilization rate (<30%)",
                "Campaign ROI unknown or negative"
            ],
            solutions: [
                "Hyper-Personalized Campaign Execution – Dynamic content and channel optimization",
                "Predictive Audience Intelligence – Look-alike modeling and micro-segmentation",
                "Content & SEO Optimization – AI-generated insights for higher visibility",
                "Conversion Rate Intelligence – Real-time funnel optimization",
                "Multi-Channel Attribution – Clear ROI measurement across touchpoints"
            ],
            outcomes: [
                "2–3× improvement in marketing-to-sales conversion",
                "25–35% lower customer acquisition costs",
                "Maximized channel ROI",
                "90%+ attribution accuracy",
                "50% increase in content utilization"
            ]
        },
        {
            title: "Market & Demand Intelligence",
            subtitle: "Discover hidden opportunities before your competitors",
            icon: <Search className="h-6 w-6 text-[#2878B5]" />,
            challenges: [
                { title: "Market Blind Spots", desc: "73% of companies miss emerging market opportunities until competitors capture them" },
                { title: "Inefficient Targeting", desc: "42% of sales outreach goes to accounts with no active demand" },
                { title: "Competitive Surprises", desc: "56% of competitive losses come from unanticipated competitor moves" },
                { title: "Territory Imbalance", desc: "40% of territories are either over-saturated or under-penetrated" }
            ],
            kpiPainPoints: [
                "Low account penetration (<20% in target accounts)",
                "High competitive loss rates (>35%)",
                "Inefficient territory allocation",
                "Missed market timing (6+ months late to trends)",
                "Poor ICP matching accuracy"
            ],
            solutions: [
                "Demand Signal Intelligence – AI-driven analysis of search, social, web, and intent data",
                "Market White Space Mapping – Uncover underserved segments and emerging trends",
                "Buying Committee Intelligence – Map decision-makers and influence networks",
                "Competitive Intelligence Suite – Share-of-voice tracking and strategic gap analysis"
            ],
            outcomes: [
                "Accelerated entry into high-growth markets (3-6 months faster)",
                "Reduced go-to-market trial-and-error",
                "Precision positioning based on real-time signals",
                "40% higher target account engagement",
                "30% reduction in competitive surprises"
            ]
        },
        {
            title: "Market Validation & Research",
            subtitle: "Launch with confidence using data-driven validation",
            icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
            challenges: [
                { title: "Failed Launches", desc: "75% of new product launches fail to meet revenue expectations" },
                { title: "Pricing Misalignment", desc: "60% of pricing decisions are based on gut feel, not data" },
                { title: "Resource Misdirection", desc: "Companies waste $2.3M annually on products markets don't want" },
                { title: "Feature Waste", desc: "80% of product features are rarely or never used" }
            ],
            kpiPainPoints: [
                "Low launch success rate (<25%)",
                "Pricing optimization cycles (>6 months)",
                "High R&D waste (>30% of budget)",
                "Poor feature adoption rates (<20%)",
                "Slow market insight turnaround (weeks/months)"
            ],
            solutions: [
                "AI-Powered Market Sizing – Dynamic TAM/SAM/SOM analysis",
                "Pricing Intelligence & Elasticity Modeling – Optimal price point identification",
                "Customer Problem & JTBD Analysis – Deep insight into unmet needs",
                "Competitive Benchmarking – Feature, pricing, and positioning comparisons",
                "Automated Research Synthesis – Rapid insight generation from multiple data sources"
            ],
            outcomes: [
                "Reduced launch risk (50% higher success rates)",
                "Higher market entry success rates",
                "Investment decisions backed by predictive analytics",
                "60% faster pricing optimization cycles",
                "40% reduction in R&D waste"
            ]
        },
        {
            title: "Product-Market Fit Validation",
            subtitle: "Validate product viability before scaling resources",
            icon: <Rocket className="h-6 w-6 text-orange-600" />,
            challenges: [
                { title: "Premature Scaling", desc: "70% of startups scale before achieving true PMF, burning cash" },
                { title: "Feedback Overload", desc: "Product teams drown in 1000s of feedback points without prioritization" },
                { title: "Experiment Inefficiency", desc: "60% of A/B tests fail due to poor hypothesis design" },
                { title: "Roadmap Whiplash", desc: "Constant pivots without data-driven decision making" }
            ],
            kpiPainPoints: [
                "High customer acquisition cost (>3x LTV)",
                "Low retention (<30% month 3)",
                "Poor NPS scores (<30)",
                "Slow feature validation cycles (>2 months)",
                "High product rework (>25% of dev time)"
            ],
            solutions: [
                "MVP Experimentation Framework – Structured hypothesis testing with AI analysis",
                "User Behavior & Adoption Analytics – Early signal detection for feature validation",
                "PMF Scoring Models – Quantified product-market fit metrics",
                "Automated Feedback Synthesis – Insights from reviews, support tickets, and user interviews"
            ],
            outcomes: [
                "Faster validation cycles (weeks vs months)",
                "Reduced product rework costs (40% reduction)",
                "Data-informed roadmap prioritization",
                "50% improvement in early retention metrics",
                "Clear go/no-go investment signals"
            ]
        },
        {
            title: "Product Scaling & Growth Intelligence",
            subtitle: "Scale what works, optimize what doesn't",
            icon: <TrendingUp className="h-6 w-6 text-teal-700" />,
            challenges: [
                { title: "Adoption Plateaus", desc: "85% of features see less than 20% adoption after 90 days" },
                { title: "Monetization Gaps", desc: "Companies leave 30-40% of potential revenue on the table" },
                { title: "Retention Leaks", desc: "65% of churn is preventable with early intervention signals" },
                { title: "Roadmap Politics", desc: "Prioritization driven by HiPPOs (Highest Paid Person's Opinion), not data" }
            ],
            kpiPainPoints: [
                "Low feature adoption rates (<20%)",
                "Poor expansion revenue (<15% of ARR)",
                "High churn rates (>10% annual)",
                "Long time-to-value (>90 days)",
                "Low product-led growth contribution"
            ],
            solutions: [
                "Product Usage Intelligence – Deep analytics on feature adoption and engagement",
                "Roadmap Optimization Engine – AI-driven feature prioritization",
                "Monetization & Expansion Signals – Identify upsell and expansion opportunities",
                "Cohort Retention Modeling – Predict and improve customer lifetime value",
                "Product-Led Growth Acceleration – Automated in-product guidance and optimization"
            ],
            outcomes: [
                "25–40% increase in product-led revenue",
                "Higher feature adoption rates (2-3x improvement)",
                "Improved retention and expansion metrics",
                "30% reduction in preventable churn",
                "Data-driven roadmap prioritization"
            ]
        },
        {
            title: "Customer Success & Retention Intelligence",
            subtitle: "Transform customers into growth assets",
            icon: <Users className="h-6 w-6 text-teal-600" />,
            challenges: [
                { title: "Surprise Churn", desc: "80% of customers show clear churn signals 90+ days before leaving" },
                { title: "Renewal Uncertainty", desc: "CSMs spend 40% of their time on manual renewal forecasting" },
                { title: "Expansion Blindness", desc: "60% of expansion opportunities are identified too late" },
                { title: "Voice-of-Customer Noise", desc: "Thousands of feedback points without actionable insights" }
            ],
            kpiPainPoints: [
                "High churn rates (>10% gross)",
                "Low NRR (<100%)",
                "Manual health scoring (subjective/inconsistent)",
                "Slow risk detection (>30 days after signals appear)",
                "Poor expansion forecasting accuracy"
            ],
            solutions: [
                "Predictive Health Scoring – Early churn risk identification",
                "Renewal & Expansion Forecasting – Accurate prediction of growth opportunities",
                "CSM Intelligence Platform – AI-guided playbooks and next-best actions",
                "Integrated Support-Success Signals – Unified view of customer experience",
                "Voice-of-Customer Intelligence – Sentiment analysis and trend detection"
            ],
            outcomes: [
                "Reduced churn through proactive intervention (30-50% reduction)",
                "Higher net revenue retention (115%+ NRR)",
                "Expansion-driven growth acceleration",
                "70% reduction in manual forecasting time",
                "40% faster risk detection and intervention"
            ]
        },
        {
            title: "Enterprise GTM Transformation",
            subtitle: "Modernize and scale your go-to-market engine",
            icon: <Globe className="h-6 w-6 text-[#1E6297]" />,
            challenges: [
                { title: "GTM Inconsistency", desc: "70% of transformation initiatives fail due to poor change management" },
                { title: "Territory Imbalance", desc: "35% of reps are under-quota due to poor territory design" },
                { title: "Channel Conflict", desc: "Multi-channel GTM creates 40% more internal friction and competition" },
                { title: "Adoption Resistance", desc: "65% of sales teams revert to old processes within 90 days" }
            ],
            kpiPainPoints: [
                "Low transformation success rate (<30%)",
                "High sales turnover (>30% annually)",
                "Poor quota attainment distribution",
                "Long transformation ROI (>18 months)",
                "Low new process adoption (<40%)"
            ],
            solutions: [
                "GTM Maturity Assessment – AI-powered evaluation of current capabilities",
                "Sales Process Re-engineering – Optimization based on data patterns",
                "Territory & Capacity Optimization – Intelligent resource allocation",
                "Multi-Product GTM Design – Coordinated launch and scaling frameworks",
                "Change Management & Adoption – Accelerated implementation programs"
            ],
            outcomes: [
                "Scalable enterprise growth architecture",
                "Faster transformation ROI (6-9 months)",
                "Consistent execution across products and regions",
                "50% improvement in quota attainment distribution",
                "80%+ new process adoption rates"
            ]
        },
        {
            title: "AI Governance & Enterprise Enablement",
            subtitle: "Enterprise-grade trust and compliance",
            icon: <ShieldCheck className="h-6 w-6 text-slate-600" />,
            challenges: [
                { title: "AI Black Box", desc: "78% of executives can't explain how AI decisions are made" },
                { title: "Compliance Risk", desc: "62% of AI projects face regulatory or compliance delays" },
                { title: "Bias Blindness", desc: "Unchecked algorithmic bias creates legal and reputational risk" },
                { title: "Adoption Paralysis", desc: "45% of AI initiatives stall in pilot due to governance concerns" }
            ],
            kpiPainPoints: [
                "Long AI approval cycles (>6 months)",
                "High compliance audit findings",
                "Poor model transparency scores",
                "Low executive AI confidence (<5/10)",
                "High risk of regulatory penalties"
            ],
            solutions: [
                "Explainable AI & Decision Traceability – Transparent algorithmic insights",
                "Security & Compliance Frameworks – Built-in privacy and regulatory adherence",
                "Bias Detection & Model Monitoring – Continuous fairness and accuracy validation",
                "AI Governance Operating Models – Structured oversight and control frameworks",
                "Executive AI Enablement – Board-level education and strategic guidance"
            ],
            outcomes: [
                "Accelerated enterprise adoption and approval (60% faster)",
                "Reduced regulatory and reputational risk",
                "Confident AI integration across organizations",
                "95%+ model audit compliance rates",
                "Executive confidence scores of 8+/10"
            ]
        },
        {
            title: "Behaviour Analytics",
            subtitle: "Decode the digital body language of every visitor",
            icon: <Activity className="h-6 w-6 text-teal-700" />,
            challenges: [
                { title: "Engagement Blindness", desc: "95% of businesses only know THAT users visit, not WHY they visit" },
                { title: "Lead Leakage", desc: "40% of high-intent visitors leave without being identified as leads" },
                { title: "Data fragmentation", desc: "Traditional analytics don't link raw traffic to actual buyer intent" }
            ],
            kpiPainPoints: [
                "Undetected intent signals",
                "High bounce on key pages",
                "Unidentified lead opportunities",
                "Manual reporting overhead",
                "Low context in CRM leads"
            ],
            solutions: [
                "Chatbot Lead Intelligence – Autonomous capture with real-time scoring",
                "Engagement & Behaviour Mapping – Track depth, clicks, and intent clusters",
                "Global Traffic ROI Tracking – Holistic attribution for every source",
                "Unified Behaviour Library – Aggregated session history per user",
                "Automated Reporting Swarms – Daily and weekly intelligence delivery"
            ],
            outcomes: [
                "3x higher identified lead volume",
                "Zero-latency admin lead alerts",
                "100% visibility into traffic sources",
                "Automated executive-ready reports",
                "Enriched context for sales teams"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-emerald-100">
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#2878B5] font-bold">Offerings</span>
                </nav>
            </div>

            {/* Hero Section per Section 7 */}
            <section className="relative py-12 md:py-16 overflow-hidden">
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            PROFITABILITY &amp; GROWTH INTELLIGENCE
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0A2540] mb-6 tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            Discover Profitable Markets. Validate Demand. Accelerate Revenue.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto mb-8"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            ProfitMachines helps businesses identify attractive market opportunities, understand customer demand, build differentiated offers, select effective growth channels, and make evidence-based decisions that improve revenue potential and profitability.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#profit-journey"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#2878B5] text-white font-bold text-sm hover:bg-[#1E6297] transition-all shadow-md shadow-[#2878B5]/25"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Explore Our Offerings
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <Link
                                to="/book-consultation"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 text-[#0A2540] font-bold text-sm hover:border-[#2878B5] hover:text-[#2878B5] transition-colors bg-white shadow-xs"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Discuss Your Growth Opportunity
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div id="profit-journey" className="scroll-mt-24">
                <ProfitJourneyNavigator />
            </div>

            <div className="relative z-10">

                {/* Platform Overview */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 lg:mb-24">
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 lg:p-12 shadow-card relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E1EFF8]/30 via-transparent to-[#F0F7FC]/40 opacity-100 pointer-events-none"></div>
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] mb-6 tracking-tight leading-[1.1]"
                                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                                    One Intelligence Platform. <br /> <span className="text-[#2878B5]">Infinite Growth.</span>
                                </h2>
                                <p className="text-base sm:text-lg text-slate-600 mb-8 font-normal leading-relaxed"
                                    style={{ fontFamily: 'Inter, sans-serif' }}>
                                    ProfitMachines unifies marketing, sales, and customer success into a single intelligent revenue engine, replacing siloed tools with a unified nervous system.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                    {[
                                        "Predictable demand generation",
                                        "Faster deal cycles",
                                        "Higher win rates",
                                        "Lower CAC",
                                        "Stronger retention & expansion",
                                        "Real-time revenue visibility"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 group/item">
                                            <div className="min-w-[22px] min-h-[22px] rounded-full bg-[#E1EFF8] flex items-center justify-center border border-[#BAE0F8] transition-colors">
                                                <Check className="w-3.5 h-3.5 text-[#2878B5]" />
                                            </div>
                                            <span className="text-slate-700 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                {/* Abstract Icons Visual */}
                                <div className="grid gap-4">
                                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2878B5]/40 hover:shadow-card-hover transition-all hover:-translate-y-0.5 flex items-center gap-4 group/card">
                                        <div className="w-12 h-12 rounded-xl bg-[#E1EFF8] border border-[#BAE0F8]/60 flex items-center justify-center text-[#2878B5] group-hover/card:bg-[#2878B5] group-hover/card:text-white transition-colors shrink-0">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0A2540] text-base sm:text-lg" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>AI Intelligence Layer</h4>
                                            <p className="text-xs sm:text-sm text-slate-500 font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Predictive Modeling & Insights</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2878B5]/40 hover:shadow-card-hover transition-all hover:-translate-y-0.5 ml-0 sm:ml-8 flex items-center gap-4 group/card">
                                        <div className="w-12 h-12 rounded-xl bg-[#E1EFF8] border border-[#BAE0F8]/60 flex items-center justify-center text-[#2878B5] group-hover/card:bg-[#2878B5] group-hover/card:text-white transition-colors shrink-0">
                                            <Workflow className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0A2540] text-base sm:text-lg" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Unified Workflow</h4>
                                            <p className="text-xs sm:text-sm text-slate-500 font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Orchestration & Automation</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2878B5]/40 hover:shadow-card-hover transition-all hover:-translate-y-0.5 flex items-center gap-4 group/card">
                                        <div className="w-12 h-12 rounded-xl bg-[#E1EFF8] border border-[#BAE0F8]/60 flex items-center justify-center text-[#2878B5] group-hover/card:bg-[#2878B5] group-hover/card:text-white transition-colors shrink-0">
                                            <BarChart3 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0A2540] text-base sm:text-lg" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>Revenue Growth</h4>
                                            <p className="text-xs sm:text-sm text-slate-500 font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>Predictable Scale</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seven Discovery Layers */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 lg:mb-32">
                    <div className="text-center mb-12 md:mb-16">
                        <Link 
                            to="/offerings/profit-pool-discovery"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs hover:bg-[#BAE0F8]/40 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            Profit Pool Discovery Engine
                        </Link>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] mb-5 tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            <Link to="/offerings/profit-pool-discovery" className="hover:text-[#2878B5] transition-colors">
                                AI Driven Profit Pool Discovery
                            </Link>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal mb-8"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Engineering intelligence to uncover revenue others cannot see across B2B and B2C stacks.
                        </p>

                        {/* Premium B2B/B2C Tabs */}
                        <div className="flex justify-center mb-8">
                            <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                                <button
                                    onClick={() => setActivePoolTab('overview')}
                                    className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                                        activePoolTab === 'overview'
                                            ? 'bg-[#0A2540] text-white shadow-md'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActivePoolTab('b2b')}
                                    className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                                        activePoolTab === 'b2b'
                                            ? 'bg-[#0A2540] text-white shadow-md'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    B2B Profit Pools
                                </button>
                                <button
                                    onClick={() => setActivePoolTab('b2c')}
                                    className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                                        activePoolTab === 'b2c'
                                            ? 'bg-[#0A2540] text-white shadow-md'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    B2C Profit Pools
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {(() => {
                            const overviewItems = [
                                { name: "Market Discovery", slug: "market-discovery", question: "Where is the revenue we haven't mapped?", impact: "$300M unserved market identified" },
                                { name: "Demand Discovery", slug: "demand-discovery", question: "What are customers struggling to articulate they need?", impact: "Pipeline: +300%" },
                                { name: "Value Discovery", slug: "value-discovery", question: "How do we prove ROI before the PO is signed?", impact: "Deal velocity: +50% · POC conversion: 85%" },
                                { name: "Channel Discovery", slug: "channel-discovery", question: "How do we distribute without platform dependency?", impact: "Margin: +30 points" },
                                { name: "Competitive Discovery", slug: "competitive-discovery", question: "How do we win before the RFP is issued?", impact: "Win rate: +25%" },
                                { name: "Customer Discovery", slug: "customer-discovery", question: "Who is actually ready to buy AI — and who will waste our time?", impact: "CAC: -65%" },
                                { name: "Product-Market Fit Discovery", slug: "product-market-fit-discovery", question: "How do we stop building features no one uses?", impact: "R&D waste: -$2M/year" },
                                { name: "B2B Profit Pool Discovery", slug: "b2b", question: "Where are the hidden margin drivers in our enterprise sales cycles?", impact: "$450M enterprise revenue unlocked" },
                                { name: "B2C Profit Pool Discovery", slug: "b2c", question: "How do we identify and capture micro-segment margins in high-velocity consumer paths?", impact: "$180M consumer margin optimized" }
                            ];

                            const b2bItems = [
                                { name: "B2B Market Discovery", slug: "b2b-market-discovery", question: "Where is the unmapped enterprise revenue?", impact: "$450M unserved enterprise TAM mapped" },
                                { name: "B2B Demand Discovery", slug: "b2b-demand-discovery", question: "How do we sense hidden buying committee intent?", impact: "Enterprise Pipeline: +250%" },
                                { name: "B2B Value Discovery", slug: "b2b-value-discovery", question: "How do we build economic proof for procurement?", impact: "CFO approval rate: 90%" },
                                { name: "B2B Channel Discovery", slug: "b2b-channel-discovery", question: "How do we scale sales via strategic integrators?", impact: "Channel margin: +25 points" },
                                { name: "B2B Competitive Discovery", slug: "b2b-competitive-discovery", question: "How do we influence specifications pre-RFP?", impact: "Enterprise win rate: +35%" },
                                { name: "B2B Customer Discovery", slug: "b2b-customer-discovery", question: "Which key accounts have active budget for AI?", impact: "Sales waste: -50%" },
                                { name: "B2B Product-Market Fit Discovery", slug: "b2b-product-market-fit-discovery", question: "How do we validate custom roadmap requests?", impact: "R&D savings: $1.5M/year" }
                            ];

                            const b2cItems = [
                                { name: "B2C Market Discovery", slug: "b2c-market-discovery", question: "Where are the high-value consumer niches?", impact: "$200M new niche opportunities found" },
                                { name: "B2C Demand Discovery", slug: "b2c-demand-discovery", question: "What micro-moment triggers drive search spikes?", impact: "Consumer Traffic Lift: 4x" },
                                { name: "B2C Value Discovery", slug: "b2c-value-discovery", question: "How do we showcase instant value in checkout?", impact: "Conversion Rate: +85%" },
                                { name: "B2C Channel Discovery", slug: "b2c-channel-discovery", question: "How do we run direct paths without platform fees?", impact: "D2C margin: +30 points" },
                                { name: "B2C Competitive Discovery", slug: "b2c-competitive-discovery", question: "How do we capture search intent before rivals bid?", impact: "Ad efficiency: +40%" },
                                { name: "B2C Customer Discovery", slug: "b2c-customer-discovery", question: "Which behavioral cohorts convert in minutes?", impact: "Ad waste: -60%" },
                                { name: "B2C Product-Market Fit Discovery", slug: "b2c-product-market-fit-discovery", question: "Which cart-abandonment loops should we fix?", impact: "Abandoned revenue: -35%" }
                            ];

                            const items = activePoolTab === 'b2b' 
                                ? b2bItems 
                                : activePoolTab === 'b2c' 
                                    ? b2cItems 
                                    : overviewItems;

                            return items.map((disc, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-[#2878B5]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E6297] bg-[#F0F7FC] px-2.5 py-1 rounded-md border border-[#E1EFF8]">
                                                Layer 0{idx + 1}
                                            </span>
                                            <span className="text-[11px] font-semibold text-[#1E6297] bg-[#E1EFF8] px-2.5 py-1 rounded-md border border-[#BAE0F8] truncate">
                                                {disc.impact}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#2878B5] transition-colors leading-snug"
                                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.02em' }}>
                                            {disc.name}
                                        </h3>
                                        <p className="text-slate-600 text-sm font-normal italic mb-6"
                                            style={{ fontFamily: 'Inter, sans-serif' }}>
                                            "{disc.question}"
                                        </p>
                                    </div>
                                    <Link 
                                        to={`/offerings/profit-pool-discovery/${disc.slug}`}
                                        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#2878B5] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#1E6297] shadow-sm shadow-[#2878B5]/25 transition-all group-hover:shadow-md"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        <span>Explore Discovery Layer</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            ));
                        })()}
                    </div>
                </div>

                {/* Core Offerings */}
                <div id="core-offerings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 scroll-mt-28">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0A2540] mb-5 tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>Core Offerings</h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Comprehensive solutions powered by AI to transform every stage of your revenue cycle.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {offerings.map((offering, index) => (
                            <div key={index} id={offering.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="scroll-mt-32">
                                <Reveal width="100%" delay={0.1}>
                                    <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group rounded-3xl p-8 md:p-14 relative z-0">
                                        {/* Subtle decorative background gradient */}
                                        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gradient-to-b from-[#E1EFF8]/40 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                        {/* 1. Header Section: Title & Tag Line */}
                                        <div className="flex flex-col items-center text-center mb-16 relative">
                                            <div className="mb-6 p-4 bg-[#E1EFF8] border border-[#BAE0F8]/60 text-[#2878B5] rounded-2xl group-hover:scale-105 group-hover:bg-[#2878B5] group-hover:text-white transition-all duration-300 relative z-10 shadow-xs">
                                                {offering.icon}
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0F7FC] border border-[#E1EFF8] text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs"
                                                style={{ fontFamily: 'Inter, sans-serif' }}>
                                                Module {index + 1}
                                            </div>
                                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2540] mb-4 tracking-tight leading-[1.1]"
                                                style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>{offering.title}</h3>
                                            <p className="text-lg md:text-xl text-[#1E6297] font-medium max-w-3xl leading-relaxed"
                                                style={{ fontFamily: 'Inter, sans-serif' }}>{offering.subtitle}</p>
                                        </div>

                                        {/* 2. Challenges & KPI Grid */}
                                        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-16">
                                            {/* Business Challenges */}
                                            <div className="bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-transparent rounded-3xl p-8 md:p-10 border border-amber-100/50 relative overflow-hidden group/challenges">
                                                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/30 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-500 group-hover/challenges:opacity-100 opacity-60"></div>
                                                <h4 className="font-bold text-amber-950/80 text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3 relative z-10">
                                                    <div className="bg-amber-100 p-1.5 rounded-lg text-amber-600">
                                                        <AlertTriangle className="w-4 h-4" />
                                                    </div>
                                                    Business Challenges
                                                </h4>
                                                <ul className="space-y-6 relative z-10">
                                                    {offering.challenges.map((challenge, idx) => (
                                                        <li key={idx} className="flex gap-5 group/item">
                                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 ring-4 ring-amber-50 group-hover/item:bg-amber-500 transition-colors"></div>
                                                            <div>
                                                                <span className="font-bold text-slate-800 block mb-1.5 text-[0.95rem] group-hover/item:text-slate-900 transition-colors">{challenge.title}</span>
                                                                <span className="text-slate-500 text-sm leading-relaxed">{challenge.desc}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* KPI Pain Points (Number Cards) */}
                                            <div className="flex flex-col h-full">
                                                <h4 className="font-bold text-slate-400 text-xs uppercase tracking-[0.2em] mb-8 text-center lg:text-left flex items-center gap-3 lg:justify-start justify-center">
                                                    <span className="w-8 h-[1px] bg-slate-200 inline-block"></span>
                                                    KPI Pain Points
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
                                                    {offering.kpiPainPoints.map((kpi, idx) => {
                                                        const match = kpi.match(/([<>]\d+%?|\d+%)/);
                                                        const highlight = match ? match[0] : null;
                                                        const text = highlight ? kpi.replace(highlight, '').trim().replace(/[()]/g, '') : kpi;

                                                        return (
                                                            <div key={idx} className="bg-white p-8 rounded-3xl border border-red-50/60 shadow-[0_2px_15px_-4px_rgba(239,68,68,0.08)] hover:shadow-[0_8px_25px_-4px_rgba(239,68,68,0.12)] hover:border-red-100 transition-all duration-300 group/kpi flex flex-col justify-center items-center text-center h-full hover:-translate-y-1">
                                                                {highlight && (
                                                                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-rose-600 mb-3 block group-hover/kpi:scale-110 transition-transform duration-300">{highlight}</span>
                                                                )}
                                                                <span className="text-slate-600 font-semibold text-sm leading-snug">{text}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. Our Solutions (Portfolio Cards) */}
                                        <div className="mb-16">
                                            <h4 className="font-bold text-slate-900 text-xl mb-10 flex items-center gap-4">
                                                <div className="bg-emerald-50 p-2 rounded-xl text-[#2878B5]">
                                                    <Target className="w-5 h-5" />
                                                </div>
                                                Our Solutions
                                            </h4>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {offering.solutions.map((item, idx) => {
                                                    const [title, desc] = item.includes('–') ? item.split('–') : [item, ''];
                                                    return (
                                                        <div key={idx} className="bg-white hover:bg-slate-50/50 p-8 rounded-[1.5rem] border border-slate-100 hover:border-emerald-100/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.1)] transition-all duration-300 group/card hover:-translate-y-1">
                                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover/card:bg-[#2878B5] transition-all duration-300 group-hover/card:rotate-3 shadow-inner">
                                                                <Check className="w-5 h-5 text-emerald-600 group-hover/card:text-white transition-colors" />
                                                            </div>
                                                            <h5 className="font-bold text-lg text-slate-900 mb-3 group-hover/card:text-[#1E6297] transition-colors">{title.trim()}</h5>
                                                            {desc && <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc.trim()}</p>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* 4. Business Impact & Tailored Solutions */}
                                        <div className="grid lg:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-slate-100/80">
                                            {/* Business Impact */}
                                            <div className="lg:col-span-1">
                                                <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 group/bi hover:scale-[1.02] transition-transform duration-300">
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#2878B5]/20 to-violet-600/20 opacity-100"></div>
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                                    <h4 className="font-bold text-white/90 text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3 relative z-10">
                                                        <div className="bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
                                                            <TrendingUp className="w-4 h-4 text-emerald-300" />
                                                        </div>
                                                        Business Impact
                                                    </h4>
                                                    <ul className="space-y-5 relative z-10">
                                                        {offering.outcomes.map((outcome, idx) => (
                                                            <li key={idx} className="flex items-start gap-4">
                                                                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                                </div>
                                                                <span className="text-[0.9rem] font-medium text-slate-200 leading-snug">{outcome}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2.5 text-indigo-200 text-xs font-bold tracking-wide">
                                                        <Zap className="w-4 h-4 text-emerald-400" />
                                                        <span>ROI VERIFIED</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tailored Solutions Tabs */}
                                            <div className="lg:col-span-2">
                                                {offeringStages[offering.title] && (
                                                    <div className="h-full flex flex-col">
                                                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                                            <div className="bg-emerald-50 p-1.5 rounded-lg text-[#2878B5]">
                                                                <Layout className="w-4 h-4" />
                                                            </div>
                                                            Tailored Solutions by Stage
                                                        </h4>
                                                        <Tabs defaultValue={offeringStages[offering.title][0].name} className="w-full flex-1 flex flex-col lg:flex-row gap-8">
                                                            <TabsList className="w-full lg:w-[28%] justify-start h-auto flex-col gap-3 bg-transparent p-0">
                                                                {offeringStages[offering.title].map((stage, i) => (
                                                                    <TabsTrigger
                                                                        key={i}
                                                                        value={stage.name}
                                                                        className="w-full justify-start text-left data-[state=active]:!bg-[#2878B5] data-[state=active]:!text-white data-[state=active]:shadow-md bg-white text-slate-800 rounded-xl px-5 py-3.5 h-auto text-sm font-bold border border-slate-200/90 hover:border-[#2878B5]/50 hover:text-[#2878B5] hover:bg-[#F0F7FC] transition-all duration-200 shadow-2xs"
                                                                    >
                                                                        {stage.name}
                                                                    </TabsTrigger>
                                                                ))}
                                                            </TabsList>
                                                            <div className="flex-1 lg:w-[72%]">
                                                                {offeringStages[offering.title].map((stage, i) => (
                                                                    <TabsContent key={i} value={stage.name} className="mt-0 animate-in fade-in slide-in-from-right-4 duration-300 h-full">
                                                                        <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 h-full relative overflow-hidden">
                                                                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 relative z-10">
                                                                                <h5 className="font-bold text-slate-900 text-xl">{stage.name}</h5>
                                                                                {stage.subtitle && (
                                                                                    <span className="text-[#2878B5] text-xs font-bold uppercase tracking-wider bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-100">{stage.subtitle}</span>
                                                                                )}

                                                                            </div>
                                                                            <ul className="grid sm:grid-cols-1 gap-4 relative z-10">
                                                                                {stage.points.map((point, idx) => {
                                                                                    const [title, desc] = point.includes(' - ') ? point.split(' - ') : [point, ''];
                                                                                    return (
                                                                                        <li key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors">
                                                                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                                                                                            <span className="text-sm">
                                                                                                <span className="font-bold text-slate-900">{title}</span>
                                                                                                {desc && <span className="text-slate-500 block mt-0.5">{desc}</span>}
                                                                                            </span>
                                                                                        </li>
                                                                                    );
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </TabsContent>
                                                                ))}
                                                            </div>
                                                        </Tabs>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strategic Value Proposition (Light Theme) */}
                <div className="bg-white py-32 relative overflow-hidden text-slate-900 border-y border-slate-200">
                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px]"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-20 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#2878B5] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                                Unlock Growth
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">From Pain to Performance</h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
                                We help you connect the dots between isolated challenges and unified revenue intelligence.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-24">
                            {/* Connected Pain Resolution */}
                            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <h3 className="text-xl font-bold mb-6 text-slate-900 group-hover:text-[#1E6297] transition-colors">Connected Pain Resolution</h3>
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">Most companies experience these challenges as isolated pains, but they're actually interconnected symptoms:</p>
                                <ul className="space-y-4">
                                    {[
                                        "Market Blindness → Wasted R&D → Failed Launches",
                                        "Poor Targeting → Low Win Rates → High CAC",
                                        "Data Silos → Forecast Inaccuracy → Investor Distrust"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.3)]"></div>
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* The ProfitMachines Difference */}
                            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-sm">
                                <h3 className="text-xl font-bold mb-6 text-slate-900 group-hover:text-[#1E6297] transition-colors">The ProfitMachines Difference</h3>
                                <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">Transforming your organization from reactive to proactive:</p>
                                <ul className="space-y-4">
                                    {[
                                        { from: "Guesswork", to: "Predictive Intelligence" },
                                        { from: "Silos", to: "Unified Insights" },
                                        { from: "Reactive Operations", to: "Proactive Strategy" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                            <ArrowRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                            <span className="flex items-center gap-2 flex-wrap">
                                                <span className="text-slate-400 line-through decoration-slate-300">{item.from}</span>
                                                <span className="text-[#1E6297]">→ {item.to}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Measurable Transformation Impact */}
                            <div className="bg-gradient-to-br from-[#2878B5] to-indigo-700 border border-emerald-600 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none -mt-10 -mr-10"></div>
                                <h3 className="text-xl font-bold mb-6 text-white relative z-10">Measurable Impact</h3>
                                <p className="text-emerald-100 text-sm mb-6 leading-relaxed font-medium relative z-10">Companies using ProfitMachines achieve:</p>
                                <ul className="space-y-4 relative z-10">
                                    {[
                                        "40-60% faster revenue growth",
                                        "25-35% lower operational costs",
                                        "50% higher forecast accuracy",
                                        "3-5x ROI within first 12 months"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="bg-white/20 p-1 rounded-full border border-white/30">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-base font-bold text-white">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button 
                                onClick={() => openLongForm({ defaultService: 'Strategic Growth Transformation' })}
                                className="bg-[#2878B5] text-white hover:bg-[#1E6297] text-lg px-10 py-6 h-auto shadow-xl shadow-[#2878B5]/30 rounded-full transition-all font-bold border-2 border-[#2878B5]/50"
                            >
                                Start Your Transformation Today
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quick Diagnostic Lead Capture Form */}
                <LeadCaptureSection />

                {/* Contextual CTA Section */}
                <ContextualCtaSection 
                    badge="Enterprise Growth"
                    title="Ready to Scale Your Revenue Engine?"
                    subtitle="Join forward-thinking enterprises building predictable revenue engines with ProfitMachines. Book a comprehensive consultation or send a 60-second quick inquiry."
                    defaultService="Enterprise Scale & Optimization"
                />
            </div>
        </div>
    );
}
