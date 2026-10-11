import React from 'react';
import { ArrowLeft, Cookie, Info, Settings, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cookies() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header/Hero Section */}
            <div className="bg-white border-b border-slate-200 pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 opacity-50"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#064e3b] mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                            <Cookie className="w-6 h-6" />
                        </div>
                        <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">Policy</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Cookie Policy
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        ProfitMachines uses cookies to enhance user experience and analyze website performance.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">

                    {/* Intro */}
                    <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                        <Info className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">What Are Cookies?</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Cookies are small text files stored on your device to help websites function efficiently. They allow us to remember your preferences and understand how you interact with our site.
                            </p>
                        </div>
                    </section>

                    {/* Cookie Types */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">Types of Cookies We Use</h2>
                        <div className="grid gap-6">
                            {[
                                {
                                    title: "Essential Cookies",
                                    desc: "Strictly necessary for the website to function properly. You cannot switch these off.",
                                    color: "bg-slate-500"
                                },
                                {
                                    title: "Analytics Cookies",
                                    desc: "Help us understand how visitors interact with our website by collecting anonymous information.",
                                    color: "bg-emerald-600"
                                },
                                {
                                    title: "Functional Cookies",
                                    desc: "Enable specific features and remember your preferences for a personalized experience.",
                                    color: "bg-teal-500"
                                },
                                {
                                    title: "Marketing Cookies",
                                    desc: "Used to deliver relevant advertisements and track the effectiveness of marketing campaigns.",
                                    color: "bg-amber-500"
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 p-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                    <div className={`w-1.5 self-stretch rounded-full ${item.color} opacity-80`}></div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                                        <p className="text-slate-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Management & Third Party */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center mb-4">
                                <Settings className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 mb-3">Managing Cookies</h2>
                            <p className="text-slate-600 text-sm mb-4">You can control cookies via browser settings. Disabling cookies may affect functionality.</p>
                        </section>
                        <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center mb-4">
                                <ToggleRight className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 mb-3">Third-Party Cookies</h2>
                            <p className="text-slate-600 text-sm mb-4">We may use services like Google Analytics, Meta Pixel, and CRM tracking tools.</p>
                        </section>
                    </div>

                    {/* Updates & Contact */}
                    <section className="border-t border-slate-200 pt-8 text-center">
                        <p className="text-slate-500 mb-6">We may update this policy periodically. Last updated: {new Date().toLocaleDateString()}</p>
                        <a href="mailto:cs@profitmachines.com" className="inline-flex items-center text-[#064e3b] font-bold hover:underline">
                            Contact Us regarding Cookies
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
