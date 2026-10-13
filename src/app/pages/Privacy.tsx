import { ArrowLeft, Shield, Lock, FileText, CheckCircle2, Eye, Scale, Cookie, Share2, Globe, Database, UserCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#0066FF]">
            {/* Header/Hero Section */}
            <div className="bg-white border-b border-[#0066FF] pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-50"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#0066FF] rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-[#0066FF] hover:text-[#0066FF] mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white rounded-lg text-[#0066FF]">
                            <Lock className="w-6 h-6" />
                        </div>
                        <span className="text-[#0066FF] font-bold uppercase tracking-wider text-sm">Legal</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-6">
                        Privacy Policy
                    </h1>
                    <div className="flex items-center gap-2 text-[#0066FF] font-medium text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Last Updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="bg-white rounded-3xl shadow-sm border border-[#0066FF] overflow-hidden">
                    {/* Introduction */}
                    <div className="p-8 sm:p-10 border-b border-[#0066FF] bg-white/50">
                        <p className="text-[#0066FF] leading-relaxed text-lg">
                            At <strong>PROFITMACHINES</strong>, we are committed to protecting your privacy and ensuring the responsible handling of your personal and business information. This Privacy Policy explains what information we collect, how we use it, with whom we share it, and the rights you have in relation to your data.
                        </p>
                    </div>

                    <div className="p-8 sm:p-10 space-y-10">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-3">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg">
                                    <FileText className="w-5 h-5" />
                                </div>
                                1. Information We Collect
                            </h2>
                            <p className="text-[#0066FF] mb-6 text-sm ml-12">We collect information necessary to deliver, improve, secure, and personalize our Services.</p>

                            <div className="space-y-6 ml-12">
                                <div>
                                    <h3 className="font-bold text-[#0066FF] mb-2 text-base">1.1 Personal Information</h3>
                                    <p className="text-[#0066FF] mb-2 text-sm">We collect personal information you voluntarily provide when interacting with us, including but not limited to:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-[#0066FF]">
                                        <li>Full name, Email address, Phone number</li>
                                        <li>Company or organization name, Job title or role</li>
                                        <li>Login credentials (e.g., username, password – securely hashed)</li>
                                        <li>Information submitted via contact forms, consultation requests, support tickets, newsletter sign-ups</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0066FF] mb-2 text-base">1.2 Business & Enterprise Data</h3>
                                    <p className="text-[#0066FF] mb-2 text-sm">For enterprise customers and platform users, we may process:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-[#0066FF]">
                                        <li>Business contact details (e.g., billing/admin contacts)</li>
                                        <li>System configuration settings, Usage metadata, Platform interaction logs</li>
                                    </ul>
                                    <div className="mt-3 text-xs text-[#0066FF] bg-white p-3 rounded border border-[#0066FF] inline-block">
                                        Note: PROFITMACHINES acts as a Data Processor for enterprise customer data and processes such data solely in accordance with our Data Processing Agreement (DPA) and your instructions.
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0066FF] mb-2 text-base">1.3 Non-Personal & Technical Information</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-[#0066FF]">
                                        <li>IP address, Browser type, version, and language</li>
                                        <li>Device type, model, and operating system</li>
                                        <li>Pages visited, clickstream data, session duration, referral URLs</li>
                                        <li>Cookies, pixels, beacons, and similar tracking technologies</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-white w-full" />

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-3">
                                <div className="p-2 bg-[#0066FF] text-[#0066FF] rounded-lg">
                                    <Eye className="w-5 h-5" />
                                </div>
                                2. How We Use Your Information
                            </h2>

                            <div className="space-y-6 ml-12">
                                <div>
                                    <h3 className="font-bold text-[#0066FF] mb-2 text-base">2.1 Use of Personal Information</h3>
                                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {[
                                            "Deliver, operate, and maintain Services",
                                            "Respond to inquiries & provide support",
                                            "Personalize experience & recommendations",
                                            "Send service-related communications",
                                            "Share marketing content (opt-out available)",
                                            "Fulfill contractual obligations",
                                            "Detect & prevent fraud/security incidents"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-[#0066FF]">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#0066FF] mb-2 text-base">2.2 Use of Non-Personal & Aggregated Data</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-[#0066FF]">
                                        <li>Analyze trends, user behavior, and platform performance</li>
                                        <li>Optimize website navigation and user interface</li>
                                        <li>Monitor system reliability, uptime, and threat patterns</li>
                                        <li>Generate internal reports and business insights</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-white w-full" />

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-3">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg">
                                    <Scale className="w-5 h-5" />
                                </div>
                                3. Legal Basis for Processing
                            </h2>
                            <div className="ml-12">
                                <p className="text-[#0066FF] mb-3 text-sm">Our processing of personal data is based on one or more of the following lawful grounds:</p>
                                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                                    <li className="bg-white p-3 rounded border border-[#0066FF]"><strong>Consent</strong><br /><span className="text-[#0066FF] text-xs">e.g., for marketing communications</span></li>
                                    <li className="bg-white p-3 rounded border border-[#0066FF]"><strong>Contractual necessity</strong><br /><span className="text-[#0066FF] text-xs">to provide requested Services</span></li>
                                    <li className="bg-white p-3 rounded border border-[#0066FF]"><strong>Legal compliance</strong><br /><span className="text-[#0066FF] text-xs">e.g., tax, audit, regulatory</span></li>
                                    <li className="bg-white p-3 rounded border border-[#0066FF]"><strong>Legitimate interests</strong><br /><span className="text-[#0066FF] text-xs">e.g., platform security</span></li>
                                </ul>
                            </div>
                        </section>

                        <div className="h-px bg-white w-full" />

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-3">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <Cookie className="w-5 h-5" />
                                </div>
                                4. Cookies & Tracking Technologies
                            </h2>
                            <div className="ml-12">
                                <p className="text-[#0066FF] mb-2 text-sm">We use cookies and similar technologies to:</p>
                                <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-orange-500 mb-3">
                                    <li>Enable essential website functions (e.g., login sessions) and remember preferences</li>
                                    <li>Analyze traffic, measure campaign effectiveness, and enhance performance</li>
                                </ul>
                                <p className="text-[#0066FF] text-sm italic">You may manage or disable non-essential cookies via your browser settings.</p>
                            </div>
                        </section>

                        <div className="h-px bg-white w-full" />

                        {/* Middle Sections Grid */}
                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Section 5 */}
                            <section>
                                <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-3">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    5. Data Protection
                                </h2>
                                <div className="ml-2">
                                    <p className="text-[#0066FF] mb-2 text-sm">We implement industry-standard safeguards:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-red-500">
                                        <li>Encryption in transit (TLS 1.2+) & at rest (AES-256)</li>
                                        <li>Role-based access controls & MFA</li>
                                        <li>Secure cloud infrastructure (AWS, Azure)</li>
                                        <li>Regular security assessments</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 6 */}
                            <section>
                                <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-3">
                                    <div className="p-2 bg-[#0066FF] text-[#0066FF] rounded-lg">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    6. Sharing of Info
                                </h2>
                                <div className="ml-2">
                                    <p className="text-[#0066FF] mb-2 text-sm">We do not sell your personal data. Disclosed only to:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-[#0066FF] text-sm marker:text-[#0066FF]">
                                        <li>Trusted third-party service providers</li>
                                        <li>Legal authorities when required by law</li>
                                        <li>Protect rights/safety of PROFITMACHINES</li>
                                        <li>Aggregated/anonymized forms</li>
                                    </ul>
                                </div>
                            </section>
                        </div>

                        <div className="h-px bg-white w-full" />

                        {/* Remaining Sections List */}
                        <div className="space-y-8">
                            {/* Section 7 */}
                            <section className="flex gap-4">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg h-fit shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0066FF] mb-2">7. Third-Party Links & Services</h2>
                                    <p className="text-[#0066FF] text-sm">Our platform may link to third-party services. We are not responsible for their content or privacy practices.</p>
                                </div>
                            </section>

                            {/* Section 8 */}
                            <section className="flex gap-4">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg h-fit shrink-0">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0066FF] mb-2">8. Data Retention</h2>
                                    <p className="text-[#0066FF] text-sm">We retain information only as long as necessary. Upon request, we delete or anonymize data unless legally required.</p>
                                </div>
                            </section>

                            {/* Section 9 */}
                            <section className="flex gap-4">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg h-fit shrink-0">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0066FF] mb-2">9. Your Rights & Choices</h2>
                                    <p className="text-[#0066FF] text-sm mb-2">You have the right to access, correct, delete, withdraw consent, and object to processing.</p>
                                    <p className="text-[#0066FF] text-xs">Contact us to exercise rights. We respond within 30 days.</p>
                                </div>
                            </section>

                            {/* Section 10 */}
                            <section className="flex gap-4">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg h-fit shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0066FF] mb-2">10. International Data Transfers</h2>
                                    <p className="text-[#0066FF] text-sm">Data may be processed internationally with appropriate safeguards (SCCs, Adequacy Decisions).</p>
                                </div>
                            </section>

                            {/* Section 11 & 12 */}
                            <section className="flex gap-4">
                                <div className="p-2 bg-white text-[#0066FF] rounded-lg h-fit shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#0066FF] mb-2">11 & 12. Policy Changes & Acceptance</h2>
                                    <p className="text-[#0066FF] text-sm">We may update this policy periodically. Continued use constitutes acceptance.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Section 13: Contact - Highlighted */}
                <div className="mt-8 bg-white text-white p-8 rounded-3xl shadow-xl border border-[#0066FF]">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0066FF] text-white text-sm font-bold">13</span>
                        Contact Us
                    </h2>
                    <p className="text-[#0066FF] mb-6">For questions, concerns, or to submit a data subject request, please contact our Data Protection Team:</p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 pr-8">
                            <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-[#0066FF]">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-1">Email Support</p>
                                <a href="mailto:compliance@profitmachines.com" className="text-lg font-bold text-white hover:text-[#0066FF] transition-colors">compliance@profitmachines.com</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
