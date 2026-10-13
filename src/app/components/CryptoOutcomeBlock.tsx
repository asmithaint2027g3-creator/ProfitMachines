
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, TrendingUp, Target, CheckCircle2 } from 'lucide-react';

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

export default function CryptoOutcomeBlock({ data, index }: OutcomeBlockProps) {
    const [activeTab, setActiveTab] = useState(0);
    const Icon = data.icon;

    return (
        <div className="py-24 border-b border-[#0066FF] last:border-0 relative overflow-hidden">
            {/* Background Gradients */}
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${index % 2 === 0 ? 'from-[#0066FF]/40 to-purple-200/40' : 'from-purple-200/40 to-indigo-200/40'} rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>
            <div className="absolute inset-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Column: Content & Metrics */}
                    <div className="lg:w-1/2 space-y-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0066FF] text-[#0066FF] font-bold text-xs uppercase tracking-wider mb-6 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                <Icon className="w-4 h-4" />
                                <span>Outcome Engine {index + 1}</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-[#0066FF] mb-4 leading-tight tracking-tight">
                                {data.title}
                            </h3>
                            <p className="text-xl font-medium bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent mb-6">
                                {data.tagline}
                            </p>
                            <p className="text-[#0066FF] text-lg leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-5">
                            {data.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-2xl border border-[#0066FF] shadow-sm hover:border-[#0066FF] hover:shadow-md transition-all duration-300 group">
                                    <div className="text-3xl font-bold text-[#0066FF] mb-1 group-hover:scale-105 transition-transform origin-left">{metric.value}</div>
                                    <div className="text-xs font-bold text-[#0066FF] uppercase tracking-widest">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* ICP Subsection */}
                        <div className="bg-white/50 rounded-2xl p-8 border border-[#0066FF] shadow-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <h4 className="flex items-center gap-2.5 font-bold text-[#0066FF] mb-6 text-sm uppercase tracking-widest">
                                <Target className="w-4 h-4 text-[#0066FF]" />
                                {data.icp.title}
                            </h4>
                            <ul className="space-y-4 mb-6">
                                {data.icp.audience.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 text-sm text-[#0066FF] leading-relaxed font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2.5 shrink-0 shadow-[0_0_8px_rgba(6,78,59,0.4)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t border-[#0066FF]">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
                                    <p className="text-sm font-semibold text-[#0066FF]">
                                        Outcome: <span className="text-[#0066FF] font-medium">{data.icp.outcome}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Cards */}
                        <div>
                            <h4 className="font-bold text-[#0066FF] mb-5 flex items-center gap-3 text-sm uppercase tracking-wider">
                                <span className="w-1 h-5 bg-[#0066FF] rounded-full shadow-[0_0_10px_#3b82f6]"></span>
                                Outcome Portfolio
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {data.portfolioCards.map((card, idx) => {
                                    const CardIcon = card.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#0066FF] group hover:border-[#0066FF] hover:shadow-md transition-all duration-300">
                                            <div className="bg-white p-2.5 rounded-lg shadow-sm group-hover:bg-[#0066FF] transition-colors border border-[#0066FF]">
                                                <CardIcon className="w-4 h-4 text-[#0066FF]" />
                                            </div>
                                            <span className="text-sm font-semibold text-[#0066FF] group-hover:text-blue-900 transition-colors">{card.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vertical Tabs (Interactive) */}
                    <div className="lg:w-1/2 w-full flex flex-col md:flex-row gap-6 h-full min-h-[550px]">
                        {/* Tab List */}
                        <div className="md:w-5/12 flex flex-col gap-4">
                            {data.verticalTabs.map((tab, idx) => {
                                const TabIcon = tab.icon;
                                const isActive = activeTab === idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveTab(idx)}
                                        className={`flex items-center gap-3 p-4 text-left transition-all duration-300 relative rounded-xl border w-full group ${isActive
                                            ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20'
                                            : 'bg-white border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/10 hover:text-[#0066FF] hover:border-[#0066FF]'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg transition-all ${isActive ? 'bg-white/20' : 'bg-white group-hover:bg-white'}`}>
                                            <TabIcon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-[#0066FF] group-hover:text-[#0066FF]'}`} />
                                        </div>
                                        <span className={`font-semibold text-sm transition-colors text-left flex-1 break-words min-w-0 leading-tight ${isActive ? 'text-white' : ''}`}>{tab.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Content */}
                        <div className="md:w-7/12 bg-white rounded-3xl border border-[#0066FF] p-10 flex flex-col justify-center relative shadow-xl overflow-hidden">
                            {/* Content Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/50 rounded-full blur-3xl pointer-events-none"></div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8 relative z-10"
                                >
                                    <div className="flex flex-col h-full justify-center">
                                        <div className="text-xl md:text-2xl font-medium text-[#0066FF] leading-relaxed text-balance">
                                            {data.verticalTabs[activeTab].content.split('. ').map((sentence, sIdx) => (
                                                <div key={sIdx} className="mb-4 last:mb-0 flex items-start gap-3">
                                                    {sentence.trim() && (
                                                        <>
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                                            <span>{sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}</span>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quote Footer - Kept as purely decorative/thematic element if needed, 
                                        but reducing its visual weight or removing if it interferes. 
                                        I'll keep a unified, simpler quote footer for all tabs to match the "clean" request, 
                                        or just remove the dynamic one to simplify. 
                                        The user said "Directly make the Bullet Points", so I'll just keep the footer simple/static or remove.
                                        I will remove the complex dynamic footer to declutter. */}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
