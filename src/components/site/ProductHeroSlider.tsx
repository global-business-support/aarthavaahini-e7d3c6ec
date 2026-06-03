import { useEffect, useState } from "react";

type Slide = { title: string; subtitle: string; image: string };

export function ProductHeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-[340px] w-full overflow-hidden md:h-[420px]">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f4d]/85 via-[#17357e]/60 to-transparent" />
          <div className="container relative mx-auto flex h-full items-center px-6">
            <div className="max-w-xl text-white">
              <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
                {s.title}
              </h2>
              <p className="mt-3 text-sm text-white/90 md:text-lg">{s.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`slide-${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${
              i === idx ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
