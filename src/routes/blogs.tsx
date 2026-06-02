import { createFileRoute, Link } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Landmark,
} from "lucide-react";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
});

function BlogsPage() {

  const blogs = [
    {
      title: "How to Improve Your CIBIL Score in 30 Days",
      description:
        "Learn practical ways to increase your credit score and improve your loan approval chances.",
      icon: TrendingUp,
      category: "Finance Tips",
      date: "May 2026",
      link: "/blogs/cibil-score",
    },

    {
      title: "Why SIP is the Smartest Investment for Beginners",
      description:
        "Understand how SIP investments help create long-term wealth with disciplined investing.",
      icon: ShieldCheck,
      category: "Mutual Funds",
      date: "May 2026",
      link: "/blogs/sip-guide",
    },

    {
      title: "Complete Home Loan Guide for First-Time Buyers",
      description:
        "Everything you need to know before applying for a home loan in India.",
      icon: Landmark,
      category: "Loans",
      date: "May 2026",
      link: "/blogs/home-loan-guide",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      <Header />

      <main className="container mx-auto px-6 py-28">

        {/* HERO */}

        <div className="mx-auto max-w-3xl text-center">

          <h1 className="bg-linear-to-r from-[#17357e] to-blue-600 bg-clip-text font-display text-5xl font-bold text-transparent">

            Aarthvaahini Financial Insights

          </h1>

          <p className="mt-5 text-lg text-muted-foreground">

            Expert guidance on loans, insurance, investments,
            and financial planning.

          </p>

        </div>

        {/* BLOG GRID */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {blogs.map((blog, index) => {

            const Icon = blog.icon;

            return (

              <Card
                key={index}
                className="group overflow-hidden rounded-3xl border border/50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant"
              >

                {/* TOP */}

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-[#17357e] to-blue-600 text-white">

                    <Icon className="h-7 w-7" />

                  </div>

                  <span className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-[#17357e]">

                    {blog.category}

                  </span>

                </div>

                {/* TITLE */}

                <h2 className="mt-6 text-2xl font-bold text-[#17357e]">

                  {blog.title}

                </h2>

                {/* DESCRIPTION */}

                <p className="mt-4 leading-7 text-muted-foreground">

                  {blog.description}

                </p>

                {/* DATE */}

                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">

                  <CalendarDays className="h-4 w-4" />

                  {blog.date}

                </div>

                {/* BUTTON */}

              <a
  href={blog.link}
  className="mt-7 inline-flex"
>
  <Button className="rounded-xl bg-linear-to-r from-[#17357e] to-blue-600 text-white">

    Read More

    <ArrowRight className="ml-2 h-4 w-4" />

  </Button>
</a>

              </Card>

            );
          })}

        </div>

      </main>

      <Footer />

    </div>
  );
}
