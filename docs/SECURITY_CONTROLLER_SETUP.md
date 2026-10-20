# ProfitMachines Security Controller: Architecture & Vercel Setup Guide

## 1. Overview & Architecture

The **ProfitMachines Security Controller** (`api/_lib/security.ts`) is a centralized server-side security middleware designed for Vercel Serverless Functions. It establishes strict zero-trust boundary controls for all incoming traffic to ProfitMachines API endpoints.

```
Incoming Request
      │
      ▼
┌────────────────────────────────────────────────────────┐
│              Security Controller Middleware            │
│  - Method Whitelisting (OPTIONS, GET, POST)            │
│  - Timing-Safe Secret Validation (timingSafeEqual)     │
│  - Rate Limiting (In-Memory Sliding Window per IP)     │
│  - Spam / Honeypot Detection & Disposable Email Blocks │
│  - Jira Outbound Token Misuse Prevention               │
│  - Sanitized Security Audit Logging                    │
└────────────────────────────────────────────────────────┘
      │
      ├──────────────────────────────┬─────────────────────────────┐
      ▼                              ▼                             ▼
[Public Endpoints]           [Diagnostic GET]             [Private Automation / Admin]
- /api/jira-lead             - /api/reports/trigger (GET)  - /api/reports/trigger (POST)
- /api/analytics             - /api/youtube-sync (GET)     - /api/process-report (POST)
- /api/track-visitor (POST)  - /api/linkedin-publish (GET) - /api/youtube-sync (POST)
- /api/calendar (book/avail) - /api/linkedin-analytics(GET)- /api/youtube-publish (POST)
- /api/chat                  - /api/email-templates (GET)  - /api/linkedin-publish (POST)
- /api/notify-lead                                         - /api/linkedin-analytics (POST)
                                                           - /api/linkedin-leads (sync/qualify)
                                                           - /api/calendar (cancel)
                                                           - /api/track-visitor (GET list)
                                                           - /api/email-templates (test-eight/send)
```

---

## 2. Inbound vs. Outbound Jira Authentication (Strict Separation)

| Token Type | Variable Name | Direction | Purpose | Storage |
| :--- | :--- | :--- | :--- | :--- |
| **Incoming API Secret** | `API_SECURITY_SECRET` | Inbound (Caller &rarr; Vercel) | Authenticates incoming requests from Jira Scheduler, Webhooks, and Admin Studio to your private endpoints. | Vercel Environment Variables only. Never exposed in client bundles. |
| **Outbound Jira Token** | `JIRA_API_TOKEN` | Outbound (Vercel &rarr; Jira Cloud) | Used by backend code (`Basic <email>:<JIRA_API_TOKEN>`) to create tasks, subtasks, and search issues in Jira Cloud (`trustworkz.atlassian.net`). | Vercel Environment Variables only. |

> [!CAUTION]
> **Separation Enforced**: The Security Controller actively detects and rejects any incoming request attempting to use `JIRA_API_TOKEN` as the API security key. An incoming attempt returns HTTP `401 Unauthorized` with code `JIRA_TOKEN_SEPARATION_VIOLATION`.

---

## 3. Intended Meanings of `JIRA_SECURITY_CONTROLLER` and `JIRA_AUTOMATION_CONTROLLER`

- `JIRA_SECURITY_CONTROLLER`: An informational identifier indicating the security specification version active on the endpoint (e.g. `JSC` for **J**ira **S**ecurity **C**ontroller). Can be sent as a header `X-Jira-Security-Controller: JSC` or set in environment variables for audit tracing.
- `JIRA_AUTOMATION_CONTROLLER`: An audit telemetry identifier indicating the calling Jira Automation rule or scheduler module (e.g. `JAC` for **J**ira **A**utomation **C**ontroller). Can be sent as a header `X-Jira-Automation-Controller: JAC`.
- **CRITICAL**: Neither identifier implements authentication by itself. They are metadata/routing headers and are **never** accepted as substitutes for `API_SECURITY_SECRET`.

---

## 4. Environment Variables to Configure in Vercel

In **Vercel Dashboard &rarr; Project Settings &rarr; Environment Variables**, add:

```env
# 1. Primary High-Entropy API Security Secret (REQUIRED)
API_SECURITY_SECRET=398c9e31a74565babbd5bbf9feebaf827010e345f7adfbffbdd445e41e2d5e5c

# 2. Aliased Security Secret for Backward-Compatibility (RECOMMENDED)
SECURITY_CONTROLLER_SECRET=398c9e31a74565babbd5bbf9feebaf827010e345f7adfbffbdd445e41e2d5e5c

# 3. Informational Routing Identifiers (3-Letter Codes) (OPTIONAL)
JIRA_SECURITY_CONTROLLER=JSC
JIRA_AUTOMATION_CONTROLLER=JAC

# 4. Outbound Jira Cloud Credentials (EXISTING - DO NOT ALTER)
JIRA_HOST=trustworkz.atlassian.net
JIRA_EMAIL=asmitha.int2027g3@gmail.com
JIRA_API_TOKEN=your_atlassian_api_token_here
JIRA_PROJECT_KEY=PROF
```

