import React from 'react';
import { useLocation } from 'react-router-dom';

export default function WhatsAppWidget() {
    const location = useLocation();
    const phoneNumber = '919513088611';

    const getContextualMessage = (pathname: string): string => {
        if (pathname.includes('/crypto')) {
            return "Hi ProfitMachines, I'm interested in Web3 Protocol & Token Ecosystem Growth solutions.";
        }
        if (pathname.includes('/pricing')) {
            return "Hi ProfitMachines, I'm reviewing your Pricing tiers and would like to discuss custom enterprise terms.";
        }
        if (pathname.includes('/demand-pulse')) {
            return "Hi ProfitMachines, I'd like to see a live demonstration of DemandPulse AI™ buyer intent radar.";
        }
        if (pathname.includes('/analytics') || pathname.includes('/behaviour-analytics')) {
            return "Hi ProfitMachines, I'm reviewing your Enterprise Analytics and would like to discuss telemetry integration.";
        }
        if (pathname.includes('/solutions')) {
            return "Hi ProfitMachines, I'm interested in your AI Business Growth & Autonomous Sales Pilot solutions.";
        }
        if (pathname.includes('/offerings')) {
            return "Hi ProfitMachines, I'd like to explore your service packages and Profit Pool Discovery framework.";
        }
        if (pathname.includes('/industries')) {
            return "Hi ProfitMachines, I'd like to discuss industry-specific AI revenue engines for my vertical.";
        }
        if (pathname.includes('/outcomes')) {
            return "Hi ProfitMachines, I'm reviewing your case studies and would like to discuss expected pipeline benchmarks.";
        }
        if (pathname.includes('/book-consultation') || pathname.includes('/talk-to-expert')) {
            return "Hi ProfitMachines, I'd like to schedule an accelerated consultation with your revenue architects.";
        }
        return "Hi ProfitMachines, I'd like to discuss autonomous revenue acceleration for my business.";
    };

    const prefilledText = getContextualMessage(location.pathname);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledText)}`;

    return (
        <aside aria-label="WhatsApp Sales Channel">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct Instant Messaging on WhatsApp with ProfitMachines Sales (+91 9513088611)"
                title="Chat with ProfitMachines Sales on WhatsApp"
                className="fixed bottom-24 right-5 sm:right-6 z-40 group flex items-center gap-2.5 transition-all duration-300"
            >
                {/* Tooltip Label */}
                <span className="hidden md:flex bg-white text-[#0066FF] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#0066FF] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none">
                    WhatsApp Sales (+91 9513088611)
                </span>

                {/* WhatsApp Button Container */}
                <div className="relative w-13 h-13 sm:w-14 sm:h-14 bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] rounded-full border-2 border-[#0066FF] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200">
                    {/* SVG Vector Icon */}
                    <svg
                        className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 transition-colors"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.41C16.31 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.49 13.49 14.32 13.73C14.16 13.98 13.69 14.53 13.54 14.69C13.4 14.86 13.26 14.88 13.01 14.76C12.76 14.63 11.96 14.37 11.02 13.53C10.28 12.87 9.78 12.06 9.64 11.81C9.5 11.56 9.62 11.43 9.75 11.31C9.86 11.2 10 11.04 10.12 10.9C10.24 10.76 10.29 10.65 10.37 10.49C10.45 10.32 10.41 10.18 10.35 10.06C10.29 9.94 9.8 8.73 9.59 8.23C9.39 7.74 9.19 7.81 9.04 7.8C8.9 7.79 8.74 7.79 8.57 7.79C8.41 7.79 8.14 7.85 7.92 8.09C7.69 8.34 7.06 8.93 7.06 10.14C7.06 11.35 7.94 12.52 8.06 12.68C8.19 12.85 9.8 15.33 12.26 16.39C12.85 16.64 13.3 16.79 13.66 16.91C14.25 17.09 14.79 17.07 15.22 17C15.7 16.93 16.69 16.4 16.9 15.82C17.11 15.24 17.11 14.75 17.04 14.64C16.98 14.54 16.82 14.48 16.56 14.41Z" />
                    </svg>
                </div>
            </a>
        </aside>
    );
}
