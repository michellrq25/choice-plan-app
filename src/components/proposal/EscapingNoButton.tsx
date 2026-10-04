'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEscapeTaunt } from '@/constants/proposal';

interface EscapingNoButtonProps {
  position: {
    x: number;
    y: number;
    tauntAlign: 'left' | 'center' | 'right';
    tauntVAlign: 'top' | 'bottom';
  };
  attempts: number;
  showBubble: boolean;
  text: string;
  onEvade: (e: React.SyntheticEvent | Event) => void;
}

const EscapingNoButton = forwardRef<HTMLButtonElement, EscapingNoButtonProps>(
  ({ position, attempts, showBubble, text, onEvade }, ref) => {
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
        {/* Shockwave expanding aura */}
        <motion.span
          key={`wave-${attempts}`}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute -inset-1 rounded-2xl border-2 border-rose-400 pointer-events-none"
        />

        {/* Floating comic speech bubble - Auto-fades after ~3 seconds */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              key={`taunt-${attempts}`}
              initial={{
                opacity: 0,
                y: position.tauntVAlign === 'bottom' ? -8 : 8,
                scale: 0.6,
                x: position.tauntAlign === 'center' ? '-50%' : 0,
              }}
              animate={{
                opacity: 1,
                y: position.tauntVAlign === 'bottom' ? 34 : -32,
                scale: 1,
                x: position.tauntAlign === 'center' ? '-50%' : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                y: position.tauntVAlign === 'bottom' ? 16 : -16,
                x: position.tauntAlign === 'center' ? '-50%' : 0,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                ...(position.tauntVAlign === 'bottom'
                  ? { bottom: -6, top: 'auto' }
                  : { top: -6, bottom: 'auto' }),
                ...(position.tauntAlign === 'left'
                  ? { left: 4, right: 'auto' }
                  : position.tauntAlign === 'right'
                    ? { right: 4, left: 'auto' }
                    : { left: '50%', right: 'auto' }),
              }}
              className="whitespace-nowrap bg-gray-900 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xl border border-rose-400/80 flex items-center gap-1 pointer-events-none z-20 max-w-[calc(100vw-32px)]"
            >
              <span>{getEscapeTaunt(attempts)}</span>
            </motion.div>
          )}
        </AnimatePresence>

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
