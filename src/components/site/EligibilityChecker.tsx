import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import {
  CheckCircle2,
  XCircle,
  Wallet,
  Home,
  Briefcase,
  Car,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Calculator,
} from "lucide-react";

type EmploymentType = "salaried" | "self_employed" | "business" | "student";

interface BaseInputs {
  fullName: string;
  age: number;
  city: string;
  employment: EmploymentType;
  monthlyIncome: number;
  monthlyEmi: number;
  cibil: number;
  workYears: number;
}

interface ProductExtras {
  // loan-specific
  loanAmount?: number;
  loanTenure?: number; // years
  propertyValue?: number;
  vehicleValue?: number;
  collegeFees?: number;
  businessTurnover?: number;
  // insurance
  sumAssured?: number;
  members?: number;
  // mutual funds
  sipAmount?: number;
}

type ProductKey =
  | "personal_loan"
  | "home_loan"
  | "business_loan"
  | "car_loan"
  | "education_loan"
  | "health_insurance"
  | "life_insurance"
  | "mutual_funds";

interface ProductDef {
  key: ProductKey;
  name: string;
  category: "loan" | "insurance" | "investment";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  fields: Array<keyof ProductExtras>;
}

const PRODUCTS: ProductDef[] = [
  { key: "personal_loan", name: "Personal Loan", category: "loan", icon: Wallet, color: "from-blue-500 to-indigo-600", fields: ["loanAmount", "loanTenure"] },
  { key: "home_loan", name: "Home Loan", category: "loan", icon: Home, color: "from-orange-500 to-amber-600", fields: ["loanAmount", "loanTenure", "propertyValue"] },
  { key: "business_loan", name: "Business Loan", category: "loan", icon: Briefcase, color: "from-emerald-500 to-green-600", fields: ["loanAmount", "loanTenure", "businessTurnover"] },
  { key: "car_loan", name: "Car Loan", category: "loan", icon: Car, color: "from-rose-500 to-pink-600", fields: ["loanAmount", "loanTenure", "vehicleValue"] },
  { key: "education_loan", name: "Education Loan", category: "loan", icon: GraduationCap, color: "from-purple-500 to-fuchsia-600", fields: ["loanAmount", "loanTenure", "collegeFees"] },
  { key: "health_insurance", name: "Health Insurance", category: "insurance", icon: HeartPulse, color: "from-teal-500 to-cyan-600", fields: ["sumAssured", "members"] },
  { key: "life_insurance", name: "Life Insurance", category: "insurance", icon: ShieldCheck, color: "from-sky-500 to-blue-600", fields: ["sumAssured"] },
  { key: "mutual_funds", name: "Mutual Funds / SIP", category: "investment", icon: TrendingUp, color: "from-amber-500 to-orange-600", fields: ["sipAmount"] },
];

interface EligibilityResult {
  eligible: boolean;
  score: number; // 0-100
  maxAmount?: number;
  estimatedEmi?: number;
  premium?: number;
  reasons: string[];
  positives: string[];
}

