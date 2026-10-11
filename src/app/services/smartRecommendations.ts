/**
 * smartRecommendations.ts
 * 
 * Predefined structure-based recommendation graph and page-aware engagement prompts.
 * Strictly uses existing website routes, services, and approved copy.
 */

export interface PageRecommendation {
    title: string;
    route: string;
    badge: string;
    description: string;
}

export interface PageContextPrompt {
    pageKey: string;
    badge: string;
    message: string;
    actionLabel: string;
    actionType: 'quick_form' | 'long_form' | 'chatbot' | 'navigate';
    navigateUrl?: string;
    relatedPages: PageRecommendation[];
}

const PAGE_PROMPTS_MAP: Record<string, PageContextPrompt> = {
    '/': {
        pageKey: 'home',
        badge: 'Executive Advisory',
        message: 'Looking for a predictable revenue engine tailored to your market?',
        actionLabel: 'Quick 60-Sec Inquiry',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'AI Solutions Matrix', route: '/solutions', badge: 'Architecture', description: 'Explore modular revenue engines from strategy to RevOps.' },
            { title: 'DemandPulse AI™', route: '/demand-pulse', badge: 'Intent Signals', description: 'Autonomous buyer intent sensing and signal radar.' },
            { title: 'Verified Outcomes', route: '/outcomes', badge: 'Case Studies', description: 'Real-world ARR metrics and pipeline lift across industries.' }
        ]
    },
    '/solutions': {
        pageKey: 'solutions',
        badge: 'Solution Architecture',
        message: 'Need help choosing the right modular revenue architecture?',
        actionLabel: 'Schedule Consultation',
        actionType: 'long_form',
        relatedPages: [
            { title: 'DemandPulse AI™ Intent Engine', route: '/demand-pulse', badge: 'Demand Generation', description: 'Turn dark funnel signals into revenue certainty.' },
            { title: 'Verified ARR Outcomes', route: '/outcomes', badge: 'ROI Benchmarks', description: 'Explore 300% pipeline lift metrics and case studies.' },
            { title: 'Pricing & Investment Models', route: '/pricing', badge: 'Engagement Tiers', description: 'Transparent monthly and performance fee structures.' }
        ]
    },
    '/pricing': {
        pageKey: 'pricing',
        badge: 'Investment Guidance',
        message: 'Would you like help selecting the right service package for your ARR stage?',
        actionLabel: 'Talk to an Expert',
        actionType: 'long_form',
        relatedPages: [
            { title: 'Executive Solutions', route: '/solutions', badge: 'Solutions', description: 'See what is included in each modular engine.' },
            { title: 'Proven Client Outcomes', route: '/outcomes', badge: 'Proof Points', description: 'Review ROI timelines and sales cycle compression metrics.' },
            { title: 'Profit Pool Discovery', route: '/offerings', badge: 'Diagnostic', description: 'Start with a 45-minute revenue audit before committing.' }
        ]
    },
    '/demand-pulse': {
        pageKey: 'demand-pulse',
        badge: 'Demand Intelligence',
        message: 'Want to see how autonomous buyer intent signals work for your ICP?',
        actionLabel: 'Request Intent Preview',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'AI Sales Pilot & SDRs', route: '/solutions#sales-ops', badge: 'Execution', description: 'Pair intent signals with autonomous SDR cadences.' },
            { title: 'Pricing Plans', route: '/pricing', badge: 'Tiers', description: 'Evaluate standalone engine vs full revenue OS deployment.' },
            { title: 'Industry Applications', route: '/industries', badge: 'Verticals', description: 'See how intent data applies to SaaS, FinTech, and D2C.' }
        ]
    },
    '/offerings': {
        pageKey: 'offerings',
        badge: 'Diagnostic Frameworks',
        message: 'Need help identifying the right profit pool discovery approach for your business?',
        actionLabel: 'Schedule Diagnostic',
        actionType: 'long_form',
        relatedPages: [
            { title: 'AI Business Growth Strategy', route: '/solutions#strategy', badge: 'Strategy', description: 'Transform discovery findings into executive execution.' },
            { title: 'Industry Verticals', route: '/industries', badge: 'Tailored', description: 'Sector-specific discovery matrices and benchmarks.' },
            { title: 'Market Sizing & PMF', route: '/offerings/profit-pool-discovery/market-discovery', badge: 'Deep Dive', description: 'Uncover unmapped market revenue opportunities.' }
        ]
    },
    '/industries': {
        pageKey: 'industries',
        badge: 'Vertical Advisory',
        message: 'Looking for a revenue engine engineered specifically for your industry vertical?',
        actionLabel: 'Quick Vertical Inquiry',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'Core Solutions Matrix', route: '/solutions', badge: 'Architecture', description: 'Modular systems configured for any industry nuance.' },
            { title: 'Enterprise Outcomes', route: '/outcomes', badge: 'Benchmarks', description: 'Discover results achieved in your specific sector.' },
            { title: 'Behaviour Analytics', route: '/behaviour-analytics', badge: 'Telemetry', description: 'Monitor vertical buyer interaction and intent telemetry.' }
        ]
    },
    '/outcomes': {
        pageKey: 'outcomes',
        badge: 'Growth Verification',
        message: 'Ready to validate the potential ROI and sales cycle compression for your team?',
        actionLabel: 'Schedule Architecture Audit',
        actionType: 'long_form',
        relatedPages: [
            { title: 'Pricing & Engagement Tiers', route: '/pricing', badge: 'Investment', description: 'Compare modular vs full autonomous revenue engines.' },
            { title: 'Solutions Overview', route: '/solutions', badge: 'Components', description: 'Inspect the technical specifications of each engine.' },
            { title: 'Executive Resources', route: '/resources', badge: 'Playbooks', description: 'Download battle-tested growth and pipeline playbooks.' }
        ]
    },
    '/resources': {
        pageKey: 'resources',
        badge: 'Knowledge Architecture',
        message: 'Looking for specific implementation playbooks for your revenue operations?',
        actionLabel: 'Connect with a Strategist',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'Solutions Architecture', route: '/solutions', badge: 'Implementation', description: 'Turn research playbooks into live autonomous engines.' },
            { title: 'Diagnostic Consultation', route: '/book-consultation', badge: 'Audit', description: 'Book a 45-minute revenue architecture assessment.' },
            { title: 'Outcomes & Case Studies', route: '/outcomes', badge: 'Field Evidence', description: 'Real-world validation of our methodology in production.' }
        ]
    },
    '/crypto': {
        pageKey: 'crypto',
        badge: 'Web3 Protocol Strategy',
        message: 'Need help architecting an AI-native revenue engine for your protocol or exchange?',
        actionLabel: 'Quick Web3 Inquiry',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'DemandPulse AI™', route: '/demand-pulse', badge: 'Buyer Signals', description: 'Sense dark social sentiment and trading committee intent.' },
            { title: 'General Solutions', route: '/solutions', badge: 'Core Engines', description: 'Enterprise RevOps and growth models adapted for Web3.' },
            { title: 'Pricing & Models', route: '/pricing', badge: 'Packages', description: 'Transparent engagement models for protocol foundations.' }
        ]
    },
    '/behaviour-analytics': {
        pageKey: 'behaviour-analytics',
        badge: 'Telemetry Intelligence',
        message: 'Want to discover how digital body language insights translate into closed deals?',
        actionLabel: 'Talk to Telemetry Architect',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'DemandPulse Intent Radar', route: '/demand-pulse', badge: 'Intent Feed', description: 'Connect behavior telemetry with automated outbound actions.' },
            { title: 'Executive Dashboard', route: '/analytics', badge: 'Sheets Live', description: 'Inspect sheet-processed live executive metrics.' },
            { title: 'Revenue Solutions', route: '/solutions', badge: 'Engines', description: 'Automate the execution of identified buyer intents.' }
        ]
    }
};

