import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { insurance } from "@/data/products";
import insuranceBg from "@/assets/insurance-bg.jpeg";

export const Route = createFileRoute("/insurance")({
  head: () => ({ meta: [
    { title: "Insurance — Term, Health, Motor, Travel | Aarthvaahini" },
    { name: "description", content: "Protect your family with term life, health, motor, travel, home and child insurance from top insurers." },
  ]}),
  component: () => (
   <div
  className="min-h-screen relative"
  style={{
    backgroundImage: `url(${insuranceBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    
  }}
>
  <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

  <div className="relative z-10">
    <Header />

    <main>
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
</div> 
  ),
});