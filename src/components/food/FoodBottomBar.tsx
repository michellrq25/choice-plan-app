'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FoodBottomBarProps {
  selectedCount: number;
  maxCount?: number;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export default function FoodBottomBar({
  selectedCount,
  maxCount = 3,
  isSubmitting,
  onConfirm,
}: FoodBottomBarProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_25px_rgba(0,0,0,0.03)] z-30">
      <div className="flex items-center justify-between text-xs mb-2 px-1 font-medium">
        {!hasSelection ? (
          <>
            <span className="text-gray-400">¿Qué te provoca hoy?</span>
            <span className="text-rose-500 font-semibold">Elige al menos 1 para avanzar</span>
          </>
        ) : selectedCount === 1 ? (
          <>
            <span className="text-gray-700">
              <strong className="text-rose-600 font-black">1</strong> antojo elegido ✨
            </span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> ¡Listo para avanzar!
            </span>
          </>
        ) : selectedCount === 2 ? (
          <>
            <span className="text-gray-700">
              <strong className="text-rose-600 font-black">2</strong> antojos elegidos 👌
            </span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Puedes marcar 1 más
            </span>
          </>
        ) : (
          <>
            <span className="text-gray-700">
              <strong className="text-rose-600 font-black">{maxCount}</strong> antojos elegidos 🏆
            </span>
            <span className="text-amber-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Máximo alcanzado
            </span>
          </>
        )}
      </div>

      <button
        onClick={onConfirm}
        disabled={!hasSelection || isSubmitting}
        className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
          hasSelection && !isSubmitting
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-rose-500/25 border border-rose-400/30 cursor-pointer'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-transparent'
        }`}
      >
        {isSubmitting ? (
          <span>Guardando tu elección...</span>
        ) : (
          <>
            <span>Siguiente: Elegir Fecha & Hora</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </>
        )}
      </button>
    </div>
  );
}
