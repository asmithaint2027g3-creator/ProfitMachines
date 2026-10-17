import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, Target, TrendingUp, BarChart3, ShieldCheck, Users, Rocket,
    ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, ChevronRight, HelpCircle, Layers,
    DollarSign, Building2, ShoppingBag, Sparkles, Network, Globe, Clock, Zap,
    FileText, Check, ChevronDown, Info, Sliders, Activity, Scale, Compass, Award
} from 'lucide-react';
import { type OfferingDetailContent } from '../../data/offeringsIntelligenceData';
import { offeringsSupplemental, type StrategySupplementalContent } from '../../data/offeringsSupplementalData';
import { useLeadModal } from '../../context/LeadModalContext';
import StrategyHeroVisual from './StrategyHeroVisual';

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

    // Strategy-specific interactive state for ICP scoring model (B2B Customer Discovery)
    const [icpWeights, setIcpWeights] = useState({
        firmographic: 25,
        problemFit: 25,
        triggers: 20,
        techReadiness: 15,
        commercial: 15
    });

    const isB2B = data.type === 'b2b';
    const activeTab = data.interactiveTabs.find(t => t.id === activeTabId) || data.interactiveTabs[0];
    const activeIcp = data.icpProfiles[activeIcpIndex] || data.icpProfiles[0];

    // Fetch supplemental data for this strategy (SPIN, Frameworks, Performance Table, Related Offerings, Layer 01)
    const supplemental: StrategySupplementalContent | undefined = offeringsSupplemental[data.id];

    const primaryCta = supplemental?.primaryCtaText || "Explore Market Opportunities";
    const secondaryCta = supplemental?.secondaryCtaText || "Talk to an Expert";
    const eyebrowText = supplemental?.eyebrow || `${data.code} • ${isB2B ? 'B2B GROWTH INTELLIGENCE' : 'CONSUMER GROWTH INTELLIGENCE'}`;

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
                    <Link to={isB2B ? "/offerings/b2b" : "/offerings/b2c"} className="hover:text-[#2878B5] transition-colors uppercase tracking-wider text-[11px] font-bold">
                        {isB2B ? 'B2B Profit Pools' : 'B2C Profit Pools'}
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[#2878B5] font-bold">{data.title}</span>
                </nav>
            </div>

            {/* 2. Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#2878B5]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Column: Eyebrow, Title, Description, CTAs */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1EFF8] text-[#1E6297] border border-[#BAE0F8] text-xs font-bold uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2878B5] animate-pulse" />
                                    {eyebrowText}
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F0F7FC] text-[#1E6297] border border-[#E1EFF8] text-xs font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5]" />
                                    {data.code} Verified Strategy
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12] mb-4"
                                style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                                {data.heroHeadline}
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6 max-w-2xl">
                                {data.heroDescription}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => openLongForm({ defaultService: data.title, title: `Consult on ${data.title}` })}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#2878B5]/25 hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <span>{primaryCta}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <Link
                                    to="/book-consultation"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-[#0A2540] font-bold text-sm rounded-xl transition-all shadow-xs"
                                >
                                    <span>{secondaryCta}</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Tailored Strategy Hero Visual */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <StrategyHeroVisual strategyId={data.id} isB2B={isB2B} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. LAYER 01 — MARKET OPPORTUNITY HIGHLIGHT SECTION */}
            {supplemental?.layer01Opportunity && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0A2E5C] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2878B5]/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                    {supplemental.layer01Opportunity.badge}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-3">
                                    {supplemental.layer01Opportunity.headline}
                                </h2>
                                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal mb-3">
                                    {supplemental.layer01Opportunity.copy}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {supplemental.layer01Opportunity.subtext}
                                </p>
                            </div>
                            <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center min-w-[240px]">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                                    Strategic Opportunity Index
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight mb-2">
                                    {supplemental.layer01Opportunity.metric}
                                </div>
                                <Link
                                    to={isB2B ? "/offerings/b2b/market-discovery" : "/offerings/b2c/market-discovery"}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-emerald-200 transition-colors"
                                >
                                    <span>Explore Market Discovery Layer</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. MANDATORY EXACTLY SIX STATISTICAL CARDS */}
            <div id="statistical-cards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                            <BarChart3 className="w-3.5 h-3.5" />
                            Statistical Indicators & Capabilities
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                            {data.title} Key Intelligence Indicators
                        </h2>
                    </div>
                    <div className="text-xs text-slate-500 font-medium bg-white px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
                        <Info className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                        Strategic benchmark models • Configurable to client enterprise data
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.statCards.slice(0, 6).map((card, cIdx) => {
                        const CardIcon = IconMap[card.icon] || BarChart3;
                        const seqNumber = card.sequenceNumber || `0${cIdx + 1}`;
                        const categoryLabel = card.category || (card.badge ? card.badge.toUpperCase() : "INTELLIGENCE INDICATOR");
                        return (
                            <div
                                key={cIdx}
                                className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Sequence Number & Category Header */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-black tracking-wider text-primary font-mono">
                                                {seqNumber}
                                            </span>
                                            <span className="text-slate-300 font-bold">·</span>
                                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                                                {categoryLabel}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <CardIcon className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Indicator Title */}
                                    <h3 className="text-base sm:text-lg font-black text-[#0A2540] tracking-tight mb-2.5 font-heading">
                                        {card.label}
                                    </h3>

                                    {/* One concise sentence explaining indicator's purpose */}
                                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-4">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Metric value & methodology context footer */}
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">
                                        {card.subtitle || card.methodology}
                                    </span>
                                    <span className="text-xs font-black text-primary font-mono ml-2 shrink-0">
                                        {card.value}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-center text-xs text-slate-500 font-medium">
                    Note: Figures above display validated benchmark methodologies and suggested targets. Actual figures deployed are calibrated to your verified enterprise CRM, audit, or research data.
                </div>
            </div>

            {/* 5. BUSINESS PROBLEM & CONTEXT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider mb-3">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                The Core Business Problem
                            </span>
                            <h2 className="text-2xl font-extrabold text-slate-900 font-heading mb-4">
                                Why Traditional Approaches Fail in {data.title}
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed font-normal">
                                {data.businessProblem}
                            </p>
                        </div>
                        <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-primary" />
                                Operational Transformation Delivered
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3.5">
                                {data.whatItAchieves.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/60 text-xs text-slate-800 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. COMPLETE SPIN MATRIX ANALYSIS */}
            {supplemental?.spin && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
                        <div className="max-w-3xl mb-8">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1E6297] border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                                <Scale className="w-3.5 h-3.5" />
                                Diagnostic Framework
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                                Complete SPIN Matrix Analysis
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                                Systematic breakdown of operational friction, systemic costs, and the quantified business payoff.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Situation */}
                            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 relative">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                                        Quadrant 01
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-200/80 text-slate-700">
                                        Situation
                                    </span>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                                    Current Operational Baseline
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    {supplemental.spin.situation}
                                </p>
                            </div>

                            {/* Problem */}
                            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/60 relative">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                                        Quadrant 02
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-100 text-rose-800">
                                        Problem
                                    </span>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                                    Underlying Friction & Latent Gaps
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    {supplemental.spin.problem}
                                </p>
                            </div>

                            {/* Implication */}
                            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 relative">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                                        Quadrant 03
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">
                                        Implication
                                    </span>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                                    Compounding Revenue Impact
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    {supplemental.spin.implication}
                                </p>
                            </div>

                            {/* Need-Payoff */}
                            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 relative">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                                        Quadrant 04
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                        Need-Payoff
                                    </span>
                                </div>
                                <h3 className="text-base font-extrabold text-slate-900 mb-2">
                                    Evidence-Based Solution & ROI
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    {supplemental.spin.needPayoff}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 7. APPLIED FRAMEWORKS & PROFIT POOL CAPTURE POINTS */}
            {supplemental && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Applied Frameworks */}
                        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
                            <div className="mb-6">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                                    Methodological Rigor
                                </span>
                                <h2 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                                    Applied Strategic Frameworks
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                                    Proven analytical structures deployed during advisory execution.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {supplemental.appliedFrameworks.map((fw, fIdx) => (
                                    <div key={fIdx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-primary/40 transition-colors">
                                        <div className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {fw.name}
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal pl-3.5">
                                            {fw.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Profit Pool Capture Points */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-[#0A2540] to-[#1E6297] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 flex flex-col justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[#BAE0F8] text-xs font-bold uppercase tracking-wider mb-4">
                                    <Award className="w-3.5 h-3.5" />
                                    Commercial Objectives
                                </span>
                                <h2 className="text-2xl font-black font-heading text-white tracking-tight mb-4">
                                    Profit Pool Capture Points
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed mb-6">
                                    Specific financial leverage points targeted to maximize enterprise return on intelligence.
                                </p>
                                <div className="space-y-3">
                                    {supplemental.profitPoolCapturePoints.map((pt, pIdx) => (
                                        <div key={pIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-100 font-medium leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{pt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/15 text-[11px] text-slate-300">
                                Captures high-margin revenue through validated demand prior to major resource commitments.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 8. STRATEGY-SPECIFIC DIFFERENTIATED LAYOUT WIDGET */}
            {supplemental?.strategyLayoutType === 'customer' && isB2B && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
                        <div className="max-w-3xl mb-8">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                <Sliders className="w-3.5 h-3.5" />
                                Interactive Scoring Engine
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                                100-Point Configurable ICP Scoring Architecture
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                                Adjust relative weights to align with your enterprise sales motion and compliance criteria.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <label className="text-xs font-bold text-slate-700 block mb-1">Firmographic Fit</label>
                                <div className="text-2xl font-black text-slate-900">{icpWeights.firmographic} pts</div>
                                <span className="text-[11px] text-slate-500">Revenue & Headcount</span>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <label className="text-xs font-bold text-slate-700 block mb-1">Problem Fit</label>
                                <div className="text-2xl font-black text-slate-900">{icpWeights.problemFit} pts</div>
                                <span className="text-[11px] text-slate-500">Documented Pain Point</span>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <label className="text-xs font-bold text-slate-700 block mb-1">Buying Triggers</label>
                                <div className="text-2xl font-black text-slate-900">{icpWeights.triggers} pts</div>
                                <span className="text-[11px] text-slate-500">Leadership / Compliance</span>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <label className="text-xs font-bold text-slate-700 block mb-1">Tech Readiness</label>
                                <div className="text-2xl font-black text-slate-900">{icpWeights.techReadiness} pts</div>
                                <span className="text-[11px] text-slate-500">Cloud & Data Stack</span>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <label className="text-xs font-bold text-slate-700 block mb-1">Commercial Fit</label>
                                <div className="text-2xl font-black text-slate-900">{icpWeights.commercial} pts</div>
                                <span className="text-[11px] text-slate-500">Budget Authority</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 flex items-center justify-between">
                            <span>Total Allocation: <strong>{icpWeights.firmographic + icpWeights.problemFit + icpWeights.triggers + icpWeights.techReadiness + icpWeights.commercial} / 100 points</strong> • Accounts scoring &gt;75 points automatically route to high-touch ABM playbooks.</span>
                            <span className="font-bold text-primary">Audited Standard</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 9. INTERACTIVE FUNCTIONAL TABS */}
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

            {/* 10. CUSTOMER SEGMENTS & DETAILED ICPs / CONSUMER COHORTS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                                {isB2B ? 'Target Account Profiles & ICP' : 'Consumer Cohorts & Demographics'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
                                {isB2B ? 'Validated Enterprise ICP Profiles' : 'High-Propensity Consumer Cohorts'}
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            {data.icpProfiles.map((p, pIdx) => (
                                <button
                                    key={pIdx}
                                    onClick={() => setActiveIcpIndex(pIdx)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        activeIcpIndex === pIdx
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Active ICP Card */}
                    <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                            <div>
                                <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                                    {activeIcp.category}
                                </span>
                                <h3 className="text-xl font-black text-slate-900">
                                    {activeIcp.name}
                                </h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                                    {activeIcp.industryOrContext}
                                </span>
                                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                                    {activeIcp.scaleOrProfile}
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                                    {isB2B ? 'Buying Committee Roles' : 'Consumer Motivation'}
                                </h4>
                                <ul className="space-y-1.5">
                                    {activeIcp.buyerCommitteeOrRoles.map((role, rIdx) => (
                                        <li key={rIdx} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                            <span>{role}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                                    Critical Pain Points
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

                            <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
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
                                    <span>Audit Your Fit for This Profile</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 11. 5-STAGE EXECUTION JOURNEY & DELIVERABLES */}
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

            {/* 12. PERFORMANCE & REVENUE METRICS TABLE */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                                Measurable Revenue Accountability
                            </span>
                            <h2 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                                Performance and Revenue Metrics Table
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                                Explicit operational definitions, baseline benchmarks, targets, and measurement frequencies.
                            </p>
                        </div>
                        <div className="text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                            Client-calibrated baseline models
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                                    <th className="py-3.5 px-4">Category</th>
                                    <th className="py-3.5 px-4">Metric</th>
                                    <th className="py-3.5 px-4">Definition / Measurement Method</th>
                                    <th className="py-3.5 px-4 text-center">Baseline</th>
                                    <th className="py-3.5 px-4 text-center">Target</th>
                                    <th className="py-3.5 px-4 text-right">Cadence</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                {(supplemental?.performanceMetrics || []).map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-slate-900">{row.category}</td>
                                        <td className="py-3.5 px-4 font-semibold text-primary">{row.metric}</td>
                                        <td className="py-3.5 px-4 text-slate-600 max-w-xs">{row.definition}</td>
                                        <td className="py-3.5 px-4 text-center text-slate-500">{row.baseline}</td>
                                        <td className="py-3.5 px-4 text-center font-bold text-emerald-600 bg-emerald-50/40">{row.target}</td>
                                        <td className="py-3.5 px-4 text-right text-slate-500 font-semibold">{row.frequency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 13. RELATED OFFERINGS (CROSS-NAVIGATION) */}
            {supplemental?.relatedOfferings && supplemental.relatedOfferings.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="mb-6">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                            Adjacent Growth Engines
                        </span>
                        <h2 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                            Related Offerings & Strategy Extensions
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {supplemental.relatedOfferings.map((rel, rIdx) => (
                            <Link
                                key={rIdx}
                                to={rel.path}
                                className="group bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-[#2878B5]/50 transition-all flex items-center justify-between"
                            >
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E1EFF8] text-[#1E6297] text-[11px] font-bold mb-2">
                                        {rel.code}
                                    </div>
                                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2878B5] transition-colors mb-1">
                                        {rel.name}
                                    </h3>
                                    <p className="text-xs text-slate-600 font-medium">
                                        {rel.desc}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#2878B5] group-hover:text-white flex items-center justify-center shrink-0 transition-colors ml-4">
                                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 14. FREQUENTLY ASKED QUESTIONS */}
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

            {/* 15. FINAL CONVERSION CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0F3560] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#5CAAE6] text-xs font-bold uppercase tracking-wider mb-4">
                            Strategic Partnership
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black mb-4 font-heading text-white tracking-tight">
                            Ready to identify your next profit opportunity?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 font-medium mb-8 leading-relaxed">
                            Explore how ProfitMachines can help you evaluate your market, validate customer needs and prioritise the right growth opportunities.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => openLongForm({ defaultService: data.title, title: `Consult on ${data.title}` })}
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#2878B5]/25 hover:-translate-y-0.5 cursor-pointer"
                            >
                                <span>Talk to an Expert</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <Link
                                to="/book-consultation"
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-all"
                            >
                                <span>Schedule Strategic Consultation</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
