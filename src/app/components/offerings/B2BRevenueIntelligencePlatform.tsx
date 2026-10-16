import React, { useState, useEffect } from 'react';
import { 
    Search, Target, DollarSign, Network, ShieldCheck, Users, Sparkles,
    ArrowRight, TrendingUp, BarChart3, PieChart as PieIcon, Activity,
    Layers, Cpu, Zap, Database, Server, Globe, Building2,
    Calendar, CheckCircle2, ChevronRight, Lock, HelpCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
    BarChart, Bar, PieChart, Pie, Cell, CartesianGrid 
} from 'recharts';
import { trackEvent } from '../../../lib/analytics';

// ── Chart 01: Revenue Opportunity Trend
const revenueTrendData = [
    { quarter: 'Q1', revenue: 120 },
    { quarter: 'Q2', revenue: 210 },
    { quarter: 'Q3', revenue: 340 },
    { quarter: 'Q4', revenue: 450 }
];

// ── Chart 02: Industry Opportunity Heatmap
const industryHeatmapData = [
    { industry: 'Healthcare', score: 95 },
    { industry: 'Financial Services', score: 92 },
    { industry: 'Technology', score: 88 },
    { industry: 'Manufacturing', score: 81 },
    { industry: 'Retail', score: 72 }
];

// ── Chart 03: Pipeline Funnel Data
const funnelData = [
    { stage: 'Signals Processed', value: 25000, percentage: '100%', color: '#3B82F6' },
    { stage: 'Target Accounts', value: 8500, percentage: '34%', color: '#60A5FA' },
    { stage: 'Pre-RFP Opportunities', value: 2400, percentage: '9.6%', color: '#38BDF8' },
    { stage: 'Active Pipeline', value: 750, percentage: '3.0%', color: '#2DD4BF' },
    { stage: 'Closed Revenue', value: 180, percentage: '0.72%', color: '#10B981' }
];

// ── Chart 04: Geographic Revenue Distribution
const geoDistributionData = [
    { name: 'North America', value: 42, color: '#3B82F6' },
    { name: 'Europe', value: 28, color: '#60A5FA' },
    { name: 'APAC', value: 22, color: '#2DD4BF' },
    { name: 'Middle East', value: 8, color: '#F59E0B' }
];

// ── 7 AI Revenue Engines Data Specification
interface EngineData {
    id: string;
    number: string;
    name: string;
    icon: React.ElementType;
    question: string;
    description: string;
    kpis: { label: string; value: string; delta?: string; detail?: string }[];
    chartType: 'tam' | 'intent' | 'roi' | 'partner' | 'competitive' | 'budget' | 'pmf';
    aiInsight: string;
    businessOutcome: string;
}

