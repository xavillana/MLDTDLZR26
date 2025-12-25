// ===============================================
// CONFIGURACIONES Y CONSTANTES
// ===============================================

const CONFIG = {
    EMAILJS: {
        publicKey: 'bvwZyIlaHy325gIzp',
        serviceId: 'service_a1r8kaa',
        templateId: 'Pedidos_template',
        templateIdCliente: 'template_confirmacion_cliente',
        adminEmail: 'pedidos@malditadulzura.com'
    },
    PRECIOS: {
        tartas: {
            'marcos-no-me-tientes': { pequena: 25, mediana: 35, grande: 45, xl: 55 },
            'muerte-por-chocolate': { pequena: 25, mediana: 35, grande: 45, xl: 55 },
            'unicornio-fantastico': { pequena: 30, mediana: 40, grande: 50, xl: 60 },
            'naranja-que-cacao': { pequena: 25, mediana: 35, grande: 45, xl: 55 },
            'tia-misu': { pequena: 28, mediana: 38, grande: 48, xl: 58 },
            'revolcon-fresnata': { pequena: 26, mediana: 36, grande: 46, xl: 56 }
        },
        cheesecakes: {
            'que-lo-bailes': { pequena: 30, mediana: 40, grande: 50, xl: 60 },
            'mangotero': { pequena: 32, mediana: 42, grande: 52, xl: 62 },
            'limon-ileso': { pequena: 28, mediana: 38, grande: 48, xl: 58 },
            'tradicional': { pequena: 26, mediana: 36, grande: 46, xl: 56 },
            'cacao-late': { pequena: 30, mediana: 40, grande: 50, xl: 60 },
            'que-hore-oes': { pequeña: 32, mediana: 42, grande: 52, xl: 62 }
        },
        cupcakes: {
            'rojo-peligroso': 3.5,
            'zanahoria': 3.5,
            'pensamiento-citrico': 3.8,
            'choco-bailes': 3.5,
            'yogurt-salvaje': 3.8,
            'crimen-cuqui': 4.0
        },
        extras: {
            entregaDomicilio: 5,
            decoracionEspecial: 10,
            textoPersonalizado: 5
        }
    },
    PRODUCTOS_INFO: {
        tartas: {
            'marcos-no-me-tientes': 'Tarta Marcos No Me Tientes',
            'muerte-por-chocolate': 'Muerte por Chocolate',
            'unicornio-fantastico': 'Unicornio Fantástico',
            'naranja-que-cacao': 'Naranja que Cacao',
            'tia-misu': 'Tía Misú',
            'revolcon-fresnata': 'Revolcón Fresnata'
        },
        cheesecakes: {
            'que-lo-bailes': 'Que lo Bailes',
            'mangotero': 'Mangotero',
            'limon-ileso': 'Limón Ileso',
            'tradicional': 'Tradicional',
            'cacao-late': 'Cacao Late',
            'que-hore-oes': 'Que Hore Oes'
        },
        cupcakes: {
            'rojo-peligroso': 'Red Velvet (Rojo Peligroso)',
            'zanahoria': 'Zanahoria',
            'pensamiento-citrico': 'Pensamiento Cítrico',
            'choco-bailes': 'Choco Bailes',
            'yogurt-salvaje': 'Yogurt Salvaje',
            'crimen-cuqui': 'Crimen Cuqui'
        }
    }
};

// ===============================================
// INICIALIZACIÓN DE EMAILJS
// ===============================================

emailjs.init(CONFIG.EMAILJS.publicKey);

// ===============================================
// ELEMENTOS DEL DOM
// ===============================================

const form = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');
const totalPriceEl = document.getElementById('totalPrice');

// ===============================================
// FUNCIONES AUXILIARES
// ===============================================

function calculateTotal() {
    let total = 0;

    // Producto principal
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked')?.value;
    if (tipoProducto === 'tartas-cheesecakes') {
        const producto = document.querySelector('input[name="productoPrincipal"]:checked')?.value;
        const tamaño = document.querySelector('input[name="tamano"]:checked')?.value;
        if (producto && tamaño) {
            const categoria = producto.includes('cheesecake') ? 'cheesecakes' : 'tartas';
            const precios = CONFIG.PRECIOS[categoria][producto.replace('-cheesecake', '')];
            total += precios[tamaño] || 0;
        }
    } else if (tipoProducto === 'cupcakes') {
        const cantidad = parseInt(document.getElementById('cantidadCupcakes')?.value) || 0;
        const sabor = document.querySelector('input[name="saborCupcake"]:checked')?.value;
        if (sabor && cantidad > 0) {
            const precioUnitario = CONFIG.PRECIOS.cupcakes[sabor];
            total += precioUnitario * cantidad;
        }
    }

    // Extras
    if (document.getElementById('entregaDomicilio')?.checked) total += CONFIG.PRECIOS.extras.entregaDomicilio;
    if (document.getElementById('decoracionEspecial')?.checked) total += CONFIG.PRECIOS.extras.decoracionEspecial;
    if (document.getElementById('textoPersonalizado')?.checked) total += CONFIG.PRECIOS.extras.textoPersonalizado;

    totalPriceEl.textContent = total.toFixed(2) + '€';
}

function toggleProductOptions() {
    const tipo = document.querySelector('input[name="tipoProducto"]:checked')?.value;
    document.getElementById('seccionTartasCheesecakes').classList.toggle('hidden', tipo !== 'tartas-cheesecakes');
    document.getElementById('seccionCupcakes').classList.toggle('hidden', tipo !== 'cupcakes');
    calculateTotal();
}

// ===============================================
// RECOLECCIÓN DE DATOS DEL FORMULARIO
// ===============================================

