// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { LeadForm } from "./LeadForm";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import {
//   Banknote,
//   ShieldPlus,
//   LineChart,
//   ArrowRight,
//   Landmark,
//   FileCheck2,
//   Percent,
//   CheckCircle2,
// } from "lucide-react";

// const bankingFeatures = [
//   {
//     icon: Landmark,
//     title: "40+ bank partners",
//     desc: "Home, business and personal loan options in one place.",
//     bg: "bg-[#E3F2FD]",
//     color: "text-[#1565C0]",
//   },
//   {
//     icon: Percent,
//     title: "Low interest offers",
//     desc: "Compare rates and eligibility before you apply.",
//     bg: "bg-[#FFF4E5]",
//     color: "text-[#E65100]",
//   },
//   {
//     icon: ShieldPlus,
//     title: "Insurance protection",
//     desc: "Health, life, term and motor plans for every family.",
//     bg: "bg-[#FCE4EC]",
//     color: "text-[#AD1457]",
//   },
//   {
//     icon: FileCheck2,
//     title: "Fast processing",
//     desc: "Guided documentation with advisor support.",
//     bg: "bg-[#E8F5E9]",
//     color: "text-[#2E7D32]",
//   },
// ];

// const products = [
//   {
//     icon: Banknote,
//     name: "Easy & Fast Loan Solutions",
//     title: (
//       <>
//         Easy & Fast
//         <span className="text-gradient"> Loan Solutions</span>
//       </>
//     ),
//     desc: "Get instant access to Home Loans, Personal Loans, Business Loans, and Loan Against Property with low interest rates, flexible EMI options, quick approvals, and trusted banking partners across India.",
//     items: ["Home Loan", "Personal Loan","Business Loan","Car / Vehicle Loan", "Education Loan", "Gold Loan","Loan Against Property (Mortgage Loan)","Cash Credit (CC) & Overdraft (OD)",]
//   },
//   {
//     icon: ShieldPlus,
//     name: "Complete Financial Insurance Protection",
//      title: (
//       <>
//         Complete Financial
//         <span className="text-gradient"> Insurance Protection</span>
//       </>
//     ),
//     desc:"Protect your family, health, vehicle, and future with comprehensive Health Insurance, Life Insurance, Term Plans, and Motor Insurance from India's most trusted insurance providers.",
//     items: ["Life Insurance", "Term Insurance", "Health Insurance / Mediclaim", "Motor Insurance","Business Insurance","Travel Insurance"],
//   },
//   {
//     icon: LineChart,
//     name: "Smart Wealth Creation Through Mutual Funds",
//       title: (
//       <>
//         Smart Wealth Creation
//         <span className="text-gradient"> Through Mutual Funds</span>
//       </>
//     ),
//     desc:"Build long-term wealth with SIP investments, ELSS tax-saving funds, equity funds, debt funds, and expert-guided mutual fund solutions tailored to your financial goals and future security.",
//     items: ["SIP Investment", " Mutual Funds", "Tax Saving Investment","Wealth Management Services"],
//   },
// ];

// export function Products() {
//   return (
//     <section
//       id="products"
//       className="container mx-auto scroll-mt-24 px-6 py-24"
//     >
//       {/* TOP FEATURES */}

//       <div className="grid gap-4 rounded-4xl border-border/70 bg-card/75 p-4 shadow-soft backdrop-blur md:grid-cols-4 md:p-5">
//         {bankingFeatures.map(
//           ({ icon: Icon, title, desc, bg, color }) => (
//             <div key={title} className={`rounded-2xl ${bg} p-5`}>
//               <Icon className={`h-6 w-6 ${color}`} />

//               <h3
//                 className={`mt-4 font-display text-lg font-bold ${color}`}
//               >
//                 {title}
//               </h3>

//               <p className="mt-2 text-sm text-foreground/70">
//                 {desc}
//               </p>
//             </div>
//           )
//         )}
//       </div>

//       {/* HEADING */}

//       <div className="mx-auto mt-20 max-w-2xl text-center">
//         <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">
//           Our Products
//         </span>

//         <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
//           Banking, loans and protection,
//           <span className="text-gradient">
//             {" "}
//             in one place
//           </span>
//         </h2>

//         <p className="mt-4 text-muted-foreground">
//           Aarthvaahini Financial Services Pvt. Ltd. is a trusted financial solutions company offering loans, insurance, mutual funds, and investment services designed to support individuals, families, and businesses.
//         </p>
//       </div>

//       {/* PRODUCT CARDS */}

//       <div className="mt-14 grid gap-6 md:grid-cols-3">
//         {products.map(({ icon: Icon, name, title, desc, items }) => (
//           <Card
//             key={name}
//             className="group relative overflow-hidden border/60 bg-gradient-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
//           >
//             <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-primary opacity-10 blur-2xl transition-smooth group-hover:opacity-25" />

