 
// import { Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { LeadForm } from "./LeadForm";
// import {
//   ChevronDown,
//   Menu,
//   X,
//   LogIn,
//   Landmark,
//   ShieldCheck,
//   TrendingUp,
//   Calculator,
//   Wallet,
//   Home,
//   Briefcase,
//   MessageSquare,
//   Phone,
//   Play,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import logo from "@/assets/logo.png";
// import headingLogo from "@/assets/heading-logo.png";

// export function Header() {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showBottomNav, setShowBottomNav] = useState(true);
// const [showHeader, setShowHeader] = useState(true);
// const [lastScrollY, setLastScrollY] = useState(0);

// useEffect(() => {
//   const handleScroll = () => {
//     if (window.scrollY > lastScrollY && window.scrollY > 100) {
//       setShowHeader(false); // hide top header
//     } else {
//       setShowHeader(true); // show top header
//     }

//     setLastScrollY(window.scrollY);
//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, [lastScrollY]);

//   return (
//     <>
//       {/* TOP HEADER */}

//      <header
//   className={`fixed top-0 z-50 w-full border-b border-white/20 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-500 ${
//     showHeader
//       ? "translate-y-0 opacity-100"
//       : "-translate-y-full opacity-0"
//   }`}
// >

//         <div className="container mx-auto flex h-20 items-center justify-between px-6">

//           {/* LOGO */}

//           <Link to="/" className="flex items-center gap-0">

//             <div className="flex h-14 overflow-hidden rounded-2xl ">
//               <img
//                 src={logo}
//                 alt="Aarthvaahini"
//                 className="h-full w-full object-cover"
//               />
//             </div>

//            <img
//   src={headingLogo}
//   alt="Aarthvaahini"
//   className="hidden h-10 w-auto object-contain sm:block mt-3"
// />

//           </Link>

//           {/* DESKTOP MENU */}

//           <nav className="hidden items-center gap-3 lg:flex">

//             {/* LOANS */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50">
//                 Loans
//                 <ChevronDown className="h-4 w-4" />
//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   <Link
//                     to="/personal-loan"
//                     className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-blue-50"
//                   >
//                     <Wallet className="mt-1 h-5 w-5 text-blue-700" />

//                     <div>
//                       <h3 className="font-semibold text-[#17357e]">
//                         Personal Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Instant approvals & low EMI
//                       </p>
//                     </div>
//                   </Link>

//                   <Link
//                     to="/business-loan"
//                     className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-blue-50"
//                   >
//                     <TrendingUp className="mt-1 h-5 w-5 text-green-700" />

//                     <div>
//                       <h3 className="font-semibold text-[#17357e]">
//                         Business Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         MSME & startup funding
//                       </p>
//                     </div>
//                   </Link>

//                   <Link
//                     to="/home-loan"
//                     className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-blue-50"
//                   >
//                     <Landmark className="mt-1 h-5 w-5 text-orange-700" />

//                     <div>
//                       <h3 className="font-semibold text-[#17357e]">
//                         Home Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Affordable EMI plans
//                       </p>
//                     </div>
//                   </Link>

//                 </div>

//               </div>

//             </div>

//             {/* INSURANCE */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50">
//                 Insurance
//                 <ChevronDown className="h-4 w-4" />
//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   <Link
//                     to="/life-insurance"
//                     className="block rounded-2xl p-4 transition hover:bg-pink-50"
//                   >
//                     <h3 className="font-semibold text-[#17357e]">
//                       Life Insurance
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Secure your family future
//                     </p>
//                   </Link>

//                   <Link
//                     to="/health-insurance"
//                     className="block rounded-2xl p-4 transition hover:bg-green-50"
//                   >
//                     <h3 className="font-semibold text-[#17357e]">
//                       Health Insurance
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Cashless hospitalization
//                     </p>
//                   </Link>

//                   <Link
//                     to="/car-insurance"
//                     className="block rounded-2xl p-4 transition hover:bg-orange-50"
//                   >
//                     <h3 className="font-semibold text-[#17357e]">
//                       Car Insurance
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Protect your vehicle
//                     </p>
//                   </Link>

//                 </div>

//               </div>

//             </div>

//             {/* MUTUAL FUNDS */}

//             <Link
//               to="/mutual-funds"
//               className="rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50"
//             >
//               Mutual Funds
//             </Link>

//             {/* CALCULATORS */}

//             <Link
//               to="/calculator"
//               className="flex items-center gap-2 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50"
//             >
//               <Calculator className="h-4 w-4" />
//               Calculators
//             </Link>

//           </nav>

//           {/* RIGHT BUTTONS */}

//           <div className="hidden items-center gap-3 lg:flex">

//             <Link to="/admin-login">

//               <Button
//                 variant="outline"
//                 className="rounded-full border-blue-200 px-6 text-[#17357e] hover:bg-blue-50"
//               >
//                 <LogIn className="mr-2 h-4 w-4" />
//                 Admin Login
//               </Button>

//             </Link>
//           <div className="group relative">

//   {/* APPLY BUTTON */}

