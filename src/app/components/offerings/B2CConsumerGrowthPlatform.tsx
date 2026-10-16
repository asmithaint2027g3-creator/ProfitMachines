import React, { useState, useEffect } from 'react';
import { 
    Search, Target, DollarSign, Network, ShieldCheck, Users, Sparkles,
    ArrowRight, TrendingUp, BarChart3, PieChart as PieIcon, Activity,
    Layers, Cpu, Zap, Database, Server, Globe, ShoppingBag,
    CheckCircle2, ChevronRight, ShoppingCart, RefreshCw, HeartHandshake
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, 
    BarChart, Bar, PieChart, Pie, Cell, CartesianGrid 
} from 'recharts';
import { trackEvent } from '../../../lib/analytics';

// ── Chart 01: Consumer Demand Trend
const consumerDemandTrendData = [
    { month: 'Jan', demand: 100 },
    { month: 'Feb', demand: 130 },
    { month: 'Mar', demand: 175 },
    { month: 'Apr', demand: 235 },
    { month: 'May', demand: 295 },
    { month: 'Jun', demand: 350 }
];

// ── Chart 02: Customer Segment Opportunity Heatmap
const segmentHeatmapData = [
    { segment: 'Eco Conscious', score: 95 },
    { segment: 'Working Parents', score: 92 },
    { segment: 'Gen Z', score: 89 },
    { segment: 'Professionals', score: 84 },
    { segment: 'Students', score: 71 }
];

// ── Chart 03: Revenue Distribution Funnel
const consumerFunnelData = [
    { stage: 'Traffic (Visitors)', value: 1250000, percentage: '100%', color: '#8B5CF6' },
    { stage: 'Product Views', value: 480000, percentage: '38.4%', color: '#6366F1' },
    { stage: 'Add To Cart', value: 165000, percentage: '13.2%', color: '#3B82F6' },
    { stage: 'Checkout Initiated', value: 85000, percentage: '6.8%', color: '#06B6D4' },
    { stage: 'Purchase Completed', value: 48000, percentage: '3.84%', color: '#10B981' },
    { stage: 'Repeat Purchase', value: 18500, percentage: '1.48%', color: '#34D399' }
];

// ── Chart 04: Revenue Opportunity Breakdown
const revenueBreakdownData = [
    { name: 'New Customers', value: 40, color: '#8B5CF6' },
    { name: 'Retention Revenue', value: 25, color: '#3B82F6' },
    { name: 'Upsell Revenue', value: 18, color: '#10B981' },
    { name: 'Cross Sell Revenue', value: 17, color: '#F59E0B' }
];

interface B2CEngineData {
    id: string;
    number: string;
    name: string;
    icon: React.ElementType;
    question: string;
    description: string;
    kpis: { label: string; value: string; delta?: string }[];
    aiInsight: string;
    businessOutcome: string;
}

