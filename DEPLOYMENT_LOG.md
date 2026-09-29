# Infrastructure & Deployment Log

This document summarizes the deployment, configuration, and code modifications made for the Ai-Nativ production launch and presentation.

## 1. Google Workspace (Transactional Emails & Sheets)
- **Architecture:** We replaced the temporary standard OAuth flow with **Domain-Wide Delegation** using a Google Cloud Service Account.
- **Why:** This allows the backend to automatically impersonate the admin (`ceez@ainativ.io`) to send emails, update Google Sheets, and manage Calendar events without requiring a manual login prompt.
- **Setup Completed:**
  - Created a Service Account and downloaded the JSON key.
  - Added `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_IMPERSONATE_EMAIL` to Vercel environment variables.
  - Authorized the Client ID in the Google Workspace Admin Console (`admin.google.com > Security > API Controls > Domain-wide Delegation`) with scopes for Sheets, Gmail, Calendar, and Drive.

## 2. Payment Gateway Bypass (Presentation Mode)
- **Architecture:** The Pesapal payment gateway integration (`startCheckout` and `startCommunityCheckout`) has been temporarily bypassed.
- **Why:** To allow seamless testing and presentation of the user flow without requiring live credit card entry or displaying a sandbox environment to the audience.
- **How it works:** When a user submits the Clone Camp or Community form, the API route immediately calls the database confirmation logic (`confirmBookingAndClaimSeat` / `confirmMembership`), fires off the Google Workspace background jobs (Sheets + Email), and redirects to the success page.
- **Action Required Post-Presentation:** To re-enable payments, the API routes (`app/api/bookings/create/route.ts` and `app/api/community/create/route.ts`) need to be reverted to call `startCheckout` instead of bypassing it.

## 3. Branded HTML Emails (Pay-Later Messaging)
- **Architecture:** Upgraded the `gmailClient.ts` to support rich HTML email bodies instead of plain text.
- **Clone Camp Messaging:** Sends a cyan-accented dark theme email stating the seat is officially saved and that an invoice/payment link will be sent as the event approaches.
- **Community Messaging:** Sends a gold-accented dark theme email stating the request is received and the WhatsApp invite + invoice will be sent shortly.

## 4. Domain & DNS Configuration
- **Vercel Hosting:** `ainativ.xyz` successfully connected to Vercel via Namecheap A Record (`216.198.79.1`) and CNAME (`cname.vercel-dns.com`). Conflicting default Namecheap parking records were deleted.
- **Resend (Marketing Emails):** DKIM and SPF records were added to Namecheap to authorize Resend. 
  - *Note:* Resend is specifically designated for bulk marketing blasts and newsletters to protect the main `@ainativ.io` domain reputation, while the Google Workspace integration strictly handles 1-to-1 transactional emails (tickets, receipts).
