import { ShieldCheck, Award, Zap, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const partners = [
    "Salesforce", "Snowflake", "AWS", "HubSpot", "Microsoft",
    "Databricks", "Oracle", "SAP", "Google Cloud", "Stripe",
    "Twilio", "OpenAI", "Atlassian", "Slack", "Zendesk"
];

const trustBadges = [
    { icon: ShieldCheck, label: 'SOC2 Type II Certified' },
    { icon: Award,       label: 'ISO 27001 Security' },
    { icon: Zap,         label: '99.99% Enterprise Uptime' },
    { icon: Server,      label: 'Single-Tenant Vault' }
];

export default function TrustedBySection() {
    const loopPartners = [...partners, ...partners];

    return (
        <section id="partners" className="py-10 md:py-14 border-b border-slate-100 bg-white relative overflow-hidden">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2878B5]/20 to-transparent" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-8">
                    Trusted by 100+ companies · Strategic Partners &amp; Enterprise Integrations
                </p>
            </div>

            {/* Infinite scroll ticker */}
            <div className="relative mb-8">
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                <div className="flex overflow-hidden">
                    <div
                        className="flex gap-3 shrink-0 items-center"
                        style={{
                            animation: 'pm-ticker-scroll 32s linear infinite',
                            width: 'max-content'
                        }}
                    >
                        {loopPartners.map((partner, idx) => (
                            <div
                                key={idx}
                                className="h-10 px-5 bg-slate-50 border border-slate-200/70 rounded-lg flex items-center justify-center text-slate-600 font-semibold tracking-tight text-sm shrink-0 hover:bg-[#F0F7FC] hover:border-[#BAE0F8] hover:text-[#2878B5] transition-all duration-300 cursor-default"
                            >
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                    {trustBadges.map(({ icon: Icon, label }, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 hover:bg-[#F0F7FC] hover:border-[#BAE0F8] hover:text-[#2878B5] transition-all duration-200"
                        >
                            <Icon className="w-3.5 h-3.5 shrink-0 text-[#2878B5]" />
                            <span>{label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes pm-ticker-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
