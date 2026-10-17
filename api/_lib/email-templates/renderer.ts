/**
 * api/_lib/email-templates/renderer.ts
 *
 * Professional, Executive HTML & Plain-Text Email Renderer for ProfitMachines:
 * - Enterprise Emerald-Green Brand Visuals (#059669)
 * - True Responsive Table Layout with Microsoft Outlook & Mobile Client Safety
 * - Industry-specific verified 2.5:1 Hero Images with Alt text and loading fallbacks
 * - Verified Navigation Links, Telephone Links (tel:), and Mailto links
 * - Compliant, transparent footer with Opt-Out & Privacy Policy links
 * - Clean plain-text fallback mirroring all content and verified links
 */

import type { EmailTemplateConfig, EmailPersonalization, GeneratedEmailContent } from './types';
import { BUSINESS_CONFIG, INDUSTRY_IMAGE_MAP, getVerifiedDestinationUrl } from './config';

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
    return `${BUSINESS_CONFIG.siteUrl}${clean}`;
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

    // Resolve Industry Hero Image from central map or template
    const imgInfo = INDUSTRY_IMAGE_MAP[template.industry] || {
      url: template.heroImage,
      alt: template.heroImageAlt,
    };
    const heroImgUrl = EmailTemplateRenderer.resolveImageUrl(imgInfo.url);
    const heroImgAlt = esc(imgInfo.alt || template.heroImageAlt);

    const sections = aiContent?.sections || template.sections;
    const ctaLabel = esc(aiContent?.ctaLabel || template.primaryCta.label);

    // Verified Destination URL
    const rawCtaUrl = template.primaryCta.url || getVerifiedDestinationUrl(template.industry, template.engagementType);
    const ctaUrl = rawCtaUrl.startsWith('http')
      ? rawCtaUrl
      : `${BUSINESS_CONFIG.siteUrl}${rawCtaUrl.startsWith('/') ? '' : '/'}${rawCtaUrl}`;

    // Emerald theme colors
    const emeraldPrimary = BUSINESS_CONFIG.colors.primaryEmerald;
    const emeraldDark = BUSINESS_CONFIG.colors.primaryEmeraldDark;
    const darkNavy = BUSINESS_CONFIG.colors.darkNavy;

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
                  <td width="22" valign="top" style="padding-top: 5px; padding-bottom: 8px;">
                    <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background-color: ${emeraldPrimary};"></span>
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
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0; background-color: #ecfdf5; border-left: 4px solid ${emeraldPrimary}; border-radius: 0 8px 8px 0;">
              <tr>
                <td style="padding: 14px 18px;">
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">
                    ${esc(per(s.calloutBox.title))}
                  </div>
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #0f172a; line-height: 20px; margin-top: 4px;">
                    ${esc(per(s.calloutBox.text))}
                  </div>
                  ${
                    s.calloutBox.metric
                      ? `
                    <div style="margin-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 800; color: #059669;">
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
            <h3 style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 17px; font-weight: 700; color: ${darkNavy}; letter-spacing: -0.2px;">
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
  <div style="display: none; max-height: 0px; overflow: hidden; mso-hide: all;">
    ${preheader}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.06);">
          
          <!-- Top Brand Header (Dark Navy + Emerald Border) -->
          <tr>
            <td style="background-color: #0a2540; padding: 20px 32px; border-bottom: 3px solid ${emeraldPrimary};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                      PROFIT<span style="color: #34d399;">MACHINES</span>
                    </span>
                    <span style="display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
                      ${esc(BUSINESS_CONFIG.brandTagline)}
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 12px; border-radius: 100px; background-color: rgba(5, 150, 105, 0.2); border: 1px solid rgba(52, 211, 153, 0.4); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 700; color: #34d399; text-transform: uppercase; letter-spacing: 0.5px;">
                      ${esc(template.industryLabel)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image Banner (Verified 2.5:1 Aspect Ratio) -->
          <tr>
            <td style="padding: 0; background-color: #064e3b; text-align: center;">
              <img src="${heroImgUrl}" alt="${heroImgAlt}" width="600" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0; max-height: 240px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <!-- Eyebrow label -->
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: ${emeraldPrimary}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                ${esc(template.engagementLabel)}
              </div>

              <!-- Main Headline -->
              <h1 style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 23px; font-weight: 800; color: ${darkNavy}; line-height: 30px; letter-spacing: -0.5px;">
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

              <!-- Primary Emerald CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0 22px 0;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; background-color: ${emeraldPrimary}; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.35);">
                      ${ctaLabel} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Professional Closing Signoff -->
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0 0 4px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; color: #64748b;">
                  ${esc(template.closing.signoff)},
                </p>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; color: ${darkNavy};">
                  ${esc(template.closing.senderName)}
                </div>
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #64748b;">
                  ${esc(template.closing.senderTitle)} · ${esc(template.closing.senderCompany)}
                </div>
              </div>

            </td>
          </tr>

          <!-- Detailed, Compliant Executive Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 28px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              
              <!-- Direct Contact Details (Phone & Email) -->
              <div style="margin-bottom: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #334155;">
                <span style="font-weight: 700; color: #0a2540;">Contact Team:</span>
                &nbsp;
                <a href="tel:${BUSINESS_CONFIG.phone}" style="color: ${emeraldPrimary}; text-decoration: none; font-weight: 600;">+91 ${BUSINESS_CONFIG.phone}</a>
                &nbsp;·&nbsp;
                <a href="mailto:${BUSINESS_CONFIG.contactEmail}" style="color: ${emeraldPrimary}; text-decoration: none; font-weight: 600;">${BUSINESS_CONFIG.contactEmail}</a>
              </div>

              <!-- Verified Website Navigation Links -->
              <div style="margin-bottom: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #64748b;">
                <a href="${BUSINESS_CONFIG.siteUrl}" style="color: #64748b; text-decoration: none; margin: 0 6px;">Home</a> ·
                <a href="${BUSINESS_CONFIG.siteUrl}/solutions" style="color: #64748b; text-decoration: none; margin: 0 6px;">Solutions</a> ·
                <a href="${BUSINESS_CONFIG.siteUrl}/industries" style="color: #64748b; text-decoration: none; margin: 0 6px;">Industries</a> ·
                <a href="${BUSINESS_CONFIG.siteUrl}/offerings" style="color: #64748b; text-decoration: none; margin: 0 6px;">Offerings</a> ·
                <a href="${BUSINESS_CONFIG.siteUrl}/resources" style="color: #64748b; text-decoration: none; margin: 0 6px;">Resources</a> ·
                <a href="${BUSINESS_CONFIG.siteUrl}/book-consultation" style="color: ${emeraldPrimary}; text-decoration: none; font-weight: 600; margin: 0 6px;">Book Consultation</a>
              </div>

              <!-- Context & Compliance Notice -->
              <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8; line-height: 16px;">
                You are receiving this communication regarding autonomous enterprise revenue systems, market intelligence, and strategic operations from ProfitMachines.
              </p>

              <!-- Legal & Privacy Policy -->
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} ProfitMachines. All rights reserved. &nbsp;·&nbsp; 
                <a href="${BUSINESS_CONFIG.siteUrl}/privacy" style="color: ${emeraldPrimary}; text-decoration: underline;">Privacy Policy</a> &nbsp;·&nbsp; 
                <a href="${BUSINESS_CONFIG.siteUrl}/terms" style="color: ${emeraldPrimary}; text-decoration: underline;">Terms of Service</a> &nbsp;·&nbsp; 
                <a href="mailto:${BUSINESS_CONFIG.contactEmail}?subject=Unsubscribe%20Request" style="color: #94a3b8; text-decoration: underline;">Unsubscribe</a>
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

    const rawCtaUrl = template.primaryCta.url || getVerifiedDestinationUrl(template.industry, template.engagementType);
    const ctaUrl = rawCtaUrl.startsWith('http')
      ? rawCtaUrl
      : `${BUSINESS_CONFIG.siteUrl}${rawCtaUrl.startsWith('/') ? '' : '/'}${rawCtaUrl}`;

    let out = `====================================================\n`;
    out += `PROFITMACHINES — ${template.industryLabel.toUpperCase()}\n`;
    out += `Autonomous Revenue Infrastructure\n`;
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
    out += `Contact: +91 ${BUSINESS_CONFIG.phone} | ${BUSINESS_CONFIG.contactEmail}\n`;
    out += `Website: ${BUSINESS_CONFIG.siteUrl}\n`;
    out += `Privacy Policy: ${BUSINESS_CONFIG.siteUrl}/privacy\n`;
    out += `To unsubscribe, reply directly with "Unsubscribe" or contact ${BUSINESS_CONFIG.contactEmail}\n`;

    return out;
  }
}
