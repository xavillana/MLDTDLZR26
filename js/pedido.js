// ===============================================
// BASE DE DATOS DE PRODUCTOS PARA EL FORMULARIO
// ===============================================

const formularioProducts = {
    // Tartas
    "marcos-no-me-tientes": {
        name: "Marcos No Me Tientes",
        category: "tartas",
        description: "Deliciosa tarta con capas de bizcocho y crema",
        basePrice: 25,
        emoji: "🍰",
        info: "Tarta clásica con bizcocho esponjoso y crema de mantequilla. Perfecta para cualquier ocasión."
    },
    "muerte-por-chocolate": {
        name: "Muerte por Chocolate",
        category: "tartas",
        description: "Intensa tarta de chocolate para los amantes del cacao",
        basePrice: 28,
        emoji: "🍫",
        info: "Tarta de chocolate intenso con varias capas de ganache y crema de cacao. Para los más chocolateros."
    },
    "unicornio-fantastico": {
        name: "Unicornio Fantástico",
        category: "tartas",
        description: "Tarta mágica con colores vibrantes y decoración especial",
        basePrice: 32,
        emoji: "🦄",
        info: "Tarta mágica con colores pastel y decoración temática de unicornio. ¡Perfecta para cumpleaños!"
    },
    "naranja-que-cacao": {
        name: "Naranja que Cacao",
        category: "tartas",
        description: "Perfecta combinación de naranja fresca y chocolate",
        basePrice: 26,
        emoji: "🍊",
        info: "Combinación perfecta de naranja fresca y chocolate negro. Un clásico con toque moderno."
    },
    "tia-misu": {
        name: "Tía Misú",
        category: "tartas",
        description: "Inspirada en el clásico tiramisú italiano",
        basePrice: 27,
        emoji: "☕",
        info: "Nuestra versión del tiramisú italiano con bizcocho de café y crema mascarpone."
    },
    "revolcon-fresnata": {
        name: "Revolcón con Fresnata",
        category: "tartas",
        description: "Tarta fresca con nata y fresas naturales",
        basePrice: 24,
        emoji: "🍓",
        info: "Tarta ligera con nata montada y fresas frescas. Refrescante y perfecta para primavera/verano."
    },
    
    // Cheesecakes
    "que-lo-bailes": {
        name: "Que lo Bailes",
        category: "cheesecakes",
        description: "Cheesecake con deliciosos frutos rojos",
        basePrice: 23,
        emoji: "💃",
        info: "Cheesecake cremoso con salsa de frutos rojos. ¡Te hará bailar de gusto!"
    },
    "mangotero": {
        name: "Mangotero",
        category: "cheesecakes",
        description: "Cheesecake tropical con mango fresco",
        basePrice: 25,
        emoji: "🥭",
        info: "Cheesecake tropical con mango fresco y un toque de coco. Sabor veraniego garantizado."
    },
    "limon-ileso": {
        name: "Limón Ileso",
        category: "cheesecakes",
        description: "Cheesecake cítrico con limón natural",
        basePrice: 22,
        emoji: "🍋",
        info: "Cheesecake cítrico y refrescante con limón natural. Perfecto para los amantes de lo ácido."
    },
    "tradicional": {
        name: "Tradicional",
        category: "cheesecakes",
        description: "El clásico cheesecake de toda la vida",
        basePrice: 20,
        emoji: "👵",
        info: "El clásico cheesecake estilo Nueva York. Simple, cremoso y delicioso."
    },
    "cacao-late": {
        name: "Cacao Late",
        category: "cheesecakes",
        description: "Cheesecake intenso de chocolate y cacao",
        basePrice: 26,
        emoji: "🤎",
        info: "Cheesecake de chocolate intenso con base de galleta de chocolate. Para los más golosos."
    },
    "que-hore-oes": {
        name: "Que Hore Oes?",
        category: "cheesecakes",
        description: "Cheesecake con galletas Oreo crujientes",
        basePrice: 24,
        emoji: "🍪",
        info: "Cheesecake con galletas Oreo en la base y trocitos dentro. ¡Irresistible!"
    }
};

