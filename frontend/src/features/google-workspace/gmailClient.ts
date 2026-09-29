import { google } from "googleapis";
import { getGoogleAuthClient } from "./googleAuth";
import type { GmailSendPayload } from "../jobs/types";

function toBase64Url(input: string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// multipart/alternative with both a plain-text and an HTML part is what
// real transactional senders do — it's what spam filters expect, and it's
// what gives a mail client a fallback if it can't render HTML. A single
// HTML-only part looks more like bulk mail.
function buildMultipartMessage(payload: GmailSendPayload): string {
  const boundary = `ainativ_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  return [
    `To: ${payload.to}`,
    `Subject: ${payload.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    payload.bodyText,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    payload.bodyHtml,
    "",
    `--${boundary}--`,
  ].join("\r\n");
}

function buildPlainMessage(payload: GmailSendPayload): string {
  return [`To: ${payload.to}`, `Subject: ${payload.subject}`, "Content-Type: text/plain; charset=UTF-8", "", payload.bodyText].join(
    "\r\n",
  );
}

export async function sendGmail(payload: GmailSendPayload) {
  const gmail = google.gmail({ version: "v1", auth: getGoogleAuthClient() });
  const message = payload.bodyHtml ? buildMultipartMessage(payload) : buildPlainMessage(payload);

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: toBase64Url(message) },
  });
}
