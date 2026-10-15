import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, Target, DollarSign, Network, ShieldCheck, Users, Sparkles, Rocket, TrendingUp,
    BarChart, Bot, ArrowRight, CheckCircle2, Lightbulb, ShoppingBag, Building2, Layout, Landmark
} from 'lucide-react';
import { useLeadModal } from '../context/LeadModalContext';

const journeyGroups = [
    {
        id: 'discover-opportunities',
        title: 'Discover Opportunities',
        desc: 'Find markets, customer segments, competitors, and untapped demand.',
        icon: Search,
        items: [
            { name: 'B2B-1 Market Discovery', path: '/offerings/b2b/market-discovery' },
            { name: 'B2B-2 Demand Discovery', path: '/offerings/b2b/demand-discovery' },
            { name: 'B2B-5 Competitive Discovery', path: '/offerings/b2b/competitive-discovery' },
            { name: 'B2B-6 Customer Discovery', path: '/offerings/b2b/customer-discovery' },
            { name: 'B2C-1 Market Discovery', path: '/offerings/b2c/market-discovery' },
            { name: 'B2C-2 Demand Discovery', path: '/offerings/b2c/demand-discovery' },
            { name: 'B2C-5 Competitive Discovery', path: '/offerings/b2c/competitive-discovery' },
            { name: 'B2C-6 Customer Discovery', path: '/offerings/b2c/customer-discovery' },
        ],
    },
    {
        id: 'build-profitable-offers',
        title: 'Build Profitable Offers',
        desc: 'Validate customer value, pricing, and product-market fit before investing in growth.',
        icon: DollarSign,
        items: [
            { name: 'B2B-3 Value Discovery', path: '/offerings/b2b/value-discovery' },
            { name: 'B2B-7 Product-Market Fit Discovery', path: '/offerings/b2b/product-market-fit-discovery' },
            { name: 'B2C-3 Value Discovery', path: '/offerings/b2c/value-discovery' },
            { name: 'B2C-7 Product-Market Fit Discovery', path: '/offerings/b2c/product-market-fit-discovery' },
        ],
    },
    {
        id: 'accelerate-growth',
        title: 'Accelerate Growth',
        desc: 'Improve acquisition efficiency, channel performance, conversion, and sales productivity.',
        icon: Rocket,
        items: [
            { name: 'B2B-4 Channel Discovery', path: '/offerings/b2b/channel-discovery' },
            { name: 'B2C-4 Channel Discovery', path: '/offerings/b2c/channel-discovery' },
            { name: 'AI Growth Engines', path: '/offerings/ai-growth/ai-demand-discovery' },
            { name: 'Sales Acceleration', path: '/offerings/sales-acceleration/enterprise-sales' },
        ],
    },
    {
        id: 'optimize-profitability',
        title: 'Optimize Profitability',
        desc: 'Understand revenue potential, margins, acquisition economics, and growth efficiency.',
        icon: BarChart,
        items: [
            { name: 'Revenue Forecasting', path: '/offerings/ai-growth/revenue-acceleration' },
            { name: 'Growth Optimization', path: '/offerings/ai-growth/growth-hacking' },
            { name: 'ROI & Unit Economics', path: '/offerings/ai-growth/performance-marketing' },
        ],
    },
];

