import { Button } from "@/components/ui/button";
import { Banknote, Landmark, ShieldCheck, Sparkles, TrendingUp, Umbrella } from "lucide-react";
import advisor from "@/assets/hero-advisor.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-foreground">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto grid min-h-[calc(100vh-6rem)] items-center gap-8 px-6 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-16">
        <img
          src={advisor}
          alt=""
          aria-hidden
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-24 bottom-0 z-0 h-[420px] w-[420px] object-cover opacity-20 sm:hidden"
          style={{ maskImage: "radial-gradient(ellipse at center, #000 54%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse at center, #000 54%, transparent 100%)" }}
        />
        <div className="relative z-10 flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> India's Trusted Financial Partner
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Banking, Loans & Insurance made simple.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            Aarthvaahini helps you compare loans, protect your family with insurance, and plan investments with a trusted financial advisor experience.
          </p>
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Landmark, label: "Banking" },
              { icon: Banknote, label: "Loans" },
              { icon: Umbrella, label: "Insurance" },
              { icon: TrendingUp, label: "Mutual Funds" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-border/70 bg-card/70 p-3 text-center shadow-soft backdrop-blur">
                <Icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-xs font-semibold text-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
              Check My CIBIL — Free
            </Button>
            <Button size="lg" variant="outline" className="border-primary/25 bg-card/60 text-primary hover:bg-accent">
              Explore Products
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-glow" /> RBI compliant partners</div>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary-glow" /> 50,000+ happy customers</div>
          </div>
        </div>

        <div className="relative hidden min-h-[390px] items-end justify-center sm:flex sm:min-h-[520px] lg:min-h-[620px]">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-glow blur-2xl" />
          <div className="relative w-full max-w-[430px] sm:max-w-[620px]">
            <img
              src={advisor}
              alt="Aarthvaahini financial advisor showing loans, insurance and mutual funds"
              width={1024}
              height={1024}
              className="h-auto w-full object-cover"
              style={{ maskImage: "radial-gradient(ellipse at center, #000 66%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse at center, #000 66%, transparent 100%)" }}
            />
          </div>
          <div className="absolute bottom-8 left-4 hidden rounded-2xl border border-border/70 bg-card/80 px-5 py-3 shadow-soft backdrop-blur md:block">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">CIBIL Score</p>
            <p className="font-display text-2xl font-bold text-foreground">782 <span className="text-sm text-success">Excellent</span></p>
          </div>
          <div className="absolute right-2 top-12 hidden rounded-2xl border border-border/70 bg-card/80 px-5 py-3 shadow-soft backdrop-blur md:block">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Home Loan EMI</p>
            <p className="font-display text-2xl font-bold text-foreground">₹ 42,318<span className="text-sm font-normal">/mo</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
