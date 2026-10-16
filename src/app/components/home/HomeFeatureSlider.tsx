import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    ChevronLeft, ChevronRight, ArrowRight,
    Cpu, Radar, Bot, Database, LineChart,
    Zap, Target, Network, ShieldCheck, Globe,
    Activity, BarChart3, Layers, Server,
    CheckCircle2, TrendingUp, Search, GitMerge,
    AlertTriangle, Link2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';
import { useLeadModal } from '../../context/LeadModalContext';

// ─────────────────────────────────────────────────────────────
//  TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────
interface SlideFeature {
    icon: React.ElementType;
    text: string;
}

interface SlideMetric {
    value: string;
    label: string;
    sublabel: string;
}

export interface SliderItem {
    id: string;
    stepNumber: string;
    eyebrow: string;
    icon: React.ElementType;
    title: string;
    description: string;
    features: SlideFeature[];
    metrics: SlideMetric[];
    image: string;
    imageAlt: string;
    primaryCta: { text: string; link: string; isInternal: boolean };
    secondaryCta: { text: string; link: string; isInternal: boolean };
}

// ─────────────────────────────────────────────────────────────
//  SLIDE DATA — EXACTLY 5 SLIDES
// ─────────────────────────────────────────────────────────────
export const homeSliders: SliderItem[] = [
    {
        id: 'ai-transformation',
        stepNumber: '01',
        eyebrow: 'ENTERPRISE AI STRATEGY',
        icon: Cpu,
        title: 'Unified AI Strategy & AI + Business Transformation',
        description:
            'Architecting cognitive enterprise operations, predictive strategy modeling, and intelligent decision systems that systematically accelerate enterprise ARR velocity.',
        features: [
            { icon: Zap,         text: 'Real-time autonomous decision engine with continuous telemetry' },
            { icon: Target,      text: 'Strategic alignment between boardroom goals and autonomous AI workflows' },
            { icon: TrendingUp,  text: 'Algorithmic revenue forecasting with verifiable precision' },
        ],
        metrics: [
            { value: '5.4×',   label: 'ARR Velocity',    sublabel: 'Continuous Acceleration' },
            { value: '98.4%',  label: 'ICP Accuracy',    sublabel: 'Predictive Propensity' },
            { value: '99.98%', label: 'SLA Reliability', sublabel: 'Enterprise Uptime' },
        ],
        image: '/images/hero-ai-transformation.png',
        imageAlt: 'Abstract enterprise AI intelligence architecture with connected data nodes and neural network layers',
        primaryCta:   { text: 'Explore Transformation Engines', link: '/offerings',          isInternal: true },
        secondaryCta: { text: 'Book Architecture Call',          link: '/book-consultation',  isInternal: true },
    },
    {
        id: 'profit-pool-discovery',
        stepNumber: '02',
        eyebrow: 'MARKET INTELLIGENCE',
        icon: Radar,
        title: 'Deep Market Radar & Profit Pool Discovery',
        description:
            'Reveal hidden margin pools, untracked TAM, and dark-funnel buying intent weeks before competitors with real-time algorithmic telemetry and opportunity topology.',
        features: [
            { icon: Search,      text: 'AI-driven buyer propensity and account opportunity mapping' },
            { icon: AlertTriangle, text: 'Competitor displacement signals and micro-segment revenue discovery' },
            { icon: BarChart3,   text: 'Automated profit-pool scoring across global vertical markets' },
        ],
        metrics: [
            { value: '1,000×',   label: 'Market Scanning',      sublabel: 'High-Velocity Discovery' },
            { value: '12,480+',  label: 'Intent Signals / Hr',  sublabel: 'Real-Time Telemetry' },
            { value: '100%',     label: 'Dark Funnel',          sublabel: 'Comprehensive Visibility' },
        ],
        image: '/images/hero-profit-pool.png',
        imageAlt: 'Abstract geographic revenue opportunity map with connected market segments and revenue clusters',
        primaryCta:   { text: 'Launch Demand Radar',  link: '/demand-pulse', isInternal: true },
        secondaryCta: { text: 'Discover Hidden TAM',  link: '/solutions',    isInternal: true },
    },
    {
        id: 'agentic-automation',
        stepNumber: '03',
        eyebrow: 'AUTONOMOUS OPERATIONS',
        icon: Bot,
        title: 'Intelligent Multi-Agent Mesh & Agentic AI & Automation',
        description:
            'Deploy persistent multi-agent swarms that autonomously orchestrate enterprise workflows, qualify high-value pipeline, resolve operational friction, and execute complex business processes 24/7.',
        features: [
            { icon: Network,     text: 'Hyper-personalized multi-channel email, LinkedIn & voice outreach' },
            { icon: GitMerge,    text: 'Autonomous objection resolution backed by unified knowledge graphs' },
            { icon: Link2,       text: 'Instant two-way CRM synchronization & automated calendar routing' },
        ],
        metrics: [
            { value: '3.8×',  label: 'Meeting Velocity',  sublabel: 'Auto-Booked Pipeline' },
            { value: '80%',   label: 'Auto-SQL Sourced',  sublabel: 'Zero Manual SDR Drag' },
            { value: '-65%',  label: 'Customer CAC',      sublabel: 'Radical Efficiency' },
        ],
        image: '/images/hero-agentic-ai.png',
        imageAlt: 'Abstract multi-agent enterprise workflow visualization with connected software services and orchestration nodes',
        primaryCta:   { text: 'Deploy AI Agent Mesh',   link: '/solutions',        isInternal: true },
        secondaryCta: { text: 'Schedule Agent Demo',    link: '/book-consultation', isInternal: true },
    },
    {
        id: 'revenue-acceleration',
        stepNumber: '04',
        eyebrow: 'REVENUE OPERATIONS',
        icon: LineChart,
        title: 'Real-Time Telemetry & Sales & Revenue Acceleration',
        description:
            'Eliminate pipeline friction with intelligent funnel diagnostics, predictive deal scoring, dynamic objection handling, and automated revenue velocity triggers.',
        features: [
            { icon: Activity,    text: 'Algorithmic deal slippage detection and instant recovery interventions' },
            { icon: BarChart3,   text: 'Full-funnel multi-touch revenue attribution and conversion radar' },
            { icon: Server,      text: 'Self-healing CRM data fabric with automated contact enrichment' },
        ],
        metrics: [
            { value: '+185%',  label: 'Pipeline Yield',   sublabel: 'Full-Funnel Conversion' },
            { value: '$1.4M+', label: 'Recovered ARR',    sublabel: 'Leakage Prevention' },
            { value: '45ms',   label: 'Decision Latency', sublabel: 'Real-Time Scoring' },
        ],
        image: '/images/hero-revenue-acceleration.png',
        imageAlt: 'Clean sales funnel visualization with revenue trend charts, pipeline stages and abstract deal-scoring indicators',
        primaryCta:   { text: 'Accelerate Revenue',       link: '/offerings',               isInternal: true },
        secondaryCta: { text: 'Run Revenue Leak Audit',   link: '/hidden-revenue-capture',  isInternal: true },
    },
    {
        id: 'data-intelligence',
        stepNumber: '05',
        eyebrow: 'ENTERPRISE DATA INTELLIGENCE',
        icon: Database,
        title: 'Enterprise Data Fabric & Digital & Data Intelligence',
        description:
            'Unify disparate cloud databases, CRM streams, and operational systems into a real-time predictive intelligence engine powered by connected neural knowledge graphs.',
        features: [
            { icon: Layers,      text: 'Bidirectional connectors for Salesforce, HubSpot, Snowflake & ERPs' },
            { icon: ShieldCheck, text: 'Real-time anomaly detection and predictive customer churn signals' },
            { icon: Globe,       text: 'Unified data lakehouse with zero-trust sandboxing and role access' },
        ],
        metrics: [
            { value: '4,500+', label: 'Active Pipelines',   sublabel: 'Connected Systems' },
            { value: '98%',    label: 'Forecast Accuracy',  sublabel: 'Neural Prediction' },
            { value: '<12ms',  label: 'Telemetry Latency',  sublabel: 'Sub-Second Response' },
        ],
        image: '/images/hero-data-intelligence.png',
        imageAlt: 'Premium enterprise data architecture visualization with cloud infrastructure layers, connected databases and data pipelines',
        primaryCta:   { text: 'Explore Data Intelligence', link: '/solutions',  isInternal: true },
        secondaryCta: { text: 'View Architecture Matrix',  link: '/offerings',  isInternal: true },
    },
];

