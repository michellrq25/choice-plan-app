'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ChevronDown } from 'lucide-react';

interface FoodHeaderProps {
  totalOptions?: number;
  nickname?: string;
}

export default function FoodHeader({ totalOptions = 12, nickname }: FoodHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-5"
    >
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 shadow-sm border border-rose-200 mb-2">
        <Utensils className="w-3.5 h-3.5 text-rose-500" />
        {nickname ? `Paso 2 • Antojos para ${nickname}` : `Paso 2 • El Menú de la Salida (${totalOptions} opciones)`}
      </div>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">
        {nickname ? `${nickname}, ¿qué te provoca comer? 😋` : '¿Qué te provoca comer? 😋'}
      </h2>
      <p className="text-xs text-gray-600 mt-1 flex items-center justify-center gap-1">
        <span>Elige todas las que quieras • Desliza hacia abajo</span>
        <ChevronDown className="w-3.5 h-3.5 text-rose-500 inline animate-bounce" />
      </p>
    </motion.div>
  );
}
