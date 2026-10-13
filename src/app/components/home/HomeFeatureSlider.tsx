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
        image: '/images/hero-consulting-team.jpg',
        fallbackGradient: 'from-emerald-900/60 via-teal-900/40 to-slate-900/80',
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
        image: '/images/hero-market-radar.jpg',
        fallbackGradient: 'from-teal-900/60 via-emerald-900/40 to-slate-900/80',
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
        image: '/images/hero-agentic-ai.jpg',
        fallbackGradient: 'from-emerald-900/60 via-teal-900/40 to-slate-900/80',
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
        image: '/images/hero-revenue-team.jpg',
        fallbackGradient: 'from-teal-900/60 via-emerald-900/40 to-slate-900/80',
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
        image: '/images/hero-data-strategy.jpg',
        fallbackGradient: 'from-emerald-900/60 via-teal-900/40 to-slate-900/80',
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
        title: 'Strategy, Tech & Operations //',
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
        image: '/images/hero-enterprise-board.jpg',
        fallbackGradient: 'from-teal-900/60 via-emerald-900/40 to-slate-900/80',
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
    const SLIDE_DURATION = 7000; // 7 seconds per slide for relaxed executive reading
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
        trackEvent({
            eventName: 'HOME_SLIDER_SELECT',
            label: homeSliders[index].title
        });
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Autoplay timer with progressive bar
    useEffect(() => {
        if (!isPlaying) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return;
        }

        const stepTime = 50;
        const stepIncrement = (stepTime / SLIDE_DURATION) * 100;

        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + stepIncrement;
            });
        }, stepTime);

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [isPlaying, nextSlide, currentIndex]);

    // Touch Swipe Gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;

        if (diffX > 45) {
            nextSlide();
        } else if (diffX < -45) {
            prevSlide();
        }
        setTouchStartX(null);
    };

    return (
        <section 
            className="pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-24 bg-[#064e3b] text-white relative overflow-hidden border-b border-emerald-500/20"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Executive AI Revenue OS Platform Showcase"
        >
            {/* Ambient Background Glow & Subtle Mesh */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem'
                    }}
                />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400/15 rounded-full blur-[140px] pointer-events-none" />
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* 6-Engine Interactive Selector Strip (Quick Access Pills) */}
                <div className="mb-8 hidden lg:flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-emerald-500/20">
                    {homeSliders.map((slide, sIdx) => {
                        const Icon = slide.icon;
                        const isActive = sIdx === currentIndex;
                        return (
                            <button
                                key={slide.id}
                                onClick={() => goToSlide(sIdx)}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    isActive
                                        ? 'bg-emerald-400 text-[#032b24] shadow-md shadow-emerald-400/20 scale-[1.02]'
                                        : 'text-emerald-100/80 hover:text-white hover:bg-white/10 border border-emerald-400/20'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#032b24]' : 'text-emerald-400'}`} />
                                <span>{slide.stepNumber}</span>
                                <span className="opacity-40">|</span>
                                <span>{slide.pillTitle}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main 2-Column Hero Showcase (Balanced Desktop, Stacked Mobile) */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                        >
                            {/* Left Content Column */}
                            <div className="lg:col-span-6 flex flex-col justify-center">
                                                              {/* Step Tag Pill / Eyebrow with glowing mint pulse dot */}
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase shadow-xs backdrop-blur-md">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] inline-block animate-pulse"></span>
                                        <span className="font-mono text-emerald-300 font-extrabold">{activeSlide.stepNumber}</span>
                                        <span className="text-emerald-400/60 font-normal">·</span>
                                        <span>{activeSlide.tag}</span>
                                    </div>
                                </div>

                                {/* Main Headline (High Contrast White & Mint Highlight with GreenData-style leading) */}
                                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-white leading-[1.12] tracking-tight mb-4 font-heading">
                                    {activeSlide.title}{' '}
                                    <span className="text-emerald-300 italic">
                                        {activeSlide.highlightTitle}
                                    </span>
                                </h1>

                                {/* Supporting Paragraph */}
                                <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-6 font-normal max-w-xl">
                                    {activeSlide.description}
                                </p>

                                {/* Key Highlight Bullet Points */}
                                <div className="space-y-2.5 mb-8">
                                    {activeSlide.highlights.map((highlight, hIdx) => (
                                        <div key={hIdx} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-900/80 border border-emerald-400/60 flex items-center justify-center">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                                            </div>
                                            <span className="text-xs sm:text-sm text-emerald-50 font-medium">
                                                {highlight}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons Group */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                                    {/* Primary CTA (Mint Accent Button with Arrow - GreenData style) */}
                                    <button
                                        onClick={() => {
                                            trackEvent({ eventName: 'SLIDER_PRIMARY_CTA_CLICK', label: activeSlide.primaryCta.text });
                                            openQuickForm({
                                                defaultService: activeSlide.highlightTitle,
                                                source: `Hero Slider (${activeSlide.tag})`,
                                                title: activeSlide.primaryCta.text
                                            });
                                        }}
                                        className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-[#032b24] font-bold px-7 py-3.5 rounded-lg shadow-[0_4px_14px_rgba(52,211,153,0.3)] hover:shadow-[0_6px_20px_rgba(52,211,153,0.45)] text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer hover:-translate-y-0.5"
                                    >
                                        <Zap className="w-4 h-4 text-[#032b24]" />
                                        <span>{activeSlide.primaryCta.text}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    {/* Secondary CTA (Dark Glass Secondary - GreenData style) */}
                                    <Link 
                                        to={activeSlide.secondaryCta.link}
                                        onClick={() => trackEvent({ eventName: 'SLIDER_SECONDARY_CTA_CLICK', label: activeSlide.secondaryCta.text })}
                                        className="w-full sm:w-auto border border-emerald-400/40 hover:border-emerald-300 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white hover:text-emerald-200 font-semibold px-6 py-3.5 rounded-lg text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 text-center hover:-translate-y-0.5"
                                    >
                                        <span>{activeSlide.secondaryCta.text}</span>
                                    </Link>

                                    {/* Detailed Assessment Trigger */}
                                    <button
                                        onClick={() => {
                                            openLongForm({
                                                defaultService: activeSlide.highlightTitle,
                                                source: `Hero Slider Detailed Assessment (${activeSlide.tag})`
                                            });
                                        }}
                                        className="text-xs text-emerald-300/90 hover:text-white underline font-semibold flex items-center justify-center gap-1 sm:ml-2 py-2"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>Detailed Assessment</span>
                                    </button>
                                </div>

                                {/* Hero Meta Strip (Reference Spec - GreenData style) */}
                                <div className="font-mono text-[11px] text-emerald-300/80 flex items-center gap-2 mb-6">
                                    <span>Ref: PM-AI-REV/2026/0{currentIndex + 1} · Autonomous Revenue OS · Verified Enterprise Outcomes</span>
                                </div>

                                {/* Key Metrics Strip (Underneath CTAs, Exactly Like Reference Screenshot) */}
                                <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-400/20 shadow-inner">
                                    {activeSlide.stats.map((stat, sIdx) => (
                                        <div key={sIdx} className="text-left">
                                            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-mono">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs font-bold text-emerald-200/90 leading-tight mt-0.5 uppercase tracking-wide">
                                                {stat.label}
                                            </div>
                                            {stat.sublabel && (
                                                <div className="text-[11px] text-emerald-300/75 font-normal hidden sm:block mt-0.5">
                                                    {stat.sublabel}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Realistic Business Corporate Photography */}
                            <div className="lg:col-span-6 relative">
                                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-emerald-400/30 shadow-2xl bg-emerald-950 group">
                                    
                                    {/* Top Status Bar */}
                                    <div className="bg-[#032b24] px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-teal-400/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80" />
                                        </div>
                                        <div className="text-[11px] font-mono text-emerald-200/90 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span>profitmachines.ai/engine-{activeSlide.stepNumber}</span>
                                        </div>
                                        <div className="text-[10px] font-mono text-emerald-300 font-bold uppercase">
                                            Engine {activeSlide.stepNumber}
                                        </div>
                                    </div>

                                    {/* Main Realistic Photograph */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-950 flex items-center justify-center">
                                        <img 
                                            src={activeSlide.image} 
                                            alt={`${activeSlide.title} ${activeSlide.highlightTitle} - ProfitMachines Executive Consulting`}
                                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-104"
                                            loading="eager"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = '/images/home-why-choose.png';
                                            }}
                                        />

                                        {/* Soft gradient mask for text contrast */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />

                                        {/* Floating Live Telemetry Badge on Image */}
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md shadow-lg">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                                                <span className="text-xs font-mono font-semibold text-white truncate">
                                                    {activeSlide.badgeText}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => openQuickForm({ defaultService: activeSlide.highlightTitle, source: 'Image Telemetry Badge' })}
                                                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 font-bold flex-shrink-0 hover:underline"
                                            >
                                                <span>Deploy Engine</span>
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Controls Strip: Prev/Next, Slider Progress, and Trust Accreditations */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 px-2 pt-6 border-t border-emerald-500/20">
                    
                    {/* Left: Enterprise Trust Accreditations */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-emerald-200/90">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            <span>SOC2 Type II Aligned</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-teal-300" />
                            <span>Global Enterprise Telemetry</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                            <span>Fortune 500 & Scale-Up Grade</span>
                        </div>
                    </div>

                    {/* Right: Slide Controls, Dots, and Progress Bar */}
                    <div className="flex items-center gap-3">
                        
                        {/* Dot Indicators with Active Progress Fill */}
                        <div className="flex items-center gap-1.5 mr-2">
                            {homeSliders.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    onClick={() => goToSlide(dotIdx)}
                                    className={`relative h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                                        dotIdx === currentIndex 
                                            ? 'w-8 bg-emerald-900' 
                                            : 'w-2.5 bg-emerald-700/60 hover:bg-emerald-600'
                                    }`}
                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                >
                                    {dotIdx === currentIndex && (
                                        <div 
                                            className="absolute top-0 bottom-0 left-0 bg-emerald-300 transition-all"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Control Box */}
                        <div className="flex items-center bg-emerald-900/60 border border-emerald-500/30 rounded-xl p-1 shadow-sm">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60 transition-colors"
                                title={isPlaying ? "Pause autoplay" : "Start autoplay"}
                                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                            >
                                {isPlaying ? <Pause className="w-4 h-4 text-emerald-300" /> : <Play className="w-4 h-4 text-emerald-300" />}
                            </button>
                            
                            <div className="h-4 w-px bg-emerald-500/30 mx-1" />

                            <button
                                onClick={prevSlide}
                                className="p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60 transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="px-2.5 text-xs font-mono font-bold text-white">
                                <span className="text-emerald-300">{activeSlide.stepNumber}</span>
                                <span className="text-emerald-400/60"> / </span>
                                <span>0{homeSliders.length}</span>
                            </div>

                            <button
                                onClick={nextSlide}
                                className="p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60 transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
