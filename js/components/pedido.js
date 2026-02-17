// js/components/pedido.js
// Punto de entrada específico para la página pedido.html
// Coordina la carga inicial y listeners específicos del paso 2

import { allProducts } from '../data/allProducts.js';
import { pedidoState, calcularPrecio, initPedidoWizard } from './pedidoManager.js'; // Ajusta la ruta si está en modules/

// ────────────────────────────────────────────────
//  Renderiza tarjetas de tartas/cheesecakes en paso 2
// ────────────────────────────────────────────────
function renderTartasCards() {
  const container = document.getElementById('tartas-grid');
  if (!container) return;

  const tartas = allProducts.filter(p => 
    p.category === 'tartas' || p.category === 'cheesecakes'
  );

  container.innerHTML = tartas.map(product => `
    <div class="product-card border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-pink-400 transition-all
                ${pedidoState.productoId === product.id ? 'border-pink-600 bg-pink-50' : ''}"
         onclick="selectTarta('${product.id}')"
         role="button" tabindex="0">
      <div class="flex items-start gap-4">
        <span class="text-5xl">${product.emoji || '🍰'}</span>
        <div>
          <h5 class="font-bold text-lg">${product.name}</h5>
          <p class="text-sm text-gray-600 line-clamp-2 mt-1">${product.shortDescription || ''}</p>
          <p class="text-pink-600 font-bold mt-2">
            Desde ${Math.min(...(product.sizes?.map(s => s.price) || [0]))}€
          </p>
        </div>
      </div>
    </div>
  `).join('');
}

// ────────────────────────────────────────────────
//  Seleccionar una tarta/cheesecake
// ────────────────────────────────────────────────
window.selectTarta = function(id) {
  pedidoState.productoId = id;
  pedidoState.producto = allProducts.find(p => p.id === id);
  pedidoState.tamanoSeleccionado = null; // reset tamaño

  // Resaltar tarjeta seleccionada
  document.querySelectorAll('.product-card').forEach(card => {
    card.classList.toggle('border-pink-600', card.getAttribute('onclick')?.includes(id));
    card.classList.toggle('bg-pink-50', card.getAttribute('onclick')?.includes(id));
  });

  // Repoblar select de tamaños
  const tamSelect = document.getElementById('tamanoTarta');
  if (tamSelect && pedidoState.producto?.sizes) {
    tamSelect.innerHTML = '<option value="">Selecciona tamaño</option>' +
      pedidoState.producto.sizes.map(s => `
        <option value="${s.name || s.size}">
          ${s.name || s.size} – ${s.price}€ (${s.servings || '?'} personas)
        </option>
      `).join('');
  }

  // Mostrar sección de tamaños
  document.getElementById('detalles-tartas')?.classList.add('active');

  calcularPrecio();
};

// ────────────────────────────────────────────────
//  Inicializar listeners específicos del paso 2
// ────────────────────────────────────────────────
function initPaso2Especifico() {
  // Mostrar/ocultar secciones según tipo
  const tipo = pedidoState.tipo;

  document.getElementById('detalles-tartas')?.classList.toggle('hidden', !['tarta', 'cheesecake'].includes(tipo));
  document.getElementById('detalles-cupcakes')?.classList.toggle('hidden', tipo !== 'cupcakes');
  document.getElementById('detalles-personalizado')?.classList.toggle('hidden', tipo !== 'personalizado');

  if (['tarta', 'cheesecake'].includes(tipo)) {
    renderTartasCards();
  }

  // Listener para select de tamaño tarta
  const tamSelect = document.getElementById('tamanoTarta');
  if (tamSelect) {
    tamSelect.addEventListener('change', e => {
      pedidoState.tamanoSeleccionado = e.target.value;
      calcularPrecio();
    });
  }

  // Listener cantidad cupcakes
  const cantCupcakes = document.getElementById('cantidadCupcakes');
  if (cantCupcakes) {
    cantCupcakes.addEventListener('change', e => {
      const val = e.target.value;
      pedidoState.cantidad = val === 'otro' ? 0 : parseInt(val) || 0;
      document.getElementById('cantidadPersonalizada')?.classList.toggle('hidden', val !== 'otro');
      calcularPrecio();
    });
  }

  const cantOtra = document.getElementById('cantidadOtra');
  if (cantOtra) {
    cantOtra.addEventListener('input', e => {
      pedidoState.cantidad = parseInt(e.target.value) || 0;
      calcularPrecio();
    });
  }
}

// ────────────────────────────────────────────────
//  Inicialización principal de la página pedido
// ────────────────────────────────────────────────
export function initPedidoPage() {
  // Esperamos a que los componentes estén cargados
  // (el router ya los carga antes de llamar a esta función)

  // Iniciamos el wizard (que vive en pedidoManager.js)
  initPedidoWizard();

  // Inicializamos listeners específicos del paso 2
  // (se ejecutará cada vez que se muestre el paso 2)
  document.addEventListener('componentLoaded', (e) => {
    if (e.detail.id === 'pedido-paso-2') {
      initPaso2Especifico();
    }
  });

  console.log("Página de pedido inicializada");
}