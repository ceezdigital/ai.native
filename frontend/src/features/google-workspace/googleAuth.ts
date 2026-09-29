import { google } from "googleapis";
import { env } from "@/lib/env";

// Using Domain-Wide Delegation with a Service Account impersonating a Workspace user
export function getGoogleAuthClient() {
  const credentials = JSON.parse(env.googleServiceAccountJson);
  
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/drive"
    ],
    subject: env.googleImpersonateEmail,
  });

  return auth;
}
