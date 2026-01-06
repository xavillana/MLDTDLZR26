// js/data/allProducts.js

import { cupcakes } from './cupcakes.js';
import { tartas } from './tartas.js';
import { cheesecakes } from './cheesecakes.js';

function normalize(list, category) {
  return list.map(product => ({
    ...product,
    category,
    formats: Array.isArray(product.formats) ? product.formats : [product.formats || 'Tarta'],
    ingredients: Array.isArray(product.ingredients) ? product.ingredients : product.ingredients.split(',').map(i => i.trim()),
    badges: product.badges || [],
    featured: (product.badges || []).includes('BESTSELLER'),
    hidden: product.hidden || false,
  }));
}

export const allProducts = [
  ...normalize(cupcakes, 'cupcakes'),
  ...normalize(tartas, 'tartas'),
  ...normalize(cheesecakes, 'cheesecakes'),
];
