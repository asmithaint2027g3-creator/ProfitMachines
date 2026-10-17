import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
    ArrowRight, ChevronRight, ChevronLeft, Workflow,
    Cpu, Radar, Bot, LineChart, Database, Zap, Target,
    TrendingUp, Search, AlertTriangle, BarChart3, Network,
    GitMerge, Link2, Activity, Server, Layers, ShieldCheck, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../../../lib/analytics';
import { useLeadModal } from '../../context/LeadModalContext';

export interface HeroSlideItem {
    id: string;
    stepNumber: string;
    eyebrow: string;
    icon: React.ElementType;
    title: string;
    description: string;
    features: { icon: React.ElementType; text: string }[];
    metrics: { value: string; label: string; sublabel: string }[];
    image: string;
    imageAlt: string;
    primaryCta: { text: string; link: string; isInternal: boolean };
    secondaryCta: { text: string; link: string; isInternal: boolean };
}

export const heroSlides: HeroSlideItem[] = [
    {
        id: 'ai-transformation',
        stepNumber: '01',
        eyebrow: 'PROFITMACHINES | ENTERPRISE AI & DIGITAL TRANSFORMATION',
        icon: Cpu,
        title: 'Unified AI Strategy & AI + Business Transformation',
        description:
            'Architecting cognitive enterprise operations, predictive strategy modeling, and intelligent decision systems that systematically accelerate enterprise ARR velocity.',
        features: [
            { icon: Zap, text: 'Real-time autonomous decision engine with continuous telemetry' },
            { icon: Target, text: 'Strategic alignment between boardroom goals and autonomous AI workflows' },
            { icon: TrendingUp, text: 'Algorithmic revenue forecasting with verifiable precision' },
        ],
        metrics: [
            { value: '5.4×', label: 'ARR Velocity', sublabel: 'Continuous Acceleration' },
            { value: '98.4%', label: 'ICP Accuracy', sublabel: 'Predictive Propensity' },
            { value: '99.98%', label: 'SLA Reliability', sublabel: 'Enterprise Uptime' },
        ],
        image: '/images/hero-ai-transformation.png',
        imageAlt: 'Enterprise AI neural intelligence analytics dashboard with data graphs, revenue curves and zero human faces',
        primaryCta: { text: 'Explore Our Solutions', link: '/solutions', isInternal: true },
        secondaryCta: { text: 'Book a Consultation', link: '/book-consultation', isInternal: true },
    },
    {
        id: 'profit-pool-discovery',
        stepNumber: '02',
        eyebrow: 'PROFITMACHINES | MARKET INTELLIGENCE & DEMAND RADAR',
        icon: Radar,
        title: 'Deep Market Radar & Profit Pool Discovery',
        description:
            'Reveal hidden margin pools, untracked TAM, and dark-funnel buying intent weeks before competitors with real-time algorithmic telemetry and opportunity topology.',
        features: [
            { icon: Search, text: 'AI-driven buyer propensity and account opportunity mapping' },
            { icon: AlertTriangle, text: 'Competitor displacement signals and micro-segment revenue discovery' },
            { icon: BarChart3, text: 'Automated profit-pool scoring across global vertical markets' },
        ],
        metrics: [
            { value: '1,000×', label: 'Market Scanning', sublabel: 'High-Velocity Discovery' },
            { value: '12,480+', label: 'Intent Signals / Hr', sublabel: 'Real-Time Telemetry' },
            { value: '100%', label: 'Dark Funnel', sublabel: 'Comprehensive Visibility' },
        ],
        image: '/images/hero-profit-pool.png',
        imageAlt: 'Geographic market revenue clusters, dark funnel discovery analytics and TAM radar graphs',
        primaryCta: { text: 'Launch Demand Radar', link: '/demand-pulse', isInternal: true },
        secondaryCta: { text: 'Discover Hidden TAM', link: '/solutions', isInternal: true },
    },
    {
        id: 'agentic-automation',
        stepNumber: '03',
        eyebrow: 'PROFITMACHINES | AUTONOMOUS AI & MULTI-AGENT MESH',
        icon: Bot,
        title: 'Intelligent Multi-Agent Mesh & Agentic AI & Automation',
        description:
            'Deploy persistent multi-agent swarms that autonomously orchestrate enterprise workflows, qualify high-value pipeline, resolve operational friction, and execute complex business processes 24/7.',
        features: [
            { icon: Network, text: 'Hyper-personalized multi-channel email, LinkedIn & voice outreach' },
            { icon: GitMerge, text: 'Autonomous objection resolution backed by unified knowledge graphs' },
            { icon: Link2, text: 'Instant two-way CRM synchronization & automated calendar routing' },
        ],
        metrics: [
            { value: '3.8×', label: 'Meeting Velocity', sublabel: 'Auto-Booked Pipeline' },
            { value: '80%', label: 'Auto-SQL Sourced', sublabel: 'Zero Manual SDR Drag' },
            { value: '-65%', label: 'Customer CAC', sublabel: 'Radical Efficiency' },
        ],
        image: '/images/hero-agentic-ai.png',
        imageAlt: 'Interconnected 3D neural mesh topology nodes and autonomous AI workflow pipelines with zero human faces',
        primaryCta: { text: 'Deploy AI Agent Mesh', link: '/solutions', isInternal: true },
        secondaryCta: { text: 'Schedule Agent Demo', link: '/book-consultation', isInternal: true },
    },
    {
        id: 'revenue-acceleration',
        stepNumber: '04',
        eyebrow: 'PROFITMACHINES | REVENUE OPERATIONS & ACCELERATION',
        icon: LineChart,
        title: 'Real-Time Telemetry & Sales & Revenue Acceleration',
        description:
            'Eliminate pipeline friction with intelligent funnel diagnostics, predictive deal scoring, dynamic objection handling, and automated revenue velocity triggers.',
        features: [
            { icon: Activity, text: 'Algorithmic deal slippage detection and instant recovery interventions' },
            { icon: BarChart3, text: 'Full-funnel multi-touch revenue attribution and conversion radar' },
            { icon: Server, text: 'Self-healing CRM data fabric with automated contact enrichment' },
        ],
        metrics: [
            { value: '+185%', label: 'Pipeline Yield', sublabel: 'Full-Funnel Conversion' },
            { value: '$1.4M+', label: 'Recovered ARR', sublabel: 'Leakage Prevention' },
            { value: '45ms', label: 'Decision Latency', sublabel: 'Real-Time Scoring' },
        ],
        image: '/images/hero-revenue-acceleration.png',
        imageAlt: 'Real-time sales velocity graphs, funnel attribution diagnostics and revenue telemetry curves',
        primaryCta: { text: 'Accelerate Revenue', link: '/offerings', isInternal: true },
        secondaryCta: { text: 'Run Revenue Leak Audit', link: '/hidden-revenue-capture', isInternal: true },
    },
    {
        id: 'data-intelligence',
        stepNumber: '05',
        eyebrow: 'PROFITMACHINES | ENTERPRISE DATA FABRIC & CLOUD INTELLIGENCE',
        icon: Database,
        title: 'Enterprise Data Fabric & Digital & Data Intelligence',
        description:
            'Unify disparate cloud databases, CRM streams, and operational systems into a real-time predictive intelligence engine powered by connected neural knowledge graphs.',
        features: [
            { icon: Layers, text: 'Bidirectional connectors for Salesforce, HubSpot, Snowflake & ERPs' },
            { icon: ShieldCheck, text: 'Real-time anomaly detection and predictive customer churn signals' },
            { icon: Globe, text: 'Unified data lakehouse with zero-trust sandboxing and role access' },
        ],
        metrics: [
            { value: '4,500+', label: 'Active Pipelines', sublabel: 'Connected Systems' },
            { value: '98%', label: 'Forecast Accuracy', sublabel: 'Neural Prediction' },
            { value: '<12ms', label: 'Telemetry Latency', sublabel: 'Sub-Second Response' },
        ],
        image: '/images/hero-data-intelligence.png',
        imageAlt: 'Enterprise cloud data fabric architecture with distributed neural pipelines and database nodes',
        primaryCta: { text: 'Explore Data Intelligence', link: '/solutions', isInternal: true },
        secondaryCta: { text: 'View Architecture Matrix', link: '/offerings', isInternal: true },
    },
];

