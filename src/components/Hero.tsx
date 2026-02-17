import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "A Graphic Designer",
  "A Storyteller",
  "A Creative Director",
  "A Visual Artist",
  "A Problem Solver",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          Welcome to my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold text-foreground leading-none mb-4"
        >
          I AM<span className="text-primary">.</span>
        </motion.h1>

        <div className="h-16 md:h-20 lg:h-24 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-stroke"
            >
              {roles[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="w-24 h-[2px] bg-primary mx-auto mt-10 origin-left"
        />
      </div>
    </section>
  );
};

export default Hero;
