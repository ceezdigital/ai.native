import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Bookings need an active Cohort to attach to — this creates Cohort One if
// it doesn't already exist. Safe to re-run: it's a no-op after the first
// time. Adjust the date/cap here, or edit the row directly once real.
async function main() {
  const existing = await db.cohort.findFirst({ where: { isActive: true } });
  if (existing) {
    console.log(`Active cohort already exists: ${existing.label} (${existing.id})`);
    return;
  }

  const cohort = await db.cohort.create({
    data: {
      label: "Cohort One",
      eventDate: new Date("2026-10-03"),
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
