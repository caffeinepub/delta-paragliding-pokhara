import { IMG } from "@/constants";

export function StoryScenes() {
  const scenes = [
    {
      label: "SCENE 01",
      title: "THE JUMP",
      image: IMG.skyEverest,
      align: "left",
      text: "The door opens at 13,000 feet above the Himalayas. Below you — the Everest region, the highest landscape on Earth. In five seconds, you leap. The wind hits at 200 km/h and the world becomes a blur of peaks, sky, and pure adrenaline. Nothing prepares you for this.",
    },
    {
      label: "SCENE 02",
      title: "THE FLIGHT",
      image: IMG.pov,
      align: "right",
      text: "Two thousand feet above Phewa Lake, the silence is absolute. The turquoise water below mirrors the sky above. The Annapurna range stretches across the horizon in an unbroken wall of snow and stone. Under the paraglider canopy, this is what freedom looks like.",
    },
    {
      label: "SCENE 03",
      title: "THE FREEDOM",
      image: IMG.joy,
      align: "left",
      text: "Whether you leapt from a plane above Everest or soared on thermals over Pokhara — you land changed. Arms open. Heart full. Delta Skydiving & Paragliding exists for this single moment: the one that stays with you forever.",
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
