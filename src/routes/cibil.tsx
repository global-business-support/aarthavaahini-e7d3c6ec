import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, Gauge, Loader2 } from "lucide-react";

export const Route = createFileRoute("/cibil")({
  head: () => ({ meta: [{ title: "Free CIBIL Score Check — Aarthvaahini" }]}),
  component: CibilPage,
});

function CibilPage() {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [form, setForm] = useState({ full_name: "", pan: "", phone: "" });

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.full_name.trim().length < 2 || form.phone.trim().length < 7)
      return toast.error("Sahi details daale");
    setLoading(true);
    // Mock CIBIL — realistic distribution 650-820
    await new Promise((r) => setTimeout(r, 1400));
    const s = Math.floor(650 + Math.random() * 170);
    setScore(s);
    await supabase.from("leads").insert({
      full_name: form.full_name.trim(), phone: form.phone.trim(),
      product_type: "cibil", product_name: "CIBIL Score Check",
      message: `PAN: ${form.pan}, Score: ${s}`,
    });
    setLoading(false);
  };

  const band = score == null ? "" : score >= 780 ? "Excellent" : score >= 720 ? "Very Good" : score >= 680 ? "Good" : "Fair";
  const bandColor = score == null ? "" : score >= 720 ? "text-success" : score >= 680 ? "text-amber-600" : "text-orange-600";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Card className="p-8 shadow-elegant">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Gauge className="h-3.5 w-3.5" /> 100% Free • No score impact
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold">Check your <span className="text-gradient">CIBIL Score</span></h1>
            <p className="mt-3 text-muted-foreground"></p>Check your credit score in just 30 seconds.
            <form onSubmit={check} className="mt-6 space-y-4">
              <div><Label>Full Name (as per PAN)</Label><Input className="mt-1.5 h-11" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>PAN</Label><Input className="mt-1.5 h-11" placeholder="ABCDE1234F" value={form.pan} onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })} /></div>
                <div><Label>Mobile</Label><Input className="mt-1.5 h-11" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-primary text-primary-foreground shadow-glow">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Get My Score — Free
              </Button>
              <p className="text-xs text-muted-foreground">* Demo mode — Contact the administrator to enable real-time CIBIL API integration.</p>
            </form>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {["Soft pull — no impact", "Bank-level encryption", "Personalised loan offers", "Score improvement tips"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary-glow" /> {t}</li>
              ))}
            </ul>
          </Card>

          <Card className="flex items-center justify-center p-10 shadow-elegant">
            {score == null ? (
              <div className="text-center text-muted-foreground">
                <Gauge className="mx-auto h-20 w-20 opacity-40" />
                <p className="mt-4 text-sm">Fill out the form and get your score.</p>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Score</span>
                <p className="mt-2 font-display text-7xl font-bold text-gradient">{score}</p>
                <p className={`mt-2 text-lg font-bold ${bandColor}`}>{band}</p>
                <p className="mt-3 text-sm text-muted-foreground">Range: 300 – 900</p>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
