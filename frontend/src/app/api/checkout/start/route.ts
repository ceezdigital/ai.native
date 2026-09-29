import { env } from "@/lib/env";
import { findBookingBySubmissionId } from "@/features/bookings";
import { startCheckout } from "@/features/payments";

// This is where Tally's "redirect after submit" setting should point,
// with `?submissionId={{Submission ID}}` as a merge tag. The Tally webhook
// usually lands before this request does, but isn't guaranteed to — so
// this waits briefly for the booking the webhook creates rather than
// assuming it already exists.
async function waitForBooking(submissionId: string, attempts = 6, delayMs = 700) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const booking = await findBookingBySubmissionId(submissionId);
    if (booking) return booking;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return null;
}

export async function GET(request: Request) {
  const submissionId = new URL(request.url).searchParams.get("submissionId");
  if (!submissionId) {
    return new Response("Missing submissionId", { status: 400 });
  }

  const booking = await waitForBooking(submissionId);
  if (!booking) {
    return new Response(
      "We're still processing your submission — check your email in a few minutes, or contact us if it doesn't arrive.",
      { status: 404 },
    );
  }

  if (booking.status !== "pending_payment") {
    return Response.redirect(`${env.appUrl}/#event`, 302);
  }

  const redirectUrl = await startCheckout(booking.id);
  return Response.redirect(redirectUrl, 302);
}
