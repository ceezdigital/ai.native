// Email clients can't read the site's CSS custom properties, so these are
// the same brand tokens from globals.css, copied as literal hex — Outlook
// and most mobile mail apps don't resolve var() at all.
export const EMAIL_LOGO_URL = "https://raw.githubusercontent.com/ceezdigital/images/main/ainativ%20logo.jpeg";

export const EMAIL_COLORS = {
  bg: "#000000",
  card: "#0f0f0f",
  cardBorder: "#242424",
  ink: "#eef2fb",
  inkDim: "#a7b2cc",
  inkFaint: "#68738f",
  accent: "#dd6b35",
  accentDeep: "#a8481f",
  gold: "#c9a24b",
  divider: "#262626",
} as const;

// Space Grotesk / Inter render in mail clients that support web fonts
// (Gmail web/app, Apple Mail); Arial/Helvetica is the fallback everywhere
// else (notably Outlook desktop, which ignores @import entirely).
export const EMAIL_FONT_DISPLAY = "'Space Grotesk', Arial, Helvetica, sans-serif";
export const EMAIL_FONT_BODY = "'Inter', 'Helvetica Neue', Arial, sans-serif";

export const EMAIL_FOOTER_TEXT = "Ai-Nativ · Nairobi, Kenya";
