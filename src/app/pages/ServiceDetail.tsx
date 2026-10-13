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
                <div className="flex items-center text-sm text-[#0066FF] font-medium">
                    <Link to="/" className="hover:text-[#0066FF] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-[#0066FF]">{data.category}</span>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-[#0066FF] font-bold">{data.title}</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0066FF] text-[#0066FF] text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>
                            {data.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0066FF] tracking-tight mb-6 font-heading leading-[1.1]">
                            {data.title}
                        </h1>
                        <p className="text-lg md:text-xl text-[#0066FF] font-medium mb-8 leading-relaxed max-w-2xl">
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
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF] to-indigo-50 rounded-[24px] transform rotate-3 scale-105 -z-10"></div>
                        <div className="bg-white border border-[#0066FF] rounded-[24px] p-8 shadow-premium h-full min-h-[400px] flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-grid-slate-100/[0.2] bg-[size:20px_20px]"></div>
                            
                            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 mix-blend-multiply group-hover:bg-[#0066FF] transition-colors duration-700"></div>
                            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 mix-blend-multiply group-hover:bg-[#0066FF] transition-colors duration-700"></div>

                            <div className="relative z-10 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                                    <div className="w-16 h-16 bg-[#0066FF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0">
                                        <Rocket className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0066FF] leading-tight">{data.title}</h3>
                                        <p className="text-sm font-bold text-[#0066FF] uppercase tracking-widest mt-1">Enterprise Grade Architecture</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.features?.slice(0, 4).map((feature: any, i: number) => (
                                        <div key={i} className="bg-white/80 backdrop-blur-md border border-[#0066FF] p-5 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#0066FF] transition-all duration-300">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#0066FF]">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-[#0066FF] mb-1 leading-tight">{feature.title}</h4>
                                                    <p className="text-xs text-[#0066FF] font-medium line-clamp-2 leading-relaxed">{feature.desc}</p>
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
            <div className="bg-white border-y border-[#0066FF] py-20 lg:py-28">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0066FF] mb-6 font-heading">Key Capabilities</h2>
                        <p className="text-lg text-[#0066FF] font-medium">Discover how our targeted approach to {data.title} can transform your operations.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {data.features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[20px] border border-[#0066FF] shadow-sm hover:shadow-premium transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white text-[#0066FF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                                    {idx === 0 ? <Zap className="w-6 h-6" /> : idx === 1 ? <Rocket className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold text-[#0066FF] mb-3">{feature.title}</h3>
                                <p className="text-[#0066FF] font-medium leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Grid */}
                    <div className="bg-white rounded-[24px] border border-[#0066FF] p-8 lg:p-12 shadow-sm">
                        <h3 className="text-2xl font-bold text-[#0066FF] mb-8 text-center">Business Benefits</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {data.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="mt-1">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <p className="text-[#0066FF] font-bold text-lg">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            
            {/* Conditional: Use Cases */}
            {data.useCases && (
                <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-[#0066FF] text-center font-heading">Key Use Cases</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.useCases.map((uc, i) => (
                            <div key={i} className="p-8 border border-[#0066FF] rounded-[20px] bg-white shadow-sm hover:border-[#0066FF] transition-colors">
                                <h3 className="text-xl font-bold text-[#0066FF] mb-3">{uc.title}</h3>
                                <p className="text-[#0066FF] font-medium">{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Conditional: Technologies */}
            {data.technologies && (
                <div className="bg-white text-white py-20 lg:py-28">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-12 font-heading">Powered by Leading Technologies</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.technologies.map((tech, i) => (
                                <span key={i} className="px-6 py-3 bg-white/10 rounded-full font-bold text-sm hover:bg-[#0066FF] transition-colors cursor-default">
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
                    <h2 className="text-3xl font-bold mb-12 text-[#0066FF] text-center font-heading">Reference Architecture</h2>
                    {data.architectureDiagrams.map((arch, i) => (
                        <div key={i} className="max-w-5xl mx-auto mb-16 text-center">
                            <img src={arch.src} alt={arch.title} className="w-full h-auto rounded-[24px] shadow-premium mb-8 border border-[#0066FF]" />
                            <h3 className="text-2xl font-bold text-[#0066FF] mb-4">{arch.title}</h3>
                            <p className="text-[#0066FF] text-lg max-w-3xl mx-auto">{arch.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Conditional: KPIs */}
            {data.kpis && (
                <div className="bg-[#0066FF] text-white py-20 lg:py-28">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                            {data.kpis.map((kpi, i) => (
                                <div key={i} className="pt-8 md:pt-0">
                                    <div className="text-5xl lg:text-6xl font-extrabold mb-4 font-heading">{kpi.metric}</div>
                                    <div className="text-lg font-bold text-[#0066FF]">{kpi.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Conditional: Success Stories */}
            {data.successStories && (
                <div className="py-20 lg:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-white border-y border-[#0066FF]">
                    <h2 className="text-3xl font-bold mb-12 text-[#0066FF] text-center font-heading">Proven Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.successStories.map((story, i) => (
                            <div key={i} className="p-8 bg-white border border-[#0066FF] rounded-[20px]">
                                <h3 className="text-2xl font-bold text-[#0066FF] mb-4">{story.title}</h3>
                                <p className="text-[#0066FF] text-lg">{story.description}</p>
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
                            <h2 className="text-3xl font-bold mb-12 text-[#0066FF] text-center font-heading">Engagement Models</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {data.serviceModels.map((model: any, i: number) => (
                                    <div key={i} className="p-8 border-2 border-[#0066FF] hover:border-[#0066FF] rounded-[20px] transition-colors">
                                        <h3 className="text-xl font-bold text-[#0066FF] mb-3">{model.title}</h3>
                                        <p className="text-[#0066FF] font-medium">{model.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.projectLifecycle && (
                        <div>
                            <h2 className="text-3xl font-bold mb-12 text-[#0066FF] text-center font-heading">Our Delivery Methodology</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {data.projectLifecycle.map((step: any, i: number) => (
                                    <div key={i} className="relative p-6 bg-white rounded-[20px] border border-[#0066FF]">
                                        <div className="text-4xl font-black text-[#0066FF] mb-4 font-heading">0{i+1}</div>
                                        <h3 className="text-xl font-bold text-[#0066FF] mb-2">{step.step}</h3>
                                        <p className="text-[#0066FF] text-sm font-medium">{step.desc}</p>
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
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0066FF] mb-12 text-center font-heading">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {data.faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-[#0066FF] rounded-[20px] p-6 lg:p-8 hover:border-[#0066FF] transition-colors">
                                <h4 className="text-xl font-bold text-[#0066FF] mb-3">{faq.question}</h4>
                                <p className="text-[#0066FF] font-medium leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
