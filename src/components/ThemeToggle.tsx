import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "./ui/Magnetic";

interface ThemeToggleProps {
    showLines?: boolean;
}

export const ThemeToggle = ({ showLines = true }: ThemeToggleProps) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);

        const interval = setInterval(() => {
            setIsAnimating(prev => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex flex-col items-center group"
        >
            <motion.div
                animate={{
                    height: showLines ? 48 : 0,
                    opacity: showLines ? 1 : 0
                }}
                className="w-[1px] bg-gradient-to-t from-foreground/20 to-transparent overflow-hidden"
            />

            <Magnetic strength={0.4} range={100}>
                <div className="relative w-10 h-10 my-4 flex items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 glass-morphism hover:border-primary/50 transition-colors duration-300">
                    {/* Buffering Animation Border */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-110" viewBox="0 0 40 40">
                        <motion.circle
                            cx="20"
                            cy="20"
                            r="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="text-primary"
                            animate={isAnimating ? {
                                strokeDasharray: ["1 150", "30 150", "1 150"],
                                rotate: 360,
                                opacity: 1,
                                scale: 1,
                            } : {
                                opacity: 0,
                                scale: 0.8,
                            }}
                            transition={{
                                duration: isAnimating ? 2 : 0.5,
                                repeat: isAnimating ? Infinity : 0,
                                ease: isAnimating ? "linear" : "easeOut"
                            }}
                        />
                        <motion.circle
                            cx="20"
                            cy="20"
                            r="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="1 10"
                            className="text-primary/20"
                            animate={isAnimating ? {
                                rotate: -360,
                                opacity: 1,
                            } : {
                                opacity: 0,
                            }}
                            transition={{
                                duration: isAnimating ? 10 : 0.5,
                                repeat: isAnimating ? Infinity : 0,
                                ease: "linear"
                            }}
                        />
                    </svg>

                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <motion.div
                                key="sun"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Sun size={18} className="text-primary" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="moon"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Moon size={18} className="text-foreground" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Magnetic>

            <motion.div
                animate={{
                    height: showLines ? 48 : 0,
                    opacity: showLines ? 1 : 0
                }}
                className="w-[1px] bg-gradient-to-b from-foreground/20 to-transparent overflow-hidden"
            />
        </motion.button>
    );
};
