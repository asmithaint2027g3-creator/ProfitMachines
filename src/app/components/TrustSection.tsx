import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
    { value: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 95, suffix: '%', label: 'Client Retention' },
    { value: 20, suffix: '+', label: 'Industries Served' },
    { value: 24, suffix: '/7', label: 'Expert Support' },
    { value: 10, suffix: '+', label: 'Global Partners' },
    { value: 5, suffix: '+', label: 'Countries' }
];

function useCountUp(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const count = useCountUp(value, 1600, inView);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="text-center px-8 py-10 relative group"
        >
            {/* Vertical divider */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10 hidden sm:block last:hidden" />

            <div
                className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums tracking-tight"
                style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.03em' }}
            >
                {count}{suffix}
            </div>
            <div
                className="text-[11px] font-bold text-[#BAE0F8] uppercase tracking-[0.15em]"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {label}
            </div>
        </motion.div>
    );
}

export default function TrustSection() {
    return (
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #020F1E 0%, #0A2540 50%, #0F3560 100%)' }}>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                backgroundSize: '3rem 3rem'
            }} />
            {/* Glow orb */}
            <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-[#2878B5]/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            {/* Top/bottom accent lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2878B5]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2878B5]/40 to-transparent" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} delay={i * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    );
}
