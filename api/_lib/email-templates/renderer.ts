/**
 * api/_lib/email-templates/renderer.ts
 *
 * Renders executive, responsive HTML emails with verified inline styling
 * compatible with Gmail, Apple Mail, Outlook, and mobile devices.
 * Also generates a clean plain-text fallback.
 */

import type { EmailTemplateConfig, EmailPersonalization, GeneratedEmailContent } from './types';

const SITE_URL = 'https://profit-machines-1.vercel.app';

export class EmailTemplateRenderer {
  public static escape(text: unknown): string {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  public static personalizeText(text: string, p?: EmailPersonalization): string {
    if (!p) return text;
    let res = text;
    res = res.replace(/\{\{\s*name\s*\}\}/gi, p.recipientName || 'there');
    res = res.replace(/\{\{\s*company\s*\}\}/gi, p.companyName || 'your organization');
    res = res.replace(/\{\{\s*title\s*\}\}/gi, p.jobTitle || 'Executive');
    res = res.replace(/\{\{\s*industry\s*\}\}/gi, p.industry || 'Enterprise');
    return res;
  }

  public static resolveImageUrl(imgPath: string): string {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    const clean = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
    return `${SITE_URL}${clean}`;
  }

  public static renderHtml(
    template: EmailTemplateConfig,
    personalization?: EmailPersonalization,
    aiContent?: GeneratedEmailContent
  ): string {
    const esc = EmailTemplateRenderer.escape;
    const per = (t: string) => EmailTemplateRenderer.personalizeText(t, personalization);

    const headline = esc(per(aiContent?.headline || template.headline));
    const introduction = esc(per(aiContent?.introduction || template.introduction));
    const preheader = esc(per(aiContent?.preheader || template.preheader));
    const heroImgUrl = EmailTemplateRenderer.resolveImageUrl(template.heroImage);
    const sections = aiContent?.sections || template.sections;
    const ctaLabel = esc(aiContent?.ctaLabel || template.primaryCta.label);
    const ctaUrl = template.primaryCta.url.startsWith('http')
      ? template.primaryCta.url
      : `${SITE_URL}${template.primaryCta.url.startsWith('/') ? '' : '/'}${template.primaryCta.url}`;

    // Render content sections
    const sectionsHtml = sections
      .map(s => {
        const sHeading = esc(per(s.heading));
        const sBody = esc(per(s.body));
        let bulletsHtml = '';
        if (s.bulletPoints && s.bulletPoints.length > 0) {
          bulletsHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 14px 0 6px 0;">
              ${s.bulletPoints
                .map(
                  b => `
                <tr>
                  <td width="20" valign="top" style="padding-top: 4px; padding-bottom: 8px;">
                    <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #2878b5;"></span>
                  </td>
                  <td valign="top" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px; color: #334155; padding-bottom: 8px;">
                    ${esc(per(b))}
                  </td>
                </tr>
              `
                )
                .join('')}
            </table>
          `;
        }

        let calloutHtml = '';
        if (s.calloutBox) {
          calloutHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0; background-color: #f0f7fc; border-left: 4px solid #2878b5; border-radius: 0 8px 8px 0;">
              <tr>
                <td style="padding: 14px 18px;">
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #1e6297; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${esc(per(s.calloutBox.title))}
                  </div>
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #0f172a; line-height: 20px; margin-top: 4px;">
                    ${esc(per(s.calloutBox.text))}
                  </div>
                  ${
                    s.calloutBox.metric
                      ? `
                    <div style="margin-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 800; color: #2878b5;">
                      ${esc(per(s.calloutBox.metric))}
                    </div>
                  `
                      : ''
                  }
                </td>
              </tr>
            </table>
          `;
        }

        return `
          <div style="margin-bottom: 24px;">
            <h3 style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 17px; font-weight: 700; color: #0a2540; letter-spacing: -0.2px;">
              ${sHeading}
            </h3>
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 23px; color: #475569;">
              ${sBody}
            </p>
            ${bulletsHtml}
            ${calloutHtml}
          </div>
        `;
      })
      .join('');

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <title>${esc(template.name)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <!-- Preheader preview text (hidden) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(10, 37, 64, 0.05);">
          
          <!-- Top Brand Header -->
          <tr>
            <td style="background-color: #0a2540; padding: 20px 32px; border-bottom: 3px solid #2878b5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                      PROFIT<span style="color: #60b5ff;">MACHINES</span>
                    </span>
                    <span style="display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
                      Enterprise Autonomous Revenue Systems
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 100px; background-color: rgba(40, 120, 181, 0.25); border: 1px solid rgba(96, 181, 255, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 700; color: #60b5ff; text-transform: uppercase; letter-spacing: 0.5px;">
                      ${esc(template.industryLabel)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image Banner -->
          <tr>
            <td style="padding: 0; background-color: #071526;">
              <img src="${heroImgUrl}" alt="${esc(template.heroImageAlt)}" width="600" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0; max-height: 260px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <!-- Eyebrow label -->
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #2878b5; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                ${esc(template.engagementLabel)}
              </div>

              <!-- Main Headline -->
              <h1 style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 800; color: #0a2540; line-height: 31px; letter-spacing: -0.5px;">
                ${headline}
              </h1>

              <!-- Introduction -->
              <p style="margin: 0 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 24px; color: #334155;">
                ${introduction}
              </p>

              <!-- Divider -->
              <div style="height: 1px; background-color: #e2e8f0; margin-bottom: 24px;"></div>

              <!-- Structured Content Sections -->
              ${sectionsHtml}

              <!-- Primary CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0 20px 0;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; background-color: #2878b5; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 10px rgba(40, 120, 181, 0.35);">
                      ${ctaLabel} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Closing Signoff -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #64748b;">
                  ${esc(template.closing.signoff)},
                </p>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; color: #0a2540;">
                  ${esc(template.closing.senderName)}
                </div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #64748b;">
                  ${esc(template.closing.senderTitle)} · ${esc(template.closing.senderCompany)}
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #64748b; line-height: 18px;">
                You are receiving this communication regarding enterprise autonomous revenue solutions and strategic transformation from ProfitMachines.
              </p>
              <p style="margin: 0 0 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8;">
                ProfitMachines AI · 100 Montgomery St, Suite 1900, San Francisco, CA · 
                <a href="${SITE_URL}/privacy" style="color: #2878b5; text-decoration: underline;">Privacy Policy</a> · 
                <a href="${SITE_URL}/terms" style="color: #2878b5; text-decoration: underline;">Terms of Service</a>
              </p>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8;">
                To adjust your email preferences or opt out, please reply with "Unsubscribe" or visit our <a href="${SITE_URL}/unsubscribe" style="color: #2878b5; text-decoration: underline;">Preference Center</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  public static renderPlainText(
    template: EmailTemplateConfig,
    personalization?: EmailPersonalization,
    aiContent?: GeneratedEmailContent
  ): string {
    const per = (t: string) => EmailTemplateRenderer.personalizeText(t, personalization);
    const headline = per(aiContent?.headline || template.headline);
    const intro = per(aiContent?.introduction || template.introduction);
    const sections = aiContent?.sections || template.sections;
    const ctaLabel = aiContent?.ctaLabel || template.primaryCta.label;
    const ctaUrl = template.primaryCta.url.startsWith('http')
      ? template.primaryCta.url
      : `${SITE_URL}${template.primaryCta.url.startsWith('/') ? '' : '/'}${template.primaryCta.url}`;

    let out = `====================================================\n`;
    out += `PROFITMACHINES — ${template.industryLabel.toUpperCase()}\n`;
    out += `====================================================\n\n`;
    out += `${headline}\n\n`;
    out += `${intro}\n\n`;
    out += `----------------------------------------------------\n\n`;

    sections.forEach(s => {
      out += `${per(s.heading)}\n`;
      out += `${per(s.body)}\n`;
      if (s.bulletPoints && s.bulletPoints.length > 0) {
        s.bulletPoints.forEach(b => {
          out += `  • ${per(b)}\n`;
        });
      }
      if (s.calloutBox) {
        out += `  [${per(s.calloutBox.title)}]: ${per(s.calloutBox.text)}`;
        if (s.calloutBox.metric) out += ` (${per(s.calloutBox.metric)})`;
        out += `\n`;
      }
      out += `\n`;
    });

    out += `----------------------------------------------------\n`;
    out += `${ctaLabel}: ${ctaUrl}\n\n`;
    out += `${template.closing.signoff},\n`;
    out += `${template.closing.senderName}\n`;
    out += `${template.closing.senderTitle} · ${template.closing.senderCompany}\n\n`;
    out += `Unsubscribe: ${SITE_URL}/unsubscribe\n`;
    out += `Privacy Policy: ${SITE_URL}/privacy\n`;

    return out;
  }
}
