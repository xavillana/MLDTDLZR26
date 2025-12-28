// components/destacados.js
import { allProducts } from '../data/allProducts.js';
import { productCard } from './productCard.js';

export function loadDestacados() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  const destacados = allProducts.filter(p => p.featured);

  container.innerHTML = destacados.map(productCard).join('');
}
