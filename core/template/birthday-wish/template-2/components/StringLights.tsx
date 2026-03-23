import React from 'react';
import { motion } from 'framer-motion';
const LIGHT_COLORS = [
{
  color: '#FFB3BA',
  glow: 'rgba(255, 179, 186, 0.8)'
},
{
  color: '#FFDFBA',
  glow: 'rgba(255, 223, 186, 0.8)'
},
{
  color: '#FFFFBA',
  glow: 'rgba(255, 255, 186, 0.8)'
},
{
  color: '#BAFFC9',
  glow: 'rgba(186, 255, 201, 0.8)'
},
{
  color: '#BAE1FF',
  glow: 'rgba(186, 225, 255, 0.8)'
},
{
  color: '#E8BAFF',
  glow: 'rgba(232, 186, 255, 0.8)'
},
{
  color: '#FFB3BA',
  glow: 'rgba(255, 179, 186, 0.8)'
},
{
  color: '#FFDFBA',
  glow: 'rgba(255, 223, 186, 0.8)'
} // Pastel Peach
];
export function StringLights() {
  const lightCount = LIGHT_COLORS.length;
  const svgWidth = 400;
  const svgHeight = 50;
  const padding = 30;
  const lightPositions = LIGHT_COLORS.map((_, i) => {
    const x = padding + i * (svgWidth - 2 * padding) / (lightCount - 1);
    const progress = i / (lightCount - 1);
    const sag = Math.sin(progress * Math.PI) * 18;
    const y = 12 + sag;
    return {
      x,
      y
    };
  });
  const wirePath = `M ${padding - 10},8 ${lightPositions.map((p) => `Q ${p.x - 5},${p.y + 8} ${p.x},${p.y}`).join(' ')} L ${svgWidth - padding + 10},8`;
  return (
    <div
      className="w-full flex justify-center"
      style={{
        zIndex: 50
      }}>
      
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full max-w-lg"
        style={{
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))'
        }}>
        
        {/* Wire */}
        <path
          d={wirePath}
          fill="none"
          stroke="#D1D5DB" // Light gray wire
          strokeWidth="1.5"
          strokeLinecap="round" />
        

        {/* Lights */}
        {lightPositions.map((pos, i) => {
          const light = LIGHT_COLORS[i];
          const delay = i * 0.3 + Math.random() * 0.5;
          return (
            <g key={i}>
              {/* Glow */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill={light.glow}
                opacity={0.6}
                animate={{
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 1.5 + Math.random() * 1.5,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut'
                }}
                style={{
                  filter: `blur(4px)`
                }} />
              
              {/* Bulb socket */}
              <rect
                x={pos.x - 2}
                y={pos.y - 7}
                width="4"
                height="4"
                rx="0.5"
                fill="#9CA3AF" // Medium gray socket
              />
              {/* Bulb */}
              <motion.ellipse
                cx={pos.x}
                cy={pos.y + 1}
                rx="4.5"
                ry="6"
                fill={light.color}
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5 + Math.random() * 1.5,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut'
                }}
                style={{
                  filter: `drop-shadow(0 0 3px ${light.glow})`
                }} />
              
              {/* Highlight */}
              <ellipse
                cx={pos.x - 1.5}
                cy={pos.y - 1}
                rx="1.5"
                ry="2"
                fill="rgba(255,255,255,0.6)" />
              
            </g>);

        })}
      </svg>
    </div>);

}