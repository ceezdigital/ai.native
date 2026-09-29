export type PesapalTransactionStatus = {
  payment_method: string;
  amount: number;
  created_date: string;
  confirmation_code: string;
  payment_status_description: "COMPLETED" | "FAILED" | "PENDING" | "INVALID" | "REVERSED";
  description: string;
  order_tracking_id: string;
  merchant_reference: string;
  currency: string;
};

export type PesapalOrderRequest = {
  merchantReference: string;
  amount: number;
  currency: string;
  description: string;
  callbackUrl: string;
  billingEmail: string;
  billingPhone: string;
};

export type PesapalOrderResult = {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
};
