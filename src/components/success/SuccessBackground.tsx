'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AMBIENT_SPARKLES } from '@/constants/success';

export default function SuccessBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {AMBIENT_SPARKLES.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-xs opacity-20 filter blur-[0.2px]"
          style={{ left: item.left, bottom: '-20px' }}
          animate={{
            y: ['0vh', '-105vh'],
            opacity: [0, 0.4, 0.55, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
