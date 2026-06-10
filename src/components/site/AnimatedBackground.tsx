import { type CSSProperties } from "react";

type Variant = "loans" | "insurance" | "mutual-funds";

const PRESETS: Record<Variant, {
  tint: string;
  blob1: string;
  blob2: string;
  blob3: string;
  video: string;
  poster: string;
}> = {
  loans: {
    tint: "from-blue-200/80 via-sky-100/70 to-indigo-100/60",
    blob1: "bg-blue-400/40",
    blob2: "bg-sky-400/40",
    blob3: "bg-indigo-400/35",
    // City / finance buildings loop
    video: "https://cdn.coverr.co/videos/coverr-a-businessman-counting-money-2633/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=70",
  },
  insurance: {
    tint: "from-emerald-200/80 via-teal-100/70 to-cyan-100/60",
    blob1: "bg-emerald-400/40",
    blob2: "bg-teal-400/40",
    blob3: "bg-cyan-400/35",
    video: "https://cdn.coverr.co/videos/coverr-family-walking-on-the-beach-2584/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=70",
  },
  "mutual-funds": {
    tint: "from-amber-200/80 via-orange-100/70 to-rose-100/60",
    blob1: "bg-amber-400/45",
    blob2: "bg-orange-400/40",
    blob3: "bg-rose-400/35",
    video: "https://cdn.coverr.co/videos/coverr-stock-market-graph-2633/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=70",
  },
};

export function AnimatedBackground({ variant }: { variant: Variant }) {
  const preset = PRESETS[variant];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Video background layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={preset.poster}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={preset.video} type="video/mp4" />
      </video>

      {/* Color tint over the video to keep content readable */}
      <div className={`absolute inset-0 bg-gradient-to-br ${preset.tint} mix-blend-soft-light`} />
      <div className="absolute inset-0 bg-white/40" />

      {/* Animated gradient blobs (clearly visible) */}
      <div className={`absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full ${preset.blob1} blur-3xl animate-blob`} />
      <div
        className={`absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full ${preset.blob2} blur-3xl animate-blob`}
        style={{ animationDelay: "3s" } as CSSProperties}
      />
      <div
        className={`absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full ${preset.blob3} blur-3xl animate-blob`}
        style={{ animationDelay: "6s" } as CSSProperties}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}
