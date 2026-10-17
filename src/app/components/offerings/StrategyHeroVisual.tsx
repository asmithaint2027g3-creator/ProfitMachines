import React from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
    AreaChart, Area, PieChart, Pie, Cell, CartesianGrid, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
    Search, Target, DollarSign, Network, ShieldCheck, Users, Sparkles,
    TrendingUp, Activity, CheckCircle2, ArrowRight, Layers, BarChart3,
    Compass, Award, Sliders, AlertCircle, ShoppingBag
} from 'lucide-react';

interface StrategyVisualProps {
    strategyId: string;
    isB2B: boolean;
}

export default function StrategyHeroVisual({ strategyId, isB2B }: StrategyVisualProps) {
    // ══════════════════════════════════════════════════════════════════════
    // 1. B2B-1: B2B Market Discovery — TAM / SAM / SOM Market Sizing
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-market-discovery') {
        const tamData = [
            { layer: 'SOM (Obtainable)', value: 1.8, accounts: '1,450 accounts', share: '12.7%', color: '#10B981' },
            { layer: 'SAM (Serviceable)', value: 4.6, accounts: '8,450 accounts', share: '32.4%', color: '#3B82F6' },
            { layer: 'TAM (Total)', value: 14.2, accounts: '28,000 accounts', share: '100%', color: '#6366F1' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">TAM / SAM / SOM Enterprise Sizing Model</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Illustrative Architecture
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Algorithmic market boundary quantification filtered by regulatory compliance, technical readiness, and median ARR thresholds ($120K/yr).
                    </p>

                    <div className="space-y-3.5 mb-6">
                        {tamData.map((d, i) => (
                            <div key={i} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-extrabold text-slate-200">{d.layer}</span>
                                    <span className="text-sm font-black" style={{ color: d.color }}>${d.value}B ARR</span>
                                </div>
                                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
                                    <div 
                                        className="h-full rounded-full transition-all duration-700" 
                                        style={{ width: `${(d.value / 14.2) * 100}%`, backgroundColor: d.color }} 
                                    />
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                                    <span>Target Universe: {d.accounts}</span>
                                    <span>Market Ratio: {d.share}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800 text-center">
                    <div className="bg-slate-800/40 rounded-lg p-2.5">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Band</div>
                        <div className="text-sm font-black text-white">±5% Audited</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-2.5">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">WTP Anchor</div>
                        <div className="text-sm font-black text-emerald-400">$120K ACV</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-2.5">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Entry Speed</div>
                        <div className="text-sm font-black text-blue-400">8 Weeks</div>
                    </div>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 2. B2B-2: B2B Demand Discovery — Buying Signal Intent Timeline
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-demand-discovery') {
        const intentFunnel = [
            { stage: 'Digital Topic Research', count: 1240, cvr: '100%', color: '#6366F1' },
            { stage: 'Vendor Comparison Spikes', count: 520, cvr: '41.9%', color: '#3B82F6' },
            { stage: 'Executive Urgency Trigger', count: 280, cvr: '22.5%', color: '#06B6D4' },
            { stage: 'Pre-RFP Champion Briefing', count: 140, cvr: '11.3%', color: '#10B981' },
            { stage: 'Qualified Pipeline Deal', count: 68, cvr: '5.5%', color: '#F59E0B' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Pre-RFP Demand Intent Progression</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Telemetry Stream
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Capturing multi-stakeholder intent signals 6-9 months before formal procurement issues a public specification.
                    </p>

                    <div className="space-y-3 mb-6">
                        {intentFunnel.map((item, idx) => (
                            <div key={idx} className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-slate-900 text-[10px] font-extrabold flex items-center justify-center text-slate-300">
                                        0{idx + 1}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-200">{item.stage}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-white">{item.count} accts</span>
                                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-slate-700/80" style={{ color: item.color }}>
                                        {item.cvr}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-center text-xs text-blue-300">
                    Pre-RFP Influence Share: <strong>58% of won enterprise deals</strong> co-designed prior to RFP.
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 3. B2B-3: B2B Value Discovery — Economic Value & Pricing Curve
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-value-discovery') {
        const evcData = [
            { category: 'Reference Alt.', value: 80, fill: '#64748B' },
            { category: 'Productivity Lift', value: 45, fill: '#3B82F6' },
            { category: 'Risk Mitigation', value: 30, fill: '#6366F1' },
            { category: 'Cost Avoidance', value: 35, fill: '#10B981' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Economic Value to Customer (EVC) Stack</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            CFO Model
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        Total Economic Surplus calculated over the customer's next-best alternative to defend pricing and reduce procurement discounting.
                    </p>

                    <div className="h-48 w-full mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={evcData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                                <XAxis dataKey="category" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}K`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                                    formatter={(v) => [`$${v}K Annual Value`, 'Economic Contribution']}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {evcData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-center">
                    <div className="bg-slate-800/40 p-2 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">List Price Realization</div>
                        <div className="text-sm font-black text-emerald-400">89% Captured</div>
                    </div>
                    <div className="bg-slate-800/40 p-2 rounded-xl">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Customer Measured ROI</div>
                        <div className="text-sm font-black text-blue-400">4.6x Annual</div>
                    </div>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 4. B2B-4: B2B Channel Discovery — Direct vs. Partner Economics
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-channel-discovery') {
        const channelData = [
            { name: 'Direct Sales', cac: 48, margin: 52, velocity: 112 },
            { name: 'Sys. Integrators', cac: 19, margin: 71, velocity: 64 },
            { name: 'VAR Ecosystem', cac: 24, margin: 66, velocity: 78 },
            { name: 'OEM / White-Label', cac: 14, margin: 82, velocity: 45 }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Network className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Channel Economics & CAC Comparison</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            Unit Economics
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Comparing fully-loaded Customer Acquisition Cost (CAC), net contribution margins, and deal cycle days across distribution models.
                    </p>

                    <div className="space-y-3 mb-6">
                        {channelData.map((c, i) => (
                            <div key={i} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs font-bold text-slate-200">{c.name}</span>
                                    <span className="text-xs font-extrabold text-emerald-400">{c.margin}% Contribution</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                                    <span>CAC: <strong>${c.cac}K</strong> per customer</span>
                                    <span className="text-right">Cycle: <strong>{c.velocity} days</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-center text-xs text-slate-300">
                    Partner Sourced Share Target: <strong>42% of total enterprise ARR</strong> within 12 months.
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 5. B2B-5: B2B Competitive Discovery — Differentiation Radar Matrix
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-competitive-discovery') {
        const radarData = [
            { subject: 'Real-time Signal Ingestion', us: 95, competitor: 45 },
            { subject: 'EVC Financial Defense', us: 90, competitor: 35 },
            { subject: 'Account ICP Scoring', us: 88, competitor: 60 },
            { subject: 'GTM Automation Speed', us: 92, competitor: 50 },
            { subject: 'Turnkey Enterprise Integrations', us: 85, competitor: 75 }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Enterprise Competitive Positioning Matrix</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Win Rate +35%
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        Multidimensional capability mapping comparing evidence-backed differentiation versus legacy market incumbents.
                    </p>

                    <div className="h-52 w-full mb-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={70} data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fontSize: 9 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                                <Radar name="ProfitMachines Strategy" dataKey="us" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
                                <Radar name="Legacy Incumbent" dataKey="competitor" stroke="#64748B" fill="#64748B" fillOpacity={0.2} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-[11px] text-slate-300 px-2">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> ProfitMachines: 62% Win Rate</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" /> Legacy: 27% Win Rate</span>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 6. B2B-6: B2B Customer Discovery — ICP Fit & Buying Committee Map
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-customer-discovery') {
        const committeeRoles = [
            { role: 'CFO / VP Finance', weight: 'Economic Buyer', status: 'Value Case Ready', color: '#10B981' },
            { role: 'VP Sales / CRO', weight: 'Business Sponsor', status: 'Active Champion', color: '#3B82F6' },
            { role: 'Head of RevOps', weight: 'Operational Owner', status: 'Workflow Aligned', color: '#6366F1' },
            { role: 'VP Enterprise Architecture', weight: 'Technical Gatekeeper', status: 'Security Approved', color: '#06B6D4' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Buying Committee Coverage & Qualification</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            MEDDPICC Standard
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Validating buying committee roles, explicit decision criteria, and urgency triggers to avoid dead-end qualification cycles.
                    </p>

                    <div className="space-y-3 mb-6">
                        {committeeRoles.map((r, i) => (
                            <div key={i} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-slate-200">{r.role}</div>
                                    <div className="text-[11px] text-slate-400">{r.weight}</div>
                                </div>
                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${r.color}20`, color: r.color }}>
                                    {r.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 flex justify-between text-xs text-slate-300">
                    <span>Buying Committee Coverage: <strong>82% Validated</strong></span>
                    <span className="text-emerald-400 font-bold">Sales Waste: -50%</span>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 7. B2B-7: B2B Product-Market Fit Discovery — Adoption & Retention Funnel
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2b-product-market-fit-discovery') {
        const pmfFunnel = [
            { milestone: 'Contract Signed', rate: '100%', value: 100 },
            { milestone: '30-Day Onboarding Activation', rate: '84%', value: 84 },
            { milestone: '3+ Core Modules Adopted', rate: '68%', value: 68 },
            { milestone: 'Annual Renewal (GRR)', rate: '96%', value: 96 },
            { milestone: 'Seat / Tier Expansion (NRR)', rate: '128%', value: 100 }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Enterprise Product Adoption & NRR Expansion</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            128% Net Retention
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Tracking enterprise onboarding velocity, module engagement depth, and expansion revenue to focus R&D on validated margin drivers.
                    </p>

                    <div className="space-y-3 mb-6">
                        {pmfFunnel.map((step, idx) => (
                            <div key={idx} className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                                <div className="flex justify-between items-center mb-1 text-xs">
                                    <span className="font-semibold text-slate-200">{step.milestone}</span>
                                    <span className="font-black text-emerald-400">{step.rate}</span>
                                </div>
                                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, step.value)}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300">
                    Gross Revenue Retention: <strong>96%</strong> • R&D Waste Reduction: <strong>$1.5M/yr saved</strong>.
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 8. B2C-1: B2C Market Discovery — Consumer Niche Category Sizing
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-market-discovery') {
        const nicheData = [
            { niche: 'Eco-Conscious Home', growth: '+42%', spend: '$380/yr', margin: '68%', color: '#10B981' },
            { niche: 'Working Parents Tech', growth: '+35%', spend: '$420/yr', margin: '64%', color: '#3B82F6' },
            { niche: 'Longevity Wellness', growth: '+54%', spend: '$560/yr', margin: '72%', color: '#6366F1' },
            { niche: 'Digital Nomad Essentials', growth: '+28%', spend: '$290/yr', margin: '58%', color: '#F59E0B' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Consumer Micro-Niche Attractiveness Matrix</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            $180M Niche Pool
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Bottom-up sizing of high-growth consumer lifestyle niches exhibiting low ad bidding competition and high gross margins.
                    </p>

                    <div className="space-y-3 mb-6">
                        {nicheData.map((item, idx) => (
                            <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-200">{item.niche}</span>
                                    <span className="text-xs font-black text-emerald-400">{item.growth} YoY</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400">
                                    <span>Annual Spend: <strong>{item.spend}</strong></span>
                                    <span>Gross Margin: <strong>{item.margin}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-center text-xs text-slate-300">
                    First 10K Customers Acquisition Velocity: <strong>4 months</strong> (vs. 14 month baseline).
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 9. B2C-2: B2C Demand Discovery — Consumer Search Spikes & Micro-Moments
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-demand-discovery') {
        const trendData = [
            { week: 'W1', organic: 120, intentSpike: 140 },
            { week: 'W2', organic: 135, intentSpike: 180 },
            { week: 'W3', organic: 160, intentSpike: 260 },
            { week: 'W4', organic: 190, intentSpike: 390 },
            { week: 'W5', organic: 210, intentSpike: 520 }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Consumer Search & Intent Velocity Timeline</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            4x Traffic Lift
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        Detecting emerging consumer search intent and seasonal demand spikes before competitor keyword bidding inflates CAC.
                    </p>

                    <div className="h-48 w-full mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="intentGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6}/>
                                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                                <XAxis dataKey="week" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                                <Area type="monotone" dataKey="intentSpike" stroke="#06B6D4" strokeWidth={2.5} fill="url(#intentGrad)" name="Intent Spikes" />
                                <Line type="monotone" dataKey="organic" stroke="#94A3B8" strokeWidth={1.5} dot={false} name="Baseline Search" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-[11px] text-slate-300 px-2">
                    <span>Demand-to-Visit CTR: <strong>6.8%</strong></span>
                    <span>Cost per Qualified Visit: <strong>$0.42</strong> (-52%)</span>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 10. B2C-3: B2C Value Discovery — Offer Testing & Checkout Conversion
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-value-discovery') {
        const offerData = [
            { offer: 'Control (Base Price)', aov: '$68', cr: '2.4%', margin: '58%' },
            { offer: 'Bundle & Save Tier', aov: '$112', cr: '3.8%', margin: '66%' },
            { offer: 'Subscription + Perks', aov: '$84', cr: '4.6%', margin: '71%' },
            { offer: 'Value Add-on at Cart', aov: '$94', cr: '4.1%', margin: '68%' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Consumer Offer & Packaging Experiment Matrix</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            AOV +65%
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Testing price sensitivity, bundle structures, and checkout value messaging to maximize average order value without sacrificing margins.
                    </p>

                    <div className="space-y-3 mb-6">
                        {offerData.map((o, idx) => (
                            <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-200">{o.offer}</span>
                                    <span className="text-xs font-black text-emerald-400">{o.cr} Conv.</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400">
                                    <span>Average Order Value: <strong>{o.aov}</strong></span>
                                    <span>Contribution: <strong>{o.margin}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-center text-xs text-slate-300">
                    Gross Contribution per Order: <strong>$66.70</strong> (vs. $39.40 baseline).
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 11. B2C-4: B2C Channel Discovery — D2C vs. Marketplace Acquisition
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-channel-discovery') {
        const b2cChannels = [
            { channel: 'Direct-to-Consumer', cac: '$24', roas: '4.8x', repeat: '38%', margin: '68%' },
            { channel: 'Marketplaces', cac: '$38', roas: '2.9x', repeat: '18%', margin: '48%' },
            { channel: 'Social Commerce', cac: '$22', roas: '4.2x', repeat: '31%', margin: '62%' },
            { channel: 'Affiliate & Creator', cac: '$18', roas: '5.2x', repeat: '34%', margin: '64%' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Network className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Consumer Acquisition Channel Unit Economics</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            ROAS 4.8x
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Comparing CAC, ROAS, and repeat purchase loyalty across D2C, social commerce, and third-party marketplaces.
                    </p>

                    <div className="space-y-3 mb-6">
                        {b2cChannels.map((c, idx) => (
                            <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-200">{c.channel}</span>
                                    <span className="text-xs font-black text-emerald-400">{c.roas} ROAS</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400">
                                    <span>CAC: <strong>{c.cac}</strong></span>
                                    <span>Repeat Rate: <strong>{c.repeat}</strong></span>
                                    <span>Margin: <strong>{c.margin}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-center text-xs text-slate-300">
                    Blended Repeat Purchase Rate: <strong>38% within 90 days</strong>.
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 12. B2C-5: B2C Competitive Discovery — Review Sentiment & Price Position
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-competitive-discovery') {
        const sentimentData = [
            { theme: 'Product Durability & Quality', gap: '+42% Positive vs Market', status: 'Core Moat' },
            { theme: 'Checkout & Shipping Speed', gap: '+28% Higher Rating', status: 'Advantage' },
            { theme: 'Packaging & Sustainability', gap: '+58% Consumer Preference', status: 'Differentiation' },
            { theme: 'Customer Support Experience', gap: '+34% NPS Lead', status: 'Retention' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Consumer Review Sentiment & Alternative Gaps</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Moat Analysis
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        NLP mining of 10,000+ public consumer reviews identifying competitor pain points and switching triggers.
                    </p>

                    <div className="space-y-3 mb-6">
                        {sentimentData.map((item, idx) => (
                            <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-slate-200">{item.theme}</div>
                                    <div className="text-[11px] text-emerald-400 font-semibold">{item.gap}</div>
                                </div>
                                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-slate-700 text-slate-200">
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-center text-xs text-slate-300">
                    Competitor Review Coverage: <strong>88% of target alternatives mapped</strong>.
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 13. B2C-6: B2C Customer Discovery — Behavioral Cohorts & LTV Timeline
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-customer-discovery') {
        const cohortData = [
            { cohort: 'High-Intent Enthusiasts', share: '24%', ltv: '$480', rfm: 'Tier 1' },
            { cohort: 'Seasonal Repeat Buyers', share: '32%', ltv: '$260', rfm: 'Tier 2' },
            { cohort: 'Deal & Promo Seekers', share: '28%', ltv: '$140', rfm: 'Tier 3' },
            { cohort: 'At-Risk / Lapsed Shoppers', share: '16%', ltv: '$95', rfm: 'Reactivation' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Consumer Behavioral Cohorts & LTV Distribution</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Ad Waste -60%
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        RFM behavioral segmentation separating high-LTV brand advocates from discount-dependent one-time shoppers.
                    </p>

                    <div className="space-y-3 mb-6">
                        {cohortData.map((c, idx) => (
                            <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-slate-200">{c.cohort}</div>
                                    <div className="text-[11px] text-slate-400">Share of Base: {c.share}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-black text-emerald-400">LTV: {c.ltv}</div>
                                    <span className="text-[10px] font-extrabold text-slate-400">{c.rfm}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-center text-xs text-slate-300">
                    High-LTV Cohort Repurchase Rate: <strong>68% within 60 days</strong>.
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // 14. B2C-7: B2C Product-Market Fit Discovery — Cart & Experience Funnel
    // ══════════════════════════════════════════════════════════════════════
    if (strategyId === 'b2c-product-market-fit-discovery') {
        const cartFunnel = [
            { step: 'Product Page Views', count: 120000, pct: '100%' },
            { step: 'Add to Cart Event', count: 28800, pct: '24.0%' },
            { step: 'Checkout Initiated', count: 18400, pct: '15.3%' },
            { step: 'Purchase Completed', count: 9800, pct: '8.1%' },
            { step: 'Repeat Purchase (60d)', count: 3720, pct: '3.1%' }
        ];

        return (
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Discovery-to-Cart Purchase & Retention Funnel</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Friction -35%
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                        Isolating checkout friction, payment drop-offs, and unboxing satisfaction to optimize repeat consumer buying loops.
                    </p>

                    <div className="space-y-3 mb-6">
                        {cartFunnel.map((s, idx) => (
                            <div key={idx} className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                                <div className="flex justify-between items-center mb-1 text-xs">
                                    <span className="font-semibold text-slate-200">{s.step}</span>
                                    <span className="font-black text-emerald-400">{s.count.toLocaleString()} ({s.pct})</span>
                                </div>
                                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: s.pct }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300">
                    Product Return Rate: <strong>1.8%</strong> (vs. 6.4% category benchmark).
                </div>
            </div>
        );
    }

    // Default fallback visual
    return (
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-center items-center text-center h-full">
            <Activity className="w-8 h-8 text-primary mb-3" />
            <h4 className="text-sm font-bold text-white mb-1">Analytical Telemetry Stack</h4>
            <p className="text-xs text-slate-400 max-w-xs">
                Strategy-specific telemetry calibrated to enterprise data and market signals.
            </p>
        </div>
    );
}
