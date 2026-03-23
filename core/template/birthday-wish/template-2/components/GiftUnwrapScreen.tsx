import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface GiftUnwrapScreenProps {
  onNext: () => void;
}
function GiftBox({ opened }: {opened: boolean;}) {
  return (
    <div className="relative w-48 h-48">
      {/* Box Base */}
      <motion.div
        className="absolute bottom-0 w-full h-32 rounded-b-md overflow-hidden"
        style={{
          background: '#FFB3BA'
        }} // Pastel Pink
        animate={
        opened ?
        {
          scaleY: 0.95,
          y: 5
        } :
        {
          scaleY: 1,
          y: 0
        }
        }>
        
        {/* Polka dots */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(white 15%, transparent 16%)',
            backgroundSize: '20px 20px'
          }} />
        
        {/* Vertical Ribbon */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-white opacity-80" />
      </motion.div>

      {/* Box Lid */}
      <motion.div
        className="absolute top-8 w-52 -ml-2 h-12 rounded-sm z-20"
        style={{
          background: '#FFB3BA',
          transformOrigin: 'bottom right'
        }}
        animate={
        opened ?
        {
          rotate: 15,
          x: 40,
          y: -60,
          opacity: 0
        } :
        {
          rotate: 0,
          x: 0,
          y: 0,
          opacity: 1
        }
        }
        transition={{
          duration: 0.6,
          type: 'spring'
        }}>
        
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(white 15%, transparent 16%)',
            backgroundSize: '20px 20px'
          }} />
        
        {/* Vertical Ribbon on Lid */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-white opacity-80" />
        {/* Horizontal Ribbon on Lid */}
        <div className="absolute top-1/2 left-0 right-0 h-4 -mt-2 bg-white opacity-80" />

        {/* Bow */}
        <div className="absolute -top-8 left-1/2 -ml-8 w-16 h-10">
          <div
            className="absolute left-0 w-8 h-10 rounded-full border-4 border-white opacity-80"
            style={{
              transform: 'rotate(-30deg)'
            }} />
          
          <div
            className="absolute right-0 w-8 h-10 rounded-full border-4 border-white opacity-80"
            style={{
              transform: 'rotate(30deg)'
            }} />
          
          <div className="absolute top-4 left-1/2 -ml-2 w-4 h-4 rounded-full bg-white opacity-90" />
        </div>
      </motion.div>
    </div>);

}
export function GiftUnwrapScreen({ onNext }: GiftUnwrapScreenProps) {
  const [opened, setOpened] = useState(false);
  const handleOpen = () => {
    setOpened(true);
  };
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F0E6FF 0%, #E6FFF5 100%)' // Lavender to Mint
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
        className="font-script text-4xl md:text-5xl absolute top-16 z-20"
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
          delay: 0.3
        }}>
        
        A Special Gift for You!
      </motion.h1>

      <div className="relative flex items-center justify-center mt-10">
        {/* Light Rays (visible when opened) */}
        <AnimatePresence>
          {opened &&
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 180
            }}
            transition={{
              duration: 2,
              ease: 'easeOut'
            }}>
            
              {Array.from({
              length: 12
            }).map((_, i) =>
            <div
              key={i}
              className="absolute w-1 h-64 bg-white opacity-40"
              style={{
                transformOrigin: 'bottom center',
                transform: `rotate(${i * 30}deg) translateY(-100%)`,
                filter: 'blur(4px)'
              }} />

            )}
            </motion.div>
          }
        </AnimatePresence>

        {/* The Message Card (rises from box) */}
        <AnimatePresence>
          {opened &&
          <motion.div
            className="absolute bg-white p-6 rounded-lg shadow-xl z-10 w-64 text-center"
            style={{
              border: '2px solid #FFE4EC'
            }}
            initial={{
              y: 0,
              scale: 0.5,
              opacity: 0
            }}
            animate={{
              y: -120,
              scale: 1,
              opacity: 1
            }}
            transition={{
              delay: 0.4,
              type: 'spring',
              damping: 12
            }}>
            
              <p
              className="font-script text-2xl"
              style={{
                color: '#E91E7B'
              }}>
              
                You are the greatest gift to everyone around you!
              </p>
            </motion.div>
          }
        </AnimatePresence>

        {/* The Gift Box */}
        <div className="z-20 relative">
          <GiftBox opened={opened} />
        </div>
      </div>

      {/* Action Button */}
      <motion.div
        className="absolute bottom-16 z-30"
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.6
        }}>
        
        {!opened ?
        <motion.button
          className="font-sans font-medium text-white px-8 py-3 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #F472B6)'
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleOpen}>
          
            Unwrap Your Gift! 🎁
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
          
            Continue to Party →
          </motion.button>
        }
      </motion.div>
    </motion.div>);

}