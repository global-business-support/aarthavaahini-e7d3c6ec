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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Plus, Handshake, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/crm/partners")({ component: PartnersPage });

type Partner = {
  id: string;
  name: string;
  organisation: string;
  category: string;
  phone: string;
  email: string;
  city: string;
  status: "Active" | "Inactive" | "Pending";
  notes: string;
  created_at: string;
};

const PARTNER_KEY = "crm-partners";
const CATEGORIES = ["DSA / Connector", "Bank Partner", "NBFC", "Insurance Agent", "Mutual Fund Distributor", "Referral"] as const;

function PartnersPage() {
  const [rows, setRows] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(PARTNER_KEY) : null;
      setRows(raw ? (JSON.parse(raw) as Partner[]) : []);
    } catch {
      setRows([]);
    }
    setLoading(false);
  }, []);

  const persist = (next: Partner[]) => {
    setRows(next);
    window.localStorage.setItem(PARTNER_KEY, JSON.stringify(next));
  };

  const filtered = rows.filter((p) => {
    const q = filter.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.organisation.toLowerCase().includes(q) || p.phone.includes(q);
  });

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-500 p-5 text-white shadow-lg shadow-sky-500/20">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              <Handshake className="h-3 w-3" /> Channel Partners
            </div>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">Partners</h1>
            <p className="text-sm text-white/80">{rows.length} partner{rows.length === 1 ? "" : "s"} · DSAs, banks, insurers & referrals</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-sky-700 shadow-md hover:bg-sky-50">
                <Plus className="mr-2 h-4 w-4" /> Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Add Partner</DialogTitle>
              </DialogHeader>
              <PartnerForm
                onSaved={(p) => {
                  persist([p, ...rows]);
                  setOpen(false);
                  toast.success("Partner added");
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search by name, organisation, phone…" value={filter} onChange={(e) => setFilter(e.target.value)} className="pl-9" />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-32 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-slate-400" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No partners yet. Add your first DSA or bank partner.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Organisation</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.organisation || "—"}</TableCell>
                  <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                  <TableCell>
                    <div className="text-sm">{p.phone}</div>
                    {p.email && <div className="text-xs text-slate-500">{p.email}</div>}
                  </TableCell>
                  <TableCell>{p.city || "—"}</TableCell>
                  <TableCell>
                    <Badge className={p.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : p.status === "Pending" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : "bg-slate-200 text-slate-700 hover:bg-slate-200"}>
                      {p.status}
                    </Badge>
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

function PartnerForm({ onSaved }: { onSaved: (p: Partner) => void }) {
  const [f, setF] = useState({
    name: "",
    organisation: "",
    category: CATEGORIES[0] as string,
    phone: "",
    email: "",
    city: "",
    status: "Active" as Partner["status"],
    notes: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!f.name.trim() || !f.phone.trim()) {
          toast.error("Name and phone are required");
          return;
        }
        onSaved({
          id: crypto.randomUUID(),
          ...f,
          created_at: new Date().toISOString(),
        });
      }}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      <Field label="Partner Name *"><Input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
      <Field label="Organisation"><Input value={f.organisation} onChange={(e) => setF({ ...f, organisation: e.target.value })} /></Field>
      <Field label="Category">
        <Select value={f.category} onValueChange={(v) => setF({ ...f, category: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent className="bg-white">{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <Field label="Status">
        <Select value={f.status} onValueChange={(v) => setF({ ...f, status: v as Partner["status"] })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Phone *"><Input required value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
      <Field label="Email"><Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
      <Field label="City"><Input value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} /></Field>
      <div className="sm:col-span-2"><Field label="Notes"><Input value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="Commission %, contact person, agreement date…" /></Field></div>
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">Save Partner</Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="min-w-0"><Label className="text-xs">{label}</Label><div className="mt-1">{children}</div></div>;
}
