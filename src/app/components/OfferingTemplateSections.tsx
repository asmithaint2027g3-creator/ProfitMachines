import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowRight, Building2, CheckCircle2, HelpCircle, Rocket, Search, ShieldCheck, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react';
import type { DiscoveryData } from '../pages/DiscoveryPage';

const segments = [
    { name: 'Enterprise Companies', icon: Building2, focus: 'Multi-stakeholder buying committees, procurement readiness, and expansion revenue.' },
    { name: 'Mid-Market Businesses', icon: TrendingUp, focus: 'Repeatable sales motion, territory efficiency, and faster pipeline velocity.' },
    { name: 'Startups & New Entrants', icon: Rocket, focus: 'Early traction, founder-led sales, and evidence-based market validation.' },
    { name: 'SaaS & Software', icon: Zap, focus: 'Product-led growth, trial-to-paid conversion, and expansion signals.' },
    { name: 'IT Services & Consulting', icon: Users, focus: 'Client acquisition, qualification, and repeat engagement.' },
    { name: 'Manufacturing & Industrial', icon: ShieldCheck, focus: 'Operational efficiency, supplier readiness, and long-cycle deals.' },
    { name: 'Professional Services', icon: Sparkles, focus: 'Advisory value, pricing clarity, and repeat engagements.' },
    { name: 'E-commerce & Consumer Brands', icon: Target, focus: 'Acquisition cost, conversion, retention, and lifetime value.' },
];

const icpScoreModel = [
    { factor: 'Revenue potential', weight: 25, question: 'Does the account have meaningful contract or expansion value?' },
    { factor: 'Strategic fit', weight: 25, question: 'Does the offering solve a priority problem for this segment?' },
    { factor: 'Procurement readiness', weight: 20, question: 'Is budget, authority, and buying process in place?' },
    { factor: 'Data & technology readiness', weight: 20, question: 'Can the buyer act on intelligence and integrate value quickly?' },
    { factor: 'Growth timing', weight: 10, question: 'Is the need urgent enough to act within the next planning cycle?' },
];

const executionStages = [
    { name: 'Market Sizing', purpose: 'Quantify TAM, SAM, and SOM with clear assumptions.', deliverable: 'Sized opportunity map' },
    { name: 'Demand Validation', purpose: 'Test pain, intent, budget, and urgency with real buyers.', deliverable: 'Validated demand evidence' },
    { name: 'Buyer Intelligence', purpose: 'Map personas, buying committees, and triggers.', deliverable: 'ICP and buyer map' },
    { name: 'GTM Strategy', purpose: 'Select positioning, channels, and sales motion.', deliverable: 'Go-to-market plan' },
    { name: 'Revenue Execution', purpose: 'Run pilots, measure KPIs, and scale what works.', deliverable: 'Revenue execution roadmap' },
];

const siblingOfferings = [
    { name: 'Market Discovery', path: '/offerings/b2b/market-discovery', icon: Search },
    { name: 'Demand Discovery', path: '/offerings/b2b/demand-discovery', icon: Target },
    { name: 'Value Discovery', path: '/offerings/b2b/value-discovery', icon: TrendingUp },
    { name: 'Channel Discovery', path: '/offerings/b2b/channel-discovery', icon: Rocket },
    { name: 'Competitive Discovery', path: '/offerings/b2b/competitive-discovery', icon: ShieldCheck },
    { name: 'Customer Discovery', path: '/offerings/b2b/customer-discovery', icon: Users },
    { name: 'Product-Market Fit Discovery', path: '/offerings/b2b/product-market-fit-discovery', icon: Sparkles },
];

export default function OfferingTemplateSections({ data, pageSlug }: { data: DiscoveryData; pageSlug: string }) {
    const isB2C = pageSlug.includes('b2c');
    const related = isB2C ? siblingOfferings.map((item) => ({ ...item, path: item.path.replace('/b2b/', '/b2c/') })) : siblingOfferings;

    return (
        <div className="space-y-16">
            {/* Customer Segments & ICP */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealWrapper>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[#2878B5]/10 text-[#2878B5] flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5]">Customer Segmentation</p>
                            <h2 className="text-2xl font-extrabold text-slate-900">Customer Segments & ICP</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {segments.map((segment) => {
                            const Icon = segment.icon;
                            return (
                                <div key={segment.name} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                                    <Icon className="w-5 h-5 text-[#2878B5] mb-3" />
                                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">{segment.name}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{segment.focus}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <HelpCircle className="w-6 h-6 text-[#2878B5]" />
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Explainable ICP Scoring Model</h3>
                                <p className="text-xs text-slate-500">Example scoring framework. Weights and thresholds are configured per engagement.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {icpScoreModel.map((item) => (
                                <div key={item.factor} className="grid sm:grid-cols-[180px_80px_1fr] gap-3 items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{item.factor}</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{item.question}</p>
                                    </div>
                                    <span className="text-sm font-extrabold text-[#2878B5]">{item.weight}%</span>
                                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                                        <div className="h-full rounded-full bg-[#2878B5]" style={{ width: `${item.weight * 4}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-5">
                            Example personas are illustrative. We do not claim budget, purchase intent, or qualification status without supporting information.
                        </p>
                    </div>
                </RevealWrapper>
            </section>

            {/* Pain Points & Buying Triggers */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealWrapper>
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-5">Pain Points Addressed</h3>
                            <div className="space-y-3">
                                {data.spin && [data.spin.situation, data.spin.problem, data.spin.implication].filter(Boolean).map((pain, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                                        <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                                        <p className="text-sm text-slate-700 leading-relaxed">{pain}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-5">Buying Triggers</h3>
                            <div className="space-y-3">
                                {data.frameworks.map((fw, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                        <p className="text-sm text-slate-700 leading-relaxed">{fw}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealWrapper>
            </section>

            {/* Methodology & Execution Framework */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealWrapper>
                    <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center">
                                <Rocket className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Methodology</p>
                                <h2 className="text-2xl font-extrabold">Market-to-Revenue Execution Framework</h2>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-5 gap-4">
                            {executionStages.map((stage, idx) => (
                                <div key={stage.name} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <span className="text-xs font-bold text-emerald-300">Stage {idx + 1}</span>
                                    <h4 className="text-sm font-bold text-white mt-2 mb-2">{stage.name}</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{stage.purpose}</p>
                                    <p className="text-[11px] text-slate-400"><span className="font-semibold text-slate-200">Deliverable:</span> {stage.deliverable}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealWrapper>
            </section>

            {/* Related Offerings */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealWrapper>
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2">Continue Exploring</p>
                            <h2 className="text-2xl font-extrabold text-slate-900">Related Offerings</h2>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {related.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.name + item.path} to={item.path} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#2878B5]/60 hover:shadow-lg transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <Icon className="w-5 h-5 text-[#2878B5]" />
                                        <ArrowRight className="w-4 h-4 text-[#2878B5] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#2878B5] transition-colors">{item.name}</h4>
                                    <p className="text-xs text-slate-500 mt-1">Explore methodology and KPIs.</p>
                                </Link>
                            );
                        })}
                    </div>
                </RevealWrapper>
            </section>
        </div>
    );
}

function RevealWrapper({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
