import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const trailY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const isClicking = useMotionValue(0);
  const clickSpring = useSpring(isClicking, { damping: 15, stiffness: 300 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-foreground/40 pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          scale: clickSpring.get() ? 0.7 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