//             <div className="relative">
//               {/* ICON */}

//               <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
//                 <Icon className="h-7 w-7" />
//               </div>

//               {/* TITLE */}

//               <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
//                 {title}
//               </h3>

//               {/* DESCRIPTION */}

//               <p className="mt-2 text-sm text-muted-foreground">
//                 {desc}
//               </p>

//               {/* FEATURES */}

//               <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-foreground/80">
//                 {items.map((i) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-2"
//                   >
//                     <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />

//                     {i}
//                   </li>
//                 ))}
//               </ul>

//               {/* DIALOG */}

//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="mt-6 px-0 text-primary hover:bg-transparent hover:text-primary-glow"
//                   >
//                     View Features

//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </DialogTrigger>

//                 <DialogContent className="max-w-2xl overflow-hidden rounded-[30px] border-0 p-0">
//                   {/* TOP */}

//                   <div className="bg-linear-to-r from-[#17357e] to-[#51639ad6] p-8 text-white">
//                     <h2 className="text-3xl font-bold">
//                       {title}
//                     </h2>

//                     <p className="mt-3 text-white/80">
//                       {desc}
//                     </p>
//                   </div>

//                   {/* CONTENT */}

//                   <div className="p-8">
//                     <h3 className="mb-5 text-xl font-semibold text-[#17357e]">
//                       Features Included
//                     </h3>

//                     <ul className="space-y-4">
//                       {items.map((feature) => (
//                         <li
//                           key={feature}
//                           className="flex items-start gap-3 rounded-xl border border-gray-100 p-4"
//                         >
//                           <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />

//                           <span className="text-gray-700">
//                             {feature}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   {/* BUTTONS */}

// <div className="mt-8 flex gap-4">

//   {/* APPLY NOW */}

//   <Dialog>
//     <DialogTrigger asChild>
//       <Button className="flex-1 rounded-xl bg-linear-to-r from-[#17357e] to-[#51639ad6] py-6 text-white">
//         Apply Now
//       </Button>
//     </DialogTrigger>

//     <DialogContent className="max-w-lg">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-[#17357e]">
//           Apply For {title}
//         </h2>

//         <p className="mt-2 text-gray-500">
//           Fill your details and our advisor will contact you.
//         </p>

//         <div className="mt-6">
//           <LeadForm
//             productType="loan"
//             productName={name}
//             showAmount
//             showMessage
//           />
//         </div>
//       </div>
//     </DialogContent>

//   </Dialog>

//   {/* TALK TO ADVISOR */}

//   <Button
//     variant="outline"
//     className="flex-1 rounded-xl border-[#17357e] py-6 text-[#17357e]"
//     onClick={() => alert("Advisor will contact you soon")}
//   >
//     Talk To Advisor
//   </Button>

// </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Banknote,
  ShieldPlus,
  LineChart,
  ArrowRight,
  Landmark,
  FileCheck2,
  Percent,
  CheckCircle2,
} from "lucide-react";

const bankingFeatures = [
  {
    icon: Landmark,
    title: "40+ bank partners",
    desc: "Home, business and personal loan options in one place.",
    bg: "bg-[#E3F2FD]",
    color: "text-[#1565C0]",
  },
  {
    icon: Percent,
    title: "Low interest offers",
    desc: "Compare rates and eligibility before you apply.",
    bg: "bg-[#FFF4E5]",
    color: "text-[#E65100]",
  },
  {
    icon: ShieldPlus,
    title: "Insurance protection",
    desc: "Health, life, term and motor plans for every family.",
    bg: "bg-[#FCE4EC]",
    color: "text-[#AD1457]",
  },
  {
    icon: FileCheck2,
    title: "Fast processing",
    desc: "Guided documentation with advisor support.",
    bg: "bg-[#E8F5E9]",
    color: "text-[#2E7D32]",
  },
];

const products = [
  {
    icon: Banknote,
    name: "Easy & Fast Loan Solutions",
    title: (
      <>
        Easy & Fast
        <span className="text-gradient">
          {" "}Loan Solutions
        </span>
      </>
    ),
    desc:
      "Get instant access to Home Loans, Personal Loans, Business Loans, and Loan Against Property with low interest rates and quick approvals.",

    items: [
      "Home Loan",
      "Personal Loan",
      "Business Loan",
      "Car / Vehicle Loan",
      "Education Loan",
      "Gold Loan",
      "Loan Against Property",
      "Cash Credit & Overdraft",
    ],
  },

  {
    icon: ShieldPlus,
    name: "Complete Financial Insurance Protection",

    title: (
      <>
        Complete Financial
        <span className="text-gradient">
          {" "}Insurance Protection
        </span>
      </>
    ),

    desc:
      "Protect your family, health, vehicle, and future with comprehensive insurance solutions.",

    items: [
      "Life Insurance",
      "Term Insurance",
      "Health Insurance",
      "Motor Insurance",
      "Business Insurance",
      "Travel Insurance",
    ],
  },

  {
    icon: LineChart,
    name: "Smart Wealth Creation Through Mutual Funds",

    title: (
      <>
        Smart Wealth Creation
        <span className="text-gradient">
          {" "}Through Mutual Funds
        </span>
      </>
    ),

    desc:
      "Build long-term wealth with SIP investments and expert-guided mutual fund solutions.",

    items: [
      "SIP Investment",
      "Mutual Funds",
      "Tax Saving Investment",
      "Wealth Management",
    ],
  },
];

