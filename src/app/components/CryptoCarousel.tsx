
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2672&auto=format&fit=crop",
        title: "AI-Driven Sales Acceleration for Crypto Ecosystems",
        subtitle: "The AI-Native Revenue Protocol for L1/L2s, DeFi, and Exchanges."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2674&auto=format&fit=crop",
        title: "Transform Volatile Volume into Predictable Recurring Revenue",
        subtitle: "AI-Powered Token Economics & Fee Optimization for Sustainable Growth."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2668&auto=format&fit=crop",
        title: "Convert 15X More High-Intent Users with Demand Discovery",
        subtitle: "Separating Real Adoption Intent from Speculative Noise using On-Chain AI."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop",
        title: "Boost Protocol Fee Monetization by 40% with Real-Time Intelligence",
        subtitle: "Optimizing Every Transaction Flow for Maximum Revenue Contribution."
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        title: "Accelerate ICO & Launch Success Rates by 70% with Market Validation",
        subtitle: "Validate Demand and Problem-Solution Fit Before Your Token Hits the Market."
    }
];

export default function CryptoCarousel() {
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

                    {/* Premium Unified Overlay - Matched with AI Lead Gen Visibility */}
                    <div className="absolute inset-0 bg-white/30 bg-gradient-to-b from-white/80 via-white/20 to-white/80" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center pt-10">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="max-w-5xl mx-auto"
                            >
                                <div className="inline-block px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-[#064e3b] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                    ProfitMachines Crypto Protocol
                                </div>
                                <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1] drop-shadow-sm">
                                    {slides[currentIndex].title}
                                </h2>
                                <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto tracking-wide">
                                    {slides[currentIndex].subtitle}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
