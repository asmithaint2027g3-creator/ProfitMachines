import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import VerticalTabEngine from './VerticalTabEngine';
import type { ConversionBlockData } from '../../data/homeContent';

const getColorTheme = (index: number) => {
    const themes = [
        'from-emerald-600 to-cyan-500',
        'from-teal-500 to-pink-500',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-red-500',
    ];
    return themes[index % themes.length];
};

export default function ConversionBlock({ data, index }: { data: ConversionBlockData; index: number }) {
    const isAltBackground = index % 2 === 1;
    const themeGradient = getColorTheme(index);

    return (
        <section className={`py-20 lg:py-32 relative overflow-hidden ${isAltBackground ? 'bg-slate-50' : 'bg-white'}`}>

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br ${themeGradient} opacity-[0.05] blur-[100px]`} />
                <div className={`absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br ${themeGradient} opacity-[0.05] blur-[100px]`} />
            </div>

            <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* PANEL 1: Section Title */}
                <div className="mb-12 md:mb-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            {data.title}
                        </h2>
                        {data.subtitle && (
                            <p className="text-xl text-slate-600 max-w-2xl border-l-4 border-[#2878B5] pl-6 font-medium">
                                {data.subtitle}
                            </p>
                        )}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* LEFT COLUMN: Panels 2 & 3 (Stats & Portfolio) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* PANEL 2: Stats Cards */}
                        <div className="space-y-4">
                            {data.stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="bg-white border border-slate-200 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md hover:border-emerald-200 group"
                                >
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                                    <div className={`text-3xl font-bold bg-gradient-to-r ${themeGradient} bg-clip-text text-transparent`}>
                                        {stat.value}
                                        {stat.suffix && <span className="text-lg text-slate-400 ml-1">{stat.suffix}</span>}
                                    </div>
                                    {stat.subtext && <p className="text-xs text-slate-400 mt-2 font-medium">{stat.subtext}</p>}
                                </motion.div>
                            ))}
                        </div>

                        {/* PANEL 3: Portfolio Cards */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Core Capabilities</h3>
                            {data.portfolio.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                                        className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${themeGradient} bg-opacity-10 text-white`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 font-bold">{item.title}</h4>
                                            {item.desc && <p className="text-xs text-slate-500 font-medium">{item.desc}</p>}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Panels 4 & 5 (Tabs & CTA) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* PANEL 4: Vertical Tab Engine */}
                        <div className="bg-white rounded-3xl p-2 border border-slate-200 shadow-xl">
                            <VerticalTabEngine tabs={data.tabs} />
                        </div>

                        {/* PANEL 5: CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-start md:justify-end"
                        >
                            <button className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-full overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className={`absolute inset-0 bg-gradient-to-r ${themeGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                <span className="relative z-10 flex items-center space-x-2 transition-colors">
                                    <span>{data.cta.text}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
