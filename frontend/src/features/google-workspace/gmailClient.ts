import { google } from "googleapis";
import { getGoogleAuthClient } from "./googleAuth";
import type { GmailSendPayload } from "../jobs/types";

function toBase64Url(input: string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendGmail(payload: GmailSendPayload) {
  const gmail = google.gmail({ version: "v1", auth: getGoogleAuthClient() });

  const isHtml = Boolean(payload.bodyHtml);
  const contentType = isHtml ? "text/html; charset=utf-8" : "text/plain; charset=utf-8";
  const body = isHtml ? payload.bodyHtml : payload.bodyText;

  const message = [`To: ${payload.to}`, `Subject: ${payload.subject}`, `Content-Type: ${contentType}`, "", body].join(
    "\r\n",
  );

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: toBase64Url(message) },
  });
}
