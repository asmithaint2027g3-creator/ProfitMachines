import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Play, BarChart3, Globe, Zap, CheckCircle2, TrendingUp, Cpu, Network, Sparkles, Activity, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { trackEvent } from '../../../lib/analytics';

export default function HeroSection() {
    const [activeNode, setActiveNode] = useState<number>(1);

    const nodes = [
        { id: 1, name: "Demand Ingestion", signals: "12,480 intent cues/hr", status: "Active" },
        { id: 2, name: "Autonomous Propensity", signals: "98.4% ICP accuracy", status: "Optimizing" },
        { id: 3, name: "Agentic SDR Mesh", signals: "3.8x meeting velocity", status: "Scaling" },
        { id: 4, name: "Revenue Leak Audit", signals: "$1.4M recovered ARR", status: "Active" }
    ];

    return (
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-50 border-b border-slate-200 flex items-center">
            
            {/* Enterprise Architectural Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply" />
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem',
                        opacity: 0.35
                    }} 
                />
                {/* Soft ambient gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2878B5]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2878B5]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                    
                    {/* Left Column: Core Value Proposition */}
                    <div className="lg:col-span-7 flex flex-col justify-center relative">
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5CAAE6] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2878B5]"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">AI-Powered Revenue OS</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6">
                                The Autonomous <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-blue-600 to-indigo-600 relative inline-block">
                                    Revenue Engine
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-sky-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                    </svg>
                                </span>
                            </h1>
                            
                            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
                                Discover demand, amplify your brand, accelerate reputation, pilot sales autonomously, and capture hidden revenue – all on one unified AI operating system.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link 
                                to="/book-consultation"
                                onClick={() => trackEvent({ eventName: 'HERO_PRIMARY_CTA_CLICK', label: 'Activate Autonomous Growth' })}
                            >
                                <Button className="w-full sm:w-auto bg-[#2878B5] hover:bg-[#1E6297] text-white px-8 py-6 text-base h-auto rounded-xl shadow-xl shadow-[#2878B5]/20 transition-all hover:-translate-y-0.5 border border-[#1E6297] font-bold group">
                                    <span className="flex items-center">
                                        Activate Your Autonomous Growth Engine
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                            <Link 
                                to="/hidden-revenue-capture"
                                onClick={() => trackEvent({ eventName: 'HERO_SECONDARY_CTA_CLICK', label: 'Scan Hidden Revenue' })}
                            >
                                <Button variant="outline" className="w-full sm:w-auto bg-white border-slate-200 text-slate-800 hover:bg-slate-50 px-7 py-6 text-base h-auto rounded-xl transition-all shadow-sm font-bold">
                                    <span className="flex items-center">
                                        <Play className="mr-2 w-4 h-4 text-[#2878B5] fill-[#2878B5]" />
                                        Scan for Hidden Revenue
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-600"
                        >
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#2878B5]" />
                                SOC2 Type II Certified
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#2878B5]" />
                                Global Architecture
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#2878B5]" />
                                Fortune 500 Trusted
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Interactive Enterprise AI Workflow & Architecture */}
                    <div className="lg:col-span-5 relative w-full">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-950 text-white"
                        >
                            {/* Live Terminal Top Bar */}
                            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#2878B5]/80" />
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#5CAAE6] animate-pulse" />
                                    <span>profitmachines.ai/mesh-v2</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Telemetry Live</span>
                            </div>

                            {/* Mesh Grid & Active Topology */}
                            <div className="p-6 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-xs font-mono text-[#5CAAE6] uppercase tracking-wider">Autonomous Agent Mesh</div>
                                        <div className="text-lg font-extrabold text-white">Continuous Revenue Loop</div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-md bg-[#2878B5]/15 border border-[#2878B5]/30 text-[#5CAAE6] text-xs font-mono font-bold">
                                        99.98% SLA
                                    </span>
                                </div>

                                {/* Flow Nodes */}
                                <div className="space-y-2.5 my-5">
                                    {nodes.map((node) => (
                                        <div 
                                            key={node.id}
                                            onClick={() => setActiveNode(node.id)}
                                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${activeNode === node.id ? 'bg-slate-900 border-[#2878B5] shadow-md shadow-[#2878B5]/20' : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${activeNode === node.id ? 'bg-[#2878B5] text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                    0{node.id}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-200">{node.name}</div>
                                                    <div className="text-[11px] text-slate-400 font-mono">{node.signals}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#5CAAE6] animate-pulse" />
                                                <span className="text-[10px] font-mono font-semibold text-[#5CAAE6]">{node.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Metrics Strip */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                        <div className="text-[10px] text-slate-400 font-mono uppercase">Velocity Surge</div>
                                        <div className="text-xl font-bold text-white font-mono text-gradient">5.4× ARR</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                        <div className="text-[10px] text-slate-400 font-mono uppercase">Signal Throughput</div>
                                        <div className="text-xl font-bold text-[#5CAAE6] font-mono">1,000+/sec</div>
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
