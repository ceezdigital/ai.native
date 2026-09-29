export type AttendeeInfo = {
  name: string;
  email: string;
  phone: string;
};

export type TallyField = {
  key: string;
  label: string;
  type: string;
  value: unknown;
};

export type TallyWebhookPayload = {
  eventId: string;
  eventType: string;
  createdAt: string;
  data: {
    responseId: string;
    submissionId: string;
    formId: string;
    formName: string;
    fields: TallyField[];
  };
};
