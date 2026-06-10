import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import type { ProductItem } from "@/data/products";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import loanBg from "@/assets/loan-bg.jpg.asset.json";

type Props = {
  title: string;
  subtitle: string;
  items: ProductItem[];
  productType: "loan" | "insurance" | "mutual_fund" | "banking";
  accentClass: string;
};

// Light color palettes that rotate per card — no overlap, all readable
const CARD_PALETTES = [
  { bg: "bg-gradient-to-br from-sky-50 via-white to-blue-100",      ring: "ring-sky-200",    chip: "bg-sky-100 text-sky-700",        btn: "from-sky-500 to-blue-600" },
  { bg: "bg-gradient-to-br from-rose-50 via-white to-pink-100",     ring: "ring-rose-200",   chip: "bg-rose-100 text-rose-700",      btn: "from-rose-500 to-pink-600" },
  { bg: "bg-gradient-to-br from-emerald-50 via-white to-teal-100",  ring: "ring-emerald-200",chip: "bg-emerald-100 text-emerald-700",btn: "from-emerald-500 to-teal-600" },
  { bg: "bg-gradient-to-br from-amber-50 via-white to-orange-100",  ring: "ring-amber-200",  chip: "bg-amber-100 text-amber-700",    btn: "from-amber-500 to-orange-600" },
  { bg: "bg-gradient-to-br from-violet-50 via-white to-purple-100", ring: "ring-violet-200", chip: "bg-violet-100 text-violet-700",  btn: "from-violet-500 to-purple-600" },
  { bg: "bg-gradient-to-br from-cyan-50 via-white to-sky-100",      ring: "ring-cyan-200",   chip: "bg-cyan-100 text-cyan-700",      btn: "from-cyan-500 to-sky-600" },
];

// Backdrop is now provided globally by <AnimatedBackground /> on each product route.

export function ProductPage({ title, subtitle, items, productType, accentClass }: Props) {
  const isLoanPage = productType === "loan";

  return (
    <div className={cn("relative isolate overflow-hidden", isLoanPage && "loan-products-bg") }>
      {isLoanPage && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-100 animate-loan-products-bg"
            style={{ backgroundImage: `url('${loanBg.url}')` }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white/20 via-white/0 to-white/25" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(37,99,235,0.1),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(14,165,233,0.1),transparent_32%)]" />
        </>
      )}
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className={`font-display text-4xl font-bold sm:text-5xl ${accentClass}`}>{title}</h1>
          <p className={cn("mt-4", isLoanPage ? "font-medium text-slate-700" : "text-muted-foreground")}>{subtitle}</p>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-1 md:grid-cols-2 [perspective:1400px]">
          {items.map((p, i) => {
            const palette = CARD_PALETTES[i % CARD_PALETTES.length];
            return (
              <Card
                key={p.slug}
                className={cn(
                  "card-3d group relative flex flex-col overflow-hidden rounded-2xl p-7 ring-1 border-0 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] backdrop-blur-sm",
                  isLoanPage && "loan-product-card",
                  palette.bg,
                  palette.ring,
                )}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/60 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                <div className="relative flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-slate-900">{p.name}</h3>
                  {p.tag && <Badge className={cn("border-0", palette.chip)}>{p.tag}</Badge>}
                </div>
                {p.rate && <p className="relative mt-1 text-sm font-semibold text-slate-700">{p.rate}</p>}
                <p className="relative mt-3 text-sm text-slate-600">{p.desc}</p>
                <ul className="relative mt-4 flex-1 space-y-2 text-sm text-slate-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className={cn("relative mt-6 w-full bg-gradient-to-r text-white shadow-md transition hover:opacity-95", palette.btn)}>
                      Apply / Enquire
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg p-0">
                    <DialogHeader className="px-6 pt-6">
                      <DialogTitle className="text-white">{p.name} — Enquiry</DialogTitle>
                    </DialogHeader>
                    <LeadForm productType={productType} productName={p.name} />
                  </DialogContent>
                </Dialog>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
