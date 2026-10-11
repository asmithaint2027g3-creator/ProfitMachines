
import React, { useState } from 'react';
import {
    CheckCircle2,
    Calendar,
    Building2,
    Users,
    TrendingUp,
    Shield
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { submitToSheet } from '../../lib/sheets';
import { validateBusinessEmail, validatePhone, FormErrorBanner, HoneypotField } from '../components/forms/FormFeedback';

export default function BookDemo() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        revenue: '',
        interest: '',
        message: '',
        date: '',
        time: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [honeypot, setHoneypot] = useState('');

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
        if (formData.phone) {
            const phoneVal = validatePhone(formData.phone);
            if (!phoneVal.valid) {
                setPhoneError(phoneVal.message || 'Invalid phone number');
                return;
            }
        }

        setIsSubmitting(true);

        try {
            await submitToSheet('Book for Consulting', {
                "First Name": formData.firstName,
                "Last Name": formData.lastName,
                "Email": formData.email,
                "Phone": formData.phone,
                "Company": formData.company,
                "Status": "New",
                "Source": "Consulting Booking Page",
                "Annual Revenue": formData.revenue,
                "Interest": formData.interest,
                "Message": formData.message,
                "Preferred Date": formData.date,
                "Preferred Time": formData.time
            });
            setSubmitted(true);
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setSubmitError("We couldn't submit your request just now. Please try again in a moment, or contact us directly.");
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
        <div className="pt-20 lg:pt-28 pb-16 min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Column: Value Prop */}
                    <div className="lg:w-1/2 space-y-10">
                        <Reveal width="100%">
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#053d2e] font-bold text-xs uppercase tracking-wider mb-6 border border-emerald-100 shadow-sm">
                                    <Calendar className="w-4 h-4" />
                                    Schedule a Consultation
                                </span>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tighter leading-[1.05]">
                                    Architect Your <br />
                                    <span className="bg-gradient-to-r from-[#064e3b] to-emerald-600 bg-clip-text text-transparent">
                                        AI Revenue Engine
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-lg">
                                    Book a personalized consulting session with our revenue architects. See how ProfitMachines can transform your unstructured data into predictable growth.
                                </p>
                            </div>
                        </Reveal>

                        <div className="space-y-6">
                            <Reveal width="100%" delay={0.2}>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">What you'll get:</h3>
                                <ul className="space-y-4">
                                    {[
                                        { text: "Full platform walkthrough customized to your vertical", icon: Users },
                                        { text: "AI readiness assessment for your current stack", icon: Shield },
                                        { text: "Revenue acceleration roadmap & ROI projection", icon: TrendingUp },
                                        { text: "Competitive whitespace analysis preview", icon: Building2 }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all group">
                                            <div className="bg-emerald-50 p-2.5 rounded-xl text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-white transition-colors">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-slate-700 font-semibold text-lg leading-snug">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>

                        {/* Real-World Interactive Demo Workspace Visual */}
                        <Reveal width="100%" delay={0.25}>
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                                <img 
                                    src="/images/book-demo-preview.png" 
                                    alt="ProfitMachines Interactive AI Platform Consultation & Live Demo Session" 
                                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Interactive Session</span>
                                        <h4 className="text-sm font-bold text-white mt-0.5">Live AI Co-Pilot & Revenue Architecture Review</h4>
                                    </div>
                                    <span className="px-2.5 py-1 bg-emerald-600/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold rounded-full">
                                        30-Min Session
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        <div className="pt-8 border-t border-slate-200/60">
                            <Reveal width="100%" delay={0.3}>
                                <div className="flex items-center gap-5">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                                                
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-0.5 mb-1.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <svg key={i} className="w-4 h-4 text-amber-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-sm font-bold text-slate-700 tracking-wide">Trusted by 500+ Revenue Leaders</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:w-1/2">
                        <Reveal width="100%" delay={0.2}>
                            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 relative overflow-hidden ring-1 ring-slate-900/5 mx-auto w-full max-w-lg lg:max-w-none hover:shadow-3xl transition-shadow duration-500">

                                {submitted ? (
                                    <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100 animate-bounce">
                                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Request Received!</h2>
                                        <p className="text-lg text-slate-600 max-w-md mx-auto mb-8 font-medium">
                                            Thanks for your interest, {formData.firstName}. Our revenue architects will review your profile and contact you shortly.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            variant="outline"
                                            className="border-slate-300 text-slate-700 h-12 px-8 text-base font-bold hover:bg-slate-50 hover:text-slate-900 rounded-xl"
                                        >
                                            Submit Another Request
                                        </Button>
                                    </div>
                                ) : null}

                                <div className="relative z-10 mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Schedule Free Consultation</h2>
                                    <p className="text-slate-500">Fill out the form below to schedule your consulting session.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input
                                                id="firstName" name="firstName" required
                                                value={formData.firstName} onChange={handleChange}
                                                placeholder="John"
                                                className="h-10 md:h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input
                                                id="lastName" name="lastName" required
                                                value={formData.lastName} onChange={handleChange}
                                                placeholder="Doe"
                                                className="h-10 md:h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Work Email</Label>
                                            <Input
                                                id="email" name="email" type="email" required
                                                value={formData.email} onChange={handleChange}
                                                placeholder="name@company.com"
                                                className="h-10 md:h-11"
                                            />
                                            {emailError && (
                                                <p className="text-xs text-red-600 font-semibold">{emailError}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone" name="phone" type="tel"
                                                value={formData.phone} onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="h-10 md:h-11"
                                            />
                                            {phoneError && (
                                                <p className="text-xs text-red-600 font-semibold">{phoneError}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company</Label>
                                            <Input
                                                id="company" name="company" required
                                                value={formData.company} onChange={handleChange}
                                                placeholder="Acme Corp"
                                                className="h-10 md:h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="revenue">Annual Revenue</Label>
                                            <div className="relative">
                                                <select
                                                    id="revenue" name="revenue"
                                                    value={formData.revenue} onChange={handleChange}
                                                    className={`flex h-10 md:h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.revenue === "" ? "text-slate-500" : "text-slate-900"}`}
                                                >
                                                    <option value="" className="text-slate-400">Select Range</option>
                                                    <option value="Seed - Series A">Seed - Series A</option>
                                                    <option value="Series B - C ($10M - $50M)">Series B - C ($10M - $50M)</option>
                                                    <option value="Enterprise ($50M+)">Enterprise ($50M+)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Preferred Date</Label>
                                            <Input
                                                id="date" name="date" type="date" required
                                                value={formData.date} onChange={handleChange}
                                                className="h-10 md:h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="time">Preferred Time</Label>
                                            <Input
                                                id="time" name="time" type="time" required
                                                value={formData.time} onChange={handleChange}
                                                className="h-10 md:h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="interest">Primary Interest</Label>
                                        <div className="relative">
                                            <select
                                                id="interest" name="interest" required
                                                value={formData.interest} onChange={handleChange}
                                                className={`flex h-10 md:h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.interest === "" ? "text-slate-500" : "text-slate-900"}`}
                                            >
                                                <option value="" className="text-slate-400">Select a Solution</option>
                                                <option value="AI Sales Acceleration">AI Sales Acceleration</option>
                                                <option value="Demand Discovery Engine">Demand Discovery Engine</option>
                                                <option value="Revenue Operations (RevOps)">Revenue Operations (RevOps)</option>
                                                <option value="Performance Marketing">Performance Marketing</option>
                                                <option value="Other / General Inquiry">Other / General Inquiry</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message (Optional)</Label>
                                        <Textarea
                                            id="message" name="message"
                                            value={formData.message} onChange={handleChange}
                                            className="min-h-[100px] resize-none"
                                            placeholder="Tell us about your current challenges..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="btn-cta-primary w-full mt-4"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Schedule Free Consultation'}
                                    </Button>

                                    <HoneypotField value={honeypot} onChange={setHoneypot} />

                                    {submitError && (
                                        <FormErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />
                                    )}

                                    <p className="text-xs text-center text-slate-500 mt-4">
                                        By submitting this form, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
