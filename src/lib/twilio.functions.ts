import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";
const VERIFY_URL = "https://connector-gateway.lovable.dev/api/v1/verify_credentials";
const DEFAULT_WHATSAPP_FROM = "+14155238886";

const maskPhone = (value: string) => value.replace(/^whatsapp:/, "").replace(/(\+\d{2})\d+(\d{2})$/, "$1••••$2");

const normalizeE164 = (value: string) => {
  const trimmed = value.trim();
  const withoutPrefix = trimmed.replace(/^whatsapp:/i, "");
  if (withoutPrefix.startsWith("+")) return withoutPrefix.replace(/\s/g, "");
  const digits = withoutPrefix.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  return digits ? `+${digits}` : "";
};

const parseGatewayBody = async (res: Response) => {
  const text = await res.text();
  try {
    return JSON.parse(text) as { sid?: string; message?: string; code?: number; type?: string; error?: string };
  } catch {
    return { message: text || res.statusText };
  }
};

export const twilioConfig = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const twilioKey = process.env.TWILIO_API_KEY;
    const from = normalizeE164(process.env.TWILIO_WHATSAPP_FROM || DEFAULT_WHATSAPP_FROM);
    let gatewayVerified = false;
    let gatewayMessage = "Twilio connector not checked";

    if (lovableKey && twilioKey) {
      const res = await fetch(VERIFY_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": twilioKey,
        },
      });
      const json = (await res.json().catch(() => ({}))) as { outcome?: string; error?: string };
      gatewayVerified = res.ok && (json.outcome === "verified" || json.outcome === "skipped");
      gatewayMessage = gatewayVerified ? "Twilio token verified" : json.error || "Twilio token needs reconnect";
    }

    return {
      hasLovableKey: !!lovableKey,
      hasTwilioKey: !!twilioKey,
      hasFromNumber: !!from,
      fromNumber: from ? maskPhone(from) : null,
      gatewayVerified,
      gatewayMessage,
    };
  });

export const sendWhatsApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { to: string; body: string; from?: string }) => {
    if (!data?.to || !data?.body) throw new Error("Missing 'to' or 'body'");
    return data;
  })
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const twilioKey = process.env.TWILIO_API_KEY;
    if (!lovableKey || !twilioKey) {
      throw new Error("Twilio connector token is missing. Please reconnect Twilio once from Connectors.");
    }

    const fromRaw = normalizeE164(data.from || process.env.TWILIO_WHATSAPP_FROM || DEFAULT_WHATSAPP_FROM);
    if (!fromRaw) {
      throw new Error(
        "WhatsApp sender number is missing. Add your Twilio WhatsApp sender number, for example +14155238886."
      );
    }
    const toNumber = normalizeE164(data.to);
    if (!toNumber) throw new Error("Please enter a valid WhatsApp number.");
    const from = `whatsapp:${fromRaw}`;
    const to = `whatsapp:${toNumber}`;

    const res = await fetch(`${GATEWAY_URL}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": twilioKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: data.body }),
    });

    const json = await parseGatewayBody(res);
    if (!res.ok) {
      const providerMessage = json.message || json.error || JSON.stringify(json);
      if (res.status === 401 || res.status === 403 || json.type === "unauthorized") {
        throw new Error("Twilio token issue fixed in app, but the saved Twilio connection needs reconnect. Open Connectors and reconnect Twilio, then try again.");
      }
      throw new Error(`Twilio send failed [${res.status}]: ${providerMessage}`);
    }
    return { ok: true, sid: json.sid };
  });
