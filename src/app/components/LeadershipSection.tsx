import { useState, useEffect, useCallback } from 'react';
import { Users } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from './ui/carousel';

const teamMembers = [
    { name: "Balaji Venkatraman", role: "Director Growth" },
    { name: "Lavanya Seshadri", role: "Engineering Head" },
    { name: "Vignesh KS", role: "Product Lead" },
    { name: "Dinesh Kumar", role: "Lead AI Engineer" },
    { name: "Hemalata", role: "AI Engineer & Tech Lead" },
    { name: "Prithivin L", role: "Project Lead - EscrowChain" },
    { name: "Shiva Kumar", role: "Senior Product Architect" },
    { name: "Natarajan", role: "Sr Blockchain Architect" },
    { name: "Ritin", role: "Senior AI Architect" },
    { name: "Viswanath", role: "Sr DevOps Engineer" },
    { name: "Subashini Kaushik", role: "AI Engineer - LLM / RAG" },
    { name: "Sonu Priyadarshini", role: "Chief Financial Officer (CFO)" },
    { name: "Aswathi Nair", role: "Corporate Counsel" },
    { name: "Neha Hebber", role: "FinTech Platform Engineer (IIT Bombay)" },
    { name: "Swathi Iyer", role: "IIT Madras - BTech" },
    { name: "Aiswhwarya L Bhatt", role: "AI Performance Marketing & Strategy" },
    { name: "Chintiya Liu", role: "Industry Consultant" },
    { name: "Kallol Pal", role: "Technology Advisor" },
    { name: "Soumya S", role: "Company Secretary & Advisor" },
    { name: "Annapoorani", role: "Automation Engineering (Intern)" },
    { name: "Poojasri", role: "AI/ML Engineer" },
];

export default function LeadershipSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback((emblaApi: CarouselApi) => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;
        setScrollSnaps(api.scrollSnapList());
        onSelect(api);
        api.on('select', onSelect);
        api.on('reInit', () => {
            setScrollSnaps(api.scrollSnapList());
            onSelect(api);
        });
    }, [api, onSelect]);

    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-[#0066FF]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0066FF] via-white to-white opacity-60"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0066FF]/40 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-white rounded-xl mb-4 border border-[#0066FF] backdrop-blur-sm">
                        <Users className="w-5 h-5 text-[#0066FF] mr-2" />
                        <span className="text-[#0066FF] font-semibold text-sm tracking-wide uppercase">World-Class Talent</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0066FF] mb-6 tracking-tight">
                        Leadership & <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0066FF]">Teams</span>
                    </h2>
                    <p className="text-lg text-[#0066FF] max-w-2xl mx-auto leading-relaxed">
                        A powerhouse of AI architects, blockchain experts, and industry consultants building the future of autonomous revenue.
                    </p>
                </div>

                <Carousel
                    setApi={setApi}
                    opts={{ align: 'start', loop: true, slidesToScroll: 'auto' }}
                    className="px-1 sm:px-2"
                >
                    <CarouselContent>
                        {teamMembers.map((member, index) => (
                            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="group relative bg-white border border-[#0066FF] rounded-2xl p-6 h-full hover:bg-[#0066FF]/10 hover:border-[#0066FF] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/50 to-[#0066FF]/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0066FF] border border-[#0066FF] flex items-center justify-center shrink-0 group-hover:border-[#0066FF] group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-[#0066FF] font-bold text-sm">
                                                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-[#0066FF] font-bold text-base truncate pr-2 group-hover:text-[#0066FF] transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-[#0066FF] font-medium truncate mt-0.5">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6 bg-white" />
                    <CarouselNext className="hidden sm:flex -right-4 lg:-right-6 bg-white" />
                </Carousel>

                {/* Pagination Dots */}
                {scrollSnaps.length > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-10 px-4">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-6 bg-[#0066FF]' : 'w-2 bg-white hover:bg-[#0066FF]/10'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
