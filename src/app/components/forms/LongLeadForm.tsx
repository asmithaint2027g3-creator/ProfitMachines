import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { submitToSheet } from '../../../lib/sheets';
import { captureLeadInJira } from '../../../lib/jira';
import { validateBusinessEmail, validatePhone, FormErrorBanner, HoneypotField } from './FormFeedback';
import { useVisitorEngagement } from '../../context/VisitorEngagementContext';

export interface LongLeadFormProps {
    defaultService?: string;
    defaultIndustry?: string;
    source?: string;
    onSuccess?: (submissionId: string) => void;
    onCancel?: () => void;
    className?: string;
}

const INDUSTRIES = [
    'SaaS & Cloud Software',
    'FinTech & Financial Services',
    'Healthcare & HealthTech',
    'E-Commerce & Retail',
    'Manufacturing & Supply Chain',
    'Professional Services & Legal',
    'Crypto & Web3 Protocol',
    'Other Enterprise Sector'
];

const COMPANY_SIZES = [
    'Startup (<25 employees, <$2M ARR)',
    'Growth Stage (25-100 employees, $2M-$20M ARR)',
    'Mid-Market (100-500 employees, $20M-$50M ARR)',
    'Enterprise (500+ employees, $50M+ ARR)'
];

const SERVICES = [
    'AI Growth & Transformation Engine',
    'Autonomous SDRs & Sales Pilot',
    'DemandPulse AI™ (Intent Radar)',
    'Profit Pool & Market Discovery',
    'AI Revenue Operations (RevOps)',
    'Crypto & Web3 Growth Operations',
    'Enterprise Custom AI Architecture',
    'Pipeline Hygiene & Leakage Audit'
];

const OUTCOMES = [
    'Accelerate Deal Velocity & ARR Growth',
    'Cut Customer Acquisition Cost (CAC)',
    'Automate Manual SDR & Outbound Cadences',
    'Uncover Dark-Funnel Buyer Intent Signals',
    'Eliminate CRM Deal Slippage & Pipeline Drag',
    'Comprehensive Enterprise Architecture Review'
];

