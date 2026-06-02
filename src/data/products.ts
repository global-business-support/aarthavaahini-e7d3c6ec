export type ProductItem = {
  slug: string;
  name: string;
  tag?: string;
  rate?: string;
  desc: string;
  features: string[];
};

export const loans: ProductItem[] = [
  { slug: "home-loan", name: "Home Loan", rate: "8.40% p.a.*", tag: "Most Popular",
    desc: "Turn your dream home into reality with competitive rates from 40+ banks.",
    features: ["Loan up to ₹10 Cr", "Tenure up to 30 years", "Balance transfer + top-up", "Zero processing fee offers"] },
  { slug: "personal-loan", name: "Personal Loan", rate: "10.49% p.a.*",
    desc: "Need money for a wedding, healthcare, or travel? Get fast approval in just 24 hours.",
    features: ["Loan up to ₹40 Lakh", "Tenure up to 6 years", "Minimal paperwork", "Instant in-principle approval"] },
  { slug: "business-loan", name: "Business Loan", rate: "12.00% p.a.*",
    desc: "MSME, startup, or business expansion — collateral-free financing options are also available.",
    features: ["Loan up to ₹2 Cr", "Working capital + term loans", "GST/ITR based", "Dedicated relationship manager"] },
  { slug: "loan-against-property", name: "Loan Against Property", rate: "9.10% p.a.*",
    desc: "Apni property ki value unlock karein — lowest rates LAP me.",
    features: ["Loan up to ₹15 Cr", "Tenure up to 20 years", "Residential / commercial / industrial", "Overdraft facility"] },
  { slug: "car-loan", name: "Car Loan", rate: "8.75% p.a.*",
    desc: "New ya used — 100% on-road funding.",
    features: ["Up to ₹1 Cr", "Tenure up to 7 years", "Pre-approved offers", "Quick disbursal"] },
  { slug: "education-loan", name: "Education Loan", rate: "8.85% p.a.*",
    desc: "Complete funding solutions for education in India or abroad.",
    features: ["Up to ₹1.5 Cr", "Moratorium period", "Tax benefits 80E", "Collateral free up to ₹40L"] },
  // 
  {
  slug: "project-loan",
  name: "Project Loan",
  rate: "Starting from 8.50%*",
  desc: "Funding solutions for MSME projects, startups, infrastructure development, and business expansion requirements.",
  features: [
    "Collateral & collateral-free options",
    "Quick approval process",
    "Long repayment tenure",
    "Customized funding solutions"
  ]
},
  { slug: "credit-card", name: "Credit Card", rate: "Lifetime Free*",
    desc: "Cashback, travel, and fuel credit cards from top banks.",
    features: ["Reward points", "Airport lounge access", "EMI conversion", "5% cashback options"] },
];

export const insurance: ProductItem[] = [
  { slug: "term-life", name: "Term Life Insurance", rate: "₹1 Cr @ ₹500/m*", tag: "Recommended",
    desc: "Family protection — the most important cover.",
    features: ["Cover up to ₹10 Cr", "Tenure up to 85 years", "Critical illness rider", "Tax benefits 80C + 10(10D)"] },
  { slug: "health", name: "Health Insurance", rate: "₹10 L @ ₹599/m*",
    desc: "Cashless in 10,000+ hospitals — family floater plans.",
    features: ["Cover up to ₹1 Cr", "No room rent capping", "OPD + maternity", "No claim bonus 100%"] },
  { slug: "motor", name: "Motor Insurance",
    desc: "Comprehensive cover for car and 2-wheeler.",
    features: ["Zero depreciation", "Engine protection", "RSA 24x7", "Instant policy issuance"] },
  { slug: "travel", name: "Travel Insurance",
    desc: "Complete protection for domestic and international trips.",
    features: ["Medical emergency", "Baggage loss", "Trip cancellation", "Schengen approved"] },
  { slug: "home", name: "Home Insurance",
    desc: "Protection for home and belongings — fire, theft, natural calamity.",
    features: ["Structure + contents", "Long term discount", "Burglary cover", "Electrical breakdown"] },
  { slug: "personal-accident", name: "Personal Accident",
    desc: "Complete protection against losses caused by accidents.",
    features: ["Death + disability", "Hospital cash", "Education benefit", "Premium ₹500/year"] },
  { slug: "child-plan", name: "Child Plan",
    desc: "Guaranteed plans for children's education and future.",
    features: ["Guaranteed maturity", "Waiver of premium", "Education milestones", "Tax free returns"] },
  { slug: "endowment", name: "Endowment / ULIP",
    desc: "Insurance + investment — long term wealth + cover.",
    features: ["Market linked returns", "Tax benefits", "Partial withdrawal", "Top-up flexibility"] },
];

