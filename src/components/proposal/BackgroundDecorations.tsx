'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Aurora Ambient Glowing Orbs (Luz ambiental viva estilo iOS) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 25, 0],
          y: [0, 20, 0],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-br from-rose-300/50 via-pink-300/35 to-amber-200/30 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -30, 0],
          y: [0, -25, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/3 -right-20 w-88 h-88 rounded-full bg-gradient-to-bl from-amber-300/40 via-orange-200/30 to-rose-200/35 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-t from-pink-300/35 via-rose-200/40 to-amber-100/25 blur-3xl"
      />

      {/* 2. Floating Atmospheric Sparkles & Plan Icons */}
      {[
        { icon: '✨', size: 'text-2xl', top: '12%', left: '8%', delay: 0, duration: 4.5, rotate: 12 },
        { icon: '🥂', size: 'text-3xl', top: '24%', right: '10%', delay: 1, duration: 5.5, rotate: -15 },
        { icon: '⭐', size: 'text-xl', top: '42%', left: '6%', delay: 2, duration: 4.8, rotate: 18 },
        { icon: '☕', size: 'text-2xl', bottom: '26%', right: '8%', delay: 1.5, duration: 5.2, rotate: -10 },
        { icon: '🍕', size: 'text-2xl', bottom: '15%', left: '10%', delay: 2.5, duration: 5, rotate: 15 },
        { icon: '💫', size: 'text-xl', bottom: '38%', left: '14%', delay: 3, duration: 6, rotate: -20 },
      ].map((item, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [item.rotate, item.rotate + 8, item.rotate],
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
          className={`${item.size} filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.15)]`}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* 3. Subtle radial soft lighting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.45)_0%,transparent_75%)]" />
    </div>
  );
}
