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
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white border-b-2 border-[#0066FF] flex items-center">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                    
                    {/* Left Column: Core Value Proposition */}
                    <div className="lg:col-span-7 flex flex-col justify-center relative">
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#0066FF] mb-6">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] inline-block" />
                                <span className="text-xs font-bold text-[#0066FF] tracking-wide uppercase">AI-Powered Revenue OS</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-[#0066FF] leading-[1.08] tracking-tight mb-6">
                                The Autonomous <br />
                                <span className="underline decoration-[#0066FF] decoration-4 underline-offset-8">
                                    Revenue Engine
                                </span>
                            </h1>
                            
                            <p className="text-lg sm:text-xl text-[#0066FF] leading-relaxed mb-8 max-w-2xl font-medium">
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
                                <Button className="w-full sm:w-auto bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] px-8 py-6 text-base h-auto rounded-xl border-2 border-[#0066FF] font-bold group transition-all">
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
                                <Button variant="outline" className="w-full sm:w-auto bg-white border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white px-7 py-6 text-base h-auto rounded-xl font-bold transition-all">
                                    <span className="flex items-center">
                                        <Play className="mr-2 w-4 h-4 text-[#0066FF]" />
                                        Scan for Hidden Revenue
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm font-bold text-[#0066FF]"
                        >
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                                SOC2 Type II Certified
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#0066FF]" />
                                Global Architecture
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                                Fortune 500 Trusted
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Interactive Enterprise AI Workflow */}
                    <div className="lg:col-span-5 relative w-full">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full relative rounded-2xl overflow-hidden border-2 border-[#0066FF] bg-white text-[#0066FF]"
                        >
                            {/* Terminal Top Bar */}
                            <div className="bg-white px-4 py-3 border-b-2 border-[#0066FF] flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                                </div>
                                <div className="text-[11px] font-mono text-[#0066FF] flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                                    <span>profitmachines.ai/mesh-v2</span>
                                </div>
                                <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider">Telemetry Live</span>
                            </div>

                            {/* Mesh Grid & Active Topology */}
                            <div className="p-6 relative overflow-hidden bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-xs font-mono text-[#0066FF] uppercase tracking-wider font-bold">Autonomous Agent Mesh</div>
                                        <div className="text-lg font-extrabold text-[#0066FF]">Continuous Revenue Loop</div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-md bg-white border-2 border-[#0066FF] text-[#0066FF] text-xs font-mono font-bold">
                                        99.98% SLA
                                    </span>
                                </div>

                                {/* Flow Nodes */}
                                <div className="space-y-2.5 my-5">
                                    {nodes.map((node) => (
                                        <div 
                                            key={node.id}
                                            onClick={() => setActiveNode(node.id)}
                                            className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${activeNode === node.id ? 'bg-[#0066FF] text-white border-[#0066FF]' : 'bg-white border-[#0066FF] text-[#0066FF]'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${activeNode === node.id ? 'bg-white text-[#0066FF]' : 'bg-[#0066FF] text-white'}`}>
                                                    0{node.id}
                                                </div>
                                                <div>
                                                    <div className={`text-xs font-bold ${activeNode === node.id ? 'text-white' : 'text-[#0066FF]'}`}>{node.name}</div>
                                                    <div className={`text-[11px] font-mono ${activeNode === node.id ? 'text-white' : 'text-[#0066FF]'}`}>{node.signals}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${activeNode === node.id ? 'bg-white' : 'bg-[#0066FF]'}`} />
                                                <span className={`text-[10px] font-mono font-semibold ${activeNode === node.id ? 'text-white' : 'text-[#0066FF]'}`}>{node.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Metrics Strip */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-[#0066FF]">
                                    <div className="p-3 rounded-xl bg-white border-2 border-[#0066FF]">
                                        <div className="text-[10px] text-[#0066FF] font-mono uppercase font-bold">Velocity Surge</div>
                                        <div className="text-xl font-bold text-[#0066FF] font-mono">5.4× ARR</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white border-2 border-[#0066FF]">
                                        <div className="text-[10px] text-[#0066FF] font-mono uppercase font-bold">Signal Throughput</div>
                                        <div className="text-xl font-bold text-[#0066FF] font-mono">1,000+/sec</div>
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
