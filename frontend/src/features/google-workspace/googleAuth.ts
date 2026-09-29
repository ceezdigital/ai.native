import { google } from "googleapis";
import { env } from "@/lib/env";

// Plain OAuth2 (a personal Google account's refresh token) — this is the
// testing-phase auth path, chosen so Sheets/Gmail/Calendar could be
// exercised without a paid Google Workspace subscription. Before handing
// this off to the real owner, decide whether to switch to domain-wide
// delegation (a service account impersonating his real Workspace account —
// see SYSTEM_DESIGN.md's "Requires" callout) or keep OAuth2 permanently.
export function getGoogleAuthClient() {
  const auth = new google.auth.OAuth2(env.googleOauthClientId, env.googleOauthClientSecret);

  auth.setCredentials({
    refresh_token: env.googleOauthRefreshToken,
  });

  return auth;
}
