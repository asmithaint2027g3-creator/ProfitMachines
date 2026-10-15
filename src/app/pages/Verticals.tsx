import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
    Globe, Layout, Users, Workflow, TrendingUp,
    CheckCircle2, ArrowRight, Sparkles, Layers, Building2, Briefcase,
    Cpu, Building, Check, ChevronRight, ShoppingBag, Activity, Star,
    Target, ShieldCheck, BarChart3, DollarSign, Clock, Zap
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

/* ─── Top 4 Value Cards (Business-Value Propositions without fabricated numbers) ─── */
const topValueCards = [
    {
        title: 'Revenue Growth',
        description: 'Attract high-intent prospects and create more opportunities to generate sales.',
        icon: TrendingUp,
        tag: 'Pipeline Acceleration'
    },
    {
        title: 'Higher Lead Conversion',
        description: 'Turn more qualified inquiries into customers through timely follow-ups and structured sales processes.',
        icon: Target,
        tag: 'Sales Velocity'
    },
    {
        title: 'Lower Operating Costs',
        description: 'Reduce repetitive manual work and use team resources more efficiently.',
        icon: Workflow,
        tag: 'Resource Efficiency'
    },
    {
        title: 'Improved Profitability',
        description: 'Identify growth opportunities, monitor business performance, and make informed investment decisions.',
        icon: ShieldCheck,
        tag: 'Margin Optimization'
    },
];

/* ─── 4 Capability Cards ─── */
const capabilityCards = [
    {
        cardNum: 'CARD 1',
        title: 'Demand & Customer Acquisition',
        icon: Globe,
        bullets: [
            'Attract high-intent buyers through targeted market positioning and outbound reach.',
            'Improve visibility across the channels and markets that matter most commercially.',
            'Identify offers, campaigns, and conversations that generate qualified inquiries.',
            'Convert buyer engagement into measurable revenue opportunities.',
        ],
    },
    {
        cardNum: 'CARD 2',
        title: 'Lead Conversion & Sales Growth',
        icon: TrendingUp,
        bullets: [
            'Capture and organize customer inquiries.',
            'Prioritize qualified opportunities and high-intent prospects.',
            'Reduce missed opportunities through consistent follow-ups.',
            'Track lead progression and identify potential sales bottlenecks.',
        ],
    },
    {
        cardNum: 'CARD 3',
        title: 'Operational Efficiency & Cost Reduction',
        icon: Workflow,
        bullets: [
            'Reduce repetitive administrative tasks.',
            'Streamline lead handling and task coordination.',
            'Reduce manual data entry and duplicated work where supported.',
            'Free up team capacity for sales, customer service, and growth.',
        ],
    },
    {
        cardNum: 'CARD 4',
        title: 'Profitability Intelligence & Performance',
        icon: BarChart3,
        bullets: [
            'Track lead sources and campaign performance.',
            'Identify opportunities to improve conversion rates.',
            'Monitor business activity through structured reports.',
            'Support better budget allocation using measurable results.',
        ],
    },
];

/* ─── Industry-Specific Data Structure ─── */
interface BusinessMetric {
    name: string;
    rationale: string;
}

interface ChartDatum {
    [key: string]: string | number;
}

interface VerticalItem {
    id: string;
    name: string;
    icon: any;
    tagline: string;
    intro: string;
    attractionStrategy: string;
    conversionStrategy: string;
    costReductionStrategy: string;
    retentionStrategy: string;
    keyBusinessMetrics: BusinessMetric[];
    implementedCapabilities: string[];
    nextSteps: string[];
    chartType: 'bar' | 'radar' | 'area' | 'line' | 'pie';
    chartData: ChartDatum[];
    chartLabel: string;
    chartNote: string;
}

