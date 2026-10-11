import {
    ShoppingBag,
    Home,
    Landmark,
    ShoppingCart,
    Coins,
    Zap,
    Gem,
    Shield,
    Briefcase,
    Factory,
    Film,
    Building2,
    Plane,
    AlertTriangle,
    Target,
    TrendingUp,
    Cloud,
    GraduationCap,
    Globe
} from 'lucide-react';

export const verticalsContent = [
    {
        title: "E-commerce",
        icon: ShoppingBag,
        tagline: "Turn Intent into Purchase. Optimize CAC. Grow Repeat Sales.",
        description: "In e-commerce, user behavior is often misinterpreted as simple browsing. Our AI engine distinguishes genuine buying intent from window shopping, automates personalized retargeting, and optimizes the conversion funnel for maximum ARR.",
        kpis: [
            { label: "Conversion Rate Uplift", value: "25%" },
            { label: "Reduction in CAC", value: "40%" },
            { label: "Repeat Purchase Growth", value: "30%" },
            { label: "ROAS Improvement", value: "2.2X" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Cart abandonment is above 70%; High traffic but low conversion; ROAS is stalling across traditional ad channels."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Fragmented customer data; Ineffective generic email marketing; High dependency on paid search/social."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Real-time personalization; Predictive inventory alignment; Automated high-value recovery loops."
            }
        ]
    },
    {
        title: "Consumer Durables",
        icon: Home,
        tagline: "Bridge the Digital-Physical Gap. Accelerate Research-to-Sale.",
        description: "Buying high-ticket appliances involves long research cycles. We map these complex journeys, qualify intent across digital touchpoints, and hand off warm, high-propensity leads to your dealer network.",
        kpis: [
            { label: "Lead-to-Booking Growth", value: "2.5X" },
            { label: "Sales Cycle Speed", value: "35% Faster" },
            { label: "Dealer Performance", value: "+40%" },
            { label: "Customer Acquisition", value: "-30%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "High funnel drop-offs for premium products; Opaque attribution between web and store; Dealer network misalignment."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Delayed follow-ups; Low lead quality at dealerships; No visibility into the 'dark' research phase."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Unified buyer intelligence; Predictable high-ticket pipeline; Automated dealer lifecycle management."
            }
        ]
    },
    {
        title: "Banking",
        icon: Landmark,
        tagline: "Acquire Quality. Activate Early. Maximize Wallet Share.",
        description: "Banking demand is trust-driven and regulated. Our AI identifies compliant, high-propensity prospects, assesses intent strength, and automates onboarding to ensure high activation rates and LTV.",
        kpis: [
            { label: "Account Openings", value: "3X" },
            { label: "Onboarding Speed", value: "50% Faster" },
            { label: "Cross-Sell Conversion", value: "2X" },
            { label: "Regulatory Compliance", value: "100%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Accounts are opened but remain inactive; High friction in lending applications; Marketing spend is high but quality is low."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "High cost of physical verification; Fragmented siloes across products; Regulatory friction in digital GTM."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Lower cost per funded account; Predictive lending readiness; Automated compliant qualification funnels."
            }
        ]
    },
    {
        title: "FMCG",
        icon: ShoppingCart,
        tagline: "Demand-Driven Supply. Optimized Distribution. Margin Excellence.",
        description: "Moving from supply-push to demand-pull. Our AI identifies regional demand signals and predicts retail sell-through, enabling real-time supply chain alignment and distributor optimization.",
        kpis: [
            { label: "Inventory Holding", value: "-20%" },
            { label: "Distributor Productivity", value: "+30%" },
            { label: "Sales Pipeline Velocity", value: "2.5X" },
            { label: "Margin Improvement", value: "+15%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Zero visibility into secondary sales; Rising trade promotion costs; Frequent stock-outs in growing markets."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Distributor network inefficiency; Inaccurate regional forecasting; Fragmented consumer intent data."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Real-time demand transparency; Predictive stocking; Higher distributor yield and ROI."
            }
        ]
    },
    {
        title: "Financial Services",
        icon: Coins,
        tagline: "Build Trust Scale. Grow AUM. Personalize Advisory.",
        description: "Wealth and investment success depends on timing and trust. Our AI identifies high-net-worth intent signals and automates personalization at scale, turning advisors into high-performance closers.",
        kpis: [
            { label: "AUM Compounding", value: "2.8X" },
            { label: "SIP Registration Rate", value: "+40%" },
            { label: "Advisor Productivity", value: "3X" },
            { label: "Client Retention", value: "Higher" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Stagnant AUM growth; High client churn during volatility; Advisors overwhelmed by unqualified leads."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Generic investment pitches; Difficulty building digital trust; Slow advisory response times."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Predictive investment triggers; Scalable personalized journeys; Higher client lifetime value."
            }
        ]
    },
    {
        title: "Electric Vehicles (EV)",
        icon: Zap,
        tagline: "Accelerate Adoption. Educate Buyers. Expand Infrastructure.",
        description: "EV growth requires solving for consumer anxiety and infrastructure readiness. Our AI Qualifies charger readiness, automates education on total cost of ownership, and optimizes test-drive conversion.",
        kpis: [
            { label: "Test Drive Conversion", value: "2.2X" },
            { label: "Fleet Sales Efficiency", value: "+45%" },
            { label: "Network Growth Speed", value: "30% Faster" },
            { label: "CPL Reduction", value: "40%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Inquiries are high but conversion to pre-booking is slow; Charging infrastructure lag; High education overhead."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Customer battery/range anxiety; Complex subsidy and pricing models; Fragmented early adopter data."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Higher intent lead discovery; Educational automated funnels; Predictable fleet and retail pipeline."
            }
        ]
    },
    {
        title: "Gems & Jewellery",
        icon: Gem,
        tagline: "High-Ticket Clienteling. Luxury Experience. Predictive Intent.",
        description: "Luxury demands extreme personalization. Our AI identifies elite buyer signals and automates high-touch clienteling, ensuring HNWIs are engaged with the right pieces at the right moment.",
        kpis: [
            { label: "High-Ticket Closures", value: "+35%" },
            { label: "Referral Revenue", value: "2X" },
            { label: "Boutique Efficiency", value: "+50%" },
            { label: "Average Transaction", value: "+20%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Inconsistent boutique experience; Difficulty tracking HNW buyer movement; High traffic during festivals but low conversions."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Long consideration cycles; Manual and slow clienteling; Low trust in purely digital channels."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Elite intent-based clienteling; Optimized viewing appointments; Stronger long-term brand loyalty."
            }
        ]
    },
    {
        title: "Insurance",
        icon: Shield,
        tagline: "Predictive Policy Growth. Automatic Renewals. High Win-Rates.",
        description: "Insurance is about risk and timing. Our AI scores leads for multi-policy propensity and triggers renewal outreach before the expiration window, maximizing retention and cross-sell.",
        kpis: [
            { label: "Policy Conversion", value: "2.6X" },
            { label: "Acquisition Cost", value: "-40%" },
            { label: "Renewal Revenue", value: "+35%" },
            { label: "LTV Optimization", value: "Higher" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Aggregator lead wastage; Agents spending time on cold prospects; Renewal leakage during economic shifts."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Price-driven buyer churn; Low multi-policy density; Opaque buyer intent signals."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Higher win-rates per agent; Predictable renewal engine; Strategic upsell intelligence."
            }
        ]
    },
    {
        title: "IT & BPM",
        icon: Briefcase,
        tagline: "Enterprise Reach. Predictable Pipeline. Deal Excellence.",
        description: "B2B tech services require mapping complex global buying committees. Our AI engine identifies account intent across massive datasets and automates the qualification of high-value enterprise deals.",
        kpis: [
            { label: "Total Pipeline Growth", value: "3.2X" },
            { label: "Win-Rate Improvement", value: "+25%" },
            { label: "Resource Utilization", value: "2X" },
            { label: "Average Contract Value", value: "+20%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Founder-led sales hitting a ceiling; Inconsistent deal sizes; Reliance on a few large legacy accounts."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Generic account outreach; Slow enterprise sales cycles; No account-based demand intelligence."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Autonomous demand discovery; Global account mapping; Highly scalable GTM playbook."
            }
        ]
    },
    {
        title: "Manufacturing",
        icon: Factory,
        tagline: "Industrial-Grade Discovery. OEM-Dealer Alignment. Cycle Reduction.",
        description: "Accelerating capital-heavy sales. Our AI identifies replacement cycles, qualify OEM leads automatically, and prioritizes sales focus on high-probability industrial deals.",
        kpis: [
            { label: "Sales Cycle Cycle Time", value: "-47%" },
            { label: "Dealer Productivity", value: "2X" },
            { label: "Inbound Lead Quality", value: "3X" },
            { label: "Quote-to-Order Speed", value: "Faster" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Dealers reporting unqualified web leads; Long sales duration causing forecasting errors; Low visibility into shop-floor intent."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "No replacement cycle visibility; Slow quote turnarounds; Opaque buyer committees in complex EPC/OEM sales."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Strategic deal prioritization; Unified OEM-Dealer visibility; Predictable manufacturing revenue."
            }
        ]
    },
    {
        title: "Media & Entertainment",
        icon: Film,
        tagline: "Retain Audiences. Maximize Ad Yield. Personalize Engagement.",
        description: "In the attention economy, churn is the biggest enemy. Our AI predicts churn risk and personalizes content discovery to keep audiences engaged and monetization efficient.",
        kpis: [
            { label: "Subscriber Churn", value: "-40%" },
            { label: "Ad Yield (eCPM)", value: "2X" },
            { label: "ARPU Improvement", value: "+35%" },
            { label: "Viewer Retention", value: "Higher" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Customer acquisition costs are rising; Fragmented attention across platforms; Ineffective first-party data utilization."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "High cost of content discovery; Passive viewer behavior; Generic unsophisticated ad-targeting."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Predictive viewer retention; Optimized ad-yielding assets; Dynamic content discovery."
            }
        ]
    },
    {
        title: "Real Estate",
        icon: Building2,
        tagline: "Accelerate Velocity. Discovery High-Intent Buyers. Scale ROI.",
        description: "Selling residential and commercial inventory faster. Our AI separates speculators from buyers and automates site-visit scheduling to compress the closing cycle.",
        kpis: [
            { label: "Booking Velocity", value: "2X" },
            { label: "Inventory Cycle", value: "-40%" },
            { label: "Broker Efficiency", value: "+50%" },
            { label: "Cost Per Booking", value: "-30%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Vast lead volumes but low site-visit rates; Unpredictable turnover for premium projects; High brokerage payouts for slow inventory."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Poor lead scoring; Manual and slow broker follow-ups; Volatile demand signals across segments."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "High-intent buyer discovery; Predictable inventory turnover; Lower project burn rate."
            }
        ]
    },
    {
        title: "Tourism & Hospitality",
        icon: Plane,
        tagline: "Direct Booking Dominance. Guest LTV growth. Yield Excellence.",
        description: "Beating OTA dependency. Our AI captures travel intent signals and personalizes offers to drive direct bookings and maximize occupancy throughout the year.",
        kpis: [
            { label: "Direct Bookings", value: "+45%" },
            { label: "Occupancy Rate", value: "+30%" },
            { label: "Guest Lifetime Value", value: "2.5X" },
            { label: "OTA Commission Savings", value: "Substantial" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Extreme dependency on high-commission OTAs; Seasonal occupancy volatility; High cancellation rates on peaks."
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Passive guest relationships; Generic unsophisticated travel offers; Extreme price sensitivity."
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Guest-centric personalization; Higher direct revenue margins; Predictive seasonal demand management."
            }
        ]
    },

    // ─── Original Verticals (Preserved) ───────────────────────────────────────
    {
        title: "SaaS & Enterprise Software",
        icon: Cloud,
        tagline: "Identify Buying Intent Early. Convert Faster. Scale ARR Predictably.",
        description: "Demand in SaaS builds quietly through research, trials, peer validation, and internal alignment. The AI engine surfaces early buying signals, maps buying committees, and converts latent interest into sales-ready pipeline—bridging product-led and sales-led motions.",
        kpis: [
            { label: "Increase in Qualified Leads", value: "6X" },
            { label: "Reduction in Sales Cycle", value: "66%" },
            { label: "More ARR Compounding", value: "40%" },
            { label: "Reduction in Cost of Sales", value: "66%" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "High inbound noise, low intent clarity; PLG signals not translating into revenue; Multi-stakeholder buying complexity"
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Weak ICP fit; Delayed sales engagement; Low expansion visibility"
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Faster pipeline creation; Higher win rates; Predictable ARR growth"
            }
        ]
    },
    {
        title: "BFSI – Banking, Lending & Insurance",
        icon: Landmark,
        tagline: "Qualified Demand. Compliant Growth. Faster Monetization.",
        description: "BFSI demand is regulated, risk-sensitive, and trust-driven. The AI engine identifies compliant, high-propensity demand early, assessing financial readiness, intent strength, and risk indicators before leads enter the pipeline.",
        kpis: [
            { label: "Reduction in CAC", value: "35–50%" },
            { label: "Approval-ready leads", value: "2.5X" },
            { label: "Lead-to-disbursement", value: "40% Faster" },
            { label: "Lifetime Value", value: "Higher" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "High lead volumes, low approval rates; Drop-offs during verification; Regulatory complexity"
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Manual eligibility checks; Low trust signals; Slow closures"
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Higher conversion and approval rates; Lower compliance risk; Faster revenue realization"
            }
        ]
    },
    {
        title: "FinTech",
        icon: Coins,
        tagline: "Acquire Smarter. Activate Faster. Retain Longer.",
        description: "FinTech demand is volatile and trust-dependent. The AI engine identifies high-intent, high-LTV prospects, predicts activation likelihood, and reduces CAC inflation and early churn.",
        kpis: [
            { label: "Activation rates", value: "30–45%" },
            { label: "Early churn reduction", value: "25%" },
            { label: "LTV-qualified leads", value: "2X" },
            { label: "Time-to-value", value: "Faster" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "High CAC; Low post-signup activation; Short customer lifecycles"
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Speculative leads; Weak onboarding engagement; Poor churn predictability"
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Higher activation & retention; Sustainable growth; Better CAC:LTV economics"
            }
        ]
    },
    {
        title: "D2C & Consumer Brands",
        icon: ShoppingBag,
        tagline: "Turn Attention into Demand. Demand into Revenue.",
        description: "Traffic does not equal demand. The AI engine separates browsing behavior from buying intent, identifies micro-segments, and converts high-propensity demand into repeatable revenue—reducing dependence on paid ads.",
        kpis: [
            { label: "Conversion rate uplift", value: "20–35%" },
            { label: "Repeat purchases", value: "+30%" },
            { label: "Paid media dependency", value: "-25%" },
            { label: "Customer LTV", value: "Higher" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "Rising ad costs; Low repeat purchase rates; Funnel leakage"
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Poor personalization; Generic targeting; Low engagement"
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Higher ROAS; Stronger brand loyalty; Compounding revenue growth"
            }
        ]
    },
    {
        title: "Crypto, Web3 & Digital Assets",
        icon: Zap,
        tagline: "Identify Real Believers. Convert Communities into Value.",
        description: "Crypto demand is driven by trust, timing, and community sentiment. The AI engine distinguishes speculative traffic from credible intent and maps community behavior into sustainable activation and monetization paths.",
        kpis: [
            { label: "Activation quality", value: "2X" },
            { label: "Retention", value: "Higher" },
            { label: "Speculative churn", value: "Reduced" },
            { label: "Ecosystem engagement", value: "Stronger" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "High traffic, low trust; Volatile engagement; Monetization uncertainty"
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Speculative users; Low retention; Regulatory ambiguity"
            },
            {
                title: "Benefits",
                icon: Globe,
                content: "Higher-quality growth; Sustainable ecosystems; Improved long-term value"
            }
        ]
    },
    {
        title: "Education & EdTech",
        icon: GraduationCap,
        tagline: "Enroll the Right Learners — Not Just More Leads.",
        description: "Education demand is seasonal, intent-driven, and decision-heavy. The AI engine identifies learner readiness, motivation, and program fit so counselors focus only on high-conversion opportunities.",
        kpis: [
            { label: "Enrollment increase", value: "30–45%" },
            { label: "Counselor workload", value: "-40%" },
            { label: "Admissions cycles", value: "Faster" },
            { label: "Learner satisfaction", value: "Higher" }
        ],
        verticalTabs: [
            {
                title: "Business Situations",
                icon: AlertTriangle,
                content: "High inquiry volumes, low enrollments; Counselor inefficiency; Poor learner-program fit"
            },
            {
                title: "Pain Points",
                icon: Target,
                content: "Low follow-up efficiency; Drop-offs post inquiry; Resource constraints"
            },
            {
                title: "Benefits",
                icon: TrendingUp,
                content: "Higher enrollment yield; Faster decisions; Better student outcomes"
            }
        ]
    }
];
