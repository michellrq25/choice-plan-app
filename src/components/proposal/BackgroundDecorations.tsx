'use client';

import React from 'react';

export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-6 text-amber-300/40 text-4xl animate-bounce">✨</div>
      <div className="absolute top-1/4 right-8 text-rose-300/30 text-5xl animate-pulse">🥂</div>
      <div className="absolute bottom-20 left-10 text-orange-400/30 text-3xl">🍕</div>
      <div className="absolute bottom-1/3 right-6 text-pink-300/30 text-4xl animate-bounce">☕</div>
    </div>
  );
}
