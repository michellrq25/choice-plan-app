'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { formatReadableDate } from '@/lib/dateUtils';

interface AestheticCalendarProps {
  selectedDateISO: string; // 'YYYY-MM-DD'
  onSelectDateISO: (isoDate: string) => void;
  onValidDateConfirmed?: (isoDate: string) => void;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const WEEKDAYS = [
  { label: 'Lu', isWeekend: false },
  { label: 'Ma', isWeekend: false },
  { label: 'Mi', isWeekend: false },
  { label: 'Ju', isWeekend: false },
  { label: 'Vi', isWeekend: false },
  { label: 'Sá', isWeekend: true },
  { label: 'Do', isWeekend: true },
];

const MAX_DAYS_AHEAD = 30;

export default function AestheticCalendar({
  selectedDateISO,
  onSelectDateISO,
  onValidDateConfirmed,
}: AestheticCalendarProps) {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Límite exacto de 30 días hacia adelante
  const maxAllowedDate = useMemo(() => {
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + MAX_DAYS_AHEAD);
    return maxDate;
  }, [today]);

  // Mensaje divertido si intenta elegir una fecha muy lejana
  const [funnyNotice, setFunnyNotice] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Estado visual de selección en el calendario (permite marcar visualmente sin confirmar si es lejana)
  const [visualSelectedISO, setVisualSelectedISO] = useState<string>(selectedDateISO);
  const [isVisualTooFar, setIsVisualTooFar] = useState<boolean>(false);

  React.useEffect(() => {
    if (selectedDateISO) {
      setVisualSelectedISO(selectedDateISO);
      setIsVisualTooFar(false);
    }
  }, [selectedDateISO]);

  // Inicializar en el mes de la fecha seleccionada o mes actual
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (selectedDateISO) {
      const parts = selectedDateISO.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      }
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const isCurrentMonth =
    today.getFullYear() === viewYear && today.getMonth() === viewMonth;

  // Permitir navegar hasta 3 meses hacia adelante para explorar fechas
  const monthsAhead =
    (viewYear - today.getFullYear()) * 12 + (viewMonth - today.getMonth());
  const isNextDisabled = monthsAhead >= 3;

