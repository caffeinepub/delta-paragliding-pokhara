import { useEffect, useRef, useState } from "react";

interface Stage {
  id: string;
  num: string;
  icon: string;
  status: string;
  title: string;
  mainStat: { label: string; value: number; unit: string; suffix?: string };
  subStats: { label: string; value: string }[];
}

const STAGES: Stage[] = [
  {
    id: "jump",
    num: "01",
    icon: "✈",
    status: "AIRCRAFT EXIT",
    title: "JUMP ALTITUDE",
    mainStat: {
      label: "ALTITUDE",
      value: 15000,
      unit: "ft",
      suffix: "/ 4,572 m",
    },
    subStats: [
      { label: "AIRCRAFT", value: "Twin Otter" },
      { label: "CLIMB TIME", value: "~20 min" },
    ],
  },
  {
    id: "freefall",
    num: "02",
    icon: "⬇",
    status: "TERMINAL VELOCITY",
    title: "FREEFALL",
    mainStat: { label: "MAX SPEED", value: 200, unit: "km/h" },
    subStats: [
      { label: "DURATION", value: "~60 sec" },
      { label: "G-FORCE", value: "1.0G" },
    ],
  },
  {
    id: "chute",
    num: "03",
    icon: "🪂",
    status: "CANOPY OPEN",
    title: "PARACHUTE DEPLOYMENT",
    mainStat: {
      label: "DEPLOY ALT",
      value: 5500,
      unit: "ft",
      suffix: "/ 1,676 m",
    },
    subStats: [
      { label: "SPEED DROP", value: "200 → 20 km/h" },
      { label: "CANOPY SIZE", value: "~200 sq ft" },
    ],
  },
  {
    id: "landing",
    num: "04",
    icon: "◎",
    status: "MISSION COMPLETE",
    title: "LANDING",
    mainStat: { label: "FLIGHT TIME", value: 7, unit: "min" },
    subStats: [
      { label: "LANDING ZONE", value: "Pokhara Valley" },
      { label: "TOUCHDOWN", value: "Soft & Precise" },
    ],
  },
];

function useCountUp(target: number, started: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    let raf: number;
    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return value;
}

