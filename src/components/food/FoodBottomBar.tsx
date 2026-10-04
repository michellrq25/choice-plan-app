'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FoodBottomBarProps {
  selectedCount: number;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export default function FoodBottomBar({
  selectedCount,
  isSubmitting,
  onConfirm,
}: FoodBottomBarProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 max-w-md mx-auto bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-md z-30">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2 px-1 font-medium">
        <span>
          Seleccionadas: <strong className="text-rose-600">{selectedCount}</strong>
        </span>
        {!hasSelection ? (
          <span className="text-rose-400">Elige al menos 1</span>
        ) : (
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> ¡Antojo perfecto!
          </span>
        )}
      </div>

      <button
        onClick={onConfirm}
        disabled={!hasSelection || isSubmitting}
        className={`w-full py-4 px-6 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
          hasSelection && !isSubmitting
            ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-400/40 cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
        }`}
      >
        {isSubmitting ? (
          <span>Guardando tu elección...</span>
        ) : (
          <>
            <span>Siguiente: Elegir Fecha & Hora</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}
