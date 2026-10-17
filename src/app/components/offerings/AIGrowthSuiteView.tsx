import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, TrendingUp, Rocket, BarChart3, ArrowRight, CheckCircle2,
    Target, Layers, Zap, Activity, Cpu, Sparkles, Filter, ChevronRight,
    Compass, Check, ShieldAlert, BarChart2, RefreshCw, Eye, PieChart
} from 'lucide-react';
import { useLeadModal } from '../../context/LeadModalContext';

export default function AIGrowthSuiteView() {
    const { openQuickForm, openLongForm } = useLeadModal();

    // Engine 01 Interactive Signal State
    const [selectedSignalTab, setSelectedSignalTab] = useState<'voc' | 'demand' | 'fomo'>('voc');

    // Engine 02 Interactive Stage State
    const [activeDealStage, setActiveDealStage] = useState<number>(1);

    // Engine 03 Interactive Experiment Loop State
    const [activeLoopStep, setActiveLoopStep] = useState<number>(0);

    // Engine 04 Interactive Channel Attribution State
    const [selectedChannel, setSelectedChannel] = useState<'search' | 'social' | 'programmatic'>('search');

    const experimentSteps = [
        {
            title: "1. Hypothesize",
            desc: "AI identifies audience and angle friction from historical CRM & ad behavior data.",
            metric: "Opportunity Gap Analysis"
        },
        {
            title: "2. Generate & Experiment",
            desc: "Autonomous generation of multi-variant copy, angles, and custom landing hooks.",
            metric: "Dynamic Variant Staging"
        },
        {
            title: "3. Measure In Flight",
            desc: "Continuous micro-spend tracking measuring qualified intent instead of vanity clicks.",
            metric: "Signal Confidence Scoring"
        },
        {
            title: "4. Synthesize Learnings",
            desc: "Algorithmic correlation between converted accounts and initial creative hooks.",
            metric: "Attribution Synthesis"
        },
        {
            title: "5. Reallocate & Optimize",
            desc: "System dynamically shifts capital allocation to high-yielding acquisition vectors.",
            metric: "Capital Reallocation"
        }
    ];

    return (
        <div className="ai-growth-suite min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-emerald-100" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    <Link to="/offerings" className="hover:text-[#2878B5] transition-colors">Offerings</Link>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    <span className="text-[#2878B5] font-bold">AI Growth Suite</span>
                </nav>
            </div>

            {/* 3. SUITE HERO — Matching Offerings Page Dark Aesthetic */}
            <section className="relative pt-12 md:pt-16 pb-16 md:pb-24 bg-[#050D1A] border-b border-slate-800 text-white overflow-hidden mb-16 md:mb-20">
                {/* Visual Ambient Glows */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute -top-24 right-1/4 w-[650px] h-[650px] bg-[#10B981]/15 rounded-full blur-[150px]" />
                    <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#2878B5]/20 rounded-full blur-[140px]" />
                </div>

                {/* Background Sophisticated Glowing AI Revenue Graph Visualization */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35 overflow-hidden">
                    <svg className="w-full h-full max-w-7xl min-h-[500px]" viewBox="0 0 1200 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="aiGrowthLineGlow" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#2878B5" stopOpacity="0.1" />
                                <stop offset="35%" stopColor="#0EA5E9" stopOpacity="0.6" />
                                <stop offset="70%" stopColor="#10B981" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                            </linearGradient>
                            <linearGradient id="aiGrowthAreaGlow" x1="0" y1="0" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="aiGrowthSecondary" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#2878B5" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
                            </linearGradient>
                        </defs>

                        {/* Baseline Grid Guides */}
                        <line x1="60" y1="360" x2="1140" y2="360" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                        <line x1="60" y1="280" x2="1140" y2="280" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
                        <line x1="60" y1="200" x2="1140" y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
                        <line x1="60" y1="120" x2="1140" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.2" />

                        {/* Area Fill */}
                        <path d="M 60 380 Q 220 370 340 310 T 620 250 T 880 140 T 1140 70 L 1140 420 L 60 420 Z" fill="url(#aiGrowthAreaGlow)" />

                        {/* Neural Synapse Trace */}
                        <path d="M 60 400 Q 240 390 380 340 T 680 290 T 920 220 T 1140 150" stroke="url(#aiGrowthSecondary)" strokeWidth="2" strokeDasharray="5 5" fill="none" opacity="0.7" />

                        {/* Primary Trajectory */}
                        <path d="M 60 380 Q 220 370 340 310 T 620 250 T 880 140 T 1140 70" stroke="url(#aiGrowthLineGlow)" strokeWidth="3.5" fill="none" />

                        {/* Node Coordinates */}
                        <circle cx="340" cy="310" r="4.5" fill="#0EA5E9" />
                        <circle cx="620" cy="250" r="5" fill="#10B981" />
                        <circle cx="880" cy="140" r="6" fill="#10B981" />
                        <circle cx="880" cy="140" r="14" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                        <circle cx="1140" cy="70" r="7" fill="#34D399" />
                        <circle cx="1140" cy="70" r="18" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.5" />
                    </svg>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        AI GROWTH SUITE · INTELLIGENT ENGINES
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.08] drop-shadow-md"
                        style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '-0.025em' }}>
                        Turn Market Signals Into Measurable Growth Decisions
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto mb-8"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                        Unify demand intelligence, revenue acceleration, growth experimentation, and performance marketing within one connected growth architecture.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#ai-demand-discovery"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2878B5] text-white font-bold text-sm hover:bg-[#1E6297] transition-all shadow-lg shadow-[#2878B5]/30 hover:-translate-y-0.5"
                        >
                            <span>Explore Growth Engines</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <button
                            type="button"
                            onClick={() => openLongForm()}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 hover:border-white/40 transition-all bg-white/5 backdrop-blur-md hover:-translate-y-0.5 cursor-pointer"
                        >
                            <span>Talk to an Expert</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* QUICK ENGINE JUMP NAV */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">Engines in this Suite</span>
                    <div className="flex flex-wrap items-center gap-2">
                        <a href="#ai-demand-discovery" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            01. Demand Discovery
                        </a>
                        <a href="#revenue-acceleration" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            02. Revenue Acceleration
                        </a>
                        <a href="#growth-hacking" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            03. Growth Hacking
                        </a>
                        <a href="#performance-marketing" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            04. Performance Marketing
                        </a>
                    </div>
                </div>
            </div>

            {/* ENGINE SECTIONS CONTAINER */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

                {/* ============================================================ */}
                {/* ENGINE 01: AI DEMAND DISCOVERY                               */}
                {/* ============================================================ */}
                <section id="ai-demand-discovery" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="demand-discovery" className="absolute -top-28 left-0 pointer-events-none" />

                    {/* Engine Eyebrow & Headline */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#2878B5] border border-sky-200/70">
                                    <Search className="w-3.5 h-3.5" />
                                    Engine 01
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    Market Signal Intelligence
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                AI Demand Discovery
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How do we identify hidden buying intent before it becomes an active sales opportunity?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("AI Demand Discovery Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Deploy Demand Sensing
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Split Problem & Solution + Signal-to-Opportunity Flow */}
                    <div className="grid lg:grid-cols-12 gap-8 mb-12">
                        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">The Strategic Challenge</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">
                                    Traditional Inbound Misses Latent Committee Intent
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    Most go-to-market motions wait until a prospect downloads a whitepaper or submits a contact form. In reality, modern buying committees research solutions in shadow channels, discussion forums, and technical docs months before engaging vendors.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                                <strong className="font-semibold block mb-0.5">The Addressable Blind Spot:</strong>
                                By the time a formal RFP is issued, internal requirements have already been scoped by competitors who engaged earlier in the discovery lifecycle.
                            </div>
                        </div>

                        {/* Signal-to-Opportunity Visualization */}
                        <div className="lg:col-span-7 bg-[#0B1528] rounded-2xl p-6 sm:p-7 text-white border border-slate-800">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Live Signal Ingestion Topology</span>
                                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    Active Stream Model
                                </span>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-3 mb-6">
                                <button
                                    onClick={() => setSelectedSignalTab('voc')}
                                    className={`p-3 rounded-xl border text-left transition-all ${selectedSignalTab === 'voc' ? 'bg-[#2878B5]/30 border-[#2878B5] text-white' : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white'}`}
                                >
                                    <div className="text-xs font-mono font-bold uppercase">1. Dark Signals</div>
                                    <div className="text-sm font-semibold mt-1">VoC Deep Mining</div>
                                </button>
                                <button
                                    onClick={() => setSelectedSignalTab('demand')}
                                    className={`p-3 rounded-xl border text-left transition-all ${selectedSignalTab === 'demand' ? 'bg-[#2878B5]/30 border-[#2878B5] text-white' : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white'}`}
                                >
                                    <div className="text-xs font-mono font-bold uppercase">2. Upstream Tech</div>
                                    <div className="text-sm font-semibold mt-1">Derived Demand</div>
                                </button>
                                <button
                                    onClick={() => setSelectedSignalTab('fomo')}
                                    className={`p-3 rounded-xl border text-left transition-all ${selectedSignalTab === 'fomo' ? 'bg-[#2878B5]/30 border-[#2878B5] text-white' : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-white'}`}
                                >
                                    <div className="text-xs font-mono font-bold uppercase">3. Peer Momentum</div>
                                    <div className="text-sm font-semibold mt-1">Pressure Modeling</div>
                                </button>
                            </div>

                            {/* Dynamic Signal Detail Box */}
                            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-xs text-slate-300 leading-relaxed font-mono">
                                {selectedSignalTab === 'voc' && (
                                    <div>
                                        <span className="text-[#38BDF8] font-bold block mb-1">▶ Channel Mining: Unstructured Discourse & Repositories</span>
                                        Ingests technical discussion, bug logs, and API deprecation threads to pinpoint teams wrestling with tooling bottlenecks before vendor selection meetings occur.
                                    </div>
                                )}
                                {selectedSignalTab === 'demand' && (
                                    <div>
                                        <span className="text-emerald-400 font-bold block mb-1">▶ Derived Demand: Upstream Technology Triggers</span>
                                        Tracks complementary cloud infrastructure expansions and hiring requisitions that inevitably require downstream software governance.
                                    </div>
                                )}
                                {selectedSignalTab === 'fomo' && (
                                    <div>
                                        <span className="text-purple-400 font-bold block mb-1">▶ Competitive Pressure: Sector Transformation Trajectories</span>
                                        Identifies enterprise accounts whose direct competitors have recently launched relevant capabilities, generating urgency for executive decision-makers.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SPIN Matrix Narrative Progression */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-[#2878B5]" />
                            <h3 className="text-base font-bold text-slate-900 font-heading">
                                SPIN Strategic Resolution Sequence
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-[#2878B5] uppercase tracking-wider mb-1">01. Situation</div>
                                <div className="text-sm font-semibold text-slate-800 mb-2">Passive Inbound Reliance</div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Enterprise marketing relying on lead-capture forms, website visits, and direct rep prospecting to discover target accounts.
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">02. Problem</div>
                                <div className="text-sm font-semibold text-slate-800 mb-2">Latent Unindexed Research</div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Prospective enterprise committees research tools, cloud dependencies, and compliance anonymously months prior to vendor disclosure.
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1">03. Implication</div>
                                <div className="text-sm font-semibold text-slate-800 mb-2">Late Pipeline Engagement</div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Sales teams engage only after criteria and budgets have been shaped by competitors, driving downward pricing pressure.
                                </p>
                            </div>
                            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">04. Need-Payoff</div>
                                <div className="text-sm font-semibold text-emerald-950 mb-2">Pre-RFP Engagement</div>
                                <p className="text-xs text-emerald-900 leading-relaxed">
                                    Surface emerging buying intent early, enabling consultative guidance while architectural requirements are being formulated.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Applied Frameworks Modules */}
                    <div className="mb-12">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Applied Methodologies</div>
                        <h3 className="text-base font-bold text-slate-900 mb-4 font-heading">
                            Demand Intelligence Capability Modules
                        </h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#2878B5]/50 transition-all shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#2878B5] flex items-center justify-center font-bold text-xs mb-3">
                                    01
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Voice of Customer Deep Mining</h4>
                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                    Parses unstructured forums, developer discussions, and support queries to isolate recurring commercial friction points.
                                </p>
                                <div className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                                    Target: Unstructured buyer sentiment & technical roadblocks
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#2878B5]/50 transition-all shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs mb-3">
                                    02
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Derived Demand Tracking</h4>
                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                    Tracks upstream tech stack changes, regulatory disclosures, and hiring patterns that necessitate software adoption.
                                </p>
                                <div className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                                    Target: Ecosystem catalyst & compliance triggers
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#2878B5]/50 transition-all shadow-sm">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs mb-3">
                                    03
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1.5">FOMO & Competitive Pressure Modeling</h4>
                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                    Maps industry peer adoption curves to pinpoint accounts that face operational urgency to modernize.
                                </p>
                                <div className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                                    Target: Peer-velocity acceleration indicators
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trustworthy Measurement Framework */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 mb-4">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Performance Measurement Architecture</h4>
                                <p className="text-xs text-slate-500">Methodology evaluation benchmarks and data observability status</p>
                            </div>
                            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-200/70 text-slate-700">
                                Modeled Indicator System
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                                        <th className="py-2.5 pr-4">Evaluation Focus</th>
                                        <th className="py-2.5 px-4">Observable Friction</th>
                                        <th className="py-2.5 px-4">Analytical Capability</th>
                                        <th className="py-2.5 pl-4">Targeted Strategic Outcome</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                    <tr>
                                        <td className="py-3 pr-4 font-semibold text-slate-900">Intent Sourcing</td>
                                        <td className="py-3 px-4">Late-stage RFP entry</td>
                                        <td className="py-3 px-4">Voice-of-customer dark signal ingestion</td>
                                        <td className="py-3 pl-4 text-emerald-700 font-semibold">Earlier opportunity discovery pre-RFP</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 pr-4 font-semibold text-slate-900">Account Timing</td>
                                        <td className="py-3 px-4">Unresponsive cold outreach</td>
                                        <td className="py-3 px-4">Upstream infrastructure trigger detection</td>
                                        <td className="py-3 pl-4 text-emerald-700 font-semibold">Engagement timed to active procurement windows</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>


                {/* ============================================================ */}
                {/* ENGINE 02: AI-DRIVEN REVENUE ACCELERATION                    */}
                {/* ============================================================ */}
                <section id="revenue-acceleration" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="ai-revenue-acceleration" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    Engine 02
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    Sales Velocity & Pipeline Orchestration
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                AI-Driven Revenue Acceleration
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can we remove deal friction and help sales teams advance qualified opportunities?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("AI Revenue Acceleration Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Optimize Deal Velocity
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Interactive Deal Progression Funnel */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Deal Progression Topology</span>
                            <span className="text-xs text-slate-500 font-medium">Click a milestone stage to inspect friction resolution</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[
                                { id: 1, name: "Qualification", status: "Dynamic Scoring", friction: "Subjective rep qualification criteria" },
                                { id: 2, name: "Stakeholder Alignment", status: "Buying Group Mapping", friction: "Single-threaded champion risk" },
                                { id: 3, name: "Commercial Review", status: "Autonomous Collateral", friction: "Pricing & security review delays" },
                                { id: 4, name: "Execution & Close", status: "Close Signal Monitor", friction: "Procurement stall & unhandled vetoes" },
                            ].map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => setActiveDealStage(stage.id)}
                                    className={`p-4 rounded-2xl border text-left transition-all ${activeDealStage === stage.id ? 'bg-[#0B1528] text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100/60'}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xs font-mono font-bold ${activeDealStage === stage.id ? 'text-emerald-400' : 'text-slate-400'}`}>0{stage.id}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${activeDealStage === stage.id ? 'bg-white/10 text-slate-200' : 'bg-slate-200/70 text-slate-600'}`}>{stage.status}</span>
                                    </div>
                                    <div className="font-bold text-sm">{stage.name}</div>
                                    <div className={`text-xs mt-1.5 leading-snug line-clamp-1 ${activeDealStage === stage.id ? 'text-slate-300' : 'text-slate-500'}`}>{stage.friction}</div>
                                </button>
                            ))}
                        </div>

                        {/* Interactive Stage Resolution Details */}
                        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800">
                            {activeDealStage === 1 && (
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Stage 01 • Qualification Optimization</div>
                                        <h4 className="text-base font-bold mb-2">Predictive Opportunity Prioritization</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Replaces gut-feel BANT assessments with continuous ingestion of buyer behavioral telemetry, technology readiness markers, and budget approval timelines.
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-xs space-y-2">
                                        <div className="flex justify-between text-slate-300"><span>Data Ingestion:</span> <span className="font-mono text-emerald-400">Firmographics + Tech Readiness</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Rep Time Reclaimed:</span> <span className="font-mono text-white">Manual triage overhead eliminated</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Operational Impact:</span> <span className="font-mono text-sky-400">High-intent pipeline prioritization</span></div>
                                    </div>
                                </div>
                            )}
                            {activeDealStage === 2 && (
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Stage 02 • Stakeholder Alignment</div>
                                        <h4 className="text-base font-bold mb-2">Multi-Threaded Buying Committee Activation</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Identifies unengaged stakeholders (Procurement, Security, Legal) early in the sales motion and coordinates relevant commercial proofs before consensus breaks down.
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-xs space-y-2">
                                        <div className="flex justify-between text-slate-300"><span>Coverage Model:</span> <span className="font-mono text-emerald-400">CFO, CISO & Line-of-Business</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Risk Mitigation:</span> <span className="font-mono text-white">Prevents late single-champion stalls</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Operational Impact:</span> <span className="font-mono text-sky-400">Predictable consensus formation</span></div>
                                    </div>
                                </div>
                            )}
                            {activeDealStage === 3 && (
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Stage 03 • Commercial Review</div>
                                        <h4 className="text-base font-bold mb-2">Autonomous Workflow & Value Proofing</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Generates verified ROI models, security documentation packages, and contract redline guidance tailored to specific customer enterprise standards.
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-xs space-y-2">
                                        <div className="flex justify-between text-slate-300"><span>Document Acceleration:</span> <span className="font-mono text-emerald-400">Dynamic EVC Calculators</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Security Ingestion:</span> <span className="font-mono text-white">Automated questionnaire answers</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Operational Impact:</span> <span className="font-mono text-sky-400">Reduced legal & compliance cycle times</span></div>
                                    </div>
                                </div>
                            )}
                            {activeDealStage === 4 && (
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Stage 04 • Execution & Close</div>
                                        <h4 className="text-base font-bold mb-2">Conversational Deal Acceleration</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Synthesizes live meeting sentiment and buyer objections to trigger tailored next-step actions for account executives, preventing late-stage quarter-end slippage.
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-xs space-y-2">
                                        <div className="flex justify-between text-slate-300"><span>Sentiment Tracking:</span> <span className="font-mono text-emerald-400">Verbal & Email Signal Auditing</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Next-Action Engine:</span> <span className="font-mono text-white">Context-aware objection playbooks</span></div>
                                        <div className="flex justify-between text-slate-300"><span>Operational Impact:</span> <span className="font-mono text-sky-400">Improved forecast close reliability</span></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SPIN Matrix Narrative */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-emerald-600" />
                            <h3 className="text-base font-bold text-slate-900 font-heading">
                                Deal Friction Resolution Sequence
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-[#2878B5] uppercase tracking-wider mb-1">01. Situation</div>
                                <div className="text-sm font-semibold text-slate-800 mb-2">High Rep Admin Load</div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Sales teams spend considerable working hours on manual task administration, note logging, and manual CRM updating.
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">02. Problem</div>
                                <div className="text-sm font-semibold text-slate-800 mb-2">Stalled Pipeline Velocity</div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Mid-funnel opportunities stall due to unaddressed stakeholder objections and slow turnaround on custom technical materials.
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1">03. Implication</div>
                                <div className="text-sm font-semibold text-slate-800 mb-2">Forecast Volatility</div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Sales leadership deals with unpredictable quarterly forecasts as deals slip into future quarters without warning.
                                </p>
                            </div>
                            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5">
                                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">04. Need-Payoff</div>
                                <div className="text-sm font-semibold text-emerald-950 mb-2">Autonomous Orchestration</div>
                                <p className="text-xs text-emerald-900 leading-relaxed">
                                    Structured workflows dynamically surface friction points and guide reps to provide stakeholder-specific validation assets.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Applied Frameworks */}
                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Predictive Opportunity Prioritization</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Prioritizes active opportunities according to deal velocity indicators and verified buying committee engagement patterns.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Autonomous Sales Workflows</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Automates routine follow-up drafting, administrative CRM syncs, and stakeholder collateral delivery.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Conversational AI Deal Acceleration</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Surfaces key objection triggers from customer conversations and recommends verified objection playbooks.
                            </p>
                        </div>
                    </div>
                </section>


                {/* ============================================================ */}
                {/* ENGINE 03: AI-DRIVEN GROWTH HACKING                          */}
                {/* ============================================================ */}
                <section id="growth-hacking" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="ai-growth-hacking" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200/70">
                                    <Rocket className="w-3.5 h-3.5" />
                                    Engine 03
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    Algorithmic Experimentation Flywheel
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                AI-Driven Growth Hacking
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can we test, learn, and optimize acquisition strategies more efficiently?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("AI Growth Hacking Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Launch Growth Loops
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Visual Experimentation Loop */}
                    <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 text-white border border-slate-800 mb-12">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                            <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Continuous Experimentation Loop Architecture</span>
                            <span className="text-xs text-purple-400 font-mono">Loop Cycle: Iterative Synthesis</span>
                        </div>

                        {/* Interactive Step Track */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
                            {experimentSteps.map((step, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveLoopStep(idx)}
                                    className={`p-3.5 rounded-xl border text-left transition-all ${activeLoopStep === idx ? 'bg-purple-950/80 border-purple-500 text-white shadow-lg' : 'bg-slate-850/60 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}
                                >
                                    <div className="text-xs font-bold font-mono text-purple-400 mb-1">Step 0{idx + 1}</div>
                                    <div className="text-sm font-bold leading-tight">{step.title.split('. ')[1]}</div>
                                </button>
                            ))}
                        </div>

                        {/* Active Loop Step Explanation */}
                        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <span className="text-xs font-mono text-purple-400 font-bold block mb-1">
                                    {experimentSteps[activeLoopStep].metric}
                                </span>
                                <p className="text-sm text-slate-200 leading-relaxed max-w-2xl">
                                    {experimentSteps[activeLoopStep].desc}
                                </p>
                            </div>
                            <div className="shrink-0">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/40 border border-purple-600/40 text-purple-300 text-xs font-mono">
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    Active Feedback Vector
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Experimentation Capabilities & Methodologies */}
                    <div className="grid md:grid-cols-3 gap-5 mb-10">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs mb-3">01</div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Autonomous Growth Loop Engineering</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Formulates self-reinforcing acquisition loops where user activity and engagement naturally amplify downstream distribution.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs mb-3">02</div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Algorithmic Audience Discovery</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Discovers overlooked micro-cohorts by analyzing behavioral commonalities among top-tier lifetime value accounts.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs mb-3">03</div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Rapid Experimentation Flywheel</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Systematizes hypothesis logging, validation testing, and outcome tracking to accelerate organizational learning velocity.
                            </p>
                        </div>
                    </div>

                    {/* SPIN Matrix Narrative */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Strategic Problem-Solving</div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">Situation</span>
                                <p className="text-xs text-slate-700">Growth experiments require significant manual setup time across channels, limiting the number of tests executed per month.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-xs text-slate-700">Slow test cycles result in delayed learnings, leaving teams reliant on saturated acquisition playbooks.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Implication</span>
                                <p className="text-xs text-slate-700">Acquisition efficiency degrades as established channels face bid inflation and diminishing returns.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Need-Payoff</span>
                                <p className="text-xs text-slate-700">Rapid testing framework enables ongoing discovery of high-yield acquisition angles and untapped audiences.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ============================================================ */}
                {/* ENGINE 04: AI-DRIVEN PERFORMANCE MARKETING                   */}
                {/* ============================================================ */}
                <section id="performance-marketing" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="ai-performance-marketing" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/70">
                                    <BarChart3 className="w-3.5 h-3.5" />
                                    Engine 04
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    Attribution & Capital Optimization
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                AI-Driven Performance Marketing
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can we improve marketing efficiency and make budget allocation more informed?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("AI Performance Marketing Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Review Attribution Model
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Attribution & Channel Allocation Dashboard Concept */}
                    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                            <div>
                                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Channel Attribution & Capital Allocation Architecture</span>
                                <h3 className="text-base font-bold text-white mt-1">Multi-Touch Intent Weighting Matrix</h3>
                            </div>
                            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
                                Observational Attribution Model
                            </span>
                        </div>

                        {/* Interactive Channel Selector */}
                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                            <button
                                onClick={() => setSelectedChannel('search')}
                                className={`p-4 rounded-xl border text-left transition-all ${selectedChannel === 'search' ? 'bg-amber-950/70 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-amber-400">High-Intent Channel</div>
                                <div className="text-sm font-bold mt-1">Search & Inbound Keywords</div>
                                <div className="text-xs text-slate-400 mt-2">Explicit problem solving & brand query defense</div>
                            </button>

                            <button
                                onClick={() => setSelectedChannel('social')}
                                className={`p-4 rounded-xl border text-left transition-all ${selectedChannel === 'social' ? 'bg-amber-950/70 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-amber-400">Account Persona Channel</div>
                                <div className="text-sm font-bold mt-1">Target Account Paid Social</div>
                                <div className="text-xs text-slate-400 mt-2">Buying committee education & thought leadership</div>
                            </button>

                            <button
                                onClick={() => setSelectedChannel('programmatic')}
                                className={`p-4 rounded-xl border text-left transition-all ${selectedChannel === 'programmatic' ? 'bg-amber-950/70 border-amber-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-amber-400">Industry Retargeting</div>
                                <div className="text-sm font-bold mt-1">B2B Programmatic Display</div>
                                <div className="text-xs text-slate-400 mt-2">Stakeholder consensus reinforcement</div>
                            </button>
                        </div>

                        {/* Attribution Breakdown Box */}
                        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
                            {selectedChannel === 'search' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Touchpoint Role:</div>
                                        <div className="font-semibold text-white">First-touch intent capture & final conversion validation</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Optimization Vector:</div>
                                        <div className="font-semibold text-amber-400">Negative keyword hygiene & solution-specific ad copy</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Attribution Weighting:</div>
                                        <div className="font-semibold text-emerald-400">High direct intent contribution</div>
                                    </div>
                                </div>
                            )}
                            {selectedChannel === 'social' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Touchpoint Role:</div>
                                        <div className="font-semibold text-white">Mid-funnel consensus building across committee roles</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Optimization Vector:</div>
                                        <div className="font-semibold text-amber-400">Persona-tailored problem statements & peer proofs</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Attribution Weighting:</div>
                                        <div className="font-semibold text-emerald-400">Multi-touch committee influence credit</div>
                                    </div>
                                </div>
                            )}
                            {selectedChannel === 'programmatic' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Touchpoint Role:</div>
                                        <div className="font-semibold text-white">Brand presence maintenance during deal review cycles</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Optimization Vector:</div>
                                        <div className="font-semibold text-amber-400">Frequency capping & domain whitelist integrity</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Attribution Weighting:</div>
                                        <div className="font-semibold text-emerald-400">Pipeline acceleration & deal velocity support</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Applied Frameworks */}
                    <div className="grid md:grid-cols-3 gap-5 mb-10">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Hourly Ad Bid Arbitrage</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Evaluates dayparting and audience activity patterns to allocate ad budget during high-intent working hours.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Multi-Touch Attribution Engine</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Analyzes every committee touchpoint across the sales cycle to ensure marketing spend is credited accurately.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Dynamic Persona Ad Personalization</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Matches ad creative and messaging angles to specific stakeholder personas within target accounts.
                            </p>
                        </div>
                    </div>

                    {/* SPIN Matrix Narrative */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Attribution & Budget Optimization Sequence</div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Situation</span>
                                <p className="text-xs text-slate-700">Marketing budgets are allocated across multiple platforms based on historical reports and last-touch metrics.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-xs text-slate-700">Platform-reported ROAS often double-counts conversions, masking which channels actually produce qualified pipeline.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Implication</span>
                                <p className="text-xs text-slate-700">Budget is wasted on saturated channels while high-performing assist touchpoints are underfunded.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Need-Payoff</span>
                                <p className="text-xs text-slate-700">Unified attribution provides transparent visibility into channel contribution across the full buyer journey.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* SUITE CONSULTATION CTA FOOTER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase block mb-3">Strategic Implementation</span>
                        <h3 className="text-2xl sm:text-4xl font-extrabold font-heading mb-4 text-white">
                            Ready to Connect Your Growth Architecture?
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
                            Schedule a consultative session to review your current demand signals, revenue friction points, and acquisition measurement framework.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => openLongForm()}
                                className="px-7 py-3.5 rounded-xl bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm transition-all shadow-lg"
                            >
                                Schedule Strategic Review
                            </button>
                            <Link
                                to="/offerings/sales-acceleration"
                                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
                            >
                                View Sales Acceleration Suite →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
