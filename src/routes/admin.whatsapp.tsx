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
import { Loader2, MessageCircle, ArrowLeft, Send, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";

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

function WhatsAppPage() {
  const { user, isAdmin, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("Customer");
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Array<{ id: string; full_name: string; phone: string }>>([]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("leads").select("id, full_name, phone").order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => setLeads((data as any) ?? []));
  }, [isAdmin]);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!user || !isAdmin) {
    return (<div className="min-h-screen"><Header /><div className="container mx-auto px-6 py-32 text-center"><h1 className="font-display text-3xl font-bold">Access Denied</h1></div><Footer /></div>);
  }

  const finalMsg = message.replace(/\{\{name\}\}/gi, name || "Customer");
  const cleanPhone = phone.replace(/\D/g, "");
  const waLink = cleanPhone && finalMsg ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}` : null;

  const send = () => {
    if (!waLink) { toast.error("Enter phone and message"); return; }
    window.open(waLink, "_blank");
    toast.success("Opening WhatsApp…");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"><ArrowLeft className="h-3 w-3" /> Back to Admin</Link>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">WhatsApp Sender</h1>
          <p className="text-sm text-slate-500">Send unlimited WhatsApp messages from your own account. No API limits, no charges.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Composer */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><MessageCircle className="h-4 w-4 text-green-600" /> Compose Message</h2>
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
              <Button onClick={send} disabled={!waLink} className="w-fit bg-green-600 text-white hover:bg-green-700">
                <Send className="mr-2 h-4 w-4" /> Open in WhatsApp
              </Button>
              <p className="text-xs text-slate-500">Opens WhatsApp Web/App with the message pre-filled. Send unlimited messages from your own number — no API limits or charges.</p>
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
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Users className="h-4 w-4 text-blue-600" /> Recent Leads</h3>
              <div className="max-h-72 space-y-1.5 overflow-y-auto">
                {leads.length === 0 && <div className="text-xs text-slate-400">No leads yet.</div>}
                {leads.map((l) => (
                  <button key={l.id} onClick={() => { setPhone(l.phone); setName(l.full_name); }} className="flex w-full items-center justify-between rounded-lg border border-slate-100 p-2 text-left text-xs hover:border-blue-300 hover:bg-blue-50">
                    <div>
                      <div className="font-medium text-slate-800">{l.full_name}</div>
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
