import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AIReputationAcceleration() {
    const location = useLocation();

    useEffect(() => {
        document.title = "AI Reputation Acceleration | ProfitMachines";
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply" />
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem', opacity: 0.2
                    }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 uppercase tracking-widest mb-8">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Trust Intelligence
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.05]">
                            AI Reputation{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Acceleration</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-10 leading-relaxed">
                            Build a reputation that converts before a call is made. Deploy automated review generation, sentiment analysis, and trust-signal deployment to lower cost-per-lead and speed up pipeline.
                        </p>
                        <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 group">
                            Run a Free Reputation Scan
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <Reveal direction="right">
                            <div className="relative rounded-[20px] overflow-hidden shadow-xl border border-slate-200 bg-white p-8">
                                <div className="space-y-5">
                                    {[
                                        { icon: <ShieldCheck className="w-6 h-6" />, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", title: "Trust Signals Deployed", desc: "Across 14 key buyer touchpoints" },
                                        { icon: <ShieldCheck className="w-6 h-6" />, iconBg: "bg-emerald-100", iconColor: "text-[#2878B5]", title: "Sentiment Analysis Active", desc: "Real-time monitoring of brand perception" },
                                        { icon: <ShieldCheck className="w-6 h-6" />, iconBg: "bg-teal-100", iconColor: "text-teal-700", title: "Automated Review Gen", desc: "Triggered at peak customer satisfaction" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-[16px] border border-slate-100">
                                            <div className={`p-3 ${item.iconBg} rounded-xl ${item.iconColor}`}>{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                        <Reveal direction="left">
                            <div className="space-y-6">
                                <div className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Why It Matters</div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Shorten Buyer Consideration Cycles</h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    In today's market, reputation is revenue. Our AI agents monitor customer sentiment across the web, identifying the perfect moments to request reviews and capturing positive feedback automatically.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    By strategically placing these AI-verified trust signals in front of high-intent prospects, we drastically reduce friction in the buying journey.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {[
                                        "Lower Cost-Per-Acquisition through higher trust",
                                        "Accelerated sales velocity by overcoming objections proactively",
                                        "Automated curation of case studies and testimonials"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 font-medium text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#02241e] via-[#2878B5] to-[#0a5e49] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #2878B5 0%, transparent 60%), radial-gradient(circle at 70% 50%, #059669 0%, transparent 60%)' }} />
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Get Started</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6">Build Trust That Converts</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Let AI-driven reputation intelligence shorten your sales cycle and lower acquisition costs.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/book-consultation" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#2878B5] text-white font-bold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 group">
                            Book Consultation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/talk-to-expert" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
                            Talk to an Expert
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
