'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';

interface LocationSectionProps {
  pickupAtHome: boolean;
  customLocation: string;
  nickname?: string;
  onSetPickupAtHome: (val: boolean) => void;
  onCustomLocationChange: (val: string) => void;
}

export default function LocationSection({
  pickupAtHome,
  customLocation,
  nickname,
  onSetPickupAtHome,
  onCustomLocationChange,
}: LocationSectionProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-rose-100/80 shadow-xs">
      <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-gray-800">
        <MapPin className="w-3.5 h-3.5 text-rose-500" />
        <span>3. Punto de encuentro</span>
      </div>

      {/* Segmented Control fluido estilo Apple */}
      <div className="grid grid-cols-2 p-0.5 bg-rose-50/70 rounded-lg border border-rose-200/70 gap-1 shadow-inner">
        <button
          type="button"
          onClick={() => onSetPickupAtHome(true)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-bold transition-all active:scale-95 ${
            pickupAtHome
              ? 'bg-white text-rose-700 shadow-2xs border border-rose-200/80 font-black'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <span>🏡 Pasa por mi casa</span>
        </button>

        <button
          type="button"
          onClick={() => onSetPickupAtHome(false)}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-bold transition-all active:scale-95 ${
            !pickupAtHome
              ? 'bg-white text-rose-700 shadow-2xs border border-rose-200/80 font-black'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <span>📍 En otro punto</span>
        </button>
      </div>

      {/* Expandable text field when "No" is chosen */}
      <AnimatePresence>
        {!pickupAtHome && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                autoFocus
                placeholder="¿Dónde paso por ti? (ej. Un café, parque, trabajo...)"
                value={customLocation}
                onChange={(e) => onCustomLocationChange(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-rose-300 bg-rose-50/40 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-gray-400 font-medium"
              />
              {customLocation.trim() && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
