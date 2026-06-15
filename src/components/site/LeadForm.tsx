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
import { loans, insurance, mutualFunds } from "@/data/products";

type Props = {
  productType:
    | "loan"
    | "insurance"
    | "mutual_fund"
    | "contact"
    | "cibil";
  productName?: string;
  buttonLabel?: string;
};

// Loan types and their sub-products (used for Apply Now → Loan)
const LOAN_TYPES: { value: string; label: string; subs: string[] }[] = [
  { value: "Home Loan", label: "Home Loan", subs: ["Home Purchase", "Home Construction", "Plot Loan", "Home Renovation", "Balance Transfer + Top-up"] },
  { value: "Personal Loan", label: "Personal Loan", subs: ["Salaried", "Self-Employed", "Wedding", "Medical", "Travel", "Debt Consolidation"] },
  { value: "Business Loan", label: "Business Loan", subs: ["MSME", "Working Capital", "Term Loan", "Startup", "CC / Overdraft"] },
  { value: "Car / Vehicle Loan", label: "Car / Vehicle Loan", subs: ["New Car", "Used Car", "Commercial Vehicle", "Two Wheeler"] },
  { value: "Education Loan", label: "Education Loan", subs: ["India", "Abroad", "Skill / Vocational"] },
  { value: "Loan Against Property", label: "Loan Against Property", subs: ["Residential", "Commercial", "Industrial", "LAP Overdraft"] },
  { value: "Gold Loan", label: "Gold Loan", subs: ["Bullet Repayment", "Monthly EMI"] },
  { value: "Project Loan", label: "Project Loan", subs: ["Infrastructure", "Real Estate", "Greenfield", "Brownfield"] },
  { value: "Credit Card", label: "Credit Card", subs: ["Cashback", "Travel", "Fuel", "Lifetime Free"] },
];

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
    loan_type: "",
    loan_sub_type: "",
    amount: "",
    monthly_income: "",
    message: "",
  });

  const productOptions = useMemo(() => {
    if (productType === "loan") return loans;
    if (productType === "insurance") return insurance;
    if (productType === "mutual_fund") return mutualFunds;
    return [];
  }, [productType]);

  const productLabel =
    productType === "loan"
      ? "Select Loan"
      : productType === "insurance"
      ? "Select Insurance Plan"
      : productType === "mutual_fund"
      ? "Select Mutual Fund"
      : "Product";

  const isLoanFlow = productType === "loan";
  const subOptions = useMemo(
    () => LOAN_TYPES.find((l) => l.value === form.loan_type)?.subs ?? [],
    [form.loan_type],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const chosenProduct = form.loan_sub_type || form.loan_type || productName || form.product || null;
    const { error } = await supabase.from("leads").insert({
      full_name: form.name,
      lead_name: form.name,
      email: form.email || null,
      phone: form.phone,
      amount: form.amount ? Number(form.amount) : null,
      loan_amount: form.amount ? Number(form.amount) : null,
      loan_type: form.loan_type || null,
      loan_sub_type: form.loan_sub_type || null,
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
      loan_type: "",
      loan_sub_type: "",
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

        {/* LOAN TYPE + SUB-TYPE for loan applications */}
        {isLoanFlow && (
          <>
            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-300">Loan Type</Label>
              <Select
                value={form.loan_type}
                onValueChange={(v) => setForm({ ...form, loan_type: v, loan_sub_type: "" })}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white">
                  <SelectValue placeholder="Choose loan type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {LOAN_TYPES.map((l) => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs font-medium text-slate-300">Sub-Loan Type</Label>
              <Select
                value={form.loan_sub_type}
                onValueChange={(v) => setForm({ ...form, loan_sub_type: v })}
                disabled={!form.loan_type}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-700 bg-slate-800/60 px-4 text-white disabled:opacity-50">
                  <SelectValue placeholder={form.loan_type ? "Choose sub-type" : "Select loan type first"} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {subOptions.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {!productName && !isLoanFlow && productOptions.length > 0 && (
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
          <Label className="mb-1.5 block text-xs font-medium text-slate-300">{isLoanFlow ? "Loan Amount (₹)" : "Amount (₹)"}</Label>
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
