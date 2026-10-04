'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { FoodOption } from '@/constants/food';

interface FoodCardProps {
  item: FoodOption;
  index: number;
  isSelected: boolean;
  onToggle: (name: string) => void;
}

export default function FoodCard({ item, index, isSelected, onToggle }: FoodCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => onToggle(item.name)}
      className={`relative flex flex-col items-start p-3.5 rounded-2xl text-left border-2 transition-all duration-200 active:scale-95 shadow-sm touch-manipulation select-none ${
        isSelected
          ? 'bg-rose-50/90 border-rose-500 ring-2 ring-rose-300/40 shadow-rose-200/50'
          : 'bg-white/85 border-white hover:border-rose-200 shadow-gray-200/50'
      }`}
    >
      {/* Top Row: Emoji & Visual Checkbox */}
      <div className="w-full flex items-center justify-between mb-2">
        <span className="text-3xl filter drop-shadow-sm select-none">
          {item.emoji}
        </span>

        {/* Visual Checkbox */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? 'bg-rose-500 text-white scale-110 shadow-md shadow-rose-400/50'
              : 'border-2 border-gray-300 bg-white/70'
          }`}
        >
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title & Tag */}
      <div className="flex items-center gap-1.5 w-full">
        <span className="font-bold text-gray-900 text-sm">
          {item.name}
        </span>
        {item.tag && (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-rose-100/70 text-rose-600">
            {item.tag}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 leading-tight">
        {item.description}
      </p>
    </motion.button>
  );
}
