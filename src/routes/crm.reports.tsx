import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Clock, Package, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/crm/reports")({ component: ReportsPage });

type Stats = {
  totalLeads: number;
  converted: number;
  loanCases: number;
  insuranceCases: number;
  mfCases: number;
  disbursed: number;
  premium: number;
  sipAnnual: number;
  avgTatDays: number;
};

function formatINR(v: number) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return `₹${Math.round(v).toLocaleString("en-IN")}`;
}

function ReportsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      const [leads, converted, loans, ins, mf] = await Promise.all([
        supabase.from("leads").select("id, created_at"),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "converted"),
        supabase.from("loan_cases").select("disbursement_amount, created_at"),
        supabase.from("insurance_cases").select("premium"),
        supabase.from("mutual_funds").select("sip_amount"),
      ]);

      const sum = (rows: any[] | null, key: string) =>
        (rows ?? []).reduce((a, r) => a + (Number(r[key]) || 0), 0);

      // Avg TAT: days between lead create and loan_case create (when both exist)
      const loanDates = (loans.data ?? []).map((r: any) => new Date(r.created_at).getTime());
      const leadDates = (leads.data ?? []).map((r: any) => new Date(r.created_at).getTime());
      const avgTat =
        loanDates.length && leadDates.length
          ? Math.max(
              0,
              Math.round(
                (loanDates.reduce((a, b) => a + b, 0) / loanDates.length -
                  leadDates.reduce((a, b) => a + b, 0) / leadDates.length) /
                  (1000 * 60 * 60 * 24),
              ),
            )
          : 0;

      setStats({
        totalLeads: leads.data?.length ?? 0,
        converted: converted.count ?? 0,
        loanCases: loans.data?.length ?? 0,
        insuranceCases: ins.data?.length ?? 0,
        mfCases: mf.data?.length ?? 0,
        disbursed: sum(loans.data, "disbursement_amount"),
        premium: sum(ins.data, "premium"),
        sipAnnual: sum(mf.data, "sip_amount") * 12,
        avgTatDays: avgTat,
      });
    })();
  }, []);

  if (!stats) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const convPct = stats.totalLeads ? Math.round((stats.converted / stats.totalLeads) * 100) : 0;

  const reports = [
    {
      name: "Lead Conversion",
      desc: `${stats.converted} of ${stats.totalLeads} leads converted (${convPct}%).`,
      value: `${convPct}%`,
      icon: TrendingUp,
    },
    {
      name: "Revenue",
      desc: "Disbursed loan + premium + annual SIP.",
      value: formatINR(stats.disbursed + stats.premium + stats.sipAnnual),
      icon: BarChart3,
    },
    {
      name: "TAT Report",
      desc: "Avg days from lead capture to loan case creation.",
      value: `${stats.avgTatDays} d`,
      icon: Clock,
    },
    {
      name: "Loan Disbursed",
      desc: `${stats.loanCases} loan cases.`,
      value: formatINR(stats.disbursed),
      icon: Package,
    },
    {
      name: "Insurance Premium",
      desc: `${stats.insuranceCases} policies.`,
      value: formatINR(stats.premium),
      icon: Package,
    },
    {
      name: "Mutual Funds (Annual SIP)",
      desc: `${stats.mfCases} SIPs.`,
      value: formatINR(stats.sipAnnual),
      icon: Users,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500">Live numbers from your CRM pipeline.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.name} className="p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900">{r.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{r.desc}</div>
                  <div className="mt-3 text-xl font-bold text-slate-900">{r.value}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
