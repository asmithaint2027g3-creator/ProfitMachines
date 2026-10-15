import React, { useState, useEffect } from 'react';
import { submitToSheet } from '../../lib/sheets';
import { captureLeadInJira } from '../../lib/jira';
import { trackEvent } from '../../lib/analytics';
import {
    CheckCircle2,
    Search,
    TrendingUp,
    Lightbulb,
    Target,
    Shield,
    ArrowRight,
    Lock,
    Cpu,
    Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { FormSuccessModal, validateBusinessEmail, validatePhone, FormErrorBanner, HoneypotField } from '../components/forms/FormFeedback';
import CalendarBookingWidget from '../components/forms/CalendarBookingWidget';

export default function TalkToExpert() {
    useEffect(() => {
        document.title = "Talk to a Revenue Expert | ProfitMachines AI";
        window.scrollTo(0, 0);
        trackEvent({ eventName: 'PAGE_VIEW_TALK_TO_EXPERT', category: 'CONVERSION' });
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        challenge: 'Scaling Multi-Touch Revenue Attribution',
        message: ''
    });

    const [selectedSlot, setSelectedSlot] = useState<{
        date: string;
        startTime: string;
        endTime: string;
        label: string;
    } | null>(null);

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
        trackEvent({ eventName: 'FORM_SUBMIT_START', category: 'LEAD', label: 'Talk To Expert' });

        try {
            if (selectedSlot) {
                // Try calendar booking with selected slot
                const bookingRes = await fetch('/api/book-calendar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        company: formData.company,
                        jobTitle: formData.jobTitle,
                        interest: formData.challenge,
                        message: formData.message,
                        startTime: selectedSlot.startTime,
                        endTime: selectedSlot.endTime,
                    }),
                });

                const bookingData = await bookingRes.json();

                if (bookingRes.ok && bookingData.success) {
                    setSubmissionId(bookingData.eventId || 'GCAL-CONFIRMED');
                    setSubmitted(true);
                    trackEvent({ eventName: 'FORM_SUBMIT_SUCCESS', category: 'LEAD', label: bookingData.eventId });
                    return;
                }

                if (bookingData.slotUnavailable) {
                    setSubmitError(bookingData.error || 'This slot is no longer available.');
                    setSelectedSlot(null);
                    return;
                }

                // Fallback if calendar API not configured
                if (!bookingData.setupRequired) {
                    setSubmitError(bookingData.error || 'Something went wrong.');
                    return;
                }
            }

            // Fallback: Sheet + Jira
            const res = await submitToSheet('Talk to Expert', {
                formName: 'Expert Technical Consultation',
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                designation: formData.jobTitle,
                interest: formData.challenge,
                message: formData.message,
                preferredDate: selectedSlot?.date || '',
                preferredTime: selectedSlot?.label || '',
                source: 'Talk to Expert Page'
            });

            setSubmissionId(res.submissionId);
            setSubmitted(true);
            trackEvent({ eventName: 'FORM_SUBMIT_SUCCESS', category: 'LEAD', label: res.submissionId });

            // Capture Revenue & Diagnostic Audit Lead in Jira Space (Tasks + Subtasks)
            captureLeadInJira('audit', {
                submission_id: res.submissionId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                designation: formData.jobTitle,
                interest: formData.challenge,
                message: formData.message,
                date: selectedSlot?.date || '',
                time: selectedSlot?.label || '',
                source: 'Talk to Expert Page'
            }).catch(jiraErr => console.warn('[Jira] Audit Lead capture notice:', jiraErr));
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setSubmitError("We couldn't reach our systems just now. Please try again in a moment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="pt-24 lg:pt-32 pb-20 min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2878B5]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2878B5]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left Column: Value Prop */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] text-[#1E6297] font-bold text-xs uppercase tracking-wider mb-4 border border-[#BAE0F8] shadow-2xs">
                                <Search className="w-3.5 h-3.5 text-[#2878B5]" />
                                Direct Sector Practice Lead
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#0A2540] tracking-tight leading-[1.08] mb-6">
                                Speak with a <br />
                                <span className="bg-gradient-to-r from-[#2878B5] via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Principal AI Architect
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-normal">
                                Get direct answers on deployment architectures, LLM intent engines, autonomous SDR workflows, and real-time CRM integration models.
                            </p>
                        </div>

                        {/* Capabilities Grid */}
                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#E1EFF8] text-[#2878B5] flex items-center justify-center shrink-0">
                                    <Cpu className="w-5 h-5 text-[#2878B5]" />
                                </div>
                                <div>
                                    <div className="text-base font-bold font-heading text-[#0A2540] mb-1">Architecture Feasibility Review</div>
                                    <div className="text-xs text-slate-600 leading-relaxed font-normal">Evaluate latency, API bandwidth, and security controls across your enterprise data stack.</div>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#E1EFF8] text-[#2878B5] flex items-center justify-center shrink-0">
                                    <TrendingUp className="w-5 h-5 text-[#2878B5]" />
                                </div>
                                <div>
                                    <div className="text-base font-bold font-heading text-[#0A2540] mb-1">CAC & Conversion Modeling</div>
                                    <div className="text-xs text-slate-600 leading-relaxed font-normal">Model out your expected payback period and pipeline acceleration trajectory.</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0F3560] text-white shadow-xl border border-white/10 flex items-center gap-3">
                            <Shield className="w-5 h-5 text-[#5CAAE6] shrink-0" />
                            <div className="text-xs text-slate-300">
                                <strong className="text-white">Strict Enterprise Confidentiality:</strong> All technical conversations are backed by corporate NDAs and ISO-27001 compliant workflows.
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:w-1/2 w-full">
                        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/5 relative">
                            <div className="mb-6 border-b border-slate-100 pb-5">
                                <h3 className="text-2xl font-bold text-slate-900">Direct Expert Inquiry</h3>
                                <p className="text-xs text-slate-500 mt-1">Directly connects to our Technical Solutions Engineering Practice.</p>
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
                                            placeholder="David"
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
                                            placeholder="Miller"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Work Email *</Label>
                                        <Input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="david@enterprise.com"
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
                                            placeholder="+1 (555) 123-4567"
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
                                            placeholder="Apex Technologies"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-700">Designation / Role *</Label>
                                        <Input
                                            required
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            placeholder="Director of Revenue Ops / CTO"
                                            className="mt-1 h-11 rounded-xl bg-slate-50/70 border-slate-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700">Technical or Strategic Challenge</Label>
                                    <select
                                        name="challenge"
                                        value={formData.challenge}
                                        onChange={handleChange}
                                        className="w-full mt-1 h-11 px-3 rounded-xl bg-slate-50/70 border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                                    >
                                        <option value="Scaling Multi-Touch Revenue Attribution">Scaling Multi-Touch Revenue Attribution</option>
                                        <option value="Autonomous Intent Discovery & SDR Engine">Autonomous Intent Discovery & SDR Engine</option>
                                        <option value="Hidden Revenue Leak Auditing">Hidden Revenue Leak Auditing</option>
                                        <option value="Enterprise Security & Private AI Sandbox">Enterprise Security & Private AI Sandbox</option>
                                        <option value="Web3 / High-Frequency GTM Automation">Web3 / High-Frequency GTM Automation</option>
                                    </select>
                                </div>

                                <div>
                                    <Label className="text-xs font-bold text-slate-700">Your Technical Question or Architecture Brief</Label>
                                    <Textarea
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe your current tech stack, scale, or specific question for the Principal Architect..."
                                        className="mt-1 rounded-xl bg-slate-50/70 border-slate-200 text-xs leading-relaxed"
                                    />
                                </div>

                                {/* Calendar Booking Widget */}
                                <div className="pt-2 pb-1">
                                    <div className="mb-3 pb-3 border-b border-slate-100">
                                        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#2878B5]" />
                                            Choose Your Consultation Slot
                                        </h4>
                                        <p className="text-[11px] text-slate-500 mt-1">
                                            Select a preferred date and available time. Slots are 45-minute sessions, Monday–Friday.
                                        </p>
                                    </div>
                                    <CalendarBookingWidget
                                        selectedSlot={selectedSlot}
                                        onSlotSelected={setSelectedSlot}
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !selectedSlot}
                                        className="w-full py-3.5 h-12 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold rounded-xl shadow-lg shadow-blue-900/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Booking Your Session...</span>
                                            </div>
                                        ) : !selectedSlot ? (
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Select a Date & Time to Continue
                                            </span>
                                        ) : (
                                            <>
                                                <span>Confirm Expert Consultation</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <HoneypotField value={honeypot} onChange={setHoneypot} />

                                {submitError && (
                                    <FormErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />
                                )}

                                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-2">
                                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Direct routing to practice leads • No unsolicited marketing</span>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <FormSuccessModal
                isOpen={submitted}
                onClose={() => setSubmitted(false)}
                submissionId={submissionId}
                email={formData.email}
                title="Inquiry Dispatched to Architect"
                message="Your technical briefing has been assigned to our sector practice lead. Expect an architecture-level response within 24 hours."
            />
        </div>
    );
}
