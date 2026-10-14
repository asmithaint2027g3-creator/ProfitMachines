import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Tab {
    title: string;
    content: string;
}

interface VerticalTabEngineProps {
    tabs: Tab[];
}

export default function VerticalTabEngine({ tabs }: VerticalTabEngineProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex flex-col md:flex-row gap-8 h-full min-h-[300px]">
            {/* Tabs List */}
            <div className="flex flex-col gap-2 md:w-1/3">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (activeTab !== index) setActiveTab(index);
                        }}
                        className={`relative p-4 text-left rounded-xl transition-all duration-300 group ${activeTab === index
                            ? 'bg-white border border-emerald-200 shadow-sm'
                            : 'bg-transparent border border-transparent hover:bg-slate-50'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`font-bold transition-colors ${activeTab === index ? 'text-[#1E6297]' : 'text-slate-500 group-hover:text-slate-800'}`}>
                                {tab.title}
                            </span>
                            {activeTab === index && (
                                <ChevronRight className="w-4 h-4 text-[#2878B5]" />
                            )}
                        </div>
                        {/* Progress Bar for Active Tab */}
                        {activeTab === index && (
                            <motion.div
                                layoutId="activeTabGlow"
                                className="absolute inset-0 rounded-xl bg-emerald-50/50 -z-10"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 relative bg-white rounded-2xl border border-slate-200 p-8 md:p-10 overflow-hidden shadow-sm">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-slate-50/50 to-white"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 h-full flex flex-col justify-center items-start"
                    >
                        <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                            {tabs[activeTab].title}
                        </h4>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            {tabs[activeTab].content}
                        </p>

                        <div className="mt-auto flex items-center space-x-2 text-sm text-[#1E6297] font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                            <span className="w-2 h-2 bg-[#2878B5] rounded-full animate-pulse"></span>
                            <span className="uppercase tracking-wider text-xs">System Active</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
