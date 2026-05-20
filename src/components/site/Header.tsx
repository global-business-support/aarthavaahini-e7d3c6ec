import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Banknote, Gauge, Mail, Menu, ShieldCheck, TrendingUp, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const nav = [
    { to: "/loans", label: "Loans", icon: Banknote },
    { to: "/insurance", label: "Insurance", icon: ShieldCheck },
    { to: "/mutual-funds", label: "Mutual Funds", icon: TrendingUp },
    { to: "/banking", label: "Banking", icon: Banknote },
    { to: "/cibil", label: "CIBIL", icon: Gauge },
    { to: "/about", label: "About", icon: User },
    { to: "/contact", label: "Contact", icon: Mail },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-card p-1 shadow-soft ring-1 ring-border">
            <img src={logo} alt="Aarthvaahini" className="h-full w-full object-contain" />
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-bold tracking-tight text-primary">AARTHVAAHINI</span>
            <span className="mt-1 text-[8px] font-semibold tracking-[0.22em] text-primary-glow">SRIJAN SE SAMRIDDHI TAK</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map(({ to, label }) => (
            <Link
              key={to} to={to}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-smooth hover:bg-accent hover:text-primary"
              activeProps={{ className: "bg-accent text-primary" }}
            >{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden h-10 rounded-full border border-border/70 sm:inline-flex">
                  <User className="h-4 w-4" /> {user.email?.split("@")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>Admin Panel</DropdownMenuItem>}
                <DropdownMenuItem onClick={async () => { await signOut(); navigate({ to: "/" }); }}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <Button asChild className="h-10 rounded-full bg-gradient-primary px-5 text-primary-foreground shadow-soft hover:opacity-95">
            <Link to="/contact">Apply Now</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden"><Menu className="h-5 w-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {nav.map(({ to, label }) => (
                <DropdownMenuItem key={to} onClick={() => navigate({ to })}>{label}</DropdownMenuItem>
              ))}
              {!user && <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>Login / Register</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
