import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import {Button} from "@/components/ui/button";


export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us — Aarthvaahini" },
    { name: "description", content: "Get in touch with Aarthvaahini for loans, insurance and investment queries." },
  ]}),
  component: ContactPage,
});
function ContactPage() {

  return (

    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto px-6 py-26">

        {/* HEADING */}

        <div className="mx-auto max-w-2xl text-center">

          <h1 className="font-display text-4xl font-bold sm:text-5xl">

            Contact <span className="text-gradient">Us</span>

          </h1>

          <p className="mt-4 text-muted-foreground">

            Fill the form and our team will contact you shortly.

          </p>

        </div>

        {/* CENTER FORM */}

        <div className="mt-12 flex justify-center">

          <Card className="w-full max-w-2xl rounded-3xl p-8 shadow-elegant">

            <h2 className="font-display text-2xl font-bold">

              Free Consultation

            </h2>

            <p className="mt-2 text-sm text-muted-foreground">

              Fill the form and our expert will contact you shortly.

            </p>

            <form className="mt-8 space-y-5">

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#17357e]">

                   Name

                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-blue-500"
                />

              </div>

              {/* MOBILE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#17357e]">

                  Phone

                </label>

                <input
                  type="tel"
                  placeholder="+91 98XXXXXXXX"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-blue-500"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#17357e]">

                  Email 

                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-blue-500"
                />

              </div>

              {/* SERVICE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#17357e]">

                  LoanType

                </label>

                <select
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-blue-500"
                >

                  <option>Personal Loan</option>

                  <option>Business Loan</option>

                  <option>Home Loan</option>

                  <option>Insurance</option>

                  <option>Mutual Funds</option>

                  <option>SIP Planning</option>

                </select>

              </div>
               <div>

                <label className="mb-2 block text-sm font-medium text-[#17357e]">

                   Amount

                </label>

                <input
                  type="text"
                  placeholder="Enter your amount"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none transition focus:border-blue-500"
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-[#17357e]">

                  Message

                </label>

                <textarea
                  rows={4}
                  placeholder="Write your requirement..."
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-blue-500"
                />

              </div>
             

              {/* BUTTON */}

              <Button className="h-12 w-full rounded-xl bg-linear-to-r from-[#17357e] to-blue-600 text-white transition-all hover:scale-[1.02]">

                Submit Enquiry

              </Button>

            </form>

          </Card>

        </div>

      </main>

      <Footer />

    </div>

  );
}
