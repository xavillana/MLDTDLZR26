// js/router.js

import { initMobileMenu, initModalSystem } from './core/ui.js';
import { renderFeaturedProducts, initStorePage } from './components/productsRenderer.js';
import { initPedidoPage } from './components/pedido.js';

const componentCache = new Map();

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`⚠ Elemento con ID "${id}" no encontrado`);
    return;
  }

  const cacheKey = file;

  if (componentCache.has(cacheKey)) {
    element.innerHTML = componentCache.get(cacheKey);
    dispatchComponentLoaded(id);
    return;
  }

  try {
    const response = await fetch(`components/${file}?v=${Date.now()}`); // cache busting opcional

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    componentCache.set(cacheKey, html);
    element.innerHTML = html;
    dispatchComponentLoaded(id);
  } catch (error) {
    console.error(`❌ Error cargando "${file}":`, error);
    element.innerHTML = `
      <div class="text-center py-20 px-8">
        <p class="text-2xl font-bold text-red-600 mb-6">No se pudo cargar esta sección</p>
        <p class="text-gray-600 mb-8">Por favor, recarga la página o inténtalo más tarde.</p>
        <button onclick="location.reload()" 
                class="px-8 py-4 bg-pink-600 text-white rounded-2xl font-black hover:bg-pink-700 transition">
          Recargar página
        </button>
      </div>
    `;
  }
}

function dispatchComponentLoaded(id) {
  document.dispatchEvent(new CustomEvent('componentLoaded', { detail: { id } }));
}

const componentInitializers = {
  navbar: initMobileMenu,
  globalModal: initModalSystem,
  destacados: () => renderFeaturedProducts('featured-products-container'),
  'store-container': initStorePage,
  pedido: initPedidoPage,
};

document.addEventListener('componentLoaded', (event) => {
  const { id } = event.detail;
  const initializer = componentInitializers[id];
  if (typeof initializer === 'function') {
    setTimeout(initializer, 0);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  // Load critical components first, sequentially
  await loadComponent('globalModal', 'globalModal.html'); // ← First!
  await loadComponent('navbar', 'navbar.html');
  await loadComponent('footer', 'footer.html');

  // Then page-specific
  const path = window.location.pathname.toLowerCase();
  // ... rest

  if (path === '/' || path.endsWith('index.html') || path.includes('/maldita-dulzura/')) {
    await Promise.all([
      loadComponent('hero', 'hero.html'),
      loadComponent('destacados', 'destacados.html'),
      loadComponent('personalizacion', 'personalizacion.html'),
      loadComponent('sobrenosotros', 'sobrenosotros.html'),
      loadComponent('newsletter', 'newsletter.html'),
    ]);
  } else if (path.endsWith('tienda.html')) {
    await loadComponent('store-container', 'store.html');
  } else if (path.endsWith('pedido.html')) {
    await loadComponent('pedido', 'pedido.html');
  }
});

// Force init modal hidden after everything
setTimeout(() => {
  document.getElementById('globalModal')?.classList.add('hidden');
}, 1000);
