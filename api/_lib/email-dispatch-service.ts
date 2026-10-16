import nodemailer from 'nodemailer';

export interface EmailSendOptions {
  to: string[];
  subject: string;
  html: string;
  text: string;
}

export interface EmailSendResult {
  sent: boolean;
  provider: 'SMTP_GMAIL' | 'RESEND' | 'GOOGLE_APPS_SCRIPT';
  messageId?: string;
  recipients: string[];
  error?: string;
  note?: string;
}

const RESEND_API_KEY = (process.env.RESEND_API_KEY || '').trim();
const SMTP_USER = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.JIRA_EMAIL || 'asmitha.int2027g3@gmail.com').trim();
const SMTP_PASS = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '').trim();
const FROM_EMAIL = (process.env.FROM_EMAIL || 'ProfitMachines Intelligence <noreply@profitmachines.com>').trim();
const GOOGLE_SCRIPT_URL = (
  process.env.GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxnpkQyIM_BYBc9mdR8SskAbzb74v8idiwUMbzLuqKlCGRExzNkwRLloL63KQ-uhRqCYA/exec'
).trim();

export class EmailDispatchService {
  /**
   * Dispatches email via verified available channel:
   * 1. Nodemailer SMTP (if SMTP_PASS / GMAIL_APP_PASSWORD provided)
   * 2. Resend API (if RESEND_API_KEY starts with re_)
   * 3. Google Apps Script Webhook (native server-side trigger with HTML payload and recipient routing)
   */
  public static async dispatch(options: EmailSendOptions): Promise<EmailSendResult> {
    const recipients = options.to;

    // 1. Try Nodemailer with Gmail SMTP if password is configured
    if (SMTP_PASS && SMTP_USER) {
      try {
        console.log(`[EmailDispatchService] Attempting dispatch via Nodemailer SMTP (${SMTP_USER})...`);
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const info = await transporter.sendMail({
          from: FROM_EMAIL.includes('<') ? FROM_EMAIL : `ProfitMachines Intelligence <${SMTP_USER}>`,
          to: recipients,
          subject: options.subject,
          text: options.text,
          html: options.html,
        });

        console.log(`[EmailDispatchService] Sent via Nodemailer SMTP. MessageId: ${info.messageId}`);
        return {
          sent: true,
          provider: 'SMTP_GMAIL',
          messageId: info.messageId,
          recipients,
          note: `Accepted by Gmail SMTP for delivery to ${recipients.join(', ')}`,
        };
      } catch (smtpErr: any) {
        console.warn('[EmailDispatchService] Nodemailer SMTP dispatch failed:', smtpErr?.message || smtpErr);
      }
    }

    // 2. Try Resend if API key is present and valid
    if (RESEND_API_KEY.startsWith('re_')) {
      try {
        console.log(`[EmailDispatchService] Attempting dispatch via Resend API...`);
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ProfitMachines Reports <onboarding@resend.dev>',
            to: recipients,
            subject: options.subject,
            html: options.html,
            text: options.text,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.id) {
          console.log(`[EmailDispatchService] Sent via Resend. ID: ${data.id}`);
          return {
            sent: true,
            provider: 'RESEND',
            messageId: data.id,
            recipients,
            note: `Accepted by Resend API for delivery to ${recipients.join(', ')}`,
          };
        }
        console.warn('[EmailDispatchService] Resend returned non-200:', data);
      } catch (resendErr: any) {
        console.warn('[EmailDispatchService] Resend API dispatch failed:', resendErr?.message || resendErr);
      }
    }

    // 3. Fallback to Google Apps Script Webhook (Sheet 1 Automation Engine)
    try {
      console.log(`[EmailDispatchService] Dispatching via Google Apps Script Webhook...`);
      const scriptRes = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_reports',
          subject: options.subject,
          html_body: options.html,
          text_body: options.text,
          recipients: recipients,
          source: 'profitmachines_vercel_reporting_api',
        }),
      });

      const scriptJson = await scriptRes.json().catch(() => ({}));
      if (scriptRes.ok && scriptJson.status !== 'error') {
        return {
          sent: true,
          provider: 'GOOGLE_APPS_SCRIPT',
          messageId: `gas-${Date.now()}`,
          recipients,
          note: `Dispatched to Google Apps Script Webhook (Gmail Engine) for ${recipients.join(', ')}`,
        };
      }
      return {
        sent: false,
        provider: 'GOOGLE_APPS_SCRIPT',
        recipients,
        error: scriptJson.message || `Apps Script returned HTTP ${scriptRes.status}`,
      };
    } catch (gasErr: any) {
      console.error('[EmailDispatchService] Apps Script dispatch error:', gasErr);
      return {
        sent: false,
        provider: 'GOOGLE_APPS_SCRIPT',
        recipients,
        error: gasErr?.message || String(gasErr),
      };
    }
  }
}
