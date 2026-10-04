/**
 * Constantes y opciones para la selección gastronómica (FoodPickerStep)
 */

export interface FoodOption {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tag?: string;
}

export const FOOD_OPTIONS: readonly FoodOption[] = [
  { id: 'makis', name: 'Makis', emoji: '🍣', description: 'Acevichados & Nikkei top', tag: 'Favorito' },
  { id: 'elegante', name: 'Alta Cocina', emoji: '🏛️', description: 'Jardines, terraza & alta cocina', tag: 'Elegante' },
  { id: 'parrillas', name: 'Parrillas', emoji: '🥩', description: 'Cortes finos & buen vino', tag: 'Premium' },
  { id: 'marina', name: 'Comida Marina', emoji: '🐟', description: 'Ceviche & tiraditos top', tag: 'Gourmet' },
  { id: 'chifa', name: 'Chifa Fino', emoji: '🥢', description: 'Dim sum & chaufa especial', tag: 'Delicioso' },
  { id: 'pizza', name: 'Pizza Artesanal', emoji: '🍕', description: 'A la leña con vinito', tag: 'Clásico' },
  { id: 'burger', name: 'Hamburguesas Gourmet', emoji: '🍔', description: 'Con papitas trufadas', tag: 'Antojo' },
  { id: 'pollito', name: 'Pollo a la Brasa Top', emoji: '🍗', description: 'Crocante con sus cremitas', tag: 'Infaltable' },
  { id: 'brunch', name: 'Brunch Aesthetic', emoji: '🥞', description: 'Pancakes, café & mimosas', tag: 'Trendy' },
  { id: 'postre', name: 'Café & Postre', emoji: '🍨', description: 'Gelato o cafecito bonito', tag: 'Dulce' },
];

export const FOOD_EMOJIS_MAP: Record<string, string> = Object.fromEntries(
  FOOD_OPTIONS.map((f) => [f.name, f.emoji])
);

