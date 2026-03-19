import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_VIDEO = 'https://res.cloudinary.com/dwbed0m72/video/upload/v1773929464/Untitled_design_atgdo7.mp4';

interface IntroVideoProps {
  onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    if (started) return;
    setStarted(true);
    videoRef.current?.play();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      setVisible(false);
      setTimeout(onComplete, 900);
    };
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: '#000' }}
          onClick={handleClick}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />

          {/* Tap to begin hint */}
          <AnimatePresence>
            {!started && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3 pointer-events-none"
              >
                {/* pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full border-2"
                  style={{ borderColor: 'rgba(196,162,101,0.7)' }}
                />
                <p style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.4rem',
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.05em',
                }}>
                  Tap to open
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
