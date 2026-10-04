'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PoofEffectProps {
  poof: { x: number; y: number; id: number } | null;
  onAnimationComplete: () => void;
}

export default function PoofEffect({ poof, onAnimationComplete }: PoofEffectProps) {
  return (
    <AnimatePresence>
      {poof && (
        <div
          key={poof.id}
          style={{
            position: 'fixed',
            left: poof.x,
            top: poof.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{
              scale: [0.6, 1.3, 1.6],
              opacity: [0.9, 0.6, 0],
              y: [0, -8, -18],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: 'easeOut',
            }}
            onAnimationComplete={onAnimationComplete}
            className="text-4xl filter drop-shadow select-none pointer-events-none"
          >
            💨
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
