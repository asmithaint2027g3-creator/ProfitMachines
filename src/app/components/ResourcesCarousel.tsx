import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen, Sparkles, Download, FileText, Target } from 'lucide-react';
import { Button } from './ui/button';

export interface ResourceSlide {
    id: string;
    image: string;
    badge: string;
    tag: string;
    title: string;
    subtitle: string;
    metrics: { label: string; value: string }[];
    primaryCta: { text: string; link: string };
    secondaryCta: { text: string; link: string };
}

const slides: ResourceSlide[] = [
    {
        id: 'playbook',
        image: '/images/home-hero-dashboard.png',
        badge: 'Executive Research',
        tag: 'Playbook 2026',
        title: 'Enterprise AI Revenue Operating System Playbook',
        subtitle: 'Comprehensive blueprints for enterprise revenue leaders to transition from manual sales motions to automated, predictive revenue engines.',
        metrics: [
            { label: 'Pages of Specs', value: '68' },
            { label: 'Frameworks', value: '14' },
            { label: 'Executive Downloads', value: '8,200+' }
        ],
        primaryCta: { text: 'Download Executive Playbook', link: '/book-consultation' },
        secondaryCta: { text: 'Explore Resources Hub', link: '#resources-grid' }
    },
    {
        id: 'dark-funnel-report',
        image: '/images/hero-profit-pool.png',
        badge: 'Market Telemetry',
        tag: 'Benchmark Study',
        title: '2026 Global Dark Funnel & Buyer Intent Benchmark',
        subtitle: 'Analyzing over 12.4M enterprise buying intent signals to reveal where B2B buyers conduct due diligence before RFP issuance.',
        metrics: [
            { label: 'Signals Analyzed', value: '12.4M' },
            { label: 'Accounts Tracked', value: '450K+' },
            { label: 'Accuracy Index', value: '98.6%' }
        ],
        primaryCta: { text: 'View Benchmark Data', link: '/demand-pulse' },
        secondaryCta: { text: 'Request Intent Audit', link: '/book-consultation' }
    },
    {
        id: 'agentic-specs',
        image: '/images/hero-agentic-ai.png',
        badge: 'Technical Blueprints',
        tag: 'Architecture Guide',
        title: 'Autonomous SDR & AI Deal Desk Architectural Blueprints',
        subtitle: 'The full technical and operational guide to deploying multi-agent revenue infrastructure with enterprise guardrails and zero hallucination.',
        metrics: [
            { label: 'Agent Topologies', value: '6' },
            { label: 'SLA Latency', value: '<50ms' },
            { label: 'Security Grade', value: 'Zero-Trust' }
        ],
        primaryCta: { text: 'Inspect Architecture', link: '/solutions#sales-ops' },
        secondaryCta: { text: 'Talk to Lead Architect', link: '/talk-to-expert' }
    },
    {
        id: 'cfo-guide',
        image: '/images/outcomes-metrics.png',
        badge: 'Financial Modeling',
        tag: 'CFO Whitepaper',
        title: 'The CFO Guide to Predictable Pipeline & CAC Reduction',
        subtitle: 'How modern finance and revenue teams model ARR velocity, calculate algorithmic payback periods, and eliminate pipeline unpredictability.',
        metrics: [
            { label: 'Payback Compression', value: '-4.2 Mos' },
            { label: 'Forecast Precision', value: '99.1%' },
            { label: 'EBITDA Margin Lift', value: '+14%' }
        ],
        primaryCta: { text: 'Calculate Pipeline ROI', link: '/book-consultation' },
        secondaryCta: { text: 'View Outcome Case Studies', link: '/outcomes' }
    }
];

export default function ResourcesCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isHovered]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const currentSlide = slides[currentIndex];

    return (
        <section 
            className="relative w-full h-[580px] md:h-[660px] lg:h-[720px] bg-slate-950 overflow-hidden group border-b border-slate-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                        enter: { opacity: 0, scale: 1.05 },
                        center: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.98 }
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image with Zoom */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{ backgroundImage: `url(${currentSlide.image})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center pt-8">
                            <motion.div
                                initial={{ y: 25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.6 }}
                                className="max-w-5xl mx-auto"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600/15 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{currentSlide.badge}</span>
                                    <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                                    <span className="text-slate-300 font-normal">{currentSlide.tag}</span>
                                </div>

                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.15] drop-shadow-md">
                                    {currentSlide.title}
                                </h1>

                                <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow">
                                    {currentSlide.subtitle}
                                </p>

                                {/* Live Metrics Strip */}
                                <div className="hidden sm:flex items-center justify-center gap-6 mb-8">
                                    {currentSlide.metrics.map((m, idx) => (
                                        <div key={idx} className="bg-slate-900/85 border border-slate-800/80 backdrop-blur-md px-5 py-2.5 rounded-2xl">
                                            <div className="text-xl font-extrabold text-emerald-400 font-mono">{m.value}</div>
                                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button asChild className="bg-[#064e3b] hover:bg-[#053d2e] text-white font-bold px-8 py-6 text-base rounded-full shadow-lg shadow-emerald-800/30 transition-all">
                                        <Link to={currentSlide.primaryCta.link} className="flex items-center gap-2">
                                            <span>{currentSlide.primaryCta.text}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/15 px-8 py-6 text-base rounded-full backdrop-blur-sm font-semibold transition-all">
                                        <a href={currentSlide.secondaryCta.link}>
                                            {currentSlide.secondaryCta.text}
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Arrows */}
            <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
