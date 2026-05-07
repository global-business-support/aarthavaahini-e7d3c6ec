import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export function EmiCalculator() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, total, interest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi, total, interest: total - amount };
  }, [amount, rate, years]);

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 text-primary-foreground">
      <div className="absolute inset-0 bg-gradient-glow opacity-70" />
      <div className="container relative mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">Futuristic Tools</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">EMI Calculator</h2>
          <p className="mt-4 max-w-md text-primary-foreground/80">
            Plan your loan with precision. Adjust the sliders and see your monthly EMI, total interest and payable amount instantly.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Stat label="Monthly EMI" value={`₹ ${formatINR(emi)}`} highlight />
            <Stat label="Total Interest" value={`₹ ${formatINR(interest)}`} />
            <Stat label="Total Payable" value={`₹ ${formatINR(total)}`} />
          </div>
          <Button size="lg" className="mt-8 bg-white text-primary hover:bg-white/90 shadow-glow">
            <Calculator className="mr-2 h-4 w-4" /> Apply for this Loan
          </Button>
        </div>

        <Card className="relative border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-elegant">
          <div className="space-y-8">
            <Field label="Loan Amount" value={`₹ ${formatINR(amount)}`}>
              <Slider value={[amount]} min={100000} max={20000000} step={50000} onValueChange={(v) => setAmount(v[0])} />
            </Field>
            <Field label="Interest Rate" value={`${rate.toFixed(2)} %`}>
              <Slider value={[rate]} min={6} max={20} step={0.05} onValueChange={(v) => setRate(v[0])} />
            </Field>
            <Field label="Tenure" value={`${years} years`}>
              <Slider value={[years]} min={1} max={30} step={1} onValueChange={(v) => setYears(v[0])} />
            </Field>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-primary-foreground/80">{label}</span>
        <span className="font-display text-lg font-semibold">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border border-white/10 p-4 ${highlight ? "bg-white/15" : "bg-white/5"}`}>
      <p className="text-[11px] uppercase tracking-wider text-primary-foreground/70">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}
