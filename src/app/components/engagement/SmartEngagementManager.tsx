import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Sparkles,
    ArrowRight,
    X,
    Clock,
    Compass,
    Save,
    CheckCircle2,
    HelpCircle,
    Zap,
    ChevronRight,
    Shield
} from 'lucide-react';
import { useVisitorEngagement } from '../../context/VisitorEngagementContext';
import { useLeadModal } from '../../context/LeadModalContext';

export default function SmartEngagementManager() {
    const navigate = useNavigate();
    const {
        activeEngagement,
        visitorInfo,
        lastVisitedPage,
        currentPrompt,
        dismissEngagement,
        resumeActiveForm,
        confirmFormDismiss,
        activeFormType
    } = useVisitorEngagement();

    const { openQuickForm, openLongForm, closeModal } = useLeadModal();
    const [showRelatedPages, setShowRelatedPages] = useState(false);

    // Auto-dismiss welcome toast after 9 seconds if not interacted with
    useEffect(() => {
        if (activeEngagement === 'welcome') {
            const timer = setTimeout(() => {
                dismissEngagement();
            }, 9000);
            return () => clearTimeout(timer);
        }
    }, [activeEngagement, dismissEngagement]);

    if (activeEngagement === 'none') return null;

    /* ─────────────────────────────────────────────────────────────────────────
     * 1. RETURNING VISITOR WELCOME MESSAGE
     * ───────────────────────────────────────────────────────────────────────── */
    if (activeEngagement === 'welcome') {
        return (
            <aside
                aria-label="Visitor welcome notification"
                aria-live="polite"
                className="fixed top-20 right-4 sm:right-6 z-[90] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] bg-white border-2 border-[#0066FF] rounded-2xl p-4 sm:p-5 text-[#0066FF]"
            >
                <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#0066FF] flex items-center justify-center text-[#0066FF] shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5 text-[#0066FF]" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#0066FF] text-[#0066FF] text-[11px] font-bold uppercase tracking-wider">
                                {visitorInfo.isReturning ? 'Returning Executive' : 'Welcome'}
                            </span>
                            <button
                                onClick={dismissEngagement}
                                aria-label="Close welcome message"
                                className="text-[#0066FF] hover:bg-[#0066FF]/10 p-1 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-[#0066FF] font-heading">
                            {visitorInfo.greeting}! {visitorInfo.isReturning ? 'Welcome back to ProfitMachines.' : 'Welcome to ProfitMachines.'}
                        </h4>

                        <p className="text-xs text-[#0066FF] mt-1 leading-relaxed font-medium">
                            {visitorInfo.isReturning
                                ? 'We have updated our AI Revenue OS with new intent signals and benchmark playbooks.'
                                : 'Explore how modular AI engines automate pipeline generation and revenue predictability.'}
                        </p>

                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#0066FF]">
                            <button
                                onClick={() => {
                                    dismissEngagement();
                                    openQuickForm({ title: 'Welcome to ProfitMachines' });
                                }}
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline"
                            >
                                <span>Quick 60-Sec Inquiry</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[#0066FF]">·</span>
                            <button
                                onClick={dismissEngagement}
                                className="text-xs text-[#0066FF] hover:underline font-bold"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    /* ─────────────────────────────────────────────────────────────────────────
     * 2. RECENTLY VISITED PAGE ALERT
     * ───────────────────────────────────────────────────────────────────────── */
    if (activeEngagement === 'recent_page' && lastVisitedPage) {
        return (
            <aside
                aria-label="Recently visited page reminder"
                aria-live="polite"
                className="fixed top-20 right-4 sm:right-6 z-[90] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] bg-white border-2 border-[#0066FF] rounded-2xl p-4 sm:p-5 text-[#0066FF]"
            >
                <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#0066FF] flex items-center justify-center text-[#0066FF] shrink-0 mt-0.5">
                        <Compass className="w-5 h-5 text-[#0066FF]" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#0066FF] text-[#0066FF] text-[11px] font-bold uppercase tracking-wider">
                                Resume Session
                            </span>
                            <button
                                onClick={dismissEngagement}
                                aria-label="Close page reminder"
                                className="text-[#0066FF] hover:bg-[#0066FF]/10 p-1 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-[#0066FF] font-heading">
                            Welcome back! Continue exploring?
                        </h4>

                        <p className="text-xs text-[#0066FF] mt-1 leading-relaxed font-medium">
                            You previously explored <span className="font-bold underline">{lastVisitedPage.title}</span>. Pick up right where you left off.
                        </p>

                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#0066FF]">
                            <button
                                onClick={() => {
                                    dismissEngagement();
                                    navigate(lastVisitedPage.path);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] border-2 border-[#0066FF] text-xs font-bold transition-all"
                            >
                                <span>Continue Exploring</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={dismissEngagement}
                                className="text-xs text-[#0066FF] hover:underline font-bold px-2 py-1"
                            >
                                Not now
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    /* ─────────────────────────────────────────────────────────────────────────
     * 3. INCOMPLETE FORM ASSISTANCE
     * ───────────────────────────────────────────────────────────────────────── */
    if (activeEngagement === 'incomplete_form') {
        return (
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="incomplete-form-title"
                className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm"
            >
                <div className="bg-white max-w-md w-full rounded-2xl border-2 border-[#0066FF] p-6 space-y-4 text-[#0066FF]">
                    <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-white border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF] shrink-0">
                            <Save className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] border border-[#0066FF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                                Progress Saved
                            </span>
                            <h3 id="incomplete-form-title" className="text-lg font-bold text-[#0066FF] font-heading">
                                Need more time to complete your inquiry?
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-[#0066FF] leading-relaxed font-medium">
                        We have securely saved your draft for this session. You can continue whenever you are ready, or resume now to have an executive director review your needs today.
                    </p>

                    <div className="p-3 bg-white border border-[#0066FF] rounded-xl flex items-center gap-2.5 text-xs text-[#0066FF] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                        <span>No sensitive details or payment credentials are ever stored.</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                        <button
                            type="button"
                            onClick={resumeActiveForm}
                            className="flex-1 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                            <span>Continue Form</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                confirmFormDismiss();
                                closeModal();
                            }}
                            className="py-3 px-4 rounded-xl border-2 border-[#0066FF] bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white font-bold text-sm transition-all"
                        >
                            Not Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ─────────────────────────────────────────────────────────────────────────
     * 4. EXIT-INTENT POPUP
     * ───────────────────────────────────────────────────────────────────────── */
    if (activeEngagement === 'exit_intent') {
        return (
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="exit-intent-title"
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm"
                onClick={dismissEngagement}
            >
                <div
                    className="relative bg-white max-w-xl w-full rounded-2xl border-2 border-[#0066FF] overflow-hidden text-[#0066FF]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Strip */}
                    <div className="bg-[#0066FF] px-8 pt-8 pb-7 text-white relative">
                        <button
                            onClick={dismissEngagement}
                            aria-label="Close popup"
                            className="absolute top-5 right-5 p-2 rounded-lg text-white hover:bg-white hover:text-[#0066FF] transition-colors border border-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white text-white text-xs font-bold uppercase tracking-wider mb-3">
                            <Zap className="w-3.5 h-3.5" />
                            <span>Executive Growth Advisory</span>
                        </div>

                        <h2 id="exit-intent-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Before You Go — Unlock Your Custom Revenue Blueprint
                        </h2>

                        <p className="text-xs sm:text-sm text-white mt-2 font-medium leading-relaxed">
                            Forward-thinking enterprise revenue leaders use ProfitMachines to automate pipeline pacing and reduce CAC by 30–50%.
                        </p>
                    </div>

                    {/* Body highlights */}
                    <div className="p-6 sm:p-8 space-y-6 bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-white border-2 border-[#0066FF] text-center">
                                <div className="text-2xl font-black text-[#0066FF]">300%</div>
                                <div className="text-[11px] font-bold uppercase mt-0.5">Pipeline Lift</div>
                                <div className="text-[10px] font-medium">Verified ICP accounts</div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white border-2 border-[#0066FF] text-center">
                                <div className="text-2xl font-black text-[#0066FF]">60%</div>
                                <div className="text-[11px] font-bold uppercase mt-0.5">Cycle Compression</div>
                                <div className="text-[10px] font-medium">Multi-stakeholder speed</div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white border-2 border-[#0066FF] text-center">
                                <div className="text-2xl font-black text-[#0066FF]">24/7</div>
                                <div className="text-[11px] font-bold uppercase mt-0.5">Autonomous SDR</div>
                                <div className="text-[10px] font-medium">Always-on pacing</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    dismissEngagement();
                                    openQuickForm({ title: 'Quick 60-Sec Inquiry' });
                                }}
                                className="flex-1 py-3.5 px-6 rounded-xl bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>Get a Free 60s Consultation</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <Link
                                to="/solutions"
                                onClick={dismissEngagement}
                                className="py-3.5 px-6 rounded-xl border-2 border-[#0066FF] bg-white hover:bg-[#0066FF] text-[#0066FF] hover:text-white font-bold text-sm transition-all text-center"
                            >
                                Explore Solutions
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs font-medium pt-1 text-[#0066FF]">
                            <Shield className="w-3.5 h-3.5 text-[#0066FF]" />
                            <span>SOC-2 Type II Certified · Zero-Spam Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ─────────────────────────────────────────────────────────────────────────
     * 5. CONTEXTUAL PAGE ASSISTANCE & RECOMMENDATIONS
     * ───────────────────────────────────────────────────────────────────────── */
    if (activeEngagement === 'contextual_prompt') {
        return (
            <aside
                aria-label="Contextual assistance prompt"
                className="fixed bottom-24 right-4 sm:right-6 z-[80] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] bg-white border-2 border-[#0066FF] rounded-2xl p-5 text-[#0066FF]"
            >
                <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#0066FF] text-[#0066FF] text-[11px] font-bold uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{currentPrompt.badge}</span>
                    </span>
                    <button
                        onClick={dismissEngagement}
                        aria-label="Dismiss assistance"
                        className="text-[#0066FF] hover:bg-[#0066FF]/10 p-1 rounded transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-[#0066FF] font-heading leading-snug">
                    {currentPrompt.message}
                </h4>

                <div className="flex items-center gap-2 mt-3 pt-1">
                    <button
                        onClick={() => {
                            dismissEngagement();
                            if (currentPrompt.actionType === 'long_form') {
                                openLongForm({ title: currentPrompt.badge });
                            } else {
                                openQuickForm({ title: currentPrompt.badge });
                            }
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] text-xs font-bold transition-all"
                    >
                        <span>{currentPrompt.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={() => setShowRelatedPages(!showRelatedPages)}
                        className="text-xs text-[#0066FF] hover:underline font-bold px-2.5 py-2"
                    >
                        {showRelatedPages ? 'Hide Related' : 'Related Pages'}
                    </button>
                </div>

                {showRelatedPages && (
                    <div className="mt-3 pt-3 border-t border-[#0066FF] space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066FF]">
                            Recommended Paths
                        </span>
                        {currentPrompt.relatedPages.map((page, idx) => (
                            <Link
                                key={idx}
                                to={page.route}
                                onClick={dismissEngagement}
                                className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-[#0066FF] text-[#0066FF] hover:text-white border border-[#0066FF] transition-all text-left group"
                            >
                                <div>
                                    <div className="text-xs font-bold leading-tight">
                                        {page.title}
                                    </div>
                                    <div className="text-[11px] opacity-80 line-clamp-1 mt-0.5">
                                        {page.description}
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 shrink-0 ml-2" />
                            </Link>
                        ))}
                    </div>
                )}
            </aside>
        );
    }

    /* ─────────────────────────────────────────────────────────────────────────
     * 6. INACTIVITY ASSISTANCE
     * ───────────────────────────────────────────────────────────────────────── */
    if (activeEngagement === 'inactivity') {
        return (
            <aside
                aria-label="Inactivity assistance prompt"
                className="fixed bottom-24 right-4 sm:right-6 z-[80] max-w-sm sm:max-w-md w-[calc(100vw-2rem)] bg-white border-2 border-[#0066FF] rounded-2xl p-4 sm:p-5 text-[#0066FF]"
            >
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#0066FF] flex items-center justify-center text-[#0066FF] shrink-0">
                        <Clock className="w-5 h-5 text-[#0066FF]" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] border border-[#0066FF] px-2 py-0.5 rounded-full">
                                Still Looking Around?
                            </span>
                            <button
                                onClick={dismissEngagement}
                                aria-label="Dismiss inactivity help"
                                className="text-[#0066FF] hover:bg-[#0066FF]/10 p-1 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-[#0066FF] leading-relaxed font-medium">
                            Need help finding the right revenue architecture or have specific questions for our team?
                        </p>

                        <div className="flex items-center gap-2 mt-3 pt-1">
                            <button
                                onClick={() => {
                                    dismissEngagement();
                                    openQuickForm({ title: 'Assisted Inquiry' });
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] text-xs font-bold transition-all"
                            >
                                <span>Quick Inquiry</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <Link
                                to="/talk-to-expert"
                                onClick={dismissEngagement}
                                className="text-xs font-bold text-[#0066FF] hover:underline px-2.5 py-1.5"
                            >
                                Talk to Expert
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    return null;
}
