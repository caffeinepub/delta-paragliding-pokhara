export const WA_LINK =
  "https://wa.me/9779708075788?text=Hi%2C%20I%20want%20to%20book%20paragliding%20in%20Pokhara";
export const IG_LINK = "https://instagram.com/deltaparagliding";
export const EMAIL_LINK = "mailto:summitsoulnepal@gmail.com";

export const IMG = {
  hero: "/assets/generated/hero-paragliding.dim_1920x1080.jpg",
  takeoff: "/assets/generated/takeoff-sarangkot.dim_1920x1080.jpg",
  pov: "/assets/generated/pov-flight.dim_1920x1080.jpg",
  joy: "/assets/generated/passenger-joy.dim_1200x800.jpg",
  aerial: "/assets/generated/aerial-pokhara.dim_1920x1080.jpg",
  safety: "/assets/generated/pilot-safety.dim_1200x800.jpg",
  wings: "/assets/generated/gallery-wings.dim_800x600.jpg",
  lake: "/assets/generated/lake-reflection.dim_1200x800.jpg",
  skyEverest: "/assets/generated/skydiving-everest.dim_1200x800.jpg",
  skyPokhara: "/assets/generated/skydiving-pokhara.dim_1200x800.jpg",
};

export const GALLERY = [
  { src: IMG.hero, label: "Above Annapurna" },
  { src: IMG.takeoff, label: "The Takeoff" },
  { src: IMG.pov, label: "POV Flight" },
  { src: IMG.joy, label: "Pure Freedom" },
  { src: IMG.aerial, label: "Aerial Pokhara" },
  { src: IMG.safety, label: "Safety First" },
  { src: IMG.wings, label: "The Wings" },
  { src: IMG.lake, label: "Lake Reflection" },
];

export const PACKAGES = [
  {
    id: "classic",
    name: "Classic Flight",
    duration: "30 min",
    price: "$63",
    desc: "Soar above Phewa Lake with a certified pilot. Perfect introduction to paragliding over Pokhara's stunning valley.",
    image: IMG.hero,
    featured: false,
    badge: null as string | null,
    seasonal: false,
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
    seasonal: false,
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
    seasonal: false,
  },
  {
    id: "sky-everest",
    name: "Everest Skydiving",
    duration: "Seasonal",
    price: "",
    desc: "Leap from altitude above the world's highest peaks. An exclusive skydiving experience over the Everest region — views no other sport can offer.",
    image: IMG.skyEverest,
    featured: false,
    badge: "SEASONAL" as string | null,
    seasonal: true,
  },
  {
    id: "sky-pokhara",
    name: "Pokhara Skydiving",
    duration: "Seasonal",
    price: "",
    desc: "Freefall above Phewa Lake with a front-row view of the Annapurna range. The most breathtaking skydiving drop zone in South Asia.",
    image: IMG.skyPokhara,
    featured: true,
    badge: "SEASONAL" as string | null,
    seasonal: true,
  },
];

export const INTRO_IMAGES = [
  IMG.hero,
  IMG.takeoff,
  IMG.pov,
  IMG.aerial,
  IMG.joy,
];
