import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Code2, Cpu as AutomationIcon, Server, ShieldCheck, Database, Network, Sparkles } from 'lucide-react';

const technologies = [
    { name: 'AI & Neural Modeling', category: 'Intelligence', icon: Cpu, color: 'text-[#2878B5]', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
    { name: 'Multi-Region Cloud', category: 'Infrastructure', icon: Cloud, color: 'text-sky-600', bg: 'bg-sky-50/80', border: 'border-sky-100' },
    { name: 'Full-Stack Engineering', category: 'Engineering', icon: Code2, color: 'text-[#2878B5]', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
    { name: 'Autonomous Process Ops', category: 'Automation', icon: Network, color: 'text-emerald-600', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
    { name: 'Enterprise Integrations', category: 'Integration', icon: Server, color: 'text-teal-700', bg: 'bg-teal-50/80', border: 'border-purple-100' },
    { name: 'Zero-Trust Cyber Security', category: 'Protection', icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-50/80', border: 'border-red-100' },
    { name: 'Predictive Data Mesh', category: 'Analytics', icon: Database, color: 'text-amber-600', bg: 'bg-amber-50/80', border: 'border-amber-100' },
];

export default function TechStack() {
    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-200" id="tech-stack">
            {/* Background elements */}
            <div className="absolute inset-0 bg-dot-slate-200 opacity-40 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2878B5]/5 rounded-full blur-[140px] pointer-events-none"></div>
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] font-bold text-xs tracking-wider uppercase mb-4 shadow-xs"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Sparkles className="w-3.5 h-3.5" />
                        Technology Infrastructure
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] mb-5 tracking-tight leading-[1.08]"
                        style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                        Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-[#1E6297] to-[#0A2540]">Technology Architecture</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        Built on scalable, secure, and modern infrastructure designed to handle millions of telemetry events and transactions autonomously.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                    {technologies.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                                className="group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-[#2878B5]/40 transition-all duration-300 flex flex-col justify-between shadow-card hover:shadow-card-hover"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#E1EFF8] border border-[#BAE0F8]/60 flex items-center justify-center text-[#2878B5] group-hover:bg-[#2878B5] group-hover:text-white transition-all shadow-xs">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                                        // 0{index + 1}
                                    </span>
                                </div>
                                
                                <div>
                                    <div className="text-[10px] font-bold text-[#1E6297] tracking-wider uppercase font-mono mb-1">
                                        {tech.category}
                                    </div>
                                    <div className="text-base font-bold text-[#0A2540] group-hover:text-[#2878B5] transition-colors"
                                        style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                                        {tech.name}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

