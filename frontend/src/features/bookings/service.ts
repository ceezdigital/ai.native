import { createPendingBooking, findBookingByIdempotencyKey, getActiveCohort } from "./repository";
import type { AttendeeInfo } from "./types";

// idempotencyKey is generated client-side (one per form load) so a
// double-click or a retried submit can't create two bookings for the same
// attempt — the second call just finds and returns the first booking.
export async function getOrCreateBooking(attendee: AttendeeInfo, idempotencyKey: string) {
  const existing = await findBookingByIdempotencyKey(idempotencyKey);
  if (existing) return existing;

  const cohort = await getActiveCohort();
  return createPendingBooking(cohort.id, idempotencyKey, attendee);
}
