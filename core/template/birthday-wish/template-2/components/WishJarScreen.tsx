import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface WishJarScreenProps {
  onNext: () => void;
}
const WISHES = [
{
  text: 'Happiness',
  color: '#F472B6',
  x: -30,
  y: 20
},
{
  text: 'Success',
  color: '#A78BFA',
  x: 20,
  y: -10
},
{
  text: 'Love',
  color: '#FF6B6B',
  x: -10,
  y: -30
},
{
  text: 'Health',
  color: '#6EE7B7',
  x: 30,
  y: 30
},
{
  text: 'Adventure',
  color: '#FBBF24',
  x: 0,
  y: 10
}];

function JarIllustration() {
  return (
    <svg
      width="180"
      height="220"
      viewBox="0 0 180 220"
      className="relative z-10">
      
      {/* Back of jar */}
      <path
        d="M40,60 L140,60 C150,60 160,70 160,80 L160,190 C160,205 145,215 130,215 L50,215 C35,215 20,205 20,190 L20,80 C20,70 30,60 40,60 Z"
        fill="rgba(255,255,255,0.4)" />
      

      {/* Cork */}
      <path d="M60,20 L120,20 L125,50 L55,50 Z" fill="#D2B48C" />
      <path d="M60,20 L120,20 L125,50 L55,50 Z" fill="rgba(0,0,0,0.1)" />
      <ellipse cx="90" cy="20" rx="30" ry="8" fill="#E6C280" />

      {/* Jar Neck */}
      <rect
        x="65"
        y="45"
        width="50"
        height="15"
        rx="2"
        fill="rgba(255,255,255,0.6)" />
      
      <rect
        x="60"
        y="55"
        width="60"
        height="8"
        rx="4"
        fill="rgba(255,255,255,0.8)" />
      

      {/* Front glass reflection */}
      <path
        d="M40,60 L140,60 C150,60 160,70 160,80 L160,190 C160,205 145,215 130,215 L50,215 C35,215 20,205 20,190 L20,80 C20,70 30,60 40,60 Z"
        fill="none"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="4" />
      
      <path
        d="M35,80 L35,180"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="6"
        strokeLinecap="round" />
      
      <path
        d="M45,85 L45,150"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3"
        strokeLinecap="round" />
      
    </svg>);

}
export function WishJarScreen({ onNext }: WishJarScreenProps) {
  const [opened, setOpened] = useState(false);
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFE4EC 0%, #F0E6FF 100%)' // Pink to lavender
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
      
      {/* Title */}
      <motion.h1
        className="font-script text-4xl md:text-5xl mt-16 z-20"
        style={{
          color: '#E91E7B'
        }} // Rose
        initial={{
          y: -20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.3
        }}>
        
        Wishes for Rohan
      </motion.h1>

      <div className="flex-1 flex items-center justify-center relative w-full">
        {/* The Jar */}
        <motion.div
          className="relative"
          animate={
          opened ?
          {
            y: 20,
            opacity: 0
          } :
          {
            y: 0,
            opacity: 1
          }
          }
          transition={{
            duration: 0.5
          }}>
          
          <JarIllustration />

          {/* Orbs inside jar */}
          {!opened &&
          WISHES.map((wish, i) =>
          <motion.div
            key={i}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: 24,
              height: 24,
              background: wish.color,
              left: `calc(50% + ${wish.x}px - 12px)`,
              top: `calc(50% + ${wish.y}px)`,
              boxShadow: `0 0 10px ${wish.color}`,
              zIndex: 5
            }}
            animate={{
              y: [0, -10, 0, 5, 0],
              x: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }} />

          )}
        </motion.div>

        {/* Released Wishes */}
        <AnimatePresence>
          {opened &&
          <div className="absolute inset-0 flex items-center justify-center">
              {WISHES.map((wish, i) => {
              const angle = i / WISHES.length * Math.PI * 2;
              const radius = 100 + Math.random() * 40;
              const finalX = Math.cos(angle) * radius;
              const finalY = Math.sin(angle) * radius - 50;
              return (
                <motion.div
                  key={i}
                  className="absolute flex flex-col items-center"
                  initial={{
                    x: 0,
                    y: 50,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: finalX,
                    y: finalY,
                    scale: 1,
                    opacity: 1
                  }}
                  transition={{
                    type: 'spring',
                    damping: 12,
                    stiffness: 100,
                    delay: i * 0.15
                  }}>
                  
                    <div
                    className="w-4 h-4 rounded-full mb-2"
                    style={{
                      background: wish.color,
                      boxShadow: `0 0 15px ${wish.color}`
                    }} />
                  
                    <span
                    className="font-serif font-bold text-xl"
                    style={{
                      color: '#4A1942'
                    }}>
                    
                      {wish.text}
                    </span>
                  </motion.div>);

            })}
            </div>
          }
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <motion.div
        className="pb-12 z-20"
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.8
        }}>
        
        {!opened ?
        <motion.button
          className="font-sans font-medium text-white px-8 py-3 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #A78BFA, #F472B6)'
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => setOpened(true)}>
          
            Open the Jar ✨
          </motion.button> :

        <motion.button
          className="font-sans font-medium px-8 py-3 rounded-full bg-white"
          style={{
            color: '#9D174D',
            border: '1px solid #F472B6'
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1.5
          }}
          whileHover={{
            background: '#FFF5F7'
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={onNext}>
          
            Continue →
          </motion.button>
        }
      </motion.div>
    </motion.div>);

}