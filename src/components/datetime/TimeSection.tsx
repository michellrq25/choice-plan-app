'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
import { QUICK_TIMES } from '@/constants/datetime';

interface TimeSectionProps {
  selectedTime: string;
  customTime: string;
  isCustomTime: boolean;
  onSelectQuickTime: (timeLabel: string) => void;
  onToggleCustomTime: () => void;
  onCustomTimeChange: (val: string) => void;
}

export default function TimeSection({
  selectedTime,
  customTime,
  isCustomTime,
  onSelectQuickTime,
  onToggleCustomTime,
  onCustomTimeChange,
}: TimeSectionProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-rose-100/80 shadow-xs">
      <div className="flex items-center justify-between mb-2 text-xs font-bold text-gray-800">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          2. ¿A qué hora paso a buscarte?
        </span>
        <button
          type="button"
          onClick={onToggleCustomTime}
          className="text-[10px] text-rose-600 hover:text-rose-700 font-medium underline underline-offset-2"
        >
          {isCustomTime ? 'Ver horas sugeridas' : '🕒 Otra hora'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {QUICK_TIMES.map((t, idx) => {
          const isSelected = !isCustomTime && selectedTime === t.label;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectQuickTime(t.label)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 transition-all active:scale-95 text-center ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              } ${
                isSelected
                  ? 'bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-200 font-bold shadow-xs'
                  : 'bg-white border-gray-150 text-gray-700 hover:border-rose-200 font-medium'
              }`}
            >
              <span className="text-xs font-bold">{t.label}</span>
              <span className="text-[9px] text-gray-400 leading-tight">{t.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable Custom Time input */}
      <AnimatePresence>
        {isCustomTime && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="time"
                value={customTime}
                onChange={(e) => onCustomTimeChange(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded-xl border border-rose-300 bg-rose-50/50 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium"
              />
              {customTime && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
