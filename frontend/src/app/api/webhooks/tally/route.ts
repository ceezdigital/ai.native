import type { Prisma } from "@prisma/client";
import { env } from "@/lib/env";
import { logWebhookEvent, verifyTallySignature } from "@/features/webhooks";
import { getOrCreateBookingFromTallySubmission } from "@/features/bookings";
import { getOrCreateMembershipFromTallySubmission } from "@/features/community/service";
import type { TallyWebhookPayload } from "@/features/bookings/types";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("tally-signature");
  const verified = verifyTallySignature(rawBody, signature, env.tallyWebhookSecret);

  const payload = JSON.parse(rawBody) as TallyWebhookPayload;
  await logWebhookEvent("tally", verified, payload as unknown as Prisma.InputJsonValue);

  if (!verified) {
    return new Response("Invalid signature", { status: 401 });
  }

  const formName = payload.data.formName.toLowerCase();
  
  // Route to Community or Booking
  if (formName.includes("community")) {
    const membership = await getOrCreateMembershipFromTallySubmission(payload);
    return Response.json({ membershipId: membership.id }, { status: 200 });
  } else {
    const booking = await getOrCreateBookingFromTallySubmission(payload);
    return Response.json({ bookingId: booking.id }, { status: 200 });
  }
}
