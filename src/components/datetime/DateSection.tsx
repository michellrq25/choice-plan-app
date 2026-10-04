'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check } from 'lucide-react';
import { QuickDateOption, getTodayISODate } from '@/lib/dateUtils';

interface DateSectionProps {
  quickDates: QuickDateOption[];
  selectedDate: string;
  customDate: string;
  isCustomDate: boolean;
  formattedCustomDate: string;
  onSelectQuickDate: (fullDate: string) => void;
  onToggleCustomDate: () => void;
  onCustomDateChange: (val: string) => void;
}

export default function DateSection({
  quickDates,
  selectedDate,
  customDate,
  isCustomDate,
  formattedCustomDate,
  onSelectQuickDate,
  onToggleCustomDate,
  onCustomDateChange,
}: DateSectionProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-rose-100/80 shadow-xs">
      <div className="flex items-center justify-between mb-2 text-xs font-bold text-gray-800">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          1. ¿Qué día te queda mejor?
        </span>
        <button
          type="button"
          onClick={onToggleCustomDate}
          className="text-[10px] text-rose-600 hover:text-rose-700 font-medium underline underline-offset-2"
        >
          {isCustomDate ? 'Ver días sugeridos' : '📅 Otra fecha'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {quickDates.map((d) => {
          const isSelected = !isCustomDate && selectedDate === d.fullDate;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onSelectQuickDate(d.fullDate)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-200 font-bold shadow-xs'
                  : 'bg-white border-gray-150 text-gray-700 hover:border-rose-200 font-medium'
              }`}
            >
              <span className="text-lg leading-tight mb-0.5">{d.emoji}</span>
              <span className="text-xs font-bold leading-tight">{d.dayName}</span>
              <span
                className={`text-[11px] font-black leading-tight ${
                  isSelected ? 'text-rose-600' : 'text-rose-500/90'
                }`}
              >
                {d.shortDate}
              </span>
              <span className="text-[9px] text-gray-400 leading-tight">{d.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable Custom Date input */}
      <AnimatePresence>
        {isCustomDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <input
                  type="date"
                  value={customDate}
                  min={getTodayISODate()}
                  onChange={(e) => onCustomDateChange(e.target.value)}
                  className="w-full py-1.5 px-2.5 rounded-xl border border-rose-300 bg-rose-50/50 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium"
                />
                {customDate && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
              </div>
              {customDate && formattedCustomDate && (
                <p className="text-[11px] text-rose-600 font-semibold px-1">
                  📅 {formattedCustomDate}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
