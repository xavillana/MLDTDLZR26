// js/components/pedido.js
import { allProducts } from '../data/allProducts.js';

const normalize = str => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';

export function initPedidoPage() {
  console.log("🔄 Iniciando página de pedido...");

  const tipoRadios = document.querySelectorAll('input[name="tipoProducto"]');
  const tartasSection = document.getElementById('tartasSection');
  const cupcakesSection = document.getElementById('cupcakesSection');
  const personalizadoSection = document.getElementById('personalizadoSection');
  const productoOtraSection = document.getElementById('productoOtraSection');

  const selectTarta = document.getElementById('productoTartaSelect');
  const selectCupcake = document.getElementById('productoCupcakeSelect');

  if (!selectTarta || !selectCupcake) {
    console.error("❌ No se encontraron los selects de productos");
    return;
  }

  // === Poblar selects ===
  function populateSelects() {
    // Limpiar
    selectTarta.innerHTML = '<option value="">Selecciona una tarta...</option>';
    selectCupcake.innerHTML = '<option value="">Selecciona un cupcake...</option>';

    allProducts.forEach(product => {
      const opt = document.createElement('option');
      opt.value = product.id;
      opt.textContent = `${product.emoji || ''} ${product.name}`;

      if (product.category === 'tartas' || product.category === 'cheesecakes') {
        selectTarta.appendChild(opt.cloneNode(true));
      } else if (product.category === 'cupcakes') {
        selectCupcake.appendChild(opt.cloneNode(true));
      }
    });

    console.log("✅ Productos cargados en selects");
  }

  // === Mostrar/ocultar secciones ===
  function toggleSections() {
    const selected = document.querySelector('input[name="tipoProducto"]:checked')?.value;

    tartasSection?.classList.toggle('hidden', selected !== 'tarta');
    cupcakesSection?.classList.toggle('hidden', selected !== 'cupcakes');
    personalizadoSection?.classList.toggle('hidden', selected !== 'personalizado');

    productoOtraSection?.classList.toggle('hidden', selected !== 'personalizado');
  }

  // === Pre-seleccionar desde URL ===
  function preselectFromURL() {
    const params = new URLSearchParams(location.search);
    const productName = params.get('product');
    if (!productName) return;

    const found = allProducts.find(p => 
      normalize(p.name) === normalize(decodeURIComponent(productName))
    );

    if (found) {
      const radioValue = found.category === 'cupcakes' ? 'cupcakes' : 'tarta';
      const radio = document.querySelector(`input[name="tipoProducto"][value="${radioValue}"]`);
      if (radio) {
        radio.checked = true;
        toggleSections();

        const select = found.category === 'cupcakes' ? selectCupcake : selectTarta;
        select.value = found.id;

        console.log(`✅ Producto pre-seleccionado: ${found.name}`);
      }
    }
  }

  // === Eventos ===
  tipoRadios.forEach(radio => {
    radio.addEventListener('change', toggleSections);
  });

  // === Inicializar ===
  populateSelects();
  toggleSections();
  preselectFromURL();
}
