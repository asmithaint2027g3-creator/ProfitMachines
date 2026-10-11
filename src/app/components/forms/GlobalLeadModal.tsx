import React, { useEffect, useCallback } from 'react';
import { X, Zap, FileText, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLeadModal } from '../../context/LeadModalContext';
import { useVisitorEngagement } from '../../context/VisitorEngagementContext';
import QuickLeadForm from './QuickLeadForm';
import LongLeadForm from './LongLeadForm';

export default function GlobalLeadModal() {
    const { isOpen, modalType, modalOptions, closeModal, openQuickForm, openLongForm } = useLeadModal();
    const { handleFormCloseAttempt } = useVisitorEngagement();

    const handleSafeClose = useCallback(() => {
        const intercepted = handleFormCloseAttempt();
        if (!intercepted) {
            closeModal();
        }
    }, [handleFormCloseAttempt, closeModal]);

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleSafeClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleSafeClose]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleSafeClose}
                    className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 16 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
                >
                    {/* Header Banner - Executive Dark Teal */}
                    <div className="bg-[#064e3b] px-6 py-5 text-white flex items-center justify-between shrink-0 border-b border-emerald-500/20">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold tracking-wide uppercase">
                                    <Sparkles className="w-3 h-3 text-emerald-300" />
                                    <span>ProfitMachines Intelligence Desk</span>
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                                {modalOptions.title || (modalType === 'quick' ? 'Quick Revenue Inquiry' : 'Enterprise Consultation Request')}
                            </h2>
                            <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5 font-medium">
                                {modalType === 'quick' 
                                    ? 'Get connected with an AI RevOps strategist in less than 60 seconds.'
                                    : 'Share your architecture bottlenecks for a tailored roadmap.'}
                            </p>
                        </div>

                        <button
                            onClick={handleSafeClose}
                            aria-label="Close modal"
                            className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors shrink-0"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mode Toggle Tabs */}
                    <div className="flex items-center border-b border-slate-200 bg-slate-50/80 px-6 pt-3 shrink-0 gap-2">
                        <button
                            type="button"
                            onClick={() => openQuickForm(modalOptions)}
                            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-bold text-xs sm:text-sm transition-all ${
                                modalType === 'quick'
                                    ? 'border-[#064e3b] text-[#064e3b] bg-white rounded-t-lg'
                                    : 'border-transparent text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <Zap className="w-4 h-4 text-emerald-600" />
                            <span>Quick Inquiry (1 min)</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => openLongForm(modalOptions)}
                            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-bold text-xs sm:text-sm transition-all ${
                                modalType === 'long'
                                    ? 'border-[#064e3b] text-[#064e3b] bg-white rounded-t-lg'
                                    : 'border-transparent text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span>Detailed Assessment</span>
                        </button>
                    </div>

                    {/* Form Scroll Body */}
                    <div className="p-6 sm:p-7 overflow-y-auto flex-1">
                        {modalType === 'quick' ? (
                            <QuickLeadForm
                                defaultService={modalOptions.defaultService}
                                source={modalOptions.source || 'Quick Inquiry Modal'}
                                onCancel={handleSafeClose}
                            />
                        ) : (
                            <LongLeadForm
                                defaultService={modalOptions.defaultService}
                                defaultIndustry={modalOptions.defaultIndustry}
                                source={modalOptions.source || 'Detailed Assessment Modal'}
                                onCancel={handleSafeClose}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
