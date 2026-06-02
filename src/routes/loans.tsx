import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductPage } from "@/components/site/ProductPage";
import { loans } from "@/data/products";
export const Route = createFileRoute("/loans")({
  head: () => ({ meta: [
    { title: "Loans — Home, Personal, Business, LAP | Aarthvaahini" },
    { name: "description", content: "Apply for home, personal, business, car, education and gold loans from 40+ banks at lowest rates." },
  ]}),
  component: () => (
    <div className="min-h-screen bg-background"
    style={{backgroundColor: "#d5def3"}}
    >
      <Header />
      <main><ProductPage title="Loans" subtitle="Best loan offers from 40+ banks with approval within 24 hours."
        items={loans} productType="loan" accentClass="text-[#183c93]" /></main>
      <Footer />
    </div>
  ),
});
// import { createFileRoute } from "@tanstack/react-router";

// import { Header } from "@/components/site/Header";
// import { Footer } from "@/components/site/Footer";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import {
//   Landmark,
//   Briefcase,
//   Home,
//   Car,
//   GraduationCap,
//   ArrowRight,
// } from "lucide-react";

// export const Route = createFileRoute("/loans")({
//   component: LoansPage,
// });

// function LoansPage() {

//   const loans = [
//     {
//       title: "Home Loan",
//       description:
//         "Get affordable home loans with low interest rates and quick approval.",
//       icon: Home,
//       color: "from-blue-600 to-indigo-600",
//       url: "http://192.168.29.1:8000/contact",
//     },

//     {
//       title: "Personal Loan",
//       description:
//         "Instant personal loans for travel, medical, wedding, and more.",
//       icon: Landmark,
//       color: "from-orange-500 to-red-500",
//       url: "http://192.168.29.1:8000/contact",
//     },

//     {
//       title: "Business Loan",
//       description:
//         "Expand your business with flexible funding solutions.",
//       icon: Briefcase,
//       color: "from-green-500 to-emerald-600",
//       url: "http://192.168.29.1:8000/contact",
//     },

//     {
//       title: "Car Loan",
//       description:
//         "Drive your dream car with easy financing.",
//       icon: Car,
//       color: "from-pink-500 to-rose-500",
//       url: "http://192.168.29.64:8000/contact",
//     },

//     {
//       title: "Education Loan",
//       description:
//         "Finance your higher education with trusted support.",
//       icon: GraduationCap,
//       color: "from-purple-500 to-violet-600",
//       url: "http://192.168.29.64:8000/contact",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">

//       <Header />

//       <main className="container mx-auto px-6 py-28">

//         {/* HERO */}

//         <div className="mx-auto max-w-3xl text-center">

//           <h1 className="bg-linear-to-r from-[#17357e] to-blue-600 bg-clip-text text-5xl font-bold text-transparent">

//             Loan Solutions For Every Need

//           </h1>

//           <p className="mt-5 text-lg text-muted-foreground">

//             Home loans, personal loans, business funding,
//             car loans, and education loans with fast approval.

//           </p>

//         </div>

//         {/* LOAN GRID */}

//         <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

//           {loans.map((loan, index) => {

//             const Icon = loan.icon;

//             return (

//               <Card
//                 key={index}
//                 className="group rounded-3xl border border-border/50 p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant"
//               >

//                 {/* ICON */}

//                 <div
//                   className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${loan.color} text-white`}
//                 >

//                   <Icon className="h-8 w-8" />

//                 </div>

//                 {/* TITLE */}

//                 <h2 className="mt-6 text-2xl font-bold text-[#17357e]">

//                   {loan.title}

//                 </h2>

//                 {/* DESCRIPTION */}

//                 <p className="mt-4 leading-7 text-muted-foreground">

//                   {loan.description}

//                 </p>

//                 {/* BUTTON */}

//                 <a
//                   href={loan.url}
//                   target="_blank"
//                   className="mt-7 inline-flex"
//                 >

//                   <Button className="rounded-xl bg-linear-to-r from-[#17357e] to-blue-600 text-white">

//                     Apply Now

//                     <ArrowRight className="ml-2 h-4 w-4" />

//                   </Button>

//                 </a>

//               </Card>

//             );
//           })}

//         </div>

//       </main>

//       <Footer />

//     </div>
//   );
// }
