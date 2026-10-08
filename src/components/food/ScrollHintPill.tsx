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
          initial={{ opacity: 0, y: 15, scale: 0.9, x: '-50%' }}
          animate={{
            opacity: 1,
            y: [0, -4, 0],
            scale: 1,
            x: '-50%',
          }}
          exit={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
          transition={{
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
            opacity: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          style={{ left: '50%' }}
          className="fixed bottom-[96px] z-20 group cursor-pointer select-none"
        >
          {/* Elegant Rose-Blush Apple Glass Pill */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-50/95 via-pink-50/95 to-rose-100/95 text-rose-700 text-[11px] font-black shadow-md shadow-rose-400/20 border border-rose-200/90 backdrop-blur-md hover:border-rose-300 transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="tracking-tight">Más opciones abajo</span>
            <ChevronDown className="w-3.5 h-3.5 text-rose-500 stroke-[2.5] animate-bounce shrink-0" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
