import { IMG } from "@/constants";

export function SafetySection() {
  const pts = [
    {
      icon: "✓",
      title: "Certified Pilots",
      desc: "All our pilots hold internationally recognized paragliding certifications with 500+ hours of flight time.",
    },
    {
      icon: "✓",
      title: "Professional Gear",
      desc: "We use only top-tier equipment from leading European manufacturers, inspected before every flight.",
    },
    {
      icon: "✓",
      title: "Perfect Safety Record",
      desc: "Over 10,000 happy passengers. Zero serious incidents. Your safety is our absolute priority.",
    },
  ];

  return (
    <section
      id="safety"
      className="py-24 px-4"
      style={{ background: "#050B14" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative fade-in-up rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={IMG.safety}
              alt="Safety"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg,rgba(39,215,255,0.1) 0%,transparent 60%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: "inset 0 0 0 2px rgba(39,215,255,0.2)" }}
            />
          </div>
          <div className="fade-in-up">
            <p
              className="font-cinematic tracking-[0.4em] text-sm mb-4"
              style={{
                color: "#27D7FF",
                textShadow: "0 0 15px rgba(39,215,255,0.6)",
              }}
            >
              YOUR SAFETY IS OUR MISSION
            </p>
            <h2 className="font-cinematic text-5xl md:text-6xl text-white mb-4 leading-none">
              CERTIFIED.
              <br />
              EXPERIENCED.
              <br />
              <span style={{ color: "#FF7A1A" }}>TRUSTED.</span>
            </h2>
            <div
              className="w-16 h-0.5 mb-8"
              style={{ background: "#27D7FF" }}
            />
            <div className="flex flex-col gap-6">
              {pts.map((pt, i) => (
                <div
                  key={pt.title}
                  className="flex gap-4 fade-in-up"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-cinematic text-xl"
                    style={{
                      background: "rgba(39,215,255,0.1)",
                      border: "1px solid rgba(39,215,255,0.3)",
                      color: "#27D7FF",
                    }}
                  >
                    {pt.icon}
                  </div>
                  <div>
                    <h4 className="font-cinematic text-xl text-white mb-1">
                      {pt.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#9FB2C7" }}
                    >
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
