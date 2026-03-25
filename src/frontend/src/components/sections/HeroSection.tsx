import { IMG, WA_LINK } from "@/constants";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center ken-burns"
        style={{ backgroundImage: `url(${IMG.hero})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom,rgba(5,11,20,0.5) 0%,rgba(5,11,20,0.35) 50%,rgba(5,11,20,0.88) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="font-cinematic tracking-[0.4em] text-sm md:text-base mb-4"
          style={{
            color: "#27D7FF",
            textShadow: "0 0 20px rgba(39,215,255,0.8)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          POKHARA, NEPAL · SARANGKOT LAUNCH SITE
        </motion.p>

        <motion.h1
          className="font-cinematic text-5xl md:text-8xl lg:text-9xl text-white mb-6"
          style={{ lineHeight: "0.95" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          FLY IN THE LAP
          <br />
          <span
            style={{
              color: "#27D7FF",
              textShadow: "0 0 30px rgba(39,215,255,0.6)",
            }}
          >
            OF ANNAPURNA
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl mb-10 font-light"
          style={{ color: "#9FB2C7" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Experience freedom above mountains &amp; lakes
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <a
            href="#contact"
            data-ocid="hero.primary_button"
            className="font-cinematic tracking-[0.12em] px-10 py-4 rounded-full text-white text-lg transition-all hover:scale-105 pulse-orange"
            style={{ background: "#FF7A1A" }}
          >
            BOOK YOUR FLIGHT
          </a>
          <a
            href="#packages"
            data-ocid="hero.secondary_button"
            className="font-cinematic tracking-[0.12em] px-10 py-4 rounded-full text-white text-lg border transition-all hover:scale-105"
            style={{
              borderColor: "rgba(39,215,255,0.5)",
              background: "rgba(39,215,255,0.05)",
            }}
          >
            VIEW PACKAGES
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 bounce-down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="font-cinematic text-xs tracking-widest"
          style={{ color: "#9FB2C7" }}
        >
          SCROLL
        </span>
        <ChevronDown size={24} color="#27D7FF" />
      </motion.div>
    </section>
  );
}

// keep WA_LINK in scope to avoid unused import warning
void WA_LINK;
