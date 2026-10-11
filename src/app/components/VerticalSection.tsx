import { useState } from 'react';
import { ConversionBlockData } from '../../data/homeContent';
import StatCard from './StatCard';
import FeatureCard from './FeatureCard';
import EngineTab from './EngineTab';
import ActiveEnginePanel from './ActiveEnginePanel';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerticalSectionProps {
    data: ConversionBlockData;
}

export default function VerticalSection({ data }: VerticalSectionProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="py-12 relative border-t border-slate-100 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-8">

                {/* 1. Section Header */}
                <div className="text-center space-y-4 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        {data.title}
                    </h2>
                    {data.subtitle && (
                        <p className="text-xl text-slate-600 font-normal leading-relaxed">
                            {data.subtitle}
                        </p>
                    )}
                </div>

                {/* 2. Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.stats.map((stat, i) => (
                        <StatCard
                            key={i}
                            label={stat.label}
                            value={stat.value}
                            suffix={stat.suffix}
                            subtext={stat.subtext}
                            index={i}
                        />
                    ))}
                </div>

                {/* 3. Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.portfolio.map((item, i) => (
                        <FeatureCard
                            key={i}
                            icon={item.icon}
                            title={item.title}
                            desc={item.desc}
                            index={i}
                        />
                    ))}
                </div>

                {/* 4. Engine Selector & Active Panel */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col md:flex-row">

                    {/* Left Column: Vertical Tabs */}
                    <div className="md:w-1/3 bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-200 p-4 md:p-6 flex flex-col gap-2">
                        {data.tabs.map((tab, i) => (
                            <EngineTab
                                key={i}
                                title={tab.title}
                                isActive={activeTab === i}
                                onClick={() => {
                                    if (activeTab !== i) setActiveTab(i);
                                }}
                            />
                        ))}
                    </div>

                    {/* Right Column: Active Panel Content */}
                    <div className="md:w-2/3 bg-white p-8 md:p-10 relative overflow-hidden">
                        <ActiveEnginePanel
                            title={data.tabs[activeTab].title}
                            content={data.tabs[activeTab].content}
                        />
                    </div>
                </div>

                {/* CTA for Section */}
                <div className="flex flex-col items-center justify-center pt-10 text-center">
                    <p className="text-slate-600 font-medium mb-4">Need help choosing the right AI solution?</p>
                    <Link to={data.cta?.action || "/book-consultation"} className="btn-cta-primary group">
                        {data.cta?.text || "Talk to Our Experts"}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
