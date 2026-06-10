import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const BUSINESS_PHONE = "919000000000"; // E.164 without '+'

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const send = () => {
    const text = `Hi Aarthvaahini Team,%0A%0AMy name is ${encodeURIComponent(name || "—")}.%0A${encodeURIComponent(msg || "I need help with your services.")}`;
    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 animate-fade-in rounded-2xl border border-green-200 bg-white p-4 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Chat with us</div>
                <div className="text-[10px] text-green-600">● Online now</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700">
              <X className="h-4 w-4" />
            </button>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-400"
          />
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={3}
            placeholder="How can we help you?"
            className="mb-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-400"
          />
          <button
            onClick={send}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-green-600"
          >
            <Send className="h-3.5 w-3.5" /> Send on WhatsApp
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/40 transition-all hover:scale-110 hover:bg-green-600",
        )}
        aria-label="WhatsApp"
      >
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-green-400 opacity-40" />
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-7 w-7" />}
      </button>
    </div>
  );
}