const engines: EngineData[] = [
    {
        id: 'market-discovery',
        number: '01',
        name: 'Market Discovery',
        icon: Search,
        question: 'Where is the unmapped enterprise revenue?',
        description: 'Identify new growth segments, underserved markets and emerging accounts before competitors.',
        kpis: [
            { label: 'TAM Opportunity', value: '$450M', delta: '+38% YoY' },
            { label: 'Lead Precision', value: '85%', delta: 'High Propensity' },
            { label: 'Market Readiness', value: '92%', delta: 'Optimal Timing' },
            { label: 'Pipeline Growth', value: '3.2X', delta: 'Compound Lift' }
        ],
        chartType: 'tam',
        aiInsight: '58% of untapped enterprise demand originates from Healthcare and Financial Services organisations.',
        businessOutcome: 'Expand addressable markets and prioritise high-value accounts.'
    },
    {
        id: 'demand-discovery',
        number: '02',
        name: 'Demand Discovery',
        icon: Target,
        question: 'How do we sense hidden buying committee intent?',
        description: 'Detect buying signals before RFP issuance and before competitors engage.',
        kpis: [
            { label: 'Intent Score', value: '87 / 100', delta: 'Tier-1 Surge' },
            { label: 'High Intent Accounts', value: '2,480', delta: 'Active Buying Units' },
            { label: 'Pre-RFP Opportunities', value: '420', delta: 'Exclusive Window' },
            { label: 'Pipeline Value', value: '$18.6M', delta: 'Sourced ARR' }
        ],
        chartType: 'intent',
        aiInsight: 'AI Governance and Compliance Automation generate the highest concentration of enterprise demand.',
        businessOutcome: 'Reduce CAC and increase qualified pipeline.'
    },
    {
        id: 'value-discovery',
        number: '03',
        name: 'Value Discovery',
        icon: DollarSign,
        question: 'How do we build economic proof for procurement?',
        description: 'Create CFO-ready value models proving financial impact and ROI.',
        kpis: [
            { label: 'Expected ROI', value: '6.2X', delta: 'Verified Baseline' },
            { label: 'Cost Savings', value: '$5.2M', delta: 'Annualized OpEx' },
            { label: 'Payback Period', value: '4.8 Mo', delta: 'Rapid Amortization' },
            { label: 'Approval Rate', value: '90%', delta: 'Committee Sign-Off' }
        ],
        chartType: 'roi',
        aiInsight: 'Organisations showing payback periods below 6 months have significantly higher approval likelihood.',
        businessOutcome: 'Increase approval rates and reduce discounting pressure.'
    },
    {
        id: 'channel-discovery',
        number: '04',
        name: 'Channel Discovery',
        icon: Network,
        question: 'How do we scale revenue through partners?',
        description: 'Identify strategic channel partners, integrators and alliance opportunities.',
        kpis: [
            { label: 'Partner Revenue', value: '$42M', delta: 'Sourced & Co-Sell' },
            { label: 'Margin Growth', value: '25%', delta: 'Direct Margin Expansion' },
            { label: 'Coverage Expansion', value: '240%', delta: 'Global Geographies' },
            { label: 'Pipeline Increase', value: '3X', delta: 'Inbound Multiplier' }
        ],
        chartType: 'partner',
        aiInsight: 'Strategic integrators account for the highest pipeline acceleration opportunities.',
        businessOutcome: 'Multiply enterprise distribution without scaling direct sales headcount.'
    },
    {
        id: 'competitive-discovery',
        number: '05',
        name: 'Competitive Discovery',
        icon: ShieldCheck,
        question: 'How do we influence decisions before the RFP?',
        description: 'Shape requirements early and reduce competitor influence.',
        kpis: [
            { label: 'Win Rate', value: '48%', delta: '+19% vs Competitors' },
            { label: 'RFP Influence', value: '60%', delta: 'Vendor-Shaped Specs' },
            { label: 'Threat Score', value: '72 / 100', delta: 'Neutralized Risks' },
            { label: 'Competitive Exposure', value: '94%', delta: 'Market Radar Coverage' }
        ],
        chartType: 'competitive',
        aiInsight: 'Most enterprise losses originate from early-stage requirement influence, not product capability gaps.',
        businessOutcome: 'Shape procurement criteria and displace incumbent vendors early.'
    },
    {
        id: 'customer-discovery',
        number: '06',
        name: 'Customer Discovery',
        icon: Users,
        question: 'Which accounts have active budgets?',
        description: 'Prioritise accounts with active funding and purchasing readiness.',
        kpis: [
            { label: 'Budget Ready Accounts', value: '4,520', delta: 'Allocated Capital' },
            { label: 'Pipeline Value', value: '$48M', delta: 'High-Conviction ARR' },
            { label: 'ACV Growth', value: '2.8X', delta: 'Contract Expansion' },
            { label: 'Waste Reduction', value: '50%', delta: 'Eliminated Stalled Deals' }
        ],
        chartType: 'budget',
        aiInsight: 'Budget readiness is a stronger buying predictor than company size.',
        businessOutcome: 'Direct sales capacity exclusively toward funded purchasing cycles.'
    },
    {
        id: 'product-market-fit-discovery',
        number: '07',
        name: 'Product Market Fit Discovery',
        icon: Sparkles,
        question: 'How do we validate roadmap decisions?',
        description: 'Prioritise market-backed features and reduce product investment waste.',
        kpis: [
            { label: 'PMF Score', value: '82%', delta: 'Enterprise Resonance' },
            { label: 'Feature Adoption', value: '65%', delta: 'Day-30 Stickiness' },
            { label: 'Net Retention Rate', value: '128%', delta: 'Expansion Cohorts' },
            { label: 'R&D Savings', value: '$1.5M', delta: 'Prevented Churn / Waste' }
        ],
        chartType: 'pmf',
        aiInsight: 'A small number of requested features account for the majority of long-term revenue retention.',
        businessOutcome: 'Build high-margin roadmap capabilities with mathematically proven buyer demand.'
    }
];

