
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Bot, Zap, TrendingUp, Target, Shield, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIRevenueOperations() {
    useEffect(() => {
        document.title = "AI Revenue Operations (AROS) | ProfitMachines";
        window.scrollTo(0, 0);
    }, []);

    const phases = [
        {
            title: "PHASE 1: AUTONOMOUS DEMAND DISCOVERY",
            subtitle: "The 'Hunter' Agent Swarm",
            agents: [
                {
                    name: "Market Opportunity Agents (MOAs)",
                    persona: "Scout",
                    workflows: [
                        "Signal Harvesting: 50,000+ sources scraped every 15 mins",
                        "Pattern Synthesis: Vector embedding for non-obvious correlations",
                        "TAM Expansion: Autonomous micro-market identification"
                    ]
                },
                {
                    name: "Intent Amplification Agents (IAAs)",
                    persona: "Whisperer",
                    workflows: [
                        "Problem Agitation: Social listening & latent pain identification",
                        "Category Creation: Autonomous publication of industry reports",
                        "Dark Social Engineering: Strategic positioning in private communities"
                    ]
                }
            ]
        },
        {
            title: "PHASE 2: AUTONOMOUS DEMAND CAPTURE",
            subtitle: "The 'Converter' Agent Legion",
            agents: [
                {
                    name: "Hyper-Personalization Agents (HPAs)",
                    persona: "Chameleon",
                    workflows: [
                        "Dynamic Content Assembly: 10,000+ landing page variations",
                        "Video Synthesis: Personalized VSL creation in minutes",
                        "Pricing Elasticity: Multi-armed bandit algorithm adjustments"
                    ]
                },
                {
                    name: "Sales Development Agents (SDRs)",
                    persona: "Hustle",
                    workflows: [
                        "Infinite Sequence Generation: Non-templated LLM emails",
                        "Omnichannel Orchestration: Perfect timing across 4+ channels",
                        "Video Prospecting: Voice cloning for 60-second Loom-style videos"
                    ]
                }
            ]
        },
        {
            title: "PHASE 3: AUTONOMOUS REVENUE ACTIVATION",
            subtitle: "The 'Closer' AI Council",
            agents: [
                {
                    name: "Deal Intelligence Agents (DIAs)",
                    persona: "Strategist",
                    workflows: [
                        "Deal Room Monitoring: Real-time sentiment shift detection",
                        "Probability Scoring: Monte Carlo simulations for win probability",
                        "Proposal Generation: AI-powered contract creation during calls"
                    ]
                },
                {
                    name: "Procurement Navigation Agents (PNAs)",
                    persona: "Navigator",
                    workflows: [
                        "Stakeholder Mapping: 15+ committee member tracking",
                        "Security Automation: SOC 2 & security questionnaire completion",
                        "Legal Redlining: Standard contract term optimization"
                    ]
                }
            ]
        },
        {
            title: "PHASE 4: AUTONOMOUS REVENUE EXPANSION",
            subtitle: "The 'Farmer' Agent Collective",
            agents: [
                {
                    name: "Usage Intelligence Agents (UIEAs)",
                    persona: "Growth Hacker",
                    workflows: [
                        "Expansion Signal Detection: Real-time adoptation monitoring",
                        "In-Product Upselling: Contextual upgrade triggers",
                        "Automated QBRs: ROI metric report generation"
                    ]
                },
                {
                    name: "Cross-Sell Orchestration Agents (CSOAs)",
                    persona: "Matchmaker",
                    workflows: [
                        "Portfolio Gap Analysis: Missing module identification",
                        "Timing Optimization: Budget cycle predictive modeling",
                        "Bundled Offer Generation: Dynamic pricing optimization"
                    ]
                }
            ]
        },
        {
            title: "PHASE 5: REVENUE OPTIMIZATION",
            subtitle: "The 'Advocate' Agent Network",
            agents: [
                {
                    name: "Voice-of-Customer Agents (VOC-MAs)",
                    persona: "Alchemist",
                    workflows: [
                        "Testimonial Extraction: Turning sentiment into case studies",
                        "Review Generation: Automated high-NPS feedback loops",
                        "Referral Automation: High-LTV prospect matching"
                    ]
                },
                {
                    name: "Predictive Revenue Ops Agents (PROs)",
                    persona: "Oracle",
                    workflows: [
                        "Forecast Autocorrection: Real-time signal-based forecasting",
                        "Revenue Leakage Detection: 90-day churn prediction",
                        "Pricing Optimization: Reinforcement learning on won data"
                    ]
                }
            ]
        }
    ];

    const metrics = [
        { label: "Leads/Month", traditional: "500", aros: "5,000", multiplier: "10x" },
        { label: "Speed to Lead", traditional: "24 hours", aros: "3 minutes", multiplier: "480x" },
        { label: "Sales Cycle", traditional: "90 days", aros: "21 days", multiplier: "4.3x" },
        { label: "Revenue/Employee", traditional: "$250K ARR", aros: "$1.2M ARR", multiplier: "4.8x" }
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
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1535375975991-f0a3c175c24e?auto=format&fit=crop&w=1920&q=80"
                    ].map((img, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 bg-cover bg-center opacity-0 animate-slide-${idx + 1}`}
                            
                        />
                    ))}
                    <div className="absolute inset-0 bg-white/30 bg-gradient-to-b from-white/80 via-white/20 to-white/80"></div>
                </div>

                <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border border-emerald-100/60 shadow-[0_2px_10px_-4px_rgba(6,78,59,0.3)] text-[#053d2e] text-sm font-bold mb-8 backdrop-blur-sm animate-fade-in-up">
                        <Zap className="w-4 h-4 text-[#064e3b]" />
                        <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent uppercase tracking-wider">AROS: Agentic Revenue Operating System</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
                        Autonomous <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#064e3b] via-emerald-700 to-teal-700">
                            Revenue Generation
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed font-semibold">
                        Deploy an autonomous engine that manages the entire revenue lifecycle—from demand discovery to expansion—with zero human intervention.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link to="/book-consultation">
                            <Button className="bg-gradient-to-r from-[#064e3b] to-emerald-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-7 text-xl h-auto rounded-xl shadow-lg shadow-emerald-800/30 hover:shadow-emerald-800/45 transition-all hover:-translate-y-1 font-bold">
                                Activate AROS Swarm
                            </Button>
                        </Link>
                        <Link to="/talk-to-expert">
                            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-10 py-7 text-xl h-auto rounded-xl backdrop-blur-sm transition-all font-bold">
                                View Architecture
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((m, i) => (
                            <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-[20px] relative group overflow-hidden transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10">
                                <div className="absolute top-0 right-0 p-2 text-emerald-600/5 group-hover:text-emerald-600/10 transition-colors">
                                    <TrendingUp className="w-16 h-16" />
                                </div>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">{m.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-[#064e3b]">{m.aros}</h3>
                                    <span className="text-xs text-green-700 font-bold bg-green-100 px-2.5 py-1 rounded-xl">{m.multiplier}</span>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 font-semibold uppercase">vs {m.traditional} (Traditional)</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Phases Grid */}
            <div className="space-y-0">
                {phases.map((phase, pIdx) => (
                    <section key={pIdx} className={`py-24 ${pIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-16">
                                <span className="inline-block px-4 py-1 rounded-xl bg-emerald-100 text-[#053d2e] text-xs font-bold tracking-widest uppercase mb-4">{phase.title}</span>
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{phase.subtitle}</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                {phase.agents.map((agent, aIdx) => (
                                    <div key={aIdx} className="bg-white p-10 rounded-[20px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-xl -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-emerald-100/50"></div>

                                        <div className="relative z-10">
                                            <div className="w-16 h-16 bg-slate-900 border-4 border-slate-50 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#064e3b] group-hover:rotate-6 transition-all duration-500">
                                                <Bot className="w-9 h-9" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-slate-900 mb-2">{agent.name}</h4>
                                            <p className="text-[#064e3b] font-bold text-sm uppercase tracking-wider mb-8">Persona: "{agent.persona}"</p>

                                            <div className="space-y-4">
                                                {agent.workflows.map((flow, fIdx) => (
                                                    <div key={fIdx} className="flex gap-4 items-start group/flow">
                                                        <div className="mt-1.5 w-2 h-2 rounded-xl bg-emerald-600 group-hover/flow:scale-125 transition-all" />
                                                        <p className="text-slate-600 font-medium leading-relaxed">{flow}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Tech Stack / Architecture */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.5),transparent_50%)]"></div>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">The Agentic Stack</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">Built on a foundation of proprietary AI orchestration and global intelligence layers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Cpu, label: "Orchestration", items: ["LangChain / LlamaIndex", "CrewAI Framework", "AutoGPT Core"] },
                            { icon: Target, label: "Intelligence", items: ["GPT-4 Turbo / Claude 3", "Industry Specific LLMs", "Vector Memory (Pinecone)"] },
                            { icon: Zap, label: "Action", items: ["n8n Workflow Engine", "Playwright Automation", "Stripe Billing APIs"] },
                            { icon: Shield, label: "Governance", items: ["LangSmith Performance", "W&B Model Monitoring", "Compliance Guardrails"] }
                        ].map((stack, i) => (
                            <div key={i} className="p-10 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-emerald-600/50 transition-all group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#064e3b] transition-colors">
                                    <stack.icon className="w-8 h-8 text-emerald-400 group-hover:text-white" />
                                </div>
                                <h4 className="font-bold text-xl mb-6 text-white tracking-wide uppercase">{stack.label}</h4>
                                <ul className="space-y-4">
                                    {stack.items.map((item, ii) => (
                                        <li key={ii} className="text-slate-400 font-medium text-sm flex items-center gap-2">
                                            <div className="w-1 h-1 bg-emerald-600 rounded-xl" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/5 to-teal-700/5 opacity-50"></div>
                <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-xl bg-[#064e3b] text-white text-xs font-bold mb-8">
                        <Zap className="w-3 h-3 fill-current" />
                        <span>READY TO SCALE?</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">Scale Your Revenue Without <br /> Increasing Your Headcount</h2>
                    <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">Join the elite enterprises moving from manual sales to autonomous agent swarms.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/book-consultation">
                            <Button className="bg-slate-900 hover:bg-black text-white text-xl px-12 py-8 h-auto rounded-xl font-bold shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-3">
                                Start Your Swarm <ArrowRight className="w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
