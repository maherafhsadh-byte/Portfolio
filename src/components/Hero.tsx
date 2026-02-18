import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRole } from "./InteractiveRole";
import { FluidText } from "./FluidText";
import { Github, Linkedin, Instagram } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { Magnetic } from "./ui/Magnetic";

const roles = [
  "A Graphic Designer",
  "A Storyteller",
  "A Creative Director",
  "A Visual Artist",
  "A Problem Solver",
];

interface HeroProps {
  showScrollIndicator: boolean;
}

const Hero = ({ showScrollIndicator }: HeroProps) => {
  const [index, setIndex] = useState(0);
  const [isName, setIsName] = useState(false);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    // Toggle between "I AM" and "MAHER AF" every 3 seconds
    const nameInterval = setInterval(() => {
      setIsName((prev) => !prev);
    }, 5000);
    return () => clearInterval(nameInterval);
  }, []);

  useEffect(() => {
    // Start role rotation only after the initial appearance (around 4.2s)
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((i) => (i + 1) % roles.length);
      }, 5000);
      return () => clearInterval(interval);
    }, 4200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let frameId: number;
    let ctr = 0;

    const animate = () => {
      ctr += 0.005;
      if (turbulenceRef.current) {
        // More abstract and dynamic liquid motion
        const valX = 0.02 + Math.sin(ctr) * 0.015;
        const valY = 0.08 + Math.cos(ctr * 0.8) * 0.04;
        turbulenceRef.current.setAttribute("baseFrequency", `${valX} ${valY}`);
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      {/* SVG Filter for Rain/Splash Effect */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="dissolve-filter">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.02 0.08"
              numOctaves="3"
              result="warp"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="60"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>

      <div className="text-center w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          Welcome to my world
        </motion.p>

        <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {isName ? (
              <motion.div
                key="name"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-2"
              >
                <FluidText
                  text="MAHERAF"
                  className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold text-foreground leading-none"
                />
              </motion.div>
            ) : (
              <motion.div
                key="iam"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-2"
              >
                <FluidText
                  text="I AM"
                  className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold text-foreground leading-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Height container for roles - Appears 2s after preloading ends (~4.2s total) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          className="h-32 md:h-40 lg:h-48 w-full px-20 overflow-hidden relative flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full flex justify-center"
            >
              <InteractiveRole
                role={roles[index]}
                className="font-display text-3xl md:text-5xl lg:text-6xl font-bold"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="w-24 h-[2px] bg-primary mx-auto mt-6 origin-left"
        />

        {/* Scroll Indicator */}
        <div className="h-20 flex flex-col items-center mt-8">
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                id="scroll-indicator"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.span
                  animate={{
                    opacity: [1, 0.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground select-none"
                >
                  Scroll
                </motion.span>
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-[1px] h-6 bg-gradient-to-b from-primary to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 right-8 flex gap-6 z-20"
      >
        <SocialLink href="https://github.com" icon={<Github size={24} />} />
        <SocialLink href="https://linkedin.com" icon={<Linkedin size={24} />} />
        <SocialLink href="https://instagram.com" icon={<Instagram size={24} />} />
      </motion.div>
    </section>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Magnetic strength={0.2} range={60}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        {/* Background Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 0.2 : 0,
            scale: isHovered ? 1.5 : 0.8,
          }}
          className="absolute inset-0 bg-primary blur-xl rounded-full -z-10"
        />
        {icon}
      </motion.a>
    </Magnetic>
  );
};

export default Hero;
