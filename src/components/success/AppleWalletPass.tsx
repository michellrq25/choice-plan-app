'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar, Clock, MapPin, Car, Utensils } from 'lucide-react';
import { FOOD_EMOJIS_MAP } from '@/constants/food';

interface AppleWalletPassProps {
  safeDate: string;
  safeTime: string;
  meetingLocation?: string;
  selectedFoods: string[];
  attempts: number;
  displayName: string;
}

export default function AppleWalletPass({
  safeDate,
  safeTime,
  meetingLocation,
  selectedFoods,
  attempts,
  displayName,
}: AppleWalletPassProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.12, type: 'spring', damping: 18 }}
      className="relative z-10 w-full flex-1 my-1 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-rose-200/90 shadow-xl shadow-rose-500/10 p-3.5 flex flex-col justify-between overflow-hidden"
    >
      {/* Ticket Perforation Notches (Apple Wallet Style) */}
      <div className="absolute -left-3 top-[108px] w-6 h-6 rounded-full bg-[#fdf2f0] border-r border-rose-200/80 shadow-inner pointer-events-none" />
      <div className="absolute -right-3 top-[108px] w-6 h-6 rounded-full bg-[#fdf2f0] border-l border-rose-200/80 shadow-inner pointer-events-none" />

      {/* Pass Top Ribbon */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-[10px] font-black tracking-widest text-rose-800 uppercase">
            PASE EXCLUSIVO
          </span>
        </div>
        <span className="text-[9px] font-mono font-bold text-gray-400 tracking-wider bg-gray-50 px-2 py-0.5 rounded border border-gray-200/60">
          № PLAN-2026-VIP
        </span>
      </div>

      {/* 2-Column Apple Grid: Fecha & Hora */}
      <div className="grid grid-cols-2 gap-3 py-1.5">
        {/* Fecha */}
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 mt-0.5 border border-rose-100/80">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Fecha</p>
            <p className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
              {safeDate}
            </p>
          </div>
        </div>

        {/* Hora */}
        <div className="flex items-start gap-2 border-l border-gray-100 pl-3">
          <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 mt-0.5 border border-amber-100/80">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Hora</p>
            <p className="text-xs sm:text-sm font-black text-gray-900 leading-tight whitespace-nowrap">
              {safeTime}
            </p>
          </div>
        </div>
      </div>

      {/* Dashed Perforated Tear Line */}
      <div className="border-t border-dashed border-rose-200/80 my-1 relative" />

      {/* Location Row - Claro y Personalizado (Cero ambigüedad) */}
      <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-rose-50/40 border border-rose-100/70">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span className="text-gray-400 text-[11px] font-medium">Punto de recojo:</span>
          <span className="font-extrabold text-gray-900 text-xs truncate">
            {!meetingLocation ||
              meetingLocation.toLowerCase() === 'mi casa' ||
              meetingLocation.toLowerCase().includes('casa')
              ? displayName
                ? `Casa de ${displayName}`
                : 'Paso por tu casa'
              : meetingLocation}
          </span>
        </div>
        <Car className="w-3.5 h-3.5 text-rose-400 shrink-0" />
      </div>

      {/* Selected Foods Pills */}
      <div className="flex flex-col gap-1 py-1">
        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[9.5px] uppercase tracking-wider">
          <Utensils className="w-3 h-3 text-rose-500" />
          <span>Menú para disfrutar:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {selectedFoods.map((food) => (
            <span
              key={food}
              className="inline-flex items-center gap-1 bg-white text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-gray-200/80 shadow-2xs"
            >
              <span>{FOOD_EMOJIS_MAP[food] || '🍽️'}</span>
              <span>{food}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Apple Wallet Style Barcode & Verification Stamp */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
        {/* Authentic Barcode SVG */}
        <div className="flex flex-col gap-0.5">
          <svg
            className="h-6 w-28 sm:w-32 text-gray-800 opacity-75"
            viewBox="0 0 100 24"
            fill="currentColor"
          >
            <rect x="0" y="0" width="2" height="24" />
            <rect x="4" y="0" width="1" height="24" />
            <rect x="7" y="0" width="3" height="24" />
            <rect x="12" y="0" width="1" height="24" />
            <rect x="15" y="0" width="2" height="24" />
            <rect x="19" y="0" width="4" height="24" />
            <rect x="25" y="0" width="1.5" height="24" />
            <rect x="28" y="0" width="2" height="24" />
            <rect x="32" y="0" width="3" height="24" />
            <rect x="37" y="0" width="1" height="24" />
            <rect x="40" y="0" width="2" height="24" />
            <rect x="44" y="0" width="3.5" height="24" />
            <rect x="50" y="0" width="1" height="24" />
            <rect x="53" y="0" width="2" height="24" />
            <rect x="57" y="0" width="4" height="24" />
            <rect x="63" y="0" width="1.5" height="24" />
            <rect x="66" y="0" width="2" height="24" />
            <rect x="70" y="0" width="3" height="24" />
            <rect x="75" y="0" width="1" height="24" />
            <rect x="78" y="0" width="2" height="24" />
            <rect x="82" y="0" width="3" height="24" />
            <rect x="87" y="0" width="1" height="24" />
            <rect x="90" y="0" width="2.5" height="24" />
            <rect x="95" y="0" width="1.5" height="24" />
            <rect x="98" y="0" width="2" height="24" />
          </svg>
          <span className="text-[7.5px] font-mono tracking-widest text-gray-400 font-semibold uppercase">
            {displayName.toUpperCase()}-2026-VIP-TICKET
          </span>
        </div>

        {/* Escape Attempts & Verified Badge */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] text-gray-500 font-medium">
            {attempts > 0 ? (
              <>Intentos de escape: <strong className="text-gray-800">{attempts}</strong> 😂</>
            ) : (
              <span className="text-emerald-600 font-bold">¡A la primera! 🚀</span>
            )}
          </span>
          <div className="border border-rose-400/80 bg-rose-50 text-rose-600 font-black text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-2xs shrink-0 whitespace-nowrap">
            ✓ CONFIRMADO 100% 😎
          </div>
        </div>
      </div>
    </motion.div>
  );
}
