// "use client";

// const BANKS = [
//   { name: "HDFC Bank",            color: "from-red-600 to-rose-500",       short: "HDFC" },
//   { name: "ICICI Bank",           color: "from-orange-500 to-amber-500",   short: "ICICI" },
//   { name: "State Bank of India",  color: "from-blue-700 to-indigo-600",    short: "SBI" },
//   { name: "Axis Bank",            color: "from-purple-700 to-fuchsia-600", short: "Axis" },
//   { name: "Kotak Mahindra Bank",  color: "from-red-700 to-orange-600",     short: "Kotak" },
//   { name: "IDFC First Bank",      color: "from-rose-600 to-red-500",       short: "IDFC" },
//   { name: "Yes Bank",             color: "from-sky-600 to-blue-500",       short: "Yes" },
//   { name: "IndusInd Bank",        color: "from-rose-500 to-pink-500",      short: "IndusInd" },
//   { name: "Punjab National Bank", color: "from-amber-600 to-yellow-500",   short: "PNB" },
//   { name: "Bank of Baroda",       color: "from-orange-600 to-red-500",     short: "BoB" },
//   { name: "Canara Bank",          color: "from-yellow-600 to-amber-600",   short: "Canara" },
//   { name: "Union Bank of India",  color: "from-blue-600 to-cyan-500",      short: "Union" },
//   { name: "Federal Bank",         color: "from-blue-800 to-sky-600",       short: "Federal" },
//   { name: "RBL Bank",             color: "from-fuchsia-700 to-pink-600",   short: "RBL" },
//   { name: "Bajaj Finserv",        color: "from-indigo-700 to-blue-600",    short: "Bajaj" },
//   { name: "Tata Capital",         color: "from-blue-900 to-blue-700",      short: "Tata" },
//   { name: "Aditya Birla Finance", color: "from-red-600 to-rose-600",       short: "ABFL" },
//   { name: "L&T Finance",          color: "from-sky-700 to-blue-700",       short: "L&T" },
//   { name: "Mahindra Finance",     color: "from-red-700 to-rose-700",       short: "Mahindra" },
//   { name: "IDBI Bank",            color: "from-emerald-700 to-green-600",  short: "IDBI" },
//   { name: "Piramal Finance",      color: "from-orange-700 to-red-600",     short: "Piramal" },
//   { name: "DCB Bank",             color: "from-blue-700 to-indigo-700",    short: "DCB" },
//   { name: "Karnataka Bank",       color: "from-indigo-700 to-violet-700",  short: "Karnataka" },
//   { name: "South Indian Bank",    color: "from-rose-700 to-red-700",       short: "SIB" },
// ];

// export function PartnerBanks() {
//   return (
//     <section id="partners" className="bg-gradient-to-b from-blue-50/40 to-white py-20">
//       <div className="container mx-auto px-6">
//         <div className="text-center">
//           <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
//             Trusted by leading lenders
//           </span>
//           <h2 className="mt-3 text-4xl font-bold text-[#07142f] md:text-5xl">Our Banking & NBFC Partners</h2>
//           <p className="mt-3 text-gray-500">
//             We partner with India's top banks and NBFCs to get you the best loan offers.
//           </p>
//         </div>

//         <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//           {BANKS.map((b) => (
//             <div
//               key={b.name}
//               className="group flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//             >
//               <div
//                 className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${b.color} text-[11px] font-bold text-white shadow`}
//               >
//                 {b.short.slice(0, 3).toUpperCase()}
//               </div>
//               <div className="min-w-0">
//                 <div className="truncate text-sm font-semibold text-[#07142f]">{b.name}</div>
//                 <div className="text-[10px] uppercase tracking-wider text-gray-400">Loan Partner</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <p className="mt-8 text-center text-xs text-gray-500">
//           *Logos and names are property of respective banks/NBFCs and used here solely to indicate channel partnership.
//         </p>
//       </div>
//     </section>
//   );
// }

// export const BANK_NAMES = BANKS.map((b) => b.name);
"use client";

