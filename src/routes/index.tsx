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
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute top-2/3 left-1/4 h-96 w-96 rounded-full bg-yellow-100/60 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
      </div>
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