function HUDCard({
  stage,
  started,
  index,
}: { stage: Stage; started: boolean; index: number }) {
  const count = useCountUp(stage.mainStat.value, started, 1500 + index * 200);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex flex-col p-5 rounded-xl flex-1"
      style={{
        background: "rgba(0,10,30,0.85)",
        border: "1px solid rgba(39,215,255,0.3)",
        boxShadow:
          "0 0 20px rgba(39,215,255,0.12), inset 0 0 30px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        minWidth: 0,
      }}
    >
      {/* Stage number */}
      <span
        className="font-mono text-xs mb-2"
        style={{ color: "rgba(39,215,255,0.35)", letterSpacing: "0.2em" }}
      >
        {stage.num}
      </span>

      {/* Status row */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="rounded-full w-2 h-2 flex-shrink-0"
          style={{
            background: blink && started ? "#00FF7F" : "rgba(0,255,127,0.25)",
            boxShadow: blink && started ? "0 0 6px #00FF7F" : "none",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
        />
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "rgba(0,255,127,0.8)", fontSize: "0.6rem" }}
        >
          {stage.status}
        </span>
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{stage.icon}</span>
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.6rem" }}
        >
          {stage.title}
        </span>
      </div>

      {/* Main stat */}
      <div className="mb-1">
        <span
          className="font-mono text-xs block mb-1"
          style={{
            color: "rgba(39,215,255,0.5)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
          }}
        >
          {stage.mainStat.label}
        </span>
        <div className="flex items-end gap-1 flex-wrap">
          <span
            className="font-mono font-bold leading-none"
            style={{
              color: "#27D7FF",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              textShadow:
                "0 0 12px rgba(39,215,255,0.9), 0 0 30px rgba(39,215,255,0.4)",
            }}
          >
            {count.toLocaleString()}
          </span>
          <span
            className="font-mono text-sm pb-1"
            style={{ color: "rgba(39,215,255,0.6)" }}
          >
            {stage.mainStat.unit}
          </span>
        </div>
        {stage.mainStat.suffix && (
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem" }}
          >
            {stage.mainStat.suffix}
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        className="my-3"
        style={{ height: "1px", background: "rgba(39,215,255,0.15)" }}
      />

      {/* Sub stats */}
      {stage.subStats.map((s) => (
        <div key={s.label} className="flex justify-between items-center mb-1">
          <span
            className="font-mono"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
            }}
          >
            {s.label}
          </span>
          <span
            className="font-mono"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.65rem" }}
          >
            {s.value}
          </span>
        </div>
      ))}

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-6 h-6"
        style={{
          borderTop: "2px solid rgba(39,215,255,0.6)",
          borderRight: "2px solid rgba(39,215,255,0.6)",
          borderRadius: "0 12px 0 0",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6"
        style={{
          borderBottom: "2px solid rgba(39,215,255,0.3)",
          borderLeft: "2px solid rgba(39,215,255,0.3)",
          borderRadius: "0 0 0 12px",
        }}
      />
    </div>
  );
}

export default function SkyDivingFlightPath() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  return (
    <section className="py-20 px-4" style={{ background: "#050B14" }}>
      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-mono text-xs tracking-[0.5em] mb-3"
            style={{ color: "#27D7FF" }}
          >
            ◈ FLIGHT TELEMETRY ◈
          </p>
          <h2
            className="font-cinematic text-3xl md:text-5xl mb-4"
            style={{
              color: "#fff",
              textShadow: "0 0 40px rgba(39,215,255,0.3)",
            }}
          >
            YOUR SKYDIVING FLIGHT PATH
          </h2>
          <p
            className="font-mono text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            REAL-TIME TELEMETRY DATA — POKHARA DROP ZONE
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(39,215,255,0.4)",
              }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: "rgba(39,215,255,0.5)", fontSize: "0.55rem" }}
            >
              SYS ONLINE
            </span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "rgba(39,215,255,0.4)",
              }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row gap-4 items-stretch relative"
        >
          {/* Connecting line desktop */}
          <div
            className="hidden md:block absolute top-1/2 left-0 right-0"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg,rgba(39,215,255,0.05),rgba(39,215,255,0.4) 20%,rgba(39,215,255,0.4) 80%,rgba(39,215,255,0.05))",
              boxShadow: "0 0 8px rgba(39,215,255,0.3)",
              zIndex: 0,
              transform: "translateY(-50%)",
            }}
          />

          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              className="flex-1 flex flex-col md:flex-row items-stretch"
              style={{ zIndex: 1 }}
            >
              <HUDCard stage={stage} started={started} index={i} />
              {i < STAGES.length - 1 && (
                <div
                  className="hidden md:flex items-center justify-center px-1 flex-shrink-0"
                  style={{ width: "32px", zIndex: 2 }}
                >
                  <span
                    className="font-mono text-lg"
                    style={{
                      color: "rgba(39,215,255,0.5)",
                      textShadow: "0 0 8px rgba(39,215,255,0.8)",
                    }}
                  >
                    ›
                  </span>
                </div>
              )}
              {i < STAGES.length - 1 && (
                <div
                  className="md:hidden flex justify-center py-2"
                  style={{ color: "rgba(39,215,255,0.4)" }}
                >
                  <span
                    className="font-mono text-lg"
                    style={{ textShadow: "0 0 8px rgba(39,215,255,0.8)" }}
                  >
                    ↓
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom telemetry bar */}
        <div
          className="mt-8 p-4 rounded-xl flex flex-wrap gap-4 justify-between items-center"
          style={{
            background: "rgba(0,10,30,0.6)",
            border: "1px solid rgba(39,215,255,0.15)",
          }}
        >
          {[
            { label: "DROP ZONE", value: "SARANGKOT, POKHARA" },
            { label: "ELEVATION", value: "800 m AMSL" },
            { label: "WEATHER", value: "CLEAR / VFR" },
            { label: "OPERATOR", value: "DELTA S&P" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span
                className="font-mono"
                style={{
                  color: "rgba(39,215,255,0.5)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                }}
              >
                {item.label}
              </span>
              <span
                className="font-mono text-xs"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "0.08em",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
