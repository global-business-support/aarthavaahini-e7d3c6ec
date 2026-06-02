// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { Header } from "@/components/site/Header";
// import { Footer } from "@/components/site/Footer";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// export const Route = createFileRoute("/login")({
//   head: () => ({ meta: [{ title: "Login / Register — Aarthvaahini" }]}),
//   component: LoginPage,
// });

// function LoginPage() {
//   const nav = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [li, setLi] = useState({ email: "", password: "" });
//   const [su, setSu] = useState({ name: "", phone: "", email: "", password: "" });

//   const signIn = async (e: React.FormEvent) => {
//     e.preventDefault(); setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({ email: li.email, password: li.password });
//     setLoading(false);
//     if (error) return toast.error(error.message);
//     toast.success("Welcome back!");
//     nav({ to: "/" });
//   };

//   const signUp = async (e: React.FormEvent) => {
//     e.preventDefault(); setLoading(true);
//     const { error } = await supabase.auth.signUp({
//       email: su.email, password: su.password,
//       options: {
//         emailRedirectTo: `${window.location.origin}/`,
//         data: { full_name: su.name, phone: su.phone },
//       },
//     });
//     setLoading(false);
//     if (error) return toast.error(error.message);
//     toast.success("Please check your email inbox to verify your account.");
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto flex flex-1 items-center justify-center px-6 py-16">
//         <Card className="w-full max-w-md p-7 shadow-elegant">
//         <h1 className="bg-gradient-to-r from-[#17357e] to-blue-600 bg-clip-text text-center font-display text-3xl font-bold text-transparent">
//   Aarthvaahini Admin Portal
// </h1>
//           <p className="mt-1 text-center text-sm text-muted-foreground">Login or Create a New Account.</p>
//           <Tabs defaultValue="login" className="mt-6">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="register">Register</TabsTrigger>
//             </TabsList>
//             <TabsContent value="login">
//               <form onSubmit={signIn} className="mt-4 space-y-3">
//                 <div><Label>Email</Label><Input type="email" required className="mt-1.5 h-11" value={li.email} onChange={(e) => setLi({ ...li, email: e.target.value })} /></div>
//                 <div><Label>Password</Label><Input type="password" required className="mt-1.5 h-11" value={li.password} onChange={(e) => setLi({ ...li, password: e.target.value })} /></div>
//                 <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
//                   {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Login
//                 </Button>
//               </form>
//             </TabsContent>
//             <TabsContent value="register">
//               <form onSubmit={signUp} className="mt-4 space-y-3">
//                 <div><Label>Full Name</Label><Input required className="mt-1.5 h-11" value={su.name} onChange={(e) => setSu({ ...su, name: e.target.value })} /></div>
//                 <div><Label>Mobile</Label><Input required className="mt-1.5 h-11" value={su.phone} onChange={(e) => setSu({ ...su, phone: e.target.value })} /></div>
//                 <div><Label>Email</Label><Input type="email" required className="mt-1.5 h-11" value={su.email} onChange={(e) => setSu({ ...su, email: e.target.value })} /></div>
//                 <div><Label>Password</Label><Input type="password" required minLength={6} className="mt-1.5 h-11" value={su.password} onChange={(e) => setSu({ ...su, password: e.target.value })} /></div>
//                 <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
//                   {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Account
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </Card>
//       </main>
//       <Footer />
//     </div>
//   );
// }
// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { Header } from "@/components/site/Header";
// import { Footer } from "@/components/site/Footer";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// export const Route = createFileRoute("/login")({
//   head: () => ({
//     meta: [{ title: "Login / Register — Aarthvaahini" }],
//   }),
//   component: LoginPage,
// });

// function LoginPage() {

//   const nav = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const [li, setLi] = useState({
//     email: "",
//     password: "",
//   });

//   const [su, setSu] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   // LOGIN
//   const signIn = async (e: React.FormEvent) => {

//     e.preventDefault();

//     setLoading(true);

//     try {

//       const response = await fetch(
//         "http://192.168.29.1:8000/api/auth/login",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({
//             email: li.email,
//             password: li.password,
//           }),
//         }
//       );

//       const result = await response.json();

//       if (!result.success) {

//         toast.error(result.message);

//         setLoading(false);

//         return;
//       }

