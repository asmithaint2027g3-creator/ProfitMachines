import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Building2, Layers, ShoppingBag, Landmark, ArrowRight, CheckCircle2,
    Target, Users, ShieldCheck, Mail, Clock, Send, Sparkles, Check,
    ChevronRight, AlertCircle, FileText, Lock, ChevronDown, Award
} from 'lucide-react';
import { useLeadModal } from '../../context/LeadModalContext';

export default function SalesAccelerationSuiteView() {
    const { openQuickForm, openLongForm } = useLeadModal();

    // Engine 01 Buying Committee Stakeholder State
    const [selectedStakeholder, setSelectedStakeholder] = useState<'economic' | 'champion' | 'procurement' | 'ciso'>('economic');

    // Engine 02 SDR Cadence Step State
    const [activeCadenceStep, setActiveCadenceStep] = useState<number>(1);

    // Engine 03 D2C Checkout Friction Stage State
    const [activeCheckoutStage, setActiveCheckoutStage] = useState<'cart' | 'trust' | 'payment'>('trust');

    // Engine 04 BFSI Compliance Checkpoint State
    const [activeComplianceCheck, setActiveComplianceCheck] = useState<'identity' | 'audit' | 'data'>('audit');

    return (
        <div className="sales-acceleration-suite min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative selection:bg-emerald-100" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            {/* Breadcrumb Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    <Link to="/offerings" className="hover:text-[#2878B5] transition-colors">Offerings</Link>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                    <span className="text-[#2878B5] font-bold">Sales Acceleration Suite</span>
                </nav>
            </div>

            {/* 3. SUITE HERO — Matching Offerings Page Dark Aesthetic */}
            <section className="relative pt-12 md:pt-16 pb-16 md:pb-24 bg-[#050D1A] border-b border-slate-800 text-white overflow-hidden mb-16 md:mb-20">
                {/* Visual Ambient Glows */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute -top-24 right-1/4 w-[650px] h-[650px] bg-[#10B981]/15 rounded-full blur-[150px]" />
                    <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#0284C7]/20 rounded-full blur-[140px]" />
                </div>

                {/* Background Sophisticated Glowing Sales Acceleration Pipeline Graph Visualization */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35 overflow-hidden">
                    <svg className="w-full h-full max-w-7xl min-h-[500px]" viewBox="0 0 1200 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="salesLineGlow" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
                                <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.6" />
                                <stop offset="70%" stopColor="#10B981" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                            </linearGradient>
                            <linearGradient id="salesAreaGlow" x1="0" y1="0" x2="0" y2="450" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="salesSecondary" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#0284C7" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
                            </linearGradient>
                        </defs>

                        {/* Baseline Grid Guides */}
                        <line x1="60" y1="360" x2="1140" y2="360" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                        <line x1="60" y1="280" x2="1140" y2="280" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
                        <line x1="60" y1="200" x2="1140" y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
                        <line x1="60" y1="120" x2="1140" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.2" />

                        {/* Pipeline Area Fill */}
                        <path d="M 60 380 Q 220 370 340 310 T 620 250 T 880 140 T 1140 70 L 1140 420 L 60 420 Z" fill="url(#salesAreaGlow)" />

                        {/* Funnel Velocity Trace */}
                        <path d="M 60 400 Q 240 390 380 340 T 680 290 T 920 220 T 1140 150" stroke="url(#salesSecondary)" strokeWidth="2" strokeDasharray="5 5" fill="none" opacity="0.7" />

                        {/* Primary Closed-Won Acceleration Trajectory */}
                        <path d="M 60 380 Q 220 370 340 310 T 620 250 T 880 140 T 1140 70" stroke="url(#salesLineGlow)" strokeWidth="3.5" fill="none" />

                        {/* Node Coordinates */}
                        <circle cx="340" cy="310" r="4.5" fill="#38BDF8" />
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
                        SALES ACCELERATION SUITE · REVENUE VELOCITY
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.08] drop-shadow-md"
                        style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '-0.025em' }}>
                        Build a More Intelligent, Connected Sales Engine
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto mb-8"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                        Connect enterprise selling, inside sales execution, high-velocity commerce, and regulated sales workflows through a unified sales acceleration architecture.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#enterprise-sales"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2878B5] text-white font-bold text-sm hover:bg-[#1E6297] transition-all shadow-lg shadow-[#2878B5]/30 hover:-translate-y-0.5"
                        >
                            <span>Explore Sales Engines</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <button
                            type="button"
                            onClick={() => openLongForm()}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 hover:border-white/40 transition-all bg-white/5 backdrop-blur-md hover:-translate-y-0.5 cursor-pointer"
                        >
                            <span>Schedule Strategic Audit</span>
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
                        <a href="#enterprise-sales" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            01. Enterprise Sales
                        </a>
                        <a href="#digital-sales" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            02. Inside & Digital Sales
                        </a>
                        <a href="#d2c-sales" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            03. D2C Velocity
                        </a>
                        <a href="#bfsi-sales" className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#2878B5] hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                            04. BFSI Regulated Sales
                        </a>
                    </div>
                </div>
            </div>

            {/* MAIN ENGINE SECTIONS */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

                {/* ============================================================ */}
                {/* ENGINE 01: ENTERPRISE SALES ACCELERATION                     */}
                {/* ============================================================ */}
                <section id="enterprise-sales" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="enterprise" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#2878B5] border border-sky-200/70">
                                    <Building2 className="w-3.5 h-3.5" />
                                    Engine 01
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    Complex Committee Orchestration
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                Enterprise Sales Acceleration
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can enterprise sales teams coordinate complex buying committees and reduce deal friction?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("Enterprise Sales Acceleration Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Map Buying Committee
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Buying Committee Influence Map Interactive Diagram */}
                    <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 text-white border border-slate-800 mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                            <div>
                                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Enterprise Buying Committee Topology</span>
                                <h3 className="text-base font-bold text-white mt-1">Multi-Stakeholder Coverage & Influence Model</h3>
                            </div>
                            <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded border border-sky-800/50">
                                Stakeholder Matrix
                            </span>
                        </div>

                        {/* Interactive Stakeholder Persona Tabs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            {[
                                { id: 'economic', role: 'Economic Buyer (CFO / VP)', need: 'Line-item ROI & payback period' },
                                { id: 'champion', role: 'Internal Champion', need: 'Operational efficiency & team bandwidth' },
                                { id: 'procurement', role: 'Procurement & Legal', need: 'Commercial terms & contract risk' },
                                { id: 'ciso', role: 'CISO & IT Architect', need: 'Architecture, security, & integration' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedStakeholder(item.id as any)}
                                    className={`p-3.5 rounded-xl border text-left transition-all ${selectedStakeholder === item.id ? 'bg-sky-950/80 border-sky-500 text-white shadow-lg' : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}
                                >
                                    <div className="text-xs font-bold font-mono text-sky-400 mb-1">{item.role}</div>
                                    <div className="text-xs text-slate-400 line-clamp-1">{item.need}</div>
                                </button>
                            ))}
                        </div>

                        {/* Stakeholder Details Box */}
                        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
                            {selectedStakeholder === 'economic' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Primary Decision Trigger:</div>
                                        <div className="font-semibold text-white">Economic Value to Customer (EVC) & direct operating expense offset</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Common Deal Blocker:</div>
                                        <div className="font-semibold text-rose-400">Unclear payback timeline or inflated efficiency assumptions</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Mitigation Strategy:</div>
                                        <div className="font-semibold text-emerald-400">Board-ready financial defense model with conservative sensitivity tables</div>
                                    </div>
                                </div>
                            )}
                            {selectedStakeholder === 'champion' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Primary Decision Trigger:</div>
                                        <div className="font-semibold text-white">Pain reduction, automated team workflows, and career milestone achievement</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Common Deal Blocker:</div>
                                        <div className="font-semibold text-rose-400">Inability to defend proposal to internal cross-functional peers</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Mitigation Strategy:</div>
                                        <div className="font-semibold text-emerald-400">Champion enablement kit with executive summary decks and comparison guides</div>
                                    </div>
                                </div>
                            )}
                            {selectedStakeholder === 'procurement' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Primary Decision Trigger:</div>
                                        <div className="font-semibold text-white">Standardized terms, indemnification limits, and verified vendor solvency</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Common Deal Blocker:</div>
                                        <div className="font-semibold text-rose-400">Late redlines and unstandardized commercial liability clauses</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Mitigation Strategy:</div>
                                        <div className="font-semibold text-emerald-400">Pre-approved contract fallback terms and transparent volume tiering</div>
                                    </div>
                                </div>
                            )}
                            {selectedStakeholder === 'ciso' && (
                                <div className="grid md:grid-cols-3 gap-4 text-xs">
                                    <div>
                                        <div className="text-slate-400 mb-1">Primary Decision Trigger:</div>
                                        <div className="font-semibold text-white">Data residency, RBAC, SSO/SAML support, and architectural isolation</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Common Deal Blocker:</div>
                                        <div className="font-semibold text-rose-400">Delayed security questionnaire responses and unclear audit trails</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 mb-1">Mitigation Strategy:</div>
                                        <div className="font-semibold text-emerald-400">Comprehensive security packet with architectural blueprints and data flows</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Applied Frameworks */}
                    <div className="grid md:grid-cols-3 gap-5 mb-10">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#2878B5] flex items-center justify-center font-bold text-xs mb-3">01</div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Account Stakeholder Influence Mapping</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Maps reporting lines, informal influencers, and veto holders across the target enterprise hierarchy.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#2878B5] flex items-center justify-center font-bold text-xs mb-3">02</div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Economic Value to Customer (EVC)</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Quantifies hard cost displacement and revenue upside to establish defensible contract pricing.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#2878B5] flex items-center justify-center font-bold text-xs mb-3">03</div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Procurement Risk Mitigation</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Streamlines legal redlining and terms alignment early to prevent end-of-quarter deal paralysis.
                            </p>
                        </div>
                    </div>

                    {/* SPIN Narrative */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Enterprise Sales SPIN Analysis</div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-[#2878B5] uppercase tracking-wider block mb-1">Situation</span>
                                <p className="text-xs text-slate-700">Enterprise sales engagements involve distributed committees across procurement, IT, legal, and operational leadership.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-xs text-slate-700">Reps often stay single-threaded with one champion, leaving unengaged committee members to veto late in the process.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Implication</span>
                                <p className="text-xs text-slate-700">Deals stall indefinitely in procurement or legal review, resulting in slipping forecasts and high sales rep turnover.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Need-Payoff</span>
                                <p className="text-xs text-slate-700">Proactive stakeholder coverage aligns requirements across every buyer persona before formal contracting begins.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ============================================================ */}
                {/* ENGINE 02: DIGITAL & INSIDE SALES ACCELERATION               */}
                {/* ============================================================ */}
                <section id="digital-sales" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="digital" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                                    <Layers className="w-3.5 h-3.5" />
                                    Engine 02
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    High-Volume SDR Cadence
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                Digital & Inside Sales Acceleration
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can sales teams increase execution consistency and reduce manual prospecting work?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("Inside Sales Acceleration Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Automate SDR Cadence
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Visual Prospecting-to-Meeting Sequence */}
                    <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 text-white border border-slate-800 mb-12">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                            <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">SDR Multi-Channel Execution Workflow</span>
                            <span className="text-xs text-indigo-400 font-mono">Cadence Progression</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[
                                { step: 1, title: "Day 1 • Ingestion & Signal Match", detail: "Enrichment & persona-specific problem identification" },
                                { step: 2, title: "Day 3 • Multi-Touch Outreach", detail: "Personalized email + LinkedIn touchpoint coordination" },
                                { step: 3, title: "Day 7 • Objection Guidance", detail: "Autonomous context-aware response drafting" },
                                { step: 4, title: "Day 10 • AE Handoff & Booking", detail: "Frictionless calendar booking and discovery brief sync" }
                            ].map((item) => (
                                <button
                                    key={item.step}
                                    onClick={() => setActiveCadenceStep(item.step)}
                                    className={`p-4 rounded-xl border text-left transition-all ${activeCadenceStep === item.step ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-md' : 'bg-slate-850/60 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}
                                >
                                    <div className="text-xs font-mono font-bold text-indigo-400 mb-1">Step 0{item.step}</div>
                                    <div className="text-sm font-bold text-white mb-1.5">{item.title.split(' • ')[1]}</div>
                                    <div className="text-xs text-slate-400 line-clamp-2">{item.detail}</div>
                                </button>
                            ))}
                        </div>

                        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 text-xs text-slate-300">
                            {activeCadenceStep === 1 && (
                                <div>
                                    <span className="text-indigo-400 font-bold block mb-1">Autonomous Ingestion & ICP Validation</span>
                                    New leads and target accounts are automatically enriched with technographic data, hiring trends, and corporate disclosures before reaching rep queues.
                                </div>
                            )}
                            {activeCadenceStep === 2 && (
                                <div>
                                    <span className="text-indigo-400 font-bold block mb-1">Personalized Multi-Channel Touchpoint Execution</span>
                                    SDR Co-Pilot drafts tailored email copy referencing recent prospect initiatives and triggers timely connection touches across communication channels.
                                </div>
                            )}
                            {activeCadenceStep === 3 && (
                                <div>
                                    <span className="text-indigo-400 font-bold block mb-1">Dynamic Objection Resolution Playbooks</span>
                                    When prospects raise timing or pricing constraints, the system prepares targeted responses backed by relevant case studies and peer metrics.
                                </div>
                            )}
                            {activeCadenceStep === 4 && (
                                <div>
                                    <span className="text-indigo-400 font-bold block mb-1">Seamless Account Executive Hand-Off</span>
                                    Booked conversations are synced directly to AE calendars with a structured one-page intelligence brief summarizing prospect pain points and engagement history.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Capabilities Modules */}
                    <div className="grid md:grid-cols-3 gap-5 mb-10">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Autonomous SDR Co-Pilot</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Coordinates routine research, outreach drafting, and CRM administration to free reps for high-value buyer conversations.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Cadence Personalization Autopilot</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Tailors cadence spacing and messaging angles based on prospect seniority, industry, and previous engagement behavior.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Real-Time Objection Resolution</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Provides reps with instant response frameworks when dealing with common competitor comparisons or timeline pushback.
                            </p>
                        </div>
                    </div>

                    {/* SPIN Narrative */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Inside Sales Execution Sequence</div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">Situation</span>
                                <p className="text-xs text-slate-700">Inside sales reps manage large account lists with manual prospecting, copy-pasting email templates, and manual logging.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-xs text-slate-700">Slow follow-up times and generic outreach result in low reply rates and inconsistent pipeline creation.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Implication</span>
                                <p className="text-xs text-slate-700">MQL-to-meeting conversion remains stagnant while rep burnout and administrative overhead rise.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Need-Payoff</span>
                                <p className="text-xs text-slate-700">Automated workflows ensure every qualified account receives timely, relevant outreach and frictionless scheduling.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ============================================================ */}
                {/* ENGINE 03: D2C & HIGH-VELOCITY SALES ACCELERATION            */}
                {/* ============================================================ */}
                <section id="d2c-sales" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="d2c" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/70">
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    Engine 03
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    High-Velocity Commerce & Checkout
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                D2C & High-Velocity Sales Acceleration
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can digital commerce businesses remove buying friction and improve purchase completion?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("D2C Sales Acceleration Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Optimize Checkout Journey
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Purchase Journey and Checkout Visualization */}
                    <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 text-white border border-slate-800 mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                            <div>
                                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Commerce Journey Friction Resolution</span>
                                <h3 className="text-base font-bold text-white mt-1">Discovery to Payment Progression</h3>
                            </div>
                            <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800/50">
                                Conversion Flow
                            </span>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                            <button
                                onClick={() => setActiveCheckoutStage('cart')}
                                className={`p-4 rounded-xl border text-left transition-all ${activeCheckoutStage === 'cart' ? 'bg-rose-950/70 border-rose-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-rose-400">Stage 01 • Product Cart</div>
                                <div className="text-sm font-bold mt-1">Cart Abandonment Resolution</div>
                                <div className="text-xs text-slate-400 mt-2">Transparent total landed cost & instant shipping quotes</div>
                            </button>

                            <button
                                onClick={() => setActiveCheckoutStage('trust')}
                                className={`p-4 rounded-xl border text-left transition-all ${activeCheckoutStage === 'trust' ? 'bg-rose-950/70 border-rose-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-rose-400">Stage 02 • Checkout Review</div>
                                <div className="text-sm font-bold mt-1">Dynamic Social Proof & Guarantees</div>
                                <div className="text-xs text-slate-400 mt-2">Contextual peer reviews and clear return policy badges</div>
                            </button>

                            <button
                                onClick={() => setActiveCheckoutStage('payment')}
                                className={`p-4 rounded-xl border text-left transition-all ${activeCheckoutStage === 'payment' ? 'bg-rose-950/70 border-rose-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-rose-400">Stage 03 • Payment Gateway</div>
                                <div className="text-sm font-bold mt-1">Behavioral Checkout Personalization</div>
                                <div className="text-xs text-slate-400 mt-2">1-click express wallets (Apple Pay, Google Pay, Klarna)</div>
                            </button>
                        </div>

                        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 text-xs text-slate-300">
                            {activeCheckoutStage === 'cart' && (
                                <div>
                                    <span className="text-rose-400 font-bold block mb-1">Cart Abandonment Friction Resolution</span>
                                    Surprise shipping fees and unexpected checkout steps cause significant drop-offs. Upfront pricing and estimated delivery dates stabilize purchase momentum.
                                </div>
                            )}
                            {activeCheckoutStage === 'trust' && (
                                <div>
                                    <span className="text-rose-400 font-bold block mb-1">Dynamic Social Proof Engine</span>
                                    Displays authenticated customer feedback and satisfaction badges matching the specific product category currently in the visitor's basket.
                                </div>
                            )}
                            {activeCheckoutStage === 'payment' && (
                                <div>
                                    <span className="text-rose-400 font-bold block mb-1">Behavioral Checkout Personalization</span>
                                    Adapts checkout layout based on device and user profile, presenting preferred one-tap digital wallets to minimize input fatigue.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Applied Frameworks */}
                    <div className="grid md:grid-cols-3 gap-5 mb-10">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Behavioral Checkout Personalization</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Dynamically orders payment options and form fields based on device type and regional buyer preferences.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Cart Abandonment Friction Resolution</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Identifies micro-friction points in the checkout funnel and implements immediate recovery triggers.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Dynamic Social Proof Engine</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Presents verified review highlights and product guarantees at the exact moment of purchase decision.
                            </p>
                        </div>
                    </div>

                    {/* SPIN Narrative */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">D2C Purchase Journey SPIN Analysis</div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Situation</span>
                                <p className="text-xs text-slate-700">Digital commerce platforms drive paid and organic traffic to standardized checkout flows across all customer segments.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-xs text-slate-700">Friction in form completion, lack of local payment preferences, and hidden shipping fees cause cart abandonment.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Implication</span>
                                <p className="text-xs text-slate-700">Customer acquisition costs rise while overall marketing return on ad spend deteriorates.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Need-Payoff</span>
                                <p className="text-xs text-slate-700">Friction-free checkout experience with dynamic trust signals maximizes purchase completion rates.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ============================================================ */}
                {/* ENGINE 04: BFSI SALES ACCELERATION                           */}
                {/* ============================================================ */}
                <section id="bfsi-sales" className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden">
                    <div id="bfsi" className="absolute -top-28 left-0 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                                    <Landmark className="w-3.5 h-3.5" />
                                    Engine 04
                                </span>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    Regulated Financial Workflows
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                                BFSI Sales Acceleration
                            </h2>
                            <p className="text-base sm:text-lg text-slate-600 font-medium mt-2 max-w-2xl">
                                Core Question: <span className="italic text-slate-800 font-semibold">How can financial services organizations streamline sales workflows while respecting compliance requirements?</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => openQuickForm("BFSI Sales Acceleration Engine")}
                                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                            >
                                Schedule Compliance Audit
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Secure Onboarding & Compliance Checkpoint Architecture */}
                    <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 text-white border border-slate-800 mb-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                            <div>
                                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Regulated Funnel Architecture</span>
                                <h3 className="text-base font-bold text-white mt-1">Compliance Checkpoints Across the Customer Journey</h3>
                            </div>
                            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
                                Audit-Ready Model
                            </span>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                            <button
                                onClick={() => setActiveComplianceCheck('identity')}
                                className={`p-4 rounded-xl border text-left transition-all ${activeComplianceCheck === 'identity' ? 'bg-emerald-950/70 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-emerald-400">Checkpoint 01</div>
                                <div className="text-sm font-bold mt-1">Identity & KYB Ingestion</div>
                                <div className="text-xs text-slate-400 mt-2">Verified entity validation and legal registration checks</div>
                            </button>

                            <button
                                onClick={() => setActiveComplianceCheck('audit')}
                                className={`p-4 rounded-xl border text-left transition-all ${activeComplianceCheck === 'audit' ? 'bg-emerald-950/70 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-emerald-400">Checkpoint 02</div>
                                <div className="text-sm font-bold mt-1">Audit-Ready Lead Attribution</div>
                                <div className="text-xs text-slate-400 mt-2">Immutable logging of disclosures, terms, and consent</div>
                            </button>

                            <button
                                onClick={() => setActiveComplianceCheck('data')}
                                className={`p-4 rounded-xl border text-left transition-all ${activeComplianceCheck === 'data' ? 'bg-emerald-950/70 border-emerald-500 text-white' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}
                            >
                                <div className="text-xs font-mono font-bold text-emerald-400">Checkpoint 03</div>
                                <div className="text-sm font-bold mt-1">Secure Banking Funnel Architecture</div>
                                <div className="text-xs text-slate-400 mt-2">Encrypted document vaults and role-based permissions</div>
                            </button>
                        </div>

                        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 text-xs text-slate-300">
                            {activeComplianceCheck === 'identity' && (
                                <div>
                                    <span className="text-emerald-400 font-bold block mb-1">Automated Identity & Verification Routing</span>
                                    Validates business entity registration, corporate structure, and compliance checklists automatically before initiation of formal sales discussions.
                                </div>
                            )}
                            {activeComplianceCheck === 'audit' && (
                                <div>
                                    <span className="text-emerald-400 font-bold block mb-1">Complete Audit Trail Documentation</span>
                                    Logs prospect consent timestamps, disclaimer acknowledgments, and sales rep disclosures in an audit-ready format for regulatory oversight.
                                </div>
                            )}
                            {activeComplianceCheck === 'data' && (
                                <div>
                                    <span className="text-emerald-400 font-bold block mb-1">Secure Funnel Governance</span>
                                    Enforces strict role-based access control and end-to-end encryption across all documents submitted during the onboarding lifecycle.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Capabilities Modules */}
                    <div className="grid md:grid-cols-3 gap-5 mb-10">
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Regulatory Compliance Automation</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Embeds regulatory checkpoints and disclosure tracking directly into sales qualification sequences.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Audit-Ready Lead Attribution</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Maintains verifiable records of inbound consent, qualification parameters, and communication history.
                            </p>
                        </div>
                        <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                            <h4 className="text-sm font-bold text-slate-900 mb-1.5">Secure Banking Funnel Architecture</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Provides encrypted data handling and granular permissions for high-net-worth and institutional clients.
                            </p>
                        </div>
                    </div>

                    {/* SPIN Narrative */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">BFSI Regulated Sales SPIN Analysis</div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">Situation</span>
                                <p className="text-xs text-slate-700">Financial services sales require strict documentation, identity verification, and multi-layered compliance sign-offs.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Problem</span>
                                <p className="text-xs text-slate-700">Manual compliance review cycles slow deal velocity and introduce documentation discrepancies across accounts.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">Implication</span>
                                <p className="text-xs text-slate-700">High-value prospects drop out during lengthy onboarding cycles, resulting in delayed time-to-revenue.</p>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">Need-Payoff</span>
                                <p className="text-xs text-slate-700">Standardized, compliant workflows compress onboarding turnaround while maintaining full auditability.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* SUITE CONSULTATION CTA FOOTER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase block mb-3">Enterprise Alignment</span>
                        <h3 className="text-2xl sm:text-4xl font-extrabold font-heading mb-4 text-white">
                            Ready to Streamline Your Sales Workflows?
                        </h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
                            Schedule a strategic sales acceleration audit to assess committee mapping, SDR cadence efficiency, and compliance workflows.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => openLongForm()}
                                className="px-7 py-3.5 rounded-xl bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-sm transition-all shadow-lg"
                            >
                                Schedule Strategic Audit
                            </button>
                            <Link
                                to="/offerings/ai-growth"
                                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
                            >
                                View AI Growth Suite →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
