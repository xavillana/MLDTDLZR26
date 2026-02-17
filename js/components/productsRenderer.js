// js/components/productsRenderer.js

import { allProducts } from '../data/allProducts.js';
import { productCard, initProductCards } from './productCard.js';

function renderProducts(containerId, products, postRenderCallback) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`⚠ Contenedor "${containerId}" no encontrado`);
    return;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <p class="text-2xl text-gray-600 mb-4">😔 No hay productos en esta categoría</p>
        <p class="text-gray-500">Prueba con otro filtro o vuelve más tarde.</p>
      </div>
    `;
    if (postRenderCallback) postRenderCallback(0);
    return;
  }

  container.innerHTML = products.map(productCard).join('');
  initProductCards();

  if (postRenderCallback) postRenderCallback(products.length);
}

export function renderFeaturedProducts(containerId = 'featured-products-container') {
  let featured = allProducts.filter(p => p.badges?.includes('BESTSELLER'));

  if (featured.length === 0) {
    featured = allProducts.slice(0, 8);
  }

  renderProducts(containerId, featured);
}

export function initStorePage() {
  const container = document.getElementById('productsContainer');
  const countEl = document.getElementById('count');
  const clearBtn = document.getElementById('clearFilters');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!container || !countEl) {
    console.warn('⚠ Elementos de tienda no encontrados');
    return;
  }

  let activeCategory = 'all';

  function applyFilters() {
    let filtered = allProducts;

    if (activeCategory !== 'all') {
      filtered = allProducts.filter(p => p.category === activeCategory);
    }

    renderProducts('productsContainer', filtered, (count) => {
      countEl.textContent = count;
    });

    filterButtons.forEach(b => b.classList.remove('active', 'bg-pink-600', 'text-white'));
    const activeBtn = document.querySelector(`[data-category="${activeCategory}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active', 'bg-pink-600', 'text-white');
    }

    if (clearBtn) {
      clearBtn.classList.toggle('hidden', activeCategory === 'all');
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'all';
      applyFilters();
    });
  }

  applyFilters();
}
