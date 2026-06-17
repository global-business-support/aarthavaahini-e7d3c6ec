"use client";

type Bank = { name: string; domain: string };

const BANKS: Bank[] = [
  { name: "HDFC Bank", domain: "hdfcbank.com" },
  { name: "ICICI Bank", domain: "icicibank.com" },
  { name: "State Bank of India", domain: "sbi.co.in" },
  { name: "Axis Bank", domain: "axisbank.com" },
  { name: "Kotak Mahindra Bank", domain: "kotak.com" },
  { name: "IDFC First Bank", domain: "idfcfirstbank.com" },
  { name: "Yes Bank", domain: "yesbank.in" },
  { name: "IndusInd Bank", domain: "indusind.com" },
  { name: "Punjab National Bank", domain: "pnbindia.in" },
  { name: "Bank of Baroda", domain: "bankofbaroda.in" },
  { name: "Canara Bank", domain: "canarabank.com" },
  { name: "Union Bank of India", domain: "unionbankofindia.co.in" },
  { name: "Federal Bank", domain: "federalbank.co.in" },
  { name: "RBL Bank", domain: "rblbank.com" },
  { name: "Bajaj Finserv", domain: "bajajfinserv.in" },
  { name: "Tata Capital", domain: "tatacapital.com" },
  { name: "Aditya Birla Finance", domain: "adityabirlacapital.com" },
  { name: "L&T Finance", domain: "ltfs.com" },
  { name: "Mahindra Finance", domain: "mahindrafinance.com" },
  { name: "IDBI Bank", domain: "idbibank.in" },
  { name: "Piramal Finance", domain: "piramalfinance.com" },
  { name: "DCB Bank", domain: "dcbbank.com" },
  { name: "Karnataka Bank", domain: "karnatakabank.com" },
  { name: "South Indian Bank", domain: "southindianbank.com" },
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
            We partner with India's top banks and NBFCs to help customers
            access better loan offers and faster financial services.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BANKS.map((bank) => (
            <div
              key={bank.name}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#17357e]/30 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-100 blur-2xl transition group-hover:bg-blue-200" />

              <div className="relative flex h-16 w-full items-center justify-center">
                <img
                  src={`https://logo.clearbit.com/${bank.domain}`}
                  alt={`${bank.name} logo`}
                  loading="lazy"
                  className="max-h-14 max-w-[120px] object-contain"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src = `https://www.google.com/s2/favicons?domain=${bank.domain}&sz=128`;
                  }}
                />
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
          *Logos and trademarks are property of their respective banks/NBFCs
          and are used here solely to indicate channel partnerships.
        </p>
      </div>
    </section>
  );
}

export const BANK_NAMES = BANKS.map((b) => b.name);
