'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface AestheticTimePickerProps {
  value: string; // e.g. '8:30 PM'
  onChange: (formattedTime: string) => void;
}

const QUICK_CHIPS = [
  { label: '6:00 PM', desc: 'Previa 🌅' },
  { label: '7:00 PM', desc: 'Cena chill 🍕' },
  { label: '8:00 PM', desc: 'Horario top 🥂' },
  { label: '9:30 PM', desc: 'Noche relax 🍸' },
  { label: '10:00 PM', desc: 'After hours 🌙' },
];

export default function AestheticTimePicker({ value, onChange }: AestheticTimePickerProps) {
  // Parsear valor inicial o usar 8:30 PM por defecto
  const parseTime = (timeStr: string) => {
    const match = timeStr?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      return {
        h: parseInt(match[1], 10),
        m: parseInt(match[2], 10),
        p: (match[3]?.toUpperCase() as 'AM' | 'PM') || 'PM',
      };
    }
    return { h: 8, m: 30, p: 'PM' as const };
  };

  const initial = parseTime(value);
  const [hour, setHour] = useState<number>(initial.h);
  const [minute, setMinute] = useState<number>(initial.m);
  const [period, setPeriod] = useState<'AM' | 'PM'>(initial.p);

  // Sincronizar si cambia externamente
  useEffect(() => {
    if (value) {
      const parsed = parseTime(value);
      setHour(parsed.h);
      setMinute(parsed.m);
      setPeriod(parsed.p);
    }
  }, [value]);

  const updateTime = (h: number, m: number, p: 'AM' | 'PM') => {
    const mStr = String(m).padStart(2, '0');
    const formatted = `${h}:${mStr} ${p}`;
    onChange(formatted);
  };

  const incrementHour = () => {
    const nextH = hour >= 12 ? 1 : hour + 1;
    setHour(nextH);
    updateTime(nextH, minute, period);
  };

  const decrementHour = () => {
    const nextH = hour <= 1 ? 12 : hour - 1;
    setHour(nextH);
    updateTime(nextH, minute, period);
  };

  const incrementMinute = () => {
    let nextM = minute + 15;
    if (nextM >= 60) nextM = 0;
    setMinute(nextM);
    updateTime(hour, nextM, period);
  };

  const decrementMinute = () => {
    let nextM = minute - 15;
    if (nextM < 0) nextM = 45;
    setMinute(nextM);
    updateTime(hour, nextM, period);
  };

  const togglePeriod = (p: 'AM' | 'PM') => {
    setPeriod(p);
    updateTime(hour, minute, p);
  };

  const selectChip = (chipLabel: string) => {
    const parsed = parseTime(chipLabel);
    setHour(parsed.h);
    setMinute(parsed.m);
    setPeriod(parsed.p);
    onChange(chipLabel);
  };

  const currentTimeFormatted = `${hour}:${String(minute).padStart(2, '0')} ${period}`;

  return (
    <div className="bg-gradient-to-b from-rose-50/70 via-white to-pink-50/40 rounded-xl p-2 sm:p-2.5 border border-rose-200/80 shadow-xs select-none">
      {/* 1. Encabezado del selector */}
      <div className="flex items-center justify-between mb-1.5 px-1 text-[11px] font-bold text-gray-700">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          Ajusta la hora:
        </span>
        <span className="text-[9px] text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full font-bold">
          Aesthetic Time ✨
        </span>
      </div>

      {/* 2. Stepper Visual Moderno y Compacto */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5 py-1 bg-white/90 rounded-xl border border-rose-100/90 shadow-2xs">
        {/* Selector de Horas */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={incrementHour}
            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-all active:scale-90 border border-rose-200/60"
            aria-label="Aumentar hora"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <span className="w-9 h-7 flex items-center justify-center font-black text-lg text-gray-800 tracking-wider">
            {hour}
          </span>

          <button
            type="button"
            onClick={decrementHour}
            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-all active:scale-90 border border-rose-200/60"
            aria-label="Disminuir hora"
          >
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Hora
          </span>
        </div>

        {/* Separador de dos puntos */}
        <span className="font-black text-lg text-rose-400 mb-3 animate-pulse">:</span>

        {/* Selector de Minutos */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={incrementMinute}
            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-all active:scale-90 border border-rose-200/60"
            aria-label="Aumentar minutos"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <span className="w-9 h-7 flex items-center justify-center font-black text-lg text-gray-800 tracking-wider">
            {String(minute).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={decrementMinute}
            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-all active:scale-90 border border-rose-200/60"
            aria-label="Disminuir minutos"
          >
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Minutos
          </span>
        </div>

        {/* Selector AM / PM */}
        <div className="flex flex-col gap-1 ml-1.5 p-0.5 bg-rose-50/70 rounded-lg border border-rose-200/60">
          <button
            type="button"
            onClick={() => togglePeriod('AM')}
            className={`px-2 py-1 rounded-md text-[10px] font-black transition-all ${
              period === 'AM'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-2xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => togglePeriod('PM')}
            className={`px-2 py-1 rounded-md text-[10px] font-black transition-all ${
              period === 'PM'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-2xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            PM
          </button>
        </div>
      </div>

      {/* 3. Atajos rápidos de horas populares */}
      <div className="mt-1.5">
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1 px-0.5">
          Horarios sugeridos:
        </p>
        <div className="flex flex-wrap gap-1">
          {QUICK_CHIPS.map((chip) => {
            const isChipSelected = currentTimeFormatted === chip.label;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => selectChip(chip.label)}
                className={`py-0.5 px-2 rounded-lg text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1 ${
                  isChipSelected
                    ? 'bg-rose-500 text-white shadow-2xs scale-105'
                    : 'bg-white border border-rose-200/70 text-gray-700 hover:bg-rose-50/80 hover:border-rose-300'
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`text-[8px] font-normal ${
                    isChipSelected ? 'text-rose-100' : 'text-gray-400'
                  }`}
                >
                  {chip.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Resumen de la hora configurada */}
      <motion.div
        key={currentTimeFormatted}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1.5 pt-1.5 border-t border-rose-100 flex items-center justify-between text-[10px]"
      >
        <div className="flex items-center gap-1 text-rose-700 font-bold">
          <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
          <span>Hora elegida: <strong>{currentTimeFormatted}</strong></span>
        </div>
        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200/60">
          <Sparkles className="w-2.5 h-2.5" /> Lista
        </span>
      </motion.div>
    </div>
  );
}
