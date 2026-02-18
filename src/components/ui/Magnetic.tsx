import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    range?: number;
}

export const Magnetic = ({ children, strength = 0.5, range = 60 }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = ref.current.getBoundingClientRect();

            // Calculate center of the element relative to its original position
            // getBoundingClientRect includes the current translation (springX/springY)
            const centerX = left + width / 2 - springX.get();
            const centerY = top + height / 2 - springY.get();

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;

            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < range) {
                // Attract more as it gets closer
                const proximityWeight = 1 - distance / range;
                x.set(distanceX * strength * proximityWeight);
                y.set(distanceY * strength * proximityWeight);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [range, strength, x, y]);

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};
