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
import insuranceBg from "@/assets/insurance-bg.jpeg.asset.json";
import mutualFundBg from "@/assets/mutual-fund-bg.jpg.asset.json";

type Props = {
  title: string;
  subtitle: string;
  items: ProductItem[];
  productType: "loan" | "insurance" | "mutual_fund" | "banking";
  accentClass: string;
};

// Single professional light-blue palette for all product cards
const CARD_PALETTES = [
  { bg: "bg-gradient-to-br from-blue-50 via-white to-slate-100", ring: "ring-blue-200", chip: "bg-blue-100 text-blue-700", btn: "from-blue-600 to-blue-700" },
];

const BG_BY_TYPE: Record<Props["productType"], { url: string } | null> = {
  loan: loanBg,
  insurance: insuranceBg,
  mutual_fund: mutualFundBg,
  banking: null,
};

const RADIAL_BY_TYPE: Record<Props["productType"], string> = {
  loan: "bg-[radial-gradient(circle_at_18%_22%,rgba(37,99,235,0.10),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(14,165,233,0.10),transparent_32%)]",
  insurance: "bg-[radial-gradient(circle_at_18%_22%,rgba(244,63,94,0.10),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(217,70,239,0.10),transparent_32%)]",
  mutual_fund: "bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.10),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(245,158,11,0.10),transparent_32%)]",
  banking: "",
};

export function ProductPage({ title, subtitle, items, productType, accentClass }: Props) {
  const bg = BG_BY_TYPE[productType];
  const hasBg = !!bg;

  return (
    <div className={cn("relative isolate overflow-hidden", hasBg && "products-bg") }>
      {hasBg && bg && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-90 mix-blend-multiply animate-products-bg"
            style={{
              backgroundImage: `url('${bg.url}')`,
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <div
            aria-hidden
            className="hidden md:block absolute -right-10 top-24 -z-10 h-[32rem] w-[46rem] max-w-[76vw] rounded-[2rem] bg-cover bg-center opacity-60 mix-blend-multiply shadow-2xl animate-float"
            style={{ backgroundImage: `url('${bg.url}')` }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 via-transparent to-white/10" />
          <div aria-hidden className={cn("absolute inset-0 -z-10", RADIAL_BY_TYPE[productType])} />
        </>
      )}

      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className={`font-display text-4xl font-bold sm:text-5xl ${accentClass}`}>{title}</h1>
          <p className={cn("mt-4", hasBg ? "font-medium text-slate-700" : "text-muted-foreground")}>{subtitle}</p>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-1 md:grid-cols-2 [perspective:1400px]">
          {items.map((p, i) => {
            const palette = CARD_PALETTES[i % CARD_PALETTES.length];
            return (
              <Card
                key={p.slug}
                className={cn(
                  "card-3d group relative flex flex-col overflow-hidden rounded-2xl ring-1 border-0 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] backdrop-blur-sm",
                  hasBg && "product-card-glass",

                  palette.bg,
                  palette.ring,
                )}
              >
                {p.image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                      <h3 className="font-display text-2xl font-bold leading-tight text-white drop-shadow">{p.name}</h3>
                      {p.tag && <Badge className={cn("border-0 shadow", palette.chip)}>{p.tag}</Badge>}
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/60 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                  {!p.image && (
                    <div className="relative flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl font-bold text-slate-900">{p.name}</h3>
                      {p.tag && <Badge className={cn("border-0", palette.chip)}>{p.tag}</Badge>}
                    </div>
                  )}
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
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
