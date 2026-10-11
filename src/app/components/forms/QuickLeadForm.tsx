import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, ArrowRight, Loader2, MessageSquare } from 'lucide-react';
import { submitToSheet } from '../../../lib/sheets';
import { captureLeadInJira } from '../../../lib/jira';
import { validateBusinessEmail, FormErrorBanner, HoneypotField } from './FormFeedback';
import { useVisitorEngagement } from '../../context/VisitorEngagementContext';

export interface QuickLeadFormProps {
    defaultService?: string;
    source?: string;
    onSuccess?: (submissionId: string) => void;
    onCancel?: () => void;
    className?: string;
}

const SERVICE_OPTIONS = [
    'AI Growth & Transformation Engine',
    'Autonomous SDRs & Sales Pilot',
    'DemandPulse AI™ (Intent Radar)',
    'Profit Pool & Market Discovery',
    'AI Revenue Operations (RevOps)',
    'Crypto & Web3 Growth Operations',
    'Enterprise Custom AI Architecture',
    'General Inquiry'
];

export default function QuickLeadForm({
    defaultService = '',
    source = 'Quick Lead Modal',
    onSuccess,
    onCancel,
    className = ''
}: QuickLeadFormProps) {
    const {
        registerFormStart,
        registerFormChange,
        completeFormSubmission,
        getSavedDraft
    } = useVisitorEngagement();

    const [formData, setFormData] = useState(() => {
        const saved = getSavedDraft<any>('quick');
        return {
            name: saved?.name || '',
            email: saved?.email || '',
            company: saved?.company || '',
            service: saved?.service || defaultService || SERVICE_OPTIONS[0]
        };
    });

    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [submissionId, setSubmissionId] = useState('');

    useEffect(() => {
        registerFormStart('quick');
    }, [registerFormStart]);

    const handleFieldChange = (field: string, value: string) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        const hasContent = Boolean(updated.name.trim() || updated.email.trim() || updated.company.trim());
        registerFormChange('quick', updated, hasContent);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (honeypot) return; // Silent bot drop

        setEmailError(null);
        setSubmitError(null);

        const emailValidation = validateBusinessEmail(formData.email);
        if (!emailValidation.valid) {
            setEmailError(emailValidation.message || 'Please provide a valid business email');
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await submitToSheet('Inbound Leads', {
                formName: 'Quick Inquiry Form',
                name: formData.name.trim(),
                email: formData.email.trim(),
                company: formData.company.trim(),
                interest: formData.service,
                source: source || 'Quick Inquiry Modal',
                lead_type: 'Quick Lead'
            });

            setSubmissionId(res.submissionId);
            setSubmitted(true);
            completeFormSubmission('quick');
            if (onSuccess) onSuccess(res.submissionId);

            // Capture Lead in Jira Space (Tasks + Subtasks)
            captureLeadInJira('quick', {
                submission_id: res.submissionId,
                name: formData.name.trim(),
                email: formData.email.trim(),
                company: formData.company.trim(),
                interest: formData.service,
                source: source || 'Quick Inquiry Modal'
            }).catch(jiraErr => console.warn('[Jira] Quick Lead capture notice:', jiraErr));
        } catch (error: any) {
            console.error('Quick Lead submission error:', error);
            setSubmitError("We couldn't submit your inquiry right now. Please check your connection or contact us on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="p-6 sm:p-8 text-center bg-white rounded-2xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 font-heading">
                    Inquiry Confirmed
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed max-w-sm mx-auto">
                    Thank you! An executive director will review your requirements and reach out within 1 business day.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 mb-6 flex items-center justify-between">
                    <span className="text-slate-500 font-sans font-medium">Reference ID:</span>
                    <span className="font-bold text-[#064e3b]">{submissionId}</span>
                </div>

                {/* Enriched Next Actions */}
                <div className="space-y-2.5 mb-4">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                        <Link
                            to="/solutions"
                            onClick={onCancel}
                            className="flex-1 py-2.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                            <span>Explore Solutions</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <a
                            href="https://wa.me/919513088611?text=Hello%20ProfitMachines%20team%2C%20I%20just%20submitted%20a%20quick%20inquiry%20reference%20ID%20on%20your%20website."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp Priority</span>
                        </a>
                    </div>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#064e3b] hover:bg-[#085a45] text-white font-bold text-sm transition-all shadow-sm"
                    >
                        Done
                    </button>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <HoneypotField value={honeypot} onChange={setHoneypot} />
            <FormErrorBanner error={submitError} />

            <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-emerald-700">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400 bg-white"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business Email <span className="text-emerald-700">*</span>
                </label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (emailError) setEmailError(null);
                    }}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 transition-all placeholder:text-slate-400 bg-white outline-none focus:ring-2 ${
                        emailError 
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                            : 'border-slate-300 focus:border-[#064e3b] focus:ring-[#064e3b]/20'
                    }`}
                />
                {emailError && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{emailError}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company Name <span className="text-emerald-700">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none text-sm text-slate-900 transition-all placeholder:text-slate-400 bg-white"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service / Solution of Interest
                </label>
                <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none text-sm text-slate-900 transition-all bg-white"
                >
                    {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            <div className="pt-2 flex items-center gap-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="w-1/3 py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-all"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 px-5 rounded-lg bg-[#064e3b] hover:bg-[#085a45] active:bg-[#032b24] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Inquiry...</span>
                        </>
                    ) : (
                        <>
                            <span>Submit Quick Inquiry</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                    )}
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enterprise Privacy Protected · No Generic Spammers</span>
            </div>
        </form>
    );
}
