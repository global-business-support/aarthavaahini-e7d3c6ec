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
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export const Route = createFileRoute("/crm/")({ component: DashboardPage });

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
  const [trend, setTrend] = useState<{ day: string; leads: number }[]>([]);

  useEffect(() => {
    (async () => {
      const now = new Date().toISOString();
      const since = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString();
      const [leads, followups, loans, insurance, funds, tasks, sla, recent, last14] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("tasks").select("id", { count: "exact", head: true }).lte("due_date", now).neq("status", "done"),
        supabase.from("loan_cases").select("loan_amount, stage").not("stage", "in", '("Completed","Closed")'),
        supabase.from("insurance_cases").select("premium, policy_status").not("policy_status", "in", '("Issued","Closed")'),
        supabase.from("mutual_funds").select("sip_amount, status").not("status", "in", '("Portfolio Review","Closed")'),
        supabase.from("tasks").select("id", { count: "exact", head: true }).neq("status", "done"),
        supabase.from("tasks").select("id", { count: "exact", head: true }).lt("due_date", now).neq("status", "done"),
        supabase.from("leads").select("id, full_name, product_type, status, created_at").order("created_at", { ascending: false }).limit(6),
        supabase.from("leads").select("created_at").gte("created_at", since),
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

      // 14-day lead trend
      const buckets: Record<string, number> = {};
      for (let i = 13; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        buckets[key] = 0;
      }
      (last14.data ?? []).forEach((r: { created_at: string }) => {
        const key = r.created_at.slice(0, 10);
        if (buckets[key] !== undefined) buckets[key] += 1;
      });
      setTrend(
        Object.entries(buckets).map(([k, v]) => ({
          day: new Date(k).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
          leads: v,
        })),
      );
    })();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats?.totalLeads, icon: Users, tone: "sky", trend: "+12%" },
    { label: "Followups Due", value: stats?.followupsDue, icon: Clock, tone: "amber", trend: "Today" },
    { label: "Loan Pipeline", value: stats && formatINR(stats.loanPipeline), icon: Banknote, tone: "emerald", trend: "+8%" },
    { label: "Insurance", value: stats && formatINR(stats.insurancePipeline), icon: ShieldCheck, tone: "violet", trend: "+4%" },
    { label: "MF Annual SIP", value: stats && formatINR(stats.mfPipeline), icon: TrendingUp, tone: "cyan", trend: "+15%" },
    { label: "Disbursed", value: stats && formatINR(stats.revenue), icon: IndianRupee, tone: "blue", trend: "+22%" },
    { label: "Open Tasks", value: stats?.pendingTasks, icon: CheckSquare, tone: "slate", trend: "Active" },
    { label: "SLA Alerts", value: stats?.slaAlerts, icon: AlertTriangle, tone: "rose", trend: "Action" },
  ] as const;

  const pipelineData = stats
    ? [
        { name: "Loans", value: Math.round(stats.loanPipeline / 1e5) },
        { name: "Insurance", value: Math.round(stats.insurancePipeline / 1e5) },
        { name: "Mutual Funds", value: Math.round(stats.mfPipeline / 1e5) },
      ]
    : [];

  return (
    <div className="space-y-5">
      {/* Compact welcome strip */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-md shadow-sky-500/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">Welcome back 👋</div>
            <div className="text-[11px] text-white/80">Live overview · leads, pipeline & team</div>
          </div>
        </div>
        <Badge className="border-white/30 bg-white/20 text-white">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
        </Badge>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card
              key={c.label}
              className="group relative overflow-hidden border-sky-100 bg-white/85 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={cn("absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-50 blur-2xl", toneBlur(c.tone))} />
              <div className="relative flex items-start justify-between">
                <div className={cn("rounded-xl p-2 shadow-sm", toneBg(c.tone))}>
                  <Icon className={cn("h-4 w-4", toneFg(c.tone))} />
                </div>
                <Badge variant="secondary" className="text-[10px] font-medium bg-sky-50 text-sky-700">{c.trend}</Badge>
              </div>
              <div className="relative mt-3">
                <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{c.label}</div>
                <div className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">{c.value ?? "—"}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Leads — Last 14 days</h2>
              <p className="text-xs text-slate-500">Daily new leads captured.</p>
            </div>
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">Trend</Badge>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <RTooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Area type="monotone" dataKey="leads" stroke="#0284c7" strokeWidth={2} fill="url(#leadFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-slate-900">Pipeline (₹ Lakh)</h2>
          <p className="text-xs text-slate-500">Open value across products.</p>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                <RTooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="value" name="₹ Lakh" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent leads */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Recent Leads</h2>
            <p className="text-xs text-slate-500">Latest leads captured from website and team.</p>
          </div>
          <a href="/crm/leads" className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700">
            View all <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
        <div className="mt-3 divide-y divide-sky-50">
          {recentLeads.length === 0 && <div className="py-6 text-center text-xs text-slate-400">No leads yet.</div>}
          {recentLeads.map((l) => (
            <div key={l.id} className="flex items-center justify-between py-3">
              <a
                href={`/crm/customers?q=${encodeURIComponent(l.full_name ?? "")}`}
                className="flex items-center gap-3 group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-[11px] font-semibold text-white">
                  {(l.full_name ?? "?").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-sky-700 group-hover:underline">{l.full_name}</div>
                  <div className="text-xs capitalize text-slate-500">{l.product_type?.replace(/_/g, " ")}</div>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="capitalize">{l.status}</Badge>
                <div className="hidden text-xs text-slate-400 sm:block">{new Date(l.created_at).toLocaleDateString("en-IN")}</div>
              </div>
            </div>
          ))}

        </div>
      </Card>
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
    sky: "bg-sky-100", blue: "bg-blue-100", amber: "bg-amber-100", emerald: "bg-emerald-100",
    violet: "bg-violet-100", cyan: "bg-cyan-100", slate: "bg-slate-200", rose: "bg-rose-100",
  } as Record<string, string>)[t];
}
function toneFg(t: string) {
  return ({
    sky: "text-sky-600", blue: "text-blue-600", amber: "text-amber-600", emerald: "text-emerald-600",
    violet: "text-violet-600", cyan: "text-cyan-600", slate: "text-slate-600", rose: "text-rose-600",
  } as Record<string, string>)[t];
}
function toneBlur(t: string) {
  return ({
    sky: "bg-sky-300/40", blue: "bg-blue-300/40", amber: "bg-amber-300/40", emerald: "bg-emerald-300/40",
    violet: "bg-violet-300/40", cyan: "bg-cyan-300/40", slate: "bg-slate-300/40", rose: "bg-rose-300/40",
  } as Record<string, string>)[t];
}
