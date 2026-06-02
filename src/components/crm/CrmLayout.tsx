import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  Banknote,
  ShieldCheck,
  TrendingUp,
  CheckSquare,
  FileText,
  LogOut,
  Loader2,
} from "lucide-react";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/crm/leads", label: "Leads", icon: Users },
  { to: "/crm/customers", label: "Customers", icon: UserCircle2 },
  { to: "/crm/loans", label: "Loans", icon: Banknote },
  { to: "/crm/insurance", label: "Insurance", icon: ShieldCheck },
  { to: "/crm/mutual-funds", label: "Mutual Funds", icon: TrendingUp },
  { to: "/crm/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/crm/reports", label: "Reports", icon: FileText },
] as const;

export function CrmLayout() {
  const { user, isStaff, primaryRole, loading } = useCrmAuth();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/crm/login" });
    else if (!isStaff) nav({ to: "/crm/login", search: { unauthorized: "1" } as never });
  }, [loading, user, isStaff, nav]);

  if (loading || !user || !isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/crm/login" });
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-[#0f1b3d] text-slate-100 md:flex">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="text-base font-semibold tracking-tight">Aarthvaahini CRM</div>
          <div className="text-xs text-slate-400">Enterprise Sales Suite</div>
        </div>
        <nav className="flex-1 space-y-0.5 px-2 py-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-400">
          <div className="truncate text-slate-200">{user.email}</div>
          <div className="mt-0.5 capitalize">{primaryRole?.replace(/_/g, " ")}</div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full justify-start text-slate-300 hover:bg-white/10 hover:text-white"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-white px-6">
          <div className="text-sm font-semibold text-slate-700">
            {NAV.find((n) =>
              n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/"),
            )?.label ?? "CRM"}
          </div>
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-900">
            ← Back to website
          </Link>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
