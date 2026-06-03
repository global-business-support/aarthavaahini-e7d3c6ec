"use client";

import { useMemo, useState } from "react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(Math.max(0, n)),
  );
}

export function EmiCalculator() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [prepay, setPrepay] = useState(0); // extra monthly prepayment

  const { emi, totalInterest, totalPayable, monthsTaken, savedInterest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // Standard totals
    const stdTotal = emi * n;
    const stdInterest = stdTotal - amount;

    // Amortization with prepayment
    let bal = amount;
    let months = 0;
    let interestPaid = 0;
    const cap = n * 2;
    while (bal > 0 && months < cap) {
      const interest = bal * r;
      const principal = emi - interest + prepay;
      bal -= principal;
      interestPaid += interest;
      months += 1;
    }
    const actualInterest = prepay > 0 ? interestPaid : stdInterest;
    return {
      emi,
      totalInterest: actualInterest,
      totalPayable: amount + actualInterest,
      monthsTaken: prepay > 0 ? months : n,
      savedInterest: prepay > 0 ? Math.max(0, stdInterest - actualInterest) : 0,
    };
  }, [amount, rate, years, prepay]);

  const principalPct = (amount / (amount + totalInterest)) * 100;

  return (
    <section id="calculator" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-[#07142f] md:text-5xl">
          Advanced EMI Calculator
        </h2>
        <p className="mt-3 text-center text-gray-500">
          Add prepayments to see how much interest you save and how quickly the loan closes.
        </p>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 rounded-3xl bg-[#f7f9ff] p-8 shadow-xl lg:grid-cols-5 lg:p-10">
          <div className="space-y-7 lg:col-span-3">
            <Slider label="Loan Amount" value={`₹ ${formatINR(amount)}`} min={100000} max={20000000} step={50000} v={amount} onChange={setAmount} />
            <Slider label="Interest Rate" value={`${rate}%`} min={5} max={20} step={0.05} v={rate} onChange={setRate} />
            <Slider label="Tenure" value={`${years} Years`} min={1} max={30} step={1} v={years} onChange={setYears} />
            <Slider label="Extra Monthly Prepayment" value={`₹ ${formatINR(prepay)}`} min={0} max={100000} step={500} v={prepay} onChange={setPrepay} />
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 p-6 text-center text-white">
              <p className="text-sm uppercase tracking-widest text-white/80">Monthly EMI</p>
              <h3 className="mt-2 text-4xl font-bold">₹ {formatINR(emi)}</h3>
            </div>
            <Stat label="Total Interest" value={`₹ ${formatINR(totalInterest)}`} />
            <Stat label="Total Payable" value={`₹ ${formatINR(totalPayable)}`} />
            <Stat label="Loan Closes In" value={`${Math.floor(monthsTaken / 12)}y ${monthsTaken % 12}m`} />
            {prepay > 0 && (
              <div className="rounded-xl bg-emerald-50 p-4 text-center text-sm text-emerald-700">
                You save <b>₹ {formatINR(savedInterest)}</b> in interest!
              </div>
            )}

            <div>
              <div className="mb-2 flex justify-between text-xs text-gray-600">
                <span>Principal</span><span>Interest</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full bg-gray-200">
                <div className="bg-blue-600" style={{ width: `${principalPct}%` }} />
                <div className="bg-orange-400" style={{ width: `${100 - principalPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, v, min, max, step, onChange }: {
  label: string; value: string; v: number; min: number; max: number; step: number; onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="font-medium">{label}</span>
        <span className="font-semibold text-blue-700">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v}
        onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-blue-600" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-[#07142f]">{value}</span>
    </div>
  );
}
