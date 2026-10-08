export interface StreakTier {
  min: number;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
  vx: number;
  vy: number;
}

export interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const STREAK_TITLES: StreakTier[] = [
  {
    min: 0,
    title: '¡Toca abajo para celebrar el plan!',
    subtitle: 'Toca repetidamente para desatar confeti infinito ✨',
    icon: '🚀',
  },
  {
    min: 1,
    title: '¡Eso! ¡Sigue tocando!',
    subtitle: '¡No te detengas, sube el combo! 🔥',
    icon: '🎉',
  },
  {
    min: 5,
    title: '¡Racha en llamas!',
    subtitle: '¡Ese dedo tiene flow legendario! ⚡',
    icon: '🔥',
  },
  {
    min: 10,
    title: '¡Combo Épico Activado!',
    subtitle: '¡La fiesta ya empezó oficialmente! 💥',
    icon: '⚡',
  },
  {
    min: 15,
    title: '¡Nivel Dios Desbloqueado!',
    subtitle: '¡Planazo del año 100% garantizado! 👑',
    icon: '👑',
  },
  {
    min: 25,
    title: '¡MODO HYPE INFINITO!',
    subtitle: '¡Rompiendo récords de emoción! 🚀✨',
    icon: '🌟',
  },
];

export const CELEBRATION_PARTICLE_ICONS = [
  '✨',
  '🎉',
  '🔥',
  '⚡',
  '🚀',
  '⭐',
  '🍕',
  '🥂',
  '💫',
];

export const AMBIENT_SPARKLES = [
  { icon: '✨', left: '10%', delay: 0, duration: 8 },
  { icon: '⭐', left: '88%', delay: 1.5, duration: 7 },
  { icon: '🌟', left: '20%', delay: 3, duration: 9 },
  { icon: '🎉', left: '80%', delay: 2, duration: 8.5 },
  { icon: '💫', left: '50%', delay: 4, duration: 7.5 },
];

export const CONFETTI_COLORS = [
  '#f43f5e',
  '#ec4899',
  '#f59e0b',
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#fbbf24',
];
