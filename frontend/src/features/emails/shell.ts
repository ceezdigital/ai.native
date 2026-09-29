import { EMAIL_COLORS, EMAIL_FONT_BODY, EMAIL_FONT_DISPLAY, EMAIL_FOOTER_TEXT, EMAIL_LOGO_URL } from "./constants";

export type EmailShellOptions = {
  /** Hidden preview text shown next to the subject line in the inbox list. */
  preheaderText: string;
  eyebrow: string;
  heading: string;
  /** Pre-built paragraph HTML for the body — already inline-styled by the caller. */
  bodyHtml: string;
  ctaLabel?: string;
  ctaHref?: string;
};

// Table-based, fully inline-styled — the only layout approach that renders
// consistently across Outlook desktop, Gmail, and mobile mail clients.
// Flexbox/grid and external <style> rules are unreliable in email.
export function renderEmailShell(options: EmailShellOptions): string {
  const c = EMAIL_COLORS;

  const ctaBlock =
    options.ctaLabel && options.ctaHref
      ? `
        <tr>
          <td align="center" style="padding: 8px 0 4px;">
            <a href="${options.ctaHref}" style="display:inline-block; background-color:${c.accent}; color:#0a0500; font-family:${EMAIL_FONT_DISPLAY}; font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase; text-decoration:none; padding:16px 32px; border-radius:999px;">
              ${options.ctaLabel}
            </a>
          </td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${options.heading}</title>
</head>
<body style="margin:0; padding:0; background-color:${c.bg};">
  <div style="display:none; max-height:0; overflow:hidden; font-size:1px; line-height:1px; color:${c.bg};">
    ${options.preheaderText}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${c.bg};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%;">

          <tr>
            <td align="center" style="padding: 8px 0 28px;">
              <img src="${EMAIL_LOGO_URL}" width="120" alt="Ai-Nativ" style="display:block; border:0; outline:none; text-decoration:none; width:120px; height:auto;" />
            </td>
          </tr>

          <tr>
            <td style="background-color:${c.card}; border:1px solid ${c.cardBorder}; border-radius:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 40px 36px 8px;">
                    <div style="font-family:${EMAIL_FONT_DISPLAY}; font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:${c.accent};">
                      ${options.eyebrow}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 36px 20px;">
                    <div style="font-family:${EMAIL_FONT_DISPLAY}; font-size:26px; font-weight:700; letter-spacing:-0.01em; line-height:1.2; color:${c.ink};">
                      ${options.heading}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 36px 28px; font-family:${EMAIL_FONT_BODY}; font-size:15px; line-height:1.7; color:${c.inkDim};">
                    ${options.bodyHtml}
                  </td>
                </tr>
                ${ctaBlock}
                <tr><td style="padding: 12px 36px 36px;"></td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 28px 16px 8px; font-family:${EMAIL_FONT_BODY}; font-size:12px; color:${c.inkFaint};">
              ${EMAIL_FOOTER_TEXT}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
