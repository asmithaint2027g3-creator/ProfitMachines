import React, { useEffect, useState } from 'react';
import {
    Handshake,
    Zap,
    Users,
    CheckCircle2,
    BarChart3,
    X,
    Building2,
    Cpu,
    UserPlus,
    ArrowRight,
    Sparkles,
    AlertTriangle,
    TrendingUp
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { submitToSheet } from '../../lib/sheets';
import { captureLeadInJira } from '../../lib/jira';
import { trackEvent } from '../../lib/analytics';
import { FormSuccessModal, validateBusinessEmail, FormErrorBanner, HoneypotField } from '../components/forms/FormFeedback';

export default function Partners() {
    const [activePartnerCat, setActivePartnerCat] = useState<string>('all');
    const [selectedModalPartner, setSelectedModalPartner] = useState<any | null>(null);
    useEffect(() => {
        document.title = "Partners | ProfitMachines AI";
    }, []);

    // Scroll to hash section on load or navigation
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            // Small delay to let the page render first
            const timer = setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) {
                    const offset = 90;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, []);



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        company: '',
        partnerType: 'Solution Partner',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submissionId, setSubmissionId] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [honeypot, setHoneypot] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (honeypot) return; // silently drop bot submissions
        setEmailError(null);
        setSubmitError(null);

        const emailVal = validateBusinessEmail(formData.email);
        if (!emailVal.valid) {
            setEmailError(emailVal.message || 'Invalid email');
            return;
        }

        setIsSubmitting(true);
        trackEvent({ eventName: 'PARTNER_FORM_SUBMIT', category: 'PARTNERSHIP' });

        try {
            const res = await submitToSheet('Partners', {
                formName: 'Partnership Program Application',
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                company: formData.company,
                website: formData.website,
                partnerType: formData.partnerType,
                interest: formData.partnerType,
                message: formData.message,
                source: 'Partners Page'
            });
            setSubmissionId(res.submissionId);
            setSubmitted(true);

            // Capture Partner Application Lead in Jira Space (Tasks + Subtasks)
            captureLeadInJira('partner', {
                submission_id: res.submissionId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                company: formData.company,
                message: `Partner Type: ${formData.partnerType} | Website: ${formData.website}\nNotes: ${formData.message}`,
                interest: formData.partnerType,
                source: 'Partners Page'
            }).catch(jiraErr => console.warn('[Jira] Partner Lead notice:', jiraErr));
        } catch (error: any) {
            console.error(error);
            setSubmitError(error.message || "We couldn't submit your application just now. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* 1. Hero Section */}
            <section id="partner-hero" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 border-b border-slate-200">
                {/* Background Slideshow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {/* Premium Unified Overlay - Matched with AI Lead Gen Visibility */}
                    <div className="absolute inset-0 bg-white/30 bg-gradient-to-b from-white/80 via-white/20 to-white/80" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply"></div>
                </div>

                <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-100/60 shadow-[0_2px_10px_-4px_rgba(6,78,59,0.3)] text-[#1E6297] text-sm font-bold mb-8 backdrop-blur-sm animate-fade-in-up">
                            <Handshake className="w-4 h-4 text-[#2878B5]" />
                            <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Partner Program</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1] text-slate-900 drop-shadow-sm">
                            Grow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-emerald-700 to-teal-700">ProfitMachines</span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                            Join our ecosystem of industry-leading partners. Accelerate your growth by delivering the world's most advanced AI revenue platform to your clients.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <a href="#partner-form">
                                <Button className="bg-gradient-to-r from-[#2878B5] to-emerald-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 text-lg h-auto rounded-full shadow-lg shadow-[#2878B5]/25 hover:shadow-[#2878B5]/35 transition-all hover:-translate-y-1">
                                    Become a Partner
                                </Button>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 2. Why Partner Section */}
            <section id="why-partner" className="py-24 bg-slate-50 relative" style={{ scrollMarginTop: '80px' }}>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">Why Partner with Us?</h2>
                        <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">Unlock new revenue streams and deliver exceptional value.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BarChart3 className="w-8 h-8 text-[#2878B5]" />,
                                title: "New Revenue Streams",
                                description: "Earn attractive commissions and unlock recurring revenue opportunities through our tiered partner program."
                            },
                            {
                                icon: <Zap className="w-8 h-8 text-teal-700" />,
                                title: "Leading Edge AI",
                                description: "Differentiate yourself by offering the most advanced AI-powered revenue acceleration platform in the market."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-[#2878B5]" />,
                                title: "Co-Marketing & Support",
                                description: "Access dedicated partner support, co-marketing resources, and sales enablement tools to help you win."
                            }
                        ].map((item, idx) => (
                            <Reveal key={idx} width="100%" delay={idx * 0.1}>
                                <Card className="border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white h-full">
                                    <CardContent className="p-8">
                                        <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-6 border border-slate-100">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Partner Categories */}
            <section id="partner-programs" className="py-24 bg-white relative" style={{ scrollMarginTop: '80px' }}>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <Reveal width="100%">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 mt-4">Partner Programs tailored to your business</h2>
                                <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10">
                                    Whether you're a consultancy, technology provider, or agency, we have a program designed for your success.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { id: "solution-partners", title: "Solution Partners", desc: "Consultancies and SIs implementation ProfitMachines." },
                                        { id: "technology-partners", title: "Technology Partners", desc: "ISVs and Tech platforms integrating with our ecosystem." },
                                        { id: "referral-partners", title: "Referral Partners", desc: "Agencies and individuals referring qualified leads." }
                                    ].map((prog, i) => (
                                        <div key={i} id={prog.id} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100" style={{ scrollMarginTop: '100px' }}>
                                            <div className="mt-1">
                                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900">{prog.title}</h4>
                                                <p className="text-slate-600 mb-2">{prog.desc}</p>
                                                <button
                                                    onClick={() => setSelectedModalPartner(prog)}
                                                    className="inline-flex items-center gap-2 text-xs font-bold text-[#2878B5] hover:text-[#164E78] transition-colors"
                                                >
                                                    <span>Explore Program Specification</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                        <Reveal width="100%" delay={0.2}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2878B5] to-emerald-600 rounded-2xl transform rotate-3 blur-sm opacity-20"></div>
                                <div className="relative bg-slate-900 rounded-2xl p-10 text-white overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
                                    <QuoteIcon className="w-12 h-12 text-emerald-400 mb-6 opacity-50" />
                                    <blockquote className="text-2xl font-medium leading-relaxed mb-8 relative z-10">
                                        "Partnering with ProfitMachines has been a game-changer for our agency. We've not only increased our revenue but also deepened our client relationships by delivering tangible ROI."
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">John Doe</div>
                                            <div className="text-slate-400">CEO, GrowthAgency</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 4. Partner Application Form */}
            <section id="partner-form" className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">Become a Partner</h2>
                            <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
                                Fill out the form below to join our partner ecosystem.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal width="100%" delay={0.2}>
                        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 sm:p-12">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Application Received!</h3>
                                    <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
                                        Thank you for your interest in partnering with ProfitMachines. Our partnership team will review your application and be in touch shortly.
                                    </p>
                                    <Button onClick={() => setSubmitted(false)} variant="outline">
                                        Submit Another Application
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName" name="firstName" required
                                                value={formData.firstName} onChange={handleChange}
                                                placeholder="John"
                                                className="h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName" name="lastName" required
                                                value={formData.lastName} onChange={handleChange}
                                                placeholder="Doe"
                                                className="h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Work Email</Label>
                                            <Input
                                                id="email" name="email" type="email" required
                                                value={formData.email} onChange={handleChange}
                                                placeholder="john@company.com"
                                                className="h-11"
                                            />
                                            {emailError && (
                                                <p className="text-xs text-red-600 font-semibold">{emailError}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company Name</Label>
                                            <Input
                                                id="company" name="company" required
                                                value={formData.company} onChange={handleChange}
                                                placeholder="Acme Inc."
                                                className="h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="website">Company Website</Label>
                                            <Input
                                                id="website" name="website" required
                                                value={formData.website} onChange={handleChange}
                                                placeholder="https://company.com"
                                                className="h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="partnerType">Partner Type</Label>
                                            <div className="relative">
                                                <select
                                                    id="partnerType" name="partnerType" required
                                                    value={formData.partnerType} onChange={handleChange}
                                                    className={`flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formData.partnerType === "" ? "text-slate-500" : "text-slate-900"}`}
                                                >
                                                    <option value="" className="text-slate-400">Select Type</option>
                                                    <option value="Solution Partner">Solution Partner (SI/Consultancy)</option>
                                                    <option value="Technology Partner">Technology Partner (ISV)</option>
                                                    <option value="Referral Partner">Referral Partner</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">How can we work together?</Label>
                                        <Textarea
                                            id="message" name="message" required
                                            value={formData.message} onChange={handleChange}
                                            placeholder="Tell us about your business and partnership goals..."
                                            className="min-h-[120px] resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold h-12 text-lg rounded-xl mt-4"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting Application...' : 'Apply to Partner Program'}
                                    </Button>

                                    <HoneypotField value={honeypot} onChange={setHoneypot} />

                                    {submitError && (
                                        <FormErrorBanner message={submitError} onDismiss={() => setSubmitError(null)} />
                                    )}
                                </form>
                            )}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Detailed Partner Specification Modal (Like Offerings) */}
            {selectedModalPartner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                        <button
                            onClick={() => setSelectedModalPartner(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#2878B5]">
                                <Handshake className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-[#2878B5]">Partner Program Specification</span>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selectedModalPartner.title}</h3>
                            </div>
                        </div>

                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                            {selectedModalPartner.desc}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#2878B5]" />
                                    Program Benefits
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-700 font-medium">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Tiered margin sharing & recurring commissions</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Dedicated partner success manager</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Joint GTM & co-marketing collateral</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Technical & solution architecture support</li>
                                </ul>
                            </div>

                            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                    Expected ROI
                                </h4>
                                <ul className="space-y-2 text-sm font-bold text-emerald-900">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 20-35% revenue share on closed deals</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Accelerated client deal velocity</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Enhanced account retention & expansion</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                            <a href="#partner-form" onClick={() => setSelectedModalPartner(null)} className="flex-1">
                                <Button className="w-full bg-[#2878B5] hover:bg-[#1E6297] text-white font-bold py-3 rounded-full">Apply for {selectedModalPartner.title}</Button>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Reference Confirmation Modal */}
            <FormSuccessModal
                isOpen={submitted}
                onClose={() => setSubmitted(false)}
                submissionId={submissionId}
                email={formData.email}
                title="Partner Application Received"
                message="Your partnership application has been registered with our Alliances & Channel Strategy team. We will review your submission and reach out shortly."
            />
        </div>
    );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
        >
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
        </svg>
    );
}
