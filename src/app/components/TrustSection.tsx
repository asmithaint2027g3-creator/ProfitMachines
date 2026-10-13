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
            className="text-center px-4 py-6 sm:py-8 group flex flex-col justify-center items-center"
        >
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#064e3b] mb-1 font-mono tabular-nums tracking-tight">
                {count}{suffix}
            </div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">{label}</div>
        </motion.div>
    );
}

export default function TrustSection() {
    return (
        <section className="bg-[#F7F8F5] border-y border-slate-200/90 py-10 md:py-14 relative overflow-hidden">
            {/* Subtle architectural grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #064e3b 1px, transparent 1px), linear-gradient(to bottom, #064e3b 1px, transparent 1px)',
                backgroundSize: '3rem 3rem'
            }} />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 divide-slate-200 sm:divide-x sm:divide-slate-200">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} delay={i * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    );
}
