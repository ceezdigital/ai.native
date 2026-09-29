import { google } from "googleapis";
import { env } from "@/lib/env";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/calendar",
];

// One service account, impersonating the owner's Workspace account via
// domain-wide delegation — see SYSTEM_DESIGN.md's "Requires" callout: this
// only works once the owner (as a Workspace admin) grants delegation for
// this service account's client ID in the Admin Console.
// 
// Note: Temporarily changed to standard OAuth2 Refresh Token for testing!
export function getGoogleAuthClient() {
  const auth = new google.auth.OAuth2(
    env.googleOauthClientId,
    env.googleOauthClientSecret
  );

  auth.setCredentials({
    refresh_token: env.googleOauthRefreshToken,
  });

  return auth;
}
