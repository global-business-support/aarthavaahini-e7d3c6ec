import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { bankingProducts } from "@/data/products";

export const Route = createFileRoute("/banking")({
  head: () => ({ meta: [
    { title: "Banking — Savings, Current, FD, Demat | Aarthvaahini" },
    { name: "description", content: "Open savings, current, FD, RD, demat accounts and bank lockers with India's top banks." },
  ]}),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main><ProductPage title="Banking" subtitle="Savings, current, FD, demat — all on a single platform."
        items={bankingProducts} productType="banking" accentClass="text-[#1565C0]" /></main>
      <Footer />
    </div>
  ),
});
