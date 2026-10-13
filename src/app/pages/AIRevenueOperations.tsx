
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
        <div className="min-h-screen bg-white font-sans text-[#0066FF]">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border border-[#0066FF]/60 shadow-[0_2px_10px_-4px_rgba(6,78,59,0.3)] text-[#0066FF] text-sm font-bold mb-8 backdrop-blur-sm animate-fade-in-up">
                        <Zap className="w-4 h-4 text-[#0066FF]" />
                        <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent uppercase tracking-wider">AROS: Agentic Revenue Operating System</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-[1.1] text-[#0066FF] drop-shadow-sm">
                        Autonomous <br className="hidden md:block" />
                        <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0066FF]">
                            Revenue Generation
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#0066FF] max-w-4xl mx-auto mb-10 leading-relaxed font-semibold">
                        Deploy an autonomous engine that manages the entire revenue lifecycle—from demand discovery to expansion—with zero human intervention.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link to="/book-consultation">
                            <Button className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-7 text-xl h-auto rounded-xl shadow-lg shadow-[#0066FF]/20 hover:shadow-[#0066FF]/20 transition-all hover:-translate-y-1 font-bold">
                                Activate AROS Swarm
                            </Button>
                        </Link>
                        <Link to="/talk-to-expert">
                            <Button variant="outline" className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10 px-10 py-7 text-xl h-auto rounded-xl backdrop-blur-sm transition-all font-bold">
                                View Architecture
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="py-24 bg-white border-y border-[#0066FF]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((m, i) => (
                            <div key={i} className="p-8 bg-white border border-[#0066FF] rounded-[20px] relative group overflow-hidden transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10">
                                <div className="absolute top-0 right-0 p-2 text-[#0066FF]/5 group-hover:text-[#0066FF]/10 transition-colors">
                                    <TrendingUp className="w-16 h-16" />
                                </div>
                                <p className="text-[#0066FF] text-sm font-bold uppercase tracking-widest mb-2">{m.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-black text-[#0066FF]">{m.aros}</h3>
                                    <span className="text-xs text-green-700 font-bold bg-green-100 px-2.5 py-1 rounded-xl">{m.multiplier}</span>
                                </div>
                                <p className="text-[#0066FF] text-xs mt-3 font-semibold uppercase">vs {m.traditional} (Traditional)</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Phases Grid */}
            <div className="space-y-0">
                {phases.map((phase, pIdx) => (
                    <section key={pIdx} className={`py-24 ${pIdx % 2 === 0 ? 'bg-white' : 'bg-white'}`}>
                        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-16">
                                <span className="inline-block px-4 py-1 rounded-xl bg-white text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-4">{phase.title}</span>
                                <h3 className="text-4xl md:text-5xl font-black text-[#0066FF] leading-tight">{phase.subtitle}</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                {phase.agents.map((agent, aIdx) => (
                                    <div key={aIdx} className="bg-white p-10 rounded-[20px] border border-[#0066FF] shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-xl -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-[#0066FF]/50"></div>

                                        <div className="relative z-10">
                                            <div className="w-16 h-16 bg-white border-4 border-[#0066FF] text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0066FF] group-hover:rotate-6 transition-all duration-500">
                                                <Bot className="w-9 h-9" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-[#0066FF] mb-2">{agent.name}</h4>
                                            <p className="text-[#0066FF] font-bold text-sm uppercase tracking-wider mb-8">Persona: "{agent.persona}"</p>

                                            <div className="space-y-4">
                                                {agent.workflows.map((flow, fIdx) => (
                                                    <div key={fIdx} className="flex gap-4 items-start group/flow">
                                                        <div className="mt-1.5 w-2 h-2 rounded-xl bg-[#0066FF] group-hover/flow:scale-125 transition-all" />
                                                        <p className="text-[#0066FF] font-medium leading-relaxed">{flow}</p>
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
            <section className="py-24 bg-white text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.5),transparent_50%)]"></div>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">The Agentic Stack</h2>
                        <p className="text-xl text-[#0066FF] max-w-3xl mx-auto leading-relaxed">Built on a foundation of proprietary AI orchestration and global intelligence layers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Cpu, label: "Orchestration", items: ["LangChain / LlamaIndex", "CrewAI Framework", "AutoGPT Core"] },
                            { icon: Target, label: "Intelligence", items: ["GPT-4 Turbo / Claude 3", "Industry Specific LLMs", "Vector Memory (Pinecone)"] },
                            { icon: Zap, label: "Action", items: ["n8n Workflow Engine", "Playwright Automation", "Stripe Billing APIs"] },
                            { icon: Shield, label: "Governance", items: ["LangSmith Performance", "W&B Model Monitoring", "Compliance Guardrails"] }
                        ].map((stack, i) => (
                            <div key={i} className="p-10 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-[#0066FF]/50 transition-all group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0066FF] transition-colors">
                                    <stack.icon className="w-8 h-8 text-[#0066FF] group-hover:text-white" />
                                </div>
                                <h4 className="font-bold text-xl mb-6 text-white tracking-wide uppercase">{stack.label}</h4>
                                <ul className="space-y-4">
                                    {stack.items.map((item, ii) => (
                                        <li key={ii} className="text-[#0066FF] font-medium text-sm flex items-center gap-2">
                                            <div className="w-1 h-1 bg-[#0066FF] rounded-xl" />
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
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-[#0066FF]/5 opacity-50"></div>
                <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-xl bg-[#0066FF] text-white text-xs font-bold mb-8">
                        <Zap className="w-3 h-3 fill-current" />
                        <span>READY TO SCALE?</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0066FF] mb-8 leading-tight">Scale Your Revenue Without <br /> Increasing Your Headcount</h2>
                    <p className="text-xl md:text-2xl text-[#0066FF] mb-12 max-w-3xl mx-auto font-medium leading-relaxed">Join the elite enterprises moving from manual sales to autonomous agent swarms.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/book-consultation">
                            <Button className="bg-white hover:bg-black text-white text-xl px-12 py-8 h-auto rounded-xl font-bold shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-3">
                                Start Your Swarm <ArrowRight className="w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