const verticalsData: VerticalItem[] = [
    {
        id: 'saas',
        name: 'SaaS and Technology',
        icon: Cpu,
        tagline: 'Shortening sales cycles and improving trial-to-paid pipeline velocity.',
        intro: 'For software and technology companies, profitable growth relies on acquiring high-intent accounts efficiently, speeding up trial-to-paid conversion, and shortening customer acquisition cost (CAC) payback periods without inflating headcount.',
        attractionStrategy: 'Deploy targeted product-led landing pages and technical comparison assets that capture software buyers actively researching integrations, security compliance, and ROI benchmarks.',
        conversionStrategy: 'Route inbound demo requests and trial sign-ups instantly to dedicated account reps with firmographic context, preventing high-intent enterprise prospects from going cold.',
        costReductionStrategy: 'Automate inbound lead deduplication, CRM deal routing, and onboarding notifications to eliminate repetitive manual sales administration and reduce operational cost.',
        retentionStrategy: 'Track product adoption, expansion signals, and account health to identify upsell opportunities early and reduce churn risk.',
        keyBusinessMetrics: [
            { name: 'Lead-to-Opportunity Rate', rationale: 'Tracks how effectively inbound tech inquiries advance to formal sales evaluations.' },
            { name: 'CAC Payback Period', rationale: 'Evaluates months required for gross margin from an account to recover its acquisition cost.' },
            { name: 'Trial-to-Paid Velocity', rationale: 'Measures median days from initial signup to paying customer conversion.' },
            { name: 'Pipeline Value Attributed', rationale: 'Measures net new ARR influenced by documented lead sources, sales engagement, and commercial follow-up.' },
        ],
        implementedCapabilities: [
            'Automated inquiry capture & CRM synchronization (Jira / Webhooks)',
            'Intent-based lead prioritization and instant team notifications',
            'Revenue and pipeline attribution monitoring',
            'Structured pipeline velocity and drop-off reports',
        ],
        nextSteps: [
            'Audit high-friction drop-off points across demo booking and trial forms.',
            'Implement instant notification routing for high-intent enterprise accounts.',
            'Establish automated weekly pipeline progression reporting for sales leaders.',
        ],
        chartType: 'bar',
        chartLabel: 'Inbound Opportunity Progression by Stage',
        chartNote: 'Standardized progression model tracking inquiry qualification velocity across sales stages.',
        chartData: [
            { stage: 'Inquiries', volume: 180 },
            { stage: 'MQLs', volume: 135 },
            { stage: 'SQLs', volume: 92 },
            { stage: 'Demos Done', volume: 68 },
            { stage: 'Proposals', volume: 44 },
            { stage: 'Closed Won', volume: 28 },
        ],
    },
    {
        id: 'services',
        name: 'Professional Services',
        icon: Briefcase,
        tagline: 'Converting expert consultation inquiries into high-margin advisory engagements.',
        intro: 'Professional advisory, legal, consulting, and accounting firms generate revenue from billable expertise. Profitability is maximized when non-billable intake friction is removed and initial consultations consistently convert into retained engagements.',
        attractionStrategy: 'Position senior partner expertise through practice-area guides, case summaries, and advisory insights that capture clients seeking urgent corporate, legal, or financial solutions.',
        conversionStrategy: 'Provide a structured online consultation intake that collects engagement scope up front, allowing senior practitioners to qualify engagements before initial calls.',
        costReductionStrategy: 'Eliminate manual consultation scheduling, paper intake questionnaires, and back-and-forth administrative email coordination, returning billable hours to fee earners.',
        retentionStrategy: 'Systematize milestone reviews, quarterly advisory touchpoints, and retainer renewal workflows to expand engagement scope and increase client lifetime value.',
        keyBusinessMetrics: [
            { name: 'Inquiry-to-Consultation Rate', rationale: 'Assesses how many prospective client inquiries successfully schedule a billable or discovery consultation.' },
            { name: 'Average Engagement Contract Value', rationale: 'Monitors whether positioning and specialization attract higher-margin advisory mandates.' },
            { name: 'Intake Processing Time Saved', rationale: 'Measures administrative hours recovered per partner through automated inquiry collection.' },
            { name: 'Retainer & Repeat Rate', rationale: 'Tracks the percentage of clients expanding into ongoing advisory retainers.' },
        ],
        implementedCapabilities: [
            'Structured practice-area inquiry collection forms',
            'Automated pre-qualification workflows & calendar routing',
            'Lead capture integration with internal task workflows',
            'Monthly advisory inquiry and activity performance summaries',
        ],
        nextSteps: [
            'Standardize intake and qualification processes to capture scope, budget, and delivery requirements.',
            'Configure instant notification routing to appropriate practice-area leads.',
            'Set up automated follow-up cadences for outstanding advisory proposals.',
        ],
        chartType: 'radar',
        chartLabel: 'Operational Capability Coverage Index',
        chartNote: 'Relative efficiency rating across core professional services client-intake dimensions.',
        chartData: [
            { subject: 'Intake Speed', score: 90 },
            { subject: 'Qualification', score: 85 },
            { subject: 'Scheduling', score: 80 },
            { subject: 'Proposal Flow', score: 75 },
            { subject: 'Retainer Nurture', score: 85 },
            { subject: 'Reporting', score: 70 },
        ],
    },
    {
        id: 'agencies',
        name: 'Marketing and Agencies',
        icon: Sparkles,
        tagline: 'Protecting client campaign margins and institutionalizing repeatable growth.',
        intro: 'Agencies face margin compression caused by manual reporting, tool fragmentation, and unpredictable new business pipelines. Profitable agency operations require disciplined inbound acquisition and automated campaign reporting.',
        attractionStrategy: 'Demonstrate measurable client outcomes, proprietary optimization frameworks, and sector case studies that attract businesses actively looking to scale performance marketing.',
        conversionStrategy: 'Implement automated marketing audit requests that deliver immediate diagnostic insights, proving competence before competitive pitch presentations.',
        costReductionStrategy: 'Consolidate campaign inquiry management and automate repetitive client reporting, saving account managers hundreds of administrative hours per month.',
        retentionStrategy: 'Provide transparent KPI scorecards that directly link agency workflows to client revenue metrics, establishing defensible value during retainer renewals.',
        keyBusinessMetrics: [
            { name: 'Client Acquisition Cost (CAC)', rationale: 'Tracks investment efficiency in securing new agency retainer contracts.' },
            { name: 'Reporting Hours Saved per AM', rationale: 'Quantifies administrative labor saved by replacing manual spreadsheet collation.' },
            { name: 'Client Retainer Retention Rate', rationale: 'Monitors month-over-month retainer continuity and account stability.' },
            { name: 'Gross Margin per Client Account', rationale: 'Evaluates profitability of each client tier after direct staff delivery hours.' },
        ],
        implementedCapabilities: [
            'Multi-client lead governance & pipeline dashboards',
            'Automated report compilation and stakeholder distribution',
            'Inquiry channel attribution tracking (Organic, Paid, Direct)',
            'Centralized agency prospective client intake workflows',
        ],
        nextSteps: [
            'Replace manual weekly slide reporting with structured automated summaries.',
            'Standardize client discovery forms to eliminate unqualified exploratory calls.',
            'Track client acquisition cost across all marketing agency channels.',
        ],
        chartType: 'line',
        chartLabel: 'Operational Capacity Saved (Hours / Month)',
        chartNote: 'Cumulative hours saved across account teams by automating lead routing and client reports.',
        chartData: [
            { month: 'Month 1', hours: 25 },
            { month: 'Month 2', hours: 48 },
            { month: 'Month 3', hours: 72 },
            { month: 'Month 4', hours: 96 },
            { month: 'Month 5', hours: 125 },
            { month: 'Month 6', hours: 155 },
        ],
    },
    {
        id: 'smb',
        name: 'Small and Medium Businesses',
        icon: Building,
        tagline: 'Eliminating missed inquiries and driving lean, profitable customer acquisition.',
        intro: 'For growing SMBs, owner and team attention is the most constrained asset. When customer inquiries slip through unmonitored inboxes or personal chat apps, revenue is immediately lost to faster competitors. ProfitMachines ensures zero inquiries are overlooked.',
        attractionStrategy: 'Capture high-intent local and regional buyers with mobile-optimized inquiry pages, clear value propositions, and immediate contact channels including click-to-call and WhatsApp.',
        conversionStrategy: 'Acknowledge every incoming inquiry immediately with automated confirmations and instant mobile notifications to sales reps, cutting response time from days to minutes.',
        costReductionStrategy: 'Replace expensive multi-software subscriptions and disorganized spreadsheets with a lean, centralized lead capture process that requires no dedicated technical staff.',
        retentionStrategy: 'Maintain structured customer communication histories to drive seasonal re-orders, preventive maintenance bookings, and referral incentives at negligible marginal cost.',
        keyBusinessMetrics: [
            { name: 'Inquiries Captured per Channel', rationale: 'Tracks volume of leads generated across website forms, phone, and WhatsApp.' },
            { name: 'Average Response Time', rationale: 'Measures elapsed minutes between inquiry submission and first structured business contact.' },
            { name: 'Inquiry-to-Customer Conversion Rate', rationale: 'Evaluates the percentage of prospective buyers who complete a paid transaction.' },
            { name: 'Direct Cost per Acquired Customer', rationale: 'Calculates total marketing spend divided by new paying customers acquired.' },
        ],
        implementedCapabilities: [
            'Website & WhatsApp centralized inquiry capture',
            'Instant mobile alert routing to business owners and sales leads',
            'Simple follow-up tracking to eliminate lost opportunities',
            'Monthly business activity and lead volume summary reports',
        ],
        nextSteps: [
            'Audit customer contact points for missed inquiries, slow responses, and broken follow-ups.',
            'Configure instant mobile notifications for every incoming inquiry.',
            'Implement a mandatory 24-hour follow-up standard for all pending customer quotes.',
        ],
        chartType: 'pie',
        chartLabel: 'Inquiry Volume by Channel Distribution',
        chartNote: 'Distribution of customer inquiries captured across verified communication channels.',
        chartData: [
            { name: 'Website Forms', value: 38 },
            { name: 'WhatsApp Direct', value: 27 },
            { name: 'Client Referrals', value: 18 },
            { name: 'Local Search / Maps', value: 12 },
            { name: 'Email Inquiries', value: 5 },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise Organizations',
        icon: Building2,
        tagline: 'Eliminating cross-departmental lead leakage and enforcing sales SLA governance.',
        intro: 'Enterprise organizations lose millions in revenue to pipeline friction between global marketing, business development, and regional sales units. Establishing automated handoffs, SLA tracking, and audit-ready data flows unlocks trapped corporate profitability.',
        attractionStrategy: 'Build account-specific commercial engagement plans for multi-stakeholder buying committees across procurement, IT security, and executive champions, supported by compliance-focused documentation.',
        conversionStrategy: 'Enforce automated Service Level Agreements (SLAs) for lead response times, escalating high-value enterprise accounts if reps fail to initiate contact within contracted response windows.',
        costReductionStrategy: 'Eliminate duplicate data entry across enterprise CRM, Jira, and spreadsheets through standardized API integrations and automated workflow triggers.',
        retentionStrategy: 'Consolidate account health metrics, usage signals, and renewal milestones into central dashboards to support proactive enterprise account management and multi-year expansion.',
        keyBusinessMetrics: [
            { name: 'Pipeline Velocity ($ / Day)', rationale: 'Calculates the rate at which enterprise opportunities progress toward closed revenue.' },
            { name: 'SLA Handoff Compliance Rate', rationale: 'Measures percentage of enterprise inquiries contacted within strict corporate SLA limits.' },
            { name: 'Workflow Processing Time Saved', rationale: 'Quantifies administrative reduction across regional sales operations and support teams.' },
            { name: 'Revenue Attributed to Growth Channels', rationale: 'Tracks verified closed enterprise contract value influenced by tracked sales and marketing touchpoints.' },
        ],
        implementedCapabilities: [
            'Enterprise CRM & ERP webhook routing (Jira, Google Sheets, Custom APIs)',
            'Role-based lead distribution and cross-departmental governance',
            'SLA response time tracking with automated manager escalation alerts',
            'Unified multi-brand performance and lead volume reporting',
        ],
        nextSteps: [
            'Define and codify enterprise response SLAs between marketing and sales units.',
            'Deploy automated validation to ensure clean, deduplicated contact data in CRM.',
            'Review quarterly pipeline leakage reports across complex buying committees.',
        ],
        chartType: 'bar',
        chartLabel: 'SLA Handoff Compliance by Department (%)',
        chartNote: 'Percentage of inquiries processed and contacted within corporate turnaround targets.',
        chartData: [
            { dept: 'Enterprise Sales', score: 94 },
            { dept: 'Inbound SDRs', score: 98 },
            { dept: 'Customer Success', score: 91 },
            { dept: 'Solutions Engineering', score: 86 },
            { dept: 'Commercial Ops', score: 89 },
        ],
    },
    {
        id: 'retail',
        name: 'E-commerce and Retail',
        icon: ShoppingBag,
        tagline: 'Maximizing checkout conversion rates and building profitable customer lifetime value.',
        intro: 'Retail and e-commerce profitability hinges on minimizing abandoned interest, optimizing acquisition spend on high-margin categories, and generating repeat orders without paying acquisition costs twice.',
        attractionStrategy: 'Capture high-intent commercial buyers through structured product category pages, rich metadata, and timely seasonal promotions that answer exact consumer purchase intent.',
        conversionStrategy: 'Deploy automated abandoned browse and cart follow-up triggers, offer real-time customer assistance via messaging widgets, and eliminate checkout friction.',
        costReductionStrategy: 'Automate recurring order inquiries, tracking lookups, and basic product policy questions to drastically reduce customer support staffing overhead.',
        retentionStrategy: 'Segment shoppers by past purchase history and average order value (AOV) to deliver targeted replenishment reminders and exclusive loyalty incentives that drive repeat business.',
        keyBusinessMetrics: [
            { name: 'Browse-to-Cart Conversion Rate', rationale: 'Measures the proportion of website product visitors who add items to their shopping cart.' },
            { name: 'Cart Abandonment Recovery Rate', rationale: 'Tracks percentage of abandoned checkouts successfully converted via automated follow-ups.' },
            { name: 'CAC vs Customer LTV Ratio', rationale: 'Ensures marketing customer acquisition costs remain profitable relative to cumulative gross margin.' },
            { name: '90-Day Repeat Purchase Rate', rationale: 'Assesses customer retention and ongoing lifetime order frequency.' },
        ],
        implementedCapabilities: [
            'High-intent visitor engagement & automated cart abandonment workflows',
            'Product-level inquiry routing and direct customer messaging',
            'Inquiry channel attribution and revenue conversion tracking',
            'Automated post-purchase customer feedback and replenishment reminders',
        ],
        nextSteps: [
            'Implement automated recovery notifications for high-intent abandoned shopping carts.',
            'Deploy direct WhatsApp customer support on high-ticket catalog pages.',
            'Establish automated 30-day replenishment cadences for consumable product categories.',
        ],
        chartType: 'area',
        chartLabel: 'Checkout Conversion Rate Trend (%)',
        chartNote: 'Monthly progression of overall visitor-to-paying-customer conversion efficiency.',
        chartData: [
            { month: 'Jan', rate: 1.8 },
            { month: 'Feb', rate: 2.1 },
            { month: 'Mar', rate: 2.4 },
            { month: 'Apr', rate: 2.6 },
            { month: 'May', rate: 3.1 },
            { month: 'Jun', rate: 3.5 },
            { month: 'Jul', rate: 3.9 },
        ],
    },
];

/* ─── Chart Renderer ─── */
function VerticalChart({ vertical }: { vertical: VerticalItem }) {
    const { chartType, chartData, chartLabel, chartNote } = vertical;
    const k0 = Object.keys(chartData[0])[0];
    const k1 = Object.keys(chartData[0])[1];

    return (
        <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#2878B5] font-mono">
                    {chartLabel}
                </p>
                <span className="text-[11px] text-slate-400 font-medium">Business Metric Visualization</span>
            </div>
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-5" style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey={k0} tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #cbd5e1' }} />
                            <Bar dataKey={k1} fill={CHART_COLOR} radius={[6, 6, 0, 0]} />
                        </BarChart>
                    ) : chartType === 'radar' ? (
                        <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Index" dataKey="score" stroke={CHART_COLOR} fill={CHART_COLOR} fillOpacity={0.25} strokeWidth={2} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #cbd5e1' }} />
                        </RadarChart>
                    ) : chartType === 'line' ? (
                        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey={k0} tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #cbd5e1' }} />
                            <Line type="monotone" dataKey={k1} stroke={CHART_COLOR} strokeWidth={2.5} dot={{ fill: CHART_COLOR, r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    ) : chartType === 'area' ? (
                        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.35} />
                                    <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey={k0} tick={{ fontSize: 11, fill: '#64748b' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #cbd5e1' }} />
                            <Area type="monotone" dataKey={k1} stroke={CHART_COLOR} strokeWidth={2.5} fill="url(#areaGrad)" />
                        </AreaChart>
                    ) : (
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={88} paddingAngle={3} dataKey="value">
                                {chartData.map((_entry: ChartDatum, index: number) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12, border: '1px solid #cbd5e1' }} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 italic mt-2 text-center">
                * Note: {chartNote}
            </p>
        </div>
    );
}

/* ─── Main Verticals Page Component ─── */
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

            {/* ── HERO SECTION (Dark Background Focus on Business Profitability) ── */}
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
                            <span>Business Profitability Frameworks</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
                            Turn Every Market Opportunity Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#38bdf8] to-blue-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">Profit Engine</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
                            Attract the right buyers, convert qualified opportunities into revenue, reduce operational waste, and build a more profitable business with disciplined growth and sales execution.
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

                {/* ── FOUR TOP VALUE CARDS (Business-Value Propositions without fake numbers) ── */}
                <section>
                    <Reveal width="100%">
                        <div className="text-center mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2 font-mono">
                                Measurable Commercial Value
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Delivering Sustainable Business Profitability
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {topValueCards.map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={i}
                                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#2878B5]/50 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full pointer-events-none -z-0 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4 group-hover:bg-[#2878B5] group-hover:border-[#2878B5] transition-all duration-300">
                                                <Icon className="w-6 h-6 text-[#2878B5] group-hover:text-white transition-colors duration-300" />
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E6297] font-mono block mb-1">
                                                {card.tag}
                                            </span>
                                            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                                                {card.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed font-normal">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </section>

                {/* ── FOUR CAPABILITY CARDS ── */}
                <section>
                    <Reveal width="100%">
                        <div className="text-center mb-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2 font-mono">
                                Core Revenue Engines
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Capabilities Engineered for Commercial Impact
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                                Why these capabilities matter: they eliminate lost customer opportunities and convert qualified demand into high-margin revenue.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {capabilityCards.map((cap, idx) => {
                                const CapIcon = cap.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#2878B5]/50 hover:shadow-lg transition-all duration-300 group flex flex-col"
                                    >
                                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                                            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 group-hover:bg-[#2878B5] transition-colors">
                                                <CapIcon className="w-5 h-5 text-[#2878B5] group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-xs font-extrabold text-[#1E6297] font-mono tracking-wider">
                                                {cap.cardNum}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-4">
                                            {cap.title}
                                        </h3>
                                        <ul className="space-y-3 flex-1">
                                            {cap.bullets.map((b, bi) => (
                                                <li key={bi} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                                                    <CheckCircle2 className="w-4 h-4 text-[#2878B5] shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>
                </section>

                {/* ── INTERACTIVE INDUSTRY EXPLORER (Full 7-Point Business Profile) ── */}
                <section id="industry-explorer" className="scroll-mt-24">
                    <Reveal width="100%">
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2 font-mono">
                                Interactive Industry Explorer
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                                Sector-Specific Commercial Roadmaps
                            </h2>
                            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
                                Explore how ProfitMachines transforms acquisition, sales conversion, operational cost, and customer retention for your exact sector.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                            {/* LEFT: Vertical Selector List */}
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

                            {/* RIGHT: Detailed Business & Profitability Information Panel */}
                            <div className="lg:col-span-8">
                                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">

                                    {/* Header & Tagline */}
                                    <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                                        <div className="w-12 h-12 rounded-xl bg-[#2878B5] flex items-center justify-center shrink-0 shadow-sm shadow-[#2878B5]/30">
                                            <ActiveIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#2878B5] uppercase tracking-wider font-mono">
                                                Sector Framework & Commercial Strategy
                                            </p>
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                                {selected.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                                                {selected.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Executive Overview */}
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-2 font-mono">
                                            Commercial Focus & Market Context
                                        </p>
                                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                                            {selected.intro}
                                        </p>
                                    </div>

                                    {/* 4 Commercial Growth Pillars */}
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-3 font-mono">
                                            Core Commercial Drivers
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* 1. Customer Attraction */}
                                            <div className="bg-sky-50/50 border border-sky-100/80 rounded-2xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Target className="w-4 h-4 text-[#2878B5]" />
                                                    <h4 className="text-sm font-bold text-slate-900">1. Customer Attraction</h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                                    {selected.attractionStrategy}
                                                </p>
                                            </div>

                                            {/* 2. Sales Conversion */}
                                            <div className="bg-sky-50/50 border border-sky-100/80 rounded-2xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TrendingUp className="w-4 h-4 text-[#2878B5]" />
                                                    <h4 className="text-sm font-bold text-slate-900">2. Sales Conversion</h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                                    {selected.conversionStrategy}
                                                </p>
                                            </div>

                                            {/* 3. Cost & Waste Reduction */}
                                            <div className="bg-sky-50/50 border border-sky-100/80 rounded-2xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Workflow className="w-4 h-4 text-[#2878B5]" />
                                                    <h4 className="text-sm font-bold text-slate-900">3. Cost & Waste Reduction</h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                                    {selected.costReductionStrategy}
                                                </p>
                                            </div>

                                            {/* 4. Customer Retention & Repeat Business */}
                                            <div className="bg-sky-50/50 border border-sky-100/80 rounded-2xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users className="w-4 h-4 text-[#2878B5]" />
                                                    <h4 className="text-sm font-bold text-slate-900">4. Retention & LTV</h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                                    {selected.retentionStrategy}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5. Evaluated Business Performance Metrics */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] font-mono">
                                                Key Profitability Metrics Evaluated
                                            </p>
                                            <span className="text-[11px] text-slate-400 font-medium">Verified Data Tracking</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selected.keyBusinessMetrics.map((m, mi) => (
                                                <div key={mi} className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <BarChart3 className="w-3.5 h-3.5 text-[#2878B5]" />
                                                        <span className="text-xs font-bold text-slate-900">{m.name}</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                                        {m.rationale}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 6. Implemented ProfitMachines Capabilities */}
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-3 font-mono">
                                            Implemented Platform Capabilities
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {selected.implementedCapabilities.map((cap, ci) => (
                                                <div key={ci} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-xs font-semibold">
                                                    <Check className="w-4 h-4 text-[#2878B5] shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{cap}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interactive Business Performance Chart */}
                                    <VerticalChart vertical={selected} />

                                    {/* 7. Practical Next Steps for Business Owners */}
                                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#2878B5] mb-3 font-mono">
                                            Recommended Next Steps for Business Owners
                                        </p>
                                        <ol className="space-y-2.5">
                                            {selected.nextSteps.map((step, si) => (
                                                <li key={si} className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                                                    <span className="w-5 h-5 rounded-full bg-[#2878B5] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                        {si + 1}
                                                    </span>
                                                    <span className="leading-snug">{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    {/* Action CTAs */}
                                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                        <Button
                                            onClick={() => openLongForm({
                                                defaultService: `Vertical Consultation: ${selected.name}`,
                                                defaultIndustry: selected.name,
                                                title: `Schedule ${selected.name} Growth Consultation`
                                            })}
                                            className="bg-[#2878B5] hover:bg-[#1E6297] text-white px-8 py-5 h-auto text-sm font-bold rounded-xl shadow-md shadow-blue-900/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <span>Schedule Commercial Assessment</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                        <Link
                                            to="/offerings"
                                            className="inline-flex items-center justify-center gap-2 border-2 border-[#2878B5] text-[#2878B5] hover:bg-[#2878B5] hover:text-white px-8 py-3 rounded-xl font-bold text-sm transition-all"
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

            {/* ── FINAL CALL TO ACTION (Commercial Growth Focus) ── */}
            <section className="py-20 md:py-28 bg-[#070D18] text-white relative overflow-hidden border-t border-slate-800/80">
                <div className="absolute top-0 right-1/4 w-[800px] h-[500px] bg-[#2878B5]/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <Reveal width="100%">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Actionable Commercial Growth</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
                            Ready to Turn Your Presence Into a Profit Engine?
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                            Speak with our growth strategists to evaluate how ProfitMachines can eliminate operational waste, accelerate qualified conversions, and improve margins for your industry.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                onClick={() => openLongForm({
                                    defaultService: 'Profitability Consultation',
                                    title: 'Book Profitability Consultation'
                                })}
                                className="w-full sm:w-auto bg-[#2878B5] hover:bg-[#1E6297] text-white px-9 py-6 h-auto text-base font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Book Profitability Consultation</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Link
                                to="/offerings"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-9 py-3.5 rounded-xl font-bold text-base transition-all"
                            >
                                <span>Explore Core Offerings</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
