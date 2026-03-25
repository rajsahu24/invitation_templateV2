import React, { Children } from 'react';
import { motion } from 'framer-motion';
interface LetterScreenProps {
  onNext: () => void;
  name?: string;
  message?: string;
}
function BirthdayPresents() {
  return (
    <motion.svg
      width="100"
      height="90"
      viewBox="0 0 100 90"
      className="opacity-90"
      animate={{
        y: [-2, 2, -2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      
      {/* Bottom present - pastel blue */}
      <rect x="10" y="50" width="45" height="35" rx="4" fill="#BAE1FF" />
      <line
        x1="32.5"
        y1="50"
        x2="32.5"
        y2="85"
        stroke="#F472B6"
        strokeWidth="2.5" />
      
      <line
        x1="10"
        y1="67.5"
        x2="55"
        y2="67.5"
        stroke="#F472B6"
        strokeWidth="2.5" />
      
      {/* Bow */}
      <ellipse cx="28" cy="48" rx="6" ry="4" fill="#F472B6" />
      <ellipse cx="37" cy="48" rx="6" ry="4" fill="#F472B6" />
      <circle cx="32.5" cy="48" r="2.5" fill="#E91E7B" />

      {/* Middle present - pastel pink */}
      <rect x="35" y="28" width="38" height="30" rx="4" fill="#FFB3BA" />
      <line
        x1="54"
        y1="28"
        x2="54"
        y2="58"
        stroke="#A78BFA"
        strokeWidth="2.5" />
      
      <line
        x1="35"
        y1="43"
        x2="73"
        y2="43"
        stroke="#A78BFA"
        strokeWidth="2.5" />
      
      {/* Bow */}
      <ellipse cx="49.5" cy="26" rx="5.5" ry="3.5" fill="#A78BFA" />
      <ellipse cx="58.5" cy="26" rx="5.5" ry="3.5" fill="#A78BFA" />
      <circle cx="54" cy="26" r="2" fill="#8B5CF6" />

      {/* Top present - pastel mint */}
      <rect x="45" y="5" width="30" height="25" rx="4" fill="#BAFFC9" />
      <line x1="60" y1="5" x2="60" y2="30" stroke="#FDBA74" strokeWidth="2" />
      <line
        x1="45"
        y1="17.5"
        x2="75"
        y2="17.5"
        stroke="#FDBA74"
        strokeWidth="2" />
      
      {/* Bow */}
      <ellipse cx="56" cy="3.5" rx="5" ry="3" fill="#FDBA74" />
      <ellipse cx="64" cy="3.5" rx="5" ry="3" fill="#FDBA74" />
      <circle cx="60" cy="3.5" r="1.8" fill="#F97316" />
    </motion.svg>);

}
export function LetterScreen({ onNext, name = 'Rohan', message }: LetterScreenProps) {
  const letterLines = message?.split('\n') ??    [
    `Dear ${name},`,
    '',
     `On this special day, I want you to know just how much you mean to me. You light up every room you walk into, and your kindness touches everyone around you.`,
    '',
    `You are not just a year older — you are a year more wonderful, a year more wise, and a year more loved.`,
    '',
    `Happy Birthday, ${name}. Here's to many more adventures together.`,
    '',
    'With all my love ❤️',
  ];
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8
      }
    }
  };
  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative overflow-hidden px-4 py-8"
      style={{
        background: '#FFFDF7' // Warm cream
      }}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.6
      }}>
      
      {/* Floating petals */}
      {Array.from({
        length: 15
      }).map((_, i) =>
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 8 + Math.random() * 8,
          height: 4 + Math.random() * 4,
          background: i % 2 === 0 ? '#FFE4EC' : '#F0E6FF',
          left: `${Math.random() * 100}%`,
          top: -20,
          opacity: 0.6
        }}
        animate={{
          y: ['0vh', '110vh'],
          x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
          rotate: [0, 360]
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: 'linear'
        }} />

      )}

      {/* Letter card */}
      <motion.div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden paper-texture no-scrollbar"
        style={{
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 10px 40px rgba(157, 23, 77, 0.08)',
          border: '1px solid rgba(244, 114, 182, 0.2)' // Soft rose border
        }}
        initial={{
          scale: 0.8,
          y: 20,
          opacity: 0
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2
        }}>
        
        <div className="p-8 md:p-10 relative">
          {/* Letter content */}
          <motion.div
            className="space-y-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            
            {letterLines.map((line, i) =>
            <motion.p
              key={i}
              className={`${i === 0 ? 'font-script text-3xl mb-4' : line === '' ? 'h-3' : line.startsWith('With') ? 'font-serif italic text-base mt-6' : line.startsWith('Happy') ? 'font-serif italic text-base font-bold' : 'font-serif italic text-base'} leading-relaxed`}
              style={{
                color: i === 0 ? '#E91E7B' : '#9D174D' // Rose and Dark Rose
              }}
              variants={lineVariants}>
              
                {line || '\u00A0'}
              </motion.p>
            )}
          </motion.div>

          {/* Presents illustration - bottom right */}
          <motion.div
            className="absolute bottom-4 right-4"
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 2.5,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}>
            
            <BirthdayPresents />
          </motion.div>

          {/* Continue button */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 3
            }}>
            
            <motion.button
              className="font-sans text-sm font-medium px-8 py-2.5 rounded-full cursor-pointer bg-white"
              style={{
                color: '#9D174D',
                border: '1px solid #F472B6'
              }}
              whileHover={{
                background: '#FFF5F7',
                boxShadow: '0 4px 10px rgba(244, 114, 182, 0.1)'
              }}
              whileTap={{
                scale: 0.97
              }}
              onClick={onNext}>
              
              Continue →
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>);

}