import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    ChevronLeft, ChevronRight, Pause, Play, ArrowRight,
    TrendingUp, Cpu, Radar, Bot, Sparkles, ShieldCheck,
    Layers, Activity, CheckCircle2, Zap, BarChart3, Database,
    Globe, Network, LineChart, Compass, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';
import { useLeadModal } from '../../context/LeadModalContext';

export interface SliderItem {
    id: string;
    stepNumber: string;
    tag: string;
    pillTitle: string;
    icon: React.ElementType;
    title: string;
    highlightTitle: string;
    description: string;
    stats: {
        value: string;
        label: string;
        sublabel?: string;
    }[];
    highlights: string[];
    image: string;
    fallbackGradient: string;
    badgeText: string;
    primaryCta: {
        text: string;
        link: string;
    };
    secondaryCta: {
        text: string;
        link: string;
    };
}

export const homeSliders: SliderItem[] = [
    {
        id: 'ai-transformation',
        stepNumber: '01',
        tag: 'AI + Business Transformation',
        pillTitle: 'AI Transformation',
        icon: Cpu,
        title: 'Unified AI Strategy &',
        highlightTitle: 'AI + Business Transformation',
        description: 'Architecting cognitive enterprise operations, predictive strategy modeling, and intelligent decision systems that systematically accelerate enterprise ARR velocity.',
        stats: [
            { value: '5.4×', label: 'ARR Velocity', sublabel: 'Continuous Acceleration' },
            { value: '98.4%', label: 'ICP Accuracy', sublabel: 'Predictive Propensity' },
            { value: '99.98%', label: 'SLA Reliability', sublabel: 'Enterprise Uptime' }
        ],
        highlights: [
            'Real-time autonomous decision engine with continuous telemetry',
            'Strategic alignment between boardroom goals and autonomous AI workflows',
            'Algorithmic revenue forecasting with verifiable precision'
        ],
        image: '/images/industry-saas.png',
        fallbackGradient: 'from-[#091D2C] via-[#0F2D44] to-[#2878B5]',
        badgeText: 'AI + Business Transformation Active',
        primaryCta: {
            text: 'Explore Transformation Engine',
            link: '/offerings'
        },
        secondaryCta: {
            text: 'Book Architecture Call',
            link: '/book-consultation'
        }
    },
    {
        id: 'profit-pool-discovery',
        stepNumber: '02',
        tag: 'Profit Pool Discovery',
        pillTitle: 'Profit Pool Discovery',
        icon: Radar,
        title: 'Deep Market Radar &',
        highlightTitle: 'Profit Pool Discovery',
        description: 'Reveal hidden margin pools, untracked TAM, and dark-funnel buying intent weeks before competitors with real-time algorithmic telemetry and opportunity topology.',
        stats: [
            { value: '1,000×', label: 'Market Scanning', sublabel: 'High-Velocity Discovery' },
            { value: '12,480+', label: 'Intent Signals / Hr', sublabel: 'Real-Time Telemetry' },
            { value: '100%', label: 'Dark Funnel', sublabel: 'Comprehensive Visibility' }
        ],
        highlights: [
            'AI-driven buyer propensity and account opportunity mapping',
            'Competitor displacement signals and micro-segment revenue discovery',
            'Automated profit-pool scoring across global vertical markets'
        ],
        image: '/images/hero-profit-pool.png',
        fallbackGradient: 'from-[#091D2C] via-[#0F2D44] to-[#2878B5]',
        badgeText: 'Profit Pool Discovery Telemetry: Active',
        primaryCta: {
            text: 'Launch Demand Radar',
            link: '/demand-pulse'
        },
        secondaryCta: {
            text: 'Discover Hidden TAM',
            link: '/solutions'
        }
    },
    {
        id: 'agentic-automation',
        stepNumber: '03',
        tag: 'Agentic AI & Automation',
        pillTitle: 'Agentic AI Swarms',
        icon: Bot,
        title: 'Intelligent Multi-Agent Mesh &',
        highlightTitle: 'Agentic AI & Automation',
        description: 'Deploy persistent multi-agent swarms that autonomously orchestrate enterprise workflows, qualify high-value pipeline, resolve operational friction, and execute complex business processes 24/7.',
        stats: [
            { value: '3.8×', label: 'Meeting Velocity', sublabel: 'Auto-Booked Pipeline' },
            { value: '80%', label: 'Auto-SQL Sourced', sublabel: 'Zero Manual SDR Drag' },
            { value: '-65%', label: 'Customer CAC', sublabel: 'Radical Efficiency' }
        ],
        highlights: [
            'Hyper-personalized multi-channel email, LinkedIn & voice outreach',
            'Autonomous objection resolution backed by unified knowledge graphs',
            'Instant two-way CRM synchronization & automated calendar routing'
        ],
        image: '/images/demand-pulse-dashboard.png',
        fallbackGradient: 'from-[#091D2C] via-[#0F2D44] to-[#2878B5]',
        badgeText: 'Agentic AI & Automation Mesh: 4,812 Active Swarms',
        primaryCta: {
            text: 'Deploy AI Agent Mesh',
            link: '/solutions'
        },
        secondaryCta: {
            text: 'Schedule Agent Demo',
            link: '/book-consultation'
        }
    },
    {
        id: 'revenue-acceleration',
        stepNumber: '04',
        tag: 'Sales & Revenue Acceleration',
        pillTitle: 'Revenue Acceleration',
        icon: LineChart,
        title: 'Real-Time Telemetry &',
        highlightTitle: 'Sales & Revenue Acceleration',
        description: 'Eliminate pipeline friction with intelligent funnel diagnostics, predictive deal scoring, dynamic objection handling, and automated revenue velocity triggers.',
        stats: [
            { value: '+185%', label: 'Pipeline Yield', sublabel: 'Full-Funnel Conversion' },
            { value: '$1.4M+', label: 'Recovered ARR', sublabel: 'Leakage Prevention' },
            { value: '45ms', label: 'Decision Latency', sublabel: 'Real-Time Scoring' }
        ],
        highlights: [
            'Algorithmic deal slippage detection and instant recovery interventions',
            'Full-funnel multi-touch revenue attribution and conversion radar',
            'Self-healing CRM data fabric with automated contact enrichment'
        ],
        image: '/images/hero-revenue-acceleration.png',
        fallbackGradient: 'from-[#091D2C] via-[#0F2D44] to-[#2878B5]',
        badgeText: 'Sales & Revenue Acceleration Engine: Active',
        primaryCta: {
            text: 'Accelerate Revenue',
            link: '/offerings'
        },
        secondaryCta: {
            text: 'Run Revenue Leak Audit',
            link: '/hidden-revenue-capture'
        }
    },
    {
        id: 'data-intelligence',
        stepNumber: '05',
        tag: 'Digital & Data Intelligence',
        pillTitle: 'Data Intelligence',
        icon: Database,
        title: 'Enterprise Data Fabric &',
        highlightTitle: 'Digital & Data Intelligence',
        description: 'Unify disparate cloud databases, CRM streams, and operational systems into a real-time predictive intelligence engine powered by connected neural knowledge graphs.',
        stats: [
            { value: '4,500+', label: 'Active Pipelines', sublabel: 'Connected Systems' },
            { value: '98%', label: 'Forecast Accuracy', sublabel: 'Neural Prediction' },
            { value: '<12ms', label: 'Telemetry Latency', sublabel: 'Sub-Second Response' }
        ],
        highlights: [
            'Bidirectional connectors for Salesforce, HubSpot, Snowflake & ERPs',
            'Real-time anomaly detection and predictive customer churn signals',
            'Unified data lakehouse with zero-trust sandboxing and role access'
        ],
        image: '/images/hero-data-intelligence.png',
        fallbackGradient: 'from-[#091D2C] via-[#0F2D44] to-[#2878B5]',
        badgeText: 'Digital & Data Intelligence Mesh: 4,500+ Streams',
        primaryCta: {
            text: 'Explore Data Intelligence',
            link: '/solutions'
        },
        secondaryCta: {
            text: 'View Architecture Matrix',
            link: '/offerings'
        }
    },
    {
        id: 'end-to-end-transformation',
        stepNumber: '06',
        tag: 'End-to-End Transformation',
        pillTitle: 'Enterprise Advisory',
        icon: ShieldCheck,
        title: 'Strategy, Tech & Operations',
        highlightTitle: 'End-to-End Transformation',
        description: 'Seamlessly integrating strategic business consulting, enterprise AI architecture, autonomous operations, and verified financial outcomes into a unified transformation ecosystem.',
        stats: [
            { value: '300%', label: 'Avg Pipeline Lift', sublabel: 'Verified Outcome' },
            { value: 'SOC 2', label: 'Type II Certified', sublabel: 'Bank-Grade Security' },
            { value: '500+', label: 'Global Clients', sublabel: 'Enterprises & Scale-Ups' }
        ],
        highlights: [
            'End-to-end enterprise delivery model tailored to complex workflows',
            'Full governance compliance with SOC2 Type II, ISO27001 and GDPR',
            'Continuous learning models that compound operational advantages over time'
        ],
        image: '/images/hero-end-to-end-transformation.png',
        fallbackGradient: 'from-[#091D2C] via-[#0F2D44] to-[#2878B5]',
        badgeText: 'End-to-End Transformation Ecosystem: Verified',
        primaryCta: {
            text: 'Start Enterprise Transformation',
            link: '/book-consultation'
        },
        secondaryCta: {
            text: 'Review Proven Outcomes',
            link: '/outcomes'
        }
    }
];

