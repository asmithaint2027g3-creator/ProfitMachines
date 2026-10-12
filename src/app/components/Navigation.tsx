import { useState, useEffect } from 'react';
import { 
    Menu, X, ArrowRight, ChevronDown, Rocket, Shield, Globe, Cpu, Zap, Lightbulb, Link as LinkIcon, Lock, 
    MessageSquare, Briefcase, BarChart, Database, MapPin, 
    BrainCircuit, Network, Sparkles, Building2, Bot, Cloud, Workflow, GitMerge, RefreshCw, 
    FileCode2, Coins, Boxes, Server, Image, TrendingUp, PieChart, Settings, Smile, Layers, DollarSign,
    Brain, CloudRain, Building, AppWindow, Code2, ShieldCheck, Users, HeartPulse, Landmark, ShoppingBag,
    Factory, GraduationCap, Truck, Home, Radio, Wrench, CloudCog, UserPlus, Layout, Search, LifeBuoy, BookOpen,
    Handshake, Info, Target, FileText, Phone, ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { smNavItems } from '../../data/navigationContent';

const Icons: any = {
    BrainCircuit, Network, Sparkles, Building2, Bot, Cloud, Workflow, GitMerge, RefreshCw, Briefcase, Shield, Database,
    Link: LinkIcon, Globe, FileCode2, Coins, Boxes, Server, Image, MessageSquare, TrendingUp, BarChart, PieChart, Settings,
    Smile, Layers, Cpu, DollarSign, Brain, CloudRain, Building, AppWindow, Zap, Code2, ShieldCheck, Users, HeartPulse,
    Landmark, ShoppingBag, Factory, GraduationCap, Truck, Home, Radio, Lightbulb, Wrench, CloudCog, UserPlus, Layout,
    Search, LifeBuoy, BookOpen, Handshake, Info, Target, FileText, Phone, Rocket, Lock, MapPin
};

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [activeOfferingsCat, setActiveOfferingsCat] = useState("profit-pools");
    const [activeOfferingsSubCat, setActiveOfferingsSubCat] = useState<"b2b" | "b2c">("b2b");
    const [activeIndustriesCat, setActiveIndustriesCat] = useState("b2b");
    const [activeOfferingGroup, setActiveOfferingGroup] = useState("profit-pools");
    const [activeIndustryGroup, setActiveIndustryGroup] = useState("b2b");
    const [activeMenuCat, setActiveMenuCat] = useState<Record<string, string>>({});
    const [dropdownPos, setDropdownPos] = useState<{ left: number; width: number } | null>(null);
    const location = useLocation();

    // Positions the mega-menu so it always stays within the viewport, regardless of
    // where the trigger sits in the nav (replaces brittle hardcoded per-item offsets).
    const openDropdown = (name: string, triggerEl: HTMLElement) => {
        setHoveredItem(name);
        const margin = 16;
        const rect = triggerEl.getBoundingClientRect();
        const width = Math.min(820, window.innerWidth - margin * 2);
        const desiredViewportLeft = rect.left;
        const minViewportLeft = margin;
        const maxViewportLeft = window.innerWidth - width - margin;
        const clampedViewportLeft = Math.min(Math.max(desiredViewportLeft, minViewportLeft), maxViewportLeft);
        setDropdownPos({ left: clampedViewportLeft - rect.left, width });
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleExpanded = (name: string) => {
        setExpandedItems(prev =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
        );
    };

    const isHomeHero = location.pathname === '/' && !scrolled;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b h-16 lg:h-[72px] flex items-center ${
            isHomeHero 
                ? 'bg-[#064e3b]/95 lg:bg-[#064e3b]/85 backdrop-blur-md border-emerald-500/20 text-white shadow-sm' 
                : 'bg-white/95 backdrop-blur-md shadow-xs border-slate-200/80 text-slate-900'
        }`}>
            <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] h-full relative">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex-shrink-0 relative z-50">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className={`text-xl md:text-2xl font-extrabold tracking-tight font-heading transition-colors ${
                                isHomeHero ? 'text-white' : 'text-slate-900'
                            }`}>
                                <span>Profit</span>
                                <span className={isHomeHero ? 'text-emerald-300' : 'text-[#064e3b]'}>Machines</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center h-full gap-5 xl:gap-6">
                        {/* @ts-ignore */}
                        {smNavItems.map((item) => {
                            // @ts-ignore
                            const isActive = location.pathname === item.path || (item.dropdown && item.dropdown.items && item.dropdown.items.some((sub: any) => sub.path === location.pathname)) || (item.dropdown && item.dropdown.categories && item.dropdown.categories.some((cat: any) => (cat as any).items && (cat as any).items.some((sub: any) => sub.path === location.pathname)));

                            return (
                                <div
                                    key={item.name}
                                    className="group h-full flex items-center relative"
                                    onMouseEnter={(e) => openDropdown(item.name, e.currentTarget)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setHoveredItem(item.name)}
                                        className={`text-[14px] xl:text-[15px] font-semibold transition-all flex items-center gap-1.5 h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm
                                            ${isHomeHero 
                                                ? (isActive ? 'text-emerald-300 font-bold' : 'text-emerald-50/90 hover:text-white')
                                                : (isActive ? 'text-[#064e3b] font-bold' : 'text-slate-700 hover:text-[#064e3b]')
                                            }
                                        `}
                                    >
                                        {item.name}
                                        {item.dropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                                hoveredItem === item.name ? 'rotate-180' : ''
                                            } ${
                                                isHomeHero 
                                                    ? (hoveredItem === item.name ? 'text-emerald-300' : 'text-emerald-200/70 group-hover:text-white') 
                                                    : (hoveredItem === item.name ? 'text-[#064e3b]' : 'text-slate-400 group-hover:text-[#064e3b]')
                                            }`} />
                                        )}
                                    </Link>

                                    {item.dropdown && (
                                        <div
                                            style={hoveredItem === item.name && dropdownPos ? { left: dropdownPos.left, width: dropdownPos.width } : undefined}
                                            className={`
                                                absolute top-[calc(100%)] w-[820px] max-w-[calc(100vw-32px)] bg-white border border-slate-200 shadow-2xl rounded-xl
                                                transition-all duration-200 ease-out origin-top-left overflow-hidden flex min-h-[380px] z-50 text-slate-900
                                                ${hoveredItem === item.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible pointer-events-none'}
                                            `}
                                        >
                                            {/* Invisible bridge for hover */}
                                            <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" />
                                            
                                            {/* Left Column: Categories */}
                                            <div className="w-[35%] bg-slate-50/80 border-r border-slate-100 p-5 flex flex-col gap-1.5 shrink-0 justify-center">
                                                {item.name === "Offerings" ? (
                                                    <div className="flex flex-col gap-1.5">
                                                        <Link
                                                            to="/offerings/profit-pool-discovery"
                                                            onClick={() => setHoveredItem(null)}
                                                            onMouseEnter={() => setActiveOfferingGroup("profit-pools")}
                                                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] font-bold transition-all text-left focus:outline-none ${activeOfferingGroup === 'profit-pools' || activeOfferingGroup === 'b2b' || activeOfferingGroup === 'b2c' ? 'bg-[#064e3b] text-white' : 'text-slate-700 hover:bg-slate-100 hover:translate-x-1'}`}
                                                        >
                                                            <span>Profit Pools</span>
                                                            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                                        </Link>
                                                        
                                                        {item.dropdown.categories?.filter((cat: any) => cat.id !== "profit-pools").map((cat: any, cIdx: number) => {
                                                            const targetPath = cat.path || `/offerings/${cat.id}`;
                                                            return (
                                                                <Link
                                                                    key={cIdx}
                                                                    to={targetPath}
                                                                    onClick={() => setHoveredItem(null)}
                                                                    onMouseEnter={() => setActiveOfferingGroup(cat.id)}
                                                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] font-bold transition-all text-left focus:outline-none ${activeOfferingGroup === cat.id ? 'bg-[#064e3b] text-white' : 'text-slate-700 hover:bg-slate-100 hover:translate-x-1'}`}
                                                                >
                                                                    <span>{cat.title}</span>
                                                                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                ) : item.dropdown.categories ? (
                                                    <div className="flex flex-col gap-1.5">
                                                        {item.dropdown.categories.map((cat: any, cIdx: number) => {
                                                            const menuKey = item.name;
                                                            const activeCat = activeMenuCat[menuKey] ?? item.dropdown.categories[0]?.id;
                                                            const targetPath = cat.path || `/${item.name.toLowerCase()}/${cat.id}`;
                                                            return (
                                                                <Link
                                                                    key={cIdx}
                                                                    to={targetPath}
                                                                    onClick={() => setHoveredItem(null)}
                                                                    onMouseEnter={() => setActiveMenuCat(prev => ({ ...prev, [menuKey]: cat.id }))}
                                                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] font-bold transition-all text-left focus:outline-none ${activeCat === cat.id ? 'bg-[#064e3b] text-white' : 'text-slate-700 hover:bg-slate-100 hover:translate-x-1'}`}
                                                                >
                                                                    <span>{cat.title}</span>
                                                                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-3 p-4">
                                                        <div className="text-xl font-extrabold text-slate-900 leading-tight font-heading">
                                                            {item.dropdown.highlight?.title || item.name}
                                                        </div>
                                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                                            {item.dropdown.highlight?.desc || `Explore our high-performance suite of ${item.name.toLowerCase()} options and integration solutions.`}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Column: Display Centered Content */}
                                            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center overflow-y-auto">
                                                <div className="w-full max-w-2xl flex flex-col gap-2 justify-center items-center">
                                                    {item.name === "Offerings" ? (
                                                        (() => {
                                                            if (activeOfferingGroup === "b2b" || activeOfferingGroup === "b2c" || activeOfferingGroup === "profit-pools") {
                                                                // @ts-ignore
                                                                const b2bItems = item.dropdown.categories?.find((cat: any) => cat.id === "profit-pools")?.b2bItems || [];
                                                                // @ts-ignore
                                                                const b2cItems = item.dropdown.categories?.find((cat: any) => cat.id === "profit-pools")?.b2cItems || [];
                                                                
                                                                return (
                                                                    <div key={`offerings-${activeOfferingGroup}`} className="grid grid-cols-2 gap-8 w-full">
                                                                        {/* B2B Column */}
                                                                        <div className="flex flex-col gap-2 min-w-0">
                                                                            <Link
                                                                                to="/offerings/b2b"
                                                                                onClick={() => setHoveredItem(null)}
                                                                                className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#064e3b] border-b pb-2 border-slate-100 block hover:text-emerald-700 hover:border-emerald-300 transition-colors"
                                                                            >
                                                                                B2B Profit Pools
                                                                            </Link>
                                                                            <div className="flex flex-col gap-1">
                                                                                {b2bItems.map((sub: any, sIdx: number) => {
                                                                                    const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                                    return (
                                                                                        <Link
                                                                                            key={sIdx}
                                                                                            to={sub.path}
                                                                                            onClick={() => setHoveredItem(null)}
                                                                                            style={{ animationDelay: `${sIdx * 30}ms` }}
                                                                                            className="animate-in fade-in-0 slide-in-from-left-1 fill-mode-both duration-300 flex items-center gap-2.5 p-1.5 rounded-lg text-[12.5px] font-semibold text-slate-700 hover:text-[#064e3b] hover:bg-emerald-50/60 transition-all hover:translate-x-1 duration-200"
                                                                                        >
                                                                                            <IconComponent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                                                            <span className="truncate">{sub.name}</span>
                                                                                        </Link>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>

                                                                        {/* B2C Column */}
                                                                        <div className="flex flex-col gap-2 min-w-0">
                                                                            <Link
                                                                                to="/offerings/b2c"
                                                                                onClick={() => setHoveredItem(null)}
                                                                                className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-teal-700 border-b pb-2 border-slate-100 block hover:text-teal-900 hover:border-teal-300 transition-colors"
                                                                            >
                                                                                B2C Profit Pools
                                                                            </Link>
                                                                            <div className="flex flex-col gap-1">
                                                                                {b2cItems.map((sub: any, sIdx: number) => {
                                                                                    const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                                    return (
                                                                                        <Link
                                                                                            key={sIdx}
                                                                                            to={sub.path}
                                                                                            onClick={() => setHoveredItem(null)}
                                                                                            style={{ animationDelay: `${sIdx * 30}ms` }}
                                                                                            className="animate-in fade-in-0 slide-in-from-left-1 fill-mode-both duration-300 flex items-center gap-2.5 p-1.5 rounded-lg text-[12.5px] font-semibold text-slate-700 hover:text-[#064e3b] hover:bg-emerald-50/60 transition-all hover:translate-x-1 duration-200"
                                                                                        >
                                                                                            <IconComponent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                                                            <span className="truncate">{sub.name}</span>
                                                                                        </Link>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            const selectedItems = item.dropdown.categories?.find((cat: any) => cat.id === activeOfferingGroup)?.items || [];
                                                            return (
                                                                <div key={`offerings-sel-${activeOfferingGroup}`} className="grid grid-cols-1 gap-1.5 w-full max-w-md">
                                                                    {selectedItems.map((sub: any, sIdx: number) => {
                                                                        const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                        return (
                                                                            <Link
                                                                                key={sIdx}
                                                                                to={sub.path}
                                                                                onClick={() => setHoveredItem(null)}
                                                                                style={{ animationDelay: `${sIdx * 30}ms` }}
                                                                                className="animate-in fade-in-0 slide-in-from-left-1 fill-mode-both duration-300 flex items-center gap-3 p-2 rounded-lg text-[13px] font-semibold text-slate-700 hover:text-[#064e3b] hover:bg-slate-50 transition-all hover:translate-x-1 duration-200"
                                                                            >
                                                                                <div className="bg-slate-50 text-[#064e3b] p-1.5 rounded-lg shrink-0">
                                                                                    <IconComponent className="w-4 h-4" />
                                                                                </div>
                                                                                <span className="truncate">{sub.name}</span>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>
                                                            );
                                                        })()
                                                    ) : item.dropdown.categories ? (
                                                        (() => {
                                                            const menuKey = item.name;
                                                            const activeCatId = activeMenuCat[menuKey] ?? item.dropdown.categories[0]?.id;
                                                            const selectedItems = item.dropdown.categories.find((cat: any) => cat.id === activeCatId)?.items || [];
                                                            return (
                                                                <div key={`${menuKey}-${activeCatId}`} className="grid grid-cols-1 gap-1.5 w-full max-w-md animate-in fade-in-50 duration-300">
                                                                    {selectedItems.map((sub: any, sIdx: number) => {
                                                                        const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                        return (
                                                                            <Link
                                                                                key={sIdx}
                                                                                to={sub.path}
                                                                                onClick={() => setHoveredItem(null)}
                                                                                style={{ animationDelay: `${sIdx * 30}ms` }}
                                                                                className="animate-in fade-in-0 slide-in-from-left-1 fill-mode-both duration-300 flex items-center gap-3 p-2 rounded-lg text-[13px] font-semibold text-slate-700 hover:text-[#064e3b] hover:bg-slate-50 transition-all hover:translate-x-1 duration-200"
                                                                            >
                                                                                <div className="bg-slate-50 text-[#064e3b] p-1.5 rounded-lg shrink-0">
                                                                                    <IconComponent className="w-4 h-4" />
                                                                                </div>
                                                                                <span className="truncate">{sub.name}</span>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>
                                                            );
                                                        })()
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Persistent CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3 relative z-50">
                        <Link
                            to="/admin/linkedin"
                            title="LinkedIn Growth & Content Studio"
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all duration-200 border ${
                                isHomeHero
                                    ? 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 border-emerald-500/30'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-[#064e3b] border-emerald-200'
                            }`}
                        >
                            <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                            LinkedIn Studio
                        </Link>

                        <Link
                            to="/book-consultation"
                            className="inline-flex items-center gap-2 bg-[#064e3b] hover:bg-[#053d2e] active:bg-[#042d22] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md shadow-emerald-900/30 hover:shadow-emerald-900/45 hover:-translate-y-px group"
                        >
                            Book Consultation
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center relative z-50">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-600"
                        >
                            {mobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="pt-24 pb-6 px-4 h-full overflow-y-auto">
                    <div className="flex flex-col space-y-2">
                        {smNavItems.map((item, idx) => (
                            <div key={idx} className="border-b border-slate-100 pb-2">
                                <div className="flex items-center justify-between py-3">
                                    <Link 
                                        to={item.path} 
                                        className="text-lg font-bold text-slate-900"
                                        onClick={() => {
                                            if (!item.dropdown) setMobileMenuOpen(false);
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.dropdown && (
                                        <button onClick={() => toggleExpanded(item.name)} className="p-2">
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedItems.includes(item.name) ? 'rotate-180 text-[#064e3b]' : 'text-slate-500'}`} />
                                        </button>
                                    )}
                                </div>
                                
                                <AnimatePresence initial={false}>
                                    {item.dropdown && expandedItems.includes(item.name) && (
                                        <motion.div
                                            key="submenu"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 pb-4 space-y-4">
                                                <div className="flex flex-col space-y-3 pl-2 border-l-2 border-slate-100">
                                                    {item.dropdown.categories ? (
                                                        <>
                                                            {item.dropdown.categories.map((cat: any, cIdx: number) => (
                                                                <div key={cIdx} className="mb-3">
                                                                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 mt-1">{cat.title}</div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        {(cat as any).items.map((sub: any, subIdx: number) => (
                                                                            <Link
                                                                                key={subIdx}
                                                                                to={sub.path}
                                                                                onClick={() => setMobileMenuOpen(false)}
                                                                                className="text-slate-600 font-semibold py-1 hover:text-[#064e3b] transition-colors text-xs block"
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        ))}

                        {/* Direct Admin Links in Mobile Menu */}
                        <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
                            <Link
                                to="/admin/linkedin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-[#064e3b] font-bold text-sm"
                            >
                                <Building2 className="w-4 h-4 text-emerald-600" />
                                LinkedIn Studio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
