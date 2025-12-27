import { allProducts } from '../data/allProducts.js';
import { productCard } from '../components/productCard.js';

export function initStorePage() {
    const container = document.getElementById('tiendaContainer');
    if (!container) return;

    container.innerHTML = allProducts.map(productCard).join('');
}