export default function HomeFeatureSlider() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const SLIDE_DURATION = 7000;
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { openQuickForm, openLongForm } = useLeadModal();

    const activeSlide = homeSliders[currentIndex];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % homeSliders.length);
        setProgress(0);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + homeSliders.length) % homeSliders.length);
        setProgress(0);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setProgress(0);
        trackEvent({ eventName: 'HOME_SLIDER_SELECT', label: homeSliders[index].title });
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide();
            else if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Autoplay with progress bar
    useEffect(() => {
        if (!isPlaying) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return;
        }
        const stepTime = 50;
        const stepIncrement = (stepTime / SLIDE_DURATION) * 100;
        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) { nextSlide(); return 0; }
                return prev + stepIncrement;
            });
        }, stepTime);
        return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
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

    return (
        <section
            className="relative w-full min-h-screen flex flex-col overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Executive AI Revenue OS Platform Showcase"
        >
            {/* ── Full-Bleed Background Image with Animated Transitions ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSlide.id + '-bg'}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        <img
                            src={activeSlide.image}
                            alt=""
                            className="w-full h-full object-cover object-right lg:object-[80%_center]"
                            loading="eager"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Left Blur Backdrop: softly blurs the background image behind the text on the left */}
                <div 
                    className="absolute inset-y-0 left-0 w-full lg:w-[60%] backdrop-blur-[8px] pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)'
                    }}
                />

                {/* Left dark gradient for crystal clear text readability, leaving the right side 100% crisp and vibrant */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#040f1a]/95 via-[#040f1a]/75 via-50% to-transparent pointer-events-none" />
                
                {/* Subtle bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040f1a]/80 to-transparent pointer-events-none" />
            </div>

            {/* ── Content Layer ── */}
            <div className="relative z-10 flex flex-col flex-1 justify-between w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-24 sm:pt-28 lg:pt-32 pb-6">

                {/* Hero Content */}
                <div className="flex-1 flex flex-col justify-center py-6 sm:py-8 lg:py-10 max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >

                            {/* Main Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-2 font-heading">
                                {activeSlide.title}
                            </h1>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold italic text-[#5CAAE6] leading-[1.08] tracking-tight mb-6 font-heading">
                                {activeSlide.highlightTitle}.
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl font-normal">
                                {activeSlide.description.split(' ').map((word, i) => {
                                    // Bold key metric words
                                    const bold = ['AI', 'autonomous', 'enterprise', 'predictive', 'real-time', 'pipeline', 'velocity'].includes(word.toLowerCase().replace(/[^a-z-]/g, ''));
                                    return bold
                                        ? <strong key={i} className="text-white font-semibold">{word} </strong>
                                        : <span key={i}>{word} </span>;
                                })}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
                                {/* Primary */}
                                <button
                                    onClick={() => {
                                        trackEvent({ eventName: 'SLIDER_PRIMARY_CTA_CLICK', label: activeSlide.primaryCta.text });
                                        openQuickForm({
                                            defaultService: activeSlide.highlightTitle,
                                            source: `Hero Slider (${activeSlide.tag})`,
                                            title: activeSlide.primaryCta.text
                                        });
                                    }}
                                    className="flex items-center gap-2.5 px-7 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#2878B5]/40 hover:shadow-[#2878B5]/60 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                                >
                                    <Zap className="w-4 h-4" />
                                    <span>{activeSlide.primaryCta.text}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* Secondary */}
                                <Link
                                    to={activeSlide.secondaryCta.link}
                                    onClick={() => trackEvent({ eventName: 'SLIDER_SECONDARY_CTA_CLICK', label: activeSlide.secondaryCta.text })}
                                    className="flex items-center gap-2 px-7 py-3.5 border-2 border-[#2878B5] hover:border-[#5CAAE6] bg-[#0A253D] hover:bg-[#133E60] text-white font-bold text-sm rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    {activeSlide.secondaryCta.text}
                                </Link>

                                {/* Tertiary */}
                                <button
                                    onClick={() => openLongForm({
                                        defaultService: activeSlide.highlightTitle,
                                        source: `Hero Slider Detailed Assessment (${activeSlide.tag})`
                                    })}
                                    className="flex items-center gap-1.5 text-sm text-[#BAE0F8] hover:text-white font-semibold underline underline-offset-4 transition-colors py-1"
                                >
                                    <FileText className="w-3.5 h-3.5" />
                                    Request Institutional Dossier (PDF) →
                                </button>
                            </div>

                            {/* Reference / metadata bar */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/45 font-medium border-t border-white/10 pt-5">
                                <span>Ref: PM-{activeSlide.stepNumber}-2026/001</span>
                                <span>·</span>
                                {activeSlide.stats.map((s, i) => (
                                    <span key={i} className="flex items-center gap-1">
                                        <span className="text-[#5CAAE6] font-bold">{s.value}</span>
                                        <span>{s.label}</span>
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Controls Bar */}
                <div className="pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-white/50">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#5CAAE6]" />
                            <span>SOC2 Type II Aligned</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-[#5CAAE6]" />
                            <span>Global Enterprise Telemetry</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#5CAAE6]" />
                            <span>Fortune 500 & Scale-Up Grade</span>
                        </div>
                    </div>

                    {/* Dots + Nav Controls */}
                    <div className="flex items-center gap-3">
                        {/* Progress dots */}
                        <div className="flex items-center gap-1.5 mr-1">
                            {homeSliders.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    onClick={() => goToSlide(dotIdx)}
                                    className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                                        dotIdx === currentIndex
                                            ? 'w-8 bg-white/20'
                                            : 'w-2 bg-white/25 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                >
                                    {dotIdx === currentIndex && (
                                        <div
                                            className="absolute top-0 bottom-0 left-0 bg-[#5CAAE6] transition-all"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Prev / counter / next */}
                        <div className="flex items-center bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-1 gap-0.5">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
                            >
                                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                            <div className="h-4 w-px bg-white/20 mx-0.5" />
                            <button
                                onClick={prevSlide}
                                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="px-2.5 text-xs font-mono font-bold">
                                <span className="text-[#5CAAE6]">{activeSlide.stepNumber}</span>
                                <span className="text-white/30"> / </span>
                                <span className="text-white">0{homeSliders.length}</span>
                            </div>
                            <button
                                onClick={nextSlide}
                                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
