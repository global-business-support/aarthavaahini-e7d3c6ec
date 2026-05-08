import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calculator, Gauge, Wallet } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-24 items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-card p-1 shadow-soft ring-1 ring-border">
            <img src={logo} alt="Aarthvaahini" className="h-full w-full object-contain" />
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-xl font-bold tracking-tight text-primary">AARTHVAAHINI</span>
            <span className="mt-1 text-[9px] font-semibold tracking-[0.22em] text-primary-glow">
              SRIJAN SE SAMRIDDHI TAK
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-full border border-border/70 bg-secondary/60 px-5 font-semibold text-foreground hover:border-primary/40 hover:bg-accent hover:text-primary"
          >
            <a href="#products">
              <Wallet className="h-4 w-4 text-primary-glow" />
              Products
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-full border border-border/70 bg-secondary/60 px-5 font-semibold text-foreground hover:border-primary/40 hover:bg-accent hover:text-primary"
          >
            <a href="#calculator">
              <Calculator className="h-4 w-4 text-primary-glow" />
              EMI Calculator
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-full border border-border/70 bg-secondary/60 px-5 font-semibold text-foreground hover:border-primary/40 hover:bg-accent hover:text-primary"
          >
            <a href="#cibil">
              <Gauge className="h-4 w-4 text-primary-glow" />
              CIBIL Checker
            </a>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">Admin Login</Button>
          <Button className="h-11 rounded-full bg-gradient-primary px-6 text-primary-foreground shadow-soft hover:opacity-95">
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
