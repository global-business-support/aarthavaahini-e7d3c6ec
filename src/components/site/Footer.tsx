import logo from "@/assets/logo.jpg";

export function Footer() {
  const cols = [
    { title: "Products", items: ["Home Loan", "Personal Loan", "Insurance", "Mutual Funds"] },
    { title: "Tools", items: ["EMI Calculator", "CIBIL Checker", "SIP Planner", "Eligibility"] },
    { title: "Company", items: ["About", "Careers", "Partners", "Contact"] },
    { title: "Legal", items: ["Privacy", "Terms", "Disclosures", "Grievance"] },
  ];
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="container mx-auto grid gap-10 px-6 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Aarthvaahini" className="h-12 w-auto" />
            <div>
              <p className="font-display text-lg font-bold text-primary">AARTHVAAHINI</p>
              <p className="text-[10px] tracking-[0.18em] text-primary-glow">SRIJAN SE SAMRIDDHI TAK</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            India's premium financial marketplace for Loans, Insurance and Mutual Funds — backed by RBI-compliant partners.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-display text-sm font-bold text-foreground">{c.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => <li key={i} className="hover:text-primary cursor-pointer transition-smooth">{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aarthvaahini Financial Services Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
