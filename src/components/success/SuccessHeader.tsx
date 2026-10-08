'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, CheckCircle2, Sparkles } from 'lucide-react';

interface SuccessHeaderProps {
  displayName: string;
}

export default function SuccessHeader({ displayName }: SuccessHeaderProps) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15 }}
      className="relative z-10 flex flex-col items-center text-center mt-0.5 mb-1 flex-shrink-0"
    >
      <div className="relative mb-1">
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 flex items-center justify-center shadow-md shadow-rose-300/30"
        >
          <PartyPopper className="w-5 h-5 text-white drop-shadow-sm" />
        </motion.div>
        <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white p-0.5 rounded-full shadow-xs border border-white">
          <CheckCircle2 className="w-3 h-3" />
        </div>
      </div>

      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-wider text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200/80 shadow-2xs">
        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
        Pase Oficial • Salida Confirmada
      </span>

      <h1 className="text-lg sm:text-xl font-black text-gray-900 mt-1 tracking-tight">
        {displayName ? `¡Planazo Listo, ${displayName}! 😎` : '¡Planazo Listo! 😎'}
      </h1>

      <p className="text-[11px] text-gray-500 font-medium">
        Todo coordinado para este fin de semana. ¡La vamos a pasar genial!
      </p>
    </motion.div>
  );
}
