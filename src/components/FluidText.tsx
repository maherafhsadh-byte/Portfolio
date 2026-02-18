import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface FluidTextProps {
    text: string;
    className?: string;
}

export const FluidText = ({ text, className }: FluidTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Loop Animation State
    const xPercent = useMotionValue(-20);

    // Mouse Interaction State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const controls = animate(xPercent, 120, {
            duration: 3,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
        });
        return controls.stop;
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Loop Mask
    const loopMaskImage = useMotionTemplate`radial-gradient(circle 150px at ${xPercent}% 50%, black 30%, transparent 100%)`;

    // Mouse Mask
    const mouseMaskImage = useMotionTemplate`radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`;

    return (
        <div
            ref={containerRef}
            className={cn("relative inline-block select-none cursor-default", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Base Layer: White Text */}
            <h1 className="relative z-10 text-foreground m-0">
                {text}<span className="text-primary">.</span>
            </h1>

            {/* Loop Layer: Visible when NOT hovering */}
            <motion.h1
                className="absolute inset-0 z-20 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 m-0"
                style={{
                    maskImage: loopMaskImage,
                    WebkitMaskImage: loopMaskImage,
                }}
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
            >
                {text}<span className="text-primary">.</span>
            </motion.h1>

            {/* Mouse Layer: Visible when HOVERING */}
            <motion.h1
                className="absolute inset-0 z-20 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 m-0"
                style={{
                    maskImage: mouseMaskImage,
                    WebkitMaskImage: mouseMaskImage,
                }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
            >
                {text}<span className="text-primary">.</span>
            </motion.h1>
        </div>
    );
};
