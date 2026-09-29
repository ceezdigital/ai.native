import { env } from "@/lib/env";
import type { PesapalOrderRequest, PesapalOrderResult, PesapalTransactionStatus } from "./types";

const BASE_URL = env.pesapalEnv === "live" ? "https://pay.pesapal.com/v3" : "https://cybqa.pesapal.com/pesapalv3";

// Cached in module scope: a warm serverless instance reuses the token
// instead of re-authenticating on every request. A cold start just pays
// for one extra round trip, which is fine.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const response = await fetch(`${BASE_URL}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: env.pesapalConsumerKey,
      consumer_secret: env.pesapalConsumerSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Pesapal auth failed: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as { token: string; expiryDate: string };
  cachedToken = { value: data.token, expiresAt: new Date(data.expiryDate).getTime() - 30_000 };
  return data.token;
}

async function pesapalFetch(path: string, init: RequestInit) {
  const token = await getAccessToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Pesapal request to ${path} failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

export async function submitOrder(order: PesapalOrderRequest): Promise<PesapalOrderResult> {
  const [firstName, ...rest] = order.billingEmail.split("@")[0].split(".");

  return pesapalFetch("/api/Transactions/SubmitOrderRequest", {
    method: "POST",
    body: JSON.stringify({
      id: order.merchantReference,
      currency: order.currency,
      amount: order.amount,
      description: order.description,
      callback_url: order.callbackUrl,
      notification_id: env.pesapalIpnId,
      billing_address: {
        email_address: order.billingEmail,
        phone_number: order.billingPhone,
        country_code: "KE",
        first_name: firstName || "Attendee",
        last_name: rest.join(" ") || "Attendee",
      },
    }),
  }) as Promise<PesapalOrderResult>;
}

export async function getTransactionStatus(orderTrackingId: string): Promise<PesapalTransactionStatus> {
  return pesapalFetch(`/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
    method: "GET",
  }) as Promise<PesapalTransactionStatus>;
}

// One-time setup, not called on every request — run once when configuring
// a new environment, then store the returned ipn_id as PESAPAL_IPN_ID.
export async function registerIpnUrl(url: string): Promise<{ ipn_id: string }> {
  return pesapalFetch("/api/URLSetup/RegisterIPN", {
    method: "POST",
    body: JSON.stringify({ url, ipn_notification_type: "GET" }),
  }) as Promise<{ ipn_id: string }>;
}