const BANKS = [
  {
    name: "HDFC Bank",
    short: "HDFC",
    logoClass: "bg-white border border-red-200",
    textClass: "text-[#004b8d]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#ed1c24]" />,
  },
  {
    name: "ICICI Bank",
    short: "ICICI",
    logoClass: "bg-[#fff4e6] border border-orange-200",
    textClass: "text-[#b45309]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#f58220]" />,
  },
  {
    name: "State Bank of India",
    short: "SBI",
    logoClass: "bg-[#eaf4ff] border border-blue-200",
    textClass: "text-[#1d4ed8]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#00a9e0]" />,
  },
  {
    name: "Axis Bank",
    short: "AXIS",
    logoClass: "bg-[#fff1f5] border border-pink-200",
    textClass: "text-[#8a1538]",
    mark: <span className="mr-1 inline-block h-4 w-4 rotate-45 bg-[#8a1538]" />,
  },
  {
    name: "Kotak Mahindra Bank",
    short: "KOTAK",
    logoClass: "bg-white border border-red-200",
    textClass: "text-[#003f88]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full border-4 border-[#ed1c24]" />,
  },
  {
    name: "IDFC First Bank",
    short: "IDFC FIRST",
    logoClass: "bg-[#fff1f2] border border-red-200",
    textClass: "text-[#9f1239]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#b91c1c]" />,
  },
  {
    name: "Yes Bank",
    short: "YES",
    logoClass: "bg-[#eff6ff] border border-blue-200",
    textClass: "text-[#1d4ed8]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#dc2626]" />,
  },
  {
    name: "IndusInd Bank",
    short: "IndusInd",
    logoClass: "bg-[#fff7ed] border border-orange-200",
    textClass: "text-[#9a3412]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#ea580c]" />,
  },
  {
    name: "Punjab National Bank",
    short: "PNB",
    logoClass: "bg-[#fff7ed] border border-amber-200",
    textClass: "text-[#b45309]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#f59e0b]" />,
  },
  {
    name: "Bank of Baroda",
    short: "BOB",
    logoClass: "bg-[#fff7ed] border border-orange-200",
    textClass: "text-[#ea580c]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#f97316]" />,
  },
  {
    name: "Canara Bank",
    short: "CANARA",
    logoClass: "bg-[#eff6ff] border border-blue-200",
    textClass: "text-[#1e40af]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#facc15]" />,
  },
  {
    name: "Union Bank of India",
    short: "UNION",
    logoClass: "bg-[#eef2ff] border border-indigo-200",
    textClass: "text-[#1d4ed8]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#dc2626]" />,
  },
  {
    name: "Federal Bank",
    short: "FEDERAL",
    logoClass: "bg-[#eff6ff] border border-sky-200",
    textClass: "text-[#075985]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#0284c7]" />,
  },
  {
    name: "RBL Bank",
    short: "RBL",
    logoClass: "bg-[#fdf2f8] border border-pink-200",
    textClass: "text-[#be185d]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#db2777]" />,
  },
  {
    name: "Bajaj Finserv",
    short: "BAJAJ",
    logoClass: "bg-[#eff6ff] border border-blue-200",
    textClass: "text-[#1d4ed8]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded bg-[#2563eb]" />,
  },
  {
    name: "Tata Capital",
    short: "TATA",
    logoClass: "bg-[#eff6ff] border border-blue-200",
    textClass: "text-[#1e3a8a]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#1e40af]" />,
  },
  {
    name: "Aditya Birla Finance",
    short: "ABFL",
    logoClass: "bg-[#fff1f2] border border-red-200",
    textClass: "text-[#b91c1c]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#ef4444]" />,
  },
  {
    name: "L&T Finance",
    short: "L&T",
    logoClass: "bg-[#eff6ff] border border-sky-200",
    textClass: "text-[#0f4c81]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#0369a1]" />,
  },
  {
    name: "Mahindra Finance",
    short: "Mahindra",
    logoClass: "bg-[#fff1f2] border border-red-200",
    textClass: "text-[#991b1b]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#dc2626]" />,
  },
  {
    name: "IDBI Bank",
    short: "IDBI",
    logoClass: "bg-[#ecfdf5] border border-green-200",
    textClass: "text-[#047857]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#059669]" />,
  },
  {
    name: "Piramal Finance",
    short: "PIRAMAL",
    logoClass: "bg-[#fff7ed] border border-orange-200",
    textClass: "text-[#c2410c]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#ea580c]" />,
  },
  {
    name: "DCB Bank",
    short: "DCB",
    logoClass: "bg-[#eff6ff] border border-blue-200",
    textClass: "text-[#1d4ed8]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#1d4ed8]" />,
  },
  {
    name: "Karnataka Bank",
    short: "KBL",
    logoClass: "bg-[#eef2ff] border border-indigo-200",
    textClass: "text-[#3730a3]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-sm bg-[#4338ca]" />,
  },
  {
    name: "South Indian Bank",
    short: "SIB",
    logoClass: "bg-[#fff1f2] border border-red-200",
    textClass: "text-[#be123c]",
    mark: <span className="mr-1 inline-block h-4 w-4 rounded-full bg-[#e11d48]" />,
  },
];

export function PartnerBanks() {
  return (
    <section
      id="partners"
      className="bg-gradient-to-b from-blue-50/70 via-white to-blue-50/50 py-20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#17357e]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#17357e]">
            Trusted by leading lenders
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#07142f] md:text-5xl">
            Our Banking & NBFC Partners
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            We partner with India's top banks and NBFCs to help customers access
            better loan offers and faster financial services.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BANKS.map((bank) => (
            <div
              key={bank.name}
              className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#17357e]/20 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-100 blur-2xl transition group-hover:bg-blue-200" />

              <div className="relative mx-auto flex h-16 w-28 items-center justify-center rounded-2xl bg-white shadow-md">
                <div
                  className={`flex h-12 w-24 items-center justify-center rounded-xl px-2 text-center text-[11px] font-extrabold tracking-wide ${bank.logoClass} ${bank.textClass}`}
                >
                  <span className="flex items-center justify-center">
                    {bank.mark}
                    {bank.short}
                  </span>
                </div>
              </div>

              <h3 className="relative mt-4 line-clamp-2 min-h-[38px] text-sm font-bold text-[#07142f]">
                {bank.name}
              </h3>

              <p className="relative mt-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Loan Partner
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          *These are custom logo-style placeholders inspired by brand colors.
          Use official logos only with proper permission.
        </p>
      </div>
    </section>
  );
}

export const BANK_NAMES = BANKS.map((bank) => bank.name);