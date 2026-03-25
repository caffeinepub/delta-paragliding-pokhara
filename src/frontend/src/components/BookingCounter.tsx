import { useEffect, useRef, useState } from "react";

export default function BookingCounter() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const end = 47;
          const duration = 1800;
          const step = Math.ceil(duration / end);
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, step);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { label: "Average Rating", value: "4.9★" },
    { label: "Happy Flyers", value: "2000+" },
    { label: "Safe Landings", value: "100%" },
  ];

  return (
    <section
      className="py-20 px-4"
      style={{ background: "#050B14" }}
      data-ocid="booking_counter.section"
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "rgba(0,20,50,0.7)",
            border: "1px solid rgba(39,215,255,0.3)",
            boxShadow: "0 0 60px rgba(39,215,255,0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Glow background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(39,215,255,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{
                background: "#00FF88",
                boxShadow: "0 0 8px #00FF88",
                animation: "livePulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              className="font-cinematic tracking-[0.4em] text-xs"
              style={{ color: "#00FF88" }}
            >
              LIVE
            </span>
          </div>

          {/* Big counter */}
          <div
            className="font-cinematic text-8xl md:text-9xl mb-2"
            style={{
              color: "#27D7FF",
              textShadow: "0 0 40px rgba(39,215,255,0.6)",
              lineHeight: 1,
            }}
          >
            {count}
          </div>
          <p
            className="font-cinematic tracking-[0.3em] text-lg md:text-xl mb-12"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            PEOPLE BOOKED THIS WEEK
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-cinematic text-2xl md:text-3xl mb-1"
                  style={{ color: "#FF7A1A" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
