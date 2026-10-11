
import { Target, Users, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

export default function CryptoGlobalICPSection() {
    return (
        <section className="py-20 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#031f18]/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-[2rem] p-8 md:p-14 border border-slate-700 shadow-2xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600/10 text-emerald-400 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-emerald-600/20">
                            <Target className="w-4 h-4" />
                            Crypto Ideal Customer Profile
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                            Built for High-Velocity <br />
                            <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                                Web3 & Crypto Ecosystems
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                        {/* Column 1: Who it's for */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                                <div className="p-2 bg-emerald-600/10 rounded-lg border border-emerald-600/20">
                                    <Users className="w-6 h-6 text-emerald-400" />
                                </div>
                                Target Ecosystems
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-slate-300 text-lg leading-relaxed font-medium">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>L1 & L2 Protocols scaling their ecosystem</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-lg leading-relaxed font-medium">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>DeFi Platforms & DEXs seeking sustainable liquidity</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-lg leading-relaxed font-medium">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Web3 Gaming & Metaverse Projects launching tokens</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-300 text-lg leading-relaxed font-medium">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Centralized Exchanges (CEX) driving user adoption</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Champions */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                                <div className="p-2 bg-teal-500/10 rounded-lg border border-purple-500/20">
                                    <Zap className="w-6 h-6 text-teal-400" />
                                </div>
                                Core Champions
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Founders & Protocol Architects",
                                    "Heads of Growth & Marketing",
                                    "Tokenomics & Ecosystem Leads",
                                    "Community Managers",
                                    "DAOs & Governance Councils"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 text-lg leading-relaxed font-medium group">
                                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5 shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Mission Critical */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                                <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                                </div>
                                When It's Mission-Critical
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "TVL is high, but daily active user count is stagnant",
                                    "Incentive programs are bleeding funds to bots/farmers",
                                    "Token launch is approaching with unclear demand",
                                    "Community sentiment is disconnected from on-chain reality",
                                    "Struggling to convert airdrop hunters into long-term users"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 text-lg leading-relaxed font-medium group">
                                        <div className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
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