// ── 12 Data Sources
const dataSources = [
    { name: 'CRM Systems', desc: 'Salesforce, HubSpot, Dynamics telemetry', icon: Database },
    { name: 'ERP Systems', desc: 'SAP, Oracle, NetSuite capital tracking', icon: Server },
    { name: 'Intent Data', desc: 'Bombora, 6sense, proprietary dark funnel', icon: Target },
    { name: 'Technographic Data', desc: 'Live cloud, stack & vendor telemetry', icon: Cpu },
    { name: 'Funding Events', desc: 'Venture, PE, secondary & debt rounds', icon: DollarSign },
    { name: 'Executive Changes', desc: 'C-suite, VP & buying committee moves', icon: Users },
    { name: 'News Signals', desc: 'M&A, regulatory filings & expansion news', icon: Globe },
    { name: 'Website Analytics', desc: 'Reverse-IP deanonymization & heatmaps', icon: Activity },
    { name: 'Hiring Signals', desc: 'Headcount expansion & role openings', icon: Building2 },
    { name: 'Search Behaviour', desc: 'Category queries & solution benchmarking', icon: Search },
    { name: 'Partner Networks', desc: 'SI, MSP & reseller deal registration', icon: Network },
    { name: 'Industry Intelligence', desc: 'Gartner, IDC, Forrester benchmarks', icon: BarChart3 }
];

