// js/router.js

import { initMobileMenu, initModalSystem } from './core/ui.js';
import { renderFeaturedProducts, initStorePage } from './components/productsRenderer.js';
import { initPedidoPage } from './components/pedido.js';

// Caché de componentes HTML (usa Map para mejor rendimiento)
const componentCache = new Map();

/**
 * Carga un componente HTML desde la carpeta /components/
 * @param {string} id - ID del elemento contenedor en el DOM
 * @param {string} file - Nombre del archivo HTML (ej: "navbar.html")
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
    const response = await fetch(`components/${file}?v=${Date.now()}`); // Cache busting opcional

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
        <p class="text-gray-600 mb-8">Puede que haya un problema de conexión o el contenido no esté disponible.</p>
        <button 
          onclick="location.reload()" 
          class="px-8 py-4 bg-pink-600 text-white rounded-2xl font-black text-lg hover:bg-pink-700 transition transform hover:scale-105 shadow-lg"
        >
          Recargar página
        </button>
      </div>
    `;
  }
}

/**
 * Dispara evento personalizado cuando un componente termina de cargarse
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

 * Mapeo de inicializadores por ID de componente
 */
const componentInitializers = {
  navbar: () => initMobileMenu(),
  globalModal: () => initModalSystem(),

  // Secciones de productos destacados (home)
  hero: () => {}, // Hero es estático
destacados: () => {
  renderFeaturedProducts('featured-products');
  initProductCards();
},
'featured-products-container': () => {
  renderFeaturedProducts('featured-products-container');
  initProductCards();
},
  // Tienda completa
  'store-container': () => initStorePage(),

  // Newsletter (estático por ahora, no necesita JS)
  newsletter: () => {},

  // Sobre nosotros (si lo tienes)
  sobrenosotros: () => {},

  // Pedido - Aquí activamos la lógica completa del formulario
  pedido: () => initPedidoPage(),

  // Puedes añadir más aquí en el futuro
  // contacto: () => initContactoPage(),
};

/**
 * Inicialización principal al cargar la página
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Normalizar ruta para evitar problemas de mayúsculas/minúsculas
  const path = window.location.pathname.toLowerCase();

  // Componentes comunes a TODAS las páginas
  await Promise.all([
    loadComponent('navbar', 'navbar.html'),
    loadComponent('footer', 'footer.html'),
    loadComponent('globalModal', 'global-modal.html') // Asegúrate de que este archivo exista
  ]);

  // Carga condicional según la página
  if (path === '/' || path.endsWith('index.html') || path.includes('/maldita-dulzura/')) {
    // Página de inicio
    await Promise.all([
      loadComponent('hero', 'hero.html'),
      loadComponent('destacados', 'destacados.html'),
       loadComponent('personalizacion', 'personalizacion.html'),
      loadComponent('sobrenosotros', 'sobrenosotros.html'),
      loadComponent('newsletter', 'newsletter.html')
    ]);
  }

  else if (path.endsWith('tienda.html')) {
    // Página de tienda
    await Promise.all([
      loadComponent('featured-products-container', 'featured-products.html'),
      loadComponent('store-container', 'store.html')
    ]);
  }

  else if (path.endsWith('pedido.html')) {
    // Página de pedido
    await loadComponent('pedido', 'pedido.html');
  }

  else if (path.endsWith('contacto.html')) {
    // Página de contacto (si la tienes)
    // await loadComponent('contacto', 'contacto.html');
  }

  // Puedes añadir más rutas fácilmente aquí
});

/**
 * Escucha la carga de componentes y ejecuta su inicializador correspondiente
 */
document.addEventListener('componentLoaded', (event) => {
  const { id } = event.detail;

  const initializer = componentInitializers[id];

  if (typeof initializer === 'function') {
    // Usamos setTimeout para asegurar que el DOM esté completamente actualizado
    setTimeout(() => {
      try {
        initializer();
      } catch (err) {
        console.error(`Error al inicializar componente "${id}":`, err);
      }
    }, 0);
  }
});
