import { google } from "googleapis";
import { env } from "@/lib/env";
import { getGoogleAuthClient } from "./googleAuth";
import type { BookingSheetsSyncPayload, MembershipSheetsSyncPayload } from "../jobs/types";

// Payment collection is manual right now (a gateway is still being chosen),
// so every new row starts here — the admin edits this cell by hand once
// they've actually invoiced and been paid.
const DEFAULT_PAYMENT_STATUS = "Awaiting invoice";

async function appendRow(tabName: string, values: (string | number)[]) {
  const sheets = google.sheets({ version: "v4", auth: getGoogleAuthClient() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.googleSheetsSpreadsheetId,
    range: `${tabName}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });
}

export function appendBookingRow(payload: BookingSheetsSyncPayload) {
  return appendRow("Bookings", [
    new Date().toISOString(),
    payload.attendeeName,
    payload.attendeeEmail,
    payload.attendeePhone,
    payload.cohortLabel,
    payload.amount,
    DEFAULT_PAYMENT_STATUS,
  ]);
}

export function appendMembershipRow(payload: MembershipSheetsSyncPayload) {
  return appendRow("Community", [
    new Date().toISOString(),
    payload.memberName,
    payload.memberEmail,
    payload.memberPhone,
    payload.tierLabel,
    payload.amount,
    DEFAULT_PAYMENT_STATUS,
  ]);
}
