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
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-700 border border-rose-200 shadow-xs mb-1">
        <Car className="w-3 h-3 text-rose-500" />
        Paso 3 • La Coordinación
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
        {nickname ? `¿Qué día y hora paso por ti, ${nickname}? 🚗✨` : '¿Qué día y hora paso por ti? 🚗✨'}
      </h2>
      <p className="text-[11px] text-gray-500">
        Elige el mejor momento para salir a pasarla genial.
      </p>
    </motion.div>
  );
}
