import React, { useCallback, useEffect, useState, Children } from 'react';
import { motion } from 'framer-motion';
interface CountdownScreenProps {
  onNext: () => void;
  name?: string;
  targetDate?: string;
  message?: string;
}
function BubbleField() {
  const bubbles = Array.from({
    length: 25
  }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 10 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    color: [
    'rgba(244, 114, 182, 0.15)',
    'rgba(167, 139, 250, 0.15)',
    'rgba(253, 186, 116, 0.15)'][
    Math.floor(Math.random() * 3)]
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) =>
      <motion.div
        key={bubble.id}
        className="absolute rounded-full"
        style={{
          left: `${bubble.x}%`,
          top: `${bubble.y}%`,
          width: bubble.size,
          height: bubble.size,
          background: bubble.color,
          backdropFilter: 'blur(2px)',
          border: `1px solid ${bubble.color.replace('0.15', '0.3')}`
        }}
        animate={{
          y: ['0vh', '-120vh'],
          x: ['0px', `${(Math.random() - 0.5) * 100}px`],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: bubble.duration,
          repeat: Infinity,
          delay: bubble.delay,
          ease: 'linear'
        }} />

      )}
    </div>);

}
function CountdownDigit({ value, label }: {value: string;label: string;}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-xl px-2 py-2 sm:px-4 sm:py-3 min-w-[48px] sm:min-w-[70px] flex items-center justify-center bg-white"
        style={{
          border: '1px solid rgba(167, 139, 250, 0.3)',
          boxShadow: '0 4px 15px rgba(167, 139, 250, 0.1)'
        }}>
        <motion.span
          key={value}
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: '#E91E7B' }}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}>
          {value}
        </motion.span>
      </div>
      <span
        className="font-sans text-[9px] sm:text-xs tracking-[0.15em] mt-2 uppercase font-medium"
        style={{ color: '#4A1942' }}>
        {label}
      </span>
    </div>);
}
export function CountdownScreen({ onNext, name = 'Rohan', targetDate, message }: CountdownScreenProps) {
  const [totalSeconds, setTotalSeconds] = useState(() => {
    if (targetDate) {
      const diff = Math.floor((new Date(targetDate).getTime() - Date.now()) / 1000);
      return Math.max(diff, 0);
    }
    return 22 * 86400 + 5 * 3600 + 3 * 60;
  });
  const tick = useCallback(() => {
    setTotalSeconds((prev) => prev > 0 ? prev - 1 : 0);
  }, []);
  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds % 86400 / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{
        background: 'linear-gradient(135deg, #F0E6FF 0%, #FFF5F7 100%)' // Lavender to white
      }}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        x: -50
      }}
      transition={{
        duration: 0.6
      }}>
      
      <BubbleField />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-sm px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible">

        {/* Subtitle */}
        <motion.p
          className="font-serif text-base sm:text-lg md:text-xl italic"
          style={{ color: '#4A1942' }}
          variants={itemVariants}>
          Someone crafted something magical for...
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-script mt-3 mb-6"
          style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)', lineHeight: 1.2 }}
          variants={itemVariants}>
          <span className="text-gradient-rose-coral text-glow-rose">{name}</span>
        </motion.h1>

        {/* Magic begins label */}
        <motion.p
          className="font-serif text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase mb-4 font-semibold"
          style={{ color: '#4A1942' }}
          variants={itemVariants}>
          The Magic Begins In
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="flex items-center gap-1.5 sm:gap-3 md:gap-5 mb-8"
          variants={itemVariants}>
          <CountdownDigit value={String(days).padStart(2, '0')} label="Days" />
          <span className="font-serif text-xl sm:text-3xl md:text-4xl -mt-5 font-bold" style={{ color: '#A78BFA' }}>:</span>
          <CountdownDigit value={String(hours).padStart(2, '0')} label="Hours" />
          <span className="font-serif text-xl sm:text-3xl md:text-4xl -mt-5 font-bold" style={{ color: '#A78BFA' }}>:</span>
          <CountdownDigit value={String(minutes).padStart(2, '0')} label="Minutes" />
          <span className="font-serif text-xl sm:text-3xl md:text-4xl -mt-5 font-bold" style={{ color: '#A78BFA' }}>:</span>
          <CountdownDigit value={String(seconds).padStart(2, '0')} label="Seconds" />
        </motion.div>

        {/* Tag line — only shown when targetDate is provided */}
        {/* {targetDate && message && (
          <motion.p
            className="font-serif italic text-sm md:text-base mb-8 px-4"
            style={{ color: '#9D174D' }}
            variants={itemVariants}>
            {message}
          </motion.p>
        )} */}

        {/* Peek button */}
        <motion.button
          className="font-sans text-sm font-medium px-8 py-3 rounded-full cursor-pointer transition-all bg-white"
          style={{
            color: '#E91E7B',
            border: '1px solid rgba(233, 30, 123, 0.3)',
            boxShadow: '0 4px 15px rgba(233, 30, 123, 0.1)'
          }}
          variants={itemVariants}
          whileHover={{
            boxShadow: '0 6px 20px rgba(233, 30, 123, 0.2)',
            borderColor: 'rgba(233, 30, 123, 0.6)',
            y: -2
          }}
          whileTap={{
            scale: 0.97
          }}
          onClick={onNext}
          aria-label="Skip countdown and peek at the surprise">
          
          Can&apos;t wait? Peek now ✨
        </motion.button>
      </motion.div>
    </motion.div>);

}