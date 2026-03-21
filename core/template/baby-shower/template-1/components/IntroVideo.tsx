import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEO_URL =
  'https://res.cloudinary.com/dwbed0m72/video/upload/v1774093291/872df443-9fa4-461f-af6f-8ac18065adb9_iru2ub.mp4';

interface IntroVideoProps {
  onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleTap = () => {
    if (!videoRef.current) return;
    if (!playing) {
      videoRef.current.play();
      setPlaying(true);
      setShowHint(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
      onClick={handleTap}
      initial={{ opacity: 1 }}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        onEnded={onComplete}
      />

      {/* Dark overlay — fades out once playing */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-6"
          >
            {/* Floating petals */}
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl select-none pointer-events-none"
                style={{
                  left: `${10 + i * 11}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  opacity: 0.4,
                }}
                animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 20, 0] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
              >
                {['✿', '❀', '✦', '♡', '✾', '⋆', '❣', '✧'][i]}
              </motion.span>
            ))}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl text-white drop-shadow-lg text-center px-8"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              A Little One is Coming
            </motion.h1>

            {/* Tap hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Ripple play button */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute w-20 h-20 rounded-full border-2 border-white/40"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute w-20 h-20 rounded-full border-2 border-white/30"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center"
                    >
                      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="text-white/70 text-sm tracking-widest uppercase">Tap to play</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={(e) => { e.stopPropagation(); onComplete(); }}
        className="absolute bottom-8 right-6 text-white/50 hover:text-white/90 text-sm tracking-widest uppercase transition-colors flex items-center gap-1"
      >
        Skip
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
