import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Search,
  Bell,
  Settings,
  ChevronDown,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useCrmAuth } from "@/hooks/useCrmAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const NAV: NavItem[] = [
  { to: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/crm/leads", label: "Leads", icon: Users },
  { to: "/crm/customers", label: "Customers", icon: UserCircle2 },
  { to: "/crm/loans", label: "Loans", icon: Banknote },
  { to: "/crm/insurance", label: "Insurance", icon: ShieldCheck },
  { to: "/crm/mutual-funds", label: "Mutual Funds", icon: TrendingUp },
  { to: "/crm/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/crm/reports", label: "Reports", icon: FileText },
];

export function CrmLayout() {
  const { user, isStaff, primaryRole, loading } = useCrmAuth();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginRoute = pathname === "/crm/login";

  useEffect(() => {
    if (loading || isLoginRoute) return;
    if (!user) nav({ to: "/crm/login" });
    else if (!isStaff) nav({ to: "/crm/login", search: { unauthorized: "1" } as never });
  }, [loading, user, isStaff, nav, isLoginRoute]);

  useEffect(() => setMobileOpen(false), [pathname]);

  // Login page renders standalone, without the staff shell
  if (isLoginRoute) {
    return <Outlet />;
  }

  if (loading || !user || !isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/crm/login" });
  };

  const activeLabel =
    NAV.find((n) => (n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/")))?.label ?? "CRM";

  const initials = (user.email ?? "U")
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 flex-col bg-gradient-to-b from-[#0b1437] via-[#101a4a] to-[#0b1437] text-slate-100 shadow-2xl transition-transform md:relative md:flex md:translate-x-0",
          mobileOpen ? "flex translate-x-0" : "hidden -translate-x-full md:flex",
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-white">Aarthvaahini</div>
              <div className="text-[10px] uppercase tracking-wider text-blue-300/80">Enterprise CRM</div>
            </div>
          </div>
          <button
            className="rounded-md p-1 text-slate-300 hover:bg-white/10 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-300/60">
            Main Menu
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to as never}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-to-r from-blue-600/40 to-indigo-600/20 text-white shadow-inner"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-400 to-indigo-400" />
                )}
                <Icon className={cn("h-4 w-4", active ? "text-blue-300" : "text-slate-400 group-hover:text-blue-300")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade card */}
        <div className="mx-3 mb-3 rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/30 to-indigo-600/10 p-3">
          <div className="text-xs font-semibold text-white">Need help?</div>
          <p className="mt-1 text-[11px] leading-relaxed text-blue-100/70">
            Check our docs or contact support for personalised guidance.
          </p>
          <Button size="sm" className="mt-2 h-7 w-full bg-white/10 text-xs text-white hover:bg-white/20">
            Open Docs
          </Button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md md:px-6">
          <button
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-col">
            <div className="text-xs text-slate-500">CRM</div>
            <div className="text-sm font-semibold text-slate-900">{activeLabel}</div>
          </div>

          <div className="relative ml-auto hidden w-72 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search leads, customers…"
              className="h-9 border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:bg-white"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-slate-600 hover:bg-slate-100">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Button>

          <Link to="/" className="hidden text-xs text-slate-500 hover:text-slate-900 md:inline">
            ← Website
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-left transition hover:bg-slate-50">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-semibold text-white">
                  {initials}
                </div>
                <div className="hidden text-xs leading-tight sm:block">
                  <div className="font-semibold text-slate-900">{user.email?.split("@")[0]}</div>
                  <div className="capitalize text-slate-500">{primaryRole?.replace(/_/g, " ")}</div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-xs font-normal text-slate-500">Signed in as</div>
                <div className="truncate text-sm font-semibold text-slate-900">{user.email}</div>
                <Badge variant="secondary" className="mt-1.5 capitalize">
                  {primaryRole?.replace(/_/g, " ")}
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Preferences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-700">
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
