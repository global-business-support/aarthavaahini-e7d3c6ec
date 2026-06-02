// import { useMemo, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import { Button } from "@/components/ui/button";
// import { Calculator } from "lucide-react";

// function formatINR(n: number) {
//   return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
// }

// export function EmiCalculator() {
//   const [amount, setAmount] = useState(2500000);
//   const [rate, setRate] = useState(8.5);
//   const [years, setYears] = useState(20);

//   const { emi, total, interest } = useMemo(() => {
//     const r = rate / 12 / 100;
//     const n = years * 12;
//     const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
//     const total = emi * n;
//     return { emi, total, interest: total - amount };
//   }, [amount, rate, years]);

//   return (
//     <section id="calculator" className="relative scroll-mt-24 overflow-hidden bg-gradient-hero py-24 text-foreground">
//       <div className="absolute inset-0 bg-gradient-glow opacity-80" />
//       <div className="container relative mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
//         <div>
//           <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">Futuristic Tools</span>
//           <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">EMI Calculator</h2>
//           <p className="mt-4 max-w-md text-muted-foreground">
//             Plan your loan with precision. Adjust the sliders and see your monthly EMI, total interest and payable amount instantly.
//           </p>
//           <div className="mt-8 grid grid-cols-3 gap-4">
//             <Stat label="Monthly EMI" value={`₹ ${formatINR(emi)}`} highlight />
//             <Stat label="Total Interest" value={`₹ ${formatINR(interest)}`} />
//             <Stat label="Total Payable" value={`₹ ${formatINR(total)}`} />
//           </div>
//           <Button size="lg" className="mt-8 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
//             <Calculator className="mr-2 h-4 w-4" /> Apply for this Loan
//           </Button>
//         </div>

//         <Card className="relative border-border/70 bg-card/80 p-8 backdrop-blur-xl shadow-elegant">
//           <div className="space-y-8">
//             <Field label="Loan Amount" value={`₹ ${formatINR(amount)}`}>
//               <Slider value={[amount]} min={100000} max={20000000} step={50000} onValueChange={(v) => setAmount(v[0])} />
//             </Field>
//             <Field label="Interest Rate" value={`${rate.toFixed(2)} %`}>
//               <Slider value={[rate]} min={6} max={20} step={0.05} onValueChange={(v) => setRate(v[0])} />
//             </Field>
//             <Field label="Tenure" value={`${years} years`}>
//               <Slider value={[years]} min={1} max={30} step={1} onValueChange={(v) => setYears(v[0])} />
//             </Field>
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// }

// function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
//   return (
//     <div>
//       <div className="mb-3 flex items-center justify-between">
//         <span className="text-sm font-medium text-muted-foreground">{label}</span>
//         <span className="font-display text-lg font-semibold">{value}</span>
//       </div>
//       {children}
//     </div>
//   );
// }

// function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
//   return (
//     <div className={`rounded-xl border border-border/70 p-4 shadow-soft ${highlight ? "bg-primary/10" : "bg-card/70"}`}>
//       <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
//       <p className="mt-1 font-display text-lg font-bold">{value}</p>
//     </div>
//   );
// }
// src/components/calculator/EmiCalculator.tsx

"use client";

import { useMemo, useState } from "react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function EmiCalculator() {

  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi } = useMemo(() => {

    const r = rate / 12 / 100;
    const n = years * 12;

    const emi =
      (amount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    return { emi };

  }, [amount, rate, years]);

  return (
    <section
      id="calculator"
      className="bg-white py-24"
    >

      <div className="container mx-auto px-6">

        <h2 className="text-center text-5xl font-bold text-[#07142f]">
          EMI Calculator
        </h2>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-[#f7f9ff] p-10 shadow-xl">

          <div className="grid gap-8">

            <div>

              <div className="mb-3 flex justify-between">
                <span>Loan Amount</span>
                <span>₹ {formatINR(amount)}</span>
              </div>

              <label htmlFor="loan-amount" className="sr-only">
                Loan Amount
              </label>
              <input
                id="loan-amount"
                type="range"
                min="100000"
                max="20000000"
                step="50000"
                value={amount}
                onChange={(e) =>
                  setAmount(Number(e.target.value))
                }
                className="w-full"
              />

            </div>

            <div>

              <div className="mb-3 flex justify-between">
                <span>Interest Rate</span>
                <span>{rate}%</span>
              </div>

              <label htmlFor="interest-rate" className="sr-only">
                Interest Rate
              </label>
              <input
                id="interest-rate"
                type="range"
                min="6"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) =>
                  setRate(Number(e.target.value))
                }
                className="w-full"
              />

            </div>

            <div>

              <div className="mb-3 flex justify-between">
                <span>Tenure</span>
                <span>{years} Years</span>
              </div>

              <label htmlFor="tenure-years" className="sr-only">
                Tenure in years
              </label>
              <input
                id="tenure-years"
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) =>
                  setYears(Number(e.target.value))
                }
                className="w-full"
              />

            </div>

          </div>

          <div className="mt-10 rounded-2xl bg-linear-to-r from-[#17357e] to-blue-600  p-8 text-center text-white">

            <p className="text-lg">
              Monthly EMI
            </p>

            <h3 className="mt-2 text-5xl font-bold">
              ₹ {formatINR(emi)}
            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}