export default function HomepageHero() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    const SLIDE_DURATION = 7500;
    const progressRef = useRef<NodeJS.Timeout | null>(null);
    const { openQuickForm } = useLeadModal();

    const slide = heroSlides[currentIndex];

    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % heroSlides.length);
        setProgress(0);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
        setProgress(0);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setProgress(0);
        trackEvent({ eventName: 'HERO_SLIDER_SELECT', label: heroSlides[index].title });
    };

    // Autoplay timer — slides continuously and automatically
    useEffect(() => {
        const stepMs = 50;
        const stepInc = (stepMs / 5500) * 100;
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + stepInc;
            });
        }, stepMs);

        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [nextSlide, currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide();
            else if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [nextSlide, prevSlide]);

    const SlideIcon = slide.icon;

    return (
        <section 
            className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F4F8FC] to-white border-b border-slate-200/80 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
            aria-label="Enterprise AI and Digital Transformation Solutions"
        >
            {/* Subtle Enterprise Architectural Background Pattern (First Image Style) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div 
                    className="absolute inset-0 opacity-[0.45]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem'
                    }}
                />
                {/* Soft ambient brand blue glows */}
                <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-[#2878B5]/10 rounded-full blur-[130px]" />
                <div className="absolute -bottom-24 left-0 w-[450px] h-[450px] bg-[#60B5FF]/10 rounded-full blur-[110px]" />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* ── Main Two-Column Slide Area ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center min-h-[580px] xl:min-h-[620px]">
                    
                    {/* ── Left Column: Value Proposition, Features, Metrics & CTAs ── */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id + '-content'}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Eyebrow Label with Sequence Counter */}
                                <div className="flex flex-wrap items-center gap-2.5 mb-5 sm:mb-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full bg-[#EBF4FA] border border-[#BAE0F8] text-[#1E6297] text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-xs max-w-full">
                                        <span className="relative flex h-2 w-2 shrink-0">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2878B5] opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2878B5]" />
                                        </span>
                                        <SlideIcon className="w-3.5 h-3.5 text-[#2878B5]" />
                                        <span className="truncate sm:whitespace-normal">
                                            {slide.eyebrow}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                                        {slide.stepNumber} / 0{heroSlides.length}
                                    </span>
                                </div>

                                {/* Main Headline with Brand Gradient Accents */}
                                <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold text-[#0A2540] leading-[1.12] tracking-tight mb-4 sm:mb-5">
                                    {slide.title.split(' & ').map((part, i, arr) => (
                                        <React.Fragment key={i}>
                                            {i === 0 ? (
                                                <span>{part}</span>
                                            ) : (
                                                <span className="text-[#2878B5]"> &amp; {part}</span>
                                            )}
                                            {i < arr.length - 2 && ''}
                                        </React.Fragment>
                                    ))}
                                </h1>

                                {/* Description */}
                                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl font-normal">
                                    {slide.description}
                                </p>

                                {/* Bullet Feature Highlights */}
                                <ul className="flex flex-col gap-2.5 mb-7">
                                    {slide.features.map((f, i) => {
                                        const FIcon = f.icon;
                                        return (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[#EBF4FA] border border-[#BAE0F8]/60 flex items-center justify-center mt-0.5">
                                                    <FIcon className="w-3.5 h-3.5 text-[#2878B5]" />
                                                </div>
                                                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug pt-0.5">
                                                    {f.text}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Verified Performance Metrics Grid */}
                                <div className="grid grid-cols-3 gap-3 mb-8 py-4 border-y border-slate-200/80 bg-white/60 backdrop-blur-xs rounded-xl px-4">
                                    {slide.metrics.map((m, i) => (
                                        <div key={i} className={`text-center ${i < slide.metrics.length - 1 ? 'border-r border-slate-200/80' : ''}`}>
                                            <div className="text-xl sm:text-2xl font-black text-[#2878B5] leading-none mb-1">
                                                {m.value}
                                            </div>
                                            <div className="text-[11px] sm:text-xs font-bold text-slate-800 mb-0.5">{m.label}</div>
                                            <div className="text-[9.5px] sm:text-[10px] text-slate-400 font-medium truncate">{m.sublabel}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5 sm:mb-6">
                                    <Link
                                        to={slide.primaryCta.link}
                                        onClick={() => trackEvent({ eventName: 'HERO_PRIMARY_CTA_CLICK', label: slide.primaryCta.text })}
                                        className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#2878B5]/25 hover:shadow-[#2878B5]/40 transition-all duration-200 hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-[#2878B5] focus:ring-offset-2"
                                    >
                                        <span>{slide.primaryCta.text}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => openQuickForm(slide.title)}
                                        className="inline-flex items-center justify-center px-7 py-4 bg-white hover:bg-slate-50 text-[#0A2540] hover:text-[#2878B5] font-bold text-sm sm:text-base rounded-xl border border-slate-300 hover:border-[#2878B5]/50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2878B5] focus:ring-offset-2"
                                    >
                                        <span>{slide.secondaryCta.text}</span>
                                    </button>
                                </div>

                                {/* Supporting Tagline */}
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-slate-500 tracking-wide">
                                    <span>AI Strategy</span>
                                    <span className="text-slate-300">·</span>
                                    <span>Intelligent Automation</span>
                                    <span className="text-slate-300">·</span>
                                    <span>Enterprise Engineering</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Right Column: High-Tech Enterprise Graph / Analytics Visual (NO Human Faces) ── */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="w-full max-w-lg lg:max-w-none">
                            <div className="relative rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-2xl shadow-slate-300/40 group overflow-hidden">
                                
                                {/* Screen Visual Container */}
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={slide.id + '-img'}
                                            src={slide.image}
                                            alt={slide.imageAlt}
                                            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                            loading="eager"
                                        />
                                    </AnimatePresence>

                                    {/* Subtle edge depth overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 via-transparent to-transparent pointer-events-none" />

                                    {/* Real-time Category Floating Badge */}
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span>Autonomous Telemetry Active</span>
                                    </div>
                                </div>

                                {/* Six-Stage Transformation Journey Bar (First Image Style Footer) */}
                                <div className="mt-3 px-3 py-2.5 bg-slate-50/90 rounded-lg border border-slate-200/70 flex items-center justify-between text-slate-700">
                                    <div className="flex items-center gap-2">
                                        <Workflow className="w-4 h-4 text-[#2878B5] shrink-0" />
                                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                                            Transformation Journey
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10.5px] sm:text-[11px] font-semibold text-[#1E6297]">
                                        <span>Discover</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Diagnose</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Design</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Build</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Scale</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── Slide Navigation Bar (Indicators & Prev/Next) ── */}
                <div className="mt-8 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Left: Interactive Progress Pill Tabs */}
                    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0" role="tablist" aria-label="Hero slide navigation">
                        {heroSlides.map((s, i) => {
                            const isCurrent = i === currentIndex;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => goToSlide(i)}
                                    role="tab"
                                    aria-selected={isCurrent}
                                    className={`relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                        isCurrent 
                                            ? 'bg-white text-[#2878B5] shadow-sm border border-[#BAE0F8]' 
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#2878B5]' : 'bg-slate-300'}`} />
                                    <span>{s.stepNumber}</span>
                                    <span className="hidden md:inline font-semibold text-slate-600">
                                        {s.title.split('&')[0].trim()}
                                    </span>

                                    {/* Progress line under active button */}
                                    {isCurrent && isPlaying && (
                                        <span 
                                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2878B5] rounded-full transition-all duration-75"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Prev / Next Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-mono font-bold text-slate-500 px-1">
                            {slide.stepNumber} / 0{heroSlides.length}
                        </span>
                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
