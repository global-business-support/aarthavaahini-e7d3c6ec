import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/", label: "Loans" },
  { to: "/", label: "Insurance" },
  { to: "/", label: "Mutual Funds" },
  { to: "/", label: "Calculators" },
  { to: "/", label: "CIBIL Checker" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Aarthvaahini logo" className="h-12 w-auto object-contain" />
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-bold text-primary">AARTHVAAHINI</span>
            <span className="text-[10px] font-medium tracking-[0.18em] text-primary-glow">SRIJAN SE SAMRIDDHI TAK</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a key={n.label} href="#" className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">Admin Login</Button>
          <Button className="bg-gradient-primary text-primary-foreground shadow-soft hover:opacity-95">
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
