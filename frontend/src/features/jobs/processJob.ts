import type { Job, JobType } from "@prisma/client";
import { db } from "@/lib/db";
import { appendBookingRow, sendGmail, upsertCohortCalendarEvent } from "@/features/google-workspace";
import type { CalendarUpdatePayload, GmailSendPayload, SheetsSyncPayload } from "./types";

// The one place that knows how to run each job type, keyed by JobType so
// both the inline attempt and the cron retry sweep share the same logic.
export async function runJobPayload(type: JobType, payload: unknown): Promise<void> {
  switch (type) {
    case "sheets_sync":
      return appendBookingRow(payload as SheetsSyncPayload);
    case "gmail_send":
      return sendGmail(payload as GmailSendPayload);
    case "calendar_update": {
      const typed = payload as CalendarUpdatePayload;
      const eventId = await upsertCohortCalendarEvent(typed);
      if (!typed.calendarEventId) {
        await db.cohort.update({ where: { id: typed.cohortId }, data: { calendarEventId: eventId } });
      }
      return;
    }
  }
}

export function processJob(job: Job): Promise<void> {
  return runJobPayload(job.type, job.payload);
}
