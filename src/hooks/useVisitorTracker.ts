import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useVisitorTracker
 * Silently fires on every page navigation, sending visitor data
 * (IP geo headers are auto-attached by Vercel on the server side)
 * to the /api/track-visitor endpoint → saved to Airtable "Visitors" table.
 */
export function useVisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // Generate or reuse a session ID for this browser tab session
    let sessionId = sessionStorage.getItem('pm_session_id');
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem('pm_session_id', sessionId);
    }

    const payload = {
      page: window.location.href,
      referrer: document.referrer || '',
      sessionId,
    };

    // Fire-and-forget — don't await, don't block the page
    fetch('/api/track-visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // Ensures the request completes even if the page changes
    }).catch(() => {
      // Silent fail — visitor tracking must never break the UI
    });
  }, [location.pathname]); // Re-fires on every page navigation
}
