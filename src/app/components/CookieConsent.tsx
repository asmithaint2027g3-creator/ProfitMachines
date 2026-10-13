import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('trustgrid_cookie_consent');
        if (!consent) {
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
                    <div className="bg-white border-2 border-[#0066FF] rounded-2xl p-6 text-[#0066FF]">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white border border-[#0066FF] rounded-xl text-[#0066FF] shrink-0">
                                <Cookie className="w-6 h-6" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-[#0066FF] font-heading">Cookie Policy</h3>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        aria-label="Close dialog"
                                        title="Close dialog"
                                        className="text-[#0066FF] hover:bg-[#0066FF]/10 rounded p-1 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-[#0066FF] leading-relaxed font-medium">
                                    We use cookies to enhance your experience, analyze site traffic, and assist in our marketing efforts. By continuing to visit this site, you agree to our use of cookies.
                                    Read our <Link to="/privacy" className="text-[#0066FF] underline font-bold">Privacy Policy</Link> and <Link to="/terms" className="text-[#0066FF] underline font-bold">Terms of Service</Link>.
                                </p>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleAccept}
                                        className="bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold flex-1 h-10 rounded-lg text-sm transition-all"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={handleDecline}
                                        className="bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white border-2 border-[#0066FF] font-bold flex-1 h-10 rounded-lg text-sm transition-all"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
