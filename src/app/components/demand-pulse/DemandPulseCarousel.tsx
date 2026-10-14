import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: "/images/demand-pulse-dashboard.png",
        title: "Real-Time Demand Intelligence",
        subtitle: "Visualize buying intent across global markets instantly with deep telemetry.",
        ctaText: "Explore Demand Radar",
        ctaLink: "/solutions"
    },
    {
        id: 2,
        image: "/images/hero-revenue-acceleration.png",
        title: "Predictive Analytics Dashboard",
        subtitle: "Forecast revenue pipelines with 98% accuracy powered by self-learning neural models.",
        ctaText: "View Analytics Matrix",
        ctaLink: "/offerings"
    },
    {
        id: 3,
        image: "/images/hero-data-intelligence.png",
        title: "Automated Campaign Orchestration",
        subtitle: "Deploy autonomous multi-channel revenue engines that self-optimize 24/7.",
        ctaText: "Deploy Autonomous Engine",
        ctaLink: "/book-consultation"
    },
    {
        id: 4,
        image: "/images/hero-profit-pool.png",
        title: "Competitive Intelligence Recon",
        subtitle: "Track competitor movements and intercept high-value deals in real-time.",
        ctaText: "Intercept Active Deals",
        ctaLink: "/hidden-revenue-capture"
    }
];

export default function DemandPulseCarousel() {
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

    const activeSlide = slides[currentIndex];

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
                        enter: { opacity: 0, scale: 1.03 },
                        center: { opacity: 1, scale: 1 },
                        exit: { opacity: 0 }
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image positioned to show fully on right side */}
                    <div
                        className="absolute inset-0 bg-cover bg-right lg:bg-[80%_center] transition-transform duration-1000"
                        style={{ backgroundImage: `url(${activeSlide.image})` }}
                    />

                    {/* Left Blur Backdrop: softly blurs the background image behind the text on the left */}
                    <div 
                        className="absolute inset-y-0 left-0 w-full lg:w-[60%] backdrop-blur-[8px] pointer-events-none"
                        style={{
                            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 100%)'
                        }}
                    />

                    {/* Gradient Overlay: dark on left for high readability, transparent on right so image shows fully */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 via-50% to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center z-10">
                        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-16 pt-16">
                            <motion.div
                                initial={{ y: 25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.6 }}
                                className="max-w-3xl"
                            >
                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.12]">
                                    {activeSlide.title}
                                </h1>
                                <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed mb-8 max-w-2xl">
                                    {activeSlide.subtitle}
                                </p>

                                {/* Action Buttons - Clearly visible, non-white */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <Link
                                        to={activeSlide.ctaLink}
                                        className="flex items-center gap-2.5 px-7 py-3.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#2878B5]/40 hover:shadow-[#2878B5]/60 transition-all duration-200 hover:-translate-y-0.5 group border border-[#5CAAE6]/40 cursor-pointer"
                                    >
                                        <Zap className="w-4 h-4" />
                                        <span>{activeSlide.ctaText}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/book-consultation"
                                        className="flex items-center gap-2 px-7 py-3.5 border-2 border-[#2878B5] hover:border-[#5CAAE6] bg-[#0A253D] hover:bg-[#133E60] text-white font-bold text-sm rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        Schedule Architecture Call
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 right-6 lg:right-16 z-20 flex items-center gap-3">
                <div className="flex items-center bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl p-1 gap-1">
                    <button
                        onClick={handlePrev}
                        className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="px-2 text-xs font-mono font-bold text-white">
                        <span className="text-[#5CAAE6]">0{currentIndex + 1}</span>
                        <span className="text-white/30"> / </span>
                        <span>0{slides.length}</span>
                    </div>
                    <button
                        onClick={handleNext}
                        className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