function compute(product: ProductDef, base: BaseInputs, ex: ProductExtras): EligibilityResult {
  const reasons: string[] = [];
  const positives: string[] = [];
  let score = 60;

  // common checks
  if (base.age < 21) reasons.push("Minimum age requirement is 21 years");
  else if (base.age > 21) { positives.push("Age criteria met"); score += 5; }

  if (base.monthlyIncome <= 0) reasons.push("Monthly income is required");

  const foir = base.monthlyIncome > 0 ? (base.monthlyEmi / base.monthlyIncome) * 100 : 100;
  if (foir > 50) reasons.push(`Existing EMI burden too high (FOIR ${foir.toFixed(0)}%)`);
  else if (foir < 30) { positives.push("Healthy FOIR"); score += 5; }

  if (product.category === "loan") {
    if (base.cibil < 650) reasons.push(`CIBIL score ${base.cibil} below 650`);
    else if (base.cibil >= 750) { positives.push("Excellent CIBIL score"); score += 15; }
    else { positives.push("Acceptable CIBIL score"); score += 8; }

    if (base.workYears < 1) reasons.push("Minimum 1 year work experience required");
    else if (base.workYears >= 3) { positives.push("Stable work history"); score += 5; }
  }

  // product specific
  const rate = product.key === "home_loan" ? 8.5 : product.key === "car_loan" ? 9.5 : product.key === "education_loan" ? 10.5 : product.key === "business_loan" ? 14 : 12;
  const tenure = ex.loanTenure ?? 5;

  let maxAmount: number | undefined;
  let estimatedEmi: number | undefined;
  let premium: number | undefined;

  if (product.category === "loan") {
    // Max EMI = 50% of income - existing EMI
    const maxEmi = Math.max(0, base.monthlyIncome * 0.5 - base.monthlyEmi);
    const r = rate / 1200;
    const n = tenure * 12;
    maxAmount = r > 0 ? (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) : maxEmi * n;

    if (product.key === "home_loan") maxAmount = Math.min(maxAmount, (ex.propertyValue ?? 0) * 0.8);
    if (product.key === "car_loan") maxAmount = Math.min(maxAmount, (ex.vehicleValue ?? 0) * 0.85);
    if (product.key === "education_loan") maxAmount = Math.min(maxAmount, (ex.collegeFees ?? maxAmount) || maxAmount);
    if (product.key === "business_loan" && ex.businessTurnover) {
      maxAmount = Math.min(maxAmount, ex.businessTurnover * 0.3);
    }

    const requested = ex.loanAmount ?? 0;
    if (requested > 0) {
      if (requested > maxAmount) reasons.push(`Requested amount exceeds max eligible ₹${Math.round(maxAmount).toLocaleString("en-IN")}`);
      else { positives.push("Requested amount within eligibility"); score += 10; }
      estimatedEmi = (requested * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
  }

  if (product.category === "insurance") {
    if (product.key === "health_insurance") {
      const members = ex.members ?? 1;
      const sum = ex.sumAssured ?? 500000;
      premium = Math.round((sum / 100000) * 700 * Math.max(1, members * 0.8) * (base.age > 45 ? 1.5 : 1));
      positives.push("Insurance plans available");
      score += 10;
    } else {
      const sum = ex.sumAssured ?? 1000000;
      premium = Math.round((sum / 100000) * 450 * (base.age > 45 ? 1.6 : 1));
      if (base.age > 65) reasons.push("Age above 65 — limited plans available");
      else positives.push("Term plan options available");
      score += 8;
    }
  }

  if (product.category === "investment") {
    const sip = ex.sipAmount ?? 0;
    if (sip < 500) reasons.push("Minimum SIP is ₹500");
    else { positives.push("SIP amount accepted"); score += 10; }
    if (base.monthlyEmi + sip > base.monthlyIncome * 0.7) reasons.push("SIP + EMI exceeds 70% of income");
  }

  score = Math.max(0, Math.min(100, score));
  const eligible = reasons.length === 0;

  return { eligible, score, maxAmount, estimatedEmi, premium, reasons, positives };
}

const formatINR = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(2)} L` : `₹${Math.round(n).toLocaleString("en-IN")}`;

export function EligibilityChecker() {
  const [base, setBase] = useState<BaseInputs>({
    fullName: "",
    age: 28,
    city: "",
    employment: "salaried",
    monthlyIncome: 50000,
    monthlyEmi: 0,
    cibil: 720,
    workYears: 3,
  });
  const [activeProduct, setActiveProduct] = useState<ProductKey>("personal_loan");
  const [extras, setExtras] = useState<Record<ProductKey, ProductExtras>>({
    personal_loan: { loanAmount: 500000, loanTenure: 5 },
    home_loan: { loanAmount: 3000000, loanTenure: 20, propertyValue: 5000000 },
    business_loan: { loanAmount: 1000000, loanTenure: 5, businessTurnover: 5000000 },
    car_loan: { loanAmount: 700000, loanTenure: 5, vehicleValue: 900000 },
    education_loan: { loanAmount: 800000, loanTenure: 7, collegeFees: 1000000 },
    health_insurance: { sumAssured: 500000, members: 2 },
    life_insurance: { sumAssured: 5000000 },
    mutual_funds: { sipAmount: 5000 },
  });
  const [submitted, setSubmitted] = useState(false);

  const product = useMemo(() => PRODUCTS.find((p) => p.key === activeProduct)!, [activeProduct]);
  const result = useMemo(() => compute(product, base, extras[activeProduct]), [product, base, extras, activeProduct]);

  const updateExtra = (k: keyof ProductExtras, v: number) =>
    setExtras((prev) => ({ ...prev, [activeProduct]: { ...prev[activeProduct], [k]: v } }));

  return (
    <section id="eligibility" className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-3">
            <Calculator className="h-4 w-4" /> Eligibility Check
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Check Your Eligibility — Product Wise
          </h2>
          <p className="mt-3 text-slate-600">
            Enter your employment & financial details once and instantly check eligibility for every loan, insurance and investment product.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* LEFT: Common details */}
          <div className="lg:col-span-2 rounded-3xl border bg-white p-6 shadow-sm h-fit">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Details</h3>

            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={base.fullName} onChange={(e) => setBase({ ...base, fullName: e.target.value })} placeholder="As per PAN" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Age</Label>
                  <Input type="number" value={base.age} onChange={(e) => setBase({ ...base, age: +e.target.value })} />
                </div>
                <div>
                  <Label>City</Label>
                  <Input value={base.city} onChange={(e) => setBase({ ...base, city: e.target.value })} placeholder="Mumbai" />
                </div>
              </div>

              <div>
                <Label>Employment Type</Label>
                <Select value={base.employment} onValueChange={(v: EmploymentType) => setBase({ ...base, employment: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self_employed">Self Employed Professional</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Monthly Income (₹)</Label>
                  <Input type="number" value={base.monthlyIncome} onChange={(e) => setBase({ ...base, monthlyIncome: +e.target.value })} />
                </div>
                <div>
                  <Label>Existing EMI (₹)</Label>
                  <Input type="number" value={base.monthlyEmi} onChange={(e) => setBase({ ...base, monthlyEmi: +e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>CIBIL Score</Label>
                  <Input type="number" value={base.cibil} onChange={(e) => setBase({ ...base, cibil: +e.target.value })} />
                </div>
                <div>
                  <Label>Work Experience (yrs)</Label>
                  <Input type="number" value={base.workYears} onChange={(e) => setBase({ ...base, workYears: +e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product tabs */}
          <div className="lg:col-span-3 rounded-3xl border bg-white p-6 shadow-sm">
            <Tabs value={activeProduct} onValueChange={(v) => { setActiveProduct(v as ProductKey); setSubmitted(false); }}>
              <TabsList className="grid grid-cols-4 lg:grid-cols-4 h-auto gap-1 bg-slate-100 p-1">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <TabsTrigger key={p.key} value={p.key} className="text-xs py-2">
                    <p.icon className="h-3.5 w-3.5 mr-1" />{p.name.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid grid-cols-4 h-auto gap-1 bg-slate-100 p-1 mt-2">
                {PRODUCTS.slice(4).map((p) => (
                  <TabsTrigger key={p.key} value={p.key} className="text-xs py-2">
                    <p.icon className="h-3.5 w-3.5 mr-1" />{p.name.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {PRODUCTS.map((p) => (
                <TabsContent key={p.key} value={p.key} className="mt-5 space-y-4">
                  <div className={`rounded-2xl bg-gradient-to-r ${p.color} text-white p-4 flex items-center gap-3`}>
                    <p.icon className="h-7 w-7" />
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-white/80 capitalize">{p.category} eligibility check</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {p.fields.includes("loanAmount") && (
                      <div>
                        <Label>Loan Amount (₹)</Label>
                        <Input type="number" value={extras[p.key].loanAmount ?? 0} onChange={(e) => updateExtra("loanAmount", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("loanTenure") && (
                      <div>
                        <Label>Tenure (years)</Label>
                        <Input type="number" value={extras[p.key].loanTenure ?? 0} onChange={(e) => updateExtra("loanTenure", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("propertyValue") && (
                      <div>
                        <Label>Property Value (₹)</Label>
                        <Input type="number" value={extras[p.key].propertyValue ?? 0} onChange={(e) => updateExtra("propertyValue", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("vehicleValue") && (
                      <div>
                        <Label>Vehicle Value (₹)</Label>
                        <Input type="number" value={extras[p.key].vehicleValue ?? 0} onChange={(e) => updateExtra("vehicleValue", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("collegeFees") && (
                      <div>
                        <Label>Total College Fees (₹)</Label>
                        <Input type="number" value={extras[p.key].collegeFees ?? 0} onChange={(e) => updateExtra("collegeFees", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("businessTurnover") && (
                      <div>
                        <Label>Annual Turnover (₹)</Label>
                        <Input type="number" value={extras[p.key].businessTurnover ?? 0} onChange={(e) => updateExtra("businessTurnover", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("sumAssured") && (
                      <div>
                        <Label>Sum Assured (₹)</Label>
                        <Input type="number" value={extras[p.key].sumAssured ?? 0} onChange={(e) => updateExtra("sumAssured", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("members") && (
                      <div>
                        <Label>Members to Cover</Label>
                        <Input type="number" value={extras[p.key].members ?? 1} onChange={(e) => updateExtra("members", +e.target.value)} />
                      </div>
                    )}
                    {p.fields.includes("sipAmount") && (
                      <div>
                        <Label>Monthly SIP (₹)</Label>
                        <Input type="number" value={extras[p.key].sipAmount ?? 0} onChange={(e) => updateExtra("sipAmount", +e.target.value)} />
                      </div>
                    )}
                  </div>

                  <Button onClick={() => setSubmitted(true)} className="w-full rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 text-white">
                    Check Eligibility
                  </Button>

                  {submitted && (
                    <div className={`rounded-2xl border p-5 ${result.eligible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {result.eligible ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )}
                          <div className={`font-semibold ${result.eligible ? "text-green-800" : "text-red-800"}`}>
                            {result.eligible ? "You are Eligible!" : "Not Eligible — review below"}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-slate-700">Score: {result.score}/100</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {result.maxAmount !== undefined && (
                          <div className="rounded-xl bg-white p-3">
                            <div className="text-slate-500 text-xs">Max Eligible Amount</div>
                            <div className="font-semibold text-slate-900">{formatINR(result.maxAmount)}</div>
                          </div>
                        )}
                        {result.estimatedEmi !== undefined && (
                          <div className="rounded-xl bg-white p-3">
                            <div className="text-slate-500 text-xs">Estimated EMI</div>
                            <div className="font-semibold text-slate-900">{formatINR(result.estimatedEmi)}/mo</div>
                          </div>
                        )}
                        {result.premium !== undefined && (
                          <div className="rounded-xl bg-white p-3">
                            <div className="text-slate-500 text-xs">Estimated Premium</div>
                            <div className="font-semibold text-slate-900">{formatINR(result.premium)}/yr</div>
                          </div>
                        )}
                      </div>

                      {result.positives.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm text-green-800">
                          {result.positives.map((r, i) => (
                            <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" />{r}</li>
                          ))}
                        </ul>
                      )}
                      {result.reasons.length > 0 && (
                        <ul className="mt-3 space-y-1 text-sm text-red-800">
                          {result.reasons.map((r, i) => (
                            <li key={i} className="flex gap-2"><XCircle className="h-4 w-4 mt-0.5" />{r}</li>
                          ))}
                        </ul>
                      )}

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4 w-full rounded-full bg-[#17357e] text-white">
                            {result.eligible ? "Apply Now" : "Talk to an Expert"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg rounded-3xl">
                          <DialogHeader>
                            <DialogTitle>{p.name} — Application</DialogTitle>
                          </DialogHeader>
                          <LeadForm
                            productType={p.category === "loan" ? "loan" : p.category === "insurance" ? "insurance" : "mutual_fund"}
                            productName={p.name}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
