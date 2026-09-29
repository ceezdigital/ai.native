export type SheetsSyncPayload = {
  kind: "booking_confirmed";
  bookingId: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  cohortLabel: string;
  amount: string;
};

export type GmailSendPayload = {
  to: string;
  subject: string;
  bodyText: string;
};

export type CalendarUpdatePayload = {
  cohortId: string;
  calendarEventId: string | null;
  cohortLabel: string;
  eventDate: string;
  seatsConfirmed: number;
  seatCap: number;
};
