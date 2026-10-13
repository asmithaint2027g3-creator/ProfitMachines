import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function WhyChooseSection() {
    return (
        <section id="company" className="py-20 md:py-24 lg:py-32 bg-white overflow-hidden relative border-t-2 border-[#0066FF]">
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
                        <div className="relative rounded-3xl border-2 border-[#0066FF] bg-white overflow-hidden group">
                            {/* Real Image */}
                            <div className="relative h-64 sm:h-72 overflow-hidden border-b-2 border-[#0066FF]">
                                <img 
                                    src="/images/home-why-choose.png" 
                                    alt="ProfitMachines Corporate AI Intelligence Center"
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full border-2 border-[#0066FF] text-xs font-bold text-[#0066FF] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                                    AI Command Hub
                                </div>
                            </div>

                            {/* Content overlay inside card */}
                            <div className="p-6 sm:p-8 bg-white">
                                <h3 className="text-xs font-extrabold text-[#0066FF] mb-4 font-mono tracking-widest uppercase flex items-center gap-2">
                                    // Enterprise Autonomous Infrastructure
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-3.5 bg-white rounded-xl border-2 border-[#0066FF]">
                                        <div className="text-[10px] text-[#0066FF] font-extrabold uppercase font-mono">Global Scale</div>
                                        <div className="text-xs font-bold text-[#0066FF] mt-0.5">Multi-Region Cloud</div>
                                    </div>
                                    <div className="p-3.5 bg-white rounded-xl border-2 border-[#0066FF]">
                                        <div className="text-[10px] text-[#0066FF] font-extrabold uppercase font-mono">Compliance</div>
                                        <div className="text-xs font-bold text-[#0066FF] mt-0.5">SOC2 & ISO Certified</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stat */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl border-2 border-[#0066FF] z-20 hidden md:block">
                            <div className="text-4xl font-black text-[#0066FF] mb-1">10+</div>
                            <div className="text-[11px] font-bold tracking-widest text-[#0066FF] uppercase">Years Experience</div>
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0066FF] bg-white text-xs font-bold text-[#0066FF] uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                            <span>Platform Overview · Institutional Scale</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight leading-tight font-heading">
                            Pioneering Enterprise AI &amp; Digital Transformation
                        </h2>
                        <p className="text-lg text-[#0066FF] mb-10 leading-relaxed font-normal">
                            <strong className="text-[#0066FF] font-bold">Our Mission:</strong> To empower global enterprises with scalable AI solutions, secure cloud architectures, and bespoke software that drives continuous growth and operational efficiency.
                        </p>

                        <div className="space-y-6 mb-12">
                            {[
                                "End-to-End Enterprise Delivery Model tailored to complex workflows",
                                "Global Client Network spanning Fortune 500s and rapid-scaling startups",
                                "Proven Track Record of deploying secure, compliant AI systems"
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                                    </div>
                                    <span className="text-[#0066FF] font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-12 border-t-2 border-[#0066FF] pt-10">
                            <div>
                                <div className="text-4xl font-black text-[#0066FF] mb-2 font-heading">500+</div>
                                <div className="text-[11px] uppercase tracking-widest text-[#0066FF] font-bold">Global Clients</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-[#0066FF] mb-2 font-heading">24/7</div>
                                <div className="text-[11px] uppercase tracking-widest text-[#0066FF] font-bold">Enterprise Support</div>
                            </div>
                        </div>

                        <Link 
                            to="/solutions"
                            className="inline-flex items-center justify-center h-13 px-8 text-sm font-bold bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] rounded-lg uppercase tracking-wide transition-all group"
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
