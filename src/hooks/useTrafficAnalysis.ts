import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent, captureCurrentUTMs } from '../lib/analytics';

export const useTrafficAnalysis = () => {
    const location = useLocation();

    useEffect(() => {
        // Capture any landing UTMs
        captureCurrentUTMs();

        // Track SPA Route View
        trackPageView(location.pathname, document.title);

        // Track Scroll Milestones (50% and 90%)
        let fired50 = false;
        let fired90 = false;

        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

            if (percent >= 50 && !fired50) {
                fired50 = true;
                trackEvent({
                    eventName: 'SCROLL_50',
                    category: 'ENGAGEMENT',
                    label: location.pathname,
                    value: 50
                });
            }

            if (percent >= 90 && !fired90) {
                fired90 = true;
                trackEvent({
                    eventName: 'SCROLL_90',
                    category: 'ENGAGEMENT',
                    label: location.pathname,
                    value: 90
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);

    }, [location.pathname]);
};
