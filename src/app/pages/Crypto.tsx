import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Reveal } from '../components/ui/Reveal';
import { cryptoContent } from '../../data/cryptoContent';
import GlobalICPSection from '../components/GlobalICPSection';
import CryptoOutcomeBlock from '../components/CryptoOutcomeBlock';
import CryptoMindMap from '../components/CryptoMindMap';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Crypto() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');

        if (section) {
            setTimeout(() => {
                const elementId = section.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const element = document.getElementById(elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden font-sans selection:bg-sky-500/20">
            {/* Global Background Noise & Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0"></div>

            {/* ── HERO SECTION (Dark Background with Background Image) ── */}
            <section className="relative pt-24 lg:pt-28 pb-16 md:pb-20 bg-[#070D18] border-b border-slate-800/80 overflow-hidden text-white">
                {/* Background Image with dark blend */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity pointer-events-none scale-105"
                    style={{ backgroundImage: `url('/images/hero-market-radar.jpg')` }}
                />
                {/* Dark gradient overlay on top of image */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#070D18]/90 via-[#070D18]/70 to-[#070D18] pointer-events-none" />

                {/* Soft ambient gradient orbs */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-gradient-to-r from-sky-500/20 via-[#2878B5]/25 to-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-sky-500/10 rounded-full blur-[110px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Modern blueprint cyber grid pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.35]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(56, 189, 248, 0.12) 1px, transparent 1px)
                        `,
                        backgroundSize: '44px 44px',
                        maskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, #000 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, #000 40%, transparent 100%)',
                    }}
                />

                {/* High-tech concentric sector framework rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[840px] pointer-events-none opacity-40">
                    <div className="absolute inset-[8%] rounded-full border border-sky-400/10" />
                    <div className="absolute inset-[22%] rounded-full border border-dashed border-sky-400/20 animate-[spin_180s_linear_infinite]" />
                    <div className="absolute inset-[36%] rounded-full border border-sky-400/10" />
                    <div className="absolute inset-[50%] rounded-full border border-sky-400/20" />
                </div>

                {/* Top and bottom subtle accent lines */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-lg shadow-sky-950/50 hover:border-sky-400/60 transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                            </span>
                            <Sparkles className="w-4 h-4 text-sky-400" />
                            <span>New: AI-Native Revenue Protocol</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05] drop-shadow-sm">
                            AI-Driven Sales Acceleration <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#38bdf8] to-blue-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                                for Crypto Ecosystems
                            </span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal text-balance mb-12">
                            The AI-Native Revenue Protocol that transforms users, liquidity, and ecosystems into <span className="text-white font-bold">predictable revenue streams</span>. Built for L1/L2s, DeFi, Gaming, and CEXs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Button 
                                onClick={() => openLongForm({ defaultService: 'Crypto Protocol Revenue AI' })}
                                className="bg-[#2878B5] hover:bg-[#1E6297] text-white px-10 py-6 h-auto text-base sm:text-lg font-bold rounded-full shadow-[0_10px_30px_rgba(40,120,181,0.4)] hover:shadow-[0_15px_35px_rgba(40,120,181,0.6)] transition-all flex items-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
                            >
                                <span>Start Scaling Now</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button 
                                onClick={() => openQuickForm({ defaultService: 'Crypto Protocol Revenue AI' })}
                                variant="outline" 
                                className="text-sky-300 hover:text-white hover:bg-[#2878B5] px-10 py-6 h-auto text-base sm:text-lg font-bold rounded-full border-2 border-sky-500/40 hover:border-[#2878B5] transition-all bg-slate-900/60 backdrop-blur-sm shadow-sm cursor-pointer"
                            >
                                Quick 60-Sec Inquiry
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="relative z-10 py-20">
                {/* Premium Hero Mind Map - Seamlessly Integrated */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                    <div className="w-full relative">
                        <CryptoMindMap />
                    </div>
                </div>

                {/* Introduction Section */}
                <Reveal width="100%" delay={0.1}>
                    <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center mb-24">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Revolutionizing Crypto Business Models</h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            Welcome to ProfitMachines's integrated platform for revolutionizing crypto business models, ICOs, and spot markets. As an AI-driven sales expert, we deliver unparalleled acceleration in sales, revenue, and demand generation. Our AI-Native Revenue Protocol transforms users, liquidity, and ecosystems into predictable revenue streams.
                        </p>
                    </div>
                </Reveal>

                {/* Global Crypto ICP Section */}
                <Reveal width="100%" direction="up">
                    <GlobalICPSection />
                </Reveal>

                {/* Business Models & AI educational Section */}
                <div className="relative z-20 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="mb-16 md:text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#1E6297] text-xs font-bold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Intelligence Hub
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">ProfitMachines for Crypto Business Models</h2>
                            <p className="text-lg text-slate-600 text-balance font-medium">
                                Focused benefits and offerings tailored to specific crypto business models, integrating our engines for sales acceleration.
                            </p>
                        </div>

                        <div className="max-w-7xl mx-auto">
                            <Tabs defaultValue="cex" className="w-full flex flex-col lg:flex-row gap-10">
                                {/* Sticky Sidebar Navigation */}
                                <TabsList className="w-full lg:w-[25%] flex-col justify-start h-auto gap-3 bg-transparent p-0 border-b-0 sticky top-32 lg:h-fit">
                                    {[
                                        { id: "cex", label: "Centralized Exchange (CEX)" },
                                        { id: "dex", label: "Decentralized Exchange (DEX)" },
                                        { id: "wallet", label: "Wallet Services" },
                                        { id: "defi", label: "DeFi Lending/Borrowing" },
                                        { id: "nft", label: "NFT Marketplace" },
                                        { id: "ico", label: "ICO/IDO/IEO" },
                                        { id: "mining", label: "Mining/Staking Operations" },
                                        { id: "payment", label: "Crypto Payment Gateways" },
                                        { id: "yield", label: "Yield Farming/Aggregators" }
                                    ].map((tab) => (
                                        <TabsTrigger
                                            key={tab.id}
                                            value={tab.id}
                                            className="w-full justify-start text-left px-5 py-4 h-auto text-sm font-bold rounded-xl border border-transparent bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all data-[state=active]:bg-[#2878B5] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/20 shadow-sm"
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <div className="flex-1 w-full lg:w-[75%] bg-white rounded-3xl p-2 border border-slate-200 shadow-xl shadow-slate-200/50">
                                    {/* Tab Content Mapping */}
                                    {[
                                        {
                                            id: "cex",
                                            title: "Centralized Exchange (CEX)",
                                            benefits: "30-50% faster revenue from trading fees; 25-45% ROAS on user acquisition; reduced fraud by 40%.",
                                            offerings: "Performance Revenue Engine for channel attribution; Customer Journey Intelligence for retention; integrations with spot market APIs for real-time optimization."
                                        },
                                        {
                                            id: "dex",
                                            title: "Decentralized Exchange (DEX)",
                                            benefits: "15X high-intent liquidity providers; 5X faster growth loops; 20-40% higher monetization per swap.",
                                            offerings: "Demand Discovery Engine for on-chain signals; Growth Acceleration Engine for liquidity levers; Revenue Acceleration for protocol fee tweaks."
                                        },
                                        {
                                            id: "wallet",
                                            title: "Wallet Services",
                                            benefits: "25-45% improved activation/retention; 30% churn reduction; 20-40% LTV boost.",
                                            offerings: "Customer Journey Intelligence for wallet mapping; MVP Acceleration for new features; Market Validation for user fit."
                                        },
                                        {
                                            id: "defi",
                                            title: "DeFi Lending/Borrowing",
                                            benefits: "30-50% revenue velocity from interest spreads; 40-60% faster MVP launches; reduced default risks by 25%.",
                                            offerings: "Revenue Acceleration for monetization; Performance Engine for incentive optimization; Validation Intelligence for pricing."
                                        },
                                        {
                                            id: "nft",
                                            title: "NFT Marketplace",
                                            benefits: "15X demand signals for collections; 25-45% ROAS on sales commissions; 5X experimentation speed.",
                                            offerings: "Demand Discovery for community sentiment; Growth Engine for adoption; Journey Intelligence for buyer retention."
                                        },
                                        {
                                            id: "ico",
                                            title: "ICO/IDO/IEO",
                                            benefits: "50-70% higher launch success; 20X intent investors; 30-40% risk reduction.",
                                            offerings: "Market Validation for pre-launch; Demand Discovery for targeting; Sales & Marketing Automation for hype building."
                                        },
                                        {
                                            id: "mining",
                                            title: "Mining/Staking Operations",
                                            benefits: "20-40% predictable rewards; 30% lower energy/ops costs; faster scaling.",
                                            offerings: "Revenue Engine for forecasting; Growth Acceleration for node optimization; Performance for incentive allocation."
                                        },
                                        {
                                            id: "payment",
                                            title: "Crypto Payment Gateways",
                                            benefits: "25-35% transaction conversion uplift; 40% fraud detection; higher merchant adoption.",
                                            offerings: "Journey Intelligence for seamless flows; Demand Engine for merchant leads; Revenue Ops for fee optimization."
                                        },
                                        {
                                            id: "yield",
                                            title: "Yield Farming/Aggregators",
                                            benefits: "30-50% yield optimization; 15X high-intent farmers; reduced wastage by 40%.",
                                            offerings: "Performance Revenue for ROI allocation; Growth Engine for strategy experimentation; Validation for market timing."
                                        }
                                    ].map((model) => (
                                        <TabsContent key={model.id} value={model.id} className="mt-0 animate-in fade-in slide-in-from-right-4 duration-500 outline-none p-6 md:p-10">
                                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:border-emerald-200 transition-colors group">
                                                <h3 className="text-3xl font-bold text-slate-900 mb-8 group-hover:text-[#2878B5] transition-colors">{model.title}</h3>

                                                <div className="space-y-8">
                                                    <div>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-[#2878B5] uppercase tracking-wider mb-3">
                                                            <TrendingUp className="w-4 h-4" /> Key Benefits
                                                        </h4>
                                                        <p className="text-slate-600 leading-relaxed text-lg font-medium">{model.benefits}</p>
                                                    </div>

                                                    <div className="w-full h-px bg-slate-200"></div>

                                                    <div>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-[#2878B5] uppercase tracking-wider mb-3">
                                                            <Zap className="w-4 h-4" /> Core Offerings
                                                        </h4>
                                                        <p className="text-slate-600 leading-relaxed font-medium">{model.offerings}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>
                        </div>
                    </Reveal>
                </div>

                {/* Crypto Content Blocks */}
                <div className="relative z-20 space-y-32 py-24">
                    {cryptoContent.map((block, index) => (
                        <div key={index} id={block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="scroll-mt-32">
                            <Reveal width="100%" delay={0.1}>
                                <CryptoOutcomeBlock data={block} index={index} />
                            </Reveal>
                        </div>
                    ))}
                </div>

                {/* ProfitMachines Case Studies */}
                <div className="relative z-20 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal width="100%">
                        <div className="mb-16 md:text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                                <TrendingUp className="w-3.5 h-3.5" /> Proven Results
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Crypto Success Stories</h2>
                            <p className="text-lg text-slate-600 text-balance font-medium">
                                See how leading protocols and exchanges are using ProfitMachines to accelerate growth.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "DeFi Protocol Revenue Boost",
                                    type: "Revenue Acceleration",
                                    stats: ["45% Revenue Velocity", "28% Churn Reduction"],
                                    desc: "A leading DeFi protocol optimized token fees and retention signals, scaling monthly revenue from $2M to $2.9M and reaching top 10 TVL rankings."
                                },
                                {
                                    title: "ICO Launch Triumph",
                                    type: "Market Validation",
                                    stats: ["$25M Raised (150% Target)", "3.5X ROAS"],
                                    desc: "An emerging L2 blockchain ICO identified high-intent investors using Demand Discovery, achieving a 60% launch success rate and 200% post-ICO token value growth."
                                },
                                {
                                    title: "Spot Market Exchange Growth",
                                    type: "Performance Revenue",
                                    stats: ["2.7X ROAS", "120% User Growth"],
                                    desc: "A CEX battling low ROAS implemented Performance Revenue engines, cutting wastage by 42% and boosting transaction conversions by 38% QoQ."
                                }
                            ].map((study, i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:border-emerald-200 transition-all group">
                                    <div className="text-xs font-bold text-[#2878B5] uppercase tracking-wider mb-4">{study.type}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{study.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {study.stats.map((stat, idx) => (
                                            <span key={idx} className="bg-emerald-50 text-[#1E6297] text-xs font-bold px-2 py-1 rounded border border-emerald-100">{stat}</span>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                        {study.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Unified Outcome Section */}
                <div className="relative py-32 mt-20 overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 mb-8 shadow-lg shadow-indigo-500/25">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">Unified Crypto Outcome</h2>
                        <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-4xl mx-auto">
                            Together, these AI-powered engines transform crypto businesses from speculative growth models into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-400 font-bold">data-driven, revenue-predictable, and scalable ecosystems</span>.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <ContextualCtaSection
                    badge="Web3 & Crypto Ecosystems"
                    title="Scale Your Crypto Ecosystem with AI Intelligence"
                    subtitle="Join the fastest growing protocols and exchanges using ProfitMachines to dominate the market. Schedule an enterprise consultation or submit a 60-second quick inquiry."
                    defaultService="Crypto Ecosystem AI Acceleration"
                />
            </div>
        </div>
    );
}
