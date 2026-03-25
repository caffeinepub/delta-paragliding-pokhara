import { GALLERY } from "@/constants";
import { Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function GallerySection() {
  const [lb, setLb] = useState<{ src: string; label: string } | null>(null);

  return (
    <section
      id="gallery"
      className="py-24 px-4"
      style={{ background: "#050B14" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in-up">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            CAPTURED MOMENTS
          </p>
          <h2 className="font-cinematic text-5xl md:text-7xl text-white">
            GALLERY
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GALLERY.map((img, i) => (
            <button
              key={img.src}
              type="button"
              data-ocid={`gallery.item.${i + 1}`}
              className="gallery-item rounded-xl fade-in-up text-left w-full"
              style={{
                aspectRatio: i === 0 || i === 4 ? "16/10" : "4/3",
                transitionDelay: `${i * 0.07}s`,
                display: "block",
              }}
              onClick={() => setLb(img)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay rounded-xl">
                <div className="flex flex-col items-center gap-2 text-white">
                  <Maximize2 size={24} color="#27D7FF" />
                  <span
                    className="font-cinematic text-sm tracking-wider"
                    style={{ color: "#27D7FF" }}
                  >
                    {img.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lb && (
          <motion.div
            data-ocid="gallery.modal"
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img src={lb.src} alt={lb.label} className="w-full rounded-xl" />
              <button
                type="button"
                data-ocid="gallery.close_button"
                onClick={() => setLb(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{
                  background: "rgba(39,215,255,0.2)",
                  border: "1px solid rgba(39,215,255,0.4)",
                }}
              >
                <X size={18} />
              </button>
              <p
                className="text-center mt-3 font-cinematic tracking-widest"
                style={{ color: "#27D7FF" }}
              >
                {lb.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
