import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Bookings need an active Cohort to attach to — this creates Cohort One if
// it doesn't already exist. Safe to re-run: it's a no-op after the first
// time. The event date is not decided yet, so this refuses to guess one —
// pass the real date via COHORT_ONE_EVENT_DATE once it's confirmed:
//   COHORT_ONE_EVENT_DATE=2026-11-14 npm run db:seed
async function main() {
  const existing = await db.cohort.findFirst({ where: { isActive: true } });
  if (existing) {
    console.log(`Active cohort already exists: ${existing.label} (${existing.id})`);
    return;
  }

  const dateInput = process.env.COHORT_ONE_EVENT_DATE;
  if (!dateInput) {
    throw new Error(
      "COHORT_ONE_EVENT_DATE is not set. Cohort One's real date hasn't been decided yet — " +
        "run this again with COHORT_ONE_EVENT_DATE=YYYY-MM-DD once it has."
    );
  }
  const eventDate = new Date(dateInput);
  if (Number.isNaN(eventDate.getTime())) {
    throw new Error(`COHORT_ONE_EVENT_DATE is not a valid date: "${dateInput}"`);
  }

  const cohort = await db.cohort.create({
    data: {
      label: "Cohort One",
      eventDate,
      seatCap: 50,
    },
  });

  console.log(`Created active cohort: ${cohort.label} (${cohort.id})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
