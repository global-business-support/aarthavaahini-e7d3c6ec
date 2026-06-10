import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2, MessageCircle, ArrowLeft, Send, Sparkles, Users, Download, Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { sendWhatsApp } from "@/lib/twilio.functions";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/admin/whatsapp")({
  head: () => ({ meta: [{ title: "WhatsApp Sender — Admin" }] }),
  component: WhatsAppPage,
});

const TEMPLATES = [
  { label: "Loan Follow-up", text: "Hi {{name}}, this is from Aarthvaahini. Following up on your loan enquiry. Is this a good time to discuss?" },
  { label: "Insurance Reminder", text: "Hi {{name}}, your insurance plan with Aarthvaahini awaits review. Shall we schedule a quick call today?" },
  { label: "SIP Update", text: "Hi {{name}}, your SIP plan review is ready. Reply YES and our advisor will share the details." },
  { label: "CIBIL Report", text: "Hi {{name}}, your CIBIL check from Aarthvaahini is ready. Click to know how to improve your score." },
  { label: "Thank You", text: "Hi {{name}}, thank you for choosing Aarthvaahini. Reach us anytime for finance, loans, or insurance needs." },
];

type Lead = {
  id: string; full_name: string | null; lead_name?: string | null; phone: string;
  email: string | null; product_type: string; product_name?: string | null;
  amount?: number | null; status: string; city: string | null; lead_source: string | null;
  created_at: string;
};

function WhatsAppPage() {
  const { user, isAdmin, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("Customer");
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [useTwilio, setUseTwilio] = useState(true);
  const [sending, setSending] = useState(false);
  const sendFn = useServerFn(sendWhatsApp);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500)
      .then(({ data }) => setLeads((data as Lead[]) ?? []));
  }, [isAdmin]);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!user || !isAdmin) {
    return (<div className="min-h-screen"><Header /><div className="container mx-auto px-6 py-32 text-center"><h1 className="font-display text-3xl font-bold">Access Denied</h1></div><Footer /></div>);
  }

  const finalMsg = message.replace(/\{\{name\}\}/gi, name || "Customer");
  const cleanPhone = phone.replace(/\D/g, "");
  const waLink = cleanPhone && finalMsg ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}` : null;

  const send = async () => {
    if (!cleanPhone || !finalMsg) { toast.error("Enter phone and message"); return; }
    if (!useTwilio) {
      if (waLink) { window.open(waLink, "_blank"); toast.success("Opening WhatsApp…"); }
      return;
    }
    setSending(true);
    try {
      const to = phone.startsWith("+") ? phone.replace(/\s/g, "") : `+${cleanPhone}`;
      const res = await sendFn({ data: { to, body: finalMsg } });
      toast.success(`Sent via Twilio · ${res.sid?.slice(0, 10) ?? ""}…`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Send failed";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  const downloadLeadsExcel = () => {
    if (leads.length === 0) { toast.error("No leads to export"); return; }
    const rows = leads.map((l) => ({
      "Created At": new Date(l.created_at).toLocaleString("en-IN"),
      "Name": l.lead_name ?? l.full_name ?? "",
      "Phone": l.phone,
      "Email": l.email ?? "",
      "Product Type": l.product_type,
      "Product Name": l.product_name ?? "",
      "Amount": l.amount ?? "",
      "City": l.city ?? "",
      "Source": l.lead_source ?? "",
      "Status": l.status,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 20 }, { wch: 22 }, { wch: 16 }, { wch: 26 }, { wch: 14 }, { wch: 18 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, `aarthvaahini-leads-${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success(`Exported ${leads.length} leads`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"><ArrowLeft className="h-3 w-3" /> Back to Admin</Link>
            <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">WhatsApp Sender</h1>
            <p className="text-sm text-slate-500">Send WhatsApp messages directly via Twilio or open in WhatsApp Web.</p>
          </div>
          <Button onClick={downloadLeadsExcel} variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
            <Download className="mr-2 h-4 w-4" /> Download Leads (Excel)
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Composer */}
          <Card className="lg:col-span-2 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold"><MessageCircle className="h-4 w-4 text-green-600" /> Compose Message</h2>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs">
                <button
                  onClick={() => setUseTwilio(true)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition ${useTwilio ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}
                >
                  <Zap className="h-3 w-3" /> Twilio API
                </button>
                <button
                  onClick={() => setUseTwilio(false)}
                  className={`rounded-md px-2.5 py-1 font-medium transition ${!useTwilio ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                >
                  wa.me link
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div><Label>Customer Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><Label>Phone (with country code)</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+919876543210" /></div>
              </div>
              <div>
                <Label>Message <span className="text-xs text-slate-400">(use {`{{name}}`} for personalization)</span></Label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="Type your message…" />
              </div>
              {finalMsg && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="text-[11px] font-semibold uppercase text-green-700">Preview</div>
                  <div className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{finalMsg}</div>
                </div>
              )}
              <Button onClick={send} disabled={sending} className="w-fit bg-green-600 text-white hover:bg-green-700">
                {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {useTwilio ? "Send via Twilio" : "Open in WhatsApp"}
              </Button>
              {useTwilio && (
                <p className="rounded-md border border-amber-200 bg-amber-50 p-2 text-[11px] text-amber-800">
                  Twilio sandbox uses <b>whatsapp:+14155238886</b> by default. Set <code>TWILIO_WHATSAPP_FROM</code> in project secrets to your verified sender. Recipients must opt-in to the sandbox first.
                </p>
              )}
            </div>
          </Card>

          {/* Templates + Recent Leads */}
          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-amber-500" /> Quick Templates</h3>
              <div className="space-y-2">
                {TEMPLATES.map((t) => (
                  <button key={t.label} onClick={() => setMessage(t.text)} className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-left text-xs transition hover:border-green-300 hover:bg-green-50">
                    <div className="font-semibold text-slate-800">{t.label}</div>
                    <div className="mt-1 line-clamp-2 text-slate-500">{t.text}</div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-sky-600" /> Recent Leads</h3>
              <div className="max-h-72 space-y-1.5 overflow-y-auto">
                {leads.length === 0 && <div className="text-xs text-slate-400">No leads yet.</div>}
                {leads.slice(0, 20).map((l) => (
                  <button key={l.id} onClick={() => { setPhone(l.phone); setName(l.full_name ?? l.lead_name ?? "Customer"); }} className="flex w-full items-center justify-between rounded-lg border border-slate-100 p-2 text-left text-xs hover:border-sky-300 hover:bg-sky-50">
                    <div>
                      <div className="font-medium text-slate-800">{l.full_name ?? l.lead_name}</div>
                      <div className="text-slate-500">{l.phone}</div>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">Use</Badge>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
