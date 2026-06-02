// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// type Props = {
//   productType: "loan" | "insurance" | "mutual_fund" | "banking" | "contact" | "cibil";
//   productName?: string;
//   showAmount?: boolean;
//   showMessage?: boolean;
//   buttonLabel?: string;
//   amountLabel?: string;
// };

// export function LeadForm({
//   productType, productName, showAmount, showMessage,
//   buttonLabel = "Submit Enquiry", amountLabel = "Amount Required (₹)",
// }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ full_name: "", email: "", phone: "", amount: "", loan_type:"",amount:"", monthly_income: "",  employment_type:"",message: "" });

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (form.full_name.trim().length < 2) return toast.error("Apna naam likhe");
//     if (form.phone.trim().length < 7) return toast.error("Sahi mobile number daale");
//     setLoading(true);
//     const { error } = await supabase.from("leads").insert({
//       full_name: form.full_name.trim(),
//       email: form.email.trim() || null,
//       phone: form.phone.trim(),
//       product_type: productType,
//       product_name: productName ?? null,
//       amount: form.amount ? Number(form.amount) : null,
//       message: form.message.trim() || null,
//     });
//     setLoading(false);
//     if (error) return toast.error("Submit nahi hua: " + error.message);
//     toast.success("Dhanyavaad! Hum jald aapse sampark karenge.");
//     setForm({ full_name: "", email: "", phone: "", amount: "", loan_type:"",amount:"", monthly_income: "",  employment_type:"",message: "" });

//   return (
//     <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
//       <div className="sm:col-span-2">
//         <Label htmlFor="ln">Full Name *</Label>
//         <Input id="ln" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1.5 h-11" required />
//       </div>
//       <div>
//         <Label htmlFor="le">Email</Label>
//         <Input id="le" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 h-11" />
//       </div>
//       <div>
//         <Label htmlFor="lp">Mobile *</Label>
//         <Input id="lp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 h-11" required />
//       </div>
//       <div>
//         <Label htmlFor="lp">Loan Type *</Label>
//         <Input id="lp" value={form.loan_type} onChange={(e) => setForm({ ...form, loan_type: e.target.value })} className="mt-1.5 h-11" required />
//       </div>
//       {showAmount && (
//         <div className="sm:col-span-2">
//           <Label htmlFor="la">{amountLabel}</Label>
//           <Input id="la" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="mt-1.5 h-11" />
//         </div>
//       )}
//        {showmonthlyincome && (
//         <div className="sm:col-span-2">
//           <Label htmlFor="la">{monthly incomeLabel}</Label>
//           <Input id="la" type="number" value={form.monthly_income} onChange={(e) => setForm({ ...form, monthly_income: e.target.value })} className="mt-1.5 h-11" />
//         </div>
//       )}
//        {showemploymenttype && (
//         <div className="sm:col-span-2">
//           <Label htmlFor="la">{employment typeLabel}</Label>
//           <Input id="la" type="number" value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })} className="mt-1.5 h-11" />
//         </div>
//       )}
//       {showMessage && (
//         <div className="sm:col-span-2">
//           <Label htmlFor="lm">Message</Label>
//           <Textarea id="lm" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" rows={4} />
//         </div>
//       )}
//       <Button type="submit" disabled={loading} size="lg" className="sm:col-span-2 bg-gradient-primary text-primary-foreground shadow-glow">
//         {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{buttonLabel}
//       </Button>
//     </form>
//   );
// }
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// type Props = {
//   productType:
//     | "loan"
//     | "insurance"
//     | "mutual_fund"
//     | "banking"
//     | "contact"
//     | "cibil";

//   productName?: string;
//   buttonLabel?: string;
// };

// export function LeadForm({
//   productType,
//   productName,
//   buttonLabel = "Submit Enquiry",
// }: Props) {

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     loan_type: "",
//     amount: "",
//     monthly_income: "",
//     employment_type: "",
//     message: "",
//   });

//   const submit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     setLoading(true);

//     const { error } = await supabase
//       .from("leads")
//       .insert({
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         loan_type: form.loan_type,
//         amount: Number(form.amount),
//         monthly_income: Number(form.monthly_income),
//         employment_type: form.employment_type,
//         message: form.message || null,
//         product_type: productType,
//         product_name: productName || null,
//       });

//     setLoading(false);

//     if (error) {

//       toast.error(error.message);

//       return;
//     }

//     toast.success(
//       "Lead Submitted Successfully!"
//     );

//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       loan_type: "",
//       amount: "",
//       monthly_income: "",
//       employment_type: "",
//       message: "",
//     });
//   };