export default function B2BRevenueIntelligencePlatform() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>('market-discovery');

    useEffect(() => {
        if (location.hash) {
            const hash = location.hash.replace('#', '');
            const matchingEngine = engines.find(e => e.id === hash || e.id.includes(hash) || hash.includes(e.id));
            if (matchingEngine) {
                setActiveTab(matchingEngine.id);
            }
            setTimeout(() => {
                const el = document.getElementById('engines-dashboard') || document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    const currentEngine = engines.find(e => e.id === activeTab) || engines[0];

    const scrollToEngines = () => {
        const el = document.getElementById('engines-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#1864FF] selection:text-white">
            
            {/* ══════════════════════════════════════════════════════════════════
                SECTION 1: HERO
            ══════════════════════════════════════════════════════════════════ */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-slate-800/80">
                {/* Animated Enterprise Network Graph & Matrix Canvas */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                    {/* Architectural Grid */}
                    <div 
                        className="absolute inset-0 opacity-[0.18]"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)',
                            backgroundSize: '4rem 4rem'
                        }}
                    />
                    {/* Ambient Radial Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1864FF]/15 rounded-full blur-[160px]" />
                    <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px]" />
                    
                    {/* Abstract SVG Network Nodes */}
                    <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="40%" y1="50%" x2="70%" y2="40%" stroke="#3B82F6" strokeWidth="1" />
                        <line x1="70%" y1="40%" x2="85%" y2="65%" stroke="#3B82F6" strokeWidth="1" strokeDasharray="6 6" />
                        <line x1="40%" y1="50%" x2="50%" y2="80%" stroke="#3B82F6" strokeWidth="1" />
                        <circle cx="20%" cy="30%" r="4" fill="#60A5FA" className="animate-pulse" />
                        <circle cx="40%" cy="50%" r="5" fill="#3B82F6" />
                        <circle cx="70%" cy="40%" r="4" fill="#2DD4BF" />
                        <circle cx="85%" cy="65%" r="5" fill="#60A5FA" className="animate-pulse" />
                        <circle cx="50%" cy="80%" r="4" fill="#3B82F6" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Eyebrow Platform Tag */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                            </span>
                            <span>Enterprise AI Revenue Intelligence Platform</span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                            B2B Autonomous <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2DD4BF]">
                                Revenue Engine
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
                            A unified AI-powered revenue intelligence platform that discovers hidden demand, buying intent, budget-ready accounts, competitive opportunities and product-market fit gaps before your competitors.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            to="/book-consultation"
                            onClick={() => trackEvent({ eventName: 'B2B_PLATFORM_HERO_CTA', label: 'Book Strategy Session' })}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1864FF] hover:bg-[#1554D6] text-white font-bold text-base rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 group"
                        >
                            <span>Book Strategy Session</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={scrollToEngines}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base rounded-xl border border-slate-700/80 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <span>Explore Revenue Engines</span>
                        </button>
                    </div>

                    {/* 5 Core Metrics Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
                        {[
                            { value: '$450M+', label: 'Revenue Opportunity Identified' },
                            { value: '150,000+', label: 'Accounts Analysed' },
                            { value: '7', label: 'AI Revenue Engines' },
                            { value: '28M+', label: 'Signals Processed' },
                            { value: '84%', label: 'Forecast Confidence' }
                        ].map((m, i) => (
                            <div 
                                key={i} 
                                className={`bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md text-center hover:border-blue-500/40 transition-colors ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                            >
                                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 mb-1">
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
                SECTION 2: EXECUTIVE KPI DASHBOARD (8 KPI Cards)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="text-xs font-extrabold uppercase tracking-widest text-[#3B82F6] mb-2 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-400" />
                                Continuous Enterprise Benchmarks
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Executive KPI Dashboard
                            </h2>
                        </div>
                        <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
                            Quantified platform impact modeled across Fortune 500 &amp; high-growth B2B enterprise deployments.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { label: 'Revenue Opportunity', value: '$450M', sub: 'Identified TAM & White Space', color: 'from-blue-500 to-indigo-500' },
                            { label: 'Pipeline Growth', value: '+250%', sub: 'Qualified Deal Velocity', color: 'from-emerald-500 to-teal-500' },
                            { label: 'CAC Reduction', value: '-60%', sub: 'Pre-RFP Ingestion Efficiency', color: 'from-cyan-500 to-blue-500' },
                            { label: 'Win Rate Increase', value: '+48%', sub: 'Spec-Influenced Procurements', color: 'from-indigo-500 to-purple-500' },
                            { label: 'Partner Revenue', value: '+3x', sub: 'Ecosystem Sourced Multiplier', color: 'from-blue-400 to-emerald-400' },
                            { label: 'ACV Growth', value: '+2.8x', sub: 'Multi-Product Contract Expansion', color: 'from-purple-500 to-pink-500' },
                            { label: 'R&D Savings', value: '$1.5M', sub: 'Eliminated Roadmap Waste', color: 'from-teal-400 to-cyan-500' },
                            { label: 'Forecast Confidence', value: '84%', sub: 'Algorithmic Close Propensity', color: 'from-amber-400 to-orange-500' }
                        ].map((kpi, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="bg-gradient-to-b from-slate-900/90 to-[#0c1220]/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 group"
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
                SECTION 3: REVENUE INTELLIGENCE ANALYTICS (4 Charts)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-[#070B14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <BarChart3 className="w-3.5 h-3.5" />
                            Macro Analytical Telemetry
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Revenue Intelligence Analytics
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            Interactive real-time visualizations displaying pipeline progression, industry velocity, and global distribution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* ── Chart 01: Revenue Opportunity Trend ── */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Chart 01</span>
                                    <h3 className="text-lg font-bold text-white">Revenue Opportunity Trend</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                    Q1 – Q4 Forecast
                                </span>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueTrendData}>
                                        <defs>
                                            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5}/>
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                                        <XAxis dataKey="quarter" stroke="#64748B" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="#64748B" tick={{ fontSize: 12 }} tickFormatter={(val) => `$${val}M`} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                            formatter={(value) => [`$${value}M`, 'Opportunity']}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-800/80 text-center">
                                {revenueTrendData.map((d, i) => (
                                    <div key={i} className="bg-slate-800/40 rounded-lg p-2">
                                        <div className="text-[11px] text-slate-400">{d.quarter}</div>
                                        <div className="text-sm font-bold text-white">${d.revenue}M</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Chart 02: Industry Opportunity Heatmap ── */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Chart 02</span>
                                    <h3 className="text-lg font-bold text-white">Industry Opportunity Heatmap</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    Intensity Score / 100
                                </span>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={industryHeatmapData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                                        <XAxis type="number" domain={[0, 100]} stroke="#64748B" tick={{ fontSize: 12 }} />
                                        <YAxis dataKey="industry" type="category" stroke="#94A3B8" tick={{ fontSize: 11 }} width={110} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                            formatter={(value) => [`${value} / 100`, 'Heatmap Score']}
                                        />
                                        <Bar dataKey="score" radius={[0, 6, 6, 0]} fill="#2DD4BF">
                                            {industryHeatmapData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : index === 1 ? '#06B6D4' : '#3B82F6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-slate-400 mt-4 italic text-center">
                                Healthcare (95) and Financial Services (92) represent the highest density of budget-approved initiatives.
                            </p>
                        </div>

                        {/* ── Chart 03: Pipeline Funnel ── */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Chart 03</span>
                                    <h3 className="text-lg font-bold text-white">Pipeline Conversion Funnel</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                    Stage Ingestion
                                </span>
                            </div>
                            <div className="flex flex-col gap-3 py-2">
                                {funnelData.map((stage, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold text-slate-300">{stage.stage}</span>
                                            <span className="font-bold text-white">{stage.value.toLocaleString()} <span className="text-slate-500">({stage.percentage})</span></span>
                                        </div>
                                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all duration-700" 
                                                style={{ width: `${Math.max(8, 100 - (i * 20))}%`, backgroundColor: stage.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Chart 04: Geographic Revenue Distribution ── */}
                        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Chart 04</span>
                                    <h3 className="text-lg font-bold text-white">Geographic Revenue Distribution</h3>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    Global Telemetry
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                <div className="h-56 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={geoDistributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={75}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {geoDistributionData.map((entry, index) => (
                                                    <Cell key={`geo-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                                formatter={(val) => [`${val}%`, 'Revenue Share']}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    {geoDistributionData.map((item, idx) => (
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
                SECTION 4: 7 AI REVENUE ENGINES (Tab Navigation)
            ══════════════════════════════════════════════════════════════════ */}
            <section id="engines-dashboard" className="py-20 lg:py-28 border-b border-slate-800/80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Cpu className="w-3.5 h-3.5" />
                            Modular Product Architecture
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            The 7 AI Revenue Engines
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            Select an engine to inspect its real-time discovery questions, KPIs, analytical telemetry, AI insights, and commercial outcomes.
                        </p>
                    </div>

                    {/* Horizontal Tab Navigation (Only one open at a time) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-b border-slate-800">
                        {engines.map((engine) => {
                            const IconC = engine.icon;
                            const isActive = activeTab === engine.id;
                            return (
                                <button
                                    key={engine.id}
                                    onClick={() => {
                                        setActiveTab(engine.id);
                                        trackEvent({ eventName: 'ENGINE_TAB_SELECT', label: engine.name });
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#1864FF] text-white shadow-lg shadow-blue-500/30 scale-102'
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
                            {/* Engine Header: Number, Name, Strategic Question, Description */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#1864FF] px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                            Engine {currentEngine.number}
                                        </span>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Autonomous Revenue Intelligence
                                        </span>
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                                        {currentEngine.name}
                                    </h3>
                                    <p className="text-lg sm:text-xl text-blue-400 font-semibold italic">
                                        "{currentEngine.question}"
                                    </p>
                                    <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl">
                                        {currentEngine.description}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Link
                                        to="/book-consultation"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1864FF] hover:bg-[#1554D6] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                                    >
                                        <span>Deploy {currentEngine.name}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* 4 Engine KPIs */}
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

                            {/* AI Insight & Business Outcome Dual Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* AI Insight Card */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-900/60 to-slate-900 border border-blue-500/30 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
                                            <Zap className="w-4 h-4 text-blue-400" />
                                            Autonomous AI Insight
                                        </div>
                                        <p className="text-base text-white font-medium leading-relaxed">
                                            "{currentEngine.aiInsight}"
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-blue-500/15 flex items-center justify-between text-xs text-slate-400">
                                        <span>Telemetry Engine: <strong>DeepSeek + Neural Propensity</strong></span>
                                        <span className="text-emerald-400 font-semibold">Live Feed</span>
                                    </div>
                                </div>

                                {/* Business Outcome Card */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-slate-900 border border-emerald-500/30 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            Commercial Business Outcome
                                        </div>
                                        <p className="text-base text-white font-medium leading-relaxed">
                                            {currentEngine.businessOutcome}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-emerald-500/15 flex items-center justify-between text-xs text-slate-400">
                                        <span>Executive Impact: <strong>Direct ARR &amp; Margin Velocity</strong></span>
                                        <span className="text-blue-400 font-semibold">Tier-1 Guaranteed</span>
                                    </div>
                                </div>

                            </div>

                        </motion.div>
                    </AnimatePresence>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 5: AI INSIGHTS CENTER (3 High-Conviction Cards)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-[#070B14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                Algorithmic Intelligence Stream
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                AI Insights Center
                            </h2>
                        </div>
                        <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
                            Real-time autonomous recommendations and demand surge opportunities surfaced across global enterprise markets.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Healthcare Sector</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[11px] font-bold">
                                    High Priority
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Healthcare Expansion Opportunity
                            </h3>
                            <p className="text-xs text-slate-400 mb-6">
                                Unprecedented surge in HIPAA automation &amp; EHR modernization demand detected across 14 hospital networks.
                            </p>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div>
                                    <div className="text-[11px] text-slate-400">Potential Revenue</div>
                                    <div className="text-2xl font-extrabold text-white">$22M</div>
                                </div>
                                <div>
                                    <div className="text-[11px] text-slate-400">Confidence Score</div>
                                    <div className="text-2xl font-extrabold text-emerald-400">91%</div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">BFSI Sector</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                                    +34% Growth
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Financial Services Buying Activity
                            </h3>
                            <p className="text-xs text-slate-400 mb-6">
                                Pre-RFP procurement signals identified in fraud telemetry, core banking modernization, and risk compliance pipelines.
                            </p>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div>
                                    <div className="text-[11px] text-slate-400">Growth Velocity</div>
                                    <div className="text-2xl font-extrabold text-white">+34%</div>
                                </div>
                                <div>
                                    <div className="text-[11px] text-slate-400">Potential ARR</div>
                                    <div className="text-2xl font-extrabold text-blue-400">$12M</div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Industrial &amp; Mfg</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-[11px] font-bold">
                                    Surge Detected
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Manufacturing Pipeline Surge
                            </h3>
                            <p className="text-xs text-slate-400 mb-6">
                                Autonomous supply-chain routing and IoT predictive maintenance investments accelerating ahead of Q3 budgeting.
                            </p>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                <div>
                                    <div className="text-[11px] text-slate-400">Forecast Lift</div>
                                    <div className="text-2xl font-extrabold text-white">+28%</div>
                                </div>
                                <div>
                                    <div className="text-[11px] text-slate-400">Confidence Score</div>
                                    <div className="text-2xl font-extrabold text-emerald-400">89%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 6: DATA SOURCES (Visual Icon Grid - 12 Sources)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-24 border-b border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Server className="w-3.5 h-3.5" />
                            Omnichannel Ingestion Infrastructure
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Unified Enterprise Data Sources
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            Ingesting 28M+ signals hourly across structured, dark-funnel, and real-time operational feeds.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {dataSources.map((ds, idx) => {
                            const IconComp = ds.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                            <IconComp className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1">{ds.name}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">{ds.desc}</p>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                        <span>INGESTION</span>
                                        <span className="text-emerald-400 font-bold">ACTIVE</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 7: METHODOLOGY (Visual Workflow)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-[#070B14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Autonomous Execution Framework
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Algorithmic Methodology Workflow
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base mt-2">
                            From raw intent telemetry to verified pipeline execution in six systematic phases.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 relative">
                        {[
                            { step: '01', title: 'Collect', desc: 'Continuous multi-source telemetry ingestion' },
                            { step: '02', title: 'Analyse', desc: 'Cross-entity neural network pattern matching' },
                            { step: '03', title: 'Score', desc: 'ICP propensity & budget readiness ranking' },
                            { step: '04', title: 'Predict', desc: 'Close probability & ACV opportunity modeling' },
                            { step: '05', title: 'Execute', desc: 'Autonomous SDR orchestration & engagement' },
                            { step: '06', title: 'Scale', desc: 'Revenue velocity optimization & expansion' }
                        ].map((s, idx) => (
                            <div 
                                key={idx}
                                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-center relative group hover:border-blue-500/50 transition-all"
                            >
                                <div className="text-xs font-mono font-bold text-blue-400 mb-2">{s.step}</div>
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

                    {/* Final Bottom Callout Box */}
                    <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 border border-blue-500/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Ready to Activate Your Autonomous Revenue Engine?
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                            Schedule a private executive briefing with our enterprise AI revenue architects to inspect unmapped profit pools across your target market.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/book-consultation"
                                className="px-8 py-4 bg-[#1864FF] hover:bg-[#1554D6] text-white font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-0.5"
                            >
                                Schedule Executive Briefing
                            </Link>
                            <Link
                                to="/solutions"
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm sm:text-base rounded-xl border border-slate-700 transition-all hover:-translate-y-0.5"
                            >
                                View Enterprise Solutions
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
