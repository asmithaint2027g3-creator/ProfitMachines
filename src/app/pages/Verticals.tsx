import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
    Globe, Layout, Users, Workflow, TrendingUp,
    CheckCircle2, ArrowRight, Sparkles, Layers, Building2, Briefcase,
    Cpu, Building, Check, ChevronRight, ShoppingBag, Activity, Star
} from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Button } from '../components/ui/button';
import { Reveal } from '../components/ui/Reveal';
import { useLeadModal } from '../context/LeadModalContext';

const CHART_COLOR = '#2878B5';
const PIE_COLORS = ['#2878B5', '#38bdf8', '#60a5fa', '#93c5fd', '#bae6fd'];

const statCards = [
    { stat: '6+',   label: 'Industry Verticals Supported',  icon: Layers },
    { stat: '360\u00b0', label: 'Full-Funnel Digital Coverage',  icon: Globe },
    { stat: 'AI',   label: 'Powered Lead Intelligence',     icon: Activity },
    { stat: '100%', label: 'Workflow Customisable',         icon: Star },
];

const capabilityCards = [
    {
        title: 'Digital Presence',
        icon: Layout,
        bullets: [
            'Website and page visibility',
            'Digital engagement monitoring',
            'Content and channel presentation',
            'Performance insights',
        ],
    },
    {
        title: 'Lead Generation and Management',
        icon: Users,
        bullets: [
            'Lead capture from supported forms',
            'Lead source identification',
            'Inquiry organisation',
            'Follow-up workflow coordination',
        ],
    },
    {
        title: 'Workflow Automation',
        icon: Workflow,
        bullets: [
            'Repetitive task automation',
            'Lead-processing workflows',
            'Team task coordination',
            'Business tool integrations',
        ],
    },
    {
        title: 'Analytics and Reporting',
        icon: TrendingUp,
        bullets: [
            'Website engagement analysis',
            'Lead performance reporting',
            'Daily, weekly and monthly reports',
            'Business activity monitoring',
        ],
    },
];

interface VerticalStat { label: string; value: string; }
interface ChartDatum { [key: string]: string | number; }
interface VerticalItem {
    id: string;
    name: string;
    icon: any;
    tagline: string;
    intro: string;
    capabilities: string[];
    stats: VerticalStat[];
    chartType: 'bar' | 'radar' | 'area' | 'line' | 'pie';
    chartData: ChartDatum[];
    chartLabel: string;
}