// Sabores de cupcakes
const cupcakeFlavors = [
    { id: "vainilla", name: "Vainilla", price: 2.5, emoji: "🌱" },
    { id: "chocolate", name: "Chocolate", price: 3, emoji: "🍫" },
    { id: "red-velvet", name: "Red Velvet", price: 3.5, emoji: "❤️" },
    { id: "limon", name: "Limón", price: 2.8, emoji: "🍋" },
    { id: "fresa", name: "Fresa", price: 3, emoji: "🍓" },
    { id: "cookies-cream", name: "Cookies & Cream", price: 3.2, emoji: "🍪" },
    { id: "caramelo", name: "Caramelo Salado", price: 3.3, emoji: "🍯" },
    { id: "coco", name: "Coco", price: 2.9, emoji: "🥥" }
];

// Precios por tamaño de tarta
const tamañoPrecios = {
    "pequena": { base: 25, max: 30, personas: "6-8" },
    "mediana": { base: 35, max: 42, personas: "10-12" },
    "grande": { base: 45, max: 52, personas: "15-20" },
    "xl": { base: 55, max: 62, personas: "25+" }
};

// ===============================================
// VARIABLES GLOBALES
// ===============================================

let selectedProduct = null;
let selectedSize = null;
let selectedFlavors = [];
let totalPrice = 0;

// ===============================================
// INICIALIZACIÓN
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Establecer fecha mínima como mañana
    const fechaInput = document.getElementById('fechaEntrega');
    if (fechaInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        fechaInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Inicializar formulario
    initForm();
    
    // Cerrar mensaje de éxito
    document.getElementById('successMessage').style.display = 'none';
});

function initForm() {
    // Limpiar selecciones
    selectedProduct = null;
    selectedSize = null;
    selectedFlavors = [];
    totalPrice = 0;
    
    // Calcular precio inicial
    calculatePrice();
}

// ===============================================
// TOGGLE DE SECCIONES
// ===============================================

function toggleProductOptions() {
    const tartasSection = document.getElementById('tartasSection');
    const cupcakesSection = document.getElementById('cupcakesSection');
    const personalizadoSection = document.getElementById('personalizadoSection');
    
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    
    // Ocultar todas las secciones
    tartasSection.classList.add('hidden');
    cupcakesSection.classList.add('hidden');
    personalizadoSection.classList.add('hidden');
    
    // Mostrar la sección correspondiente
    if (tipoProducto) {
        switch(tipoProducto.value) {
            case 'tartas-cheesecakes':
                tartasSection.classList.remove('hidden');
                break;
            case 'cupcakes':
                cupcakesSection.classList.remove('hidden');
                updateFlavorOptions();
                break;
            case 'personalizado':
                personalizadoSection.classList.remove('hidden');
                break;
        }
    }
    
    // Calcular precio
    calculatePrice();
}

// ===============================================
// SELECCIÓN DE PRODUCTOS
// ===============================================

function selectProduct(productId) {
    selectedProduct = formularioProducts[productId];
    
    // Marcar el radio button correspondiente
    const radioBtn = document.querySelector(`input[name="tartaSeleccionada"][value="${productId}"]`);
    if (radioBtn) {
        radioBtn.checked = true;
        
        // Añadir clase de selección a la tarjeta
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('border-pink-500', 'bg-pink-50');
            card.classList.add('border-gray-200');
        });
        
        const card = radioBtn.closest('.product-card');
        if (card) {
            card.classList.remove('border-gray-200');
            card.classList.add('border-pink-500', 'bg-pink-50');
        }
    }
    
    calculatePrice();
}

// ===============================================
// GESTIÓN DE CUPCAKES
// ===============================================

