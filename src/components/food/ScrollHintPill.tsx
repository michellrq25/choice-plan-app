'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollHintPillProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function ScrollHintPill({ isVisible, onClick }: ScrollHintPillProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={onClick}
          initial={{ opacity: 0, y: 20, scale: 0.85, x: '-50%' }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
            scale: [1, 1.02, 1],
            x: '-50%',
          }}
          exit={{ opacity: 0, y: 15, scale: 0.85, x: '-50%' }}
          transition={{
            y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
            opacity: { duration: 0.25 },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ left: '50%' }}
          className="fixed bottom-[104px] z-40 group cursor-pointer select-none max-w-[calc(100vw-32px)]"
        >
          {/* Aura brillante de neón pulsante */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 opacity-80 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* Contenedor principal con efecto cristal y degradado premium */}
          <div className="relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white text-xs sm:text-sm font-black shadow-[0_10px_25px_rgba(244,63,94,0.5)] border-2 border-white/90 backdrop-blur-xl">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">
              ✨
            </span>
            <span className="tracking-wide drop-shadow-sm whitespace-nowrap">
              Más opciones abajo
            </span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shadow-inner shrink-0"
            >
              <ChevronDown className="w-3.5 h-3.5 stroke-[3] text-white" />
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
