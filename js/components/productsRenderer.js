// js/components/productsRenderer.js

import { allProducts } from '../data/allProducts.js';
import { productCard, initProductCards } from './productCard.js';

/**
 * Renderiza una lista de productos en un contenedor dado
 * @param {string} containerId - ID del elemento contenedor (ej: "featured-products", "productsContainer")
 * @param {Array} products - Lista de productos a renderizar
 * @param {Function} [postRenderCallback] - Callback opcional después de renderizar (ej: actualizar contador)
 */
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
  initProductCards(); // Activa los modales en las nuevas cards

  if (postRenderCallback) postRenderCallback(products.length);
}

/**
 * Renderiza los productos destacados (best sellers o primeros 8)
 * @param {string} [containerId='featured-products'] - ID del contenedor
 */
export function renderFeaturedProducts(containerId = 'featured-products') {
  let featured = allProducts.filter(p => p.badges?.includes('BESTSELLER'));

  // Fallback: si no hay bestsellers, mostrar los primeros 8
  if (featured.length === 0) {
    featured = allProducts.slice(0, 8);
  }

  renderProducts(containerId, featured, (count) => {
    // Opcional: actualizar contador si existe
    const countEl = document.getElementById('featured-count');
    if (countEl) countEl.textContent = count;
  });
}

/**
 * Inicializa la página completa de tienda con filtros
 */
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

    // Actualizar botón activo
    filterButtons.forEach(b => b.classList.remove('active', 'bg-pink-600', 'text-white'));
    const activeBtn = document.querySelector(`[data-category="${activeCategory}"]`);
    if (activeBtn) activeBtn.classList.add('active', 'bg-pink-600', 'text-white');

    // Mostrar/ocultar botón limpiar
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', activeCategory === 'all');
    }

  renderProducts('productsContainer', filtered, (count) => {
  countEl.textContent = count;
  initProductCards();  // ← Añade esto para adjuntar eventos después de render
});
  }

  // Eventos de filtros
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // Botón limpiar filtros
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'all';
      applyFilters();
    });
  }

  // Render inicial
  applyFilters();
}
