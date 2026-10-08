'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

interface DateTimeHeaderProps {
  nickname?: string;
}

export default function DateTimeHeader({ nickname }: DateTimeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center pt-1"
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100/80 text-rose-700 border border-rose-200/60 shadow-2xs mb-1">
        <Car className="w-3 h-3 text-rose-500" />
        Paso 3 • La Coordinación
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
        {nickname ? `¿Cuándo nos vemos, ${nickname}? ✨` : '¿Cuándo nos vemos? ✨'}
      </h2>
      <p className="text-[11px] text-gray-500 font-medium mt-0.5">
        Elige tu momento ideal para salir a pasarla genial.
      </p>
    </motion.div>
  );
}