export const mutualFunds: ProductItem[] = [
  { slug: "equity-sip", name: "Equity SIP", rate: "Avg 14% CAGR*", tag: "Top Pick",
    desc: "Start from ₹500 — long-term wealth creation.",
    features: ["Large/Mid/Small cap", "Step-up SIP", "Direct plans", "Goal based portfolios"] },
  { slug: "elss", name: "ELSS Tax Saver", rate: "Lock-in 3 yrs",
    desc: "Tax savings up to ₹1.5L under Section 80C — equity returns.",
    features: ["Shortest lock-in", "Tax free LTCG up to ₹1L", "Curated funds", "Lump-sum + SIP"] },
  { slug: "debt", name: "Debt Funds", rate: "7-8% p.a.*",
    desc: "Better returns than FD — with lower risk.",
    features: ["Liquid / short / long term", "Better than FD post-tax", "Daily liquidity", "Indexation benefit"] },
  { slug: "hybrid", name: "Hybrid / Balanced",
    desc: "Equity + Debt mix — perfect for beginners.",
    features: ["Auto rebalancing", "Lower volatility", "SWP for income", "5-year horizon"] },
  { slug: "international", name: "International Funds",
    desc: "Invest in US, China, and global markets.",
    features: ["Geographic diversification", "Tech giants exposure", "USD appreciation", "Fund of funds"] },
  { slug: "nps", name: "NPS (National Pension)", rate: "Extra ₹50K tax bachat",
    desc: "Retirement planning — extra benefit under Section 80CCD(1B).",
    features: ["Lowest cost", "Tier 1 + Tier 2", "Auto/active choice", "Annuity post 60"] },
  { slug: "sgb", name: "Sovereign Gold Bonds",
    desc: "Better than physical gold — 2.5% extra interest + government guarantee.",
    features: ["No storage cost", "Tax free on maturity", "8 year tenure", "RBI issued"] },
  { slug: "pms", name: "PMS & AIF (HNI)",
    desc: "Expert-managed portfolios for ₹50L+.",
    features: ["SEBI registered", "Direct stock ownership", "Customized strategy", "Quarterly reporting"] },
];

export const bankingProducts: ProductItem[] = [
  { slug: "savings-account", name: "Savings Account", tag: "Zero Balance",
    desc: "Open a zero-balance savings account with India's top banks in minutes.",
    features: ["Zero balance options", "Instant debit card", "UPI & net banking", "Higher interest rates"] },
  { slug: "current-account", name: "Current Account",
    desc: "Business current accounts with unlimited transactions and overdraft facility.",
    features: ["Unlimited transactions", "Overdraft facility", "Multi-location access", "Business debit card"] },
  { slug: "fixed-deposit", name: "Fixed Deposit", rate: "Up to 7.75% p.a.*",
    desc: "Lock-in guaranteed returns with FDs from 20+ leading banks.",
    features: ["Flexible tenure", "Auto-renewal", "Loan against FD", "Senior citizen bonus"] },
  { slug: "recurring-deposit", name: "Recurring Deposit", rate: "Up to 7.25% p.a.*",
    desc: "Build savings habit with monthly RD — guaranteed maturity amount.",
    features: ["Start ₹500/month", "6 months – 10 years", "Auto-debit", "Premature withdrawal"] },
  { slug: "demat-account", name: "Demat Account", tag: "Free AMC",
    desc: "Open a free demat & trading account to invest in stocks, IPOs, and bonds.",
    features: ["Zero AMC offers", "Instant activation", "Stocks + F&O + IPO", "Mobile trading app"] },
  { slug: "bank-locker", name: "Bank Locker",
    desc: "Safe deposit lockers across branches for jewellery and valuables.",
    features: ["Multiple sizes", "Insurance covered", "24/7 secure vault", "Annual rent"] },
];



