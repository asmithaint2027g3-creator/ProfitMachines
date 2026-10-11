import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Target, CheckCircle2, Users } from 'lucide-react';

interface OutcomeBlockProps {
    data: {
        title: string;
        tagline: string;
        description: string;
        icon: any;
        metrics: { label: string; value: string }[];
        portfolioCards: { title: string; icon: any }[];
        verticalTabs: { title: string; content: string; icon: any }[];
        icp: {
            title: string;
            audience: string[];
            outcome: string;
        };
    };
    index: number;
}

export default function OutcomeBlock({ data, index }: OutcomeBlockProps) {
    const [activeTab, setActiveTab] = useState(0);
    const Icon = data.icon;

    return (
        <div className="py-20 border-b border-slate-200 last:border-0 relative overflow-hidden">
            {/* Background Gradients */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${index % 2 === 0 ? 'from-emerald-50 to-teal-50' : 'from-teal-50 to-pink-50'} rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left Column: Content & Metrics */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#064e3b] font-bold text-xs uppercase tracking-wider mb-4">
                                <Icon className="w-4 h-4" />
                                <span>Outcome Engine {index + 1}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
                                {data.title}
                            </h3>
                            <p className="text-xl font-medium bg-gradient-to-r from-[#064e3b] to-emerald-600 bg-clip-text text-transparent mb-4">
                                {data.tagline}
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {data.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* ICP Subsection */}
                        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
                                <Target className="w-4 h-4 text-[#064e3b]" />
                                {data.icp.title}
                            </h4>
                            <ul className="space-y-3 mb-4">
                                {data.icp.audience.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 border-t border-slate-200">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                    <p className="text-sm font-semibold text-slate-700">
                                        Outcome: <span className="text-slate-500 font-normal">{data.icp.outcome}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Cards */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#064e3b] rounded-full"></span>
                                Outcome Portfolio
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {data.portfolioCards.map((card, idx) => {
                                    const CardIcon = card.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-emerald-200 transition-colors">
                                            <div className="bg-white p-2 rounded-md shadow-sm group-hover:bg-emerald-50 transition-colors">
                                                <CardIcon className="w-4 h-4 text-[#064e3b]" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">{card.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vertical Tabs (Interactive) */}
                    <div className="lg:w-1/2 w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-full min-h-[260px]">
                        {/* Tab Header Bar */}
                        <div className="px-6 py-2.5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                            <Users className="w-4 h-4 text-slate-500" />
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex-1">
                                Industry Context & Impact
                            </h4>
                        </div>

                        <div className="flex flex-col md:flex-row flex-grow">
                            {/* Tab List */}
                            <div className="md:w-[35%] bg-slate-50/30 border-r border-slate-100 flex flex-col">
                                {data.verticalTabs.map((tab, idx) => {
                                    const TabIcon = tab.icon;
                                    const isActive = activeTab === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTab(idx)}
                                            className={`flex items-center gap-3 p-4 text-left transition-all duration-300 relative border-b border-slate-100 last:border-0 ${isActive
                                                ? 'bg-white text-[#064e3b] shadow-[inset_3px_0_0_0_#2563eb]'
                                                : 'text-slate-500 hover:bg-white hover:text-slate-700'
                                                }`}
                                        >
                                            <TabIcon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-[#064e3b]' : 'text-slate-400'}`} />
                                            <span className={`font-semibold text-sm ${isActive ? 'text-slate-900' : ''}`}>{tab.title}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab Content */}
                            <div className="md:w-[65%] p-8 flex flex-col bg-white">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col justify-center"
                                    >
                                        <ul className="space-y-4">
                                            {(data.verticalTabs[activeTab].content.includes(',')
                                                ? data.verticalTabs[activeTab].content.split(',')
                                                : data.verticalTabs[activeTab].content.split('; ')
                                            ).map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 group">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
                                                    <span className="text-slate-700 font-semibold text-lg leading-snug">
                                                        {item.trim()}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



