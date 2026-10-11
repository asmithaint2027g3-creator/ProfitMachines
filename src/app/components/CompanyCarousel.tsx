import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Sparkles, ShieldCheck, Globe, Users } from 'lucide-react';
import { Button } from './ui/button';

export interface CompanySlide {
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

const slides: CompanySlide[] = [
    {
        id: 'mission',
        image: '/images/company-hero.png',
        badge: 'Enterprise Intelligence',
        tag: 'Company Overview',
        title: 'The Science of Predictable Enterprise Growth',
        subtitle: 'ProfitMachines is the foundational revenue acceleration platform helping modern organizations build predictable pipeline, close deals faster, and scale ARR.',
        metrics: [
            { label: 'Global Clients', value: '140+' },
            { label: 'Revenue Managed', value: '$4.2B+' },
            { label: 'Uptime Reliability', value: '99.98%' }
        ],
        primaryCta: { text: 'Book Consultation', link: '/book-consultation' },
        secondaryCta: { text: 'Meet Leadership', link: '#leadership' }
    },
    {
        id: 'engineering',
        image: '/images/hero-data-intelligence.png',
        badge: 'AI Research & Engineering',
        tag: 'Cognitive Architecture',
        title: 'Built by Elite AI Researchers & Revenue Architects',
        subtitle: 'Our engineering team combines distributed systems expertise with frontier neural models to deliver enterprise-grade revenue predictability.',
        metrics: [
            { label: 'Proprietary Models', value: '18+' },
            { label: 'Inference Latency', value: '<45ms' },
            { label: 'Patent Portfolios', value: '12' }
        ],
        primaryCta: { text: 'Explore Tech Stack', link: '/solutions' },
        secondaryCta: { text: 'View Career Openings', link: '/career' }
    },
    {
        id: 'global-scale',
        image: '/images/hero-end-to-end-transformation.png',
        badge: 'Global Scale',
        tag: 'International Reach',
        title: 'Transforming Enterprise Operations Across 24 Countries',
        subtitle: 'Deploying compliance-hardened AI revenue infrastructure across North America, EMEA, and APAC for Fortune 500 and high-growth scale-ups.',
        metrics: [
            { label: 'Operating Markets', value: '24' },
            { label: 'Multi-Currency Flow', value: '16' },
            { label: 'Partner Ecosystem', value: '85+' }
        ],
        primaryCta: { text: 'Partner with Us', link: '/partners' },
        secondaryCta: { text: 'Talk to an Expert', link: '/talk-to-expert' }
    },
    {
        id: 'security',
        image: '/images/home-why-choose.png',
        badge: 'Zero-Trust Security',
        tag: 'Enterprise Assurance',
        title: 'Military-Grade Security & Governance Infrastructure',
        subtitle: 'Zero data leakage, end-to-end client cryptographic isolation, SOC-2 Type II readiness, and full GDPR/CCPA enterprise compliance.',
        metrics: [
            { label: 'Security Standard', value: 'SOC 2' },
            { label: 'Encryption Level', value: 'AES-256' },
            { label: 'Pen-Test Status', value: 'Audited' }
        ],
        primaryCta: { text: 'Review Security Whitepaper', link: '/resources' },
        secondaryCta: { text: 'Schedule Compliance Review', link: '/book-consultation' }
    }
];

export default function CompanyCarousel() {
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
