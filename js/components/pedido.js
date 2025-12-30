// js/pedido.js
// Lógica completa para el formulario avanzado de pedido

import { allProducts } from '../data/allProducts.js';

let selectedProduct = null; // Producto seleccionado actualmente

export function initPedidoPage() {
  // Elementos principales
  const tipoProductoRadios = document.querySelectorAll('input[name="tipoProducto"]');
  const tartasSection = document.getElementById('tartasSection');
  const cupcakesSection = document.getElementById('cupcakesSection');
  const personalizadoSection = document.getElementById('personalizadoSection');
  const tamanoTarta = document.getElementById('tamanoTarta');
  const cantidadCupcakes = document.getElementById('cantidadCupcakes');
  const cantidadPersonalizada = document.getElementById('cantidadPersonalizada');
  const cantidadOtra = document.getElementById('cantidadOtra');
  const flavorsContainer = document.getElementById('flavorsContainer');
  const tipoEntrega = document.getElementById('tipoEntrega');
  const direccionSection = document.getElementById('direccionSection');
  const priceCalculator = document.getElementById('priceCalculator');
  const priceBreakdown = document.getElementById('priceBreakdown');
  const totalPrice = document.getElementById('totalPrice');
  const form = document.getElementById('orderForm');

  // Fecha mínima: hoy + 3 días
  const today = new Date();
  today.setDate(today.getDate() + 3);
  document.getElementById('fechaEntrega').min = today.toISOString().split('T')[0];

  // Toggle secciones según tipo de producto
  window.toggleProductOptions = function() {
    const selected = document.querySelector('input[name="tipoProducto"]:checked')?.value;

    // Ocultar todas
    tartasSection.classList.add('hidden');
    cupcakesSection.classList.add('hidden');
    personalizadoSection.classList.add('hidden');
    priceCalculator.classList.add('hidden');

    // Mostrar la seleccionada
    if (selected === 'tartas-cheesecakes') {
      tartasSection.classList.remove('hidden');
    } else if (selected === 'cupcakes') {
      cupcakesSection.classList.remove('hidden');
      updateFlavorOptions();
    } else if (selected === 'personalizado') {
      personalizadoSection.classList.remove('hidden');
    }
  };

  // Seleccionar producto (tartas/cheesecakes)
  window.selectProduct = function(productId) {
    selectedProduct = allProducts.find(p => p.id === productId);
    calculatePrice();
  };

  // Abrir modal de información del producto
  window.openProductModal = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalTitle').textContent = product.name;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
      <div class="text-center mb-6">
        <img src="${product.image || '/img/placeholder.jpg'}" alt="${product.name}" class="w-full max-w-sm mx-auto rounded-xl shadow-lg">
      </div>
      <p class="text-lg font-medium text-pink-600 mb-4">${product.shortDescription}</p>
      <p class="text-gray-700 leading-relaxed mb-6">${product.longDescription}</p>
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <p class="font-semibold mb-2">Ingredientes principales:</p>
        <p class="text-sm text-gray-600">${Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients}</p>
      </div>
      ${product.sizes ? `
        <div class="mb-6">
          <p class="font-semibold mb-3">Tamaños y precios:</p>
          <ul class="space-y-2 text-sm">
            ${product.sizes.map(s => `
              <li class="flex justify-between">
                <span>${s.size || s.name} (${s.servings} personas)</span>
                <span class="font-bold text-pink-600">${s.price}€</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : `
        <p class="font-bold text-pink-600 text-lg mb-6">Precio: ${product.price || product.cupcakePrice}€</p>
      `}
      <div class="text-center">
        <button onclick="closeProductModal()" class="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium">
          Cerrar
        </button>
      </div>
    `;

    document.getElementById('productModal').classList.remove('hidden');
    document.getElementById('productModal').classList.add('flex');
  };

  window.closeProductModal = function() {
    document.getElementById('productModal').classList.add('hidden');
    document.getElementById('productModal').classList.remove('flex');
  };

  // Mostrar/ocultar dirección
  window.toggleDireccionSection = function() {
    if (tipoEntrega.value === 'domicilio') {
      direccionSection.classList.remove('hidden');
    } else {
      direccionSection.classList.add('hidden');
    }
    calculatePrice();
  };

  // Actualizar opciones de sabores para cupcakes
  window.updateFlavorOptions = function() {
    const cantidad = cantidadCupcakes.value === 'otro' 
      ? parseInt(cantidadOtra.value) || 0 
      : parseInt(cantidadCupcakes.value) || 0;

    if (cantidadCupcakes.value === 'otro') {
      cantidadPersonalizada.classList.remove('hidden');
    } else {
      cantidadPersonalizada.classList.add('hidden');
    }

    flavorsContainer.innerHTML = '';
    document.getElementById('flavorLabel').textContent = cantidad > 0 
      ? `Sabores (puedes elegir hasta ${cantidad} sabores)`
      : 'Sabores (selecciona la cantidad primero)';

    if (cantidad === 0) return;

    // Lista de sabores disponibles para cupcakes (puedes ampliarla)
    const cupcakeFlavors = [
      'Rojo Peligroso (Red Velvet)',
      'Zana OH! RIA (Zanahoria)',
      'Muerte por Chocolate',
      'Yogurt Salvaje',
      'Crimen Cuqui',
      'Vainilla Clásica',
      'Chocolate Intenso',
      'Fresa Fresca',
      'Limón Vibrante'
    ];

    for (let i = 1; i <= cantidad; i++) {
      const div = document.createElement('div');
      div.innerHTML = `
        <label class="block text-sm font-medium text-gray-700 mb-2">Sabor ${i}</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" onchange="calculatePrice()">
          <option value="">Seleccionar sabor</option>
          ${cupcakeFlavors.map(f => `<option value="${f}">${f}</option>`).join('')}
        </select>
      `;
      flavorsContainer.appendChild(div);
    }

    calculatePrice();
  };

  // Calcular precio estimado
  window.calculatePrice = function() {
    let basePrice = 0;
    let extras = 0;
    let delivery = tipoEntrega.value === 'domicilio' ? 5 : 0;

    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked')?.value;

    if (tipoProducto === 'tartas-cheesecakes') {
      if (selectedProduct && selectedProduct.sizes) {
        const size = tamanoTarta.value;
        const sizeObj = selectedProduct.sizes.find(s => 
          (s.size || s.name).toLowerCase().includes(size)
        );
        basePrice = sizeObj ? sizeObj.price : 0;
      } else if (selectedProduct) {
        basePrice = selectedProduct.price || 0;
      }
    } else if (tipoProducto === 'cupcakes') {
      const cantidad = cantidadCupcakes.value === 'otro' 
        ? parseInt(cantidadOtra.value) || 0 
        : parseInt(cantidadCupcakes.value) || 0;
      basePrice = cantidad * 3.8; // Precio promedio por cupcake
    } else if (tipoProducto === 'personalizado') {
      const personas = parseInt(document.getElementById('personasPersonalizado').value) || 0;
      basePrice = personas * 4; // Estimación: 4€ por persona aprox.
      extras += document.querySelectorAll('input[name="decoracionPersonalizada"]:checked').length * 8;
    }

    const total = basePrice + extras + delivery;

    // Mostrar calculadora si hay precio
    if (total > 0 || basePrice > 0) {
      priceCalculator.classList.remove('hidden');

      priceBreakdown.innerHTML = `
        <div class="flex justify-between"><span>Base</span><span>${basePrice}€</span></div>
        ${extras > 0 ? `<div class="flex justify-between"><span>Extras decoración</span><span>+${extras}€</span></div>` : ''}
        ${delivery > 0 ? `<div class="flex justify-between"><span>Entrega a domicilio</span><span>+${delivery}€</span></div>` : ''}
      `;
      totalPrice.textContent = `${total}€`;
    } else {
      priceCalculator.classList.add('hidden');
    }
  };

  // Enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Aquí puedes conectar EmailJS o Formspree
    // Por ahora: simulación de éxito
    form.classList.add('hidden');
    document.getElementById('successMessage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Inicializar
  toggleProductOptions();
  calculatePrice();
}
