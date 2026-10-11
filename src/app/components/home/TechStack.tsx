import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Code2, Cpu as AutomationIcon, Server, ShieldCheck, Database, Network, Sparkles } from 'lucide-react';

const technologies = [
    { name: 'AI & Neural Modeling', category: 'Intelligence', icon: Cpu, color: 'text-[#064e3b]', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
    { name: 'Multi-Region Cloud', category: 'Infrastructure', icon: Cloud, color: 'text-sky-600', bg: 'bg-sky-50/80', border: 'border-sky-100' },
    { name: 'Full-Stack Engineering', category: 'Engineering', icon: Code2, color: 'text-[#064e3b]', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#064e3b]/5 rounded-full blur-[140px] pointer-events-none"></div>
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#053d2e] font-bold text-xs tracking-wider uppercase mb-4 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Technology Infrastructure
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight font-heading">
                        Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#064e3b] to-emerald-600">Technology Architecture</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
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
                                className="group bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:bg-white transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-600/5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-xl ${tech.bg} border ${tech.border} flex items-center justify-center ${tech.color} shadow-xs`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                                        // 0{index + 1}
                                    </span>
                                </div>
                                
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-mono mb-1">
                                        {tech.category}
                                    </div>
                                    <div className="text-base font-bold text-slate-900 group-hover:text-[#064e3b] transition-colors">
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

