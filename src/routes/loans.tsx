import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { ProductHeroSlider } from "@/components/site/ProductHeroSlider";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { loans } from "@/data/products";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Loans — Home, Personal, Business, LAP | Aarthvaahini" },
      { name: "description", content: "Apply for home, personal, business, car, education and gold loans from 40+ banks at lowest rates." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative isolate overflow-hidden">
        <ProductHeroSlider
          variant="watermark"
          slides={[
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80" },
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80" },
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=1600&q=80" },
          ]}
        />
        <ProductPage
          title="Loans"
          subtitle="Best loan offers from 40+ banks with approval within 24 hours."
          items={loans}
          productType="loan"
          accentClass="text-[#183c93]"
        />
        <EmiCalculator />
      </main>
      <Footer />
    </div>
  ),
});
