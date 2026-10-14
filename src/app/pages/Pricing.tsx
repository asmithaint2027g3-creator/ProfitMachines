import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Pricing() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const tiers = [
        {
            name: "Starter",
            description: "Demand Discovery & Brand Insights",
            price: "Custom",
            features: [
                "Dynamic ICP Modeling",
                "Demand Pulse Engine",
                "Predictive Lead Scoring",
                "Basic Brand Analytics"
            ]
        },
        {
            name: "Growth",
            description: "Full Autonomous Sales Pilot + Reputation Acceleration",
            price: "Custom",
            features: [
                "All Starter Features",
                "AI Sales Agents (Inbound & Outbound)",
                "Review Sentiment Monitoring",
                "Automated Trust-Signal Generation",
                "Workflow Automation"
            ],
            highlight: true
        },
        {
            name: "Enterprise",
            description: "All Engines + Custom AI Agents for Hidden Revenue Capture",
            price: "Custom",
            features: [
                "All Growth Features",
                "Churn Risk Modeling",
                "Cross-sell/Upsell Engines",
                "Revenue Leakage Audits",
                "Custom AI Agent Development",
                "Dedicated RevOps Architect"
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero - Dark Teal Corporate Banner */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#2878B5] text-white border-b border-emerald-500/20">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[140px]" />
                </div>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Pricing & Engagement Architecture</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.05] font-heading">
                            Pricing Aligned to{' '}
                            <span className="text-emerald-300">Revenue Growth</span>
                        </h1>
                        <p className="text-xl text-emerald-100/90 max-w-3xl mx-auto font-normal leading-relaxed">
                            Estimate your hidden revenue and brand amplification potential with transparent engagement tiers.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {tiers.map((tier, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <div className={`h-full rounded-2xl bg-white border ${
                                    tier.highlight 
                                        ? 'border-[#2878B5] ring-2 ring-[#2878B5]/20 shadow-xl' 
                                        : 'border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1'
                                } p-7 relative flex flex-col transition-all duration-300`}>
                                    {tier.highlight && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2878B5] text-white text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading">{tier.name}</h3>
                                    <p className="text-slate-600 mb-6 h-12 text-sm leading-relaxed">{tier.description}</p>
                                    <div className="text-4xl font-extrabold text-[#2878B5] mb-8 font-mono">{tier.price}</div>
                                    <div className="flex-grow space-y-3.5 mb-8">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                                <span className="text-slate-700 font-medium text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => openQuickForm({
                                            defaultService: `Pricing: ${tier.name} Plan`,
                                            source: `Pricing Card (${tier.name})`,
                                            title: `Inquire About ${tier.name} Plan`
                                        })}
                                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center transition-all cursor-pointer ${
                                            tier.highlight 
                                                ? 'bg-[#2878B5] text-white hover:bg-[#085a45] shadow-md' 
                                                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                        }`}
                                    >
                                        Get Started with {tier.name}
                                    </button>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="mt-20 max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 border border-slate-200">
                        <Reveal>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center font-heading">Frequently Asked Questions</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">What kind of ROI can I expect?</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Our AI typically shortens time-to-pipeline by 60% and lifts win rates by 34% through reputation-boosted engagement.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Do I need to replace my existing CRM?</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">No. ProfitMachines integrates seamlessly with Salesforce, HubSpot, and other major platforms to act as an intelligence layer on top of your existing data.</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Contextual CTA Section */}
            <ContextualCtaSection
                title="Ready to Accelerate Revenue?"
                subtitle="Let's discuss the right plan for your growth stage. No obligation, just clarity."
                serviceContext="Pricing & Revenue Architecture"
                source="Pricing Page Bottom"
            />
        </div>
    );
}
