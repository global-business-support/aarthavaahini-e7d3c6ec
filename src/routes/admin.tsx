import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2,
  RefreshCw,
  Users,
  Banknote,
  ShieldCheck,
  TrendingUp,
  Building2,
  Phone,
  ArrowUpRight,
  Search,
  UserCircle2,
  CheckSquare,
  IndianRupee,
  Download,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip as RTooltip, CartesianGrid, BarChart, Bar, Legend,
  PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Aarthvaahini" }] }),
  component: AdminPage,
});

type Lead = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  product_type: string;
  product_name: string | null;
  amount: number | null;
  message: string | null;
  status: string;
  city: string | null;
  lead_source: string | null;
  created_at: string;
};

type Stats = {
  totalLeads: number;
  customers: number;
  loans: number;
  insurance: number;
  mf: number;
  pendingTasks: number;
  revenue: number;
};

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [trend, setTrend] = useState<{ day: string; leads: number }[]>([]);

  const load = async () => {
    setBusy(true);
    const since = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString();
    const [leadsRes, customers, loans, insurance, mf, tasks, disb, last14] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("loan_cases").select("id", { count: "exact", head: true }),
      supabase.from("insurance_cases").select("id", { count: "exact", head: true }),
      supabase.from("mutual_funds").select("id", { count: "exact", head: true }),
      supabase.from("tasks").select("id", { count: "exact", head: true }).neq("status", "done"),
      supabase.from("loan_cases").select("disbursement_amount"),
      supabase.from("leads").select("created_at, product_type").gte("created_at", since),
    ]);

    setLeads((leadsRes.data ?? []) as Lead[]);
    setStats({
      totalLeads: leadsRes.data?.length ?? 0,
      customers: customers.count ?? 0,
      loans: loans.count ?? 0,
      insurance: insurance.count ?? 0,
      mf: mf.count ?? 0,
      pendingTasks: tasks.count ?? 0,
      revenue: (disb.data ?? []).reduce((a, r) => a + (Number(r.disbursement_amount) || 0), 0),
    });

    const buckets: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      buckets[d.toISOString().slice(0, 10)] = 0;
    }
    (last14.data ?? []).forEach((r: { created_at: string }) => {
      const k = r.created_at.slice(0, 10);
      if (buckets[k] !== undefined) buckets[k] += 1;
    });
    setTrend(Object.entries(buckets).map(([k, v]) => ({
      day: new Date(k).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      leads: v,
    })));

    setBusy(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-40">
          <Loader2 className="h-8 w-8 animate-spin text-[#17357e]" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-bold">Login required</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access the admin panel.</p>
          <Button asChild className="mt-6"><Link to="/login">Go to Login</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-3xl font-bold">Access Denied</h1>
          <p className="mt-2 text-muted-foreground">This page is accessible to admins only.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      l.full_name?.toLowerCase().includes(s) ||
      l.phone?.toLowerCase().includes(s) ||
      l.email?.toLowerCase().includes(s) ||
      l.product_type?.toLowerCase().includes(s)
    );
  });

  const statCards = [
    { label: "Total Leads", value: stats?.totalLeads ?? 0, icon: Users, tone: "blue" },
    { label: "Customers", value: stats?.customers ?? 0, icon: UserCircle2, tone: "emerald" },
    { label: "Loan Cases", value: stats?.loans ?? 0, icon: Banknote, tone: "amber" },
    { label: "Insurance", value: stats?.insurance ?? 0, icon: ShieldCheck, tone: "violet" },
    { label: "Mutual Funds", value: stats?.mf ?? 0, icon: TrendingUp, tone: "cyan" },
    { label: "Pending Tasks", value: stats?.pendingTasks ?? 0, icon: CheckSquare, tone: "rose" },
    { label: "Revenue", value: stats ? formatINR(stats.revenue) : "—", icon: IndianRupee, tone: "emerald" },
    { label: "Branches", value: "—", icon: Building2, tone: "slate" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1437] via-[#15224f] to-[#1e3a8a] p-6 text-white shadow-xl md:p-8">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-16 right-20 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge className="border-white/20 bg-white/10 text-white">Admin Workspace</Badge>
              <h1 className="mt-2 font-display text-2xl font-bold md:text-3xl">Welcome back, Admin</h1>
              <p className="mt-1 max-w-xl text-sm text-blue-100/80">
                Live snapshot of leads, pipeline, and team activity. Jump into the full CRM for deep workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={load} disabled={busy} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Refresh
              </Button>
              <Button asChild className="bg-white text-[#15224f] hover:bg-blue-50">
                <Link to="/crm">Open CRM <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.label} className="relative overflow-hidden border-slate-200/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-40 blur-2xl ${toneBlur(c.tone)}`} />
                <div className="relative flex items-start justify-between">
                  <div className={`rounded-xl p-2.5 ${toneBg(c.tone)}`}>
                    <Icon className={`h-5 w-5 ${toneFg(c.tone)}`} />
                  </div>
                </div>
                <div className="relative mt-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{c.label}</div>
                  <div className="mt-0.5 text-2xl font-bold text-slate-900">{c.value}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/admin/employees", label: "Manage Employees", icon: UserCircle2 },
            { to: "/crm/schedule", label: "Employee Schedule", icon: CheckSquare },
            { to: "/admin/whatsapp", label: "WhatsApp Sender", icon: Phone },
            { to: "/crm/leads", label: "Manage Leads", icon: Users },
          ].map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to as never}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{l.label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
            );
          })}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Leads — Last 14 days</h2>
                <p className="text-xs text-slate-500">Daily new leads captured.</p>
              </div>
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">Trend</Badge>
            </div>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminLeadFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RTooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Area type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2} fill="url(#adminLeadFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">Product Mix</h2>
            <p className="text-xs text-slate-500">Active cases across products.</p>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Loans", value: stats?.loans ?? 0 },
                      { name: "Insurance", value: stats?.insurance ?? 0 },
                      { name: "Mutual Funds", value: stats?.mf ?? 0 },
                    ]}
                    cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={3} dataKey="value"
                  >
                    {["#3b82f6", "#8b5cf6", "#10b981"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Pie>
                  <RTooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Leads */}
        <Card className="mt-6 overflow-hidden border-slate-200/70 p-0 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Latest Leads</h2>
              <p className="text-xs text-slate-500">Recent submissions across the website and team entry.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, phone, product…"
                  className="h-9 border-slate-200 bg-slate-50 pl-9 text-sm"
                />
              </div>
              <Button onClick={() => downloadLeadsXlsx(filtered)} variant="outline" className="h-9 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                <Download className="mr-2 h-4 w-4" /> Excel
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-sm text-slate-400">
                      {busy ? "Loading…" : "No leads found."}
                    </td>
                  </tr>
                )}
                {filtered.map((l) => (
                  <tr key={l.id} className="border-t border-slate-100 align-top hover:bg-slate-50/60">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                      {new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{l.full_name}</div>
                      {l.city && <div className="text-xs text-slate-500">{l.city}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-600">
                        <Phone className="h-3 w-3" /> {l.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{l.email || "—"}</td>
                    <td className="px-4 py-3"><Badge variant="secondary" className="capitalize">{l.product_type?.replace(/_/g, " ")}</Badge></td>
                    <td className="px-4 py-3 text-slate-700">{l.product_name || "—"}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{l.amount ? `₹${Number(l.amount).toLocaleString("en-IN")}` : "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="capitalize">{l.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
      <Footer />
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

function downloadLeadsXlsx(leads: Lead[]) {
  if (!leads || leads.length === 0) return;
  const rows = leads.map((l) => ({
    "Created At": new Date(l.created_at).toLocaleString("en-IN"),
    "Name": l.full_name,
    "Phone": l.phone,
    "Email": l.email ?? "",
    "Product Type": l.product_type,
    "Product Name": l.product_name ?? "",
    "Amount": l.amount ?? "",
    "City": l.city ?? "",
    "Source": l.lead_source ?? "",
    "Status": l.status,
    "Message": l.message ?? "",
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [{ wch: 20 }, { wch: 22 }, { wch: 16 }, { wch: 26 }, { wch: 14 }, { wch: 18 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 40 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Leads");
  XLSX.writeFile(wb, `aarthvaahini-leads-${new Date().toISOString().slice(0, 10)}.xlsx`);
}
