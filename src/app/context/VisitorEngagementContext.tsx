/**
 * VisitorEngagementContext.tsx
 * 
 * Centralized orchestrator for smart visitor engagement:
 * - Returning visitor welcome & time-appropriate greeting
 * - Recently visited page alert & resume navigation
 * - Desktop exit-intent & mobile assistance prompt
 * - Incomplete form draft auto-save & abandoned form assistance
 * - Contextual page assistance & smart page recommendations
 * - Inactivity assistance timer
 * - Strict priority resolution (no conflicting or overlapping modals)
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
    getVisitorEngagementProfile,
    recordVisitedPage,
    getLastVisitedPage,
    saveFormDraft,
    getFormDraft,
    clearFormDraft as clearDraftStorage,
    hasSeenWelcomeThisSession,
    markWelcomeSeenThisSession,
    hasSeenRecentPageThisSession,
    markRecentPageSeenThisSession,
    hasSeenExitIntentThisSession,
    markExitIntentSeenThisSession,
    hasSeenInactivityThisSession,
    markInactivitySeenThisSession,
    hasSeenContextualPromptThisSession,
    markContextualPromptSeenThisSession,
    StoredPage
} from '../services/engagementStorage';
import { getPageContextPrompt, PageContextPrompt } from '../services/smartRecommendations';

import { useLeadModal } from './LeadModalContext';

export type EngagementType =
    | 'none'
    | 'welcome'
    | 'recent_page'
    | 'exit_intent'
    | 'contextual_prompt'
    | 'inactivity'
    | 'incomplete_form';

interface VisitorEngagementContextType {
    activeEngagement: EngagementType;
    visitorInfo: {
        isReturning: boolean;
        visitCount: number;
        greeting: string;
    };
    lastVisitedPage: StoredPage | null;
    currentPrompt: PageContextPrompt;
    isFormActive: boolean;
    hasFormInteracted: boolean;
    activeFormType: 'quick' | 'long' | null;
    
    // Actions
    dismissEngagement: () => void;
    triggerExitIntent: () => void;
    registerFormStart: (formType: 'quick' | 'long') => void;
    registerFormChange: (formType: 'quick' | 'long', data: Record<string, any>, hasContent: boolean) => void;
    handleFormCloseAttempt: () => boolean; // returns true if incomplete prompt triggered
    resumeActiveForm: () => void;
    confirmFormDismiss: () => void;
    completeFormSubmission: (formType: 'quick' | 'long') => void;
    getSavedDraft: <T = Record<string, any>>(formType: 'quick' | 'long') => T | null;
}

const VisitorEngagementContext = createContext<VisitorEngagementContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT_MS = 50 * 1000; // 50 seconds of idle
const CONTEXTUAL_PROMPT_DELAY_MS = 18 * 1000; // 18 seconds on page

export const VisitorEngagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const leadModal = useLeadModal();
    const [activeEngagement, setActiveEngagement] = useState<EngagementType>('none');
    
    // Form tracking
    const [isFormActive, setIsFormActive] = useState(false);
    const [hasFormInteracted, setHasFormInteracted] = useState(false);
    const [activeFormType, setActiveFormType] = useState<'quick' | 'long' | null>(null);
    const pendingDraftRef = useRef<Record<string, any>>({});

    // Visitor profile
    const [visitorInfo, setVisitorInfo] = useState(() => getVisitorEngagementProfile());
    const [lastVisitedPage, setLastVisitedPage] = useState<StoredPage | null>(null);
    const currentPrompt = getPageContextPrompt(location.pathname);

    // Idle timers
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const contextPromptTimerRef = useRef<NodeJS.Timeout | null>(null);
    const userIsTypingRef = useRef(false);

    // Helper to check if modal, chatbot, or cookie consent is actively demanding attention (Priorities 1 & 2)
    const isInterruptionBlocked = useCallback(() => {
        if (leadModal.isOpen || isFormActive) return true;
        if (typeof window !== 'undefined') {
            if ((window as any).__PM_CHATBOT_OPEN__) return true;
            const consent = localStorage.getItem('trustgrid_cookie_consent');
            if (!consent) return true; // Cookie consent has priority
        }
        return false;
    }, [leadModal.isOpen, isFormActive]);

    // Initial page load & returning visitor detection
    useEffect(() => {
        const info = getVisitorEngagementProfile();
        setVisitorInfo(info);

        const currentPath = location.pathname;
        const pageTitle = document.title || currentPath;
        
        // Find if returning visitor has a relevant previous page
        const previous = getLastVisitedPage(currentPath);
        setLastVisitedPage(previous);

        // Record the current visit after a slight delay
        recordVisitedPage(currentPath, pageTitle);

        // Show welcome or recent page reminder once per session (after brief initial delay)
        const welcomeTimer = setTimeout(() => {
            // Priority 5 & 6: Only if no higher priority engagement is active
            if (activeEngagement !== 'none' || isInterruptionBlocked()) return;

            if (info.isReturning) {
                if (previous && !hasSeenRecentPageThisSession()) {
                    setActiveEngagement('recent_page');
                    markRecentPageSeenThisSession();
                    markWelcomeSeenThisSession();
                } else if (!hasSeenWelcomeThisSession()) {
                    setActiveEngagement('welcome');
                    markWelcomeSeenThisSession();
                }
            } else if (!hasSeenWelcomeThisSession()) {
                // First-time visitor gentle welcome
                setActiveEngagement('welcome');
                markWelcomeSeenThisSession();
            }
        }, 3500);

        return () => clearTimeout(welcomeTimer);
    }, [isInterruptionBlocked]);

    // Page route change listener
    useEffect(() => {
        const currentPath = location.pathname;
        const pageTitle = document.title || currentPath;
        recordVisitedPage(currentPath, pageTitle);

        // Clear existing contextual prompt timer on route change
        if (contextPromptTimerRef.current) {
            clearTimeout(contextPromptTimerRef.current);
        }

        // Auto-dismiss transient contextual or welcome banners on route change
        if (['welcome', 'recent_page', 'contextual_prompt', 'inactivity'].includes(activeEngagement)) {
            setActiveEngagement('none');
        }

        // Setup contextual page prompt timer (shows after 18s if user hasn't seen it)
        const pageKey = currentPrompt.pageKey;
        if (!hasSeenContextualPromptThisSession(pageKey)) {
            contextPromptTimerRef.current = setTimeout(() => {
                if (activeEngagement === 'none' && !isInterruptionBlocked() && !userIsTypingRef.current) {
                    setActiveEngagement('contextual_prompt');
                    markContextualPromptSeenThisSession(pageKey);
                }
            }, CONTEXTUAL_PROMPT_DELAY_MS);
        }

        return () => {
            if (contextPromptTimerRef.current) clearTimeout(contextPromptTimerRef.current);
        };
    }, [location.pathname, isInterruptionBlocked]);

    // ── Desktop Exit Intent & Mouse Tracking ──────────────────────────────
    useEffect(() => {
        let lastY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            // Track pointer movement
            const isMovingUp = e.clientY < lastY;
            lastY = e.clientY;

            // Trigger when cursor moves abruptly toward top browser chrome (< 12px)
            if (e.clientY <= 12 && isMovingUp) {
                if (
                    activeEngagement === 'none' &&
                    !isInterruptionBlocked() &&
                    !hasSeenExitIntentThisSession()
                ) {
                    setActiveEngagement('exit_intent');
                    markExitIntentSeenThisSession();
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeEngagement, isInterruptionBlocked]);

    // ── Mobile Exit / Upward Velocity Intent ─────────────────────────────
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
        if (!isMobile) return;

        let maxScrollY = 0;
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > maxScrollY) {
                maxScrollY = currentY;
            }
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Trigger if visitor read at least 50% of the page and quickly returned to top (< 80px)
            if (docHeight > 500 && maxScrollY > docHeight * 0.5 && currentY < 80) {
                if (
                    activeEngagement === 'none' &&
                    !isInterruptionBlocked() &&
                    !hasSeenExitIntentThisSession()
                ) {
                    setActiveEngagement('exit_intent');
                    markExitIntentSeenThisSession();
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeEngagement, isInterruptionBlocked]);

    // ── Inactivity / Idle Timer ──────────────────────────────────────────
    const resetInactivityTimer = useCallback(() => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        // Do not trigger if form is active or popup already visible
        if (isInterruptionBlocked() || activeEngagement !== 'none' || hasSeenInactivityThisSession()) {
            return;
        }

        idleTimerRef.current = setTimeout(() => {
            if (activeEngagement === 'none' && !isInterruptionBlocked() && !userIsTypingRef.current) {
                setActiveEngagement('inactivity');
                markInactivitySeenThisSession();
            }
        }, INACTIVITY_TIMEOUT_MS);
    }, [activeEngagement, isInterruptionBlocked]);

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
        const onActivity = () => {
            resetInactivityTimer();
        };

        events.forEach(evt => window.addEventListener(evt, onActivity, { passive: true }));
        resetInactivityTimer();

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            events.forEach(evt => window.removeEventListener(evt, onActivity));
        };
    }, [resetInactivityTimer]);

    // ── Form State Management ─────────────────────────────────────────────
    const registerFormStart = useCallback((formType: 'quick' | 'long') => {
        setIsFormActive(true);
        setActiveFormType(formType);
        // Suppress any active popups
        if (['welcome', 'recent_page', 'contextual_prompt', 'inactivity', 'exit_intent'].includes(activeEngagement)) {
            setActiveEngagement('none');
        }
    }, [activeEngagement]);

    const registerFormChange = useCallback((formType: 'quick' | 'long', data: Record<string, any>, hasContent: boolean) => {
        userIsTypingRef.current = true;
        setHasFormInteracted(hasContent);
        pendingDraftRef.current = data;

        if (hasContent) {
            saveFormDraft(formType, data);
        }

        // Reset typing indicator after 1.5s
        setTimeout(() => {
            userIsTypingRef.current = false;
        }, 1500);
    }, []);

    const handleFormCloseAttempt = useCallback((): boolean => {
        // If user interacted with the form and has unsubmitted content
        if (hasFormInteracted && isFormActive) {
            setActiveEngagement('incomplete_form');
            return true; // Cancel immediate dismissal to show reminder
        }
        setIsFormActive(false);
        setActiveFormType(null);
        setHasFormInteracted(false);
        return false;
    }, [hasFormInteracted, isFormActive]);

    const resumeActiveForm = useCallback(() => {
        setActiveEngagement('none');
        setIsFormActive(true);
    }, []);

    const confirmFormDismiss = useCallback(() => {
        // Form draft remains safely in sessionStorage so user can resume next time
        setActiveEngagement('none');
        setIsFormActive(false);
        setActiveFormType(null);
        setHasFormInteracted(false);
    }, []);

    const completeFormSubmission = useCallback((formType: 'quick' | 'long') => {
        // Clear saved draft on success
        clearDraftStorage(formType);
        pendingDraftRef.current = {};
        setHasFormInteracted(false);
        setIsFormActive(false);
        setActiveFormType(null);
        setActiveEngagement('none');
    }, []);

    const getSavedDraft = useCallback(<T = Record<string, any>>(formType: 'quick' | 'long'): T | null => {
        return getFormDraft<T>(formType);
    }, []);

    const dismissEngagement = useCallback(() => {
        setActiveEngagement('none');
    }, []);

    // Global ESC key listener to dismiss active non-form engagements
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && activeEngagement !== 'none' && activeEngagement !== 'incomplete_form') {
                dismissEngagement();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeEngagement, dismissEngagement]);

    return (
        <VisitorEngagementContext.Provider
            value={{
                activeEngagement,
                visitorInfo,
                lastVisitedPage,
                currentPrompt,
                isFormActive,
                hasFormInteracted,
                activeFormType,
                dismissEngagement,
                triggerExitIntent: () => setActiveEngagement('exit_intent'),
                registerFormStart,
                registerFormChange,
                handleFormCloseAttempt,
                resumeActiveForm,
                confirmFormDismiss,
                completeFormSubmission,
                getSavedDraft
            }}
        >
            {children}
        </VisitorEngagementContext.Provider>
    );
};

export const useVisitorEngagement = () => {
    const context = useContext(VisitorEngagementContext);
    if (!context) {
        throw new Error('useVisitorEngagement must be used within a VisitorEngagementProvider');
    }
    return context;
};
