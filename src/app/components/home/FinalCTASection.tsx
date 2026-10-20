import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Lock, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '../../../lib/analytics';
import { trackConsultationCtaClick } from '../../../lib/clarity';
import { useLeadModal } from '../../context/LeadModalContext';

export default function FinalCTASection() {
    const { openQuickForm, openLongForm } = useLeadModal();

    return (
        <section className="relative py-24 md:py-32 overflow-hidden" style={{
            background: 'linear-gradient(160deg, #020F1E 0%, #0A2540 40%, #0F3560 80%, #1B5E91 100%)'
        }}>
            {/* Background mesh */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2878B5]/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#5CAAE6]/10 rounded-full blur-[120px]" />
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }} />
            </div>

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2878B5]/50 to-transparent" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                        style={{
                            background: 'rgba(40,120,181,0.15)',
                            border: '1px solid rgba(92,170,230,0.3)'
                        }}>
                        <span className="flex h-2 w-2 rounded-full bg-[#5CAAE6] animate-pulse" />
                        <span className="text-xs font-bold text-[#BAE0F8] tracking-[0.15em] uppercase">Enterprise Ingestion Ready</span>
                    </div>

                    {/* Headline */}
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.05]"
                        style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}
                    >
                        Ready to Deploy Your{' '}
                        <span className="text-[#5CAAE6]">Autonomous Revenue OS?</span>
                    </h2>

                    <p className="text-lg sm:text-xl text-[#BAE0F8]/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join forward-thinking enterprise teams replacing fragmented tools with a unified, self-learning GTM intelligence infrastructure.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                        <button
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_BOOK_CLICK' });
                                trackConsultationCtaClick('Schedule Executive Consultation', 'Final CTA Section');
                                openLongForm({ source: 'Final CTA Section', title: 'Schedule Executive Consultation' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2878B5] hover:bg-[#1E6297] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
                            style={{ fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(40,120,181,0.4)' }}
                        >
                            <span>Schedule Executive Consultation</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_QUICK_CLICK' });
                                trackConsultationCtaClick('Quick Inquiry', 'Final CTA Section');
                                openQuickForm({ source: 'Final CTA Section', title: 'Quick Architecture Inquiry' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1.5px solid rgba(92,170,230,0.35)'
                            }}
                        >
                            <Zap className="w-4 h-4 text-[#5CAAE6]" />
                            <span>Quick Inquiry (60s)</span>
                        </button>

                        <a
                            href="https://wa.me/919513088611?text=Hi%20ProfitMachines%2C%20I'd%20like%20to%20discuss%20deploying%20Autonomous%20Revenue%20OS."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 shrink-0"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>WhatsApp Sales</span>
                        </a>
                    </div>

                    {/* Trust strip */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#BAE0F8]/70"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#5CAAE6]" />
                            No Long-Term Lock-in
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#5CAAE6]" />
                            SOC2 Type II Aligned
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#5CAAE6]" />
                            Mutual Enterprise NDA
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
