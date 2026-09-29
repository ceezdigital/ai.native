import { google } from "googleapis";
import { env } from "@/lib/env";
import { getGoogleAuthClient } from "./googleAuth";
import type { CalendarUpdatePayload } from "../jobs/types";

// Creates the cohort's calendar event on the first confirmed booking, then
// just patches the seat count in its description on every booking after
// that. Returns the event id so the caller can persist it onto the Cohort
// row (only needed the first time; a no-op write after that is harmless).
export async function upsertCohortCalendarEvent(payload: CalendarUpdatePayload): Promise<string> {
  const calendar = google.calendar({ version: "v3", auth: getGoogleAuthClient() });
  const description = `${payload.seatsConfirmed} / ${payload.seatCap} seats confirmed.`;

  if (payload.calendarEventId) {
    await calendar.events.patch({
      calendarId: env.googleCalendarId,
      eventId: payload.calendarEventId,
      requestBody: { description },
    });
    return payload.calendarEventId;
  }

  const created = await calendar.events.insert({
    calendarId: env.googleCalendarId,
    requestBody: {
      summary: payload.cohortLabel,
      description,
      start: { date: payload.eventDate },
      end: { date: payload.eventDate },
    },
  });

  if (!created.data.id) throw new Error("Google Calendar did not return an event id for the created event.");
  return created.data.id;
}
