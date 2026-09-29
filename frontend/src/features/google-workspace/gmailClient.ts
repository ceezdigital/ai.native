import { google } from "googleapis";
import { getGoogleAuthClient } from "./googleAuth";
import type { GmailSendPayload } from "../jobs/types";

function toBase64Url(input: string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendGmail(payload: GmailSendPayload) {
  const gmail = google.gmail({ version: "v1", auth: getGoogleAuthClient() });

  const message = [`To: ${payload.to}`, `Subject: ${payload.subject}`, "Content-Type: text/plain; charset=utf-8", "", payload.bodyText].join(
    "\r\n",
  );

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: toBase64Url(message) },
  });
}
