'use client';

import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface DateTimeBottomBarProps {
  finalDate: string;
  finalTime: string;
  finalLocation?: string;
  isLocationValid: boolean;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export default function DateTimeBottomBar({
  finalDate,
  finalTime,
  finalLocation,
  isLocationValid,
  isSubmitting,
  onConfirm,
}: DateTimeBottomBarProps) {
  const isReady = Boolean(finalDate && finalTime && isLocationValid && !isSubmitting);

  return (
    <div className="pt-2 pb-1">
      <div className="flex flex-col gap-0.5 text-xs text-gray-600 mb-2 px-3 py-1.5 font-medium bg-rose-50/60 rounded-xl border border-rose-100/60">
        <div className="flex items-center justify-between">
          <span>
            📅 Día: <strong className="text-rose-600">{finalDate}</strong>
          </span>
          <span>
            🕒 Hora: <strong className="text-rose-600">{finalTime}</strong>
          </span>
        </div>
        <div className="text-[11px] text-gray-500 flex items-center gap-1 truncate pt-0.5">
          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
          <span>
            Punto de recojo:{' '}
            <strong className="text-rose-700">
              {finalLocation || 'Escribe el lugar arriba'}
            </strong>
          </span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={!isReady}
        className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
          isReady
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-emerald-400/30 cursor-pointer hover:shadow-emerald-400/50 hover:scale-[1.01]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
        }`}
      >
        {isSubmitting ? (
          <span>Guardando coordinación...</span>
        ) : !isLocationValid ? (
          <span>Indica el punto de encuentro</span>
        ) : (
          <>
            <span>¡Todo Listo, Salgamos!</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
