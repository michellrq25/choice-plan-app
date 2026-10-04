'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Calendar,
  Utensils,
  RotateCcw,
  CheckCircle2,
  Clock,
  MapPin,
  PartyPopper,
  Copy,
  Check,
  ShieldCheck,
  Car,
  Ticket,
  Music,
  Smile,
} from 'lucide-react';
import { FOOD_EMOJIS_MAP } from '@/constants/food';

interface SuccessStepProps {
  attempts: number;
  selectedFoods: string[];
  meetingDate?: string;
  meetingTime?: string;
  meetingLocation?: string;
  nickname?: string;
  fullName?: string;
  onReset: () => void;
}

const CELEBRATION_MESSAGES = [
  '¡Se viene tremendo plan! 😎',
  '¡Cero excusas, la vamos a pasar genial! 🙌',
  '¡Promesa de que la comida estará top! 😋',
  '¡Puntualidad asegurada, paso por ti a tiempo! 🚗💨',
  '¡Modo salida activado al 100%! 🚀✨',
];

export default function SuccessStep({
  attempts,
  selectedFoods,
  meetingDate = 'Sábado',
  meetingTime = '8:30 PM',
  meetingLocation,
  nickname,
  fullName,
  onReset,
}: SuccessStepProps) {
  const [tapCount, setTapCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<
    Array<{ id: number; x: number; y: number; icon: string }>
  >([]);

  const safeDate = meetingDate || 'Fin de semana';
  const safeTime = meetingTime || '8:30 PM';
  const displayName = nickname || fullName || 'Ale';

  const triggerConfetti = useCallback((originY = 0.65) => {
    const defaults = {
      origin: { y: originY },
      zIndex: 9999,
      disableForReducedMotion: true,
    };

    confetti({
      ...defaults,
      particleCount: 35,
      spread: 70,
      startVelocity: 38,
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6'],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      spread: 110,
      startVelocity: 28,
      colors: ['#f43f5e', '#fbbf24', '#06b6d4', '#ffffff'],
    });
  }, []);

  useEffect(() => {
    triggerConfetti(0.55);
    const t = setTimeout(() => triggerConfetti(0.45), 300);
    return () => clearTimeout(t);
  }, [triggerConfetti]);

  const handleCelebrateTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([25, 35, 25]);
    }

    triggerConfetti(0.7);

    const icons = ['✨', '🎉', '⭐', '🚀', '😎', '🍕'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const newParticle = { id: Date.now() + Math.random(), x, y, icon: randomIcon };
    setFloatingParticles((prev) => [...prev.slice(-8), newParticle]);

    setTapCount((prev) => prev + 1);
  };

  const handleCopySummary = async () => {
    const locationPart = meetingLocation
      ? meetingLocation.toLowerCase() === 'mi casa'
        ? 'en mi casa 🏡'
        : `en ${meetingLocation}`
      : 'por coordinar';

    const foodList = selectedFoods.length > 0 ? selectedFoods.join(', ') : 'Comida sorpresa';
    const textToCopy = `🎫 PASE OFICIAL DE NUESTRA SALIDA ✨\n\n📅 Fecha: ${safeDate}\n⏰ Hora: ${safeTime}\n📍 Punto de recogida: ${locationPart}\n🍽️ Antojos: ${foodList}\n\n😎 ¡Plan 100% confirmado! Nos vemos este finde ✨`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Nuestro Plan ✨',
          text: textToCopy,
        });
        return;
      } catch {
        // Fallback
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch {
        // Ignore fallback
      }
    }
  };

  const currentMessage =
    tapCount === 0
      ? '¡Toca abajo para celebrar el plan! 🚀'
      : CELEBRATION_MESSAGES[(tapCount - 1) % CELEBRATION_MESSAGES.length];

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between max-w-md mx-auto px-4 py-3 sm:py-4 relative overflow-hidden select-none">
      {/* Background Ambient Floating Sparkles & Stars (No hearts) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { icon: '✨', left: '12%', delay: 0, duration: 8 },
          { icon: '⭐', left: '85%', delay: 1.5, duration: 7 },
          { icon: '🌟', left: '22%', delay: 3, duration: 9 },
          { icon: '🎉', left: '78%', delay: 2, duration: 8.5 },
          { icon: '💫', left: '48%', delay: 4, duration: 7.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-sm opacity-20 filter blur-[0.2px]"
            style={{ left: item.left, bottom: '-20px' }}
            animate={{
              y: ['0vh', '-105vh'],
              opacity: [0, 0.4, 0.55, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Top Header - Fun, Cool & Energetic (No hearts) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14 }}
        className="relative z-10 flex flex-col items-center text-center mt-0 mb-0.5 flex-shrink-0"
      >
        <div className="relative mb-1">
          <motion.div
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 flex items-center justify-center shadow-md shadow-rose-300/30"
          >
            <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
          </motion.div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white p-0.5 rounded-full shadow-sm border border-white">
            <CheckCircle2 className="w-3 h-3" />
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200/80 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
          Pase Oficial • Salida Confirmada 🎟️
        </span>

        <h1 className="text-lg sm:text-xl font-black text-gray-900 mt-0.5 tracking-tight">
          {displayName ? `¡Planazo Listo, ${displayName}! 😎` : '¡Planazo Listo! 😎'}
        </h1>

        <p className="text-[11px] text-gray-500 font-medium">
          Todo coordinado para este fin de semana. ¡La vamos a pasar genial!
        </p>
      </motion.div>

      {/* The Elongated Date Ticket (Fills vertical space comfortably) */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="relative z-10 w-full flex-1 my-1 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-rose-200/80 shadow-lg shadow-rose-400/10 p-3.5 flex flex-col justify-between overflow-hidden"
      >
        {/* Ticket Side Cutout Notches */}
        <div className="absolute -left-2.5 top-[68px] w-5 h-5 rounded-full bg-[#fdf2f0] border-r border-rose-200/70 shadow-inner pointer-events-none" />
        <div className="absolute -right-2.5 top-[68px] w-5 h-5 rounded-full bg-[#fdf2f0] border-l border-rose-200/70 shadow-inner pointer-events-none" />

        {/* 1. Ticket Top Ribbon */}
        <div className="flex items-center justify-between border-b border-rose-100 pb-1.5">
          <div className="flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[9px] font-black tracking-widest text-rose-800 uppercase">
              PASE EXCLUSIVO
            </span>
          </div>
          <span className="text-[8px] font-mono font-bold text-gray-400 tracking-wider bg-gray-50 px-2 py-0.5 rounded border border-gray-200/60">
            № PLAN-2026-VIP
          </span>
        </div>

        {/* 2. Full Date & Time Banner (Complete date, NO truncation!) */}
        <div className="bg-gradient-to-r from-rose-50/90 via-pink-50/50 to-amber-50/70 rounded-xl p-2.5 border border-rose-200/70 flex items-center justify-between gap-2.5 shadow-xs">
          {/* Fecha completa */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-rose-500 shadow-xs shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Fecha</p>
              <p className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                {safeDate}
              </p>
            </div>
          </div>

          {/* Hora */}
          <div className="flex items-center gap-2 border-l border-rose-200/70 pl-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-500 shadow-xs shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Hora</p>
              <p className="text-xs sm:text-sm font-black text-gray-900 whitespace-nowrap">
                {safeTime}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Pickup Location Banner */}
        {meetingLocation && (
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-rose-50/40 border border-rose-100/80 text-xs text-gray-700">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-gray-400 text-[11px]">Punto de recogida:</span>
              <span className="font-bold text-gray-900 text-xs truncate">{meetingLocation}</span>
            </div>
            <Car className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          </div>
        )}

        {/* 4. Food Choices */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-rose-800 font-bold text-[11px]">
            <Utensils className="w-3.5 h-3.5 text-rose-500" />
            <span>Menú Seleccionado para la Salida:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedFoods.map((food) => (
              <span
                key={food}
                className="inline-flex items-center gap-1 bg-rose-50/90 text-rose-700 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-rose-200/70 shadow-xs"
              >
                <span>{FOOD_EMOJIS_MAP[food] || '🍽️'}</span>
                <span>{food}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 5. Good Vibes / Plan Details (Cool & Friendly conditions) */}
        <div className="bg-amber-50/60 rounded-xl px-3 py-2 border border-amber-200/70 flex items-center justify-between text-[11px] text-amber-900 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Smile className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium text-[11px] truncate">Buena comida, risas y música en el auto ✨</span>
          </div>
          <span className="text-[9px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full shrink-0">
            Sin cancelaciones 😉
          </span>
        </div>

        {/* 6. Stamp of Approval & Escape Attempts */}
        <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-500">
            {attempts > 0 ? (
              <span>Intentos de escape: <strong>{attempts}</strong> 😂</span>
            ) : (
              <span className="text-emerald-600 font-bold">¡Aceptaste a la primera! 🚀</span>
            )}
          </div>

          {/* Cool Rubber Stamp (Friendly, NOT romantic) */}
          <motion.div
            initial={{ scale: 1.8, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -4 }}
            transition={{ delay: 0.25, type: 'spring', damping: 10, stiffness: 220 }}
            className="border-2 border-dashed border-rose-500 bg-rose-100/80 text-rose-600 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-xs"
          >
            ✓ PLAN 100% CONFIRMADO 😎
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Action Area (Interactive celebration without love/hearts) */}
      <div className="relative z-10 flex flex-col gap-2 w-full mt-1 flex-shrink-0">
        {/* Floating particles on tap */}
        <AnimatePresence>
          {floatingParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -70, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute pointer-events-none text-xl font-bold z-50"
              style={{ left: p.x, top: p.y }}
            >
              {p.icon}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Dynamic Reaction Pill */}
        <motion.div
          key={tapCount}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xs font-semibold text-rose-600 h-4 px-2 truncate"
        >
          {currentMessage}
        </motion.div>

        {/* Primary Interactive Celebration Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCelebrateTap}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-400/30 border border-rose-400/40 cursor-pointer transition-all relative overflow-hidden"
        >
          <PartyPopper className="w-4 h-4 fill-white text-white shrink-0" />
          <span>{tapCount === 0 ? '🎉 ¡Todo listo para el plan! Toca aquí 🚀' : '🎉 ¡Celebrar otra vez! 🚀'}</span>
          {tapCount > 0 && (
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              +{tapCount}
            </span>
          )}
        </motion.button>

        {/* Secondary Actions: Copy Itinerary & Reset */}
        <div className="flex items-center gap-2">
          {/* Copy Itinerary */}
          <button
            onClick={handleCopySummary}
            className="flex-1 py-2 px-3 rounded-xl bg-white/80 hover:bg-white text-gray-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-rose-200/80 shadow-xs active:scale-95 transition-all"
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
            className="py-2 px-3 rounded-xl bg-white/50 hover:bg-white text-gray-500 hover:text-gray-700 font-medium text-xs flex items-center justify-center gap-1 border border-rose-100 shadow-xs active:scale-95 transition-all"
            title="Reiniciar y volver al inicio"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>
    </div>
  );
}



