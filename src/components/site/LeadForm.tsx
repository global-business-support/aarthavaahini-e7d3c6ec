import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { loans, insurance, mutualFunds, bankingProducts } from "@/data/products";

type Props = {
  productType:
    | "loan"
    | "insurance"
    | "mutual_fund"
    | "banking"
    | "contact"
    | "cibil";
  productName?: string;
  buttonLabel?: string;
};

export function LeadForm({
  productType,
  productName,
  buttonLabel = "Submit Enquiry",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: productName ?? "",
    amount: "",
    monthly_income: "",
    message: "",
  });

  const productOptions = useMemo(() => {
    if (productType === "loan") return loans;
    if (productType === "insurance") return insurance;
    if (productType === "mutual_fund") return mutualFunds;
    if (productType === "banking") return bankingProducts;
    return [];
  }, [productType]);

  const productLabel =
    productType === "loan"
      ? "Select Loan"
      : productType === "insurance"
      ? "Select Insurance Plan"
      : productType === "mutual_fund"
      ? "Select Mutual Fund"
      : productType === "banking"
      ? "Select Banking Product"
      : "Product";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const chosenProduct = productName || form.product || null;
    const { error } = await supabase.from("leads").insert({
      full_name: form.name,
      lead_name: form.name,
      email: form.email || null,
      phone: form.phone,
      amount: form.amount ? Number(form.amount) : null,
      message: form.message || null,
      product_type: productType === "contact" ? "loan" : productType,
      product_name: chosenProduct,
      lead_source: "Website",
      status: "New",
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Lead Submitted Successfully!");
    setForm({
      name: "",
      email: "",
      phone: "",
      product: productName ?? "",
      amount: "",
      monthly_income: "",
      message: "",
    });
  };

  return (
    <div className="w-full rounded-[24px] bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 sm:p-8 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {productName ? `${productName} — Enquiry` : "Apply Now"}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Fill in your details and our expert will contact you shortly.
        </p>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">Full Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your full name"
            required
            className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
          />
        </div>

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
          />
        </div>

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 9xxxxxxxxx"
            required
            className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
          />
        </div>

        {!productName && productOptions.length > 0 && (
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block text-xs font-medium text-slate-300">{productLabel}</Label>
            <Select
              value={form.product}
              onValueChange={(v) => setForm({ ...form, product: v })}
            >
              <SelectTrigger className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white">
                <SelectValue placeholder={`Choose a ${productType.replace(/_/g, " ")}`} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {productOptions.map((p) => (
                  <SelectItem key={p.slug} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">Amount (₹)</Label>
          <Input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="5,00,000"
            className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
          />
        </div>

        <div>
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">Monthly Income</Label>
          <Input
            type="number"
            value={form.monthly_income}
            onChange={(e) => setForm({ ...form, monthly_income: e.target.value })}
            placeholder="50,000"
            className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
          />
        </div>

        <div className="sm:col-span-2">
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">Message</Label>
          <Textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Write your message..."
            className="rounded-xl border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:ring-sky-500 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 h-12 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.01] hover:opacity-95"
        >
          {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {buttonLabel}
        </Button>
      </form>
    </div>
  );
}
