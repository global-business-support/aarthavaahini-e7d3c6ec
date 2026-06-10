import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import logoUrl from "@/assets/logo.png";
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
  CalendarClock,
  Handshake,
  LogOut,
  Loader2,
  Search,
  Bell,
  Settings,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  { to: "/crm/partners", label: "Partners", icon: Handshake },
  { to: "/crm/loans", label: "Loans", icon: Banknote },
  { to: "/crm/insurance", label: "Insurance", icon: ShieldCheck },
  { to: "/crm/mutual-funds", label: "Mutual Funds", icon: TrendingUp },
  { to: "/crm/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/crm/schedule", label: "Schedule", icon: CalendarClock },
  { to: "/crm/reports", label: "Reports", icon: FileText },
];

export function CrmLayout() {
  const { user, isStaff, primaryRole, loading } = useCrmAuth();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("crm-sidebar-collapsed") === "1";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("crm-sidebar-collapsed", collapsed ? "1" : "0");
    }
  }, [collapsed]);

  const isLoginRoute = pathname === "/crm/login";

  useEffect(() => {
    if (loading || isLoginRoute) return;
    if (!user) nav({ to: "/crm/login" });
    else if (!isStaff) nav({ to: "/crm/login", search: { unauthorized: "1" } as never });
  }, [loading, user, isStaff, nav, isLoginRoute]);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (isLoginRoute) return <Outlet />;

  if (loading || !user || !isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50">
        <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
      </div>
    );
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    nav({ to: "/crm/login" });
  };

  const activeLabel =
    NAV.find((n) => (n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/")))?.label ?? "CRM";

  const initials = (user.email ?? "U").split("@")[0].slice(0, 2).toUpperCase();

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 shrink-0 flex-col bg-gradient-to-b from-sky-300 via-sky-400 to-cyan-300 text-white shadow-xl shadow-sky-300/30 transition-all md:relative md:flex md:translate-x-0",
            collapsed ? "w-16" : "w-64",
            mobileOpen ? "flex translate-x-0 w-64" : "hidden -translate-x-full md:flex",
          )}
        >
          <div className={cn("flex items-center border-b border-white/10 px-3 py-4", collapsed ? "justify-center" : "justify-between px-5")}>
            <Link to="/crm" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white shadow-md">
                <img src={logoUrl} alt="Aarthvaahini" className="h-8 w-8 object-contain" />
              </div>
              {!collapsed && (
                <div>
                  <div className="text-sm font-semibold tracking-tight text-white">Aarthvaahini</div>
                  <div className="text-[10px] uppercase tracking-wider text-sky-200/90">Enterprise CRM</div>
                </div>
              )}
            </Link>
            {!collapsed && (
              <button
                className="rounded-md p-1 text-white/70 hover:bg-white/10 md:hidden"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Collapse toggle (desktop) */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-600 shadow-md hover:bg-sky-50 md:flex"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
          </button>

          <nav className={cn("flex-1 space-y-0.5 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")}>
            {!collapsed && (
              <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-sky-100/80">
                Main Menu
              </div>
            )}
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.to
                : pathname === item.to || pathname.startsWith(item.to + "/");
              const link = (
                <Link
                  key={item.to}
                  to={item.to as never}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg text-sm font-medium transition-all",
                    collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                    active
                      ? "bg-white/20 text-white shadow-inner"
                      : "text-white/75 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {active && !collapsed && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                  )}
                  <Icon className={cn("h-4 w-4", active ? "text-white" : "text-white/70 group-hover:text-white")} />
                  {!collapsed && item.label}
                </Link>
              );
              return collapsed ? (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ) : (
                link
              );
            })}
          </nav>
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-sky-900/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-sky-100 bg-white/80 px-4 backdrop-blur-md md:px-6">
            <button
              className="rounded-md p-2 text-sky-700 hover:bg-sky-50 md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <div className="text-[10px] text-sky-500">CRM</div>
              <div className="text-sm font-semibold text-slate-900">{activeLabel}</div>
            </div>
            <div className="relative ml-auto hidden w-72 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
              <Input
                placeholder="Search leads, customers…"
                className="h-9 border-sky-200 bg-sky-50/50 pl-9 text-sm focus-visible:bg-white"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-sky-700 hover:bg-sky-50">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Button>
            <Link to="/" className="hidden text-xs text-sky-600 hover:text-sky-800 md:inline">
              ← Website
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-2 py-1.5 text-left transition hover:bg-sky-50">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-[11px] font-semibold text-white shadow-sm">
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

          <main className="flex-1 overflow-auto bg-gradient-to-br from-sky-50/60 via-white to-blue-50/40 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
