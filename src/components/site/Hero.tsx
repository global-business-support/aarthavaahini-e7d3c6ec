// import { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";

// import {
//   ChevronLeft,
//   ChevronRight,
//   ShieldCheck,
//   TrendingUp,
//   Sparkles,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import advisor from "@/assets/hero-advisor.png";
// import advisor15  from "@/assets/hero-advisor15.png";
// import advisor16 from "@/assets/hero-advisor16.png";

// const slides = [
//   {
//     title: "Fast Personal & Business Loans",
//     desc: "Get instant approval, low interest rates and quick disbursal for personal, home and business loans.",
//     image: advisor,
//     button: "Apply Loan",
//     bg: "from-[#EEF6FF] via-[#F7FBFF] to-[#E4F1FF]",
//   },

//   {
//     title: "Secure Your Family With Insurance",
//     desc: "Compare health, life, travel and motor insurance plans with trusted partners.",
//     image: advisor15,
//     button: "Get Insurance",
//     bg: "from-[#FFF1F4] via-[#FFF8FA] to-[#FFE7EF]",
//   },

//   {
//     title: "Smart Mutual Funds & SIP Planning",
//     desc: "Build long-term wealth with SIP investments, ELSS funds and expert financial planning.",
//     image: advisor16,
//     button: "Start SIP",
//     bg: "from-[#F1FFF5] via-[#F7FFF9] to-[#E2F8EA]",
//   },
// ];

// export function Hero() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative overflow-hidden pt-24">

//       {/* LEFT ARROW */}

//       <button
//         onClick={() =>
//           setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
//         }
//         className="absolute left-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl lg:flex"
//       >
//         <ChevronLeft className="h-5 w-5 text-[#0B1B3F]" />
//       </button>

//       {/* RIGHT ARROW */}

//       <button
//         onClick={() =>
//           setCurrent((prev) => (prev + 1) % slides.length)
//         }
//         className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl lg:flex"
//       >
//         <ChevronRight className="h-5 w-5 text-[#0B1B3F]" />
//       </button>

//       {/* SLIDER */}

//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`min-w-full bg-gradient-to-r ${slide.bg}`}
//           >
//             <div className="container mx-auto grid min-h-[90vh] items-center gap-12 px-6 py-10 lg:grid-cols-2">

//               {/* LEFT CONTENT */}

//               <div>

//                 {/* BADGE */}

//                 <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-md">

//                   <Sparkles className="h-4 w-4 text-blue-600" />

//                   <span className="text-sm font-semibold text-[#17357E]">
//                     India's Trusted Financial Partner
//                   </span>

//                 </div>

//                 {/* TITLE */}

//                 <h1 className="mt-8 max-w-[650px] text-5xl font-extrabold leading-[1.05] tracking-[-2px] text-[#07142F] lg:text-7xl">
//                   {slide.title}
//                 </h1>

//                 {/* DESCRIPTION */}

//                 <p className="mt-6 max-w-[620px] text-lg leading-8 text-[#335081]">
//                   {slide.desc}
//                 </p>

//                 {/* BUTTONS */}

//                 <div className="mt-8 flex flex-wrap gap-4">

//                   <Button className="h-14 rounded-2xl bg-[#17357E] px-8 text-lg hover:bg-[#102962]">
//                     {slide.button}
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="h-14 rounded-2xl border-blue-200 bg-white px-8 text-lg text-[#17357E]"
//                   >
//                     Explore More
//                   </Button>

//                 </div>

//                 {/* FOOTER */}

//                 <div className="mt-10 flex flex-wrap gap-8 text-sm text-[#4F6285]">

//                   <div className="flex items-center gap-2">
//                     <ShieldCheck className="h-5 w-5 text-blue-600" />
//                     RBI compliant partners
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5 text-blue-600" />
//                     50,000+ happy customers
//                   </div>

//                 </div>

//               </div>

//               {/* RIGHT IMAGE */}

//               <div className="flex items-center justify-center">

//                 <img
//                   src={slide.image}
//                   alt={slide.title}
//                   className="w-full max-w-[700px] object-contain"
//                 />

//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DOTS */}

//       <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-3">

//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`h-3 rounded-full transition-all ${
//               current === index
//                 ? "w-10 bg-blue-600"
//                 : "w-3 bg-gray-400"
//             }`}
//           />
//         ))}

//       </div>

//     </section>
//   );
// }
// import { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";

// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   ShieldCheck,
//   TrendingUp,
//   Wallet,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import advisor17 from "@/assets/hero-advisor17.jpeg";
// import advisor18 from "@/assets/hero-advisor18.png";
// import advisor20 from "@/assets/hero-advisor20.jpeg";

// type Slide = {
//   title: string;
//   subtitle: string;
//   button1: string;
//   button2: string;
//   image: string;
// };

// const slides: Slide[] = [
//   {
//     title: "Banking, Loans & Insurance made simple.",
//     subtitle:
//       "Empowering Financial Growth Through Smart Lending, Investments & Protection Aarthvaahini Financial Services Pvt. Ltd. helps individuals, professionals, businesses, and enterprises access tailored financial solutions including home loans, business loans, loan against property, insurance, mutual funds, SIP investments, and wealth management.",
//     button1: "Free Consultation",
//     button2: "Explore Loans",
//     image: advisor17,
//   },

//   {
//     title: "Instant Loans With Low Interest & Quick Approval",
//     subtitle:
//       "Get personal, business and home loans with fast approvals, affordable EMI and trusted banking partners.",
//     button1: "Apply Loan",
//     button2: "Check EMI",
//     image: advisor18,
//   },

//   {
//     title: "Protect Your Family With Smart Insurance Plans",
//     subtitle:
//       "Health, life and vehicle insurance plans with complete protection and cashless claim support.",
//     button1: "Get Insurance",
//     button2: "View Plans",
//     image: advisor20,
//   },
// ];

// export function Hero() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const slider = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(slider);
//   }, []);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden">

//       {/* SLIDES */}

//       <div
//         className="flex h-full transition-transform duration-700 ease-in-out"
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className="relative min-w-full h-screen"
//           >
//             {/* BACKGROUND IMAGE */}

//             <img
//               src={slide.image}
//               alt="hero"
//               className="absolute inset-0 h-full w-full object-cover"
//             />

//             {/* DARK OVERLAY */}

//             <div className="absolute inset-0 bg-black/55" />

//             {/* CONTENT */}

//             <div className="relative z-10 flex h-full items-center">

//               <div className="container mx-auto px-6">

//                 <div className="max-w-3xl">

//                   <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
//                     {slide.title}
//                   </h1>

//                   <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
//                     {slide.subtitle}
//                   </p>

//                   {/* BUTTONS */}

//                   <div className="mt-10 flex flex-wrap gap-4">

//                     <Button className="h-14 rounded-xl bg-gradient-to-r from-[#17357e] to-blue-600 px-8 text-lg font-semibold text-white hover:scale-105 transition-all">

//                       {slide.button1}

//                       <ArrowRight className="ml-2 h-5 w-5" />

//                     </Button>

//                     <Button
//                       variant="outline"
//                       className="h-14 rounded-xl border-white bg-transparent px-8 text-lg font-semibold text-white hover:bg-white hover:text-black"
//                     >
//                       {slide.button2}
//                     </Button>

//                   </div>

//                   {/* FEATURES */}

//                   <div className="mt-14 flex flex-wrap gap-6 text-white">

//                     <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
//                       <TrendingUp className="h-5 w-5 text-green-400" />
//                       Trusted Partner
//                     </div>

//                     <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
//                       <Wallet className="h-5 w-5 text-blue-400" />
//                       Smart Financial Plans
//                     </div>

//                     <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
//                       <ShieldCheck className="h-5 w-5 text-pink-400" />
//                       Secure Investments
//                     </div>

//                   </div>

//                 </div>

//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* LEFT BUTTON */}

//       <button
//         onClick={prevSlide}
//         className="absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
//       >
//         <ChevronLeft className="h-7 w-7 text-white" />
//       </button>

//       {/* RIGHT BUTTON */}

//       <button
//         onClick={nextSlide}
//         className="absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
//       >
//         <ChevronRight className="h-7 w-7 text-white" />
//       </button>

//       {/* DOTS */}

//       <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">

//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`h-3 rounded-full transition-all ${
//               current === index
//                 ? "w-10 bg-white"
//                 : "w-3 bg-white/50"
//             }`}
//           />
//         ))}

//       </div>
//     </section>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";



import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import advisor17 from "@/assets/hero-advisor17.jpeg";
import advisor18 from "@/assets/hero-advisor18.png";
import advisor21 from "@/assets/hero-advisor21.jpeg";
import heroBanner from "@/assets/hero-banner.png.asset.json";

