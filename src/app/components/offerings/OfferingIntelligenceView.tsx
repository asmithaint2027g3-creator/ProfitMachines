import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, Target, TrendingUp, BarChart3, ShieldCheck, Users, Rocket,
    ArrowRight, CheckCircle2, Lightbulb, ChevronRight, HelpCircle, Layers,
    DollarSign, Building2, ShoppingBag, Sparkles, Network, Globe, Clock, Zap,
    FileText, Check, ChevronDown, Info
} from 'lucide-react';
import { type OfferingDetailContent } from '../../data/offeringsIntelligenceData';
import { useLeadModal } from '../../context/LeadModalContext';

const IconMap: Record<string, React.ElementType> = {
    Search,
    Target,
    TrendingUp,
    BarChart3,
    ShieldCheck,
    Users,
    Rocket,
    DollarSign,
    Building2,
    ShoppingBag,
    Sparkles,
    Network,
    Globe,
    Clock,
    Zap,
    CheckCircle2
};

export default function OfferingIntelligenceView({ data }: { data: OfferingDetailContent }) {
    const [activeTabId, setActiveTabId] = useState<string>(data.interactiveTabs[0]?.id || 'overview');
    const [activeIcpIndex, setActiveIcpIndex] = useState<number>(0);
    const { openLongForm } = useLeadModal();

    const isB2B = data.type === 'b2b';
    const activeTab = data.interactiveTabs.find(t => t.id === activeTabId) || data.interactiveTabs[0];
    const activeIcp = data.icpProfiles[activeIcpIndex] || data.icpProfiles[0];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-20 lg:pt-28 pb-24 selection:bg-[#E1EFF8]"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* 1. Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <Link to="/offerings" className="hover:text-[#2878B5] transition-colors">Offerings</Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                        {isB2B ? 'B2B Enterprise' : 'B2C Consumer'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[#2878B5] font-bold">{data.title}</span>
                </nav>
            </div>

            {/* 2. Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-card relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#2878B5]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2.5 mb-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1EFF8] text-[#1E6297] border border-[#BAE0F8] text-xs font-bold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2878B5] animate-pulse" />
                                {data.code} • {isB2B ? 'Enterprise B2B Architecture' : 'High-Velocity B2C Suite'}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F0F7FC] text-[#1E6297] border border-[#E1EFF8] text-xs font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5]" />
                                Verified Methodology
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.08] mb-4"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            {data.heroHeadline}
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-3xl">
                            {data.heroDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={() => openLongForm({ defaultService: data.title, title: `Consult on ${data.title}` })}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#2878B5]/25 hover:-translate-y-0.5 cursor-pointer"
                            >
                                <span>Discuss Your Growth Opportunity</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <a
                                href="#statistical-cards"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-[#0A2540] font-bold text-sm rounded-xl transition-all shadow-xs"
                            >
                                <span>View Key Metrics</span>
                                <ChevronDown className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. What This Offering Achieves */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-7 sm:p-9 shadow-xs">
                    <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                        <Rocket className="w-4 h-4 text-primary" />
                        What This Offering Achieves
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 font-heading">
                        Measurable Commercial Outcomes
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.whatItAchieves.map((achieve, aIdx) => (
                            <div key={aIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                                    {achieve}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. MANDATORY DEDICATED STATISTICAL CARDS */}
            <div id="statistical-cards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                            <BarChart3 className="w-3.5 h-3.5" />
                            Statistical Cards & Key Metrics
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                            {data.title} Intelligence Indicators
                        </h2>
                    </div>
                    <div className="text-xs text-slate-500 font-medium bg-white px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
                        <Info className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        Illustrative benchmark models • Configured to client data
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.statCards.map((card, cIdx) => {
                        const CardIcon = IconMap[card.icon] || BarChart3;
                        return (
                            <div
                                key={cIdx}
                                className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <CardIcon className="w-5 h-5" />
                                        </div>
                                        {card.badge && (
                                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                                                {card.badge}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-2">
                                        <span className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
                                            {card.value}
                                        </span>
                                        <div className="text-xs font-bold text-primary mt-0.5">
                                            {card.subtitle}
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-extrabold text-slate-800 mb-2">
                                        {card.label}
                                    </h3>

                                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-normal">
                                    <span className="font-bold text-slate-700">Methodology:</span> {card.methodology}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center text-xs text-slate-500 font-medium">
                    Note: Figures above display validated benchmark methodologies and suggested targets. Actual figures deployed are calibrated to your verified enterprise CRM, audit, or research data.
                </div>
            </div>

            {/* 5. INTERACTIVE FUNCTIONAL TABS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                                Modular Framework
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                                Strategic Analysis & Execution Tabs
                            </h2>
                        </div>
                        <p className="text-xs text-slate-500 max-w-sm">
                            Select a tab below to inspect the dedicated framework, operational mechanism, and strategic deliverables.
                        </p>
                    </div>

                    {/* Tab Navigation Buttons */}
                    <div
                        className="flex gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-200/80"
                        role="tablist"
                        aria-label={`${data.title} framework sections`}
                    >
                        {data.interactiveTabs.map((tab) => {
                            const isSelected = tab.id === activeTabId;
                            return (
                                <button
                                    key={tab.id}
                                    role="tab"
                                    aria-selected={isSelected}
                                    id={`tab-${tab.id}`}
                                    aria-controls={`panel-${tab.id}`}
                                    tabIndex={isSelected ? 0 : -1}
                                    onClick={() => setActiveTabId(tab.id)}
                                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer outline-none ${
                                        isSelected
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Tab Content Panel */}
                    <div
                        id={`panel-${activeTab.id}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeTab.id}`}
                        className="animate-in fade-in-50 duration-200"
                    >
                        <div className="max-w-3xl mb-8">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                                {activeTab.label} Deep Dive
                            </span>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 mb-2 font-heading">
                                {activeTab.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                                {activeTab.summary}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {activeTab.details.map((detail, dIdx) => (
                                <div key={dIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                    <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary" />
                                        {detail.heading}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                        {detail.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. CUSTOMER SEGMENTS & DETAILED ICPs (MANDATORY IN EVERY OFFERING) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
                                <Users className="w-3.5 h-3.5 text-emerald-600" />
                                Customer Segments & Ideal Customer Profiles
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                                Target Segments for {data.title}
                            </h2>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                            {isB2B ? 'Multi-stakeholder B2B committee criteria' : 'B2C consumer qualification criteria'}
                        </div>
                    </div>

                    {/* Segment Selector Tabs if multiple */}
                    {data.icpProfiles.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-100">
                            {data.icpProfiles.map((icp, iIdx) => (
                                <button
                                    key={iIdx}
                                    type="button"
                                    onClick={() => setActiveIcpIndex(iIdx)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                                        activeIcpIndex === iIdx
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {icp.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Active ICP Detail Card */}
                    <div className="border border-slate-200/90 rounded-2xl p-6 sm:p-8 bg-slate-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200 mb-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                    {activeIcp.category}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                                    {activeIcp.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                                    <span className="font-bold text-slate-800">Context:</span> {activeIcp.industryOrContext} • <span className="font-bold text-slate-800">Scale:</span> {activeIcp.scaleOrProfile}
                                </p>
                            </div>
                            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shrink-0">
                                {isB2B ? 'B2B Account' : 'B2C Consumer'}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Buying Committee / Roles */}
                            <div className="bg-white p-5 rounded-xl border border-slate-200/80">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-primary" />
                                    {isB2B ? 'Decision Committee Roles' : 'Consumer Profile'}
                                </h4>
                                <ul className="space-y-1.5">
                                    {activeIcp.buyerCommitteeOrRoles.map((role, rIdx) => (
                                        <li key={rIdx} className="text-xs sm:text-sm text-slate-800 font-semibold flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Core Pain Points */}
                            <div className="bg-white p-5 rounded-xl border border-slate-200/80">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-1.5">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                                    Primary Pain Points
                                </h4>
                                <ul className="space-y-1.5">
                                    {activeIcp.painPoints.map((pain, pIdx) => (
                                        <li key={pIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                            <span>{pain}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Buying Triggers */}
                            <div className="bg-white p-5 rounded-xl border border-slate-200/80">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                                    Urgency Triggers
                                </h4>
                                <ul className="space-y-1.5">
                                    {activeIcp.buyingTriggers.map((trig, tIdx) => (
                                        <li key={tIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                            <span>{trig}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Desired Outcomes, Qualification & Approach */}
                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                            <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                                    Qualification & Fit Criteria
                                </h4>
                                <div className="space-y-2">
                                    {activeIcp.qualificationCriteria.map((crit, cIdx) => (
                                        <div key={cIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200/60">
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>{crit}</span>
                                        </div>
                                    ))}
                                </div>
                                {activeIcp.disqualifyingConditions && (
                                    <div className="mt-3 text-xs text-rose-700 font-medium">
                                        <span className="font-bold">Disqualifying Conditions:</span> {activeIcp.disqualifyingConditions.join(' • ')}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                                    Budget & Recommended Next Step
                                </h4>
                                <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium space-y-2 mb-3">
                                    <p><span className="font-bold text-slate-900">Commercial Considerations:</span> {activeIcp.budgetConsiderations}</p>
                                    <p><span className="font-bold text-slate-900">Recommended Approach:</span> {activeIcp.recommendedApproach}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => openLongForm({ defaultService: `${data.title} - ${activeIcp.name}`, title: `Consult on ${activeIcp.name} Strategy` })}
                                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-primary text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>Audit Your Account Fit for This Profile</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. METHODOLOGY & CONCRETE DELIVERABLES */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0F3560] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="max-w-3xl mb-8">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1EFF8]/15 border border-[#5CAAE6]/30 text-[#5CAAE6] text-xs font-bold uppercase tracking-wider mb-3">
                            <Rocket className="w-3.5 h-3.5" />
                            5-Stage Execution Framework
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
                            How the {data.title} Process Works
                        </h2>
                        <p className="text-slate-300 text-sm mt-2 font-medium">
                            A structured, repeatable methodology with tangible executive deliverables at each milestone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4">
                        {data.executionMethodology.map((m, mIdx) => (
                            <div key={mIdx} className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-[#5CAAE6]/40 transition-all rounded-2xl p-4 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-extrabold text-[#5CAAE6] uppercase tracking-widest">
                                        {m.stage}
                                    </span>
                                    <h4 className="text-sm font-bold text-white mt-1 mb-2">
                                        {m.title}
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-3">
                                        {m.action}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                                    <span className="text-[#5CAAE6] font-bold block mb-0.5">Deliverable:</span>
                                    {m.deliverable}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 8. KPI MEASUREMENT TABLE */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="max-w-2xl mb-6">
                        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                            How We Measure Success
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                            Transparent definitions and cadences for evaluating return on intelligence.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                                    <th className="py-3 px-4">Metric</th>
                                    <th className="py-3 px-4">Operational Definition</th>
                                    <th className="py-3 px-4">Why It Matters</th>
                                    <th className="py-3 px-4 text-right">Cadence</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                {data.kpiMeasurement.map((kpi, kIdx) => (
                                    <tr key={kIdx} className="hover:bg-slate-50/60">
                                        <td className="py-3.5 px-4 font-bold text-slate-900">{kpi.metric}</td>
                                        <td className="py-3.5 px-4 text-slate-600">{kpi.definition}</td>
                                        <td className="py-3.5 px-4 text-slate-600">{kpi.whyItMatters}</td>
                                        <td className="py-3.5 px-4 text-right font-bold text-primary">{kpi.cadence}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 9. FREQUENTLY ASKED QUESTIONS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="max-w-2xl mb-8">
                        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                            Key questions about engaging {data.title} advisory services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {data.faqs.map((faq, fIdx) => (
                            <div key={fIdx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-start gap-2">
                                    <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span>{faq.question}</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-6">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 10. FINAL CONVERSION CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0F3560] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#5CAAE6] text-xs font-bold uppercase tracking-wider mb-4">
                            Next Steps
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black mb-4 font-heading text-white tracking-tight">
                            Ready to Execute {data.title}?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 font-medium mb-8 leading-relaxed">
                            Schedule a 30-minute growth intelligence consultation with our revenue architects. We'll map your current operational gaps and outline an actionable validation path.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => openLongForm({ defaultService: data.title, title: `Consult on ${data.title}` })}
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#2878B5]/25 hover:-translate-y-0.5 cursor-pointer"
                            >
                                <span>Schedule Strategic Consultation</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <Link
                                to="/book-consultation"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-all"
                            >
                                <span>Talk to Expert</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
