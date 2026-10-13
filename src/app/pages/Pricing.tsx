import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { CheckCircle2, ArrowRight, Zap, Sparkles, DollarSign } from 'lucide-react';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function Pricing() {
    const location = useLocation();
    const { openQuickForm, openLongForm } = useLeadModal();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Pricing & Engagement Tiers | ProfitMachines';
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

    const faqs = [
        {
            q: "What kind of ROI can I expect?",
            a: "Our AI typically shortens time-to-pipeline by 60% and lifts win rates by 34% through reputation-boosted engagement."
        },
        {
            q: "Do I need to replace my existing CRM?",
            a: "No. ProfitMachines integrates seamlessly with Salesforce, HubSpot, and other major platforms to act as an intelligence layer on top of your existing data."
        },
        {
            q: "How quickly can we get started?",
            a: "Most clients are fully onboarded within 2–3 weeks. Our implementation team handles the technical integration end-to-end."
        },
        {
            q: "Is there a minimum contract length?",
            a: "We offer flexible engagement models. Most clients start with a 3-month pilot before scaling to annual agreements."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white border-b-2 border-[#0066FF]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#0066FF] text-[#0066FF] text-xs font-bold uppercase tracking-widest mb-6">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>Pricing & Engagement Architecture</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0066FF] mb-6 tracking-tight leading-[1.05] font-heading">
                            Pricing Aligned to{' '}
                            <span className="text-[#0066FF]">Revenue Growth</span>
                        </h1>
                        <p className="text-xl text-[#0066FF] max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
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
                                <div className={`h-full rounded-2xl bg-white border-2 ${
                                    tier.highlight
                                        ? 'border-[#0066FF]'
                                        : 'border-[#0066FF]'
                                } p-7 relative flex flex-col transition-all duration-300 hover:-translate-y-1`}>
                                    {tier.highlight && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0066FF] text-white text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full">
                                            Most Popular
                                        </div>
                                    )}
                                    {tier.highlight && (
                                        <div className="absolute inset-0 rounded-2xl border-4 border-[#0066FF] pointer-events-none" />
                                    )}
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold text-[#0066FF] font-heading">{tier.name}</h3>
                                        {tier.highlight && (
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-[#0066FF] px-2 py-0.5 rounded">BEST VALUE</span>
                                        )}
                                    </div>
                                    <p className="text-[#0066FF] mb-6 h-12 text-sm leading-relaxed opacity-70">{tier.description}</p>
                                    <div className="text-4xl font-extrabold text-[#0066FF] mb-8 font-mono">{tier.price}</div>
                                    <div className="flex-grow space-y-3.5 mb-8">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
                                                <span className="text-[#0066FF] font-medium text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => openQuickForm({
                                            defaultService: `Pricing: ${tier.name} Plan`,
                                            source: `Pricing Card (${tier.name})`,
                                            title: `Inquire About ${tier.name} Plan`
                                        })}
                                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center transition-all cursor-pointer border-2 ${
                                            tier.highlight
                                                ? 'bg-[#0066FF] text-white border-[#0066FF] hover:bg-white hover:text-[#0066FF]'
                                                : 'bg-white text-[#0066FF] border-[#0066FF] hover:bg-[#0066FF] hover:text-white'
                                        }`}
                                    >
                                        Get Started with {tier.name}
                                    </button>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="mt-20 max-w-3xl mx-auto bg-white rounded-2xl p-8 border-2 border-[#0066FF]">
                        <Reveal>
                            <h3 className="text-2xl font-bold text-[#0066FF] mb-6 text-center font-heading">Frequently Asked Questions</h3>
                            <div className="space-y-6">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="pb-6 border-b border-[#0066FF] last:border-0 last:pb-0">
                                        <h4 className="font-bold text-[#0066FF] mb-2">{faq.q}</h4>
                                        <p className="text-[#0066FF] text-sm leading-relaxed opacity-75">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Custom Engagement Note */}
                    <Reveal>
                        <div className="mt-12 text-center">
                            <p className="text-[#0066FF] font-medium text-base">
                                All plans are custom-quoted based on your revenue targets and deployment scope.{' '}
                                <button
                                    onClick={() => openLongForm({
                                        defaultService: 'Pricing Consultation',
                                        source: 'Pricing Page Custom Note',
                                        title: 'Discuss Custom Pricing'
                                    })}
                                    className="font-bold text-[#0066FF] underline hover:opacity-70 transition-opacity"
                                >
                                    Schedule a pricing consultation →
                                </button>
                            </p>
                        </div>
                    </Reveal>
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
