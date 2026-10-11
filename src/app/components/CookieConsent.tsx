
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShieldCheck, Cookie } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem('trustgrid_cookie_consent');
        if (!consent) {
            // Show popup after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('trustgrid_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('trustgrid_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[480px] z-[100]"
                >
                    <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 ring-1 ring-slate-900/5 dark:bg-slate-900/90 dark:border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 rounded-xl text-[#064e3b] shrink-0">
                                <Cookie className="w-6 h-6" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Cookie Policy</h3>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        aria-label="Close dialog"
                                        title="Close dialog"
                                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                                    >
                                        <X className="w-4 h-4" />
                                        <span className="sr-only">Close dialog</span>
                                    </button>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    We use cookies to enhance your experience, analyze site traffic, and assist in our marketing efforts. By continuing to visit this site, you agree to our use of cookies.
                                    Read our <Link to="/privacy" className="text-[#064e3b] hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-[#064e3b] hover:underline">Terms of Service</Link>.
                                </p>
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        onClick={handleAccept}
                                        className="bg-[#064e3b] hover:bg-[#053d2e] text-white shadow-lg shadow-blue-500/20 font-semibold flex-1 h-10 rounded-lg text-sm"
                                    >
                                        Accept All
                                    </Button>
                                    <Button
                                        onClick={handleDecline}
                                        variant="outline"
                                        className="border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex-1 h-10 rounded-lg text-sm"
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
