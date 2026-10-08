'use client';

import React from 'react';
import BackgroundDecorations from './proposal/BackgroundDecorations';
import ProposalHeader from './proposal/ProposalHeader';
import YesButton from './proposal/YesButton';
import AttemptsCounter from './proposal/AttemptsCounter';
import StaticNoButton from './proposal/StaticNoButton';
import PoofEffect from './proposal/PoofEffect';
import EscapingNoButton from './proposal/EscapingNoButton';
import ProposalFooter from './proposal/ProposalFooter';
import { useButtonEvasion } from '@/hooks/useButtonEvasion';

interface ProposalStepProps {
  sessionId: string;
  nickname?: string;
  fullName?: string;
  onAccepted: (attempts: number) => void;
}

export default function ProposalStep({ sessionId, nickname, fullName, onAccepted }: ProposalStepProps) {
  const {
    attempts,
    noPosition,
    poof,
    setPoof,
    noButtonText,
    noButtonRef,
    yesButtonRef,
    headerRef,
    actionContainerRef,
    footerRef,
    triggerEvade,
  } = useButtonEvasion(sessionId);

  const handleYesClick = async () => {
    try {
      fetch('/api/choice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, choice: 'yes', name: fullName || nickname }),
      }).catch(() => {});
    } finally {
      onAccepted(attempts);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] flex flex-col justify-between items-center px-4 py-6 overflow-hidden select-none touch-none">
      {/* Elementos decorativos flotantes de fondo */}
      <BackgroundDecorations />

      {/* Encabezado con badge, avatar reactivo y título dinámico */}
      <ProposalHeader ref={headerRef} attempts={attempts} nickname={nickname} fullName={fullName} />

      {/* Contenedor central de botones de acción */}
      <div
        ref={actionContainerRef}
        className="w-full max-w-sm flex flex-col items-center justify-center gap-4 my-auto z-30 px-2"
      >
        {/* Botón SÍ con crecimiento progresivo */}
        <YesButton
          ref={yesButtonRef}
          attempts={attempts}
          onClick={handleYesClick}
        />

        {/* Contador de intentos de decir que no */}
        <AttemptsCounter attempts={attempts} />

        {/* Botón NO inicial en el flujo normal */}
        {!noPosition.isEvading && (
          <StaticNoButton
            ref={noButtonRef}
            text={noButtonText}
            onEvade={triggerEvade}
          />
        )}
      </div>

      {/* 💨 Nube de humo cuando el botón se teletransporta */}
      <PoofEffect poof={poof} onAnimationComplete={() => setPoof(null)} />

      {/* ⚡ Botón NO evasivo con aura */}
      {noPosition.isEvading && (
        <EscapingNoButton
          ref={noButtonRef}
          position={noPosition}
          attempts={attempts}
          text={noButtonText}
          onEvade={triggerEvade}
        />
      )}

      {/* Pie de página sutil */}
      <ProposalFooter ref={footerRef} />
    </div>
  );
}
