'use client';

import React, { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  STREAK_TITLES,
  CELEBRATION_PARTICLE_ICONS,
  CONFETTI_COLORS,
  Particle,
  Ripple,
} from '@/constants/success';
import SuccessBackground from './success/SuccessBackground';
import SuccessHeader from './success/SuccessHeader';
import AppleWalletPass from './success/AppleWalletPass';
import CelebrateButton from './success/CelebrateButton';
import SuccessActionButtons from './success/SuccessActionButtons';

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
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const safeDate = meetingDate || 'Fin de semana';
  const safeTime = meetingTime || '8:30 PM';
  const displayName = nickname || fullName || 'Ale';

  // Confetti launcher helper
  const triggerConfetti = useCallback((originY = 0.65, count = 30) => {
    confetti({
      origin: { y: originY },
      particleCount: count,
      spread: 75,
      startVelocity: 35,
      colors: CONFETTI_COLORS,
      disableForReducedMotion: false,
      zIndex: 9999,
    });
  }, []);

  // Initial welcome confetti burst
  useEffect(() => {
    triggerConfetti(0.5, 40);
    const t = setTimeout(() => triggerConfetti(0.4, 25), 320);
    return () => clearTimeout(t);
  }, [triggerConfetti]);

  // Current streak tier
  const currentStreak =
    [...STREAK_TITLES].reverse().find((s) => tapCount >= s.min) || STREAK_TITLES[0];

  // Addictive Tap Handler with Haptics, Ripples & Multi-Directional Confetti
  const handleCelebrateTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Mobile safe haptic pulse
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        if (tapCount % 5 === 0 && tapCount > 0) {
          navigator.vibrate([25, 35, 25]);
        } else {
          navigator.vibrate(18);
        }
      } catch {}
    }

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    // Add ripple
    const rippleId = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-4), { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 600);

    // Burst particles shooting outward
    const newBatch: Particle[] = Array.from({ length: 4 }).map(() => ({
      id: Date.now() + Math.random(),
      x,
      y,
      icon: CELEBRATION_PARTICLE_ICONS[
        Math.floor(Math.random() * CELEBRATION_PARTICLE_ICONS.length)
      ],
      vx: (Math.random() - 0.5) * 80,
      vy: -50 - Math.random() * 60,
    }));
    setParticles((prev) => [...prev.slice(-12), ...newBatch]);

    // Confetti cannons with alternating sides and escalating scale
    const isLeft = nextCount % 2 === 1;
    confetti({
      origin: { x: isLeft ? 0.15 : 0.85, y: 0.78 },
      angle: isLeft ? 60 : 120,
      particleCount: Math.min(22 + nextCount * 2, 55),
      spread: 60 + Math.min(nextCount * 3, 40),
      startVelocity: 38 + Math.min(nextCount, 16),
      colors: CONFETTI_COLORS,
      disableForReducedMotion: false,
      zIndex: 9999,
    });
  };

  const handleCopySummary = async () => {
    const locationPart =
      !meetingLocation ||
      meetingLocation.toLowerCase() === 'mi casa' ||
      meetingLocation.toLowerCase().includes('casa')
        ? `Paso por tu casa (${displayName}) 🚗`
        : `Paso por ti en ${meetingLocation} 📍`;

    const foodList =
      selectedFoods.length > 0 ? selectedFoods.join(', ') : 'Comida sorpresa';
    const textToCopy = `🎫 PASE OFICIAL DE NUESTRA SALIDA ✨\n\n📅 Fecha: ${safeDate}\n⏰ Hora: ${safeTime}\n📍 Punto de recogida: ${locationPart}\n🍽️ Antojos: ${foodList}\n\n😎 ¡Plan 100% confirmado! Nos vemos este finde ✨`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Nuestro Plan ✨',
          text: textToCopy,
        });
        return;
      } catch {}
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch {}
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between max-w-md mx-auto px-4 py-2.5 sm:py-3.5 relative overflow-hidden select-none">
      {/* Background Ambient Sparkles */}
      <SuccessBackground />

      {/* 1. Header */}
      <SuccessHeader displayName={displayName} />

      {/* 2. Apple Wallet VIP Pass */}
      <AppleWalletPass
        safeDate={safeDate}
        safeTime={safeTime}
        meetingLocation={meetingLocation}
        selectedFoods={selectedFoods}
        attempts={attempts}
        displayName={displayName}
      />

      {/* 3. Bottom Interactive Section */}
      <div className="relative z-10 flex flex-col gap-2 w-full mt-1 flex-shrink-0">
        <CelebrateButton
          tapCount={tapCount}
          particles={particles}
          ripples={ripples}
          onCelebrateTap={handleCelebrateTap}
          currentStreak={currentStreak}
        />

        <SuccessActionButtons
          copied={copied}
          onCopySummary={handleCopySummary}
          onReset={onReset}
        />
      </div>
    </div>
  );
}