  const handlePrevMonth = () => {
    if (isCurrentMonth) return;
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Construir las celdas del calendario para el mes en vista
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0: Dom, 1: Lun, ...
  // Adaptar para que la semana empiece en Lunes (0 = Lun, 6 = Dom)
  const startingDayOffset = (firstDayOfWeek + 6) % 7;

  const daysGrid = useMemo(() => {
    const cells: Array<{
      dayNum: number | null;
      isoString: string;
      isPast: boolean;
      isTooFar: boolean;
      isToday: boolean;
      isWeekend: boolean;
    }> = [];

    // Celdas vacías previas
    for (let i = 0; i < startingDayOffset; i++) {
      cells.push({
        dayNum: null,
        isoString: '',
        isPast: false,
        isTooFar: false,
        isToday: false,
        isWeekend: false,
      });
    }

    // Días del mes
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(viewYear, viewMonth, d);
      const isPast = cellDate < today;
      const isTooFar = cellDate > maxAllowedDate;
      const isToday = cellDate.getTime() === today.getTime();
      const dayOfWeek = cellDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const mStr = String(viewMonth + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const isoString = `${viewYear}-${mStr}-${dStr}`;

      cells.push({
        dayNum: d,
        isoString,
        isPast,
        isTooFar,
        isToday,
        isWeekend,
      });
    }

    return cells;
  }, [viewYear, viewMonth, startingDayOffset, daysInMonth, today, maxAllowedDate]);

  const handleCellClick = (cell: {
    isoString: string;
    isPast: boolean;
    isTooFar: boolean;
  }) => {
    if (cell.isPast) return;

    // Se queda seleccionado visualmente el día pulsado en el calendario
    setVisualSelectedISO(cell.isoString);

    if (cell.isTooFar) {
      setIsVisualTooFar(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setFunnyNotice('¡No seas viva xd! Elige algo cercano jajaja 😂');
      timeoutRef.current = setTimeout(() => {
        setFunnyNotice(null);
      }, 4000);
      
      // Se quita la fecha confirmada previa hasta que elija una fecha correcta
      onSelectDateISO('');
      return;
    }

    // Fecha válida dentro de los 30 días: se confirma
    setIsVisualTooFar(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setFunnyNotice(null);
    onSelectDateISO(cell.isoString);

    if (onValidDateConfirmed) {
      setTimeout(() => {
        onValidDateConfirmed(cell.isoString);
      }, 350);
    }
  };

  const readableSelected = selectedDateISO ? formatReadableDate(selectedDateISO) : '';

  return (
    <div className="bg-gradient-to-b from-rose-50/70 via-white to-pink-50/40 rounded-xl p-2 sm:p-2.5 border border-rose-200/80 shadow-xs select-none">
      {/* 1. Header con navegación de mes */}
      <div className="flex items-center justify-between mb-1.5 px-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={isCurrentMonth}
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
            isCurrentMonth
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-rose-600 bg-white shadow-2xs border border-rose-100 hover:bg-rose-50 active:scale-95'
          }`}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-[11px] font-black text-gray-800 tracking-wide uppercase">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <Sparkles className="w-3 h-3 text-rose-400" />
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          disabled={isNextDisabled}
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
            isNextDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-rose-600 bg-white shadow-2xs border border-rose-100 hover:bg-rose-50 active:scale-95'
          }`}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Días de la semana (Lunes a Domingo) */}
      <div className="grid grid-cols-7 gap-0.5 text-center mb-0.5">
        {WEEKDAYS.map((wd) => (
          <span
            key={wd.label}
            className={`text-[9px] font-bold py-0 ${
              wd.isWeekend ? 'text-rose-500 font-extrabold' : 'text-gray-400'
            }`}
          >
            {wd.label}
          </span>
        ))}
      </div>

      {/* 3. Cuadrícula de días compacta */}
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {daysGrid.map((cell, idx) => {
          if (!cell.dayNum) {
            return <div key={`empty-${idx}`} className="w-7 h-7 mx-auto" />;
          }

          const isSelected = cell.isoString === (visualSelectedISO || selectedDateISO);

          return (
            <motion.button
              key={cell.isoString}
              type="button"
              disabled={cell.isPast}
              onClick={() => handleCellClick(cell)}
              whileTap={!cell.isPast ? { scale: 0.9 } : undefined}
              className={`w-7 h-7 mx-auto rounded-lg flex flex-col items-center justify-center text-[11px] font-semibold relative transition-all duration-150 ${
                isSelected
                  ? 'bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-black shadow-sm shadow-rose-300 scale-105 z-10'
                  : cell.isPast
                  ? 'text-gray-300 cursor-not-allowed font-normal'
                  : cell.isWeekend
                  ? 'text-rose-700 bg-rose-50/50 hover:bg-rose-100/90 font-bold'
                  : 'text-gray-700 hover:bg-rose-100/70 hover:text-rose-800'
              }`}
            >
              <span>{cell.dayNum}</span>

              {/* Indicador de Hoy */}
              {cell.isToday && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-rose-500 absolute bottom-0.5" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mensaje divertido cuando intenta elegir más de 30 días */}
      <AnimatePresence>
        {funnyNotice && (
          <motion.div
            key="funny-alert"
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className="mt-2.5 p-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold text-center shadow-xs flex items-center justify-center gap-1.5 animate-pulse"
          >
            <span>😜</span>
            <span>{funnyNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Resumen del día seleccionado (Solo cuando es válido y confirmado) */}
      {!isVisualTooFar && readableSelected && !funnyNotice && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2.5 pt-2 border-t border-rose-100 flex items-center justify-between text-[11px]"
        >
          <div className="flex items-center gap-1.5 text-rose-700 font-bold">
            <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
            <span>{readableSelected}</span>
          </div>
          <span className="text-[9px] font-bold text-rose-500 bg-rose-100/80 px-2 py-0.5 rounded-full">
            Confirmado ✨
          </span>
        </motion.div>
      )}
    </div>
  );
}
