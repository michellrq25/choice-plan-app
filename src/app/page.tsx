'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProposalStep from '@/components/ProposalStep';
import FoodPickerStep from '@/components/FoodPickerStep';
import DateTimePickerStep from '@/components/DateTimePickerStep';
import SuccessStep from '@/components/SuccessStep';
import { useTargetProfile } from '@/hooks/useTargetProfile';

type Step = 'proposal' | 'food' | 'datetime' | 'success';

interface MeetingData {
  date: string;
  time: string;
  location?: string;
}

function MainContent() {
  const { fullName, nickname } = useTargetProfile();
  const [step, setStep] = useState<Step>('proposal');
  const [sessionId, setSessionId] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [meetingData, setMeetingData] = useState<MeetingData>({
    date: '',
    time: '',
  });

  const resetScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
  };

  // Generate or retrieve persistent sessionId for this visitor
  useEffect(() => {
    let sid = window.sessionStorage.getItem('choice_plan_session_id');
    if (!sid) {
      sid = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      window.sessionStorage.setItem('choice_plan_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const handleAccepted = (attemptsCount: number) => {
    resetScrollToTop();
    setAttempts(attemptsCount);
    setStep('food');
  };

  const handleFoodConfirmed = (foods: string[]) => {
    resetScrollToTop();
    setSelectedFoods(foods);
    setStep('datetime');
  };

  const handleDateTimeConfirmed = (data: MeetingData) => {
    resetScrollToTop();
    setMeetingData(data);
    setStep('success');
  };

  const handleReset = () => {
    resetScrollToTop();
    const newSid = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    window.sessionStorage.setItem('choice_plan_session_id', newSid);
    setSessionId(newSid);
    setAttempts(0);
    setSelectedFoods([]);
    setMeetingData({ date: '', time: '' });
    setStep('proposal');
  };

  if (!sessionId) {
    return (
      <main className="min-h-[100dvh] w-full flex items-center justify-center bg-rose-50">
        <div className="w-8 h-8 rounded-full border-4 border-rose-300 border-t-rose-600 animate-spin" />
      </main>
    );
  }

  return (
    <main
      className={`w-full max-w-lg mx-auto relative ${
        step === 'proposal' || step === 'datetime' || step === 'success'
          ? 'overflow-hidden h-[100dvh]'
          : 'min-h-[100dvh] overflow-y-auto'
      }`}
    >
      <AnimatePresence mode="wait">
        {step === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            <ProposalStep
              sessionId={sessionId}
              nickname={nickname}
              fullName={fullName}
              onAccepted={handleAccepted}
            />
          </motion.div>
        )}

        {step === 'food' && (
          <motion.div
            key="food"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-[100dvh]"
          >
            <FoodPickerStep
              sessionId={sessionId}
              nickname={nickname}
              onConfirmed={handleFoodConfirmed}
            />
          </motion.div>
        )}

        {step === 'datetime' && (
          <motion.div
            key="datetime"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            <DateTimePickerStep
              sessionId={sessionId}
              nickname={nickname}
              selectedFoods={selectedFoods}
              attempts={attempts}
              onConfirmed={handleDateTimeConfirmed}
            />
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <SuccessStep
              attempts={attempts}
              selectedFoods={selectedFoods}
              meetingDate={meetingData.date}
              meetingTime={meetingData.time}
              meetingLocation={meetingData.location}
              nickname={nickname}
              fullName={fullName}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[100dvh] w-full flex items-center justify-center bg-rose-50">
          <div className="w-8 h-8 rounded-full border-4 border-rose-300 border-t-rose-600 animate-spin" />
        </main>
      }
    >
      <MainContent />
    </Suspense>
  );
}

