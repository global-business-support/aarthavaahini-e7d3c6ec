// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { Header } from "@/components/site/Header";
// import { Footer } from "@/components/site/Footer";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/useAuth";

// import { Loader2, RefreshCw } from "lucide-react";

// export const Route = createFileRoute("/admin")({
//   head: () => ({ meta: [{ title: "Admin Panel — Aarthvaahini" }]}),
//   component: AdminPage,
// });

// type Lead = {
//   id: string; full_name: string; email: string | null; phone: string;
//   product_type: string; product_name: string | null; amount: number | null;
//   message: string | null; status: string; created_at: string;
// };

// function AdminPage() {
//   const { user, isAdmin, loading } = useAuth();
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [busy, setBusy] = useState(false);

//   const load = async () => {
//     setBusy(true);
//     const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
//     if (!error && data) setLeads(data as Lead[]);
//     setBusy(false);
//   };

//   useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

//   if (loading) return (
//     <div className="min-h-screen bg-background"><Header /><div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" /></div></div>
//   );

//   if (!user) return (
//     <div className="min-h-screen bg-background"><Header /><div className="container mx-auto px-6 py-80 text-center">
//       <h1 className="font-display text-3xl font-bold">Login required</h1>
//       <p className="mt-2 text-muted-foreground">Login to Access the Admin Panel.</p>
//       <Button asChild className="mt-6"><Link to="/login">Go to Login</Link></Button>
//     </div><Footer /></div>
//   );

//   if (!isAdmin) return (
//     <div className="min-h-screen bg-background"><Header /><div className="container mx-auto px-6 py-20 text-center">
//       <h1 className="font-display text-3xl font-bold">Access Denied</h1>
//       <p className="mt-2 text-muted-foreground">This page is accessible to admins only..</p>
//     </div><Footer /></div>
//   );

//   const counts = leads.reduce<Record<string, number>>((acc, l) => {
//     acc[l.product_type] = (acc[l.product_type] || 0) + 1; return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-6 py-12">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
//             <p className="text-sm text-muted-foreground">Manage All Customer Leads in One Place.</p>
//           </div>
//           <Button onClick={load} disabled={busy} variant="outline">
//             {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}Refresh
//           </Button>
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
//           {[["Total", leads.length], ["Loan", counts.loan || 0], ["Insurance", counts.insurance || 0],
//             ["Mutual Fund", counts.mutual_fund || 0], ["Banking", counts.banking || 0], ["Contact", (counts.contact || 0) + (counts.cibil || 0)],
//           ].map(([k, v]) => (
//             <Card key={k} className="p-4 text-center">
//               <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</p>
//               <p className="font-display text-2xl font-bold">{v}</p>
//             </Card>
//           ))}
//         </div>

//         <Card className="mt-6 overflow-x-auto p-0 shadow-soft">
//           <table className="w-full text-sm">
//             <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
//               <tr>
//                 <th className="px-4 py-3">Date</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Phone</th>
//                 <th className="px-4 py-3">Email</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Product</th>
//                 <th className="px-4 py-3">Amount</th><th className="px-4 py-3">Message</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">Abhi koi lead nahi hai.</td></tr>}
//               {leads.map((l) => (
//                 <tr key={l.id} className="border-t border-border/60 align-top">
//                   <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{new Date(l.created_at).toLocaleString("en-IN")}</td>
//                   <td className="px-4 py-3 font-medium">{l.full_name}</td>
//                   <td className="px-4 py-3">{l.phone}</td>
//                   <td className="px-4 py-3 text-muted-foreground">{l.email || "—"}</td>
//                   <td className="px-4 py-3"><Badge variant="secondary">{l.product_type}</Badge></td>
//                   <td className="px-4 py-3">{l.product_name || "—"}</td>
//                   <td className="px-4 py-3">{l.amount ? `₹ ${l.amount.toLocaleString("en-IN")}` : "—"}</td>
//                   <td className="px-4 py-3 max-w-xs text-muted-foreground">{l.message || "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Card>
//       </main>
//       <Footer />
//     </div>
//   );
// }
// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { Header } from "@/components/site/Header";
// import { Footer } from "@/components/site/Footer";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/useAuth";
// import { Loader2, RefreshCw } from "lucide-react";

// export const Route = createFileRoute("/admin")({
//   head: () => ({
//     meta: [{ title: "Admin Panel — Aarthvaahini" }],
//   }),
//   component: AdminPage,
// });

// type Lead = {
//   id: string;
//   name: string;
//   email: string | null;
//   phone: string;
//   loan_type?: string;
//   insurance_type?: string;
//   investment_type?: string;
//   amount?: number | null;
//   monthly_investment?: number | null;
//   message?: string | null;
//   status?: string;
//   created_at?: string;
// };

