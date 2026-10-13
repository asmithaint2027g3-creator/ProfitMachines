
import { ArrowLeft, Shield, Lock, Server, CheckCircle, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Security() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#0066FF]">
            {/* Header/Hero Section */}
            <div className="bg-white border-b border-[#0066FF] pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden text-white">
                <div className="absolute inset-0 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF] rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0066FF] rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-[#0066FF] hover:text-white mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#0066FF]/20 border border-[#0066FF]/30 rounded-lg text-[#0066FF]">
                            <Shield className="w-6 h-6" />
                        </div>
                        <span className="text-[#0066FF] font-bold uppercase tracking-wider text-sm">Security</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                        Security Policy
                    </h1>
                    <p className="text-lg text-[#0066FF] max-w-2xl">
                        ProfitMachines is committed to maintaining the highest standards of security and integrity for customer data and systems.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">

                    {/* Security Controls Grid */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0066FF] mb-8 items-center gap-3">
                            1. Security Controls
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Secure Cloud Hosting", icon: Server, desc: "Enterprise-grade infrastructure" },
                                { title: "Encrypted Transmission", icon: Lock, desc: "TLS 1.2+ for all data in transit" },
                                { title: "Access Controls", icon: Shield, desc: "Strict role-based permissions" },
                                { title: "Continuous Monitoring", icon: Database, desc: "24/7 automated threat detection" }
                            ].map((item, i) => (
                                <div key={i} className="p-5 bg-white rounded-xl border border-[#0066FF] shadow-sm hover:border-[#0066FF] hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-lg bg-white text-[#0066FF] flex items-center justify-center mb-4">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-[#0066FF] mb-1">{item.title}</h3>
                                    <p className="text-sm text-[#0066FF]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Data Protection */}
                    <section className="bg-white p-8 rounded-2xl border border-[#0066FF] shadow-sm">
                        <h2 className="text-2xl font-bold text-[#0066FF] mb-6">2. Data Protection</h2>
                        <p className="text-[#0066FF] mb-6">Our multi-layered defense strategy protects customer data against:</p>
                        <ul className="space-y-3">
                            {[
                                "Unauthorized access attempts",
                                "Data breaches and leaks",
                                "Loss or misuse of information",
                                "Malicious attacks & vulnerabilities"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[#0066FF]">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Compliance & Response */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4">3. Compliance</h2>
                            <div className="bg-white p-6 rounded-xl">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2 font-medium text-[#0066FF]">
                                        <div className="w-2 h-2 rounded-full bg-[#0066FF]"></div> ISO 27001 Standards
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-[#0066FF]">
                                        <div className="w-2 h-2 rounded-full bg-[#0066FF]"></div> GDPR Principles
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-[#0066FF]">
                                        <div className="w-2 h-2 rounded-full bg-[#0066FF]"></div> Indian IT Act
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4">4. Incident Response</h2>
                            <div className="bg-white p-6 rounded-xl">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2 font-medium text-[#0066FF]">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Immediate Investigation
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-[#0066FF]">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> User Notification
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-[#0066FF]">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Corrective Action
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Footer / Contact */}
                    <section className="border-t border-[#0066FF] pt-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-bold text-[#0066FF]">Report a Security Issue</h3>
                                <p className="text-[#0066FF] text-sm">Found a vulnerability? Let us know securely.</p>
                            </div>
                            <a href="mailto:connect@profitmachines.com" className="px-6 py-2.5 bg-white text-white font-bold rounded-lg hover:bg-white transition-colors shadow-lg shadow-slate-200">
                                Contact Security Team
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
