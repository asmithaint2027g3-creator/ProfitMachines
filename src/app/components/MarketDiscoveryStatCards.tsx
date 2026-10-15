import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle2, DollarSign, Search, Target, Users } from 'lucide-react';

const statCards = [
    {
        icon: Search,
        value: 'TAM / SAM / SOM',
        label: 'Market Opportunity',
        description: 'Quantify the total market, the serviceable opportunity, and the realistic share the business could capture.',
    },
    {
        icon: Users,
        value: 'ICP',
        label: 'Ideal Customer Profiling',
        description: 'Identify high-value accounts, buyer personas, decision-makers, and customer qualification criteria.',
    },
    {
        icon: CheckCircle2,
        value: '20–30',
        label: 'Customer Discovery Interviews',
        description: 'Use a suggested initial interview target to investigate customer pain, demand, and buying behaviour. The appropriate sample depends on segment diversity, research quality, and evidence saturation.',
    },
    {
        icon: DollarSign,
        value: 'WTP',
        label: 'Willingness to Pay',
        description: 'Validate pricing expectations, budget availability, procurement requirements, and commercial viability.',
    },
    {
        icon: Target,
        value: 'GTM',
        label: 'Go-to-Market Readiness',
        description: 'Define positioning, acquisition channels, sales motions, and market-entry priorities.',
    },
    {
        icon: BarChart3,
        value: 'ROI',
        label: 'Revenue and Growth Potential',
        description: 'Model acquisition economics, pipeline conversion, contribution margin, and potential returns.',
    },
];

const tabContent = [
    {
        id: 'overview',
        label: 'Overview',
        title: 'B2B Market Discovery Overview',
        body: 'A structured market discovery engagement maps the opportunity landscape, validates demand, and prioritises the segments where the business can win with evidence-based positioning.',
    },
    {
        id: 'market-opportunity',
        label: 'Market Opportunity',
        title: 'TAM, SAM, and SOM Sizing',
        body: 'Total addressable market is modelled from bottom-up demand signals, serviceable addressable market is filtered by fit and reach, and share of market is estimated from realistic capture rates and entry timing.',
    },
    {
        id: 'demand-validation',
        label: 'Demand Validation',
        title: 'Validate Demand Before Building',
        body: 'Demand is validated through interviews, intent signals, and procurement behaviour rather than assumptions. The goal is to confirm that buyers have a problem, budget, and urgency before scale investment.',
    },
    {
        id: 'customer-segments-icp',
        label: 'Customer Segments & ICP',
        title: 'Customer Segments and Ideal Customer Profile',
        body: 'Target segments are scored on revenue potential, strategic fit, procurement readiness, and data maturity. The ICP defines the accounts most likely to convert and expand.',
    },
    {
        id: 'metrics-roi',
        label: 'Metrics & ROI',
        title: 'Measurement and Return on Investment',
        body: 'KPIs include TAM accuracy, target-account opportunity, qualification rate, pipeline conversion, CAC payback, and modelled contribution margin. Each metric includes baseline, target, and frequency.',
    },
    {
        id: 'gtm-strategy',
        label: 'Go-to-Market Strategy',
        title: 'Market-to-Revenue Execution',
        body: 'The GTM strategy connects market discovery to revenue execution through positioning, channel selection, sales motion design, and a staged launch plan.',
    },
];

export default function MarketDiscoveryStatCards() {
    const [activeTab, setActiveTab] = useState('overview');
    const active = tabContent.find((tab) => tab.id === activeTab) || tabContent[0];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2878B5] mb-2">B2B Growth Intelligence</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Market Discovery Metrics</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#2878B5]/40 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#2878B5]/10 text-[#2878B5] flex items-center justify-center">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-extrabold text-slate-900">{card.value}</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{card.label}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="border-b border-slate-200 px-4 sm:px-6 overflow-x-auto">
                    <div className="flex gap-2 min-w-max" role="tablist" aria-label="Market discovery sections">
                        {tabContent.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2878B5]/40 ${
                                    activeTab === tab.id
                                        ? 'border-[#2878B5] text-[#2878B5]'
                                        : 'border-transparent text-slate-500 hover:text-slate-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div role="tabpanel" className="p-6 sm:p-8" aria-live="polite">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{active.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">{active.body}</p>
                </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[#2878B5]/20 bg-[#F0F7FC] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#2878B5] mb-2">Layer 01 · Market Opportunity</p>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">$300M Unserved Market Identified</h3>
                    <p className="text-xs text-slate-500">Illustrative scenario until validated research is available.</p>
                </div>
                <Link
                    to="/offerings/b2b/market-discovery"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2878B5] text-white text-sm font-bold hover:bg-[#1E6297] transition-colors"
                >
                    Explore Market Discovery
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
