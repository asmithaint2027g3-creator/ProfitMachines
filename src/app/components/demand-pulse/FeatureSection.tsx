import React from 'react';
import { CheckCircle2, Zap, Brain, TrendingUp, Layers } from 'lucide-react';

interface UseCase {
    sector: string;
    description: string;
}

interface FeatureSectionProps {
    number: string;
    title: string;
    tagline: string;
    successExample: string;
    useCases: UseCase[];
    howAiDeliveredIt: string;
    outcomeKPIs: string[];
    id?: string;
}

export default function FeatureSection({
    number,
    title,
    tagline,
    successExample,
    useCases,
    howAiDeliveredIt,
    outcomeKPIs,
    id,
}: FeatureSectionProps) {
    return (
        <section id={id} className="py-16 relative overflow-hidden border-t border-slate-200 bg-white">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/50 via-slate-50/0 to-slate-50/0 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">


                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 font-mono">
                            {number}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-emerald-600/30 to-transparent"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 font-light max-w-4xl leading-relaxed">
                        {tagline}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Col: Success Story & Use Cases (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Success Example Card */}
                        <div className="bg-white border border-emerald-100 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-300 transition-all shadow-xl shadow-blue-900/5">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <TrendingUp className="w-32 h-32 text-[#2878B5]" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-emerald-50 rounded-lg">
                                        <Zap className="w-6 h-6 text-[#2878B5]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-blue-900 uppercase tracking-widest">
                                        Success Example
                                    </h3>
                                </div>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {successExample}
                                </p>
                            </div>
                        </div>

                        {/* Use Cases */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-[#2878B5]" />
                                Strategic Use Cases
                            </h3>
                            <div className="grid gap-4">
                                {useCases.map((useCase, idx) => (
                                    <div key={idx} className="group flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all duration-300 hover:translate-x-1">
                                        <span className="text-[#2878B5] font-bold whitespace-nowrap min-w-[80px]">{useCase.sector}:</span>
                                        <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{useCase.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: The AI Tech & KPIs (5 cols) */}
                    <div className="lg:col-span-5 space-y-6 flex flex-col">

                        {/* How AI Delivered It */}
                        <div className="bg-gradient-to-b from-teal-50 to-white border border-emerald-100 rounded-2xl p-6 backdrop-blur-md">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E6297] mb-4">
                                <Brain className="w-5 h-5" /> How AI Delivered It
                            </h3>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                {howAiDeliveredIt}
                            </p>
                        </div>

                        {/* Outcome KPIs */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                            <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4 border-b border-emerald-200 pb-3">
                                Outcome KPIs
                            </h3>
                            <div className="space-y-3">
                                {outcomeKPIs.map((kpi, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <span className="text-emerald-900 font-medium text-lg leading-tight">{kpi}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
