import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { CibilChecker } from "@/components/site/CibilChecker";
import { AdminPanel } from "@/components/site/AdminPanel";
import { Footer } from "@/components/site/Footer";
import { ScrollScene } from "@/components/site/ScrollScene";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ScrollScene>
          <Hero />
          <Products />
          <EmiCalculator />
          <CibilChecker />
          <AdminPanel />
        </ScrollScene>
      </main>
      <Footer />
    </div>
  );
}
