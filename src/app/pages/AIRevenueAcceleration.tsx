
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Zap, Bot, Target, ArrowRight, Gauge, Users2, Rocket, Handshake, ShieldCheck, Coins, Recycle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIRevenueAcceleration() {
    useEffect(() => {
        document.title = "AI Revenue Acceleration ™ 2.0 | ProfitMachines";
        window.scrollTo(0, 0);
    }, []);

    const agentTypes = [
        {
            type: "Discovery Agents",
            level: "Level 4 (Task Autonomy)",
            workflow: "Scans 200+ signals → identifies intent → qualifies → outreach",
            capability: "Multi-Modal Intelligence: Analyzes earnings calls, patent filings, and hiring patterns to detect hidden intent 60-90 days early."
        },
        {
            type: "Engagement Agents",
            level: "Level 5 (Process Autonomy)",
            workflow: "Owns full conversation thread with contextual memory & EQ",
            capability: "Sentiment Trajectory Modeling: Predicts emotional state progression and auto-adjusts messaging for cultural contexts."
        },
        {
            type: "Validation Agents",
            level: "Level 5 (Process Autonomy)",
            workflow: "Executes real-time qualification: budget, authority, timeline",
            capability: "Financial Stress Testing: Simulates prospect's budget scenarios and identifies hidden influencers through network analysis."
        },
        {
            type: "Negotiation Agents",
            level: "Level 4 (Task Autonomy)",
            workflow: "Generates counter-proposals with risk scoring; auto-adjusts pricing",
            capability: "Game Theory Optimization: Employs Nash equilibrium models to predict optimal concession strategies based on competitor behavior."
        },
        {
            type: "Fulfillment Agents",
            level: "Level 5 (Process Autonomy)",
            workflow: "Orchestrates post-sale handoff; triggers expansion signals",
            capability: "Value Realization Monitoring: Tracks actual vs. promised value delivery through product telemetry."
        },
        {
            type: "Expansion Agents",
            level: "Level 5 (Process Autonomy)",
            workflow: "Executes upsell/cross-sell motions within existing accounts",
            capability: "Usage Pattern Forecasting: Predicts feature adoption trajectories and detects champion migration 45-60 days in advance."
        }
    ];

    const offerings = [
        {
            icon: Rocket,
            title: "Autonomous Deal Velocity Engine",
            desc: "Self-optimizing agent that compresses sales cycles by diagnosing 37 stall archetypes (Procurement Limbo, Champion Attrition, etc.) and executing micro-interventions.",
            stats: "67% Pricing Stall Progression Success"
        },
        {
            icon: Target,
            title: "Predictive Account Expansion Agent",
            desc: "Identifies expansion readiness 45-60 days early using 43 behavioral signals and executes proactive upsell/cross-sell motions.",
            stats: "34% Higher Net Revenue Retention"
        },
        {
            icon: Bot,
            title: "Lead-to-Revenue Orchestrator",
            desc: "Single agent that owns lead from first touch to closed deal + first value milestone, reducing transition friction by 94%.",
            stats: "Zero-touch revenue scaling for Startups"
        },
        {
            icon: ShieldCheck,
            title: "Competitive Displacement Agent",
            desc: "Identifies competitor customers via job changes or funding and executes targeted friction removal protocols.",
            stats: "29% win rate on competitive deals"
        },
        {
            icon: Coins,
            title: "Autonomous Pricing & Negotiation",
            desc: "Dynamic pricing adjusted by firmographics, behavior, and temporal signals with 120+ pre-approved counter-moves.",
            stats: "23% Increase in Average Deal Size"
        },
        {
            icon: Recycle,
            title: "Churn Prevention & Reactivation",
            desc: "Predicts churn 30-45 days early using 87 signals (Usage concentration, payment delays) and triggers save motions.",
            stats: "52% Reduction in Logo Churn"
        },
        {
            icon: Handshake,
            title: "Autonomous Referral & Advocacy",
            desc: "Systematically converts customers into revenue advocates by triggering frictionless referral requests at peak value moments.",
            stats: "34% of New Pipeline Contribution"
        },
        {
            icon: Settings,
            title: "Revenue Operations Autopilot",
            desc: "Self-managing RevOps layer that optimizes lead routing, forecast accuracy, compensation, and CRM hygiene autonomously.",
            stats: "73% Elimination of manual RevOps tasks"
        }
    ];

    const benchmarks = [
        { metric: "Sales Cycle Length", before: "92 days", after: "54 days", impact: "41% faster" },
        { metric: "Lead-to-Opportunity", before: "23%", after: "41%", impact: "78% improvement" },
        { metric: "Win Rate", before: "28%", after: "39%", impact: "39% improvement" },
        { metric: "Average Deal Size", before: "$24,500", after: "$30,100", impact: "23% increase" },
        { metric: "Revenue per Rep", before: "$482K/year", after: "$697K/year", impact: "45% increase" },
        { metric: "Referral Contribution", before: "8%", after: "34%", impact: "4.25x increase" }
    ];

    const segments = [
        {
            name: "Enterprises",
            pain: "72% deals involve 6.8+ stakeholders; CFO approval delays",
            offering: "Deal Velocity + RevOps Autopilot",
            impact: "Cycle reduction & margin control"
        },
        {
            name: "Startups",
            pain: "78% CAC spent on low-intent; Founders stuck in admin",
            offering: "Autonomous Prospecting + Pricing",
            impact: "Zero-touch scaling to $10M ARR"
        },
        {
            name: "Retail Brands",
            pain: "Cart abandonment friction; 52% customers never return",
            offering: "Checkout Optimization + Reactivation",
            impact: "AOV & Viral Coefficient growth"
        },
        {
            name: "Mid-Market",
            pain: "Lead decay due to slow follow-up; coverage gaps",
            offering: "Lead-to-Revenue Orchestrator",
            impact: "3.1x pipeline coverage"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <style>{`
                        @keyframes fadeZoom {
                            0% { opacity: 0; transform: scale(1); }
                            5% { opacity: 1; transform: scale(1.05); }
                            20% { opacity: 1; transform: scale(1.1); }
                            25% { opacity: 0; transform: scale(1.15); }
                            100% { opacity: 0; transform: scale(1); }
                        }
                        .animate-slide-1 { animation: fadeZoom 25s infinite 0s; }
                        .animate-slide-2 { animation: fadeZoom 25s infinite 5s; }
                        .animate-slide-3 { animation: fadeZoom 25s infinite 10s; }
                        .animate-slide-4 { animation: fadeZoom 25s infinite 15s; }
                    `}</style>

                    {[
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1504868584819-f8e905263543?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=1920&q=80"
                    ].map((img, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 bg-cover bg-center opacity-0 animate-slide-${idx + 1}`}
                            
                        />
                    ))}
                    <div className="absolute inset-0 bg-white/40 bg-gradient-to-b from-white/90 via-white/30 to-white/90"></div>
                </div>

                <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border border-emerald-100/60 shadow-[0_2px_10px_-4px_rgba(6,78,59,0.3)] text-[#1E6297] text-sm font-bold mb-8 backdrop-blur-sm animate-fade-in-up">
                        <Zap className="w-4 h-4 text-[#2878B5]" />
                        <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent uppercase tracking-wider">Revenue Auto-Pilot 2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
                        AUTONOMOUS <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-emerald-700 to-teal-700 uppercase">
                            Revenue Acceleration
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed font-semibold">
                        Self-Executing AI Agents That Own End-to-End Revenue Workflows. <br />
                        <span className="text-[#2878B5] italic underline decoration-blue-100 underline-offset-8">From "AI Tools" to Autonomous Revenue Owners.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                        <Link to="/book-consultation">
                            <Button className="bg-gradient-to-r from-[#2878B5] to-emerald-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-7 text-xl h-auto rounded-xl shadow-lg shadow-[#2878B5]/25 hover:shadow-[#2878B5]/35 transition-all hover:-translate-y-1 font-bold italic">
                                ACTIVATE AUTO-PILOT
                            </Button>
                        </Link>
                    </div>

                    {/* Real-World Autonomous Sales Engine Showcase */}
                    <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
                        <img 
                            src="/images/revenue-acceleration-engine.png" 
                            alt="ProfitMachines Autonomous AI Sales Engine Command Center" 
                            className="w-full h-[420px] md:h-[520px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-center justify-between text-left gap-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800">
                            <div>
                                <div className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                                    Autonomous Revenue OS v2.0
                                </div>
                                <h3 className="text-xl font-bold text-white mt-1">Multi-Agent Deal Velocity & Pipeline Execution Platform</h3>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                                <div className="px-3 py-1.5 bg-[#2878B5]/20 border border-emerald-600/30 rounded-lg text-emerald-400 font-bold">
                                    67% Stall Progression Rate
                                </div>
                                <div className="px-3 py-1.5 bg-emerald-600/20 border border-emerald-500/30 rounded-lg text-emerald-400 font-bold">
                                    94% Friction Reduction
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Agent Architecture Section */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-[#2878B5] font-bold uppercase tracking-widest mb-4">Core Agent Architecture</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 italic">The Six Levels of Agent Autonomy</h3>
                        <p className="text-slate-500 font-medium mt-4 max-w-2xl mx-auto italic">"Discovery Agents autonomously close 37% of SMB deals {"<"}$15K without human touch."</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {agentTypes.map((agent, i) => (
                            <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-[20px] hover:bg-white hover:shadow-2xl transition-all duration-300 group">
                                <div className="w-12 h-12 bg-slate-900 group-hover:bg-[#2878B5] text-white rounded-xl flex items-center justify-center mb-6 transition-colors shadow-lg">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-bold mb-1 text-slate-900">{agent.type}</h4>
                                <p className="text-[#2878B5] font-bold text-xs uppercase mb-4 tracking-wider">{agent.level}</p>
                                <p className="text-slate-500 text-sm font-bold mb-4 border-l-2 border-emerald-200 pl-4">{agent.workflow}</p>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">{agent.capability}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep-Dive Offerings Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-20">
                        <h2 className="text-[#2878B5] font-bold uppercase tracking-widest mb-4">Deep-Dive Offerings</h2>
                        <h3 className="text-5xl font-black text-slate-900">8 Autonomous Pillars for Growth</h3>
                        <p className="text-slate-500 font-medium mt-4 max-w-3xl">Traditional "AI Sales Tools" recommend actions; Autonomous Revenue Acceleration ™ executes them.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offerings.map((offering, i) => (
                            <div key={i} className="bg-white p-8 rounded-[20px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                                <div className="mb-6">
                                    <offering.icon className="w-10 h-10 text-[#2878B5]" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-4">{offering.title}</h4>
                                <p className="text-slate-600 font-medium mb-8 leading-relaxed text-sm flex-grow">{offering.desc}</p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[#2878B5] font-black text-sm uppercase italic">{offering.stats}</span>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benchmarks Section */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Gauge className="w-20 h-20 text-[#2878B5] mx-auto mb-6 animate-pulse" />
                        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Quantified Revenue Benchmarks</h2>
                        <p className="text-slate-600 font-medium">Verified by Research Across 12,000+ B2B Deals & $8.4B in Pipeline.</p>
                    </div>

                    <div className="overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="p-8 text-sm font-black uppercase tracking-widest italic">Metric</th>
                                    <th className="p-8 text-sm font-black uppercase tracking-widest italic">Traditional</th>
                                    <th className="p-8 text-sm font-black uppercase tracking-widest italic text-emerald-400">Autonomous</th>
                                    <th className="p-8 text-sm font-black uppercase tracking-widest italic">Impact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {benchmarks.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-8 font-black text-slate-900">{row.metric}</td>
                                        <td className="p-8 text-slate-400 font-bold">{row.before}</td>
                                        <td className="p-8 text-[#2878B5] font-black text-lg">{row.after}</td>
                                        <td className="p-8">
                                            <span className="px-5 py-2 bg-green-100 text-green-700 text-sm font-black rounded-xl shadow-sm">
                                                {row.impact}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Segment Packaging Section */}
            <section className="py-24 bg-slate-950 text-white overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-20 text-center">
                        <h3 className="text-4xl md:text-5xl font-black italic mb-6">Enhanced Segment Positioning</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto font-medium">Tailored autonomous systems for every stage of market growth.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {segments.map((seg, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-emerald-600/50 transition-all group">
                                <h4 className="text-2xl font-black mb-4 text-emerald-400 italic">{seg.name}</h4>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Core Pain</p>
                                        <p className="text-sm font-medium text-slate-300 leading-relaxed">{seg.pain}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-xs font-black uppercase tracking-widest text-emerald-600/60 mb-2">Primary Offering</p>
                                        <p className="text-sm font-bold text-white italic">{seg.offering}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-green-500/60 mb-2">Revenue Impact</p>
                                        <p className="text-sm font-bold text-slate-300 italic">{seg.impact}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Human-AI Collaboration Section */}
            <section className="py-24 bg-white overflow-hidden relative border-y border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-[#2878B5] font-bold uppercase tracking-widest mb-6">The Strategic Insight</h2>
                            <h3 className="text-5xl font-black mb-8 leading-tight italic text-slate-900">Eliminate Admin. <br /> Own the Revenue.</h3>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                                Autonomous agents save reps **6 hours per day** (75% of admin time), allowing focuses on multi-stakeholder negotiation and strategic relationship development.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { label: "Data entry & CRM hygiene", ai: "100%", human: "0%" },
                                    { label: "Initial outreach & qualification", ai: "94%", human: "Exception handling" },
                                    { label: "Pricing & proposal generation", ai: "78%", human: "Complex Negotiation" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="font-bold text-slate-700">{item.label}</span>
                                        <div className="flex gap-4">
                                            <span className="text-[#2878B5] font-black">AI: {item.ai}</span>
                                            <span className="text-slate-400 font-bold">Human: {item.human}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#2878B5]/10 blur-[100px] rounded-xl"></div>
                            <div className="relative p-12 bg-slate-900 rounded-[3rem] shadow-2xl border border-white/10 text-center">
                                <Users2 className="w-20 h-20 text-emerald-400 mx-auto mb-8" />
                                <p className="text-6xl font-black text-white mb-4 italic">67%</p>
                                <p className="text-xl text-slate-400 font-bold leading-relaxed">
                                    of time reallocated to <br />
                                    <span className="text-white italic">Revenue-Generating Activities</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This is Different Section */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">Beyond "AI Assisted"</h2>
                        <p className="text-slate-500 font-bold mt-4 italic uppercase tracking-widest text-sm">Revenue Ownership vs. Task Assistance</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: "Decision Logic", trad: "Recommend actions → human executes", auto: "Agent executes autonomously", impact: "63-89% hands-free workflows" },
                            { label: "Lead Management", trad: "Score leads → human follows up", auto: "Agent qualifies + nurtures + books consulting", impact: "78% lead conversion lift" },
                            { label: "Communication", trad: "Suggest copy → human sends", auto: "Agent crafts + sends + follows up", impact: "24/7 engagement coverage" },
                            { label: "Human Role", trad: "In-the-loop for every step", auto: "Engaged only for exceptions", impact: "6 hrs/day productivity gain" },
                            { label: "Learning", trad: "Static models requiring updates", auto: "Self-optimizing A/B testing", impact: "22% conversion improvement" },
                            { label: "Integration", trad: "Fragmented point solutions", auto: "Unified Revenue System", impact: "Single source of truth" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[20px] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all group">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 group-hover:text-emerald-600 transition-colors">{item.label}</p>
                                <div className="space-y-4 mb-6">
                                    <div className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-slate-200 mt-1.5 rounded-xl" />
                                        <p className="text-sm text-slate-400 font-medium">Traditional: {item.trad}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-emerald-600 mt-1.5 rounded-xl" />
                                        <p className="text-sm text-slate-900 font-bold italic">Autonomous: {item.auto}</p>
                                    </div>
                                </div>
                                <p className="text-[#2878B5] font-black text-xs uppercase italic tracking-widest">Impact: {item.impact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Rocket className="w-12 h-12 text-[#2878B5] mx-auto mb-6" />
                        <h2 className="text-4xl font-black text-slate-900 mb-4">The Agentic Future (2026-2027)</h2>
                        <p className="text-slate-500 font-bold italic tracking-widest uppercase text-sm">Beyond Optimization → Market Transformation</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { year: "Q2 2026", title: "Multi-Agent Orchestration", desc: "Agent-to-agent (A2A) protocol standards enabling cross-vendor coordination." },
                            { year: "Q4 2026", title: "AI-to-AI Negotiations", desc: "Procurement and sales agents engaging in autonomous negotiations within set guardrails." },
                            { year: "2027", title: "Predictive Market Making", desc: "Agents shaping demand through autonomous content creation and thought leadership." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-white rounded-[20px] border border-slate-200 shadow-sm flex gap-8 items-start hover:shadow-md transition-shadow">
                                <span className="bg-slate-900 text-white px-4 py-1 rounded-xl text-xs font-black shrink-0">{item.year}</span>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-slate-600 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2878B5]/10 via-teal-700/10 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight italic uppercase tracking-tighter">
                        Move to <span className="text-[#2878B5]">AI-Owned</span> <br /> Revenue Workflows
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-bold leading-relaxed">
                        capture the $130B AI sales agent market opportunity. <br />
                        <span className="text-slate-400 italic font-medium">restructure your entire revenue operating model today.</span>
                    </p>
                    <Link to="/book-consultation">
                        <Button className="bg-slate-900 hover:bg-black text-white text-xl px-16 py-10 h-auto rounded-xl font-black shadow-2xl transition-all hover:scale-105 flex items-center gap-6 mx-auto group">
                            DEPLOY REVENUE AGENTS <ArrowRight className="w-8 h-8 shrink-0 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                    <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-xs">Full Revenue Auto-Pilot 2.0 Deployment in <span className="text-[#2878B5]">14 Days</span></p>
                </div>
            </section>
        </div>
    );
}
