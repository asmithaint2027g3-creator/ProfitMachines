import { useRef, useEffect, useState, ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number; // Delay in seconds (e.g. 0.2)
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export const Reveal = ({
    children,
    width = "fit-content",
    delay = 0,
    direction = "up",
    className = ""
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can stop observing if we only want it to trigger once
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15, // Trigger when 15% of the element is visible
                rootMargin: "0px 0px -50px 0px" // Offset slightly so it doesn't trigger at the very bottom edge
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    // Initial transform based on direction
    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case "up": return "translate-y-20";
                case "down": return "-translate-y-20";
                case "left": return "-translate-x-20";
                case "right": return "translate-x-20";
                default: return "translate-y-20";
            }
        }
        return "translate-y-0 translate-x-0";
    };

    return (
        <div
            ref={ref}
            className={`${className}`}
            style={{ width, position: 'relative', overflow: 'hidden' }}
        >
            <div
                className={`transition-all duration-1000 ease-out ${getTransform()} ${isVisible ? 'opacity-100' : 'opacity-0'} ${className.includes('h-full') ? 'h-full' : ''}`}
                style={{
                    transitionDelay: `${delay}s`,
                    // We use cubic-bezier for that premium "spring" feel without JS
                    transitionTimingFunction: 'cubic-bezier(0.17, 0.55, 0.55, 1)'
                }}
            >
                {children}
            </div>
        </div>
    );
};
