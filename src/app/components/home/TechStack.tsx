import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Code2, Cpu as AutomationIcon, Server, ShieldCheck, Database, Network, Sparkles } from 'lucide-react';

const technologies = [
    { name: 'AI & Neural Modeling', category: 'Intelligence', icon: Cpu },
    { name: 'Multi-Region Cloud', category: 'Infrastructure', icon: Cloud },
    { name: 'Full-Stack Engineering', category: 'Engineering', icon: Code2 },
    { name: 'Autonomous Process Ops', category: 'Automation', icon: Network },
    { name: 'Enterprise Integrations', category: 'Integration', icon: Server },
    { name: 'Zero-Trust Cyber Security', category: 'Protection', icon: ShieldCheck },
    { name: 'Predictive Data Mesh', category: 'Analytics', icon: Database },
];

export default function TechStack() {
    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b-2 border-[#0066FF]" id="tech-stack">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0066FF] bg-white text-xs font-bold text-[#0066FF] uppercase mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                        <span>Technology Infrastructure · High-Load Scalability</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight font-heading">
                        Enterprise-Grade Technology Architecture
                    </h2>
                    <p className="text-base sm:text-lg text-[#0066FF] font-medium leading-relaxed max-w-2xl mx-auto">
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
                                className="group bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all duration-200 flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF] group-hover:bg-white group-hover:text-[#0066FF] group-hover:border-white">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-[#0066FF] group-hover:text-white uppercase tracking-wider">
                                        // 0{index + 1}
                                    </span>
                                </div>
                                
                                <div>
                                    <div className="text-[10px] font-bold text-[#0066FF] group-hover:text-white tracking-wider uppercase font-mono mb-1">
                                        {tech.category}
                                    </div>
                                    <div className="text-base font-bold text-[#0066FF] group-hover:text-white transition-colors">
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

