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
        <section className="py-20 md:py-24 lg:py-32 bg-[#F7F8F5] relative overflow-hidden border-b border-slate-200" id="blogs">
            <div className="absolute inset-0 bg-grid-slate-200 opacity-40 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 lg:mb-20">
                    <div className="max-w-2xl">
                        <div className="eyebrow mb-3">
                            <span className="dot"></span>
                            <span>Knowledge Base · Research &amp; Field Intelligence</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm font-heading">
                            Latest from ProfitMachines
                        </h2>
                        <p className="text-lg text-slate-600 font-normal">
                            Insights, trends, and thought leadership on enterprise AI and digital transformation.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Link to="/#blogs" className="btn-cta-secondary bg-white group">
                            View All Articles
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
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
                            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-500 group flex flex-col h-full relative overflow-hidden"
                        >
                            {/* Decorative Gradient Bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${blog.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                            
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                </div>
                                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-4 group-hover:bg-emerald-50 group-hover:text-[#064e3b] transition-colors">
                                    {blog.category}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#053d2e] transition-colors line-clamp-3">
                                    {blog.title}
                                </h3>
                                <p className="text-slate-600 text-base leading-relaxed line-clamp-3 font-medium">
                                    {blog.excerpt}
                                </p>
                            </div>
                                
                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-wide">
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-slate-400" /> {blog.author}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-slate-400" /> {blog.date}
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
