"use client";

import { useMemo, useState } from "react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(Math.max(0, n)),
  );
}

type Mode = "sip" | "lumpsum" | "goal";

export function MfCalculator() {
  const [mode, setMode] = useState<Mode>("sip");

  // common
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  // sip
  const [sip, setSip] = useState(10000);
  // lumpsum
  const [lump, setLump] = useState(500000);
  // goal
  const [goal, setGoal] = useState(5000000);

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;

    if (mode === "sip") {
      const fv = sip * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const invested = sip * n;
      return { fv, invested, gains: fv - invested };
    }
    if (mode === "lumpsum") {
      const fv = lump * Math.pow(1 + rate / 100, years);
      return { fv, invested: lump, gains: fv - lump };
    }
    // goal: SIP needed
    const required = (goal * r) / (Math.pow(1 + r, n) - 1) / (1 + r);
    const invested = required * n;
    return { fv: goal, invested, gains: goal - invested, required };
  }, [mode, sip, lump, goal, years, rate]);

  return (
    <section id="mf-calculator" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-[#07142f] md:text-5xl">
          Mutual Fund Calculator
        </h2>
        <p className="mt-3 text-center text-gray-500">
          Plan SIP, lumpsum or a financial goal — all in one place.
        </p>

        <div className="mx-auto mt-10 max-w-6xl rounded-3xl bg-[#f7f9ff] p-8 shadow-xl lg:p-10">
          <div className="mx-auto mb-8 inline-flex w-full justify-center gap-2 rounded-full bg-white p-1 shadow-sm md:w-auto">
            {(["sip", "lumpsum", "goal"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                  mode === m
                    ? "bg-gradient-to-r from-[#17357e] to-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {m === "sip" ? "SIP" : m === "lumpsum" ? "Lumpsum" : "Goal Planner"}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              {mode === "sip" && (
                <Slider label="Monthly SIP" value={`₹ ${formatINR(sip)}`} v={sip} min={500} max={200000} step={500} onChange={setSip} />
              )}
              {mode === "lumpsum" && (
                <Slider label="One-time Investment" value={`₹ ${formatINR(lump)}`} v={lump} min={1000} max={10000000} step={1000} onChange={setLump} />
              )}
              {mode === "goal" && (
                <Slider label="Goal Amount" value={`₹ ${formatINR(goal)}`} v={goal} min={100000} max={50000000} step={50000} onChange={setGoal} />
              )}
              <Slider label="Investment Period" value={`${years} Years`} v={years} min={1} max={40} step={1} onChange={setYears} />
              <Slider label="Expected Return (p.a.)" value={`${rate}%`} v={rate} min={4} max={25} step={0.5} onChange={setRate} />
            </div>

            <div className="space-y-4 lg:col-span-2">
              {mode === "goal" ? (
                <div className="rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 p-6 text-center text-white">
                  <p className="text-sm uppercase tracking-widest text-white/80">Required Monthly SIP</p>
                  <h3 className="mt-2 text-4xl font-bold">
                    ₹ {formatINR((result as { required: number }).required)}
                  </h3>
                </div>
              ) : (
                <div className="rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 p-6 text-center text-white">
                  <p className="text-sm uppercase tracking-widest text-white/80">Future Value</p>
                  <h3 className="mt-2 text-4xl font-bold">₹ {formatINR(result.fv)}</h3>
                </div>
              )}
              <Stat label="Total Invested" value={`₹ ${formatINR(result.invested)}`} />
              <Stat label="Estimated Gains" value={`₹ ${formatINR(result.gains)}`} />
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
