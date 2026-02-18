import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import TopoBackground from "@/components/TopoBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { Preloader } from "@/components/Preloader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactToggle } from "@/components/ContactToggle";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import FeaturedWorks from "@/components/FeaturedWorks";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence>
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      <CustomCursor />
      <TopoBackground />
      <Navbar />

      {/* Theme Toggle (Transitions from Middle to Bottom Left) */}
      <motion.div
        className="fixed left-8 z-50 hidden md:block"
        animate={{
          top: hasScrolled ? "calc(100% - 80px)" : "50%",
          y: hasScrolled ? 0 : "-50%",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        <ThemeToggle showLines={!hasScrolled} />
      </motion.div>

      {/* Contact Toggle (Transitions from Middle to Bottom Right) */}
      <motion.div
        className="fixed right-8 z-50 hidden md:block"
        animate={{
          top: hasScrolled ? "calc(100% - 80px)" : "50%",
          y: hasScrolled ? 0 : "-50%",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        <ContactToggle showLines={!hasScrolled} />
      </motion.div>

      {/* Audio Visualizer (Transitions from Bottom Left to Bottom Center) */}
      <motion.div
        className="fixed bottom-8 z-[60]"
        animate={{
          left: hasScrolled ? "50%" : "32px",
          x: hasScrolled ? "-50%" : "0%",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        <AudioVisualizer />
      </motion.div>

      <Hero showScrollIndicator={!hasScrolled} />
      <Marquee />
      <FeaturedWorks />

      {/* Spacer for scroll testing */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
          More coming soon<span className="text-primary">.</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
