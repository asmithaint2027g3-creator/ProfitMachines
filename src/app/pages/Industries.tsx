import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Target,
    TrendingUp,
    Bot,
    Zap,
    ShieldCheck,
    Sparkles,
    Landmark,
    Coins,
    Search,
    Factory,
    Workflow,
    HeartPulse,
    Users,
    ShoppingBag,
    Home,
    Calendar,
    GraduationCap,
    Briefcase,
    Layers,
    AlertTriangle,
    ChevronRight,
    Building2,
    Compass,
    SlidersHorizontal,
    PhoneCall
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { useLeadModal } from '../context/LeadModalContext';
import { industriesData, industryCategories, IndustryBlueprint } from '../data/industriesData';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

// Helper icon resolver for dynamic solution cards
const SolutionIcon = ({ name, className = "w-4 h-4" }: { name: string; className?: string }) => {
    switch (name) {
        case 'Target': return <Target className={className} />;
        case 'Bot': return <Bot className={className} />;
        case 'TrendingUp': return <TrendingUp className={className} />;
        case 'Zap': return <Zap className={className} />;
        case 'ShieldCheck': return <ShieldCheck className={className} />;
        case 'Sparkles': return <Sparkles className={className} />;
        case 'Search': return <Search className={className} />;
        case 'Landmark': return <Landmark className={className} />;
        case 'Coins': return <Coins className={className} />;
        case 'Factory': return <Factory className={className} />;
        case 'Workflow': return <Workflow className={className} />;
        case 'HeartPulse': return <HeartPulse className={className} />;
        case 'Users': return <Users className={className} />;
        case 'ShoppingBag': return <ShoppingBag className={className} />;
        case 'Home': return <Home className={className} />;
        case 'Calendar': return <Calendar className={className} />;
        case 'GraduationCap': return <GraduationCap className={className} />;
        case 'Briefcase': return <Briefcase className={className} />;
        default: return <Zap className={className} />;
    }
};

