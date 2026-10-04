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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-rose-100/80 shadow-xs">
      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-gray-800">
        <MapPin className="w-3.5 h-3.5 text-rose-500" />
        <span>
          {nickname
            ? `3. ¿Deseas que pase a recogerte a tu casa, ${nickname}?`
            : '3. ¿Deseas que pase a recogerte en tu casa?'}
        </span>
      </div>

      {/* Radio button options */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onSetPickupAtHome(true)}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all active:scale-95 ${
            pickupAtHome
              ? 'bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-200 font-bold shadow-xs'
              : 'bg-white border-gray-200 text-gray-600 hover:border-rose-200'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
              pickupAtHome ? 'border-rose-500 bg-rose-500' : 'border-gray-300 bg-white'
            }`}
          >
            {pickupAtHome && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </span>
          <span className="whitespace-nowrap">Sí, en mi casa 🏡</span>
        </button>

        <button
          type="button"
          onClick={() => onSetPickupAtHome(false)}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all active:scale-95 ${
            !pickupAtHome
              ? 'bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-200 font-bold shadow-xs'
              : 'bg-white border-gray-200 text-gray-600 hover:border-rose-200'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
              !pickupAtHome ? 'border-rose-500 bg-rose-500' : 'border-gray-300 bg-white'
            }`}
          >
            {!pickupAtHome && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </span>
          <span className="whitespace-nowrap">No, otro lugar 📍</span>
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