// ─────────────────────────────────────────────────────────────
//  CTA BUTTON HELPER
// ─────────────────────────────────────────────────────────────
function CtaButton({
    cta, variant, onClick
}: {
    cta: { text: string; link: string; isInternal: boolean };
    variant: 'primary' | 'secondary';
    onClick?: () => void;
}) {
    const baseClass = variant === 'primary'
        ? 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#2878B5] hover:bg-[#1E6297] text-white shadow-lg shadow-[#2878B5]/30 hover:shadow-[#2878B5]/50 transition-all duration-200 hover:-translate-y-0.5 group'
        : 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border-2 border-slate-300 hover:border-[#2878B5] text-slate-700 hover:text-[#2878B5] bg-white/80 hover:bg-blue-50/80 transition-all duration-200 hover:-translate-y-0.5';

    const inner = (
        <>
            <span>{cta.text}</span>
            {variant === 'primary' && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
        </>
    );

    if (cta.isInternal) {
        return (
            <Link to={cta.link} className={baseClass} onClick={onClick}>
                {inner}
            </Link>
        );
    }
    return (
        <a href={cta.link} className={baseClass} target="_blank" rel="noopener noreferrer" onClick={onClick}>
            {inner}
        </a>
    );
}

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function HomeFeatureSlider() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const SLIDE_DURATION = 7000;
    const progressRef = useRef<NodeJS.Timeout | null>(null);
    const { openQuickForm } = useLeadModal();

    const slide = homeSliders[currentIndex];

    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % homeSliders.length);
        setProgress(0);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + homeSliders.length) % homeSliders.length);
        setProgress(0);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setProgress(0);
        trackEvent({ eventName: 'HOME_SLIDER_SELECT', label: homeSliders[index].title });
    };

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide();
            else if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [nextSlide, prevSlide]);

    // Autoplay with progress
    useEffect(() => {
        if (!isPlaying) {
            if (progressRef.current) clearInterval(progressRef.current);
            return;
        }
        const stepMs = 50;
        const stepInc = (stepMs / SLIDE_DURATION) * 100;
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { nextSlide(); return 0; }
                return prev + stepInc;
            });
        }, stepMs);
        return () => { if (progressRef.current) clearInterval(progressRef.current); };
    }, [isPlaying, nextSlide, currentIndex]);

    // Touch swipe
    const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (diff > 45) nextSlide();
        else if (diff < -45) prevSlide();
        setTouchStartX(null);
    };

    const SlideIcon = slide.icon;

    return (
        <section
            className="relative w-full overflow-hidden bg-white"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            aria-label="ProfitMachines AI Platform Offerings Showcase"
        >
            {/* ── Top accent line ── */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2878B5] via-[#1E6297] to-[#5CAAE6] z-20" />

            {/* ── Slide content ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                >
                    {/* ── Two-column layout ── */}
                    <div className="flex flex-col lg:flex-row min-h-[680px] xl:min-h-[720px]">

                        {/* ────────── LEFT: TEXT CONTENT (56-60%) ────────── */}
                        <div className="flex-1 lg:w-[58%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-14 lg:py-16 bg-white">

                            {/* Eyebrow */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                                    <SlideIcon className="w-3.5 h-3.5 text-[#2878B5]" />
                                    <span className="text-xs font-black uppercase tracking-widest text-[#2878B5]">
                                        {slide.eyebrow}
                                    </span>
                                </div>
                                <span className="text-xs font-mono font-bold text-slate-300">
                                    {slide.stepNumber} / 0{homeSliders.length}
                                </span>
                            </div>

                            {/* Headline */}
                            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-5 max-w-2xl">
                                {slide.title.split(' & ').map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {i === 0
                                            ? <span>{part}</span>
                                            : <><span className="text-[#2878B5]"> & {part}</span></>
                                        }
                                        {i < arr.length - 2 && ''}
                                    </React.Fragment>
                                ))}
                            </h2>

                            {/* Description */}
                            <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
                                {slide.description}
                            </p>

                            {/* Feature statements */}
                            <ul className="flex flex-col gap-3 mb-9">
                                {slide.features.map((f, i) => {
                                    const FIcon = f.icon;
                                    return (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center mt-0.5">
                                                <FIcon className="w-3.5 h-3.5 text-[#2878B5]" />
                                            </div>
                                            <span className="text-sm text-slate-700 font-medium leading-snug pt-1">
                                                {f.text}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 mb-9 py-5 border-y border-slate-100">
                                {slide.metrics.map((m, i) => (
                                    <div key={i} className={`text-center ${i < slide.metrics.length - 1 ? 'border-r border-slate-100' : ''}`}>
                                        <div className="text-2xl xl:text-3xl font-black text-[#2878B5] leading-none mb-1">
                                            {m.value}
                                        </div>
                                        <div className="text-xs font-bold text-slate-800 mb-0.5">{m.label}</div>
                                        <div className="text-[10px] text-slate-400 font-medium">{m.sublabel}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <CtaButton
                                    cta={slide.primaryCta}
                                    variant="primary"
                                    onClick={() => {
                                        trackEvent({ eventName: 'SLIDER_PRIMARY_CTA', label: slide.primaryCta.text });
                                        openQuickForm({
                                            defaultService: slide.title,
                                            source: `Offerings Slider — ${slide.eyebrow}`,
                                            title: slide.primaryCta.text,
                                        });
                                    }}
                                />
                                <CtaButton
                                    cta={slide.secondaryCta}
                                    variant="secondary"
                                    onClick={() => trackEvent({ eventName: 'SLIDER_SECONDARY_CTA', label: slide.secondaryCta.text })}
                                />
                            </div>
                        </div>

                        {/* ────────── RIGHT: IMAGE (42-44%) ────────── */}
                        <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden bg-slate-50">
                            {/* Subtle gradient border on the left edge */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent z-10" />

                            {/* Background pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.035]"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #2878B5 1px, transparent 1px)',
                                    backgroundSize: '28px 28px'
                                }}
                            />

                            {/* Image */}
                            <div className="relative w-full h-full flex items-center justify-center p-8 xl:p-10">
                                <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/60">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={slide.id + '-img'}
                                            src={slide.image}
                                            alt={slide.imageAlt}
                                            className="w-full h-full object-cover object-center"
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.97 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            loading="eager"
                                            onError={(e) => {
                                                // Fallback to a gradient on image error
                                                const el = e.currentTarget;
                                                el.style.display = 'none';
                                                const parent = el.parentElement;
                                                if (parent) {
                                                    parent.style.background = 'linear-gradient(135deg, #091D2C 0%, #0F2D44 50%, #2878B5 100%)';
                                                }
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Subtle top overlay for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#091D2C]/10 via-transparent to-[#2878B5]/8 pointer-events-none rounded-2xl" />

                                    {/* Eyebrow badge overlay */}
                                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-sm">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2878B5]">
                                            {slide.eyebrow}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative corner accent */}
                            <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-[#2878B5]/5 blur-xl pointer-events-none" />
                        </div>

                        {/* ── Mobile image (stacked below text) ── */}
                        <div className="lg:hidden w-full h-56 sm:h-72 overflow-hidden relative">
                            <img
                                src={slide.image}
                                alt={slide.imageAlt}
                                className="w-full h-full object-cover object-center"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ─────────────────── NAVIGATION CONTROLS ─────────────────── */}
            <div className="relative z-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-4 flex items-center justify-between gap-4">

                    {/* Left: Slide indicators (clickable) */}
                    <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
                        {homeSliders.map((s, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === currentIndex}
                                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                                onClick={() => goToSlide(i)}
                                className={`relative overflow-hidden rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878B5] ${
                                    i === currentIndex
                                        ? 'h-2.5 w-10 bg-slate-200'
                                        : 'h-2 w-2 bg-slate-200 hover:bg-slate-400'
                                }`}
                            >
                                {i === currentIndex && (
                                    <div
                                        className="absolute top-0 left-0 bottom-0 bg-[#2878B5] rounded-full transition-none"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Center: Active slide title (desktop only) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={slide.id + '-nav-title'}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="text-xs font-semibold text-slate-400 text-center truncate max-w-xs"
                            >
                                {slide.eyebrow}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Right: Prev / Counter / Next */}
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous slide"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-[#2878B5] hover:bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878B5]"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="px-3 text-xs font-mono font-bold select-none">
                            <span className="text-[#2878B5]">{slide.stepNumber}</span>
                            <span className="text-slate-300 mx-1">/</span>
                            <span className="text-slate-600">0{homeSliders.length}</span>
                        </div>

                        <button
                            onClick={nextSlide}
                            aria-label="Next slide"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-[#2878B5] hover:bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2878B5]"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
