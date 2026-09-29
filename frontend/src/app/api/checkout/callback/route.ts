import { env } from "@/lib/env";
import { confirmPaymentFromCallback } from "@/features/payments";

// Where Pesapal sends the attendee's BROWSER back after checkout — purely
// for a fast confirmation page. The Pesapal IPN (webhooks/pesapal) is the
// authoritative path; this just gives the attendee an immediate result
// instead of waiting on the IPN round trip. Safe to call twice — see the
// idempotency guard in confirmPaymentFromCallback.
export async function GET(request: Request) {
  const orderTrackingId = new URL(request.url).searchParams.get("OrderTrackingId");
  if (!orderTrackingId) {
    return Response.redirect(`${env.appUrl}/#event`, 302);
  }

  const result = await confirmPaymentFromCallback(orderTrackingId);

  // Redirects to the existing Clone Camp section rather than a dedicated
  // confirmation page, which doesn't exist yet — the `booking` query param
  // is there for a future small banner/toast, not required today.
  return Response.redirect(`${env.appUrl}/?booking=${result.status}#event`, 302);
}
