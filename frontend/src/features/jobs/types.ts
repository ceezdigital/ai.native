export type BookingSheetsSyncPayload = {
  kind: "booking_confirmed";
  bookingId: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  cohortLabel: string;
  amount: string;
};

export type MembershipSheetsSyncPayload = {
  kind: "membership_confirmed";
  membershipId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  tierLabel: string;
  amount: string;
};

export type SheetsSyncPayload = BookingSheetsSyncPayload | MembershipSheetsSyncPayload;

export type GmailSendPayload = {
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
};

export type CalendarUpdatePayload = {
  cohortId: string;
  calendarEventId: string | null;
  cohortLabel: string;
  eventDate: string;
  seatsConfirmed: number;
  seatCap: number;
};
