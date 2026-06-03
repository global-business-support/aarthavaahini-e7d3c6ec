import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login / Register — Aarthvaahini" }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [li, setLi] = useState({ email: "", password: "" });
  const [su, setSu] = useState({ name: "", phone: "", email: "", password: "" });

  const goAfterLogin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const roles = (data ?? []).map((r) => r.role as string);
    if (roles.includes("admin")) nav({ to: "/admin" });
    else if (roles.some((r) =>
      ["manager", "sales_executive", "operations", "insurance_executive", "mf_executive"].includes(r),
    )) nav({ to: "/crm" });
    else nav({ to: "/dashboard" });
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: li.email,
      password: li.password,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    if (data.user) await goAfterLogin(data.user.id);
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: su.email,
      password: su.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: su.name, phone: su.phone },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created!");
    if (data.user) await goAfterLogin(data.user.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto flex flex-1 items-center justify-center px-6 py-16">
        <Card className="w-full max-w-md p-7 shadow-elegant">
          <h1 className="bg-gradient-to-r from-[#17357e] to-blue-600 bg-clip-text text-center font-display text-3xl font-bold text-transparent">
            Aarthvaahini Portal
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Login or create a new account.
          </p>
          <Tabs defaultValue="login" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={signIn} className="mt-4 space-y-3">
                <div>
                  <Label>Email</Label>
                  <Input type="email" required className="mt-1.5 h-11"
                    value={li.email} onChange={(e) => setLi({ ...li, email: e.target.value })} />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" required className="mt-1.5 h-11"
                    value={li.password} onChange={(e) => setLi({ ...li, password: e.target.value })} />
                </div>
                <Button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-[#17357e] to-blue-600 text-white">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={signUp} className="mt-4 space-y-3">
                <div>
                  <Label>Full Name</Label>
                  <Input required className="mt-1.5 h-11"
                    value={su.name} onChange={(e) => setSu({ ...su, name: e.target.value })} />
                </div>
                <div>
                  <Label>Mobile</Label>
                  <Input required className="mt-1.5 h-11"
                    value={su.phone} onChange={(e) => setSu({ ...su, phone: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" required className="mt-1.5 h-11"
                    value={su.email} onChange={(e) => setSu({ ...su, email: e.target.value })} />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" required minLength={6} className="mt-1.5 h-11"
                    value={su.password} onChange={(e) => setSu({ ...su, password: e.target.value })} />
                </div>
                <Button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-[#17357e] to-blue-600 text-white">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
