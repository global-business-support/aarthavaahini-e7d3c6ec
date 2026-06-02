import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blogs/home-loan-guide")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto max-w-4xl px-6 py-28">

        <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
          Loans
        </span>

        <h1 className="mt-6 bg-linear-to-r from-[#17357e] to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
          Complete Home Loan Guide for First-Time Buyers
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Buying your first home is exciting, but understanding the home loan process
          is extremely important before applying.
        </p>

        <div className="mt-10 space-y-6 text-lg leading-8 text-foreground">

          <p>
            • Check your loan eligibility and monthly income.
          </p>

          <p>
            • Maintain a good CIBIL score above 750.
          </p>

          <p>
            • Compare interest rates from multiple banks.
          </p>

          <p>
            • Keep documents ready including PAN, Aadhaar, and income proof.
          </p>

          <p>
            • Use EMI calculators before finalizing the loan.
          </p>

        </div>

      </main>

      <Footer />

    </div>
  );
}