import React, { useState } from 'react';
import { 
    Briefcase, Factory, ShoppingBag, Landmark, Code, Rocket, Building2, 
    HeartPulse, GraduationCap, ShoppingCart, Home, Zap, ArrowRight, CheckCircle2,
    Sparkles, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';

const sectorFilters = ['all', 'Technology & SaaS', 'Financial & Healthcare', 'Industrial & Energy', 'Commerce & Services'] as const;

const industries = [
    {
        icon: Landmark,
        title: 'FinTech & Lending',
        sectorGroup: 'Financial & Healthcare',
        useCases: 'Digital Lending, NBFCs, Payment Platforms, Wealth Management, Insurance Tech',
        focus: 'Cybersecurity audits, regulatory compliance, liability protection, trust‑building with investors.',
        link: '/industries?section=fintech-lending',
        image: '/images/industry-fintech.png',
        tag: 'Financial Intelligence'
    },
    {
        icon: Factory,
        title: 'Smart Manufacturing & Industrial',
        sectorGroup: 'Industrial & Energy',
        useCases: 'Smart Factory AI, Utilities, Supply Chain, Energy, Automotive, Heavy Machinery',
        focus: 'Compliance, disaster vulnerability audits, operational risk coverage, and digital procurement outreach.',
        link: '/industries?section=industrial-industries',
        image: '/images/industry-manufacturing.png',
        tag: 'Industrial AI'
    },
    {
        icon: HeartPulse,
        title: 'Healthcare & Life Sciences',
        sectorGroup: 'Financial & Healthcare',
        useCases: 'Hospitals, Clinics, Pharma, Diagnostics, Biotech, Digital Health',
        focus: 'HIPAA & compliance audits, patient data protection, disaster readiness, clinical operations.',
        link: '/industries?section=healthcare-life-sciences',
        image: '/images/industry-healthcare.png',
        tag: 'Health Intelligence'
    },
    {
        icon: Code,
        title: 'Enterprise SaaS & Cloud',
        sectorGroup: 'Technology & SaaS',
        useCases: 'Software Platforms, AI Tools, Cloud Solutions, Productivity Apps, Enterprise SaaS',
        focus: 'Customer outreach, penetration testing, credibility building, subscription ARR growth.',
        link: '/industries?section=saas-products',
        image: '/images/industry-saas.png',
        tag: 'Cloud & AI SaaS'
    },
    {
        icon: ShoppingBag,
        title: 'D2C & Omnichannel Retail',
        sectorGroup: 'Commerce & Services',
        useCases: 'Consumer Brands, E‑commerce, Lifestyle Products, Food & Beverages, Fashion, Retail Chains',
        focus: 'Digital brand acceleration, customer trust, cyber protection, automated inventory prediction.',
        link: '/industries?section=d2c-companies',
        image: '/images/industry-retail.png',
        tag: 'Commerce Analytics'
    },
    {
        icon: Zap,
        title: 'Energy & Smart Utilities',
        sectorGroup: 'Industrial & Energy',
        useCases: 'Power Grids, Renewable Energy, Oil & Gas, CleanTech, Smart Infrastructure',
        focus: 'Operational risk telemetry, regulatory compliance, disaster resilience, grid optimization.',
        link: '/industries?section=energy-utilities',
        image: '/images/hero-data-intelligence.png',
        tag: 'Grid Intelligence'
    },
    {
        icon: Briefcase,
        title: 'Professional Service Industries',
        sectorGroup: 'Commerce & Services',
        useCases: 'Management Consulting, Legal, Education, Hospitality, Global Logistics',
        focus: 'Reputation building, high-touch lead generation, automated client trust audits.',
        link: '/industries?section=service-industries',
        image: '/images/company-hero.png',
        tag: 'Strategic Advisory'
    },
    {
        icon: Rocket,
        title: 'High-Growth Startups',
        sectorGroup: 'Technology & SaaS',
        useCases: 'Early‑stage to Series B ventures across all technology sectors',
        focus: 'Affordable liability insurance, investor confidence, growth resilience, digital lead generation.',
        link: '/industries?section=startups',
        image: '/images/demand-pulse-dashboard.png',
        tag: 'Venture Acceleration'
    },
    {
        icon: Building2,
        title: 'Global Enterprises',
        sectorGroup: 'Technology & SaaS',
        useCases: 'Fortune 500 corporates and established multinational organizations',
        focus: 'End‑to‑end liability coverage, automation of sales hunting, sector‑specific solutions, global compliance.',
        link: '/industries?section=enterprises',
        image: '/images/home-why-choose.png',
        tag: 'Enterprise Scale'
    }
];

export default function IndustriesSection() {
    const [selectedSector, setSelectedSector] = useState<string>('all');

    const filteredIndustries = selectedSector === 'all'
        ? industries
        : industries.filter(i => i.sectorGroup === selectedSector);

    return (
        <section className="py-20 md:py-28 bg-white text-[#0066FF] relative overflow-hidden border-b-2 border-[#0066FF]" id="industries">
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
                            <span>Sector Expertise · Domain Models</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight font-heading">
                            Tailored For Your Industry's Growth Model
                        </h2>
                        <p className="text-base sm:text-lg text-[#0066FF] font-medium leading-relaxed max-w-2xl mx-auto">
                            Domain-specific AI growth engines, revenue protection architectures, and market discovery frameworks custom-engineered for your sector.
                        </p>
                    </motion.div>

                    {/* Sector Filter Tabs */}
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-[#0066FF] mt-8">
                        {sectorFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setSelectedSector(filter);
                                    trackEvent({ eventName: 'FILTER_INDUSTRIES_CLICK', label: filter });
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${
                                    selectedSector === filter
                                        ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                        : 'bg-white text-[#0066FF] border-transparent hover:border-[#0066FF]'
                                }`}
                            >
                                {filter === 'all' ? 'All Sectors (09)' : filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Industry Cards Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                >
                    <AnimatePresence>
                        {filteredIndustries.map((ind) => {
                            const Icon = ind.icon;
                            return (
                                <motion.div
                                    key={ind.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <Link
                                        to={ind.link}
                                        onClick={() => trackEvent({ eventName: 'INDUSTRY_CARD_CLICK', label: ind.title })}
                                        className="block h-full group focus:outline-none rounded-2xl"
                                    >
                                        <div className="h-full flex flex-col justify-between rounded-2xl bg-white border-2 border-[#0066FF] hover:-translate-y-1 transition-all duration-200 relative overflow-hidden">
                                            
                                            {/* Top Visual Image Strip */}
                                            {ind.image && (
                                                <div className="relative h-44 w-full overflow-hidden bg-white border-b-2 border-[#0066FF]">
                                                    <img 
                                                        src={ind.image} 
                                                        alt={ind.title} 
                                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                                        loading="lazy"
                                                    />
                                                    
                                                    {/* Floating Sector Badge on Image */}
                                                    <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-md border-2 border-[#0066FF] text-[10px] font-mono font-bold text-[#0066FF]">
                                                        {ind.tag}
                                                    </div>

                                                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-[#0066FF] text-white flex items-center justify-center border-2 border-[#0066FF]">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-6 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-[#0066FF] mb-2.5">
                                                        {ind.title}
                                                    </h3>

                                                    <p className="text-xs text-[#0066FF] font-medium mb-4 line-clamp-2">
                                                        <strong>Sub-sectors:</strong> {ind.useCases}
                                                    </p>

                                                    <div className="p-3.5 rounded-xl bg-white border-2 border-[#0066FF] text-xs text-[#0066FF] font-medium leading-relaxed mb-4">
                                                        <span className="font-bold block mb-1">Strategic Objective:</span>
                                                        {ind.focus}
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t-2 border-[#0066FF] flex items-center justify-between text-xs font-bold text-[#0066FF]">
                                                    <span>Explore Sector Blueprint</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#0066FF]" />
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-14 text-center">
                    <Link
                        to="/industries"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:underline transition-colors group"
                    >
                        <span>View complete industry matrices & compliance frameworks</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#0066FF]" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

