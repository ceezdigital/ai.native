const fs = require('fs');
let code = fs.readFileSync('frontend/src/features/payments/service.ts', 'utf8');

// I will use replace with regex or just manually replace the whole function block.
const blockToReplace = `  if (status.payment_status_description === "COMPLETED") {
    // Both the Pesapal IPN and the attendee's browser callback can reach
    // this function for the same payment. The seat claim must only ever
    // run once, so an already-settled booking short-circuits here instead
    // of claiming a second seat for the same attendee.
    if (payment.booking.status === "confirmed" || payment.booking.status === "overbooked") {
      return { status: payment.booking.status };
    }

    await markPaymentConfirmed(payment.id, status);
    const { booking, overbooked } = await confirmBookingAndClaimSeat(payment.bookingId, payment.booking.cohortId);

    if (overbooked) {
      await runInlineOrEnqueue("gmail_send", {
        to: env.googleImpersonateEmail,
        subject: "Ai-Nativ — overbooked seat needs manual review",
        bodyText: \`Booking \${booking.id} (\${booking.attendeeName}, \${booking.attendeeEmail}) paid after the cohort filled. Resolve manually: extra seat, refund, or move to the next cohort.\`,
      });
      return { status: "overbooked" as const };
    }

    const cohort = await db.cohort.findUniqueOrThrow({ where: { id: payment.booking.cohortId } });

    await Promise.all([
      runInlineOrEnqueue("sheets_sync", {
        kind: "booking_confirmed",
        bookingId: booking.id,
        attendeeName: booking.attendeeName,
        attendeeEmail: booking.attendeeEmail,
        attendeePhone: booking.attendeePhone,
        cohortLabel: cohort.label,
        amount: \`\${payment.amount} \${payment.currency}\`,
      }),
      runInlineOrEnqueue("gmail_send", {
        to: booking.attendeeEmail,
        subject: "You're confirmed for Ai-Nativ Clone Camp",
        bodyText: \`Hi \${booking.attendeeName}, your seat for \${cohort.label} is confirmed. See you there.\`,
      }),
      runInlineOrEnqueue("calendar_update", {
        cohortId: cohort.id,
        calendarEventId: cohort.calendarEventId,
        cohortLabel: cohort.label,
        eventDate: cohort.eventDate.toISOString().slice(0, 10),
        seatsConfirmed: cohort.seatsConfirmed,
        seatCap: cohort.seatCap,
      }),
    ]);

    return { status: "confirmed" as const };
  }`;

const replacement = `  if (status.payment_status_description === "COMPLETED") {
    await markPaymentConfirmed(payment.id, status);

    if (payment.bookingId && payment.booking) {
      if (payment.booking.status === "confirmed" || payment.booking.status === "overbooked") {
        return { status: payment.booking.status };
      }
      
      const { booking, overbooked } = await confirmBookingAndClaimSeat(payment.bookingId, payment.booking.cohortId);

      if (overbooked) {
        await runInlineOrEnqueue("gmail_send", {
          to: env.googleImpersonateEmail,
          subject: "Ai-Nativ — overbooked seat needs manual review",
          bodyText: \`Booking \${booking.id} (\${booking.attendeeName}, \${booking.attendeeEmail}) paid after the cohort filled. Resolve manually: extra seat, refund, or move to the next cohort.\`,
        });
        return { status: "overbooked" as const };
      }

      const cohort = await db.cohort.findUniqueOrThrow({ where: { id: payment.booking.cohortId } });

      await Promise.all([
        runInlineOrEnqueue("sheets_sync", {
          kind: "booking_confirmed",
          bookingId: booking.id,
          attendeeName: booking.attendeeName,
          attendeeEmail: booking.attendeeEmail,
          attendeePhone: booking.attendeePhone,
          cohortLabel: cohort.label,
          amount: \`\${payment.amount} \${payment.currency}\`,
        }),
        runInlineOrEnqueue("gmail_send", {
          to: booking.attendeeEmail,
          subject: "You're confirmed for Ai-Nativ Clone Camp",
          bodyText: \`Hi \${booking.attendeeName}, your seat for \${cohort.label} is confirmed. See you there.\`,
        }),
        runInlineOrEnqueue("calendar_update", {
          cohortId: cohort.id,
          calendarEventId: cohort.calendarEventId,
          cohortLabel: cohort.label,
          eventDate: cohort.eventDate.toISOString().slice(0, 10),
          seatsConfirmed: cohort.seatsConfirmed,
          seatCap: cohort.seatCap,
        }),
      ]);
      return { status: "confirmed" as const };
    } 
    
    if (payment.membershipId && payment.membership) {
      if (payment.membership.status === "active") {
        return { status: "active" as const };
      }

      // We need to import confirmMembership from community repo
      // But let's just do it inline here using db directly to avoid circular dependency
      await db.communityMembership.update({
        where: { id: payment.membershipId },
        data: {
          status: "active",
          startedAt: new Date(),
          renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // simplify for demo
        }
      });
      
      const membership = payment.membership;

      await runInlineOrEnqueue("gmail_send", {
        to: membership.memberEmail,
        subject: "Welcome to the Ai-Nativ Community!",
        bodyText: \`Hi \${membership.memberName}, your payment was successful. Join our WhatsApp community here: https://chat.whatsapp.com/YOUR_LINK_HERE\`,
      });
      
      return { status: "confirmed" as const };
    }
  }`;

code = code.replace(blockToReplace, replacement);
fs.writeFileSync('frontend/src/features/payments/service.ts', code);