const b2cEngines: B2CEngineData[] = [
    {
        id: 'market-discovery',
        number: '01',
        name: 'B2C Market Discovery',
        icon: Search,
        question: 'Where are the highest-value consumer niches?',
        description: 'Identify profitable consumer micro-segments before acquisition costs increase.',
        kpis: [
            { label: 'Revenue Opportunity', value: '$200M', delta: '+45% Growth' },
            { label: 'LTV:CAC Ratio', value: '4.5:1', delta: 'Top Tier' },
            { label: 'CAC Reduction', value: '35%', delta: 'Unit Economics' },
            { label: 'Market Opportunity Score', value: '92 / 100', delta: 'High Density' }
        ],
        aiInsight: 'Eco-conscious consumers represent the fastest-growing high-margin niche segment.',
        businessOutcome: 'Lower acquisition costs and identify premium customer segments.'
    },
    {
        id: 'demand-discovery',
        number: '02',
        name: 'B2C Demand Discovery',
        icon: Target,
        question: 'What triggers consumer demand spikes?',
        description: 'Capture demand before competitors react.',
        kpis: [
            { label: 'Demand Score', value: '89 / 100', delta: 'Active Spike' },
            { label: 'Traffic Lift', value: '4X', delta: 'Organic & Paid' },
            { label: 'Click-Through Rate', value: '8.4%', delta: '+3.2% vs Baseline' },
            { label: 'Search Opportunity', value: '18,500', delta: 'High-Intent Monthly' }
        ],
        aiInsight: 'Weather shifts and social media trends are driving 42% of current traffic spikes.',
        businessOutcome: 'Increase traffic while reducing wasted ad spend.'
    },
    {
        id: 'value-discovery',
        number: '03',
        name: 'B2C Value Discovery',
        icon: DollarSign,
        question: 'How do we increase conversion during checkout?',
        description: 'Optimise consumer trust, urgency, proof and value reinforcement.',
        kpis: [
            { label: 'Conversion Lift', value: '+85%', delta: 'Checkout Completion' },
            { label: 'Cart Recovery', value: '35%', delta: 'Automated Retention' },
            { label: 'AOV Increase', value: '+28%', delta: 'Cart Value' },
            { label: 'Checkout Drop-Off', value: '-45%', delta: 'Friction Elimination' }
        ],
        aiInsight: 'Dynamic localized payment options reduce checkout friction by 38%.',
        businessOutcome: 'Maximized checkout completion and higher average order value.'
    },
    {
        id: 'channel-discovery',
        number: '04',
        name: 'B2C Channel Discovery',
        icon: Network,
        question: 'Which marketing channels produce the highest ROI?',
        description: 'Optimize cross-channel media spend across search, social, creator and organic.',
        kpis: [
            { label: 'Blended ROAS', value: '3.5X', delta: 'Multi-Touch Attributed' },
            { label: 'Channel Reach', value: '10M+', delta: 'Audience Scale' },
            { label: 'Acquisition Cost', value: '-35%', delta: 'Blended Optimization' },
            { label: 'Blended CAC', value: '$14.20', delta: 'Efficiency Record' }
        ],
        aiInsight: 'Creator commerce collaborations generate 2.8x higher lifetime retention.',
        businessOutcome: 'Reallocate budget into top-performing acquisition pathways.'
    },
    {
        id: 'competitive-discovery',
        number: '05',
        name: 'B2C Competitive Discovery',
        icon: ShieldCheck,
        question: 'How do we capture competitor market share?',
        description: 'Monitor competitor pricing, product gaps, ad saturation and promotional cycles.',
        kpis: [
            { label: 'Market Share Gain', value: '+18%', delta: 'Net Influx' },
            { label: 'Competitor Displacement', value: '42%', delta: 'Cart Switching' },
            { label: 'Price Arbitrage', value: '15%', delta: 'Margin Opportunity' },
            { label: 'Share of Voice', value: '62%', delta: 'Category Dominance' }
        ],
        aiInsight: 'Competitor stockouts create recurring 48-hour demand arbitrage windows.',
        businessOutcome: 'Capture high-intent consumer traffic during competitor fulfillment delays.'
    },
    {
        id: 'customer-discovery',
        number: '06',
        name: 'B2C Customer Discovery',
        icon: Users,
        question: 'Who are the highest lifetime value consumers?',
        description: 'Analyze purchase recency, frequency, monetary value and cohort behaviors.',
        kpis: [
            { label: 'Customer LTV Increase', value: '+40%', delta: '12-Month Horizon' },
            { label: 'Repeat Purchase Rate', value: '48%', delta: 'Cohort Retention' },
            { label: 'Churn Reduction', value: '-32%', delta: 'Automated Reactivation' },
            { label: 'Cohort Retention', value: '76%', delta: '90-Day Stickiness' }
        ],
        aiInsight: 'Customers purchasing within 14 days of initial onboarding have a 3.4x higher 12-month LTV.',
        businessOutcome: 'Automate personalized retention triggers to lock in repeat revenue.'
    },
    {
        id: 'product-market-fit-discovery',
        number: '07',
        name: 'B2C Product Market Fit Discovery',
        icon: Sparkles,
        question: 'Which products will scale profitably?',
        description: 'Validate product variants, bundles and seasonal launches with real consumer data.',
        kpis: [
            { label: 'Launch Success Rate', value: '88%', delta: 'Validated PMF' },
            { label: 'Return Rate Reduction', value: '-40%', delta: 'Expectation Match' },
            { label: 'Review Sentiment', value: '94%', delta: 'Positive Ratings' },
            { label: 'Margin Expansion', value: '+22%', delta: 'Bundle Optimization' }
        ],
        aiInsight: 'Product bundle recommendations drive 31% of total cart value expansion.',
        businessOutcome: 'Eliminate inventory risk and scale winning consumer product lines.'
    }
];

