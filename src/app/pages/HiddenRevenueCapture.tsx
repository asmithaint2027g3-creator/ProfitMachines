import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, Database, Search, Target } from 'lucide-react';

export default function HiddenRevenueCapture() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Hidden Revenue Capture | ProfitMachines";
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
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 uppercase tracking-widest mb-8">
                            <Search className="w-3.5 h-3.5 text-orange-600" />
                            Revenue Intelligence
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.05]">
                            Hidden Revenue{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Capture</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-10 leading-relaxed">
                            Recover 15-25% of lost revenue hiding in plain sight. Uncover churn risks, drive intelligent cross-sells, and perform continuous leakage audits.
                        </p>
                        <Link to="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 hover:-translate-y-0.5 group">
                            Scan for Hidden Revenue Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-orange-600 uppercase tracking-widest mb-4">Capabilities</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Three Engines of Recovery</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Reveal delay={0.1}>
                            <div className="bg-white p-7 rounded-[20px] border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                    <Search className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-3">Revenue Leakage Audits</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                    Our AI continuously scans your contracts, billing data, and usage metrics to surface missed renewals, underpriced legacy contracts, and unclaimed incentives.
                                </p>
                                <div className="text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-xl inline-block">
                                    Stop the bleeding instantly
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="bg-white p-7 rounded-[20px] border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Target className="w-32 h-32" />
                                </div>
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5 text-orange-500 relative z-10 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-3 relative z-10">Churn Risk Prediction</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4 relative z-10">
                                    Customer success intelligence detects subtle shifts in product usage, support tickets, and engagement to alert your team of churn risk before it happens.
                                </p>
                                <div className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-xl inline-block relative z-10">
                                    27% Average Churn Reduction
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="bg-white p-7 rounded-[20px] border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <Database className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-3">Cross-sell & Upsell Engines</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                    Autonomous triggers identify the exact moment a customer is ready for expansion based on feature adoption and value realization metrics.
                                </p>
                                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl inline-block">
                                    Continuous LTV Expansion
                                </div>
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
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6">Recover Your Hidden Revenue</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Most companies lose 15-25% of potential revenue to invisible leaks. Let us find and fix yours.</p>
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
