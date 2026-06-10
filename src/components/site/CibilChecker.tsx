import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Gauge, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function CibilChecker() {
  const [form, setForm] = useState({ name: "", pan: "", mobile: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name");
    if (form.mobile.trim().length < 7) return toast.error("Please enter a valid mobile number");
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      full_name: form.name.trim(),
      lead_name: form.name.trim(),
      phone: form.mobile.trim(),
      pan: form.pan.trim() || null,
      product_type: "cibil",
      product_name: "CIBIL Score Check",
      lead_source: "Website",
      status: "New",
      message: "Free CIBIL score request from website",
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Thank you! We will share your CIBIL report shortly.");
    setForm({ name: "", pan: "", mobile: "" });
  };

  return (
    <section id="cibil" className="container mx-auto scroll-mt-24 px-6 py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Card className="relative overflow-hidden border/60 bg-gradient-card p-10 shadow-elegant">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Gauge className="h-3.5 w-3.5" /> 100% Free • No impact on score
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Check your <span className="text-gradient">CIBIL Score</span> in 30 seconds
            </h2>
            <p className="mt-3 text-muted-foreground">
              Know exactly where you stand before applying for any loan. Improve your eligibility with personalised tips.
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="As per PAN" className="mt-1.5 h-11"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" placeholder="ABCDE1234F" className="mt-1.5 h-11"
                  value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })} />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" placeholder="+91 98xxxxxxxx" className="mt-1.5 h-11"
                  value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
              </div>
              <Button type="submit" size="lg" disabled={loading}
                className="sm:col-span-2 bg-linear-to-r from-[#17357e] to-blue-600 shadow-glow">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get my Score — Free
              </Button>
            </form>

            <ul className="mt-6 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
              {["Soft pull — no score impact", "Bank-level encryption", "Personalised loan offers", "Score improvement tips"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary-glow" /> {t}</li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="relative mx-auto">
          <div className="absolute inset-0 animate-pulse-glow rounded-full" />
          <CibilDial score={782} />
        </div>
      </div>
    </section>
  );
}

function CibilDial({ score }: { score: number }) {
  const min = 300, max = 900;
  const pct = (score - min) / (max - min);
  const angle = -120 + pct * 240;
  return (
    <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-gradient-card shadow-elegant">
      <svg viewBox="0 0 200 200" className="h-full w-full rotate-[-30deg]">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.32 0.16 260)" />
            <stop offset="1" stopColor="oklch(0.62 0.18 245)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" stroke="oklch(0.92 0.015 245)" strokeWidth="14" fill="none" strokeDasharray="335 503" strokeLinecap="round" />
        <circle cx="100" cy="100" r="80" stroke="url(#g)" strokeWidth="14" fill="none"
          strokeDasharray={`${pct * 335} 503`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Score</span>
        <span className="font-display text-6xl font-bold text-gradient">{score}</span>
        <span className="mt-1 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Excellent</span>
        <svg className="mt-2 text-muted-foreground" width="40" height="12" viewBox="0 0 40 12" aria-hidden>
          <g transform={`translate(20 6) rotate(${angle})`}>
            <rect x="-0.5" y="-5" width="1" height="5" className="fill-current text-muted-foreground" />
            <circle cx="0" cy="0" r="1.6" className="fill-current text-muted-foreground" />
          </g>
        </svg>
      </div>
    </div>
  );
}
