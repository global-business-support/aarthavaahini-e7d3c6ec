import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { ProductHeroSlider } from "@/components/site/ProductHeroSlider";
import { MfCalculator } from "@/components/site/MfCalculator";
import { mutualFunds } from "@/data/products";

export const Route = createFileRoute("/mutual-funds")({
  head: () => ({
    meta: [
      { title: "Mutual Funds — SIP, ELSS, Debt, NPS | Aarthvaahini" },
      { name: "description", content: "Start SIP from ₹500. ELSS tax saver, debt funds, NPS, SGB and PMS — SEBI-registered advisors." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductHeroSlider
          slides={[
            {
              title: "Start SIP from just ₹500",
              subtitle: "Build long-term wealth with India's top performing mutual funds.",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
            },
            {
              title: "ELSS — Save Tax up to ₹46,800",
              subtitle: "Tax-saving funds under Section 80C with the best 3-yr returns.",
              image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1600&q=80",
            },
            {
              title: "Goal-based Investing",
              subtitle: "Plan retirement, child's education, dream home — all on one dashboard.",
              image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80",
            },
          ]}
        />
        <ProductPage
          title="Mutual Funds"
          subtitle="₹500 se start investing through SIP — the smartest path to long-term wealth creation."
          items={mutualFunds}
          productType="mutual_fund"
          accentClass="text-[#183c93]"
        />
        <MfCalculator />
      </main>
      <Footer />
    </div>
  ),
});
