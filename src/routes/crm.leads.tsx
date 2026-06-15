import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Search, MessageCircle, Sparkles, StickyNote, CheckCircle2, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crm/leads")({ component: LeadsPage });


const LEAD_STAGES = ["New", "Qualified", "Approved", "Rejected", "Disbursed", "Closed"] as const;
type Stage = (typeof LEAD_STAGES)[number];

// Distinct, non-overlapping color per stage
const STAGE_STYLES: Record<Stage, { trigger: string; dot: string; option: string }> = {
  New:       { trigger: "border-sky-300 bg-sky-50 text-sky-700",          dot: "bg-sky-500",     option: "text-sky-700" },
  Qualified: { trigger: "border-violet-300 bg-violet-50 text-violet-700", dot: "bg-violet-500",  option: "text-violet-700" },
  Approved:  { trigger: "border-emerald-300 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", option: "text-emerald-700" },
  Rejected:  { trigger: "border-rose-300 bg-rose-50 text-rose-700",       dot: "bg-rose-500",    option: "text-rose-700" },
  Disbursed: { trigger: "border-amber-300 bg-amber-50 text-amber-700",    dot: "bg-amber-500",   option: "text-amber-700" },
  Closed:    { trigger: "border-slate-300 bg-slate-100 text-slate-700",   dot: "bg-slate-500",   option: "text-slate-700" },
};

const PRODUCT_TYPES = ["loan", "insurance", "mutual_fund"] as const;
const LEAD_SOURCES = ["Website", "Referral", "Walk-in", "Campaign", "Cold Call", "Partner"] as const;

const LOAN_TYPES = [
  "Home Loan", "Personal Loan", "Business Loan", "Car / Vehicle Loan",
  "Education Loan", "Loan Against Property", "Gold Loan", "Project Loan", "Credit Card",
] as const;

const SUB_LOAN_TYPES: Record<string, string[]> = {
  "Home Loan": ["Home Purchase", "Home Construction", "Plot Purchase", "Home Improvement", "Balance Transfer", "Top-up Loan"],
  "Personal Loan": ["Salaried", "Self-Employed", "Wedding", "Travel", "Medical Emergency", "Debt Consolidation"],
  "Business Loan": ["Working Capital", "Term Loan", "Machinery Loan", "MSME", "Overdraft", "Invoice Discounting"],
  "Car / Vehicle Loan": ["New Car", "Used Car", "Two Wheeler", "Commercial Vehicle"],
  "Education Loan": ["Study in India", "Study Abroad", "Skill Development"],
  "Loan Against Property": ["Residential Property", "Commercial Property", "Industrial Property"],
  "Gold Loan": ["Personal Gold Loan", "Agriculture Gold Loan"],
  "Project Loan": ["Infrastructure", "Real Estate", "Renewable Energy"],
  "Credit Card": ["Regular", "Premium", "Business", "Travel Card"],
};

const BANK_OPTIONS = [
  "HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank",
  "IDFC First Bank", "Yes Bank", "IndusInd Bank", "Punjab National Bank", "Bank of Baroda",
  "Canara Bank", "Union Bank of India", "Federal Bank", "RBL Bank", "Bajaj Finserv",
  "Tata Capital", "Aditya Birla Finance", "L&T Finance", "Mahindra Finance", "IDBI Bank",
  "Piramal Finance", "DCB Bank", "Karnataka Bank", "South Indian Bank",
];

type Lead = {
  id: string;
  lead_name: string | null;
  full_name: string | null;
  phone: string;
  email: string | null;
  pan: string | null;
  city: string | null;
  state: string | null;
  product_type: string;
  lead_source: string | null;
  status: string;
  assigned_to: string | null;
  created_at: string;
  cibil_score: number | null;
  loan_type: string | null;
  loan_sub_type: string | null;
  loan_amount: number | null;
  bank_name: string | null;
};

type Staff = { id: string; full_name: string | null; email: string | null; role: string };

function normaliseStage(s: string): Stage {
  if ((LEAD_STAGES as readonly string[]).includes(s)) return s as Stage;
  // Map legacy stages to the new simplified set
  if (s === "Contacted") return "New";
  if (s === "Docs Pending" || s === "Login Ready") return "Qualified";
  if (s === "Sanction Pending") return "Approved";
  if (s === "Converted") return "Disbursed";
  if (s === "Rejected") return "Rejected";
  return "New";
}

function cibilBadge(score: number | null) {
  if (score == null) return "bg-slate-100 text-slate-500 border-slate-200";
  if (score >= 750) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 650) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

