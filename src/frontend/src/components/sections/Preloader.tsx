import { AnimatePresence, motion } from "motion/react";

export function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="font-cinematic text-white text-3xl md:text-5xl tracking-[0.3em] text-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, times: [0, 0.3, 0.7, 1] }}
          >
            NOT EVERYONE IS MEANT TO FLY…
          </motion.p>
          <motion.div
            className="mt-8 w-48 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,#27D7FF,transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
