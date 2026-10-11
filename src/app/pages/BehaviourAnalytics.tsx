import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { 
    TrendingUp, 
    ArrowRight, 
    MessageSquare, 
    MousePointer2, 
    Activity, 
    Globe, 
    Users, 
    FileText, 
    BarChart3 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLeadModal } from '../context/LeadModalContext';
import ContextualCtaSection from '../components/forms/ContextualCtaSection';

export default function BehaviourAnalytics() {
    const { openQuickForm, openLongForm } = useLeadModal();
    useEffect(() => {
        document.title = "Behaviour Analytics | ProfitMachines";
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            title: "Chatbot Leads Intelligence",
            icon: MessageSquare,
            description: "Autonomous lead capture with real-time intent detection and lead scoring.",
            points: [
                "Intent Detection (Demo, Pricing, Support)",
                "Lead Scoring (Hot, Warm, Cold)",
                "Conversation Summary Generation",
                "Automated Admin Notifications"
            ],
            color: "blue"
        },
        {
            title: "Engagement Metrics",
            icon: MousePointer2,
            description: "Go beyond page views with granular interaction tracking and depth analysis.",
            points: [
                "Average Scroll Depth Tracking",
                "Interaction Count per Session",
                "Bounce Rate Scrutiny",
                "Form Completion vs Abandonment"
            ],
            color: "purple"
        },
        {
            title: "Behavioural Metrics",
            icon: Activity,
            description: "Map the digital body language of your visitors to identify high-intent segments.",
            points: [
                "Rage Click & Inactivity Detection",
                "User Segment Classification",
                "Device & Browser Performance Mapping",
                "Entry/Exit Page Analysis"
            ],
            color: "indigo"
        },
        {
            title: "Traffic Analytics",
            icon: Globe,
            description: "Holistic view of where your revenue-ready demand is coming from.",
            points: [
                "Traffic Source Attribution",
                "UTM Campaign ROI Tracking",
                "Referring Domain Analysis",
                "Geo-Location (Country/City) Density"
            ],
            color: "cyan"
        },
        {
            title: "User Behaviour Library",
            icon: Users,
            description: "Aggregated user-level behavioral profiles for a 360° view of individual journeys.",
            points: [
                "Historical Event Aggregation",
                "Session Lifecycle Tracking",
                "Segment History Retention",
                "Cross-Device Identity Resolution"
            ],
            color: "blue"
        },
        {
            title: "Automated Reporting System",
            icon: FileText,
            description: "Daily and weekly intelligence summaries delivered straight to your team.",
            points: [
                "Daily Traffic & Session Reports",
                "Weekly Top Page & Conversion Summaries",
                "Full Analytics Dashboard Refresh",
                "Cron Execution & System Logging"
            ],
            color: "purple"
        }
    ];

    const trends = [
        { label: "Daily Traffic Trend", desc: "Line chart visualization of sessions, unique IPs, and page views over time." },
        { label: "Weekly Comparison", desc: "Side-by-side growth analytics comparing session counts across weeks." },
        { label: "Traffic Source Breakdown", desc: "Pie chart distribution of Direct, Organic, Social, and Campaign traffic." },
        { label: "Cron Trigger Execution Log", desc: "Live audit trail of all automated analytics processing tasks." }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <style>{`
                        @keyframes fadeZoom {
                            0% { opacity: 0; transform: scale(1); }
                            5% { opacity: 1; transform: scale(1.05); }
                            20% { opacity: 1; transform: scale(1.1); }
                            25% { opacity: 0; transform: scale(1.15); }
                            100% { opacity: 0; transform: scale(1); }
                        }
                        .animate-slide-1 { animation: fadeZoom 25s infinite 0s; }
                        .animate-slide-2 { animation: fadeZoom 25s infinite 5s; }
                        .animate-slide-3 { animation: fadeZoom 25s infinite 10s; }
                    `}</style>

                    {[
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
                        "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1920&q=80"
                    ].map((img, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 bg-cover bg-center opacity-0 animate-slide-${idx + 1}`}
                            
                        />
                    ))}
                    <div className="absolute inset-0 bg-white/30 bg-gradient-to-b from-white/80 via-white/20 to-white/80"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-100/60 shadow-[0_2px_10px_-4px_rgba(6,78,59,0.3)] text-[#053d2e] text-sm font-bold mb-8 backdrop-blur-sm">
                        <BarChart3 className="w-4 h-4 text-[#064e3b]" />
                        <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent uppercase tracking-wider font-bold">Intelligence Module: Behaviour Analytics</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1] text-slate-900">
                        Decode the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#064e3b] via-emerald-700 to-teal-700">
                            Digital Body Language
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed font-semibold">
                        Don't just track clicks. Understand intent. ProfitMachines maps every interaction to reveal the hidden patterns of your highest-value users.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link to="/book-consultation">
                            <Button className="bg-gradient-to-r from-[#064e3b] to-emerald-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-7 text-xl h-auto rounded-full shadow-lg shadow-emerald-800/30 hover:shadow-emerald-800/45 transition-all hover:-translate-y-1 font-bold">
                                Activate Behaviour Engine
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-slate-900 border-4 border-slate-50 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#064e3b] group-hover:rotate-6 transition-all duration-500">
                                            <Icon className="w-9 h-9" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                                        <p className="text-slate-600 font-medium mb-8 leading-relaxed italic">
                                            "{feature.description}"
                                        </p>
                                        <div className="space-y-4">
                                            {feature.points.map((p, i) => (
                                                <div key={i} className="flex gap-4 items-start group/flow">
                                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-600" />
                                                    <p className="text-slate-700 font-bold text-sm leading-relaxed">{p}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Reporting & Trends Section */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-[#053d2e] text-xs font-bold tracking-widest uppercase mb-4">Reports & Trends</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900">Automated Intelligence Sheets</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trends.map((trend, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-blue-500/10 transition-all group">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-[#064e3b] group-hover:bg-[#064e3b] group-hover:text-white transition-all">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-xl mb-4 text-slate-900">{trend.label}</h4>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{trend.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <ContextualCtaSection
                badge="Behaviour Analytics"
                title="Ready to See Your Data Breathe?"
                subtitle="Join high-growth teams using Behaviour Analytics to transform passive visitors into predictive pipeline. Schedule an enterprise consultation or submit a 60-second quick inquiry."
                defaultService="Behaviour Analytics & Telemetry"
            />
        </div>
    );
}
