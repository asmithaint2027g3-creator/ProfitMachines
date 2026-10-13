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
        <div className="py-20 border-b border-[#0066FF] last:border-0 relative overflow-hidden">
            {/* Background Gradients */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${index % 2 === 0 ? 'from-[#0066FF] to-[#0066FF]' : 'from-[#0066FF] to-pink-50'} rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left Column: Content & Metrics */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0066FF] text-[#0066FF] font-bold text-xs uppercase tracking-wider mb-4">
                                <Icon className="w-4 h-4" />
                                <span>Outcome Engine {index + 1}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0066FF] mb-3 leading-tight">
                                {data.title}
                            </h3>
                            <p className="text-xl font-medium bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent mb-4">
                                {data.tagline}
                            </p>
                            <p className="text-[#0066FF] text-lg leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {data.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-[#0066FF] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-2xl font-bold text-[#0066FF] mb-1">{metric.value}</div>
                                    <div className="text-xs font-semibold text-[#0066FF] uppercase tracking-wide">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* ICP Subsection */}
                        <div className="bg-white/80 rounded-2xl p-6 border border-[#0066FF] shadow-sm">
                            <h4 className="flex items-center gap-2 font-bold text-[#0066FF] mb-4 text-sm uppercase tracking-wide">
                                <Target className="w-4 h-4 text-[#0066FF]" />
                                {data.icp.title}
                            </h4>
                            <ul className="space-y-3 mb-4">
                                {data.icp.audience.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-[#0066FF] leading-relaxed font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 border-t border-[#0066FF]">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                                    <p className="text-sm font-semibold text-[#0066FF]">
                                        Outcome: <span className="text-[#0066FF] font-normal">{data.icp.outcome}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Cards */}
                        <div>
                            <h4 className="font-bold text-[#0066FF] mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#0066FF] rounded-full"></span>
                                Outcome Portfolio
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {data.portfolioCards.map((card, idx) => {
                                    const CardIcon = card.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#0066FF] group hover:border-[#0066FF] transition-colors">
                                            <div className="bg-white p-2 rounded-md shadow-sm group-hover:bg-[#0066FF] transition-colors">
                                                <CardIcon className="w-4 h-4 text-[#0066FF]" />
                                            </div>
                                            <span className="text-sm font-semibold text-[#0066FF]">{card.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vertical Tabs (Interactive) */}
                    <div className="lg:w-1/2 w-full bg-white rounded-3xl shadow-xl border border-[#0066FF] overflow-hidden flex flex-col h-full min-h-[260px]">
                        {/* Tab Header Bar */}
                        <div className="px-6 py-2.5 bg-white/50 border-b border-[#0066FF] flex items-center gap-3">
                            <Users className="w-4 h-4 text-[#0066FF]" />
                            <h4 className="text-xs font-bold text-[#0066FF] uppercase tracking-widest flex-1">
                                Industry Context & Impact
                            </h4>
                        </div>

                        <div className="flex flex-col md:flex-row flex-grow">
                            {/* Tab List */}
                            <div className="md:w-[35%] bg-white/30 border-r border-[#0066FF] flex flex-col">
                                {data.verticalTabs.map((tab, idx) => {
                                    const TabIcon = tab.icon;
                                    const isActive = activeTab === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTab(idx)}
                                            className={`flex items-center gap-3 p-4 text-left transition-all duration-300 relative border-b border-[#0066FF] last:border-0 ${isActive
                                                ? 'bg-white text-[#0066FF] shadow-[inset_3px_0_0_0_#2563eb]'
                                                : 'text-[#0066FF] hover:bg-white hover:text-[#0066FF]'
                                                }`}
                                        >
                                            <TabIcon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-[#0066FF]' : 'text-[#0066FF]'}`} />
                                            <span className={`font-semibold text-sm ${isActive ? 'text-[#0066FF]' : ''}`}>{tab.title}</span>
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
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
                                                    <span className="text-[#0066FF] font-semibold text-lg leading-snug">
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



