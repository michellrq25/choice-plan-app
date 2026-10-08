'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getUpcomingWeekendDays, formatReadableDate } from '@/lib/dateUtils';
import { DEFAULT_TIME, DEFAULT_PICKUP_LOCATION } from '@/constants/datetime';
import DateTimeHeader from './datetime/DateTimeHeader';
import DateSection from './datetime/DateSection';
import TimeSection from './datetime/TimeSection';
import LocationSection from './datetime/LocationSection';
import DateTimeBottomBar from './datetime/DateTimeBottomBar';

interface DateTimePickerStepProps {
  sessionId: string;
  nickname?: string;
  selectedFoods?: string[];
  attempts?: number;
  onConfirmed: (dateTimeData: { date: string; time: string; location?: string }) => void;
}

export default function DateTimePickerStep({
  sessionId,
  nickname,
  selectedFoods = [],
  attempts = 0,
  onConfirmed,
}: DateTimePickerStepProps) {
  const quickDates = useMemo(() => getUpcomingWeekendDays(), []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Estado de fecha
  const [selectedDate, setSelectedDate] = useState<string>(() => quickDates[1]?.fullDate || 'Sábado');
  const [customDate, setCustomDate] = useState<string>('');
  const [isCustomDate, setIsCustomDate] = useState<boolean>(false);

  // Estado de hora
  const [selectedTime, setSelectedTime] = useState<string>(DEFAULT_TIME);
  const [customTime, setCustomTime] = useState<string>('');
  const [isCustomTime, setIsCustomTime] = useState<boolean>(false);

  // Estado de lugar
  const [pickupAtHome, setPickupAtHome] = useState<boolean>(true);
  const [customLocation, setCustomLocation] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(false);

  // Detectar necesidad de scroll
  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
    setShowScrollHint(distanceToBottom > 45);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(el);
    }

    const timer = setTimeout(checkScroll, 320);

    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [isCustomDate]);

  const scrollToMore = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 260, behavior: 'smooth' });
    }
  };

  // Garantizar scroll al inicio al montar este paso
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, []);

  const formattedCustomDate = customDate ? formatReadableDate(customDate) : '';
  const finalDate = isCustomDate ? formattedCustomDate : selectedDate;
  const finalTime = isCustomTime && customTime ? customTime : selectedTime;
  const finalLocation = pickupAtHome ? DEFAULT_PICKUP_LOCATION : customLocation.trim() || undefined;
  const isLocationValid = pickupAtHome || customLocation.trim().length > 0;

  const handleConfirm = async () => {
    if (!finalDate || !finalTime || !isLocationValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          date: finalDate,
          time: finalTime,
          location: finalLocation,
          name: nickname,
          foods: selectedFoods,
          attempts,
        }),
      });
    } catch (err) {
      console.error('Error saving meeting details:', err);
    } finally {
      setIsSubmitting(false);
      onConfirmed({
        date: finalDate,
        time: finalTime,
        location: finalLocation,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between max-w-md mx-auto px-4 pt-3 pb-6 sm:py-4 overflow-y-auto no-scrollbar relative select-none"
    >
      {/* 1. Header */}
      <DateTimeHeader nickname={nickname} />

      {/* 2. Middle Cards (Día, Hora, Punto de encuentro) */}
      <div className="flex flex-col gap-2 sm:gap-2.5 my-auto">
        {/* Card 1: Día */}
        <DateSection
          quickDates={quickDates}
          selectedDate={selectedDate}
          customDate={customDate}
          isCustomDate={isCustomDate}
          formattedCustomDate={formattedCustomDate}
          onSelectQuickDate={(fullDate) => {
            setIsCustomDate(false);
            setSelectedDate(fullDate);
          }}
          onToggleCustomDate={() => setIsCustomDate(!isCustomDate)}
          onCustomDateChange={setCustomDate}
        />

        {/* Card 2: Hora */}
        <TimeSection
          selectedTime={selectedTime}
          customTime={customTime}
          isCustomTime={isCustomTime}
          onSelectQuickTime={(timeLabel) => {
            setIsCustomTime(false);
            setSelectedTime(timeLabel);
          }}
          onToggleCustomTime={() => setIsCustomTime(!isCustomTime)}
          onCustomTimeChange={setCustomTime}
        />

        {/* Card 3: Punto de encuentro */}
        <LocationSection
          pickupAtHome={pickupAtHome}
          customLocation={customLocation}
          nickname={nickname}
          onSetPickupAtHome={setPickupAtHome}
          onCustomLocationChange={setCustomLocation}
        />
      </div>

      {/* 3. Bottom Action Area (Resumen y Botón de confirmación) */}
      <DateTimeBottomBar
        finalDate={finalDate}
        finalTime={finalTime}
        finalLocation={finalLocation}
        isLocationValid={isLocationValid}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
      />

      {/* 4. Botón flotante para sugerir scroll hacia abajo */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.button
            type="button"
            onClick={scrollToMore}
            initial={{ opacity: 0, y: 15, scale: 0.9, x: '-50%' }}
            animate={{
              opacity: 1,
              y: [0, -4, 0],
              scale: 1,
              x: '-50%',
            }}
            exit={{ opacity: 0, y: 15, scale: 0.9, x: '-50%' }}
            transition={{
              y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
            }}
            style={{ left: '50%' }}
            className="fixed bottom-24 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-xs font-black shadow-lg shadow-rose-500/40 border-2 border-white/90 backdrop-blur-md flex items-center gap-1.5 active:scale-95 cursor-pointer select-none"
          >
            <span>Desliza hacia abajo</span>
            <ChevronDown className="w-4 h-4 text-white animate-bounce stroke-[3]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
