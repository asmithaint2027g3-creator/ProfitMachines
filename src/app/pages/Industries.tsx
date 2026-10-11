import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowRight,
    Landmark,
    Factory,
    Rocket,
    CheckCircle2,
    ShieldCheck,
    Coins,
    Building2,
    Zap,
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    ShoppingBag,
    Home,
    ShoppingCart,
    Gem,
    Code,
    Film,
    Plane,
    X,
    ExternalLink,
    BarChart3,
    Sparkles,
    Briefcase,
    HeartPulse,
    GraduationCap,
    Target
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

import VerticalBlock from '../components/VerticalBlock';
import { Reveal } from '../components/ui/Reveal';
import IndustriesCarousel from '../components/IndustriesCarousel';
import { verticalsContent } from '../../data/verticalsContent';
import LeadCaptureSection from '../components/LeadCaptureSection';
import { useLeadModal } from '../context/LeadModalContext';

export default function Industries() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();
    const [selectedModalIndustry, setSelectedModalIndustry] = useState<any | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = [
        { id: 'all', name: 'All Verticals' },
        { id: 'b2b', name: 'B2B Focus' },
        { id: 'b2c', name: 'B2C Focus' },
        { id: 'enterprise', name: 'Enterprise' },
        { id: 'mid-market', name: 'Mid-Market' },
        { id: 'startup', name: 'Startups' },
        { id: 'specialized-sectors', name: 'Specialized Sectors' }
    ];

    useEffect(() => {
        const pathSlug = location.pathname.replace(/^\/industries\/?/, '').trim().toLowerCase();
        const params = new URLSearchParams(location.search);
        const sectionParam = params.get('section')?.toLowerCase() || '';
        const hashParam = location.hash ? location.hash.substring(1).toLowerCase() : '';

        const aliasCategoryMap: Record<string, string> = {
            'b2b': 'b2b',
            'b2b-focus': 'b2b',
            'b2c': 'b2c',
            'b2c-focus': 'b2c',
            'enterprise': 'enterprise',
            'enterprises': 'enterprise',
            'mid-market': 'mid-market',
            'mid-market-focus': 'mid-market',
            'startup': 'startup',
            'startups': 'startup',
            'specialized-sectors': 'specialized-sectors',
            'service-industries': 'specialized-sectors',
            'industrial-industries': 'specialized-sectors',
            'd2c-companies': 'specialized-sectors',
            'fintech-lending': 'specialized-sectors',
            'saas-products': 'specialized-sectors',

            // Item hash handles to category
            'abm-autopilot': 'b2b',
            'competitor-displacement': 'b2b',
            'ai-sdr-copilot': 'b2b',
            'rql-predictor': 'b2b',
            'contract-expansion': 'b2b',

            'omnichannel-lead-gen': 'b2c',
            'personalized-offers': 'b2c',
            'behavioral-retargeting': 'b2c',
            'lookalike-audience': 'b2c',

            'global-account-penetration': 'enterprise',
            'partnership-opportunity': 'enterprise',
            'executive-engagement': 'enterprise',

            'rapid-market-entry': 'mid-market',
            'niche-domination': 'mid-market',
            'lean-team-productivity': 'mid-market',

            'zero-to-one-lead-gen': 'startup',
            'pmf-signal-detection': 'startup',
            'founder-sales-automation': 'startup',
            'burn-rate-optimized-lead-capture': 'startup',

            'service-industrial': 'specialized-sectors',
            'd2c-retail': 'specialized-sectors',
            'fintech-saas': 'specialized-sectors',
            'healthcare-life-sciences': 'specialized-sectors',
            'education-edtech': 'specialized-sectors',
            'real-estate-energy': 'specialized-sectors'
        };

        let cat = aliasCategoryMap[pathSlug] || aliasCategoryMap[sectionParam] || aliasCategoryMap[hashParam] || 'all';
        if (['b2b', 'b2c', 'enterprise', 'mid-market', 'startup', 'specialized-sectors'].includes(pathSlug)) {
            cat = pathSlug;
        }
        setActiveCategory(cat);

        const pageTitleMap: Record<string, string> = {
            'b2b': 'B2B Focus Architecture | ProfitMachines Industry Solutions',
            'b2c': 'B2C Focus Architecture | ProfitMachines Industry Solutions',
            'enterprise': 'Enterprise & Large Business Suite | ProfitMachines Industry Solutions',
            'mid-market': 'Mid-Market Growth Architecture | ProfitMachines Industry Solutions',
            'startup': 'Startup Traction Suite | ProfitMachines Industry Solutions',
            'specialized-sectors': 'Specialized Sector Architecture | ProfitMachines Industry Solutions',
            'all': 'Vertical-Specific Revenue Engineering | ProfitMachines Industry Solutions'
        };
        document.title = pageTitleMap[cat] || pageTitleMap['all'];

        const targetKey = hashParam || sectionParam || (pathSlug && pathSlug !== 'industries' && !['b2b', 'b2c', 'enterprise', 'mid-market', 'startup', 'specialized-sectors'].includes(pathSlug) ? pathSlug : '');

        if (targetKey) {
            const aliasElementMap: Record<string, string> = {
                'b2b': 'b2b',
                'b2c': 'b2c',
                'enterprise': 'enterprise',
                'mid-market': 'mid-market',
                'startup': 'startup',
                'specialized-sectors': 'specialized-sectors'
            };
            const targetId = aliasElementMap[targetKey] || targetKey;

            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 150);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.search, location.hash]);

    const industries = [
        // B2B Focus Vertical Cards
        {
            title: "AI Account-Based Marketing (ABM) Autopilot",
            slugId: "abm-autopilot",
            vertical: "b2b",
            icon: <Target className="w-6 h-6" />,
            color: "blue",
            offeringDescription: "Orchestrate end-to-end target account campaigns. Trigger personalized ads, custom landing pages, and automated SDR outreach simultaneously.",
            keyVerticals: ["Target Account Ingestion", "CRM Sync", "Dynamic Ad Triggers", "Executive SDR Outreach"],
            details: {
                situations: ["Siloed marketing and sales lists", "Low enterprise account penetration", "Manual ABM campaign execution"],
                challenges: ["Aligning sales and marketing on target accounts", "Personalizing outreach at scale", "Measuring ABM pipeline influence"],
                solution: "AI ingests CRM target lists, syncs intent signals, and orchestrates dynamic multi-channel outreach on autopilot.",
                example: "A B2B SaaS enterprise scaled account penetration by 3.8× across 250 target accounts.",
                benefits: ["Automated target account ingestion", "Real-time intent signal sync", "Higher win rates"],
                outcomes: ["3.8× Account Penetration", "45% Higher Pipeline", "92% Sales Alignment"]
            }
        },
        {
            title: "AI Competitor Displacement Engine",
            slugId: "competitor-displacement",
            vertical: "b2b",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "indigo",
            offeringDescription: "Identify competitor pain points to win back accounts. Detect when accounts search for migration support or complain about rival tools online.",
            keyVerticals: ["Competitor Tracking", "Intent Signal Capture", "Win-Back Playbooks", "Switching Triggers"],
            details: {
                situations: ["Competitor lock-in across target accounts", "Undetected contract renewal windows", "High rival ad spending"],
                challenges: ["Identifying dissatisfied competitor accounts", "Timing win-back outreach", "Drafting competitive displacement messaging"],
                solution: "AI tracks public dissatisfaction signals and search queries, triggering automated win-back playbooks at contract renewal windows.",
                example: "A cloud infrastructure provider displaced 35 rival enterprise accounts in 90 days.",
                benefits: ["Automated competitive monitoring", "High-conversion win-back scripts", "Targeted pricing displacement"],
                outcomes: ["35 Accounts Displaced", "62% Win-Back Rate", "2.8× Higher ACV"]
            }
        },
        {
            title: "AI SDR Co-Pilot / Autopilot",
            slugId: "ai-sdr-copilot",
            vertical: "b2b",
            icon: <Rocket className="w-6 h-6" />,
            color: "purple",
            offeringDescription: "Automate prospecting and calendar bookings. Our autonomous SDR assistant drafts outreach, handles objections, and schedules meetings for AEs.",
            keyVerticals: ["Autonomous Email Drafting", "Objection Resolution", "Calendar Booking Sync", "Lead Nurturing"],
            details: {
                situations: ["Sales reps spending 60%+ time on prospecting", "Delayed response to inbound leads", "Inconsistent AE meeting volume"],
                challenges: ["Scaling outbound volume without losing quality", "Handling complex prospect objections", "Zero lead leakage"],
                solution: "AI acts as a 24/7 SDR co-pilot, qualifying prospects, handling pricing/timing objections, and booking meetings directly into AE calendars.",
                example: "A B2B tech company booked 140+ qualified AE meetings per month with 0 additional SDR headcount.",
                benefits: ["24/7 autonomous prospecting", "Reclaimed AE selling time", "Zero prospect drop-off"],
                outcomes: ["140+ Meetings Booked/Mo", "15 Hours/Rep Saved", "3.2× Pipeline Velocity"]
            }
        },
        {
            title: "AI Revenue Qualified Lead (RQL) Predictor",
            slugId: "rql-predictor",
            vertical: "b2b",
            icon: <BarChart3 className="w-6 h-6" />,
            color: "cyan",
            offeringDescription: "Predict close probability, deal size, and timelines accurately. Shift from subjective sales gut feelings to data-driven revenue forecasting.",
            keyVerticals: ["Close Probability Scoring", "Pipeline Forecasting", "Deal Size Prediction", "Buying Signal Analysis"],
            details: {
                situations: ["Inaccurate end-of-quarter revenue forecasts", "Time wasted on low-propensity deals", "Board forecast volatility"],
                challenges: ["Identifying deals at risk of stalling", "Quantifying real buying velocity", "Optimizing rep deal allocation"],
                solution: "AI analyzes historical deal patterns, stakeholder email sentiment, and engagement gaps to score close probability with up to 92% accuracy.",
                example: "An enterprise B2B platform achieved 94% forecast precision across $45M in quarterly pipeline.",
                benefits: ["Board-level forecast certainty", "Prioritized high-value pipeline", "Stalled deal alerts"],
                outcomes: ["94% Forecast Precision", "40% Faster Close", "2.1× Pipeline Accuracy"]
            }
        },
        {
            title: "AI Contract & Expansion Opportunity Finder",
            slugId: "contract-expansion",
            vertical: "b2b",
            icon: <Zap className="w-6 h-6" />,
            color: "amber",
            offeringDescription: "Uncover upsell and cross-sell opportunities. Monitor software usage trends to identify accounts that are ready for seat expansion or premium features.",
            keyVerticals: ["NRR Expansion Triggers", "Usage Threshold Alerts", "Cross-Sell Sensing", "Renewal Risk Mitigation"],
            details: {
                situations: ["Reactive customer account management", "High churn at contract renewal", "Unrealized seat expansion potential"],
                challenges: ["Detecting expansion signals before contract end", "Preventing customer drop-off", "Systematic NRR growth"],
                solution: "AI monitors product usage metrics and user thresholds, automatically alerting CSMs to execute upsell/expansion motions.",
                example: "A SaaS company increased Net Revenue Retention (NRR) from 105% to 138% within two quarters.",
                benefits: ["Proactive expansion triggers", "Higher Net Revenue Retention", "Automated renewal alerts"],
                outcomes: ["138% NRR Achieved", "3× Upsell Revenue", "55% Lower Churn"]
            }
        },

        // B2C Focus Vertical Cards
        {
            title: "AI Omnichannel Lead Generation",
            slugId: "omnichannel-lead-gen",
            vertical: "b2c",
            icon: <ShoppingBag className="w-6 h-6" />,
            color: "pink",
            offeringDescription: "Automate campaign execution across social, search, and email. Optimize ad budget distribution in real-time to capture lowest-cost conversions.",
            keyVerticals: ["Multi-Channel Ad Sync", "Real-Time CPL Optimization", "Programmatic Budget Allocation", "Social Lead Capture"],
            details: {
                situations: ["High customer acquisition costs across ad networks", "Siloed social and search channels", "Manual budget reallocation"],
                challenges: ["Capturing high-intent consumer leads", "Minimizing ad spend waste", "Dynamic creative optimization"],
                solution: "AI continuously shifts ad budget to highest-performing ad sets and creatives, cutting CPL while boosting volume.",
                example: "A consumer brand reduced cost-per-lead by 42% while doubling monthly lead volume.",
                benefits: ["Lowest CPL optimization", "Cross-platform ad automation", "Real-time budget reallocation"],
                outcomes: ["42% Lower CPL", "2.4× Lead Volume", "3.1× ROAS"]
            }
        },
        {
            title: "AI Personalized Offer Generation at Scale",
            slugId: "personalized-offers",
            vertical: "b2c",
            icon: <Sparkles className="w-6 h-6" />,
            color: "purple",
            offeringDescription: "Deliver 1:1 dynamic pricing and promotions. Analyze user location, browsing history, and cart value to trigger personalized discounts.",
            keyVerticals: ["Dynamic Coupon Triggering", "Cart Bounce Recovery", "Margin Preservation Rules", "Behavioral Discounting"],
            details: {
                situations: ["Generic discounts eroding profit margins", "High cart bounce rates", "One-size-fits-all promo codes"],
                challenges: ["Personalizing offers in real-time", "Protecting margin baseline", "Driving immediate purchase urgency"],
                solution: "AI generates personalized 1:1 discount triggers tailored to buyer propensity score without sacrificing margin.",
                example: "An online store boosted cart checkout completions by 34% with zero margin loss.",
                benefits: ["Preserved profit margins", "Dynamic cart recovery", "1:1 Consumer personalization"],
                outcomes: ["34% Higher Conversion", "Zero Margin Erosion", "2.2× Repeat Purchases"]
            }
        },
        {
            title: "AI Behavioral Retargeting Autopilot",
            slugId: "behavioral-retargeting",
            vertical: "b2c",
            icon: <TrendingUp className="w-6 h-6" />,
            color: "blue",
            offeringDescription: "Recover abandoned checkouts automatically. Trigger context-aware emails and SMS messages within minutes of a cart bounce.",
            keyVerticals: ["Session Logging", "Contextual SMS/Email", "Cart Recovery Loops", "Mobile Conversion Lift"],
            details: {
                situations: ["70%+ cart bounce rates", "Slow retargeting email cadence", "Low SMS conversion efficiency"],
                challenges: ["Re-engaging bounced shoppers instantly", "Personalizing recovery copy", "Omnichannel cadence timing"],
                solution: "AI logs exact abandonment context and sends hyper-relevant multi-channel recovery sequences within 5 minutes.",
                example: "A retail brand recovered $280K in abandoned cart revenue in 60 days.",
                benefits: ["Instant 5-minute retargeting", "Multi-channel recovery loops", "Automated SMS/Email cadences"],
                outcomes: ["$280K Recovered Revenue", "28% Bounce Recovery", "4.5× SMS ROI"]
            }
        },
        {
            title: "AI Lookalike Audience Auto-Scaling",
            slugId: "lookalike-audience",
            vertical: "b2c",
            icon: <Briefcase className="w-6 h-6" />,
            color: "teal",
            offeringDescription: "Replicate your highest-converting buyer cohorts. Automatically feed ad networks with custom seed lists to target high-value profiles.",
            keyVerticals: ["Seed List Automation", "Privacy Compliance Hashing", "Ad Network Auto-Feeding", "Cohort Replication"],
            details: {
                situations: ["Ad targeting fatigue", "Rising ad network bidding competition", "Manual customer seed list exports"],
                challenges: ["Scaling target audience pool", "Maintaining high buyer intent", "Automating seed list updates"],
                solution: "AI updates ad network seed lists daily with recent high-LTV purchasers, scaling lookalike audience precision.",
                example: "A DTC brand scaled ad audience reach by 5× with a 38% reduction in CAC.",
                benefits: ["Daily automated seed updates", "High-intent lookalike targeting", "Ad fatigue prevention"],
                outcomes: ["5× Audience Scale", "38% CAC Reduction", "2.9× ROAS"]
            }
        },

        // Enterprise Vertical Cards
        {
            title: "AI Global Account Penetration",
            slugId: "global-account-penetration",
            vertical: "enterprise",
            icon: <Building2 className="w-6 h-6" />,
            color: "blue",
            offeringDescription: "Expand enterprise accounts across multiple divisions and regions. Identify parent-subsidiary relationships and map internal buying circles.",
            keyVerticals: ["Parent-Subsidiary Mapping", "Buying Circle Discovery", "Multi-Division Expansion", "Corporate Registry Mining"],
            details: {
                situations: ["Account limited to a single subsidiary", "No visibility into global corporate tree", "Long enterprise sales cycles"],
                challenges: ["Navigating 15+ decision-makers", "Finding warm introduction paths", "Scaling ACV across business units"],
                solution: "AI maps full corporate structures, uncovering unserved subsidiaries and triggering executive intro playbooks.",
                example: "A Fortune 500 tech vendor expanded contract footprint across 12 international business units.",
                benefits: ["Full corporate tree visibility", "Warm division introduction paths", "Higher enterprise ACV"],
                outcomes: ["12 Subsidiaries Expanded", "4.2× Contract Value", "50% Faster Expansion"]
            }
        },
        {
            title: "AI Strategic Partnership Opportunity Finder",
            slugId: "partnership-opportunity",
            vertical: "enterprise",
            icon: <Building2 className="w-6 h-6" />,
            color: "indigo",
            offeringDescription: "Discover high-yield alliance opportunities. Scan ecosystem players, integrators, and distributors to find high-probability partners.",
            keyVerticals: ["Ecosystem Alignment Sensing", "Partner Audience Overlap", "Co-Sell Scoring", "Channel Pipeline Acceleration"],
            details: {
                situations: ["Underperforming reseller channels", "Unmapped co-sell opportunities", "Manual partner discovery"],
                challenges: ["Identifying high-fit alliance partners", "Quantifying audience overlap", "Accelerating partner onboarding"],
                solution: "AI scans ecosystem compatibility, scores customer overlap, and automates partner outreach and co-selling playbooks.",
                example: "An enterprise platform generated $12M in joint channel pipeline in year one.",
                benefits: ["Predictable channel revenue", "Automated audience overlap scoring", "Co-selling playbooks"],
                outcomes: ["$12M Channel Pipeline", "3.5× Partner Reach", "65% Co-Sell Win Rate"]
            }
        },
        {
            title: "AI Executive Engagement Automation",
            slugId: "executive-engagement",
            vertical: "enterprise",
            icon: <Briefcase className="w-6 h-6" />,
            color: "purple",
            offeringDescription: "Engage C-level executives with automated, board-level ROI proof. Draft custom value cases tailored to specific corporate initiatives.",
            keyVerticals: ["SEC Filing Goal Extraction", "Annual Report Alignment", "C-Suite Value Proposition", "Executive Sign-Off"],
            details: {
                situations: ["Deals stalling at C-suite sign-off", "Generic sales decks rejected by CFOs", "Lack of alignment with company 10-K goals"],
                challenges: ["Capturing C-level attention", "Proving quantified ROI", "Aligning product to annual corporate goals"],
                solution: "AI mines annual reports and 10-K filings to generate tailored executive business cases for C-level buyers.",
                example: "A B2B enterprise team achieved an 82% C-suite meeting acceptance rate with Fortune 1000 targets.",
                benefits: ["CFO-ready business cases", "SEC filing goal alignment", "Faster executive sign-off"],
                outcomes: ["82% Executive Meeting Rate", "60% Faster Sign-Off", "3.1× Higher ACV"]
            }
        },

        // Mid-Market Vertical Cards
        {
            title: "AI Rapid Market Entry Engine",
            slugId: "rapid-market-entry",
            vertical: "mid-market",
            icon: <Rocket className="w-6 h-6" />,
            color: "teal",
            offeringDescription: "Accelerate speed-to-revenue in new verticals. Deploy pre-configured vertical outreach campaigns and content vectors in days, not months.",
            keyVerticals: ["Vertical Content Generation", "Pre-Built Messaging Vectors", "Fast Segment Penetration", "Time-to-Market Reduction"],
            details: {
                situations: ["Slow vertical market entry", "High GTM setup costs", "Unfocused regional campaigns"],
                challenges: ["Launching campaigns in days vs months", "Tailoring content to niche verticals", "Establishing instant credibility"],
                solution: "AI generates vertical-specific case studies, email vectors, and landing pages to enter new markets at top speed.",
                example: "A mid-market company entered 3 new industry verticals within 30 days, capturing $2.4M in pipeline.",
                benefits: ["30-Day vertical rollout", "Pre-built industry content", "Low entry capital"],
                outcomes: ["30-Day Market Entry", "$2.4M New Pipeline", "4× Speed-to-Revenue"]
            }
        },
        {
            title: "AI Niche Market Domination",
            slugId: "niche-domination",
            vertical: "mid-market",
            icon: <Target className="w-6 h-6" />,
            color: "amber",
            offeringDescription: "Capture market share in highly concentrated verticals. Map and engage every single key account within specialized niches.",
            keyVerticals: ["100% Account Cataloging", "Micro-Niche Engagement", "Zero Generic Waste", "Vertical Dominance Playbooks"],
            details: {
                situations: ["Total addressable market under 5,000 accounts", "High competitive noise", "Generic outreach failure"],
                challenges: ["Cataloging 100% of niche accounts", "Delivering deeply specialized messaging", "Achieving market dominance"],
                solution: "AI maps the total addressable accounts in target micro-verticals and executes high-touch personalized engagement.",
                example: "A specialized SaaS firm captured 48% market share in a 1,200-account niche vertical within 12 months.",
                benefits: ["100% Account coverage", "Unmatched vertical relevance", "Dominant market share"],
                outcomes: ["48% Market Share", "94% Account Reach", "3.6× Pipeline Density"]
            }
        },
        {
            title: "AI Lean Team Productivity Amplifier",
            slugId: "lean-team-productivity",
            vertical: "mid-market",
            icon: <Zap className="w-6 h-6" />,
            color: "cyan",
            offeringDescription: "Multiply sales output without adding headcount. Automate routine prospecting, data entry, and follow-ups to keep teams selling.",
            keyVerticals: ["15 Hours Reclaimed/Rep", "Automated CRM Logging", "Routine Prospecting Offload", "RevOps Workflow Automation"],
            details: {
                situations: ["Small sales teams overwhelmed by admin work", "High rep burnout", "Inconsistent CRM hygiene"],
                challenges: ["Reclaiming active selling hours", "Automating lead research", "Scaling revenue without hiring"],
                solution: "AI automates CRM logging, prospect enrichment, and follow-up reminders, adding 15+ hours of selling time per rep.",
                example: "A 6-person sales team generated the output of a 18-person sales org with zero extra hires.",
                benefits: ["15+ Hours/rep reclaimed", "Zero manual CRM entry", "3× Team output"],
                outcomes: ["3× Team Productivity", "15 Hours/Rep Saved", "$450K Hiring Cost Saved"]
            }
        },

        // Startup Vertical Cards
        {
            title: "AI Zero-to-One Lead Generation",
            slugId: "zero-to-one-lead-gen",
            vertical: "startup",
            icon: <Lightbulb className="w-6 h-6" />,
            color: "amber",
            offeringDescription: "Automate your first customer acquisition campaigns. Perfect for early-stage companies needing to validate market interest quickly.",
            keyVerticals: ["48-Hour Campaign Launch", "Cold Prospect Scraping", "Early Buyer Feedback Loops", "First Customer Path Acceleration"],
            details: {
                situations: ["Zero existing customer database", "Need first 10-50 paying customers fast", "Limited marketing budget"],
                challenges: ["Building prospect lists from scratch", "Validating value proposition", "Capital-efficient outbound"],
                solution: "AI scrapes targeted lead lists, drafts personalized early-adopter outreach, and launches campaigns in 48 hours.",
                example: "A seed-stage startup acquired its first 25 enterprise customers in 45 days.",
                benefits: ["48-Hour outbound launch", "Instant customer feedback", "Capital-efficient growth"],
                outcomes: ["First 25 Customers in 45 Days", "$180K ARR", "48-Hour Launch"]
            }
        },
        {
            title: "AI Product-Market Fit Signal Detection",
            slugId: "pmf-signal-detection",
            vertical: "startup",
            icon: <Sparkles className="w-6 h-6" />,
            color: "purple",
            offeringDescription: "Validate product-market fit using behavioral analytics. Measure user retention, feature adoption, and organic referral velocity.",
            keyVerticals: ["Retention Cohort Scoring", "Feature Adoption Metrics", "Organic Referral Velocity", "Data-Driven PMF Proof"],
            details: {
                situations: ["Unclear PMF signals", "High user drop-off post-onboarding", "Roadmap prioritization guessing"],
                challenges: ["Quantifying true PMF readiness", "Identifying core retention triggers", "Proving traction to investors"],
                solution: "AI tracks user behavioral loops and retention cohorts, delivering precise metrics on product-market fit score.",
                example: "An early-stage SaaS startup identified its core PMF cohort, boosting 30-day retention from 18% to 62%.",
                benefits: ["Data-backed PMF score", "Investor-ready retention metrics", "Roadmap clarity"],
                outcomes: ["62% 30-Day Retention", "3.4× Viral Coefficient", "Series A Ready"]
            }
        },
        {
            title: "AI Founder-Led Sales Automation",
            slugId: "founder-sales-automation",
            vertical: "startup",
            icon: <Rocket className="w-6 h-6" />,
            color: "blue",
            offeringDescription: "Scale founder sales without burning out leadership. Automate inbound qualification, meeting booking, and deal follow-ups.",
            keyVerticals: ["Founder Calendar Protection", "Autonomous Inbound Qualification", "Deal Health Nudging", "Follow-Up Autopilot"],
            details: {
                situations: ["Founders spending 30+ hours/week selling", "Slow follow-ups due to product work", "Founder calendar bottleneck"],
                challenges: ["Systematizing founder sales process", "Qualifying inbounds automatically", "Maintaining high lead velocity"],
                solution: "AI handles preliminary lead qualification and email follow-ups, presenting founders with qualified calendar bookings.",
                example: "A tech founder reclaimed 20 hours/week while increasing qualified meeting conversions by 55%.",
                benefits: ["Founder calendar protection", "Automated lead qualification", "Higher deal velocity"],
                outcomes: ["20 Hours/Wk Reclaimed", "55% Higher Conversion", "Zero Lead Leakage"]
            }
        },
        {
            title: "AI Burn-Rate Optimized Lead Capture",
            slugId: "burn-rate-optimized-lead-capture",
            vertical: "startup",
            icon: <Coins className="w-6 h-6" />,
            color: "emerald",
            offeringDescription: "Maximize lead volume while preserving runway. Deploy low-cost organic intent capture and high-ROI outbound loops.",
            keyVerticals: ["Low-CAC Acquisition", "Runway Preservation", "Capital-Efficient Lead Loops", "Outbound ROI Maximization"],
            details: {
                situations: ["High CAC burning precious runway", "Inefficient paid ad spend", "Need to extend cash runway"],
                challenges: ["Capturing leads at minimal cost", "Maximizing capital efficiency", "Extending cash runway"],
                solution: "AI deploys organic lead capture loops and micro-targeted cold email vectors, minimizing CAC.",
                example: "A bootstrapped startup extended cash runway by 9 months while maintaining 25% MoM revenue growth.",
                benefits: ["Minimized CAC", "Extended cash runway", "High-ROI lead generation"],
                outcomes: ["9 Months Runway Extended", "25% MoM Growth", "68% Lower CAC"]
            }
        },

        // Specialized Sectors Vertical Cards
        {
            title: "Service Industries",
            slugId: "service-industrial",
            vertical: "specialized-sectors",
            icon: <Briefcase className="w-6 h-6" />,
            color: "blue",
            offeringDescription: "Reputation building + lead generation through trust audits for consulting, healthcare, education, hospitality, and logistics.",
            keyVerticals: ["Consulting", "Healthcare", "Education", "Hospitality", "Logistics"],
            details: {
                situations: ["Inconsistent brand trust across digital channels", "High customer churn due to unverified service claims", "Manual lead prospecting overhead"],
                challenges: ["Building credibility in competitive markets", "Generating high-intent enterprise inquiries", "Demonstrating compliance"],
                solution: "AI conducts automated trust audits, accelerates digital reputation, and powers targeted high-intent B2B lead generation.",
                example: "A global consulting firm boosted enterprise lead conversions by 42% via automated trust audits.",
                benefits: ["Accelerated client trust", "Automated lead qualification", "Higher conversion velocity"],
                outcomes: ["42% Higher Conversions", "3× Qualified Leads", "95% Trust Score"]
            }
        },
        {
            title: "Industrial Industries",
            slugId: "industrial-industries",
            vertical: "specialized-sectors",
            icon: <Factory className="w-6 h-6" />,
            color: "teal",
            offeringDescription: "Compliance, disaster vulnerability audits, operational risk coverage, and digital procurement outreach.",
            keyVerticals: ["Manufacturing", "Utilities", "Infrastructure", "Supply Chain", "Construction", "Energy", "Automotive", "Chemicals", "Textiles", "Heavy Machinery"],
            details: {
                situations: ["Unmapped operational vulnerability risks", "Legacy procurement cycles", "Strict environmental and safety compliance mandates"],
                challenges: ["High operational downtime costs", "Complex supply chain dependencies", "Manual audit procedures"],
                solution: "AI automates disaster vulnerability scanning, streamlines risk compliance, and powers digital procurement outreach.",
                example: "A heavy machinery manufacturer reduced compliance audit prep time by 75% while scaling procurement outreach.",
                benefits: ["Comprehensive risk coverage", "Automated procurement outreach", "Zero compliance audit penalties"],
                outcomes: ["75% Faster Audits", "Zero Downtime", "3.5× Procurement Reach"]
            }
        },
        {
            title: "D2C Companies",
            slugId: "d2c-retail",
            vertical: "specialized-sectors",
            icon: <ShoppingBag className="w-6 h-6" />,
            color: "pink",
            offeringDescription: "Digital brand acceleration, customer trust, cyber protection, and influencer campaigns for consumer brands.",
            keyVerticals: ["Consumer Brands", "E-Commerce", "Lifestyle Products", "Food & Beverages", "Fashion", "Electronics"],
            details: {
                situations: ["High cart abandonment rates", "Escalating ad network CAC", "Counterfeit or brand imitation risks"],
                challenges: ["Differentiating in crowded consumer feeds", "Building instant brand credibility", "Protecting checkout POS systems"],
                solution: "AI deploys dynamic brand acceleration, protects consumer trust, and runs automated influencer acquisition loops.",
                example: "An e-commerce lifestyle brand reduced customer acquisition costs by 38% while boosting repeat orders.",
                benefits: ["Reduced customer acquisition cost", "Enhanced consumer trust", "Protected checkout infrastructure"],
                outcomes: ["38% Lower CAC", "2.5× Repeat Orders", "99.9% POS Cyber Security"]
            }
        },
        {
            title: "FinTech & Lending",
            slugId: "fintech-saas",
            vertical: "specialized-sectors",
            icon: <Landmark className="w-6 h-6" />,
            color: "indigo",
            offeringDescription: "Cybersecurity audits, regulatory compliance, liability protection, and trust-building with investors.",
            keyVerticals: ["Digital Lending", "NBFCs", "Payment Platforms", "Wealth Management", "Insurance Tech"],
            details: {
                situations: ["Complex regulatory compliance reporting", "Security vulnerabilities in payment APIs", "Low investor confidence during market shifts"],
                challenges: ["Meeting stringent central bank guidelines", "Preventing financial fraud", "Maintaining 99.99% system availability"],
                solution: "AI automates continuous compliance monitoring, performs API penetration audits, and fortifies investor confidence.",
                example: "A digital lending NBFC achieved 100% regulatory audit compliance while reducing approval turnaround to minutes.",
                benefits: ["Bank-grade regulatory compliance", "Immediate vulnerability detection", "Investor confidence reinforcement"],
                outcomes: ["100% Audit Readiness", "Zero Security Breaches", "5× Approval Velocity"]
            }
        },
        {
            title: "SaaS Products",
            slugId: "saas-products",
            vertical: "specialized-sectors",
            icon: <Code className="w-6 h-6" />,
            color: "cyan",
            offeringDescription: "Customer outreach, penetration testing, credibility building, and subscription growth for software platforms.",
            keyVerticals: ["Software Platforms", "AI Tools", "Cloud Solutions", "Productivity Apps", "Enterprise SaaS"],
            details: {
                situations: ["SaaS churn caused by unmapped security concerns", "Low organic outreach response rates", "Long trial-to-paid conversion cycles"],
                challenges: ["Enterprise buyers requiring SOC2 verification", "Standing out in saturated app marketplaces", "Scaling outbound SDR teams"],
                solution: "AI automates SOC2 penetration audits, accelerates credibility signaling, and scales high-intent subscriber outreach.",
                example: "An enterprise SaaS platform expanded ARR by 3.2× after deploying AI penetration testing and credibility signals.",
                benefits: ["Faster trial-to-paid conversions", "Automated penetration testing", "Predictable subscription ARR"],
                outcomes: ["3.2× ARR Growth", "60% Faster Sales Cycle", "SOC2 Type II Verified"]
            }
        },
        {
            title: "Healthcare & Life Sciences",
            slugId: "healthcare-life-sciences",
            vertical: "specialized-sectors",
            icon: <HeartPulse className="w-6 h-6" />,
            color: "emerald",
            offeringDescription: "Compliance audits, patient data protection, and disaster readiness for medical and biotech organizations.",
            keyVerticals: ["Hospitals", "Clinics", "Pharma", "Diagnostics", "Biotech"],
            details: {
                situations: ["HIPAA & EHR compliance data audits", "Disaster recovery vulnerability in patient records", "Cyber threats on connected diagnostic devices"],
                challenges: ["Securing sensitive health records", "Ensuring 24/7 disaster resilience", "Meeting health authority mandates"],
                solution: "AI audits patient data protection, automates HIPAA compliance checks, and guarantees disaster readiness.",
                example: "A national diagnostics network secured zero data breach incidents across 40 hospital integrations.",
                benefits: ["Zero HIPAA violation risk", "24/7 Disaster recovery readiness", "Protected patient telemetry"],
                outcomes: ["100% HIPAA Compliant", "Zero Security Incidents", "99.999% Data Uptime"]
            }
        },
        {
            title: "Education & EdTech",
            slugId: "education-edtech",
            vertical: "specialized-sectors",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "purple",
            offeringDescription: "Reputation acceleration, digital trust, and cyber safety for student data in schools and online platforms.",
            keyVerticals: ["Schools", "Universities", "Online Learning Platforms", "EdTech Startups"],
            details: {
                situations: ["Student enrollment drops due to unmanaged online reviews", "Cyber threats on student payment portals", "Parent privacy compliance requirements"],
                challenges: ["Protecting minor student data privacy", "Scaling student enrollment channels", "Maintaining academic credibility"],
                solution: "AI accelerates institution reputation, secures student data infrastructure, and boosts online enrollment.",
                example: "An EdTech platform expanded enrolled student registrations by 65% while securing COPPA compliance.",
                benefits: ["Stronger institution reputation", "Protected student records", "Accelerated student admissions"],
                outcomes: ["65% Higher Enrollments", "COPPA/FERPA Verified", "4.9/5 Trust Rating"]
            }
        },
        {
            title: "Retail & FMCG",
            slugId: "retail-fmcg",
            vertical: "specialized-sectors",
            icon: <ShoppingCart className="w-6 h-6" />,
            color: "orange",
            offeringDescription: "Digital lead generation, customer trust, and cyber audits for POS systems in retail chains and FMCG brands.",
            keyVerticals: ["Supermarkets", "Consumer Goods", "Lifestyle Chains", "FMCG Distributors"],
            details: {
                situations: ["POS terminal security vulnerabilities", "High friction in loyalty program signups", "Unmapped foot-traffic to digital conversion"],
                challenges: ["Securing point-of-sale payment nodes", "Driving omnichannel consumer engagement", "Protecting brand reputation"],
                solution: "AI conducts POS system security audits, builds customer trust, and drives digital lead capture across retail locations.",
                example: "A retail chain fortified 1,200 POS terminals while growing loyalty program memberships by 80%.",
                benefits: ["Fully audited POS security", "Higher customer repeat frequency", "Automated foot-to-digital lead loops"],
                outcomes: ["1,200 POS Terminals Secured", "80% Loyalty Growth", "Zero Payment Exploits"]
            }
        },
        {
            title: "Real Estate & Construction",
            slugId: "real-estate-energy",
            vertical: "specialized-sectors",
            icon: <Home className="w-6 h-6" />,
            color: "teal",
            offeringDescription: "Compliance, disaster audits, and investor confidence for developers and smart infrastructure projects.",
            keyVerticals: ["Developers", "Builders", "Smart Infrastructure Projects", "Commercial Real Estate"],
            details: {
                situations: ["Environmental and structural compliance delays", "Investor hesitancy on long-horizon projects", "Unmonitored site risk exposures"],
                challenges: ["Securing regulatory build clearances", "Attracting institutional capital", "Mitigating construction liability"],
                solution: "AI performs structural and disaster vulnerability audits, streamlines project compliance, and reinforces investor trust.",
                example: "A commercial developer secured institutional funding 4 months early by providing AI structural risk audits.",
                benefits: ["Accelerated permit approvals", "High investor confidence", "Comprehensive project liability protection"],
                outcomes: ["4 Months Faster Funding", "100% Permit Clearance", "25% Risk Premium Savings"]
            }
        },
        {
            title: "Energy & Utilities",
            slugId: "energy-utilities",
            vertical: "specialized-sectors",
            icon: <Zap className="w-6 h-6" />,
            color: "orange",
            offeringDescription: "Operational risk audits, compliance, and disaster resilience for energy providers and utility grids.",
            keyVerticals: ["Power Generation", "Renewable Energy", "Oil & Gas", "Utility Infrastructure"],
            details: {
                situations: ["Critical infrastructure vulnerability threats", "Strict environmental safety mandates", "High outage liability penalties"],
                challenges: ["Securing smart grid SCADA infrastructure", "Ensuring continuous operational readiness", "Demonstrating ESG compliance"],
                solution: "AI conducts continuous operational risk audits, monitors grid cyber-physical vectors, and ensures disaster resilience.",
                example: "A renewable energy provider eliminated unmapped grid vulnerabilities across 15 solar and wind facilities.",
                benefits: ["Uninterrupted grid resilience", "Strict ESG & regulatory compliance", "Minimized operational liability"],
                outcomes: ["Zero Grid Outages", "100% ESG Compliance", "50% Risk Audit Reduction"]
            }
        }
    ];

    const getColorClass = (color: string) => {
        const colors: { [key: string]: string } = {
            blue: "text-[#064e3b] bg-emerald-50 border-emerald-100",
            purple: "text-teal-700 bg-teal-50 border-purple-100",
            indigo: "text-[#064e3b] bg-emerald-50 border-emerald-100",
            teal: "text-teal-600 bg-teal-50 border-teal-100",
            amber: "text-amber-600 bg-amber-50 border-amber-100",
            emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
            pink: "text-pink-600 bg-pink-50 border-pink-100",
            orange: "text-orange-600 bg-orange-50 border-orange-100",
            cyan: "text-cyan-600 bg-cyan-50 border-cyan-100",
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 composition-layer">
            {/* Premium Industries Carousel - First Section */}
            <div>
                <IndustriesCarousel />
            </div>

            {/* 1. Dynamic Section Intro Header */}
            <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <Reveal width="100%">
                        {(() => {
                            const sectionTitleMap: Record<string, { title: string; subtitle: string }> = {
                                'all': {
                                    title: "Vertical-Specific Revenue Engineering",
                                    subtitle: "ProfitMachines provides deep industry-specific expertise, integrating autonomous demand engines with vertical growth mechanics. We architect the entire revenue lifecycle for your specific market nuances."
                                },
                                'b2b': {
                                    title: "B2B Focus Architecture",
                                    subtitle: "Targeted account intelligence, automated SDR copilots, competitor displacement, and pipeline acceleration engineered for enterprise B2B."
                                },
                                'b2c': {
                                    title: "B2C Focus Architecture",
                                    subtitle: "High-velocity consumer acquisition, omnichannel lead capture, behavioral retargeting, and automated offer personalization."
                                },
                                'enterprise': {
                                    title: "Enterprise & Large Business Suite",
                                    subtitle: "Multi-stakeholder account penetration, executive engagement automation, strategic partnership sensing, and global compliance governance."
                                },
                                'mid-market': {
                                    title: "Mid-Market Growth Architecture",
                                    subtitle: "Rapid vertical market entry, niche market domination, and lean team productivity amplification for mid-sized organizations."
                                },
                                'startup': {
                                    title: "Startup Traction Suite",
                                    subtitle: "Zero-to-one lead generation, product-market fit signal detection, founder-led sales automation, and burn-rate optimization."
                                },
                                'specialized-sectors': {
                                    title: "Specialized Sector Architecture",
                                    subtitle: "Tailored compliance, operational risk coverage, reputation building, and digital procurement outreach across service, industrial, FinTech, healthcare, and energy sectors."
                                },
                                'service-industries': {
                                    title: "Service Industries Focus",
                                    subtitle: "Reputation building, client trust audits, and high-intent lead generation for consulting, healthcare, education, hospitality, and logistics."
                                },
                                'industrial-industries': {
                                    title: "Industrial Industries Focus",
                                    subtitle: "Disaster vulnerability audits, operational risk coverage, environmental compliance, and digital procurement outreach."
                                },
                                'd2c-companies': {
                                    title: "D2C Companies Focus",
                                    subtitle: "Digital brand acceleration, instant consumer trust signals, checkout POS security, and automated influencer growth loops."
                                },
                                'fintech-lending': {
                                    title: "FinTech & Lending Focus",
                                    subtitle: "Bank-grade cybersecurity audits, continuous regulatory compliance, liability protection, and investor confidence reinforcement."
                                },
                                'saas-products': {
                                    title: "SaaS Products Focus",
                                    subtitle: "SOC2 penetration testing, subscriber outreach, trial-to-paid conversion acceleration, and predictable subscription ARR growth."
                                }
                            };

                            const headingInfo = sectionTitleMap[activeCategory] || sectionTitleMap['all'];

                            return (
                                <>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#053d2e] text-xs font-bold uppercase tracking-wider mb-6">
                                        <span className="w-2 h-2 rounded-full bg-[#064e3b] animate-pulse"></span>
                                        {activeCategory !== 'all' ? `Industry Focus: ${headingInfo.title}` : "Enterprise Vertical Architecture"}
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight font-heading">
                                        {headingInfo.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                                        {headingInfo.subtitle}
                                    </p>
                                    
                                    {/* Real-World Industry Intelligence Visual Grid */}
                                    <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
                                        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                                            <img 
                                                src="/images/industry-fintech.png" 
                                                alt="Fintech & Enterprise Banking Intelligence System"
                                                className="w-full h-56 object-cover transform transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold rounded-full font-mono">FINTECH & FINANCIAL SERVICES</span>
                                                <h4 className="text-base font-bold text-white mt-1">Bank-Grade Compliance & Fraud Defense</h4>
                                            </div>
                                        </div>
                                        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                                            <img 
                                                src="/images/industry-healthcare.png" 
                                                alt="Healthcare & Life Sciences AI Analytics System"
                                                className="w-full h-56 object-cover transform transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold rounded-full font-mono">HEALTHCARE & BIOTECH</span>
                                                <h4 className="text-base font-bold text-white mt-1">HIPAA Verified Patient Outcome Analytics</h4>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </Reveal>
                </div>
            </section>


            {/* Industries Grid */}
            <section className="relative z-10 pb-20 md:pb-24 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {(() => {
                            const filteredIndustries = activeCategory && activeCategory !== 'all'
                                ? industries.filter(ind => ind.vertical === activeCategory)
                                : industries;

                            return filteredIndustries.map((industry, index) => {
                                const mainId = industry.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                const aliasId = mainId.replace('-focus', '').replace('enterprises', 'enterprise').replace('startups', 'startup');
                                return (
                                    <Reveal key={industry.title} width="100%" delay={index * 0.1} className="h-full">
                                    {industry.slugId && <div id={industry.slugId} className="scroll-mt-32" />}
                                    <div id={aliasId} className="scroll-mt-32" />
                                    <Card id={mainId} className="flex flex-col h-full hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border-slate-200/60 bg-white/80 backdrop-blur-xl group hover:-translate-y-2 overflow-hidden scroll-mt-32 ring-1 ring-slate-200/50 hover:ring-blue-200/50">
                                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${industry.color === 'blue' ? 'from-emerald-600 to-emerald-600' :
                                        industry.color === 'purple' ? 'from-teal-500 to-pink-500' :
                                            industry.color === 'indigo' ? 'from-teal-500 to-teal-500' :
                                                industry.color === 'teal' ? 'from-teal-500 to-emerald-500' :
                                                    industry.color === 'amber' ? 'from-amber-500 to-orange-500' :
                                                        industry.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                                                            industry.color === 'pink' ? 'from-pink-500 to-rose-500' :
                                                                industry.color === 'orange' ? 'from-orange-500 to-red-500' :
                                                                    'from-cyan-500 to-emerald-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    <CardHeader className="pb-4 bg-slate-50/30 border-b border-slate-100/60">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className={`p-3.5 rounded-2xl border ${getColorClass(industry.color)} transition-transform group-hover:scale-110 duration-500 shadow-sm`}>
                                                {industry.icon}
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-slate-900 mt-5 tracking-tight group-hover:text-[#053d2e] transition-colors">{industry.title}</CardTitle>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {industry.keyVerticals.map((vertical, i) => (
                                                <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/80 border border-slate-200 px-2 py-1 rounded-md">
                                                    {vertical}
                                                </span>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow pt-6 space-y-6">
                                        <p className="text-slate-600 text-base leading-relaxed font-medium">
                                            {industry.offeringDescription}
                                        </p>

                                        <Tabs defaultValue="challenges" className="w-full">
                                            <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100/50 p-1 rounded-xl">
                                                <TabsTrigger value="challenges" className="text-xs sm:text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-[#053d2e] data-[state=active]:shadow-sm rounded-lg py-2">Challenges</TabsTrigger>
                                                <TabsTrigger value="solution" className="text-xs sm:text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-[#053d2e] data-[state=active]:shadow-sm rounded-lg py-2">Solution</TabsTrigger>
                                                <TabsTrigger value="impact" className="text-xs sm:text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-[#053d2e] data-[state=active]:shadow-sm rounded-lg py-2">Impact</TabsTrigger>
                                            </TabsList>

                                            {/* Tab: Challenges */}
                                            <TabsContent value="challenges" className="space-y-4 animate-in fade-in-50 duration-300 focus-visible:outline-none h-full">
                                                <div className="space-y-4 min-h-[160px]">
                                                    <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest">
                                                        <AlertTriangle className="w-3.5 h-3.5" /> High-Stakes Pain Points
                                                    </div>
                                                    <ul className="space-y-3">
                                                        {industry.details.challenges.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm leading-snug">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mt-4">
                                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Common Situations</span>
                                                    <div className="space-y-1.5">
                                                        {industry.details.situations.slice(0, 2).map((sit, idx) => (
                                                            <p key={idx} className="text-xs text-slate-500 italic">"{sit}"</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TabsContent>

                                            {/* Tab: Solution */}
                                            <TabsContent value="solution" className="space-y-4 animate-in fade-in-50 duration-300 focus-visible:outline-none h-full">
                                                <div className="space-y-4 min-h-[160px]">
                                                    <div className="flex items-center gap-2 text-[#064e3b] font-bold text-xs uppercase tracking-widest">
                                                        <Lightbulb className="w-3.5 h-3.5" /> Intelligence Layer
                                                    </div>
                                                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                                        {industry.details.solution}
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-xl border border-emerald-100/50 mt-4 shadow-sm group-hover:shadow-md transition-shadow">
                                                    <div className="flex gap-3 items-start">
                                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                                            <Zap className="w-3.5 h-3.5 text-[#064e3b]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest mb-1.5">Proven Success</p>
                                                            <p className="text-sm text-slate-700 italic border-l-2 border-emerald-200 pl-2 leading-relaxed">"{industry.details.example}"</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabsContent>

                                            {/* Tab: Impact */}
                                            <TabsContent value="impact" className="space-y-4 animate-in fade-in-50 duration-300 focus-visible:outline-none h-full">
                                                <div className="space-y-4 min-h-[160px]">
                                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                                                        <TrendingUp className="w-3.5 h-3.5" /> Measurable Outcomes
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {industry.details.outcomes.map((item, idx) => (
                                                            <div key={idx} className="bg-emerald-50/50 p-2.5 rounded-lg flex items-center gap-3 border border-emerald-100/80 hover:bg-emerald-50 transition-colors">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                                <span className="text-emerald-900 text-sm font-bold">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Advantages</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {industry.details.benefits.map((ben, idx) => (
                                                            <span key={idx} className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">{ben}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TabsContent>
                                        </Tabs>

                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <button
                                                onClick={() => setSelectedModalIndustry(industry)}
                                                className="inline-flex items-center gap-2 text-xs font-bold text-[#064e3b] hover:text-[#042d22] transition-colors group-hover:translate-x-1 duration-200"
                                            >
                                                <span>Explore Full Specification</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Reveal>
                        );
                        });
                        })()}
                    </div>
                </div>
            </section>

            {/* Verticals Content Blocks */}
            <div className="bg-white relative z-10">
                {verticalsContent.map((block, index) => (
                    <Reveal key={index} width="100%" delay={index % 2 === 0 ? 0.1 : 0.2}>
                        <div id={block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="scroll-mt-32">
                            <VerticalBlock data={block} index={index} />
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Quick Diagnostic Lead Capture Form */}
            <LeadCaptureSection />

            {/* CTA Section */}
            <div className="max-w-5xl mx-auto px-4 pb-24 pt-12 relative z-10">
                <Reveal width="100%" direction="up">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-200 shadow-xl shadow-blue-900/5 group hover:shadow-2xl hover:shadow-blue-900/10 transition-shadow duration-500">
                        {/* Background Effects */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-emerald-100/50 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/50 blur-[80px] rounded-full pointer-events-none mix-blend-multiply" />

                        <div className="relative z-10 px-8 py-16 md:py-24 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#053d2e] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                                <Rocket className="w-4 h-4" /> Ready to Scale?
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-slate-900 tracking-tight leading-[1.1]">
                                Architect Your <br className="hidden md:block" />
                                <span className="text-[#053d2e]">
                                    Industry-Specific AI Engine
                                </span>
                            </h2>

                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                                Stop relying on generic tools. Deploy a revenue engine engineered
                                specifically for the <span className="text-[#064e3b] font-bold">nuances of your vertical</span>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                                <Button 
                                    onClick={() => openLongForm({ defaultIndustry: 'Enterprise Vertical' })}
                                    className="bg-emerald-800 text-white hover:bg-emerald-900 px-10 py-7 h-auto text-lg font-bold rounded-full shadow-lg shadow-emerald-900/30 transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-1"
                                >
                                    Start Building Now
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                                <Button 
                                    onClick={() => openQuickForm({ defaultIndustry: 'Enterprise Vertical' })}
                                    variant="outline"
                                    className="border-slate-300 text-slate-800 hover:bg-slate-100 px-8 py-7 h-auto text-base font-bold rounded-full transition-all duration-300"
                                >
                                    Quick 60-Sec Inquiry
                                </Button>
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-slate-500 text-sm font-medium sm:ml-6 flex items-center gap-2">
                                        <span className="text-emerald-500 relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                        Operational in weeks, not months
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Detailed Industry Specification Modal (Like Offerings) */}
            {selectedModalIndustry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                        <button
                            onClick={() => setSelectedModalIndustry(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className={`p-3.5 rounded-2xl border ${getColorClass(selectedModalIndustry.color)}`}>
                                {selectedModalIndustry.icon}
                            </div>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b]">Vertical Architecture Spec</span>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selectedModalIndustry.title}</h3>
                            </div>
                        </div>

                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                            {selectedModalIndustry.offeringDescription}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    Industry Challenges & Pain Points
                                </h4>
                                <ul className="space-y-2.5">
                                    {selectedModalIndustry.details.challenges.map((c: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                    Verified ROI & Revenue Impact
                                </h4>
                                <ul className="space-y-2.5">
                                    {selectedModalIndustry.details.outcomes.map((o: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-emerald-900">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>{o}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-100">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#064e3b]" />
                                Autonomous Solution Architecture
                            </h4>
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                {selectedModalIndustry.details.solution}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                            <Button 
                                onClick={() => {
                                    const industry = selectedModalIndustry.title;
                                    setSelectedModalIndustry(null);
                                    openLongForm({ defaultIndustry: industry, defaultService: `${industry} Architecture Engine` });
                                }}
                                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-full flex-1"
                            >
                                Deploy {selectedModalIndustry.title} Engine
                            </Button>
                            <Button 
                                onClick={() => {
                                    const industry = selectedModalIndustry.title;
                                    setSelectedModalIndustry(null);
                                    openQuickForm({ defaultIndustry: industry, defaultService: `${industry} Quick Inquiry` });
                                }}
                                variant="outline" 
                                className="border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-6 py-3 rounded-full flex-1"
                            >
                                Quick 60-Sec Inquiry
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
