import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Target, Sparkles, Brain, Cpu, Rocket, LineChart } from 'lucide-react';
import { Button } from './ui/button';

export interface SolutionSlide {
    id: string;
    image: string;
    fallback: string;
    badge: string;
    tag: string;
    title: string;
    subtitle: string;
    metrics: { label: string; value: string }[];
    primaryCta: { text: string; link: string };
    secondaryCta: { text: string; link: string };
}

const slides: SolutionSlide[] = [
    {
        id: 'strategy',
        image: '/images/hero-ai-transformation.png',
        fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
        badge: 'Enterprise Growth Architecture',
        tag: 'Core Strategy Pillar',
        title: 'AI Business Growth Strategy & Predictable Modeling',
        subtitle: 'Design an algorithmic, scalable AI revenue engine that eliminates founder dependency, models ICP propensity, and guarantees ARR velocity.',
        metrics: [
            { label: 'ARR Velocity', value: '5.4×' },
            { label: 'CAC Reduction', value: '30-50%' },
            { label: 'LTV Expansion', value: '2-4×' }
        ],
        primaryCta: { text: 'Explore Strategy Architecture', link: '#ai-business-growth-strategy' },
        secondaryCta: { text: 'Book Growth Consultation', link: '/book-consultation' }
    },
    {
        id: 'intelligence',
        image: '/images/hero-profit-pool.png',
        fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        badge: 'Intent Intelligence',
        tag: 'Demand Sensing',
        title: 'AI Market Strategy & Dark Funnel Intelligence',
        subtitle: 'Turn untracked demand and competitor movements into high-intent revenue certainty with real-time algorithmic market scanning.',
        metrics: [
            { label: 'Pipeline Velocity', value: '+247%' },
            { label: 'SQL Conversion', value: '3×' },
            { label: 'Cost Per Lead', value: '-45%' }
        ],
        primaryCta: { text: 'View Demand Intelligence', link: '#ai-market-strategy-demand-intelligence' },
        secondaryCta: { text: 'Launch Demand Radar', link: '/demand-pulse' }
    },
    {
        id: 'sales-pilot',
        image: '/images/hero-agentic-ai.png',
        fallback: 'https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=2670&auto=format&fit=crop',
        badge: 'Autonomous Execution',
        tag: 'AI Agents',
        title: 'Autonomous Sales Pilots & Multi-Agent RevOps',
        subtitle: 'Deploy specialized AI agents that conduct deep account research, engage decision-makers, handle RFP queries, and accelerate deal cycles.',
        metrics: [
            { label: 'Sales Cycle Days', value: '-52%' },
            { label: 'Rep Productivity', value: '4.2×' },
            { label: 'Win Rate Lift', value: '+38%' }
        ],
        primaryCta: { text: 'Inspect Autonomous SDRs', link: '#ai-auto-sales-pilot-autonomous-sales-agents' },
        secondaryCta: { text: 'Request Pilot Demo', link: '/book-consultation' }
    },
    {
        id: 'growth-engine',
        image: '/images/revenue-acceleration-engine.png',
        fallback: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop',
        badge: 'Performance Systems',
        tag: 'Acquisition Engine',
        title: 'AI Growth Hacking & Autonomous Inbound Scaling',
        subtitle: 'Scale cross-channel acquisition loops with automated creative testing, budget re-allocation algorithms, and dynamic landing page generation.',
        metrics: [
            { label: 'Inbound Volume', value: '+310%' },
            { label: 'ROAS Multiple', value: '4.8×' },
            { label: 'Campaign Velocity', value: '10×' }
        ],
        primaryCta: { text: 'View Growth Hacking Engine', link: '#ai-driven-growth-hacking-engine' },
        secondaryCta: { text: 'Run Growth Audit', link: '/book-consultation' }
    },
    {
        id: 'expansion',
        image: '/images/hero-revenue-acceleration.png',
        fallback: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop',
        badge: 'Revenue Acceleration',
        tag: 'LTV Expansion',
        title: 'Continuous Revenue Operations & Contract Expansion',
        subtitle: 'Synthesize product usage telemetry, NPS sentiment, and contract milestones to trigger expansion opportunities automatically before renewals.',
        metrics: [
            { label: 'Net Retention Rate', value: '138%' },
            { label: 'Churn Prevention', value: '88%' },
            { label: 'Upsell Speed', value: '2.5×' }
        ],
        primaryCta: { text: 'Explore Expansion Engine', link: '#ai-revenue-acceleration-expansion' },
        secondaryCta: { text: 'Calculate Expansion ARR', link: '/book-consultation' }
    }
];

export default function SolutionsCarousel() {
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
                    {/* Background Image with Subtle Ken Burns Zoom */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{ backgroundImage: `url(${currentSlide.image}), url(${currentSlide.fallback})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pt-16 lg:pt-20">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                initial={{ y: 25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.6 }}
                                className="max-w-5xl mx-auto"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2878B5]/20 border border-[#5CAAE6]/40 text-[#BAE0F8] rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                                    <Sparkles className="w-3.5 h-3.5 text-[#5CAAE6]" />
                                    <span>{currentSlide.badge}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#5CAAE6]"></span>
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
                                        <div key={idx} className="bg-slate-900/80 border border-slate-800/80 backdrop-blur-md px-5 py-2.5 rounded-2xl">
                                            <div className="text-xl font-extrabold text-[#5CAAE6] font-mono">{m.value}</div>
                                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button asChild className="bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold px-8 py-6 text-base rounded-full shadow-lg shadow-[#2878B5]/30 transition-all">
                                        <a href={currentSlide.primaryCta.link} className="flex items-center gap-2">
                                            <span>{currentSlide.primaryCta.text}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button asChild className="border-2 border-[#2878B5] bg-[#0A253D] hover:bg-[#1E6297] text-white font-bold px-8 py-6 text-base rounded-full shadow-md transition-all cursor-pointer">
                                        <Link to={currentSlide.secondaryCta.link}>
                                            {currentSlide.secondaryCta.text}
                                        </Link>
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
                            idx === currentIndex ? 'w-8 bg-[#2878B5]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
