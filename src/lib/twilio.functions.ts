import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";

export const sendWhatsApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { to: string; body: string; from?: string }) => {
    if (!data?.to || !data?.body) throw new Error("Missing 'to' or 'body'");
    return data;
  })
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const twilioKey = process.env.TWILIO_API_KEY;
    if (!lovableKey) throw new Error("LOVABLE_API_KEY not configured");
    if (!twilioKey) throw new Error("TWILIO_API_KEY not configured");

    const fromRaw = (data.from || process.env.TWILIO_WHATSAPP_FROM || "").trim();
    if (!fromRaw) {
      throw new Error(
        "TWILIO_WHATSAPP_FROM is not set. Add your Twilio WhatsApp number (e.g. +14155238886) in project secrets."
      );
    }
    const toNumber = data.to.replace(/[^\d+]/g, "");
    const from = fromRaw.startsWith("whatsapp:") ? fromRaw : `whatsapp:${fromRaw}`;
    const to = toNumber.startsWith("whatsapp:") ? toNumber : `whatsapp:${toNumber}`;

    const res = await fetch(`${GATEWAY_URL}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": twilioKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: data.body }),
    });

    const json = (await res.json().catch(() => ({}))) as { sid?: string; message?: string; code?: number };
    if (!res.ok) {
      throw new Error(`Twilio error [${res.status}]: ${json.message || JSON.stringify(json)}`);
    }
    return { ok: true, sid: json.sid };
  });
