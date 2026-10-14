import { ShieldCheck, Award, Zap, Server } from 'lucide-react';

const partners = [
    "Salesforce", "Snowflake", "AWS", "HubSpot", "Microsoft",
    "Databricks", "Oracle", "SAP", "Google Cloud", "Stripe",
    "Twilio", "OpenAI", "Atlassian", "Slack", "Zendesk"
];

const trustBadges = [
    { icon: ShieldCheck, color: 'text-emerald-600', label: 'SOC2 Type II Certified' },
    { icon: Award, color: 'text-[#2878B5]', label: 'ISO 27001 Security' },
    { icon: Zap, color: 'text-amber-500', label: '99.99% Enterprise Uptime' },
    { icon: Server, color: 'text-[#2878B5]', label: 'Single-Tenant Vault' }
];

export default function TrustedBySection() {
    // Duplicate for seamless loop
    const loopPartners = [...partners, ...partners];

    return (
        <section id="partners" className="py-12 md:py-16 border-b border-slate-200/80 bg-white relative z-10 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-8">
                    Trusted by 100+ companies · Strategic Partners &amp; Enterprise Integrations
                </p>
            </div>

            {/* Infinite scroll ticker */}
            <div className="relative mb-10">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

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
                                className="h-11 px-6 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center text-slate-700 font-bold tracking-wide text-sm shrink-0 hover:bg-emerald-50 hover:border-emerald-300 hover:text-[#2878B5] transition-all duration-300 cursor-default shadow-xs"
                            >
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {trustBadges.map(({ icon: Icon, color, label }, i) => (
                        <div key={i} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-xl py-3 px-4">
                            <Icon className={`w-4 h-4 shrink-0 ${color}`} />
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
