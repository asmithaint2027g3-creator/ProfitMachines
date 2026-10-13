import React, { useState, useEffect } from 'react';
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
        if (honeypot) return;

        setEmailError(null);
        setSubmitError(null);

        const emailValidation = validateBusinessEmail(formData.email);
        if (!emailValidation.valid) {
            setEmailError(emailValidation.message || 'Please provide a valid business email');
            return;
        }

        setIsSubmitting(true);

        const subId = `PM-QK-${Date.now().toString(36).toUpperCase()}`;

        try {
            await Promise.allSettled([
                submitToSheet('website_lead', {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    service: formData.service,
                    source,
                    submissionId: subId,
                    timestamp: new Date().toISOString()
                }),
                captureLeadInJira('quick', {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    interest: formData.service,
                    source,
                    submissionId: subId
                })
            ]);

            completeFormSubmission('quick');
            setSubmissionId(subId);
            setSubmitted(true);
            if (onSuccess) onSuccess(subId);
        } catch (err: any) {
            console.error('Lead submission issue:', err);
            completeFormSubmission('quick');
            setSubmissionId(subId);
            setSubmitted(true);
            if (onSuccess) onSuccess(subId);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="py-8 px-4 text-center space-y-5 bg-white text-[#0066FF]">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#0066FF] flex items-center justify-center mx-auto text-[#0066FF]">
                    <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-heading text-[#0066FF]">Inquiry Received</h3>
                    <p className="text-sm text-[#0066FF] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="font-bold">{formData.name}</strong>. An enterprise solution architect will review your request for{' '}
                        <strong className="font-bold">{formData.company}</strong> and follow up within 60 minutes.
                    </p>
                    <div className="inline-block mt-3 px-3 py-1 bg-white border border-[#0066FF] rounded text-xs font-mono font-bold text-[#0066FF]">
                        Reference: {submissionId}
                    </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                        href={`https://wa.me/919513088611?text=${encodeURIComponent(`Hi ProfitMachines, I just submitted an inquiry for ${formData.company} (Ref: ${submissionId}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm px-5 py-2.5 rounded-lg transition-all"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>Fast-Track on WhatsApp</span>
                    </a>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white border-2 border-[#0066FF] font-bold text-sm rounded-lg transition-all"
                        >
                            Close
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 text-[#0066FF] ${className}`}>
            <HoneypotField value={honeypot} onChange={setHoneypot} />

            {submitError && (
                <FormErrorBanner
                    message={submitError}
                    onDismiss={() => setSubmitError(null)}
                />
            )}

            <div>
                <label className="block text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-1.5">
                    Your Full Name <span className="text-[#0066FF]">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all placeholder:text-[#0066FF]/60 bg-white"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-1.5">
                    Business Email <span className="text-[#0066FF]">*</span>
                </label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                        handleFieldChange('email', e.target.value);
                        if (emailError) setEmailError(null);
                    }}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] text-sm text-[#0066FF] transition-all placeholder:text-[#0066FF]/60 bg-white outline-none"
                />
                {emailError && (
                    <p className="text-xs text-[#0066FF] font-bold mt-1">{emailError}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-1.5">
                    Company Name <span className="text-[#0066FF]">*</span>
                </label>
                <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all placeholder:text-[#0066FF]/60 bg-white"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-1.5">
                    Service / Solution of Interest
                </label>
                <select
                    value={formData.service}
                    onChange={(e) => handleFieldChange('service', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white"
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
                        className="w-1/3 py-2.5 px-4 rounded-lg border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white font-bold text-sm transition-all bg-white"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 px-5 rounded-lg bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm transition-all flex items-center justify-center gap-2 group"
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

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#0066FF] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Enterprise Privacy Protected · No Generic Spammers</span>
            </div>
        </form>
    );
}
