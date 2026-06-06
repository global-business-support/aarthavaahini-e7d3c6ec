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
import { Loader2, Plus, Search, ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/crm/leads")({
  component: LeadsPage,
});

const LEAD_STAGES = [
  "New",
  "Contacted",
  "Qualified",
  "Docs Pending",
  "Login Ready",
  "Sanction Pending",
  "Disbursed",
  "Converted",
  "Closed",
] as const;

const PRODUCT_TYPES = ["loan", "insurance", "mutual_fund", "banking"] as const;
const LEAD_SOURCES = ["Website", "Referral", "Walk-in", "Campaign", "Cold Call", "Partner"] as const;

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
  created_at: string;
};

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [convertLead, setConvertLead] = useState<Lead | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, lead_name, full_name, phone, email, pan, city, state, product_type, lead_source, status, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) toast.error(error.message);
    setLeads((data ?? []) as Lead[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = leads.filter((l) => {
    const term = filter.toLowerCase();
    const matchesText =
      !term ||
      (l.lead_name ?? l.full_name ?? "").toLowerCase().includes(term) ||
      l.phone.includes(term) ||
      (l.email ?? "").toLowerCase().includes(term) ||
      (l.pan ?? "").toLowerCase().includes(term);
    const matchesStage = stageFilter === "all" || l.status === stageFilter;
    return matchesText && matchesStage;
  });

  const updateStage = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Stage updated");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500">{leads.length} total · {filtered.length} shown</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Lead</DialogTitle>
            </DialogHeader>
            <NewLeadForm
              onSaved={() => {
                setOpen(false);
                load();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search name, phone, email, PAN…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              {LEAD_STAGES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            No leads match your filters.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">
                    {l.lead_name ?? l.full_name ?? "—"}
                    {l.city && <div className="text-xs text-slate-500">{l.city}{l.state ? `, ${l.state}` : ""}</div>}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{l.phone}</div>
                    {l.email && <div className="text-xs text-slate-500">{l.email}</div>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {(l.product_type ?? "").replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{l.lead_source ?? "—"}</TableCell>
                  <TableCell>
                    <Select value={l.status} onValueChange={(v) => updateStage(l.id, v)}>
                      <SelectTrigger className="h-8 w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEAD_STAGES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {new Date(l.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {l.status === "Converted" ? (
                      <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700">Converted</Badge>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setConvertLead(l)}>
                        <ArrowRightLeft className="mr-1.5 h-3.5 w-3.5" /> Convert
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

function NewLeadForm({ onSaved }: { onSaved: () => void }) {
  const [f, setF] = useState({
    lead_name: "",
    phone: "",
    email: "",
    pan: "",
    aadhaar: "",
    city: "",
    state: "",
    product_type: "loan",
    lead_source: "Website",
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("leads").insert({
      lead_name: f.lead_name,
      full_name: f.lead_name,
      phone: f.phone,
      email: f.email || null,
      pan: f.pan || null,
      aadhaar: f.aadhaar || null,
      city: f.city || null,
      state: f.state || null,
      product_type: f.product_type,
      lead_source: f.lead_source,
      status: "New",
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Lead created");
    onSaved();
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-3">
      <Field label="Lead Name *"><Input required value={f.lead_name} onChange={(e) => setF({ ...f, lead_name: e.target.value })} /></Field>
      <Field label="Mobile *"><Input required value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
      <Field label="Email"><Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
      <Field label="PAN"><Input value={f.pan} onChange={(e) => setF({ ...f, pan: e.target.value.toUpperCase() })} /></Field>
      <Field label="Aadhaar"><Input value={f.aadhaar} onChange={(e) => setF({ ...f, aadhaar: e.target.value })} /></Field>
      <Field label="City"><Input value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} /></Field>
      <Field label="State"><Input value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })} /></Field>
      <Field label="Product Interest">
        <Select value={f.product_type} onValueChange={(v) => setF({ ...f, product_type: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {PRODUCT_TYPES.map((p) => <SelectItem key={p} value={p} className="capitalize">{p.replace(/_/g, " ")}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Lead Source">
        <Select value={f.lead_source} onValueChange={(v) => setF({ ...f, lead_source: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {LEAD_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <div className="col-span-2 mt-2 flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Lead
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
