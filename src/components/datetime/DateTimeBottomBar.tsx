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
      <button
        onClick={onConfirm}
        disabled={!isReady}
        className={`w-full py-3 px-4 rounded-2xl font-black transition-all active:scale-[0.98] flex flex-col items-center justify-center gap-0.5 shadow-md ${
          isReady
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-rose-500/25 hover:shadow-rose-500/40 border border-rose-400/40 cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border border-transparent'
        }`}
      >
        <div className="flex items-center gap-1.5 text-sm sm:text-base font-black">
          {isSubmitting ? (
            <span>Guardando coordinación...</span>
          ) : !finalDate ? (
            <span>Elige una fecha</span>
          ) : !isLocationValid ? (
            <span>Indica el punto de encuentro</span>
          ) : (
            <>
              <span>¡Todo Listo, Salgamos! ✨</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </div>

        {isReady && (
          <span className="text-[10.5px] font-medium text-white/95 truncate max-w-full">
            {finalDate} • {finalTime} • {finalLocation || 'Paso por tu casa'} 🚗
          </span>
        )}
      </button>
    </div>
  );
}