const verticalsData: VerticalItem[] = [
    {
        id: 'saas',
        name: 'SaaS and Technology',
        icon: Cpu,
        tagline: 'High-velocity pipeline and product-led revenue for software companies.',
        intro: 'Digital growth and lead workflow support for software and technology businesses looking to scale qualified pipelines, reduce friction in onboarding, and improve funnel visibility across every acquisition channel.',
        capabilities: [
            'Automated lead qualification',
            'Product usage-based signals',
            'Multi-channel campaign tracking',
            'Churn-risk identification',
        ],
        stats: [
            { label: 'Pipeline Visibility',     value: '3x' },
            { label: 'Lead Response Time',      value: '-60%' },
            { label: 'Funnel Stages Tracked',   value: '8+' },
            { label: 'Integrations Supported',  value: '40+' },
        ],
        chartType: 'bar',
        chartLabel: 'Monthly Lead Pipeline Growth (Indexed)',
        chartData: [
            { month: 'Jan', leads: 40 },
            { month: 'Feb', leads: 58 },
            { month: 'Mar', leads: 72 },
            { month: 'Apr', leads: 65 },
            { month: 'May', leads: 89 },
            { month: 'Jun', leads: 110 },
            { month: 'Jul', leads: 130 },
        ],
    },
    {
        id: 'services',
        name: 'Professional Services',
        icon: Briefcase,
        tagline: 'Consultation coordination and high-trust lead qualification.',
        intro: 'Help service businesses organise client inquiries, coordinate consultations, and maintain structured follow-up workflows that build trust and close engagements faster across the entire client journey.',
        capabilities: [
            'Consultation intake automation',
            'Client relationship workflows',
            'Proposal status tracking',
            'Retainer renewal reminders',
        ],
        stats: [
            { label: 'Faster Intake Processing', value: '2x' },
            { label: 'Follow-up Consistency',    value: '95%' },
            { label: 'Avg. Lead-to-Client',      value: '14d' },
            { label: 'Workflow Automations',     value: '20+' },
        ],
        chartType: 'radar',
        chartLabel: 'Capability Coverage by Function',
        chartData: [
            { subject: 'Lead Capture', A: 90 },
            { subject: 'Follow-Up',    A: 85 },
            { subject: 'Scheduling',   A: 75 },
            { subject: 'Reporting',    A: 70 },
            { subject: 'Nurturing',    A: 80 },
            { subject: 'Analytics',    A: 65 },
        ],
    },
    {
        id: 'agencies',
        name: 'Marketing and Agencies',
        icon: Sparkles,
        tagline: 'Multi-client reporting automation and campaign workflows.',
        intro: 'Organise campaign workflows, lead tracking, and reporting for multiple clients simultaneously. Reduce manual effort and deliver consistent, data-driven results at scale across all managed accounts.',
        capabilities: [
            'Multi-client lead dashboards',
            'Automated campaign reports',
            'Attribution tracking',
            'Client performance scorecards',
        ],
        stats: [
            { label: 'Reporting Time Saved',     value: '-70%' },
            { label: 'Clients Managed per Team', value: '10+' },
            { label: 'Campaign Channels',        value: '6+' },
            { label: 'Report Frequency',         value: 'Daily' },
        ],
        chartType: 'line',
        chartLabel: 'Campaign Performance Trend (Score Index)',
        chartData: [
            { week: 'W1', score: 55 },
            { week: 'W2', score: 62 },
            { week: 'W3', score: 70 },
            { week: 'W4', score: 68 },
            { week: 'W5', score: 82 },
            { week: 'W6', score: 90 },
            { week: 'W7', score: 95 },
            { week: 'W8', score: 102 },
        ],
    },
    {
        id: 'smb',
        name: 'Small and Medium Businesses',
        icon: Building,
        tagline: 'Lean customer acquisition and structured lead tracking.',
        intro: 'Improve digital presence and organise customer acquisition processes for growing businesses. Capture more leads, reduce drop-offs, and understand what is driving enquiries across every channel.',
        capabilities: [
            'Centralised inquiry capture',
            'WhatsApp and email lead routing',
            'Digital footprint monitoring',
            'Monthly business activity report',
        ],
        stats: [
            { label: 'Leads Missed Before',  value: '40%' },
            { label: 'Setup Time',           value: '<1 Wk' },
            { label: 'Channels Covered',     value: '5+' },
            { label: 'Cost vs In-House',     value: '-50%' },
        ],
        chartType: 'pie',
        chartLabel: 'Lead Source Distribution',
        chartData: [
            { name: 'Website',  value: 35 },
            { name: 'WhatsApp', value: 25 },
            { name: 'Referral', value: 20 },
            { name: 'Social',   value: 15 },
            { name: 'Email',    value: 5  },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise Organizations',
        icon: Building2,
        tagline: 'Cross-departmental lead governance and unified reporting.',
        intro: 'Support structured workflows and reporting across teams and departments. Unify lead data, automate handoffs between sales and marketing, and give leadership real-time visibility across the whole organisation.',
        capabilities: [
            'Cross-department workflow sync',
            'Enterprise CRM integrations',
            'Role-based reporting access',
            'SLA-based lead routing',
        ],
        stats: [
            { label: 'Departments Connected', value: '10+' },
            { label: 'Data Sources Unified',  value: '15+' },
            { label: 'Reporting Latency',     value: 'Live' },
            { label: 'Compliance Ready',      value: '100%' },
        ],
        chartType: 'bar',
        chartLabel: 'Workflow Efficiency by Department (Score)',
        chartData: [
            { dept: 'Sales',     score: 88 },
            { dept: 'Marketing', score: 92 },
            { dept: 'Support',   score: 75 },
            { dept: 'Ops',       score: 80 },
            { dept: 'Finance',   score: 70 },
        ],
    },
    {
        id: 'retail',
        name: 'E-commerce and Retail',
        icon: ShoppingBag,
        tagline: 'Multi-channel inquiry routing and digital engagement tracking.',
        intro: 'Organise digital inquiries and understand customer engagement across channels. Track which campaigns bring buyers, automate follow-ups, and improve conversion from browse to purchase at every touchpoint.',
        capabilities: [
            'Cart abandonment workflows',
            'Product interest lead scoring',
            'Multi-channel inquiry routing',
            'Seasonal campaign analytics',
        ],
        stats: [
            { label: 'Channels Tracked',         value: '8+' },
            { label: 'Avg. Cart Recovery',       value: '22%' },
            { label: 'Lead-to-Sale Time',        value: '-35%' },
            { label: 'Campaign ROI Visibility',  value: '100%' },
        ],
        chartType: 'area',
        chartLabel: 'Digital Engagement Trend (Monthly Sessions)',
        chartData: [
            { month: 'Jan', sessions: 3200 },
            { month: 'Feb', sessions: 3800 },
            { month: 'Mar', sessions: 4500 },
            { month: 'Apr', sessions: 4200 },
            { month: 'May', sessions: 5100 },
            { month: 'Jun', sessions: 6200 },
            { month: 'Jul', sessions: 7400 },
        ],
    },
];




/* â”€â”€â”€ Chart renderer â”€â”€â”€ */
function VerticalChart({ vertical }: { vertical: VerticalItem }) {
    const { chartType, chartData, chartLabel } = vertical;
    const k0 = Object.keys(chartData[0])[0];
    const k1 = Object.keys(chartData[0])[1];
    return (
        <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-3 font-mono">
                {chartLabel}
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4" style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey={k0} tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Bar dataKey={k1} fill={CHART_COLOR} radius={[6, 6, 0, 0]} />
                        </BarChart>
                    ) : chartType === 'radar' ? (
                        <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Coverage" dataKey="A" stroke={CHART_COLOR} fill={CHART_COLOR} fillOpacity={0.25} strokeWidth={2} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                        </RadarChart>
                    ) : chartType === 'line' ? (
                        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey={k0} tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Line type="monotone" dataKey={k1} stroke={CHART_COLOR} strokeWidth={2.5} dot={{ fill: CHART_COLOR, r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    ) : chartType === 'area' ? (
                        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey={k0} tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Area type="monotone" dataKey={k1} stroke={CHART_COLOR} strokeWidth={2.5} fill="url(#areaGrad)" />
                        </AreaChart>
                    ) : (
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={88} paddingAngle={3} dataKey="value">
                                {chartData.map((_entry: ChartDatum, index: number) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}

/* â”€â”€â”€ Page component â”€â”€â”€ */
export default function Verticals() {
    const [selectedId, setSelectedId] = useState<string>('saas');
    const { openLongForm } = useLeadModal();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const q = searchParams.get('industry') || location.hash.replace('#', '');
        if (q && verticalsData.some(v => v.id === q)) {
            setSelectedId(q);
            setTimeout(() => {
                document.getElementById('industry-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }, [location.search, location.hash]);

    const selected = verticalsData.find(v => v.id === selectedId) || verticalsData[0];
    const ActiveIcon = selected.icon;

    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* â”€â”€ HERO â”€â”€ */}
            <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-[#070D18] border-b border-slate-800/80 relative overflow-hidden text-white">
                {/* Top ambient highlight line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent pointer-events-none" />

                {/* Soft ambient dark mesh gradient and glow orbs */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(40,120,181,0.28),transparent)] pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-gradient-to-r from-sky-500/20 via-[#2878B5]/25 to-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[110px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* High-tech concentric sector framework rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[840px] pointer-events-none opacity-40">
                    <div className="absolute inset-[8%] rounded-full border border-sky-400/10" />
                    <div className="absolute inset-[22%] rounded-full border border-dashed border-sky-400/20 animate-[spin_180s_linear_infinite]" />
                    <div className="absolute inset-[36%] rounded-full border border-sky-400/10" />
                    <div className="absolute inset-[50%] rounded-full border border-sky-400/20" />
                </div>

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

                {/* Subtle dot matrix texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.25]"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.6) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                        maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 25%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 25%, transparent 100%)',
                    }}
                />

                {/* Bottom subtle accent line */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-sky-950/50 hover:border-sky-400/60 transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                            </span>
                            <Layers className="w-3.5 h-3.5 text-sky-400" />
                            <span>Sector Frameworks</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
                            Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#38bdf8] to-blue-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">Verticals</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
                            Explore how ProfitMachines strengthens digital presence, organises leads,
                            streamlines workflows and delivers actionable insights — tailored for your industry.
                        </p>

                        {/* Interactive Vertical Quick-Chips */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                            {verticalsData.map((v) => {
                                const isCur = v.id === selectedId;
                                return (
                                    <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedId(v.id);
                                            document.getElementById('industry-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                                            isCur
                                                ? 'bg-gradient-to-r from-[#1E6297] to-[#2878B5] text-white border-sky-400 shadow-md shadow-sky-900/40 ring-1 ring-sky-400/40'
                                                : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80 hover:border-sky-500/50 backdrop-blur-sm'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${isCur ? 'bg-sky-300 animate-pulse' : 'bg-sky-400/60'}`} />
                                        <span>{v.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-20">

                {/* â”€â”€ STAT CARDS â”€â”€ */}
                <section>
                    <Reveal width="100%">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                            {statCards.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#2878B5]/40 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-[#2878B5] transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-[#2878B5] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                                            {s.stat}
                                        </p>
                                        <p className="text-sm text-slate-500 font-medium leading-snug mt-1">
                                            {s.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </section>

                {/* â”€â”€ CAPABILITY CARDS â”€â”€ */}
                <section>
                    <Reveal width="100%">
                        <div className="text-center mb-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2 font-mono">Functional Capabilities</p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Modular Capabilities for Every Industry
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {capabilityCards.map((cap, idx) => {
                                const CapIcon = cap.icon;
                                return (
                                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#2878B5]/40 hover:shadow-md transition-all duration-300 group flex flex-col">
                                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-[#2878B5] transition-colors">
                                                <CapIcon className="w-5 h-5 text-[#2878B5] group-hover:text-white transition-colors" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-900 leading-snug">{cap.title}</h3>
                                        </div>
                                        <ul className="space-y-2.5 flex-1">
                                            {cap.bullets.map((b, bi) => (
                                                <li key={bi} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                                                    <CheckCircle2 className="w-4 h-4 text-[#2878B5] shrink-0 mt-0.5" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </section>

                {/* â”€â”€ INTERACTIVE INDUSTRY EXPLORER â”€â”€ */}
                <section id="industry-explorer" className="scroll-mt-24">
                    <Reveal width="100%">
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2 font-mono">Interactive Explorer</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                                Tailored Sector Frameworks
                            </h2>
                            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
                                Select an industry to explore targeted capabilities, performance indicators and visual analytics.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                            {/* LEFT: vertical list â€” full blue bg on active (ISI Security style) */}
                            <div className="lg:col-span-4 flex flex-col gap-2" role="tablist" aria-label="Industry Verticals">
                                {verticalsData.map((v) => {
                                    const Icon = v.icon;
                                    const active = v.id === selectedId;
                                    return (
                                        <button
                                            key={v.id}
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() => setSelectedId(v.id)}
                                            className={`w-full text-left px-5 py-4 rounded-xl border font-semibold text-base transition-all duration-200 flex items-center gap-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2878B5] ${
                                                active
                                                    ? 'bg-[#2878B5] border-[#2878B5] text-white shadow-md shadow-blue-900/15'
                                                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#2878B5]/50 hover:bg-sky-50/60'
                                            }`}
                                        >
                                            <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'text-[#2878B5]'}`} />
                                            <span className="truncate">{v.name}</span>
                                            {active && <ChevronRight className="w-4 h-4 ml-auto shrink-0 text-white/70" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* RIGHT: detail panel */}
                            <div className="lg:col-span-8">
                                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">

                                    {/* Header */}
                                    <div className="flex items-center gap-4 pb-5 border-b border-slate-100 mb-5">
                                        <div className="w-12 h-12 rounded-xl bg-[#2878B5] flex items-center justify-center shrink-0">
                                            <ActiveIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#2878B5] uppercase tracking-wider font-mono">Industry Profile</p>
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{selected.name}</h3>
                                        </div>
                                    </div>

                                    {/* Intro */}
                                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">{selected.intro}</p>

                                    {/* Mini stat chips */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                        {selected.stats.map((s, i) => (
                                            <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                                                <p className="text-xl sm:text-2xl font-extrabold text-[#2878B5] tracking-tight leading-none">{s.value}</p>
                                                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Key capabilities */}
                                    <div className="mb-2">
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-3 font-mono">Key Capabilities</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {selected.capabilities.map((cap, ci) => (
                                                <div key={ci} className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-50/70 border border-sky-100 text-slate-800 text-sm font-medium">
                                                    <Check className="w-4 h-4 text-[#2878B5] shrink-0 mt-0.5" />
                                                    <span>{cap}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Chart â€” unique per industry */}
                                    <VerticalChart vertical={selected} />

                                    {/* CTAs */}
                                    <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                        <Button
                                            onClick={() => openLongForm({
                                                defaultService: `Vertical: ${selected.name}`,
                                                defaultIndustry: selected.name
                                            })}
                                            className="bg-[#2878B5] hover:bg-[#1E6297] text-white px-8 py-5 h-auto text-base font-bold rounded-xl shadow-md shadow-blue-900/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <span>Get in Touch</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                        <Link
                                            to="/offerings"
                                            className="inline-flex items-center justify-center gap-2 border-2 border-[#2878B5] text-[#2878B5] hover:bg-[#2878B5] hover:text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all"
                                        >
                                            <span>Explore Offerings</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>
            </div>

            {/* â”€â”€ CTA FOOTER BAND â”€â”€ */}
            <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[800px] h-[500px] bg-[#2878B5]/15 rounded-full blur-[140px] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Take the Next Step</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
                            Ready to Grow Your Industry Vertical?
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                            Talk to our experts and discover how ProfitMachines can be configured for your specific sector needs.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                onClick={() => openLongForm({
                                    defaultService: 'Industry Verticals Consultation',
                                    title: 'Talk to Industry Verticals Experts'
                                })}
                                className="w-full sm:w-auto bg-[#2878B5] hover:bg-[#1E6297] text-white px-9 py-6 h-auto text-base font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Talk to Experts</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Link
                                to="/offerings"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-9 py-3.5 rounded-xl font-bold text-base transition-all"
                            >
                                <span>Explore Offerings</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

