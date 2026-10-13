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
                    className="fixed inset-0 bg-white/90 backdrop-blur-sm"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 16 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-2xl bg-white rounded-2xl border-2 border-[#0066FF] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto text-[#0066FF]"
                >
                    {/* Header Banner */}
                    <div className="bg-white px-6 py-5 text-[#0066FF] flex items-center justify-between shrink-0 border-b-2 border-[#0066FF]">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#0066FF] text-[#0066FF] text-[11px] font-bold tracking-wide uppercase">
                                    <Sparkles className="w-3 h-3 text-[#0066FF]" />
                                    <span>ProfitMachines Intelligence Desk</span>
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0066FF]">
                                {modalOptions.title || (modalType === 'quick' ? 'Quick Revenue Inquiry' : 'Enterprise Consultation Request')}
                            </h2>
                            <p className="text-xs sm:text-sm text-[#0066FF] mt-0.5 font-medium">
                                {modalType === 'quick' 
                                    ? 'Get connected with an AI RevOps strategist in less than 60 seconds.'
                                    : 'Share your architecture bottlenecks for a tailored roadmap.'}
                            </p>
                        </div>

                        <button
                            onClick={handleSafeClose}
                            aria-label="Close modal"
                            className="p-2 rounded-lg text-[#0066FF] hover:bg-[#0066FF]/10 transition-colors shrink-0 border border-[#0066FF]"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mode Toggle Tabs */}
                    <div className="flex items-center border-b-2 border-[#0066FF] bg-white px-6 pt-3 shrink-0 gap-2">
                        <button
                            type="button"
                            onClick={() => openQuickForm(modalOptions)}
                            className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs sm:text-sm transition-all border-2 border-b-0 rounded-t-lg ${
                                modalType === 'quick'
                                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                    : 'bg-white text-[#0066FF] border-transparent hover:border-[#0066FF]'
                            }`}
                        >
                            <Zap className="w-4 h-4" />
                            <span>Quick Inquiry (1 min)</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => openLongForm(modalOptions)}
                            className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs sm:text-sm transition-all border-2 border-b-0 rounded-t-lg ${
                                modalType === 'long'
                                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                    : 'bg-white text-[#0066FF] border-transparent hover:border-[#0066FF]'
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            <span>Detailed Assessment</span>
                        </button>
                    </div>

                    {/* Form Scroll Body */}
                    <div className="p-6 sm:p-7 overflow-y-auto flex-1 bg-white">
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
