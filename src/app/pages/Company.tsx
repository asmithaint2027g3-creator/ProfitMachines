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
        <div className="min-h-screen bg-white font-sans text-[#0066FF] overflow-hidden">
            {/* 1. Autonomous Company Hero Carousel */}
            <CompanyCarousel />

            {/* 2. Bento Grid About Us */}
            <section id="about-us" className="py-32 relative scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Main Manifesto Card */}
                        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 lg:p-16 border-2 border-[#0066FF] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0066FF] tracking-tight leading-tight mb-8">
                                    Pioneering the Science of <br />
                                    <span className="text-[#0066FF]">Revenue Engineering</span>
                                </h2>
                                <div className="space-y-6 text-lg text-[#0066FF] font-medium leading-relaxed font-sans max-w-3xl">
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
                            <div className="bg-[#0066FF] rounded-[2.5rem] p-8 lg:p-10 border-2 border-[#0066FF] flex-1 flex flex-col justify-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="p-3 bg-white rounded-2xl w-max mb-6 border border-white">
                                        <Globe className="w-8 h-8 text-[#0066FF]" />
                                    </div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tight">20+ <span className="text-2xl text-white/80 font-bold">Countries</span></div>
                                    <p className="text-sm font-bold text-white/80 uppercase tracking-widest">Global Reach</p>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border-2 border-[#0066FF] flex-1 flex flex-col justify-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="p-3 bg-[#0066FF] rounded-2xl w-max mb-6 border border-[#0066FF]">
                                        <Zap className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl font-black text-[#0066FF] mb-2 tracking-tight">$5B+</div>
                                    <p className="text-sm font-bold text-[#0066FF] uppercase tracking-widest">Revenue Impact Generated</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Mission & Capabilities Grid */}
            <section id="mission" className="py-32 relative scroll-mt-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Left: Mission */}
                        <div>
                            <Reveal width="100%">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-8">Our Mission</h2>
                                <p className="text-2xl text-[#0066FF] leading-relaxed font-medium mb-12">
                                    To help enterprises build <span className="text-[#0066FF] font-bold">predictable</span>, <span className="text-[#0066FF] font-bold">scalable</span>, and <span className="text-[#0066FF] font-bold">compounding</span> revenue engines powered by AI.
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
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#0066FF] group-hover:bg-[#0066FF] transition-colors">
                                                <ArrowRight className="w-5 h-5 text-[#0066FF] group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-lg font-semibold text-[#0066FF]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: Abstract UI Representation */}
                        <div className="relative">
                            <Reveal width="100%" delay={0.2}>
                                <div className="bg-white rounded-[2.5rem] border-2 border-[#0066FF] p-8 relative overflow-hidden aspect-square flex flex-col items-center justify-center">
                                    <div className="relative z-10 w-full max-w-md space-y-4">
                                        {/* Mock UI Elements */}
                                        <div className="bg-white p-4 rounded-2xl border-2 border-[#0066FF] flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center">
                                                    <Target className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-24 bg-[#0066FF]/20 rounded-full mb-2"></div>
                                                    <div className="h-2 w-16 bg-[#0066FF]/10 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="h-6 w-16 bg-[#0066FF] rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-white">ACTIVE</span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-4 rounded-2xl border-2 border-[#0066FF] flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center">
                                                    <TrendingUp className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-32 bg-[#0066FF]/20 rounded-full mb-2"></div>
                                                    <div className="h-2 w-20 bg-[#0066FF]/10 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="h-6 w-16 bg-white border border-[#0066FF] rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-[#0066FF]">+142%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-4 rounded-2xl border-2 border-[#0066FF] flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center">
                                                    <ShieldCheck className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-28 bg-[#0066FF]/20 rounded-full mb-2"></div>
                                                    <div className="h-2 w-14 bg-[#0066FF]/10 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="h-6 w-16 bg-white border border-[#0066FF] rounded-full flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-[#0066FF]">SYNCED</span>
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
            <section className="py-32 bg-white relative overflow-hidden border-y-2 border-[#0066FF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#0066FF]">Real Business Impact</h2>
                        <p className="text-[#0066FF] text-xl font-medium max-w-2xl mx-auto">Delivering measurable outcomes for enterprise revenue teams at scale.</p>
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
                                <div className="bg-white border-2 border-[#0066FF] p-8 rounded-[2rem] text-center hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-center">
                                    <div className="flex justify-center mb-6">
                                        <div className="text-[#0066FF] group-hover:scale-110 transition-transform duration-300">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div className="text-4xl font-black text-[#0066FF] mb-3 tracking-tight">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-[#0066FF] font-bold leading-relaxed tracking-widest uppercase">
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
            <section id="our-offices" className="relative py-32 border-t-2 border-[#0066FF] bg-white overflow-hidden scroll-mt-32">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-4">Global Presence</h2>
                        <p className="text-[#0066FF] text-lg font-medium">Headquartered in the US, with innovation centers across the globe.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
                        {[
                            {
                                country: 'US Office',
                                address: ['501 E Kennedy Blvd Suite 1400', 'Tampa, FL 33602', 'United States'],
                                email: 'connect@profitmachines.com',
                                phone: '+91 9513288612',
                            },
                            {
                                country: 'Singapore Office',
                                address: ['5 Temasek Boulevard, 17th Floor', 'Singapore 038985'],
                                email: 'connect@profitmachines.com',
                                phone: '+65 6050 5235',
                            },
                            {
                                country: 'India Office',
                                address: ['Suite : 32 , 235, BINNAMANGALA', '2nd Floor, 13th Cross Road', 'Bengaluru – 560038 , India'],
                                sub: 'PROFITMACHINES INNOVATION PVT LTD',
                            },
                            {
                                country: 'Mumbai Office',
                                address: ['WeWork, Raheja Platinum', 'off Andheri - Kurla Road', 'Mumbai, Maharashtra 400059'],
                                email: 'cs@profitmachines.com',
                                phone: '+91 9513088612',
                            }
                        ].map((office, i) => (
                            <Reveal key={i} width="100%" delay={i * 0.1}>
                                <div className="bg-white rounded-[2rem] p-8 border-2 border-[#0066FF] transition-all duration-300 h-full flex flex-col group hover:-translate-y-1">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-[#0066FF] mb-2">{office.country}</h3>
                                        {office.sub && <p className="text-[10px] font-bold text-[#0066FF] uppercase tracking-widest mb-4">{office.sub}</p>}
                                        {!office.sub && <div className="h-6"></div>}
                                        
                                        <div className="space-y-1 mb-6 text-[#0066FF] text-sm leading-relaxed font-medium opacity-75">
                                            {office.address.map((line, idx) => <p key={idx}>{line}</p>)}
                                        </div>
                                        
                                        <div className="mt-auto space-y-2 text-sm font-medium">
                                            {office.email && (
                                                <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-[#0066FF] hover:underline transition-colors">
                                                    <Mail className="w-4 h-4" /> {office.email}
                                                </a>
                                            )}
                                            {office.phone && (
                                                <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[#0066FF] hover:underline transition-colors">
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
