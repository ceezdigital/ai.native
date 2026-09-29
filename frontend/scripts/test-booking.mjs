// Dev helper: exercises the real /api/bookings/create endpoint the way the
// native form does, instead of writing to the DB directly — this actually
// proves the route works, not just that a row can be inserted.
// Run with: node --env-file=.env scripts/test-booking.mjs
import crypto from "crypto";

const APP_URL = process.env.APP_URL ?? "http://localhost:3005";

async function run() {
  const body = new URLSearchParams({
    idempotencyKey: "test_" + crypto.randomBytes(4).toString("hex"),
    name: "Test Attendee",
    email: "test@example.com",
    phone: "+254700000000",
  });

  const response = await fetch(`${APP_URL}/api/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    redirect: "manual",
  });

  console.log("Status:", response.status);
  console.log("Redirected to:", response.headers.get("location"));
}

run().catch(console.error);
