import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["HOME", "PACKAGES", "SAFETY", "GALLERY", "CONTACT"];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        scrolled ? "nav-blur" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#hero"
          data-ocid="nav.link"
          className="flex items-baseline gap-1"
        >
          <span
            className="font-cinematic text-2xl md:text-3xl tracking-wider"
            style={{
              color: "#27D7FF",
              textShadow: "0 0 15px rgba(39,215,255,0.7)",
            }}
          >
            DELTA
          </span>
          <span
            className="font-cinematic text-lg md:text-xl tracking-wide"
            style={{
              color: "#FF7A1A",
              textShadow: "0 0 15px rgba(255,122,26,0.7)",
            }}
          >
            PARAGLIDING
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              data-ocid="nav.link"
              className="font-cinematic text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors duration-200"
              style={{ letterSpacing: "0.15em" }}
            >
              {l}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-ocid="nav.primary_button"
          className="hidden md:block font-cinematic text-sm tracking-[0.15em] px-6 py-2.5 rounded-full text-white transition-all duration-300 hover:scale-105 pulse-orange"
          style={{ background: "#FF7A1A" }}
        >
          BOOK NOW
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          data-ocid="nav.toggle"
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden nav-blur border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="font-cinematic text-lg tracking-widest text-white/70"
                >
                  {l}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-cinematic text-sm tracking-widest px-6 py-3 rounded-full text-white text-center"
                style={{ background: "#FF7A1A" }}
              >
                BOOK NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
