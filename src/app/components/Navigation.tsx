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
    const [activeCatMap, setActiveCatMap] = useState<Record<string, string>>({});
    const menuRef = useRef<HTMLDivElement>(null);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();

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

    const getDropdownConfig = (name: string) => {
        switch (name) {
            case 'Offerings':
                return {
                    width: 760,
                    align: 'left' as const,
                    sidebarWidth: 240,
                    isSingleCol: false,
                };
            case 'Industries':
                return {
                    width: 680,
                    align: 'left' as const,
                    sidebarWidth: 230,
                    isSingleCol: false,
                };
            case 'Resources':
                return {
                    width: 520,
                    align: 'right' as const,
                    sidebarWidth: 190,
                    isSingleCol: true,
                };
            case 'Company':
                return {
                    width: 520,
                    align: 'right' as const,
                    sidebarWidth: 190,
                    isSingleCol: true,
                };
            default:
                return {
                    width: 540,
                    align: 'left' as const,
                    sidebarWidth: 200,
                    isSingleCol: true,
                };
        }
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#0066FF] h-16 lg:h-[72px] flex items-center transition-colors"
            ref={menuRef}
        >
            <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] h-full relative">
                <div className="flex items-center justify-between h-full gap-4">

                    {/* Logo */}
                    <div className="flex-shrink-0 relative z-50">
                        <Link to="/" className="flex items-center gap-2.5 group" aria-label="ProfitMachines home">
                            <div className="w-9 h-9 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-extrabold text-[12px] flex-shrink-0 transition-transform group-hover:scale-105 border border-[#0066FF]">
                                PM
                            </div>
                            <div className="flex flex-col">
                                <div className="text-lg md:text-xl font-extrabold tracking-tight font-heading leading-tight text-[#0066FF]">
                                    <span>Profit</span>
                                    <span>Machines</span>
                                </div>
                                <span className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase leading-none mt-0.5 text-[#0066FF]">
                                    Autonomous Revenue OS
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center h-full gap-1 xl:gap-1.5">
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
                                        className={`relative text-[13.5px] xl:text-[14px] font-bold px-3.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 h-[38px] ${
                                            isActive
                                                ? 'bg-[#0066FF] text-white'
                                                : 'text-[#0066FF] hover:bg-[#0066FF]/10'
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                        {hasDropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                        )}
                                    </Link>

                                    {hasDropdown && (() => {
                                        const config = getDropdownConfig(item.name);
                                        return (
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                                        onMouseEnter={keepMenuOpen}
                                                        onMouseLeave={closeMenuDelayed}
                                                        className={`absolute top-[calc(100%+4px)] z-50 bg-white rounded-xl border-2 border-[#0066FF] overflow-hidden flex ${
                                                            config.align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
                                                        }`}
                                                        style={{ width: config.width, maxWidth: 'calc(100vw - 32px)' }}
                                                    >
                                                        <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" />

                                                        {item.dropdown.categories ? (
                                                            <>
                                                                {/* LEFT: Numbered category list */}
                                                                <div
                                                                    className="shrink-0 bg-white border-r-2 border-[#0066FF] p-4 flex flex-col gap-1.5 overflow-y-auto max-h-[480px]"
                                                                    style={{ width: config.sidebarWidth }}
                                                                >
                                                                    <div className="flex items-center justify-between mb-3 px-1">
                                                                        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0066FF]">
                                                                            {item.dropdown.highlight?.title || item.name}
                                                                        </span>
                                                                        <span className="text-[9.5px] font-bold text-[#0066FF] border border-[#0066FF] px-2 py-0.5 rounded-full whitespace-nowrap">
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
                                                                                className={`group flex items-start gap-2.5 px-3 py-2.5 rounded-lg border transition-all duration-150 ${
                                                                                    isActiveCat
                                                                                        ? 'bg-[#0066FF] text-white border-[#0066FF]'
                                                                                        : 'bg-white text-[#0066FF] border-transparent hover:border-[#0066FF]'
                                                                                }`}
                                                                            >
                                                                                <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-black mt-0.5 border ${
                                                                                    isActiveCat
                                                                                        ? 'bg-white text-[#0066FF] border-white'
                                                                                        : 'bg-white text-[#0066FF] border-[#0066FF]'
                                                                                }`}>
                                                                                    {String(idx + 1).padStart(2, '0')}
                                                                                </span>
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="text-[13px] font-bold leading-tight">{cat.title}</div>
                                                                                </div>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>

                                                                {/* RIGHT: Items in active category */}
                                                                <div className="flex-1 p-5 overflow-y-auto max-h-[480px] bg-white">
                                                                    {(() => {
                                                                        const cat = getActiveCatData(item);
                                                                        if (!cat) return null;
                                                                        return (
                                                                            <motion.div
                                                                                key={cat.id}
                                                                                initial={{ opacity: 0, x: 6 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                transition={{ duration: 0.15 }}
                                                                            >
                                                                                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#0066FF]">
                                                                                    <div>
                                                                                        <h4 className="text-[13px] font-extrabold text-[#0066FF] tracking-tight">{cat.title}</h4>
                                                                                        {cat.description && (
                                                                                            <p className="text-[11.5px] text-[#0066FF] mt-0.5">{cat.description}</p>
                                                                                        )}
                                                                                    </div>
                                                                                </div>

                                                                                {config.isSingleCol ? (
                                                                                    <div className="flex flex-col gap-1.5">
                                                                                        {cat.items?.map((sub: any, i: number) => {
                                                                                            const Icon = Icons[sub.icon] || ArrowRight;
                                                                                            return (
                                                                                                <Link key={i} to={sub.path} onClick={() => setActiveMenu(null)}
                                                                                                    className="group/card flex items-center gap-3 p-2.5 rounded-lg border border-[#0066FF] bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all duration-150">
                                                                                                    <div className="flex-shrink-0 w-7 h-7 rounded border border-current flex items-center justify-center">
                                                                                                        <Icon className="w-3.5 h-3.5" />
                                                                                                    </div>
                                                                                                    <div className="flex-1 min-w-0">
                                                                                                        <div className="text-[12.5px] font-bold leading-snug">{sub.name}</div>
                                                                                                    </div>
                                                                                                    <ChevronRight className="w-4 h-4 group-hover/card:translate-x-0.5 transition-transform flex-shrink-0" />
                                                                                                </Link>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="grid grid-cols-2 gap-2">
                                                                                        {cat.items?.map((sub: any, i: number) => {
                                                                                            const Icon = Icons[sub.icon] || ArrowRight;
                                                                                            return (
                                                                                                <Link key={i} to={sub.path} onClick={() => setActiveMenu(null)}
                                                                                                    className="group/card flex items-start gap-2.5 p-2.5 rounded-lg border border-[#0066FF] bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all duration-150">
                                                                                                    <div className="flex-shrink-0 w-7 h-7 rounded border border-current flex items-center justify-center mt-0.5">
                                                                                                        <Icon className="w-3.5 h-3.5" />
                                                                                                    </div>
                                                                                                    <div className="flex-1 min-w-0">
                                                                                                        <div className="text-[12px] font-bold leading-snug">{sub.name}</div>
                                                                                                    </div>
                                                                                                </Link>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                )}

                                                                                {cat.path && (
                                                                                    <div className="mt-3.5 pt-3 border-t border-[#0066FF] flex items-center justify-end">
                                                                                        <Link to={cat.path} onClick={() => setActiveMenu(null)}
                                                                                            className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#0066FF] hover:underline transition-colors group/cta">
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
                                                            <div className="p-6 w-full flex flex-col justify-center bg-white text-[#0066FF]">
                                                                <div className="text-lg font-extrabold font-heading mb-2 text-[#0066FF]">
                                                                    {item.dropdown.highlight?.title || item.name}
                                                                </div>
                                                                <p className="text-[13px] text-[#0066FF] leading-relaxed mb-3">{item.dropdown.highlight?.desc}</p>
                                                                {item.dropdown.highlight?.linkPath && (
                                                                    <Link to={item.dropdown.highlight.linkPath} onClick={() => setActiveMenu(null)}
                                                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0066FF] hover:underline">
                                                                        {item.dropdown.highlight.linkText || 'Learn More'} <ArrowRight className="w-3.5 h-3.5" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        );
                                    })()}
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-2.5 relative z-50 flex-shrink-0">
                        <Link to="/book-consultation" id="nav-cta-consultation"
                            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] px-4 xl:px-5 py-2 rounded-lg font-bold text-xs xl:text-sm transition-all duration-200 group">
                            <span>Book Consultation</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <a 
                            href="https://wa.me/919513088611?text=Hi%20ProfitMachines%2C%20I'd%20like%20to%20consult%20on%20AI%20solutions."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white border-2 border-[#0066FF] px-3.5 py-2 rounded-lg font-bold text-xs xl:text-sm transition-all duration-200"
                            aria-label="Chat with ProfitMachines on WhatsApp"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center relative z-50">
                        <button id="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu" aria-expanded={mobileMenuOpen}
                            className="p-2 rounded-lg text-[#0066FF] hover:bg-[#0066FF]/10 transition-colors border border-[#0066FF]">
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
                        className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col text-[#0066FF]" id="mobile-drawer"
                    >
                        <div className="flex items-center justify-between px-4 h-16 border-b-2 border-[#0066FF] flex-shrink-0">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded bg-[#0066FF] text-white flex items-center justify-center text-[10px] font-black">PM</div>
                                <span className="text-lg font-extrabold text-[#0066FF]">ProfitMachines</span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"
                                className="p-2 rounded-lg text-[#0066FF] border border-[#0066FF]">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                            {(smNavItems as any[]).map((item: any, idx: number) => (
                                <div key={idx} className="border-b border-[#0066FF]/30 last:border-0">
                                    <div className="flex items-center justify-between">
                                        <Link to={item.path}
                                            onClick={() => { if (!item.dropdown) setMobileMenuOpen(false); }}
                                            className="flex-1 py-3 text-[15px] font-bold text-[#0066FF]">
                                            {item.name}
                                        </Link>
                                        {item.dropdown && (
                                            <button
                                                onClick={() => setExpandedMobile(prev =>
                                                    prev.includes(item.name) ? prev.filter(i => i !== item.name) : [...prev, item.name]
                                                )}
                                                className="p-2 text-[#0066FF]">
                                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobile.includes(item.name) ? 'rotate-180' : ''}`} />
                                            </button>
                                        )}
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {item.dropdown && expandedMobile.includes(item.name) && (
                                            <motion.div key="sub"
                                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: 'easeInOut' }} className="overflow-hidden">
                                                <div className="pl-3 pb-3 space-y-3 border-l-2 border-[#0066FF] ml-2">
                                                    {item.dropdown.categories?.map((cat: any, cIdx: number) => (
                                                        <div key={cIdx}>
                                                            <Link to={cat.path || `/${item.name.toLowerCase()}/${cat.id}`}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="flex items-center gap-2 mt-2 mb-1.5">
                                                                <span className="text-[9px] font-black border border-[#0066FF] text-[#0066FF] px-1.5 py-0.5 rounded">
                                                                    {String(cIdx + 1).padStart(2, '0')}
                                                                </span>
                                                                <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0066FF]">
                                                                    {cat.title}
                                                                </span>
                                                            </Link>
                                                            <div className="space-y-1 pl-1">
                                                                {cat.items?.map((sub: any, subIdx: number) => (
                                                                    <Link key={subIdx} to={sub.path} onClick={() => setMobileMenuOpen(false)}
                                                                        className="block text-[13px] text-[#0066FF] font-semibold py-1 hover:underline">
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

                        <div className="px-4 py-4 border-t-2 border-[#0066FF] flex-shrink-0">
                            <Link to="/book-consultation" onClick={() => setMobileMenuOpen(false)} id="mobile-cta-consultation"
                                className="w-full flex items-center justify-center gap-2 bg-[#0066FF] text-white py-3 rounded-lg font-bold text-sm border-2 border-[#0066FF] hover:bg-white hover:text-[#0066FF] transition-colors">
                                Book Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}