To generate a new 32-byte high-entropy secret at any time:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# OR
openssl rand -hex 32
```

---

## 5. How the Existing Jira Scheduler Must Authenticate

When your existing Jira Automation rule fires (e.g. on a recurring schedule or issue transition) to trigger performance reports or synchronization, configure its **Send web request** action as follows:

### Web Request Action in Jira Automation

1. **Web request URL**:
   ```
   https://profit-machines-1.vercel.app/api/reports/trigger
   ```
   *(Or for the unified interval pipeline: `https://profit-machines-1.vercel.app/api/process-report`)*

2. **HTTP method**: `POST`

3. **Web request headers**:
   - `Authorization`: `Bearer <API_SECURITY_SECRET>`
     *(Replace `<API_SECURITY_SECRET>` with your configured high-entropy secret)*
   - `Content-Type`: `application/json`
   - `X-Jira-Security-Controller`: `JSC`
   - `X-Jira-Automation-Controller`: `JAC`

4. **Web request body**:
   - Choose: **Custom data**
   - Content:
     ```json
     {
       "reportId": "jira-daily-scheduler",
       "period": "daily",
       "reportName": "ProfitMachines Daily Performance Report",
       "recipients": ["asmitha.int2027g3@gmail.com"],
       "force": false
     }
     ```

5. **Wait for response**: Checked (optional, allows checking status code `200`).

---

## 6. Protected vs. Public API Endpoints Matrix

| Route | HTTP Methods | Type | Auth Required | Protection Features |
| :--- | :--- | :--- | :--- | :--- |
| `/api/reports/trigger` | `GET` | Diagnostic | No | Safe health check, schema info |
| `/api/reports/trigger` | `POST` | Private Automation | **Yes** (`API_SECURITY_SECRET`) | Bearer token, timing-safe, rate-limited |
| `/api/process-report` | `GET` | Diagnostic | No | Safe pipeline status |
| `/api/process-report` | `POST` | Private Automation | **Yes** (`API_SECURITY_SECRET`) | Token auth, interval routing, deduplication |
| `/api/jira-lead` | `POST` | Public Form | No (Public) | Honeypot trap, disposable email block, rate limit |
| `/api/notify-lead` | `POST` | Public Form Alert | No (Public) | Honeypot trap, email validation, rate limit |
| `/api/submit` / `/api/analytics` | `POST` | Public Telemetry | No (Public) | Payload size guard (250KB), rate limit (90/min) |
| `/api/analytics?action=...` | `GET` | Public Analytics | No (Public) | Whitelisted actions only, key proxy |
| `/api/track-visitor` | `POST` | Public Tracker | No (Public) | Rate-limited (60/min), payload capped (20KB) |
| `/api/track-visitor?action=geo`| `GET` | Public Geo | No (Public) | Rate-limited (60/min) |
| `/api/track-visitor` (list) | `GET` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | Full visitor PII database protected |
| `/api/calendar?action=availability` | `GET` | Public Calendar | No (Public) | Rate-limited (60/min) |
| `/api/calendar?action=book` | `POST` | Public Booking | No (Public) | Honeypot trap, email validation, rate limit |
| `/api/calendar?action=cancel` | `POST` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | Privileged cancellation guard |
| `/api/youtube-sync` | `GET` | Diagnostic | No | Safe diagnostic overview |
| `/api/youtube-sync` | `POST` / Cron `GET` | Private Automation | **Yes** (`API_SECURITY_SECRET`) | Bearer token auth, deduplication |
| `/api/youtube-sync?action=video-lead` | `POST` | Public Form | No (Public) | Video lead submission honeypot & rate limit |
| `/api/youtube-publish` | `POST` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | Content upload authorization |
| `/api/linkedin-publish` | `POST` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | Post creation authorization |
| `/api/linkedin-analytics` | `POST` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | Engagement sync authorization |
| `/api/linkedin-leads` (sync/qualify/reject) | `POST` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | CRM qualification authorization |
| `/api/email-templates` (test-eight/send) | `POST` | Private Admin | **Yes** (`API_SECURITY_SECRET`) | Mass test email dispatch authorization |
| `/api/chat` | `POST` | Public Chatbot | No (Public) | Rate-limited (30/min), 1500 char length cap |

---

## 7. Verification & Testing

Run the test suite locally:
```bash
npm test
```
The test suite validates:
- Missing credentials &rarr; `401 Unauthorized` (`CREDENTIALS_MISSING`)
- Invalid credentials &rarr; `401 Unauthorized` (`INVALID_CREDENTIALS`)
- Outbound Jira API Token misuse &rarr; `401 Unauthorized` (`JIRA_TOKEN_SEPARATION_VIOLATION`)
- Disallowed HTTP methods &rarr; `405 Method Not Allowed` with `Allow` header
- Honeypot spam submission &rarr; `400 Bad Request` (`VALIDATION_FAILED`)
- Disposable email provider &rarr; `400 Bad Request` (`DISPOSABLE_EMAIL_PROHIBITED`)
- Valid requests &rarr; `200 OK`