function updateFlavorOptions() {
    const cantidadSelect = document.getElementById('cantidadCupcakes');
    const cantidadPersonalizada = document.getElementById('cantidadPersonalizada');
    const flavorsContainer = document.getElementById('flavorsContainer');
    const flavorLabel = document.getElementById('flavorLabel');
    
    if (cantidadSelect.value === 'otro') {
        cantidadPersonalizada.classList.remove('hidden');
        return;
    } else {
        cantidadPersonalizada.classList.add('hidden');
    }
    
    const cantidad = cantidadSelect.value ? parseInt(cantidadSelect.value) : 0;
    
    if (cantidad === 0) {
        flavorLabel.textContent = 'Sabores (selecciona la cantidad primero)';
        flavorsContainer.innerHTML = '';
        return;
    }
    
    // Actualizar label
    flavorLabel.textContent = `Elige los sabores para tus ${cantidad} cupcakes:`;
    
    // Generar selectores de sabores
    flavorsContainer.innerHTML = '';
    
    for (let i = 0; i < cantidad; i++) {
        const select = document.createElement('select');
        select.className = 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base mb-2';
        select.name = `flavor${i}`;
        select.dataset.index = i;
        select.innerHTML = '<option value="">Seleccionar sabor</option>';
        select.onchange = calculatePrice;
        
        cupcakeFlavors.forEach(flavor => {
            select.innerHTML += `<option value="${flavor.id}">${flavor.emoji} ${flavor.name} (+${flavor.price.toFixed(2)}€)</option>`;
        });
        
        const div = document.createElement('div');
        div.className = 'mb-2';
        div.innerHTML = `<label class="block text-xs text-gray-600 mb-1">Cupcake ${i + 1}:</label>`;
        div.appendChild(select);
        flavorsContainer.appendChild(div);
    }
    
    calculatePrice();
}

// ===============================================
// TOGGLE DIRECCIÓN
// ===============================================

function toggleDireccionSection() {
    const tipoEntrega = document.getElementById('tipoEntrega');
    const direccionSection = document.getElementById('direccionSection');
    
    if (tipoEntrega.value === 'domicilio') {
        direccionSection.classList.remove('hidden');
    } else {
        direccionSection.classList.add('hidden');
    }
}

// ===============================================
// CÁLCULO DE PRECIO
// ===============================================

