"use client";

import { useMemo, useState } from "react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(Math.max(0, n)),
  );
}

export function SipPlanner() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [stepUp, setStepUp] = useState(10); // % annual step-up
  const [inflation, setInflation] = useState(6);

  const { fv, invested, gains, realValue } = useMemo(() => {
    const r = rate / 12 / 100;
    let bal = 0;
    let m = monthly;
    let invested = 0;
    for (let y = 0; y < years; y++) {
      for (let k = 0; k < 12; k++) {
        bal = (bal + m) * (1 + r);
        invested += m;
      }
      m = m * (1 + stepUp / 100);
    }
    const realValue = bal / Math.pow(1 + inflation / 100, years);
    return { fv: bal, invested, gains: bal - invested, realValue };
  }, [monthly, years, rate, stepUp, inflation]);

  return (
    <section id="sip" className="container mx-auto scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#f7f9ff] p-8 shadow-xl lg:p-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#07142f] md:text-5xl">
            Advanced SIP Planner
          </h2>
          <p className="mt-3 text-gray-500">
            Step-up your SIP every year and see inflation-adjusted real wealth.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <Slider label="Monthly Investment" value={`₹ ${formatINR(monthly)}`} v={monthly} min={500} max={200000} step={500} onChange={setMonthly} />
            <Slider label="Investment Period" value={`${years} Years`} v={years} min={1} max={40} step={1} onChange={setYears} />
            <Slider label="Expected Return (p.a.)" value={`${rate}%`} v={rate} min={4} max={25} step={0.5} onChange={setRate} />
            <Slider label="Annual Step-Up" value={`${stepUp}%`} v={stepUp} min={0} max={25} step={1} onChange={setStepUp} />
            <Slider label="Inflation" value={`${inflation}%`} v={inflation} min={0} max={12} step={0.5} onChange={setInflation} />
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 p-6 text-center text-white">
              <p className="text-sm uppercase tracking-widest text-white/80">Future Value</p>
              <h3 className="mt-2 text-4xl font-bold">₹ {formatINR(fv)}</h3>
            </div>
            <Stat label="Total Invested" value={`₹ ${formatINR(invested)}`} />
            <Stat label="Estimated Gains" value={`₹ ${formatINR(gains)}`} />
            <Stat label="Real Value (today)" value={`₹ ${formatINR(realValue)}`} />
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
