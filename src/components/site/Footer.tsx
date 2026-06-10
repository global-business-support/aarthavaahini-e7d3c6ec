

import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo.png";
import headingLogo from "@/assets/heading-logo.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  LogIn,
} from "lucide-react";
import { WhatsAppFab } from "./WhatsAppFab";


export function Footer() {

  return (

    <footer
      id="contact"
      className=" border/60 bg-secondary/30 bg-white"
    >

      {/* FAQ SECTION */}

      <div
        id="faqs"
        className="border/60 px-6 py-16"
      >

        <div className="container mx-auto max-w-4xl">

          <div className="text-center">

            <h2 className="font-display text-5xl font-bold text-foreground">

              Frequently

              <span className="text-gradient">
                {" "}Asked Questions
              </span>

            </h2>

            <p className="mt-3 text-muted-foreground">
              Get answers related to loans,
              insurance, mutual funds and investments.
            </p>

          </div>

          <div className="mt-10 rounded-3xl bg-card p-6 shadow-soft">

            <Accordion
              type="single"
              collapsible
              className="w-full"
            >

              <AccordionItem value="item-1">

                <AccordionTrigger>
                  Which loan is best for business expansion?
                </AccordionTrigger>

                <AccordionContent>
                  Business loans and working capital loans
                  are commonly used for expansion.
                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="item-2">

                <AccordionTrigger>
                  How to check home loan eligibility?
                </AccordionTrigger>

                <AccordionContent>
                  Eligibility depends on income,
                  credit profile and repayment capacity.
                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="item-3">

                <AccordionTrigger>
                  Why invest in SIP?
                </AccordionTrigger>

                <AccordionContent>
                  SIP helps in disciplined wealth creation
                  and long-term investing.
                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="item-4">

                <AccordionTrigger>
                  Why is insurance important?
                </AccordionTrigger>

                <AccordionContent>
                  Insurance provides financial protection
                  during emergencies.
                </AccordionContent>

              </AccordionItem>

              <AccordionItem value="item-5">

                <AccordionTrigger>
                  Can I apply online?
                </AccordionTrigger>

                <AccordionContent>
                  Yes, you can apply online for loans,
                  insurance and investments.
                </AccordionContent>

              </AccordionItem>

            </Accordion>

          </div>

        </div>

      </div>

      {/* FOOTER CONTENT */}

      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-6">

        {/* COMPANY INFO */}

        <div className="flex flex-col">

          <div className="flex items-center gap-0">

            <div className="flex h-14 overflow-hidden rounded-2xl">

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

          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">

            Trusted financial platform offering
            loans, insurance and investment solutions
            across India.

          </p>

        </div>

        {/* PRODUCTS */}

        <div className="flex flex-col">

          <h3 className="font-bold text-foreground">
            Products
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">

            <Link
              to="/loans"
              className="hover:text-primary"
            >
              Loan
            </Link>

            
           

            <Link
              to="/insurance"
              className="hover:text-primary"
            >
              Insurance
            </Link>

            <Link
              to="/mutual-funds"
              className="hover:text-primary"
            >
              Mutual Funds
            </Link>
           
              {/* <Link
              to="/banking"
              className="hover:text-primary"
            >
              Banking
            </Link> */}
          </div>

        </div>

        {/* TOOLS */}

        <div className="flex flex-col">

          <h3 className="font-bold text-foreground">
            Tools
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">

             <Link
        to="/"
      hash="calculator"
     className="hover:text-primary"
      >
         EMI Calculator
         </Link>

           <Link
          to="/"
           hash="cibil"
           className="hover:text-primary"
              >
            CIBIL Score
            </Link>

           <Link
  to="/"
  hash="sip"
  className="hover:text-primary"
>
  SIP Planner
</Link>

          </div>

        </div>

        {/* COMPANY */}

        <div className="flex flex-col">

          <h3 className="font-bold text-foreground">
            Company
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">

            <Link
              to="/about"
              className="hover:text-primary"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-primary"
            >
              Contact
            </Link>
            <Link
  to="/blogs"
  className="hover:text-primary"
>
  Blogs
</Link>
            <a
              href="#faqs"
              className="hover:text-primary"
            >
              FAQs
            </a>

          </div>

        </div>

        {/* CONTACT INFO */}

        <div className="flex flex-col">

          <h3 className="font-bold text-foreground">
            Contact Info
          </h3>

          <div className="mt-4 flex flex-col gap-4 text-sm text-muted-foreground">

            <div className="flex items-center gap-3">

              <Phone className="h-4 w-4 text-primary" />

              <span>+91 90000 00000</span>

            </div>

            <div className="flex items-center gap-3">

              <Mail className="h-4 w-4 text-primary" />

              <span>support@aarthvaahini.com</span>

            </div>

            <div className="flex items-start gap-3">

              <MapPin className="mt-1 h-4 w-4 text-primary" />

              <span>Mumbai, Maharashtra, India</span>

            </div>

          </div>

        </div>

        {/* FOLLOW US */}

        <div className="flex flex-col">

          <h3 className="font-bold text-foreground">
            Follow Us
          </h3>

          <div className="mt-4 flex flex-col gap-4">

            <a
              href="https://www.facebook.com/profile.php?id=61590224307837"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-blue-600"
            >

              <Facebook className="h-5 w-5" />

              Facebook

            </a>

            <a
              href="https://instagram.com/aarthvaahini_fin_pvt_ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-pink-600"
            >

              <Instagram className="h-5 w-5" />

              Instagram

            </a>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-border/60 py-5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Aarthvaahini Financial Services Pvt. Ltd. All rights reserved.
          </p>
          <Link
            to="/crm/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-[12px] font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <LogIn className="h-3.5 w-3.5" />
            CRM Login
          </Link>
        </div>
      </div>


    </footer>

  );
}