function LeadsPage() {
  const { user, isAdmin } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [noteLead, setNoteLead] = useState<Lead | null>(null);


  const load = async () => {
    setLoading(true);
    const [{ data, error }, roles] = await Promise.all([
      supabase
        .from("leads")
        .select("id, lead_name, full_name, phone, email, pan, city, state, product_type, lead_source, status, assigned_to, created_at, cibil_score, loan_type, loan_sub_type, loan_amount, bank_name")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    if (error) toast.error(error.message);
    setLeads((data ?? []) as Lead[]);

    const ids = (roles.data ?? []).map((r: { user_id: string }) => r.user_id);
    if (ids.length) {
      const { data: profs } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", ids);
      const byId = new Map((profs ?? []).map((p) => [p.id, p]));
      setStaff(
        (roles.data ?? []).map((r: { user_id: string; role: string }) => ({
          id: r.user_id,
          full_name: byId.get(r.user_id)?.full_name ?? null,
          email: byId.get(r.user_id)?.email ?? null,
          role: r.role,
        })),
      );
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = leads.filter((l) => {
    const term = filter.toLowerCase();
    const stage = normaliseStage(l.status);
    const matchesText =
      !term ||
      (l.lead_name ?? l.full_name ?? "").toLowerCase().includes(term) ||
      l.phone.includes(term) ||
      (l.email ?? "").toLowerCase().includes(term) ||
      (l.pan ?? "").toLowerCase().includes(term);
    const matchesStage = stageFilter === "all" || stage === stageFilter;
    const matchesAssignee =
      assigneeFilter === "all" ||
      (assigneeFilter === "unassigned" ? !l.assigned_to : l.assigned_to === assigneeFilter);
    // Admin sees partner-sourced leads ONLY if assigned to them.
    const partnerVisible =
      !isAdmin || (l.lead_source ?? "").toLowerCase() !== "partner" || (!!user && l.assigned_to === user.id);
    return matchesText && matchesStage && matchesAssignee && partnerVisible;
  });


  const stageCounts = LEAD_STAGES.reduce<Record<Stage, number>>((acc, s) => {
    acc[s] = leads.filter((l) => normaliseStage(l.status) === s).length;
    return acc;
  }, { New: 0, Qualified: 0, Approved: 0, Rejected: 0, Disbursed: 0, Closed: 0 });

  const staffLabel = (id: string | null) => {
    if (!id) return "Unassigned";
    const s = staff.find((x) => x.id === id);
    return s?.full_name || s?.email || "Staff";
  };

  const updateAssignee = async (lead: Lead, value: string) => {
    const newId = value === "unassigned" ? null : value;
    const { error } = await supabase.from("leads").update({ assigned_to: newId }).eq("id", lead.id);
    if (error) return toast.error(error.message);
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, assigned_to: newId } : l)));
    toast.success(`Assigned → ${staffLabel(newId)}`);
  };

  const updateStage = async (lead: Lead, status: Stage) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", lead.id);
    if (error) return toast.error(error.message);
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    toast.success(`Stage → ${status}`);

    if (status === "Approved") {
      const { data: existing } = await supabase
        .from("customers")
        .select("id")
        .eq("lead_id", lead.id)
        .maybeSingle();
      if (!existing) {
        await supabase.from("customers").insert({
          customer_name: lead.lead_name ?? lead.full_name ?? "Unnamed",
          mobile: lead.phone,
          email: lead.email,
          pan: lead.pan,
          address: [lead.city, lead.state].filter(Boolean).join(", ") || null,
          lead_id: lead.id,
          loan_type: lead.loan_type,
          loan_sub_type: lead.loan_sub_type,
          loan_amount: lead.loan_amount,
          cibil_score: lead.cibil_score,
          stage: "Docs Pending",
        });
        toast.success("Approved → Customer created");
      }
    }
  };

  const approve = (lead: Lead) => updateStage(lead, "Approved");
  const reject = (lead: Lead) => updateStage(lead, "Rejected");

  return (
    <div className="space-y-4">
      {/* Compact hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md shadow-sky-500/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Leads Pipeline</div>
              <div className="text-[11px] text-white/80">{leads.length} total · {filtered.length} shown · WhatsApp ready</div>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-sky-700 shadow-md hover:bg-sky-50">
                <Plus className="mr-2 h-4 w-4" /> New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <NewLeadForm onSaved={() => { setOpen(false); load(); }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stage pills (counts) */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
        {LEAD_STAGES.map((s) => {
          const st = STAGE_STYLES[s];
          const active = stageFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStageFilter(active ? "all" : s)}
              className={cn(
                "flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-left text-xs shadow-sm transition-all hover:-translate-y-0.5 hover:shadow",
                active ? "ring-2 ring-offset-1 " + st.trigger : "border-slate-200",
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", st.dot)} />
                <span className="font-medium text-slate-700">{s}</span>
              </div>
              <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", st.trigger)}>{stageCounts[s]}</span>
            </button>
          );
        })}
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search name, phone, email, PAN…" value={filter} onChange={(e) => setFilter(e.target.value)} className="pl-9" />
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[170px] bg-white"><SelectValue placeholder="Stage" /></SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All stages</SelectItem>
              {LEAD_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-[200px] bg-white"><SelectValue placeholder="Assignee" /></SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All assignees</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {staff.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {(s.full_name || s.email || "Staff")} · {s.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No leads match your filters.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>CIBIL</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => {
                const stage = normaliseStage(l.status);
                const st = STAGE_STYLES[stage];
                const canDecide = stage !== "Approved" && stage !== "Rejected" && stage !== "Disbursed" && stage !== "Closed";
                return (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">
                      {l.lead_name ?? l.full_name ?? "—"}
                      {l.email && <div className="text-xs text-slate-500">{l.email}</div>}
                    </TableCell>
                    <TableCell className="text-sm">{l.phone}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-800">{l.loan_type ?? (l.product_type ?? "").replace(/_/g, " ")}</div>
                      {l.loan_sub_type && <div className="text-xs text-slate-500">{l.loan_sub_type}</div>}
                    </TableCell>
                    <TableCell className="text-sm">
                      {l.loan_amount ? `₹${Number(l.loan_amount).toLocaleString("en-IN")}` : "—"}
                    </TableCell>
                    <TableCell>
                      <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", cibilBadge(l.cibil_score))}>
                        {l.cibil_score ?? "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold", st.trigger)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} /> {stage}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select value={l.assigned_to ?? "unassigned"} onValueChange={(v) => updateAssignee(l, v)}>
                        <SelectTrigger className="h-8 w-[150px] bg-white">
                          <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {staff.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {(s.full_name || s.email || "Staff")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {canDecide && (
                          <>
                            <Button
                              size="sm"
                              className="h-8 bg-emerald-600 text-white hover:bg-emerald-700"
                              onClick={() => approve(l)}
                              title="Approve lead → push to Customers"
                            >
                              <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                              onClick={() => reject(l)}
                              title="Reject lead"
                            >
                              <XCircle className="mr-1 h-3.5 w-3.5" /> Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                          title="Notes"
                          onClick={() => setNoteLead(l)}
                        >
                          <StickyNote className="h-3.5 w-3.5" />
                        </Button>
                        <a
                          href={`https://wa.me/${(l.phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${l.lead_name ?? l.full_name ?? "there"}, this is from Aarthvaahini. Following up on your ${(l.loan_type ?? l.product_type ?? "").replace(/_/g, " ")} enquiry.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp"
                        >
                          <Button size="sm" variant="outline" className="h-8 border-green-200 bg-green-50 text-green-700 hover:bg-green-100">
                            <MessageCircle className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Notes dialog */}
      <Dialog open={!!noteLead} onOpenChange={(v) => !v && setNoteLead(null)}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Notes — {noteLead?.lead_name ?? noteLead?.full_name}</DialogTitle>
          </DialogHeader>
          {noteLead && <LeadNotes lead={noteLead} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}


function NewLeadForm({ onSaved }: { onSaved: () => void }) {
  const [f, setF] = useState({
    lead_name: "", phone: "", email: "", pan: "", aadhaar: "", city: "", state: "",
    product_type: "loan", lead_source: "Website",
    loan_type: "", loan_sub_type: "", loan_amount: "", cibil_score: "",
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("leads").insert({
      lead_name: f.lead_name, full_name: f.lead_name, phone: f.phone,
      email: f.email || null, pan: f.pan || null, aadhaar: f.aadhaar || null,
      city: f.city || null, state: f.state || null,
      product_type: f.product_type, lead_source: f.lead_source, status: "New",
      loan_type: f.loan_type || null,
      loan_sub_type: f.loan_sub_type || null,
      loan_amount: f.loan_amount ? Number(f.loan_amount) : null,
      amount: f.loan_amount ? Number(f.loan_amount) : null,
      cibil_score: f.cibil_score ? Number(f.cibil_score) : null,
      product_name: f.loan_sub_type || f.loan_type || null,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Lead created");
    onSaved();
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-3">
      <Field label="Lead Name *"><Input required className="border-sky-200 focus-visible:ring-sky-400" value={f.lead_name} onChange={(e) => setF({ ...f, lead_name: e.target.value })} /></Field>
      <Field label="Mobile *"><Input required className="border-rose-200 focus-visible:ring-rose-400" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
      <Field label="Email"><Input type="email" className="border-cyan-200 focus-visible:ring-cyan-400" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
      <Field label="PAN"><Input className="border-amber-200 focus-visible:ring-amber-400" value={f.pan} onChange={(e) => setF({ ...f, pan: e.target.value.toUpperCase() })} /></Field>
      <Field label="Aadhaar"><Input className="border-emerald-200 focus-visible:ring-emerald-400" value={f.aadhaar} onChange={(e) => setF({ ...f, aadhaar: e.target.value })} /></Field>
      <Field label="City"><Input className="border-blue-200 focus-visible:ring-blue-400" value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} /></Field>
      <Field label="State"><Input className="border-indigo-200 focus-visible:ring-indigo-400" value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })} /></Field>
      <Field label="Product Interest">
        <Select value={f.product_type} onValueChange={(v) => setF({ ...f, product_type: v })}>
          <SelectTrigger className="border-violet-200 focus:ring-violet-400"><SelectValue /></SelectTrigger>
          <SelectContent className="bg-white">
            {PRODUCT_TYPES.map((p) => <SelectItem key={p} value={p} className="capitalize">{p.replace(/_/g, " ")}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Lead Source">
        <Select value={f.lead_source} onValueChange={(v) => setF({ ...f, lead_source: v })}>
          <SelectTrigger className="border-pink-200 focus:ring-pink-400"><SelectValue /></SelectTrigger>
          <SelectContent className="bg-white">{LEAD_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      <Field label="Loan Type">
        <Select value={f.loan_type} onValueChange={(v) => setF({ ...f, loan_type: v })}>
          <SelectTrigger className="border-blue-200 focus:ring-blue-400"><SelectValue placeholder="Choose loan type" /></SelectTrigger>
          <SelectContent className="bg-white">
            {LOAN_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Sub Loan Type"><Input className="border-blue-200 focus-visible:ring-blue-400" placeholder="e.g. Home Purchase" value={f.loan_sub_type} onChange={(e) => setF({ ...f, loan_sub_type: e.target.value })} /></Field>
      <Field label="Loan Amount (₹)"><Input type="number" className="border-emerald-200 focus-visible:ring-emerald-400" placeholder="500000" value={f.loan_amount} onChange={(e) => setF({ ...f, loan_amount: e.target.value })} /></Field>
      <Field label="CIBIL Score"><Input type="number" min={300} max={900} className="border-amber-200 focus-visible:ring-amber-400" placeholder="750" value={f.cibil_score} onChange={(e) => setF({ ...f, cibil_score: e.target.value })} /></Field>

      <div className="col-span-2 mt-2 flex justify-end">
        <Button type="submit" disabled={saving} className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 text-white shadow-md hover:opacity-90">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Lead
        </Button>
      </div>
    </form>
  );
}

function LeadNotes({ lead }: { lead: Lead }) {
  const [notes, setNotes] = useState<{ id: string; notes: string | null; created_at: string }[]>([]);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("activities")
      .select("id, notes, created_at")
      .eq("lead_id", lead.id)
      .eq("activity_type", "note")
      .order("created_at", { ascending: false })
      .limit(50);
    setNotes(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [lead.id]);

  const add = async () => {
    if (!text.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("activities").insert({
      lead_id: lead.id,
      activity_type: "note",
      notes: text.trim(),
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    setText("");
    toast.success("Note added");
    load();
  };

  return (
    <div className="space-y-3">
      <Textarea
        rows={3}
        placeholder="Add a follow-up note (call summary, next action, document pending…)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-amber-200 focus-visible:ring-amber-400"
      />
      <div className="flex justify-end">
        <Button onClick={add} disabled={saving || !text.trim()} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          {saving && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />} Save Note
        </Button>
      </div>
      <div className="max-h-64 space-y-2 overflow-auto pr-1">
        {loading ? (
          <div className="py-3 text-center"><Loader2 className="mx-auto h-4 w-4 animate-spin text-slate-400" /></div>
        ) : notes.length === 0 ? (
          <p className="py-2 text-center text-xs text-slate-400">No notes yet for this lead.</p>
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
  );
}


function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label className="text-xs">{label}</Label><div className="mt-1">{children}</div></div>;
}
