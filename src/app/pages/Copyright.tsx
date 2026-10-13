import React from 'react';
import { ArrowLeft, Copyright as CopyrightIcon, AlertCircle, FileCheck, Scale, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Copyright() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-white font-sans text-[#0066FF]">
            {/* Header/Hero Section */}
            <div className="bg-white border-b border-[#0066FF] pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-50"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-[#0066FF] hover:text-[#0066FF] mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white rounded-lg text-[#0066FF]">
                            <CopyrightIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[#0066FF] font-bold uppercase tracking-wider text-sm">Legal Protection</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-6">
                        Copyright Notice
                    </h1>
                    <p className="text-lg text-[#0066FF] max-w-2xl">
                        Protection of ProfitMachines' intellectual property, content, and brand assets.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">

                    {/* Copyright Statement */}
                    <section className="bg-white p-8 rounded-2xl border border-[#0066FF] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <CopyrightIcon className="w-32 h-32" />
                        </div>
                        <h2 className="text-xl font-bold text-[#0066FF] mb-4 flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-[#0066FF]" />
                            © Copyright Notice
                        </h2>
                        <p className="text-[#0066FF] font-bold text-lg mb-4">
                            Copyright © {currentYear} ProfitMachines. All Rights Reserved.
                        </p>
                        <p className="text-[#0066FF] leading-relaxed">
                            All content published on this website, including but not limited to text, graphics, logos, icons, images, videos, software, code, UI/UX design, data, and documentation, is the exclusive property of ProfitMachines and is protected by applicable copyright, trademark, and intellectual property laws.
                        </p>
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-800 text-sm font-medium flex gap-3">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <p>Unauthorized copying, reproduction, modification, distribution, transmission, republication, display, or performance of any content on this website is strictly prohibited without prior written permission from ProfitMachines.</p>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#0066FF] mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-[#0066FF]" />
                            Intellectual Property Rights
                        </h2>
                        <div className="bg-white p-8 rounded-2xl border border-[#0066FF] shadow-sm">
                            <p className="text-[#0066FF] mb-6">
                                All intellectual property rights in the website and its content belong to ProfitMachines or its licensors. This includes but is not limited to:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Brand name, logo, and trademarks",
                                    "Website design and layout",
                                    "Software and AI models",
                                    "Content, documentation, and frameworks",
                                    "Product architecture and algorithms"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#0066FF]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white0"></div>
                                        <span className="text-[#0066FF] font-medium text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-6 text-sm text-[#0066FF] italic">
                                Nothing on this website shall be construed as granting any license or right to use any trademark, logo, or proprietary information without written permission.
                            </p>
                        </div>
                    </section>

                    {/* Permitted Use vs Prohibited */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-white p-6 rounded-2xl border border-[#0066FF] shadow-sm">
                            <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                                <span className="bg-green-100 p-1 rounded">?</span> Permitted Use
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "View and browse the website",
                                    "Download publicly available materials for personal or internal business use",
                                    "Share links to ProfitMachines content with attribution"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[#0066FF] text-sm">
                                        <span className="text-green-500 font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="bg-white p-6 rounded-2xl border border-[#0066FF] shadow-sm">
                            <h2 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                                <span className="bg-red-100 p-1 rounded">?</span> You May Not
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "Republish ProfitMachines content as your own",
                                    "Use content for commercial resale",
                                    "Scrape or extract data using bots",
                                    "Reverse engineer software or systems"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[#0066FF] text-sm">
                                        <span className="text-red-500 font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Trademark & DMCA */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-[#0066FF] mb-4">Trademark Notice</h2>
                            <p className="text-[#0066FF] bg-white p-4 rounded-xl border border-[#0066FF] inline-block">
                                <strong>"ProfitMachines"</strong>, the ProfitMachines logo, product names, service names, and brand assets are trademarks of ProfitMachines. All other trademarks belong to their respective owners.
                            </p>
                        </section>

                        <section className="bg-white text-[#0066FF] p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4">
                                <Scale className="w-8 h-8 text-white shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4">DMCA / Copyright Infringement</h2>
                                    <p className="mb-6 opacity-90">
                                        If you believe any content on this site infringes your copyright, please contact us with the following details:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 mb-6 text-sm opacity-80">
                                        <li>Your name and contact information</li>
                                        <li>Description of copyrighted work</li>
                                        <li>URL of infringing content</li>
                                        <li>Proof of ownership</li>
                                    </ul>
                                    <div className="flex items-center gap-2 text-white font-bold bg-white/10 p-3 rounded-lg inline-flex">
                                        <span>??</span>
                                        <a href="mailto:cs@profitmachines.com" className="hover:text-[#0066FF] transition-colors">cs@profitmachines.com</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Disclaimer */}
                    <section className="border-t border-[#0066FF] pt-8 mt-12">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-bold text-[#0066FF] uppercase tracking-wide mb-1">Legal Disclaimer</h3>
                                <p className="text-sm text-[#0066FF]">
                                    ProfitMachines makes no warranties regarding the accuracy or completeness of the information on this website. The content is provided for informational purposes only and does not constitute legal, financial, or business advice.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
