import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export function createPendingPayment(
  bookingId: string | null,
  membershipId: string | null,
  orderTrackingId: string,
  merchantReference: string,
  amount: number,
  currency: string,
) {
  return db.payment.create({
    data: {
      bookingId,
      membershipId,
      pesapalOrderTrackingId: orderTrackingId,
      pesapalMerchantReference: merchantReference,
      amount,
      currency,
      status: "pending",
    },
  });
}

export function findPaymentByTrackingId(orderTrackingId: string) {
  return db.payment.findUnique({ where: { pesapalOrderTrackingId: orderTrackingId }, include: { booking: true, membership: true } });
}

export function markPaymentConfirmed(paymentId: string, rawPayload: Prisma.InputJsonValue) {
  return db.payment.update({
    where: { id: paymentId },
    data: { status: "confirmed", rawPayload, confirmedAt: new Date() },
  });
}

export function markPaymentFailed(paymentId: string, rawPayload: Prisma.InputJsonValue) {
  return db.payment.update({
    where: { id: paymentId },
    data: { status: "failed", rawPayload },
  });
}
