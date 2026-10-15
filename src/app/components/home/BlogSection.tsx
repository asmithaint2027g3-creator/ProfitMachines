import { ArrowRight, Calendar, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogs = [
    {
        category: 'AI Insights',
        title: 'The Future of Autonomous Enterprise Agents in 2026',
        excerpt: 'How large language models are moving from conversational interfaces to autonomous action-takers in the enterprise.',
        author: 'Sarah Jenkins',
        date: 'Jul 15, 2026',
        color: 'from-emerald-600 to-emerald-600',
        link: '/#blogs'
    },
    {
        category: 'Industry Trends',
        title: 'Why FinTech is Adopting AI Faster Than Any Other Sector',
        excerpt: 'An analysis of regulatory compliance and fraud detection pipelines powered by real-time machine learning.',
        author: 'Michael Chang',
        date: 'Jul 10, 2026',
        color: 'from-emerald-400 to-teal-500',
        link: '/#blogs'
    },
    {
        category: 'Enterprise Technology',
        title: 'Migrating Legacy Monoliths to AI-Native Microservices',
        excerpt: 'A step-by-step guide on how modern enterprises are rebuilding their core infrastructure for the AI era.',
        author: 'David Rodriguez',
        date: 'Jul 05, 2026',
        color: 'from-teal-500 to-fuchsia-500',
        link: '/#blogs'
    }
];

export default function BlogSection() {
    return (
        <section className="pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24 bg-slate-50 relative overflow-hidden" id="blogs">
            <div className="absolute inset-0 bg-grid-slate-200 opacity-40 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1EFF8] border border-[#BAE0F8] text-[#1E6297] font-bold text-xs tracking-wider uppercase mb-4 shadow-xs"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Knowledge Base
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] mb-4 tracking-tight leading-[1.08]"
                            style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.025em' }}>
                            Latest from ProfitMachines
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 font-normal"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            Insights, trends, and thought leadership on enterprise AI and digital transformation.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <Link to="/resources" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-sm font-bold text-[#0A2540] shadow-xs hover:border-[#2878B5]/40 transition-all group"
                            style={{ fontFamily: 'Inter, sans-serif' }}>
                            <span>View All Articles</span>
                            <ArrowRight className="w-4 h-4 text-[#2878B5] transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-[#2878B5]/40 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden"
                        >
                            {/* Decorative Gradient Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2878B5] via-[#5CAAE6] to-[#1E6297] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div>
                                <div className="w-11 h-11 rounded-xl bg-[#E1EFF8] border border-[#BAE0F8]/60 flex items-center justify-center mb-5 group-hover:bg-[#2878B5] text-[#2878B5] group-hover:text-white transition-all shadow-xs">
                                    <FileText className="w-5 h-5 transition-colors" />
                                </div>
                                <div className="inline-block px-2.5 py-1 rounded-md bg-[#F0F7FC] text-[10px] font-bold text-[#1E6297] tracking-wider uppercase mb-3 border border-[#E1EFF8]"
                                    style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {blog.category}
                                </div>
                                <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#2878B5] transition-colors line-clamp-3 leading-snug"
                                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', letterSpacing: '-0.02em' }}>
                                    {blog.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-normal mb-6"
                                    style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {blog.excerpt}
                                </p>
                            </div>
                                
                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold"
                                    style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-[#2878B5]" /> {blog.author}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {blog.date}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
