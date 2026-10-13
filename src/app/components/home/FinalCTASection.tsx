import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Lock, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';
import { useLeadModal } from '../../context/LeadModalContext';

export default function FinalCTASection() {
    const { openQuickForm, openLongForm } = useLeadModal();

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-[#064e3b] text-white border-t border-emerald-500/20">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-400 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-teal-400 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-br from-[#021a15] via-[#032b24] to-[#064e3b] border border-emerald-400/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] inline-block animate-pulse" />
                        <span className="text-xs font-mono font-bold text-emerald-300 tracking-wider uppercase">Enterprise Ingestion Ready</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] font-heading">
                        Ready to Deploy Your <br />
                        <span className="text-emerald-300 italic">
                            Autonomous Revenue OS?
                        </span>
                    </h2>
                    
                    <p className="text-base sm:text-xl text-emerald-100/90 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
                        Join forward-thinking enterprise teams replacing fragmented tools with a unified, self-learning GTM intelligence infrastructure.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                        <button 
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_BOOK_CLICK' });
                                openLongForm({ source: 'Final CTA Section', title: 'Schedule Executive Consultation' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-[#032b24] font-bold px-8 py-4 rounded-xl shadow-[0_4px_14px_rgba(52,211,153,0.3)] hover:shadow-[0_8px_24px_rgba(52,211,153,0.45)] transition-all duration-200 group hover:-translate-y-0.5"
                        >
                            <span>Schedule Executive Consultation</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button 
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_QUICK_CLICK' });
                                openQuickForm({ source: 'Final CTA Section', title: 'Quick Architecture Inquiry' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white hover:text-emerald-200 font-bold px-8 py-4 rounded-xl border border-emerald-400/40 backdrop-blur-md transition-all hover:-translate-y-0.5"
                        >
                            <Zap className="w-4 h-4 text-emerald-300" />
                            <span>Quick Inquiry (60s)</span>
                        </button>

                        <a 
                            href="https://wa.me/919513088611?text=Hi%20ProfitMachines%2C%20I'd%20like%20to%20discuss%20deploying%20Autonomous%20Revenue%20OS."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-4 rounded-xl shadow-md transition-all shrink-0 hover:-translate-y-0.5"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>WhatsApp Sales</span>
                        </a>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-emerald-200/80 border-t border-emerald-500/20 pt-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            No Long-Term Lock-in
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            SOC2 Type II Aligned
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-emerald-400" />
                            Mutual Enterprise NDA
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
