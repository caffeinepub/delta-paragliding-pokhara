import {
  ChevronDown,
  Instagram,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  Star,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

// ── Constants ──────────────────────────────────────────────────────────────────
const WA_LINK =
  "https://wa.me/9779708075788?text=Hi%2C%20I%20want%20to%20book%20paragliding%20in%20Pokhara";
const IG_LINK = "https://instagram.com/deltaparagliding";
const EMAIL_LINK = "mailto:summitsoulnepal@gmail.com";

const IMG = {
  hero: "/assets/generated/hero-paragliding.dim_1920x1080.jpg",
  takeoff: "/assets/generated/takeoff-sarangkot.dim_1920x1080.jpg",
  pov: "/assets/generated/pov-flight.dim_1920x1080.jpg",
  joy: "/assets/generated/passenger-joy.dim_1200x800.jpg",
  aerial: "/assets/generated/aerial-pokhara.dim_1920x1080.jpg",
  safety: "/assets/generated/pilot-safety.dim_1200x800.jpg",
  wings: "/assets/generated/gallery-wings.dim_800x600.jpg",
  lake: "/assets/generated/lake-reflection.dim_1200x800.jpg",
};

const GALLERY = [
  { src: IMG.hero, label: "Above Annapurna" },
  { src: IMG.takeoff, label: "The Takeoff" },
  { src: IMG.pov, label: "POV Flight" },
  { src: IMG.joy, label: "Pure Freedom" },
  { src: IMG.aerial, label: "Aerial Pokhara" },
  { src: IMG.safety, label: "Safety First" },
  { src: IMG.wings, label: "The Wings" },
  { src: IMG.lake, label: "Lake Reflection" },
];

const REVIEWS = [
  { text: "Best experience in Nepal!", author: "Sarah M.", country: "USA" },
  { text: "Unreal flight over Pokhara!", author: "James K.", country: "UK" },
  {
    text: "I cried from happiness in the air!",
    author: "Yuki T.",
    country: "Japan",
  },
  {
    text: "The most beautiful thing I've ever seen.",
    author: "Carlos R.",
    country: "Spain",
  },
  {
    text: "Delta Paragliding is absolutely world-class.",
    author: "Emma L.",
    country: "Australia",
  },
  {
    text: "Did it twice. Will do it again!",
    author: "Raj S.",
    country: "India",
  },
];

const PACKAGES = [
  {
    id: "classic",
    name: "Classic Flight",
    duration: "30 min",
    price: "$63",
    desc: "Soar above Phewa Lake with a certified pilot. Perfect introduction to paragliding over Pokhara's stunning valley.",
    image: IMG.hero,
    featured: false,
    badge: null as string | null,
  },
  {
    id: "adventure",
    name: "Adventure Flight",
    duration: "45 min",
    price: "$75",
    desc: "Extended aerial journey with thermal riding and panoramic views of the entire Annapurna Massif. Our most popular experience.",
    image: IMG.pov,
    featured: true,
    badge: "MOST POPULAR" as string | null,
  },
  {
    id: "elite",
    name: "Elite Experience",
    duration: "60 min",
    price: "$97",
    desc: "The ultimate premium flight. Full hour of freedom with acrobatic maneuvers, HD video recording, and private briefing.",
    image: IMG.aerial,
    featured: false,
    badge: null as string | null,
  },
];

// ── Scroll reveal ──────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("visible");
        }
      },
      { threshold: 0.12 },
    );
    for (const el of Array.from(
      document.querySelectorAll(".fade-in-up, .fade-in"),
    )) {
      obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);
}

// ── Booking Buttons ────────────────────────────────────────────────────────────
function BookingButtons({ pkgId }: { pkgId: string }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`${pkgId}.whatsapp_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: "#25D366",
          boxShadow: "0 0 16px rgba(37,211,102,0.3)",
        }}
      >
        <SiWhatsapp size={16} />
        Book via WhatsApp
      </a>
      <a
        href={IG_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`${pkgId}.instagram_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
          boxShadow: "0 0 16px rgba(220,39,67,0.3)",
        }}
      >
        <Instagram size={16} />
        Book via Instagram
      </a>
      <a
        href={EMAIL_LINK}
        data-ocid={`${pkgId}.email_button`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
        style={{
          background: "#1a73e8",
          boxShadow: "0 0 16px rgba(26,115,232,0.3)",
        }}
      >
        <Mail size={16} />
        Book via Email
      </a>
    </div>
  );
}