/**
 * Resolves context prompt and related recommendations for a pathname.
 */
export function getPageContextPrompt(pathname: string): PageContextPrompt {
    // Normalise pathname
    const cleanPath = pathname.split('?')[0].split('#')[0] || '/';
    
    // Direct match
    if (PAGE_PROMPTS_MAP[cleanPath]) {
        return PAGE_PROMPTS_MAP[cleanPath];
    }

    // Prefix matches for subroutes (e.g. /offerings/profit-pool-discovery/...)
    if (cleanPath.startsWith('/offerings')) {
        return PAGE_PROMPTS_MAP['/offerings'];
    }
    if (cleanPath.startsWith('/solutions')) {
        return PAGE_PROMPTS_MAP['/solutions'];
    }
    if (cleanPath.startsWith('/industries')) {
        return PAGE_PROMPTS_MAP['/industries'];
    }

    // Default fallback
    return {
        pageKey: 'general',
        badge: 'Strategic Advisory',
        message: 'Have questions about architecting an AI revenue engine for your business?',
        actionLabel: 'Quick Inquiry',
        actionType: 'quick_form',
        relatedPages: [
            { title: 'Explore Solutions', route: '/solutions', badge: 'Engines', description: 'Modular AI revenue systems.' },
            { title: 'Pricing Models', route: '/pricing', badge: 'Tiers', description: 'Transparent plans and ROI models.' },
            { title: 'Case Studies', route: '/outcomes', badge: 'Proof', description: 'Verified enterprise benchmarks.' }
        ]
    };
}
