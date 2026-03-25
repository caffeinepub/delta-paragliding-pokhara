import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            const staggered = e.target.querySelectorAll("[data-stagger]");
            staggered.forEach((child, idx) => {
              (child as HTMLElement).style.transitionDelay = `${idx * 110}ms`;
            });
          }
        }
      },
      { threshold: 0.12 },
    );
    const selectors =
      ".fade-in-up, .fade-in, .reveal-left, .reveal-right, .reveal-scale, .neon-sweep-line";
    for (const el of Array.from(document.querySelectorAll(selectors))) {
      obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);
}
