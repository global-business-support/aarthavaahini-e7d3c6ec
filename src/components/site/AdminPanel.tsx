import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileCheck2, IndianRupee, TrendingUp, Smartphone } from "lucide-react";

const leads = [
  { name: "Rahul Sharma", product: "Home Loan", amount: "₹ 45 L", status: "Approved", color: "bg-success/15 text-success" },
  { name: "Priya Verma", product: "Term Insurance", amount: "₹ 1 Cr", status: "In Review", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "Arjun Iyer", product: "Mutual Fund SIP", amount: "₹ 25,000", status: "Active", color: "bg-primary/15 text-primary" },
  { name: "Neha Gupta", product: "Personal Loan", amount: "₹ 5 L", status: "Disbursed", color: "bg-success/15 text-success" },
];

const stats = [
  { icon: Users, label: "Total Leads", value: "12,480", trend: "+18%" },
  { icon: FileCheck2, label: "Approved", value: "3,142", trend: "+9%" },
  { icon: IndianRupee, label: "Disbursed", value: "₹ 184 Cr", trend: "+22%" },
  { icon: TrendingUp, label: "Conversion", value: "34.2%", trend: "+4.1%" },
];

export function AdminPanel() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">For Advisors & Partners</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Admin Panel & <span className="text-gradient">Lead Management</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A powerful command-centre for your team — track leads, run CIBIL checks, manage applications and grow your book of business. Available on web and React Native mobile.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card className="overflow-hidden border-border/60 bg-card p-0 shadow-elegant">
            <div className="flex items-center justify-between border-b border-border/60 bg-gradient-primary px-6 py-4 text-primary-foreground">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Aarthvaahini CRM</p>
                <p className="font-display text-lg font-semibold">Dashboard Overview</p>
              </div>
              <Badge className="bg-card/20 text-primary-foreground hover:bg-card/20">Live</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-4">
              {stats.map(({ icon: Icon, label, value, trend }) => (
                <div key={label} className="rounded-xl border border-border/60 bg-gradient-card p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="font-display text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs font-medium text-success">{trend}</p>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <p className="mb-3 text-sm font-semibold text-foreground">Recent Leads</p>
              <div className="overflow-hidden rounded-xl border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.name} className="border-t border-border/60">
                        <td className="px-4 py-3 font-medium text-foreground">{l.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{l.product}</td>
                        <td className="px-4 py-3 font-semibold">{l.amount}</td>
                        <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${l.color}`}>{l.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-border/60 bg-gradient-card p-8 text-foreground shadow-elegant">
            <div className="absolute inset-0 bg-gradient-glow opacity-60" />
            <div className="relative">
              <Smartphone className="h-8 w-8 text-primary-glow" />
              <h3 className="mt-4 font-display text-2xl font-bold">React Native Mobile App</h3>
              <p className="mt-2 text-muted-foreground">
                Manage leads on the go. Push notifications for every status change, in-app CIBIL checks, document uploads and e-sign — all natively for iOS & Android.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {["Real-time lead pipeline", "Push notifications", "In-app document upload", "Biometric secure login"].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-xs font-medium shadow-soft backdrop-blur">App Store</div>
                <div className="rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-xs font-medium shadow-soft backdrop-blur">Google Play</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
