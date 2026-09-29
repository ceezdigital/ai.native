import { PrismaClient } from '@prisma/client'
import { runInlineOrEnqueue } from './features/jobs/runInlineOrEnqueue.js'

const prisma = new PrismaClient()

async function run() {
  // Grab the latest booking
  const booking = await prisma.booking.findFirst({ orderBy: { createdAt: 'desc' } })
  const cohort = await prisma.cohort.findUnique({ where: { id: booking.cohortId } })

  console.log("Forcing sync for booking:", booking.id)

  await runInlineOrEnqueue("sheets_sync", {
    kind: "booking_confirmed",
    bookingId: booking.id,
    attendeeName: booking.attendeeName,
    attendeeEmail: booking.attendeeEmail,
    attendeePhone: booking.attendeePhone,
    cohortLabel: cohort.label,
    amount: "10000 KES",
  });
  
  console.log("Sync complete!")
}
run().catch(console.error).finally(() => prisma.$disconnect())