//   <button className="rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 px-7 py-3 text-white shadow-lg transition-all hover:scale-105 flex items-center gap-2">
//     Apply Now
//     <ChevronDown className="h-4 w-4" />
//   </button>

//   {/* DROPDOWN */}

//   <div className="invisible absolute right-0 top-16 z-50 w-72 rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//     <div className="space-y-3">

//       {/* LOAN FORM */}

//       <Dialog>

//         <DialogTrigger asChild>

//           <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-blue-50">

//             <h3 className="font-semibold text-[#17357e]">
//               Loan Application
//             </h3>

//             <p className="text-sm text-gray-500">
//               Apply for personal, home & business loans
//             </p>

//           </button>

//         </DialogTrigger>

//         <DialogContent className="max-w-lg rounded-3xl">

//           <DialogHeader>

//             <DialogTitle>
//               Apply for Loan
//             </DialogTitle>

//           </DialogHeader>

//           <LeadForm
//             productType="loan"
//             productName="Loan"
//             showAmount
//             showMessage
//           />

//         </DialogContent>

//       </Dialog>

//       {/* INSURANCE FORM */}

//       <Dialog>

//         <DialogTrigger asChild>

//           <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-green-50">

//             <h3 className="font-semibold text-[#17357e]">
//               Insurance Application
//             </h3>

//             <p className="text-sm text-gray-500">
//               Health, life & motor insurance
//             </p>

//           </button>

//         </DialogTrigger>

//         <DialogContent className="max-w-lg rounded-3xl">

//           <DialogHeader>

//             <DialogTitle>
//               Apply for Insurance
//             </DialogTitle>

//           </DialogHeader>

//           <LeadForm
//             productType="insurance"
//             productName="Insurance"
//             showAmount
//             showMessage
//           />

//         </DialogContent>

//       </Dialog>

//       {/* MUTUAL FUND FORM */}

//       <Dialog>

//         <DialogTrigger asChild>

//           <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-orange-50">

//             <h3 className="font-semibold text-[#17357e]">
//               Mutual Fund Application
//             </h3>

//             <p className="text-sm text-gray-500">
//               Start SIP & investment planning
//             </p>

//           </button>

//         </DialogTrigger>

//         <DialogContent className="max-w-lg rounded-3xl">

//           <DialogHeader>

//             <DialogTitle>
//               Mutual Fund Enquiry
//             </DialogTitle>

//           </DialogHeader>

//           <LeadForm
//             productType="mutual_fund"
//             productName="Mutual Fund"
//             showAmount
//             showMessage
//           />

//         </DialogContent>

//       </Dialog>

//     </div>

//   </div>

// </div>

//           {/* MOBILE MENU */}

//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white lg:hidden"
//           >
//             {mobileMenu ? (
//               <X className="h-5 w-5 text-[#17357e]" />
//             ) : (
//               <Menu className="h-5 w-5 text-[#17357e]" />
//             )}
//           </button>

//         </div>

//       </header>

//       {/* BOTTOM FLOATING NAVBAR */}

//       {showBottomNav && (

//         <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:flex">

//           <div className="flex items-center gap-8 rounded-full border border-white/20 bg-white/90 px-8  shadow-2xl backdrop-blur-xl">

//             <Link
//               to="/"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <Home className="h-5 w-5" />
//               Home
//             </Link>

//             <Link
//               to="/services"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <Briefcase className="h-5 w-5" />
//               Services
//             </Link>

//             <Link
//               to="/testimonials"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <MessageSquare className="h-5 w-5" />
//               Products
//             </Link>

//             <Link
//               to="/contact"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <Phone className="h-5 w-5" />
//               Contact
//             </Link>

            

//             {/* GET STARTED */}

//             <Link to="/apply-now">

//               <Button className="rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 px-8 py-4 text-white shadow-lg transition hover:scale-105">
//                 Get Started
//               </Button>

//             </Link>

//           </div>

//         </div>

//       )}
//     </>
//   );
// } 
// import { Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { LeadForm } from "./LeadForm";

// import {
//   ChevronDown,
//   Menu,
//   X,
//   LogIn,
//   Landmark,
//   TrendingUp,
//   Calculator,
//   Wallet,
//   Home,
//   Briefcase,
//   MessageSquare,
//   Phone,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import logo from "@/assets/logo.png";
// import headingLogo from "@/assets/heading-logo.png";

// export function Header() {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showBottomNav, setShowBottomNav] = useState(true);
//   const [showHeader, setShowHeader] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY && window.scrollY > 100) {
//         setShowHeader(false);
//       } else {
//         setShowHeader(true);
//       }

//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   return (
//     <>
//       {/* HEADER */}

//       <header
//         className={`fixed top-0 z-50 w-full border-b border-white/20 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-500 ${
//           showHeader
//             ? "translate-y-0 opacity-100"
//             : "-translate-y-full opacity-0"
//         }`}
//       >
//         <div className="container mx-auto flex h-20 items-center justify-between px-6">

//           {/* LOGO */}

//           <Link to="/" className="flex items-center gap-0">

