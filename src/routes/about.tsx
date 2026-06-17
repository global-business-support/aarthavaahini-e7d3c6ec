import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import {
  Award,
  Building2,
  Target,
  Users,
  ShieldCheck,
  Network,
  Sparkles,
  CheckCircle2,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Aarthvaahini Financial Services" },
      {
        name: "description",
        content:
          "Aarthvaahini Financial Services is a full-service advisory firm — wealth management, capital raising, insurance and corporate finance with 50+ institutional partners.",
      },
      { property: "og:title", content: "About Us — Aarthvaahini Financial Services" },
      { property: "og:url", content: "https://aarthavaahini.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://aarthavaahini.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-24">
        {/* Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            About Us
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Empowering Your Financial Journey,{" "}
            <span className="text-gradient">Securing Your Future</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            At <strong>Aarthvaahini Financial Services Private Limited</strong>, we
            believe that financial freedom and business growth shouldn't be
            stalled by complexity. The modern financial landscape is vast, with
            overlapping instruments, shifting market dynamics, and intricate
            regulatory frameworks. Navigating it requires more than just standard
            products — it demands an architect.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We are a full-service financial advisory and solutions firm dedicated
            to bridging the gap between your current financial reality and your
            ultimate life or business goals. Whether you are an individual
            safeguarding your family's future or a corporate entity scaling new
            frontiers, Aarthvaahini is your trusted partner in wealth creation,
            capital raising, and risk mitigation.
          </p>
        </div>

        {/* Advantage */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              The Aarthvaahini Advantage
            </h2>
            <p className="mt-2 text-muted-foreground">Why partner with us</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="p-7 shadow-soft">
              <Network className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">
                360° Financial Ecosystem
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Financial planning is a complex mechanism. Because various
                instruments inherently overlap, looking at them in isolation
                leads to inefficiencies. Our deep expertise across asset
                creation (wealth management) and liability structuring (loans &
                capital) lets us build holistic solutions that single-avenue
                firms cannot replicate.
              </p>
            </Card>

            <Card className="p-7 shadow-soft">
              <Building2 className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">
                Access to 50+ Financial Institutions
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We don't believe in one-size-fits-all. Through our network and
                corporate partnerships, we hold codes with 50+ leading financial
                institutions — so we're never restricted to a single suite of
                products. We sit on your side of the table and negotiate the
                best fit for you.
              </p>
            </Card>

            <Card className="p-7 shadow-soft">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">
                Certified & Compliant Expertise
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Trust is earned through competence and compliance. Our team holds
                premier industry credentials:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "IRDA Certification — Life & General Insurance",
                  "NISM Series V-A — Mutual Fund Distributors",
                  "NISM Series VIII — Equity Derivatives",
                  "NISM Series XIII — Common Derivatives",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-7 shadow-soft">
              <Sparkles className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">
                Uncompromising Transparency
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We operate on a foundational promise: <em>complete transparency</em>.
                From fee structures and product risks to the underlying
                mechanics of your customized solution, you are fully informed at
                every single step of your financial roadmap.
              </p>
            </Card>
          </div>
        </div>

        {/* Solutions */}
        <div className="mt-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Our Core Solutions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Two distinct universes — Corporates scaling up, Individuals
              protecting and growing personal wealth.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="p-7 shadow-soft">
              <Briefcase className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-2xl font-bold">
                Corporate & Business Solutions
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                From day-to-day liquidity to mega-infrastructure expansions, we
                provide the financial fuel your business needs to thrive.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Asset & Capital Financing:</strong>{" "}
                  Loans Against Property (LAP) and customized Working Capital
                  solutions to optimize cash flow.
                </li>
                <li>
                  <strong className="text-foreground">Project Finance:</strong>{" "}
                  End-to-end fundraising and structuring for Greenfield (new)
                  and Brownfield (expansion) projects.
                </li>
                <li>
                  <strong className="text-foreground">Private Equity (PE):</strong>{" "}
                  Helping high-growth businesses prepare for, source, and raise
                  strategic equity capital.
                </li>
                <li>
                  <strong className="text-foreground">Corporate Risk Mitigation:</strong>{" "}
                  Keyman Insurance and comprehensive commercial insurance
                  safeguarding plant, machinery, premises and stocks.
                </li>
              </ul>
            </Card>

            <Card className="p-7 shadow-soft">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-2xl font-bold">
                Wealth Management & Personal Planning
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Every major life milestone requires a corpus. We map your
                investments directly to your personal aspirations.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Life Goal Milestones:</strong>{" "}
                  Step-by-step corpus creation for buying your dream house,
                  funding children's higher education, marriage expenses, or
                  career pivots.
                </li>
                <li>
                  <strong className="text-foreground">Retirement Planning:</strong>{" "}
                  Disciplined wealth engines so you maintain your lifestyle long
                  after your primary income stops.
                </li>
                <li>
                  <strong className="text-foreground">Personal Protection:</strong>{" "}
                  Bullet-proofing your plan with robust Life, Health and Motor
                  Insurance portfolios.
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Philosophy */}
        <Card className="mt-16 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 shadow-soft md:p-12">
          <Target className="h-8 w-8 text-primary" />
          <h2 className="mt-4 font-display text-3xl font-bold">Our Philosophy</h2>
          <p className="mt-4 text-lg italic leading-relaxed text-muted-foreground">
            "<strong className="not-italic text-foreground">Aarthvaahini</strong>"
            means a continuous flow of wealth and purpose. We don't just sell
            financial products; we engineer tailor-made solutions capable of
            tackling the most complex demands. While you focus on building your
            life and business, we focus on securing the foundation it stands
            upon.
          </p>
        </Card>

        {/* Company Details */}
        <Card className="mt-10 p-7 shadow-soft">
          <Building2 className="h-8 w-8 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold">Company Details</h2>
          <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="font-semibold">Legal Name</p>
              <p className="text-muted-foreground">
                Aarthvaahini Financial Services Pvt. Ltd.
              </p>
            </div>
            <div>
              <p className="font-semibold">Founded</p>
              <p className="text-muted-foreground">2024 • India</p>
            </div>
            <div>
              <p className="font-semibold">Registered Office</p>
              <p className="text-muted-foreground">
                2nd Floor, Shrinath Tower, Opposite C3 Hospital, Behind C21
                Mall, Vijay Nagar, Indore, MP 452010
              </p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground">care@aarthvaahini.com</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground">+91 98276 79993</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Users, n: "50,000+", l: "Happy Customers" },
            { icon: Building2, n: "50+", l: "Institutional Partners" },
            { icon: Award, n: "₹500 Cr+", l: "Disbursed" },
          ].map(({ icon: Icon, n, l }) => (
            <Card key={l} className="p-6 text-center shadow-soft">
              <Icon className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-3 font-display text-3xl font-bold text-gradient">
                {n}
              </p>
              <p className="text-sm text-muted-foreground">{l}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
