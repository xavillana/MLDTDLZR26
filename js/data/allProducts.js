// data/allProducts.js
import { cupcakes } from './cupcakes.js';
import { tartas } from './tartas.js';
import { cheesecakes } from './cheesecakes.js';

// Normalizador PRO
function normalize(list, category) {
  return list.map(p => ({
    ...p,
    category,
    formats: Array.isArray(p.formats) ? p.formats : p.formats?.split(',').map(f => f.trim()) || [],
    ingredients: Array.isArray(p.ingredients) ? p.ingredients : p.ingredients?.split(',').map(i => i.trim()) || [],
    badges: p.badges || [],
    featured: p.badges?.includes("BESTSELLER") || false,
    hidden: p.hidden || false,
  }));
}

export const allProducts = [
  ...normalize(cupcakes, "cupcakes"),
  ...normalize(tartas, "tartas"),
  ...normalize(cheesecakes, "cheesecakes"),
];
