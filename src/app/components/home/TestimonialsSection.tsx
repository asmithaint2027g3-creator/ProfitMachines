import { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        quote: "ProfitMachines transformed our entire Go-To-Market motion. We saw a 300% increase in pipeline velocity within the first quarter. The AI-driven approach completely changed how we think about revenue generation.",
        author: "Sarah Jenkins",
        role: "Chief Revenue Officer",
        company: "Vanguard Pay",
        industry: "FinTech Enterprise",
        rating: 5
    },
    {
        quote: "The autonomous sales reps handle 80% of our initial discovery calls. It's like having a 24/7 sales floor that never misses a beat. Our team now spends time where it actually matters — closing deals.",
        author: "David Chen",
        role: "VP of Sales",
        company: "ShipFlow",
        industry: "SaaS Logistics",
        rating: 5
    },
    {
        quote: "Their predictive revenue models are uncannily accurate. We can finally forecast our quarterly targets with 98% precision — a complete game-changer for our board communications.",
        author: "Elena Rodriguez",
        role: "RevOps Director",
        company: "CloudScale Systems",
        industry: "Enterprise SaaS",
        rating: 5
    },
    {
        quote: "We found $1.8M in hidden upsell opportunities in the first 60 days. The ROI on the ProfitMachines engagement paid for itself within the first month.",
        author: "Michael Torres",
        role: "CFO",
        company: "ScalePoint",
        industry: "B2B Platform",
        rating: 5
    },
    {
        quote: "Demand Discovery uncovered a $300M unserved market that we've since entered and captured 40% share in. The intelligence was simply unavailable anywhere else.",
        author: "Priya Nair",
        role: "Chief Strategy Officer",
        company: "Apex Logistics",
        industry: "Enterprise Logistics",
        rating: 5
    },
    {
        quote: "Our Series A closed at 2× target valuation after we could present quantitative PMF evidence from ProfitMachines' intelligence platform. It was the most impactful investment we made pre-funding.",
        author: "Aisha Mensah",
        role: "CEO & Co-Founder",
        company: "HealthLoop",
        industry: "HealthTech",
        rating: 5
    }
];

export default function TestimonialsSection() {
    const [page, setPage] = useState(0);
    const perPage = 3;
    const totalPages = Math.ceil(testimonials.length / perPage);
    const visible = testimonials.slice(page * perPage, page * perPage + perPage);

    return (
        <section className="pt-16 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14 bg-slate-50 border-t border-slate-100 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Client Success
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            Proven by{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-[#1E6297] to-[#0A2540]">
                                Enterprise Leaders
                            </span>
                        </h2>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-medium text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>{page + 1} / {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-600 hover:bg-[#F0F7FC] hover:border-[#BAE0F8] hover:text-[#1E6297] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page === totalPages - 1}
                            className="w-10 h-10 rounded-xl border border-slate-200/80 bg-white flex items-center justify-center text-slate-600 hover:bg-[#F0F7FC] hover:border-[#BAE0F8] hover:text-[#1E6297] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {visible.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 border border-slate-200/80 relative group hover:border-[#2878B5]/40 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-5">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    {/* Quote icon */}
                                    <Quote className="w-8 h-8 text-[#BAE0F8]/80 group-hover:text-[#2878B5]/50 transition-colors mb-3 shrink-0" />

                                    {/* Quote text */}
                                    <p className="text-slate-700 font-normal leading-relaxed mb-6 text-sm"
                                        style={{ fontFamily: 'Inter, sans-serif' }}>
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                {/* Author */}
                                <div className="pt-5 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar initials */}
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2878B5] to-[#0A2540] flex items-center justify-center shrink-0 shadow-xs">
                                            <span className="text-white text-xs font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#0A2540] text-sm" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>{testimonial.author}</div>
                                            <div className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>{testimonial.role}</div>
                                            <div className="text-xs font-bold text-[#1E6297] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{testimonial.company} · {testimonial.industry}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`rounded-full transition-all duration-300 cursor-pointer ${i === page ? 'w-8 h-2.5 bg-[#2878B5]' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'}`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
