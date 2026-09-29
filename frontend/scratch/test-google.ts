import { sendGmail } from "../src/features/google-workspace/gmailClient";
import { env } from "../src/lib/env";

async function main() {
  console.log("Testing Google Workspace Connection...");
  console.log(`Impersonating: ${env.googleImpersonateEmail}`);

  try {
    await sendGmail({
      to: env.googleImpersonateEmail, // Send to themselves
      subject: "Test from Ai-Nativ Backend",
      bodyText: "If you are reading this, the Google Workspace Domain-Wide Delegation is working perfectly!",
    });
    console.log("✅ Success! Check your inbox.");
  } catch (err) {
    console.error("❌ Failed to send email:");
    console.error(err);
  }
}

main();
