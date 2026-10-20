/**
 * src/lib/clarity.ts
 * Microsoft Clarity Integration Layer for ProfitMachines (SPA & Enterprise Funnel Analytics)
 * Project ID: yw294lsd3c
 * 
 * Recommended Conversion Funnel:
 * 1. Website visit (session starts / pageview)
 * 2. Visit a solution or service page (event: 'view_solution_page')
 * 3. Click a consultation CTA (event: 'click_consultation_cta')
 * 4. Submit button clicked (event: 'form_submit_button_clicked')
 * 5. Successfully submit the lead form (event: 'lead_form_submitted')
 * 
 * PRIVACY GUARANTEE:
 * No personal information, email addresses, phone numbers, or form contents
 * are ever sent to Microsoft Clarity.
 */

import { getStoredUTMs } from './analytics';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

/**
 * Checks if Microsoft Clarity runtime is available on the client
 */
export function isClarityLoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
}

/**
 * Track SPA Route Change
 * Sets route tags, fires 'pageview' event, and automatically triggers
 * 'view_solution_page' milestone when navigating to solutions, offerings, services, or industries.
 */
export function trackClarityPageView(pathname: string, title?: string) {
  if (!isClarityLoaded()) return;

  try {
    const page = pathname || window.location.pathname;
    const pageTitle = title || document.title;

    window.clarity!('set', 'page_path', page);
    window.clarity!('set', 'page_title', pageTitle);
    window.clarity!('event', 'pageview');

    // Funnel Stage 2: Visit a solution or service page
    const isSolutionOrService = 
      page.startsWith('/solutions') ||
      page.startsWith('/offerings') ||
      page.startsWith('/services') ||
      page.startsWith('/industries');

    if (isSolutionOrService) {
      window.clarity!('set', 'page_funnel_stage', 'solution_offering');
      window.clarity!('event', 'view_solution_page');
    } else if (page.startsWith('/book-consultation') || page.startsWith('/talk-to-expert')) {
      window.clarity!('set', 'page_funnel_stage', 'consultation_intent');
      window.clarity!('event', 'view_consultation_page');
    }
  } catch (err) {
    // Fail silently to never disrupt visitor UX
  }
}

/**
 * Funnel Stage 3: Click a consultation CTA
 * Records CTA button clicks ('Book Consultation', 'Talk to Expert', etc.)
 */
export function trackConsultationCtaClick(ctaName: string, locationContext?: string) {
  if (!isClarityLoaded()) return;

  try {
    window.clarity!('set', 'last_cta_clicked', ctaName);
    if (locationContext) {
      window.clarity!('set', 'last_cta_location', locationContext);
    }
    window.clarity!('event', 'click_consultation_cta');
  } catch (err) {
    // Fail silently
  }
}

/**
 * Distinguish button clicks from successfully completed form submissions.
 * Fires when a user clicks the submit button on any consultation or lead form.
 */
export function trackFormSubmitAttempt(formName: string) {
  if (!isClarityLoaded()) return;

  try {
    window.clarity!('set', 'last_form_attempted', formName);
    window.clarity!('event', 'form_submit_button_clicked');
  } catch (err) {
    // Fail silently
  }
}

/**
 * Funnel Stage 4 (Final Milestone): Successfully submit the lead form.
 * Confirmed ONLY after successful 200 response from backend/calendar/sheet.
 * Never transmits PII (no name, email, phone, or message).
 */
export function trackLeadSubmissionSuccess(leadType: string, submissionId?: string) {
  if (!isClarityLoaded()) return;

  try {
    window.clarity!('set', 'lead_converted', 'true');
    window.clarity!('set', 'lead_type', leadType);

    if (submissionId) {
      // Safe non-PII token (e.g., 'PROF-102' or 'GCAL-CONFIRMED' or timestamp ID)
      const cleanId = String(submissionId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      window.clarity!('set', 'lead_submission_id', cleanId);
      window.clarity!('identify', cleanId);
    }

    window.clarity!('event', 'lead_form_submitted');
  } catch (err) {
    // Fail silently
  }
}

/**
 * Record a generic custom event in Microsoft Clarity
 */
export function trackClarityEvent(eventName: string) {
  if (!isClarityLoaded()) return;

  try {
    window.clarity!('event', eventName);
  } catch (err) {
    // Fail silently
  }
}

/**
 * Set a custom key-value tag in Microsoft Clarity for session segmentation
 */
export function setClarityTag(key: string, value: string) {
  if (!isClarityLoaded()) return;

  try {
    window.clarity!('set', key, String(value));
  } catch (err) {
    // Fail silently
  }
}

/**
 * Attach non-PII campaign attribution and referrer tags to Clarity session
 */
export function syncClarityCampaignAndReferral() {
  if (!isClarityLoaded()) return;

  try {
    const utms = getStoredUTMs();
    if (utms) {
      if (utms.utm_source) window.clarity!('set', 'utm_source', utms.utm_source);
      if (utms.utm_medium) window.clarity!('set', 'utm_medium', utms.utm_medium);
      if (utms.utm_campaign) window.clarity!('set', 'utm_campaign', utms.utm_campaign);
      if (utms.utm_term) window.clarity!('set', 'utm_term', utms.utm_term);
      if (utms.utm_content) window.clarity!('set', 'utm_content', utms.utm_content);
    }

    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        // Only store domain to prevent leaking any URL query parameters
        window.clarity!('set', 'referrer_domain', refUrl.hostname);
      } catch {
        // Ignore malformed referrer
      }
    }
  } catch (err) {
    // Fail silently
  }
}

/**
 * Identify a user in Microsoft Clarity using an anonymous lead ID or Jira issue key
 * STRICT PRIVACY: NEVER PASS EMAIL, PHONE, OR NAME TO THIS FUNCTION.
 */
export function identifyClarityUser(customId: string, customSessionId?: string, customPageId?: string, friendlyName?: string) {
  if (!isClarityLoaded()) return;

  try {
    // Strip any possible email formatting from customId or friendlyName as safety guard
    const sanitizedId = String(customId).replace(/@.+/, '');
    const sanitizedName = friendlyName ? String(friendlyName).replace(/@.+/, '') : undefined;
    window.clarity!('identify', sanitizedId, customSessionId, customPageId, sanitizedName);
  } catch (err) {
    // Fail silently
  }
}
