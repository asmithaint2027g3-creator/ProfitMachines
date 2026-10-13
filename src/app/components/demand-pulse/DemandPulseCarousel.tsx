
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        title: "Real-Time Demand Intelligence",
        subtitle: "Visualize buying intent across global markets instantly."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2676&auto=format&fit=crop",
        title: "Predictive Analytics Dashboard",
        subtitle: "Forecast revenue pipelines with 98% accuracy powered by AI."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        title: "Automated Campaign Orchestration",
        subtitle: "Launch multi-channel campaigns that self-optimize 24/7."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop",
        title: "Competitive Intelligence Recon",
        subtitle: "Track competitor movements and intercept deals in real-time."
    }
];

export default function DemandPulseCarousel() {
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
                        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center pt-8">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="inline-block px-4 py-1.5 bg-white border border-[#0066FF] text-[#0066FF] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                    DemandPulse OS
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-[#0066FF] mb-6 tracking-tight leading-none drop-shadow-sm">
                                    {slides[currentIndex].title}
                                </h2>
                                <p className="text-xl md:text-2xl text-[#0066FF] font-medium leading-relaxed max-w-2xl mx-auto tracking-wide">
                                    {slides[currentIndex].subtitle}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons and Pagination Dots Removed by User Request */}

        </section>
    );
}
