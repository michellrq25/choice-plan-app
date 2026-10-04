'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

interface AttemptsCounterProps {
  attempts: number;
}

export default function AttemptsCounter({ attempts }: AttemptsCounterProps) {
  if (attempts <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-100/90 px-3 py-1 rounded-full border border-rose-200"
    >
      <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
      <span>
        Intentos de decir que no: <b>{attempts}</b> 😜
      </span>
    </motion.div>
  );
}
