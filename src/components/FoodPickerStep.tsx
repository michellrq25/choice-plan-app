'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FOOD_OPTIONS } from '@/constants/food';
import FoodHeader from './food/FoodHeader';
import FoodCard from './food/FoodCard';
import ScrollHintPill from './food/ScrollHintPill';
import FoodBottomBar from './food/FoodBottomBar';

interface FoodPickerStepProps {
  sessionId: string;
  nickname?: string;
  onConfirmed: (selectedFoods: string[]) => void;
}

const MAX_FOODS = 3;

export default function FoodPickerStep({ sessionId, nickname, onConfirmed }: FoodPickerStepProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);
  const [showLimitNotice, setShowLimitNotice] = useState<boolean>(false);
  const endOfListRef = useRef<HTMLDivElement | null>(null);

  // Ocultar el indicador flotante cuando las últimas opciones / final del menú ya estén en pantalla
  useEffect(() => {
    // 1. IntersectionObserver en el pie del menú
    if (typeof IntersectionObserver !== 'undefined' && endOfListRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowScrollHint(!entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      observer.observe(endOfListRef.current);
      return () => observer.disconnect();
    }

    // 2. Fallback de proximidad al scroll
    const handleScroll = () => {
      const mainEl = document.querySelector('main');
      const scrollEl = mainEl || document.documentElement;
      const scrollTop = mainEl ? mainEl.scrollTop : (window.scrollY || document.documentElement.scrollTop);
      const scrollHeight = scrollEl.scrollHeight;
      const clientHeight = scrollEl.clientHeight || window.innerHeight;

      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
      setShowScrollHint(distanceToBottom >= 130);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToMore = () => {
    window.scrollBy({ top: 280, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollBy({ top: 280, behavior: 'smooth' });
    }
  };

  const toggleFood = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) {
        setShowLimitNotice(false);
        return prev.filter((item) => item !== name);
      }
      if (prev.length >= MAX_FOODS) {
        setShowLimitNotice(true);
        setTimeout(() => setShowLimitNotice(false), 2500);
        return prev;
      }
      setShowLimitNotice(false);
      return [...prev, name];
    });
  };

  const handleConfirm = async () => {
    if (selected.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, foods: selected, name: nickname }),
      });
    } catch (err) {
      console.error('Error saving foods:', err);
    } finally {
      setIsSubmitting(false);
      onConfirmed(selected);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-between max-w-md mx-auto px-3.5 sm:px-4 pt-3.5 sm:pt-4 pb-36 relative touch-pan-y">
      {/* 1. Header */}
      <FoodHeader totalOptions={FOOD_OPTIONS.length} nickname={nickname} />

      {/* Aviso amigable cuando intenta superar el límite */}
      <AnimatePresence>
        {showLimitNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="mb-2.5 p-2 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-800 text-xs font-semibold text-center shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>🎯</span>
            <span>¡Máximo {MAX_FOODS} antojos! Desmarca uno si deseas cambiarlo 😉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Grid de opciones */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1 content-start">
        {FOOD_OPTIONS.map((item, index) => (
          <FoodCard
            key={item.id}
            item={item}
            index={index}
            isSelected={selected.includes(item.name)}
            isDisabled={selected.length >= MAX_FOODS && !selected.includes(item.name)}
            onToggle={toggleFood}
          />
        ))}

        {/* Indicador de final del menú */}
        <div
          ref={endOfListRef}
          className="col-span-2 text-center py-4 text-xs text-rose-400 font-semibold flex items-center justify-center gap-1"
        >
          <span>✨ Llegaste al final del menú ✨</span>
        </div>
      </div>

      {/* 3. Botón flotante para sugerir scroll */}
      <ScrollHintPill isVisible={showScrollHint} onClick={scrollToMore} />

      {/* 4. Barra de acción inferior fija */}
      <FoodBottomBar
        selectedCount={selected.length}
        maxCount={MAX_FOODS}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