const b2cDataSources = [
    { name: 'Shopify / eCommerce', desc: 'Real-time cart, checkout & inventory telemetry', icon: ShoppingCart },
    { name: 'Ad Networks', desc: 'Meta, Google, TikTok, Pinterest ROAS tracking', icon: Target },
    { name: 'Social Signals', desc: 'Viral mentions, TikTok trends, influencer sentiment', icon: Globe },
    { name: 'Email & SMS Telemetry', desc: 'Klaviyo, Attentive, open and click conversion', icon: Zap },
    { name: 'CDP Ingestion', desc: 'Segment, mParticle unified consumer profiles', icon: Database },
    { name: 'Review Intelligence', desc: 'Yotpo, Trustpilot product sentiment analysis', icon: Sparkles },
    { name: 'Search Volume', desc: 'Google Trends & Amazon category search queries', icon: Search },
    { name: 'Payment Gateways', desc: 'Stripe, PayPal, Klarna checkout success rates', icon: DollarSign },
    { name: 'Inventory Feeds', desc: 'Stockout alerts & automated demand reordering', icon: Server },
    { name: 'Creator Analytics', desc: 'Affiliate, UGC, TikTok Shop affiliate tracking', icon: Users },
    { name: 'Weather & Seasonal', desc: 'Localized meteorological trigger correlation', icon: Activity },
    { name: 'Support Interactions', desc: 'Gorgias, Zendesk pre-purchase objection mining', icon: HeartHandshake }
];