function calculatePrice() {
    const priceCalculator = document.getElementById('priceCalculator');
    const priceBreakdown = document.getElementById('priceBreakdown');
    const totalPriceElement = document.getElementById('totalPrice');
    
    let breakdown = [];
    totalPrice = 0;
    
    // Obtener tipo de producto seleccionado
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    
    if (!tipoProducto) {
        priceCalculator.classList.add('hidden');
        return;
    }
    
    priceCalculator.classList.remove('hidden');
    
    switch(tipoProducto.value) {
        case 'tartas-cheesecakes':
            calculateTartaPrice(breakdown);
            break;
        case 'cupcakes':
            calculateCupcakePrice(breakdown);
            break;
        case 'personalizado':
            calculatePersonalizadoPrice(breakdown);
            break;
    }
    
    // Añadir coste de entrega
    const tipoEntrega = document.getElementById('tipoEntrega');
    if (tipoEntrega.value === 'domicilio') {
        breakdown.push({ label: 'Entrega a domicilio', price: 5 });
        totalPrice += 5;
    }
    
    // Añadir coste por texto personalizado
    const texto = document.getElementById('texto');
    if (texto.value.trim() !== '') {
        breakdown.push({ label: 'Texto personalizado', price: 3 });
        totalPrice += 3;
    }
    
    // Actualizar desglose
    priceBreakdown.innerHTML = '';
    breakdown.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flex justify-between py-1 border-b border-gray-100';
        div.innerHTML = `
            <span>${item.label}</span>
            <span class="font-medium">${item.price}€</span>
        `;
        priceBreakdown.appendChild(div);
    });
    
    // Mostrar total
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}€`;
}

function calculateTartaPrice(breakdown) {
    if (!selectedProduct) return;
    
    const tamañoSelect = document.getElementById('tamanoTarta');
    const tamañoValue = tamañoSelect.value;
    
    if (!tamañoValue) return;
    
    selectedSize = tamañoPrecios[tamañoValue];
    const price = selectedProduct.basePrice + selectedSize.base;
    
    breakdown.push({ 
        label: `${selectedProduct.name}`, 
        price: selectedProduct.basePrice 
    });
    breakdown.push({ 
        label: `Tamaño ${tamañoValue.charAt(0).toUpperCase() + tamañoValue.slice(1)} (${selectedSize.personas})`, 
        price: selectedSize.base 
    });
    
    totalPrice = price;
}

function calculateCupcakePrice(breakdown) {
    const cantidadSelect = document.getElementById('cantidadCupcakes');
    let cantidad = 0;
    
    if (cantidadSelect.value === 'otro') {
        const cantidadInput = document.getElementById('cantidadOtra');
        cantidad = parseInt(cantidadInput.value) || 0;
    } else {
        cantidad = parseInt(cantidadSelect.value) || 0;
    }
    
    if (cantidad === 0) return;
    
    // Calcular precio base (2€ por cupcake)
    const basePrice = 2 * cantidad;
    breakdown.push({ label: `${cantidad} cupcakes base`, price: basePrice });
    totalPrice = basePrice;
    
    // Añadir precio por sabores seleccionados
    const flavorSelects = document.querySelectorAll('#flavorsContainer select');
    let flavorCost = 0;
    
    flavorSelects.forEach(select => {
        if (select.value) {
            const flavor = cupcakeFlavors.find(f => f.id === select.value);
            if (flavor) {
                flavorCost += flavor.price - 2; // Restar precio base ya incluido
                breakdown.push({ 
                    label: `→ Sabor ${flavor.name}`, 
                    price: flavor.price - 2 
                });
            }
        }
    });
    
    totalPrice += flavorCost;
}

function calculatePersonalizadoPrice(breakdown) {
    const personas = document.getElementById('personasPersonalizado');
    let numPersonas = parseInt(personas.value) || 0;
    
    if (numPersonas === 0) return;
    
    // Precio base según número de personas
    let basePrice = 0;
    if (numPersonas <= 8) {
        basePrice = 30;
    } else if (numPersonas <= 12) {
        basePrice = 40;
    } else if (numPersonas <= 20) {
        basePrice = 50;
    } else {
        basePrice = 60;
    }
    
    breakdown.push({ label: `Pedido personalizado (${numPersonas} personas)`, price: basePrice });
    totalPrice = basePrice;
    
    // Añadir extras por decoraciones
    const decoraciones = document.querySelectorAll('input[name="decoracionPersonalizada"]:checked');
    decoraciones.forEach(decor => {
        breakdown.push({ label: `→ ${getDecoracionName(decor.value)}`, price: 5 });
        totalPrice += 5;
    });
}

function getDecoracionName(value) {
    const names = {
        'flores-azucar': 'Flores de azúcar',
        'figuras-fondant': 'Figuras de fondant',
        'perlas-comestibles': 'Perlas comestibles',
        'purpurina-comestible': 'Purpurina comestible',
        'frutas-frescas': 'Frutas frescas',
        'chocolate-decorativo': 'Chocolate decorativo'
    };
    return names[value] || value;
}

// ===============================================
// MODAL DE PRODUCTO
// ===============================================

function openProductModal(productId) {
    const product = formularioProducts[productId];
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = `${product.emoji} ${product.name}`;
    
    modalContent.innerHTML = `
        <div class="space-y-4">
            <div class="bg-linear-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                <p class="text-gray-700">${product.info}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white border border-gray-200 p-3 rounded-lg">
                    <h4 class="font-bold text-gray-700 mb-1">💵 Precio Base</h4>
                    <p class="text-lg font-semibold text-pink-600">${product.basePrice}€</p>
                </div>
                <div class="bg-white border border-gray-200 p-3 rounded-lg">
                    <h4 class="font-bold text-gray-700 mb-1">👥 Categoría</h4>
                    <p class="text-gray-600">${product.category === 'tartas' ? 'Tarta' : 'Cheesecake'}</p>
                </div>
            </div>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h4 class="font-bold text-gray-700 mb-1">📝 Notas importantes</h4>
                <ul class="text-sm text-gray-600 list-disc pl-4 space-y-1">
                    <li>Este precio es base, varía según tamaño</li>
                    <li>Se necesita al menos 24h de antelación</li>
                    <li>Consultar disponibilidad para fechas especiales</li>
                </ul>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// ===============================================