//             <div className="flex h-14 overflow-hidden rounded-2xl">
//               <img
//                 src={logo}
//                 alt="Aarthvaahini"
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <img
//               src={headingLogo}
//               alt="Aarthvaahini"
//               className="hidden h-10 w-auto object-contain sm:block mt-3"
//             />

//           </Link>

//           {/* DESKTOP MENU */}

//           <nav className="hidden items-center gap-3 lg:flex">

//             {/* LOANS */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50">
//                 Loans
//                 <ChevronDown className="h-4 w-4" />
//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   <Link
//                     to="/personal-loan"
//                     className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-blue-50"
//                   >
//                     <Wallet className="mt-1 h-5 w-5 text-blue-700" />

//                     <div>
//                       <h3 className="font-semibold text-[#17357e]">
//                         Personal Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Instant approvals & low EMI
//                       </p>
//                     </div>
//                   </Link>

//                   <Link
//                     to="/business-loan"
//                     className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-blue-50"
//                   >
//                     <TrendingUp className="mt-1 h-5 w-5 text-green-700" />

//                     <div>
//                       <h3 className="font-semibold text-[#17357e]">
//                         Business Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         MSME & startup funding
//                       </p>
//                     </div>
//                   </Link>

//                   <Link
//                     to="/home-loan"
//                     className="flex items-start gap-3 rounded-2xl p-4 transition hover:bg-blue-50"
//                   >
//                     <Landmark className="mt-1 h-5 w-5 text-orange-700" />

//                     <div>
//                       <h3 className="font-semibold text-[#17357e]">
//                         Home Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Affordable EMI plans
//                       </p>
//                     </div>
//                   </Link>

//                 </div>

//               </div>

//             </div>

//             {/* INSURANCE */}

//             <Link
//               to="/insurance"
//               className="rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50"
//             >
//               Insurance
//             </Link>

//             {/* MUTUAL FUNDS */}

//             <Link
//               to="/mutual-funds"
//               className="rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50"
//             >
//               Mutual Funds
//             </Link>

//             {/* CALCULATORS */}

//             <Link
//               to="/calculator"
//               className="flex items-center gap-2 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] transition hover:bg-blue-50"
//             >
//               <Calculator className="h-4 w-4" />
//               Calculators
//             </Link>

//           </nav>

//           {/* RIGHT SIDE */}

//           <div className="hidden items-center gap-3 lg:flex">

//             {/* ADMIN LOGIN */}

//             <Link to="/admin-login">

//               <Button
//                 variant="outline"
//                 className="rounded-full border-blue-200 px-6 text-[#17357e] hover:bg-blue-50"
//               >
//                 <LogIn className="mr-2 h-4 w-4" />
//                 Admin Login
//               </Button>

//             </Link>

//             {/* APPLY NOW */}

//             <div className="group relative">

//               <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 px-7 py-2 text-white shadow-lg transition-all hover:scale-105">

//                 Apply Now

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               {/* DROPDOWN */}

//               <div className="invisible absolute right-0 top-16 z-50 w-72 rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   {/* LOAN */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-blue-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Loan Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Apply for personal, home & business loans
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Apply for Loan
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="loan"
//                         productName="Loan"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                   {/* INSURANCE */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-green-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Insurance Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Health, life & motor insurance
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Apply for Insurance
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="insurance"
//                         productName="Insurance"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                   {/* MUTUAL FUND */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-orange-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Mutual Fund Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Start SIP & investment planning
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Mutual Fund Enquiry
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="mutual_fund"
//                         productName="Mutual Fund"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* MOBILE MENU BUTTON */}

//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white lg:hidden"
//           >
//             {mobileMenu ? (
//               <X className="h-5 w-5 text-[#17357e]" />
//             ) : (
//               <Menu className="h-5 w-5 text-[#17357e]" />
//             )}
//           </button>

//         </div>
//       </header>

//       {/* BOTTOM NAV */}

//       {showBottomNav && (

//         <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:flex">

//           <div className="flex items-center gap-8 rounded-full border border-white/20 bg-white/90 px-8 shadow-2xl backdrop-blur-xl">

//             <Link
//               to="/"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <Home className="h-5 w-5" />
//               Home
//             </Link>

//             <Link
//               to="/services"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <Briefcase className="h-5 w-5" />
//               Services
//             </Link>

//             <Link
//               to="/products"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <MessageSquare className="h-5 w-5" />
//               Products
//             </Link>

//             <Link
//               to="/contact"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >
//               <Phone className="h-5 w-5" />
//               Contact
//             </Link>

//             <Button className="rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 px-8 py-4 text-white shadow-lg transition hover:scale-105">
//               Get Started
//             </Button>

//           </div>

//         </div>

//       )}

//     </>
//   );
// }
// import { Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { LeadForm } from "./LeadForm";

// import {
//   ChevronDown,
//   Menu,
//   X,
//   LogIn,
//   Landmark,
//   ShieldCheck,
//   TrendingUp,
//   Calculator,
//   Wallet,
//   Home,
//   Briefcase,
//   MessageSquare,
//   Phone,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import logo from "@/assets/logo.png";
// import headingLogo from "@/assets/heading-logo.png";

