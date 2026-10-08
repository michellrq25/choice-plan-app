'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particle, Ripple, StreakTier } from '@/constants/success';

interface CelebrateButtonProps {
  tapCount: number;
  particles: Particle[];
  ripples: Ripple[];
  onCelebrateTap: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentStreak: StreakTier;
}

export default function CelebrateButton({
  tapCount,
  particles,
  ripples,
  onCelebrateTap,
  currentStreak,
}: CelebrateButtonProps) {
  return (
    <div className="relative w-full flex flex-col gap-1.5">
      {/* Floating particles bursting on click */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.8, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.8,
              x: p.x + p.vx,
              y: p.y + p.vy,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute pointer-events-none text-xl font-bold z-50 select-none"
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dynamic Streak / Hype Indicator Banner */}
      <div className="flex items-center justify-between px-1 h-5">
        <motion.div
          key={currentStreak.title}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 truncate"
        >
          <span>{currentStreak.icon}</span>
          <span className="truncate">{currentStreak.title}</span>
        </motion.div>

        {tapCount > 0 && (
          <motion.span
            key={`streak-badge-${tapCount}`}
            initial={{ scale: 1.5, rotate: 10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs"
          >
            Combo x{tapCount} 🔥
          </motion.span>
        )}
      </div>

      {/* The Addictive Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.93 }}
        onClick={onCelebrateTap}
        className={`relative w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm flex items-center justify-between shadow-lg shadow-rose-500/30 border border-white/30 cursor-pointer transition-all overflow-hidden select-none ${
          tapCount > 0 ? 'ring-2 ring-rose-400/50' : ''
        }`}
      >
        {/* Continuously Sweeping Shimmer Reflection */}
        <motion.div
          animate={{ x: ['-100%', '220%'] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Touch Ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/40 pointer-events-none animate-ping"
            style={{
              left: r.x - 20,
              top: r.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}

        {/* Left Icon with bouncy spring feedback */}
        <motion.div
          key={`icon-${tapCount}`}
          initial={{ scale: 0.7, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 12 }}
          className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg shrink-0 border border-white/30 shadow-2xs"
        >
          {tapCount === 0 ? '🎉' : tapCount < 5 ? '🔥' : tapCount < 10 ? '⚡' : '👑'}
        </motion.div>

        {/* Center Call to Action Text */}
        <div className="flex flex-col items-center justify-center flex-1 px-2">
          <span className="text-[13.5px] font-black tracking-tight drop-shadow-xs">
            {tapCount === 0
              ? '¡Todo listo! Toca para celebrar'
              : tapCount < 5
              ? '¡Sigue tocando! ¡Más confeti!'
              : tapCount < 10
              ? '¡No te detengas! ¡Fuego total!'
              : '¡MODO FIESTA LEGENDARIO!'}
          </span>
          <span className="text-[10px] text-white/90 font-semibold">
            {tapCount === 0
              ? 'Toca varias veces para racha de fiesta ✨'
              : `¡Racha de ${tapCount} toques seguidos! 🚀`}
          </span>
        </div>

        {/* Right Counter / Multiplier Pill */}
        <motion.div
          key={`badge-pill-${tapCount}`}
          initial={{ scale: 0.6, y: -4 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
          className="bg-white/25 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-black border border-white/35 shrink-0 shadow-2xs flex items-center gap-1"
        >
          {tapCount === 0 ? (
            <span>Tocar 🚀</span>
          ) : (
            <span>+{tapCount} 🔥</span>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
