import { motion } from "motion/react";

export function WhyChooseUsSection() {
  const cards = [
    {
      icon: "✈",
      title: "10,000+ Happy Flyers",
      desc: "Thousands of adventurers from 80+ countries have trusted us with their once-in-a-lifetime Pokhara flight.",
      color: "#27D7FF",
      glow: "0 0 40px rgba(39,215,255,0.4), 0 0 80px rgba(39,215,255,0.15)",
      border: "rgba(39,215,255,0.5)",
      bg: "linear-gradient(135deg, rgba(39,215,255,0.08) 0%, rgba(39,215,255,0.02) 100%)",
    },
    {
      icon: "🛡",
      title: "Certified & Safe",
      desc: "CIVL-certified pilots, daily equipment checks, and a 100% safety record. Your life is our highest priority.",
      color: "#FF7A1A",
      glow: "0 0 40px rgba(255,122,26,0.4), 0 0 80px rgba(255,122,26,0.15)",
      border: "rgba(255,122,26,0.5)",
      bg: "linear-gradient(135deg, rgba(255,122,26,0.08) 0%, rgba(255,122,26,0.02) 100%)",
    },
    {
      icon: "🏔",
      title: "Breathtaking Views",
      desc: "Soar above Phewa Lake with the full Annapurna massif and Machhapuchhre at sunrise — a view that changes you.",
      color: "#A855F7",
      glow: "0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(168,85,247,0.15)",
      border: "rgba(168,85,247,0.5)",
      bg: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.02) 100%)",
    },
  ];

  return (
    <section
      style={{ background: "#050B14" }}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(39,215,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] mb-4 font-semibold uppercase"
            style={{ color: "#27D7FF" }}
          >
            Our Promise
          </p>
          <h2
            className="text-5xl md:text-6xl font-black uppercase tracking-wider text-white"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              textShadow:
                "0 0 40px rgba(39,215,255,0.5), 0 0 80px rgba(39,215,255,0.2)",
            }}
          >
            WHY CHOOSE US
          </h2>
          <div
            style={{
              width: 80,
              height: 3,
              background:
                "linear-gradient(90deg, transparent, #27D7FF, transparent)",
              margin: "20px auto 0",
            }}
          />
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
            When it comes to skydiving and paragliding in Pokhara, Delta sets
            the standard — for thrills, safety, and memories that last a
            lifetime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group"
              style={{ perspective: "1000px" }}
            >
              <div
                style={{
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                  borderRadius: 20,
                  padding: "40px 32px",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: `${card.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  transformStyle: "preserve-3d",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "perspective(600px) rotateY(8deg) rotateX(-4deg) translateY(-8px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `${card.glow.replace("0.4", "0.7").replace("0.15", "0.3")}, inset 0 1px 0 rgba(255,255,255,0.08)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `${card.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`;
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle at top right, ${card.color}22, transparent 70%)`,
                    borderRadius: "0 20px 0 0",
                  }}
                />
                <div
                  style={{
                    fontSize: 56,
                    marginBottom: 20,
                    filter: `drop-shadow(0 0 16px ${card.color}88)`,
                    lineHeight: 1,
                  }}
                >
                  {card.icon}
                </div>
                <div
                  style={{
                    width: 40,
                    height: 3,
                    background: card.color,
                    borderRadius: 2,
                    marginBottom: 16,
                    boxShadow: `0 0 12px ${card.color}88`,
                  }}
                />
                <h3
                  className="text-xl font-bold mb-3 text-white"
                  style={{
                    textShadow: `0 0 20px ${card.color}66`,
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
