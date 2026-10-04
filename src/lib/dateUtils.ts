/**
 * Utilities for dynamic date handling in Choice Plan App
 */

export interface QuickDateOption {
  id: string;
  dayName: string;
  dayNum: number;
  shortDate: string;
  fullDate: string;
  sub: string;
  emoji: string;
  isToday: boolean;
  isTomorrow: boolean;
}

const MONTHS_SHORT = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

const MONTHS_FULL = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

const DAY_NAMES = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
];

/**
 * Returns upcoming Friday, Saturday, and Sunday with real dates.
 * - From Monday to Friday: returns Friday, Saturday, Sunday of this week.
 * - If today is Saturday or Sunday: Friday has passed, returns next week's weekend.
 */
export function getUpcomingWeekendDays(baseDate: Date = new Date()): QuickDateOption[] {
  const currentDay = baseDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  
  // Days to upcoming Friday
  let daysToFriday = 5 - currentDay;
  if (daysToFriday < 0) {
    daysToFriday += 7;
  }

  const subLabels = ['Noche chill', 'Fin de semana', 'Tarde relax'];
  const emojis = ['✨', '🥂', '☕'];
  const dayLabels = ['Viernes', 'Sábado', 'Domingo'];

  return [0, 1, 2].map((offset) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + daysToFriday + offset);

    const dayName = dayLabels[offset];
    const dayNum = d.getDate();
    const monthShort = MONTHS_SHORT[d.getMonth()];
    const monthFull = MONTHS_FULL[d.getMonth()];

    // Check if today or tomorrow
    const isToday = d.toDateString() === baseDate.toDateString();
    const tom = new Date(baseDate);
    tom.setDate(baseDate.getDate() + 1);
    const isTomorrow = d.toDateString() === tom.toDateString();

    let sub = subLabels[offset];
    if (isToday) sub = '¡Hoy!';
    else if (isTomorrow) sub = 'Mañana';

    return {
      id: dayName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      dayName,
      dayNum,
      shortDate: `${dayNum} ${monthShort}`,
      fullDate: `${dayName} ${dayNum} de ${monthFull}`,
      sub,
      emoji: emojis[offset],
      isToday,
      isTomorrow,
    };
  });
}

/**
 * Formats a 'YYYY-MM-DD' HTML date input string to human-readable Spanish
 * e.g., '2026-10-15' -> 'Jueves 15 de octubre'
 */
export function formatReadableDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (!isNaN(date.getTime())) {
      const dayName = DAY_NAMES[date.getDay()];
      const monthFull = MONTHS_FULL[date.getMonth()];
      return `${dayName} ${date.getDate()} de ${monthFull}`;
    }
  }
  return dateStr;
}

/**
 * Returns current date in 'YYYY-MM-DD' for date input min attribute
 */
export function getTodayISODate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
