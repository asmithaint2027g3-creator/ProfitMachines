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
                    className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-emerald-950/70 border border-emerald-400/30 shadow-2xl backdrop-blur-xl"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/40 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-300 tracking-wider uppercase">Enterprise Ingestion Ready</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] font-heading">
                        Ready to Deploy Your <br />
                        <span className="text-emerald-300">
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
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-[#064e3b] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                        >
                            <span>Schedule Executive Consultation</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button 
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_QUICK_CLICK' });
                                openQuickForm({ source: 'Final CTA Section', title: 'Quick Architecture Inquiry' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-white font-bold px-8 py-4 rounded-xl border border-emerald-400/50 transition-all"
                        >
                            <Zap className="w-4 h-4 text-emerald-300" />
                            <span>Quick Inquiry (60s)</span>
                        </button>

                        <a 
                            href="https://wa.me/919513088611?text=Hi%20ProfitMachines%2C%20I'd%20like%20to%20discuss%20deploying%20Autonomous%20Revenue%20OS."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-4 rounded-xl shadow-md transition-all shrink-0"
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
