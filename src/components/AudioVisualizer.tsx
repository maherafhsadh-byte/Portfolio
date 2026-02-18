import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./ui/Magnetic";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export const AudioVisualizer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                createPlayer();
            };
        } else if (window.YT && window.YT.Player) {
            createPlayer();
        }

        function createPlayer() {
            if (playerRef.current) return;

            playerRef.current = new window.YT.Player('hidden-youtube-player', {
                height: '1',
                width: '1',
                videoId: 'Q7HjxOAU5Kc',
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    enablejsapi: 1,
                    origin: window.location.origin,
                    loop: 1,
                    playlist: 'Q7HjxOAU5Kc'
                },
                events: {
                    onReady: (event: any) => {
                        // Attempt autoplay
                        event.target.playVideo();

                        // Reliability logic: Play on first interaction if blocked
                        const startOnInteraction = () => {
                            if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
                                playerRef.current.playVideo();
                                window.removeEventListener('mousedown', startOnInteraction);
                                window.removeEventListener('scroll', startOnInteraction);
                                window.removeEventListener('touchstart', startOnInteraction);
                            }
                        };
                        window.addEventListener('mousedown', startOnInteraction);
                        window.addEventListener('scroll', startOnInteraction);
                        window.addEventListener('touchstart', startOnInteraction);
                    },
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                        }
                    }
                }
            });
        }
    }, []);

    const togglePlay = () => {
        if (!playerRef.current || typeof playerRef.current.getPlayerState !== 'function') return;

        const state = playerRef.current.getPlayerState();
        if (state === window.YT.PlayerState.PLAYING) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    return (
        <Magnetic strength={0.3} range={80}>
            <motion.div
                onClick={togglePlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.1 }}
                className="relative flex items-center justify-center group cursor-pointer p-2 px-4 rounded-full"
            >
                <div id="hidden-youtube-player" className="fixed top-[-10px] left-[-10px] opacity-0 pointer-events-none -z-50 invisible" />

                {/* Background Glow Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isHovered ? 0.15 : 0,
                        scale: isHovered ? 1.2 : 0.8,
                    }}
                    className="absolute inset-0 bg-primary blur-xl rounded-full z-0"
                />

                {/* The Cutting Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{
                        scaleX: isPlaying ? 0 : 1,
                        opacity: isPlaying ? 0 : 1
                    }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute w-[120%] h-[1px] bg-foreground z-10 origin-center pointer-events-none"
                />

                {/* The Bars */}
                <div className="flex items-center gap-1.5 h-6 px-1 relative z-20">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            className={`w-1 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-primary shadow-[0_0_10px_rgba(255,107,0,0.5)]' : 'bg-foreground/60'}`}
                            animate={isPlaying ? {
                                height: ["30%", "100%", "40%"],
                            } : {
                                height: "40%"
                            }}
                            transition={{
                                duration: 0.6 + i * 0.1,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            style={{ height: "40%" }}
                        />
                    ))}
                </div>
            </motion.div>
        </Magnetic>
    );
};
