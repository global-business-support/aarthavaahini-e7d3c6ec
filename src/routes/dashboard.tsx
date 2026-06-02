import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto py-32">

        <h1 className="text-4xl font-bold">
          User Dashboard
        </h1>

        <p className="mt-4">
          Welcome {user?.email}
        </p>

      </main>

      <Footer />
    </div>
  );
}
