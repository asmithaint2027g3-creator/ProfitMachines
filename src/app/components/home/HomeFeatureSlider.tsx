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
        badgeText: 'Profit Pool Discovery Telemetry: Active',
        primaryCta: {
            text: 'Launch Demand Radar',
            link: '/demand-pulse'
        },
        secondaryCta: {
            text: 'Discover Hidden TAM',
            link: '/offerings/profit-pool-discovery'
        }
    },
    {
        id: 'autonomous-sdr',
        stepNumber: '03',
        tag: 'Autonomous Sales & SDRs',
        pillTitle: 'Autonomous SDRs',
        icon: Bot,
        title: 'Full-Funnel Outbound &',
        highlightTitle: 'Autonomous Sales Pipeline',
        description: 'Deploy adaptive AI agents that research target accounts, craft hyper-personalized executive narratives, orchestrate multi-touch outreach, and automatically book qualified meetings.',
        stats: [
            { value: '3.8×', label: 'Meeting Conversion', sublabel: 'Benchmarked Lift' },
            { value: '24/7', label: 'Autonomous Pacing', sublabel: 'Continuous Pipeline' },
            { value: '-65%', label: 'SDR Acquisition Cost', sublabel: 'Efficiency Multiple' }
        ],
        highlights: [
            'Hyper-personalized messaging generated from multi-source account dossiers',
            'Autonomous follow-ups and objection handling across email & social touchpoints',
            'Zero pipeline fatigue with intelligent capacity pacing'
        ],
        image: '/images/hero-autonomous-sdr.jpg',
        badgeText: 'Autonomous Agent Fleet: 24/7 Operational',
        primaryCta: {
            text: 'Deploy Autonomous SDRs',
            link: '/solutions'
        },
        secondaryCta: {
            text: 'View Pipeline lift metrics',
            link: '/outcomes'
        }
    },
    {
        id: 'revops-acceleration',
        stepNumber: '04',
        tag: 'AI Revenue Operations',
        pillTitle: 'Revenue Acceleration',
        icon: TrendingUp,
        title: 'Algorithmic CRM &',
        highlightTitle: 'AI Revenue Acceleration',
        description: 'Eliminate revenue drag, clean decayed pipeline signals, predict deal slippage with Bayesian accuracy, and guide sales teams to close highest-probability opportunities.',
        stats: [
            { value: '+42%', label: 'Win Rate Uplift', sublabel: 'Enterprise Deals' },
            { value: '-55%', label: 'Sales Cycle Drag', sublabel: 'Rapid Velocity' },
            { value: '99.2%', label: 'Pipeline Cleanliness', sublabel: 'Automated RevOps' }
        ],
        highlights: [
            'Continuous CRM hygiene and autonomous pipeline decay correction',
            'Predictive deal scoring and automated next-best-action alerts for reps',
            'Boardroom-ready ARR reporting and predictive revenue forecasting'
        ],
        image: '/images/hero-revops-war-room.jpg',
        badgeText: 'RevOps Optimization: Real-Time Stream',
        primaryCta: {
            text: 'Audit Your Pipeline',
            link: '/solutions'
        },
        secondaryCta: {
            text: 'See RevOps Architecture',
            link: '/offerings'
        }
    },
    {
        id: 'crypto-web3-growth',
        stepNumber: '05',
        tag: 'Crypto & Web3 Growth',
        pillTitle: 'Web3 Ecosystems',
        icon: Network,
        title: 'Protocol Adoption &',
        highlightTitle: 'Crypto Ecosystem Growth',
        description: 'Comprehensive go-to-market architecture for protocols, DeFi primitives, Layer-1/2 chains, and tokenized networks seeking sustainable TVL, developer acquisition, and liquidity depth.',
        stats: [
            { value: '$120M+', label: 'TVL Scaled', sublabel: 'Across Partner Protocols' },
            { value: '45,000+', label: 'Developer Cohort', sublabel: 'Ecosystem Ingestion' },
            { value: '18+', label: 'Chains Architected', sublabel: 'Cross-Ecosystem GTM' }
        ],
        highlights: [
            'Institutional developer acquisition frameworks and grant program architecture',
            'Sustainable token economics modeling and liquidity incentive optimization',
            'Global Web3 ecosystem partner alignment and hackathon onboarding'
        ],
        image: '/images/hero-crypto-trading.jpg',
        badgeText: 'Web3 Ecosystem Engine: Active Telemetry',
        primaryCta: {
            text: 'Explore Crypto Engine',
            link: '/crypto'
        },
        secondaryCta: {
            text: 'Speak to Web3 Partner',
            link: '/book-consultation'
        }
    },
    {
        id: 'custom-ai-engineering',
        stepNumber: '06',
        tag: 'Enterprise Custom AI',
        pillTitle: 'Enterprise Custom AI',
        icon: Sparkles,
        title: 'Cognitive Architecture &',
        highlightTitle: 'Custom AI Engineering',
        description: 'Bespoke agentic systems, proprietary fine-tuned SLMs/LLMs, secure multi-tenant data pipelines, and air-gapped enterprise deployments that turn proprietary enterprise data into compounding margin.',
        stats: [
            { value: 'SOC-2', label: 'Enterprise Security', sublabel: 'Type II Alignment' },
            { value: '<100ms', label: 'Inference Latency', sublabel: 'High-Throughput OS' },
            { value: '100%', label: 'IP Ownership', sublabel: 'Client-Owned Weights' }
        ],
        highlights: [
            'Proprietary agentic orchestration frameworks built on air-gapped infrastructure',
            'Custom fine-tuned domain models trained exclusively on enterprise corpora',
            'Full enterprise IP transfer with zero vendor lock-in or training leakage'
        ],
        image: '/images/hero-ai-infrastructure.jpg',
        badgeText: 'Custom AI Architecture: Production Grade',
        primaryCta: {
            text: 'Build Custom AI Engine',
            link: '/book-consultation'
        },
        secondaryCta: {
            text: 'View Tech Stack',
            link: '/offerings'
        }
    }
];