//   return (

//     <form
//       onSubmit={submit}
//       className="grid gap-4 sm:grid-cols-2"
//     >

//       {/* NAME */}

//       <div className="sm:col-span-2">

//         <Label>Full Name</Label>

//         <Input
//           value={form.name}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               name: e.target.value,
//             })
//           }
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* EMAIL */}

//       <div>

//         <Label>Email</Label>

//         <Input
//           type="email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               email: e.target.value,
//             })
//           }
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* PHONE */}

//       <div>

//         <Label>Phone</Label>

//         <Input
//           value={form.phone}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               phone: e.target.value,
//             })
//           }
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* LOAN TYPE */}

//       <div>

//         <Label>Loan Type</Label>

//         <Input
//           value={form.loan_type}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               loan_type: e.target.value,
//             })
//           }
//           placeholder="Personal Loan"
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* AMOUNT */}

//       <div>

//         <Label>Loan Amount</Label>

//         <Input
//           type="number"
//           value={form.amount}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               amount: e.target.value,
//             })
//           }
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* MONTHLY INCOME */}

//       <div>

//         <Label>Monthly Income</Label>

//         <Input
//           type="number"
//           value={form.monthly_income}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               monthly_income: e.target.value,
//             })
//           }
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* EMPLOYMENT TYPE */}

//       <div>

//         <Label>Employment Type</Label>

//         <Input
//           value={form.employment_type}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               employment_type: e.target.value,
//             })
//           }
//           placeholder="Salaried / Self Employed"
//           className="mt-1.5 h-11"
//           required
//         />

//       </div>

//       {/* MESSAGE */}

//       <div className="sm:col-span-2">

//         <Label>Message</Label>

//         <Textarea
//           rows={4}
//           value={form.message}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               message: e.target.value,
//             })
//           }
//           className="mt-1.5"
//         />

//       </div>

//       {/* BUTTON */}

//       <Button
//         type="submit"
//         disabled={loading}
//         className="sm:col-span-2 bg-gradient-to-r from-[#17357e] to-blue-600 text-white h-11"
//       >

//         {loading && (
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//         )}

//         {buttonLabel}

//       </Button>

//     </form>
//   );
// }
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "@/integrations/supabase/client";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// type Props = {
//   productType:
//     | "loan"
//     | "insurance"
//     | "mutual_fund"
//     | "banking"
//     | "contact"
//     | "cibil";

//   productName?: string;
//   buttonLabel?: string;
// };

// export function LeadForm({
//   productType,
//   productName,
//   buttonLabel = "Submit Enquiry",
// }: Props) {

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     loan_type: "",
//     amount: "",
//     monthly_income: "",
//     employment_type: "",
//     message: "",
//   });

//   const submit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     setLoading(true);

//     const { error } = await supabase
//       .from("leads")
//       .insert({
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         loan_type: form.loan_type,
//         amount: Number(form.amount),
//         monthly_income: Number(form.monthly_income),
//         employment_type: form.employment_type,
//         message: form.message || null,
//         product_type: productType,
//         product_name: productName || null,
//       });

//     setLoading(false);

//     if (error) {

//       toast.error(error.message);

//       return;
//     }

//     toast.success("Lead Submitted Successfully!");

//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       loan_type: "",
//       amount: "",
//       monthly_income: "",
//       employment_type: "",
//       message: "",
//     });
//   };

//   return (

//    <form
//   onSubmit={submit}
//   className="grid gap-4 sm:grid-cols-2 bg-white"
// >

//       {/* FULL NAME */}

//       <div className="md:col-span-2">

//         <Label>Full Name</Label>

//         <Input
//           value={form.name}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               name: e.target.value,
//             })
//           }
//          className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* EMAIL */}

//       <div>

//         <Label>Email</Label>

//         <Input
//           type="email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               email: e.target.value,
//             })
//           }
//           className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* PHONE */}

//       <div>

//         <Label>Phone</Label>

//         <Input
//           value={form.phone}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               phone: e.target.value,
//             })
//           }
//          className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* LOAN TYPE */}

//       <div>

//         <Label>Loan Type</Label>

//         <Input
//           value={form.loan_type}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               loan_type: e.target.value,
//             })
//           }
//           placeholder="Personal Loan"
//           className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* AMOUNT */}

//       <div>

//         <Label>Loan Amount</Label>

//         <Input
//           type="number"
//           value={form.amount}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               amount: e.target.value,
//             })
//           }
//           className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* MONTHLY INCOME */}

//       <div>

//         <Label>Monthly Income</Label>

