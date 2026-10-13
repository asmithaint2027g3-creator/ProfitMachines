
import { ArrowLeft, FileText,   AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
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
                            <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-[#0066FF] font-bold uppercase tracking-wider text-sm">Legal</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-6">
                        Terms of Service
                    </h1>
                    <div className="flex items-center gap-2 text-[#0066FF] font-medium text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Last Updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-slate prose-lg max-w-none">
                    <p className="text-xl text-[#0066FF] leading-relaxed mb-12">
                        By accessing or using ProfitMachines' website and services, you agree to these Terms. Please read them carefully.
                    </p>

                    <div className="space-y-12">
                        {/* Section 1 */}
                        <section className="bg-white p-8 rounded-2xl border border-[#0066FF] shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                            <h2 className="text-2xl font-bold text-[#0066FF] mb-6 flex items-center gap-3 relative z-10">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0066FF] text-sm font-bold">1</span>
                                Acceptance & Services
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="p-4 bg-white rounded-xl border border-[#0066FF]">
                                    <h3 className="font-bold text-[#0066FF] mb-2">Acceptance of Terms</h3>
                                    <p className="text-[#0066FF] text-sm">By using our website, you agree to comply with these Terms and all applicable laws.</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-[#0066FF]">
                                    <h3 className="font-bold text-[#0066FF] mb-2">Services Provided</h3>
                                    <p className="text-[#0066FF] text-sm mb-2">ProfitMachines provides AI-driven growth, revenue acceleration, and business automation solutions.</p>
                                    <p className="text-xs text-[#0066FF] italic">We reserve the right to modify, suspend, or discontinue any part of the service.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#0066FF] mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0066FF] text-sm font-bold">2</span>
                                User Responsibilities
                            </h2>
                            <p className="text-[#0066FF] mb-6">You agree to the following responsibilities:</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Provide accurate information",
                                    "Do not misuse the platform",
                                    "No unauthorized access attempts",
                                    "No malicious content uploads"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#0066FF] shadow-sm">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                        <span className="text-[#0066FF] font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="bg-white text-[#0066FF] p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white text-sm font-bold">3</span>
                                Legal & Liability
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Intellectual Property</h3>
                                    <p className="text-sm opacity-80">All content, branding, software, and materials belong to ProfitMachines and are protected by intellectual property laws.</p>
                                </div>
                                <div className="h-px bg-white/10 w-full"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Confidentiality</h3>
                                    <p className="text-sm opacity-80">Any business or technical information shared remains confidential.</p>
                                </div>
                                <div className="h-px bg-white/10 w-full"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Limitation of Liability</h3>
                                    <p className="text-sm opacity-80">ProfitMachines shall not be liable for indirect, incidental, or consequential damages.</p>
                                </div>
                            </div>
                        </section>

                        {/* Additional Sections Grouped */}
                        <div className="space-y-8 border-l-4 border-[#0066FF] pl-8 ml-2">
                            <section>
                                <h2 className="text-lg font-bold text-[#0066FF] mb-2">Termination</h2>
                                <p className="text-[#0066FF]">We may suspend or terminate access if these terms are violated.</p>
                            </section>

                            <section>
                                <h2 className="text-lg font-bold text-[#0066FF] mb-2">Governing Law</h2>
                                <p className="text-[#0066FF]">These terms are governed by the laws of India.</p>
                            </section>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-white p-6 rounded-xl border border-[#0066FF] flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h3 className="font-bold text-[#0066FF]">Have questions about our Terms?</h3>
                                <p className="text-[#0066FF] text-sm">Our legal team is here to help.</p>
                            </div>
                            <a href="mailto:connect@profitmachines.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0066FF] font-bold rounded-lg border border-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all shadow-sm">
                                <span>Contact Us</span>
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
