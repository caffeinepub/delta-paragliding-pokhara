import { IMG } from "@/constants";

export function StoryScenes() {
  const scenes = [
    {
      label: "SCENE 01",
      title: "THE RUN",
      image: IMG.takeoff,
      align: "left",
      text: "It begins with a sprint. Feel the ground beneath your feet, the wind pulling at the canopy above you, and then — the hill drops away. In three seconds, the world transforms. You're no longer running. You're flying.",
    },
    {
      label: "SCENE 02",
      title: "THE FLIGHT",
      image: IMG.pov,
      align: "right",
      text: "Two thousand feet above Phewa Lake, the silence is absolute. The turquoise water below mirrors the sky above. The Annapurna range stretches across the horizon in an unbroken wall of snow and stone. This is what freedom looks like.",
    },
    {
      label: "SCENE 03",
      title: "THE FREEDOM",
      image: IMG.joy,
      align: "left",
      text: "Arms open. Wind in your face. Heart absolutely full. There are moments in life that change you — this is one of them. Every passenger who flies with Delta Skydiving & Paragliding lands a different person than when they left the ground.",
    },
  ];

  return (
    <section style={{ background: "#050B14" }}>
      {scenes.map((s, i) => (
        <div
          key={s.title}
          className="relative min-h-[70vh] flex items-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.image})`,
              filter: "brightness(0.35)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(to right,rgba(5,11,20,0.95) 0%,rgba(5,11,20,0.15) 100%)"
                  : "linear-gradient(to left,rgba(5,11,20,0.95) 0%,rgba(5,11,20,0.15) 100%)",
            }}
          />
          <div
            className={`relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 ${
              s.align === "right" ? "flex justify-end" : ""
            }`}
          >
            <div
              className={`max-w-xl ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <p
                className="font-cinematic tracking-[0.4em] text-sm mb-3"
                style={{
                  color: "#27D7FF",
                  textShadow: "0 0 15px rgba(39,215,255,0.6)",
                }}
              >
                {s.label}
              </p>
              <h2
                className="font-cinematic text-6xl md:text-8xl text-white mb-6"
                style={{ lineHeight: "0.9" }}
              >
                {s.title}
              </h2>
              <div
                className="w-16 h-0.5 mb-6"
                style={{ background: "#FF7A1A" }}
              />
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#9FB2C7" }}
              >
                {s.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
