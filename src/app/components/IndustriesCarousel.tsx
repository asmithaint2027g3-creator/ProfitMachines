import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const slides = [
    {
        id: 1,
        image: "/images/industry-saas.png",
        fallback: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        badge: "Industry Intelligence",
        title: "AI Growth Architectures By Industry",
        subtitle: "Tailored AI solution stacks designed to address the unique revenue challenges and compliance demands of your sector.",
        primaryCta: { text: "Explore All Verticals", link: "/industries" },
        secondaryCta: { text: "Book Industry Briefing", link: "/book-consultation" }
    },
    {
        id: 2,
        image: "/images/industry-retail.png",
        fallback: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2670&auto=format&fit=crop",
        badge: "E-Commerce & Retail",
        title: "E-commerce & Consumer Durable Growth",
        subtitle: "Optimize customer acquisition costs and maximize lifetime value with predictive demand discovery and automated retention.",
        primaryCta: { text: "View D2C Solutions", link: "/industries?section=d2c-companies" },
        secondaryCta: { text: "Request Retail Audit", link: "/book-consultation" }
    },
    {
        id: 3,
        image: "/images/industry-fintech.png",
        fallback: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        badge: "Banking & Financial Services",
        title: "Banking & Financial Service Protocols",
        subtitle: "Compliance-aware AI engines for high-intent lead generation, automated underwriting qualification, and deal acceleration.",
        primaryCta: { text: "Explore FinTech Stack", link: "/industries?section=fintech-lending" },
        secondaryCta: { text: "Compliance Overview", link: "/book-consultation" }
    },
    {
        id: 4,
        image: "/images/industry-manufacturing.png",
        fallback: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        badge: "Manufacturing & Industrial",
        title: "Manufacturing & Industrial Growth Levers",
        subtitle: "Accelerate complex sales cycles, RFP responses, and dealer network performance with algorithmic deal intelligence.",
        primaryCta: { text: "Industrial Architecture", link: "/industries?section=industrial-industries" },
        secondaryCta: { text: "Supply Chain Alignment", link: "/book-consultation" }
    },
    {
        id: 5,
        image: "/images/industry-healthcare.png",
        fallback: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2670&auto=format&fit=crop",
        badge: "Healthcare & Life Sciences",
        title: "Healthcare & Life Sciences Revenue Systems",
        subtitle: "HIPAA-aligned revenue operations, institutional account mapping, and precision stakeholder intelligence.",
        primaryCta: { text: "Healthcare Blueprint", link: "/industries?section=specialized-sectors" },
        secondaryCta: { text: "Schedule Consultation", link: "/book-consultation" }
    }
];

export default function IndustriesCarousel() {
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

    return (
        <section 
            className="relative w-full h-[540px] md:h-[620px] lg:h-[700px] bg-slate-950 overflow-hidden group border-b border-slate-200"
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
                        style={{ backgroundImage: `url(${slides[currentIndex].image}), url(${slides[currentIndex].fallback})` }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center pt-8">
                            <motion.div
                                initial={{ y: 25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.6 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600/15 border border-emerald-400/30 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{slides[currentIndex].badge}</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.15] drop-shadow-md">
                                    {slides[currentIndex].title}
                                </h2>
                                <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow">
                                    {slides[currentIndex].subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Button asChild className="bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold px-8 py-6 text-base rounded-full shadow-lg shadow-[#2878B5]/25 transition-all">
                                        <Link to={slides[currentIndex].primaryCta.link} className="flex items-center gap-2">
                                            <span>{slides[currentIndex].primaryCta.text}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild className="border-2 border-[#2878B5] bg-[#0A253D] hover:bg-[#1E6297] text-white font-bold px-8 py-6 text-base rounded-full shadow-md transition-all cursor-pointer">
                                        <Link to={slides[currentIndex].secondaryCta.link}>
                                            {slides[currentIndex].secondaryCta.text}
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
                            idx === currentIndex ? 'w-8 bg-emerald-600' : 'w-2.5 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
