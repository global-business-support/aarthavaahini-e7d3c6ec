import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, StickyNote, Phone, Mail, MapPin, Briefcase, IndianRupee, User2, Search } from "lucide-react";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/crm/customers")({ component: CustomersPage });

const CUSTOMER_STAGES = ["New", "Docs Pending", "Login", "Sanction", "Disbursement", "Closed"] as const;
type Stage = (typeof CUSTOMER_STAGES)[number];

const STAGE_COLOR: Record<Stage, string> = {
  "New":          "border-sky-300 bg-sky-50 text-sky-700",
  "Docs Pending": "border-violet-300 bg-violet-50 text-violet-700",
  "Login":        "border-indigo-300 bg-indigo-50 text-indigo-700",
  "Sanction":     "border-amber-300 bg-amber-50 text-amber-700",
  "Disbursement": "border-emerald-300 bg-emerald-50 text-emerald-700",
  "Closed":       "border-slate-300 bg-slate-100 text-slate-700",
};

type Row = {
  id: string;
  customer_name: string;
  mobile: string | null;
  email: string | null;
  pan: string | null;
  aadhaar: string | null;
  address: string | null;
  occupation: string | null;
  income: number | null;
  created_at: string;
  lead_id: string | null;
  loan_type: string | null;
  loan_sub_type: string | null;
  loan_amount: number | null;
  cibil_score: number | null;
  stage: string;
  bank_name: string | null;
  note: string | null;
};

const BANK_OPTIONS = [
  "HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank",
  "IDFC First Bank", "Yes Bank", "IndusInd Bank", "Punjab National Bank", "Bank of Baroda",
  "Canara Bank", "Union Bank of India", "Federal Bank", "RBL Bank", "Bajaj Finserv",
  "Tata Capital", "Aditya Birla Finance", "L&T Finance", "Mahindra Finance", "IDBI Bank",
  "Piramal Finance", "DCB Bank", "Karnataka Bank", "South Indian Bank",
];

type Note = { id: string; notes: string | null; created_at: string };

function normaliseStage(s: string | null | undefined): Stage {
  if (!s) return "New";
  if ((CUSTOMER_STAGES as readonly string[]).includes(s)) return s as Stage;
  return "New";
}

function cibilBadge(score: number | null) {
  if (score == null) return "bg-slate-100 text-slate-500 border-slate-200";
  if (score >= 750) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 650) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

function CustomersPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Row | null>(null);
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(500);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await load();
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const initial = url.searchParams.get("q") ?? "";
        if (initial) setQ(initial);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      (r.customer_name ?? "").toLowerCase().includes(term) ||
      (r.mobile ?? "").toLowerCase().includes(term) ||
      (r.email ?? "").toLowerCase().includes(term) ||
      (r.pan ?? "").toLowerCase().includes(term) ||
      (r.loan_type ?? "").toLowerCase().includes(term),
    );
  }, [q, rows]);

  const updateStage = async (row: Row, stage: Stage) => {
    const { error } = await supabase.from("customers").update({ stage }).eq("id", row.id);
    if (error) return toast.error(error.message);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, stage } : r)));
    toast.success(`Stage → ${stage}`);

    if (stage === "Closed") {
      // Push to loan_cases (avoid duplicates by checking on customer_id)
      const { data: existing } = await supabase
        .from("loan_cases")
        .select("id")
        .eq("customer_id", row.id)
        .maybeSingle();
      if (!existing) {
        const { error: e2 } = await supabase.from("loan_cases").insert({
          customer_id: row.id,
          loan_type: row.loan_type ?? row.loan_sub_type ?? "Loan",
          loan_amount: row.loan_amount,
          stage: "Completed",
        });
        if (e2) toast.error(e2.message);
        else toast.success("Closed → Loan case created");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md shadow-sky-500/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20"><User2 className="h-4 w-4" /></div>
          <div>
            <div className="text-sm font-semibold">Customers</div>
            <div className="text-[11px] text-white/80">{rows.length} customers · Approved leads from Leads · close to push into Loans</div>
          </div>
        </div>
      </div>

      <Card className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, mobile, email, PAN, loan type…"
            className="pl-9"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">{rows.length === 0 ? "No customers yet — approve a lead first." : "No customers match your search."}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>CIBIL</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="min-w-[220px]">Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => {
                const stage = normaliseStage(r.stage);
                return (
                  <TableRow key={r.id} className="hover:bg-sky-50/60 align-top">
                    <TableCell className="font-medium">
                      <button className="text-sky-700 hover:underline" onClick={() => setActive(r)}>{r.customer_name}</button>
                      {r.email && <div className="text-xs text-slate-500">{r.email}</div>}
                    </TableCell>
                    <TableCell>{r.mobile ?? "—"}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-800">{r.loan_type ?? "—"}</div>
                      {r.loan_sub_type && <div className="text-xs text-slate-500">{r.loan_sub_type}</div>}
                    </TableCell>
                    <TableCell>{r.loan_amount ? `₹${Number(r.loan_amount).toLocaleString("en-IN")}` : "—"}</TableCell>
                    <TableCell>
                      <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", cibilBadge(r.cibil_score))}>
                        {r.cibil_score ?? "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={r.bank_name ?? "none"}
                        onValueChange={async (v) => {
                          const bn = v === "none" ? null : v;
                          const { error } = await supabase.from("customers").update({ bank_name: bn }).eq("id", r.id);
                          if (error) return toast.error(error.message);
                          setRows((p) => p.map((x) => (x.id === r.id ? { ...x, bank_name: bn } : x)));
                          toast.success(bn ? `Bank → ${bn}` : "Bank cleared");
                        }}
                      >
                        <SelectTrigger className="h-8 w-[150px] bg-white">
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-72">
                          <SelectItem value="none">— None —</SelectItem>
                          {BANK_OPTIONS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={stage} onValueChange={(v) => updateStage(r, v as Stage)}>
                        <SelectTrigger className={cn("h-8 w-[160px] font-semibold bg-white", STAGE_COLOR[stage])}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {CUSTOMER_STAGES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <NoteCell
                        row={r}
                        onSaved={(text) =>
                          setRows((p) => p.map((x) => (x.id === r.id ? { ...x, note: text } : x)))
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-sky-700">{active?.customer_name}</DialogTitle>
          </DialogHeader>
          {active && <CustomerDetails customer={active} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CustomerDetails({ customer }: { customer: Row }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    const { data } = await supabase
      .from("activities")
      .select("id, notes, created_at")
      .eq("customer_id", customer.id)
      .eq("activity_type", "note")
      .order("created_at", { ascending: false })
      .limit(50);
    setNotes((data ?? []) as Note[]);
    setLoading(false);
  };

  useEffect(() => { reload(); }, [customer.id]);

  const addNote = async () => {
    if (!noteText.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("activities").insert({
      customer_id: customer.id,
      lead_id: customer.lead_id,
      activity_type: "note",
      notes: noteText.trim(),
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    setNoteText("");
    toast.success("Note added");
    reload();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 rounded-lg border border-sky-100 bg-sky-50/40 p-4 text-sm">
        <Detail icon={Phone} label="Mobile" value={customer.mobile} />
        <Detail icon={Mail} label="Email" value={customer.email} />
        <Detail label="Loan Type" value={customer.loan_type} />
        <Detail label="Sub Loan" value={customer.loan_sub_type} />
        <Detail icon={IndianRupee} label="Loan Amount" value={customer.loan_amount ? `₹${Number(customer.loan_amount).toLocaleString("en-IN")}` : null} />
        <Detail label="CIBIL Score" value={customer.cibil_score ? String(customer.cibil_score) : null} />
        <Detail icon={Briefcase} label="Occupation" value={customer.occupation} />
        <Detail icon={IndianRupee} label="Income" value={customer.income ? `₹${Number(customer.income).toLocaleString("en-IN")}` : null} />
        <Detail icon={MapPin} label="Address" value={customer.address} full />
        <Detail label="PAN" value={customer.pan} />
        <Detail label="Aadhaar" value={customer.aadhaar} />
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <StickyNote className="h-4 w-4 text-amber-500" /> Notes
        </div>
        <div className="space-y-2">
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note about this customer (KYC pending, follow-up next week, etc.)…"
            className="border-sky-200 focus-visible:ring-sky-400"
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={addNote} disabled={saving || !noteText.trim()} className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
              {saving && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />} Save Note
            </Button>
          </div>
        </div>

        <div className="mt-3 max-h-48 space-y-2 overflow-auto pr-1">
          {loading ? (
            <div className="py-4 text-center"><Loader2 className="mx-auto h-4 w-4 animate-spin text-slate-400" /></div>
          ) : notes.length === 0 ? (
            <p className="py-2 text-center text-xs text-slate-400">No notes yet.</p>
          ) : (
            notes.map((n) => (
              <div key={n.id} className="rounded-lg border border-amber-100 bg-amber-50/60 p-3 text-sm">
                <div className="whitespace-pre-wrap text-slate-800">{n.notes}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
                  {new Date(n.created_at).toLocaleString("en-IN")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value, full }: { icon?: React.ComponentType<{ className?: string }>; label: string; value: string | null; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {Icon && <Icon className="h-3 w-3" />} {label}
      </div>
      <div className="mt-0.5 text-sm text-slate-800">{value || "—"}</div>
    </div>
  );
}

function NoteCell({ row, onSaved }: { row: Row; onSaved: (text: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(row.note ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const trimmed = text.trim();
    const { error } = await supabase.from("customers").update({ note: trimmed || null }).eq("id", row.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    onSaved(trimmed);
    setEditing(false);
    toast.success("Note saved");
  };

  if (editing) {
    return (
      <div className="space-y-1.5">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Quick note about this customer…"
          className="border-amber-300 focus-visible:ring-amber-400 text-sm"
          autoFocus
        />
        <div className="flex justify-end gap-1.5">
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => { setText(row.note ?? ""); setEditing(false); }}>
            Cancel
          </Button>
          <Button size="sm" disabled={saving} onClick={save} className="h-7 bg-amber-500 px-2 text-xs text-white hover:bg-amber-600">
            {saving && <Loader2 className="mr-1 h-3 w-3 animate-spin" />} Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={cn(
        "group block w-full rounded-md border px-2 py-1.5 text-left text-xs transition",
        row.note
          ? "border-amber-200 bg-amber-50/60 text-slate-800 hover:bg-amber-50"
          : "border-dashed border-slate-300 bg-white text-slate-400 hover:border-amber-300 hover:text-amber-700",
      )}
      title="Click to edit note"
    >
      {row.note ? (
        <span className="line-clamp-2 whitespace-pre-wrap">{row.note}</span>
      ) : (
        <span>+ Add note</span>
      )}
    </button>
  );
}
