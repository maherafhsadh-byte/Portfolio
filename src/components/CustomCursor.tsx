import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const trailY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const isClicking = useMotionValue(0);
  const clickSpring = useSpring(isClicking, { damping: 15, stiffness: 300 });
  const isHidden = useMotionValue(1);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Clear idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      // Stop any active repositioning animation
      cursorX.stop();
      cursorY.stop();

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check for hidden cursor data attribute
      const target = e.target as HTMLElement;
      const shouldHide = target.closest('[data-cursor-hidden="true"]');
      isHidden.set(shouldHide ? 0 : 1);

      // Set new idle timer
      idleTimerRef.current = setTimeout(() => {
        const indicator = document.getElementById("scroll-indicator");
        if (indicator) {
          const rect = indicator.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.bottom + 10; // Slightly under the indicator

          animate(cursorX, targetX, { duration: 0.8, ease: "easeInOut" });
          animate(cursorY, targetY, { duration: 0.8, ease: "easeInOut" });
        }
      }, 2000);
    };

    const handleDown = () => isClicking.set(1);
    const handleUp = () => isClicking.set(0);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Smooth visibility transition (Grow/Shrink)
  const visibilitySpring = useSpring(isHidden, { damping: 20, stiffness: 300 });

  // Smooth click scale (1 -> 0.7)
  const clickScale = useTransform(clickSpring, [0, 1], [1, 0.7]);

  // Combined scale for the ring
  const ringScale = useTransform([visibilitySpring, clickScale], ([v, c]: any) => v * c);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: visibilitySpring,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-foreground/40 pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
        }}
      />
    </>
  );
};

export default CustomCursor;
