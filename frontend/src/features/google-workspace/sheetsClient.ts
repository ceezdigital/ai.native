import { google } from "googleapis";
import { env } from "@/lib/env";
import { getGoogleAuthClient } from "./googleAuth";
import type { SheetsSyncPayload } from "../jobs/types";

const SHEET_NAME = "Bookings";

export async function appendBookingRow(payload: SheetsSyncPayload) {
  const sheets = google.sheets({ version: "v4", auth: getGoogleAuthClient() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.googleSheetsSpreadsheetId,
    range: `${SHEET_NAME}!A:F`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        payload.attendeeName,
        payload.attendeeEmail,
        payload.attendeePhone,
        payload.cohortLabel,
        payload.amount,
      ]],
    },
  });
}
