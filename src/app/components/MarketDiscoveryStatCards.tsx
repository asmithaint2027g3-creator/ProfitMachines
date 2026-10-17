import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle2, DollarSign, Search, Target, Users } from 'lucide-react';

const statCards = [
    {
        sequenceNumber: '01',
        category: 'MARKET SIZE',
        icon: Search,
        value: 'TAM / SAM / SOM',
        label: 'TAM / SAM / SOM',
        description: 'Estimate the total market, serviceable market, and realistically obtainable market using defined market boundaries and commercial assumptions.',
    },
    {
        sequenceNumber: '02',
        category: 'ENTERPRISE SEGMENTATION',
        icon: Users,
        value: '4 Tiers',
        label: 'Enterprise Market Segmentation',
        description: 'Categorize target enterprise sectors by industry, company scale, regulatory maturity, and commercial attractiveness to concentrate go-to-market resources.',
    },
    {
        sequenceNumber: '03',
        category: 'ICP FIT',
        icon: Target,
        value: '78.4 / 100',
        label: 'ICP Fit Score',
        description: 'Score target corporate accounts against weighted firmographic, operational, and technology criteria to isolate the highest-propensity buyers.',
    },
    {
        sequenceNumber: '04',
        category: 'MARKET VALIDATION',
        icon: CheckCircle2,
        value: '84.2% Confirmed',
        label: 'Problem & Demand Validation',
        description: 'Validate the urgency and severity of core business problems across target industries through structured stakeholder research.',
    },
    {
        sequenceNumber: '05',
        category: 'TARGET ACCOUNTS',
        icon: DollarSign,
        value: '8,450 Verified',
        label: 'Target Account Universe',
        description: 'Identify and verify the complete population of qualifying legal corporate entities that match the target market boundaries.',
    },
    {
        sequenceNumber: '06',
        category: 'REVENUE OPPORTUNITY',
        icon: BarChart3,
        value: '$280K Avg ACV',
        label: 'Addressable Revenue Opportunity',
        description: 'Model scenario-based addressable revenue potential using verified account counts, contract pricing, and historical qualification rates.',
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
                        <div key={card.label} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#2878B5]/40 transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-black tracking-wider text-[#2878B5] font-mono">
                                            {card.sequenceNumber}
                                        </span>
                                        <span className="text-slate-300 font-bold">·</span>
                                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                                            {card.category}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-[#2878B5]/10 text-[#2878B5] flex items-center justify-center">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </div>
                                <h3 className="text-base font-black text-[#0A2540] tracking-tight mb-2 font-heading">{card.label}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">{card.description}</p>
                            </div>
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                <span className="font-semibold text-slate-700">Validated Model</span>
                                <span className="text-xs font-black text-[#2878B5] font-mono">{card.value}</span>
                            </div>
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
