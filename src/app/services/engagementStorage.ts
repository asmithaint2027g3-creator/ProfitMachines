/**
 * engagementStorage.ts
 * 
 * Privacy-respecting storage layer for visitor engagement:
 * - Checks cookie consent before persisting data in localStorage.
 * - Uses sessionStorage if consent has not been granted.
 * - Safely saves form drafts without storing passwords or payment data.
 * - Enforces session frequency caps so users are never spammed.
 */

const STORAGE_KEYS = {
    COOKIE_CONSENT: 'trustgrid_cookie_consent',
    VISITOR_VISITS: 'pm_visitor_visits_count',
    VISITOR_LAST_VISIT: 'pm_visitor_last_visit_time',
    LAST_VISITED_PAGE: 'pm_last_visited_page',
    SESSION_WELCOME_SEEN: 'pm_ses_welcome_seen',
    SESSION_RECENT_SEEN: 'pm_ses_recent_seen',
    SESSION_EXIT_SEEN: 'pm_ses_exit_seen',
    SESSION_INACTIVITY_SEEN: 'pm_ses_inactivity_seen',
    SESSION_CONTEXT_PREFIX: 'pm_ses_ctx_',
    FORM_DRAFT_QUICK: 'pm_draft_quick_form',
    FORM_DRAFT_LONG: 'pm_draft_long_form'
};

const EXCLUDED_PAGE_ROUTES = [
    '/cookies',
    '/privacy',
    '/terms',
    '/copyright',
    '/sitemap',
    '/404'
];

export interface StoredPage {
    path: string;
    title: string;
    timestamp: number;
}

export function hasCookieConsent(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT) === 'accepted';
}

/**
 * Returns a time-appropriate greeting based on visitor's local hour.
 */
export function getTimeAppropriateGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

/**
 * Detects visitor visit count and returning status.
 */
export function getVisitorEngagementProfile(): {
    isReturning: boolean;
    visitCount: number;
    greeting: string;
} {
    const greeting = getTimeAppropriateGreeting();
    if (typeof window === 'undefined') {
        return { isReturning: false, visitCount: 1, greeting };
    }

    const consent = hasCookieConsent();
    const storage = consent ? localStorage : sessionStorage;

    let count = parseInt(storage.getItem(STORAGE_KEYS.VISITOR_VISITS) || '0', 10);
    const sessionSeen = sessionStorage.getItem(STORAGE_KEYS.SESSION_WELCOME_SEEN);

    if (!sessionSeen) {
        count += 1;
        try {
            storage.setItem(STORAGE_KEYS.VISITOR_VISITS, count.toString());
            storage.setItem(STORAGE_KEYS.VISITOR_LAST_VISIT, new Date().toISOString());
        } catch (e) {
            // Ignore storage quota errors
        }
    }

    return {
        isReturning: count > 1,
        visitCount: Math.max(1, count),
        greeting
    };
}

/**
 * Records the current page for returning visitor "Continue Exploring" feature.
 */
export function recordVisitedPage(path: string, title: string): void {
    if (typeof window === 'undefined') return;
    if (!path || EXCLUDED_PAGE_ROUTES.some(r => path.startsWith(r))) return;

    const pageData: StoredPage = {
        path,
        title: title || path,
        timestamp: Date.now()
    };

    const consent = hasCookieConsent();
    const storage = consent ? localStorage : sessionStorage;

    try {
        storage.setItem(STORAGE_KEYS.LAST_VISITED_PAGE, JSON.stringify(pageData));
    } catch (e) {
        // Safe fail
    }
}

/**
 * Retrieves the last relevant visited page, excluding the current path.
 */
export function getLastVisitedPage(currentPath: string): StoredPage | null {
    if (typeof window === 'undefined') return null;

    const consent = hasCookieConsent();
    const storage = consent ? localStorage : sessionStorage;

    try {
        const raw = storage.getItem(STORAGE_KEYS.LAST_VISITED_PAGE);
        if (!raw) return null;
        const parsed: StoredPage = JSON.parse(raw);
        if (!parsed || !parsed.path) return null;

        // Do not recommend current page or excluded pages
        if (parsed.path === currentPath || EXCLUDED_PAGE_ROUTES.includes(parsed.path)) {
            return null;
        }

        return parsed;
    } catch (e) {
        return null;
    }
}

/* ── Incomplete Form Draft Storage (sessionStorage only for privacy) ── */

export function saveFormDraft(type: 'quick' | 'long', data: Record<string, any>): void {
    if (typeof window === 'undefined') return;
    const key = type === 'quick' ? STORAGE_KEYS.FORM_DRAFT_QUICK : STORAGE_KEYS.FORM_DRAFT_LONG;

    // Filter out potential sensitive credentials or payment data (defensive privacy)
    const sanitized: Record<string, any> = {};
    for (const [k, v] of Object.entries(data)) {
        if (!['password', 'creditCard', 'cvv', 'ssn'].includes(k.toLowerCase())) {
            sanitized[k] = v;
        }
    }

    try {
        sessionStorage.setItem(key, JSON.stringify(sanitized));
    } catch (e) {
        // Safe fail
    }
}

export function getFormDraft<T = Record<string, any>>(type: 'quick' | 'long'): T | null {
    if (typeof window === 'undefined') return null;
    const key = type === 'quick' ? STORAGE_KEYS.FORM_DRAFT_QUICK : STORAGE_KEYS.FORM_DRAFT_LONG;
    try {
        const raw = sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

export function clearFormDraft(type: 'quick' | 'long'): void {
    if (typeof window === 'undefined') return;
    const key = type === 'quick' ? STORAGE_KEYS.FORM_DRAFT_QUICK : STORAGE_KEYS.FORM_DRAFT_LONG;
    try {
        sessionStorage.removeItem(key);
    } catch (e) {
        // Safe fail
    }
}

/* ── Session Suppression Flags ── */

export function hasSeenWelcomeThisSession(): boolean {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(STORAGE_KEYS.SESSION_WELCOME_SEEN) === 'true';
}

export function markWelcomeSeenThisSession(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_WELCOME_SEEN, 'true');
}

export function hasSeenRecentPageThisSession(): boolean {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(STORAGE_KEYS.SESSION_RECENT_SEEN) === 'true';
}

export function markRecentPageSeenThisSession(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_RECENT_SEEN, 'true');
}

export function hasSeenExitIntentThisSession(): boolean {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(STORAGE_KEYS.SESSION_EXIT_SEEN) === 'true';
}

export function markExitIntentSeenThisSession(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_EXIT_SEEN, 'true');
}

export function hasSeenInactivityThisSession(): boolean {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(STORAGE_KEYS.SESSION_INACTIVITY_SEEN) === 'true';
}

export function markInactivitySeenThisSession(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_INACTIVITY_SEEN, 'true');
}

export function hasSeenContextualPromptThisSession(pageKey: string): boolean {
    if (typeof window === 'undefined') return true;
    const key = `${STORAGE_KEYS.SESSION_CONTEXT_PREFIX}${pageKey.replace(/[^a-zA-Z0-9]/g, '_')}`;
    return sessionStorage.getItem(key) === 'true';
}

export function markContextualPromptSeenThisSession(pageKey: string): void {
    if (typeof window === 'undefined') return;
    const key = `${STORAGE_KEYS.SESSION_CONTEXT_PREFIX}${pageKey.replace(/[^a-zA-Z0-9]/g, '_')}`;
    sessionStorage.setItem(key, 'true');
}
