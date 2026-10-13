import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Lock, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';
import { useLeadModal } from '../../context/LeadModalContext';

export default function FinalCTASection() {
    const { openQuickForm, openLongForm } = useLeadModal();

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-white text-[#0066FF] border-t-2 border-[#0066FF]">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-white border-2 border-[#0066FF] relative overflow-hidden"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#0066FF] mb-6">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] inline-block" />
                        <span className="text-xs font-mono font-bold text-[#0066FF] tracking-wider uppercase">Enterprise Ingestion Ready</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0066FF] mb-6 tracking-tight leading-[1.1] font-heading">
                        Ready to Deploy Your <br />
                        <span className="underline decoration-[#0066FF] decoration-4 underline-offset-8">
                            Autonomous Revenue OS?
                        </span>
                    </h2>
                    
                    <p className="text-base sm:text-xl text-[#0066FF] mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join forward-thinking enterprise teams replacing fragmented tools with a unified, self-learning GTM intelligence infrastructure.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                        <button 
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_BOOK_CLICK' });
                                openLongForm({ source: 'Final CTA Section', title: 'Schedule Executive Consultation' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold px-8 py-4 rounded-xl transition-all duration-200 group"
                        >
                            <span>Schedule Executive Consultation</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button 
                            onClick={() => {
                                trackEvent({ eventName: 'FINAL_CTA_QUICK_CLICK' });
                                openQuickForm({ source: 'Final CTA Section', title: 'Quick Architecture Inquiry' });
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#0066FF] text-[#0066FF] hover:text-white font-bold px-8 py-4 rounded-xl border-2 border-[#0066FF] transition-all"
                        >
                            <Zap className="w-4 h-4" />
                            <span>Quick Inquiry (60s)</span>
                        </button>

                        <a 
                            href="https://wa.me/919513088611?text=Hi%20ProfitMachines%2C%20I'd%20like%20to%20discuss%20deploying%20Autonomous%20Revenue%20OS."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] font-bold px-6 py-4 rounded-xl border-2 border-[#0066FF] transition-all shrink-0"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>WhatsApp Sales</span>
                        </a>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[#0066FF] border-t-2 border-[#0066FF] pt-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                            No Long-Term Lock-in
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                            SOC2 Type II Aligned
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#0066FF]" />
                            Mutual Enterprise NDA
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
