import React from 'react';
import { Target, Users, AlertTriangle, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';

export default function GlobalICPSection() {
    return (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 text-slate-700 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-slate-200">
                            <Target className="w-4 h-4" />
                            Crypto Ideal Customer Profile
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tighter leading-tight">
                            Built for High-Velocity <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 border-b-4 border-slate-900/10 pb-1">Web3 & Crypto Ecosystems</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Column 1: Who it's for */}
                        <div className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 group-hover:bg-slate-900 transition-colors duration-300">
                                    <Users className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                    Target Ecosystems
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span>L1 & L2 Protocols scaling their ecosystem</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span>DeFi Platforms & DEXs seeking sustainable liquidity</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span>Web3 Gaming & Metaverse Projects launching tokens</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span>Centralized Exchanges (CEX) driving user adoption</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Champions */}
                        <div className="group p-8 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-2xl lg:-translate-y-4 relative overflow-hidden transition-all duration-300">
                            {/* Inner Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] pointer-events-none" />
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <Sparkles className="w-5 h-5 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    Core Champions
                                </h3>
                            </div>
                            <ul className="space-y-4 relative z-10">
                                {[
                                    "Founders & Protocol Architects",
                                    "Heads of Growth & Marketing",
                                    "Tokenomics & Ecosystem Leads",
                                    "Community Managers",
                                    "DAOs & Governance Councils"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Mission Critical */}
                        <div className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 group-hover:bg-slate-900 transition-colors duration-300">
                                    <AlertTriangle className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                    When It's Mission-Critical
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "TVL is high, but daily active user count is stagnant",
                                    "Incentive programs are bleeding funds to bots/farmers",
                                    "Token launch is approaching with unclear demand",
                                    "Community sentiment is disconnected from on-chain reality",
                                    "Struggling to convert airdrop hunters into long-term users"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed font-medium">
                                        <div className="p-1 bg-slate-200 rounded-full mt-0.5">
                                            <ArrowUpRight className="w-3 h-3 text-slate-700" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
