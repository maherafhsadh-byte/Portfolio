import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./ui/Magnetic";

const FeaturedWorks = () => {
    return (
        <section className="relative z-10 py-24 px-8 md:px-16 lg:px-24 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex-1">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] backdrop-blur-md mb-8 shadow-sm"
                        >
                            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Featured Projects
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
                        >
                            <span className="text-muted-foreground/40">Work</span> That Moves <br className="hidden md:block" />
                            Brands Forward
                        </motion.h2>
                    </div>

                    {/* Button */}
                    <div className="flex justify-end pb-4">
                        <Magnetic strength={0.2} range={60}>
                            <motion.a
                                href="#works"
                                initial="initial"
                                whileHover="hovered"
                                animate="animate"
                                variants={{
                                    initial: { opacity: 0, scale: 0.9, y: 20 },
                                    animate: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.2 } }
                                }}
                                className="group relative flex items-center gap-8 pl-10 pr-4 py-3 bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 rounded-full font-body text-sm uppercase tracking-[0.3em] text-foreground transition-all duration-300 hover:bg-foreground/[0.08] hover:border-foreground/20 overflow-hidden"
                            >
                                <div className="flex overflow-hidden">
                                    {"SEE ALL WORKS".split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            variants={{
                                                initial: { rotateX: 0 },
                                                hovered: {
                                                    rotateX: 360,
                                                    transition: {
                                                        duration: 0.6,
                                                        ease: [0.22, 1, 0.36, 1],
                                                        delay: index * 0.04
                                                    }
                                                }
                                            }}
                                            className="inline-block origin-center whitespace-pre"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>

                                <div className="relative w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center shrink-0">
                                    <motion.div
                                        variants={{
                                            initial: { scale: 0.8, opacity: 0.5 },
                                            hovered: { scale: 1.2, opacity: 1 }
                                        }}
                                        className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(255,87,34,0.4)]"
                                    />
                                    {/* Rotating outer circle like in the image */}
                                    <motion.div
                                        variants={{
                                            initial: { rotate: 0, opacity: 0, scale: 0.8 },
                                            hovered: { rotate: 360, opacity: 1, scale: 1 }
                                        }}
                                        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border border-primary/30 border-t-primary"
                                    />
                                </div>
                            </motion.a>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWorks;
