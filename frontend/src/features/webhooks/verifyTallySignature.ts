import { createHmac, timingSafeEqual } from "node:crypto";

// Tally signs each webhook delivery with HMAC-SHA256 of the raw request
// body, base64-encoded, sent in the `Tally-Signature` header. Verifying
// against the RAW body (not the re-serialized JSON) matters — re-stringifying
// can reorder keys or change whitespace and silently break the comparison.
export function verifyTallySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");

  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signatureHeader);

  if (expectedBuffer.length !== actualBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, actualBuffer);
}
