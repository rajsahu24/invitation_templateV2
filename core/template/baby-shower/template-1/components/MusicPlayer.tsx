import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function MusicPlayer({ audioRef }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #F5D5CC, #D8C8E8)',
          border: '2px solid rgba(255,255,255,0.7)',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <AnimatePresence>
          {isPlaying && (
            <>
              <motion.div
                key="r1"
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(196,160,176,0.5)' }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                key="r2"
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(196,160,176,0.35)' }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>

        {isPlaying ? (
          <div className="flex items-end gap-[3px] h-5">
            {[0.4, 0.7, 1, 0.6, 0.85].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full"
                style={{ background: '#C4A0B0', height: 20, originY: 1 }}
                animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
              />
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="#C4A0B0" className="w-6 h-6 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}
