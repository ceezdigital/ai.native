import { env } from "@/lib/env";
import { getOrCreateBooking } from "@/features/bookings";
import { confirmBookingAndClaimSeat } from "@/features/bookings/repository";
import { runInlineOrEnqueue } from "@/features/jobs";
import { db } from "@/lib/db";

function readField(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const phone = readField(formData, "phone");
  const idempotencyKey = readField(formData, "idempotencyKey");

  if (!name || !email || !phone || !idempotencyKey) {
    return Response.redirect(`${env.appUrl}/?error=missing_fields#event`, 302);
  }

  try {
    const pendingBooking = await getOrCreateBooking({ name, email, phone }, idempotencyKey);
    
    // TEMPORARY: Bypass payments for presentation
    const { booking, overbooked } = await confirmBookingAndClaimSeat(pendingBooking.id, pendingBooking.cohortId);
    
    if (overbooked) {
       await runInlineOrEnqueue("gmail_send", {
        to: env.ownerAlertEmail,
        subject: "Ai-Nativ — overbooked seat needs manual review",
        bodyText: `Booking ${booking.id} paid after the cohort filled.`,
      });
    } else {
       const cohort = await db.cohort.findUniqueOrThrow({ where: { id: pendingBooking.cohortId } });
       await Promise.all([
         runInlineOrEnqueue("sheets_sync", {
           kind: "booking_confirmed",
           bookingId: booking.id,
           attendeeName: booking.attendeeName,
           attendeeEmail: booking.attendeeEmail,
           attendeePhone: booking.attendeePhone,
           cohortLabel: cohort.label,
           amount: "0 KES (Demo Mode)",
         }),
         runInlineOrEnqueue("gmail_send", {
           to: booking.attendeeEmail,
           subject: "You're confirmed for Ai-Nativ Clone Camp",
           bodyText: `Hi ${booking.attendeeName}, your seat for ${cohort.label} is confirmed. See you there.`,
         }),
         runInlineOrEnqueue("calendar_update", {
           cohortId: cohort.id,
           calendarEventId: cohort.calendarEventId,
           cohortLabel: cohort.label,
           eventDate: cohort.eventDate.toISOString().slice(0, 10),
           seatsConfirmed: cohort.seatsConfirmed,
           seatCap: cohort.seatCap,
         }),
       ]);
    }
    
    // Redirect to a success page or back with success state
    return Response.redirect(`${env.appUrl}/?status=success#event`, 302);
  } catch (error) {
    console.error("Booking creation/checkout failed:", error);
    return Response.redirect(`${env.appUrl}/?error=checkout_failed#event`, 302);
  }
}
