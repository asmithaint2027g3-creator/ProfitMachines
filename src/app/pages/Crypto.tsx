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
import CryptoCarousel from '../components/CryptoCarousel';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Crypto() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();

    // Redundant backgroundSlides removed in favor of CryptoCarousel

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
        <div className="min-h-screen bg-white text-[#0066FF] relative overflow-hidden font-sans selection:bg-[#0066FF]/30">
            {/* Premium Crypto Carousel - First Section */}
            <div>
                <CryptoCarousel />
            </div>

            {/* Global Background Noise & Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0"></div>

            <div className="relative z-10 pt-32 pb-20">
                {/* Hero Section */}
                <div className="relative mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Background Effects */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse mix-blend-multiply opacity-60" />

                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0066FF] shadow-[0_2px_10px_-4px_rgba(6,78,59,0.3)] mb-8 transition-colors cursor-default">
                            <Sparkles className="w-4 h-4 text-[#0066FF]" />
                            <span className="text-sm font-bold text-[#0066FF] tracking-wide">New: AI-Native Revenue Protocol</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0066FF] mb-8 tracking-tighter leading-[1.05] drop-shadow-sm">
                            AI-Driven Sales Acceleration <br />
                            <span className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
                                for Crypto Ecosystems
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-[#0066FF] leading-relaxed max-w-3xl mx-auto font-medium text-balance mb-12">
                            The AI-Native Revenue Protocol that transforms users, liquidity, and ecosystems into <span className="text-[#0066FF] font-bold">predictable revenue streams</span>. Built for L1/L2s, DeFi, Gaming, and CEXs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
                            <Button 
                                onClick={() => openLongForm({ defaultService: 'Crypto Protocol Revenue AI' })}
                                className="bg-[#0066FF] hover:bg-[#0066FF] text-white px-10 py-7 h-auto text-lg font-bold rounded-full shadow-[0_10px_30px_rgba(4,120,87,0.25)] hover:shadow-[0_20px_40px_rgba(4,120,87,0.4)] transition-all flex items-center gap-2 group hover:-translate-y-1"
                            >
                                Start Scaling Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button 
                                onClick={() => openQuickForm({ defaultService: 'Crypto Protocol Revenue AI' })}
                                variant="outline" 
                                className="text-[#0066FF] hover:text-[#0066FF] hover:bg-[#0066FF] px-10 py-7 h-auto text-lg font-bold rounded-full border border-[#0066FF] hover:border-[#0066FF] transition-all bg-white/80 backdrop-blur-sm shadow-sm"
                            >
                                Quick 60-Sec Inquiry
                            </Button>
                        </div>
                    </div>

                    {/* Premium Hero Mind Map - Seamlessly Integrated */}
                    <div className="w-full mt-20 relative">
                        <CryptoMindMap />
                    </div>
                </div>

                {/* Introduction Section */}
                <Reveal width="100%" delay={0.1}>
                    <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center mb-24">
                        <h2 className="text-3xl font-bold text-[#0066FF] mb-6">Revolutionizing Crypto Business Models</h2>
                        <p className="text-xl text-[#0066FF] leading-relaxed font-medium">
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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0066FF] text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Intelligence Hub
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0066FF] mb-6 tracking-tight">ProfitMachines for Crypto Business Models</h2>
                            <p className="text-lg text-[#0066FF] text-balance font-medium">
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
                                            className="w-full justify-start text-left px-5 py-4 h-auto text-sm font-bold rounded-xl border border-transparent bg-white text-[#0066FF] hover:text-[#0066FF] hover:bg-[#0066FF]/10 transition-all data-[state=active]:bg-[#0066FF] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/20 shadow-sm"
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <div className="flex-1 w-full lg:w-[75%] bg-white rounded-3xl p-2 border border-[#0066FF] shadow-xl shadow-slate-200/50">
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
                                            <div className="bg-white border border-[#0066FF] rounded-2xl p-8 hover:border-[#0066FF] transition-colors group">
                                                <h3 className="text-3xl font-bold text-[#0066FF] mb-8 group-hover:text-[#0066FF] transition-colors">{model.title}</h3>

                                                <div className="space-y-8">
                                                    <div>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-[#0066FF] uppercase tracking-wider mb-3">
                                                            <TrendingUp className="w-4 h-4" /> Key Benefits
                                                        </h4>
                                                        <p className="text-[#0066FF] leading-relaxed text-lg font-medium">{model.benefits}</p>
                                                    </div>

                                                    <div className="w-full h-px bg-white"></div>

                                                    <div>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-[#0066FF] uppercase tracking-wider mb-3">
                                                            <Zap className="w-4 h-4" /> Core Offerings
                                                        </h4>
                                                        <p className="text-[#0066FF] leading-relaxed font-medium">{model.offerings}</p>
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
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0066FF] text-[#0066FF] text-xs font-bold uppercase tracking-wider mb-6">
                                <TrendingUp className="w-3.5 h-3.5" /> Proven Results
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0066FF] mb-6">Crypto Success Stories</h2>
                            <p className="text-lg text-[#0066FF] text-balance font-medium">
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
                                <div key={i} className="bg-white border border-[#0066FF] rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:border-[#0066FF] transition-all group">
                                    <div className="text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-4">{study.type}</div>
                                    <h3 className="text-xl font-bold text-[#0066FF] mb-4">{study.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {study.stats.map((stat, idx) => (
                                            <span key={idx} className="bg-white text-[#0066FF] text-xs font-bold px-2 py-1 rounded border border-[#0066FF]">{stat}</span>
                                        ))}
                                    </div>
                                    <p className="text-[#0066FF] text-sm leading-relaxed font-medium">
                                        {study.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Unified Outcome Section */}
                <div className="relative py-32 mt-20 overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white0/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0066FF] mb-8 shadow-lg shadow-indigo-500/25">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">Unified Crypto Outcome</h2>
                        <p className="text-xl md:text-2xl text-[#0066FF] font-medium leading-relaxed max-w-4xl mx-auto">
                            Together, these AI-powered engines transform crypto businesses from speculative growth models into <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0066FF] font-bold">data-driven, revenue-predictable, and scalable ecosystems</span>.
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
