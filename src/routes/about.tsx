import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Award, Building2, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — Aarthvaahini Financial Services" },
    { name: "description", content: "Aarthvaahini is India's premium financial marketplace for loans, insurance and mutual funds." },
  ]}),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-25">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">About <span className="text-gradient">Aarthvaahini</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Srijan se Samriddhi tak — Aarthvaahini brings banking, loans, insurance, and investment services together on a single platform for individuals, families, and businesses across India.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="p-7 shadow-soft">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-muted-foreground">
              Empowering every Indian with the right financial products — simple, transparent, and hassle-free. Benefit from competitive rates, RBI-compliant partners, and expert advisor-led guidance every step of the way.
            </p>
          </Card>
          <Card className="p-7 shadow-soft">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">Why Aarthvaahini?</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• 40+ bank partners + 20+ insurers</li>
              {/* <li>• SEBI registered mutual fund distributor</li>
              <li>• Free CIBIL check + EMI tools</li> */}
              <li>• Dedicated relationship manager</li>
            </ul>
          </Card>
        </div>

        <Card className="mt-8 p-7 shadow-soft">
          <Building2 className="h-8 w-8 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold">Company Details</h2>
          <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div><p className="font-semibold">Legal Name</p><p className="text-muted-foreground">Aarthvaahini Financial Services Pvt. Ltd.</p></div>
            <div><p className="font-semibold">Founded</p><p className="text-muted-foreground">2024 • India</p></div>
            <div><p className="font-semibold">Registered Office</p><p className="text-muted-foreground">Mumbai, Maharashtra, India</p></div>
            <div><p className="font-semibold">Email</p><p className="text-muted-foreground">support@aarthvaahini.com</p></div>
            <div><p className="font-semibold">Phone</p><p className="text-muted-foreground">+91 90000 00000</p></div>
            {/* <div><p className="font-semibold">Compliance</p><p className="text-muted-foreground">RBI guidelines • IRDAI partner • SEBI registered MFD</p></div> */}
          </div>
        </Card>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Users, n: "50,000+", l: "Happy Customers" },
            { icon: Building2, n: "40+", l: "Bank Partners" },
            { icon: Award, n: "₹500 Cr+", l: "Disbursed" },
          ].map(({ icon: Icon, n, l }) => (
            <Card key={l} className="p-6 text-center shadow-soft">
              <Icon className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-3 font-display text-3xl font-bold text-gradient">{n}</p>
              <p className="text-sm text-muted-foreground">{l}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
