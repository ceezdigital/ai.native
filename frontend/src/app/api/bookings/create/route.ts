import { env } from "@/lib/env";
import { getOrCreateBooking } from "@/features/bookings";
import { startCheckout } from "@/features/payments";

function readField(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// The attendee's browser submits this form directly — no third party, no
// webhook, no polling for a record that might not exist yet. We have the
// data and can start the Pesapal checkout in the same request.
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
    const booking = await getOrCreateBooking({ name, email, phone }, idempotencyKey);
    const redirectUrl = await startCheckout(booking.id);
    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    console.error("Booking creation/checkout failed:", error);
    return Response.redirect(`${env.appUrl}/?error=checkout_failed#event`, 302);
  }
}