// function AdminPage() {
//   const { user, isAdmin, loading } = useAuth();

//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [busy, setBusy] = useState(false);

//   const load = async () => {
//     setBusy(true);

//     try {
//       const response = await fetch(
//         "http://192.168.29.1:8000/api/admin/leads"
//       );

//       const result = await response.json();

//       setLeads(result.data);

//     } catch (error) {
//       console.error("Failed to fetch leads", error);
//     }

//     setBusy(false);
//   };

//   useEffect(() => {
//     if (isAdmin) {
//       load();
//     }
//   }, [isAdmin]);

//   if (loading)
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="flex justify-center py-20">
//           <Loader2 className="h-6 w-6 animate-spin" />
//         </div>
//       </div>
//     );

//   if (!user)
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />

//         <div className="container mx-auto px-6 py-80 text-center">
//           <h1 className="font-display text-3xl font-bold">
//             Login required
//           </h1>

//           <p className="mt-2 text-muted-foreground">
//             Login to Access the Admin Panel.
//           </p>

//           <Button asChild className="mt-6">
//             <Link to="/login">Go to Login</Link>
//           </Button>
//         </div>

//         <Footer />
//       </div>
//     );

//   if (!isAdmin)
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />

//         <div className="container mx-auto px-6 py-20 text-center">
//           <h1 className="font-display text-3xl font-bold">
//             Access Denied
//           </h1>

//           <p className="mt-2 text-muted-foreground">
//             This page is accessible to admins only.
//           </p>
//         </div>

//         <Footer />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="container mx-auto px-6 py-12">

//         <div className="flex items-center justify-between">

//           <div>
//             <h1 className="font-display text-3xl font-bold">
//               Admin Panel
//             </h1>

//             <p className="text-sm text-muted-foreground">
//               Manage All Customer Leads in One Place.
//             </p>
//           </div>

//           <Button
//             onClick={load}
//             disabled={busy}
//             variant="outline"
//           >
//             {busy ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <RefreshCw className="mr-2 h-4 w-4" />
//             )}

//             Refresh
//           </Button>
//         </div>

//         <Card className="mt-6 overflow-x-auto p-0 shadow-soft">

//           <table className="w-full text-sm">

//             <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
//               <tr>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Phone</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Type</th>
//                 <th className="px-4 py-3">Amount</th>
//                 <th className="px-4 py-3">Message</th>
//               </tr>
//             </thead>

//             <tbody>

//               {leads.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="p-8 text-center text-muted-foreground"
//                   >
//                     Abhi koi lead nahi hai.
//                   </td>
//                 </tr>
//               )}

//               {leads.map((l) => (

//                 <tr
//                   key={l.id}
//                   className="border-t border-border/60 align-top"
//                 >

//                   <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
//                     {l.created_at
//                       ? new Date(l.created_at).toLocaleString("en-IN")
//                       : "—"}
//                   </td>

//                   <td className="px-4 py-3 font-medium">
//                     {l.name}
//                   </td>

//                   <td className="px-4 py-3">
//                     {l.phone}
//                   </td>

//                   <td className="px-4 py-3 text-muted-foreground">
//                     {l.email || "—"}
//                   </td>

//                   <td className="px-4 py-3">
//                     <Badge variant="secondary">
//                       {l.loan_type ||
//                         l.insurance_type ||
//                         l.investment_type ||
//                         "Lead"}
//                     </Badge>
//                   </td>

//                   <td className="px-4 py-3">
//                     {l.amount
//                       ? `₹ ${l.amount.toLocaleString("en-IN")}`
//                       : l.monthly_investment
//                       ? `₹ ${l.monthly_investment.toLocaleString("en-IN")}`
//                       : "—"}
//                   </td>

//                   <td className="px-4 py-3 max-w-xs text-muted-foreground">
//                     {l.message || "—"}
//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </Card>

//       </main>

//       <Footer />
//     </div>
//   );
// }
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import {
  Loader2,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
        title: "Admin Panel — Aarthvaahini",
      },
    ],
  }),

  component: AdminPage,
});

type Lead = {
  id: string;

  name: string;

  email: string | null;

  phone: string;

  loan_type?: string;

  insurance_type?: string;

  investment_type?: string;

  amount?: number | null;

  monthly_investment?: number | null;

  message?: string | null;

  status?: string;

  created_at?: string;
};