// export function Header() {

//   const [mobileMenu, setMobileMenu] = useState(false);

//   const [showBottomNav, setShowBottomNav] = useState(false);

//   const [showHeader, setShowHeader] = useState(true);

//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {

//     const handleScroll = () => {

//       if (window.scrollY > 500) {

//   setShowBottomNav(true);

// } else {

//   setShowBottomNav(false);

// }

//       setLastScrollY(window.scrollY);

//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };

//   }, [lastScrollY]);
   
//   useEffect(() => {

//   const handleScroll = () => {

//     if (window.scrollY > lastScrollY && window.scrollY > 80) {

//       setShowHeader(false);

//     } else {

//       setShowHeader(true);

//     }

//     setLastScrollY(window.scrollY);

//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };

// }, [lastScrollY]);

//   return (
//     <>
    
//       {/* HEADER */}

//       <header
//         className={`fixed top-0 z-50 w-full border-b border-white/20 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-500 ${
//           showHeader
//             ? "translate-y-0 opacity-100"
//             : "-translate-y-full opacity-0"
//         }`}
//       >

//         <div className="container mx-auto flex h-16 items-center justify-between px-6">

//           {/* LOGO */}

//           <Link to="/" className="flex items-center gap-0">

//             <div className="flex h-14 overflow-hidden rounded-2xl">

//               <img
//                 src={logo}
//                 alt="Aarthvaahini"
//                 className="h-full w-full object-cover"
//               />

//             </div>

//             <img
//               src={headingLogo}
//               alt="Aarthvaahini"
//               className="hidden h-10 w-auto object-contain sm:block mt-3"
//             />

//           </Link>

//           {/* NAVIGATION */}

//           <nav className="hidden items-center gap-3 lg:flex">

//             {/* LOANS */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] hover:bg-blue-50">

//                 Loan

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

                  
//                    <a href="#products"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <Wallet className="mt-1 h-5 w-5 text-blue-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         Personal Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Instant approvals & low EMI
//                       </p>

//                     </div>
//                    </a>
                  
//                    <a href="#products"

//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <TrendingUp className="mt-1 h-5 w-5 text-green-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         Business Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         MSME & startup funding
//                       </p>

//                     </div>

//                     </a>

//                     <a href="#products"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <Landmark className="mt-1 h-5 w-5 text-orange-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         Home Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Affordable EMI plans
//                       </p>

//                     </div>

//                  </a>

//                 </div>

//               </div>

//             </div>

//             {/* INSURANCE */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] hover:bg-blue-50">

//                 Insurance

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                     <Link
//                      to="/insurance"
//                     className="block rounded-2xl p-4 hover:bg-pink-50"
//                   >

//                     <h3 className="font-semibold text-[#17357e]">
//                       Life Insurance
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Secure your family future
//                     </p>

//                   </Link>
                   
//                    <Link
//                    to="/insurance"
                    
//                     className="block rounded-2xl p-4 hover:bg-green-50"
//                   >

//                     <h3 className="font-semibold text-[#17357e]">
//                       Health Insurance
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Cashless hospitalization
//                     </p>

//                   </Link>

//                   <Link
//                  to="/insurance"
//                     className="block rounded-2xl p-4 hover:bg-orange-50"
//                   >

//                     <h3 className="font-semibold text-[#17357e]">
//                       Car Insurance
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Protect your vehicle
//                     </p>

//                   </Link>

//                 </div>

//               </div>

//             </div>

//             {/* MUTUAL FUNDS */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] hover:bg-blue-50">

//                 Mutual Funds

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                 <Link to="/mutual-funds"
//                     className="block rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <h3 className="font-semibold text-[#17357e]">
//                       SIP Investment
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Start wealth creation with SIP
//                     </p>

//                  </Link>

//                   <Link to="/mutual-funds"
//                     className="block rounded-2xl p-4 hover:bg-green-50"
//                     >
                  
//                     <h3 className="font-semibold text-[#17357e]">
//                       ELSS Funds
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Save tax with ELSS mutual funds
//                     </p>

//                   </Link>

//                    <Link to="/mutual-funds"
//                     className="block rounded-2xl p-4 hover:bg-orange-50"
//                   >

//                     <h3 className="font-semibold text-[#17357e]">
//                       Retirement Planning
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       Long-term retirement investment
//                     </p>

//                   </Link>
//                  <Link
//   to="/banking"
//   className="block rounded-2xl p-4 hover:bg-blue-50"
// >

//   <h3 className="font-semibold text-[#17357e]">
//     Banking
//   </h3>

//   <p className="text-sm text-gray-500">
//     Savings, FD, Current & Demat Accounts
//   </p>

// </Link>
//                 </div>

//               </div>

//             </div>

//             {/* CALCULATORS */}

//             <div className="group relative">

//               <button className="flex items-center gap-2 rounded-xl px-4 py-2 text-[15px] font-semibold text-[#17357e] hover:bg-blue-50">

