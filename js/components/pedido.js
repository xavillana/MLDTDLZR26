// js/pedido.js
// Lógica completa para el formulario avanzado de pedido con EmailJS

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
  const successMessage = document.getElementById('successMessage');

  // Fecha mínima: hoy + 3 días
  const today = new Date();
  today.setDate(today.getDate() + 3);
  document.getElementById('fechaEntrega').min = today.toISOString().split('T')[0];

  // Toggle secciones según tipo de producto
  window.toggleProductOptions = function() {
    const selected = document.querySelector('input[name="tipoProducto"]:checked')?.value;
    tartasSection.classList.toggle('hidden', selected !== 'tartas-cheesecakes');
    cupcakesSection.classList.toggle('hidden', selected !== 'cupcakes');
    personalizadoSection.classList.toggle('hidden', selected !== 'personalizado');
    calculatePrice();
  };

  // Actualizar opciones de sabores para cupcakes
  window.updateFlavorOptions = function() {
    const cantidad = cantidadCupcakes.value === 'otro' ? parseInt(cantidadOtra.value) || 0 : parseInt(cantidadCupcakes.value) || 0;
    flavorsContainer.innerHTML = '';
    if (cantidad > 0) {
      document.getElementById('flavorLabel').textContent = `Selecciona hasta ${Math.ceil(cantidad / 6)} sabores`;
      for (let i = 1; i <= Math.ceil(cantidad / 6); i++) {
        const select = document.createElement('select');
        select.className = 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base';
        select.innerHTML = `
          <option value="">Sabor ${i}</option>
          <option value="vainilla">Vainilla</option>
          <option value="chocolate">Chocolate</option>
          <option value="fresa">Fresa</option>
          <!-- Añade más sabores según tu lista -->
        `;
        flavorsContainer.appendChild(select);
      }
      if (cantidadCupcakes.value === 'otro') cantidadPersonalizada.classList.remove('hidden');
      else cantidadPersonalizada.classList.add('hidden');
    }
    calculatePrice();
  };

  // Toggle sección de dirección
  window.toggleDireccionSection = function() {
    direccionSection.classList.toggle('hidden', tipoEntrega.value !== 'domicilio');
  };

  // Seleccionar producto (para modales)
  window.selectProduct = function(id) {
    selectedProduct = allProducts.find(p => p.id === id);
    // Aquí puedes abrir modal si lo deseas, pero ya lo manejas con onclick
  };

  // Calcular precio estimado
  window.calculatePrice = function() {
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked')?.value;
    let basePrice = 0;
    let extras = 0;
    let delivery = tipoEntrega.value === 'domicilio' ? 5 : 0;

    if (tipoProducto === 'tartas-cheesecakes') {
      const tarta = document.querySelector('input[name="tartaSeleccionada"]:checked')?.value;
      const tamano = tamanoTarta.value;
      if (tarta && tamano) {
        // Precios aproximados por tamaño (ajusta según tus datos)
        const precios = { pequena: 25, mediana: 35, grande: 45, xl: 55 };
        basePrice = precios[tamano] || 0;
      }
    } else if (tipoProducto === 'cupcakes') {
      const cantidad = cantidadCupcakes.value === 'otro' ? parseInt(cantidadOtra.value) || 0 : parseInt(cantidadCupcakes.value) || 0;
      basePrice = cantidad * 3.5; // Precio promedio por cupcake
    } else if (tipoProducto === 'personalizado') {
      const personas = parseInt(document.getElementById('personasPersonalizado').value) || 0;
      basePrice = personas * 4; // Estimación: 4€ por persona
      extras += document.querySelectorAll('input[name="decoracionPersonalizada"]:checked').length * 8;
    }

    const total = basePrice + extras + delivery;

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

  // Enviar formulario con EmailJS
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // IDs de EmailJS (reemplaza con los tuyos)
    const serviceID = 'your_service_id'; // Ej: 'service_xxxxxx'
    const templateID = 'your_template_id'; // Ej: 'template_xxxxxx'
    const publicKey = 'your_public_key'; // Ej: 'xxxxxxxxxxxxxx'

    // Enviar el formulario
    emailjs.sendForm(serviceID, templateID, '#orderForm', publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Hubo un error al enviar el pedido. Por favor, inténtalo de nuevo.');
      });
  });

  // Inicializar
  toggleProductOptions();
  calculatePrice();
}
