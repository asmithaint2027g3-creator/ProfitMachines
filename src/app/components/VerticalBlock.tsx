import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';

interface VerticalBlockProps {
    data: {
        title: string;
        tagline: string;
        description: string;
        icon: any;
        kpis: { label: string; value: string }[];
        verticalTabs: { title: string; content: string; icon: any }[];
    };
    index: number;
}

export default function VerticalBlock({ data, index }: VerticalBlockProps) {
    const [activeTab, setActiveTab] = useState(0);
    const Icon = data.icon;

    return (
        <div className="py-20 border-b border-[#0066FF] last:border-0 relative overflow-hidden">
            {/* Background Gradients */}
            <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-[600px] h-[600px] bg-gradient-to-br ${index % 2 === 0 ? 'from-[#0066FF] to-[#0066FF]' : 'from-[#0066FF] to-cyan-50'} rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-0 pointer-events-none`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0066FF] text-[#0066FF] font-bold text-xs uppercase tracking-wider mb-4">
                                <Icon className="w-4 h-4" />
                                <span>Vertical {index + 1}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0066FF] mb-3 leading-tight">
                                {data.title}
                            </h3>
                            <div className="h-1 w-20 bg-gradient-to-r from-[#0066FF] to-[#0066FF] rounded-full mb-6"></div>
                            <p className="text-xl font-medium text-[#0066FF] mb-4">
                                {data.tagline}
                            </p>
                            <p className="text-[#0066FF] text-lg leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        {/* KPIs Grid */}
                        <div>
                            <h4 className="font-bold text-[#0066FF] mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                Offering Impacts
                            </h4>
                            <div className="grid grid-cols-2 gap-4 max-w-fit">
                                {data.kpis.map((kpi, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl border border-[#0066FF] shadow-sm hover:border-[#0066FF] transition-colors">
                                        <div className="text-2xl font-bold text-[#0066FF] mb-1">{kpi.value}</div>
                                        <div className="text-xs font-semibold text-[#0066FF] uppercase tracking-wide leading-snug">{kpi.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Side: Vertical Tabs */}
                    <div className="lg:w-1/2 w-full bg-white rounded-2xl shadow-xl border border-[#0066FF] overflow-hidden flex flex-col h-auto">
                        {/* Header for Tabs Context */}
                        <div className="bg-white px-5 py-3 border-b border-[#0066FF] flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#0066FF]" />
                            <span className="font-bold text-[#0066FF] text-xs uppercase tracking-wide">Industry Context & Impact</span>
                        </div>

                        <div className="flex flex-col md:flex-row flex-grow">
                            {/* Tab List */}
                            <div className="md:w-1/3 border-r border-[#0066FF] flex flex-col bg-white/30">
                                {data.verticalTabs.map((tab, idx) => {
                                    const TabIcon = tab.icon;
                                    const isActive = activeTab === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTab(idx)}
                                            className={`flex items-center gap-3 p-3 text-left transition-all duration-300 relative border-b border-[#0066FF] last:border-0 hover:bg-white ${isActive
                                                ? 'bg-white text-[#0066FF] shadow-[inset_3px_0_0_0_#2563eb] z-10'
                                                : 'text-[#0066FF]'
                                                }`}
                                        >
                                            <TabIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#0066FF]' : 'text-[#0066FF]'}`} />
                                            <span className={`font-semibold text-xs ${isActive ? 'text-[#0066FF]' : ''}`}>{tab.title}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab Content */}
                            <div className="md:w-2/3 p-4 flex flex-col justify-start relative bg-white">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-3"
                                    >
                                        <h4 className="text-base font-bold text-[#0066FF] mb-3">
                                            {data.verticalTabs[activeTab].title}
                                        </h4>
                                        <div className="space-y-2">
                                            {data.verticalTabs[activeTab].content.split(';').map((point, i) => (
                                                <div key={i} className="flex items-start gap-2.5">
                                                    <div className="w-1 h-1 rounded-full bg-[#0066FF] mt-1.5 flex-shrink-0" />
                                                    <p className="text-[#0066FF] text-sm leading-relaxed">
                                                        {point.trim()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
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