export default function B2CConsumerGrowthPlatform() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>('market-discovery');

    useEffect(() => {
        if (location.hash) {
            const hash = location.hash.replace('#', '');
            const matchingEngine = b2cEngines.find(e => e.id === hash || e.id.includes(hash) || hash.includes(e.id));
            if (matchingEngine) {
                setActiveTab(matchingEngine.id);
            }
            setTimeout(() => {
                const el = document.getElementById('b2c-engines') || document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    const currentEngine = b2cEngines.find(e => e.id === activeTab) || b2cEngines[0];

    const scrollToEngines = () => {
        const el = document.getElementById('b2c-engines');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#8B5CF6] selection:text-white">
            
            {/* ══════════════════════════════════════════════════════════════════
                SECTION 1: HERO
            ══════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-slate-800/80">
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                    <div 
                        className="absolute inset-0 opacity-[0.16]"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #8B5CF6 1px, transparent 1px), linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)',
                            backgroundSize: '4rem 4rem'
                        }}
                    />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[160px]" />
                    <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-500/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                            </span>
                            <span>AI-Powered Consumer Growth Intelligence Platform</span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
                        B2C Autonomous <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-emerald-400">
                            Growth Engine
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
                        Discover hidden consumer demand, optimise acquisition costs, personalise customer journeys, increase conversion rates and maximise lifetime value through AI-powered consumer intelligence.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            to="/book-consultation"
                            onClick={() => trackEvent({ eventName: 'B2C_PLATFORM_HERO_CTA', label: 'Book Strategy Session' })}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-base rounded-xl shadow-xl shadow-purple-600/30 transition-all duration-200 hover:-translate-y-0.5 group"
                        >
                            <span>Book Strategy Session</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={scrollToEngines}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base rounded-xl border border-slate-700/80 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <span>Explore All 7 Engines</span>
                        </button>
                        <Link
                            to="/book-consultation"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-purple-950/30 text-purple-300 hover:text-white font-bold text-base rounded-xl border border-purple-500/40 shadow-sm transition-all duration-200"
                        >
                            <span>Request Product Demo</span>
                        </Link>
                    </div>

                    {/* 5 Core Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
                        {[
                            { value: '$200M+', label: 'Revenue Opportunities' },
                            { value: '12M+', label: 'Consumer Signals Analysed' },
                            { value: '7', label: 'Growth Intelligence Engines' },
                            { value: '4.5:1', label: 'Average LTV:CAC Ratio' },
                            { value: '89%', label: 'Predictive Accuracy' }
                        ].map((m, i) => (
                            <div 
                                key={i} 
                                className={`bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md text-center hover:border-purple-500/40 transition-colors ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                            >
                                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400 mb-1">
                                    {m.value}
                                </div>
                                <div className="text-xs text-slate-400 font-medium leading-tight">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 2: EXECUTIVE GROWTH DASHBOARD (8 KPI Cards)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-2 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-purple-400" />
                                Scaled eCommerce &amp; Consumer Metrics
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Executive Growth Dashboard
                            </h2>
                        </div>
                        <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
                            Modeled across D2C, retail, omnichannel and high-velocity consumer subscription brands.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { label: 'Revenue Opportunity', value: '$200M', sub: 'Surfaced High-Margin Niches', color: 'from-purple-400 to-indigo-400' },
                            { label: 'CAC Reduction', value: '35%', sub: 'Optimized Media Spend', color: 'from-emerald-400 to-teal-400' },
                            { label: 'Traffic Growth', value: '4X', sub: 'High-Intent Inbound Lift', color: 'from-blue-400 to-cyan-400' },
                            { label: 'Conversion Growth', value: '85%', sub: 'Frictionless Funnel Flow', color: 'from-purple-400 to-pink-400' },
                            { label: 'Customer LTV Increase', value: '40%', sub: 'Predictive Cohort Triggers', color: 'from-teal-400 to-emerald-400' },
                            { label: 'Checkout Recovery', value: '35%', sub: 'Autonomous Urgency Sequences', color: 'from-indigo-400 to-purple-400' },
                            { label: 'ROAS Improvement', value: '3.5X', sub: 'Blended Cross-Channel Lift', color: 'from-amber-400 to-orange-400' },
                            { label: 'Forecast Confidence', value: '89%', sub: 'Consumer Pattern Precision', color: 'from-cyan-400 to-blue-500' }
                        ].map((kpi, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="bg-gradient-to-b from-slate-900/90 to-[#0c1220]/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    {kpi.label}
                                </div>
                                <div className={`text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${kpi.color} mb-2 tracking-tight`}>
                                    {kpi.value}
                                </div>
                                <div className="text-[11.5px] text-slate-400 font-medium">
                                    {kpi.sub}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 3: CONSUMER INTELLIGENCE ANALYTICS (4 Charts)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-[#070B14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <BarChart3 className="w-3.5 h-3.5" />
                            Behavioral Telemetry
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Consumer Intelligence Analytics
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            Tracking demand trajectories, micro-segment densities, and purchase funnel conversion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Chart 01: Consumer Demand Trend */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Chart 01</span>
                                    <h3 className="text-lg font-bold text-white">Consumer Demand Trend</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                    Jan – Jun Index
                                </span>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={consumerDemandTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="#64748B" tick={{ fontSize: 12 }} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                            formatter={(value) => [`${value} Index`, 'Demand Score']}
                                        />
                                        <Line type="monotone" dataKey="demand" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 4 }} activeDot={{ r: 7 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-6 gap-2 pt-4 border-t border-slate-800/80 text-center">
                                {consumerDemandTrendData.map((d, i) => (
                                    <div key={i} className="bg-slate-800/40 rounded-lg p-2">
                                        <div className="text-[10px] text-slate-400">{d.month}</div>
                                        <div className="text-xs font-bold text-white">{d.demand}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart 02: Customer Segment Opportunity Heatmap */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Chart 02</span>
                                    <h3 className="text-lg font-bold text-white">Customer Segment Opportunity Heatmap</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    Density Index / 100
                                </span>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={segmentHeatmapData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                                        <XAxis type="number" domain={[0, 100]} stroke="#64748B" tick={{ fontSize: 12 }} />
                                        <YAxis dataKey="segment" type="category" stroke="#94A3B8" tick={{ fontSize: 11 }} width={110} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                            formatter={(value) => [`${value} / 100`, 'Opportunity Score']}
                                        />
                                        <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                                            {segmentHeatmapData.map((entry, index) => (
                                                <Cell key={`cell-b2c-${index}`} fill={index === 0 ? '#10B981' : index === 1 ? '#8B5CF6' : '#3B82F6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-slate-400 mt-4 italic text-center">
                                Eco-Conscious (95) and Working Parents (92) cohorts generate 62% higher customer lifetime value.
                            </p>
                        </div>

                        {/* Chart 03: Revenue Distribution Funnel */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Chart 03</span>
                                    <h3 className="text-lg font-bold text-white">Revenue Distribution Funnel</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                    Conversion Drop-Off
                                </span>
                            </div>
                            <div className="flex flex-col gap-3 py-1">
                                {consumerFunnelData.map((stage, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold text-slate-300">{stage.stage}</span>
                                            <span className="font-bold text-white">{stage.value.toLocaleString()} <span className="text-slate-500">({stage.percentage})</span></span>
                                        </div>
                                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all duration-700" 
                                                style={{ width: `${Math.max(6, 100 - (i * 18))}%`, backgroundColor: stage.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart 04: Revenue Opportunity Breakdown */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400">Chart 04</span>
                                    <h3 className="text-lg font-bold text-white">Revenue Opportunity Breakdown</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
                                    eCommerce Share
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                <div className="h-56 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={revenueBreakdownData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={75}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {revenueBreakdownData.map((entry, index) => (
                                                    <Cell key={`pie-b2c-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                                formatter={(val) => [`${val}%`, 'Share']}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {revenueBreakdownData.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/40">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-slate-300 font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-white">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 4: 7 B2C GROWTH ENGINES (Tab Navigation)
            ══════════════════════════════════════════════════════════════════ */}
            <section id="b2c-engines" className="py-20 lg:py-28 border-b border-slate-800/80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Cpu className="w-3.5 h-3.5" />
                            Consumer Product Architecture
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            The 7 B2C Growth Engines
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            Select an engine to inspect micro-segment questions, conversion KPIs, and autonomous outcomes.
                        </p>
                    </div>

                    {/* Horizontal Tab Navigation */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-b border-slate-800">
                        {b2cEngines.map((engine) => {
                            const IconC = engine.icon;
                            const isActive = activeTab === engine.id;
                            return (
                                <button
                                    key={engine.id}
                                    onClick={() => {
                                        setActiveTab(engine.id);
                                        trackEvent({ eventName: 'B2C_ENGINE_TAB_SELECT', label: engine.name });
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/30 scale-102'
                                            : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                                    }`}
                                >
                                    <IconC className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                    <span>{engine.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Engine Detail Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentEngine.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-b from-slate-900/90 to-[#0c1220]/95 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B5CF6] px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                            Engine {currentEngine.number}
                                        </span>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Consumer Growth Intelligence
                                        </span>
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                                        {currentEngine.name}
                                    </h3>
                                    <p className="text-lg sm:text-xl text-purple-400 font-semibold italic">
                                        "{currentEngine.question}"
                                    </p>
                                    <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
                                        {currentEngine.description}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Link
                                        to="/book-consultation"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5"
                                    >
                                        <span>Deploy {currentEngine.name}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {currentEngine.kpis.map((k, idx) => (
                                    <div key={idx} className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 sm:p-5">
                                        <div className="text-xs text-slate-400 font-medium mb-1">{k.label}</div>
                                        <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{k.value}</div>
                                        {k.delta && (
                                            <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                <span>{k.delta}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/50 via-slate-900/60 to-slate-900 border border-purple-500/30 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                                            <Zap className="w-4 h-4 text-purple-400" />
                                            Autonomous AI Consumer Insight
                                        </div>
                                        <p className="text-base text-white font-medium leading-relaxed">
                                            "{currentEngine.aiInsight}"
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
                                        <span>Model: <strong>Behavioral Propensity &amp; LTV Engine</strong></span>
                                        <span className="text-emerald-400 font-semibold">Active Ingestion</span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-slate-900 border border-emerald-500/30 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            Measurable Commercial Outcome
                                        </div>
                                        <p className="text-base text-white font-medium leading-relaxed">
                                            {currentEngine.businessOutcome}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-emerald-500/15 flex items-center justify-between text-xs text-slate-400">
                                        <span>Conversion Lift: <strong>+35% to +85% ROAS</strong></span>
                                        <span className="text-purple-400 font-semibold">Verified Model</span>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 5: AI CONSUMER INSIGHTS CENTER
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-[#070B14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                Real-Time Consumer Signals
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                AI Consumer Insights Center
                            </h2>
                        </div>
                        <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
                            Predictive alerts uncovering immediate conversion opportunities and micro-segment purchasing shifts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Cohort Surge</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                                    +62% LTV
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Eco-Conscious Purchasing Spike</h3>
                            <p className="text-xs text-slate-400 mb-6">Sustainable packaging and cruelty-free certification triggers driving 48% higher checkout speed.</p>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div><div className="text-[11px] text-slate-400">Niche Potential</div><div className="text-2xl font-extrabold text-white">$18M</div></div>
                                <div><div className="text-[11px] text-slate-400">Conversion Rate</div><div className="text-2xl font-extrabold text-emerald-400">6.4%</div></div>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Mobile Checkout</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[11px] font-bold">
                                    -42% Friction
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Express Wallet Optimization</h3>
                            <p className="text-xs text-slate-400 mb-6">One-click Apple Pay and Shop Pay auto-prompting increases checkout completion from 54% to 88%.</p>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div><div className="text-[11px] text-slate-400">Recovered Cart ARR</div><div className="text-2xl font-extrabold text-white">$8.5M</div></div>
                                <div><div className="text-[11px] text-slate-400">ROAS Multiplier</div><div className="text-2xl font-extrabold text-blue-400">3.8X</div></div>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Creator Commerce</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-[11px] font-bold">
                                    High Velocity
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">TikTok &amp; Reels Virality Loop</h3>
                            <p className="text-xs text-slate-400 mb-6">Short-form UGC video syndication with automated landing page matching lifts purchase propensity by 3.2X.</p>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div><div className="text-[11px] text-slate-400">Traffic Lift</div><div className="text-2xl font-extrabold text-white">+380%</div></div>
                                <div><div className="text-[11px] text-slate-400">Confidence</div><div className="text-2xl font-extrabold text-emerald-400">92%</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 6: CONSUMER DATA SOURCES
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Server className="w-3.5 h-3.5" />
                            Omnichannel Ingestion Feeds
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Consumer Intelligence Data Sources
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            Continuous data synchronization with leading eCommerce, ad networks, CDPs, and creator ecosystems.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {b2cDataSources.map((ds, idx) => {
                            const IconComp = ds.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1">{ds.name}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">{ds.desc}</p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                        <span>STATUS</span>
                                        <span className="text-emerald-400 font-bold">STREAMING</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 7: METHODOLOGY WORKFLOW
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-[#070B14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Consumer Revenue Acceleration
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            The 6-Stage Consumer Growth Lifecycle
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            End-to-end algorithmic orchestration driving higher customer acquisition and lifetime margin retention.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 relative">
                        {[
                            { step: '01', title: 'Collect', desc: 'Real-time multi-channel consumer signal capture' },
                            { step: '02', title: 'Unify', desc: 'Single customer identity & cohort clustering' },
                            { step: '03', title: 'Predict', desc: 'Purchase propensity & LTV value scoring' },
                            { step: '04', title: 'Personalise', desc: 'Dynamic offer, bundle & pricing recommendations' },
                            { step: '05', title: 'Convert', desc: 'Frictionless checkout & automated urgency' },
                            { step: '06', title: 'Retain', desc: 'Autonomous reorder triggers & lifecycle loyalty' }
                        ].map((s, idx) => (
                            <div 
                                key={idx}
                                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center relative group hover:border-purple-500/50 transition-all"
                            >
                                <div className="text-xs font-mono font-bold text-purple-400 mb-2">{s.step}</div>
                                <h4 className="text-lg font-extrabold text-white mb-1">{s.title}</h4>
                                <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                                {idx < 5 && (
                                    <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-slate-600 font-bold">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 border border-purple-500/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Activate Your B2C Autonomous Growth Engine
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                            Schedule a high-velocity growth audit with our consumer intelligence architects to uncover hidden profit pools across your D2C or retail brand.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/book-consultation"
                                className="px-8 py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-purple-500/25 transition-all hover:-translate-y-0.5"
                            >
                                Schedule Consumer Growth Audit
                            </Link>
                            <Link
                                to="/solutions"
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm sm:text-base rounded-xl border border-slate-700 transition-all hover:-translate-y-0.5"
                            >
                                Explore Solutions
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
