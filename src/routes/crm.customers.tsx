import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, StickyNote, Phone, Mail, MapPin, Briefcase, IndianRupee, User2, Search } from "lucide-react";


export const Route = createFileRoute("/crm/customers")({ component: CustomersPage });

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
};

type Note = { id: string; notes: string | null; created_at: string };

function CustomersPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Row | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(500);
      const list = (data ?? []) as Row[];
      setRows(list);
      // Read ?q= from URL: auto-fill search and open match if exactly one
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const initial = url.searchParams.get("q") ?? "";
        if (initial) {
          setQ(initial);
          const match = list.find((r) => (r.customer_name ?? "").toLowerCase() === initial.toLowerCase());
          if (match) setActive(match);
        }
      }
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      (r.customer_name ?? "").toLowerCase().includes(term) ||
      (r.mobile ?? "").toLowerCase().includes(term) ||
      (r.email ?? "").toLowerCase().includes(term) ||
      (r.pan ?? "").toLowerCase().includes(term),
    );
  }, [q, rows]);



  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md shadow-sky-500/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20"><User2 className="h-4 w-4" /></div>
          <div>
            <div className="text-sm font-semibold">Customers</div>
            <div className="text-[11px] text-white/80">{rows.length} customers · click a name to view 360° details and notes</div>
          </div>
        </div>
      </div>

      <Card className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, mobile, email, PAN…"
            className="pl-9"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">{rows.length === 0 ? "No customers yet." : "No customers match your search."}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Income</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="cursor-pointer hover:bg-sky-50/60" onClick={() => setActive(r)}>
                  <TableCell className="font-medium">
                    <button className="text-sky-700 hover:underline">{r.customer_name}</button>
                  </TableCell>
                  <TableCell>{r.mobile ?? "—"}</TableCell>
                  <TableCell>{r.email ?? "—"}</TableCell>
                  <TableCell>{r.pan ?? "—"}</TableCell>
                  <TableCell>{r.occupation ?? "—"}</TableCell>
                  <TableCell>{r.income ? `₹${Number(r.income).toLocaleString("en-IN")}` : "—"}</TableCell>
                </TableRow>
              ))}
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

