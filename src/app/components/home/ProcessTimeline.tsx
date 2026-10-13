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
        <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b-2 border-[#0066FF]" id="methodology">
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0066FF] bg-white text-xs font-bold text-[#0066FF] uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                            <span>Engineering Methodology · Systematic Execution</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight font-heading">
                            The 6-Stage Enterprise Transformation Journey
                        </h2>
                        <p className="text-base sm:text-lg text-[#0066FF] font-medium leading-relaxed max-w-2xl mx-auto">
                            A systematic, engineering-first approach to deploying autonomous AI systems and revenue architectures into your enterprise without operational friction.
                        </p>
                    </motion.div>
                </div>

                {/* Horizontal Step Navigation Bar */}
                <div className="hidden lg:grid grid-cols-6 gap-3 mb-16 max-w-5xl mx-auto">
                    {methodologySteps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = activeStep === idx;
                        return (
                            <button
                                key={step.phase}
                                onClick={() => setActiveStep(idx)}
                                className={`p-4 rounded-2xl text-left transition-all duration-200 border-2 ${
                                    isActive 
                                        ? 'bg-[#0066FF] text-white border-[#0066FF]' 
                                        : 'bg-white hover:bg-[#0066FF] hover:text-white border-[#0066FF] text-[#0066FF]'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-white' : 'text-[#0066FF]'}`}>
                                        {step.phase}
                                    </span>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-sm font-bold truncate">
                                    {step.label}
                                </div>
                                <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white' : 'text-[#0066FF]'}`}>
                                    {step.duration}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Connected Vertical Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Central Vertical Connecting Line */}
                    <div className="absolute top-0 bottom-0 left-6 sm:left-8 md:left-1/2 w-0.5 bg-[#0066FF] -translate-x-1/2" />
                    
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
                                    <div className="absolute left-6 sm:left-8 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#0066FF] -translate-x-1/2 z-10 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`flex-1 pl-12 sm:pl-14 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className={`flex flex-col bg-white p-7 sm:p-8 rounded-2xl border-2 border-[#0066FF] transition-all duration-200 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} text-left md:text-inherit`}>
                                            
                                            {/* Phase Tag & Timeline Pill */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF]">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono font-bold text-[#0066FF] uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border-2 border-[#0066FF]">
                                                        Phase {step.phase} // {step.label}
                                                    </span>
                                                    <span className="text-[11px] text-[#0066FF] font-mono hidden sm:inline">
                                                        ({step.duration})
                                                    </span>
                                                </div>
                                            </div>

                                            <h4 className="text-xl sm:text-2xl font-bold text-[#0066FF] mb-2 font-heading">
                                                {step.name}
                                            </h4>

                                            <p className="text-sm text-[#0066FF] leading-relaxed mb-4 font-normal">
                                                {step.desc}
                                            </p>

                                            <div className="pt-3 border-t-2 border-[#0066FF] w-full flex items-center gap-2 text-xs font-semibold text-[#0066FF]">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                                                <span><strong>Key Deliverable:</strong> {step.deliverable}</span>
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
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] text-sm font-bold transition-all group"
                    >
                        <span>Initiate Phase 01 Discovery Audit</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

