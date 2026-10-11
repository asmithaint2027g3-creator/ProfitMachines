# ProfitMachines Analytics: Intelligence Architecture

The implemented analytics system is not just for tracking; it is the foundation for ProfitMachines' intelligence layers.

## Layer 1: User Behavior Analytics
- **Data Source**: Granular events (`scroll`, `click`, `rage_click`).
- **Function**: Visualizes the user journey and identifies friction points (e.g., rage clicks on the "Yield Farming" tab).

## Layer 2: Real-Time Personalization
- **Mechanism**: The `analytics.getBehavioralSummary()` method.
- **Example**: If a user has a `scroll_75` event on the "Crypto" page, the UI can dynamically highlight the "AI-Native Revenue Protocol" section in the navigation or show a targeted "Book a Demo" modal.

## Layer 3: Predictive Content Delivery
- **Mechanism**: The Google Sheets `VISITORS`/`PAGE_VIEWS` historical data for `visitor_id`.
- **Function**: By analyzing which `navigation_path` leads to the highest `engagement_score`, ProfitMachines can predict which content a returning anonymous user wants to see next.

## Layer 5: Adaptive UI/UX Optimization
- **Mechanism**: Rage click and scroll depth data.
- **Function**: Automatically flagging sections that are consistently ignored (low scroll depth) or causing frustration (rage clicks). This powers the "AI-Driven UX Optimization" signal in the Google Sheets / Analytics Dashboard.

---

### Implementation Details:
1. **Anonymous First**: Every user gets a `user_id` immediately, but no PII is collected until they use a CTA.
2. **Consent-Gated**: No tracking occurs until the user clicks "Accept All" on the `CookieConsent` component.
3. **Optimized Flow**: Events are batched and sent through a secure serverless bridge (`/api/analytics`) to prevent API key exposure and reduce network overhead.