//         <Input
//           type="number"
//           value={form.monthly_income}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               monthly_income: e.target.value,
//             })
//           }
//           className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* EMPLOYMENT TYPE */}

//       <div>

//         <Label>Employment Type</Label>

//         <Input
//           value={form.employment_type}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               employment_type: e.target.value,
//             })
//           }
//           placeholder="Salaried / Self Employed"
//           className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* MESSAGE */}

//       <div className="md:col-span-2">

//         <Label>Message</Label>

//         <Textarea
//           rows={4}
//           value={form.message}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               message: e.target.value,
//             })
//           }
//           className="mt-1.5 bg-white border border-gray-300"
//         />

//       </div>

//       {/* BUTTON */}

//       <Button
//         type="submit"
//         disabled={loading}
//         className="md:col-span-2 h-12 rounded-xl bg-gradient-to-r from-[#17357e] to-blue-600 text-white text-base font-semibold"
//       >

//         {loading && (
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//         )}

//         {buttonLabel}

//       </Button>

//     </form>
//   );
// }
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  productType:
    | "loan"
    | "insurance"
    | "mutual_fund"
    | "banking"
    | "contact"
    | "cibil";

  productName?: string;
  buttonLabel?: string;
};

export function LeadForm({
  productType,
  productName,
  buttonLabel = "Submit Enquiry",
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loan_type: "",
    amount: "",
    monthly_income: "",
    employment_type: "",
    message: "",
  });

  const submit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("leads")
      .insert({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        amount: form.amount ? Number(form.amount) : null,
        message: form.message || null,
        product_type: productType,
        product_name: productName || null,
      });

    setLoading(false);

    if (error) {

      toast.error(error.message);

      return;
    }

    toast.success("Lead Submitted Successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      loan_type: "",
      amount: "",
      monthly_income: "",
      employment_type: "",
      message: "",
    });
  };

 return (

  <div className="w-full rounded-[32px] bg-white p-6 sm:p-8">

    <div className="mb-6">

      <h2 className="text-3xl font-bold text-[#17357e]">
        Apply for Loan
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Fill in your details and our expert will contact you shortly.
      </p>

    </div>

    <form
      onSubmit={submit}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >

      {/* FULL NAME */}

      <div className="sm:col-span-2">

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Full Name
        </Label>

        <Input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="Enter your full name"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4 text-base shadow-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />

      </div>

      {/* EMAIL */}

      <div>

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Email
        </Label>

        <Input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          placeholder="Enter email"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4"
        />

      </div>

      {/* PHONE */}

      <div>

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Phone
        </Label>

        <Input
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
          placeholder="Enter mobile number"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4"
        />

      </div>

      {/* LOAN TYPE */}

      <div>

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Loan Type
        </Label>

        <Input
          value={form.loan_type}
          onChange={(e) =>
            setForm({
              ...form,
              loan_type: e.target.value,
            })
          }
          placeholder="Personal Loan"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4"
        />

      </div>

      {/* AMOUNT */}

      <div>

        <Label className="mb-2 block text-sm font-medium text-gray-600">
        Amount
        </Label>

        <Input
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: e.target.value,
            })
          }
          placeholder="₹ 5,00,000"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4"
        />

      </div>

      {/* MONTHLY INCOME */}

      <div>

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Monthly Income
        </Label>

        <Input
          type="number"
          value={form.monthly_income}
          onChange={(e) =>
            setForm({
              ...form,
              monthly_income: e.target.value,
            })
          }
          placeholder="₹ 50,000"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4"
        />

      </div>

      {/* EMPLOYMENT TYPE */}

      <div>

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Employment Type
        </Label>

        <Input
          value={form.employment_type}
          onChange={(e) =>
            setForm({
              ...form,
              employment_type: e.target.value,
            })
          }
          placeholder="Salaried / Self Employed"
          className="h-12 rounded-2xl border-gray-200 bg-gray-50 px-4"
        />

      </div>

      {/* MESSAGE */}

      <div className="sm:col-span-2">

        <Label className="mb-2 block text-sm font-medium text-gray-600">
          Message
        </Label>

        <Textarea
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm({
              ...form,
              message: e.target.value,
            })
          }
          placeholder="Write your message..."
          className="rounded-2xl border-gray-200 bg-gray-50 px-4 py-3 resize-none"
        />

      </div>

      {/* BUTTON */}

      <Button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 h-14 rounded-2xl bg-gradient-to-r from-[#17357e] to-blue-600 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01]"
      >

        {loading && (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        )}

        {buttonLabel}

      </Button>

    </form>

  </div>
);
}