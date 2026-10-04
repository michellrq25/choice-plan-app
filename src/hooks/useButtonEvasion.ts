'use client';

import { useState, useRef, useEffect } from 'react';
import {
  NO_BUTTON_TEXTS,
  INITIAL_NO_TEXT,
  shuffleArray,
} from '@/constants/proposal';

export interface NoPositionState {
  x: number;
  y: number;
  isEvading: boolean;
  tauntAlign: 'left' | 'center' | 'right';
  tauntVAlign: 'top' | 'bottom';
}

export function useButtonEvasion(sessionId: string) {
  const [attempts, setAttempts] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<NoPositionState>({
    x: 0,
    y: 0,
    isEvading: false,
    tauntAlign: 'center',
    tauntVAlign: 'top',
  });
  const [poof, setPoof] = useState<{ x: number; y: number; id: number } | null>(null);
  const [showBubble, setShowBubble] = useState<boolean>(false);
  const [noButtonText, setNoButtonText] = useState<string>(INITIAL_NO_TEXT);

  // Bolsa de barajado aleatorio (Shuffle Bag)
  const textPoolRef = useRef<string[]>(
    shuffleArray(NO_BUTTON_TEXTS.filter((t) => t !== INITIAL_NO_TEXT))
  );
  const lastTextRef = useRef<string>(INITIAL_NO_TEXT);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const actionContainerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isEvadingCooldown = useRef<boolean>(false);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Bloqueo de scroll en móvil mientras este paso esté activo
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  // Manejador de evasión táctil y de puntero
  const triggerEvade = (e: React.SyntheticEvent | Event) => {
    // 1. Cancelar de inmediato el gesto de clic/tap nativo
    if (e && 'cancelable' in e && e.cancelable) {
      e.preventDefault();
    }
    if (e && 'stopPropagation' in e) {
      e.stopPropagation();
    }

    // 2. Bloqueo atómico para garantizar exactamente una ejecución por toque
    if (isEvadingCooldown.current) {
      return;
    }
    isEvadingCooldown.current = true;
    setTimeout(() => {
      isEvadingCooldown.current = false;
    }, 450);

    // 3. Capturar coordenadas del botón para el efecto de humo
    const btn = noButtonRef.current;
    const btnRect = btn?.getBoundingClientRect();
    const btnWidth = btnRect?.width || 130;
    const btnHeight = btnRect?.height || 50;

    const centerX = btnRect ? btnRect.left + btnWidth / 2 : window.innerWidth / 2;
    const centerY = btnRect ? btnRect.top + btnHeight / 2 : window.innerHeight / 2;

    setPoof({
      x: Math.round(centerX),
      y: Math.round(centerY),
      id: Date.now(),
    });

    // Bocadillo cómico activo durante 2 segundos
    setShowBubble(true);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 1500);

    // 4. Zonas basadas en la posición real de los componentes
    const safeM = 14;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const estimatedBtnW = Math.max(btnWidth, 180);
    const minX = safeM;
    const maxX = Math.max(minX, viewportW - estimatedBtnW - safeM);
    const minY = 24;
    const maxY = Math.max(minY, viewportH - btnHeight - safeM);

    // Leer la posición real del botón SÍ
    const yesRect = yesButtonRef.current?.getBoundingClientRect();

    // Límites verticales
    const yesTop = yesRect ? yesRect.top : viewportH * 0.45;
    const yesBottom = yesRect ? yesRect.bottom : viewportH * 0.55;

    // Espacios disponibles arriba y abajo del botón SÍ
    const aboveAvailable = yesTop - minY - btnHeight - 15;
    const belowAvailable = maxY - (yesBottom + 10);

    // Obstáculo: solo el botón SÍ para dejar libre toda el área de arriba y abajo
    const checkCollision = (cx: number, cy: number) => {
      if (!yesRect) return false;
      const b = { left: cx, right: cx + estimatedBtnW, top: cy - 10, bottom: cy + btnHeight + 10 };

      return (
        b.left < yesRect.right + 8 &&
        b.right > yesRect.left - 8 &&
        b.top < yesRect.bottom + 10 &&
        b.bottom > yesRect.top - 15
      );
    };

    // Construir zonas libres: ARRIBA y ABAJO del botón verde
    type Zone = { minX: number; maxX: number; minY: number; maxY: number };
    const zones: Zone[] = [];

    if (aboveAvailable > 20) {
      zones.push({ minX, maxX, minY, maxY: yesTop - btnHeight - 15 });
    }
    if (belowAvailable > 20) {
      zones.push({ minX, maxX, minY: yesBottom + 10, maxY });
    }

    if (zones.length === 0) {
      zones.push({ minX, maxX, minY, maxY });
    }

    // Barajar para que arriba y abajo tengan igual probabilidad
    const shuffled = [...zones].sort(() => Math.random() - 0.5);

    let bestX = minX;
    let bestY = maxY;
    let found = false;

    for (const zone of shuffled) {
      for (let i = 0; i < 20; i++) {
        const cx = zone.minX + Math.random() * (zone.maxX - zone.minX);
        const cy = zone.minY + Math.random() * (zone.maxY - zone.minY);
        if (!checkCollision(cx, cy)) {
          bestX = cx;
          bestY = cy;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      bestX = minX + Math.random() * (maxX - minX);
      bestY = maxY;
    }

    // Alineación horizontal adaptativa: si está a la derecha, el taunt aparece a la izquierda
    const isNearRight = bestX > (viewportW - estimatedBtnW - 60) || bestX > viewportW * 0.46;
    const isNearLeft = bestX < safeM + 50 || bestX < viewportW * 0.2;
    const tauntAlign: 'left' | 'center' | 'right' = isNearRight ? 'left' : isNearLeft ? 'right' : 'center';

    // Alineación vertical adaptativa: si está muy arriba, el taunt aparece abajo
    const tauntVAlign: 'top' | 'bottom' = bestY < 75 ? 'bottom' : 'top';

    setNoPosition({
      x: Math.round(bestX),
      y: Math.round(bestY),
      isEvading: true,
      tauntAlign,
      tauntVAlign,
    });

    // Ciclar frases aleatorias asegurando que se usen TODAS antes de repetir (Shuffle Bag)
    if (textPoolRef.current.length === 0) {
      let newPool = shuffleArray(NO_BUTTON_TEXTS);
      if (newPool[0] === lastTextRef.current && newPool.length > 1) {
        const swapIdx = Math.floor(Math.random() * (newPool.length - 1)) + 1;
        [newPool[0], newPool[swapIdx]] = [newPool[swapIdx], newPool[0]];
      }
      textPoolRef.current = newPool;
    }

    let nextText = textPoolRef.current.shift()!;
    if (nextText === lastTextRef.current && textPoolRef.current.length > 0) {
      textPoolRef.current.push(nextText);
      nextText = textPoolRef.current.shift()!;
    }

    lastTextRef.current = nextText;
    setNoButtonText(nextText);

    // Conteo de intentos
    setAttempts((prev) => prev + 1);

    // Registro en el servidor
    fetch('/api/choice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, choice: 'attempt-no' }),
    }).catch((err) => {
      console.error('Failed to record attempt:', err);
    });
  };

  return {
    attempts,
    noPosition,
    poof,
    setPoof,
    showBubble,
    noButtonText,
    noButtonRef,
    yesButtonRef,
    headerRef,
    actionContainerRef,
    footerRef,
    triggerEvade,
  };
}
