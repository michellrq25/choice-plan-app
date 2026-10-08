'use client';

import React from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface SuccessActionButtonsProps {
  copied: boolean;
  onCopySummary: () => void;
  onReset: () => void;
}

export default function SuccessActionButtons({
  copied,
  onCopySummary,
  onReset,
}: SuccessActionButtonsProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Copy Itinerary */}
      <button
        onClick={onCopySummary}
        className="flex-1 py-2 px-3 rounded-xl bg-white/80 hover:bg-white text-gray-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-rose-200/80 shadow-xs active:scale-95 transition-all cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-emerald-700 font-bold">¡Itinerario copiado! 📋</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Copiar itinerario</span>
          </>
        )}
      </button>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="py-2 px-3 rounded-xl bg-white/50 hover:bg-white text-gray-500 hover:text-gray-700 font-medium text-xs flex items-center justify-center gap-1 border border-rose-100 shadow-xs active:scale-95 transition-all cursor-pointer"
        title="Reiniciar y volver al inicio"
      >
        <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
        <span>Reiniciar</span>
      </button>
    </div>
  );
}
