'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface FoodHeaderProps {
  totalOptions?: number;
  nickname?: string;
}

export default function FoodHeader({ nickname }: FoodHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-3.5 sm:mb-4 flex flex-col items-center"
    >
      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-wider text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200/80 shadow-2xs mb-1.5">
        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
        Paso 2 • Antojos {nickname ? `para ${nickname}` : ''}
      </span>

      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
        {nickname ? `¿Qué te provoca comer, ${nickname}? 😋` : '¿Qué te provoca comer? 😋'}
      </h2>

      <p className="text-xs text-gray-500 font-medium mt-1">
        Elige tu favorito <span className="text-gray-400">(o hasta 3 para dar opciones)</span> ✨
      </p>
    </motion.div>
  );
}
