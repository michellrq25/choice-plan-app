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
  onConfirmCustomTime?: (timeLabel: string) => void;
}

export default function TimeSection({
  selectedTime,
  customTime,
  isCustomTime,
  onSelectQuickTime,
  onToggleCustomTime,
  onCustomTimeChange,
  onConfirmCustomTime,
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

      {/* 2. Cuadrícula de Horas Sugeridas (5 horas + Slot 6: Otra hora) */}
      {!isCustomTime && (
        <div>
          <div className="grid grid-cols-3 gap-1.5">
          {QUICK_TIMES.map((t) => {
            const isSelected = !isCustomTime && selectedTime === t.label;
            const emoji = t.desc.split(' ').pop() || '';
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectQuickTime(t.label)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl border transition-all active:scale-95 text-center ${
                  isSelected
                    ? 'bg-rose-50/80 border-rose-500 text-rose-700 font-extrabold shadow-xs'
                    : 'bg-white border-gray-150 text-gray-700 hover:border-rose-200 font-medium'
                }`}
              >
                <span className="text-xs font-bold">{t.label}</span>
                <span className="text-xs">{emoji}</span>
              </button>
            );
          })}

          {/* Slot 6: Tarjeta directa para "Otra hora" que completa la cuadrícula */}
          <button
            type="button"
            onClick={onToggleCustomTime}
            className="flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl border border-dashed border-rose-300 bg-rose-50/50 hover:bg-rose-100/70 text-rose-700 font-bold transition-all active:scale-95 text-center"
          >
            <span className="text-xs">🕒</span>
            <span className="text-xs font-bold">Otra hora</span>
          </button>
        </div>

        {/* Si eligió una hora personalizada fuera de las opciones fijas de la grilla */}
        {selectedTime && !QUICK_TIMES.some((t) => t.label === selectedTime) && (
          <div className="mt-2 py-1.5 px-2.5 bg-rose-50/90 border border-rose-300 rounded-xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-sm">🕒</span>
              <div className="text-left">
                <span className="text-[9px] text-gray-500 font-medium block leading-none">Hora elegida:</span>
                <span className="text-xs font-black text-rose-700 leading-tight">{selectedTime}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleCustomTime}
              className="text-[10px] font-bold text-rose-600 bg-white hover:bg-rose-100/70 px-2 py-1 rounded-lg border border-rose-200 shadow-2xs cursor-pointer"
            >
              Cambiar
            </button>
          </div>
        )}
      </div>
      )}

      {/* 3. Selector Aesthetic Interactivo de Hora */}
      <AnimatePresence>
        {isCustomTime && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex justify-between items-center mb-1.5 px-0.5">
              <span className="text-[11px] font-bold text-gray-500">Horario personalizado:</span>
              <button
                type="button"
                onClick={onToggleCustomTime}
                className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                ← Volver a sugeridas
              </button>
            </div>
            <AestheticTimePicker
              value={customTime || selectedTime}
              onChange={onCustomTimeChange}
              onConfirm={onConfirmCustomTime}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
