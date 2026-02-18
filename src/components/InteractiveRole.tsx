import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveRoleProps {
    role: string;
    className?: string;
}

export const InteractiveRole = ({ role, className }: InteractiveRoleProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Magnetic Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth magnetic effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Mask Position
    const maskX = useMotionValue(0);
    const maskY = useMotionValue(0);
    const maskRadius = useMotionValue(0);

    // Create the radial gradient mask dynamically
    // We expand the radius from 0 to cover the text
    const maskImage = useMotionTemplate`radial-gradient(circle ${maskRadius}px at ${maskX}px ${maskY}px, transparent 30%, black 100%)`;

    // Background Opacity (Only visible on hover)
    const bgOpacity = useMotionValue(0);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        maskX.set(e.clientX - rect.left);
        maskY.set(e.clientY - rect.top);

        bgOpacity.set(0.8);
        animate(maskRadius, 800, { duration: 0.5, ease: "easeOut" }); // Spread duration
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Mouse position relative to the element
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;

        // Magnetic attraction 
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        bgOpacity.set(0);
        animate(maskRadius, 0, { duration: 0.3 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={cn("relative inline-block cursor-none select-none", className)}
            data-cursor-hidden="true"
        >
            {/* Background Layer (The "Dissolved/Morphed" State) */}
            {/* This layer is visible THROUGH the hole in the foreground mask */}
            <motion.span
                className="absolute inset-0 text-primary"
                style={{
                    filter: "url(#dissolve-filter)",
                    opacity: bgOpacity
                }}
                aria-hidden="true"
            >
                {role}
            </motion.span>

            {/* Foreground Layer (The "Clean" State) */}
            <motion.span
                className="relative z-10 block text-foreground"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                }}
            >
                {role}
            </motion.span>
        </motion.div>
    );
};
