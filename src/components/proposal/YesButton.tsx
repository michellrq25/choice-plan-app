'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface YesButtonProps {
  attempts: number;
  onClick: () => void;
}

const YesButton = forwardRef<HTMLButtonElement, YesButtonProps>(
  ({ attempts, onClick }, ref) => {
    // Escala acotada que crece ligeramente sin sobrepasar bordes móviles
    const yesScale = Math.min(1 + attempts * 0.025, 1.10);

    const getYesPaddingClass = () => {
      if (attempts === 0) return 'py-3.5 px-5 min-h-[52px]';
      if (attempts <= 2) return 'py-4 px-6 min-h-[60px]';
      if (attempts <= 4) return 'py-5 px-6 min-h-[70px]';
      return 'py-5 sm:py-6 px-6 min-h-[78px]';
    };

    const getYesTextSize = () => {
      if (attempts <= 2) return 'text-base sm:text-lg';
      return 'text-lg sm:text-xl';
    };

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        animate={{ scale: yesScale }}
        whileTap={{ scale: yesScale * 0.96 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className={`relative group w-full max-w-[280px] sm:max-w-[310px] ${getYesPaddingClass()} rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-extrabold ${getYesTextSize()} shadow-xl shadow-emerald-400/40 border border-emerald-400/50 flex items-center justify-center gap-2.5 overflow-hidden text-center max-w-[calc(100vw-2.5rem)]`}
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Sutil barrido de luz */}
        <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 animate-pulse" />
        <span className="truncate">¡De una, me apunto! 😋</span>
      </motion.button>
    );
  }
);

YesButton.displayName = 'YesButton';

export default YesButton;
