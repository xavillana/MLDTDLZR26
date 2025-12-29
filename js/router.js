// js/router.js

import { initMobileMenu, initModalSystem } from './core/ui.js';
import { renderFeaturedProducts } from './components/featuredProducts.js';
import { initStorePage } from './components/tienda.js';
import { initProductCards } from './components/productCard.js'; // Nueva inicialización de cards

// Caché de componentes HTML para evitar múltiples fetches
const componentCache = new Map();

/**
 * Carga un componente HTML desde /components/ y lo inserta en el elemento con el ID dado
 * @param {string} id - ID del elemento contenedor en el DOM
 * @param {string} file - Ruta relativa del archivo HTML (ej: "navbar.html")
 */
async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`⚠ Elemento con ID "${id}" no encontrado en el DOM`);
    return;
  }

  const cacheKey = file;

  // Si ya está en caché, usar directamente
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
      <div class="text-center py-12">
        <p class="text-red-600 font-bold text-xl mb-4">Error al cargar esta sección</p>
        <button 
          onclick="location.reload()" 
          class="px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition"
        >
          Recargar página
        </button>
      </div>
    `;
  }
}

/**
 * Dispara un evento personalizado cuando un componente se ha cargado
 * @param {string} id
 */
function dispatchComponentLoaded(id) {
  document.dispatchEvent(
    new CustomEvent('componentLoaded', {
      detail: { id, element: document.getElementById(id) }
    })
  );
}

/**
 * Mapeo de componentes que requieren inicialización específica después de cargarse
 */
const componentInitializers = {
  navbar: () => initMobileMenu(),
  globalModal: () => initModalSystem(),
  'featured-products': () => renderFeaturedProducts(),
  'featured-products-container': () => {
    renderFeaturedProducts();
    initProductCards(); // Importante: activar clics en cards
  },
  'store-container': () => {
    initStorePage();
    initProductCards(); // Activar modales en la tienda
  },
  destacados: () => {
    renderFeaturedProducts();
    initProductCards();
  },
  pedido: () => {
    // Aquí podrías inicializar lógica específica de pedido.html si la tuvieras
  }
};

/**
 * Inicialización principal al cargar la página
 */
document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname.toLowerCase(); // Normalizamos a minúsculas

  // Componentes comunes a todas las páginas
  await Promise.all([
    loadComponent('navbar', 'navbar.html'),
    loadComponent('footer', 'footer.html'),
    loadComponent('globalModal', 'global-modal.html') // Asegúrate de que exista o crea uno vacío
  ]);

  // Carga condicional según la página actual
  if (path === '/' || path.endsWith('/index.html') || path.endsWith('/maldita-dulzura/')) {
    // Página de inicio
    await Promise.all([
      loadComponent('hero', 'hero.html'),
      loadComponent('destacados', 'destacados.html'),
      loadComponent('newsletter', 'newsletter.html')
    ]);
  }

  else if (path.endsWith('/tienda.html')) {
    // Página de tienda
    await Promise.all([
      loadComponent('featured-products-container', 'featured-products.html'),
      loadComponent('store-container', 'store.html')
    ]);
  }

  else if (path.endsWith('/pedido.html')) {
    // Página de pedido
    await loadComponent('pedido', 'pedido.html');
  }

  // Puedes añadir más páginas aquí fácilmente:
  // else if (path.endsWith('/contacto.html')) { ... }
});

/**
 * Escucha cuando un componente se carga y ejecuta su inicializador si existe
 */
document.addEventListener('componentLoaded', (event) => {
  const { id } = event.detail;

  if (typeof componentInitializers[id] === 'function') {
    // Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      try {
        componentInitializers[id]();
      } catch (err) {
        console.error(`Error inicializando componente "${id}":`, err);
      }
    }, 0);
  }
});
