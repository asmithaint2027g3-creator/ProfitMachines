
import { useEffect } from 'react';
import { ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';

export default function AILeadSalesTransformation() {
    useEffect(() => {
        document.title = "AI Sales Transformation | ProfitMachines";
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "Process Automation",
        "AI Sales Coaching",
        "Pipeline Visibility",
        "Forecast Accuracy",
        "Revenue Intelligence",
        "Deal Health Scoring"
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#0066FF]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white border-b border-[#0066FF]">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply" />
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem', opacity: 0.2
                    }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0066FF]/8 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0066FF] shadow-sm text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-8">
                            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]" /></span>
                            Digital Sales Evolution
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.05] text-[#0066FF]">
                            Revolutionize Your Sales with{' '}
                            <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0066FF]">
                                AI-Driven Transformation
                            </span>
                        </h1>

                        <p className="text-xl text-[#0066FF] max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                            Analyze, optimize, and scale your sales operations. Replace intuition with intelligence and manual tasks with automated workflows.
                        </p>

                        <Link
                            to="/book-consultation"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] hover:bg-[#0066FF] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#0066FF]/20 hover:shadow-[#0066FF]/20 hover:-translate-y-0.5 group"
                        >
                            Transform Your Sales
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-[#0066FF] uppercase tracking-widest mb-4">Capabilities</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0066FF] tracking-tight mb-4 font-heading">Modernize Your Method</h2>
                        <p className="text-lg text-[#0066FF] font-medium">Equip your team with the tools they need to win in a digital-first world.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="p-7 rounded-[20px] bg-white border border-[#0066FF] hover:border-[#0066FF] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-300">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-[#0066FF] mb-2">{feature}</h3>
                                <p className="text-[#0066FF] text-sm leading-relaxed">Drive behavior change and operational efficiency with data-backed coaching and process automation.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#02241e] via-[#0066FF] to-[#0a5e49] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #0066FF 0%, transparent 60%), radial-gradient(circle at 70% 50%, #059669 0%, transparent 60%)' }} />
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="text-xs font-extrabold text-[#0066FF] uppercase tracking-widest mb-4">Get Started</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6">Future-Proof Your Revenue</h2>
                    <p className="text-xl text-[#0066FF] mb-10 max-w-2xl mx-auto leading-relaxed">Stay ahead of the curve. Adapt to changing buyer behaviors and market dynamics with an agile, AI-powered sales engine.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/book-consultation" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0066FF] transition-all duration-200 shadow-lg shadow-[#0066FF]/20 hover:-translate-y-0.5 group">
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
