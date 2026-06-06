import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { ProductHeroSlider } from "@/components/site/ProductHeroSlider";
import { insurance } from "@/data/products";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Insurance — Term, Health, Motor, Travel | Aarthvaahini" },
      { name: "description", content: "Protect your family with term life, health, motor, travel, home and child insurance from top insurers." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative isolate overflow-hidden">
        <ProductHeroSlider
          variant="watermark"
          slides={[
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80" },
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?auto=format&fit=crop&w=1600&q=80" },
            { title: "", subtitle: "", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80" },
          ]}
        />
        <ProductPage
          title="Insurance"
          subtitle="Your family's protection comes first — choose from the best plans offered by top insurers."
          items={insurance}
          productType="insurance"
          accentClass="text-[#183c93]"
        />
      </main>
      <Footer />
    </div>
  ),
});
