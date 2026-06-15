import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Users, UserCircle2, LogOut, Loader2, Handshake } from "lucide-react";
import { usePartnerAuth } from "@/hooks/usePartnerAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/partner", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/partner/leads", label: "My Leads", icon: Users },
  { to: "/partner/profile", label: "Profile", icon: UserCircle2 },
];

export function PartnerLayout() {
  const { user, isPartner, loading } = usePartnerAuth();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/crm/login" });
    else if (!isPartner) nav({ to: "/crm/login", search: { unauthorized: "1" } as never });
  }, [loading, user, isPartner, nav]);

  if (loading || !user || !isPartner) {
    return <div className="flex min-h-screen items-center justify-center bg-sky-50"><Loader2 className="h-6 w-6 animate-spin text-sky-400" /></div>;
  }

  const signOut = async () => { await supabase.auth.signOut(); nav({ to: "/crm/login" }); };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-emerald-200 bg-gradient-to-b from-emerald-50 to-teal-50 md:flex">
        <div className="flex items-center gap-2 border-b border-emerald-200/60 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow">
            <Handshake className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-900">Partner Portal</div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-600">Aarthvaahini</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to as never}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active ? "bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200" : "text-emerald-800/80 hover:bg-white/70",
                )}>
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-emerald-200/60 p-3">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-emerald-100 bg-white/80 px-4 backdrop-blur md:px-6">
          <div>
            <div className="text-[10px] text-emerald-500">PARTNER</div>
            <div className="text-sm font-semibold text-slate-900">{user.email}</div>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto md:hidden" onClick={signOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  );
}
