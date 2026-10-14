import React, { useState } from 'react';
import { revenueAccelerationData } from '../../data/revenueAcceleration';
import { ArrowRight, CheckCircle2, XCircle, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function RevenueAccelerationSection() {
    const { title, tagline, description, kpis, portfolio, verticalTabs } = revenueAccelerationData;
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="py-16 md:py-24 bg-slate-50 relative border-t border-slate-100 overflow-hidden">
            {/* Minimalist Background Mesh */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">

                {/* 1. Header Section */}
                <div className="text-center max-w-5xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
                        <Sparkles className="w-4 h-4 text-[#2878B5]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Platform Overview</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter leading-tight">
                        {title}
                    </h2>
                    <p className="text-2xl md:text-3xl text-slate-400 font-medium tracking-tight">
                        {tagline}
                    </p>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                        {description}
                    </p>

                    {/* ICP Bento Box */}
                    <div className="mt-16 bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left flex flex-col md:flex-row gap-12">
                        <div className="flex-1 space-y-6">
                            <h4 className="font-bold text-slate-900 text-2xl tracking-tight">Who Benefits Most</h4>
                            <ul className="space-y-4">
                                {[
                                    "Mid-market & enterprise B2B organizations with multi-touch buyer journeys",
                                    "Teams struggling to align marketing, sales, and revenue ops",
                                    "Leaders seeking one intelligence layer across demand → deal → revenue"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center">
                            <span className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#2878B5]" />
                                Typical Challenge
                            </span>
                            <p className="text-slate-600 text-lg font-medium italic leading-relaxed">
                                “We have data everywhere, but no unified view of what actually drives revenue.”
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. KPI Performance Grid - Bento Style */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Measurable Impact</h3>
                        <p className="text-slate-500 mt-3 text-lg font-medium">Turning AI insights into predictable revenue</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {kpis.map((stat, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tighter">
                                        {stat.value}
                                    </span>
                                    <span className="text-xl font-bold text-slate-400">
                                        {stat.suffix}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-wide text-xs">{stat.label}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ICP KPIs Bento */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl max-w-6xl mx-auto text-white relative overflow-hidden">
                        {/* Mesh glow for dark background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[80px]" />
                        
                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            <div className="space-y-6">
                                <h4 className="font-bold text-white text-2xl tracking-tight">Measured on Outcomes, Not Activity</h4>
                                <ul className="space-y-4">
                                    {[
                                        "Are measured on ARR growth, pipeline velocity, and CAC efficiency",
                                        "Need board-level metrics, not vanity dashboards",
                                        "Require AI to directly impact conversion, sales cycle length, and forecast confidence"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-300 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-bold text-white text-2xl tracking-tight">Built For</h4>
                                <ul className="space-y-4">
                                    {[
                                        "CROs preparing quarterly and annual forecasts",
                                        "RevOps teams responsible for predictability",
                                        "Growth leaders optimizing ROI across the funnel"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-300 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Services Portfolio Grid */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Capabilities</h3>
                        <p className="text-slate-500 mt-3 text-lg font-medium">Comprehensive AI-driven growth solutions</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {portfolio.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Card key={i} className="rounded-[2rem] border-slate-100 hover:border-slate-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group bg-white">
                                    <CardContent className="p-8 h-full flex flex-col">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-slate-900 transition-colors duration-300">
                                            <Icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-500 text-sm leading-relaxed flex-grow font-medium">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* ICP Portfolio Bento */}
                    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
                        <div className="flex-1 space-y-6">
                            <h4 className="font-bold text-slate-900 text-2xl tracking-tight">Who This Is Designed For</h4>
                            <ul className="space-y-4">
                                {[
                                    "Have multiple GTM motions (inbound, outbound, ABM, paid)",
                                    "Want AI-orchestrated execution, not point tools",
                                    "Are scaling fast and cannot rely on manual processes"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center">
                            <span className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-slate-700" />
                                Common Signal
                            </span>
                            <p className="text-slate-600 text-lg font-medium italic leading-relaxed">
                                "Rapid growth has outpaced operational maturity."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Deep Dive Vertical Tabs */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Strategic Intelligence</h3>
                        <p className="text-slate-500 mt-3 text-lg font-medium">Explore specific challenges and AI solutions</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Tab List */}
                        <div className="lg:w-1/3 flex flex-col gap-3">
                            {verticalTabs.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`w-full text-left px-8 py-5 rounded-[1.5rem] font-bold transition-all duration-300 flex items-center justify-between group border ${activeTab === i
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {tab.title}
                                    <ArrowRight className={`w-5 h-5 transition-transform ${activeTab === i ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Panel */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Left Column: Challenges */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">
                                                <XCircle className="w-4 h-4 text-slate-400" /> Challenges
                                            </h4>
                                            
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Business Situations</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].challenges.map((c, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                                                {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Pain Points</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].painPoints.map((p, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                                                {p}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Solutions */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Solutions
                                            </h4>

                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Capabilities Provided</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].solutions.map((s, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <Zap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Key Benefits</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].benefits.map((b, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
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
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[80px]" />
                        
                        <div className="grid md:grid-cols-2 gap-12 relative z-10">
                            <div className="space-y-6">
                                <h4 className="font-bold text-white text-2xl tracking-tight">Measured on Outcomes, Not Activity</h4>
                                <ul className="space-y-4">
                                    {[
                                        "Are measured on ARR growth, pipeline velocity, and CAC efficiency",
                                        "Need board-level metrics, not vanity dashboards",
                                        "Require AI to directly impact conversion, sales cycle length, and forecast confidence"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-300 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-bold text-white text-2xl tracking-tight">Built For</h4>
                                <ul className="space-y-4">
                                    {[
                                        "CROs preparing quarterly and annual forecasts",
                                        "RevOps teams responsible for predictability",
                                        "Growth leaders optimizing ROI across the funnel"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-300 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Services Portfolio Grid */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Capabilities</h3>
                        <p className="text-slate-500 mt-3 text-lg font-medium">Comprehensive AI-driven growth solutions</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {portfolio.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Card key={i} className="rounded-[2rem] border-slate-100 hover:border-slate-300 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group bg-white">
                                    <CardContent className="p-8 h-full flex flex-col">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-slate-900 transition-colors duration-300">
                                            <Icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-500 text-sm leading-relaxed flex-grow font-medium">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* ICP Portfolio Bento */}
                    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
                        <div className="flex-1 space-y-6">
                            <h4 className="font-bold text-slate-900 text-2xl tracking-tight">Who This Is Designed For</h4>
                            <ul className="space-y-4">
                                {[
                                    "Have multiple GTM motions (inbound, outbound, ABM, paid)",
                                    "Want AI-orchestrated execution, not point tools",
                                    "Are scaling fast and cannot rely on manual processes"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center">
                            <span className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-slate-700" />
                                Common Signal
                            </span>
                            <p className="text-slate-600 text-lg font-medium italic leading-relaxed">
                                "Rapid growth has outpaced operational maturity."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Deep Dive Vertical Tabs */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Strategic Intelligence</h3>
                        <p className="text-slate-500 mt-3 text-lg font-medium">Explore specific challenges and AI solutions</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                        {/* Tab List */}
                        <div className="lg:w-1/3 flex flex-col gap-3">
                            {verticalTabs.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`w-full text-left px-8 py-5 rounded-[1.5rem] font-bold transition-all duration-300 flex items-center justify-between group border ${activeTab === i
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {tab.title}
                                    <ArrowRight className={`w-5 h-5 transition-transform ${activeTab === i ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Panel */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Left Column: Challenges */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">
                                                <XCircle className="w-4 h-4 text-slate-400" /> Challenges
                                            </h4>
                                            
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Business Situations</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].challenges.map((c, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                                                {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Pain Points</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].painPoints.map((p, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                                                {p}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Solutions */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Solutions
                                            </h4>

                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Capabilities Provided</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].solutions.map((s, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <Zap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="space-y-4">
                                                    <h5 className="font-bold text-slate-700 text-sm tracking-wide">Key Benefits</h5>
                                                    <ul className="space-y-3">
                                                        {verticalTabs[activeTab].benefits.map((b, idx) => (
                                                            <li key={idx} className="text-slate-600 text-sm font-medium flex items-start gap-3">
                                                                <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
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
