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
} from "lucide-react";

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

  const load = async () => {
    setBusy(true);
    const [leadsRes, customers, loans, insurance, mf, tasks, disb] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("loan_cases").select("id", { count: "exact", head: true }),
      supabase.from("insurance_cases").select("id", { count: "exact", head: true }),
      supabase.from("mutual_funds").select("id", { count: "exact", head: true }),
      supabase.from("tasks").select("id", { count: "exact", head: true }).neq("status", "done"),
      supabase.from("loan_cases").select("disbursement_amount"),
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
            { to: "/crm/leads", label: "Manage Leads", icon: Users },
            { to: "/crm/customers", label: "Customers 360°", icon: UserCircle2 },
            { to: "/crm/loans", label: "Loan Pipeline", icon: Banknote },
            { to: "/crm/reports", label: "Reports", icon: TrendingUp },
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

        {/* Leads */}
        <Card className="mt-6 overflow-hidden border-slate-200/70 p-0 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Latest Leads</h2>
              <p className="text-xs text-slate-500">Recent submissions across the website and team entry.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, phone, product…"
                className="h-9 border-slate-200 bg-slate-50 pl-9 text-sm"
              />
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
