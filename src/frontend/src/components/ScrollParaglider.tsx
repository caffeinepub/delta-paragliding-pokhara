import { useEffect, useRef, useState } from "react";

export default function ScrollSkydiver() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll from top to bottom of viewport
  const topPercent = scrollProgress * 85; // 0% → 85% down the screen
  // Gentle rotation: tumbles slightly as it falls
  const rotation = scrollProgress * 25 - 5;
  // Subtle horizontal sway
  const sway = Math.sin(scrollProgress * Math.PI * 2.5) * 6;
  // Slight scale change: slightly larger as it "gets closer"
  const scale = 0.55 + scrollProgress * 0.2;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <img
        src="/assets/generated/skydiver-freefall-transparent.dim_800x800.png"
        alt="Skydiver in freefall"
        style={{
          position: "absolute",
          top: `${topPercent}%`,
          left: `${48 + sway}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
          width: "220px",
          height: "220px",
          objectFit: "contain",
          filter:
            "drop-shadow(0 8px 32px rgba(255,120,0,0.35)) drop-shadow(0 0 16px rgba(0,120,255,0.2))",
          transition: "none",
          willChange: "transform, top, left",
        }}
      />
    </div>
  );
}
