import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function run() {
  const cohort = await prisma.cohort.create({
    data: {
      label: 'Test Cohort',
      eventDate: new Date(),
      seatCap: 50,
      seatsConfirmed: 0,
      isActive: true,
    }
  })

  const submissionId = 'tally_sub_' + crypto.randomBytes(4).toString('hex')

  const booking = await prisma.booking.create({
    data: {
      cohortId: cohort.id,
      tallySubmissionId: submissionId,
      attendeeName: 'Test Attendee',
      attendeeEmail: 'test@example.com',
      attendeePhone: '123456789',
      status: 'pending_payment'
    }
  })

  console.log('\n--- SUCCESS! ---')
  console.log('To test the Pesapal payment and Google Workspace sync, click this link:')
  console.log(`http://localhost:3005/api/checkout/start?submissionId=${submissionId}`)
}

run().catch(console.error).finally(() => prisma.$disconnect())
