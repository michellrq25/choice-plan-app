/**
 * Constantes y opciones para la selección de fecha, hora y lugar de encuentro (DateTimePickerStep)
 */

export interface QuickTimeOption {
  id: string;
  label: string;
  desc: string;
}

export const QUICK_TIMES: readonly QuickTimeOption[] = [
  { id: '13:30', label: '1:30 PM', desc: 'Almuerzo 🍽️' },
  { id: '16:00', label: '4:00 PM', desc: 'Café & dulce 🍨' },
  { id: '19:30', label: '7:30 PM', desc: 'Cena temp. 🍝' },
  { id: '20:30', label: '8:30 PM', desc: 'Cena & drinks 🍣' },
  { id: '21:00', label: '9:00 PM', desc: 'Plan noche ✨' },
];

export const DEFAULT_TIME = '8:30 PM';
export const DEFAULT_PICKUP_LOCATION = 'Paso por tu casa';
