"use client";

const BANKS = [
  { name: "HDFC Bank",            color: "from-red-600 to-rose-500",       short: "HDFC" },
  { name: "ICICI Bank",           color: "from-orange-500 to-amber-500",   short: "ICICI" },
  { name: "State Bank of India",  color: "from-blue-700 to-indigo-600",    short: "SBI" },
  { name: "Axis Bank",            color: "from-purple-700 to-fuchsia-600", short: "Axis" },
  { name: "Kotak Mahindra Bank",  color: "from-red-700 to-orange-600",     short: "Kotak" },
  { name: "IDFC First Bank",      color: "from-rose-600 to-red-500",       short: "IDFC" },
  { name: "Yes Bank",             color: "from-sky-600 to-blue-500",       short: "Yes" },
  { name: "IndusInd Bank",        color: "from-rose-500 to-pink-500",      short: "IndusInd" },
  { name: "Punjab National Bank", color: "from-amber-600 to-yellow-500",   short: "PNB" },
  { name: "Bank of Baroda",       color: "from-orange-600 to-red-500",     short: "BoB" },
  { name: "Canara Bank",          color: "from-yellow-600 to-amber-600",   short: "Canara" },
  { name: "Union Bank of India",  color: "from-blue-600 to-cyan-500",      short: "Union" },
  { name: "Federal Bank",         color: "from-blue-800 to-sky-600",       short: "Federal" },
  { name: "RBL Bank",             color: "from-fuchsia-700 to-pink-600",   short: "RBL" },
  { name: "Bajaj Finserv",        color: "from-indigo-700 to-blue-600",    short: "Bajaj" },
  { name: "Tata Capital",         color: "from-blue-900 to-blue-700",      short: "Tata" },
  { name: "Aditya Birla Finance", color: "from-red-600 to-rose-600",       short: "ABFL" },
  { name: "L&T Finance",          color: "from-sky-700 to-blue-700",       short: "L&T" },
  { name: "Mahindra Finance",     color: "from-red-700 to-rose-700",       short: "Mahindra" },
  { name: "IDBI Bank",            color: "from-emerald-700 to-green-600",  short: "IDBI" },
  { name: "Piramal Finance",      color: "from-orange-700 to-red-600",     short: "Piramal" },
  { name: "DCB Bank",             color: "from-blue-700 to-indigo-700",    short: "DCB" },
  { name: "Karnataka Bank",       color: "from-indigo-700 to-violet-700",  short: "Karnataka" },
  { name: "South Indian Bank",    color: "from-rose-700 to-red-700",       short: "SIB" },
];

export function PartnerBanks() {
  return (
    <section id="partners" className="bg-gradient-to-b from-blue-50/40 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
            Trusted by leading lenders
          </span>
          <h2 className="mt-3 text-4xl font-bold text-[#07142f] md:text-5xl">Our Banking & NBFC Partners</h2>
          <p className="mt-3 text-gray-500">
            We partner with India's top banks and NBFCs to get you the best loan offers.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BANKS.map((b) => (
            <div
              key={b.name}
              className="group flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${b.color} text-[11px] font-bold text-white shadow`}
              >
                {b.short.slice(0, 3).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[#07142f]">{b.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400">Loan Partner</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          *Logos and names are property of respective banks/NBFCs and used here solely to indicate channel partnership.
        </p>
      </div>
    </section>
  );
}

export const BANK_NAMES = BANKS.map((b) => b.name);
