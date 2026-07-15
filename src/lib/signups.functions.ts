import { createServerFn } from "@tanstack/react-start";

const SPREADSHEET_ID = "1Kl33Ps8kGUwG27gk7EuqhZC0CmVBcuN91m4CBzRy-Zs";
const RANGE = "Signups!A:C";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets";

export const addSignup = createServerFn({ method: "POST" })
  .inputValidator((data: { firstName: string; email: string }) => {
    const firstName = String(data?.firstName ?? "").trim().slice(0, 100);
    const email = String(data?.email ?? "").trim().slice(0, 200);
    if (!firstName) throw new Error("First name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Valid email is required");
    return { firstName, email };
  })
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !connKey) throw new Error("Google Sheets connector is not configured");

    const url = `${GATEWAY}/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[new Date().toISOString(), data.firstName, data.email]],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${body}`);
      throw new Error("Could not save signup");
    }
    return { ok: true };
  });
