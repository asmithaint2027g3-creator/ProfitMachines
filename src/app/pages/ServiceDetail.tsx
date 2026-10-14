import { useParams, Navigate, Link } from 'react-router-dom';
import { servicesData } from '../../data/navigationContent';
import { ArrowRight, CheckCircle, ChevronRight, Zap, Shield, Rocket } from 'lucide-react';
import { useEffect } from 'react';

export default function ServiceDetail() {
    const { slug } = useParams<{ slug: string }>();
    
    // Scroll to top on mount or when slug changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!slug || !servicesData[slug]) {
        return <Navigate to="/" replace />;
    }

    const data = servicesData[slug];

    return (
        <div className="pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
            {/* Breadcrumbs */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="flex items-center text-sm text-slate-500 font-medium">
                    <Link to="/" className="hover:text-[#2878B5] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-slate-400">{data.category}</span>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-[#2878B5] font-bold">{data.title}</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#2878B5] text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                            {data.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 font-heading leading-[1.1]">
                            {data.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 font-medium mb-8 leading-relaxed max-w-2xl">
                            {data.heroDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/book-consultation" className="btn-cta-primary min-h-[56px] text-base group inline-flex items-center justify-center gap-2">
                                Discuss Your Project
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-indigo-50 rounded-[24px] transform rotate-3 scale-105 -z-10"></div>
                        <div className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-premium h-full min-h-[400px] flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-grid-slate-100/[0.2] bg-[size:20px_20px]"></div>
                            
                            <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 mix-blend-multiply group-hover:bg-emerald-100 transition-colors duration-700"></div>
                            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 mix-blend-multiply group-hover:bg-emerald-100 transition-colors duration-700"></div>

                            <div className="relative z-10 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                                    <div className="w-16 h-16 bg-[#2878B5] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0">
                                        <Rocket className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">{data.title}</h3>
                                        <p className="text-sm font-bold text-[#2878B5] uppercase tracking-widest mt-1">Enterprise Grade Architecture</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.features?.slice(0, 4).map((feature: any, i: number) => (
                                        <div key={i} className="bg-white/80 backdrop-blur-md border border-slate-100 p-5 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-100 transition-all duration-300">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#2878B5]">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900 mb-1 leading-tight">{feature.title}</h4>
                                                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">{feature.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features & Benefits */}
            <div className="bg-slate-50 border-y border-slate-100 py-20 lg:py-28">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 font-heading">Key Capabilities</h2>
                        <p className="text-lg text-slate-600 font-medium">Discover how our targeted approach to {data.title} can transform your operations.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {data.features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[20px] border border-slate-200 shadow-sm hover:shadow-premium transition-all duration-300 group">
                                <div className="w-12 h-12 bg-emerald-50 text-[#2878B5] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2878B5] group-hover:text-white transition-all">
                                    {idx === 0 ? <Zap className="w-6 h-6" /> : idx === 1 ? <Rocket className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Grid */}
                    <div className="bg-white rounded-[24px] border border-slate-200 p-8 lg:p-12 shadow-sm">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Business Benefits</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {data.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <p className="text-slate-700 font-bold text-lg">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            
            {/* Conditional: Use Cases */}
            {data.useCases && (
                <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-slate-900 text-center font-heading">Key Use Cases</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.useCases.map((uc, i) => (
                            <div key={i} className="p-8 border border-slate-200 rounded-[20px] bg-white shadow-sm hover:border-emerald-300 transition-colors">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{uc.title}</h3>
                                <p className="text-slate-600 font-medium">{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Conditional: Technologies */}
            {data.technologies && (
                <div className="bg-slate-900 text-white py-20 lg:py-28">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-12 font-heading">Powered by Leading Technologies</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.technologies.map((tech, i) => (
                                <span key={i} className="px-6 py-3 bg-white/10 rounded-full font-bold text-sm hover:bg-[#2878B5] transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Conditional: Architecture Diagrams */}
            {data.architectureDiagrams && (
                <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-12 text-slate-900 text-center font-heading">Reference Architecture</h2>
                    {data.architectureDiagrams.map((arch, i) => (
                        <div key={i} className="max-w-5xl mx-auto mb-16 text-center">
                            <img src={arch.src} alt={arch.title} className="w-full h-auto rounded-[24px] shadow-premium mb-8 border border-slate-200" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{arch.title}</h3>
                            <p className="text-slate-600 text-lg max-w-3xl mx-auto">{arch.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Conditional: KPIs */}
            {data.kpis && (
                <div className="bg-[#2878B5] text-white py-20 lg:py-28">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                            {data.kpis.map((kpi, i) => (
                                <div key={i} className="pt-8 md:pt-0">
                                    <div className="text-5xl lg:text-6xl font-extrabold mb-4 font-heading">{kpi.metric}</div>
                                    <div className="text-lg font-bold text-emerald-100">{kpi.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Conditional: Success Stories */}
            {data.successStories && (
                <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-100">
                    <h2 className="text-3xl font-bold mb-12 text-slate-900 text-center font-heading">Proven Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.successStories.map((story, i) => (
                            <div key={i} className="p-8 bg-white border border-slate-200 rounded-[20px]">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{story.title}</h3>
                                <p className="text-slate-600 text-lg">{story.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Conditional: Service Models & Project Lifecycle */}
            {(data.serviceModels || data.projectLifecycle) && (
                <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    {data.serviceModels && (
                        <div className="mb-24">
                            <h2 className="text-3xl font-bold mb-12 text-slate-900 text-center font-heading">Engagement Models</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {data.serviceModels.map((model: any, i: number) => (
                                    <div key={i} className="p-8 border-2 border-slate-100 hover:border-emerald-600 rounded-[20px] transition-colors">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{model.title}</h3>
                                        <p className="text-slate-600 font-medium">{model.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.projectLifecycle && (
                        <div>
                            <h2 className="text-3xl font-bold mb-12 text-slate-900 text-center font-heading">Our Delivery Methodology</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {data.projectLifecycle.map((step: any, i: number) => (
                                    <div key={i} className="relative p-6 bg-slate-50 rounded-[20px] border border-slate-200">
                                        <div className="text-4xl font-black text-slate-200 mb-4 font-heading">0{i+1}</div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.step}</h3>
                                        <p className="text-slate-600 text-sm font-medium">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* FAQs */}
            <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center font-heading">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {data.faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-[20px] p-6 lg:p-8 hover:border-emerald-200 transition-colors">
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h4>
                                <p className="text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