type Slide = {
  title: React.ReactNode;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: (
      <>
        Empowering Financial Growth
      <span className="text-[#254185]"> Across India</span>
      </>
    ),

    subtitle:
      "Empowering Financial Growth Through Smart Lending, Investments & Protection. Aarthvaahini Financial Services Pvt. Ltd. helps individuals, professionals, businesses, and enterprises access tailored financial solutions including home loans, business loans, loan against property, insurance, mutual funds, SIP investments, and wealth management.",

    image: advisor17,
  },

  {
    title: (
      <>
        Smart Loans & Investments
        <span className="text-gradient"> For Every Dream</span>
      </>
    ),

    subtitle:
      "Get customized financial solutions with trusted lending partners, low interest rates, insurance protection, and wealth-building opportunities designed for modern families and businesses.",

    image: advisor18,
  },

  {
    title: (
      <>
        Trusted Financial Solutions
        <span className="text-gradient"> For Your Future</span>
      </>
    ),

    subtitle:
      "From home loans and business funding to insurance and mutual funds, Aarthvaahini Financial Services Pvt. Ltd. delivers secure, transparent, and growth-focused financial services across India.",

    image: advisor21,
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return ( 
    
    <section 
    id="hero"
     className="relative h-screen w-full overflow-hidden">

      {/* SLIDER */}

      {/* eslint-disable-next-line react/no-inline-styles */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-screen min-w-full"
          >
            {/* BACKGROUND IMAGE */}

            <img
              src={slide.image}
              alt="hero"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-black/55" />

            {/* CONTENT */}

            <div className="relative z-10 flex h-full items-center">
              <div className="container mx-auto px-6">

                {/* LEFT CONTENT */}

                <div className="max-w-3xl">

                  <h1 className="text-5xl font-bold leading-tight text-black md:text-7xl">
                    {slide.title}
                    
                  </h1>
                      
       
        

                  <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
                    {slide.subtitle}

                  </p>

                  {/* FIRST SLIDE BUTTONS ONLY */}

                  {current === 0 && (
                    <div className="mt-10 flex flex-wrap gap-5">

                      <Link to="/contact">
                        <Button className="h-14 rounded-xl bg-linear-to-r from-[#17357e] to-blue-600 px-8 text-lg font-semibold text-white transition-all hover:scale-105">

                          Free Consultation

                          <ArrowRight className="ml-2 h-5 w-5" />

                        </Button>
                      </Link>

                      <Link to="/about">
                        <Button
                          variant="outline"
                          className="h-14 rounded-xl border-white bg-transparent px-8 text-lg font-semibold text-white hover:bg-white hover:text-black"
                        >
                          Meet Our Team
                        </Button>
                      </Link>

                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE BUTTONS BOTTOM */}

      <div className="absolute bottom-24 right-10 z-20 hidden flex-wrap items-center gap-5 lg:flex">

        <Link to="/loans">
          <div className="flex min-w-60 items-center gap-4 rounded-2xl border border-green-200/40 bg-white/10 px-6 py-4 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20">

            <Wallet className="h-7 w-7 text-blue-400" />

            <div>
              <h3 className="text-lg font-semibold">
                Loans
              </h3>

              <p className="text-sm text-gray-300">
                Quick Loans
              </p>
            </div>

          </div>
        </Link>

        <Link to="/insurance">
          <div className="flex min-w-60 items-center gap-4 rounded-2xl border border-green-200/40 bg-white/10 px-6 py-4 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20">

            <ShieldCheck className="h-7 w-7 text-pink-400" />

            <div>
              <h3 className="text-lg font-semibold">
                Insurance
              </h3>

              <p className="text-sm text-gray-300">
                Secure Insurance
              </p>
            </div>

          </div>
        </Link>

        <Link to="/mutual-funds">
          <div className="flex min-w-60 items-center gap-4 rounded-2xl border border-green-200/40 bg-white/10 px-6 py-4 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20">

            <TrendingUp className="h-7 w-7 text-green-400" />

            <div>
              <h3 className="text-lg font-semibold">
                Mutual Funds 
              </h3>

              <p className="text-sm text-gray-300">
                Wealth Growth
              </p>
            </div>

          </div>
        </Link>

      </div>

    

      {/* <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
      >
        <ChevronLeft className="h-7 w-7 text-white" />
      </button> */}

      {/* RIGHT ARROW

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
      >
        <ChevronRight className="h-7 w-7 text-white" />
      </button> */}

      {/* DOTS */}

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all ${
              current === index
                ? "w-10 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}

      </div>

      {/* BOTTOM GRADIENT */}

      <div className="absolute bottom-0 left-0 h-40 w-full bg-linear-to-t from-black/70 to-transparent" />

    </section>
  );
}