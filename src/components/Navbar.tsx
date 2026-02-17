import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const navItems = ["Work", "About", "Contact"];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = prevScroll;
    setPrevScroll(latest);
    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-colors duration-300 ${
        scrolled ? "navbar-glass" : "bg-transparent"
      }`}
    >
      <a href="#" className="font-display text-lg font-bold tracking-tight text-foreground">
        PORTFOLIO<span className="text-primary">.</span>
      </a>
      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
