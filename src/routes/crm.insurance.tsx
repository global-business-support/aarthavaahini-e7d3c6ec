import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/crm/insurance")({ component: InsurancePage });

const STAGES = ["Lead", "Quote Shared", "Proposal Submitted", "Underwriting", "Issued"];

type Row = { id: string; policy_type: string; insurer: string | null; premium: number | null; policy_status: string; renewal_date: string | null };

function InsurancePage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("insurance_cases").select("*").order("created_at", { ascending: false });
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Insurance Cases</h1>
        <p className="text-sm text-slate-500">Workflow: {STAGES.join(" → ")}</p>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No insurance cases yet.</div>
        ) : (
          <Table>
            <TableHeader><TableRow><TableHead>Type</TableHead><TableHead>Insurer</TableHead><TableHead>Premium</TableHead><TableHead>Status</TableHead><TableHead>Renewal</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium capitalize">{r.policy_type}</TableCell>
                  <TableCell>{r.insurer ?? "—"}</TableCell>
                  <TableCell>{r.premium ? `₹${Number(r.premium).toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell><Badge variant="secondary">{r.policy_status}</Badge></TableCell>
                  <TableCell>{r.renewal_date ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