//                 <Calculator className="h-4 w-4" />

//                 Calculators

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   <a
//                     href="#calculator"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <Calculator className="mt-1 h-5 w-5 text-blue-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         EMI Calculator
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Calculate monthly EMI instantly
//                       </p>

//                     </div>

//                   </a>

//                   <a
//                     href="#sip"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-green-50"
//                   >

//                     <TrendingUp className="mt-1 h-5 w-5 text-green-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         SIP Planner
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Estimate future SIP returns
//                       </p>

//                     </div>

//                   </a>

//                   <a
//                     href="#cibil"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-orange-50"
//                   >

//                     <ShieldCheck className="mt-1 h-5 w-5 text-orange-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         CIBIL Checker
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Check your credit score free
//                       </p>

//                     </div>

//                   </a>

//                 </div>

//               </div>

//             </div>

//           </nav>

//           {/* RIGHT BUTTONS */}

//           <div className="hidden items-center gap-3 lg:flex">

//   <Link to="/admin">

//     <Button
//       variant="outline"
//       className="rounded-full border-blue-200 px-6 text-[#17357e] hover:bg-blue-50"
//     >

//       <LogIn className="mr-2 h-4 w-4" />

//       Admin Login

//     </Button>

//   </Link>

          

//             {/* APPLY NOW */}

//             <div className="group relative">

//               <button className="rounded-full bg-linear-to-r from-[#17357e] to-blue-600 px-7 py-2 text-white shadow-lg transition-all hover:scale-105 flex items-center gap-2">

