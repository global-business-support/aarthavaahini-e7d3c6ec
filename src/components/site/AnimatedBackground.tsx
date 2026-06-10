import { type CSSProperties } from "react";

type Variant = "loans" | "insurance" | "mutual-funds";

const PRESETS: Record<Variant, { images: string[]; tint: string }> = {
  loans: {
    tint: "from-blue-100/70 via-sky-50/60 to-white",
    images: [
      "https://images.unsplash.com/photo-1556742400-b5b7c5121f5b?auto=format&fit=crop&w=900&q=70",
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=70",
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=900&q=70",
    ],
  },
  insurance: {
    tint: "from-emerald-100/70 via-teal-50/60 to-white",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=70",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=70",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=70",
    ],
  },
  "mutual-funds": {
    tint: "from-amber-100/70 via-orange-50/60 to-white",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=70",
      "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=900&q=70",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=900&q=70",
    ],
  },
};

export function AnimatedBackground({ variant }: { variant: Variant }) {
  const preset = PRESETS[variant];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${preset.tint}`} />

      {/* Animated gradient blobs */}
      <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-blob" />
      <div
        className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-sky-400/20 blur-3xl animate-blob"
        style={{ animationDelay: "3s" } as CSSProperties}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-300/20 blur-3xl animate-blob"
        style={{ animationDelay: "6s" } as CSSProperties}
      />

      {/* Floating themed images */}
      {preset.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className="absolute hidden md:block rounded-3xl object-cover shadow-2xl ring-1 ring-white/30 opacity-25 animate-float"
          style={{
            width: 260 + i * 30,
            height: 180 + i * 20,
            top: `${10 + i * 28}%`,
            left: i % 2 === 0 ? `${4 + i * 6}%` : "auto",
            right: i % 2 === 1 ? `${4 + i * 4}%` : "auto",
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${10 + i * 2}s`,
          } as CSSProperties}
        />
      ))}

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
