import React from 'react';
import { ArrowRight, MessageSquare, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { useLeadModal } from '../../context/LeadModalContext';
import { Link } from 'react-router-dom';

export interface ContextualCtaSectionProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    defaultService?: string;
    serviceContext?: string;
    industryContext?: string;
    source?: string;
    className?: string;
}

export default function ContextualCtaSection({
    badge = 'Autonomous Revenue Acceleration',
    title = 'Ready to Transform Your Revenue Engine?',
    subtitle = 'Discover unserved market white spaces, automate high-value sales cadences, and capture verified enterprise ARR.',
    defaultService,
    serviceContext,
    industryContext,
    source = 'Page Bottom CTA Banner',
    className = ''
}: ContextualCtaSectionProps) {
    const { openQuickForm, openLongForm } = useLeadModal();

    const activeService = defaultService || serviceContext || 'AI Growth & Transformation Engine';
    const whatsappNumber = '919513088611';
    const whatsappMsg = `Hi ProfitMachines, I'm reviewing ${activeService} and would like to discuss next steps.`;
    const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    return (
        <section className={`py-16 sm:py-20 lg:py-24 bg-[#0066FF] text-white relative overflow-hidden border-t border-[#0066FF]/20 ${className}`}>
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/60 border border-[#0066FF]/30 text-[#0066FF] text-xs font-bold tracking-wide uppercase mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{badge}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 max-w-3xl mx-auto font-heading">
                    {title}
                </h2>

                <p className="text-base sm:text-lg text-[#0066FF]/90 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
                    {subtitle}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
                    <button
                        onClick={() => openQuickForm({ defaultService: serviceContext, source })}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white hover:bg-[#0066FF] text-[#0066FF] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                        <Zap className="w-4 h-4 text-[#0066FF]" />
                        <span>Quick Inquiry (60s)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        onClick={() => openLongForm({ defaultService: serviceContext, defaultIndustry: industryContext, source })}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#0066FF]/50 hover:bg-[#0066FF]/60 text-white font-semibold text-sm sm:text-base border border-[#0066FF]/40 hover:border-[#0066FF] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <span>Detailed Assessment</span>
                    </button>

                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp Sales</span>
                    </a>
                </div>

                {/* Trust Strip */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#0066FF]/80 pt-4 border-t border-[#0066FF]/20 max-w-2xl mx-auto">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                        <span>SOC2 Type II Aligned</span>
                    </span>
                    <span>•</span>
                    <span>4.2× Avg Pipeline Velocity</span>
                    <span>•</span>
                    <span>Dedicated Architecture Desk</span>
                </div>
            </div>
        </section>
    );
}
