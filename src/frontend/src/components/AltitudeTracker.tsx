import { useEffect, useRef, useState } from "react";

export default function AltitudeTracker() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          let p = 0;
          const timer = setInterval(() => {
            p += 0.5;
            setProgress(Math.min(p, 100));
            if (p >= 100) clearInterval(timer);
          }, 25);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  // Path definition: cubic bezier from Sarangkot (left-top) to Phewa Lake (right-bottom)
  const W = 800;
  const H = 300;
  const startX = 80;
  const startY = 60; // 1600m
  const peakX = 280;
  const peakY = 30; // 1800m peak
  const endX = 720;
  const endY = 230; // 820m

  // Path: M start -> C control -> peak -> end
  const pathD = `M ${startX} ${startY} C ${peakX - 60} ${peakY - 20}, ${peakX + 60} ${peakY}, ${(peakX + endX) / 2} ${(peakY + endY) / 2} S ${endX - 80} ${endY + 20}, ${endX} ${endY}`;

  // Calculate point along a simplified cubic bezier
  function getPoint(t: number) {
    // Simplified: linear interpolation along key points for the paraglider position
    const points = [
      { x: startX, y: startY },
      { x: peakX, y: peakY },
      { x: (peakX + endX) / 2, y: (peakY + endY) / 2 },
      { x: endX, y: endY },
    ];
    const seg = Math.floor(t * (points.length - 1));
    const segT = t * (points.length - 1) - seg;
    const s = Math.min(seg, points.length - 2);
    return {
      x: points[s].x + (points[s + 1].x - points[s].x) * segT,
      y: points[s].y + (points[s + 1].y - points[s].y) * segT,
    };
  }

  const paragliderPos = getPoint(progress / 100);

  const altMarkers = [
    { x: startX, y: startY, label: "1,600m", sublabel: "Sarangkot Takeoff" },
    { x: peakX, y: peakY, label: "1,800m", sublabel: "Peak Altitude" },
    { x: endX, y: endY, label: "820m", sublabel: "Phewa Lake Landing" },
  ];

  return (
    <section className="py-20 px-4" style={{ background: "#050B14" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            FLIGHT SIMULATION
          </p>
          <h2 className="font-cinematic text-4xl md:text-5xl text-white mb-4">
            YOUR FLIGHT PATH
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            20–30 minute scenic flight from Sarangkot to Phewa Lake
          </p>
        </div>

        <div
          ref={ref}
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "rgba(0,10,30,0.8)",
            border: "1px solid rgba(39,215,255,0.2)",
            boxShadow: "0 0 40px rgba(39,215,255,0.1)",
          }}
        >
          <svg
            role="img"
            aria-label="Paragliding flight path from Sarangkot to Phewa Lake"
            viewBox={`0 0 ${W} ${H + 80}`}
            className="w-full"
            style={{ display: "block" }}
          >
            {/* Sky gradient */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A1628" />
                <stop offset="100%" stopColor="#071530" />
              </linearGradient>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#27D7FF" />
                <stop offset="100%" stopColor="#FF7A1A" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="progressClip">
                <rect
                  x="0"
                  y="0"
                  width={`${(progress / 100) * W}`}
                  height={H + 80}
                />
              </clipPath>
            </defs>

            <rect width={W} height={H + 80} fill="url(#skyGrad)" />

            {/* Mountain silhouette */}
            <path
              d={`M 0 ${H} L 100 ${H - 80} L 180 ${H - 50} L 280 ${H - 120} L 380 ${H - 90} L 480 ${H - 60} L 580 ${H - 100} L 680 ${H - 70} L ${W} ${H - 40} L ${W} ${H + 80} L 0 ${H + 80} Z`}
              fill="rgba(10,25,50,0.9)"
            />
            {/* Second mountain layer */}
            <path
              d={`M 0 ${H + 20} L 150 ${H - 30} L 300 ${H + 10} L 450 ${H - 20} L 600 ${H + 5} L ${W} ${H - 15} L ${W} ${H + 80} L 0 ${H + 80} Z`}
              fill="rgba(5,15,35,0.95)"
            />

            {/* Ground/lake area */}
            <rect
              x={endX - 80}
              y={endY + 30}
              width={160}
              height={40}
              rx={20}
              fill="rgba(39,100,215,0.3)"
            />
            <text
              x={endX}
              y={endY + 65}
              textAnchor="middle"
              fill="rgba(39,215,255,0.6)"
              fontSize="10"
              fontFamily="sans-serif"
            >
              Phewa Lake
            </text>

            {/* Sarangkot label */}
            <text
              x={startX}
              y={H + 20}
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
              fontSize="9"
              fontFamily="sans-serif"
            >
              Sarangkot
            </text>

            {/* Pokhara Valley label */}
            <text
              x={W / 2}
              y={H + 55}
              textAnchor="middle"
              fill="rgba(255,255,255,0.3)"
              fontSize="9"
              fontFamily="sans-serif"
            >
              Pokhara Valley
            </text>

            {/* Dotted path (full, dim) */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(39,215,255,0.15)"
              strokeWidth="3"
              strokeDasharray="8 6"
            />

            {/* Animated path (revealed by progress) */}
            <g clipPath="url(#progressClip)">
              <path
                d={pathD}
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="3"
                filter="url(#glowFilter)"
              />
            </g>

            {/* Altitude markers */}
            {altMarkers.map((m) => (
              <g key={m.label}>
                <line
                  x1={m.x}
                  y1={m.y + 8}
                  x2={m.x}
                  y2={m.y + 30}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <rect
                  x={m.x - 40}
                  y={m.y + 30}
                  width={80}
                  height={36}
                  rx={6}
                  fill="rgba(0,20,50,0.8)"
                  stroke="rgba(39,215,255,0.3)"
                  strokeWidth="1"
                />
                <text
                  x={m.x}
                  y={m.y + 45}
                  textAnchor="middle"
                  fill="#27D7FF"
                  fontSize="11"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  {m.label}
                </text>
                <text
                  x={m.x}
                  y={m.y + 58}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="8"
                  fontFamily="sans-serif"
                >
                  {m.sublabel}
                </text>
              </g>
            ))}

            {/* Stars */}
            {[100, 200, 400, 600, 700, 500, 300, 650].map((sx, i) => (
              <circle
                key={`star-${sx}`}
                cx={sx}
                cy={10 + (i % 3) * 8}
                r={0.8}
                fill="rgba(255,255,255,0.6)"
              />
            ))}

            {/* Paraglider emoji */}
            <text
              x={paragliderPos.x}
              y={paragliderPos.y}
              textAnchor="middle"
              fontSize="24"
              style={{ filter: "drop-shadow(0 0 8px rgba(39,215,255,0.8))" }}
            >
              🪂
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
