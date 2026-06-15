"use client";

import { useMemo, useState } from "react";

function formatINR(n: number) {
  if (!isFinite(n) || isNaN(n)) return "—";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(Math.max(0, n)),
  );
}

// Excel PMT equivalent: monthly EMI for given rate(monthly), nper, pv
function PMT(rate: number, nper: number, pv: number) {
  if (rate === 0) return pv / nper;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}
// Excel NPER equivalent: tenure in months for given monthly rate, pmt, pv
function NPER(rate: number, pmt: number, pv: number) {
  if (rate === 0) return pv / pmt;
  return Math.log(pmt / (pmt - pv * rate)) / Math.log(1 + rate);
}
// Excel PV equivalent: present value (loan amount) for rate, nper, pmt
function PV(rate: number, nper: number, pmt: number) {
  if (rate === 0) return pmt * nper;
  return (pmt * (1 - Math.pow(1 + rate, -nper))) / rate;
}
// Excel RATE equivalent (Newton-Raphson) — returns monthly rate
function RATE(nper: number, pmt: number, pv: number, guess = 0.01) {
  let r = guess;
  for (let i = 0; i < 100; i++) {
    const f = pv * Math.pow(1 + r, nper) - pmt * (Math.pow(1 + r, nper) - 1) / r;
    const df =
      pv * nper * Math.pow(1 + r, nper - 1) -
      pmt * ((nper * Math.pow(1 + r, nper - 1)) / r - (Math.pow(1 + r, nper) - 1) / (r * r));
    const newR = r - f / df;
    if (Math.abs(newR - r) < 1e-8) return newR;
    r = newR;
  }
  return r;
}

type Mode = "EMI" | "ROI" | "Loan Amount";
type Tab = "emi" | "eligibility" | "prepayment" | "balance-transfer" | "amortization";

