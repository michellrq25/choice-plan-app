'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  onConfirmed: (dateTimeData: { date: string; time: string; location?: string }) => void;
}

export default function DateTimePickerStep({ sessionId, nickname, onConfirmed }: DateTimePickerStepProps) {
  const quickDates = useMemo(() => getUpcomingWeekendDays(), []);

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

  // Garantizar scroll al inicio al montar este paso
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
  }, []);

  const formattedCustomDate = customDate ? formatReadableDate(customDate) : '';
  const finalDate = isCustomDate && formattedCustomDate ? formattedCustomDate : selectedDate;
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
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between max-w-md mx-auto px-4 py-3 sm:py-4 overflow-y-auto no-scrollbar relative select-none">
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
    </div>
  );
}
