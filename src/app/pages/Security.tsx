
import { ArrowLeft, Shield, Lock, Server, CheckCircle, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Security() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header/Hero Section */}
            <div className="bg-slate-900 border-b border-slate-800 pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden text-white">
                <div className="absolute inset-0 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#064e3b] rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-700 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-600/20 border border-emerald-600/30 rounded-lg text-emerald-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Security</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                        Security Policy
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl">
                        ProfitMachines is committed to maintaining the highest standards of security and integrity for customer data and systems.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">

                    {/* Security Controls Grid */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 items-center gap-3">
                            1. Security Controls
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { title: "Secure Cloud Hosting", icon: Server, desc: "Enterprise-grade infrastructure" },
                                { title: "Encrypted Transmission", icon: Lock, desc: "TLS 1.2+ for all data in transit" },
                                { title: "Access Controls", icon: Shield, desc: "Strict role-based permissions" },
                                { title: "Continuous Monitoring", icon: Database, desc: "24/7 automated threat detection" }
                            ].map((item, i) => (
                                <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#064e3b] flex items-center justify-center mb-4">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Data Protection */}
                    <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Data Protection</h2>
                        <p className="text-slate-600 mb-6">Our multi-layered defense strategy protects customer data against:</p>
                        <ul className="space-y-3">
                            {[
                                "Unauthorized access attempts",
                                "Data breaches and leaks",
                                "Loss or misuse of information",
                                "Malicious attacks & vulnerabilities"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Compliance & Response */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Compliance</h2>
                            <div className="bg-slate-100 p-6 rounded-xl">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2 font-medium text-slate-800">
                                        <div className="w-2 h-2 rounded-full bg-emerald-600"></div> ISO 27001 Standards
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-slate-800">
                                        <div className="w-2 h-2 rounded-full bg-emerald-600"></div> GDPR Principles
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-slate-800">
                                        <div className="w-2 h-2 rounded-full bg-emerald-600"></div> Indian IT Act
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Incident Response</h2>
                            <div className="bg-slate-100 p-6 rounded-xl">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2 font-medium text-slate-800">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Immediate Investigation
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-slate-800">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> User Notification
                                    </li>
                                    <li className="flex items-center gap-2 font-medium text-slate-800">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Corrective Action
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Footer / Contact */}
                    <section className="border-t border-slate-200 pt-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-bold text-slate-900">Report a Security Issue</h3>
                                <p className="text-slate-500 text-sm">Found a vulnerability? Let us know securely.</p>
                            </div>
                            <a href="mailto:connect@profitmachines.com" className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                Contact Security Team
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
