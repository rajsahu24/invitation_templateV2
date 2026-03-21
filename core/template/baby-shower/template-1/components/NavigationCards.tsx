import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SectionType = 'event' | 'gallery' | 'rsvp';
interface NavigationCardsProps {
  onNavigate: (section: SectionType) => void;
}

const cards = [
  {
    id: 'event' as SectionType,
    title: 'Event Details',
    desc: 'When & Where to Celebrate',
    gradient: 'linear-gradient(135deg, #F8E8E0 0%, #F5D5CC 50%, #EEBCB0 100%)',
    glow: 'rgba(196,160,176,0.4)',
    accent: '#C4A0B0',
    iconBg: 'rgba(196,160,176,0.15)',
    particles: ['✿', '❀', '✾'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="32" rx="5" fill="rgba(196,160,176,0.2)" stroke="#C4A0B0" strokeWidth="2"/>
        <rect x="6" y="10" width="36" height="10" rx="5" fill="rgba(196,160,176,0.35)" stroke="#C4A0B0" strokeWidth="2"/>
        <line x1="16" y1="6" x2="16" y2="14" stroke="#C4A0B0" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="32" y1="6" x2="32" y2="14" stroke="#C4A0B0" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="17" cy="28" r="2.5" fill="#C4A0B0"/>
        <circle cx="24" cy="28" r="2.5" fill="#C4A0B0" opacity="0.6"/>
        <circle cx="31" cy="28" r="2.5" fill="#C4A0B0" opacity="0.3"/>
        <circle cx="17" cy="35" r="2.5" fill="#C4A0B0" opacity="0.5"/>
        <circle cx="24" cy="35" r="2.5" fill="#C4A0B0"/>
      </svg>
    ),
  },
  {
    id: 'gallery' as SectionType,
    title: 'Memories',
    desc: 'Our Precious Photo Gallery',
    gradient: 'linear-gradient(135deg, #E8DCF0 0%, #D8C8E8 50%, #C4B0D8 100%)',
    glow: 'rgba(196,176,216,0.4)',
    accent: '#9B7EC8',
    iconBg: 'rgba(155,126,200,0.15)',
    particles: ['✦', '✧', '⋆'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="10" width="28" height="22" rx="4" fill="rgba(155,126,200,0.2)" stroke="#9B7EC8" strokeWidth="2"/>
        <rect x="16" y="16" width="28" height="22" rx="4" fill="rgba(155,126,200,0.15)" stroke="#9B7EC8" strokeWidth="2"/>
        <circle cx="13" cy="18" r="3" fill="rgba(212,168,75,0.6)"/>
        <path d="M4 26 L10 20 L16 26 L20 22 L32 32" stroke="#9B7EC8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="25" cy="22" r="3" fill="rgba(212,168,75,0.6)"/>
        <path d="M16 30 L22 24 L28 30 L32 26 L44 34" stroke="#9B7EC8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'rsvp' as SectionType,
    title: 'RSVP',
    desc: "Let Us Know You're Coming",
    gradient: 'linear-gradient(135deg, #FDF8F0 0%, #FAF0DC 50%, #F5E8C8 100%)',
    glow: 'rgba(212,168,75,0.35)',
    accent: '#C5963A',
    iconBg: 'rgba(212,168,75,0.15)',
    particles: ['♡', '♥', '❣'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="12" width="40" height="28" rx="5" fill="rgba(212,168,75,0.15)" stroke="#C5963A" strokeWidth="2"/>
        <path d="M4 17 L24 29 L44 17" stroke="#C5963A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 28 L4 40" stroke="#C5963A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M28 28 L44 40" stroke="#C5963A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M24 20 C24 20, 21 17, 19 19 C17 21, 19 24, 24 27 C29 24, 31 21, 29 19 C27 17, 24 20, 24 20 Z" fill="#C5963A" opacity="0.7"/>
      </svg>
    ),
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function NavigationCards({ onNavigate }: NavigationCardsProps) {
  const [hovered, setHovered] = useState<SectionType | null>(null);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl px-4 pb-12 z-10 relative"
    >
      {cards.map((card) => (
        <motion.button
          key={card.id}
          variants={item}
          whileHover={{ scale: 1.05, y: -6 }}
          whileTap={{ scale: 0.97 }}
          onHoverStart={() => setHovered(card.id)}
          onHoverEnd={() => setHovered(null)}
          onClick={() => onNavigate(card.id)}
          className="relative flex flex-col items-center justify-center p-6 rounded-3xl text-center overflow-hidden"
          style={{
            background: card.gradient,
            boxShadow: hovered === card.id
              ? `0 20px 40px ${card.glow}, 0 0 0 1px rgba(255,255,255,0.6)`
              : `0 4px 20px ${card.glow}, 0 0 0 1px rgba(255,255,255,0.4)`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Shimmer sweep on hover */}
          <AnimatePresence>
            {hovered === card.id && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)',
                  zIndex: 1,
                }}
              />
            )}
          </AnimatePresence>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {card.particles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute text-xs select-none"
                style={{
                  color: card.accent,
                  opacity: 0.35,
                  left: `${20 + i * 28}%`,
                  top: `${15 + i * 20}%`,
                  fontSize: 10 + i * 2,
                }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.25, 0.55, 0.25],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 3 + i * 0.8,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeInOut',
                }}
              >
                {p}
              </motion.span>
            ))}
          </div>

          {/* Icon with pulse ring */}
          <div className="relative z-10 mb-4">
            <motion.div
              animate={hovered === card.id ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative p-4 rounded-2xl"
              style={{ background: card.iconBg }}
            >
              {/* Pulse ring */}
              <AnimatePresence>
                {hovered === card.id && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `2px solid ${card.accent}` }}
                  />
                )}
              </AnimatePresence>
              {card.icon}
            </motion.div>
          </div>

          {/* Text */}
          <div className="relative z-10">
            <h3 className="text-2xl text-[var(--text-dark)] mb-1 leading-tight">{card.title}</h3>
            <p className="text-xs tracking-wide text-[var(--text-main)] italic leading-snug">{card.desc}</p>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-0.5 rounded-full"
            style={{ background: card.accent, translateX: '-50%' }}
            animate={hovered === card.id ? { width: '70%', opacity: 1 } : { width: '0%', opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
}
