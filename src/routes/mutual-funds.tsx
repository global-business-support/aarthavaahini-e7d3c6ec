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
      <main className="relative isolate overflow-hidden">
        <ProductHeroSlider
          variant="watermark"
          slides={[
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80" },
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1600&q=80" },
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80" },
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