// ── Preloader ──────────────────────────────────────────────────────────────────
function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="/assets/uploads/delta8-019d1f60-fa1b-715f-b933-694241b5f551-1.jpeg"
            alt="Delta Paragliding Logo"
            className="w-52 md:w-80 object-contain mb-6"
            style={{
              mixBlendMode: "screen",
              filter: "drop-shadow(0 0 24px rgba(39,215,255,0.7))",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
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

// ── Intro Animation ────────────────────────────────────────────────────────────
const INTRO_IMAGES = [IMG.hero, IMG.takeoff, IMG.pov, IMG.aerial, IMG.joy];

function IntroAnimation({ show }: { show: boolean }) {
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Slideshow background */}
          <AnimatePresence mode="sync">
            <motion.img
              key={imgIdx}
              src={INTRO_IMAGES[imgIdx]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Text */}
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

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
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
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}
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

// ── Hero ───────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
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

// ── Story Scenes ───────────────────────────────────────────────────────────────
function StoryScenes() {
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
      text: "Arms open. Wind in your face. Heart absolutely full. There are moments in life that change you — this is one of them. Every passenger who flies with Delta Paragliding lands a different person than when they left the ground.",
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
            className={`relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 ${s.align === "right" ? "flex justify-end" : ""}`}
          >
            <div
              className="max-w-xl fade-in-up"
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

// ── Packages ───────────────────────────────────────────────────────────────────
function PackagesSection() {
  return (
    <section
      id="packages"
      className="py-24 px-4"
      style={{ background: "#07162A" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{
              color: "#27D7FF",
              textShadow: "0 0 15px rgba(39,215,255,0.6)",
            }}
          >
            CHOOSE YOUR ADVENTURE
          </p>
          <h2 className="font-cinematic text-5xl md:text-7xl text-white mb-4">
            FLIGHT PACKAGES
          </h2>
          <div className="neon-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              data-ocid={`packages.item.${i + 1}`}
              className={`relative rounded-2xl overflow-hidden fade-in-up transition-all duration-500 hover:-translate-y-2 ${pkg.featured ? "glass-card-featured" : "glass-card"}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {pkg.badge && (
                <div
                  className="absolute top-4 right-4 z-10 font-cinematic text-xs tracking-widest px-3 py-1 rounded-full text-white"
                  style={{
                    background: "#FF7A1A",
                    boxShadow: "0 0 15px rgba(255,122,26,0.5)",
                  }}
                >
                  {pkg.badge}
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom,transparent 50%,rgba(10,30,51,0.8) 100%)",
                  }}
                />
              </div>
              <div className="p-6">
                <h3
                  className="font-cinematic text-3xl mb-1"
                  style={{ color: pkg.featured ? "#FF7A1A" : "#27D7FF" }}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm" style={{ color: "#9FB2C7" }}>
                    {pkg.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span
                    className="font-cinematic text-2xl"
                    style={{ color: pkg.featured ? "#FF7A1A" : "#fff" }}
                  >
                    {pkg.price}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#9FB2C7" }}
                >
                  {pkg.desc}
                </p>
                <BookingButtons pkgId={pkg.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
function WhyChooseUsSection() {
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
      {/* Background glow orbs */}
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
        {/* Heading */}
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
            When it comes to paragliding in Pokhara, Delta sets the standard —
            for thrills, safety, and memories that last a lifetime.
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
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
                {/* Corner accent */}
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

                {/* Icon */}
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

                {/* Colored accent line */}
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

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3 text-white"
                  style={{
                    textShadow: `0 0 20px ${card.color}66`,
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
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

// ── Quote ──────────────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMG.lake})`,
          filter: "brightness(0.3)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,11,20,0.6)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto fade-in-up">
        <p
          className="font-cinematic tracking-[0.3em] text-sm mb-6"
          style={{ color: "#27D7FF" }}
        >
          AN EXPERIENCE BEYOND WORDS
        </p>
        <blockquote className="font-cinematic text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
          "This is not a ride.
          <br />
          <span
            style={{
              color: "#27D7FF",
              textShadow: "0 0 30px rgba(39,215,255,0.5)",
            }}
          >
            This is a lifetime memory."
          </span>
        </blockquote>
        <div
          className="mt-8 w-24 h-0.5 mx-auto"
          style={{ background: "#FF7A1A" }}
        />
      </div>
    </section>
  );
}

// ── Safety ─────────────────────────────────────────────────────────────────────
function SafetySection() {
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

// ── Reviews ────────────────────────────────────────────────────────────────────
function ReviewsSlider() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: "#07162A" }}
    >
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center fade-in-up">
        <p
          className="font-cinematic tracking-[0.4em] text-sm mb-4"
          style={{ color: "#27D7FF" }}
        >
          REAL STORIES
        </p>
        <h2 className="font-cinematic text-5xl md:text-6xl text-white">
          WHAT FLYERS SAY
        </h2>
      </div>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right,transparent,black 10%,black 90%,transparent)",
        }}
      >
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <div
              key={`${r.author}-${i < REVIEWS.length ? "a" : "b"}`}
              data-ocid={
                i < REVIEWS.length ? `reviews.item.${i + 1}` : undefined
              }
              className="flex-shrink-0 w-72 md:w-80 mx-3 p-6 rounded-2xl glass-card"
            >
              <div className="flex gap-1 mb-3">
                {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                  <Star key={sk} size={14} fill="#FF7A1A" color="#FF7A1A" />
                ))}
              </div>
              <p
                className="text-sm leading-relaxed mb-4 italic"
                style={{ color: "#9FB2C7" }}
              >
                "{r.text}"
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-cinematic text-sm"
                  style={{
                    background: "rgba(39,215,255,0.15)",
                    color: "#27D7FF",
                  }}
                >
                  {r.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{r.author}</p>
                  <p className="text-xs" style={{ color: "#9FB2C7" }}>
                    {r.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────────────────
function GallerySection() {
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

// ── Location ───────────────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section className="py-24 px-4" style={{ background: "#07162A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in-up">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            WHERE WE FLY
          </p>
          <h2 className="font-cinematic text-5xl md:text-7xl text-white">
            LAUNCH SITE
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={20} color="#FF7A1A" />
              <h3 className="font-cinematic text-3xl text-white">
                SARANGKOT, POKHARA
              </h3>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: "#9FB2C7" }}>
              Our launch site sits at 1,600 meters above sea level on Sarangkot
              Hill — one of the most spectacular paragliding launch points in
              the world. The thermal conditions here are ideal year-round,
              offering long soaring flights above the turquoise Phewa Lake.
            </p>
            <div className="space-y-4">
              {[
                { label: "Launch Site", value: "Sarangkot Hill, 1,600m" },
                { label: "Landing Zone", value: "Pokhara Lakeside" },
                {
                  label: "Best Season",
                  value: "October – May (ideal thermals)",
                },
                {
                  label: "Duration",
                  value: "30–60 minutes depending on package",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="font-cinematic text-sm tracking-wider mt-0.5"
                    style={{ color: "#27D7FF", minWidth: "120px" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-sm" style={{ color: "#9FB2C7" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="fade-in-up rounded-2xl overflow-hidden"
            style={{
              height: "400px",
              border: "1px solid rgba(39,215,255,0.2)",
            }}
          >
            <iframe
              title="Sarangkot"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.8!2d83.9757!3d28.2185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595b8b7f4c1a5%3A0x34ae9f8c9a17b8e6!2sSarangkot!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{ background: "#050B14" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="fade-in-up mb-14">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            START YOUR ADVENTURE
          </p>
          <h2 className="font-cinematic text-6xl md:text-8xl text-white mb-4">
            READY TO FLY?
          </h2>
          <p className="text-lg" style={{ color: "#9FB2C7" }}>
            Reach out through any channel. We respond fast.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16 fade-in-up">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp_button"
            className="flex flex-col items-center gap-3 p-8 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.3)",
              boxShadow: "0 0 20px rgba(37,211,102,0.1)",
            }}
          >
            <SiWhatsapp size={40} color="#25D366" />
            <span
              className="font-cinematic text-2xl"
              style={{ color: "#25D366" }}
            >
              WHATSAPP
            </span>
            <span className="text-sm" style={{ color: "#9FB2C7" }}>
              +977 9708075788
            </span>
          </a>
          <a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.instagram_button"
            className="flex flex-col items-center gap-3 p-8 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "rgba(220,39,67,0.1)",
              border: "1px solid rgba(220,39,67,0.3)",
              boxShadow: "0 0 20px rgba(220,39,67,0.1)",
            }}
          >
            <Instagram size={40} style={{ color: "#e1306c" }} />
            <span
              className="font-cinematic text-2xl"
              style={{ color: "#e1306c" }}
            >
              INSTAGRAM
            </span>
            <span className="text-sm" style={{ color: "#9FB2C7" }}>
              @deltaparagliding
            </span>
          </a>
          <a
            href={EMAIL_LINK}
            data-ocid="contact.email_button"
            className="flex flex-col items-center gap-3 p-8 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "rgba(26,115,232,0.1)",
              border: "1px solid rgba(26,115,232,0.3)",
              boxShadow: "0 0 20px rgba(26,115,232,0.1)",
            }}
          >
            <Mail size={40} style={{ color: "#1a73e8" }} />
            <span
              className="font-cinematic text-2xl"
              style={{ color: "#1a73e8" }}
            >
              EMAIL
            </span>
            <span className="text-sm" style={{ color: "#9FB2C7" }}>
              summitsoulnepal@gmail.com
            </span>
          </a>
        </div>
        <div className="neon-divider mb-10" />
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center fade-in-up">
          {[
            { Icon: Phone, val: "+977 9708075788" },
            { Icon: Mail, val: "summitsoulnepal@gmail.com" },
            { Icon: Instagram, val: "@deltaparagliding" },
          ].map(({ Icon, val }) => (
            <div
              key={val}
              className="flex items-center gap-2"
              style={{ color: "#9FB2C7" }}
            >
              <Icon size={16} color="#27D7FF" />
              <span className="text-sm">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────────
function FinalCTA() {
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

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-12 px-4"
      style={{
        background: "#03080F",
        borderTop: "1px solid rgba(39,215,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-baseline gap-1">
            <span
              className="font-cinematic text-2xl tracking-wider"
              style={{
                color: "#27D7FF",
                textShadow: "0 0 15px rgba(39,215,255,0.5)",
              }}
            >
              DELTA
            </span>
            <span
              className="font-cinematic text-lg tracking-wide"
              style={{ color: "#FF7A1A" }}
            >
              PARAGLIDING
            </span>
          </div>
          <div className="flex items-center gap-4">
            {[
              {
                href: WA_LINK,
                icon: <SiWhatsapp size={18} color="#25D366" />,
                color: "rgba(37,211,102,0.15)",
                border: "rgba(37,211,102,0.3)",
                ocid: "footer.whatsapp_button",
              },
              {
                href: IG_LINK,
                icon: <Instagram size={18} color="#e1306c" />,
                color: "rgba(225,48,108,0.15)",
                border: "rgba(225,48,108,0.3)",
                ocid: "footer.instagram_button",
              },
              {
                href: EMAIL_LINK,
                icon: <Mail size={18} color="#1a73e8" />,
                color: "rgba(26,115,232,0.15)",
                border: "rgba(26,115,232,0.3)",
                ocid: "footer.email_button",
              },
            ].map((s) => (
              <a
                key={s.ocid}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-ocid={s.ocid}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: s.color, border: `1px solid ${s.border}` }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {["HOME", "PACKAGES", "SAFETY", "GALLERY", "CONTACT"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-cinematic text-xs tracking-widest"
                style={{ color: "#9FB2C7" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="neon-divider mb-6" />
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "#9FB2C7" }}
        >
          <p>© {year} Delta Paragliding Pokhara. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#27D7FF" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Floating WhatsApp ──────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="floating.whatsapp_button"
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 pulse-glow-green"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} />
    </a>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useScrollReveal();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.45;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    // Try immediately
    tryPlay();

    // Also listen for any user interaction to start audio
    const startOnInteraction = () => {
      tryPlay();
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("scroll", startOnInteraction);
    };
    document.addEventListener("click", startOnInteraction);
    document.addEventListener("touchstart", startOnInteraction);
    document.addEventListener("keydown", startOnInteraction);
    document.addEventListener("scroll", startOnInteraction);

    return () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("scroll", startOnInteraction);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  };

  useEffect(() => {
    t1.current = setTimeout(() => {
      setPreloaderDone(true);
      setShowIntro(true);
      t2.current = setTimeout(() => {
        setShowIntro(false);
        t3.current = setTimeout(() => setAppReady(true), 900);
      }, 2800);
    }, 3800);
    return () => {
      for (const t of [t1, t2, t3]) {
        if (t.current) clearTimeout(t.current);
      }
    };
  }, []);

  return (
    <div style={{ background: "#050B14" }}>
      {/* biome-ignore lint/a11y/useMediaCaption: background music has no dialogue */}
      <audio
        ref={audioRef}
        src="https://www.dropbox.com/scl/fi/44oi87dfcdlzpivzqlyex/Inspiring-Background-Music-Cinematic-Epic-Music-ROYALTY-FREE-Music-by-MUSIC4VIDEO.mp3?rlkey=9pjavxytxr8zs17tk0w59gkxa&st=eteu9lz0&dl=1"
        loop
        preload="auto"
        autoPlay
      />
      {/* Mute / Unmute button */}
      <motion.button
        data-ocid="audio.toggle"
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-[200] flex items-center gap-2 px-4 py-2.5 rounded-full text-white/90 hover:text-white transition-colors duration-200"
        style={{
          background: "rgba(5,11,20,0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(39,215,255,0.3)",
          boxShadow: "0 0 18px rgba(39,215,255,0.15)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        <span className="font-cinematic text-xs tracking-widest hidden sm:inline">
          {isMuted ? "UNMUTE" : "MUSIC"}
        </span>
      </motion.button>
      <Preloader done={preloaderDone} />
      <IntroAnimation show={showIntro} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: appReady ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <StoryScenes />
          <PackagesSection />
          <WhyChooseUsSection />
          <QuoteSection />
          <SafetySection />
          <ReviewsSlider />
          <GallerySection />
          <LocationSection />
          <ContactSection />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </motion.div>
    </div>
  );
}
