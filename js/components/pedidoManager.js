// js/components/pedidoManager.js
// Lógica central del wizard de pedido: estado, navegación, cálculo de precios reales

import { allProducts } from '../data/allProducts.js';

export const pedidoState = {
  currentStep: 1,
  tipo: null,
  productoId: null,
  producto: null,
  tamanoSeleccionado: null,
  cantidad: 0,
  sabores: [],
  rellenoPrincipal: '',
  cobertura: '',
  extras: [],                   // [{nombre: string, precio: number}]
  nombreCliente: '',
  emailCliente: '',
  telefonoCliente: '',
  fechaEntrega: '',
  franjaHoraria: '',
  horaEspecifica: '',
  tipoEntrega: 'recogida',
  direccion: '',
  cp: '',
  poblacion: '',
  comentarios: '',
  comentarioVelas: '',          // comentario específico para velas
  comentarioTema: '',           // comentario si elige "Otro" en ocasión

  precioBase: 0,
  precioExtras: 0,
  precioEntrega: 0,
  totalEstimado: 0
};

const getEl = id => document.getElementById(id);
const qsa   = selector => document.querySelectorAll(selector);

// ────────────────────────────────────────────────
// Navegación del wizard (5 pasos)
// ────────────────────────────────────────────────
function mostrarPaso(n) {
  pedidoState.currentStep = n;

  // Ocultar todos los pasos externos
  qsa('.form-step[id^="pedido-paso-"]').forEach(el => {
    el.classList.add('hidden');
  });

  // Mostrar el paso actual
  const pasoActual = getEl(`pedido-paso-${n}`);
  if (pasoActual) {
    pasoActual.classList.remove('hidden');

    // Quitar hidden a contenedores internos
    pasoActual.querySelectorAll('.form-section, .form-step:not([id^="pedido-paso-"])').forEach(child => {
      child.classList.remove('hidden');
    });
  }

  // Actualizar círculos de progreso (5 pasos)
  qsa('[id^="step"][id$="circle"]').forEach((circ, i) => {
    const pasoNum = i + 1;
    circ.classList.toggle('bg-pink-600', pasoNum <= n);
    circ.classList.toggle('bg-gray-300', pasoNum > n);
    circ.classList.toggle('text-white',   pasoNum <= n);
    circ.classList.toggle('text-gray-500', pasoNum > n);
  });

  getEl('prevStep')?.classList.toggle('hidden', n === 1);
  getEl('nextStep')?.classList.toggle('hidden', n === 5);
  getEl('submitOrder')?.classList.toggle('hidden', n !== 5);

  // Línea de progreso (ajustada a 5 pasos)
  const progressLine = getEl('progress-line');
  if (progressLine) {
    const porcentaje = ((n - 1) / 4) * 100;
    progressLine.style.width = `${porcentaje}%`;
  }

  if (n === 2) inicializarPaso2();
  if (n === 3) inicializarPaso3();
  if (n === 4) inicializarPaso4();
  if (n === 5) renderizarResumen();

  getEl('orderForm')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function siguientePaso() {
  if (validarPasoActual()) {
    if (pedidoState.currentStep < 5) {
      mostrarPaso(pedidoState.currentStep + 1);
    }
  }
}

function anteriorPaso() {
  if (pedidoState.currentStep > 1) {
    mostrarPaso(pedidoState.currentStep - 1);
  }
}

function validarPasoActual() {
  const paso = pedidoState.currentStep;

  if (paso === 1) {
    const radio = document.querySelector('input[name="tipoProducto"]:checked');
    if (!radio) {
      alert("Por favor selecciona el tipo de producto.");
      return false;
    }
    pedidoState.tipo = radio.value;
  }

  if (paso === 2) {
    if (['tarta', 'cheesecake'].includes(pedidoState.tipo)) {
      if (!pedidoState.productoId) {
        alert("Selecciona una tarta o cheesecake.");
        return false;
      }
    }
    if (pedidoState.tipo === 'cupcakes') {
      if (pedidoState.cantidad < 1) {
        alert("Indica cuántos cupcakes deseas.");
        return false;
      }
    }
  }

  if (paso === 4) {
    if (!pedidoState.nombreCliente || !pedidoState.emailCliente || !pedidoState.telefonoCliente) {
      alert("Por favor completa tus datos de contacto (nombre, email y teléfono).");
      return false;
    }
    if (!pedidoState.fechaEntrega) {
      alert("Selecciona una fecha de entrega / recogida.");
      return false;
    }
  }

  return true;
}
// ────────────────────────────────────────────────
// Cálculo de precio usando datos reales de allProducts
// ────────────────────────────────────────────────
function calcularPrecio() {
  let base = 0;

  if (['tarta', 'cheesecake'].includes(pedidoState.tipo) && pedidoState.productoId) {
    const prod = allProducts.find(p => p.id === pedidoState.productoId);
    if (prod) {
      pedidoState.producto = prod;
      if (prod.sizes?.length > 0) {
        const sizeMatch = prod.sizes.find(s =>
          (s.name || s.size || '').toLowerCase().includes((pedidoState.tamanoSeleccionado || '').toLowerCase())
        );
        base = sizeMatch ? sizeMatch.price : Math.min(...prod.sizes.map(s => s.price));
      } else if (prod.price) {
        base = prod.price;
      }
    }
  } else if (pedidoState.tipo === 'cupcakes' && pedidoState.cantidad > 0) {
    // Precio medio aproximado (ajusta según tus datos reales)
    base = pedidoState.cantidad * 3.5;
  } else {
    base = 48; // base personalizada
  }

  const extrasTotal = pedidoState.extras.reduce((acc, e) => acc + (e.precio || 0), 0);
  const entregaTotal = pedidoState.tipoEntrega === 'domicilio' ? 12 : 0;

  pedidoState.precioBase      = Math.round(base);
  pedidoState.precioExtras    = extrasTotal;
  pedidoState.precioEntrega   = entregaTotal;
  pedidoState.totalEstimado   = Math.round(base + extrasTotal + entregaTotal);

  const totalEl = getEl('totalPrice') || getEl('resumen-total');
  if (totalEl) totalEl.textContent = pedidoState.totalEstimado;
}// Renderizar SOLO tartas
function renderTartasGrid() {
  const container = getEl('tartas-grid');
  if (!container) return;

  const tartas = allProducts.filter(p => p.category === 'tartas');

  if (tartas.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500 col-span-full py-8">No hay tartas disponibles</p>';
    return;
  }

  container.innerHTML = tartas.map(product => `
    <div class="product-card border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-pink-400 transition-all
                ${pedidoState.productoId === product.id ? 'border-pink-600 bg-pink-50' : ''}"
         onclick="selectProducto('${product.id}')"
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

// Renderizar SOLO cheesecakes
function renderCheesecakesGrid() {
  const container = getEl('cheesecakes-grid');
  if (!container) return;

  const cheesecakes = allProducts.filter(p => p.category === 'cheesecakes');

  if (cheesecakes.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500 col-span-full py-8">No hay cheesecakes disponibles</p>';
    return;
  }

  container.innerHTML = cheesecakes.map(product => `
    <div class="product-card border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-pink-400 transition-all
                ${pedidoState.productoId === product.id ? 'border-pink-600 bg-pink-50' : ''}"
         onclick="selectProducto('${product.id}')"
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

// Función unificada para seleccionar producto (tarta o cheesecake)
window.selectProducto = function(id) {
  pedidoState.productoId = id;
  pedidoState.producto = allProducts.find(p => p.id === id);
  pedidoState.tamanoSeleccionado = null;

  // Resaltar la tarjeta seleccionada (en ambos grids)
  qsa('.product-card').forEach(card => {
    card.classList.toggle('border-pink-600', card.getAttribute('onclick')?.includes(id));
    card.classList.toggle('bg-pink-50', card.getAttribute('onclick')?.includes(id));
  });

  // Repoblar select de tamaños
  const tamSelect = getEl('tamanoTarta');
  if (tamSelect && pedidoState.producto?.sizes) {
    tamSelect.innerHTML = '<option value="">Selecciona tamaño</option>' +
      pedidoState.producto.sizes.map(s => `
        <option value="${s.name || s.size}">
          ${s.name || s.size} – ${s.price}€ (${s.servings || '?'} personas)
        </option>
      `).join('');
  }

  calcularPrecio();
  console.log(`Producto seleccionado: ${id}`);
};

// Actualizar inicializarPaso2 para renderizar ambos grids por separado
function inicializarPaso2() {
  const tipo = pedidoState.tipo;

  document.getElementById('detalles-tartas')?.classList.toggle('hidden', !['tarta', 'cheesecake'].includes(tipo));
  document.getElementById('detalles-cupcakes')?.classList.toggle('hidden', tipo !== 'cupcakes');
  document.getElementById('detalles-personalizado')?.classList.toggle('hidden', tipo !== 'personalizado');

  if (['tarta', 'cheesecake'].includes(tipo)) {
    renderTartasGrid();
    renderCheesecakesGrid();
  }

  // Listener para tamaño
  const tamSelect = getEl('tamanoTarta');
  if (tamSelect) {
    tamSelect.addEventListener('change', e => {
      pedidoState.tamanoSeleccionado = e.target.value;
      calcularPrecio();
    });
  }

  // Listeners de cupcakes (ya los tienes)
  const cantCupcakes = getEl('cantidadCupcakes');
  if (cantCupcakes) {
    cantCupcakes.addEventListener('change', e => {
      const v = e.target.value;
      pedidoState.cantidad = v === 'otro' ? 0 : parseInt(v) || 0;
      getEl('cantidadPersonalizada')?.classList.toggle('hidden', v !== 'otro');
      calcularPrecio();
    });
  }

  const cantOtra = getEl('cantidadOtra');
  if (cantOtra) {
    cantOtra.addEventListener('input', e => {
      pedidoState.cantidad = parseInt(e.target.value) || 0;
      calcularPrecio();
    });
  }

  calcularPrecio();
}

function inicializarPaso3() {
  const tipo = pedidoState.tipo;

  // Mostrar sección específica según tipo
  document.getElementById('personalizacion-tartas')?.classList.toggle('hidden', tipo !== 'tarta' && tipo !== 'cheesecake');
  document.getElementById('personalizacion-generico')?.classList.toggle('hidden', tipo === 'tarta' || tipo === 'cheesecake');

  // Listener para "Otro" en tema/ocasión (solo si está visible)
  const temaSelect = getEl('temaOcasión');
  if (temaSelect) {
    temaSelect.addEventListener('change', e => {
      getEl('temaOtro')?.classList.toggle('hidden', e.target.value !== 'otro');
    });
  }

  // Listener para tipo de entrega (común)
  qsa('input[name="tipoEntrega"]').forEach(radio => {
    radio.addEventListener('change', e => {
      pedidoState.tipoEntrega = e.target.value;
      getEl('direccionEntrega')?.classList.toggle('hidden', e.target.value !== 'domicilio');
      calcularPrecio();
    });
  });

  // Listener para extras (velas, dedicatoria, figuras/toppers)
  qsa('input[type="checkbox"][data-precio]').forEach(chk => {
    chk.addEventListener('change', e => {
      const precio = parseFloat(e.target.dataset.precio) || 0;
      const nombre = e.target.value || e.target.nextElementSibling?.textContent?.trim() || 'Extra';

      if (e.target.checked) {
        pedidoState.extras.push({ nombre, precio });
      } else {
        pedidoState.extras = pedidoState.extras.filter(ex => ex.nombre !== nombre);
      }
      calcularPrecio();
    });
  });

  // Mostrar/ocultar campo de comentario al marcar/desmarcar Velas
const chkVelas = document.getElementById('chk-velas');
if (chkVelas) {
  chkVelas.addEventListener('change', e => {
    const container = document.getElementById('comentario-velas-container');
    if (container) {
      container.classList.toggle('hidden', !e.target.checked);
    }

    // Opcional: resetear comentario si se desmarca
    if (!e.target.checked) {
      const input = document.getElementById('comentario-velas');
      if (input) {
        input.value = '';
        pedidoState.comentarioVelas = ''; // limpiar estado si lo tienes
      }
    }
  });
}

// Opcional: guardar el comentario en el estado mientras se escribe
const inputVelas = document.getElementById('comentario-velas');
if (inputVelas) {
  inputVelas.addEventListener('input', e => {
    pedidoState.comentarioVelas = e.target.value.trim(); // nuevo campo en estado
  });
}
  calcularPrecio();
}
// Listener específico para el checkbox de velas
const chkVelas = document.getElementById('chk-velas');
if (chkVelas) {
  chkVelas.addEventListener('change', e => {
    const container = getEl('comentario-velas-container');
    if (container) {
      container.classList.toggle('hidden', !e.target.checked);
    }
    
    // Opcional: guardar el comentario en el estado cuando cambie
    const inputComentario = getEl('comentario-velas');
    if (inputComentario) {
      inputComentario.addEventListener('input', ev => {
        pedidoState.comentarioVelas = ev.target.value.trim(); // Nuevo campo en estado
      });
    }
  });
}

function inicializarPaso4() {
  // Listener para tipo de entrega
  qsa('input[name="tipoEntrega"]').forEach(radio => {
    radio.addEventListener('change', e => {
      pedidoState.tipoEntrega = e.target.value;
      getEl('direccionEntrega')?.classList.toggle('hidden', e.target.value !== 'domicilio');
    });
  });

  // Guardar datos del cliente en tiempo real
  getEl('nombreCliente')?.addEventListener('input', e => pedidoState.nombreCliente = e.target.value.trim());
  getEl('emailCliente')?.addEventListener('input', e => pedidoState.emailCliente = e.target.value.trim());
  getEl('telefonoCliente')?.addEventListener('input', e => pedidoState.telefonoCliente = e.target.value.trim());

  // Guardar fecha y franja
  getEl('fechaEntrega')?.addEventListener('change', e => pedidoState.fechaEntrega = e.target.value);
  getEl('franjaHoraria')?.addEventListener('change', e => {
    pedidoState.franjaHoraria = e.target.value;
    getEl('horaEspecifica')?.classList.toggle('hidden', e.target.value !== 'especifica');
  });

  getEl('horaEspecifica')?.addEventListener('input', e => pedidoState.horaEspecifica = e.target.value.trim());

  // Listener para comentario de velas (si lo tienes)
  getEl('comentario-velas')?.addEventListener('input', e => pedidoState.comentarioVelas = e.target.value.trim());
}



function renderizarResumen() {
  // Asignaciones limpias y seguras con optional chaining
  const tipoEl = getEl('resumen-tipo');
  if (tipoEl) tipoEl.textContent = pedidoState.tipo || '—';

  const productoEl = getEl('resumen-producto');
  if (productoEl) productoEl.textContent = pedidoState.producto?.name || 'Personalizado';

  let cantText = '—';
  if (pedidoState.tipo === 'cupcakes') cantText = `${pedidoState.cantidad} unidades`;
  if (pedidoState.tamanoSeleccionado) cantText = pedidoState.tamanoSeleccionado;
  const cantEl = getEl('resumen-cantidad-tamano');
  if (cantEl) cantEl.textContent = cantText;

  const nombreEl = getEl('resumen-nombre');
  if (nombreEl) nombreEl.textContent = pedidoState.nombreCliente || '—';
  const emailEl = getEl('resumen-email');
  if (emailEl) emailEl.textContent = pedidoState.emailCliente || '—';
  const telEl = getEl('resumen-telefono');
  if (telEl) telEl.textContent = pedidoState.telefonoCliente || '—';
  
  const fechaEl = getEl('resumen-fecha');
  if (fechaEl) fechaEl.textContent = pedidoState.fechaEntrega || '—';

  const entregaEl = getEl('resumen-entrega');
  if (entregaEl) {
    entregaEl.textContent = pedidoState.tipoEntrega === 'domicilio' 
      ? 'Entrega a domicilio' 
      : 'Recogida en tienda';
  }

  const rellenoEl = getEl('resumen-relleno');
  if (rellenoEl) rellenoEl.textContent = getEl('rellenoPrincipal')?.value || '—';

  const coberturaEl = getEl('resumen-cobertura');
  if (coberturaEl) coberturaEl.textContent = getEl('cobertura')?.value || '—';

  const extrasEl = getEl('resumen-extras');
  if (extrasEl) {
    extrasEl.textContent = pedidoState.extras.length > 0 
      ? pedidoState.extras.map(e => e.nombre).join(', ') 
      : 'Ninguno';
  }

  if (pedidoState.extras.some(e => e.nombre.toLowerCase().includes('velas')) && pedidoState.comentarioVelas) {
  const comentariosEl = getEl('resumen-comentarios');
  if (comentariosEl) {
    comentariosEl.insertAdjacentHTML('beforeend', 
      `<br><strong>Comentario velas:</strong> ${pedidoState.comentarioVelas}`);
  }
}
  const dirContainer = getEl('resumen-direccion-container');
  if (pedidoState.tipoEntrega === 'domicilio') {
    if (dirContainer) dirContainer.classList.remove('hidden');
    const dirEl = getEl('resumen-direccion');
    if (dirEl) dirEl.textContent = pedidoState.direccion || getEl('direccion')?.value || '—';
    const cpPobEl = getEl('resumen-cp-poblacion');
    if (cpPobEl) {
      cpPobEl.textContent = 
        `${pedidoState.cp || getEl('codigoPostal')?.value || ''} - ${pedidoState.poblacion || getEl('poblacion')?.value || ''}`;
    }
  } else {
    if (dirContainer) dirContainer.classList.add('hidden');
  }

  const comentariosEl = getEl('resumen-comentarios');
  if (comentariosEl) {
    comentariosEl.textContent = getEl('comentarios')?.value?.trim() || 'Sin comentarios';
  }

  const totalEl = getEl('resumen-total');
  if (totalEl) totalEl.textContent = pedidoState.totalEstimado || 0;
}

// ────────────────────────────────────────────────
// Inicialización del wizard
// ────────────────────────────────────────────────
export function initPedidoWizard() {
  getEl('nextStep')?.addEventListener('click', siguientePaso);
  getEl('prevStep')?.addEventListener('click', anteriorPaso);

  mostrarPaso(1);
  console.log("Wizard de pedido inicializado");
}

export { calcularPrecio };

window.selectTarta = function(id) {
  pedidoState.productoId = id;
  pedidoState.producto = allProducts.find(p => p.id === id);
  pedidoState.tamanoSeleccionado = null; // reset tamaño

  // Resaltar tarjeta seleccionada
  qsa('.product-card').forEach(card => {
    card.classList.toggle('border-pink-600', card.getAttribute('onclick')?.includes(id));
    card.classList.toggle('bg-pink-50', card.getAttribute('onclick')?.includes(id));
  });

  // Repoblar select de tamaños si existe
  const tamSelect = getEl('tamanoTarta');
  if (tamSelect && pedidoState.producto?.sizes) {
    tamSelect.innerHTML = '<option value="">Selecciona tamaño</option>' +
      pedidoState.producto.sizes.map(s => `
        <option value="${s.name || s.size}">
          ${s.name || s.size} – ${s.price}€ (${s.servings || '?'} personas)
        </option>
      `).join('');
  }

  calcularPrecio();
  console.log(`Tarta seleccionada: ${id}`);
};

// Listener para el formulario completo (submit)
const orderForm = getEl('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Validar datos básicos del cliente
    if (!pedidoState.nombreCliente || !pedidoState.emailCliente || !pedidoState.telefonoCliente) {
      alert("Por favor completa tus datos de contacto (nombre, email y teléfono).");
      return;
    }

    if (!pedidoState.fechaEntrega) {
      alert("Selecciona una fecha de entrega / recogida.");
      return;
    }

    // Recoger todos los datos
    const orderData = {
      tipo: pedidoState.tipo,
      producto: pedidoState.producto?.name || 'Personalizado',
      cantidad: pedidoState.cantidad,
      tamano: pedidoState.tamanoSeleccionado,
      temaOcasión: getEl('temaOcasión')?.value || '',
      comentarioTema: getEl('temaOtro')?.value || '',
      extras: pedidoState.extras.map(e => e.nombre).join(', '),
      comentarioVelas: pedidoState.comentarioVelas || '',
      tipoEntrega: pedidoState.tipoEntrega,
      direccion: pedidoState.tipoEntrega === 'domicilio' ? pedidoState.direccion : 'Recogida en tienda',
      cp: pedidoState.cp || '',
      poblacion: pedidoState.poblacion || '',
      fechaEntrega: pedidoState.fechaEntrega,
      franjaHoraria: pedidoState.franjaHoraria || '',
      horaEspecifica: pedidoState.horaEspecifica || '',
      nombreCliente: pedidoState.nombreCliente,
      emailCliente: pedidoState.emailCliente,
      telefonoCliente: pedidoState.telefonoCliente,
      comentarios: getEl('comentarios')?.value?.trim() || '',
      totalEstimado: pedidoState.totalEstimado
    };

    try {
      // Enviar con EmailJS (sustituye por tus credenciales reales)
      await emailjs.send(
        'service_tu_service_id',     // ← tu Service ID
        'template_tu_template_id',   // ← tu Template ID
        orderData,
        'tu_public_key'              // ← tu Public Key
      );

      // Mostrar éxito
      getEl('orderForm')?.classList.add('hidden');
      getEl('successMessage')?.classList.remove('hidden');
    } catch (err) {
      console.error("Error enviando pedido:", err);
      alert("Hubo un error al enviar el pedido. Inténtalo de nuevo o contáctanos por WhatsApp.");
    }
  });
}