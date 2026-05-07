import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps children in a 3D scroll scene where each direct child section
 * appears to recede into the background (translateZ + scale + fade) as
 * the user scrolls past it.
 */
export function ScrollScene({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];
    sections.forEach((s) => {
      s.style.transformStyle = "preserve-3d";
      s.style.willChange = "transform, opacity";
      s.style.transition = "transform 120ms linear, opacity 120ms linear";
    });

    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // progress: 0 when section top is at viewport top, 1 when fully scrolled past
        const progress = Math.min(
          1,
          Math.max(0, (-rect.top) / Math.max(rect.height, vh * 0.6))
        );
        const translateZ = -progress * 600; // px
        const scale = 1 - progress * 0.18;
        const rotateX = progress * 8; // subtle tilt
        const opacity = 1 - progress * 0.55;
        el.style.transform = `perspective(1400px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
