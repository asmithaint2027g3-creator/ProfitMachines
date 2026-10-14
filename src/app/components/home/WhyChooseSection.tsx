import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function WhyChooseSection() {
    return (
        <section id="company" className="py-20 md:py-24 lg:py-32 bg-white overflow-hidden relative border-t border-slate-200">
            <div className="absolute inset-0 bg-grid-slate-100 opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-[500px] bg-[#2878B5]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
                    
                    {/* Left: Operational System Board with Real Corporate Tech Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl border border-slate-200 bg-slate-900 overflow-hidden shadow-2xl group">
                            {/* Real Image */}
                            <div className="relative h-64 sm:h-72 overflow-hidden">
                                <img 
                                    src="/images/home-why-choose.png" 
                                    alt="ProfitMachines Corporate AI Intelligence Center"
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                                    AI Command Hub
                                </div>
                            </div>

                            {/* Content overlay inside card */}
                            <div className="p-6 sm:p-8 bg-slate-900/95 border-t border-slate-800">
                                <h3 className="text-[10px] font-extrabold text-emerald-400 mb-4 font-mono tracking-widest uppercase flex items-center gap-2">
                                    // Enterprise Autonomous Infrastructure
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                                        <div className="text-[10px] text-slate-400 font-extrabold uppercase font-mono">Global Scale</div>
                                        <div className="text-xs font-bold text-white mt-0.5">Multi-Region Cloud</div>
                                    </div>
                                    <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                                        <div className="text-[10px] text-slate-400 font-extrabold uppercase font-mono">Compliance</div>
                                        <div className="text-xs font-bold text-white mt-0.5">SOC2 & ISO Certified</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stat */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-200 z-20 hidden md:block">
                            <div className="text-4xl font-black text-[#2878B5] mb-1">10<span className="text-emerald-500">+</span></div>
                            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Years Experience</div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        id="about-us"
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight font-heading">
                            Pioneering Enterprise AI & Digital Transformation
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                            <strong className="text-slate-900 font-bold">Our Mission:</strong> To empower global enterprises with scalable AI solutions, secure cloud architectures, and bespoke software that drives continuous growth and operational efficiency.
                        </p>

                        <div className="space-y-6 mb-12">
                            {[
                                "End-to-End Enterprise Delivery Model tailored to complex workflows",
                                "Global Client Network spanning Fortune 500s and rapid-scaling startups",
                                "Proven Track Record of deploying secure, compliant AI systems"
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2878B5]" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-12 border-t border-slate-200 pt-10">
                            <div>
                                <div className="text-4xl font-black text-slate-900 mb-2 font-heading">500<span className="text-[#2878B5]">+</span></div>
                                <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">Global Clients</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-slate-900 mb-2 font-heading">24<span className="text-emerald-600">/</span>7</div>
                                <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">Enterprise Support</div>
                            </div>
                        </div>

                        <Link 
                            to="/solutions"
                            className="inline-flex items-center justify-center h-13 px-8 text-sm font-bold bg-[#2878B5] hover:bg-[#085a45] text-white rounded-lg uppercase tracking-wide shadow-md transition-all group"
                        >
                            <span>Explore Our Capabilities</span>
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
