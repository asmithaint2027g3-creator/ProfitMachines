# Enterprise Google Sheets & Apps Script Setup

This document provides step-by-step instructions to configure and deploy the **ProfitMachines** Enterprise backend on Google Sheets with real-time transactional lead notifications, visitor analytics, and daily/weekly traffic intelligence email reports.

---

## 1. Prepare Your Google Sheet

1. Create a new or open your existing Google Sheet (e.g., [ProfitMachines Database](https://docs.google.com/spreadsheets/d/1gs2UHZ8d5vtYzPm7N7U_36GgU9bJjcfZY_HmHDsJ3NU/edit)).
2. The Google Apps Script backend automatically creates and formats the following 8 tabs on first execution:
   - `FORM_SUBMISSIONS` — Comprehensive inbound lead and consultation submissions.
   - `VISITORS` — Anonymous first-party visitor profiles and conversion statuses.
   - `PAGE_VIEWS` — Real-time page view logs and engagement durations.
   - `TRAFFIC_ANALYTICS` — Aggregated daily traffic and source metrics.
   - `LEADS` — Qualified executive pipeline records.
   - `EVENTS` — CTA clicks, scroll depth, form interaction logs.
   - `MAILING_LOG` — Real-time transactional email dispatch audit log.
   - `ERROR_LOG` — Server-side error monitoring and payload diagnostics.

---

## 2. Install the Google Apps Script

1. In your Google Sheet, navigate to **Extensions > Apps Script**.
2. Replace any default code in `Code.gs` with the contents of [`google-apps-script/Code.gs`](file:///c:/Users/srimp/Downloads/Profit%20machines/microvectors-master/google-apps-script/Code.gs).
3. (Optional) Customize `CONFIG.NOTIFICATION_EMAIL` with your designated executive notification email address.
4. Click the **Save** icon (💾).

---

## 3. Deploy as a Web App

1. Click **Deploy > New deployment** (top right).
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the deployment:
   - **Description**: `ProfitMachines Enterprise Backend v2.0`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(crucial for accepting webhooks from client/server)*
4. Click **Deploy**.
5. When prompted, click **Authorize Access**:
   - Select your Google account.
   - Click **Advanced** > **Go to Project (unsafe)**.
   - Click **Allow** to grant permissions (Spreadsheet read/write + Email dispatch).
6. Copy the generated **Web App URL** (which ends in `/exec`).

---

## 4. Configure Environment Variables

Add your Web App URL to your local `.env` and your **Vercel Project Settings > Environment Variables**:

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
# Optional but recommended: shared secret protecting the analytics read endpoints
ANALYTICS_API_KEY=choose-a-long-random-string
```

If you set `ANALYTICS_API_KEY` above, also add the same value as a **Script Property** on the Apps Script project so the backend enforces it:

1. In the Apps Script editor, open **Project Settings > Script Properties**.
2. Add property `ANALYTICS_API_KEY` with the same value used in Vercel.

Without this key, the `daily_analytics` / `weekly_analytics` / `dashboard_data` endpoints remain open (matching the previous `stats` endpoint behavior) — setting the key is recommended before going to production so visitor/lead data isn't publicly readable by anyone with the script URL.

---

## 5. Enable Daily & Weekly Email Reports (WO-115)

1. In the Apps Script editor, select the `setupTriggers` function from the function dropdown and click **Run** once. This installs:
   - `sendDailyTrafficReport` — runs daily at 08:00 (script timezone).
   - `sendWeeklyTrafficReport` — runs every Monday at 08:00.
2. Authorize the additional `MailApp`/trigger permissions if prompted.
3. You can verify installation under **Triggers** (clock icon) in the Apps Script editor.
4. To test immediately without waiting for the schedule, select `sendDailyTrafficReport` or `sendWeeklyTrafficReport` from the function dropdown and click **Run** — check `MAILING_LOG` and your inbox.
5. The live Analytics Dashboard (`/analytics` route) reads the same aggregated data via `/api/analytics?action=dashboard_data`, which proxies to the Apps Script `dashboard_data` endpoint server-side (the shared key never reaches the browser).

---

## 6. Verification

1. Submit any consultation or contact form on the website.
2. Verify that:
   - A row is appended in `FORM_SUBMISSIONS` with a unique ID (e.g. `PV-FRM-20260910-4821`).
   - The verified email is logged in `LEADS`.
   - An email notification is dispatched to your configured team inbox.
   - A success entry is recorded in `MAILING_LOG`.
