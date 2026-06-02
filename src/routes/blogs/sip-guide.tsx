import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blogs/sip-guide")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto max-w-4xl px-6 py-28">

        <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
          Mutual Funds
        </span>

        <h1 className="mt-6 bg-linear-to-r from-[#17357e] to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
          Why SIP is the Smartest Investment for Beginners
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          SIP (Systematic Investment Plan) is one of the safest and smartest ways
          to build long-term wealth through mutual funds.
        </p>

        <div className="mt-10 space-y-6 text-lg leading-8 text-foreground">

          <p>
            • Start investing with as low as ₹500 per month.
          </p>

          <p>
            • Benefit from compounding and disciplined investing.
          </p>

          <p>
            • Reduce market risk through rupee cost averaging.
          </p>

          <p>
            • Suitable for salaried employees and beginners.
          </p>

          <p>
            • Long-term SIPs can generate significant wealth.
          </p>

        </div>

      </main>

      <Footer />

    </div>
  );
}