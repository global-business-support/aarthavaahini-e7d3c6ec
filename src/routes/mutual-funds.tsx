import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { mutualFunds } from "@/data/products";

export const Route = createFileRoute("/mutual-funds")({
  head: () => ({ meta: [
    { title: "Mutual Funds — SIP, ELSS, Debt, NPS | Aarthvaahini" },
    { name: "description", content: "Start SIP from ₹500. ELSS tax saver, debt funds, NPS, SGB and PMS — SEBI-registered advisors." },
  ]}),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main><ProductPage title="Mutual Funds" subtitle="₹500 se Start investing through SIP — the smartest path to long-term wealth creation."
        items={mutualFunds} productType="mutual_fund" accentClass="text-[#183c93]" /></main>
      <Footer />
    </div>
  ),
});
