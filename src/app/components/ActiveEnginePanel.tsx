import React from 'react';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface ActiveEnginePanelProps {
    title: string;
    content: string;
    layoutId?: string;
}

export default function ActiveEnginePanel({ title, content }: ActiveEnginePanelProps) {
    return (
        <div className="relative h-full flex flex-col justify-center">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
                <RefreshCw className="w-64 h-64 text-blue-900 animate-[spin_10s_linear_infinite]" />
            </div>

            <div className="relative z-10 flex flex-col items-start text-left gap-6">

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-green-50 border border-green-200 rounded-full">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-green-700 uppercase tracking-widest">System Active</span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                        {title}
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                        {content}
                    </p>
                </div>

                {/* Data Signal Visual */}
                <div className="mt-4 w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center text-[10px] text-[#2878B5] font-bold">AI</div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</div>
                            <div className="text-sm font-medium text-slate-700">Processing real-time signals</div>
                        </div>
                    </div>

                    {/* Animated Bars */}
                    <div className="flex items-end gap-1 h-6">
                        {[40, 70, 45, 90, 60].map((h, i) => (
                            <div key={i} className="w-1.5 bg-emerald-600 rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