function AdminPage() {

  const { user, isAdmin, loading } = useAuth();

  const [leads, setLeads] = useState<Lead[]>([]);

  const [busy, setBusy] = useState(false);

  // LOAD LEADS

  const load = async () => {

    setBusy(true);

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/leads",
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("LEADS RESPONSE:", result);

      if (!response.ok) {

        console.error(result);

        setBusy(false);

        return;
      }

      setLeads(result.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch leads",
        error
      );
    }

    setBusy(false);
  };

  useEffect(() => {

    if (isAdmin) {

      load();
    }

  }, [isAdmin]);

  // LOADING

  if (loading)

    return (

      <div className="min-h-screen bg-background">

        <Header />

        <div className="flex justify-center py-40">

          <Loader2 className="h-8 w-8 animate-spin text-[#17357e]" />

        </div>

      </div>
    );

  // NOT LOGIN

  if (!user)

    return (

      <div className="min-h-screen bg-background">

        <Header />

        <div className="container mx-auto px-6 py-80 text-center">

          <h1 className="font-display text-4xl font-bold text-[#17357e]">

            Login Required

          </h1>

          <p className="mt-3 text-muted-foreground">

            Login to access the Aarthvaahini Admin Dashboard.

          </p>

          <Button
            asChild
            className="mt-8 bg-gradient-to-r from-[#17357e] to-blue-600 text-white"
          >

            <Link to="/login">

              Go to Login

            </Link>

          </Button>

        </div>

        <Footer />

      </div>
    );

  // NOT ADMIN

  if (!isAdmin)

    return (

      <div className="min-h-screen bg-background">

        <Header />

        <div className="container mx-auto px-6 py-80 text-center">

          <h1 className="font-display text-4xl font-bold text-red-600">

            Unauthorized Access

          </h1>

          <p className="mt-3 text-muted-foreground">

            You do not have permission to access this dashboard.

          </p>

        </div>

        <Footer />

      </div>
    );

  // MAIN PAGE

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto px-6 py-32">

        {/* TOP */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="bg-gradient-to-r from-[#17357e] to-blue-600 bg-clip-text font-display text-4xl font-bold text-transparent">

              Aarthvaahini Admin Dashboard

            </h1>

            <p className="mt-2 text-muted-foreground">

              Monitor and manage all customer enquiries from a single dashboard.

            </p>

          </div>

          {/* REFRESH BUTTON */}

          <Button
            onClick={load}
            disabled={busy}
            variant="outline"
            className="border-[#17357e] text-[#17357e]"
          >

            {busy ? (

              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            ) : (

              <RefreshCw className="mr-2 h-4 w-4" />

            )}

            Refresh

          </Button>

        </div>

        {/* TABLE */}

        <Card className="mt-8 overflow-x-auto rounded-3xl border border-border/60 p-0 shadow-soft">

          <table className="w-full text-sm">

            {/* HEAD */}

            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">

              <tr>

                <th className="px-5 py-4">
                  Date
                </th>

                <th className="px-5 py-4">
                  Name
                </th>

                <th className="px-5 py-4">
                  Phone
                </th>

                <th className="px-5 py-4">
                  Email
                </th>

                <th className="px-5 py-4">
                  Type
                </th>

                <th className="px-5 py-4">
                  Amount
                </th>

                <th className="px-5 py-4">
                  Message
                </th>

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {leads.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="p-10 text-center text-muted-foreground"
                  >

                    No customer leads available yet.

                  </td>

                </tr>
              )}

              {leads.map((l) => (

                <tr
                  key={l.id}
                  className="border-t border-border/60 align-top hover:bg-secondary/20"
                >

                  {/* DATE */}

                  <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">

                    {l.created_at
                      ? new Date(
                          l.created_at
                        ).toLocaleString("en-IN")
                      : "—"}

                  </td>

                  {/* NAME */}

                  <td className="px-5 py-4 font-semibold text-[#17357e]">

                    {l.name}

                  </td>

                  {/* PHONE */}

                  <td className="px-5 py-4">

                    {l.phone}

                  </td>

                  {/* EMAIL */}

                  <td className="px-5 py-4 text-muted-foreground">

                    {l.email || "—"}

                  </td>

                  {/* TYPE */}

                  <td className="px-5 py-4">

                    <Badge variant="secondary">

                      {l.loan_type ||
                        l.insurance_type ||
                        l.investment_type ||
                        "Lead"}

                    </Badge>

                  </td>

                  {/* AMOUNT */}

                  <td className="px-5 py-4">

                    {l.amount
                      ? `₹ ${l.amount.toLocaleString("en-IN")}`
                      : l.monthly_investment
                      ? `₹ ${l.monthly_investment.toLocaleString("en-IN")}`
                      : "—"}

                  </td>

                  {/* MESSAGE */}

                  <td className="max-w-xs px-5 py-4 text-muted-foreground">

                    {l.message || "—"}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </Card>

      </main>

      <Footer />

    </div>
  );
}