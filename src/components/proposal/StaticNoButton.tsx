'use client';

import React, { forwardRef } from 'react';
import { Smile } from 'lucide-react';

interface StaticNoButtonProps {
  text: string;
  onEvade: (e: React.SyntheticEvent | Event) => void;
}

const StaticNoButton = forwardRef<HTMLButtonElement, StaticNoButtonProps>(
  ({ text, onEvade }, ref) => {
    return (
      <button
        ref={ref}
        onTouchStart={onEvade}
        onPointerDown={onEvade}
        onMouseEnter={onEvade}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="w-full max-w-[280px] sm:max-w-[310px] py-3.5 px-6 rounded-2xl bg-white/90 text-gray-700 font-semibold text-base shadow-md border border-rose-200 flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors"
      >
        <Smile className="w-5 h-5 text-gray-400" />
        <span>{text}</span>
      </button>
    );
  }
);

StaticNoButton.displayName = 'StaticNoButton';

export default StaticNoButton;
