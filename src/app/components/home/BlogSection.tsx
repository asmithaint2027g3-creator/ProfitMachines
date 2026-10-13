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
        color: 'from-[#0066FF] to-[#0066FF]',
        link: '/#blogs'
    },
    {
        category: 'Industry Trends',
        title: 'Why FinTech is Adopting AI Faster Than Any Other Sector',
        excerpt: 'An analysis of regulatory compliance and fraud detection pipelines powered by real-time machine learning.',
        author: 'Michael Chang',
        date: 'Jul 10, 2026',
        color: 'from-[#0066FF] to-[#0066FF]',
        link: '/#blogs'
    },
    {
        category: 'Enterprise Technology',
        title: 'Migrating Legacy Monoliths to AI-Native Microservices',
        excerpt: 'A step-by-step guide on how modern enterprises are rebuilding their core infrastructure for the AI era.',
        author: 'David Rodriguez',
        date: 'Jul 05, 2026',
        color: 'from-[#0066FF] to-fuchsia-500',
        link: '/#blogs'
    }
];

export default function BlogSection() {
    return (
        <section className="py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden border-b-2 border-[#0066FF]" id="blogs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 lg:mb-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0066FF] bg-white text-xs font-bold text-[#0066FF] uppercase mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                            <span>Knowledge Base · Research &amp; Field Intelligence</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0066FF] mb-6 tracking-tight font-heading">
                            Latest from ProfitMachines
                        </h2>
                        <p className="text-lg text-[#0066FF] font-medium">
                            Insights, trends, and thought leadership on enterprise AI and digital transformation.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Link to="/#blogs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#0066FF] bg-white text-[#0066FF] font-bold text-sm hover:bg-[#0066FF] hover:text-white transition-all group">
                            <span>View All Articles</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                            className="bg-white rounded-3xl p-8 border-2 border-[#0066FF] transition-all duration-200 hover:-translate-y-1 group flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#0066FF] flex items-center justify-center mb-6 text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="inline-block px-3 py-1 rounded-full bg-white border-2 border-[#0066FF] text-[10px] font-bold text-[#0066FF] tracking-wider uppercase mb-4">
                                    {blog.category}
                                </div>
                                <h3 className="text-2xl font-bold text-[#0066FF] mb-4 line-clamp-3">
                                    {blog.title}
                                </h3>
                                <p className="text-[#0066FF] text-base leading-relaxed line-clamp-3 font-normal">
                                    {blog.excerpt}
                                </p>
                            </div>
                                
                            <div className="mt-auto flex items-center justify-between border-t-2 border-[#0066FF] pt-6">
                                <div className="flex items-center gap-4 text-xs text-[#0066FF] font-bold uppercase tracking-wide">
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-[#0066FF]" /> {blog.author}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-[#0066FF]" /> {blog.date}
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
