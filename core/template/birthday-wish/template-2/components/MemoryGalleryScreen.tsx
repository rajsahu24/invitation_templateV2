import React from 'react';
import { motion } from 'framer-motion';
interface MemoryGalleryScreenProps {
  onNext: () => void;
}
interface PolaroidProps {
  caption: string;
  gradient: string;
  rotation: number;
  delay: number;
  xOffset: string;
  yOffset: string;
}
function Polaroid({
  caption,
  gradient,
  rotation,
  delay,
  xOffset,
  yOffset
}: PolaroidProps) {
  return (
    <motion.div
      className="absolute bg-white p-3 pb-10 shadow-lg"
      style={{
        width: 160,
        height: 190,
        left: `calc(50% + ${xOffset})`,
        top: `calc(50% + ${yOffset})`,
        borderRadius: 4,
        border: '1px solid rgba(0,0,0,0.05)'
      }}
      initial={{
        scale: 0,
        opacity: 0,
        rotate: rotation - 20,
        x: '-50%',
        y: '-50%'
      }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: rotation,
        x: '-50%',
        y: '-50%'
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay
      }}
      whileHover={{
        scale: 1.05,
        zIndex: 20,
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
      }}>
      
      {/* Photo area placeholder */}
      <div
        className="w-full h-32 rounded-sm mb-3"
        style={{
          background: gradient
        }} />
      
      {/* Caption */}
      <p
        className="font-script text-xl text-center"
        style={{
          color: '#4A1942'
        }}>
        
        {caption}
      </p>

      {/* Subtle floating animation after entrance */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [-3, 3, -3],
          rotate: [rotation, rotation + 1, rotation - 1, rotation]
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
      
    </motion.div>);

}
export function MemoryGalleryScreen({ onNext }: MemoryGalleryScreenProps) {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF0E6 0%, #FFFDF7 100%)' // Peach to cream
      }}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        scale: 1.05
      }}
      transition={{
        duration: 0.6
      }}>
      
      {/* Background elements */}
      {Array.from({
        length: 20
      }).map((_, i) =>
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          color: i % 2 === 0 ? '#FF6B6B' : '#F59E0B',
          opacity: 0.2,
          fontSize: 10 + Math.random() * 14
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          ease: 'linear'
        }}>
        
          {i % 2 === 0 ? '♥' : '★'}
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        className="font-script text-4xl md:text-5xl mt-12 z-10"
        style={{
          color: '#FF6B6B',
          textShadow: '0 2px 10px rgba(255, 107, 107, 0.2)'
        }}
        initial={{
          y: -30,
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
        
        Cherished Moments
      </motion.h1>

      {/* Gallery Area */}
      <div className="flex-1 w-full relative">
        <Polaroid
          caption="Best friends!"
          gradient="linear-gradient(135deg, #FFE4EC, #F472B6)"
          rotation={-8}
          delay={0.6}
          xOffset="-80px"
          yOffset="-40px" />
        
        <Polaroid
          caption="Adventures!"
          gradient="linear-gradient(135deg, #E6FFF5, #6EE7B7)"
          rotation={12}
          delay={0.9}
          xOffset="70px"
          yOffset="-10px" />
        
        <Polaroid
          caption="Always there"
          gradient="linear-gradient(135deg, #F0E6FF, #A78BFA)"
          rotation={-4}
          delay={1.2}
          xOffset="-10px"
          yOffset="60px" />
        
      </div>

      {/* Next Button */}
      <motion.div
        className="pb-12 z-10"
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 2,
          duration: 0.6
        }}>
        
        <motion.button
          className="font-sans font-medium text-white px-8 py-3 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #F59E0B)'
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(255, 107, 107, 0.4)'
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={onNext}>
          
          See More Magic →
        </motion.button>
      </motion.div>
    </motion.div>);

}