// ENVÍO DEL FORMULARIO
// ===============================================

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar campos obligatorios
    if (!validateForm()) {
        return;
    }
    
    // Recopilar datos del formulario
    const formData = collectFormData();
    
    // Mostrar mensaje de éxito
    showSuccessMessage(formData);
    
    // Aquí normalmente enviarías los datos al servidor
    // sendToServer(formData);
    
    // Resetear formulario
    setTimeout(() => {
        resetForm();
    }, 3000);
});

function validateForm() {
    const requiredFields = [
        { id: 'nombre', name: 'Nombre completo' },
        { id: 'telefono', name: 'Teléfono' },
        { id: 'email', name: 'Email' },
        { id: 'fechaEntrega', name: 'Fecha de entrega' }
    ];
    
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            alert(`Por favor, completa el campo: ${field.name}`);
            element.focus();
            return false;
        }
    }
    
    // Validar tipo de producto seleccionado
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    if (!tipoProducto) {
        alert('Por favor, selecciona un tipo de producto');
        return false;
    }
    
    // Validaciones específicas por tipo
    switch(tipoProducto.value) {
        case 'tartas-cheesecakes':
            const tartaSeleccionada = document.querySelector('input[name="tartaSeleccionada"]:checked');
            const tamaño = document.getElementById('tamanoTarta').value;
            if (!tartaSeleccionada) {
                alert('Por favor, selecciona una tarta o cheesecake');
                return false;
            }
            if (!tamaño) {
                alert('Por favor, selecciona un tamaño');
                return false;
            }
            break;
            
        case 'cupcakes':
            const cantidad = document.getElementById('cantidadCupcakes').value;
            if (!cantidad) {
                alert('Por favor, selecciona una cantidad de cupcakes');
                return false;
            }
            break;
    }
    
    return true;
}

function collectFormData() {
    const formData = {
        fecha: new Date().toISOString(),
        precioTotal: totalPrice
    };
    
    // Información personal
    formData.nombre = document.getElementById('nombre').value;
    formData.telefono = document.getElementById('telefono').value;
    formData.email = document.getElementById('email').value;
    
    // Tipo de producto
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    formData.tipoProducto = tipoProducto ? tipoProducto.value : '';
    
    // Datos específicos por tipo
    if (tipoProducto.value === 'tartas-cheesecakes') {
        const tartaSeleccionada = document.querySelector('input[name="tartaSeleccionada"]:checked');
        formData.producto = tartaSeleccionada ? tartaSeleccionada.value : '';
        formData.tamaño = document.getElementById('tamanoTarta').value;
    } else if (tipoProducto.value === 'cupcakes') {
        formData.cantidad = document.getElementById('cantidadCupcakes').value;
        if (formData.cantidad === 'otro') {
            formData.cantidadPersonalizada = document.getElementById('cantidadOtra').value;
        }
    }
    
    // Personalización
    formData.tema = document.getElementById('tema').value;
    formData.texto = document.getElementById('texto').value;
    formData.comentarios = document.getElementById('comentarios').value;
    
    // Entrega
    formData.fechaEntrega = document.getElementById('fechaEntrega').value;
    formData.horaEntrega = document.getElementById('horaEntrega').value;
    formData.tipoEntrega = document.getElementById('tipoEntrega').value;
    if (formData.tipoEntrega === 'domicilio') {
        formData.direccion = document.getElementById('direccion').value;
    }
    
    return formData;
}

function showSuccessMessage(formData) {
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('orderForm');
    
    // Ocultar formulario
    form.style.display = 'none';
    
    // Mostrar mensaje de éxito
    successMessage.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Log para depuración (en producción, enviarías esto a un servidor)
    console.log('Pedido enviado:', formData);
    console.log('Precio total estimado:', totalPrice.toFixed(2) + '€');
}

function resetForm() {
    const form = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    
    // Resetear formulario
    form.reset();
    form.style.display = 'block';
    
    // Ocultar mensaje de éxito
    successMessage.style.display = 'none';
    
    // Resetear variables
    initForm();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===============================================
// CERRAR MODAL CON ESCAPE
// ===============================================

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('productModal');
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeProductModal();
    }
});