import React, { useState } from 'react';
import { growthAccelerationData } from '../../data/growthAcceleration';
import { ArrowRight, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function GrowthAccelerationSection() {
    const { title, tagline, description, kpis, portfolio, verticalTabs } = growthAccelerationData;
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="py-24 bg-white relative border-t border-slate-100 overflow-hidden">
            {/* Background Decorations - Blue Theme */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">

                {/* 1. Header Section */}
                <div className="text-center max-w-4xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-[#064e3b] font-medium">
                        {tagline}
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        {description}
                    </p>

                    {/* ICP Subsection */}
                    <div className="mt-12 p-8 bg-slate-50/80 rounded-2xl border border-slate-200 text-left max-w-4xl mx-auto shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Ideal for Organizations Engineering Growth at Scale</h4>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Best suited for:</h5>
                                <ul className="space-y-3">
                                    {[
                                        "Product-led and growth-led B2B companies",
                                        "Teams running frequent experiments but learning too slowly",
                                        "Leaders seeking repeatable, compounding growth loops"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#064e3b] mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">ICP Maturity Level</h5>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        Post-PMF
                                    </li>
                                    <li className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        Scaling acquisition, engagement, retention, and monetization
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. KPI Performance Grid */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">Growth Velocity</h3>
                        <p className="text-slate-500 mt-2">Accelerating metrics that matter</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {kpis.map((stat, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-[#064e3b] to-emerald-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-700">
                                        {stat.suffix}
                                    </span>
                                </div>
                                <h4 className="text-base font-bold text-slate-900 mb-1">{stat.label}</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Services Portfolio Grid */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">Growth Engines</h3>
                        <p className="text-slate-500 mt-2">Tools to engineer your scale</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {portfolio.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Card key={i} className="border-slate-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6 h-full flex flex-col">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#064e3b] transition-colors duration-300">
                                            <Icon className="w-6 h-6 text-[#064e3b] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#064e3b] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Deep Dive Vertical Tabs */}
                <div className="space-y-10">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">Growth Levers</h3>
                        <p className="text-slate-500 mt-2">Systematic approaches to scaling</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Tab List */}
                        <div className="lg:w-1/4 space-y-2">
                            {verticalTabs.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`w-full text-left px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-between group ${activeTab === i
                                        ? 'bg-[#064e3b] text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                        }`}
                                >
                                    {tab.title}
                                    <ArrowRight className={`w-5 h-5 transition-transform ${activeTab === i ? 'translate-x-1' : 'opacity-0 group-hover:opacity-50'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Panel */}
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-3xl p-6 text-slate-900 shadow-xl border border-slate-200 overflow-hidden relative">
                                {/* Glass Effect - Removed for clean white */}
                                {/* <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none" /> */}

                                <div className="relative z-10 grid md:grid-cols-2 gap-8">
                                    {/* Left Column: Challenges */}
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-red-600 font-bold mb-3 uppercase tracking-wider text-sm">
                                                <XCircle className="w-5 h-5" /> Challenges & Pain Points
                                            </h4>

                                            <div className="space-y-4">
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                    <h5 className="font-semibold text-slate-900 mb-2">Business Situations</h5>
                                                    <ul className="space-y-2">
                                                        {verticalTabs[activeTab].challenges.map((c, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm flex items-start gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                                                                {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                    <h5 className="font-semibold text-slate-900 mb-2">Specific Pain Points</h5>
                                                    <ul className="space-y-2">
                                                        {verticalTabs[activeTab].painPoints.map((p, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm flex items-start gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                                                                {p}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Solutions */}
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-[#064e3b] font-bold mb-3 uppercase tracking-wider text-sm">
                                                <CheckCircle2 className="w-5 h-5" /> Solutions & Benefits
                                            </h4>

                                            <div className="space-y-4">
                                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                                    <h5 className="font-semibold text-blue-900 mb-2">Solutions Provided</h5>
                                                    <ul className="space-y-2">
                                                        {verticalTabs[activeTab].solutions.map((s, idx) => (
                                                            <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
                                                                <Zap className="w-4 h-4 text-[#064e3b] mt-0.5 shrink-0" />
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                                    <h5 className="font-semibold text-blue-900 mb-2">Key Benefits</h5>
                                                    <ul className="space-y-2">
                                                        {verticalTabs[activeTab].benefits.map((b, idx) => (
                                                            <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
                                                                <CheckCircle2 className="w-4 h-4 text-[#064e3b] mt-0.5 shrink-0" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
