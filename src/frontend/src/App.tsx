import AltitudeTracker from "@/components/AltitudeTracker";
import BookingCounter from "@/components/BookingCounter";
import EnhancedReviews from "@/components/EnhancedReviews";
import ScrollParaglider from "@/components/ScrollParaglider";
import WeatherWidget from "@/components/WeatherWidget";
import WhatToExpect from "@/components/WhatToExpect";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Footer } from "@/components/sections/Footer";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroAnimation } from "@/components/sections/IntroAnimation";
import { LocationSection } from "@/components/sections/LocationSection";
import { Navbar } from "@/components/sections/Navbar";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { Preloader } from "@/components/sections/Preloader";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SafetySection } from "@/components/sections/SafetySection";
import { SectionSeparator } from "@/components/sections/SectionSeparator";
import { StoryScenes } from "@/components/sections/StoryScenes";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useScrollReveal();

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
      <ScrollParaglider />
      <Preloader done={preloaderDone} />
      <IntroAnimation show={showIntro} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: appReady ? 1 : 0, scale: appReady ? 1 : 0.98 }}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <SectionSeparator />
          <StoryScenes />
          <SectionSeparator />
          <PackagesSection />
          <SectionSeparator />
          <WhyChooseUsSection />
          <SectionSeparator />
          <QuoteSection />
          <SectionSeparator />
          <SafetySection />
          <BookingCounter />
          <WeatherWidget />
          <AltitudeTracker />
          <WhatToExpect />
          <EnhancedReviews />
          <GallerySection />
          <SectionSeparator />
          <LocationSection />
          <SectionSeparator />
          <ContactSection />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </motion.div>
    </div>
  );
}