//                 Apply Now

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute right-0 top-16 z-50 w-72 rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   {/* LOAN */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left hover:bg-blue-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Loan Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Apply for loans
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Apply for Loan
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="loan"
//                         productName="Loan"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                   {/* INSURANCE */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left hover:bg-green-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Insurance Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Health & life insurance
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Insurance Enquiry
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="insurance"
//                         productName="Insurance"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                   {/* MUTUAL FUND */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left hover:bg-orange-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Mutual Fund Enquiry
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Start SIP & investments
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Mutual Fund Enquiry
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="mutual_fund"
//                         productName="Mutual Fund"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* MOBILE MENU */}

//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white lg:hidden"
//           >

//             {mobileMenu ? (
//               <X className="h-5 w-5 text-[#17357e]" />
//             ) : (
//               <Menu className="h-5 w-5 text-[#17357e]" />
//             )}

//           </button>

//         </div>

//       </header>

//      {/* BOTTOM NAV */}

// {showBottomNav && (

//   <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:flex">

//     <div className="flex items-center gap-8 rounded-full border border-white/20 bg-white/90 px-8 py-4 shadow-2xl backdrop-blur-xl">

//       {/* HOME */}

//       <a
//         href="#hero"
//         className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//       >

//         <Home className="h-5 w-5" />

//         Home

//       </a>

//       {/* SERVICES */}
     
//       <a
//         href="#services"
//         className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//       >

//         <Briefcase className="h-5 w-5" />

//         Services

//       </a>

//       {/* PRODUCTS */}

//       <a
//         href="#products"
//         className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//       >

//         <MessageSquare className="h-5 w-5" />

//         Products

//       </a>

//       {/* CONTACT */}

//       <a
//         href="#contact"
//         className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//       >

//         <Phone className="h-5 w-5" />

//         Contact

//       </a>

//     </div>

//   </div>

// )}

//     </>
//   );
// }
// import { Link } from "@tanstack/react-router";
// import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { LeadForm } from "./LeadForm";

// import {
//   ChevronDown,
//   Menu,
//   X,
//   LogIn,
//   Landmark,
//   ShieldCheck,
//   TrendingUp,
//   Calculator,
//   Wallet,
//  Home,
//   Briefcase,
//   MessageSquare,
//   Phone,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import logo from "@/assets/logo.png";
// import headingLogo from "@/assets/heading-logo.png";

// export function Header() {

//   const [mobileMenu, setMobileMenu] = useState(false);

//   const [showBottomNav, setShowBottomNav] = useState(false);

//   const [showHeader, setShowHeader] = useState(true);

//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {

//     const handleScroll = () => {

//       setShowBottomNav(window.scrollY > 500);

//       if (window.scrollY > lastScrollY && window.scrollY > 80) {
//         setShowHeader(false);
//       } else {
//         setShowHeader(true);
//       }

//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };

//   }, [lastScrollY]);

//   return (
//     <>

//       {/* HEADER */}

//       <header
//         className={`fixed top-0 z-50 w-full border-b border-white/20 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-500 ${
//           showHeader
//             ? "translate-y-0 opacity-100"
//             : "-translate-y-full opacity-0"
//         }`}
//       >

//         <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">

//           {/* LOGO */}

//           <Link to="/" className="flex items-center gap-2">

//             <div className="flex h-12 w-12 overflow-hidden rounded-2xl lg:h-14 lg:w-14">

//               <img
//                 src={logo}
//                 alt="Aarthvaahini"
//                 className="h-full w-full object-cover"
//               />

//             </div>

//             <img
//               src={headingLogo}
//               alt="Aarthvaahini"
//               className="hidden h-10 w-auto object-contain sm:block"
//             />

//           </Link>

//           {/* DESKTOP NAV */}

//           <nav className="hidden items-center gap-2 xl:gap-3 lg:flex">

//             {/* LOANS */}

//             <div className="group relative">

//               <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50">

//                 Loan

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   <a
//                     href="#products"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <Wallet className="mt-1 h-5 w-5 text-blue-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         Personal Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Instant approvals & low EMI
//                       </p>

//                     </div>

//                   </a>

//                   <a
//                     href="#products"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <TrendingUp className="mt-1 h-5 w-5 text-green-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         Business Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         MSME & startup funding
//                       </p>

//                     </div>

//                   </a>

//                   <a
//                     href="#products"
//                     className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
//                   >

//                     <Landmark className="mt-1 h-5 w-5 text-orange-700" />

//                     <div>

//                       <h3 className="font-semibold text-[#17357e]">
//                         Home Loan
//                       </h3>

//                       <p className="text-sm text-gray-500">
//                         Affordable EMI plans
//                       </p>

//                     </div>

//                   </a>

//                 </div>

//               </div>

//             </div>

//             {/* INSURANCE */}

//             <Link
//               to="/insurance"
//               className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
//             >
//               Insurance
//             </Link>

//             {/* MUTUAL FUNDS */}

//             <Link
//               to="/mutual-funds"
//               className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
//             >
//               Mutual Funds
//             </Link>

//             {/* BANKING */}

//             <Link
//               to="/banking"
//               className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
//             >
//               Banking
//             </Link>

//             {/* CALCULATORS */}

//             <a
//               href="#calculator"
//               className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
//             >

//               <Calculator className="h-4 w-4" />

//               Calculators

//             </a>

//           </nav>

//           {/* RIGHT BUTTONS */}

//           <div className="hidden items-center gap-3 lg:flex">

//             <Link to="/admin">

//               <Button
//                 variant="outline"
//                 className="rounded-full border-blue-200 px-5 xl:px-6 text-[#17357e] hover:bg-blue-50"
//               >

//                 <LogIn className="mr-2 h-4 w-4" />

//                 Admin Login

//               </Button>

//             </Link>

//             {/* APPLY NOW */}

//             <div className="group relative">

//               <button
//                 className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 px-5 xl:px-7 py-2.5 text-sm xl:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
//               >

//                 Apply Now

//                 <ChevronDown className="h-4 w-4" />

//               </button>

//               <div className="invisible absolute right-0 top-16 z-[9999] w-72 rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

//                 <div className="space-y-3">

//                   {/* LOAN */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-blue-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Loan Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Apply for loans
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Apply for Loan
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="loan"
//                         productName="Loan"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                   {/* INSURANCE */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-green-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Insurance Application
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Health & Life Insurance
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Insurance Enquiry
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="insurance"
//                         productName="Insurance"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                   {/* MUTUAL FUND */}

//                   <Dialog>

//                     <DialogTrigger asChild>

//                       <button className="w-full rounded-2xl border p-4 text-left transition hover:bg-orange-50">

//                         <h3 className="font-semibold text-[#17357e]">
//                           Mutual Fund Enquiry
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           Start SIP & Investments
//                         </p>

//                       </button>

//                     </DialogTrigger>

//                     <DialogContent className="max-w-lg rounded-3xl">

//                       <DialogHeader>

//                         <DialogTitle>
//                           Mutual Fund Enquiry
//                         </DialogTitle>

//                       </DialogHeader>

//                       <LeadForm
//                         productType="mutual_fund"
//                         productName="Mutual Fund"
//                         showAmount
//                         showMessage
//                       />

//                     </DialogContent>

//                   </Dialog>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* MOBILE MENU BUTTON */}

//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white lg:hidden"
//           >

//             {mobileMenu ? (
//               <X className="h-5 w-5 text-[#17357e]" />
//             ) : (
//               <Menu className="h-5 w-5 text-[#17357e]" />
//             )}

//           </button>

//         </div>

//         {/* MOBILE MENU */}

//         {mobileMenu && (

//           <div className="border-t bg-white px-6 py-5 lg:hidden">

//             <div className="flex flex-col gap-4">

//               <Link
//                 to="/loans"
//                 className="font-medium text-[#17357e]"
//               >
//                 Loans
//               </Link>

//               <Link
//                 to="/insurance"
//                 className="font-medium text-[#17357e]"
//               >
//                 Insurance
//               </Link>

//               <Link
//                 to="/mutual-funds"
//                 className="font-medium text-[#17357e]"
//               >
//                 Mutual Funds
//               </Link>

//               <Link
//                 to="/banking"
//                 className="font-medium text-[#17357e]"
//               >
//                 Banking
//               </Link>

//               <Link
//                 to="/admin"
//                 className="font-medium text-[#17357e]"
//               >
//                 Admin Login
//               </Link>

//               <Button className="mt-2 w-full bg-gradient-to-r from-[#17357e] to-blue-600">
//                 Apply Now
//               </Button>

//             </div>

//           </div>

//         )}

//       </header>

//       {/* BOTTOM NAV */}

//       {showBottomNav && (

//         <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:flex">

//           <div className="flex items-center gap-8 rounded-full border border-white/20 bg-white/90 px-8 py-4 shadow-2xl backdrop-blur-xl">

//             <a
//               href="#hero"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >

//               <Home className="h-5 w-5" />

//               Home

//             </a>

//             <a
//               href="#services"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >

//               <Briefcase className="h-5 w-5" />

//               Services

//             </a>

//             <a
//               href="#products"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >

//               <MessageSquare className="h-5 w-5" />

//               Products

//             </a>

//             <a
//               href="#contact"
//               className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
//             >

//               <Phone className="h-5 w-5" />

//               Contact

//             </a>

//           </div>

//         </div>

//       )}

//     </>
//   );
// }
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LeadForm } from "./LeadForm";