export default function Industries() {
    const location = useLocation();
    const { openLongForm } = useLeadModal();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Handle deep-linking hashes and search queries
    useEffect(() => {
        const hash = location.hash ? location.hash.replace('#', '').toLowerCase() : '';
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category')?.toLowerCase();
        const industryParam = params.get('industry')?.toLowerCase();
        const sectionParam = params.get('section')?.toLowerCase();

        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }

        const targetIdentifier = hash || industryParam || sectionParam;
        if (targetIdentifier) {
            // Check if matches a category
            const matchingCat = industryCategories.find(c => c.id === targetIdentifier);
            if (matchingCat) {
                setSelectedCategory(matchingCat.id);
            } else {
                // Ensure target industry is visible even if filtered
                const matchingInd = industriesData.find(ind =>
                    ind.slugId === targetIdentifier ||
                    ind.id === targetIdentifier ||
                    ind.aliases.includes(targetIdentifier)
                );
                if (matchingInd) {
                    setSelectedCategory('all');
                }
            }

            // Scroll to element after render
            setTimeout(() => {
                const element = document.getElementById(targetIdentifier);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 200);
        }
    }, [location.hash, location.search]);

    // Filter industries based on active category
    const filteredIndustries = useMemo(() => {
        if (selectedCategory === 'all') return industriesData;
        return industriesData.filter(ind => ind.category === selectedCategory);
    }, [selectedCategory]);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        // Scroll slightly down to directory header if currently above it
        const dirEl = document.getElementById('industries-list');
        if (dirEl) {
            const rect = dirEl.getBoundingClientRect();
            if (rect.top < 0 || rect.top > window.innerHeight) {
                dirEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-emerald-100 composition-layer">

            {/* ── SECTION ONE: HERO ── */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-900 via-[#071b30] to-slate-950 text-white border-b border-slate-800">
                {/* Background ambient lighting */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]" />
                    <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[160px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        {/* Hero Left: Copy & Actions */}
                        <div className="lg:col-span-7 space-y-6">
                            <Reveal width="100%">
                                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>INDUSTRY-SPECIFIC GROWTH INTELLIGENCE</span>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-slate-300 font-mono">10 SECTOR ARCHITECTURES</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading mt-3">
                                    Turn Industry Challenges into{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                                        Profitable Growth.
                                    </span>
                                </h1>

                                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mt-5">
                                    Every industry faces different challenges in acquiring customers, converting demand, managing costs, and scaling operations. ProfitMachines helps businesses identify growth opportunities, improve commercial performance, and build more profitable operating models through data-driven intelligence and automation.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 pt-4">
                                    <a
                                        href="#industries-list"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        <span>Explore Industries</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>

                                    <button
                                        onClick={() => openLongForm({ service: 'Industry Growth Consultation' })}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all duration-200"
                                    >
                                        <PhoneCall className="w-4 h-4 text-emerald-400" />
                                        <span>Book a Growth Consultation</span>
                                    </button>

                                    <Link
                                        to="/solutions"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2 px-1"
                                    >
                                        <span>Explore Our Solutions</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        {/* Hero Right: TrustGrid-Style Showcase Aside Card */}
                        <div className="lg:col-span-5">
                            <Reveal width="100%" delay={0.2}>
                                <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl relative group">
                                    {/* Preview Banner Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                                        <img
                                            src="/images/hero-profit-pool.png"
                                            alt="ProfitMachines Industry Architecture Showcase"
                                            className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                                        
                                        {/* Status Chip */}
                                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                                VERIFIED COMMERCIAL IMPACT
                                            </span>
                                            <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded-md">
                                                10 BLUEPRINTS
                                            </span>
                                        </div>
                                    </div>

                                    {/* Capability Pills Stack */}
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-xs font-bold text-white truncate">B2B Services & Enterprise SaaS</h4>
                                                <p className="text-[11px] text-slate-400 truncate">Account-Based Autopilot & Deal Velocity Lift</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                                            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-xs font-bold text-white truncate">Banking, FinTech & Healthcare</h4>
                                                <p className="text-[11px] text-slate-400 truncate">Compliant Patient & Borrower Intake Acceleration</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                                            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-xs font-bold text-white truncate">Manufacturing, Logistics & Retail</h4>
                                                <p className="text-[11px] text-slate-400 truncate">OEM-Dealer Alignment & Dynamic Offer Capture</p>
                                            </div>
                                        </div>

                                        {/* Card Footer Telemetry */}
                                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                            <div>
                                                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span>10 Production Blueprints</span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-mono">Turnkey Revenue Frameworks</span>
                                            </div>
                                            <a
                                                href="#industries-list"
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                                            >
                                                <span>Explore</span>
                                                <ArrowRight className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                    </div>
                </div>
            </section>


            {/* ── SECTION TWO: INDUSTRY DIRECTORY ── */}
            <section id="industries-list" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
                <Reveal width="100%">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-3">
                            <Compass className="w-3.5 h-3.5" />
                            <span>INDUSTRY DIRECTORY</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                            Explore Growth Opportunities Across Industries.
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
                            Discover how ProfitMachines can help businesses in different sectors attract customers, improve conversion, strengthen operations, and increase profitability.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-500">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Showing {filteredIndustries.length} of {industriesData.length} Industry Blueprints</span>
                        </div>
                    </div>

                    {/* Interactive Category Filter Pills */}
                    <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
                        {industryCategories.map((cat) => {
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer ${
                                        isSelected
                                            ? 'bg-[#2878B5] text-white border-[#2878B5] shadow-md shadow-emerald-700/20 scale-105'
                                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Reset Filter Button if narrowed */}
                {selectedCategory !== 'all' && (
                    <div className="flex items-center justify-center mt-4">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-emerald-800 underline underline-offset-4"
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span>View All 10 Industries</span>
                        </button>
                    </div>
                )}
            </section>


            {/* ── SECTION THREE: INDUSTRY-SPECIFIC DEEP SECTIONS ── */}
            <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                {filteredIndustries.map((ind, index) => {
                    const firstSolution = ind.solutions[0];
                    return (
                        <div
                            key={ind.id}
                            id={ind.slugId}
                            className="scroll-mt-28"
                        >
                            {/* Render hidden anchors for aliases to preserve old URL fragments */}
                            {ind.aliases.map(alias => (
                                <div key={alias} id={alias} className="scroll-mt-28" />
                            ))}

                            <Reveal width="100%" delay={index % 2 === 0 ? 0.05 : 0.1}>
                                <div className="rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
                                    
                                    {/* Top decorative gradient bar */}
                                    <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500" />

                                    <div className="p-6 sm:p-10 lg:p-12 space-y-8">

                                        {/* A, B, C, D: Header & Statistical KPI Row */}
                                        <div className="grid lg:grid-cols-12 gap-8 items-start border-b border-slate-100 pb-8">
                                            
                                            {/* Left: Category Badge, Heading, Tagline */}
                                            <div className="lg:col-span-6 space-y-3">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E6297] text-xs font-bold tracking-wider uppercase font-mono">
                                                    <span>{ind.badge}</span>
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug font-heading">
                                                    {ind.title}
                                                </h3>
                                                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                                                    {ind.tagline}
                                                </p>
                                            </div>

                                            {/* Right: Three Statistical Cards Row */}
                                            <div className="lg:col-span-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    {ind.kpis.map((kpi, kIdx) => (
                                                        <div
                                                            key={kIdx}
                                                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors flex flex-col justify-between"
                                                        >
                                                            <div>
                                                                <div className="text-2xl sm:text-3xl font-black text-[#2878B5] tracking-tight">
                                                                    {kpi.value}
                                                                </div>
                                                                <div className="text-xs font-bold text-slate-900 mt-1 leading-tight">
                                                                    {kpi.label}
                                                                </div>
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 mt-2 leading-snug">
                                                                {kpi.desc}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-slate-400 text-right mt-2 font-mono">
                                                    * Representative benchmark metrics based on industry performance models.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Industry Overview Description */}
                                        <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-5 sm:p-6">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Sector Business Environment</h4>
                                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                                                {ind.description}
                                            </p>
                                        </div>

                                        {/* E. 5-Step Methodology Strip (Mirroring TrustGrid reference) */}
                                        <div className="py-2.5 px-4 rounded-xl bg-slate-100/70 border border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-700 overflow-x-auto shadow-xs gap-3">
                                            <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-950 font-bold shrink-0">
                                                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">1</span>
                                                Industry Dynamics
                                            </span>
                                            <span className="text-slate-400 font-bold shrink-0">→</span>
                                            <span className="flex items-center gap-1.5 whitespace-nowrap text-amber-900 font-bold shrink-0">
                                                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">2</span>
                                                Commercial Challenge
                                            </span>
                                            <span className="text-slate-400 font-bold shrink-0">→</span>
                                            <span className="flex items-center gap-1.5 whitespace-nowrap text-teal-900 font-bold shrink-0">
                                                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-bold">3</span>
                                                Growth Architecture
                                            </span>
                                            <span className="text-slate-400 font-bold shrink-0">→</span>
                                            <span className="flex items-center gap-1.5 whitespace-nowrap text-cyan-900 font-bold shrink-0">
                                                <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-[10px] font-bold">4</span>
                                                ProfitMachines Solution
                                            </span>
                                            <span className="text-slate-400 font-bold shrink-0">→</span>
                                            <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-900 font-bold shrink-0">
                                                <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[10px] font-bold">5</span>
                                                Business Outcome
                                            </span>
                                        </div>

                                        {/* F. Split Layout: Challenges & Methodologies (Left) vs Solutions (Right) */}
                                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                                            
                                            {/* Left Column: Business Challenges + Methodologies */}
                                            <div className="lg:col-span-5 space-y-6">
                                                
                                                {/* Business Challenges Box */}
                                                <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/40 border border-amber-200/60">
                                                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-4">
                                                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                                                        <span>Sector Challenges & Commercial Friction</span>
                                                    </div>
                                                    <ul className="space-y-3">
                                                        {ind.challenges.map((challenge, cIdx) => (
                                                            <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                                                <span>{challenge}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Methodologies Box */}
                                                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                                                    <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider mb-3">
                                                        <TrendingUp className="w-4 h-4 text-primary" />
                                                        <span>Applied Growth Methodologies</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ind.methodologies.map((method, mIdx) => (
                                                            <span
                                                                key={mIdx}
                                                                className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-xs"
                                                            >
                                                                {method}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Right Column: ProfitMachines Solutions */}
                                            <div className="lg:col-span-7 space-y-4">
                                                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider mb-2">
                                                    <Layers className="w-4 h-4 text-primary" />
                                                    <span>ProfitMachines Solution Deployments</span>
                                                </div>

                                                <div className="space-y-4">
                                                    {ind.solutions.map((sol, sIdx) => (
                                                        <div
                                                            key={sIdx}
                                                            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all duration-200"
                                                        >
                                                            <div className="flex items-center justify-between gap-3 mb-3">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#2878B5] flex items-center justify-center shrink-0 border border-emerald-100">
                                                                        <SolutionIcon name={sol.iconName} className="w-4 h-4" />
                                                                    </div>
                                                                    <h5 className="text-sm font-bold text-slate-900">
                                                                        {sol.title}
                                                                    </h5>
                                                                </div>
                                                                <Link
                                                                    to={sol.linkPath}
                                                                    className="text-xs font-bold text-primary hover:text-emerald-800 flex items-center gap-1 shrink-0"
                                                                >
                                                                    <span>Deploy</span>
                                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                                </Link>
                                                            </div>

                                                            <ul className="space-y-2 pl-9">
                                                                {sol.modules.map((mod, modIdx) => (
                                                                    <li key={modIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                                                        <span>{mod}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>

                                        {/* G. Business Outcome Box */}
                                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/60 to-cyan-50/60 border border-emerald-200/80 flex items-start sm:items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                                                    Commercial Impact & Value Realization
                                                </div>
                                                <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 leading-relaxed">
                                                    {ind.outcome}
                                                </p>
                                            </div>
                                        </div>

                                        {/* H. Action CTAs Footer */}
                                        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => openLongForm({ service: `${ind.categoryLabel} Architecture` })}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-xs shadow-sm transition-all"
                                                >
                                                    <PhoneCall className="w-3.5 h-3.5" />
                                                    <span>Discuss Your Industry</span>
                                                </button>

                                                <Link
                                                    to={firstSolution.linkPath}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                                                >
                                                    <span>Explore Relevant Solutions</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>

                                            <span className="text-[11px] font-mono text-slate-400">
                                                REF: {ind.slugId.toUpperCase()}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    );
                })}
            </section>


            {/* ── SECTION FIVE: FINAL CONVERSION SECTION ── */}
            <section className="relative overflow-hidden bg-white border-t border-slate-200/80 py-20 lg:py-28">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1E6297] text-xs font-bold tracking-wider uppercase mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>YOUR INDUSTRY. YOUR GROWTH OPPORTUNITY.</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
                            Build a More Profitable Growth Strategy.
                        </h2>

                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
                            Identify the right opportunities, improve customer acquisition, strengthen conversion, and uncover ways to operate more efficiently with a growth strategy tailored to your business.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                            <button
                                onClick={() => openLongForm({ service: 'Enterprise Industry Diagnostic' })}
                                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm shadow-xl shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>Book a Growth Consultation</span>
                            </button>

                            <Link
                                to="/solutions"
                                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-colors"
                            >
                                <span>Explore ProfitMachines Solutions</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* In-page direct lead generation banner */}
            <ContextualCtaSection
                badge="INDUSTRY-SPECIFIC GROWTH ENGINE"
                title="Accelerate Your Commercial Performance"
                subtitle="Schedule a consultation with our growth architects to map your industry profit pool, identify unserved demand, and deploy automated revenue systems."
                industryContext="Industry Deep-Dive"
            />

        </div>
    );
}
