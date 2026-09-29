function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Read lazily (not at module load) so a route that doesn't need a given
// integration doesn't crash the whole app when that var isn't set yet —
// e.g. Google Workspace creds can be added after Tally/Pesapal are live.
export const env = {
  get databaseUrl() {
    return required("DATABASE_URL");
  },
  get tallyWebhookSecret() {
    return required("TALLY_WEBHOOK_SECRET");
  },
  get pesapalConsumerKey() {
    return required("PESAPAL_CONSUMER_KEY");
  },
  get pesapalConsumerSecret() {
    return required("PESAPAL_CONSUMER_SECRET");
  },
  get pesapalIpnId() {
    return required("PESAPAL_IPN_ID");
  },
  get pesapalEnv() {
    return process.env.PESAPAL_ENV === "live" ? "live" : "sandbox";
  },
  get appUrl() {
    return required("APP_URL");
  },
  get googleServiceAccountJson() {
    return required("GOOGLE_SERVICE_ACCOUNT_JSON");
  },
  get googleImpersonateEmail() {
    return required("GOOGLE_IMPERSONATE_EMAIL");
  },
  get googleSheetsSpreadsheetId() {
    return required("GOOGLE_SHEETS_SPREADSHEET_ID");
  },
  get googleCalendarId() {
    return process.env.GOOGLE_CALENDAR_ID || "primary";
  },
  get cronSecret() {
    return required("CRON_SECRET");
  },
  get googleOauthClientId() {
    return required("GOOGLE_OAUTH_CLIENT_ID");
  },
  get googleOauthClientSecret() {
    return required("GOOGLE_OAUTH_CLIENT_SECRET");
  },
  get googleOauthRefreshToken() {
    return required("GOOGLE_OAUTH_REFRESH_TOKEN");
  },
};
