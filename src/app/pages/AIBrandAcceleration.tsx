import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AIBrandAcceleration() {
    const location = useLocation();

    useEffect(() => {
        document.title = "AI Brand Acceleration | ProfitMachines";
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
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 uppercase tracking-widest mb-8">
                            <Sparkles className="w-3.5 h-3.5 text-[#064e3b]" />
                            Brand Intelligence
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.05]">
                            AI Brand{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#064e3b] to-emerald-600">Acceleration</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-10 leading-relaxed">
                            Turn unknown demand into recognised preference. Watch how AI tunes brand messaging, content, and presence based on demand pulse and buyer intent.
                        </p>
                        <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 bg-[#064e3b] hover:bg-[#053d2e] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/45 hover:-translate-y-0.5 group">
                            Reveal Your Brand Acceleration Potential
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <Reveal direction="right">
                            <div className="space-y-6">
                                <div className="text-xs font-extrabold text-[#064e3b] uppercase tracking-widest">How It Works</div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Intent-Based Brand Exposure</h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Our AI constantly monitors market signals and buyer intent to dynamically adjust your brand messaging. By presenting the right content to the right audience at the perfect time, we transform passive demand into active brand preference before a sales conversation even begins.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {[
                                        "Dynamic messaging based on real-time market pulse",
                                        "Automated content distribution at peak engagement times",
                                        "Expanded market presence without linear headcount growth"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-slate-700 font-medium text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal direction="left">
                            <div className="relative rounded-[20px] overflow-hidden shadow-xl border border-slate-200 bg-white p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/50 -z-10" />
                                <div className="space-y-5">
                                    {[
                                        { label: "Outcome", value: "3x Brand Recognition Lift", color: "text-[#064e3b]" },
                                        { label: "Market Expansion", value: "45% Wider Reach in Target ICP", color: "text-[#064e3b]" },
                                        { label: "Cost Efficiency", value: "Reduced CPA by 30%", color: "text-emerald-600" }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-5 bg-white rounded-[16px] shadow-sm border border-slate-100">
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</h3>
                                            <p className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#02241e] via-[#064e3b] to-[#0a5e49] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #064e3b 0%, transparent 60%), radial-gradient(circle at 70% 50%, #059669 0%, transparent 60%)' }} />
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Get Started</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6">Amplify Your Brand Today</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Let AI-powered brand intelligence position your company as the obvious choice in your market.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/book-consultation" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#064e3b] text-white font-bold rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5 group">
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
