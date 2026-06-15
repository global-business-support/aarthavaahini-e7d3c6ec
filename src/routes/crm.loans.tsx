import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/crm/loans")({ component: LoansPage });

const STAGES = ["Lead", "Documents", "Login", "Under Process", "Sanction", "Disbursement", "Completed"];

type Row = {
  id: string;
  loan_type: string;
  loan_amount: number | null;
  lender_name: string | null;
  stage: string;
  sanction_amount: number | null;
  disbursement_amount: number | null;
  created_at: string;
  customer_id: string | null;
  customer?: { customer_name: string | null; mobile: string | null } | null;
};

function LoansPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("loan_cases")
        .select("*, customer:customers(customer_name, mobile)")
        .order("created_at", { ascending: false });
      setRows((data ?? []) as unknown as Row[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Loan Cases</h1>
        <p className="text-sm text-slate-500">Workflow: {STAGES.join(" → ")}</p>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">No loan cases yet. Close a customer in the Customers module to push it here.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Sanctioned</TableHead>
                <TableHead>Disbursed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.customer?.customer_name ?? "—"}</TableCell>
                  <TableCell>{r.customer?.mobile ?? "—"}</TableCell>
                  <TableCell>{r.loan_type}</TableCell>
                  <TableCell>{r.loan_amount ? `₹${Number(r.loan_amount).toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell>{r.lender_name ?? "—"}</TableCell>
                  <TableCell><Badge variant="secondary">{r.stage}</Badge></TableCell>
                  <TableCell>{r.sanction_amount ? `₹${Number(r.sanction_amount).toLocaleString("en-IN")}` : "—"}</TableCell>
                  <TableCell>{r.disbursement_amount ? `₹${Number(r.disbursement_amount).toLocaleString("en-IN")}` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
