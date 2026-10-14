import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Target,
    BarChart3,
    Zap,
    Users,
    Workflow,
    Database,
    LineChart,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Brain,
    Rocket,
    Shield,
    X,
    
    AlertTriangle,
    TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Reveal } from '../components/ui/Reveal';
import SolutionsCarousel from '../components/SolutionsCarousel';
import LeadCaptureSection from '../components/LeadCaptureSection';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Solutions() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();
    const [selectedModalSolution, setSelectedModalSolution] = useState<any | null>(null);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sectionParam = params.get('section');
        const hashParam = location.hash ? location.hash.substring(1) : '';
        const rawTarget = sectionParam || hashParam;

        if (rawTarget) {
            const aliasMap: Record<string, string> = {
                'strategy': 'strategy-anchor',
                'sales-ops': 'sales-ops-anchor',
                'intelligence': 'intelligence-anchor',
                'brand-reputation': 'brand-reputation-anchor',
                'ai-business-strategy': 'ai-business-growth-strategy',
                'ai-market-strategy': 'ai-market-strategy-demand-intelligence',
                'growth-hacking': 'ai-driven-growth-hacking-engine',
                'performance-marketing': 'ai-driven-performance-marketing',
                'ai-auto-sales-pilot': 'ai-auto-sales-pilot-autonomous-sales-agents',
                'sales-optimization': 'ai-sales-process-optimization',
                'ai-revenue-operations': 'ai-revenue-operations-ai-revops',
                'ai-revenue-acceleration': 'ai-revenue-acceleration-expansion',
                'revenue-acceleration': 'ai-revenue-acceleration-expansion',
                'ai-demand-discovery': 'ai-market-strategy-demand-intelligence',
                'hidden-revenue-capture': 'ai-revenue-acceleration-expansion',
                'ai-brand-acceleration': 'ai-business-growth-strategy',
                'ai-reputation-acceleration': 'ai-sales-process-optimization'
            };

            const targetId = aliasMap[rawTarget.toLowerCase()] || rawTarget.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            if (['strategy', 'sales-ops', 'intelligence', 'brand-reputation'].includes(rawTarget.toLowerCase())) {
                // Category setting removed
            }

            setTimeout(() => {
                const element = document.getElementById(targetId) || document.getElementById(rawTarget);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.search, location.hash]);


    const solutions = [
        {
            title: "AI Business Growth Strategy",
            tagline: "Design a predictable, scalable, AI-powered revenue engine for your entire organization.",
            icon: Target,
            details: {
                situations: ["Growth depends on founders or a few key leaders", "Revenue targets are consistently missed", "Expansion into new markets feels risky", "No clarity on which segment to prioritize"],
                challenges: ["No unified growth narrative", "Fragmented leadership execution", "No market prioritization framework", "Siloed KPIs and reporting"],
                offerings: ["AI models ICPs, market demand, product-market fit, competitive positioning, and revenue performance to design a complete growth operating system."],
                outcomes: ["Revenue predictability ↑", "Execution velocity ↑", "CAC ↓ 30–50%", "LTV ↑ 2–4×", "Expansion success rate ↑", "Market penetration ↑"],
                benefits: ["Executive growth clarity", "AI-backed expansion decisions", "Predictable revenue planning", "Unified GTM execution"],
                problemKpis: ["Revenue volatility & missed targets", "Founder-dependent growth execution", "High CAC and declining margins", "Disconnected GTM motions", "Failed market expansions", "No scalable growth blueprint"]
            }
        },
        {
            title: "AI Market Strategy & Demand Intelligence",
            tagline: "Turn real market demand into revenue certainty.",
            icon: Brain,
            details: {
                situations: ["Inbound demand is weak", "No clarity on where real demand exists", "GTM decisions are based on assumptions", "Pricing is guesswork"],
                challenges: ["No visibility into buyer intent", "Poor ICP definition", "Inaccurate TAM/SAM/SOM", "No competitive demand mapping"],
                offerings: ["AI demand intelligence platform that decodes buyer intent, competitive traction, and market signals to drive smarter GTM decisions, pricing, positioning, and acquisition strategy."],
                outcomes: ["Lead velocity ↑ 247%", "SQL quality ↑ 3×", "Cost per lead ↓ 45%", "Time-to-PMF ↓ 60%", "Win rate ↑"],
                benefits: ["Demand clarity", "Market-backed ICP definition", "Predictive GTM strategy", "Confident pricing decisions"],
                problemKpis: ["Weak inbound pipeline", "Poor ICP targeting", "Low MQL → SQL conversion", "Slow product-market fit", "Ineffective positioning"]
            }
        },
        {
            title: "AI-Driven Growth Hacking Engine",
            tagline: "Launch faster. Learn faster. Scale smarter.",
            icon: Rocket,
            details: {
                situations: ["Growth has plateaued", "Marketing channels are saturated", "Acquisition costs are rising"],
                challenges: ["Manual experimentation", "No learning system", "No repeatable playbooks"],
                offerings: ["Self-learning AI growth engine that continuously generates growth hypotheses, runs experiments, optimizes funnels, and scales winning growth loops."],
                outcomes: ["Experiment velocity ↑ 5×", "Funnel conversion ↑ 2–4×", "Viral coefficient ↑", "Time-to-scale ↓"],
                benefits: ["Always-on experimentation", "Rapid learning cycles", "Compounding growth loops"],
                problemKpis: ["Growth stagnation", "Slow experimentation cycles", "Poor funnel conversion", "No viral or referral loops"]
            }
        },
        {
            title: "AI-Driven Performance Marketing",
            tagline: "Turn every marketing dollar into measurable growth.",
            icon: BarChart3,
            details: {
                situations: ["Paid marketing costs are rising", "ROI is unclear", "Attribution is broken"],
                challenges: ["Channel inefficiencies", "Creative fatigue", "Poor targeting"],
                offerings: ["Predictive AI marketing engine that reallocates spend in real time, optimizes creatives, and maximizes ROI across channels."],
                outcomes: ["CAC ↓ 35–60%", "ROAS ↑ 2–5×", "Conversion rate ↑", "Spend efficiency ↑"],
                benefits: ["Smart budget allocation", "High-performing creatives", "Predictable CAC"],
                problemKpis: ["Rising CAC", "Low ROAS", "Poor attribution", "Inefficient spend"]
            }
        },
        {
            title: "AI Auto Sales Pilot (Autonomous Sales Agents)",
            tagline: "Your best SDR, working 24/7.",
            icon: Users,
            details: {
                situations: ["Leads arrive outside business hours", "Reps are overloaded", "High inbound volume"],
                challenges: ["Manual qualification", "Delayed response", "Missed opportunities"],
                offerings: ["Autonomous AI sales agents that qualify, engage, book meetings, and route leads automatically."],
                outcomes: ["Response time < 60 seconds", "Meeting rate ↑ 3×", "Pipeline velocity ↑", "Conversion rate ↑"],
                benefits: ["24/7 selling", "Zero lead leakage", "Higher conversion"],
                problemKpis: ["Slow lead response", "Lead leakage", "Rep burnout", "Low inbound conversion"]
            }
        },
        {
            title: "AI Sales Process Optimization",
            tagline: "Remove friction. Close faster.",
            icon: Workflow,
            details: {
                situations: ["Deals get stuck", "Reps waste time", "Forecasts are unreliable"],
                challenges: ["Manual pipeline management", "No deal intelligence", "Inconsistent execution"],
                offerings: ["AI-powered sales optimization engine that improves every stage of the sales funnel."],
                outcomes: ["Cycle time ↓ 50%", "Win rate ↑ 2–3×", "Forecast accuracy ↑", "Rep productivity ↑"],
                benefits: ["Faster deals", "Higher rep productivity", "Predictable revenue"],
                problemKpis: ["Long sales cycles", "Low close rates", "Poor pipeline hygiene"]
            }
        },
        {
            title: "AI Revenue Operations (AI RevOps)",
            tagline: "One command center for total revenue.",
            icon: Database,
            details: {
                situations: ["No revenue visibility", "Missed forecasts", "Tool sprawl"],
                challenges: ["No single source of truth", "Manual reporting", "Data chaos"],
                offerings: ["Unified AI RevOps platform that consolidates all revenue data into a single intelligence layer."],
                outcomes: ["Forecast accuracy ↑ 95%+", "Revenue leakage ↓ 40%", "ARR predictability ↑"],
                benefits: ["Revenue control", "Executive dashboards", "Predictive insights"],
                problemKpis: ["Revenue leakage", "Poor forecasting", "Siloed data"]
            }
        },
        {
            title: "AI Revenue Acceleration & Expansion",
            tagline: "Grow faster from the customers you already have.",
            icon: LineChart,
            details: {
                situations: ["Customers disengage", "Expansion is reactive"],
                challenges: ["No churn prediction", "No expansion intelligence"],
                offerings: ["AI-powered expansion and retention engine that maximizes customer lifetime value."],
                outcomes: ["Net Revenue Retention ↑ 130%+", "Expansion ARR ↑ 3×", "Churn ↓ 40–60%"],
                benefits: ["Proactive retention", "Smart upsell"],
                problemKpis: ["High churn", "Low expansion revenue", "Poor customer health visibility"]
            }
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 1. Autonomous Hero Slider */}
            <SolutionsCarousel />

            {/* Solutions Grid - Symmetric 2-Column Responsive Layout */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#1B5E91] text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#2878B5] animate-pulse"></span>
                        Modular Revenue Engines
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Engineered for High-Velocity Growth
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Explore our modular AI revenue architectures. Each system integrates seamlessly with your existing tech stack or deploys as an end-to-end autonomous engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {solutions.map((solution, index) => {
                        const Icon = solution.icon;
                        const mainId = solution.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        const aliasMap: Record<number, string[]> = {
                            0: ['strategy', 'strategy-anchor', 'ai-business-strategy', 'ai-brand-acceleration'],
                            1: ['intelligence', 'intelligence-anchor', 'ai-market-strategy', 'ai-demand-discovery'],
                            2: ['growth-hacking'],
                            3: ['performance-marketing'],
                            4: ['sales-ops', 'sales-ops-anchor', 'ai-auto-sales-pilot'],
                            5: ['sales-optimization', 'ai-reputation-acceleration'],
                            6: ['ai-revenue-operations'],
                            7: ['brand-reputation', 'brand-reputation-anchor', 'ai-revenue-acceleration', 'revenue-acceleration', 'hidden-revenue-capture']
                        };
                        const aliases = aliasMap[index] || [];

                        return (
                            <Reveal key={index} width="100%" delay={index * 0.05} className="h-full">
                                {aliases.map(a => (
                                    <div key={a} id={a} className="scroll-mt-32" />
                                ))}
                                <div id={mainId} className="group relative scroll-mt-32 h-full flex flex-col">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-100 to-blue-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 hover:border-[#2878B5]/50 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between h-full">
                                        
                                        {/* Top Info */}
                                        <div>
                                            <div className="flex items-center justify-between gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center border border-sky-100 group-hover:bg-sky-100 transition-colors">
                                                    <Icon className="w-6 h-6 text-[#2878B5]" />
                                                </div>
                                                <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 bg-slate-100 rounded-full text-slate-700">
                                                    Solution 0{index + 1}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                                {solution.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-6">
                                                {solution.tagline}
                                            </p>

                                            {/* Outcome KPIs Highlight */}
                                            {solution.details.outcomes && (
                                                <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 mb-6">
                                                    <h4 className="text-xs font-bold text-[#1B5E91] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                        <TrendingUp className="w-3.5 h-3.5 text-[#2878B5]" /> Verified Target Lift
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {solution.details.outcomes.slice(0, 4).map((outcome, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
                                                                <span className="truncate">{outcome}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Offerings Summary */}
                                            {solution.details.offerings && (
                                                <div className="space-y-2 mb-6">
                                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                                        <Shield className="w-3.5 h-3.5 text-[#2878B5]" /> Core Engine Architecture
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                                                        {solution.details.offerings[0]}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Problem KPIs at Risk */}
                                            {solution.details.problemKpis && (
                                                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 mb-6">
                                                    <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Common Revenue Failure Points
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {solution.details.problemKpis.slice(0, 3).map((item, idx) => (
                                                            <span key={idx} className="text-[11px] font-medium bg-white/80 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Action Strip */}
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                            <button
                                                onClick={() => setSelectedModalSolution(solution)}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2878B5] hover:text-[#1E6297] transition-colors"
                                            >
                                                <span>Specification</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                            <Button 
                                                size="sm" 
                                                onClick={() => openLongForm({ defaultService: solution.title })}
                                                className="bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-xs rounded-full px-4"
                                            >
                                                Deploy
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Solution Specification Modal */}
            {selectedModalSolution && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                        <button
                            onClick={() => setSelectedModalSolution(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-[#2878B5]">
                                <selectedModalSolution.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#2878B5]">Solution Architecture Spec</span>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selectedModalSolution.title}</h3>
                            </div>
                        </div>

                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                            {selectedModalSolution.tagline}
                        </p>

                        {selectedModalSolution.details.offerings && (
                            <div className="bg-sky-50/70 p-6 rounded-2xl border border-sky-100">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[#2878B5]" />
                                    Core System Capabilities
                                </h4>
                                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                    {selectedModalSolution.details.offerings[0]}
                                </p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {selectedModalSolution.details.situations && (
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                                        Common Operational Triggers
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedModalSolution.details.situations.map((sit: string, idx: number) => (
                                             <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                                <span>{sit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedModalSolution.details.outcomes && (
                                <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-200">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#1B5E91] mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-[#2878B5]" />
                                        Verified Target Outcomes
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedModalSolution.details.outcomes.map((o: string, idx: number) => (
                                            <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                                                <CheckCircle2 className="w-4 h-4 text-[#2878B5] shrink-0" />
                                                <span>{o}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                            <Button 
                                onClick={() => {
                                    const title = selectedModalSolution.title;
                                    setSelectedModalSolution(null);
                                    openLongForm({ defaultService: title });
                                }}
                                className="bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold px-6 py-3 rounded-full flex-1"
                            >
                                Deploy {selectedModalSolution.title}
                            </Button>
                            <Button 
                                onClick={() => {
                                    const title = selectedModalSolution.title;
                                    setSelectedModalSolution(null);
                                    openQuickForm({ defaultService: title });
                                }}
                                variant="outline" 
                                className="border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-6 py-3 rounded-full flex-1"
                            >
                                Quick Inquiry
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Diagnostic Lead Capture Form */}
            <LeadCaptureSection />

            {/* Configurable Contextual CTA Section */}
            <ContextualCtaSection
                badge="AI Revenue Architecture"
                title="Ready to Architect Your AI Revenue Engine?"
                subtitle="Transform your growth trajectory with our modular AI solutions. Schedule an enterprise consultation or submit a 60-second quick inquiry."
                defaultService="AI Revenue Architecture"
            />
        </div>
    );
}
