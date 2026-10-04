'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { QUICK_TIMES } from '@/constants/datetime';
import AestheticTimePicker from './AestheticTimePicker';

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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-rose-100/80 shadow-xs">
      {/* 1. Encabezado */}
      <div className="flex items-center justify-between mb-1.5 text-xs font-bold text-gray-800">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          2. ¿A qué hora paso a buscarte?
        </span>
      </div>

      {/* 2. Pestañas prominentes: Horas sugeridas vs Otra hora */}
      <div className="grid grid-cols-2 p-0.5 bg-rose-50/70 rounded-lg mb-1.5 border border-rose-200/70 gap-1 shadow-inner">
        <button
          type="button"
          onClick={() => {
            if (isCustomTime) onToggleCustomTime();
          }}
          className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
            !isCustomTime
              ? 'bg-white text-rose-700 shadow-2xs border border-rose-200/80'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>Horas sugeridas</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isCustomTime) onToggleCustomTime();
          }}
          className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
            isCustomTime
              ? 'bg-white text-rose-700 shadow-2xs border border-rose-200/80 ring-1 ring-rose-300/40'
              : 'text-rose-600 hover:text-rose-800 font-extrabold'
          }`}
        >
          <Clock className="w-3 h-3 text-rose-500" />
          <span>🕒 Otra hora</span>
        </button>
      </div>

      {/* 3. Cuadrícula de Horas Sugeridas (2 filas x 3 columnas simétricas) */}
      {!isCustomTime && (
        <div>
          <div className="grid grid-cols-3 gap-1.5">
            {QUICK_TIMES.map((t) => {
              const isSelected = !isCustomTime && selectedTime === t.label;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectQuickTime(t.label)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 transition-all active:scale-95 text-center ${
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

            {/* Slot 6: Tarjeta directa para "Otra hora" que completa la cuadrícula */}
            <button
              type="button"
              onClick={onToggleCustomTime}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 border-dashed border-rose-300/90 bg-rose-50/50 hover:bg-rose-100/70 text-rose-700 font-bold transition-all active:scale-95 text-center shadow-2xs"
            >
              <span className="text-sm leading-tight mb-0.5">🕒</span>
              <span className="text-xs font-bold leading-tight">Otra hora</span>
              <span className="text-[9px] text-rose-400 leading-tight">Personalizar</span>
            </button>
          </div>

          {/* Botón inferior llamativo para personalizar hora */}
          <button
            type="button"
            onClick={onToggleCustomTime}
            className="mt-2 w-full py-2 px-2.5 rounded-xl border border-dashed border-rose-300 bg-rose-50/70 hover:bg-rose-100/90 text-rose-700 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
          >
            <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="whitespace-nowrap">
              ¿Prefieres otra hora? <strong>Personalizar horario 🕒</strong>
            </span>
          </button>
        </div>
      )}

      {/* 4. Selector Aesthetic Interactivo de Hora */}
      <AnimatePresence>
        {isCustomTime && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <AestheticTimePicker
              value={customTime || selectedTime}
              onChange={onCustomTimeChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
