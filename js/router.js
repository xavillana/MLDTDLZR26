// js/router.js
// Sistema de carga dinámica de componentes + inicialización por página

import { initMobileMenu, initModalSystem } from './core/ui.js';
import { renderFeaturedProducts, initStorePage } from './components/productsRenderer.js';
import './components/newsletter.js';
import { initPedidoWizard } from './components/pedidoManager.js';  // ← solo este, ya no duplicamos

const componentCache = new Map();

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`⚠ Elemento con ID "${id}" no encontrado`);
    return false;
  }

  const cacheKey = file;

  if (componentCache.has(cacheKey)) {
    element.innerHTML = componentCache.get(cacheKey);
    dispatchComponentLoaded(id);
    return true;
  }

  try {
    console.log(`Cargando componente: ${file} → #${id}`);
    const response = await fetch(`components/${file}?v=${Date.now()}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} al cargar ${file}`);
    }

    const html = await response.text();
    componentCache.set(cacheKey, html);
    element.innerHTML = html;
    dispatchComponentLoaded(id);
    console.log(`Componente cargado OK: ${file}`);
    return true;
  } catch (error) {
    console.error(`❌ Error cargando "${file}":`, error);
    element.innerHTML = `
      <div class="text-center py-20 px-8">
        <p class="text-2xl font-bold text-red-600 mb-6">No se pudo cargar esta sección</p>
        <p class="text-gray-600 mb-8">${error.message}</p>
        <button onclick="location.reload()" 
                class="mt-6 px-8 py-4 bg-pink-600 text-white rounded-2xl font-black hover:bg-pink-700">
          Recargar página
        </button>
      </div>
    `;
    return false;
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
  // pedido se maneja manualmente abajo (no usamos initPedidoPage viejo)
};

document.addEventListener('componentLoaded', (event) => {
  const { id } = event.detail;
  console.log(`Evento componentLoaded recibido para: ${id}`);
  const initializer = componentInitializers[id];
  if (typeof initializer === 'function') {
    setTimeout(initializer, 0);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  console.log("DOMContentLoaded → iniciando carga de layout base");

  // Carga componentes críticos (siempre presentes)
  await loadComponent('globalModal', 'globalModal.html');
  await loadComponent('navbar',     'navbar.html');
  await loadComponent('footer',     'footer.html');

  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');

  if (path === '' || path.endsWith('index.html') || path.includes('/maldita-dulzura')) {
    console.log("Cargando página de inicio");
    await Promise.all([
      loadComponent('hero',          'hero.html'),
      loadComponent('destacados',    'destacados.html'),
      loadComponent('personalizacion','personalizacion.html'),
      loadComponent('sobrenosotros', 'sobrenosotros.html'),
      loadComponent('newsletter',    'newsletter.html'),
    ]);
  } 
  else if (path.endsWith('tienda.html')) {
    console.log("Cargando página tienda");
    await loadComponent('store-container', 'store.html');
  } 
  else if (path.endsWith('pedido.html')) {
    console.log("Cargando página pedido");
    
    const mainLoaded = await loadComponent('pedido', 'pedido/pedido-main.html');
    
    if (mainLoaded) {
      console.log("pedido-main.html cargado → procediendo con pasos");
      const pasosCargados = await Promise.all([
        loadComponent('pedido-paso-1', 'pedido/paso-1-tipo-producto.html'),
        loadComponent('pedido-paso-2', 'pedido/paso-2-detalles-producto.html'),
        loadComponent('pedido-paso-3', 'pedido/paso-3-personalizacion.html'),
        loadComponent('pedido-paso-4', 'pedido/paso-4-entrega-fecha.html'),
        loadComponent('pedido-paso-5', 'pedido/paso-5-resumen-precio.html')
      ]);

      console.log("Pasos cargados:", pasosCargados.every(Boolean) ? "todos OK" : "alguno falló");

      // Solo inicializamos el wizard (ya contiene toda la lógica)
      initPedidoWizard();
    } else {
      console.error("No se pudo cargar pedido-main.html → wizard no se inicia");
    }
  }


  // Seguridad extra: ocultar modal global después de cargar todo
  setTimeout(() => {
    document.getElementById('globalModal')?.classList.add('hidden');
  }, 1000);
});