const offeringCards = [
    {
        code: 'B2B-1', name: 'Market Discovery', icon: Search,
        description: 'Map total addressable markets, serviceable segments, and realistic capture potential.',
        problem: 'Growth decisions rely on stale reports and broad assumptions.',
        outcome: 'A prioritized market map with entry timing and revenue potential.',
        path: '/offerings/b2b/market-discovery',
    },
    {
        code: 'B2B-2', name: 'Demand Discovery', icon: Target,
        description: 'Surface explicit and latent buyer pain, intent signals, and purchase triggers.',
        problem: 'Pipeline misses buyers whose needs are not yet articulated.',
        outcome: 'Qualified demand signals and earlier, more relevant buyer engagement.',
        path: '/offerings/b2b/demand-discovery',
    },
    {
        code: 'B2B-3', name: 'Value Discovery', icon: DollarSign,
        description: 'Test value propositions, pricing, packaging, and willingness to pay.',
        problem: 'Pricing is negotiated without evidence of customer value.',
        outcome: 'A defensible pricing and packaging model tied to customer ROI.',
        path: '/offerings/b2b/value-discovery',
    },
    {
        code: 'B2B-4', name: 'Channel Discovery', icon: Network,
        description: 'Evaluate direct, partner, inbound, and outbound channel effectiveness.',
        problem: 'Channel investment is allocated without clear contribution or ROI.',
        outcome: 'A channel mix optimized for qualified pipeline and cost efficiency.',
        path: '/offerings/b2b/channel-discovery',
    },
    {
        code: 'B2B-5', name: 'Competitive Discovery', icon: ShieldCheck,
        description: 'Analyze competitors, alternatives, positioning gaps, and switching triggers.',
        problem: 'Competitive losses arrive without early warning or clear differentiation.',
        outcome: 'A positioning strategy that anticipates competitive moves.',
        path: '/offerings/b2b/competitive-discovery',
    },
    {
        code: 'B2B-6', name: 'Customer Discovery', icon: Users,
        description: 'Segment target accounts, map buying committees, and qualify ICP fit.',
        problem: 'Sales effort spreads across accounts with weak fit or buying potential.',
        outcome: 'An account prioritization model with clear qualification criteria.',
        path: '/offerings/b2b/customer-discovery',
    },
    {
        code: 'B2B-7', name: 'Product-Market Fit Discovery', icon: Sparkles,
        description: 'Validate adoption, retention, renewal, and expansion value drivers.',
        problem: 'Roadmap investment outpaces evidence of product-market fit.',
        outcome: 'A validated PMF signal and prioritization framework.',
        path: '/offerings/b2b/product-market-fit-discovery',
    },
    {
        code: 'B2C-1', name: 'Market Discovery', icon: ShoppingBag,
        description: 'Identify consumer niches, category growth, and spending potential.',
        problem: 'Consumer entry relies on broad segments and incomplete demand signals.',
        outcome: 'A focused consumer segment map with sizing and penetration potential.',
        path: '/offerings/b2c/market-discovery',
    },
    {
        code: 'B2C-2', name: 'Demand Discovery', icon: Target,
        description: 'Track search demand, product interest, and purchase intent.',
        problem: 'Acquisition spends chase interest that does not convert.',
        outcome: 'Demand signals linked to high-intent consumer segments.',
        path: '/offerings/b2c/demand-discovery',
    },
    {
        code: 'B2C-3', name: 'Value Discovery', icon: DollarSign,
        description: 'Measure willingness to pay, price sensitivity, and basket value.',
        problem: 'Promotions and pricing erode margin without demand lift.',
        outcome: 'Pricing and offer structures aligned with consumer value.',
        path: '/offerings/b2c/value-discovery',
    },
    {
        code: 'B2C-4', name: 'Channel Discovery', icon: Network,
        description: 'Assess acquisition cost, ROAS, conversion, and repeat purchase channels.',
        problem: 'Channel performance is fragmented and hard to compare.',
        outcome: 'A channel plan with repeatable economics and conversion benchmarks.',
        path: '/offerings/b2c/channel-discovery',
    },
    {
        code: 'B2C-5', name: 'Competitive Discovery', icon: ShieldCheck,
        description: 'Review competitor positioning, pricing, sentiment, and switching behavior.',
        problem: 'Brand differentiation is unclear in crowded consumer categories.',
        outcome: 'A differentiated offer and messaging strategy.',
        path: '/offerings/b2c/competitive-discovery',
    },
    {
        code: 'B2C-6', name: 'Customer Discovery', icon: Users,
        description: 'Define customer cohorts, lifetime value, frequency, and churn risk.',
        problem: 'Retention efforts miss the behaviors that predict repeat purchase.',
        outcome: 'Cohort-based retention and expansion playbooks.',
        path: '/offerings/b2c/customer-discovery',
    },
    {
        code: 'B2C-7', name: 'Product-Market Fit Discovery', icon: Sparkles,
        description: 'Validate adoption, repeat usage, satisfaction, returns, and referrals.',
        problem: 'Product scale is chased before repeat behavior is proven.',
        outcome: 'Evidence-backed product and retention priorities.',
        path: '/offerings/b2c/product-market-fit-discovery',
    },
];

