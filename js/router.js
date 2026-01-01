// js/router.js

import { initMobileMenu, initModalSystem } from './core/ui.js';
import { renderFeaturedProducts, initStorePage } from './components/productsRenderer.js';
import { initProductCards } from './components/productCard.js'; // ← Import clave para los modales
import { initPedidoPage } from './components/pedido.js';

// Caché de componentes HTML
const componentCache = new Map();

/**
 * Carga un componente HTML desde la carpeta /components/
 */
async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`⚠ Elemento con ID "${id}" no encontrado en el DOM`);
    return;
  }

  const cacheKey = file;

  if (componentCache.has(cacheKey)) {
    element.innerHTML = componentCache.get(cacheKey);
    dispatchComponentLoaded(id);
    return;
  }

  try {
    const response = await fetch(`components/${file}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    componentCache.set(cacheKey, html);
    element.innerHTML = html;
    dispatchComponentLoaded(id);
  } catch (error) {
    console.error(`❌ Error cargando componente "${file}":`, error);
    element.innerHTML = `
      <div class="text-center py-16 px-6">
        <p class="text-red-600 font-bold text-2xl mb-6">Error al cargar esta sección</p>
        <button onclick="location.reload()" 
                class="px-8 py-4 bg-pink-600 text-white rounded-2xl font-black hover:bg-pink-700 transition shadow-lg">
          Recargar página
        </button>
      </div>
    `;
  }
}

/**
 * Dispara evento cuando un componente se carga
 */
function dispatchComponentLoaded(id) {
  document.dispatchEvent(
    new CustomEvent('componentLoaded', {
      detail: { id, element: document.getElementById(id) }
    })
  );
}

/**
 * Inicializadores por componente
 */
const componentInitializers = {
  navbar: initMobileMenu,
  globalModal: initModalSystem,  // ← AÑADE ESTA LÍNEA
  hero: () => {}, // Estático
  destacados: () => {
    renderFeaturedProducts('featured-products');
    initProductCards(); // ← Clave para que los clics funcionen
  },
  sobrenosotros: () => {}, // Estático
  newsletter: () => {}, // Estático

  'store-container': () => initStorePage(), // Ya incluye initProductCards internamente

  pedido: () => initPedidoPage(),
 
};

/**
 * Carga inicial según la página
 */
document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname.toLowerCase();

  // Componentes comunes a TODAS las páginas
  await Promise.all([
    loadComponent('navbar', 'navbar.html'),
    loadComponent('footer', 'footer.html'),
    loadComponent('globalModal', 'global-modal.html'),
  ]);

  // Página de inicio
  if (path === '/' || path.endsWith('index.html') || path.includes('/maldita-dulzura/')) {
    await Promise.all([
      loadComponent('hero', 'hero.html'),
      loadComponent('destacados', 'destacados.html'),
      loadComponent('sobrenosotros', 'sobrenosotros.html'),
      loadComponent('newsletter', 'newsletter.html')
    ]);
  }

  // Página de tienda
  else if (path.endsWith('tienda.html')) {
    await loadComponent('store-container', 'store.html');
  }

  // Página de pedido
  else if (path.endsWith('pedido.html')) {
    await loadComponent('pedido', 'pedido.html');
  }

  // Puedes añadir más páginas aquí (contacto, etc.)
});

/**
 * Ejecuta el inicializador correspondiente al cargar un componente
 */
document.addEventListener('componentLoaded', (event) => {
  const { id } = event.detail;
  const initializer = componentInitializers[id];

  if (typeof initializer === 'function') {
    setTimeout(() => {
      try {
        initializer();
      } catch (err) {
        console.error(`Error al inicializar componente "${id}":`, err);
      }
    }, 0);
  }
});
