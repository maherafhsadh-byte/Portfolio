import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Magnetic } from "./ui/Magnetic";

const navItems = ["Works", "About", "Contact"];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [isHamburger, setIsHamburger] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoSwapped, setIsLogoSwapped] = useState(false);

  useEffect(() => {
    // Transform into hamburger menu after 5 seconds
    const timer = setTimeout(() => {
      setIsHamburger(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Idle animation: swap M and . every 6 seconds
    const idleInterval = setInterval(() => {
      if (!scrolled) {
        setIsLogoSwapped(true);
        setTimeout(() => {
          setIsLogoSwapped(false);
        }, 1000);
      }
    }, 6000);

    return () => clearInterval(idleInterval);
  }, [scrolled]);

  useEffect(() => {
    if (!isHamburger) {
      setIsFlickering(false);
      return;
    }

    let inactivityTimer: NodeJS.Timeout;
    let flickerStopTimer: NodeJS.Timeout;

    const startFlickerCycle = () => {
      if (isMenuOpen) return;
      setIsFlickering(true);
      flickerStopTimer = setTimeout(() => {
        setIsFlickering(false);
        waitNextInactivity();
      }, 200);
    };

    const waitNextInactivity = () => {
      inactivityTimer = setTimeout(() => {
        startFlickerCycle();
      }, 7000);
    };

    const resetInactivity = () => {
      setIsFlickering(false);
      clearTimeout(inactivityTimer);
      clearTimeout(flickerStopTimer);
      waitNextInactivity();
    };

    const events = ["mousemove", "scroll", "mousedown", "keydown", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetInactivity));

    waitNextInactivity();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetInactivity));
      clearTimeout(inactivityTimer);
      clearTimeout(flickerStopTimer);
    };
  }, [isHamburger, isMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = prevScroll;
    setPrevScroll(latest);
    if (!isMenuOpen) {
      if (latest > prev && latest > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-colors duration-500 ${scrolled && !hidden ? "navbar-glass" : "bg-transparent"
        }`}
    >
      {/* Logo */}
      <Magnetic strength={0.3} range={80}>
        <motion.a
          href="#"
          onClick={() => setIsMenuOpen(false)}
          className="font-display text-lg font-bold tracking-tight text-foreground"
        >
          <motion.div
            layout
            transition={{ duration: 0.1 }}
            className={`relative flex items-center overflow-hidden gap-0 ${isLogoSwapped ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <AnimatePresence mode="wait">
              {scrolled ? (
                <motion.span
                  key="full"
                  layout
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  MAHERAF
                </motion.span>
              ) : (
                <motion.span
                  key="short"
                  layout
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  M
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span layout className="text-primary">.</motion.span>
          </motion.div>
        </motion.a>
      </Magnetic>

      {/* Nav Items Container / Hamburger Trigger */}
      <div
        className="relative flex items-center justify-end h-10 w-full max-w-[400px]"
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        {navItems.map((item, i) => (
          <NavItem
            key={item}
            item={item}
            index={i}
            isHamburger={isHamburger}
            isFlickering={isFlickering}
            isMenuOpen={isMenuOpen}
            onClick={() => isHamburger ? setIsMenuOpen(!isMenuOpen) : null}
            onMouseEnter={() => isHamburger ? setIsMenuOpen(true) : null}
          />
        ))}

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[-8px] right-0 w-48 p-2 rounded-2xl border bg-background/40 backdrop-blur-2xl shadow-xl z-[60]"
              style={{
                borderColor: "hsl(var(--foreground) / 0.1)",
                boxShadow: "inset 0 0 20px hsl(var(--background) / 0.2), 0 10px 30px -10px rgba(0,0,0,0.2)"
              }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial="initial"
                    whileHover="hovered"
                    animate="animate"
                    variants={{
                      initial: { x: -10, opacity: 0 },
                      animate: { x: 0, opacity: 1 }
                    }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-xl transition-colors duration-200 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground flex items-center justify-between group hover:bg-foreground/10 overflow-hidden"
                  >
                    <div className="flex overflow-hidden">
                      {item.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          variants={{
                            initial: { rotateX: 0, y: 0 },
                            hovered: { rotateX: 360, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 } }
                          }}
                          className="inline-block origin-center"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                    <motion.span
                      variants={{
                        initial: { scale: 0 },
                        hovered: { scale: 1 }
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-primary ml-4"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const NavItem = ({ item, index, isHamburger, isFlickering, isMenuOpen, onClick, onMouseEnter }: {
  item: string;
  index: number;
  isHamburger: boolean;
  isFlickering: boolean;
  isMenuOpen: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}) => {
  // When horizontal: index * gap
  // When hamburger: fixed top-right, vertical stack
  const xOffset = isHamburger ? 0 : (2 - index) * 100;
  const yOffset = isHamburger ? (index - 1) * 8 - 18 : 0;

  return (
    <Magnetic strength={isHamburger ? 0.6 : 0} range={isHamburger ? 40 : 0}>
      <motion.a
        href={isHamburger ? undefined : `#${item.toLowerCase()}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        initial={false}
        animate={{
          x: -xOffset,
          y: yOffset,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 1
        }}
        className={`absolute right-0 flex items-center justify-center p-2 group ${isHamburger ? 'cursor-pointer' : ''}`}
      >
        {/* Label - fades out into hamburger bars */}
        <motion.span
          animate={{
            opacity: isHamburger ? 0 : 1,
            x: isHamburger ? 20 : 0,
            scale: isHamburger ? 0.8 : 1,
            filter: isHamburger ? "blur(8px)" : "blur(0px)"
          }}
          transition={{ duration: 0.5 }}
          className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-200 whitespace-nowrap pointer-events-none sm:pointer-events-auto"
        >
          {item}
        </motion.span>

        {/* The Bar - only visible in hamburger mode */}
        <motion.div
          animate={isHamburger ? {
            opacity: isMenuOpen ? 0 : (isFlickering ? [1, 0.4, 1, 0.2, 1] : 1),
            rotate: 0,
            y: 0,
            scaleX: isMenuOpen ? 1.2 : (isFlickering && !isMenuOpen ? [1, 1.2, 1, 1.3, 1] : 1),
            width: 32,
            height: 2.5,
            backgroundColor: (isHamburger && isFlickering && !isMenuOpen)
              ? ["hsl(var(--foreground))", "var(--primary)", "hsl(var(--foreground))", "var(--primary)", "hsl(var(--foreground))"]
              : "hsl(var(--foreground))",
            boxShadow: (isHamburger && isFlickering && !isMenuOpen)
              ? [
                "0 0 0px var(--primary)",
                "0 0 15px var(--primary)",
                "0 0 0px var(--primary)",
                "0 0 20px var(--primary)",
                "0 0 0px var(--primary)"
              ]
              : "0 0 0px var(--primary)",
          } : {
            width: 0,
            height: 0,
            opacity: 0
          }}
          transition={isFlickering && !isMenuOpen ? {
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.2,
            times: [0, 0.2, 0.4, 0.6, 1]
          } : { duration: 0.3 }}
          whileHover={isHamburger && !isFlickering && !isMenuOpen ? {
            scaleX: 1.2,
            backgroundColor: "var(--primary)",
            boxShadow: "0 0 15px var(--primary)"
          } : {}}
          className="rounded-full absolute right-2 origin-center"
        />
      </motion.a>
    </Magnetic>
  );
};

export default Navbar;
