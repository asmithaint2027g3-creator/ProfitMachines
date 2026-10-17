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
import CalendarBookingWidget from '../components/forms/CalendarBookingWidget';

export default function BookConsultation() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        trackEvent({ eventName: 'PAGE_VIEW_BOOK_CONSULTATION', category: 'CONVERSION' });
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        revenue: '$10M - $50M ARR',
        interest: 'AI Revenue Engine & Autonomous SDR',
        message: '',
        consent: true
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
    const [calendarEventLink, setCalendarEventLink] = useState('');

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

        if (!selectedSlot) {
            setSubmitError('Please select a preferred date and time slot for your consultation.');
            return;
        }

        setIsSubmitting(true);
        trackEvent({ eventName: 'FORM_SUBMIT_START', category: 'LEAD', label: 'Book Consultation' });

        try {
            // ── POST to backend calendar booking endpoint ─────────────────
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
                    revenue: formData.revenue,
                    interest: formData.interest,
                    message: formData.message,
                    startTime: selectedSlot.startTime,
                    endTime: selectedSlot.endTime,
                }),
            });

            const bookingData = await bookingRes.json();

            if (bookingRes.ok && bookingData.success) {
                // Calendar event created successfully
                setSubmissionId(bookingData.eventId || 'GCAL-CONFIRMED');
                setCalendarEventLink(bookingData.eventLink || '');
                setSubmitted(true);
                trackEvent({ eventName: 'FORM_SUBMIT_SUCCESS', category: 'LEAD', label: bookingData.eventId });
                return;
            }

            if (bookingData.slotUnavailable) {
                // Slot was taken between selection and submission
                setSubmitError(bookingData.error || 'This slot is no longer available. Please select a different time.');
                setSelectedSlot(null);
                return;
            }

            if (bookingData.setupRequired) {
                // Google Calendar not configured — fall back to Sheet + Jira flow
                console.warn('[BookConsultation] Calendar API not configured, falling back to Sheet+Jira flow.');
                await fallbackSubmission();
                return;
            }

            // Other server error
            setSubmitError(bookingData.error || 'Something went wrong. Please try again.');

        } catch (error: any) {
            console.warn('[BookConsultation] Calendar booking network error, trying fallback:', error);
            // Network error — fall back to Sheet + Jira flow
            await fallbackSubmission();
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Fallback: Original Sheet + Jira submission (if Calendar API unavailable)
    const fallbackSubmission = async () => {
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
                preferredDate: selectedSlot?.date || '',
                preferredTime: selectedSlot?.label || '',
                source: 'Book Consultation Page'
            });

            setSubmissionId(res.submissionId);
            setSubmitted(true);
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
                date: selectedSlot?.date || '',
                time: selectedSlot?.label || '',
                source: 'Book Consultation Page'
            }).catch(jiraErr => console.warn('[Jira] Consultation Lead capture notice:', jiraErr));
        } catch (err: any) {
            console.error("Error submitting form:", err);
            setSubmitError("We couldn't reach our scheduling system just now. Please try again in a moment, or email us directly.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="pt-20 lg:pt-24 pb-20 min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
            {/* Ambient Enterprise Grid & Radial Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2878B5]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2878B5]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left Column: Strategic Positioning */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] text-[#1E6297] font-bold text-xs uppercase tracking-wider mb-4 border border-[#BAE0F8] shadow-2xs">
                                <Calendar className="w-3.5 h-3.5 text-[#2878B5]" />
                                Executive Architecture Briefing
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#0A2540] tracking-tight leading-[1.08] mb-6">
                                Architect Your <br />
                                <span className="bg-gradient-to-r from-[#2878B5] via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    AI Revenue Engine
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-normal">
                                Schedule a 1-on-1 strategy session with our Enterprise AI Architects to map your revenue leaks, audit intent signals, and evaluate automated growth models.
                            </p>
                        </div>

                        {/* Value Metric Pillars */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card">
                                <div className="text-2xl font-black font-heading text-[#2878B5] mb-1">45-Minute</div>
                                <div className="text-sm font-bold text-[#0A2540]">Deep Architecture Review</div>
                                <div className="text-xs text-slate-500 mt-1 font-normal">Full audit of tech stack, pipeline velocity, and conversion blockers.</div>
                            </div>
                            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-card">
                                <div className="text-2xl font-black font-heading text-emerald-600 mb-1">Tailored</div>
                                <div className="text-sm font-bold text-[#0A2540]">Custom Implementation Blueprint</div>
                                <div className="text-xs text-slate-500 mt-1 font-normal">Receive concrete projections on CAC reduction and speed to ARR.</div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#020F1E] via-[#0A2540] to-[#0F3560] text-white shadow-xl border border-white/10">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5CAAE6] mb-3">
                                <Shield className="w-4 h-4 text-[#5CAAE6]" />
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

                    {/* Right Column: Booking Form with Calendar Integration */}
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

                                {/* ── Calendar Booking Widget ─────────────────────────── */}
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

                                <HoneypotField value={honeypot} onChange={setHoneypot} />

                                {submitError && (
                                    <FormErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />
                                )}

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !selectedSlot}
                                        className="w-full py-3.5 h-12 bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold rounded-xl shadow-lg shadow-blue-900/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Booking Your Consultation...</span>
                                            </div>
                                        ) : !selectedSlot ? (
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Select a Date & Time to Continue
                                            </span>
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
                title="Consultation Booked Successfully"
                message={
                    calendarEventLink
                        ? "Your consultation has been confirmed and a Google Calendar invitation has been sent to your email. A Principal AI Strategist will connect with you at the scheduled time."
                        : "Your consultation request has been registered in the ProfitMachines executive queue. A Principal AI Strategist has been assigned and will connect with your scheduling link."
                }
            />
        </div>
    );
}