import {
  ChevronDown,
  Menu,
  X,
  LogIn,

  Landmark,
  ShieldCheck,
  TrendingUp,
  Calculator,
  Wallet,
  Home,
  Briefcase,
  MessageSquare,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import headingLogo from "@/assets/heading-logo.png";
import insuranceBg from "@/assets/insurance-bg.jpg";
import mutualFundBg from "@/assets/mutualfund-bg.jpg";
export function Header() {
const { user, role, signOut } = useAuth();
console.log("HEADER USER:", user);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [showBottomNav, setShowBottomNav] = useState(false);

  const [showHeader, setShowHeader] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {

    const handleScroll = () => {

      setShowBottomNav(window.scrollY > 500);

      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [lastScrollY]);

  return (
    <>

      {/* HEADER */}

      <header
        className={`fixed top-0 z-50 w-full border-b border-white/20 bg-white/90 backdrop-blur-xl shadow-sm transition-all duration-500 ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >

        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-0">

            <div className="flex h-14  overflow-hidden rounded-2xl">

              <img
                src={logo}
                alt="Aarthvaahini"
                className="h-full w-full object-cover"
              />

            </div>

            <img
              src={headingLogo}
              alt="Aarthvaahini"
              className="mt-3 hidden h-10 w-auto object-contain sm:block"
            />

          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-2 xl:gap-3 lg:flex">

            {/* LOANS */}

            <div className="group relative">

              
            <Link
              to="/loans"
              className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
            >
              Loan
            </Link>


              

              {/* <div className="invisible absolute left-0 top-14 z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

                <div className="space-y-3">

                  <a
                    href="#products"
                    className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
                  >

                    <Wallet className="mt-1 h-5 w-5 text-blue-700" />

                    <div>

                      <h3 className="font-semibold text-[#17357e]">
                        Personal Loan
                      </h3>

                      <p className="text-sm text-gray-500">
                        Instant approvals & low EMI
                      </p>

                    </div>

                  </a>

                  <a
                    href="#products"
                    className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
                  >

                    <TrendingUp className="mt-1 h-5 w-5 text-green-700" />

                    <div>

                      <h3 className="font-semibold text-[#17357e]">
                        Business Loan
                      </h3>

                      <p className="text-sm text-gray-500">
                        MSME & startup funding
                      </p>

                    </div>

                  </a>

                  <a
                    href="#products"
                    className="flex items-start gap-3 rounded-2xl p-4 hover:bg-blue-50"
                  >

                    <Landmark className="mt-1 h-5 w-5 text-orange-700" />

                    <div>

                      <h3 className="font-semibold text-[#17357e]">
                        Home Loan
                      </h3>

                      <p className="text-sm text-gray-500">
                        Affordable EMI plans
                      </p>

                    </div>

                  </a>

                </div>

              </div> */}

            </div>

            {/* INSURANCE */}

            <Link
              to="/insurance"
              className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
            >
              Insurance
            </Link>

            {/* MUTUAL FUNDS */}

            <Link
              to="/mutual-funds"
              className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
            >
              Mutual Funds
            </Link>

            {/* BANKING */}

            {/* <Link
              to="/banking"
              className="rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
            >
              Banking
            </Link> */}

            {/* CALCULATORS */}

            <a
              href="#calculator"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm xl:text-[15px] font-semibold text-[#17357e] hover:bg-blue-50"
            >

              <Calculator className="h-4 w-4" />

              Calculators

            </a>

          </nav>

          {/* RIGHT BUTTONS */}

          <div className="hidden items-center gap-3 lg:flex">

            {user ? (
  <Button
    onClick={signOut}
    variant="outline"
    className="rounded-full border-red-200 px-5 xl:px-6 text-red-600 hover:bg-red-50"
  >
    <LogOut className="mr-2 h-4 w-4" />
    Logout
  </Button>
) : (
  <Link to="/admin">
    <Button
      variant="outline"
      className="rounded-full border-blue-200 px-5 xl:px-6 text-[#17357e] hover:bg-blue-50"
    >
      <LogIn className="mr-2 h-4 w-4" />
      Admin Login
    </Button>
  </Link>
)}

            {/* APPLY NOW */}

            <div className="group relative">

              <button
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#17357e] to-blue-600 px-5 xl:px-7 py-2.5 text-sm xl:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              >

                Apply Now

                <ChevronDown className="h-4 w-4" />

              </button>

              <div className="invisible absolute right-0 top-16 z-[9999] w-72 rounded-3xl border border-gray-100 bg-white p-5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

                <div className="space-y-3">

                  {/* LOAN */}

                  <Dialog>

                    <DialogTrigger asChild>

                      <button className="w-full rounded-2xl p-4 text-left transition hover:bg-blue-50">

                        <h3 className="font-semibold text-[#17357e]">
                          Loan Application
                        </h3>

                        <p className="text-sm text-gray-500">
                          Apply for loans
                        </p>

                      </button>

                    </DialogTrigger>

                    <DialogContent className="max-w-2xl rounded-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

                      <DialogHeader>

                        {/* <DialogTitle className="text-xl font-bold text-[#17357e]">
                          Apply for Loan
                        </DialogTitle> */}

                      </DialogHeader>

                      <LeadForm
                        productType="loan"
                        productName="Loan"
                      />

                    </DialogContent>

                  </Dialog>

                  {/* INSURANCE */}

                  <Dialog>

                    <DialogTrigger asChild>

                      <button className="w-full rounded-2xl p-4 text-left transition hover:bg-green-50">

                        <h3 className="font-semibold text-[#17357e]">
                          Insurance Application
                        </h3>

                        <p className="text-sm text-gray-500">
                          Health & Life Insurance
                        </p>

                      </button>

                    </DialogTrigger>
<DialogContent className="max-w-3xl  bg-white/95 backdrop-blur-xl rounded-[32px] p-0 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

                      <DialogHeader>

                        <DialogTitle className="text-xl font-bold text-[#17357e]">
                          Insurance Enquiry
                        </DialogTitle>

                      </DialogHeader>

                      <LeadForm
                        productType="insurance"
                        productName="Insurance"
                      />

                    </DialogContent>

                  </Dialog>

                  {/* MUTUAL FUND */}

                  <Dialog>

                    <DialogTrigger asChild>

                      <button className="w-full rounded-2xl  p-4 text-left transition hover:bg-orange-50">

                        <h3 className="font-semibold text-[#17357e]">
                          Mutual Fund Enquiry
                        </h3>

                        <p className="text-sm text-gray-500">
                          Start SIP & Investments
                        </p>

                      </button>

                    </DialogTrigger>

                    <DialogContent className="max-w-2xl rounded-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

                      <DialogHeader>

                        <DialogTitle className="text-xl font-bold text-[#17357e]">
                          Mutual Fund Enquiry
                        </DialogTitle>

                      </DialogHeader>

                      <LeadForm
                        productType="mutual_fund"
                        productName="Mutual Fund"
                      />

                    </DialogContent>

                  </Dialog>

                </div>

              </div>

            </div>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white lg:hidden"
          >

            {mobileMenu ? (
              <X className="h-5 w-5 text-[#17357e]" />
            ) : (
              <Menu className="h-5 w-5 text-[#17357e]" />
            )}

          </button>

        </div>

      {/* MOBILE MENU */}

{mobileMenu && (

  <div className="border-t bg-white px-6 py-5 lg:hidden">

    <div className="flex flex-col gap-4">

      <Link
        to="/loans"
        className="font-medium text-[#17357e]"
      >
        Loans
      </Link>

      <Link
        to="/insurance"
        className="font-medium text-[#17357e]"
      >
        Insurance
      </Link>

      <Link
        to="/mutual-funds"
        className="font-medium text-[#17357e]"
      >
        Mutual Funds
      </Link>

      <Link
        to="/banking"
        className="font-medium text-[#17357e]"
      >
        Banking
      </Link>

      {user ? (
  <button
    onClick={signOut}
    className="text-left font-medium text-red-600"
  >
    Logout
  </button>
) : (
  <Link
    to="/admin"
    className="font-medium text-[#17357e]"
  >
    Admin Login
  </Link>
)}

<Button className="mt-2 w-full bg-gradient-to-r from-[#17357e] to-blue-600">
  Apply Now
</Button>

</div>

</div>

)}
      </header>

      {/* BOTTOM NAV */}

      {showBottomNav && (

        <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:flex">

          <div className="flex items-center gap-8 rounded-full border border-white/20 bg-white/90 px-8 py-4 shadow-2xl backdrop-blur-xl">

            <a
              href="#hero"
              className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
            >

              <Home className="h-5 w-5" />

              Home

            </a>

            <a
              href="#services"
              className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
            >

              <Briefcase className="h-5 w-5" />

              Services

            </a>

            <a
              href="#products"
              className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
            >

              <MessageSquare className="h-5 w-5" />

              Products

            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 font-medium text-[#17357e] transition hover:text-blue-600"
            >

              <Phone className="h-5 w-5" />

              Contact

            </a>

          </div>

        </div>

      )}

    </>
  );
}