import { db } from "@/lib/db";
import type { WebhookSource, Prisma } from "@prisma/client";

// Every webhook gets logged here regardless of whether it turns out to be
// valid — this is the audit trail if a payment or booking is ever disputed.
export async function logWebhookEvent(source: WebhookSource, verified: boolean, payload: Prisma.InputJsonValue) {
  await db.webhookEvent.create({
    data: { source, verified, payload },
  });
}
