import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Banknote, ChevronLeft, ChevronRight, Gauge, ShieldCheck, TrendingUp } from "lucide-react";

type Slide = {
  badge: string;
  title: string;
  subtitle: string;
  cta: { label: string; to: string };
  bg: string;
  accent: string;
  icon: typeof Banknote;
};

const slides: Slide[] = [
  {
    badge: "Home Loan", title: "Apna ghar, ab aasaan", subtitle: "Starting @ 8.40% p.a.* — 40+ banks me se best rate.",
    cta: { label: "Apply Home Loan", to: "/loans" },
    bg: "from-[#EAF3FF] via-[#DDE9FF] to-[#F4E8FF]", accent: "text-[#1565C0]", icon: Banknote,
  },
  {
    badge: "Term Insurance", title: "₹1 Cr cover @ just ₹500/m*", subtitle: "Pariwar ki suraksha — tax bachat 80C + 10(10D).",
    cta: { label: "Get Insurance", to: "/insurance" },
    bg: "from-[#FCE4EC] via-[#FFEAF1] to-[#FFF1E5]", accent: "text-[#AD1457]", icon: ShieldCheck,
  },
  {
    badge: "SIP", title: "₹500 se shuru karein investing", subtitle: "Average 14% CAGR* — ELSS, equity, debt — sab ek jagah.",
    cta: { label: "Start SIP", to: "/mutual-funds" },
    bg: "from-[#E8F5E9] via-[#DFF5E1] to-[#E3F2FD]", accent: "text-[#2E7D32]", icon: TrendingUp,
  },
  {
    badge: "Free", title: "CIBIL Score 30 second me", subtitle: "100% free, no score impact — personalised loan offers.",
    cta: { label: "Check CIBIL", to: "/cibil" },
    bg: "from-[#FFF4E5] via-[#FFE8D6] to-[#FCE4EC]", accent: "text-[#E65100]", icon: Gauge,
  },
];

export function HeroBanner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  const Icon = s.icon;

  return (
    <section className="container mx-auto px-4 pt-6 sm:px-6">
      <div className={`relative overflow-hidden rounded-4xl border border-border/70 bg-linear-to-br ${s.bg} shadow-elegant transition-all duration-700`}>
        <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-soft backdrop-blur ${s.accent}`}>
              <Icon className="h-3.5 w-3.5" /> {s.badge}
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">{s.title}</h2>
            <p className="mt-3 max-w-xl text-base text-foreground/70 sm:text-lg">{s.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
                <Link to={s.cta.to}>{s.cta.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 bg-white/60">
                <Link to="/contact">Talk to Advisor</Link>
              </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 bg-white/60">
                <Link to="/contact">contact</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className={`flex h-44 w-44 items-center justify-center rounded-full bg-white/60 shadow-elegant backdrop-blur ${s.accent}`}>
              <Icon className="h-20 w-20" strokeWidth={1.4} />
            </div>
          </div>
        </div>

        <button
          onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-soft backdrop-blur hover:bg-white"
        ><ChevronLeft className="h-5 w-5 text-foreground" /></button>
        <button
          onClick={() => setI((p) => (p + 1) % slides.length)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-soft backdrop-blur hover:bg-white"
        ><ChevronRight className="h-5 w-5 text-foreground" /></button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-foreground/80" : "w-2 bg-foreground/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
