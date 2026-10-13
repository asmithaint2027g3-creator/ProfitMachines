import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    FileText,
    BarChart,
    Users,
    Briefcase,
    Target,
    TrendingUp,
    Download,
    ArrowRight,
    Sparkles,
    ShieldCheck
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ResourcesCarousel from '../components/ResourcesCarousel';
import LeadCaptureSection from '../components/LeadCaptureSection';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Resources() {
    const { openQuickForm, openLongForm } = useLeadModal();
    const categories = [
        {
            icon: <BookOpen className="w-7 h-7 text-[#0066FF]" />,
            badge: "Executive",
            count: "12 Playbooks",
            title: "AI Revenue Playbooks",
            description: "Step-by-step architectural roadmaps for scaling B2B and enterprise ARR with predictable pipeline pacing.",
            link: "/book-consultation"
        },
        {
            icon: <Target className="w-7 h-7 text-[#0066FF]" />,
            badge: "Demand Ops",
            count: "8 Frameworks",
            title: "Demand Generation Frameworks",
            description: "Sensing dark funnel intent signals, buying committee mapping, and competitive displacement triggers.",
            link: "/demand-pulse"
        },
        {
            icon: <Briefcase className="w-7 h-7 text-[#0066FF]" />,
            badge: "Sales Ops",
            count: "15 Guides",
            title: "Sales Transformation Guides",
            description: "Autonomous SDR deployment patterns, dynamic deal desks, and automated RFP response intelligence.",
            link: "/solutions#sales-ops"
        },
        {
            icon: <BarChart className="w-7 h-7 text-[#0066FF]" />,
            badge: "RevOps",
            count: "10 Standards",
            title: "RevOps Best Practices",
            description: "Data orchestration, pipeline hygiene automation, and unified multi-channel telemetry governance.",
            link: "/offerings"
        },
        {
            icon: <TrendingUp className="w-7 h-7 text-pink-600" />,
            badge: "ARR Scaling",
            count: "14 Strategies",
            title: "ARR Growth Strategies",
            description: "Mathematical models for CAC compression, net retention expansion, and account propensity scoring.",
            link: "/outcomes"
        },
        {
            icon: <Users className="w-7 h-7 text-amber-600" />,
            badge: "Case Studies",
            count: "24 Stories",
            title: "Case Studies & Success",
            description: "Verified customer outcomes, ROI metrics, and sales cycle compression benchmarks from global enterprises.",
            link: "/outcomes"
        },
        {
            icon: <FileText className="w-7 h-7 text-orange-600" />,
            badge: "Research",
            count: "18 Reports",
            title: "Whitepapers & Benchmarks",
            description: "Deep research papers on multi-agent cognitive architecture, neural revenue models, and data security.",
            link: "/book-consultation"
        },
        {
            icon: <ShieldCheck className="w-7 h-7 text-cyan-600" />,
            badge: "Governance",
            count: "6 Audits",
            title: "Security & Trust Reports",
            description: "SOC-2 Type II verification, zero-trust infrastructure blueprints, and GDPR compliance architecture.",
            link: "/company"
        }
    ];

    return (
        <div className="bg-white text-[#0066FF] font-sans min-h-screen">
            {/* 1. Autonomous Resources Hero Carousel */}
            <ResourcesCarousel />

            {/* 2. Symmetrical Resources Grid */}
            <section id="resources-grid" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 scroll-mt-28">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0066FF] text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span>Knowledge Architecture</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-4">
                        Executive Revenue Knowledge Hub
                    </h2>
                    <p className="text-lg text-[#0066FF] font-medium leading-relaxed">
                        Curated intelligence, architecture blueprints, and empirical benchmarks engineered for founders, CROs, and revenue leaders.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((item, index) => (
                        <Reveal key={index} width="100%" delay={index * 0.05} className="h-full">
                            <Card className="h-full hover:shadow-xl hover:shadow-blue-900/5 transition-all hover:-translate-y-1.5 border-[#0066FF] bg-white hover:border-[#0066FF] group flex flex-col justify-between rounded-2xl p-6">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-6">
                                        <div className="p-3 bg-white rounded-xl group-hover:bg-[#0066FF] transition-colors border border-[#0066FF]">
                                            {item.icon}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white rounded-full text-[#0066FF]">
                                                {item.badge}
                                            </span>
                                            <span className="text-[11px] font-mono font-semibold text-[#0066FF]">
                                                {item.count}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0066FF] mb-2 group-hover:text-[#0066FF] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#0066FF] leading-relaxed font-medium mb-6">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[#0066FF] flex items-center justify-between">
                                    <Link
                                        to={item.link}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:text-[#042d22] transition-colors"
                                    >
                                        <span>Access Suite</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <span className="text-[11px] text-[#0066FF] font-medium">Free Access</span>
                                </div>
                            </Card>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* 3. Designed For Section */}
            <div className="bg-white py-20 lg:py-28 border-y border-[#0066FF]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <h2 className="text-3xl font-bold text-[#0066FF] mb-3">Engineered For Growth Leaders</h2>
                            <p className="text-[#0066FF] font-medium">Every guide and playbook is battle-tested by enterprise practitioners.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { title: "Founders & CEOs", desc: "Predictable revenue blueprints and valuation drivers" },
                                { title: "CROs & Revenue Leaders", desc: "Pipeline pacing and multi-agent SDR acceleration" },
                                { title: "Sales & Marketing Teams", desc: "High-conversion deal desks and buyer intent telemetry" },
                                { title: "Growth & RevOps Leaders", desc: "Unified revenue data models and automated hygiene" }
                            ].map((role, index) => (
                                <div key={index} className="p-6 bg-white rounded-2xl border border-[#0066FF] hover:border-[#0066FF] transition-all shadow-sm hover:shadow-md">
                                    <div className="bg-white w-10 h-10 rounded-xl border border-[#0066FF] flex items-center justify-center mb-4">
                                        <Users className="w-5 h-5 text-[#0066FF]" />
                                    </div>
                                    <h4 className="font-bold text-[#0066FF] text-base mb-1">{role.title}</h4>
                                    <p className="text-xs text-[#0066FF] font-medium">{role.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* 4. Quick Diagnostic Lead Capture Form */}
            <LeadCaptureSection />

            {/* 5. Contextual CTA Section */}
            <ContextualCtaSection
                badge="Knowledge to Action"
                title="Start Building Your Predictable Revenue Engine"
                subtitle="Join leading enterprise revenue organizations executing autonomous growth motions with ProfitMachines. Schedule an enterprise consultation or submit a 60-second quick inquiry."
                defaultService="Resource Strategy & Implementation"
            />
        </div>
    );
}
