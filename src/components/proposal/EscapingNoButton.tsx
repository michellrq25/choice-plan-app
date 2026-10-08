'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface EscapingNoButtonProps {
  position: {
    x: number;
    y: number;
  };
  attempts: number;
  text: string;
  onEvade: (e: React.SyntheticEvent | Event) => void;
}

const EscapingNoButton = forwardRef<HTMLButtonElement, EscapingNoButtonProps>(
  ({ position, attempts, text, onEvade }, ref) => {
    return (
      <motion.div
        key={`wrapper-${attempts}`}
        initial={{ scale: 0.25, rotate: -20, opacity: 0.6 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 18,
          mass: 0.75,
        }}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 50,
        }}
        className="relative inline-block"
      >
        {/* 1. Doble onda de choque expansiva concéntrica */}
        {/* Onda 1: Rosa neón rápida */}
        <motion.span
          key={`wave-rose-${attempts}`}
          initial={{ scale: 0.75, opacity: 0.95 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute -inset-1 rounded-2xl border-2 border-rose-400 pointer-events-none"
        />
        {/* Onda 2: Dorada / Ámbar más amplia */}
        <motion.span
          key={`wave-amber-${attempts}`}
          initial={{ scale: 0.65, opacity: 0.85 }}
          animate={{ scale: 2.7, opacity: 0 }}
          transition={{ duration: 0.65, delay: 0.07, ease: 'easeOut' }}
          className="absolute -inset-1 rounded-2xl border-2 border-amber-300 pointer-events-none"
        />

        {/* 2. Chispas mágicas de teletransporte (se dispersan hacia afuera al aterrizar) */}
        {[
          { icon: '✨', x: -50, y: -26, delay: 0 },
          { icon: '⚡', x: 50, y: -24, delay: 0.03 },
          { icon: '✨', x: -44, y: 26, delay: 0.06 },
          { icon: '⭐', x: 46, y: 24, delay: 0.02 },
          { icon: '✨', x: 0, y: -38, delay: 0.05 },
          { icon: '✨', x: 0, y: 38, delay: 0.08 },
        ].map((sp, idx) => (
          <motion.span
            key={`sparkle-${attempts}-${idx}`}
            initial={{ opacity: 1, scale: 0.2, x: 0, y: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.2, 1.25, 0.4],
              x: sp.x,
              y: sp.y,
            }}
            transition={{
              duration: 0.55,
              delay: sp.delay,
              ease: 'easeOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xs select-none z-10"
          >
            {sp.icon}
          </motion.span>
        ))}

        {/* Escaping Button with glowing neon aura */}
        <motion.button
          ref={ref}
          onTouchStart={onEvade}
          onPointerDown={onEvade}
          onMouseEnter={onEvade}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(244,63,94,0)',
              '0 0 30px rgba(244,63,94,0.9)',
              '0 4px 20px rgba(244,63,94,0.5)',
            ],
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-2xl border-2 border-white/95 flex items-center justify-center gap-2 whitespace-nowrap active:scale-90 cursor-pointer"
        >
          <span>{text}</span>
        </motion.button>
      </motion.div>
    );
  }
);

EscapingNoButton.displayName = 'EscapingNoButton';

export default EscapingNoButton;
