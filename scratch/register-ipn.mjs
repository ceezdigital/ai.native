const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;
const APP_URL = process.env.APP_URL;

async function run() {
  const authRes = await fetch("https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET }),
  });
  
  const authData = await authRes.json();
  const token = authData.token;

  const url = `${APP_URL}/api/webhooks/pesapal`;
  console.log("Registering IPN URL:", url);

  const regRes = await fetch("https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ url, ipn_notification_type: "GET" }),
  });

  const regData = await regRes.json();
  console.log("Response:", regData);
}

run();
