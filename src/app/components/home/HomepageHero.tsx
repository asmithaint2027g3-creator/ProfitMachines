import { ArrowRight, Workflow, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { trackEvent } from '../../../lib/analytics';

export default function HomepageHero() {
    return (
        <section 
            className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F4F8FC] to-white border-b border-slate-200/80 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
            aria-label="Enterprise AI and Digital Transformation Solutions"
        >
            {/* Subtle Enterprise Architectural Background Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div 
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem'
                    }}
                />
                {/* Soft ambient brand blue glows */}
                <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-[#2878B5]/8 rounded-full blur-[130px]" />
                <div className="absolute -bottom-24 left-0 w-[450px] h-[450px] bg-[#60B5FF]/8 rounded-full blur-[110px]" />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
                    
                    {/* ── Left Column: Value Proposition & CTAs ── */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Eyebrow Label */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full bg-[#EBF4FA] border border-[#BAE0F8] text-[#1E6297] text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-6 shadow-xs max-w-full">
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2878B5] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2878B5]" />
                                </span>
                                <span className="truncate sm:whitespace-normal">
                                    PROFITMACHINES | ENTERPRISE AI &amp; DIGITAL TRANSFORMATION
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.15rem] font-extrabold text-[#0A2540] leading-[1.12] tracking-tight mb-5 sm:mb-6">
                                Build <span className="text-[#2878B5]">Intelligent Systems</span>.
                                <br />
                                Accelerate Business Growth.
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-7 sm:mb-8 max-w-2xl font-normal">
                                From enterprise AI and intelligent automation to cloud infrastructure and custom software, ProfitMachines helps businesses modernize operations, unlock opportunities, and build scalable digital capabilities.
                            </p>

                            {/* CTA Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5 sm:mb-6">
                                {/* Primary CTA: Explore Solutions */}
                                <Link
                                    to="/solutions"
                                    onClick={() => trackEvent({ eventName: 'HERO_PRIMARY_CTA_CLICK', label: 'Explore Our Solutions' })}
                                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#2878B5]/25 hover:shadow-[#2878B5]/40 transition-all duration-200 hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-[#2878B5] focus:ring-offset-2"
                                >
                                    <span>Explore Our Solutions</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* Secondary CTA: Book Consultation */}
                                <Link
                                    to="/book-consultation"
                                    onClick={() => trackEvent({ eventName: 'HERO_SECONDARY_CTA_CLICK', label: 'Book a Consultation' })}
                                    className="inline-flex items-center justify-center px-7 py-4 bg-white hover:bg-slate-50 text-[#0A2540] hover:text-[#2878B5] font-bold text-sm sm:text-base rounded-xl border border-slate-300 hover:border-[#2878B5]/50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2878B5] focus:ring-offset-2"
                                >
                                    <span>Book a Consultation</span>
                                </Link>
                            </div>

                            {/* Supporting Tagline */}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-slate-500 tracking-wide">
                                <span>AI Strategy</span>
                                <span className="text-slate-300">·</span>
                                <span>Intelligent Automation</span>
                                <span className="text-slate-300">·</span>
                                <span>Enterprise Engineering</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right Column: Dominant Enterprise Technology Visual ── */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-lg lg:max-w-none"
                        >
                            <div className="relative rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-2xl shadow-slate-300/40 group overflow-hidden">
                                
                                {/* Dominant Enterprise Visual */}
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                                    <img
                                        src="/images/hero-data-strategy.jpg"
                                        alt="Enterprise engineering team architecting intelligent systems, cloud infrastructure, and digital transformation"
                                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                        loading="eager"
                                        decoding="async"
                                    />
                                    {/* Subtle clean contrast gradient overlay at edges */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {/* Minimalist Supporting Graphic Detail: Six-Stage Transformation Journey */}
                                <div className="mt-3 px-3 py-2.5 bg-slate-50/90 rounded-lg border border-slate-200/70 flex items-center justify-between text-slate-700">
                                    <div className="flex items-center gap-2">
                                        <Workflow className="w-4 h-4 text-[#2878B5] shrink-0" />
                                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                                            Transformation Journey
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10.5px] sm:text-[11px] font-semibold text-[#1E6297]">
                                        <span>Discover</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Diagnose</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Design</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Build</span>
                                        <span className="text-slate-300">→</span>
                                        <span>Scale</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
