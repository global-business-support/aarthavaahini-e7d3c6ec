import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import advisor from "@/assets/hero-advisor.png";
import bg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <img src={bg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto grid gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> India's Trusted Financial Partner
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Smarter Loans. <br />
            Stronger Future.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/80">
            Aarthvaahini brings you bank-grade Loans, Insurance and Mutual Fund products
            with a futuristic calculator, instant CIBIL check and end-to-end lead management — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
              Check My CIBIL — Free
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15">
              Explore Products
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground/85">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary-glow" /> RBI compliant partners</div>
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary-glow" /> 50,000+ happy customers</div>
          </div>
        </div>

        <div className="relative flex items-end justify-center">
          <div className="absolute inset-x-6 bottom-0 top-10 rounded-[2rem] bg-gradient-to-br from-primary-glow/30 via-fuchsia-400/20 to-transparent blur-3xl" />
          <div className="relative animate-float">
            <img
              src={advisor}
              alt="Aarthvaahini financial advisor"
              width={560}
              height={560}
              className="h-[480px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(20,10,80,0.55)]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur md:block">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70">CIBIL Score</p>
            <p className="font-display text-2xl font-bold">782 <span className="text-sm text-emerald-300">Excellent</span></p>
          </div>
          <div className="absolute -right-2 top-10 hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur md:block">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Home Loan EMI</p>
            <p className="font-display text-2xl font-bold">₹ 42,318<span className="text-sm font-normal">/mo</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
