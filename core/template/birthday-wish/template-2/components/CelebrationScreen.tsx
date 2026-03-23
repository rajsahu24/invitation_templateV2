import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StringLights } from './StringLights';
interface CelebrationScreenProps {
  onNext: () => void;
}
function PastelCake({ candlesLit }: {candlesLit: boolean;}) {
  const candles = Array.from({
    length: 6
  }).map((_, i) => ({
    x: 85 + i * 26,
    flickerDelay: i * 0.15,
    color: ['#FFB3BA', '#BAE1FF', '#BAFFC9', '#FFDFBA', '#E8BAFF', '#FFB3BA'][
    i]

  }));
  return (
    <svg width="280" height="260" viewBox="0 0 280 260" className="mx-auto">
      {/* Stand / plate */}
      <ellipse cx="140" cy="240" rx="90" ry="12" fill="#F3F4F6" />{' '}
      {/* Light gray */}
      <ellipse cx="140" cy="238" rx="85" ry="10" fill="#FFFFFF" />
      <rect x="120" y="225" width="40" height="15" rx="2" fill="#F3F4F6" />
      {/* Bottom tier - Pastel Pink */}
      <rect x="55" y="170" width="170" height="58" rx="8" fill="#FFE4EC" />
      {/* Frosting drips */}
      <path
        d="M55,170 Q65,185 75,170 Q85,190 95,170 Q105,180 115,170 Q125,195 135,170 Q145,185 155,170 Q165,190 175,170 Q185,180 195,170 Q205,195 215,170 Q220,175 225,170 L225,178 L55,178 Z"
        fill="#FFFFFF" />
      
      {/* Top tier - Pastel Lavender */}
      <rect x="75" y="115" width="130" height="58" rx="8" fill="#F0E6FF" />
      {/* Flower decorations */}
      <circle cx="90" cy="145" r="4" fill="#FFB3BA" />
      <circle cx="115" cy="135" r="4" fill="#BAE1FF" />
      <circle cx="140" cy="150" r="4" fill="#FFDFBA" />
      <circle cx="165" cy="135" r="4" fill="#BAFFC9" />
      <circle cx="190" cy="145" r="4" fill="#FFB3BA" />
      {/* Trim between tiers */}
      <rect x="75" y="168" width="130" height="4" rx="2" fill="#FFFFFF" />
      <rect x="55" y="226" width="170" height="4" rx="2" fill="#FFFFFF" />
      {/* Candles */}
      {candles.map((candle, i) =>
      <g key={i}>
          {/* Candle stick */}
          <rect
          x={candle.x - 2}
          y={75}
          width="4"
          height="42"
          rx="2"
          fill={candle.color} />
        
          {/* Stripes */}
          <line
          x1={candle.x - 2}
          y1={80}
          x2={candle.x + 2}
          y2={85}
          stroke="#FFF"
          strokeWidth="1.5" />
        
          <line
          x1={candle.x - 2}
          y1={95}
          x2={candle.x + 2}
          y2={100}
          stroke="#FFF"
          strokeWidth="1.5" />
        

          {/* Flame or smoke */}
          {candlesLit ?
        <g
          style={{
            animation: `flicker 0.4s ease-in-out infinite`,
            animationDelay: `${candle.flickerDelay}s`,
            transformOrigin: `${candle.x}px 72px`
          }}>
          
              <ellipse
            cx={candle.x}
            cy={65}
            rx="4"
            ry="8"
            fill="#FCD34D"
            opacity="0.9" />
          
              <ellipse
            cx={candle.x}
            cy={67}
            rx="2"
            ry="5"
            fill="#FFF"
            opacity="0.8" />
          
            </g> :

        <g>
              {/* Smoke wisps */}
              <ellipse
            cx={candle.x}
            cy={68}
            rx="2"
            ry="5"
            fill="rgba(150, 150, 150, 0.3)"
            style={{
              animation: `smokeRise 2s ease-out infinite`,
              animationDelay: `${candle.flickerDelay}s`,
              transformOrigin: `${candle.x}px 68px`
            }} />
          
            </g>
        }
        </g>
      )}
    </svg>);

}
function PastelConfetti() {
  const pieces = Array.from({
    length: 60
  }).map((_, i) => {
    const colors = [
    '#FFB3BA',
    '#BAE1FF',
    '#BAFFC9',
    '#FFDFBA',
    '#E8BAFF',
    '#FFFFFF'];

    return {
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 6 + Math.random() * 6,
      rotation: Math.random() * 360
    };
  });
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 100
      }}>
      
      {pieces.map((p) =>
      <motion.div
        key={p.id}
        className="absolute"
        style={{
          left: `${p.left}%`,
          top: -20,
          width: p.size,
          height: p.size * 0.6,
          background: p.color,
          borderRadius: 2,
          transform: `rotate(${p.rotation}deg)`
        }}
        animate={{
          y: [0, window.innerHeight + 50],
          rotate: [p.rotation, p.rotation + 720],
          opacity: [1, 1, 0.7]
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: 'linear'
        }} />

      )}
    </div>);

}
export function CelebrationScreen({ onNext }: CelebrationScreenProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blown, setBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const handleBlow = useCallback(() => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setBlown(true);
    setTimeout(() => setShowConfetti(true), 600);
  }, [candlesLit]);
  return (
    <motion.div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFE4EC 0%, #F0E6FF 100%)' // Pink to Lavender
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
      
      {/* Confetti */}
      <AnimatePresence>{showConfetti && <PastelConfetti />}</AnimatePresence>

      {/* String lights */}
      <div className="pt-4 px-2 relative z-20">
        <StringLights />
      </div>

      {/* Title */}
      <motion.h1
        className="font-script text-center mt-6 relative z-10"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)'
        }}
        initial={{
          y: -20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.3,
          duration: 0.8
        }}>
        
        <span className="text-gradient-rose-coral text-glow-rose">
          Happy Birthday Rohan!
        </span>
      </motion.h1>

      {/* Cake */}
      <motion.div
        className="flex-1 flex items-center justify-center relative z-10"
        initial={{
          scale: 0.8,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}>
        
        <PastelCake candlesLit={candlesLit} />
      </motion.div>

      {/* Blown celebration text */}
      <AnimatePresence>
        {blown &&
        <motion.p
          className="text-center font-serif text-xl absolute z-30 font-bold"
          style={{
            color: '#E91E7B',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: 'spring'
          }}>
          
            🎉 Make a wish! 🎉
          </motion.p>
        }
      </AnimatePresence>

      {/* Button */}
      <motion.div
        className="pb-12 flex justify-center relative z-20"
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.8,
          duration: 0.6
        }}>
        
        {!blown ?
        <motion.button
          className="font-sans font-bold text-white text-lg px-8 py-4 rounded-full cursor-pointer shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #F472B6, #A78BFA)',
            animation: 'pulseGlowRose 2s ease-in-out infinite'
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleBlow}
          aria-label="Tap to blow out the candles">
          
            🕯️ Tap to Blow the Candles!
          </motion.button> :

        <motion.button
          className="font-sans font-bold text-white text-lg px-8 py-4 rounded-full cursor-pointer shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #F472B6, #A78BFA)'
          }}
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: 1,
            type: 'spring'
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={onNext}
          aria-label="Wish Rohan Happy Birthday">
          
            Wish Rohan Happy Birthday! 🎂
          </motion.button>
        }
      </motion.div>
    </motion.div>);

}