export default function HomeFeatureSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { openQuickForm, openLongForm } = useLeadModal();

    const slideDuration = 6500;
    const progressStepTime = 50;

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
            eventName: 'SLIDER_MANUAL_NAVIGATION',
            label: `Slide ${index + 1}: ${homeSliders[index].pillTitle}`
        });
    };

    useEffect(() => {
        if (!isPlaying) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return;
        }

        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const nextVal = prev + (progressStepTime / slideDuration) * 100;
                if (nextVal >= 100) {
                    return 0;
                }
                return nextVal;
            });
        }, progressStepTime);

        timerRef.current = setInterval(() => {
            nextSlide();
        }, slideDuration);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [isPlaying, nextSlide, slideDuration]);

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
            className="pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-24 bg-white text-[#0066FF] relative border-b-2 border-[#0066FF]"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Executive AI Revenue OS Platform Showcase"
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Main 2-Column Hero Showcase */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                        >
                            {/* Left Content Column */}
                            <div className="lg:col-span-6 flex flex-col justify-center">
                                {/* Eyebrow Pill */}
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-[#0066FF] bg-white text-[#0066FF] text-xs font-bold tracking-wide uppercase">
                                        <span className="w-2 h-2 rounded-full bg-[#0066FF] inline-block"></span>
                                        <span className="font-mono font-extrabold">{activeSlide.stepNumber}</span>
                                        <span>·</span>
                                        <span>{activeSlide.tag}</span>
                                    </div>
                                </div>

                                {/* Main Headline */}
                                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0066FF] leading-[1.12] tracking-tight mb-4 font-heading">
                                    {activeSlide.title}{' '}
                                    <span className="underline decoration-[#0066FF]">
                                        {activeSlide.highlightTitle}
                                    </span>
                                </h1>

                                {/* Supporting Paragraph */}
                                <p className="text-base sm:text-lg text-[#0066FF] leading-relaxed mb-6 font-medium max-w-xl">
                                    {activeSlide.description}
                                </p>

                                {/* Key Highlight Bullet Points */}
                                <div className="space-y-2.5 mb-8">
                                    {activeSlide.highlights.map((highlight, hIdx) => (
                                        <div key={hIdx} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#0066FF] bg-white flex items-center justify-center">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF]" />
                                            </div>
                                            <span className="text-xs sm:text-sm text-[#0066FF] font-semibold">
                                                {highlight}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons Group */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                                    {/* Primary CTA */}
                                    <button
                                        onClick={() => {
                                            trackEvent({ eventName: 'SLIDER_PRIMARY_CTA_CLICK', label: activeSlide.primaryCta.text });
                                            openQuickForm({
                                                defaultService: activeSlide.highlightTitle,
                                                source: `Hero Slider (${activeSlide.tag})`,
                                                title: activeSlide.primaryCta.text
                                            });
                                        }}
                                        className="w-full sm:w-auto bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] font-bold px-7 py-3.5 rounded-lg border-2 border-[#0066FF] text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                                    >
                                        <Zap className="w-4 h-4" />
                                        <span>{activeSlide.primaryCta.text}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    {/* Secondary CTA */}
                                    <Link 
                                        to={activeSlide.secondaryCta.link}
                                        onClick={() => trackEvent({ eventName: 'SLIDER_SECONDARY_CTA_CLICK', label: activeSlide.secondaryCta.text })}
                                        className="w-full sm:w-auto border-2 border-[#0066FF] bg-white hover:bg-[#0066FF] text-[#0066FF] hover:text-white font-bold px-6 py-3.5 rounded-lg text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 text-center"
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
                                        className="text-xs text-[#0066FF] hover:underline font-bold flex items-center justify-center gap-1 sm:ml-2 py-2"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>Detailed Assessment</span>
                                    </button>
                                </div>

                                {/* Hero Meta Strip */}
                                <div className="font-mono text-[11px] text-[#0066FF] flex items-center gap-2 mb-6 font-bold">
                                    <span>Ref: PM-AI-REV/2026/0{currentIndex + 1} · Autonomous Revenue OS · Verified Enterprise Outcomes</span>
                                </div>

                                {/* Key Metrics Strip */}
                                <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-xl bg-white border-2 border-[#0066FF]">
                                    {activeSlide.stats.map((stat, sIdx) => (
                                        <div key={sIdx} className="text-left">
                                            <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0066FF] font-mono">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs font-bold text-[#0066FF] leading-tight mt-0.5 uppercase tracking-wide">
                                                {stat.label}
                                            </div>
                                            {stat.sublabel && (
                                                <div className="text-[11px] text-[#0066FF] font-medium hidden sm:block mt-0.5">
                                                    {stat.sublabel}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Right Column: Visual Frame */}
                            <div className="lg:col-span-6 relative">
                                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-[#0066FF] bg-white group">
                                    
                                    {/* Top Status Bar */}
                                    <div className="bg-white px-4 py-3 border-b-2 border-[#0066FF] flex items-center justify-between text-[#0066FF]">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                                            <div className="w-2.5 h-2.5 rounded-full border border-[#0066FF]" />
                                            <div className="w-2.5 h-2.5 rounded-full border border-[#0066FF]" />
                                        </div>
                                        <div className="text-[11px] font-mono font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                                            <span>profitmachines.ai/engine-{activeSlide.stepNumber}</span>
                                        </div>
                                        <div className="text-[10px] font-mono font-bold uppercase">
                                            Engine {activeSlide.stepNumber}
                                        </div>
                                    </div>

                                    {/* Main Realistic Photograph */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white flex items-center justify-center">
                                        <img 
                                            src={activeSlide.image} 
                                            alt={`${activeSlide.title} ${activeSlide.highlightTitle} - ProfitMachines Executive Consulting`}
                                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                                            loading="eager"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = '/images/home-why-choose.png';
                                            }}
                                        />

                                        {/* Floating Live Telemetry Badge on Image */}
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 p-3 rounded-xl bg-white border-2 border-[#0066FF] text-[#0066FF]">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#0066FF] flex-shrink-0" />
                                                <span className="text-xs font-mono font-bold truncate">
                                                    {activeSlide.badgeText}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => openQuickForm({ defaultService: activeSlide.highlightTitle, source: 'Image Telemetry Badge' })}
                                                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold flex-shrink-0 hover:underline"
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

                {/* Bottom Controls Strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 px-2 pt-6 border-t-2 border-[#0066FF]">
                    
                    {/* Left: Enterprise Trust Accreditations */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-bold text-[#0066FF]">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                            <span>SOC2 Type II Aligned</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-[#0066FF]" />
                            <span>Global Enterprise Telemetry</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                            <span>Fortune 500 & Scale-Up Grade</span>
                        </div>
                    </div>

                    {/* Right: Slide Controls, Dots, and Progress Bar */}
                    <div className="flex items-center gap-3">
                        
                        {/* Dot Indicators */}
                        <div className="flex items-center gap-1.5 mr-2">
                            {homeSliders.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    onClick={() => goToSlide(dotIdx)}
                                    className={`relative h-2.5 rounded-full overflow-hidden transition-all duration-300 border border-[#0066FF] ${
                                        dotIdx === currentIndex 
                                            ? 'w-8 bg-white' 
                                            : 'w-2.5 bg-white hover:bg-[#0066FF]'
                                    }`}
                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                >
                                    {dotIdx === currentIndex && (
                                        <div 
                                            className="absolute top-0 bottom-0 left-0 bg-[#0066FF] transition-all"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Control Box */}
                        <div className="flex items-center bg-white border-2 border-[#0066FF] rounded-xl p-1 text-[#0066FF]">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2 text-[#0066FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors"
                                title={isPlaying ? "Pause autoplay" : "Start autoplay"}
                                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            
                            <div className="h-4 w-px bg-[#0066FF] mx-1" />

                            <button
                                onClick={prevSlide}
                                className="p-2 text-[#0066FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="px-2.5 text-xs font-mono font-bold text-[#0066FF]">
                                <span>{activeSlide.stepNumber}</span>
                                <span> / </span>
                                <span>0{homeSliders.length}</span>
                            </div>

                            <button
                                onClick={nextSlide}
                                className="p-2 text-[#0066FF] hover:bg-[#0066FF]/10 rounded-lg transition-colors"
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