export function Products() {

  return (

    <section
      id="products"
      className="container mx-auto scroll-mt-24 px-6 py-24"
    >

      {/* TOP FEATURES */}

      <div className="grid gap-4 rounded-4xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-4 md:p-5">

        {bankingFeatures.map(
          ({ icon: Icon, title, desc, bg, color }) => (

            <div
              key={title}
              className={`rounded-2xl ${bg} p-5`}
            >

              <Icon className={`h-6 w-6 ${color}`} />

              <h3
                className={`mt-4 text-lg font-bold ${color}`}
              >
                {title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {desc}
              </p>

            </div>
          )
        )}

      </div>

      {/* HEADING */}

      <div className="mx-auto mt-20 max-w-2xl text-center">

        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Our Products
        </span>

        <h2 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">

          Banking, loans and protection,

          <span className="text-blue-600">
            {" "}in one place
          </span>

        </h2>

        <p className="mt-4 text-gray-500">
          Aarthvaahini Financial Services Pvt. Ltd. offers loans,
          insurance, mutual funds, and investment solutions for
          individuals and businesses.
        </p>

      </div>

      {/* PRODUCT CARDS */}

      <div className="mt-14 grid gap-6 md:grid-cols-3">

        {products.map(
          ({
            icon: Icon,
            name,
            title,
            desc,
            items,
          }) => (

            <Card
              key={name}
              className="glow-border group relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* GLOW */}

              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

              <div className="relative">

                {/* ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 text-white shadow-lg">

                  <Icon className="h-7 w-7" />

                </div>

                {/* TITLE */}

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {title}
                </h3>

                {/* DESC */}

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {desc}
                </p>

                {/* FEATURES */}

                <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-700">

                  {items.map((i) => (

                    <li
                      key={i}
                      className="flex items-center gap-2"
                    >

                      <span className="h-2 w-2 rounded-full bg-blue-600" />

                      {i}

                    </li>
                  ))}

                </ul>

                {/* VIEW FEATURES */}

                <Dialog>

                  <DialogTrigger asChild>

                    <Button
                      variant="ghost"
                      className="mt-6 px-0 text-blue-700 hover:bg-transparent hover:text-blue-500"
                    >

                      View Features

                      <ArrowRight className="ml-2 h-4 w-4" />

                    </Button>

                  </DialogTrigger>

                  {/* POPUP */}

                  <DialogContent className="max-w-2xl overflow-hidden rounded-[32px] border-0 p-0 shadow-2xl">

                    {/* TOP */}

                    <div className="bg-gradient-to-r from-[#17357e] to-blue-600 p-8 text-white">

                      <h2 className="text-3xl font-bold">
                        {title}
                      </h2>

                      <p className="mt-3 text-white/80">
                        {desc}
                      </p>

                    </div>

                    {/* CONTENT */}

                    <div className="bg-white p-8">

                      <h3 className="mb-5 text-2xl font-bold text-[#17357e]">

                        Features Included

                      </h3>

                      <ul className="space-y-4">

                        {items.map((feature) => (

                          <li
                            key={feature}
                            className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                          >

                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />

                            <span className="text-gray-700">
                              {feature}
                            </span>

                          </li>
                        ))}

                      </ul>

                      {/* BOTTOM INFO */}

                      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#17357e]/5 to-blue-50 p-5">

                        <div className="flex items-start gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17357e] text-white">

                            <CheckCircle2 className="h-5 w-5" />

                          </div>

                          <div>

                            <h4 className="text-lg font-semibold text-[#17357e]">

                              Trusted Financial Solutions

                            </h4>

                            <p className="mt-1 text-sm leading-6 text-gray-600">

                              Aarthvaahini provides fast approvals,
                              secure documentation, expert financial
                              guidance, and trusted partner support
                              for all your banking, insurance, and
                              investment needs.

                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </DialogContent>

                </Dialog>

              </div>

            </Card>
          )
        )}

      </div>

    </section>
  );
}