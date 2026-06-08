import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert, Sparkles, Lock, Mail, ArrowLeft, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/crm/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    unauthorized: s.unauthorized === "1" ? "1" : undefined,
  }),
  component: CrmLoginPage,
});

function CrmLoginPage() {
  const nav = useNavigate();
  const search = useSearch({ from: "/crm/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const staff = (roles ?? []).some((r) =>
        ["admin", "manager", "sales_executive", "operations", "insurance_executive", "mf_executive"].includes(
          r.role as string,
        ),
      );
      if (staff) nav({ to: "/crm" });
    };
    check();
  }, [nav]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      return toast.error(error.message);
    }
    // Verify staff role before redirect
    const userId = data.user?.id;
    if (userId) {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      const staff = (roles ?? []).some((r) =>
        ["admin", "manager", "sales_executive", "operations", "insurance_executive", "mf_executive"].includes(
          r.role as string,
        ),
      );
      setLoading(false);
      if (!staff) {
        await supabase.auth.signOut();
        return nav({ to: "/crm/login", search: { unauthorized: "1" } as never });
      }
    } else {
      setLoading(false);
    }
    toast.success("Welcome back!");
    nav({ to: "/crm" });
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-[#0b1437]">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      {/* Left brand panel */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-between p-12 text-white lg:flex">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-200/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
          <div className="mt-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">Aarthvaahini</div>
              <div className="text-xs uppercase tracking-[0.2em] text-blue-300/80">Enterprise CRM</div>
            </div>
          </div>
          <h1 className="mt-12 text-4xl font-bold leading-tight">
            Manage leads, loans &amp; <span className="bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">grow faster</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100/70">
            Sign in to your staff workspace to manage customers, track loan cases, insurance policies and mutual fund SIPs from one elegant dashboard.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { Icon: Users, label: "Unified lead & customer pipeline" },
              { Icon: ShieldCheck, label: "Secure, role-based access" },
              { Icon: TrendingUp, label: "Live reports & TAT tracking" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-blue-100/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
                  <Icon className="h-4 w-4 text-blue-300" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-blue-200/60">© {new Date().getFullYear()} Aarthvaahini. All rights reserved.</div>
      </div>

      {/* Right login card */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-blue-200/80 hover:text-white lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 lg:hidden">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="mt-1 text-sm text-blue-100/60">Sign in to your CRM workspace</p>
            </div>

            {search.unauthorized && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-200">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Your account doesn't have CRM access. Contact your administrator.</span>
              </div>
            )}

            <form onSubmit={signIn} className="space-y-4">
              <div>
                <Label className="text-xs font-medium text-blue-100/80">Email address</Label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/50" />
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-11 border-white/10 bg-white/5 pl-9 text-white placeholder:text-blue-200/40 focus-visible:border-blue-400 focus-visible:ring-blue-400/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-blue-100/80">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/50" />
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="h-11 border-white/10 bg-white/5 pl-9 text-white placeholder:text-blue-200/40 focus-visible:border-blue-400 focus-visible:ring-blue-400/30"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Signing in…" : "Sign in to CRM"}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-blue-100/50">
              Need an account? Contact your administrator to be assigned a staff role.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
