import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blogs/cibil-score")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto max-w-4xl px-6 py-28">

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-[#17357e]">
          Finance Tips
        </span>

        <h1 className="mt-6 bg-linear-to-r from-[#17357e] to-blue-600 bg-clip-text text-5xl font-bold text-transparent">
          How to Improve Your CIBIL Score in 30 Days
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Your CIBIL score plays a major role in loan approval and credit card eligibility.
          A higher score increases your chances of getting loans at lower interest rates.
        </p>

        <div className="mt-10 space-y-6 text-lg leading-8 text-foreground">

          <p>
            • Pay all EMIs and credit card bills on time.
          </p>

          <p>
            • Avoid applying for multiple loans together.
          </p>

          <p>
            • Maintain low credit utilization below 30%.
          </p>

          <p>
            • Keep old credit cards active for better credit history.
          </p>

          <p>
            • Regularly monitor your credit report for errors.
          </p>

        </div>

      </main>

      <Footer />

    </div>
  );
}
