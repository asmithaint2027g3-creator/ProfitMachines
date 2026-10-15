import { CheckCircle2, ArrowRight, Users, Globe2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const benefits = [
    "End-to-End Enterprise Delivery Model tailored to complex workflows",
    "Global Client Network spanning Fortune 500s and rapid-scaling startups",
    "Proven Track Record of deploying secure, compliant AI systems"
];

const metrics = [
    { value: '500+', label: 'Global Clients', icon: Users },
    { value: '24/7', label: 'Enterprise Support', icon: Globe2 },
    { value: 'SOC2', label: 'Type II Certified', icon: Shield }
];

export default function WhyChooseSection() {
    return (
        <section id="company" className="py-24 md:py-32 bg-white overflow-hidden relative">
            {/* Subtle mesh background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2878B5]/4 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E1EFF8]/60 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                    {/* Left: Visual Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        {/* Main image card */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl group"
                            style={{ boxShadow: '0 20px 80px -20px rgba(40,120,181,0.15), 0 4px 24px rgba(10,37,64,0.08)' }}>
                            <div className="relative h-72 sm:h-80 overflow-hidden">
                                <img
                                    src="/images/home-why-choose.png"
                                    alt="ProfitMachines Corporate AI Intelligence Center"
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/30 to-transparent" />
                                {/* Live indicator badge */}
                                <div className="absolute top-5 left-5 flex items-center gap-2 bg-[#0A2540]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#2878B5]/40">
                                    <span className="w-2 h-2 rounded-full bg-[#5CAAE6] animate-pulse" />
                                    <span className="text-xs font-bold text-white tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        AI Command Hub
                                    </span>
                                </div>
                            </div>

                            {/* Card footer */}
                            <div className="p-6 bg-[#0A2540]">
                                <p className="text-[10px] font-bold text-[#5CAAE6] uppercase tracking-widest mb-3 font-mono">
                                    // Enterprise Autonomous Infrastructure
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3.5 bg-[#0F3560]/60 rounded-xl border border-[#1E3A5F]">
                                        <div className="text-[10px] text-[#BAE0F8]/60 font-bold uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Global Scale</div>
                                        <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Multi-Region Cloud</div>
                                    </div>
                                    <div className="p-3.5 bg-[#0F3560]/60 rounded-xl border border-[#1E3A5F]">
                                        <div className="text-[10px] text-[#BAE0F8]/60 font-bold uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Compliance</div>
                                        <div className="text-sm font-semibold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>SOC2 &amp; ISO Certified</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating stat badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 z-20 hidden md:block">
                            <div
                                className="text-4xl font-black text-[#2878B5] mb-1"
                                style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.04em' }}
                            >
                                10<span className="text-[#5CAAE6]">+</span>
                            </div>
                            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Years Experience
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        id="about-us"
                    >
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] text-xs font-bold uppercase tracking-widest mb-6"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Why ProfitMachines
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-[#0A2540] mb-6 leading-[1.05]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.03em' }}>
                            Pioneering Enterprise AI &amp; Digital Transformation
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <strong className="text-slate-900 font-semibold">Our Mission:</strong> To empower global enterprises with scalable AI solutions, secure cloud architectures, and bespoke software that drives continuous growth and operational efficiency.
                        </p>

                        <div className="space-y-5 mb-12">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2878B5]" />
                                    </div>
                                    <span className="text-slate-700 font-medium leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Metrics row */}
                        <div className="grid grid-cols-3 gap-4 mb-12 pt-10 border-t border-slate-200/80">
                            {metrics.map(({ value, label, icon: Icon }, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-black text-[#0A2540] mb-1"
                                        style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.04em' }}>
                                        {value}
                                    </div>
                                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500"
                                        style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/solutions"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#2878B5] hover:bg-[#1E6297] text-white rounded-xl uppercase tracking-wide shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
                            style={{ fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(40,120,181,0.28)' }}
                        >
                            <span>Explore Our Capabilities</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
