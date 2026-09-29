import { Resend } from "resend";
import { env } from "./env";

// Ensure this client is only initialized if the API key is present
export const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

/**
 * Example usage:
 * 
 * await resend?.emails.send({
 *   from: "Ai-Nativ <newsletter@ainativ.xyz>",
 *   to: ["customer@example.com"],
 *   subject: "Your Weekly AI Brief",
 *   html: "<p>Here is your newsletter...</p>",
 * });
 */