function collectFormData() {
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked')?.value || '';

    let productoInfo = '';
    let cantidadInfo = '';

    if (tipoProducto === 'tartas-cheesecakes') {
        const producto = document.querySelector('input[name="productoPrincipal"]:checked')?.value || '';
        const tamaño = document.querySelector('input[name="tamano"]:checked')?.value || '';
        const categoria = producto.includes('cheesecake') ? 'cheesecakes' : 'tartas';
        const nombreProducto = CONFIG.PRODUCTOS_INFO[categoria][producto.replace('-cheesecake', '')];
        productoInfo = `${nombreProducto} - Tamaño: ${tamaño.charAt(0).toUpperCase() + tamaño.slice(1)}`;
        cantidadInfo = '1 unidad';
    } else if (tipoProducto === 'cupcakes') {
        const sabor = document.querySelector('input[name="saborCupcake"]:checked')?.value || '';
        const cantidad = document.getElementById('cantidadCupcakes')?.value || '0';
        productoInfo = `${CONFIG.PRODUCTOS_INFO.cupcakes[sabor]}`;
        cantidadInfo = `${cantidad} unidades`;
    }

    const extras = [];
    if (document.getElementById('entregaDomicilio')?.checked) extras.push('Entrega a domicilio (+5€)');
    if (document.getElementById('decoracionEspecial')?.checked) extras.push('Decoración especial (+10€)');
    if (document.getElementById('textoPersonalizado')?.checked) extras.push('Texto personalizado (+5€)');

    return {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        fechaEntrega: document.getElementById('fechaEntrega').value,
        horaEntrega: document.getElementById('horaEntrega').value,
        tipoEntrega: document.getElementById('tipoEntrega').value,
        direccion: document.getElementById('direccion').value,
        tema: document.getElementById('tema').value,
        texto: document.getElementById('texto').value,
        comentarios: document.getElementById('comentarios').value,
        tipoProducto,
        productoInfo,
        cantidadInfo,
        extras: extras.join(', '),
        total: totalPriceEl.textContent
    };
}

// ===============================================
// ENVÍO DEL PEDIDO
// ===============================================

async function sendOrder() {
    const data = collectFormData();

    const templateParamsAdmin = {
        to_email: CONFIG.EMAILJS.adminEmail,
        cliente_nombre: data.nombre,
        cliente_telefono: data.telefono,
        cliente_email: data.email,
        fecha_entrega: data.fechaEntrega,
        hora_entrega: data.horaEntrega,
        tipo_entrega: data.tipoEntrega,
        direccion: data.direccion,
        producto: data.productoInfo,
        cantidad: data.cantidadInfo,
        tema: data.tema,
        texto: data.texto,
        extras: data.extras,
        comentarios: data.comentarios,
        total: data.total
    };

    const templateParamsCliente = {
        to_email: data.email,
        cliente_nombre: data.nombre,
        producto: data.productoInfo,
        cantidad: data.cantidadInfo,
        fecha_entrega: data.fechaEntrega,
        total: data.total
    };

    try {
        // Email al admin
        await emailjs.send(CONFIG.EMAILJS.serviceId, CONFIG.EMAILJS.templateId, templateParamsAdmin);

        // Email de confirmación al cliente
        await emailjs.send(CONFIG.EMAILJS.serviceId, CONFIG.EMAILJS.templateIdCliente, templateParamsCliente);

        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        alert('Hubo un error al enviar el pedido. Por favor, inténtalo de nuevo o contáctanos directamente.');
        return false;
    }
}

// ===============================================
// MANEJO DEL FORMULARIO
// ===============================================

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const success = await sendOrder();
    if (success) {
        localStorage.removeItem('malditadulzura_formState');
        form.reset();
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        totalPriceEl.textContent = '0€';
    }
});

// Actualizar precio en tiempo real
document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('change', () => {
        calculateTotal();
        saveState();
    });
});
document.getElementById('cantidadCupcakes')?.addEventListener('input', () => {
    calculateTotal();
    saveState();
});

// ===============================================
// PERSISTENCIA Y BACKUP
// ===============================================

function saveState() {
    try {
        const formData = collectFormData();
        localStorage.setItem('malditadulzura_formState', JSON.stringify(formData));
        console.log('💾 Estado guardado en localStorage');
    } catch (error) {
        console.warn('⚠️ No se pudo guardar el estado:', error);
    }
}

function loadSavedState() {
    try {
        const savedState = localStorage.getItem('malditadulzura_formState');
        if (!savedState) return;

        const state = JSON.parse(savedState);
        console.log('📂 Cargando estado guardado...');

        // Campos básicos
        document.getElementById('nombre').value = state.nombre || '';
        document.getElementById('telefono').value = state.telefono || '';
        document.getElementById('email').value = state.email || '';
        document.getElementById('fechaEntrega').value = state.fechaEntrega || '';
        document.getElementById('horaEntrega').value = state.horaEntrega || '';
        document.getElementById('tipoEntrega').value = state.tipoEntrega || '';
        document.getElementById('direccion').value = state.direccion || '';
        document.getElementById('tema').value = state.tema || '';
        document.getElementById('texto').value = state.texto || '';
        document.getElementById('comentarios').value = state.comentarios || '';

        // Tipo de producto
        if (state.tipoProducto) {
            const radio = document.querySelector(`input[name="tipoProducto"][value="${state.tipoProducto}"]`);
            if (radio) {
                radio.checked = true;
                toggleProductOptions();
            }
        }

        // Restaurar selecciones específicas si existen (puedes ampliar según necesites)
        calculateTotal();
    } catch (error) {
        console.warn('Error cargando estado guardado:', error);
    }
}

// Cargar estado al iniciar
document.addEventListener('DOMContentLoaded', loadSavedState);
