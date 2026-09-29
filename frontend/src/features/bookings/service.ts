import { createPendingBooking, findBookingBySubmissionId, getActiveCohort } from "./repository";
import type { AttendeeInfo, TallyField, TallyWebhookPayload } from "./types";

// Tally lets the form owner label fields however they like, so there's no
// stable field key to read by. Matching on the label text is the pragmatic
// option — this needs the Clone Camp form's actual field labels to contain
// "name" / "email" / "phone" (case-insensitive), which is worth confirming
// once the real form exists in Tally rather than assumed here.
function extractAttendeeInfo(fields: TallyField[]): AttendeeInfo {
  const find = (needle: string) => fields.find((field) => field.label.toLowerCase().includes(needle));

  const name = find("name")?.value;
  const email = find("email")?.value;
  const phone = find("phone")?.value;

  if (typeof name !== "string" || typeof email !== "string" || typeof phone !== "string") {
    throw new Error("Tally submission is missing a name, email, or phone field the parser could identify.");
  }

  return { name, email, phone };
}

// Idempotent by tallySubmissionId: safe to call more than once for the same
// submission (Tally retries webhooks on timeout, and the checkout-start
// route may also race this on the attendee's redirect).
export async function getOrCreateBookingFromTallySubmission(payload: TallyWebhookPayload) {
  const existing = await findBookingBySubmissionId(payload.data.submissionId);
  if (existing) return existing;

  const attendee = extractAttendeeInfo(payload.data.fields);
  const cohort = await getActiveCohort();

  return createPendingBooking(cohort.id, payload.data.submissionId, attendee);
}
