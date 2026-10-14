import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Target,
    Zap,
    TrendingUp,
    Building2,
    Globe,
    ArrowRight,
    Mail,
    Phone,
    BarChart3,
    PieChart,
    LineChart,
    ShieldCheck
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/button';
import LeadershipSection from '../components/LeadershipSection';
import CompanyCarousel from '../components/CompanyCarousel';
import LeadCaptureSection from '../components/LeadCaptureSection';

export default function Company() {
    const location = useLocation();
    const [activeCompanyCat, setActiveCompanyCat] = useState<string>('all');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');

        if (section) {
            setTimeout(() => {
                const elementId = section.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const element = document.getElementById(elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    // SEO & Meta Title
    useEffect(() => {
        document.title = "About ProfitMachines | AI Revenue Acceleration Platform";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Learn about ProfitMachines — the AI-powered revenue acceleration platform helping enterprises scale pipeline, close deals faster, and grow ARR predictably.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Learn about ProfitMachines — the AI-powered revenue acceleration platform helping enterprises scale pipeline, close deals faster, and grow ARR predictably.';
            document.head.appendChild(meta);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            {/* 1. Autonomous Company Hero Carousel */}
            <CompanyCarousel />

            {/* 2. Bento Grid About Us */}
            <section id="about-us" className="py-32 relative scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Main Manifesto Card */}
                        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 lg:p-16 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                                    Pioneering the Science of <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] to-emerald-600">Revenue Engineering</span>
                                </h2>
                                <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed font-sans max-w-3xl">
                                    <p>
                                        At ProfitMachines, we believe that revenue growth shouldn't be a guessing game. It's an engineering problem solvable with data, intelligence, and precision execution.
                                    </p>
                                    <p>
                                        Born from a convergence of enterprise sales expertise and advanced machine learning, we've built the world's most comprehensive Revenue Intelligence Platform. We provide the <strong>flow</strong>—the seamless connection between market signals, sales execution, and predictable revenue outcomes.
                                    </p>
                                    <p>
                                        We partner with forward-thinking enterprises to dismantle silos, automate complex revenue workflows, and empower teams to achieve what was previously impossible: <strong>Growth on Autopilot.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Side Metric Cards */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 border border-slate-800 shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="p-3 bg-white/10 rounded-2xl w-max mb-6 backdrop-blur-sm border border-white/5">
                                        <Globe className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tight">20+ <span className="text-2xl text-slate-400 font-bold">Countries</span></div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Reach</p>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-200 shadow-sm flex-1 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[40px] pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="p-3 bg-emerald-50 rounded-2xl w-max mb-6 border border-emerald-100 group-hover:bg-[#2878B5] group-hover:text-white transition-colors duration-500">
                                        <Zap className="w-8 h-8 text-[#2878B5] group-hover:text-white" />
                                    </div>
                                    <div className="text-4xl font-black text-slate-900 mb-2 tracking-tight">$5B+</div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Revenue Impact Generated</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Mission & Capabilities Grid */}
            <section id="mission" className="py-32 relative scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Left: Mission */}
                        <div>
                            <Reveal width="100%">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">Our Mission</h2>
                                <p className="text-2xl text-slate-700 leading-relaxed font-medium mb-12">
                                    To help enterprises build <span className="text-[#2878B5] font-bold">predictable</span>, <span className="text-emerald-700 font-bold">scalable</span>, and <span className="text-teal-700 font-bold">compounding</span> revenue engines powered by AI.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        "AI-powered demand generation",
                                        "Sales intelligence & automation",
                                        "Revenue operations optimization",
                                        "ARR acceleration & retention",
                                        "Predictive revenue forecasting"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:bg-[#2878B5] group-hover:border-[#2878B5] transition-colors">
                                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-lg font-semibold text-slate-700 group-hover:text-slate-900">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: Abstract UI Representation */}
                        <div className="relative">
                            <Reveal width="100%" delay={0.2}>
                                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 relative overflow-hidden aspect-square flex flex-col items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[80px] -mr-40 -mt-40"></div>
                                    
                                    <div className="relative z-10 w-full max-w-md space-y-4">
                                        {/* Mock UI Elements */}
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between animate-fade-in-up">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                    <Target className="w-5 h-5 text-[#2878B5]" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-24 bg-slate-200 rounded-full mb-2"></div>
                                                    <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="h-6 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-emerald-600">ACTIVE</span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between animate-fade-in-up" style={{animationDelay: '150ms'}}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                    <TrendingUp className="w-5 h-5 text-[#2878B5]" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-32 bg-slate-200 rounded-full mb-2"></div>
                                                    <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="h-6 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-[#2878B5]">+142%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between animate-fade-in-up" style={{animationDelay: '300ms'}}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                                                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-28 bg-slate-200 rounded-full mb-2"></div>
                                                    <div className="h-2 w-14 bg-slate-100 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="h-6 w-16 bg-slate-100 rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-slate-500">SYNCED</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. Real Business Impact - Clean KPI Grid */}
            <section className="py-32 bg-white relative overflow-hidden border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">Real Business Impact</h2>
                        <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">Delivering measurable outcomes for enterprise revenue teams at scale.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { value: "24×", label: "increase in high-quality leads", icon: <BarChart3 className="w-6 h-6" /> },
                            { value: "3×", label: "improvement in conversion rate", icon: <TrendingUp className="w-6 h-6" /> },
                            { value: "50%", label: "reduction in sales cycle", icon: <Zap className="w-6 h-6" /> },
                            { value: "65%", label: "reduction in cost of sales", icon: <PieChart className="w-6 h-6" /> },
                            { value: "120%+", label: "net revenue retention", icon: <LineChart className="w-6 h-6" /> },
                        ].map((stat, idx) => (
                            <Reveal key={idx} width="100%" delay={idx * 0.1}>
                                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] text-center hover:bg-white hover:border-emerald-200 hover:shadow-xl transition-all duration-500 group h-full flex flex-col justify-center">
                                    <div className="flex justify-center mb-6">
                                        <div className="text-[#2878B5] group-hover:scale-110 transition-transform duration-500">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="text-4xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-[#2878B5] transition-colors duration-500">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed tracking-widest uppercase">
                                        {stat.label}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Leadership & Culture */}
            <div id="leadership-culture" className="scroll-mt-32">
                <LeadershipSection />
            </div>

            {/* 6. Offices & Contact - Enterprise Bento */}
            <section id="our-offices" className="relative py-32 border-t border-slate-200 bg-slate-900 overflow-hidden scroll-mt-32">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Global Presence</h2>
                        <p className="text-slate-400 text-lg font-medium">Headquartered in the US, with innovation centers across the globe.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
                        {/* Office Cards */}
                        {[
                            {
                                country: 'US Office',
                                address: ['501 E Kennedy Blvd Suite 1400', 'Tampa, FL 33602', 'United States'],
                                email: 'connect@profitmachines.com',
                                phone: '+91 9513288612',
                                color: 'blue'
                            },
                            {
                                country: 'Singapore Office',
                                address: ['5 Temasek Boulevard, 17th Floor', 'Singapore 038985'],
                                email: 'connect@profitmachines.com',
                                phone: '+65 6050 5235',
                                color: 'indigo'
                            },
                            {
                                country: 'India Office',
                                address: ['Suite : 32 , 235, BINNAMANGALA', '2nd Floor, 13th Cross Road', 'Bengaluru – 560038 , India'],
                                sub: 'PROFITMACHINES INNOVATION PVT LTD',
                                color: 'emerald'
                            },
                            {
                                country: 'Mumbai Office',
                                address: ['WeWork, Raheja Platinum', 'off Andheri - Kurla Road', 'Mumbai, Maharashtra 400059'],
                                email: 'cs@profitmachines.com',
                                phone: '+91 9513088612',
                                color: 'purple'
                            }
                        ].map((office, i) => (
                            <Reveal key={i} width="100%" delay={i * 0.1}>
                                <div className="bg-slate-800/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${office.color}-500/10 rounded-full blur-[40px] group-hover:bg-${office.color}-500/20 transition-colors`}></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-white mb-2">{office.country}</h3>
                                        {office.sub && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{office.sub}</p>}
                                        {!office.sub && <div className="h-6"></div>}
                                        
                                        <div className="space-y-1 mb-6 text-slate-400 text-sm leading-relaxed font-medium">
                                            {office.address.map((line, idx) => <p key={idx}>{line}</p>)}
                                        </div>
                                        
                                        <div className="mt-auto space-y-2 text-sm font-medium">
                                            {office.email && (
                                                <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                                                    <Mail className="w-4 h-4" /> {office.email}
                                                </a>
                                            )}
                                            {office.phone && (
                                                <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                                                    <Phone className="w-4 h-4" /> {office.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Diagnostic Lead Capture Form */}
            <LeadCaptureSection />
        </div>
    );
}
