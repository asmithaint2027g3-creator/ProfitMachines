
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        label: "The Compounding Velocity",
        title: "Every Dollar Works Harder Tomorrow — AI Autopilot Compounds Your Revenue Engine",
        subtitle: "5× Sales Velocity in 12 Months. Then It Accelerates Exponentially."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2674&auto=format&fit=crop",
        label: "The Autopilot Wealth Loop",
        title: "Set the System. Watch It Grow. Reinvest. Repeat.",
        subtitle: "AI-Driven Revenue That Compounds Like Capital — 24/7, Zero Friction"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop",
        label: "The Self-Reinforcing Engine",
        title: "One Closed Deal Feeds Ten More. That's the AI Compounding Effect.",
        subtitle: "From Demand Discovery to Revenue Management — Autopilot Does the Heavy Lifting"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
        label: "The Crypto Money Multiplier",
        title: "TVL + AI Autopilot = Exponential Ecosystem Value",
        subtitle: "Built for Web3 & DeFi — Where Every Incentive Compounds Community Growth"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        label: "The CRO's Compound Interest",
        title: "Your Pipeline Is a Bank Account. AI Is the Interest Rate.",
        subtitle: "Predictable Growth That Stacks. Month Over Month. Quarter Over Quarter."
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        label: "The Infinite Loop",
        title: "Stop Trading Time for Money. Start Compounding with AI Autopilot.",
        subtitle: "TRUSTFLOW.AI — Where Revenue Acceleration Meets Wealth Multiplication"
    }
];

export default function HomeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);





    return (
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-white overflow-hidden group">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                        enter: { opacity: 0, scale: 1.05 },
                        center: { opacity: 1, scale: 1 },
                        exit: { opacity: 0 }
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image */}
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        
                        animate={{ scale: [1, 1.1] }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    />

                    {/* Premium Unified Overlay - Enterprise Grade */}
                    <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center pt-20">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-5xl mx-auto backdrop-blur-md bg-white/40 p-8 md:p-12 rounded-3xl border border-white/50 shadow-premium"
                            >
                                <div className="inline-block px-5 py-2 bg-white/80 border border-emerald-100 text-[#053d2e] rounded-full text-xs font-bold uppercase tracking-[0.25em] mb-8 shadow-sm backdrop-blur-sm">
                                    {slides[currentIndex].label}
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.15] drop-shadow-sm">
                                    {slides[currentIndex].title}
                                </h2>
                                <p className="text-lg md:text-xl lg:text-2xl text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto tracking-wide">
                                    {slides[currentIndex].subtitle}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons Removed */}

            {/* Pagination Dots Removed */}
        </section>
    );
}
