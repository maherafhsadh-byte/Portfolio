import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Magnetic } from "./ui/Magnetic";

interface ContactToggleProps {
    showLines?: boolean;
}

export const ContactToggle = ({ showLines = true }: ContactToggleProps) => {
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const resetTimer = () => {
            setIsIdle(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => setIsIdle(true), 5000);
        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("mousedown", resetTimer);
        window.addEventListener("scroll", resetTimer);

        resetTimer();

        return () => {
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("mousedown", resetTimer);
            window.removeEventListener("scroll", resetTimer);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    const glitchVariants: any = {
        idle: {
            scale: [1, 1.4, 1.25, 1.4, 1],
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 2, -2, 0],
            filter: [
                "drop-shadow(0 0 0px var(--primary))",
                "drop-shadow(-2px 0 2px #ff00c1)",
                "drop-shadow(2px 0 2px #00fff0)",
                "drop-shadow(0 0 5px var(--primary))",
                "drop-shadow(0 0 0px var(--primary))"
            ],
            transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
            }
        },
        active: {
            scale: 1,
            x: 0,
            y: 0,
            filter: "drop-shadow(0 0 0px var(--primary))"
        }
    };

    return (
        <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex flex-col items-center group pointer-events-auto"
        >
            <motion.div
                animate={{
                    height: showLines ? 48 : 0,
                    opacity: showLines ? 1 : 0
                }}
                className="w-[1px] bg-gradient-to-t from-foreground/20 to-transparent overflow-hidden"
            />

            <Magnetic strength={0.4} range={100}>
                <motion.div
                    variants={glitchVariants}
                    animate={isIdle ? "idle" : "active"}
                    className="relative w-10 h-10 my-4 flex items-center justify-center rounded-full bg-foreground/5 border border-foreground/10 glass-morphism hover:border-primary/50 transition-colors duration-300"
                >
                    <MessageSquare size={18} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
            </Magnetic>

            <motion.div
                animate={{
                    height: showLines ? 48 : 0,
                    opacity: showLines ? 1 : 0
                }}
                className="w-[1px] bg-gradient-to-b from-foreground/20 to-transparent overflow-hidden"
            />
        </motion.a>
    );
};
