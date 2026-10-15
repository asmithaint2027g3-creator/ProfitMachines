import React, { useState } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, Layers, TrendingUp, Sparkles, ShieldCheck, Zap, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../lib/analytics';

const impactCategories = ['all', 'FinTech & Risk', 'SaaS & Retention', 'Autonomous SDR', 'Retail & Demand'] as const;

const caseStudies = [
    {
        id: 'fintech-fraud',
        category: 'FinTech & Risk',
        client: 'Global FinTech Corp',
        title: 'Automated Fraud Detection & Real-Time Risk Analytics',
        problem: 'High manual review times caused critical transaction delays and high false positive rates during peak volumes.',
        solution: 'Deployed a custom Machine Learning neural model that analyzes transaction velocity and biometric patterns in real time.',
        technologies: 'Python, TensorFlow, AWS SageMaker, Snowflake',
        image: '/images/industry-fintech.png',
        metrics: [
            { label: 'False Positives', value: '-45%', sub: 'Drastic reduction' },
            { label: 'Processing Latency', value: '< 200ms', sub: 'Sub-second audit' },
            { label: 'Annual Risk Savings', value: '$2.1M+', sub: 'Direct margin lift' }
        ]
    },
    {
        id: 'saas-churn',
        category: 'SaaS & Retention',
        client: 'Leading SaaS Provider',
        title: 'AI-Driven Churn Prediction & Deal Recovery Mesh',
        problem: 'Unable to identify at-risk enterprise accounts. Missed crucial cancellation and downsell triggers before contract renewal.',
        solution: 'Implemented predictive telemetry analytics on user engagement and product usage data to trigger automated retention workflows.',
        technologies: 'Node.js, PostgreSQL, Scikit-learn, Redis',
        image: '/images/industry-saas.png',
        metrics: [
            { label: 'Churn Reduction', value: '-30%', sub: 'Retained ARR' },
            { label: 'Retention ROI', value: '4.5×', sub: 'Engagement return' },
            { label: 'Protected Pipeline', value: '$1.8M', sub: 'First 60 days' }
        ]
    },
    {
        id: 'logistics-sdr',
        category: 'Autonomous SDR',
        client: 'Apex Enterprise Logistics',
        title: 'Autonomous Multi-Agent Outbound & Meeting Mesh',
        problem: 'High manual SDR drag with cold outreach, low response rates, and slow qualification time for enterprise freight shippers.',
        solution: 'Deployed persistent multi-agent SDR swarm with hyper-personalized intent research and real-time CRM synchronization.',
        technologies: 'Python, OpenAI GPT-4, HubSpot API, Neo4j',
        image: '/images/hero-agentic-ai.png',
        metrics: [
            { label: 'Meeting Velocity', value: '3.8×', sub: 'Auto-booked meetings' },
            { label: 'Auto-SQL Sourced', value: '80%', sub: 'Zero manual drag' },
            { label: 'CAC Reduction', value: '-65%', sub: 'Outbound efficiency' }
        ]
    },
    {
        id: 'retail-demand',
        category: 'Retail & Demand',
        client: 'Aura Omnichannel Retail',
        title: 'Predictive Demand Discovery & Inventory Optimization',
        problem: 'Stockouts on high-demand trending SKUs combined with rising acquisition costs across fragmented digital advertising channels.',
        solution: 'Engineered dark-funnel demand discovery platform integrated directly with point-of-sale inventory prediction algorithms.',
        technologies: 'PyTorch, BigQuery, Google Cloud, FastAPI',
        image: '/images/industry-retail.png',
        metrics: [
            { label: 'Conversion Lift', value: '+185%', sub: 'Full-funnel yield' },
            { label: 'Forecast Accuracy', value: '98%', sub: 'Demand precision' },
            { label: 'Stockout Reduction', value: '-40%', sub: 'Working capital' }
        ]
    }
];

export default function CaseStudiesSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredStudies = selectedCategory === 'all'
        ? caseStudies
        : caseStudies.filter(c => c.category === selectedCategory);

    return (
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200" id="outcomes">
            {/* Scroll Anchors */}
            <div id="case-studies" className="scroll-mt-28 absolute -top-28 left-0 pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] font-bold text-xs uppercase tracking-wider mb-4 shadow-xs"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            <Sparkles className="w-3.5 h-3.5" />
                            Business Impact & Proof
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] mb-5 tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            Measurable <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] via-[#1E6297] to-[#0A2540]">Enterprise Outcomes</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Verifiable case studies demonstrating substantial revenue acceleration, cost optimization, operational intelligence, and faster decision-making.
                        </p>
                    </motion.div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                        {impactCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    trackEvent({ eventName: 'FILTER_CASE_STUDIES_CLICK', label: cat });
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#0A2540] text-white shadow-md'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 shadow-xs'
                                }`}
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {cat === 'all' ? 'All Case Evidence (04)' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Case Studies Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
                >
                    <AnimatePresence>
                        {filteredStudies.map((study, idx) => (
                            <motion.div
                                key={study.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-slate-200/80 rounded-2xl p-7 sm:p-8 shadow-card hover:shadow-card-hover hover:border-[#2878B5]/40 transition-all duration-300 flex flex-col justify-between h-full group"
                            >
                                <div>
                                    {/* Client Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-xs font-bold text-[#1E6297] uppercase tracking-wider font-mono">
                                            // {study.client}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase bg-[#F0F7FC] px-2.5 py-1 rounded-md border border-[#E1EFF8]">
                                            {study.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540] mb-6 group-hover:text-[#2878B5] transition-colors leading-snug"
                                        style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.02em' }}>
                                        {study.title}
                                    </h3>
                                    
                                    {/* Problem & Solution Flow */}
                                    <div className="space-y-4 mb-8">
                                        <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-slate-700"
                                            style={{ fontFamily: 'Inter, sans-serif' }}>
                                            <div className="flex items-center gap-1.5 font-bold text-red-700 mb-1">
                                                <Layers className="w-3.5 h-3.5" />
                                                <span>Operational Challenge</span>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed font-normal">{study.problem}</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-[#F0F7FC] border border-[#BAE0F8] text-xs sm:text-sm text-slate-700"
                                            style={{ fontFamily: 'Inter, sans-serif' }}>
                                            <div className="flex items-center gap-1.5 font-bold text-[#1E6297] mb-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5]" />
                                                <span>AI Architectural Solution</span>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed font-normal">{study.solution}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 pt-1"
                                            style={{ fontFamily: 'Inter, sans-serif' }}>
                                            <BarChart3 className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
                                            <span><strong>Tech Architecture:</strong> {study.technologies}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Metric Strip */}
                                <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 bg-[#F8FAFC] -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
                                    {study.metrics.map((metric, i) => (
                                        <div key={i} className="text-left">
                                            <div className="text-xl sm:text-2xl font-black text-[#2878B5] tracking-tight"
                                                style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                                                {metric.value}
                                            </div>
                                            <div className="text-xs font-bold text-[#0A2540] uppercase tracking-tight mt-0.5"
                                                style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {metric.label}
                                            </div>
                                            <div className="text-[11px] text-slate-500 font-normal"
                                                style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {metric.sub}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="text-center mt-14">
                    <Link 
                        to="/outcomes" 
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-300 shadow-xs text-sm font-bold rounded-xl text-[#0A2540] bg-white hover:bg-slate-50 hover:border-[#2878B5]/40 transition-all group"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        <span>Explore All Verified Enterprise Case Studies</span>
                        <ArrowRight className="w-4 h-4 text-[#2878B5] group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

