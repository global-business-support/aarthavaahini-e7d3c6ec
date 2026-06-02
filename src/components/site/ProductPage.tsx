import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import type { ProductItem } from "@/data/products";
import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  items: ProductItem[];
  productType: "loan" | "insurance" | "mutual_fund" | "banking";
  accentClass: string;
};

export function ProductPage({ title, subtitle, items, productType, accentClass }: Props) {
  return (
    <div className="container mx-auto px-6 py-25">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className={`font-display text-4xl font-bold sm:text-5xl ${accentClass}`}>{title}</h1>
        <p className="mt-4 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Card key={p.slug} className="flex flex-col p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-xl font-bold text-foreground">{p.name}</h3>
              {p.tag && <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{p.tag}</Badge>}
            </div>
            {p.rate && <p className="mt-1 text-sm font-semibold text-primary-glow">{p.rate}</p>}
            <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{f}</li>
              ))}
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-5 bg-gradient-primary text-primary-foreground">Apply / Enquire</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle>{p.name} — Enquiry</DialogTitle></DialogHeader>
                <LeadForm productType={productType} productName={p.name}
                  showAmount={productType === "loan" || productType === "insurance" || productType === "mutual_fund"}
                  showMessage />
              </DialogContent>
            </Dialog>
          </Card>
        ))}
      </div>
    </div>
  );
}