//       localStorage.setItem(
//         "token",
//         result.access_token
//       );
//       localStorage.setItem(
//   "email",
//   li.email
// );
//       toast.success("Welcome back!");

//       nav({ to: "/" });

//     } catch (error) {

//       toast.error("Login failed");
//     }

//     setLoading(false);
//   };


//   // REGISTER
//   const signUp = async (e: React.FormEvent) => {

//     e.preventDefault();

//     setLoading(true);

//     try {

//       const response = await fetch(
//         "http://192.168.29.1:8000/api/auth/register",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({
//             name: su.name,
//             phone: su.phone,
//             email: su.email,
//             password: su.password,
//           }),
//         }
//       );

//       const result = await response.json();

//       if (!result.success) {

//         toast.error(result.message);

//         setLoading(false);

//         return;
//       }

//       toast.success("Account created successfully!");

//     } catch (error) {

//       toast.error("Registration failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-background">

//       <Header />

//       <main className="container mx-auto flex flex-1 items-center justify-center px-6 py-16">

//         <Card className="w-full max-w-md p-7 shadow-elegant">

//           <h1 className="bg-linear-to-r from-[#17357e] to-blue-600 bg-clip-text text-center font-display text-3xl font-bold text-transparent">
//             Aarthvaahini Admin Portal
//           </h1>

//           <p className="mt-1 text-center text-sm text-muted-foreground">
//             Login or Create a New Account.
//           </p>

//           <Tabs defaultValue="login" className="mt-6">

//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="login">
//                 Login
//               </TabsTrigger>

//               <TabsTrigger value="register">
//                 Register
//               </TabsTrigger>
//             </TabsList>

//             {/* LOGIN TAB */}
//             <TabsContent value="login">

//               <form
//                 onSubmit={signIn}
//                 className="mt-4 space-y-3"
//               >

//                 <div>
//                   <Label>Email</Label>

//                   <Input
//                     type="email"
//                     required
//                     className="mt-1.5 h-11"
//                     value={li.email}
//                     onChange={(e) =>
//                       setLi({
//                         ...li,
//                         email: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Password</Label>

//                   <Input
//                     type="password"
//                     required
//                     className="mt-1.5 h-11"
//                     value={li.password}
//                     onChange={(e) =>
//                       setLi({
//                         ...li,
//                         password: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-gradient-primary text-primary-foreground"
//                 >
//                   {loading && (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   )}

//                   Login
//                 </Button>

//               </form>

//             </TabsContent>


//             {/* REGISTER TAB */}
//             <TabsContent value="register">

//               <form
//                 onSubmit={signUp}
//                 className="mt-4 space-y-3"
//               >

//                 <div>
//                   <Label>Full Name</Label>

//                   <Input
//                     required
//                     className="mt-1.5 h-11"
//                     value={su.name}
//                     onChange={(e) =>
//                       setSu({
//                         ...su,
//                         name: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Mobile</Label>

//                   <Input
//                     required
//                     className="mt-1.5 h-11"
//                     value={su.phone}
//                     onChange={(e) =>
//                       setSu({
//                         ...su,
//                         phone: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Email</Label>

//                   <Input
//                     type="email"
//                     required
//                     className="mt-1.5 h-11"
//                     value={su.email}
//                     onChange={(e) =>
//                       setSu({
//                         ...su,
//                         email: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Password</Label>

//                   <Input
//                     type="password"
//                     required
//                     minLength={6}
//                     className="mt-1.5 h-11"
//                     value={su.password}
//                     onChange={(e) =>
//                       setSu({
//                         ...su,
//                         password: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-gradient-primary text-primary-foreground"
//                 >
//                   {loading && (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   )}

//                   Create Account
//                 </Button>

//               </form>

//             </TabsContent>

//           </Tabs>

//         </Card>

//       </main>

//       <Footer />

//     </div>
//   );
// }
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Login / Register — Aarthvaahini",
      },
    ],
  }),

  component: LoginPage,
});

