import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Menu, X, ArrowRight, ChevronDown, Rocket, Shield, Globe, Cpu, Zap, Lightbulb, Link as LinkIcon, Lock,
    MessageSquare, Briefcase, BarChart, Database, MapPin,
    BrainCircuit, Network, Sparkles, Building2, Bot, Cloud, Workflow, GitMerge, RefreshCw,
    FileCode2, Coins, Boxes, Server, Image, TrendingUp, PieChart, Settings, Smile, Layers, DollarSign,
    Brain, CloudRain, Building, AppWindow, Code2, ShieldCheck, Users, HeartPulse, Landmark, ShoppingBag,
    Factory, GraduationCap, Truck, Home, Radio, Wrench, CloudCog, UserPlus, Layout, Search, LifeBuoy, BookOpen,
    Handshake, Info, Target, FileText, Phone, ChevronRight, Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { smNavItems } from '../../data/navigationContent';

const Icons: any = {
    BrainCircuit, Network, Sparkles, Building2, Bot, Cloud, Workflow, GitMerge, RefreshCw, Briefcase, Shield, Database,
    Link: LinkIcon, Globe, FileCode2, Coins, Boxes, Server, Image, MessageSquare, TrendingUp, BarChart, PieChart, Settings,
    Smile, Layers, Cpu, DollarSign, Brain, CloudRain, Building, AppWindow, Zap, Code2, ShieldCheck, Users, HeartPulse,
    Landmark, ShoppingBag, Factory, GraduationCap, Truck, Home, Radio, Lightbulb, Wrench, CloudCog, UserPlus, Layout,
    Search, LifeBuoy, BookOpen, Handshake, Info, Target, FileText, Phone, Rocket, Lock, MapPin, Activity
};

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [expandedMobile, setExpandedMobile] = useState<string[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [activeCatMap, setActiveCatMap] = useState<Record<string, string>>({});
    const menuRef = useRef<HTMLDivElement>(null);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setActiveMenu(null);
        setMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMenu(null); };
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setActiveMenu(null);
        };
        document.addEventListener('keydown', handleKey);
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const isHomeHero = location.pathname === '/' && !scrolled;

    const openMenu = useCallback((name: string, item: any) => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        if (!item.dropdown) { setActiveMenu(null); return; }
        setActiveMenu(name);
        if (item.dropdown.categories && !activeCatMap[name]) {
            setActiveCatMap(prev => ({ ...prev, [name]: item.dropdown.categories[0]?.id }));
        }
    }, [activeCatMap]);

    const closeMenuDelayed = useCallback(() => {
        hoverTimeout.current = setTimeout(() => setActiveMenu(null), 120);
    }, []);

    const keepMenuOpen = useCallback(() => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    }, []);

    const getActiveCatId = (item: any): string | null => {
        const cats = item.dropdown?.categories;
        if (!cats) return null;
        return activeCatMap[item.name] ?? cats[0]?.id ?? null;
    };

    const getActiveCatData = (item: any) => {
        const id = getActiveCatId(item);
        return item.dropdown?.categories?.find((c: any) => c.id === id) ?? null;
    };

    const isItemActive = (item: any): boolean => {
        if (location.pathname === item.path) return true;
        if (item.dropdown?.categories) {
            return item.dropdown.categories.some((cat: any) =>
                cat.items?.some((sub: any) => sub.path === location.pathname)
            );
        }
        return false;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b h-16 lg:h-[72px] flex items-center ${
                isHomeHero
                    ? 'bg-[#064e3b]/95 backdrop-blur-md border-emerald-500/20 text-white shadow-sm'
                    : 'bg-white/98 backdrop-blur-md shadow-sm border-slate-200/80 text-slate-900'
            }`}
            ref={menuRef}
        >
            <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] h-full relative">
                <div className="flex items-center justify-between h-full gap-4">

                    {/* Logo */}
                    <div className="flex-shrink-0 relative z-50">
                        <Link to="/" className="flex items-center gap-2 group" aria-label="ProfitMachines home">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-[11px] shadow-sm flex-shrink-0 ${
                                isHomeHero ? 'bg-white/15 text-emerald-200 border border-emerald-400/30' : 'bg-[#064e3b] text-white'
                            }`}>PM</div>
                            <div className={`text-xl md:text-2xl font-extrabold tracking-tight font-heading transition-colors ${
                                isHomeHero ? 'text-white' : 'text-slate-900'
                            }`}>
                                <span>Profit</span>
                                <span className={isHomeHero ? 'text-emerald-300' : 'text-[#064e3b]'}>Machines</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center h-full gap-0.5 xl:gap-1">
                        {(smNavItems as any[]).map((item: any) => {
                            const isActive = isItemActive(item);
                            const hasDropdown = Boolean(item.dropdown);
                            const isOpen = activeMenu === item.name;
                            return (
                                <div key={item.name} className="h-full flex items-center relative"
                                    onMouseEnter={() => openMenu(item.name, item)}
                                    onMouseLeave={closeMenuDelayed}>
                                    <Link
                                        to={item.path}
                                        id={`nav-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className={`relative text-[13.5px] xl:text-[14px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#064e3b]/50 ${
                                            isHomeHero
                                                ? isActive ? 'bg-white/15 text-white font-bold' : 'text-emerald-50/90 hover:text-white hover:bg-white/10'
                                                : isActive ? 'bg-[#064e3b]/8 text-[#064e3b] font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                                        }`}
                                    >
                                        {item.name}
                                        {hasDropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''} ${isHomeHero ? 'text-emerald-200/70' : 'text-slate-400'}`} />
                                        )}
                                        {isActive && !isHomeHero && (
                                            <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#064e3b] rounded-full" />
                                        )}
                                    </Link>

                                    {hasDropdown && (
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                                    onMouseEnter={keepMenuOpen}
                                                    onMouseLeave={closeMenuDelayed}
                                                    className="absolute top-[calc(100%+4px)] left-0 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex"
                                                    style={{ width: 860, maxWidth: 'calc(100vw - 32px)', transformOrigin: 'top left' }}
                                                >
                                                    <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

                                                    {item.dropdown.categories ? (
                                                        <>
                                                            {/* LEFT: Numbered category list */}
                                                            <div className="w-[260px] shrink-0 bg-slate-50/70 border-r border-slate-100 p-4 flex flex-col gap-1 overflow-y-auto max-h-[480px]">
                                                                <div className="flex items-center justify-between mb-3 px-1">
                                                                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                                                                        {item.dropdown.highlight?.title || item.name}
                                                                    </span>
                                                                    <span className="text-[9.5px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                                        {item.dropdown.categories.length} CLUSTERS
                                                                    </span>
                                                                </div>
                                                                {item.dropdown.categories.map((cat: any, idx: number) => {
                                                                    const isActiveCat = getActiveCatId(item) === cat.id;
                                                                    const targetPath = cat.path || `/${item.name.toLowerCase()}/${cat.id}`;
                                                                    return (
                                                                        <Link key={cat.id} to={targetPath}
                                                                            onClick={() => setActiveMenu(null)}
                                                                            onMouseEnter={() => setActiveCatMap(prev => ({ ...prev, [item.name]: cat.id }))}
                                                                            className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none ${
                                                                                isActiveCat
                                                                                    ? 'bg-[#064e3b] text-white shadow-sm'
                                                                                    : 'text-slate-700 hover:bg-white hover:shadow-sm hover:text-slate-900'
                                                                            }`}
                                                                        >
                                                                            <span className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black mt-0.5 ${
                                                                                isActiveCat ? 'bg-white/20 text-white' : 'bg-[#064e3b]/10 text-[#064e3b] group-hover:bg-[#064e3b]/15'
                                                                            }`}>
                                                                                {String(idx + 1).padStart(2, '0')}
                                                                            </span>
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className={`text-[13px] font-bold leading-tight ${isActiveCat ? 'text-white' : 'text-slate-800'}`}>
                                                                                    {cat.title}
                                                                                </div>
                                                                                {cat.desc && (
                                                                                    <div className={`text-[11px] leading-snug mt-0.5 ${isActiveCat ? 'text-emerald-100' : 'text-slate-500'}`}>
                                                                                        {cat.desc}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-1 transition-transform ${
                                                                                isActiveCat ? 'text-emerald-200' : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                                                                            }`} />
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>

                                                            {/* RIGHT: Card grid */}
                                                            <div className="flex-1 p-5 flex flex-col overflow-y-auto max-h-[480px]">
                                                                {(() => {
                                                                    const cat = getActiveCatData(item);
                                                                    if (!cat) return null;
                                                                    const catIndex = item.dropdown.categories.findIndex((c: any) => c.id === cat.id);
                                                                    const isProfitPool = item.name === 'Offerings' && cat.id === 'profit-pools';
                                                                    return (
                                                                        <motion.div key={cat.id} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>
                                                                            <div className="flex items-center gap-2.5 mb-3">
                                                                                <span className="text-[9.5px] font-black tracking-[0.18em] uppercase text-[#064e3b] bg-[#064e3b]/8 px-2 py-0.5 rounded-md border border-[#064e3b]/10">
                                                                                    CLUSTER {String(catIndex + 1).padStart(2, '00')}
                                                                                </span>
                                                                                <h3 className="text-[15px] font-extrabold text-slate-900 font-heading leading-none">{cat.title}</h3>
                                                                            </div>
                                                                            {cat.desc && <p className="text-[12.5px] text-slate-500 mb-4 leading-relaxed">{cat.desc}</p>}

                                                                            {isProfitPool ? (
                                                                                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                                                                                    <div>
                                                                                        <Link to="/offerings/b2b" onClick={() => setActiveMenu(null)}
                                                                                            className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#064e3b] border-b border-[#064e3b]/20 pb-1.5 mb-2 flex items-center gap-1 hover:text-emerald-700 transition-colors">
                                                                                            B2B Profit Pools <ArrowRight className="w-3 h-3" />
                                                                                        </Link>
                                                                                        {(cat as any).b2bItems?.map((sub: any, i: number) => {
                                                                                            const Icon = Icons[sub.icon] || ArrowRight;
                                                                                            return (
                                                                                                <Link key={i} to={sub.path} onClick={() => setActiveMenu(null)}
                                                                                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12.5px] text-slate-600 font-medium hover:text-[#064e3b] hover:bg-emerald-50/60 transition-all group/sub">
                                                                                                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#064e3b] shrink-0" />
                                                                                                    <span className="truncate">{sub.name}</span>
                                                                                                </Link>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                    <div>
                                                                                        <Link to="/offerings/b2c" onClick={() => setActiveMenu(null)}
                                                                                            className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-teal-700 border-b border-teal-200 pb-1.5 mb-2 flex items-center gap-1 hover:text-teal-900 transition-colors">
                                                                                            B2C Profit Pools <ArrowRight className="w-3 h-3" />
                                                                                        </Link>
                                                                                        {(cat as any).b2cItems?.map((sub: any, i: number) => {
                                                                                            const Icon = Icons[sub.icon] || ArrowRight;
                                                                                            return (
                                                                                                <Link key={i} to={sub.path} onClick={() => setActiveMenu(null)}
                                                                                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12.5px] text-slate-600 font-medium hover:text-teal-800 hover:bg-teal-50/60 transition-all group/sub">
                                                                                                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-teal-700 shrink-0" />
                                                                                                    <span className="truncate">{sub.name}</span>
                                                                                                </Link>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                    {cat.items?.map((sub: any, i: number) => {
                                                                                        const Icon = Icons[sub.icon] || ArrowRight;
                                                                                        return (
                                                                                            <Link key={i} to={sub.path} onClick={() => setActiveMenu(null)}
                                                                                                className="group/card flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-[#064e3b]/20 hover:bg-emerald-50/30 hover:shadow-sm transition-all duration-150">
                                                                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/card:bg-[#064e3b] group-hover/card:border-[#064e3b] transition-all duration-200">
                                                                                                    <Icon className="w-4 h-4 text-slate-400 group-hover/card:text-white transition-colors" />
                                                                                                </div>
                                                                                                <div className="flex-1 min-w-0 pt-0.5">
                                                                                                    <div className="text-[12.5px] font-semibold text-slate-800 group-hover/card:text-[#064e3b] leading-snug transition-colors">{sub.name}</div>
                                                                                                </div>
                                                                                            </Link>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            )}

                                                                            {cat.path && (
                                                                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                                                                                    <Link to={cat.path} onClick={() => setActiveMenu(null)}
                                                                                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#064e3b] hover:text-emerald-700 transition-colors group/cta">
                                                                                        Explore {cat.title}
                                                                                        <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
                                                                                    </Link>
                                                                                </div>
                                                                            )}
                                                                        </motion.div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="p-6 w-full flex flex-col justify-center">
                                                            <div className="text-lg font-extrabold text-slate-900 font-heading mb-2">
                                                                {item.dropdown.highlight?.title || item.name}
                                                            </div>
                                                            <p className="text-[13px] text-slate-500 leading-relaxed mb-3">{item.dropdown.highlight?.desc}</p>
                                                            {item.dropdown.highlight?.linkPath && (
                                                                <Link to={item.dropdown.highlight.linkPath} onClick={() => setActiveMenu(null)}
                                                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#064e3b] hover:text-emerald-700 transition-colors">
                                                                    {item.dropdown.highlight.linkText || 'Learn More'} <ArrowRight className="w-3.5 h-3.5" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-2.5 relative z-50 flex-shrink-0">
                        <Link to="/book-consultation" id="nav-cta-consultation"
                            className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#053d2e] active:bg-[#042d22] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md shadow-emerald-900/25 hover:shadow-emerald-900/40 hover:-translate-y-px group">
                            Book Consultation
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center relative z-50">
                        <button id="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu" aria-expanded={mobileMenuOpen}
                            className={`p-2 rounded-lg transition-colors ${isHomeHero ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden fixed inset-0 z-40 bg-white flex flex-col" id="mobile-drawer"
                    >
                        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 flex-shrink-0">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#064e3b] flex items-center justify-center text-white text-[10px] font-black">PM</div>
                                <span className="text-lg font-extrabold text-slate-900">Profit<span className="text-[#064e3b]">Machines</span></span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"
                                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                            {(smNavItems as any[]).map((item: any, idx: number) => (
                                <div key={idx} className="border-b border-slate-50 last:border-0">
                                    <div className="flex items-center justify-between">
                                        <Link to={item.path}
                                            onClick={() => { if (!item.dropdown) setMobileMenuOpen(false); }}
                                            className="flex-1 py-3 text-[15px] font-semibold text-slate-800 hover:text-[#064e3b] transition-colors">
                                            {item.name}
                                        </Link>
                                        {item.dropdown && (
                                            <button
                                                onClick={() => setExpandedMobile(prev =>
                                                    prev.includes(item.name) ? prev.filter(i => i !== item.name) : [...prev, item.name]
                                                )}
                                                className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
                                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobile.includes(item.name) ? 'rotate-180 text-[#064e3b]' : ''}`} />
                                            </button>
                                        )}
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {item.dropdown && expandedMobile.includes(item.name) && (
                                            <motion.div key="sub"
                                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: 'easeInOut' }} className="overflow-hidden">
                                                <div className="pl-3 pb-3 space-y-3 border-l-2 border-[#064e3b]/15 ml-2">
                                                    {item.dropdown.categories?.map((cat: any, cIdx: number) => (
                                                        <div key={cIdx}>
                                                            <Link to={cat.path || `/${item.name.toLowerCase()}/${cat.id}`}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="flex items-center gap-2 mt-2 mb-1.5">
                                                                <span className="text-[9px] font-black bg-[#064e3b]/10 text-[#064e3b] px-1.5 py-0.5 rounded-md">
                                                                    {String(cIdx + 1).padStart(2, '0')}
                                                                </span>
                                                                <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500 hover:text-[#064e3b] transition-colors">
                                                                    {cat.title}
                                                                </span>
                                                            </Link>
                                                            <div className="space-y-0.5 pl-1">
                                                                {cat.items?.map((sub: any, subIdx: number) => (
                                                                    <Link key={subIdx} to={sub.path} onClick={() => setMobileMenuOpen(false)}
                                                                        className="block text-[13px] text-slate-600 font-medium py-1.5 hover:text-[#064e3b] transition-colors">
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div className="px-4 py-4 border-t border-slate-100 flex-shrink-0">
                            <Link to="/book-consultation" onClick={() => setMobileMenuOpen(false)} id="mobile-cta-consultation"
                                className="w-full flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-[#053d2e] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-md">
                                Book Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {activeMenu && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 top-[72px] bg-slate-900/10 backdrop-blur-[1px] z-40 pointer-events-none hidden lg:block"
                    />
                )}
            </AnimatePresence>
        </header>
    );
}