const supportingCapabilities = [
    { name: 'AI-Powered Market Intelligence', icon: Lightbulb, desc: 'Continuous market and competitor signal analysis.' },
    { name: 'AI Lead & Account Intelligence', icon: Users, desc: 'Account prioritization and buyer-role mapping.' },
    { name: 'Customer & Buyer Intelligence', icon: Target, desc: 'Pain, intent, and buying-trigger detection.' },
    { name: 'Revenue Forecasting', icon: TrendingUp, desc: 'Predictive pipeline and revenue scenarios.' },
    { name: 'Growth Opportunity Prioritization', icon: Rocket, desc: 'Ranked opportunities by value and readiness.' },
    { name: 'Marketing Performance Intelligence', icon: BarChart, desc: 'Channel ROI and conversion performance.' },
];

const salesAccelerationCapabilities = [
    { name: 'ICP-Based Prospecting', icon: Users },
    { name: 'Lead Qualification', icon: CheckCircle2 },
    { name: 'Sales Pipeline Optimization', icon: TrendingUp },
    { name: 'Conversion Rate Improvement', icon: Target },
    { name: 'Sales Channel Optimization', icon: Network },
    { name: 'Revenue Operations & Reporting', icon: BarChart },
];

export default function ProfitJourneyNavigator() {
    const { openLongForm } = useLeadModal();
    const [activeGroup, setActiveGroup] = useState('discover-opportunities');
    const active = journeyGroups.find((group) => group.id === activeGroup) || journeyGroups[0];
    const ActiveIcon = active.icon;

    return (
        <section className="bg-white border-y border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2878B5] mb-3">
                        ProfitMachines · Offerings
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        AI-Driven Profit Pool Discovery
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">What do you want to improve?</p>
                    <p className="text-sm text-slate-500 mt-2">
                        Choose a growth objective to explore the right profit intelligence capabilities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                    {journeyGroups.map((group) => {
                        const Icon = group.icon;
                        const isActive = activeGroup === group.id;
                        return (
                            <button
                                key={group.id}
                                type="button"
                                onClick={() => setActiveGroup(group.id)}
                                className={`text-left p-5 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2878B5]/40 ${
                                    isActive
                                        ? 'border-[#2878B5] bg-[#F0F7FC] shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-[#2878B5]/60 hover:shadow-md'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isActive ? 'bg-[#2878B5] text-white' : 'bg-slate-100 text-[#2878B5]'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">{group.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{group.desc}</p>
                            </button>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#2878B5] text-white flex items-center justify-center">
                                <ActiveIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2878B5]">Active Group</p>
                                <p className="text-sm font-bold text-slate-900">{active.title}</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-5">{active.desc}</p>
                        <div className="space-y-2">
                            {active.items.map((item) => (
                                <Link
                                    key={item.path + item.name}
                                    to={item.path}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:border-[#2878B5]/60 hover:text-[#2878B5] transition-colors"
                                >
                                    <span>{item.name}</span>
                                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {active.items.map((item) => (
                                <Link
                                    key={item.path + item.name}
                                    to={item.path}
                                    className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#2878B5]/60 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2878B5] transition-colors">
                                            {item.name}
                                        </h4>
                                        <ArrowRight className="w-4 h-4 text-[#2878B5] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                        Explore methodology, KPIs, ICPs, and business outcomes.
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid lg:grid-cols-[1fr_380px] gap-6 items-stretch">
                    <div className="rounded-3xl border border-[#2878B5]/20 bg-gradient-to-br from-[#F0F7FC] to-white p-8 lg:p-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#2878B5]/20 text-[#2878B5] text-[11px] font-bold uppercase tracking-widest mb-5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            Layer 01 · Market Opportunity
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                            $300M Unserved Market Identified
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-5">
                            Identify overlooked market segments, validate unmet customer needs, and prioritize opportunities with meaningful revenue potential.
                        </p>
                        <p className="text-[11px] text-slate-500 mb-6">
                            Illustrative scenario until validated research is available. Final figures are evidence-based and configurable per engagement.
                        </p>
                        <Link
                            to="/offerings/b2b/market-discovery"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2878B5] text-white text-sm font-bold hover:bg-[#1E6297] transition-colors"
                        >
                            Explore Market Discovery
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="rounded-3xl bg-slate-900 text-white p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3">AI Growth Engines</p>
                            <h3 className="text-2xl font-bold mb-5">Turn market intelligence into pipeline.</h3>
                            <div className="grid grid-cols-1 gap-2.5">
                                {supportingCapabilities.slice(0, 4).map((cap) => {
                                    const Icon = cap.icon;
                                    return (
                                        <div key={cap.name} className="flex items-start gap-3 text-sm">
                                            <Icon className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                                            <span className="text-slate-200">{cap.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Link
                            to="/offerings/ai-growth/ai-demand-discovery"
                            className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-colors"
                        >
                            Explore AI Growth Engines
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2">Complete Offering Library</p>
                            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900">All 14 B2B & B2C Discovery Offerings</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => openLongForm({ defaultService: 'Profit Pool Discovery', title: 'Talk to a Growth Expert' })}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
                        >
                            Talk to an Expert
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {offeringCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={card.code + card.name}
                                    to={card.path}
                                    className="group flex flex-col p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0D2E4E] hover:from-[#0A2540] hover:to-[#133E65] hover:border-[#5CAAE6]/60 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Top subtle glow accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5CAAE6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#5CAAE6]/15 text-[#5CAAE6] border border-[#5CAAE6]/30">{card.code}</span>
                                        <div className="w-9 h-9 rounded-lg bg-white/10 text-[#5CAAE6] border border-white/10 flex items-center justify-center group-hover:bg-[#2878B5] group-hover:text-white transition-colors">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#5CAAE6] transition-colors">{card.name}</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed mb-3 font-normal">{card.description}</p>
                                    <div className="mt-auto pt-3 border-t border-white/10 space-y-1.5">
                                        <p className="text-[11px] text-slate-300"><span className="font-bold text-amber-300">Problem:</span> {card.problem}</p>
                                        <p className="text-[11px] text-slate-300"><span className="font-bold text-emerald-300">Outcome:</span> {card.outcome}</p>
                                    </div>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#5CAAE6] group-hover:text-white transition-colors">
                                        <span>Explore Offering</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-16 grid lg:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0D2E4E] text-white p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#5CAAE6]/15 text-[#5CAAE6] border border-[#5CAAE6]/30 flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-[#5CAAE6]" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#5CAAE6]">Accelerate Growth</p>
                                <h3 className="text-lg font-bold text-white">AI Growth Engines</h3>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {supportingCapabilities.map((cap) => {
                                const Icon = cap.icon;
                                return (
                                    <div key={cap.name} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10">
                                        <Icon className="w-4 h-4 text-[#5CAAE6] mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-white">{cap.name}</p>
                                            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed font-normal">{cap.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0D2E4E] text-white p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-emerald-300" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Sales Acceleration</p>
                                <h3 className="text-lg font-bold text-white">Revenue Execution</h3>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {salesAccelerationCapabilities.map((cap) => {
                                const Icon = cap.icon;
                                return (
                                    <div key={cap.name} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10">
                                        <Icon className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                                        <p className="text-xs font-bold text-white">{cap.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <Link
                            to="/offerings/sales-acceleration/enterprise-sales"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#5CAAE6] hover:text-white transition-colors"
                        >
                            Explore Sales Acceleration
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
