import { logWebhookEvent } from "@/features/webhooks";
import { confirmPaymentFromCallback } from "@/features/payments";

// Pesapal's IPN doesn't sign the inbound call — it just tells us a tracking
// id changed status. Trust comes from confirmPaymentFromCallback calling
// back into Pesapal's own API to fetch the real status; "verified" here
// means that callback succeeded, not that this request carried a signature.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderTrackingId = url.searchParams.get("OrderTrackingId");
  const orderMerchantReference = url.searchParams.get("OrderMerchantReference");
  const orderNotificationType = url.searchParams.get("OrderNotificationType") ?? "IPNCHANGE";

  if (!orderTrackingId || !orderMerchantReference) {
    await logWebhookEvent("pesapal", false, { orderTrackingId, orderMerchantReference });
    return new Response("Missing OrderTrackingId or OrderMerchantReference", { status: 400 });
  }

  try {
    const result = await confirmPaymentFromCallback(orderTrackingId);
    await logWebhookEvent("pesapal", true, { orderTrackingId, orderMerchantReference, result });

    return Response.json({
      orderNotificationType,
      orderTrackingId,
      orderMerchantReference,
      status: 200,
    });
  } catch (error) {
    await logWebhookEvent("pesapal", false, { orderTrackingId, orderMerchantReference, error: String(error) });
    return Response.json(
      { orderNotificationType, orderTrackingId, orderMerchantReference, status: 500 },
      { status: 500 },
    );
  }
}