export default function LongLeadForm({
    defaultService = '',
    defaultIndustry = '',
    source = 'Detailed Inquiry Form',
    onSuccess,
    onCancel,
    className = ''
}: LongLeadFormProps) {
    const {
        registerFormStart,
        registerFormChange,
        completeFormSubmission,
        getSavedDraft
    } = useVisitorEngagement();

    const [formData, setFormData] = useState(() => {
        const saved = getSavedDraft<any>('long');
        return {
            name: saved?.name || '',
            email: saved?.email || '',
            phone: saved?.phone || '',
            company: saved?.company || '',
            jobTitle: saved?.jobTitle || '',
            industry: saved?.industry || defaultIndustry || INDUSTRIES[0],
            companySize: saved?.companySize || COMPANY_SIZES[1],
            service: saved?.service || defaultService || SERVICES[0],
            challenge: saved?.challenge || '',
            outcome: saved?.outcome || OUTCOMES[0],
            message: saved?.message || '',
            contactMethod: saved?.contactMethod || 'Business Email'
        };
    });

    useEffect(() => {
        registerFormStart('long');
    }, [registerFormStart]);

    const updateField = (field: string, value: string) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        const hasContent = Boolean(
            updated.name.trim() || 
            updated.email.trim() || 
            updated.company.trim() || 
            updated.phone.trim() || 
            updated.challenge.trim()
        );
        registerFormChange('long', updated, hasContent);
    };

    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [submissionId, setSubmissionId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (honeypot) return;

        setEmailError(null);
        setPhoneError(null);
        setSubmitError(null);

        const emailVal = validateBusinessEmail(formData.email);
        if (!emailVal.valid) {
            setEmailError(emailVal.message || 'Please provide a valid work email.');
            return;
        }

        if (formData.phone) {
            const phoneVal = validatePhone(formData.phone);
            if (!phoneVal.valid) {
                setPhoneError(phoneVal.message || 'Please provide a valid phone number.');
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const res = await submitToSheet('consultation_request', {
                full_name: formData.name.trim(),
                work_email: formData.email.trim(),
                phone_number: formData.phone.trim(),
                company_name: formData.company.trim(),
                job_title: formData.jobTitle.trim(),
                company_size: formData.companySize,
                industry: formData.industry,
                interest: formData.service,
                challenge: formData.challenge.trim(),
                expected_outcome: formData.outcome,
                message: formData.message.trim(),
                preferred_contact_method: formData.contactMethod,
                source: source || 'Detailed Assessment Form',
                lead_type: 'Detailed Inquiry'
            });

            setSubmissionId(res.submissionId);
            setSubmitted(true);
            completeFormSubmission('long');
            if (onSuccess) onSuccess(res.submissionId);

            captureLeadInJira('enterprise', {
                submission_id: res.submissionId,
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                company: formData.company.trim(),
                designation: formData.jobTitle.trim(),
                industry: formData.industry,
                interest: formData.service,
                requirements: `Challenge: ${formData.challenge.trim()} | Outcome: ${formData.outcome}`,
                message: formData.message.trim(),
                source: source || 'Detailed Assessment Form'
            }).catch(jiraErr => console.warn('[Jira] Enterprise Lead capture notice:', jiraErr));
        } catch (error: any) {
            console.error('Long Lead submission error:', error);
            setSubmitError("We couldn't submit your detailed assessment right now. Please try again or reach out directly on WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="p-6 sm:p-8 text-center bg-white rounded-2xl border-2 border-[#0066FF] text-[#0066FF]">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF] mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-heading text-[#0066FF]">
                    Enterprise Request Logged
                </h3>
                <p className="text-sm mb-6 leading-relaxed max-w-md mx-auto text-[#0066FF]">
                    Your detailed requirements have been securely forwarded to our revenue architecture committee. We will conduct a preliminary assessment and contact you via {formData.contactMethod.toLowerCase()}.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#0066FF] text-xs font-mono text-[#0066FF] mb-6 flex items-center justify-between">
                    <span className="font-sans font-medium">Tracking Reference:</span>
                    <span className="font-bold text-[#0066FF]">{submissionId}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
                    <Link
                        to="/solutions"
                        onClick={onCancel}
                        className="flex-1 py-2.5 px-3 rounded-lg border-2 border-[#0066FF] bg-white hover:bg-[#0066FF] hover:text-white text-[#0066FF] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span>Explore Solutions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                        to="/outcomes"
                        onClick={onCancel}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-white border-2 border-[#0066FF] hover:bg-[#0066FF] hover:text-white text-[#0066FF] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span>Verified Outcomes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full py-3 px-4 rounded-lg bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm transition-all"
                    >
                        Done & Return to Site
                    </button>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 text-[#0066FF] ${className}`}>
            <HoneypotField value={honeypot} onChange={setHoneypot} />
            <FormErrorBanner error={submitError} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Full Name <span className="text-[#0066FF]">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="e.g. David Sterling"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white placeholder:text-[#0066FF]/60"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Business Email <span className="text-[#0066FF]">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                            updateField('email', e.target.value);
                            if (emailError) setEmailError(null);
                        }}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] text-sm text-[#0066FF] transition-all bg-white outline-none placeholder:text-[#0066FF]/60"
                    />
                    {emailError && (
                        <p className="text-xs text-[#0066FF] font-bold mt-1">{emailError}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                            updateField('phone', e.target.value);
                            if (phoneError) setPhoneError(null);
                        }}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] text-sm text-[#0066FF] transition-all bg-white outline-none placeholder:text-[#0066FF]/60"
                    />
                    {phoneError && (
                        <p className="text-xs text-[#0066FF] font-bold mt-1">{phoneError}</p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Company Name <span className="text-[#0066FF]">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        placeholder="e.g. Nexus Enterprises"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white placeholder:text-[#0066FF]/60"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Job Title / Role
                    </label>
                    <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => updateField('jobTitle', e.target.value)}
                        placeholder="e.g. VP Revenue, Head of Sales"
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white placeholder:text-[#0066FF]/60"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Company Stage / Size
                    </label>
                    <select
                        value={formData.companySize}
                        onChange={(e) => updateField('companySize', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white"
                    >
                        {COMPANY_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Industry Vertical
                    </label>
                    <select
                        value={formData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white"
                    >
                        {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>
                                {ind}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Service Required
                    </label>
                    <select
                        value={formData.service}
                        onChange={(e) => updateField('service', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white"
                    >
                        {SERVICES.map((srv) => (
                            <option key={srv} value={srv}>
                                {srv}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                    Target Outcome
                </label>
                <select
                    value={formData.outcome}
                    onChange={(e) => updateField('outcome', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white"
                >
                    {OUTCOMES.map((out) => (
                        <option key={out} value={out}>
                            {out}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                    Current Bottleneck or Business Challenge
                </label>
                <textarea
                    rows={2}
                    value={formData.challenge}
                    onChange={(e) => updateField('challenge', e.target.value)}
                    placeholder="Briefly describe what is currently slowing down revenue or sales conversion..."
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-[#0066FF] focus:border-[#0066FF] outline-none text-sm text-[#0066FF] transition-all bg-white resize-none placeholder:text-[#0066FF]/60"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#0066FF]">
                        Preferred Contact Channel
                    </label>
                    <div className="flex gap-2">
                        {['Business Email', 'Phone', 'WhatsApp'].map((method) => (
                            <label
                                key={method}
                                className={`flex-1 text-center py-2 px-2 rounded-lg border-2 text-xs font-bold cursor-pointer transition-all ${
                                    formData.contactMethod === method
                                        ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                        : 'bg-white text-[#0066FF] border-[#0066FF] hover:bg-[#0066FF]/10'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="contactMethod"
                                    value={method}
                                    checked={formData.contactMethod === method}
                                    onChange={() => updateField('contactMethod', method)}
                                    className="sr-only"
                                />
                                {method}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="w-1/3 py-2.5 px-3 rounded-lg border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white font-bold text-sm transition-all bg-white"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm transition-all flex items-center justify-center gap-2 group"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <span>Request Assessment</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#0066FF] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Enterprise SOC2 / ISO Alignment · Non-Disclosure Standard</span>
            </div>
        </form>
    );
}
