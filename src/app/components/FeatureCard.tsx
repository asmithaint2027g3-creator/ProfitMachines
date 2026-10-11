import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    desc?: string;
    index: number;
}

export default function FeatureCard({ icon: Icon, title, desc, index }: FeatureCardProps) {
    return (
        <div
            className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5 flex flex-col items-center text-center gap-4"
        >
            <div className="p-3 rounded-lg bg-emerald-50 text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-white transition-all duration-300">
                <Icon className="w-6 h-6" />
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#053d2e] transition-colors">
                    {title}
                </h3>
                {desc && (
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {desc}
                    </p>
                )}
            </div>
        </div>
    );
}
