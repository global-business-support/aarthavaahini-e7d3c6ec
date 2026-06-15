import { type CSSProperties } from "react";
import loanBg from "@/assets/loan-bg.jpg.asset.json";
import insuranceBg from "@/assets/insurance-bg.jpeg.asset.json";
import mutualFundBg from "@/assets/mutual-fund-bg.jpg.asset.json";

type Variant = "loans" | "insurance" | "mutual-funds";

const PRESETS: Record<Variant, {
  tint: string;
  blob1: string;
  blob2: string;
  blob3: string;
  images: string[];
}> = {
  loans: {
    tint: "from-blue-100/60 via-sky-50/50 to-indigo-100/50",
    blob1: "bg-blue-400/35",
    blob2: "bg-sky-400/35",
    blob3: "bg-indigo-400/30",
    images: [loanBg.url],
  },
  insurance: {
    tint: "from-emerald-100/60 via-teal-50/50 to-cyan-100/50",
    blob1: "bg-emerald-400/35",
    blob2: "bg-teal-400/35",
    blob3: "bg-cyan-400/30",
    images: [insuranceBg.url],
  },
  "mutual-funds": {
    tint: "from-amber-100/60 via-orange-50/50 to-rose-100/50",
    blob1: "bg-amber-400/40",
    blob2: "bg-orange-400/35",
    blob3: "bg-rose-400/30",
    images: [mutualFundBg.url],
  },
};

export function AnimatedBackground({ variant }: { variant: Variant }) {
  const preset = PRESETS[variant];
  const slides = preset.images;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Crossfading image slides */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center animate-bg-zoom animate-bg-fade"
          style={{
            backgroundImage: `url('${src}')`,
            animationDelay: `${i * (slides.length > 1 ? 24 / slides.length : 0)}s, ${
              i * (slides.length > 1 ? 24 / slides.length : 0)
            }s`,
            opacity: slides.length > 1 ? 0 : 1,
          } as CSSProperties}
        />
      ))}

      {/* Color tint + white wash for readability */}
      <div className={`absolute inset-0 bg-gradient-to-br ${preset.tint}`} />
      <div className="absolute inset-0 bg-white/30" />


      {/* Animated soft color blobs */}
      <div className={`absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full ${preset.blob1} blur-3xl animate-blob`} />
      <div
        className={`absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full ${preset.blob2} blur-3xl animate-blob`}
        style={{ animationDelay: "3s" } as CSSProperties}
      />
      <div
        className={`absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full ${preset.blob3} blur-3xl animate-blob`}
        style={{ animationDelay: "6s" } as CSSProperties}
      />

      {/* Floating finance icons for the loans variant */}
      {variant === "loans" && (
        <>
          <div className="absolute top-[12%] left-[8%] text-6xl opacity-20 animate-float">🏠</div>
          <div
            className="absolute top-[22%] right-[10%] text-6xl opacity-20 animate-float"
            style={{ animationDelay: "1.5s" } as CSSProperties}
          >
            💰
          </div>
          <div
            className="absolute bottom-[18%] left-[14%] text-6xl opacity-20 animate-float"
            style={{ animationDelay: "3s" } as CSSProperties}
          >
            🚗
          </div>
          <div
            className="absolute bottom-[24%] right-[16%] text-6xl opacity-20 animate-float"
            style={{ animationDelay: "4.5s" } as CSSProperties}
          >
            🏦
          </div>
        </>
      )}

      {/* Subtle grid overlay for finance feel */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
