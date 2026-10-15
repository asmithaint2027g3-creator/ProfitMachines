import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Target,
    Workflow,
    BarChart3,
    Search,
    Zap,
    TrendingUp,
    LineChart,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    AlertTriangle,
    Sparkles,
    Building2,
    Users,
    PhoneCall,
    ChevronRight,
    ShieldCheck,
    Layers,
    SlidersHorizontal
} from 'lucide-react';
import { GrowthVertical, solutionsVerticalsData } from '../data/solutionsVerticalsData';
import { useLeadModal } from '../context/LeadModalContext';

// Helper to resolve icon component by string name
const VerticalIcon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
    switch (name) {
        case 'Target': return <Target className={className} />;
        case 'Workflow': return <Workflow className={className} />;
        case 'BarChart3': return <BarChart3 className={className} />;
        case 'Search': return <Search className={className} />;
        case 'Zap': return <Zap className={className} />;
        case 'TrendingUp': return <TrendingUp className={className} />;
        case 'LineChart': return <LineChart className={className} />;
        default: return <Sparkles className={className} />;
    }
};

export default function VerticalsExplorer() {
    const { openLongForm } = useLeadModal();
    const [activeVerticalId, setActiveVerticalId] = useState<string>(solutionsVerticalsData[0].id);

    // Sync with URL hash or search params if present
    useEffect(() => {
        const hash = window.location.hash ? window.location.hash.replace('#', '').toLowerCase() : '';
        const params = new URLSearchParams(window.location.search);
        const verticalParam = params.get('vertical')?.toLowerCase();

        const target = hash || verticalParam;
        if (target) {
            const found = solutionsVerticalsData.find(v =>
                v.id === target || v.slug === target || target.includes(v.slug) || v.slug.includes(target)
            );
            if (found) {
                setActiveVerticalId(found.id);
            }
        }
    }, []);

    const activeVertical = solutionsVerticalsData.find(v => v.id === activeVerticalId) || solutionsVerticalsData[0];

    const handleSelectVertical = (id: string) => {
        setActiveVerticalId(id);
        // Update URL hash without full reload
        const found = solutionsVerticalsData.find(v => v.id === id);
        if (found) {
            window.history.replaceState(null, '', `#${found.slug}`);
        }
    };

    return (
        <section id="verticals" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Four: Header Specifications from Prompt */}
                <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#2878B5] animate-pulse" />
                        <span>INDUSTRY-SPECIFIC GROWTH SOLUTIONS</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] font-heading">
                        Growth Strategies Built Around Your Industry.
                    </h2>

                    <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal max-w-3xl mx-auto">
                        Every industry has different customers, buying behavior, commercial challenges, and operational priorities. ProfitMachines helps businesses identify growth opportunities, improve customer acquisition and conversion, optimize business processes, and make better-informed profitability decisions through data-driven intelligence and automation.
                    </p>
                </div>

                {/* Mobile / Tablet Horizontal Navigation Selector (< lg) */}
                <div className="lg:hidden mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {solutionsVerticalsData.map((vert) => {
                            const isSelected = vert.id === activeVerticalId;
                            return (
                                <button
                                    key={vert.id}
                                    onClick={() => handleSelectVertical(vert.id)}
                                    className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                                        isSelected
                                            ? 'bg-[#2878B5] text-white border-[#2878B5] shadow-md shadow-emerald-700/20'
                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    <span className="font-mono text-[10px] opacity-75">{vert.number}</span>
                                    <span>{vert.shortName}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── SECTION FIVE: INTERACTIVE TWO-PANEL LAYOUT ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* MAIN CONTENT PANEL (Left/Center ~68% width on desktop) */}
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10 transition-all duration-300">

                            {/* A. Vertical Heading & Badge */}
                            <div className="space-y-4 border-b border-slate-100 pb-8">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E6297] text-xs font-bold uppercase tracking-wider font-mono">
                                        <VerticalIcon name={activeVertical.icon} className="w-3.5 h-3.5" />
                                        <span>VERTICAL {activeVertical.number} • {activeVertical.badge}</span>
                                    </div>

                                    <div className="text-xs font-mono font-bold text-slate-400">
                                        REF: {activeVertical.slug.toUpperCase()}
                                    </div>
                                </div>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug font-heading">
                                    {activeVertical.name}
                                </h3>

                                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                                    {activeVertical.tagline}
                                </p>
                            </div>

                            {/* B. Industry and Target Audience */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>Target Commercial Audience</span>
                                </div>
                                <h4 className="text-base font-bold text-slate-900">
                                    {activeVertical.targetAudience.headline}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {activeVertical.targetAudience.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {activeVertical.targetAudience.examples.map((ex, i) => (
                                        <span key={i} className="text-xs font-medium bg-white border border-slate-200/80 text-slate-700 px-3 py-1 rounded-lg shadow-xs">
                                            {ex}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* C. Business Challenges */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    <span>Sector-Specific Commercial Challenges</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {activeVertical.challenges.map((ch, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-1.5">
                                            <div className="text-xs font-bold text-slate-900 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                <span>{ch.title}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 pl-3.5 leading-relaxed font-normal">
                                                {ch.impact}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* E. Business KPI Cards */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#1E6297] uppercase tracking-wider">
                                        <TrendingUp className="w-4 h-4 text-[#2878B5]" />
                                        <span>Target Commercial KPIs & Benchmarks</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono">* Illustrative benchmark metrics</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {activeVertical.kpis.map((kpi, kIdx) => (
                                        <div
                                            key={kIdx}
                                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                                        >
                                            <div>
                                                {kpi.benchmark && (
                                                    <div className="text-xl sm:text-2xl font-black text-[#2878B5] tracking-tight">
                                                        {kpi.benchmark}
                                                    </div>
                                                )}
                                                <div className="text-xs font-bold text-slate-900 mt-1">
                                                    {kpi.name}
                                                </div>
                                                <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                                                    {kpi.explanation}
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-100 p-1.5 rounded-lg mt-3 leading-tight">
                                                <strong>Why it matters:</strong> {kpi.whyItMatters}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* D. Key Capabilities and Solutions */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                                    <Layers className="w-4 h-4 text-[#2878B5]" />
                                    <span>Key Capabilities and Solutions</span>
                                </div>

                                <div className="space-y-3">
                                    {activeVertical.capabilities.map((cap, cIdx) => (
                                        <div
                                            key={cIdx}
                                            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h5 className="text-sm font-bold text-slate-900">
                                                    {cap.title}
                                                </h5>
                                                <Link
                                                    to={cap.linkPath}
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-emerald-800 shrink-0"
                                                >
                                                    <span>Explore Engine</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                                                {cap.description}
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                                                <div className="text-slate-600 flex items-start gap-1.5">
                                                    <span className="font-bold text-amber-800 shrink-0">Problem Solved:</span>
                                                    <span>{cap.problemAddressed}</span>
                                                </div>
                                                <div className="text-slate-800 flex items-start gap-1.5 font-medium">
                                                    <span className="font-bold text-emerald-800 shrink-0">Business Value:</span>
                                                    <span>{cap.expectedBusinessValue}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* F. Practical Use Cases */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span>Practical Business Applications</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {activeVertical.useCases.map((uc, uIdx) => (
                                        <div key={uIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                                            <div>
                                                <h6 className="text-xs font-bold text-slate-900">{uc.title}</h6>
                                                <p className="text-[11px] text-slate-500 italic mt-1 leading-snug">"{uc.scenario}"</p>
                                                <p className="text-xs text-slate-700 mt-2 leading-relaxed">{uc.application}</p>
                                            </div>
                                            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 p-2 rounded-lg mt-2">
                                                {uc.outcome}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* G. Business Outcomes */}
                            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-cyan-50/60 border border-emerald-200/80 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                                    <span>Strategic Commercial Outcomes</span>
                                </div>
                                <p className="text-sm font-bold text-slate-800 leading-relaxed">
                                    {activeVertical.businessOutcomes.summary}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                                    {activeVertical.businessOutcomes.points.map((pt, pIdx) => (
                                        <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/70 border border-emerald-100 p-2 rounded-lg">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                            <span>{pt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* H. Relevant Offerings & I. Action CTAs */}
                            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-500">Related Offerings:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeVertical.relevantOfferings.map((rel, rIdx) => (
                                            <Link
                                                key={rIdx}
                                                to={rel.path}
                                                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                                            >
                                                {rel.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => openLongForm({ service: `${activeVertical.name} Consultation` })}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-xs shadow-sm transition-all"
                                    >
                                        <PhoneCall className="w-3.5 h-3.5" />
                                        <span>Discuss Your Growth Challenges</span>
                                    </button>

                                    <Link
                                        to={activeVertical.capabilities[0]?.linkPath || "/solutions"}
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                                    >
                                        <span>Explore Solutions</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT-SIDE VERTICAL NAVIGATION PANEL (~32% width on desktop, sticky) */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-28 space-y-3">
                            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-2">
                                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                                        GROWTH VERTICALS
                                    </span>
                                    <span className="text-xs font-bold text-primary font-mono">
                                        0{solutionsVerticalsData.length} TOTAL
                                    </span>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                    {solutionsVerticalsData.map((vert) => {
                                        const isSelected = vert.id === activeVerticalId;
                                        return (
                                            <button
                                                key={vert.id}
                                                onClick={() => handleSelectVertical(vert.id)}
                                                className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border-2 border-[#2878B5] shadow-sm'
                                                        : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                                                        isSelected
                                                            ? 'bg-[#2878B5] text-white shadow-xs'
                                                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                                                    }`}>
                                                        {vert.number}
                                                    </span>

                                                    <div className="min-w-0">
                                                        <div className={`text-xs sm:text-sm font-bold truncate ${
                                                            isSelected ? 'text-[#1E6297]' : 'text-slate-800 group-hover:text-slate-900'
                                                        }`}>
                                                            {vert.name}
                                                        </div>
                                                        <div className="text-[11px] text-slate-400 truncate">
                                                            {vert.badge}
                                                        </div>
                                                    </div>
                                                </div>

                                                <ChevronRight className={`w-4 h-4 shrink-0 transition-all ${
                                                    isSelected
                                                        ? 'text-[#2878B5] translate-x-0.5'
                                                        : 'text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                                                }`} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Right Panel Quick Action Card */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#071b30] text-white mt-4 space-y-2">
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                                        <Sparkles className="w-3 h-3 text-emerald-400" />
                                        <span>CUSTOM INDUSTRY BLUEPRINT</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-snug">
                                        Need a tailored framework for your specific operational model? Our growth architects can assess your workflows.
                                    </p>
                                    <button
                                        onClick={() => openLongForm({ service: 'Custom Vertical Architecture' })}
                                        className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <span>Request Custom Blueprint</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
