import React, { useState, useEffect, useRef, useMemo, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface OptimizedFireBorderProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
  glowColor?: string;
  electricColor?: string;
  className?: string;
  style?: CSSProperties;
  intensity?: 'low' | 'medium' | 'high';
}

const OptimizedFireBorder: React.FC<OptimizedFireBorderProps> = ({
  children,
  width = 400,
  height = 500,
  borderRadius = 24,
  glowColor = '#ff6b35',
  electricColor = '#00d4ff',
  className = '',
  style,
  intensity = 'medium'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reduce particle count based on intensity
  const particleCount = useMemo(() => {
    switch(intensity) {
      case 'low': return 4;
      case 'high': return 12;
      default: return 8;
    }
  }, [intensity]);

  // Memoize styles to prevent recalculation
  const borderStyle = useMemo(() => ({
    position: 'absolute' as const,
    inset: 0,
    borderRadius,
    border: `2px solid ${glowColor}`,
    background: `linear-gradient(135deg, transparent 30%, ${glowColor}10 50%, transparent 70%)`,
  }), [borderRadius, glowColor]);

  const glowStyle = useMemo(() => ({
    position: 'absolute' as const,
    inset: 0,
    borderRadius,
    boxShadow: `
      0 0 20px ${glowColor}40,
      0 0 40px ${electricColor}30,
      inset 0 0 20px ${glowColor}20
    `,
  }), [borderRadius, glowColor, electricColor]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height, ...style }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Static glow layer */}
      <div style={glowStyle} />
      
      {/* Animated border with CSS animation */}
      <motion.div
        style={borderStyle}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Simplified particles */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius }}>
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-2"
            style={{
              background: `linear-gradient(to top, ${i % 2 === 0 ? electricColor : glowColor}, transparent)`,
              left: `${10 + (i * (80 / particleCount))}%`,
              bottom: 0,
              willChange: 'transform',
            }}
            animate={{
              y: [-height * 0.8, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + (i * 0.2),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Simple CSS-based electric effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          background: `
            radial-gradient(circle at 20% 50%, ${electricColor}15 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, ${glowColor}15 0%, transparent 50%)
          `,
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full" style={{ borderRadius }}>
        {children}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
      `}</style>
    </motion.div>
  );
};

export default function FireOptimized() {
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setIntensity('low')}
          className={`px-4 py-2 rounded-lg transition-all ${
            intensity === 'low'
              ? 'bg-green-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Low (Performance)
        </button>
        <button
          onClick={() => setIntensity('medium')}
          className={`px-4 py-2 rounded-lg transition-all ${
            intensity === 'medium'
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setIntensity('high')}
          className={`px-4 py-2 rounded-lg transition-all ${
            intensity === 'high'
              ? 'bg-red-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          High (Quality)
        </button>
      </div>

      <OptimizedFireBorder
        width={500}
        height={600}
        borderRadius={24}
        glowColor="#ff6b35"
        electricColor="#00d4ff"
        intensity={intensity}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8 rounded-3xl">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
            Optimized Fire
          </h2>
          <p className="text-gray-400 text-center mb-2">
            Performance-Focused Animation
          </p>
          <p className="text-gray-500 text-sm text-center">
            Intensity: {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
          </p>
        </div>
      </OptimizedFireBorder>
    </div>
  );
}