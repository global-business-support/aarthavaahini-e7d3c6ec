import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Clock,
  Banknote,
  ShieldCheck,
  TrendingUp,
  IndianRupee,
  CheckSquare,
  AlertTriangle,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crm/")({
  component: DashboardPage,
});

type Stats = {
  totalLeads: number;
  followupsDue: number;
  loanPipeline: number;
  insurancePipeline: number;
  mfPipeline: number;
  revenue: number;
  pendingTasks: number;
  slaAlerts: number;
};

function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<
    { id: string; full_name: string; product_type: string; status: string; created_at: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      const now = new Date().toISOString();
      const [leads, followups, loans, insurance, funds, tasks, sla, recent] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase
          .from("tasks")
          .select("id", { count: "exact", head: true })
          .lte("due_date", now)
          .neq("status", "done"),
        supabase
          .from("loan_cases")
          .select("loan_amount, stage")
          .not("stage", "in", '("Completed","Closed")'),
        supabase
          .from("insurance_cases")
          .select("premium, policy_status")
          .not("policy_status", "in", '("Issued","Closed")'),
        supabase
          .from("mutual_funds")
          .select("sip_amount, status")
          .not("status", "in", '("Portfolio Review","Closed")'),
        supabase.from("tasks").select("id", { count: "exact", head: true }).neq("status", "done"),
        supabase
          .from("tasks")
          .select("id", { count: "exact", head: true })
          .lt("due_date", now)
          .neq("status", "done"),
        supabase
          .from("leads")
          .select("id, full_name, product_type, status, created_at")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

      const sum = <T extends Record<string, unknown>>(rows: T[] | null, key: string) =>
        (rows ?? []).reduce((acc, r) => acc + (Number(r[key]) || 0), 0);

      const disb = await supabase.from("loan_cases").select("disbursement_amount");

      setStats({
        totalLeads: leads.count ?? 0,
        followupsDue: followups.count ?? 0,
        loanPipeline: sum(loans.data, "loan_amount"),
        insurancePipeline: sum(insurance.data, "premium"),
        mfPipeline: sum(funds.data, "sip_amount") * 12,
        revenue: sum(disb.data, "disbursement_amount"),
        pendingTasks: tasks.count ?? 0,
        slaAlerts: sla.count ?? 0,
      });
      setRecentLeads(recent.data ?? []);
    })();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats?.totalLeads, icon: Users, tone: "blue", trend: "+12%" },
    { label: "Followups Due", value: stats?.followupsDue, icon: Clock, tone: "amber", trend: "Today" },
    { label: "Loan Pipeline", value: stats && formatINR(stats.loanPipeline), icon: Banknote, tone: "emerald", trend: "+8%" },
    { label: "Insurance Pipeline", value: stats && formatINR(stats.insurancePipeline), icon: ShieldCheck, tone: "violet", trend: "+4%" },
    { label: "MF Annual SIP", value: stats && formatINR(stats.mfPipeline), icon: TrendingUp, tone: "cyan", trend: "+15%" },
    { label: "Revenue Disbursed", value: stats && formatINR(stats.revenue), icon: IndianRupee, tone: "emerald", trend: "+22%" },
    { label: "Pending Tasks", value: stats?.pendingTasks, icon: CheckSquare, tone: "slate", trend: "Active" },
    { label: "SLA Alerts", value: stats?.slaAlerts, icon: AlertTriangle, tone: "rose", trend: "Action" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 p-6 text-white shadow-xl shadow-fuchsia-500/20">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-pink-400/30 blur-3xl" />
        <div className="absolute -bottom-16 right-20 h-44 w-44 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-pink-100">
              <Activity className="h-3.5 w-3.5" /> Live overview
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Welcome back 👋
            </h1>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Real-time view of leads, pipeline value and team performance across loans, insurance and mutual funds.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className="border-white/20 bg-white/15 text-white backdrop-blur-sm">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card
              key={c.label}
              className="group relative overflow-hidden border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={cn("absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-40 blur-2xl", toneBlur(c.tone))} />
              <div className="relative flex items-start justify-between">
                <div className={cn("rounded-xl p-2.5 shadow-sm", toneBg(c.tone))}>
                  <Icon className={cn("h-5 w-5", toneFg(c.tone))} />
                </div>
                <Badge variant="secondary" className="text-[10px] font-medium bg-white/60">
                  {c.trend}
                </Badge>
              </div>
              <div className="relative mt-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{c.label}</div>
                <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{c.value ?? "—"}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bottom grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Recent Leads</h2>
              <p className="text-xs text-slate-500">Latest leads captured from website and team.</p>
            </div>
            <a href="/crm/leads" className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
              View all <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {recentLeads.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">No leads yet.</div>
            )}
            {recentLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-semibold text-white">
                    {(l.full_name ?? "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">{l.full_name}</div>
                    <div className="text-xs capitalize text-slate-500">{l.product_type?.replace(/_/g, " ")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">{l.status}</Badge>
                  <div className="hidden text-xs text-slate-400 sm:block">
                    {new Date(l.created_at).toLocaleDateString("en-IN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Pipeline Mix</h2>
          <p className="text-xs text-slate-500">Open value across product lines.</p>
          <div className="mt-5 space-y-4">
            {stats && [
              { label: "Loans", value: stats.loanPipeline, color: "bg-emerald-500" },
              { label: "Insurance", value: stats.insurancePipeline, color: "bg-violet-500" },
              { label: "Mutual Funds", value: stats.mfPipeline, color: "bg-cyan-500" },
            ].map((row) => {
              const total = stats.loanPipeline + stats.insurancePipeline + stats.mfPipeline || 1;
              const pct = Math.round((row.value / total) * 100);
              return (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{row.label}</span>
                    <span className="text-slate-500">{formatINR(row.value)}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={cn("h-full rounded-full transition-all", row.color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function formatINR(v: number) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return `₹${Math.round(v).toLocaleString("en-IN")}`;
}
function toneBg(t: string) {
  return ({
    blue: "bg-blue-100", amber: "bg-amber-100", emerald: "bg-emerald-100",
    violet: "bg-violet-100", cyan: "bg-cyan-100", slate: "bg-slate-200", rose: "bg-rose-100",
  } as Record<string, string>)[t];
}
function toneFg(t: string) {
  return ({
    blue: "text-blue-600", amber: "text-amber-600", emerald: "text-emerald-600",
    violet: "text-violet-600", cyan: "text-cyan-600", slate: "text-slate-600", rose: "text-rose-600",
  } as Record<string, string>)[t];
}
function toneBlur(t: string) {
  return ({
    blue: "bg-blue-300/40", amber: "bg-amber-300/40", emerald: "bg-emerald-300/40",
    violet: "bg-violet-300/40", cyan: "bg-cyan-300/40", slate: "bg-slate-300/40", rose: "bg-rose-300/40",
  } as Record<string, string>)[t];
}
