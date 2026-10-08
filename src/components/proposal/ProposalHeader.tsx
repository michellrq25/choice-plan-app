'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getHeaderMessage } from '@/constants/proposal';

interface ProposalHeaderProps {
  attempts: number;
  nickname?: string;
  fullName?: string;
}

const ProposalHeader = forwardRef<HTMLDivElement, ProposalHeaderProps>(
  ({ attempts, nickname, fullName }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center text-center mt-2 z-20 pointer-events-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 shadow-sm border border-rose-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
          {fullName ? `Invitación para ${fullName} ✨` : 'Propuesta de fin de semana 👀'}
        </span>

        {/* Animated Casual Avatar */}
        <div className="relative my-2">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, 0],
            }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-rose-400 via-orange-300 to-amber-300 p-1.5 shadow-xl shadow-rose-200/60"
          >
            <div className="w-full full-rounded bg-white flex flex-col items-center justify-center p-2 text-center h-full rounded-[22px]">
              <span className="text-4xl sm:text-5xl drop-shadow-sm">
                {attempts === 0 ? '👀🥂' : attempts < 3 ? '🤭🍕' : '😜🍽️'}
              </span>
              <span className="text-[10px] font-bold text-rose-600 mt-1 uppercase tracking-wider">
                {attempts > 0 ? `${attempts} ${attempts === 1 ? 'escape' : 'escapes'}` : 'Plan 100% chill'}
              </span>
            </div>
          </motion.div>

          {/* Floating badge */}
          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-2 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
        </div>

        {/* Contenedor específico de textos (título y subtítulo) - Zona de exclusión para el botón No */}
        <div id="proposal-header-texts" className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={getHeaderMessage(attempts, nickname, fullName)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3 text-balance leading-tight"
            >
              {getHeaderMessage(attempts, nickname, fullName)}
            </motion.h1>
          </AnimatePresence>

          <p className="text-sm text-gray-600 mt-2 max-w-xs font-medium">
            {attempts === 0
              ? 'La idea es pasarla bien, comer algo rico y charlar un rato ✨'
              : 'La perseverancia es una de mis virtudes, ¿se nota? 😌'}
          </p>
        </div>
      </motion.div>
    );
  }
);

ProposalHeader.displayName = 'ProposalHeader';

export default ProposalHeader;
