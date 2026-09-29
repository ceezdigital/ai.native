import { db } from "@/lib/db";
import type { AttendeeInfo } from "./types";

export async function getActiveCohort() {
  const cohort = await db.cohort.findFirst({ where: { isActive: true }, orderBy: { eventDate: "asc" } });
  if (!cohort) throw new Error("No active cohort configured — create one before accepting bookings.");
  return cohort;
}

export function findBookingByIdempotencyKey(idempotencyKey: string) {
  return db.booking.findUnique({ where: { idempotencyKey } });
}

export function findBookingById(id: string) {
  return db.booking.findUnique({ where: { id }, include: { payment: true } });
}

export async function createPendingBooking(cohortId: string, idempotencyKey: string, attendee: AttendeeInfo) {
  return db.booking.create({
    data: {
      cohortId,
      idempotencyKey,
      attendeeName: attendee.name,
      attendeeEmail: attendee.email,
      attendeePhone: attendee.phone,
      status: "pending_payment",
    },
  });
}

// Two guards, both enforced with conditional UPDATEs (not read-then-write),
// so this is safe under real concurrency, not just against being called
// twice in sequence:
//
// 1. The seat cap: claiming a seat only succeeds if seats_confirmed is
//    still under seat_cap at the moment of the UPDATE.
// 2. The booking itself: claiming only settles a booking that's still
//    pending_payment. If two calls race for the same booking (e.g. the
//    Pesapal IPN and the browser callback both landing at once), the
//    loser's booking UPDATE affects 0 rows — and since it may have already
//    speculatively claimed a seat, that seat is handed back rather than
//    leaking a phantom seat nobody actually holds.
export async function confirmBookingAndClaimSeat(bookingId: string, cohortId: string) {
  return db.$transaction(async (tx) => {
    const claimed = await tx.$executeRaw`
      UPDATE cohorts
      SET seats_confirmed = seats_confirmed + 1
      WHERE id = ${cohortId} AND seats_confirmed < seat_cap
    `;
    const targetStatus = claimed === 1 ? "confirmed" : "overbooked";

    const transitioned = await tx.$executeRaw`
      UPDATE bookings
      SET status = ${targetStatus}::"BookingStatus", updated_at = now()
      WHERE id = ${bookingId} AND status = 'pending_payment'::"BookingStatus"
    `;

    if (transitioned === 0) {
      if (claimed === 1) {
        await tx.$executeRaw`UPDATE cohorts SET seats_confirmed = seats_confirmed - 1 WHERE id = ${cohortId}`;
      }
      const existing = await tx.booking.findUniqueOrThrow({ where: { id: bookingId } });
      return { booking: existing, overbooked: existing.status === "overbooked" };
    }

    const booking = await tx.booking.findUniqueOrThrow({ where: { id: bookingId } });
    return { booking, overbooked: targetStatus === "overbooked" };
  });
}
