// Dev helper: manually re-runs the Google Workspace sync for the most
// recently created booking — useful for testing Sheets/Gmail/Calendar
// wiring without going through a full payment.
// Run with: node --env-file=.env node_modules/.bin/tsx scripts/force-sync.mjs
import { PrismaClient } from "@prisma/client";
import { runInlineOrEnqueue } from "../src/features/jobs/runInlineOrEnqueue";

const prisma = new PrismaClient();

async function run() {
  const booking = await prisma.booking.findFirstOrThrow({ orderBy: { createdAt: "desc" } });
  const cohort = await prisma.cohort.findUniqueOrThrow({ where: { id: booking.cohortId } });

  console.log("Forcing sync for booking:", booking.id);

  await runInlineOrEnqueue("sheets_sync", {
    kind: "booking_confirmed",
    bookingId: booking.id,
    attendeeName: booking.attendeeName,
    attendeeEmail: booking.attendeeEmail,
    attendeePhone: booking.attendeePhone,
    cohortLabel: cohort.label,
    amount: "10000 KES",
  });

  console.log("Sync complete!");
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
