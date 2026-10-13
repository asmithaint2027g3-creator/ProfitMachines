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
        <section className="py-20 md:py-28 bg-white relative overflow-hidden border-b-2 border-[#0066FF]" id="outcomes">
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0066FF] bg-white text-xs font-bold text-[#0066FF] uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                            <span>Business Impact &amp; Verifiable Proof</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight font-heading">
                            Measurable Enterprise Outcomes
                        </h2>
                        <p className="text-base sm:text-lg text-[#0066FF] leading-relaxed font-medium max-w-2xl mx-auto">
                            Verifiable case studies demonstrating substantial revenue acceleration, cost optimization, operational intelligence, and faster decision-making.
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-[#0066FF] mt-8">
                        {impactCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    trackEvent({ eventName: 'FILTER_CASE_STUDIES_CLICK', label: cat });
                                }}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${
                                    selectedCategory === cat
                                        ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                        : 'bg-white text-[#0066FF] border-transparent hover:border-[#0066FF]'
                                }`}
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
                        {filteredStudies.map((study) => (
                            <motion.div
                                key={study.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border-2 border-[#0066FF] rounded-3xl p-7 sm:p-8 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full group"
                            >
                                <div>
                                    {/* Client Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-xs font-bold text-[#0066FF] uppercase tracking-wider font-mono">
                                            // {study.client}
                                        </div>
                                        <span className="text-[10px] font-bold text-[#0066FF] uppercase bg-white px-2.5 py-1 rounded-md border-2 border-[#0066FF]">
                                            {study.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#0066FF] mb-6 font-heading leading-snug">
                                        {study.title}
                                    </h3>
                                    
                                    {/* Problem & Solution Flow */}
                                    <div className="space-y-4 mb-8">
                                        <div className="p-4 rounded-xl bg-white border-2 border-[#0066FF] text-xs sm:text-sm text-[#0066FF]">
                                            <div className="flex items-center gap-1.5 font-bold text-[#0066FF] mb-1">
                                                <Layers className="w-3.5 h-3.5" />
                                                <span>Operational Challenge</span>
                                            </div>
                                            <p className="text-[#0066FF] leading-relaxed font-normal">{study.problem}</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-white border-2 border-[#0066FF] text-xs sm:text-sm text-[#0066FF]">
                                            <div className="flex items-center gap-1.5 font-bold text-[#0066FF] mb-1">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>AI Architectural Solution</span>
                                            </div>
                                            <p className="text-[#0066FF] leading-relaxed font-normal">{study.solution}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF] pt-1">
                                            <BarChart3 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                                            <span><strong>Tech Architecture:</strong> {study.technologies}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Metric Strip */}
                                <div className="grid grid-cols-3 gap-3 border-t-2 border-[#0066FF] pt-6 bg-white -mx-7 sm:-mx-8 -mb-7 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
                                    {study.metrics.map((metric, i) => (
                                        <div key={i} className="text-left">
                                            <div className="text-xl sm:text-2xl font-black text-[#0066FF] font-mono tracking-tight">
                                                {metric.value}
                                            </div>
                                            <div className="text-xs font-bold text-[#0066FF] uppercase tracking-tight mt-0.5">
                                                {metric.label}
                                            </div>
                                            <div className="text-[11px] text-[#0066FF] font-medium">
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
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#0066FF] text-sm font-bold rounded-xl text-white bg-[#0066FF] hover:bg-white hover:text-[#0066FF] transition-all group"
                    >
                        <span>Explore All Verified Enterprise Case Studies</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-[#0066FF] group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

