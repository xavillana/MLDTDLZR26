// js/components/pedido.js

export function initPedidoPage() {
  const form = document.getElementById('orderForm');
  const successMessage = document.getElementById('successMessage');
  const priceCalculator = document.getElementById('priceCalculator');
  const priceBreakdown = document.getElementById('priceBreakdown');
  const totalPrice = document.getElementById('totalPrice');

  if (!form) return;

  // Fecha mínima: hoy + 3 días
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const fechaInput = document.getElementById('fechaEntrega');
  if (fechaInput) {
    fechaInput.min = today.toISOString().split('T')[0];
  }

  // Toggle secciones
  const tipoRadios = document.querySelectorAll('input[name="tipoProducto"]');
  const tartasSection = document.getElementById('tartasSection');
  const cupcakesSection = document.getElementById('cupcakesSection');
  const personalizadoSection = document.getElementById('personalizadoSection');
  const direccionSection = document.getElementById('direccionSection');

  tipoRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      tartasSection?.classList.toggle('hidden', radio.value !== 'tarta');
      cupcakesSection?.classList.toggle('hidden', radio.value !== 'cupcakes');
      personalizadoSection?.classList.toggle('hidden', radio.value !== 'personalizado');
      calculatePrice();
    });
  });

  // Entrega
  const entregaRadios = document.querySelectorAll('input[name="entrega"]');
  entregaRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      direccionSection?.classList.toggle('hidden', radio.value !== 'domicilio');
      calculatePrice();
    });
  });

  // Calculadora aproximada
  function calculatePrice() {
    let basePrice = 0;
    let extras = 0;
    let delivery = 0;

    const tipo = document.querySelector('input[name="tipoProducto"]:checked')?.value;

    if (tipo === 'tarta') {
      const tamano = document.getElementById('tamanoTarta')?.value;
      if (tamano?.includes('XL')) basePrice = 55;
      else if (tamano?.includes('Grande')) basePrice = 45;
      else if (tamano?.includes('Mediana')) basePrice = 35;
      else basePrice = 25;
    } else if (tipo === 'cupcakes') {
      const cantidad = parseInt(document.getElementById('cantidadCupcakes')?.value) || 0;
      basePrice = cantidad * 3.8;
    } else if (tipo === 'personalizado') {
      const personas = parseInt(document.getElementById('personasPersonalizado')?.value) || 0;
      basePrice = personas * 4.2;
      extras = document.querySelectorAll('input[name="decoracionPersonalizada"]:checked').length * 10;
    }

    if (document.querySelector('input[name="entrega"]:checked')?.value === 'domicilio') {
      delivery = 8;
    }

    const total = basePrice + extras + delivery;

    if (total > 0) {
      priceCalculator?.classList.remove('hidden');
      priceBreakdown.innerHTML = `
        <div class="flex justify-between"><span>Base</span><span>${basePrice.toFixed(2)}€</span></div>
        ${extras > 0 ? `<div class="flex justify-between"><span>Extras</span><span>+${extras}€</span></div>` : ''}
        ${delivery > 0 ? `<div class="flex justify-between"><span>Entrega</span><span>+${delivery}€</span></div>` : ''}
      `;
      totalPrice.textContent = `${total.toFixed(2)}€`;
    } else {
      priceCalculator?.classList.add('hidden');
    }
  }

  // Eventos para recalcular
  document.querySelectorAll('#tamanoTarta, #cantidadCupcakes, #personasPersonalizado, input[name="decoracionPersonalizada"], input[name="entrega"]').forEach(el => {
    el?.addEventListener('change', calculatePrice);
    el?.addEventListener('input', calculatePrice);
  });

  // Envío del formulario (simulación)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.classList.add('hidden');
    successMessage?.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Inicializar
  calculatePrice();
}
