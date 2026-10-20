import React, { useState, useEffect } from 'react';
import { ArrowRight, X, MessageSquare, Zap, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLeadModal } from '../context/LeadModalContext';
import { trackConsultationCtaClick } from '../../lib/clarity';

export default function StickyCtaBar() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();

    useEffect(() => {
        const onScroll = () => {
            if (!dismissed && window.scrollY > 350) {
                setVisible(true);
            } else if (window.scrollY <= 350) {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [dismissed]);

    if (dismissed) return null;

    // Get current page context for WhatsApp message
    const getContextTitle = () => {
        const path = location.pathname;
        if (path.includes('pricing')) return 'Pricing & Plans';
        if (path.includes('crypto')) return 'Web3 & Crypto Solutions';
        if (path.includes('demand-pulse')) return 'DemandPulse AI';
        if (path.includes('solutions')) return 'AI Business Solutions';
        if (path.includes('offerings')) return 'Service Offerings';
        if (path.includes('industries')) return 'Industry Engines';
        if (path.includes('analytics')) return 'Enterprise Analytics';
        return 'Autonomous Revenue OS';
    };

    const whatsappNumber = '919513088611';
    const whatsappText = `Hi ProfitMachines, I'm reviewing ${getContextTitle()} and would like to connect with an expert.`;
    const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    return (
        <aside
            aria-label="Sticky Call to Action"
            className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-out transform ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
            }`}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="bg-slate-900/95 backdrop-blur-md border-t border-[#2878B5]/30 shadow-2xl text-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
                    
                    {/* Left Teaser Text (Hidden on smallest mobile) */}
                    <div className="hidden sm:flex items-center gap-2.5 shrink-0">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5CAAE6] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2878B5]" />
                        </span>
                        <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                            Ready to accelerate enterprise ARR velocity?
                        </p>
                    </div>

                    {/* Action Group */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none justify-between sm:justify-end">
                        
                        {/* 1. Quick Inquiry Button */}
                        <button
                            onClick={() => {
                                trackConsultationCtaClick('Quick Inquiry', 'Sticky CTA Bar');
                                openQuickForm({ defaultService: getContextTitle(), source: 'Sticky CTA Bar' });
                            }}
                            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#2878B5]/20 hover:bg-[#2878B5]/30 text-[#BAE0F8] hover:text-white border border-[#2878B5]/40 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer"
                        >
                            <Zap className="w-3.5 h-3.5 text-[#5CAAE6]" />
                            <span>Quick Inquiry</span>
                        </button>

                        {/* 2. Book Consultation Button */}
                        <button
                            onClick={() => {
                                trackConsultationCtaClick('Book Consultation', 'Sticky CTA Bar');
                                openLongForm({ defaultService: getContextTitle(), source: 'Sticky CTA Bar' });
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md shrink-0 group border border-[#5CAAE6]/40 cursor-pointer"
                        >
                            <Calendar className="w-3.5 h-3.5 text-white" />
                            <span>Book Consultation</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* 3. WhatsApp Quick Link */}
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Direct WhatsApp Sales Line"
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shrink-0"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">WhatsApp</span>
                        </a>

                        {/* Dismiss Button */}
                        <button
                            onClick={() => {
                                setDismissed(true);
                                setVisible(false);
                            }}
                            className="p-1.5 text-emerald-300/70 hover:text-white transition-colors rounded-md hover:bg-white/10 shrink-0 ml-1"
                            aria-label="Dismiss sticky CTA bar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </aside>
    );
}
