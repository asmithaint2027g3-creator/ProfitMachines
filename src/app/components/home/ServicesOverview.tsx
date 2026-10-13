import React, { useState } from 'react';
import { BrainCircuit, Cpu, Code2, Cloud, ShieldCheck, Server, Bot, Headset, ArrowRight, Zap, Sparkles, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';

const categories = ['all', 'AI & Intelligence', 'Operations & Agents', 'Cloud & Security'] as const;

const services = [
    {
        id: 'ai-solutions',
        num: '01',
        categoryGroup: 'AI & Intelligence',
        category: 'Core AI Engine',
        capability: 'Predictive AI & Machine Learning',
        title: 'AI Solutions',
        description: 'Deploy advanced machine learning models, neural prediction graphs, and generative AI to solve complex enterprise pipeline challenges.',
        keyOutcome: '98.4% ICP Target Accuracy',
        link: '/solutions#ai-solutions',
        icon: BrainCircuit,
        gradient: 'from-[#0066FF]/10 to-[#0066FF]/10',
        featured: true
    },
    {
        id: 'enterprise-automation',
        num: '02',
        categoryGroup: 'Operations & Agents',
        category: 'Autonomous Operations',
        capability: 'Workflow & Operations Engineering',
        title: 'Enterprise Automation',
        description: 'Streamline operations and eliminate manual SDR workflows with intelligent, self-healing process automation pipelines.',
        keyOutcome: '68% Manual Effort Reduction',
        link: '/solutions#enterprise-automation',
        icon: Cpu,
        gradient: 'from-[#0066FF]/10 to-[#0066FF]/10'
    },
    {
        id: 'custom-software',
        num: '03',
        categoryGroup: 'Cloud & Security',
        category: 'Digital Infrastructure',
        capability: 'Bespoke Full-Stack Engineering',
        title: 'Custom Software Development',
        description: 'Build scalable, secure, and bespoke software applications engineered specifically for high-velocity revenue operations.',
        keyOutcome: 'Sub-second API Latency',
        link: '/solutions#custom-software',
        icon: Code2,
        gradient: 'from-cyan-600/10 to-[#0066FF]/10'
    },
    {
        id: 'cloud-services',
        num: '04',
        categoryGroup: 'Cloud & Security',
        category: 'Cloud Intelligence',
        capability: 'Cloud Architecture & Infrastructure',
        title: 'Cloud Services',
        description: 'Migrate, manage, and optimize your enterprise infrastructure on high-availability, scalable multi-region cloud clusters.',
        keyOutcome: '99.99% Multi-region Uptime',
        link: '/solutions#cloud-services',
        icon: Cloud,
        gradient: 'from-sky-600/10 to-[#0066FF]/10'
    },
    {
        id: 'cyber-security',
        num: '05',
        categoryGroup: 'Cloud & Security',
        category: 'Risk & Governance',
        capability: 'Threat Intelligence & Compliance',
        title: 'Cyber Security & Privacy',
        description: 'Protect enterprise data assets with SOC2 Type II controls, strict sandboxing, and zero-trust security frameworks.',
        keyOutcome: 'Zero-Exposure Compliance',
        link: '/solutions#cyber-security',
        icon: ShieldCheck,
        gradient: 'from-[#0066FF]/10 to-[#0066FF]/10'
    },
    {
        id: 'it-services',
        num: '06',
        categoryGroup: 'Cloud & Security',
        category: 'Enterprise Stack',
        capability: 'Systems Modernization & Support',
        title: 'IT & Data Modernization',
        description: 'Comprehensive IT architecture management, CRM integration, and infrastructure modernization for high-growth firms.',
        keyOutcome: 'Unified Data Fabric',
        link: '/solutions#it-services',
        icon: Server,
        gradient: 'from-slate-600/10 to-[#0066FF]/10'
    },
    {
        id: 'ai-agents',
        num: '07',
        categoryGroup: 'Operations & Agents',
        category: 'Autonomous Workforce',
        capability: 'Autonomous Digital Workforces',
        title: 'AI Agents & SDR Mesh',
        description: 'Deploy 24/7 autonomous digital agents to handle qualification, account mapping, and multi-channel buyer touchpoints.',
        keyOutcome: '3.8× Meeting Velocity',
        link: '/solutions#ai-agents',
        icon: Bot,
        gradient: 'from-[#0066FF]/10 to-pink-600/10',
        featured: true
    },
    {
        id: 'bpo-services',
        num: '08',
        categoryGroup: 'Operations & Agents',
        category: 'Strategic Operations',
        capability: 'Process Optimization & Global Operations',
        title: 'ITES & GTM Operations',
        description: 'Scale business processes with technology-enabled services, dedicated domain operators, and global support.',
        keyOutcome: '45% Operational Cost Savings',
        link: '/solutions#bpo-services',
        icon: Headset,
        gradient: 'from-amber-600/10 to-orange-600/10'
    }
];

export default function ServicesOverview() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredServices = selectedCategory === 'all' 
        ? services 
        : services.filter(s => s.categoryGroup === selectedCategory);

    return (
        <section id="capabilities-solutions" className="py-20 md:py-28 bg-white relative overflow-hidden border-b-2 border-[#0066FF]">
            {/* Scroll Anchors for backward compatibility */}
            <div id="capabilities" className="scroll-mt-28 absolute -top-28 left-0 pointer-events-none" />
            <div id="solutions" className="scroll-mt-28 absolute -top-28 left-0 pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0066FF] bg-white text-xs font-bold text-[#0066FF] uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                            <span>Enterprise Architecture Portfolio</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight font-heading">
                            Integrated Capabilities &amp; Solutions
                        </h2>
                        <p className="text-base sm:text-lg text-[#0066FF] font-medium leading-relaxed max-w-2xl mx-auto">
                            Pairing core domain capabilities with engineered AI solutions to deliver predictable business outcomes across your entire GTM architecture.
                        </p>
                    </motion.div>

                    {/* Interactive Category Filter Tabs */}
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-[#0066FF] mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    trackEvent({ eventName: 'FILTER_SERVICES_CLICK', label: cat });
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${
                                    selectedCategory === cat
                                        ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                        : 'bg-white text-[#0066FF] border-transparent hover:border-[#0066FF]'
                                }`}
                            >
                                {cat === 'all' ? 'All Solutions (08)' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Diverse Bento-Style Offering Cards Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
                >
                    <AnimatePresence>
                        {filteredServices.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <motion.div
                                    key={service.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <Link
                                        to={service.link}
                                        onClick={() => trackEvent({ eventName: 'CAPABILITY_CARD_CLICK', label: service.title })}
                                        className="block h-full group focus:outline-none rounded-2xl"
                                    >
                                        <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#0066FF] transition-all duration-200 hover:-translate-y-1 relative overflow-hidden">
                                            
                                            <div>
                                                {/* Header Row with Icon, Tag and Number */}
                                                <div className="flex items-center justify-between mb-5">
                                                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#0066FF] flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-200">
                                                        <IconComponent className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-mono font-bold text-[#0066FF] bg-white px-2.5 py-1 rounded-md border-2 border-[#0066FF]">
                                                            {service.num}
                                                        </span>
                                                    </div>
                                                </div>

                                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0066FF] mb-1 block font-mono">
                                                    // {service.category}
                                                </span>

                                                <h3 className="text-xl font-bold text-[#0066FF] mb-2.5 leading-snug">
                                                    {service.title}
                                                </h3>

                                                <p className="text-xs sm:text-sm text-[#0066FF] leading-relaxed mb-5 font-normal">
                                                    {service.description}
                                                </p>
                                            </div>

                                            <div>
                                                {/* Key Outcome Highlight */}
                                                <div className="pt-3 border-t-2 border-[#0066FF] mb-4 flex items-center gap-2 text-xs font-bold text-[#0066FF] bg-white px-3 py-1.5 rounded-lg border-2 border-[#0066FF]">
                                                    <TrendingUp className="w-3.5 h-3.5 shrink-0 text-[#0066FF]" />
                                                    <span className="truncate">{service.keyOutcome}</span>
                                                </div>

                                                {/* Explore CTA */}
                                                <div className="inline-flex items-center justify-between w-full text-xs font-bold text-[#0066FF] pt-1">
                                                    <span>Explore Solution</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#0066FF]" />
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Value Note */}
                <div className="mt-12 text-center">
                    <Link
                        to="/solutions"
                        onClick={() => trackEvent({ eventName: 'VIEW_ALL_SOLUTIONS_CLICK' })}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:underline transition-colors group"
                    >
                        <span>View complete architectural specifications and case evidence</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#0066FF]" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

