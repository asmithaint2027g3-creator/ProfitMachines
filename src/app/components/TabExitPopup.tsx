import { useState, useEffect, useRef } from 'react';
import { X, Zap, TrendingUp, ArrowRight, Building2, ShoppingBag, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackConsultationCtaClick } from '../../lib/clarity';

const MIN_TIME_MS = 1000; // 1s min time

const HIGHLIGHTS = [
    { icon: ShoppingBag, label: 'E-commerce & D2C', stat: '3.2X', desc: 'Repeat purchase growth', path: '/industries?section=d2c-companies' },
    { icon: Landmark, label: 'BFSI & FinTech', stat: '66%', desc: 'Reduction in Sales Cycle', path: '/industries?section=fintech-lending' },
    { icon: Building2, label: 'SaaS & Enterprise', stat: '6X', desc: 'More qualified leads', path: '/industries?section=saas-products' },
];

export default function TabExitPopup() {
    const [visible, setVisible] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const triggeredRef = useRef(false);
    const arrivedAtRef = useRef(Date.now());

    useEffect(() => {
        const hasTriggered = sessionStorage.getItem('trustgrid_tab_exit_triggered');
        if (hasTriggered) {
            triggeredRef.current = true;
        }
    }, []);

    const triggerPopup = (source: string) => {
        // Don't trigger if already visible or recently triggered
        if (visible || triggeredRef.current) return;
        if (Date.now() - arrivedAtRef.current < MIN_TIME_MS) return;

        console.log(`[ExitPopup] Triggered via: ${source}`);

        triggeredRef.current = true;
        sessionStorage.setItem('trustgrid_tab_exit_triggered', 'true');
        setVisible(true);
        // Step-by-step animation sequence for maximum reliability
        setTimeout(() => {
            setAnimateIn(true);
        }, 10);
    };

    const handleClose = () => {
        setAnimateIn(false);
        setTimeout(() => {
            setVisible(false);
            // We NO LONGER reset triggeredRef.current here.
            // This ensures it only pops up once per session.
        }, 300);
    };

    useEffect(() => {
        // ── 1. Mouse Out (The most common "top of page" detector) ──────────────
        const handleMouseOut = (e: MouseEvent) => {
            // clientY < 5 means mouse is moving towards the tabs/address bar
            if (e.clientY < 5) {
                triggerPopup('mouse_exit_top');
            }
        };

        // ── 2. Visibility (When tab is switched or browser minimized) ──────────
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                triggerPopup('tab_hidden');
            }
        };

        // ── 3. Before Unload (Browser close/refresh) ──────────────────────────
        const handleBeforeUnload = () => {
            if (!visible && !triggeredRef.current) {
                triggerPopup('before_unload');
            }
        };

        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [visible]); // Re-attach when visibility changes to ensure state is fresh

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center p-4 z-[10000]"
            style={{
                background: animateIn ? 'rgba(15, 23, 42, 0.7)' : 'rgba(15, 23, 42, 0)',
                backdropFilter: animateIn ? 'blur(12px)' : 'blur(0px)',
                transition: 'all 0.4s ease-out',
                pointerEvents: 'auto'
            }}
            onClick={handleClose}
        >
            <div
                className="relative bg-white w-full max-w-xl rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{
                    transform: animateIn ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                    opacity: animateIn ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Abstract Background Elements */}
                <div className="absolute top-[-50%] left-[-20%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 via-purple-100/30 to-transparent pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Top decorative gradient bar */}
                <div className="h-2 w-full bg-gradient-to-r from-[#2878B5] via-emerald-700 to-teal-700 relative z-20" />

                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition-all z-20 group shadow-sm"
                >
                    <X className="w-5 h-5 text-slate-500 group-hover:text-slate-800 group-hover:rotate-90 transition-all duration-300" />
                </button>

                <div className="px-10 pt-12 pb-10 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/50 text-[#1E6297] px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide uppercase shadow-sm">
                        <Zap className="w-4 h-4 fill-blue-600 text-[#2878B5]" />
                        Exclusive Opportunity
                    </div>

                    <h2 className="text-4xl font-black text-slate-900 leading-[1.15] mb-5 tracking-tight">
                        Wait! Don't Miss Out on Your <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2878B5] to-emerald-600">Growth Blueprint</span>
                    </h2>

                    <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-md">
                        Industry leaders are using ProfitMachines to capture demand competitors can't see. Explore our impact:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        {HIGHLIGHTS.map(({ icon: Icon, label, stat, desc, path }) => (
                            <Link
                                key={label}
                                to={path}
                                onClick={handleClose}
                                className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group relative overflow-hidden block text-left"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-[#2878B5]" />
                                    </div>
                                    <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-[#1E6297] transition-colors">{stat}</div>
                                    <div className="text-[12px] font-bold text-slate-800 uppercase tracking-tight mb-1.5 leading-tight">{desc}</div>
                                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                                        <span>{label}</span>
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#2878B5]" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/industries"
                            onClick={handleClose}
                            className="flex-1 bg-slate-900 hover:bg-[#2878B5] text-white font-bold text-center py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            Explore Growth
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/book-consultation"
                            onClick={() => {
                                handleClose();
                                trackConsultationCtaClick('Book Consultation', 'Tab Exit Popup');
                            }}
                            className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-center py-4 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center"
                        >
                            Book Consultation
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        Join 200+ companies scaling with ProfitMachines
                    </div>
                </div>
            </div>
        </div>
    );
}
