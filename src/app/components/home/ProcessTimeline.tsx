import React, { useState } from 'react';
import { Search, Stethoscope, Layout, Code2, Rocket, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const methodologySteps = [
    { 
        phase: '01',
        label: 'Discover',
        name: 'Discovery & Market Intent Audit', 
        icon: Search, 
        desc: 'Comprehensive dark-funnel telemetry, market intent mapping, revenue leak audit, and existing tech infrastructure discovery.',
        deliverable: 'Baseline Revenue Leak Audit & Intent Scorecard',
        duration: 'Week 1-2'
    },
    { 
        phase: '02',
        label: 'Diagnose',
        name: 'Diagnostic & Strategic Architecture', 
        icon: Stethoscope, 
        desc: 'Deep diagnostic modeling of conversion bottlenecks, ICP propensity alignment, and custom enterprise AI playbook architecture.',
        deliverable: 'GTM Architecture Blueprint & Tech Matrix',
        duration: 'Week 2-3'
    },
    { 
        phase: '03',
        label: 'Design',
        name: 'Funnel & Autonomous SDR Design', 
        icon: Layout, 
        desc: 'Multi-touch journey design, autonomous SDR routing logic, dynamic qualification playbooks, and objection-handling matrices.',
        deliverable: 'Autonomous SDR Playbook & Messaging Mesh',
        duration: 'Week 3-4'
    },
    { 
        phase: '04',
        label: 'Build',
        name: 'Model & Enterprise Data Integration', 
        icon: Code2, 
        desc: 'Turnkey bidirectional integration with Salesforce, HubSpot, Snowflake, Snowflake, and proprietary CRM data lakes with zero-trust sandboxing.',
        deliverable: 'Live Two-Way API Connectors & Webhook Streams',
        duration: 'Week 4-6'
    },
    { 
        phase: '05',
        label: 'Deploy',
        name: 'Autonomous Deployment & Benchmarking', 
        icon: Rocket, 
        desc: 'Controlled staging, statistical lift validation, live execution across outbound and inbound attribution channels with sub-second response.',
        deliverable: 'Live Production SLA & Real-time Telemetry Dashboard',
        duration: 'Week 6-8'
    },
    { 
        phase: '06',
        label: 'Scale',
        name: 'Continuous Learning & Compound Scale', 
        icon: TrendingUp, 
        desc: 'Real-time reinforcement learning loops, algorithmic scoring calibration, quarterly TAM expansion, and dedicated principal engineering retainer.',
        deliverable: 'Dedicated Principal Engineering Retainer & Health Audits',
        duration: 'Ongoing'
    }
];

export default function ProcessTimeline() {
    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-200" id="methodology">
            {/* Scroll Anchor for backward compatibility */}
            <div id="solutions-methodology" className="scroll-mt-28 absolute -top-28 left-0 pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] font-bold text-xs uppercase tracking-wider mb-4 shadow-xs"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            <Sparkles className="w-3.5 h-3.5" />
                            Engineering Methodology
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] mb-5 tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            The 6-Stage <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-[#1E6297] to-[#0A2540]">Enterprise Transformation Journey</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            A systematic, engineering-first approach to deploying autonomous AI systems and revenue architectures into your enterprise without operational friction.
                        </p>
                    </motion.div>
                </div>

                {/* Horizontal Step Navigation Bar for Quick Selection */}
                <div className="hidden lg:grid grid-cols-6 gap-3 mb-16 max-w-5xl mx-auto">
                    {methodologySteps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = activeStep === idx;
                        return (
                            <button
                                key={step.phase}
                                onClick={() => setActiveStep(idx)}
                                className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden cursor-pointer ${
                                    isActive 
                                        ? 'bg-[#0A2540] text-white shadow-xl shadow-[#0A2540]/15 scale-105' 
                                        : 'bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 shadow-xs'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-[#5CAAE6]' : 'text-slate-400'}`}>
                                        {step.phase}
                                    </span>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#5CAAE6]' : 'text-slate-400'}`} />
                                </div>
                                <div className="text-sm font-bold truncate" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                                    {step.label}
                                </div>
                                <div className={`text-[11px] mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {step.duration}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Connected Vertical Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Central Vertical Connecting Line */}
                    <div className="absolute top-0 bottom-0 left-6 sm:left-8 md:left-1/2 w-0.5 bg-gradient-to-b from-[#2878B5] via-[#5CAAE6] to-[#0A2540] -translate-x-1/2 opacity-25" />
                    
                    <div className="space-y-12 sm:space-y-16">
                        {methodologySteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.phase}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative flex items-center gap-8 md:gap-14 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Center Node Indicator */}
                                    <div className="absolute left-6 sm:left-8 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#2878B5] -translate-x-1/2 group-hover:scale-125 group-hover:border-[#1E6297] transition-all duration-300 z-10 shadow-md shadow-[#2878B5]/30 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2878B5]" />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`flex-1 pl-12 sm:pl-14 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex flex-col bg-white p-7 sm:p-8 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-[#2878B5]/40 transition-all duration-300 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} text-left md:text-inherit`}>
                                            
                                            {/* Phase Tag & Timeline Pill */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#E1EFF8] border border-[#BAE0F8]/70 flex items-center justify-center text-[#2878B5] group-hover:bg-[#2878B5] group-hover:text-white transition-all shadow-xs">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold text-[#1E6297] uppercase tracking-wider bg-[#F0F7FC] px-2.5 py-1 rounded-md border border-[#E1EFF8]">
                                                        Phase {step.phase} // {step.label}
                                                    </span>
                                                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                                                        ({step.duration})
                                                    </span>
                                                </div>
                                            </div>

                                            <h4 className="text-xl sm:text-2xl font-bold text-[#0A2540] mb-2 font-heading"
                                                style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.02em' }}>
                                                {step.name}
                                            </h4>

                                            <p className="text-sm text-slate-600 leading-relaxed mb-4 font-normal"
                                                style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {step.desc}
                                            </p>

                                            <div className="pt-3 border-t border-slate-100 w-full flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#F8FAFC] -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 p-4 px-7 sm:px-8 rounded-b-2xl border-x-0 border-b-0"
                                                style={{ fontFamily: 'Inter, sans-serif' }}>
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
                                                <span><strong className="text-[#0A2540]">Key Deliverable:</strong> {step.deliverable}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Empty Side for alternating layout */}
                                    <div className="hidden md:block flex-1" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Methodology Action Note */}
                <div className="mt-16 text-center">
                    <Link
                        to="/book-consultation"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0A2540] hover:bg-[#2878B5] text-white text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        <span>Initiate Phase 01 Discovery Audit</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

