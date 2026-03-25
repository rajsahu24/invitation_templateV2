import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrosshairIcon } from 'lucide-react';
import { StringLights } from './StringLights';
interface BalloonPopScreenProps {
  onNext: () => void;
  name:string
}
interface BalloonConfig {
  word: string;
  color: string;
  gradient: string;
  glow: string;
  highlightColor: string;
  size: number;
  xOffset: number;
  yOffset: number;
  bobDuration: number;
  bobDelay: number;
}
const BALLOONS: BalloonConfig[] = [
{
  word: 'SPECIAL',
  color: '#F9A8D4',
  gradient: 'linear-gradient(135deg, #FDF2F8 0%, #F9A8D4 40%, #F472B6 100%)',
  glow: 'rgba(244, 114, 182, 0.4)',
  highlightColor: 'rgba(255, 255, 255, 0.8)',
  size: 130,
  xOffset: -100,
  yOffset: 0,
  bobDuration: 3,
  bobDelay: 0
},
{
  word: 'AMAZING',
  color: '#C4B5FD',
  gradient: 'linear-gradient(135deg, #F5F3FF 0%, #C4B5FD 40%, #A78BFA 100%)',
  glow: 'rgba(167, 139, 250, 0.4)',
  highlightColor: 'rgba(255, 255, 255, 0.8)',
  size: 110,
  xOffset: 100,
  yOffset: -20,
  bobDuration: 3.5,
  bobDelay: 0.5
},
{
  word: 'MY ROCK',
  color: '#FDBA74',
  gradient: 'linear-gradient(135deg, #FFF7ED 0%, #FDBA74 40%, #FB923C 100%)',
  glow: 'rgba(251, 146, 60, 0.4)',
  highlightColor: 'rgba(255, 255, 255, 0.8)',
  size: 95,
  xOffset: 0,
  yOffset: 30,
  bobDuration: 4,
  bobDelay: 1
}];

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}
function Balloon({
  config,
  popped



}: {config: BalloonConfig;popped: boolean;}) {
  const w = config.size;
  const h = config.size * 1.2;
  return (
    <AnimatePresence>
      {!popped &&
      <motion.div
        className="absolute flex flex-col items-center"
        style={{
          left: `calc(50% + ${config.xOffset}px - ${w / 2}px)`,
          top: `calc(40% + ${config.yOffset}px)`
        }}
        animate={{
          y: [0, -14, 0]
        }}
        transition={{
          duration: config.bobDuration,
          repeat: Infinity,
          delay: config.bobDelay,
          ease: 'easeInOut'
        }}
        exit={{
          scale: [1, 1.3, 0],
          opacity: [1, 0.8, 0],
          transition: {
            duration: 0.4,
            ease: 'easeOut'
          }
        }}>
        
          {/* Balloon body */}
          <div
          className="relative flex items-center justify-center"
          style={{
            width: w,
            height: h,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            background: config.gradient,
            boxShadow: `0 10px 20px rgba(0,0,0,0.05), inset -10px -10px 20px rgba(0,0,0,0.05)`
          }}>
          
            {/* Highlight */}
            <div
            className="absolute rounded-full"
            style={{
              width: w * 0.25,
              height: h * 0.35,
              top: '15%',
              left: '20%',
              background: config.highlightColor,
              borderRadius: '50%',
              filter: 'blur(4px)',
              transform: 'rotate(-20deg)'
            }} />
          
            {/* Word */}
            <span
            className="font-sans font-bold text-center relative z-10"
            style={{
              fontSize: config.size < 100 ? 11 : 13,
              color: '#4A1942',
              letterSpacing: '0.05em'
            }}>
            
              {config.word}
            </span>
          </div>

          {/* Tie */}
          <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `10px solid ${config.color}`,
            marginTop: -2
          }} />
        

          {/* String */}
          <svg width="2" height="60" className="mt-0">
            <line
            x1="1"
            y1="0"
            x2="1"
            y2="60"
            stroke="#D1D5DB"
            strokeWidth="1.5"
            strokeDasharray="4 3" />
          
          </svg>
        </motion.div>
      }
    </AnimatePresence>);

}
function BurstEffect({ particles }: {particles: BurstParticle[];}) {
  return (
    <>
      {particles.map((p) =>
      <motion.div
        key={p.id}
        className="absolute rounded-full"
        style={{
          left: p.x,
          top: p.y,
          width: 8,
          height: 8,
          background: p.color
        }}
        initial={{
          scale: 1,
          opacity: 1
        }}
        animate={{
          x: (Math.random() - 0.5) * 250,
          y: (Math.random() - 0.5) * 250,
          scale: 0,
          opacity: 0
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }} />

      )}
    </>);

}
export function BalloonPopScreen({ onNext, name='rohan' }: BalloonPopScreenProps) {
  const [popped, setPopped] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const handlePop = () => {
    if (popped) return;
    setPopped(true);
    // Generate burst particles
    const particles: BurstParticle[] = [];
    const colors = ['#F9A8D4', '#C4B5FD', '#FDBA74', '#6EE7B7', '#FCD34D'];
    for (let i = 0; i < 40; i++) {
      particles.push({
        id: i,
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 150,
        y: window.innerHeight * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setBurstParticles(particles);
    setTimeout(() => setShowWords(true), 500);
    setTimeout(onNext, 3000);
  };
  return (
    <motion.div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #E6FFF5 0%, #FFF5F7 100%)' // Mint to white
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
      
      {/* String lights */}
      <div className="pt-4 px-2">
        <StringLights />
      </div>

      {/* Title */}
      <motion.h1
        className="font-serif text-2xl md:text-3xl font-bold text-center mt-8 px-4"
        style={{
          color: '#4A1942'
        }} // Plum
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
          duration: 0.6
        }}>
        
        {name}, you are so...
      </motion.h1>

      {/* Balloons area */}
      <div className="flex-1 relative">
        {BALLOONS.map((balloon) =>
        <Balloon key={balloon.word} config={balloon} popped={popped} />
        )}

        <BurstEffect particles={burstParticles} />

        {/* Revealed words */}
        <AnimatePresence>
          {showWords &&
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.5
            }}>
            
              {BALLOONS.map((b, i) =>
            <motion.span
              key={b.word}
              className="font-serif font-bold text-4xl md:text-5xl"
              style={{
                color: b.color.
                replace('A8D4', '72B6').
                replace('B5FD', '8BFA').
                replace('BA74', '923C'),
                textShadow: `0 4px 10px rgba(0,0,0,0.05)`
              }}
              initial={{
                y: 20,
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: i * 0.2,
                duration: 0.5,
                type: 'spring'
              }}>
              
                  {b.word}
                </motion.span>
            )}
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Pop button */}
      {!popped &&
      <motion.div
        className="pb-12 flex justify-center"
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.6,
          duration: 0.6
        }}>
        
          <motion.button
          className="flex items-center gap-3 font-sans font-bold text-white text-lg px-8 py-4 rounded-full cursor-pointer shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #F472B6, #E91E7B)',
            animation: 'pulseGlowRose 2s ease-in-out infinite'
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handlePop}
          aria-label="Pop the balloons to reveal messages">
          
            <CrosshairIcon className="w-5 h-5" />
            Pop the balloons!
          </motion.button>
        </motion.div>
      }
    </motion.div>);

}