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
}

export function useButtonEvasion(sessionId: string) {
  const [attempts, setAttempts] = useState<number>(0);
  const [noPosition, setNoPosition] = useState<NoPositionState>({
    x: 0,
    y: 0,
    isEvading: false,
  });
  const [poof, setPoof] = useState<{ x: number; y: number; id: number } | null>(null);
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

  // Bloqueo de scroll en móvil mientras este paso esté activo
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
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

    // Micro-vibración háptica al escapar (exclusiva para toques en dispositivos móviles)
    const eventType = (e as unknown as { type?: string })?.type;
    const pointerType = (e as unknown as { pointerType?: string })?.pointerType;
    const isTouch =
      eventType === 'touchstart' ||
      eventType === 'touchend' ||
      pointerType === 'touch';

    const hasActivation =
      typeof navigator !== 'undefined' &&
      (!('userActivation' in navigator) || (navigator as unknown as { userActivation?: { hasBeenActive?: boolean } }).userActivation?.hasBeenActive);

    if (isTouch && hasActivation && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate([20, 35, 20]);
      } catch {
        // Silenciar de forma segura cualquier restricción de política del navegador
      }
    }

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

    // 4. Zonas basadas en la posición real de los componentes
    const safeM = 14;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const estimatedBtnW = Math.max(btnWidth, 180);
    const minX = safeM;
    const maxX = Math.max(minX, viewportW - estimatedBtnW - safeM);
    const minY = 24;
    const maxY = Math.max(minY, viewportH - btnHeight - safeM);

    // Leer la posición real de los elementos a evitar
    const yesRect = yesButtonRef.current?.getBoundingClientRect();
    const textEl = typeof document !== 'undefined' ? document.getElementById('proposal-header-texts') : null;
    const textRect = textEl?.getBoundingClientRect();

    // Límites verticales de referencia
    const yesTop = yesRect ? yesRect.top : viewportH * 0.45;
    const yesBottom = yesRect ? yesRect.bottom : viewportH * 0.55;
    const belowAvailable = maxY - (yesBottom + 10);

    // Obstáculo: NUNCA superponer el área de los textos del encabezado ni el botón SÍ
    const checkCollision = (cx: number, cy: number) => {
      const bLeft = cx - 8;
      const bRight = cx + estimatedBtnW + 8;
      const bTop = cy - 8;
      const bBottom = cy + btnHeight + 8;

      // 1. Verificación estricta: NO tapar los textos del título/subtítulo
      if (textRect) {
        const collidesWithText =
          bLeft < textRect.right + 10 &&
          bRight > textRect.left - 10 &&
          bTop < textRect.bottom + 12 &&
          bBottom > textRect.top - 12;

        if (collidesWithText) return true;
      }

      // 2. No tapar el botón SÍ
      if (yesRect) {
        const collidesWithYes =
          bLeft < yesRect.right + 8 &&
          bRight > yesRect.left - 8 &&
          bTop < yesRect.bottom + 10 &&
          bBottom > yesRect.top - 14;

        if (collidesWithYes) return true;
      }

      return false;
    };

    // Construir zonas libres válidas
    type Zone = { minX: number; maxX: number; minY: number; maxY: number };
    const zones: Zone[] = [];

    // Zona A: Arriba del texto (si hay espacio suficiente sobre el título/avatar)
    if (textRect && textRect.top - minY > btnHeight + 25) {
      zones.push({
        minX,
        maxX,
        minY,
        maxY: textRect.top - btnHeight - 20,
      });
    }

    // Zona B: Entre los textos y el botón SÍ (si hay espacio suficiente)
    if (textRect && yesTop - textRect.bottom > btnHeight + 25) {
      zones.push({
        minX,
        maxX,
        minY: textRect.bottom + 15,
        maxY: yesTop - btnHeight - 15,
      });
    }

    // Zona C: Debajo del botón SÍ (área inferior de la pantalla hacia el footer)
    if (belowAvailable > 20) {
      zones.push({
        minX,
        maxX,
        minY: yesBottom + 12,
        maxY,
      });
    }

    // Zonas laterales D y E: si la pantalla es ancha (por ejemplo en PC, tablet o landscape)
    const centerLeft = Math.min(textRect ? textRect.left : viewportW, yesRect ? yesRect.left : viewportW);
    const centerRight = Math.max(textRect ? textRect.right : 0, yesRect ? yesRect.right : 0);

    if (centerLeft - minX > estimatedBtnW + 20) {
      zones.push({
        minX,
        maxX: centerLeft - estimatedBtnW - 12,
        minY,
        maxY,
      });
    }

    if (maxX - centerRight > 20) {
      zones.push({
        minX: centerRight + 12,
        maxX,
        minY,
        maxY,
      });
    }

    // Fallback de seguridad si ninguna zona calculada tuviese espacio
    if (zones.length === 0) {
      zones.push({ minX, maxX, minY: Math.max(minY, yesBottom + 10), maxY });
    }

    // Barajar zonas para distribución variada y dinámica
    const shuffled = [...zones].sort(() => Math.random() - 0.5);

    let bestX = minX;
    let bestY = maxY;
    let found = false;

    for (const zone of shuffled) {
      for (let i = 0; i < 25; i++) {
        const cx = zone.minX + Math.random() * Math.max(0, zone.maxX - zone.minX);
        const cy = zone.minY + Math.random() * Math.max(0, zone.maxY - zone.minY);
        if (!checkCollision(cx, cy)) {
          bestX = cx;
          bestY = cy;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    // Si por alguna razón aleatoria falló, ubicarlo abajo con seguridad
    if (!found) {
      bestX = minX + Math.random() * Math.max(0, maxX - minX);
      bestY = Math.min(maxY, yesBottom + 18);
    }

    setNoPosition({
      x: Math.round(bestX),
      y: Math.round(bestY),
      isEvading: true,
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
    noButtonText,
    noButtonRef,
    yesButtonRef,
    headerRef,
    actionContainerRef,
    footerRef,
    triggerEvade,
  };
}
