import { useState, useEffect, useRef } from 'react';
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
import { smNavItems } from '../../data/navigationContent';
import { useLeadModal } from '../context/LeadModalContext';

const Icons: Record<string, any> = {
    BrainCircuit, Network, Sparkles, Building2, Bot, Cloud, Workflow, GitMerge, RefreshCw, Briefcase, Shield, Database,
    Link: LinkIcon, Globe, FileCode2, Coins, Boxes, Server, Image, MessageSquare, TrendingUp, BarChart, PieChart, Settings,
    Smile, Layers, Cpu, DollarSign, Brain, CloudRain, Building, AppWindow, Zap, Code2, ShieldCheck, Users, HeartPulse,
    Landmark, ShoppingBag, Factory, GraduationCap, Truck, Home, Radio, Lightbulb, Wrench, CloudCog, UserPlus, Layout,
    Search, LifeBuoy, BookOpen, Handshake, Info, Target, FileText, Phone, Rocket, Lock, MapPin, Activity
};

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [activeOfferingGroup, setActiveOfferingGroup] = useState("profit-pools");
    const [activeMenuCat, setActiveMenuCat] = useState<Record<string, string>>({});
    const [dropdownPos, setDropdownPos] = useState<Record<string, { left: number; width: number }>>({});
    
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const location = useLocation();
    const { openLongForm } = useLeadModal();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setHoveredItem(null);
    }, [location.pathname]);

    // Handle Escape key and Outside Clicks to close mega menu and mobile menu
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setHoveredItem(null);
                setMobileMenuOpen(false);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setHoveredItem(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Positions dropdown menu centered or clamped within the viewport
    const calculateDropdownPos = (name: string, triggerEl: HTMLElement, width: number) => {
        const margin = 16;
        const rect = triggerEl.getBoundingClientRect();
        const triggerCenter = rect.left + rect.width / 2;
        const desiredLeft = triggerCenter - width / 2;
        const minLeft = margin;
        const maxLeft = window.innerWidth - width - margin;
        const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
        
        setDropdownPos(prev => ({
            ...prev,
            [name]: {
                left: clampedLeft - rect.left,
                width: Math.min(width, window.innerWidth - margin * 2)
            }
        }));
    };

    const handleMouseEnter = (item: any, triggerEl: HTMLElement) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        
        if (item.dropdown) {
            const width = item.name === "Verticals" ? 820 : item.dropdown.categories ? (item.name === "Offerings" ? 820 : 760) : 340;
            calculateDropdownPos(item.name, triggerEl, width);
            setHoveredItem(item.name);
        } else {
            setHoveredItem(null);
        }
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setHoveredItem(null);
        }, 150); // Matches ISI Security's 150ms transition grace period
    };

    const toggleExpanded = (name: string) => {
        setExpandedItems(prev =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
        );
    };

    return (
        <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-xs border-b border-border/60 text-foreground h-16 lg:h-[72px] flex items-center">
            <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] h-full relative">
                <div className="flex items-center justify-between h-full gap-4">
                    {/* Brand Logo matching ISI clean palette */}
                    <div className="flex-shrink-0 relative z-50">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="text-xl md:text-2xl font-extrabold tracking-tight font-heading text-slate-900 transition-colors">
                                <span>Profit</span>
                                <span className="text-primary transition-colors">Machines</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center h-full gap-1 xl:gap-2 2xl:gap-4">
                        {smNavItems.map((item) => {
                            const isActive = location.pathname === item.path ||
                                (item.dropdown?.categories && (item.dropdown.categories as any).some((cat: any) =>
                                    cat.items?.some((sub: any) => sub.path === location.pathname) ||
                                    cat.b2bItems?.some((sub: any) => sub.path === location.pathname) ||
                                    cat.b2cItems?.some((sub: any) => sub.path === location.pathname)
                                ));

                            const isHovered = hoveredItem === item.name;
                            const pos = dropdownPos[item.name];

                            return (
                                <div
                                    key={item.name}
                                    className="h-full flex items-center relative"
                                    onMouseEnter={(e) => handleMouseEnter(item, e.currentTarget)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setHoveredItem(null)}
                                        className={`relative px-2.5 xl:px-3 py-4 text-[13.5px] xl:text-[14px] 2xl:text-[15px] font-medium transition-colors duration-200 flex items-center gap-1.5 outline-none rounded-md ${
                                            isActive || isHovered ? 'text-primary font-semibold' : 'text-slate-700 hover:text-primary'
                                        }`}
                                    >
                                        <span>{item.name}</span>
                                        {item.dropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                                isHovered ? 'rotate-180 text-primary' : 'text-slate-400 group-hover:text-primary'
                                            }`} />
                                        )}
                                        {/* ISI Security animated underline indicator */}
                                        <span className={`absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-primary transition-transform duration-300 origin-left ${
                                            isActive || isHovered ? 'scale-x-100' : 'scale-x-0'
                                        }`} />
                                    </Link>

                                    {/* Dropdown Menu Container (Matches ISI Security dropdown structure) */}
                                    {item.dropdown && (
                                        <div
                                            style={pos ? { left: `${pos.left}px`, width: `${pos.width}px` } : undefined}
                                            className={`absolute top-[calc(100%-4px)] pt-2 transition-all duration-300 ease-out z-50 origin-top ${
                                                isHovered ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                                            }`}
                                        >
                                            <div className="bg-card border border-border/60 shadow-2xl rounded-2xl overflow-hidden flex min-h-[380px] text-foreground">
                                                {item.name === "Verticals" ? (
                                                    <div className="flex flex-col md:flex-row w-full min-h-[380px]">
                                                        {/* Left Column: 6 Industry Categories */}
                                                        <div className="flex-1 p-6 bg-white border-r border-border/50 flex flex-col justify-between">
                                                            <div>
                                                                <div className="mb-4 pb-3 border-b border-border/40 flex items-center justify-between">
                                                                    <div>
                                                                        <h3 className="text-base font-bold text-foreground font-heading">Industry Verticals</h3>
                                                                        <p className="text-xs text-muted-foreground mt-0.5">Explore structured frameworks tailored to your sector</p>
                                                                    </div>
                                                                    <Link
                                                                        to="/verticals"
                                                                        onClick={() => setHoveredItem(null)}
                                                                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                                                                    >
                                                                        View All Verticals
                                                                        <ChevronRight className="w-3.5 h-3.5" />
                                                                    </Link>
                                                                </div>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                    {(item.dropdown as any)?.items?.map((ind: any, iIdx: number) => {
                                                                        const IconComponent = Icons[ind.icon] || ArrowRight;
                                                                        return (
                                                                            <Link
                                                                                key={iIdx}
                                                                                to={ind.path}
                                                                                onClick={() => setHoveredItem(null)}
                                                                                className="group p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-[#F0F7FC] hover:border-[#2878B5]/40 transition-all flex items-start gap-3 text-left"
                                                                            >
                                                                                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                                                                                    <IconComponent className="w-4 h-4" />
                                                                                </div>
                                                                                <div className="min-w-0">
                                                                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-1">
                                                                                        <span>{ind.name}</span>
                                                                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                                                                                    </h4>
                                                                                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed font-medium">
                                                                                        {ind.desc}
                                                                                    </p>
                                                                                </div>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                                                                <span>Looking for multi-sector enterprise deployment?</span>
                                                                <Link to="/verticals" onClick={() => setHoveredItem(null)} className="font-semibold text-primary hover:underline">
                                                                    Compare All 6 Verticals &rarr;
                                                                </Link>
                                                            </div>
                                                        </div>

                                                        {/* Right Column: Highlighted panel titled "Need Help Choosing?" */}
                                                        <div className="w-full md:w-[280px] bg-sky-50/60 p-6 flex flex-col justify-between shrink-0 border-t md:border-t-0 border-sky-100">
                                                            <div>
                                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-sky-200 text-primary text-[11px] font-bold uppercase tracking-wider mb-4 shadow-xs">
                                                                    <Sparkles className="w-3 h-3" />
                                                                    <span>Advisory</span>
                                                                </div>
                                                                <h3 className="text-lg font-bold text-slate-900 font-heading">
                                                                    {(item.dropdown as any)?.highlight?.title || "Need Help Choosing?"}
                                                                </h3>
                                                                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                                                                    {(item.dropdown as any)?.highlight?.desc || "Not sure which vertical framework fits your operational model? Our growth architects can assess your workflows and recommend the right setup."}
                                                                </p>
                                                            </div>

                                                            <div className="pt-6 space-y-2.5">
                                                                <button
                                                                    onClick={() => {
                                                                        setHoveredItem(null);
                                                                        openLongForm({ defaultService: 'Industry Verticals Consultation', title: 'Consult with Industry Verticals Experts' });
                                                                    }}
                                                                    className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 active:bg-blue-700 text-white font-bold text-xs shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                                                >
                                                                    <span>Talk to Experts</span>
                                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                                </button>
                                                                <Link
                                                                    to="/verticals"
                                                                    onClick={() => setHoveredItem(null)}
                                                                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-primary hover:bg-sky-100/60 transition-colors flex items-center justify-center gap-1 text-center"
                                                                >
                                                                    <span>Explore All Verticals</span>
                                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {/* Left Column: Categories List (ISI Multi-Column Layout) */}
                                                        {item.dropdown.categories ? (
                                                            <div className="w-[250px] bg-muted/20 border-r border-border/50 p-4 flex flex-col gap-1.5 shrink-0 justify-start">
                                                        <div className="mb-3 px-3">
                                                            <h3 className="text-base font-bold text-foreground font-heading">{item.name}</h3>
                                                            <p className="text-xs text-muted-foreground mt-0.5">Explore our {item.name.toLowerCase()}</p>
                                                        </div>

                                                        {item.name === "Offerings" ? (
                                                            <div className="flex flex-col gap-1.5">
                                                                <Link
                                                                    to="/offerings/profit-pool-discovery"
                                                                    onClick={() => setHoveredItem(null)}
                                                                    onMouseEnter={() => setActiveOfferingGroup("profit-pools")}
                                                                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all text-left ${
                                                                        activeOfferingGroup === 'profit-pools' || activeOfferingGroup === 'b2b' || activeOfferingGroup === 'b2c'
                                                                            ? 'bg-card shadow-sm font-semibold text-primary border border-border/40' 
                                                                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                                                    }`}
                                                                >
                                                                    <span>Profit Pools</span>
                                                                    <ChevronRight className="w-3.5 h-3.5 shrink-0 text-primary" />
                                                                </Link>

                                                                {item.dropdown.categories.filter((cat: any) => cat.id !== "profit-pools").map((cat: any, cIdx: number) => {
                                                                    const targetPath = cat.path || `/offerings/${cat.id}`;
                                                                    const isSelected = activeOfferingGroup === cat.id;
                                                                    return (
                                                                        <Link
                                                                            key={cIdx}
                                                                            to={targetPath}
                                                                            onClick={() => setHoveredItem(null)}
                                                                            onMouseEnter={() => setActiveOfferingGroup(cat.id)}
                                                                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all text-left ${
                                                                                isSelected 
                                                                                    ? 'bg-card shadow-sm font-semibold text-primary border border-border/40' 
                                                                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                                                            }`}
                                                                        >
                                                                            <span>{cat.title}</span>
                                                                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-opacity ${isSelected ? 'opacity-100 text-primary' : 'opacity-0'}`} />
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col gap-1.5">
                                                                {(item.dropdown as any)?.categories?.map((cat: any, cIdx: number) => {
                                                                    const menuKey = item.name;
                                                                    const activeCat = activeMenuCat[menuKey] ?? (item.dropdown as any)?.categories?.[0]?.id;
                                                                    const targetPath = cat.path || `/${item.name.toLowerCase()}/${cat.id}`;
                                                                    const isSelected = activeCat === cat.id;
                                                                    return (
                                                                        <Link
                                                                            key={cIdx}
                                                                            to={targetPath}
                                                                            onClick={() => setHoveredItem(null)}
                                                                            onMouseEnter={() => setActiveMenuCat(prev => ({ ...prev, [menuKey]: cat.id }))}
                                                                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all text-left ${
                                                                                isSelected 
                                                                                    ? 'bg-card shadow-sm font-semibold text-primary border border-border/40' 
                                                                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                                                            }`}
                                                                        >
                                                                            <span>{cat.title}</span>
                                                                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-opacity ${isSelected ? 'opacity-100 text-primary' : 'opacity-0'}`} />
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="w-[220px] bg-muted/20 border-r border-border/50 p-5 flex flex-col justify-between shrink-0">
                                                        <div>
                                                            <h3 className="text-base font-bold text-foreground font-heading">
                                                                {item.dropdown.highlight?.title || item.name}
                                                            </h3>
                                                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                                                {item.dropdown.highlight?.desc || `Explore our high-performance suite of ${item.name.toLowerCase()} solutions.`}
                                                            </p>
                                                        </div>
                                                        {item.dropdown.highlight?.linkPath && (
                                                            <Link
                                                                to={item.dropdown.highlight.linkPath}
                                                                onClick={() => setHoveredItem(null)}
                                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mt-4"
                                                            >
                                                                {item.dropdown.highlight.linkText || 'Learn More'}
                                                                <ChevronRight className="w-3.5 h-3.5" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Right Area: Display Sub-Items (Clean 2-Column Grid matching ISI) */}
                                                <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
                                                    {item.name === "Offerings" ? (
                                                        (() => {
                                                            if (activeOfferingGroup === "b2b" || activeOfferingGroup === "b2c" || activeOfferingGroup === "profit-pools") {
                                                                const b2bItems = (item.dropdown.categories?.find((cat: any) => cat.id === "profit-pools") as any)?.b2bItems || [];
                                                                const b2cItems = (item.dropdown.categories?.find((cat: any) => cat.id === "profit-pools") as any)?.b2cItems || [];
                                                                
                                                                return (
                                                                    <div key={`offerings-${activeOfferingGroup}`} className="grid grid-cols-2 gap-6 w-full">
                                                                        {/* B2B Column */}
                                                                        <div className="flex flex-col gap-2 min-w-0">
                                                                            <Link
                                                                                to="/offerings/b2b"
                                                                                onClick={() => setHoveredItem(null)}
                                                                                className="text-xs font-bold uppercase tracking-wider text-primary border-b pb-2 border-border/50 flex items-center justify-between hover:text-primary/80 transition-colors"
                                                                            >
                                                                                <span>B2B Profit Pools</span>
                                                                                <ChevronRight className="w-3 h-3 text-primary/70" />
                                                                            </Link>
                                                                            <div className="flex flex-col gap-1">
                                                                                {b2bItems.map((sub: any, sIdx: number) => {
                                                                                    const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                                    return (
                                                                                        <Link
                                                                                            key={sIdx}
                                                                                            to={sub.path}
                                                                                            onClick={() => setHoveredItem(null)}
                                                                                            className="group flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors"
                                                                                        >
                                                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                                                <div className="p-1.5 rounded-lg bg-primary/5 text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                                                                                    <IconComponent className="w-3.5 h-3.5" />
                                                                                                </div>
                                                                                                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                                                                    {sub.name}
                                                                                                </span>
                                                                                            </div>
                                                                                            <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
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
                                                                                className="text-xs font-bold uppercase tracking-wider text-primary border-b pb-2 border-border/50 flex items-center justify-between hover:text-primary/80 transition-colors"
                                                                            >
                                                                                <span>B2C Profit Pools</span>
                                                                                <ChevronRight className="w-3 h-3 text-primary/70" />
                                                                            </Link>
                                                                            <div className="flex flex-col gap-1">
                                                                                {b2cItems.map((sub: any, sIdx: number) => {
                                                                                    const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                                    return (
                                                                                        <Link
                                                                                            key={sIdx}
                                                                                            to={sub.path}
                                                                                            onClick={() => setHoveredItem(null)}
                                                                                            className="group flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors"
                                                                                        >
                                                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                                                <div className="p-1.5 rounded-lg bg-primary/5 text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                                                                                    <IconComponent className="w-3.5 h-3.5" />
                                                                                                </div>
                                                                                                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                                                                    {sub.name}
                                                                                                </span>
                                                                                            </div>
                                                                                            <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
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
                                                                <div key={`offerings-sel-${activeOfferingGroup}`} className="grid grid-cols-2 gap-3 w-full">
                                                                    {selectedItems.map((sub: any, sIdx: number) => {
                                                                        const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                        return (
                                                                            <Link
                                                                                key={sIdx}
                                                                                to={sub.path}
                                                                                onClick={() => setHoveredItem(null)}
                                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
                                                                            >
                                                                                <div className="flex items-center gap-3 min-w-0">
                                                                                    <div className="p-2 rounded-lg bg-primary/5 text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                                                                        <IconComponent className="w-4 h-4" />
                                                                                    </div>
                                                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                                                        {sub.name}
                                                                                    </span>
                                                                                </div>
                                                                                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
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
                                                                <div key={`${menuKey}-${activeCatId}`} className="grid grid-cols-2 gap-3 w-full">
                                                                    {selectedItems.map((sub: any, sIdx: number) => {
                                                                        const IconComponent = Icons[sub.icon] || ArrowRight;
                                                                        return (
                                                                            <Link
                                                                                key={sIdx}
                                                                                to={sub.path}
                                                                                onClick={() => setHoveredItem(null)}
                                                                                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
                                                                            >
                                                                                <div className="flex items-center gap-3 min-w-0">
                                                                                    <div className="p-2 rounded-lg bg-primary/5 text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                                                                        <IconComponent className="w-4 h-4" />
                                                                                    </div>
                                                                                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                                                                        {sub.name}
                                                                                    </span>
                                                                                </div>
                                                                                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>
                                                            );
                                                        })()
                                                    ) : null}

                                                    {/* Bottom helper bar (Matching ISI Security dropdown footer) */}
                                                    <div className="mt-6 p-3.5 bg-muted/30 rounded-xl flex items-center justify-between border border-border/50">
                                                        <span className="text-xs text-muted-foreground">
                                                            Need tailored revenue systems for your enterprise?
                                                        </span>
                                                        <Link
                                                            to="/book-consultation"
                                                            onClick={() => setHoveredItem(null)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:bg-primary/90 transition-all shadow-sm"
                                                        >
                                                            <span>Talk to Expert</span>
                                                            <ChevronRight className="w-3 h-3" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right CTA Button (Matching ISI Security primary action button) */}
                    <div className="hidden lg:flex items-center gap-3 shrink-0 relative z-50">
                        <Link
                            to="/book-consultation"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 active:bg-blue-700 text-primary-foreground px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-px group"
                        >
                            <span>Book Consultation</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Hamburger Toggle Button */}
                    <div className="lg:hidden flex items-center relative z-50">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            className="p-2 rounded-lg text-slate-700 hover:text-primary hover:bg-muted focus:outline-none transition-colors"
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

            {/* Mobile Drawer (Matching ISI Security mobile menu with smooth accordions) */}
            <div className={`lg:hidden fixed top-16 left-0 right-0 bottom-0 z-40 bg-white/98 backdrop-blur-md transition-all duration-300 overflow-y-auto ${
                mobileMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
            }`}>
                <div className="p-4 space-y-1 pb-24">
                    {smNavItems.map((item, idx) => (
                        <div key={idx} className="border-b border-border/50 pb-1">
                            <div className="flex items-center justify-between">
                                <Link 
                                    to={item.path} 
                                    className="text-base font-semibold text-slate-800 hover:text-primary py-2.5 px-2 flex-1 transition-colors"
                                    onClick={() => {
                                        if (!item.dropdown) setMobileMenuOpen(false);
                                    }}
                                >
                                    {item.name}
                                </Link>
                                {item.dropdown && (
                                    <button
                                        onClick={() => toggleExpanded(item.name)}
                                        className="p-2.5 text-slate-500 hover:text-primary transition-colors"
                                        aria-label={`Toggle ${item.name} sub-menu`}
                                    >
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                                            expandedItems.includes(item.name) ? 'rotate-180 text-primary' : ''
                                        }`} />
                                    </button>
                                )}
                            </div>
                            
                            {item.dropdown && expandedItems.includes(item.name) && (
                                <div className="pl-4 sm:pl-6 bg-muted/20 border-l-2 border-primary/30 my-1 py-2 flex flex-col gap-2 rounded-r-lg">
                                    {item.name === "Offerings" ? (
                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-[10px] font-bold text-primary/70 uppercase tracking-widest px-2 mb-1">
                                                    B2B Profit Pools
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    {((item.dropdown.categories?.find((c: any) => c.id === "profit-pools") as any)?.b2bItems || []).map((sub: any, sIdx: number) => (
                                                        <Link
                                                            key={sIdx}
                                                            to={sub.path}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="text-xs text-muted-foreground hover:text-primary py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors block"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-primary/70 uppercase tracking-widest px-2 mb-1">
                                                    B2C Profit Pools
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    {((item.dropdown.categories?.find((c: any) => c.id === "profit-pools") as any)?.b2cItems || []).map((sub: any, sIdx: number) => (
                                                        <Link
                                                            key={sIdx}
                                                            to={sub.path}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="text-xs text-muted-foreground hover:text-primary py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors block"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            {item.dropdown.categories?.filter((c: any) => c.id !== "profit-pools").map((cat: any, cIdx: number) => (
                                                <div key={cIdx}>
                                                    <div className="text-[10px] font-bold text-primary/70 uppercase tracking-widest px-2 mb-1">
                                                        {cat.title}
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        {cat.items?.map((sub: any, sIdx: number) => (
                                                            <Link
                                                                key={sIdx}
                                                                to={sub.path}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="text-xs text-muted-foreground hover:text-primary py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors block"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : item.name === "Verticals" && (item.dropdown as any)?.items ? (
                                        <div className="space-y-1.5 p-1">
                                            {(item.dropdown as any).items.map((sub: any, sIdx: number) => {
                                                const IconComponent = Icons[sub.icon] || ArrowRight;
                                                return (
                                                    <Link
                                                        key={sIdx}
                                                        to={sub.path}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="flex items-center gap-2.5 text-xs text-foreground hover:text-primary py-2 px-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                                                    >
                                                        <IconComponent className="w-4 h-4 text-primary shrink-0" />
                                                        <div className="min-w-0">
                                                            <div className="font-semibold text-slate-800">{sub.name}</div>
                                                            <div className="text-[11px] text-muted-foreground truncate">{sub.desc}</div>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                            <div className="pt-2 border-t border-border/40 mt-2 px-1">
                                                <button
                                                    onClick={() => {
                                                        setMobileMenuOpen(false);
                                                        openLongForm({ defaultService: 'Industry Verticals Consultation', title: 'Consult with Industry Verticals Experts' });
                                                    }}
                                                    className="w-full text-center py-2 px-3 rounded-lg bg-primary text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <span>Talk to Experts</span>
                                                    <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : item.dropdown.categories ? (
                                        <div className="space-y-3">
                                            {item.dropdown.categories.map((cat: any, cIdx: number) => (
                                                <div key={cIdx}>
                                                    <div className="text-[10px] font-bold text-primary/70 uppercase tracking-widest px-2 mb-1">
                                                        {cat.title}
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        {cat.items?.map((sub: any, sIdx: number) => (
                                                            <Link
                                                                key={sIdx}
                                                                to={sub.path}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="text-xs text-muted-foreground hover:text-primary py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors block"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Bottom CTA for Mobile */}
                    <div className="pt-5 px-2">
                        <Link
                            to="/book-consultation"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 text-sm py-3 px-5 rounded-full font-bold flex items-center transition-all"
                        >
                            <span>Book Consultation</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
