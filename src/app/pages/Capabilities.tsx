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
    Shield
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

export default function Capabilities() {
    const location = useLocation();


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');

        if (section) {
            setTimeout(() => {
                const elementId = section.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const element = document.getElementById(elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [location]);

    const Capabilities = [
        {
            title: "AI Demand Discovery & Revenue Acceleration",
            tagline: "Uncover new market segments and prioritise highest-propensity buyers in real time.",
            icon: Target,
            details: {
                situations: ["Inbound demand is weak", "No clarity on where real demand exists", "GTM decisions are based on assumptions"],
                challenges: ["No visibility into buyer intent", "Poor ICP definition", "Inaccurate TAM/SAM/SOM"],
                offerings: ["Dynamic ICP modeling, demand pulse engines, predictive lead scoring."],
                outcomes: ["Lead velocity ? 247%", "SQL quality ? 3×", "Cost per lead ? 45%"],
                benefits: ["Demand clarity", "Market-backed ICP definition", "Predictive GTM strategy"],
                problemKpis: ["Weak inbound pipeline", "Poor ICP targeting", "Low MQL ? SQL conversion"]
            }
        },
        {
            title: "AI-Driven Brand Acceleration",
            tagline: "Turn unknown demand into recognised preference.",
            icon: Rocket,
            details: {
                situations: ["Low brand awareness in target markets", "Content doesn't convert"],
                challenges: ["Generic messaging", "Missed timing on buyer intent"],
                offerings: ["Autonomous content personalisation, intent-based brand exposure, and market presence expansion."],
                outcomes: ["Brand Recognition Lift ? 3×", "Wider Reach in Target ICP ? 45%", "CPA ? 30%"],
                benefits: ["Dynamic messaging based on real-time market pulse", "Automated content distribution"],
                problemKpis: ["Low brand search volume", "High cost-per-click", "Low engagement rates"]
            }
        },
        {
            title: "AI-Driven Reputation Acceleration",
            tagline: "Build a reputation that converts before a call is made.",
            icon: Shield,
            details: {
                situations: ["Long sales cycles", "Lack of social proof"],
                challenges: ["Manual review collection", "Negative sentiment going unnoticed"],
                offerings: ["Review sentiment monitoring, automated trust-signal generation, and reputation-led nurture."],
                outcomes: ["Win rate ? 34%", "Sales Cycle Time ? 50%", "Trust signals deployed across 14 touchpoints"],
                benefits: ["Lower Cost-Per-Acquisition through higher trust", "Accelerated sales velocity"],
                problemKpis: ["Lost deals to competitors", "Low conversion on pricing pages"]
            }
        },
        {
            title: "Autonomous Sales Pilot",
            tagline: "Your best SDR, working 24/7.",
            icon: Users,
            details: {
                situations: ["Leads arrive outside business hours", "Reps are overloaded", "High inbound volume"],
                challenges: ["Manual qualification", "Delayed response", "Missed opportunities"],
                offerings: ["AI sales agents that handle inbound qualification, outbound prospecting, and 24/7 follow-up; workflow automation; RevOps Intelligence dashboards."],
                outcomes: ["Response time < 60 seconds", "Meeting rate ? 3×", "Pipeline velocity ?"],
                benefits: ["24/7 selling", "Zero lead leakage", "Higher conversion"],
                problemKpis: ["Slow lead response", "Lead leakage", "Rep burnout"]
            }
        },
        {
            title: "Hidden Revenue Capture",
            tagline: "Recover 15-25% of lost revenue hiding in plain sight.",
            icon: LineChart,
            details: {
                situations: ["Customers disengage", "Expansion is reactive", "Missed renewals"],
                challenges: ["No churn prediction", "No expansion intelligence", "Revenue leakage"],
                offerings: ["Customer success intelligence for churn risk, cross-sell/upsell engines, and revenue leakage audits."],
                outcomes: ["Net Revenue Retention ? 130%+", "Expansion ARR ? 3×", "Churn ? 27%"],
                benefits: ["Proactive retention", "Smart upsell", "Continuous leakage audits"],
                problemKpis: ["High churn", "Low expansion revenue", "Missed contract renewals"]
            }
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Compact */}
            <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white text-[#0066FF] border-b border-[#0066FF]">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0066FF]/50 via-slate-50 to-slate-100/50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#0066FF]/30 via-transparent to-transparent" />
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal width="100%">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-[#0066FF] leading-[1.1]">
                            The Autonomous <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
                                Revenue Engine
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-[#0066FF] max-w-3xl mx-auto leading-relaxed font-medium">
                            ProfitMachines is not a collection of tools – it's an autonomous revenue OS that continuously learns and acts across the full customer lifecycle.
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Capabilities Grid - Compact & Clean */}
            <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col gap-8">
                    {Capabilities.map((solution, index) => {
                        const Icon = solution.icon;

                        return (
                            <Reveal key={index} width="100%" delay={index * 0.1}>
                                <div id={solution.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="group relative scroll-mt-32">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#0066FF] to-purple-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative bg-white border border-[#0066FF] rounded-2xl p-6 lg:p-8 hover:border-[#0066FF] transition-all duration-300 shadow-sm hover:shadow-lg">
                                        <div className="flex flex-col lg:flex-row gap-8 items-start">

                                            {/* Header & Icon */}
                                            <div className="lg:w-1/3 space-y-4">
                                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center border border-[#0066FF] group-hover:bg-[#0066FF] transition-colors">
                                                    <Icon className="w-7 h-7 text-[#0066FF]" />
                                                </div>
                                                <div>
                                                    <div className="text-[#0066FF] font-bold text-xs mb-1 uppercase tracking-wider">Solution 0{index + 1}</div>
                                                    <h2 className="text-2xl font-bold text-[#0066FF] mb-2">
                                                        {solution.title}
                                                    </h2>
                                                    <p className="text-[#0066FF] text-base font-medium leading-relaxed italic">
                                                        "{solution.tagline}"
                                                    </p>
                                                </div>

                                                {/* Outcome KPIs */}
                                                {solution.details.outcomes && (
                                                    <div className="p-5 rounded-xl bg-white border border-[#0066FF] mt-4">
                                                        <h4 className="text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-3 flex items-center gap-2">
                                                            <Zap className="w-3 h-3" /> Outcome KPIs
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {solution.details.outcomes.map((outcome, idx) => (
                                                                <div key={idx} className="flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                                                                    <span className="text-[#0066FF] text-sm font-semibold">{outcome}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Detailed Content Grid */}
                                            <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">

                                                {/* Offerings */}
                                                {solution.details.offerings && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-base font-bold text-[#0066FF] flex items-center gap-2">
                                                            <Shield className="w-4 h-4 text-[#0066FF]" />
                                                            Offering
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {solution.details.offerings.map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-[#0066FF] text-sm font-medium leading-relaxed">
                                                                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] mt-0.5 flex-shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Situations */}
                                                {solution.details.situations && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-base font-bold text-[#0066FF] flex items-center gap-2">
                                                            <AlertCircle className="w-4 h-4 text-amber-500" />
                                                            Situations
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {solution.details.situations.map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-[#0066FF] text-sm font-medium">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Challenges */}
                                                {solution.details.challenges && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-base font-bold text-[#0066FF] flex items-center gap-2">
                                                            <Target className="w-4 h-4 text-orange-500" />
                                                            Challenges
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {solution.details.challenges.map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-[#0066FF] text-sm font-medium">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Benefits */}
                                                {solution.details.benefits && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-base font-bold text-[#0066FF] flex items-center gap-2">
                                                            <Rocket className="w-4 h-4 text-[#0066FF]" />
                                                            Benefits
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {solution.details.benefits.map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-[#0066FF] text-sm font-medium">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-white0 mt-1.5 flex-shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Problem KPIs */}
                                                {solution.details.problemKpis && (
                                                    <div className="space-y-3 md:col-span-2 bg-red-50/50 p-4 rounded-xl border border-red-100">
                                                        <h3 className="text-base font-bold text-red-900 flex items-center gap-2 mb-2">
                                                            <LineChart className="w-4 h-4 text-red-600" />
                                                            KPIs at Risk (Without This Solution)
                                                        </h3>
                                                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                                                            {solution.details.problemKpis.map((item, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 text-[#0066FF] text-sm font-medium">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                                    <span>{item}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section - Compact */}
            <div className="py-20 relative overflow-hidden bg-white border-t border-[#0066FF]">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <Reveal width="100%" direction="up">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#0066FF] mb-6 tracking-tight">
                            Ready to Architect Your <br />
                            <span className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
                                AI Revenue Engine?
                            </span>
                        </h2>
                        <p className="text-xl text-[#0066FF] mb-8 max-w-2xl mx-auto font-medium">
                            Transform your growth trajectory with our modular AI Capabilities.
                            Start building your future today.
                        </p>
                        <Link to="/book-consultation" className="inline-block">
                            <button className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] hover:from-blue-700 hover:to-purple-700 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-[#0066FF]/20 transition-all duration-300 flex items-center gap-3 mx-auto group">
                                Design Your AI Revenue Architecture
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
