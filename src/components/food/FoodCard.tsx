'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { FoodOption } from '@/constants/food';

interface FoodCardProps {
  item: FoodOption;
  index: number;
  isSelected: boolean;
  isDisabled?: boolean;
  onToggle: (name: string) => void;
}

export default function FoodCard({ item, index, isSelected, isDisabled, onToggle }: FoodCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(item.name)}
      className={`relative flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-200 select-none cursor-pointer border ${
        isSelected
          ? 'bg-rose-50/90 border-rose-500 shadow-md shadow-rose-200/50 ring-1 ring-rose-400/50'
          : isDisabled
          ? 'bg-white/40 border-gray-100 opacity-40 cursor-not-allowed'
          : 'bg-white/95 backdrop-blur-sm border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-rose-200 hover:shadow-md'
      }`}
    >
      {/* Top Row: Emoji Icon + Tag + Selection Indicator */}
      <div className="w-full flex items-center justify-between mb-2">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
            isSelected
              ? 'bg-rose-100 text-rose-600 shadow-inner'
              : 'bg-rose-50/60 text-gray-700 border border-rose-100/60'
          }`}
        >
          {item.emoji}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {item.tag && (
            <span
              className={`text-[8px] sm:text-[8.5px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                isSelected
                  ? 'bg-rose-200/90 text-rose-800'
                  : 'bg-rose-50 text-rose-600 border border-rose-100/80'
              }`}
            >
              {item.tag}
            </span>
          )}

          {/* Apple style checkmark circle */}
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-rose-500 text-white shadow-xs scale-105'
                : 'border border-gray-300 bg-white/90'
            }`}
          >
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content: Title & Description completos (Sin puntos suspensivos ...) */}
      <div className="w-full min-w-0">
        <h3 className="font-black text-gray-900 text-xs sm:text-sm leading-snug">
          {item.name}
        </h3>
        <p className="text-[10.5px] sm:text-[11px] text-gray-500 font-medium mt-0.5 leading-snug">
          {item.description}
        </p>
      </div>
    </motion.button>
  );
}
