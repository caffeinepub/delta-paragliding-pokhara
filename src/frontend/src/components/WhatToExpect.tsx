import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    icon: "🚐",
    title: "Arrival & Briefing",
    desc: "Meet your certified pilot at our base. Safety briefing, weight check, and gear fitting. ~20 minutes.",
  },
  {
    icon: "🪂",
    title: "Gear Up",
    desc: "Professional harness fitting and helmet. Your pilot checks everything twice. Safety is our obsession.",
  },
  {
    icon: "🏔️",
    title: "Drive to Sarangkot",
    desc: "Scenic 20-minute drive to Sarangkot peak at 1,600m. The views begin before you even take off.",
  },
  {
    icon: "🦅",
    title: "Takeoff & Soar",
    desc: "A short run and you're airborne. Glide over the Himalayan foothills and Phewa Lake below.",
  },
  {
    icon: "📸",
    title: "Acrobatics & Photos",
    desc: "Optional thrilling maneuvers. Your pilot captures stunning aerial photos and video.",
  },
  {
    icon: "🎉",
    title: "Landing & Celebration",
    desc: "Smooth landing at Phewa Lake. Download your photos and share your achievement.",
  },
];

export default function WhatToExpect() {
  const [visible, setVisible] = useState<boolean[]>(
    new Array(STEPS.length).fill(false),
  );
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 100);
          }
        }
      },
      { threshold: 0.2 },
    );
    for (const el of refs.current) {
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 px-4" style={{ background: "#050B14" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            THE EXPERIENCE
          </p>
          <h2 className="font-cinematic text-4xl md:text-5xl text-white mb-4">
            WHAT TO EXPECT
          </h2>
          <div
            className="max-w-xs mx-auto h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #27D7FF, transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-idx={i}
              data-ocid={`expect.item.${i + 1}`}
              className="rounded-2xl p-6 relative transition-all duration-700"
              style={{
                background: "rgba(0,20,50,0.6)",
                border: "1px solid rgba(39,215,255,0.15)",
                backdropFilter: "blur(12px)",
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateY(0)" : "translateY(32px)",
              }}
            >
              {/* Step badge */}
              <div
                className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center font-cinematic text-xs"
                style={{
                  background: "#27D7FF",
                  color: "#050B14",
                  fontWeight: 700,
                  boxShadow: "0 0 12px rgba(39,215,255,0.6)",
                }}
              >
                {i + 1}
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{step.icon}</span>
                <div>
                  <h3
                    className="font-cinematic text-lg mb-2"
                    style={{ color: "#27D7FF" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
