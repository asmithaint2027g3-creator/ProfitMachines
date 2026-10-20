import { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, CheckCircle2, AlertTriangle, ChevronRight,
    HelpCircle, ChevronDown, Star, Building2, Users, TrendingUp,
    Zap, Shield, Rocket, BarChart3, Target, Brain, Lightbulb, Clock
} from 'lucide-react';
import { servicesPageData } from '../../data/servicesPageData';
import { trackConsultationCtaClick } from '../../lib/clarity';

const iconMap: Record<string, any> = {
    Zap, Shield, Rocket, BarChart3, Target, Brain, Lightbulb,
    TrendingUp, Users, Building2, CheckCircle2, Clock
};

export default function ServicePage() {
    const params = useParams<{ slug?: string }>();
    const location = useLocation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeProcess, setActiveProcess] = useState(0);

    // Extract slug from route params or fallback to pathname (e.g. /services/ai-growth-engine -> ai-growth-engine)
    const slug = params.slug || location.pathname.split('/').filter(Boolean).pop() || '';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!slug || !servicesPageData[slug]) {
        return <Navigate to="/offerings" replace />;
    }

    const data = servicesPageData[slug];

    return (
        <div className="bg-white min-h-screen">

            {/* ── 1. Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30" />
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem', opacity: 0.2
                    }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-10">
                        <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/services" className="hover:text-[#2878B5] transition-colors">Services</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-[#2878B5] font-bold">{data.title}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#1E6297] text-xs font-bold uppercase tracking-widest mb-6">
                                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                                {data.category}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6 font-heading">
                                {data.title}
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl font-medium">
                                {data.heroDescription}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/book-consultation"
                                    onClick={() => trackConsultationCtaClick('Book Consultation', `Service: ${data.title}`)}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2878B5] text-white font-bold rounded-xl hover:bg-[#1E6297] transition-all duration-200 shadow-lg shadow-blue-900/25 hover:shadow-blue-900/35 hover:-translate-y-0.5 group"
                                >
                                    Book Consultation
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/talk-to-expert"
                                    onClick={() => trackConsultationCtaClick('Talk to an Expert', `Service: ${data.title}`)}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 font-bold rounded-xl border border-slate-200 hover:border-emerald-300 hover:text-[#2878B5] transition-all duration-200"
                                >
                                    Talk to an Expert
                                </Link>
                            </div>
                        </motion.div>

                        {/* Hero Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <div className="bg-white border border-slate-200/80 rounded-[24px] p-8 shadow-[0_8px_40px_-12px_rgba(2,6,23,0.12)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10">
                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        {data.heroStats.map((stat, i) => (
                                            <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
                                                <div className="text-3xl font-extrabold text-[#2878B5] mb-1 font-heading">{stat.value}</div>
                                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        {data.heroPoints.map((point, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                                <span className="text-sm font-medium text-slate-700">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 2. Overview ─────────────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Overview</div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 font-heading">
                                {data.overviewTitle}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">{data.overviewText}</p>
                            <p className="text-slate-600 leading-relaxed">{data.overviewSub}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {data.overviewCards.map((card, i) => {
                                const Icon = iconMap[card.icon] || Zap;
                                return (
                                    <div key={i} className="p-6 bg-slate-50 rounded-[20px] border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2878B5] transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-[#2878B5] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-2">{card.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. Problem Statement ─────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #1d4ed8 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4f46e5 0%, transparent 50%)'
                }} />
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-4">The Challenge</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading mb-6">{data.problemTitle}</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">{data.problemText}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.problems.map((problem, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-[20px] p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <AlertTriangle className="w-6 h-6 text-amber-400 mb-4" />
                                <h3 className="text-base font-bold text-white mb-2">{problem.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{problem.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Industry Challenges ───────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Industry Challenges</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">{data.challengesTitle}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.industryChallenges.map((ch, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-[20px] p-6 hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
                                <div className="text-2xl font-black text-slate-100 mb-4 font-heading group-hover:text-emerald-100 transition-colors">0{i + 1}</div>
                                <h3 className="text-base font-bold text-slate-900 mb-2">{ch.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{ch.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. Why ProfitMachines ──────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Why ProfitMachines</div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 font-heading">{data.whyTitle}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">{data.whyText}</p>
                            <div className="space-y-4">
                                {data.whyPoints.map((pt, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-[#2878B5] transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-[#2878B5] group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm mb-1">{pt.title}</div>
                                            <div className="text-slate-500 text-sm">{pt.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Metric strip */}
                        <div className="space-y-4">
                            {data.whyMetrics.map((m, i) => (
                                <div key={i} className="bg-gradient-to-r from-[#2878B5] to-emerald-600 rounded-[20px] p-6 text-white relative overflow-hidden group hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                                    <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full" />
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-1">{m.label}</div>
                                            <div className="text-3xl font-extrabold font-heading">{m.value}</div>
                                        </div>
                                        <TrendingUp className="w-8 h-8 text-white/40" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. Services Included ─────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">What's Included</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">{data.servicesTitle}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.servicesIncluded.map((svc, i) => {
                            const Icon = iconMap[svc.icon] || Zap;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className="bg-white border border-slate-200 rounded-[20px] p-7 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#2878B5] transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-[#2878B5] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-3">{svc.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                                    <ul className="space-y-1.5">
                                        {svc.points.map((pt, j) => (
                                            <li key={j} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 7. Sub-Vertical Sections ─────────────────────────────── */}
            {data.subVerticals && data.subVerticals.length > 0 && (
                <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Deep Capabilities</div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">{data.subVerticalsTitle}</h2>
                        </div>
                        <div className="space-y-6">
                            {data.subVerticals.map((sv, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-200 rounded-[20px] p-8 hover:border-emerald-200 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                                        <div className="md:w-1/3">
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">{sv.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">{sv.desc}</p>
                                        </div>
                                        <div className="md:w-2/3 grid sm:grid-cols-2 gap-3">
                                            {sv.items.map((item, j) => (
                                                <div key={j} className="flex items-center gap-2 text-sm text-slate-700 font-medium bg-white border border-slate-100 rounded-xl px-4 py-3">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 8. Process ───────────────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Our Process</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">{data.processTitle}</h2>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Steps list */}
                        <div className="space-y-3">
                            {data.process.map((step, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveProcess(i)}
                                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${activeProcess === i
                                        ? 'bg-[#2878B5] border-[#2878B5] text-white shadow-lg shadow-blue-900/25'
                                        : 'bg-white border-slate-200 hover:border-emerald-200'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${activeProcess === i ? 'bg-white text-[#2878B5]' : 'bg-slate-100 text-slate-500'}`}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <div className={`font-bold text-sm ${activeProcess === i ? 'text-white' : 'text-slate-900'}`}>{step.title}</div>
                                            <div className={`text-xs mt-0.5 ${activeProcess === i ? 'text-emerald-200' : 'text-slate-500'}`}>{step.duration}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                        {/* Active step detail */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProcess}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm"
                            >
                                <div className="text-5xl font-black text-slate-100 mb-4 font-heading">0{activeProcess + 1}</div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{data.process[activeProcess].title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">{data.process[activeProcess].desc}</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-[#2878B5] bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 w-fit">
                                    <Clock className="w-4 h-4" />
                                    {data.process[activeProcess].duration}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ── 9. Technology Stack ──────────────────────────────────── */}
            {data.techStack && (
                <section className="py-20 bg-slate-900 text-white">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Technology</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-12">Powered by Leading Technologies</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {data.techStack.map((tech, i) => (
                                <span key={i} className="px-5 py-2.5 bg-white/8 border border-white/12 rounded-full font-bold text-sm hover:bg-[#2878B5] hover:border-emerald-600 transition-all duration-300 cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 10. Benefits ─────────────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Benefits</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">{data.benefitsTitle}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.benefits.map((benefit, i) => (
                            <div key={i} className="p-6 bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200 rounded-[20px] group hover:border-emerald-300 hover:shadow-md transition-all duration-300">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-4" />
                                <h3 className="text-base font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 11. Success Metrics ──────────────────────────────────── */}
            {data.metrics && (
                <section className="py-20 lg:py-24 bg-[#2878B5] text-white">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="text-xs font-extrabold text-emerald-200 uppercase tracking-widest mb-4">Success Metrics</div>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">Results That Speak for Themselves</h2>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.metrics.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="text-center p-6 bg-white/10 border border-white/15 rounded-[20px] backdrop-blur-sm hover:bg-white/15 transition-colors"
                                >
                                    <div className="text-4xl font-extrabold mb-2 font-heading">{m.value}</div>
                                    <div className="text-emerald-200 text-sm font-medium">{m.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 12. Testimonials ─────────────────────────────────────── */}
            {data.testimonials && (
                <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Client Success</div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Proven by Industry Leaders</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.testimonials.map((t, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-[20px] p-8 hover:shadow-lg hover:border-emerald-100 transition-all duration-300">
                                    <div className="flex gap-1 mb-5">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed mb-6 text-sm">"{t.quote}"</p>
                                    <div className="pt-5 border-t border-slate-100">
                                        <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                                        <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                                        <div className="text-xs font-bold text-[#2878B5] uppercase tracking-wide mt-1">{t.company}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 13. FAQs ─────────────────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">FAQs</div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-3">
                            {data.faqs.map((faq, i) => (
                                <div key={i} className="border border-slate-200 rounded-[16px] overflow-hidden hover:border-emerald-200 transition-colors">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                                            <span className="font-bold text-slate-900 text-sm">{faq.question}</span>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 pb-6 text-slate-600 text-sm leading-relaxed pl-[52px]">{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 14. CTA ──────────────────────────────────────────────── */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#02241e] via-[#2878B5] to-[#0a5e49] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 30% 50%, #2878B5 0%, transparent 60%), radial-gradient(circle at 70% 50%, #059669 0%, transparent 60%)'
                }} />
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Get Started</div>
                    <h2 className="text-3xl md:text-5xl font-extrabold font-heading mb-6 max-w-3xl mx-auto">
                        Ready to Transform Your {data.title}?
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Talk to our experts and discover how ProfitMachines can accelerate your revenue growth in 90 days.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/book-consultation"
                            onClick={() => trackConsultationCtaClick('Book Free Consultation', `Service Bottom: ${data.title}`)}
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#2878B5] text-white font-bold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 group"
                        >
                            Book Free Consultation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/talk-to-expert"
                            onClick={() => trackConsultationCtaClick('Talk to an Expert', `Service Bottom: ${data.title}`)}
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                        >
                            Talk to an Expert
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
