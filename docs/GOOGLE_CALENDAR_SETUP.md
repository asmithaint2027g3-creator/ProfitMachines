# Google Calendar Integration Setup Guide

This guide walks you through setting up OAuth 2.0 credentials for the **Google Calendar consultation booking system** in ProfitMachines.

---

## Architecture Overview

1. **In-App Consultation Form & Slot Picker** (`src/app/pages/BookConsultation.tsx` & `CalendarBookingWidget.tsx`):
   - Visitors select a date and an available 45-minute consultation slot directly inside the application.
   - Visitors are never redirected away from the site.
   - Past dates, weekends, and slots within 24 hours notice are automatically disabled.

2. **Backend Availability Endpoint** (`api/calendar-availability.ts`):
   - Queries the owner's Google Calendar using the **FreeBusy API**.
   - Filters out slots where the owner already has an existing busy event.
   - Generates available candidate slots within working hours (09:00 - 18:00 in owner's timezone).

3. **Backend Booking Endpoint** (`api/book-calendar.ts`):
   - Validates all fields (name, email, phone, company, start/end time).
   - Re-queries FreeBusy to prevent double-booking race conditions.
   - Creates the Google Calendar event and sends calendar invites to the visitor and owner.
   - Records the booking in **Airtable CRM** (`Google Calendar Event ID`, date/time, status).
   - Creates a **Jira** lead task.
   - Records lead telemetry into **Google Sheets**.
   - Sends HTML confirmation emails to the visitor and owner via Resend.

---

## Step 1: Create or Open a Project in Google Cloud Console

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your existing project (e.g., the one used for YouTube or Sheets API) or create a new project named `ProfitMachines`.

---

## Step 2: Enable the Google Calendar API

1. Go to **APIs & Services** → **Library**.
2. Search for **Google Calendar API**.
3. Click on it and press **Enable**.

---

## Step 3: Configure the OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**.
2. Select **External** (or Internal if using Google Workspace for your organization) and click **Create**.
3. Fill in the required fields:
   - **App name**: `ProfitMachines Calendar`
   - **User support email**: your email (e.g., `asmitha.int2027g3@gmail.com`)
   - **Developer contact information**: your email
4. Under **Scopes**, click **Add or Remove Scopes**:
   - Add `https://www.googleapis.com/auth/calendar` (or `.../auth/calendar.events` and `.../auth/calendar.freebusy`).
5. Under **Test users**, add the Google email account of the calendar owner (e.g., `asmitha.int2027g3@gmail.com`).
6. Save and finish.

---

## Step 4: Create OAuth 2.0 Client Credentials

1. Go to **APIs & Services** → **Credentials**.
2. Click **Create Credentials** → **OAuth client ID**.
3. Under **Application type**, choose **Web application**.
4. Name: `ProfitMachines Web Client`.
5. Under **Authorized redirect URIs**, add:
   - `https://developers.google.com/oauthplayground` (used for generating your permanent refresh token)
   - `https://profitmachines.ai/api/auth/callback` (optional future direct OAuth flow)
   - `http://localhost:5173/` (local dev)
6. Click **Create**.
7. Copy the **Client ID** and **Client Secret**.

---

## Step 5: Generate the Owner Refresh Token via OAuth 2.0 Playground

1. Go to the [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
2. Click the ⚙️ **OAuth 2.0 configuration** gear icon in the top right:
   - Check **Use your own OAuth credentials**.
   - Enter your **OAuth Client ID** and **OAuth Client Secret** from Step 4.
3. In the left panel (Step 1: Select & authorize APIs):
   - Scroll down to **Google Calendar API v3**.
   - Select `https://www.googleapis.com/auth/calendar`.
4. Click **Authorize APIs**.
5. Log in with the owner's Google account and grant calendar permissions.
6. In Step 2 (Exchange authorization code for tokens):
   - Click **Exchange authorization code for tokens**.
7. Copy the **Refresh token** value.

---

## Step 6: Configure Environment Variables

### In Local `.env` File:
Add the following keys to your `.env` (or `.env.local`):

```bash
# Google Calendar Integration
GCAL_CLIENT_ID=your_client_id.apps.googleusercontent.com
GCAL_CLIENT_SECRET=your_client_secret
GCAL_REFRESH_TOKEN=your_refresh_token
GCAL_CALENDAR_ID=primary
GCAL_OWNER_EMAIL=asmitha.int2027g3@gmail.com
GCAL_OWNER_TIMEZONE=Asia/Kolkata
```

### In Vercel Project Settings:
1. Go to [Vercel Dashboard](https://vercel.com/) → Your ProfitMachines Project.
2. Go to **Settings** → **Environment Variables**.
3. Add the 6 variables:
   - `GCAL_CLIENT_ID`
   - `GCAL_CLIENT_SECRET`
   - `GCAL_REFRESH_TOKEN`
   - `GCAL_CALENDAR_ID` (value: `primary`)
   - `GCAL_OWNER_EMAIL` (e.g., `asmitha.int2027g3@gmail.com`)
   - `GCAL_OWNER_TIMEZONE` (value: `Asia/Kolkata` or your preferred IANA timezone)
4. Trigger a **Redeploy** so the production serverless functions load the new variables.

---

## Step 7: Testing the Booking Flow

1. Open `/book-consultation` (or `/book-demo`, `/talk-to-expert`).
2. Fill in the form fields:
   - First Name & Last Name
   - Business Email & Phone
   - Company & Job Title
   - Revenue & Strategic Interest
   - Architecture Notes
3. In the **Choose Your Consultation Slot** widget:
   - Select an available weekday date.
   - Choose a 45-minute time slot.
4. Click **Confirm Consultation Request**.
5. Verify:
   - A success confirmation modal displays the booking reference and confirmation details.
   - The event appears immediately in the owner's Google Calendar with all visitor and company notes.
   - The visitor receives a Google Calendar meeting invitation in their inbox.
   - The occupied slot disappears from future availability queries to prevent double-booking.
   - An Airtable record is created with the Google Calendar Event ID.
   - A Jira task is dispatched to track the consultation.
