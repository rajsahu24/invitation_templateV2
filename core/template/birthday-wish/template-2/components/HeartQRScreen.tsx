import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
interface HeartQRScreenProps {
  onNext: () => void;
}
function DecorativeQRGrid() {
  const size = 11;
  const grid: boolean[][] = [];
  const seed = [
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1]];

  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      grid[row][col] = seed[row][col] === 1;
    }
  }
  return (
    <div
      className="grid gap-[2px]"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }}>
      
      {grid.flat().map((filled, i) =>
      <div
        key={i}
        className="rounded-[1px]"
        style={{
          width: 8,
          height: 8,
          background: filled ?
          'linear-gradient(135deg, #E91E7B, #FF6B6B)' // Rose to Coral
          : 'rgba(233, 30, 123, 0.08)'
        }} />

      )}
    </div>);

}
function SparkleParticle({ delay }: {delay: number;}) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: 4,
        height: 4,
        background: '#F472B6',
        borderRadius: '50%',
        boxShadow: '0 0 6px #F472B6'
      }}
      animate={{
        y: [0, -20, -30],
        x: [0, (Math.random() - 0.5) * 20],
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay,
        ease: 'easeOut'
      }} />);


}
function FloatingHeart({
  delay,
  size,
  left,
  duration





}: {delay: number;size: number;left: string;duration: number;}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left,
        top: '110%',
        opacity: 0.3
      }}
      animate={{
        y: ['0vh', '-120vh'],
        x: ['0px', `${(Math.random() - 0.5) * 50}px`],
        rotate: [0, (Math.random() - 0.5) * 90]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear'
      }}>
      
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        
        <path
          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
          fill="#F472B6" />
        
      </svg>
    </motion.div>);

}
export function HeartQRScreen({ onNext }: HeartQRScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onNext, 3500);
    return () => clearTimeout(timer);
  }, [onNext]);
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4EC 100%)'
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
      
      {/* Floating pastel hearts */}
      {Array.from({
        length: 15
      }).map((_, i) =>
      <FloatingHeart
        key={i}
        delay={Math.random() * 5}
        size={10 + Math.random() * 20}
        left={`${5 + Math.random() * 90}%`}
        duration={8 + Math.random() * 7} />

      )}

      {/* Modal */}
      <motion.div
        className="relative rounded-3xl p-8 flex flex-col items-center"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(244, 114, 182, 0.3)',
          boxShadow:
          '0 10px 40px rgba(233, 30, 123, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.5)'
        }}
        initial={{
          scale: 0.8,
          opacity: 0,
          y: 20
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}>
        
        {/* Title */}
        <motion.h1
          className="font-script text-4xl md:text-5xl mb-6 text-center"
          style={{
            color: '#9D174D',
            textShadow: '0 2px 10px rgba(244, 114, 182, 0.4)'
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
            duration: 0.6
          }}>
          
          Rohan&apos;s Birthday!
        </motion.h1>

        {/* Heart with QR */}
        <motion.div
          className="relative"
          initial={{
            scale: 0,
            rotate: -10
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            type: 'spring',
            stiffness: 120
          }}>
          
          <div className="relative">
            {/* Heart shape via SVG */}
            <svg
              width="200"
              height="190"
              viewBox="0 0 200 190"
              className="drop-shadow-xl"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(233, 30, 123, 0.15))'
              }}>
              
              <defs>
                <linearGradient
                  id="heartGradLight"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%">
                  
                  <stop offset="0%" stopColor="#F472B6" /> {/* Rose Pink */}
                  <stop offset="100%" stopColor="#FF6B6B" /> {/* Coral */}
                </linearGradient>
                <clipPath id="heartClipLight">
                  <path d="M100,180 C60,140 0,110 0,60 C0,25 25,0 55,0 C75,0 92,12 100,30 C108,12 125,0 145,0 C175,0 200,25 200,60 C200,110 140,140 100,180 Z" />
                </clipPath>
              </defs>
              {/* Heart fill */}
              <path
                d="M100,180 C60,140 0,110 0,60 C0,25 25,0 55,0 C75,0 92,12 100,30 C108,12 125,0 145,0 C175,0 200,25 200,60 C200,110 140,140 100,180 Z"
                fill="url(#heartGradLight)"
                opacity="0.95" />
              
              {/* Inner white area for QR */}
              <path
                d="M100,170 C65,135 10,105 10,60 C10,30 30,10 55,10 C72,10 87,20 100,35 C113,20 128,10 145,10 C170,10 190,30 190,60 C190,105 135,135 100,170 Z"
                fill="#FFFFFF"
                opacity="0.9"
                transform="scale(0.85) translate(18, 15)" />
              
            </svg>

            {/* QR code overlay centered in heart */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                top: '25%',
                left: '50%',
                transform: 'translateX(-50%)'
              }}>
              
              <DecorativeQRGrid />
            </div>

            {/* Scan line */}
            <div
              className="absolute left-0 right-0 overflow-hidden"
              style={{
                top: 0,
                height: '100%',
                clipPath:
                'path("M100,180 C60,140 0,110 0,60 C0,25 25,0 55,0 C75,0 92,12 100,30 C108,12 125,0 145,0 C175,0 200,25 200,60 C200,110 140,140 100,180 Z")'
              }}>
              
              <motion.div
                className="absolute left-0 right-0"
                style={{
                  height: 3,
                  background:
                  'linear-gradient(90deg, transparent, rgba(233, 30, 123, 0.6), transparent)',
                  boxShadow: '0 0 10px rgba(233, 30, 123, 0.4)'
                }}
                animate={{
                  top: ['10%', '80%', '10%']
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }} />
              
            </div>
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="mt-8 flex items-center gap-3 relative"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1
          }}>
          
          {/* Spinner */}
          <motion.div
            className="rounded-full"
            style={{
              width: 18,
              height: 18,
              border: '2px solid rgba(233, 30, 123, 0.2)',
              borderTopColor: '#E91E7B'
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }} />
          
          <span
            className="font-serif text-sm tracking-wider"
            style={{
              color: '#9D174D'
            }}>
            
            Opening...
          </span>

          {/* Sparkle particles */}
          <div
            className="relative"
            style={{
              width: 20,
              height: 20
            }}>
            
            <SparkleParticle delay={0} />
            <SparkleParticle delay={0.4} />
            <SparkleParticle delay={0.8} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>);

}