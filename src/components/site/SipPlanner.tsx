"use client";

import { useMemo, useState } from "react";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function SipPlanner() {

  const [monthly, setMonthly] = useState(5000);

  const [years, setYears] = useState(10);

  const [rate, setRate] = useState(12);

  const futureValue = useMemo(() => {

    const r = rate / 12 / 100;

    const n = years * 12;

    const fv =
      monthly *
      (((Math.pow(1 + r, n) - 1) / r) *
        (1 + r));

    return fv;

  }, [monthly, years, rate]);

  return (

    <section
      id="sip"
      className="container mx-auto scroll-mt-24 px-6 py-24"
    >

      <div className="mx-auto max-w-5xl rounded-3xl bg-[#f7f9ff] p-10 shadow-xl">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#07142f]">

            SIP Planner

          </h2>

          <p className="mt-4 text-gray-500">

            Calculate your future wealth with monthly SIP investments.

          </p>

        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">

          {/* LEFT */}

          <div className="space-y-8">

            {/* MONTHLY */}

            <div>

              <div className="mb-3 flex justify-between">

                <span className="font-medium">
                  Monthly Investment
                </span>

                <span className="font-semibold text-blue-700">
                  ₹ {formatINR(monthly)}
                </span>

              </div>

              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthly}
                onChange={(e) =>
                  setMonthly(Number(e.target.value))
                }
                className="w-full"
                aria-label="Monthly Investment"
              />

            </div>

            {/* YEARS */}

            <div>

              <div className="mb-3 flex justify-between">

                <span className="font-medium">
                  Investment Duration
                </span>

                <span className="font-semibold text-blue-700">
                  {years} Years
                </span>

              </div>

              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) =>
                  setYears(Number(e.target.value))
                }
                className="w-full"
              />

            </div>

            {/* RETURN */}

            <div>

              <div className="mb-3 flex justify-between">

                <span className="font-medium">
                  Expected Return
                </span>

                <span className="font-semibold text-blue-700">
                  {rate}%
                </span>

              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) =>
                  setRate(Number(e.target.value))
                }
                className="w-full"
              />

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col justify-center rounded-3xl bg-linear-to-r from-[#17357e] to-blue-600 p-10 text-white shadow-2xl">

            <p className="text-lg">
              Estimated Future Value
            </p>

            <h3 className="mt-4 text-5xl font-bold">

              ₹ {formatINR(futureValue)}

            </h3>

            <div className="mt-8 space-y-4 text-sm text-white/90">

              <div className="flex justify-between">

                <span>Total Invested</span>

                <span>
                  ₹ {formatINR(monthly * years * 12)}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Estimated Returns</span>

                <span>
                  ₹ {formatINR(
                    futureValue -
                    monthly * years * 12
                  )}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}