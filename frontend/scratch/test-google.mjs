import { google } from "googleapis";
import { readFileSync } from "fs";

async function main() {
  const envText = readFileSync(".env.local", "utf8");
  const getEnv = (key) => {
    const match = envText.match(new RegExp(`${key}='?([^']*)'?`));
    return match ? match[1] : null;
  };

  const jsonStr = getEnv("GOOGLE_SERVICE_ACCOUNT_JSON");
  const email = getEnv("GOOGLE_IMPERSONATE_EMAIL");
  
  if (!jsonStr || !email) throw new Error("Missing env");
  
  const credentials = JSON.parse(jsonStr);
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
    subject: email,
  });

  const gmail = google.gmail({ version: "v1", auth });

  const message = [
    `To: ${email}`,
    `Subject: Connection Test from Ai-Nativ Server`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    "Hello! This is a test message. If you received this, Domain-Wide Delegation is working perfectly!"
  ].join("\r\n");

  const encoded = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encoded },
    });
    console.log("Email sent successfully!");
  } catch(e) {
    console.error("Failed:", e.message);
  }
}
main();
