import { INTRO_IMAGES } from "@/constants";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function IntroAnimation({ show }: { show: boolean }) {
  const lines = [
    { text: "FEEL THE EDGE", style: {} },
    { text: "BREAK THE FEAR", style: {} },
    {
      text: "FLY ABOVE POKHARA",
      style: { color: "#27D7FF", textShadow: "0 0 30px rgba(39,215,255,0.8)" },
    },
    {
      text: "DELTA PARAGLIDING",
      style: { color: "#FF7A1A", textShadow: "0 0 30px rgba(255,122,26,0.8)" },
    },
  ];

  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 600);
    return () => clearInterval(interval);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-2 md:gap-4 px-6 overflow-hidden"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={INTRO_IMAGES[imgIdx]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover ken-burns"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
            {lines.map((l, i) => (
              <motion.h2
                key={l.text}
                className="font-cinematic text-4xl md:text-7xl lg:text-8xl tracking-widest text-center text-white"
                style={l.style}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.45 + 0.1, duration: 0.55 }}
              >
                {l.text}
              </motion.h2>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
