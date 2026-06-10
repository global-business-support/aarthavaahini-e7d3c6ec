import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  Upload, FileSpreadsheet, Trash2, PlayCircle, CheckCircle2, XCircle,
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

type BulkRow = {
  phone: string;
  name: string;
  message?: string;
  status: "pending" | "sending" | "sent" | "failed";
  error?: string;
  sid?: string;
};

function WhatsAppPage() {
  const { user, isAdmin, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("Customer");
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [useTwilio, setUseTwilio] = useState(true);
  const [sending, setSending] = useState(false);
  const [bulk, setBulk] = useState<BulkRow[]>([]);
  const [bulkRunning, setBulkRunning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
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

  const sendOne = async (to: string, body: string) => {
    const normalised = to.startsWith("+") ? to.replace(/\s/g, "") : `+${to.replace(/\D/g, "")}`;
    return sendFn({ data: { to: normalised, body } });
  };

  const send = async () => {
    if (!cleanPhone || !finalMsg) { toast.error("Enter phone and message"); return; }
    if (!useTwilio) {
      if (waLink) { window.open(waLink, "_blank"); toast.success("Opening WhatsApp…"); }
      return;
    }
    setSending(true);
    try {
      const res = await sendOne(phone, finalMsg);
      toast.success(`Sent via Twilio · ${res.sid?.slice(0, 10) ?? ""}…`);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Send failed");
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

  const downloadSampleTemplate = () => {
    const sample = [
      { phone: "+919876543210", name: "Ravi Sharma", message: "" },
      { phone: "+919812345678", name: "Anita Verma", message: "Custom message here (optional)" },
    ];
    const ws = XLSX.utils.json_to_sheet(sample);
    ws["!cols"] = [{ wch: 18 }, { wch: 22 }, { wch: 50 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Recipients");
    XLSX.writeFile(wb, "whatsapp-bulk-template.xlsx");
  };

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
      const parsed: BulkRow[] = rows
        .map((r) => {
          const phoneRaw = String(r.phone ?? r.Phone ?? r.mobile ?? r.Mobile ?? "").trim();
          const nm = String(r.name ?? r.Name ?? r.full_name ?? "").trim() || "Customer";
          const msg = String(r.message ?? r.Message ?? "").trim();
          return { phone: phoneRaw, name: nm, message: msg, status: "pending" as const };
        })
        .filter((r) => r.phone);
      if (parsed.length === 0) {
        toast.error("No valid rows. Expected columns: phone, name, message (optional).");
        return;
      }
      setBulk(parsed);
      toast.success(`Loaded ${parsed.length} recipients`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to parse file");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const importFromLeads = () => {
    if (leads.length === 0) { toast.error("No leads"); return; }
    const parsed: BulkRow[] = leads.slice(0, 100).map((l) => ({
      phone: l.phone,
      name: l.lead_name ?? l.full_name ?? "Customer",
      message: "",
      status: "pending",
    }));
    setBulk(parsed);
    toast.success(`Loaded ${parsed.length} recipients from recent leads`);
  };

  const runBulk = async () => {
    if (bulk.length === 0) return;
    if (!useTwilio) { toast.error("Switch to Twilio API to send bulk messages"); return; }
    if (!message.trim() && bulk.every((b) => !b.message?.trim())) {
      toast.error("Add a template message or message column in the sheet");
      return;
    }
    setBulkRunning(true);
    for (let i = 0; i < bulk.length; i++) {
      const row = bulk[i];
      setBulk((prev) => prev.map((r, idx) => idx === i ? { ...r, status: "sending" } : r));
      const body = (row.message && row.message.trim() ? row.message : message).replace(/\{\{name\}\}/gi, row.name || "Customer");
      try {
        const res = await sendOne(row.phone, body);
        setBulk((prev) => prev.map((r, idx) => idx === i ? { ...r, status: "sent", sid: res.sid } : r));
      } catch (e: unknown) {
        setBulk((prev) => prev.map((r, idx) => idx === i ? { ...r, status: "failed", error: e instanceof Error ? e.message : "Failed" } : r));
      }
      // throttle ~250ms to be polite
      await new Promise((r) => setTimeout(r, 250));
    }
    setBulkRunning(false);
    toast.success("Bulk send complete");
  };

  const sentCount = bulk.filter((b) => b.status === "sent").length;
  const failCount = bulk.filter((b) => b.status === "failed").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"><ArrowLeft className="h-3 w-3" /> Back to Admin</Link>
            <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">WhatsApp Sender</h1>
            <p className="text-sm text-slate-500">Send single or bulk WhatsApp messages directly via Twilio.</p>
          </div>
          <Button onClick={downloadLeadsExcel} variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
            <Download className="mr-2 h-4 w-4" /> Download Leads (Excel)
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Composer */}
          <Card className="lg:col-span-2 bg-white p-6">
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

            {/* Bulk uploader */}
            <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-sky-900">
                  <FileSpreadsheet className="h-4 w-4 text-sky-600" /> Bulk Send (Excel)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="border-sky-300 bg-white text-sky-700 hover:bg-sky-100" onClick={() => fileRef.current?.click()}>
                    <Upload className="mr-1 h-3.5 w-3.5" /> Upload .xlsx
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-300 bg-white text-slate-700" onClick={downloadSampleTemplate}>
                    <Download className="mr-1 h-3.5 w-3.5" /> Sample
                  </Button>
                  <Button size="sm" variant="outline" className="border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50" onClick={importFromLeads}>
                    <Users className="mr-1 h-3.5 w-3.5" /> Import Leads
                  </Button>
                  <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" hidden onChange={onPickFile} />
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Sheet columns: <b>phone</b>, <b>name</b>, optional <b>message</b>. If <b>message</b> is empty, the composer template above is used.
              </p>

              {bulk.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-slate-600">
                      <b>{bulk.length}</b> recipients · <span className="text-emerald-600">{sentCount} sent</span> · <span className="text-rose-600">{failCount} failed</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-slate-300 bg-white text-slate-600" onClick={() => setBulk([])} disabled={bulkRunning}>
                        <Trash2 className="mr-1 h-3.5 w-3.5" /> Clear
                      </Button>
                      <Button size="sm" onClick={runBulk} disabled={bulkRunning || !useTwilio} className="bg-sky-600 text-white hover:bg-sky-700">
                        {bulkRunning ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <PlayCircle className="mr-1 h-3.5 w-3.5" />}
                        Send to all
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-auto rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 text-left text-[10px] uppercase text-slate-500">
                        <tr><th className="px-3 py-2">Phone</th><th className="px-3 py-2">Name</th><th className="px-3 py-2">Status</th></tr>
                      </thead>
                      <tbody>
                        {bulk.map((b, i) => (
                          <tr key={i} className="border-t border-slate-100">
                            <td className="px-3 py-1.5 font-mono text-slate-700">{b.phone}</td>
                            <td className="px-3 py-1.5 text-slate-700">{b.name}</td>
                            <td className="px-3 py-1.5">
                              {b.status === "pending" && <span className="text-slate-400">Pending</span>}
                              {b.status === "sending" && <span className="inline-flex items-center gap-1 text-sky-600"><Loader2 className="h-3 w-3 animate-spin" /> Sending</span>}
                              {b.status === "sent" && <span className="inline-flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Sent</span>}
                              {b.status === "failed" && <span className="inline-flex items-center gap-1 text-rose-600" title={b.error}><XCircle className="h-3 w-3" /> Failed</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Templates + Recent Leads */}
          <div className="space-y-4">
            <Card className="bg-white p-5">
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

            <Card className="bg-white p-5">
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
