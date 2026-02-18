import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2200); // Wait for animation to finish
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const curtainVariants: Variants = {
        initial: { y: 0 },
        animate: (i: number) => ({
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1],
                delay: 1 + i * 0.1,
            }
        })
    };

    const textVariants: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.4,
                ease: "easeIn",
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col pointer-events-none"
            initial="initial"
            animate="animate"
        >
            {/* Curtain Panels */}
            <div className="absolute inset-0 flex">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={curtainVariants}
                        className="h-full flex-1 bg-[#121212]"
                    />
                ))}
            </div>

            {/* Loading Text/Logo */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden pointer-events-auto">
                <motion.div
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-center"
                >
                    <h2 className="font-display text-2xl font-bold tracking-[0.2em] text-white">
                        MAHER<span className="text-primary">AF</span>
                    </h2>
                    <motion.div
                        className="h-[1px] bg-primary mx-auto mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: 60 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
