import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // We use a placeholder audio URL. In a real app, this would be a real lullaby.
  const audioUrl =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.
        play().
        catch((e) => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: 1,
        duration: 0.8
      }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass-panel rounded-full py-2 px-4 shadow-lg">
      
      <audio ref={audioRef} src={audioUrl} loop />

      <div className="flex flex-col">
        <span className="text-xs font-semibold text-[var(--text-dark)] tracking-wider uppercase">
          Lullaby
        </span>
        <span className="text-[0.65rem] text-[var(--text-main)] italic">
          ♪ Tap to play
        </span>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-10 h-10 rounded-full bg-[var(--blush)] flex items-center justify-center text-white hover:bg-[var(--blush-dark)] transition-colors shadow-sm"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}>
        
        {isPlaying ?
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg> :

        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        }
      </button>

      {/* Animated sound waves when playing */}
      {isPlaying &&
      <div className="absolute -top-2 -right-2 flex gap-1">
          {[1, 2, 3].map((i) =>
        <motion.div
          key={i}
          animate={{
            height: ['4px', '12px', '4px']
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.2
          }}
          className="w-1 bg-[var(--lavender-dark)] rounded-full" />

        )}
        </div>
      }
    </motion.div>);

}