export function EmiCalculator() {
  const [tab, setTab] = useState<Tab>("emi");

  // EMI Engine state (reverse calculator like Excel)
  const [mode, setMode] = useState<Mode>("EMI");
  const [amount, setAmount] = useState(2700000);
  const [rate, setRate] = useState(8.5);
  // Tenure is fixed internally (20 years) — UI does not expose it per requirement
  const years = 20;
  const [emiInput, setEmiInput] = useState(42324);

  const months = years * 12;
  const monthlyRate = rate / 12 / 100;

  const result = useMemo(() => {
    if (mode === "EMI") return PMT(monthlyRate, months, amount);
    if (mode === "ROI") return RATE(months, -emiInput, amount) * 12 * 100;
    if (mode === "Loan Amount") return PV(monthlyRate, months, -emiInput);
    return 0;
  }, [mode, monthlyRate, months, amount, emiInput]);

  // Computed final values used by amortization
  const finalEmi = mode === "EMI" ? result : emiInput;
  const finalAmount = mode === "Loan Amount" ? result : amount;
  const finalMonths = months;
  const finalRate = mode === "ROI" ? result / 12 / 100 : monthlyRate;

  const totalPayable = finalEmi * finalMonths;
  const totalInterest = totalPayable - finalAmount;
  const principalPct = totalPayable > 0 ? (finalAmount / totalPayable) * 100 : 0;

  // Eligibility Engine state
  const [income, setIncome] = useState(100000);
  const [existingEmi, setExistingEmi] = useState(20000);
  const [foir, setFoir] = useState(60);
  const [eligRate, setEligRate] = useState(9.5);
  const [eligYears, setEligYears] = useState(20);

  const eligibility = useMemo(() => {
    const eligEmi = (income * foir) / 100 - existingEmi;
    const r = eligRate / 12 / 100;
    const n = eligYears * 12;
    const eligLoan = eligEmi > 0 ? PV(r, n, -eligEmi) : 0;
    const reqIncome = (eligEmi + existingEmi) / (foir / 100);
    return { eligEmi, eligLoan, reqIncome };
  }, [income, existingEmi, foir, eligRate, eligYears]);

  // Prepayment Engine state
  const [ppAmount, setPpAmount] = useState(2700000);
  const [ppRate, setPpRate] = useState(8.5);
  const [ppYears, setPpYears] = useState(20);
  const [ppLump, setPpLump] = useState(300000);
  const [ppAfterMonths, setPpAfterMonths] = useState(24);

  const prepayment = useMemo(() => {
    const r = ppRate / 12 / 100;
    const n = ppYears * 12;
    const emi = PMT(r, n, ppAmount);

    // Without prepayment
    const totalWithout = emi * n;
    const interestWithout = totalWithout - ppAmount;

    // With prepayment — pay EMIs for ppAfterMonths, drop lumpsum, keep EMI fixed, find new tenure
    let bal = ppAmount;
    let paidInterest = 0;
    for (let m = 1; m <= Math.min(ppAfterMonths, n) && bal > 0; m++) {
      const i = bal * r;
      const p = Math.min(emi - i, bal);
      paidInterest += i;
      bal -= p;
    }
    bal = Math.max(0, bal - ppLump);
    // remaining tenure at same EMI
    let remMonths = 0;
    if (bal > 0) {
      remMonths = Math.ceil(NPER(r, -emi, bal));
      // simulate to accumulate interest
      let b2 = bal;
      for (let m = 1; m <= remMonths && b2 > 0; m++) {
        const i = b2 * r;
        const p = Math.min(emi - i, b2);
        paidInterest += i;
        b2 -= p;
      }
    }
    const totalTenure = ppAfterMonths + remMonths;
    const interestWith = paidInterest;
    return {
      emi,
      interestWithout,
      interestWith,
      saved: Math.max(0, interestWithout - interestWith),
      monthsSaved: Math.max(0, n - totalTenure),
      newTenure: totalTenure,
    };
  }, [ppAmount, ppRate, ppYears, ppLump, ppAfterMonths]);

  // Balance Transfer state
  const [btOutstanding, setBtOutstanding] = useState(2000000);
  const [btCurRate, setBtCurRate] = useState(10.5);
  const [btNewRate, setBtNewRate] = useState(8.5);
  const [btYears, setBtYears] = useState(15);
  const [btFees, setBtFees] = useState(15000);

  const balanceTransfer = useMemo(() => {
    const n = btYears * 12;
    const rA = btCurRate / 12 / 100;
    const rB = btNewRate / 12 / 100;
    const emiA = PMT(rA, n, btOutstanding);
    const emiB = PMT(rB, n, btOutstanding);
    const totA = emiA * n;
    const totB = emiB * n + btFees;
    return {
      emiA, emiB,
      totA, totB,
      emiSaved: emiA - emiB,
      totalSaved: totA - totB,
    };
  }, [btOutstanding, btCurRate, btNewRate, btYears, btFees]);


  // Amortization schedule
  const schedule = useMemo(() => {
    const rows: { m: number; emi: number; interest: number; principal: number; balance: number }[] = [];
    let bal = finalAmount;
    const r = finalRate;
    const emi = finalEmi;
    for (let m = 1; m <= finalMonths && bal > 0; m++) {
      const interest = bal * r;
      const principal = Math.min(emi - interest, bal);
      bal = Math.max(0, bal - principal);
      rows.push({ m, emi, interest, principal, balance: bal });
    }
    return rows;
  }, [finalAmount, finalRate, finalEmi, finalMonths]);

  // Year-wise aggregation for chart
  const yearly = useMemo(() => {
    const byYear: { year: number; interest: number; principal: number; balance: number }[] = [];
    schedule.forEach((r) => {
      const y = Math.ceil(r.m / 12);
      let bucket = byYear[y - 1];
      if (!bucket) {
        bucket = { year: y, interest: 0, principal: 0, balance: r.balance };
        byYear[y - 1] = bucket;
      }
      bucket.interest += r.interest;
      bucket.principal += r.principal;
      bucket.balance = r.balance;
    });
    return byYear;
  }, [schedule]);

  return (
    <section id="calculator" className="bg-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-[#07142f] md:text-5xl">
          Professional Loan Calculator
        </h2>
        <p className="mt-3 text-center text-gray-500">
          EMI engine, eligibility calculator and full amortization schedule.
        </p>

        {/* Tabs */}
        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2 rounded-full bg-blue-50 p-1.5">
          {([
            { k: "emi", label: "EMI Engine" },
            { k: "eligibility", label: "Eligibility" },
            { k: "amortization", label: "Amortization" },
          ] as { k: Tab; label: string }[]).map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                tab === t.k
                  ? "bg-gradient-to-r from-[#17357e] to-blue-600 text-white shadow"
                  : "text-blue-900 hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* EMI Engine */}
        {tab === "emi" && (
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 rounded-3xl bg-[#f7f9ff] p-8 shadow-xl lg:grid-cols-5 lg:p-10">
            <div className="space-y-6 lg:col-span-3">
              <div>
                <label className="mb-2 block font-medium">Calculation Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["EMI", "ROI", "Loan Amount"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                        mode === m
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Select a mode — the chosen field will be calculated from the others.
                </p>
              </div>

              {mode !== "Loan Amount" && (
                <Slider label="Loan Amount" value={`₹ ${formatINR(amount)}`} min={100000} max={50000000} step={50000} v={amount} onChange={setAmount} />
              )}
              {mode !== "ROI" && (
                <Slider label="Interest Rate" value={`${rate}%`} min={5} max={24} step={0.05} v={rate} onChange={setRate} />
              )}
              {mode !== "EMI" && (
                <Slider label="Monthly EMI" value={`₹ ${formatINR(emiInput)}`} min={1000} max={500000} step={500} v={emiInput} onChange={setEmiInput} />
              )}
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 p-6 text-center text-white">
                <p className="text-sm uppercase tracking-widest text-white/80">{mode} (Calculated)</p>
                <h3 className="mt-2 text-4xl font-bold">
                  {mode === "ROI" && `${result.toFixed(2)}%`}
                  {(mode === "EMI" || mode === "Loan Amount") && `₹ ${formatINR(result)}`}
                </h3>
              </div>
              <Stat label="Monthly EMI" value={`₹ ${formatINR(finalEmi)}`} />
              <Stat label="Loan Amount" value={`₹ ${formatINR(finalAmount)}`} />
              <Stat label="Total Interest" value={`₹ ${formatINR(totalInterest)}`} />
              <Stat label="Total Payable" value={`₹ ${formatINR(totalPayable)}`} />

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
        )}

        {/* Eligibility Engine */}
        {tab === "eligibility" && (
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 rounded-3xl bg-[#f7f9ff] p-8 shadow-xl lg:grid-cols-5 lg:p-10">
            <div className="space-y-6 lg:col-span-3">
              <Slider label="Monthly Net Income" value={`₹ ${formatINR(income)}`} min={15000} max={1000000} step={5000} v={income} onChange={setIncome} />
              <Slider label="Existing EMI" value={`₹ ${formatINR(existingEmi)}`} min={0} max={500000} step={1000} v={existingEmi} onChange={setExistingEmi} />
              <Slider label="FOIR %" value={`${foir}%`} min={30} max={75} step={1} v={foir} onChange={setFoir} />
              <Slider label="Interest Rate" value={`${eligRate}%`} min={5} max={24} step={0.05} v={eligRate} onChange={setEligRate} />
              <Slider label="Tenure" value={`${eligYears} Years`} min={1} max={30} step={1} v={eligYears} onChange={setEligYears} />
            </div>
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 p-6 text-center text-white">
                <p className="text-sm uppercase tracking-widest text-white/80">Eligible Loan Amount</p>
                <h3 className="mt-2 text-4xl font-bold">₹ {formatINR(eligibility.eligLoan)}</h3>
              </div>
              <Stat label="Eligible EMI" value={`₹ ${formatINR(eligibility.eligEmi)}`} />
              <Stat label="Required Income (for desired EMI)" value={`₹ ${formatINR(eligibility.reqIncome)}`} />
              <div className="rounded-xl bg-blue-50 p-4 text-xs text-blue-900">
                FOIR (Fixed Obligation to Income Ratio) is the % of your income banks allow towards EMIs.
                Typical range: 50–65%.
              </div>
            </div>
          </div>
        )}

        {/* Amortization */}
        {tab === "amortization" && (
          <div className="mx-auto mt-10 max-w-6xl rounded-3xl bg-[#f7f9ff] p-6 shadow-xl lg:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-[#07142f]">Month-wise Schedule</h3>
                <p className="text-xs text-gray-500">
                  Based on EMI Engine inputs · {finalMonths} months · ₹ {formatINR(finalEmi)}/mo
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">Principal ₹ {formatINR(finalAmount)}</span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">Interest ₹ {formatINR(totalInterest)}</span>
              </div>
            </div>

            {/* Year-wise chart */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#07142f]">Year-wise Breakup</h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-blue-600" /> Principal</span>
                  <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-orange-400" /> Interest</span>
                  <span className="flex items-center gap-1"><span className="inline-block h-3 w-1 rounded-sm bg-emerald-500" /> Balance</span>
                </div>
              </div>
              <YearlyChart data={yearly} loan={finalAmount} />
            </div>

            <div className="max-h-[520px] overflow-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#17357e] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Month</th>
                    <th className="px-4 py-2 text-right">EMI</th>
                    <th className="px-4 py-2 text-right">Interest</th>
                    <th className="px-4 py-2 text-right">Principal</th>
                    <th className="px-4 py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((r, i) => (
                    <tr key={r.m} className={i % 2 ? "bg-blue-50/40" : ""}>
                      <td className="px-4 py-1.5">{r.m}</td>
                      <td className="px-4 py-1.5 text-right">₹ {formatINR(r.emi)}</td>
                      <td className="px-4 py-1.5 text-right text-orange-700">₹ {formatINR(r.interest)}</td>
                      <td className="px-4 py-1.5 text-right text-blue-700">₹ {formatINR(r.principal)}</td>
                      <td className="px-4 py-1.5 text-right font-medium">₹ {formatINR(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function YearlyChart({ data, loan }: { data: { year: number; interest: number; principal: number; balance: number }[]; loan: number }) {
  if (!data.length) return null;
  const W = 760;
  const H = 260;
  const padL = 50, padR = 50, padB = 30, padT = 10;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const maxStack = Math.max(...data.map((d) => d.interest + d.principal));
  const maxBal = Math.max(loan, ...data.map((d) => d.balance));
  const bw = innerW / data.length;
  const barW = Math.max(6, bw * 0.6);

  const balPoints = data
    .map((d, i) => {
      const x = padL + i * bw + bw / 2;
      const y = padT + innerH - (d.balance / maxBal) * innerH;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px]" preserveAspectRatio="none">
        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={padL} x2={W - padR} y1={padT + innerH * t} y2={padT + innerH * t} stroke="#e5e7eb" strokeWidth="1" />
        ))}
        {/* bars */}
        {data.map((d, i) => {
          const x = padL + i * bw + (bw - barW) / 2;
          const pH = (d.principal / maxStack) * innerH;
          const iH = (d.interest / maxStack) * innerH;
          const yP = padT + innerH - pH;
          const yI = yP - iH;
          return (
            <g key={d.year}>
              <rect x={x} y={yI} width={barW} height={iH} fill="#fb923c" rx="2">
                <title>Year {d.year} · Interest ₹ {formatINR(d.interest)}</title>
              </rect>
              <rect x={x} y={yP} width={barW} height={pH} fill="#2563eb" rx="2">
                <title>Year {d.year} · Principal ₹ {formatINR(d.principal)}</title>
              </rect>
              {(data.length <= 20 || d.year % 2 === 1) && (
                <text x={x + barW / 2} y={H - padB + 14} fontSize="10" fill="#6b7280" textAnchor="middle">
                  {d.year}
                </text>
              )}
            </g>
          );
        })}
        {/* balance line */}
        <polyline points={balPoints} fill="none" stroke="#10b981" strokeWidth="2.5" />
        {data.map((d, i) => {
          const x = padL + i * bw + bw / 2;
          const y = padT + innerH - (d.balance / maxBal) * innerH;
          return <circle key={d.year} cx={x} cy={y} r="2.5" fill="#10b981"><title>Year {d.year} · Balance ₹ {formatINR(d.balance)}</title></circle>;
        })}
        {/* y-axis labels (stack) */}
        {[0, 0.5, 1].map((t) => (
          <text key={`l${t}`} x={padL - 6} y={padT + innerH * (1 - t) + 3} fontSize="10" fill="#6b7280" textAnchor="end">
            ₹{formatINR(maxStack * t)}
          </text>
        ))}
        {/* y-axis right (balance) */}
        {[0, 0.5, 1].map((t) => (
          <text key={`r${t}`} x={W - padR + 6} y={padT + innerH * (1 - t) + 3} fontSize="10" fill="#10b981" textAnchor="start">
            ₹{formatINR(maxBal * t)}
          </text>
        ))}
        <text x={padL} y={H - 4} fontSize="10" fill="#6b7280">Year</text>
      </svg>
    </div>
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
