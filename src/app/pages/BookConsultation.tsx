import React, { useState } from 'react';
import {
    Calendar,
    Building2,
    Users,
    TrendingUp,
    Shield,
    CheckCircle2,
    Sparkles,
    Lock,
    ArrowRight,
    Clock,
    Globe
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { submitToSheet } from '../../lib/sheets';
import { captureLeadInJira } from '../../lib/jira';
import { trackEvent } from '../../lib/analytics';
import { FormSuccessModal, validateBusinessEmail, validatePhone, FormErrorBanner, HoneypotField } from '../components/forms/FormFeedback';
import { useVisitorEngagement } from '../context/VisitorEngagementContext';

export default function BookConsultation() {
    const { registerFormStart, registerFormChange, completeFormSubmission, getSavedDraft } = useVisitorEngagement();

    React.useEffect(() => {
        window.scrollTo(0, 0);
        trackEvent({ eventName: 'PAGE_VIEW_BOOK_CONSULTATION', category: 'CONVERSION' });
        registerFormStart('long');
    }, [registerFormStart]);

    const [formData, setFormData] = useState(() => {
        const saved = getSavedDraft<any>('long');
        return {
            firstName: saved?.firstName || saved?.name?.split(' ')[0] || '',
            lastName: saved?.lastName || saved?.name?.split(' ').slice(1).join(' ') || '',
            email: saved?.email || '',
            phone: saved?.phone || '',
            company: saved?.company || '',
            jobTitle: saved?.jobTitle || '',
            revenue: saved?.revenue || '$10M - $50M ARR',
            interest: saved?.service || saved?.interest || 'AI Revenue Engine & Autonomous SDR',
            message: saved?.message || saved?.challenge || '',
            date: saved?.date || '',
            time: saved?.time || 'Morning (9:00 AM - 12:00 PM EST)',
            consent: true
        };
    });

    const updateField = (field: string, value: any) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        const hasContent = Boolean(updated.firstName.trim() || updated.email.trim() || updated.company.trim());
        registerFormChange('long', updated, hasContent);
    };

    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [honeypot, setHoneypot] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submissionId, setSubmissionId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (honeypot) return; // silently drop bot submissions
        setEmailError(null);
        setPhoneError(null);
        setSubmitError(null);

        const emailVal = validateBusinessEmail(formData.email);
        if (!emailVal.valid) {
            setEmailError(emailVal.message || 'Invalid email');
            return;
        }

        const phoneVal = validatePhone(formData.phone);
        if (!phoneVal.valid) {
            setPhoneError(phoneVal.message || 'Invalid phone number');
            return;
        }

        setIsSubmitting(true);
        trackEvent({ eventName: 'FORM_SUBMIT_START', category: 'LEAD', label: 'Book Consultation' });

        try {
            const res = await submitToSheet('Book for Consultation', {
                formName: 'Executive Consultation Booking',
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                designation: formData.jobTitle,
                revenue: formData.revenue,
                interest: formData.interest,
                message: formData.message,
                preferredDate: formData.date,
                preferredTime: formData.time,
                source: 'Book Consultation Page'
            });

            setSubmissionId(res.submissionId);
            setSubmitted(true);
            completeFormSubmission('long');
            trackEvent({ eventName: 'FORM_SUBMIT_SUCCESS', category: 'LEAD', label: res.submissionId });

            // Capture Strategic Consultation Lead in Jira Space (Tasks + Subtasks)
            captureLeadInJira('consultation', {
                submission_id: res.submissionId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                designation: formData.jobTitle,
                revenue: formData.revenue,
                interest: formData.interest,
                message: formData.message,
                date: formData.date,
                time: formData.time,
                source: 'Book Consultation Page'
            }).catch(jiraErr => console.warn('[Jira] Consultation Lead capture notice:', jiraErr));
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setSubmitError("We couldn't reach our scheduling system just now. Please try again in a moment, or email us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const updated = {
            ...formData,
            [e.target.name]: e.target.value
        };
        setFormData(updated);
        const hasContent = Boolean(updated.firstName.trim() || updated.email.trim() || updated.company.trim());
        registerFormChange('long', updated, hasContent);
    };

    return (
        <div className="pt-24 lg:pt-32 pb-20 min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
            {/* Ambient Enterprise Grid & Radial Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#064e3b]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#064e3b]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left Column: Strategic Positioning */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#053d2e] font-bold text-xs uppercase tracking-wider mb-4 border border-emerald-100 shadow-sm">
                                <Calendar className="w-3.5 h-3.5" />
                                Executive Architecture Briefing
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6">
                                Architect Your <br />
                                <span className="bg-gradient-to-r from-[#064e3b] via-emerald-700 to-teal-700 bg-clip-text text-transparent">
                                    AI Revenue Engine
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-normal">
                                Schedule a 1-on-1 strategy session with our Enterprise AI Architects to map your revenue leaks, audit intent signals, and evaluate automated growth models.
                            </p>
                        </div>

                        {/* Value Metric Pillars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                                <div className="text-2xl font-bold text-slate-900 font-mono text-[#064e3b] mb-1">45-Minute</div>
                                <div className="text-sm font-bold text-slate-800">Deep Architecture Review</div>
                                <div className="text-xs text-slate-500 mt-1">Full audit of tech stack, pipeline velocity, and conversion blockers.</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                                <div className="text-2xl font-bold text-slate-900 font-mono text-emerald-600 mb-1">Tailored</div>
                                <div className="text-sm font-bold text-slate-800">Custom Implementation Blueprint</div>
                                <div className="text-xs text-slate-500 mt-1">Receive concrete projections on CAC reduction and speed to ARR.</div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                                <Shield className="w-4 h-4" />
                                Enterprise Engagement Guarantee
                            </div>
                            <ul className="space-y-2.5 text-xs text-slate-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    Zero-pressure technical evaluation with Principal Consultants
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    Mutual NDA and strict enterprise data confidentiality
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    Compatible with Salesforce, HubSpot, Snowflake, and BigQuery
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Standardized Enterprise Booking Form */}
                    <div className="lg:w-1/2 w-full">
                        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/5 relative">
                            <div className="mb-6 border-b border-slate-100 pb-5">
                                <h3 className="text-2xl font-bold text-slate-900">Request Executive Consultation</h3>
                                <p className="text-xs text-slate-500 mt-1">Please provide your corporate details to route to the appropriate sector practice.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">First Name *</Label>
                                        <Input
                                            required
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Sarah"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Last Name *</Label>
                                        <Input
                                            required
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Jenkins"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Corporate Work Email *</Label>
                                        <Input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="sarah@enterprise.com"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                        {emailError && (
                                            <p className="text-[11px] text-red-600 font-semibold mt-1">{emailError}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Phone Number *</Label>
                                        <Input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                        {phoneError && (
                                            <p className="text-[11px] text-red-600 font-semibold mt-1">{phoneError}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Company Name *</Label>
                                        <Input
                                            required
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Acme Global Inc."
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Designation / Title *</Label>
                                        <Input
                                            required
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            placeholder="Chief Revenue Officer / VP"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Annual Revenue Stage</Label>
                                        <select
                                            name="revenue"
                                            value={formData.revenue}
                                            onChange={handleChange}
                                            className="w-full mt-1 h-11 px-3 rounded-xl bg-slate-50/70 border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                                        >
                                            <option value="Under $5M ARR">Under $5M ARR</option>
                                            <option value="$5M - $20M ARR">$5M - $20M ARR</option>
                                            <option value="$20M - $100M ARR">$20M - $100M ARR</option>
                                            <option value="$100M+ Enterprise">$100M+ Enterprise</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Primary Strategic Focus</Label>
                                        <select
                                            name="interest"
                                            value={formData.interest}
                                            onChange={handleChange}
                                            className="w-full mt-1 h-11 px-3 rounded-xl bg-slate-50/70 border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                                        >
                                            <option value="AI Revenue Engine & Autonomous SDR">AI Revenue Engine & Autonomous SDR</option>
                                            <option value="Intent Demand Discovery">Intent Demand Discovery</option>
                                            <option value="Hidden Revenue & Leak Capture">Hidden Revenue & Leak Capture</option>
                                            <option value="Brand & Reputation Acceleration">Brand & Reputation Acceleration</option>
                                            <option value="B2B / Web3 Enterprise Scale">B2B / Web3 Enterprise Scale</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700">Specific Architecture Goals or Requirements</Label>
                                    <Textarea
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Outline your primary growth bottleneck, existing stack, or target timeline..."
                                        className="mt-1 rounded-xl bg-slate-50/70 border-slate-200 text-xs leading-relaxed"
                                    />
                                </div>

                                <HoneypotField value={honeypot} onChange={setHoneypot} />

                                {submitError && (
                                    <FormErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />
                                )}

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 h-12 bg-[#064e3b] hover:bg-[#053d2e] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Connecting to Enterprise Gateway...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Confirm Consultation Request</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-2">
                                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Encrypted submission • Protected by Mutual Enterprise NDA</span>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Success Reference Confirmation Modal */}
            <FormSuccessModal
                isOpen={submitted}
                onClose={() => setSubmitted(false)}
                submissionId={submissionId}
                email={formData.email}
                title="Consultation Request Logged"
                message="Your consultation request has been registered in the ProfitMachines executive queue. A Principal AI Strategist has been assigned and will connect with your scheduling link."
            />
        </div>
    );
}
