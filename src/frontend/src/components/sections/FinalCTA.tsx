import { WA_LINK } from "@/constants";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export function FinalCTA() {
  return (
    <section
      className="relative py-32 px-4 text-center overflow-hidden"
      style={{ background: "#000" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(39,215,255,0.06) 0%,rgba(5,11,20,0.98) 70%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto fade-in-up">
        <p
          className="font-cinematic tracking-[0.4em] text-sm mb-6"
          style={{
            color: "#27D7FF",
            textShadow: "0 0 20px rgba(39,215,255,0.8)",
          }}
        >
          THE SKY IS WAITING
        </p>
        <h2
          className="font-cinematic text-7xl md:text-9xl text-white mb-10"
          style={{ lineHeight: "0.9" }}
        >
          YOUR TURN
          <br />
          <span
            style={{
              color: "#FF7A1A",
              textShadow: "0 0 40px rgba(255,122,26,0.5)",
            }}
          >
            TO FLY
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            data-ocid="cta.primary_button"
            className="font-cinematic tracking-[0.12em] px-12 py-5 rounded-full text-white text-xl transition-all hover:scale-105 pulse-orange"
            style={{ background: "#FF7A1A" }}
          >
            BOOK NOW
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="cta.whatsapp_button"
            className="font-cinematic tracking-[0.12em] px-12 py-5 rounded-full text-white text-xl transition-all hover:scale-105 flex items-center gap-3 justify-center pulse-glow-green"
            style={{ background: "#25D366" }}
          >
            <SiWhatsapp size={22} />
            WHATSAPP US
          </a>
        </div>
      </div>
    </section>
  );
}
