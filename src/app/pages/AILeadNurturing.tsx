
import { useEffect } from 'react';
import { ArrowRight, HeartHandshake, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';

export default function AILeadNurturing() {
    useEffect(() => {
        document.title = "AI Lead Nurturing | ProfitMachines";
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "Automated Follow-ups",
        "Personalized Content Delivery",
        "Behavior-Based Triggers",
        "Lead Scoring & Prioritization",
        "Omnichannel Engagement",
        "Sentiment Analysis"
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply" />
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem', opacity: 0.2
                    }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 uppercase tracking-widest mb-8">
                            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-teal-700" /></span>
                            Relationship Intelligence
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.05] text-slate-900">
                            Turn Cold Prospects into{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-emerald-700 to-teal-700">
                                Loyal Advocates
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                            Keep your brand top-of-mind with intelligent, automated nurturing sequences. Build trust and guide prospects through their buying journey effortlessly.
                        </p>

                        <Link
                            to="/book-consultation"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/25 hover:shadow-blue-900/35 hover:-translate-y-0.5 group"
                        >
                            Start Nurturing
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-xs font-extrabold text-[#2878B5] uppercase tracking-widest mb-4">Capabilities</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 font-heading">Always On, Always Relevant</h2>
                        <p className="text-lg text-slate-600 font-medium">Our AI ensures you never miss a touchpoint, delivering the right message at the right time.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="p-7 rounded-[20px] bg-slate-50 border border-slate-200 hover:border-emerald-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-300">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-2">{feature}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Engage your audience with hyper-personalized content strategies that drive conversion and retention.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-[#02241e] via-[#2878B5] to-[#0a5e49] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #2878B5 0%, transparent 60%), radial-gradient(circle at 70% 50%, #059669 0%, transparent 60%)' }} />
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Get Started</div>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-6">Build Lasting Relationships</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Transform transactional interactions into long-term partnerships. Let AI manage the journey from awareness to advocacy.</p>
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
