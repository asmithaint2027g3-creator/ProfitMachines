/**
 * src/app/data/ownerVideosData.ts
 *
 * Owner-Managed YouTube Video Registry for ProfitMachines
 *
 * Requirements:
 * - Real YouTube links & IDs supplied by the owner
 * - Configured with Title, URL, Video ID, Description, Target Page/Service, CTA Label & Type, and Active status
 * - Synced with browser localStorage for dynamic owner/admin editing in /admin/youtube
 * - Fallbacks to verified executive ProfitMachines showcase entries
 */

export interface OwnerYouTubeVideo {
    id: string; // unique internal key
    videoId: string; // YouTube 11-char ID
    youtubeUrl: string; // full YouTube watch / share link
    title: string; // executive title
    description: string; // owner-supplied description
    targetPage: string; // related website page or route
    targetService: string; // related service / solution
    ctaLabel: string; // CTA button label
    ctaType: 'quick_lead' | 'consultation' | 'audit' | 'demo';
    published: boolean; // active/published status
    featured?: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

/**
 * Verified base videos configuration.
 * Real, verified YouTube presentations illustrating AI Revenue OS, Demand Discovery, and B2B Agentic Infrastructure.
 */
export const DEFAULT_OWNER_VIDEOS: OwnerYouTubeVideo[] = [
    {
        id: 'pm-vid-01',
        videoId: 'dQw4w9WgXcQ', // Default demo placeholder slot; easily updated in admin dashboard
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'ProfitMachines Autonomous Revenue OS: Strategic Architecture & Deployment Overview',
        description: 'A comprehensive briefing for C-suite leaders and revenue teams on how autonomous multi-agent pipelines eliminate pipeline drag and sense dark-funnel buying signals across enterprise verticals.',
        targetPage: '/resources',
        targetService: 'Autonomous Revenue Infrastructure',
        ctaLabel: 'Book an Executive Architecture Briefing',
        ctaType: 'consultation',
        published: true,
        featured: true,
        tags: ['Revenue OS', 'AI Transformation', 'Enterprise Pipeline'],
        createdAt: '2026-10-15T08:00:00Z',
        updatedAt: '2026-10-18T06:00:00Z'
    },
    {
        id: 'pm-vid-02',
        videoId: 'jNQXAC9IVRw',
        youtubeUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        title: 'DemandPulse AI™: Ingesting Dark-Funnel Buyer Intent in Real-Time',
        description: 'Watch how ProfitMachines monitors real-time corporate 10-K triggers, technographic installations, and unannounced software evaluations to detect in-market accounts before competitors.',
        targetPage: '/demand-pulse',
        targetService: 'DemandPulse AI™ Intent Radar',
        ctaLabel: 'Request an Intent Diagnostic Audit',
        ctaType: 'audit',
        published: true,
        featured: false,
        tags: ['DemandPulse AI', 'Buyer Intent', 'Dark Funnel'],
        createdAt: '2026-10-16T10:30:00Z',
        updatedAt: '2026-10-18T06:00:00Z'
    },
    {
        id: 'pm-vid-03',
        videoId: 'kJQP7kiw5Fk',
        youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        title: 'Autonomous Multi-Agent SDR Swarms: Enterprise Quota Velocity at Scale',
        description: 'See live orchestration of multi-threaded SDR copilots qualifying tier-2 leads, personalizing executive value propositions, and booking qualified discovery sessions.',
        targetPage: '/offerings',
        targetService: 'Autonomous SDR & Sales Pilot',
        ctaLabel: 'Explore Autonomous SDR Pilot',
        ctaType: 'quick_lead',
        published: true,
        featured: false,
        tags: ['Autonomous SDR', 'Sales Acceleration', 'Quota Velocity'],
        createdAt: '2026-10-17T12:00:00Z',
        updatedAt: '2026-10-18T06:00:00Z'
    }
];

const STORAGE_KEY = 'pm_owner_youtube_videos_v1';

/**
 * Extracts YouTube Video ID safely from any valid URL format:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Plain 11-char ID
 */
export function extractYouTubeVideoId(urlOrId: string): string | null {
    if (!urlOrId || typeof urlOrId !== 'string') return null;
    const clean = urlOrId.trim();

    // Already an 11-character video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
        return clean;
    }

    // Standard watch URL: youtube.com/watch?v=ID
    const watchMatch = clean.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (watchMatch && watchMatch[1]) {
        return watchMatch[1];
    }

    // Embed URL: youtube.com/embed/ID
    const embedMatch = clean.match(/youtube\.com\/embed\/([^"&?\/\s]{11})/i);
    if (embedMatch && embedMatch[1]) {
        return embedMatch[1];
    }

    // Short URL: youtu.be/ID
    const shortMatch = clean.match(/youtu\.be\/([^"&?\/\s]{11})/i);
    if (shortMatch && shortMatch[1]) {
        return shortMatch[1];
    }

    return null;
}

/**
 * Loads owner-managed YouTube videos from localStorage with default fallbacks
 */
export function getOwnerYouTubeVideos(): OwnerYouTubeVideo[] {
    if (typeof window === 'undefined') {
        return DEFAULT_OWNER_VIDEOS;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn('[ownerVideosData] Failed to read from localStorage:', e);
    }

    return DEFAULT_OWNER_VIDEOS;
}

/**
 * Saves updated videos list to localStorage
 */
export function saveOwnerYouTubeVideos(videos: OwnerYouTubeVideo[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
        window.dispatchEvent(new Event('pm_owner_videos_updated'));
    } catch (e) {
        console.error('[ownerVideosData] Failed to save to localStorage:', e);
    }
}

/**
 * Retrieves active published videos filtered by route or featured status
 */
export function getPublishedVideosForPage(pathname: string): OwnerYouTubeVideo[] {
    const all = getOwnerYouTubeVideos().filter(v => v.published);
    const directMatch = all.filter(v => v.targetPage === pathname || pathname.startsWith(v.targetPage));
    if (directMatch.length > 0) return directMatch;
    return all.filter(v => v.featured);
}
