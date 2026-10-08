'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import { QuickDateOption } from '@/lib/dateUtils';
import AestheticCalendar from './AestheticCalendar';

interface DateSectionProps {
  quickDates: QuickDateOption[];
  selectedDate: string;
  customDate: string;
  isCustomDate: boolean;
  formattedCustomDate: string;
  onSelectQuickDate: (fullDate: string) => void;
  onToggleCustomDate: () => void;
  onCustomDateChange: (val: string) => void;
  onConfirmValidCustomDate?: (isoDate: string) => void;
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
  onConfirmValidCustomDate,
}: DateSectionProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-rose-100/80 shadow-xs">
      {/* 1. Encabezado */}
      <div className="flex items-center justify-between mb-1.5 text-xs font-bold text-gray-800">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          1. ¿Qué día te queda mejor?
        </span>
      </div>

      {/* 2. Pestañas prominentes: Fin de semana vs Calendario */}
      <div className="grid grid-cols-2 p-0.5 bg-rose-50/70 rounded-lg mb-1.5 border border-rose-200/70 gap-1 shadow-inner">
        <button
          type="button"
          onClick={() => {
            if (isCustomDate) onToggleCustomDate();
          }}
          className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${!isCustomDate
              ? 'bg-white text-rose-700 shadow-2xs border border-rose-200/80'
              : 'text-gray-500 hover:text-gray-800'
            }`}
        >
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>Fin de semana</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isCustomDate) onToggleCustomDate();
          }}
          className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${isCustomDate
              ? 'bg-white text-rose-700 shadow-2xs border border-rose-200/80 ring-1 ring-rose-300/40'
              : 'text-rose-600 hover:text-rose-800 font-extrabold'
            }`}
        >
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>Otra fecha</span>
        </button>
      </div>

      {/* 3. Días de Fin de Semana Sugeridos */}
      {!isCustomDate && (
        <div>
          <div className="grid grid-cols-3 gap-1.5">
            {quickDates.map((d) => {
              const isSelected = !isCustomDate && selectedDate === d.fullDate;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelectQuickDate(d.fullDate)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all active:scale-95 ${isSelected
                      ? 'bg-rose-50/80 border-rose-500 text-rose-700 font-bold shadow-xs'
                      : 'bg-white border-gray-150 text-gray-700 hover:border-rose-200 font-medium'
                    }`}
                >
                  <span className="text-xl leading-tight mb-0.5">{d.emoji}</span>
                  <span className="text-xs font-extrabold leading-tight">{d.dayName}</span>
                  <span
                    className={`text-[11px] font-black leading-tight mt-0.5 ${isSelected ? 'text-rose-600' : 'text-gray-500'
                      }`}
                  >
                    {d.shortDate}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Si eligió una fecha del calendario fuera del fin de semana inmediato */}
          {selectedDate && !quickDates.some((d) => d.fullDate === selectedDate) && (
            <div className="mt-2 py-1.5 px-2.5 bg-rose-50/90 border border-rose-300 rounded-xl flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-sm">🗓️</span>
                <div className="text-left">
                  <span className="text-[9px] text-gray-500 font-medium block leading-none">Fecha elegida:</span>
                  <span className="text-xs font-black text-rose-700 leading-tight">{selectedDate}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleCustomDate}
                className="text-[10px] font-bold text-rose-600 bg-white hover:bg-rose-100/70 px-2 py-1 rounded-lg border border-rose-200 shadow-2xs cursor-pointer"
              >
                Cambiar
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Custom Aesthetic Mini-Calendar */}
      <AnimatePresence>
        {isCustomDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <AestheticCalendar
              selectedDateISO={customDate}
              onSelectDateISO={onCustomDateChange}
              onValidDateConfirmed={onConfirmValidCustomDate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
