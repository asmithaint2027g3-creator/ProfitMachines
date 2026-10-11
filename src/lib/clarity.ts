/**
 * src/lib/clarity.ts
 * Microsoft Clarity Integration Layer for ProfitMachines (SPA & Enterprise Analytics)
 * Project ID: yw294lsd3c
 * 
 * Provides safe wrappers for:
 * - SPA page navigation tracking (generates separate heatmaps per subpage)
 * - Custom event tracking (CTA clicks, modal opens, form submissions)
 * - Custom session tagging (lead types, visitor tags, campaign attribution)
 * - User identification on lead submission (allows filtering session recordings by lead)
 */

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
 * In React SPAs, Clarity needs a pageview signal and tag update so each route
 * (/book-demo, /pricing, /solutions, etc.) has its own accurate heatmap and recordings.
 */
export function trackClarityPageView(pathname: string, title?: string) {
  if (!isClarityLoaded()) return;

  try {
    const page = pathname || window.location.pathname;
    const pageTitle = title || document.title;

    window.clarity!('set', 'page_path', page);
    window.clarity!('set', 'page_title', pageTitle);
    window.clarity!('event', 'pageview');
  } catch (err) {
    // Fail silently to never disrupt visitor UX
  }
}

/**
 * Record a custom event in Microsoft Clarity (e.g., 'quick_lead_submitted', 'book_demo_clicked')
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
 * (e.g. tag by visitor segment, UTM source, or company name)
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
 * Identify a user in Microsoft Clarity when they submit their contact info
 * This attaches the user's ID/email to their session recording in the Clarity dashboard
 */
export function identifyClarityUser(customId: string, customSessionId?: string, customPageId?: string, friendlyName?: string) {
  if (!isClarityLoaded()) return;

  try {
    window.clarity!('identify', customId, customSessionId, customPageId, friendlyName);
  } catch (err) {
    // Fail silently
  }
}
