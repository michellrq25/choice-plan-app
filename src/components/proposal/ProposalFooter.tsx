'use client';

import React, { forwardRef } from 'react';

const ProposalFooter = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="w-full text-center pb-2 z-20 pointer-events-none">
      <p className="text-[11px] text-gray-400 font-medium">
        Plan relajado • Full diversión • Buena comida ✨
      </p>
    </div>
  );
});

ProposalFooter.displayName = 'ProposalFooter';

export default ProposalFooter;
