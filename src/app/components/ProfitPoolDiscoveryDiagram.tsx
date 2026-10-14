import { Search, Target, DollarSign, Network, ShieldCheck, Users, Sparkles } from 'lucide-react';

const steps = [
    { icon: Search, title: "Market Discovery" },
    { icon: Target, title: "Demand Discovery" },
    { icon: DollarSign, title: "Value Discovery" },
    { icon: Network, title: "Channel Discovery" },
    { icon: ShieldCheck, title: "Competitive Discovery" },
    { icon: Users, title: "Customer Discovery" },
    { icon: Sparkles, title: "Product-Market Fit Discovery" },
];

function DiscoveryColumn({ label, accent, prefix }: { label: string; accent: 'blue' | 'purple'; prefix: string }) {
    const theme = accent === 'blue'
        ? { pill: 'bg-[#2878B5]', card: 'from-[#2878B5] to-emerald-600', ring: 'group-hover:ring-blue-300', num: 'bg-[#031f18]/30' }
        : { pill: 'bg-[#2878B5]', card: 'from-[#2878B5] to-teal-500', ring: 'group-hover:ring-purple-300', num: 'bg-emerald-950/30' };

    return (
        <div className="flex-1 min-w-0">
            <div className={`inline-flex items-center justify-center px-6 py-2 rounded-full ${theme.pill} text-white font-extrabold text-lg mb-6 shadow-md`}>
                {label}
            </div>
            <div className="flex flex-col gap-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={step.title}
                            style={{ animationDelay: `${index * 60}ms` }}
                            className={`animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-both duration-500 group flex items-center gap-3 rounded-xl bg-gradient-to-r ${theme.card} text-white px-4 py-3 shadow-md ring-2 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${theme.ring}`}
                        >
                            <span className={`shrink-0 w-8 h-8 rounded-full ${theme.num} flex items-center justify-center font-mono text-xs font-bold`}>
                                {prefix}{index + 1}
                            </span>
                            <Icon className="w-4 h-4 shrink-0 opacity-80" />
                            <span className="text-sm font-bold truncate">{step.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Recreates the "AI Driven Profit Pool Discovery" B2B/B2C step diagram as live
 * markup (previously a static branded raster image) — keeps content accurate and
 * removes a large, off-brand image asset.
 */
export default function ProfitPoolDiscoveryDiagram() {
    return (
        <div className="w-full max-w-5xl rounded-[2rem] shadow-2xl border border-slate-200/80 hover:shadow-indigo-200/50 transition-all duration-300 bg-white p-8 sm:p-12">
            <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">AI-Driven Profit Pool Discovery</span>
            </div>
            <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                <DiscoveryColumn label="B2B" accent="blue" prefix="B2B-" />
                <DiscoveryColumn label="B2C" accent="purple" prefix="B2C-" />
            </div>
        </div>
    );
}
