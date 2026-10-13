import { ShieldCheck, Award, Zap, Server } from 'lucide-react';

const partners = [
    "Salesforce", "Snowflake", "AWS", "HubSpot", "Microsoft",
    "Databricks", "Oracle", "SAP", "Google Cloud", "Stripe",
    "Twilio", "OpenAI", "Atlassian", "Slack", "Zendesk"
];

const trustBadges = [
    { icon: ShieldCheck, label: 'SOC2 Type II Certified' },
    { icon: Award, label: 'ISO 27001 Security' },
    { icon: Zap, label: '99.99% Enterprise Uptime' },
    { icon: Server, label: 'Single-Tenant Vault' }
];

export default function TrustedBySection() {
    // Duplicate for seamless loop
    const loopPartners = [...partners, ...partners];

    return (
        <section id="partners" className="py-12 md:py-16 border-b-2 border-[#0066FF] bg-white relative z-10 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center font-mono text-xs font-bold text-[#0066FF] uppercase tracking-[0.16em] mb-8 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                    <span>Trusted by 100+ Companies · Strategic Partners &amp; Enterprise Integrations</span>
                </p>
            </div>

            {/* Infinite scroll ticker */}
            <div className="relative mb-10">
                <div className="flex overflow-hidden">
                    <div
                        className="flex gap-4 shrink-0 items-center"
                        style={{
                            animation: 'ticker-scroll 30s linear infinite',
                            width: 'max-content'
                        }}
                    >
                        {loopPartners.map((partner, idx) => (
                            <div
                                key={idx}
                                className="h-11 px-6 bg-white border-2 border-[#0066FF] rounded-xl flex items-center justify-center text-[#0066FF] font-bold tracking-wide text-sm shrink-0 hover:bg-[#0066FF] hover:text-white transition-all duration-200 cursor-default"
                            >
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                    {trustBadges.map(({ icon: Icon, label }, i) => (
                        <div key={i} className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold text-[#0066FF] bg-white border-2 border-[#0066FF] rounded-xl py-3 px-4 hover:bg-[#0066FF] hover:text-white transition-colors group">
                            <Icon className="w-4 h-4 shrink-0 text-[#0066FF] group-hover:text-white" />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes ticker-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
