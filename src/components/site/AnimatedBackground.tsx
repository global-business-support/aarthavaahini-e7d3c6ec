import { type CSSProperties } from "react";

type Variant = "loans" | "insurance" | "mutual-funds";

const PRESETS: Record<Variant, {
  tint: string;
  blob1: string;
  blob2: string;
  blob3: string;
  image: string;
}> = {
  loans: {
    tint: "from-blue-100/70 via-sky-50/60 to-indigo-100/60",
    blob1: "bg-blue-400/35",
    blob2: "bg-sky-400/35",
    blob3: "bg-indigo-400/30",
    // Finance / banking / city skyline
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80",
  },
  insurance: {
    tint: "from-emerald-100/70 via-teal-50/60 to-cyan-100/60",
    blob1: "bg-emerald-400/35",
    blob2: "bg-teal-400/35",
    blob3: "bg-cyan-400/30",
    // Family protection / umbrella
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80",
  },
  "mutual-funds": {
    tint: "from-amber-100/70 via-orange-50/60 to-rose-100/60",
    blob1: "bg-amber-400/40",
    blob2: "bg-orange-400/35",
    blob3: "bg-rose-400/30",
    // Stock market / investing growth chart
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80",
  },
};

export function AnimatedBackground({ variant }: { variant: Variant }) {
  const preset = PRESETS[variant];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Finance image background (Ken-Burns slow zoom) */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-bg-zoom"
        style={{ backgroundImage: `url('${preset.image}')` }}
      />

      {/* Color tint + white wash for readability */}
      <div className={`absolute inset-0 bg-gradient-to-br ${preset.tint}`} />
      <div className="absolute inset-0 bg-white/55" />

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

      {/* Subtle grid overlay for finance feel */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