function LoginPage() {

  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const [li, setLi] = useState({
    email: "",
    password: "",
  });

  const [su, setSu] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // LOGIN FUNCTION

  const signIn = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: li.email,
            password: li.password,
          }),
        }
      );

      const result = await response.json();

      console.log("LOGIN RESPONSE:", result);

      if (!response.ok) {
        toast.error(result.message || "Login failed");
        setLoading(false);
        return;
      }

      const token = result.access_token || result.token;
      const userInfo = result.user ?? result.data?.user ?? result.data ?? null;
      const email = userInfo?.email ?? li.email;
      const role = userInfo?.role ?? result.role ?? "user";

      if (token) {
        localStorage.setItem("token", token);
      }
      if (email) {
        localStorage.setItem("email", email);
      }
      if (role) {
        localStorage.setItem("role", role);
      }

      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful!");

      if (role === "admin") {
        nav({ to: "/admin" });
      } else {
        nav({ to: "/dashboard" });
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Server connection failed"
      );
    }

    setLoading(false);
  };

  // REGISTER FUNCTION

  const signUp = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: su.name,
            phone: su.phone,
            email: su.email,
            password: su.password,
          }),
        }
      );

      const result = await response.json();

      console.log("REGISTER RESPONSE:", result);

      if (!response.ok) {

        toast.error(
          result.message || "Registration failed"
        );

        setLoading(false);

        return;
      }

      toast.success(
        "Account created successfully!"
      );

      // RESET FORM

      setSu({
        name: "",
        phone: "",
        email: "",
        password: "",
      });

    } catch (error) {

      console.error(error);

      toast.error(
        "Server connection failed"
      );
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto flex min-h-screen items-center justify-center px-6 py-20">

        <Card className="w-full max-w-md rounded-3xl p-8 shadow-elegant">

          {/* HEADING */}

          <h1 className="bg-gradient-to-r from-[#17357e] to-blue-600 bg-clip-text text-center font-display text-3xl font-bold text-transparent">

            Aarthvaahini Admin Portal

          </h1>

          <p className="mt-2 text-center text-sm text-muted-foreground">

            Login or Create a New Account

          </p>

          {/* TABS */}

          <Tabs
            defaultValue="login"
            className="mt-6"
          >

            <TabsList className="grid w-full grid-cols-2">

              <TabsTrigger value="login">
                Login
              </TabsTrigger>

              <TabsTrigger value="register">
                Register
              </TabsTrigger>

            </TabsList>

            {/* LOGIN TAB */}

            <TabsContent value="login">

              <form
                onSubmit={signIn}
                className="mt-5 space-y-4"
              >

                {/* EMAIL */}

                <div>

                  <Label>Email</Label>

                  <Input
                    type="email"
                    required
                    className="mt-1.5 h-11"
                    value={li.email}
                    onChange={(e) =>
                      setLi({
                        ...li,
                        email: e.target.value,
                      })
                    }
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <Label>Password</Label>

                  <Input
                    type="password"
                    required
                    className="mt-1.5 h-11"
                    value={li.password}
                    onChange={(e) =>
                      setLi({
                        ...li,
                        password: e.target.value,
                      })
                    }
                  />

                </div>

                {/* BUTTON */}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#17357e] to-blue-600 text-white"
                >

                  {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  Login

                </Button>

              </form>

            </TabsContent>

            {/* REGISTER TAB */}

            <TabsContent value="register">

              <form
                onSubmit={signUp}
                className="mt-5 space-y-4"
              >

                {/* NAME */}

                <div>

                  <Label>Full Name</Label>

                  <Input
                    required
                    className="mt-1.5 h-11"
                    value={su.name}
                    onChange={(e) =>
                      setSu({
                        ...su,
                        name: e.target.value,
                      })
                    }
                  />

                </div>

                {/* PHONE */}

                <div>

                  <Label>Mobile Number</Label>

                  <Input
                    required
                    className="mt-1.5 h-11"
                    value={su.phone}
                    onChange={(e) =>
                      setSu({
                        ...su,
                        phone: e.target.value,
                      })
                    }
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <Label>Email</Label>

                  <Input
                    type="email"
                    required
                    className="mt-1.5 h-11"
                    value={su.email}
                    onChange={(e) =>
                      setSu({
                        ...su,
                        email: e.target.value,
                      })
                    }
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <Label>Password</Label>

                  <Input
                    type="password"
                    required
                    minLength={6}
                    className="mt-1.5 h-11"
                    value={su.password}
                    onChange={(e) =>
                      setSu({
                        ...su,
                        password: e.target.value,
                      })
                    }
                  />

                </div>

                {/* BUTTON */}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#17357e] to-blue-600 text-white"
                >

                  {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  Create Account

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