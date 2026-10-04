/**
 * Constantes y funciones de utilidad de texto para el paso de propuesta (ProposalStep)
 */

export const ESCAPE_TAUNTS: readonly string[] = [
  '¡Ups! 💨',
  '¡Muy lento! ⚡',
  '¡Casi! 😜',
  '¡Por aquí! 🏃‍♂️',
  '¿Tan rápido te rindes? 😏',
  '¡Ese dedo no colabora! ☝️😂',
  '¡El botón tiene vida propia! 🏃',
  '¡Acepta y te ahorro la fatiga! 😌',
  '¡Misión imposible! 🚀'
];

export const NO_BUTTON_TEXTS: readonly string[] = [
  'No, gracias 😅',
  'Paso esta vez 🙈',
  'Ni hablar 🏃‍♂️',
  'Paso, tengo sueño 😴',
  'Mmm tal vez no 🙈',
  'A la próxima 🤷‍♂️',
  '¿Y si no quiero? 🤭',
  'No me convences 😜',
  'Toy chiquita 🥺',
  'Pregúntale a mi Draco 🐶'
];

export const INITIAL_NO_TEXT: string = NO_BUTTON_TEXTS[0]; // 'No, gracias 😅'

/**
 * Algoritmo Fisher-Yates para barajar arreglos de forma inmutable
 */
export const shuffleArray = <T,>(array: readonly T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Retorna el taunt correspondiente al conteo de intentos de escape
 */
export const getEscapeTaunt = (count: number): string => {
  const index = Math.min(count - 1, ESCAPE_TAUNTS.length - 1);
  return ESCAPE_TAUNTS[Math.max(0, index)];
};

export const getHeaderMessage = (
  attempts: number,
  nickname?: string,
  fullName?: string
): string => {
  const nick = nickname?.trim() || 'Ale';
  const full = fullName?.trim() || 'Alessandra';

  if (attempts === 0) return `${nick}, este fin de semana podría ser divertido, ¿vamos? ✨`;
  if (attempts === 1) return `¿Segura, ${nick}? Prometo risas y cero incomodidades 🤭`;
  if (attempts === 2) return 'Ese botón rojo está fallando, prueba el verde 💚';
  if (attempts === 3) return `Ya pensé varias opciones deliciosas para nosotros, ${nick} 😅`;
  if (attempts === 4) return `${full}, ¿sigues intentando darle al No? Qué difícil te haces 😂`;
  if (attempts === 5) return 'Ya gastaste más energía en decir que no que en salir 😂';
  if (attempts === 6) return `No funciona, mejor acepta la invitación, ${nick} 🤭`;
  return `El destino quiere que digas que sí, ${nick} ✨`;
};
