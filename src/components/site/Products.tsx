import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, ShieldPlus, LineChart, ArrowRight, Landmark, FileCheck2, Percent } from "lucide-react";

const bankingFeatures = [
  { icon: Landmark, title: "40+ bank partners", desc: "Home, business and personal loan options in one place." },
  { icon: Percent, title: "Low interest offers", desc: "Compare rates and eligibility before you apply." },
  { icon: ShieldPlus, title: "Insurance protection", desc: "Health, life, term and motor plans for every family." },
  { icon: FileCheck2, title: "Fast processing", desc: "Guided documentation with advisor support." },
];

const products = [
  {
    icon: Banknote,
    title: "Loans",
    desc: "Home, Personal, Business & Loan Against Property at the lowest interest rates from 40+ banks.",
    items: ["Home Loan", "Personal Loan", "Business Loan", "LAP"],
  },
  {
    icon: ShieldPlus,
    title: "Insurance",
    desc: "Protect what matters — Health, Life, Term & Motor insurance from India's top insurers.",
    items: ["Health", "Term Life", "Motor", "Travel"],
  },
  {
    icon: LineChart,
    title: "Mutual Funds",
    desc: "SIP & lump-sum investing with curated portfolios designed by SEBI-registered experts.",
    items: ["Equity SIP", "ELSS Tax Saver", "Debt Funds", "NPS"],
  },
];

export function Products() {
  return (
    <section id="products" className="container mx-auto scroll-mt-24 px-6 py-24">
      <div className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/75 p-4 shadow-soft backdrop-blur md:grid-cols-4 md:p-5">
        {bankingFeatures.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl bg-secondary/55 p-5">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">Our Products</span>
        <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
          Banking, loans and protection, <span className="text-gradient">in one place</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          A complete suite of loan, insurance and investment products built for India's growing households and entrepreneurs.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {products.map(({ icon: Icon, title, desc, items }) => (
          <Card key={title} className="group relative overflow-hidden border-border/60 bg-gradient-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-primary opacity-10 blur-2xl transition-smooth group-hover:opacity-25" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-foreground/80">
                {items.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="mt-6 px-0 text-primary hover:bg-transparent hover:text-primary-glow">
                View features <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
