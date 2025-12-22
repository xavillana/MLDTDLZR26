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
            'que-hore-oes': { pequena: 32, mediana: 42, grande: 52, xl: 62 }
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
        'marcos-no-me-tientes': {
            nombre: 'Marcos No Me Tientes',
            tipo: 'Tarta',
            descripcion: 'Una deliciosa tarta con múltiples capas de bizcocho esponjoso y crema suave que te conquistará desde el primer bocado.',
            ingredientes: ['Bizcocho de vainilla', 'Crema pastelera', 'Nata montada', 'Fresas frescas', 'Azúcar', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 3-4 días.',
            notas: 'Perfecta para celebraciones familiares. Se puede personalizar con diferentes frutas de temporada.'
        },
        'muerte-por-chocolate': {
            nombre: 'Muerte por Chocolate',
            tipo: 'Tarta',
            descripcion: 'Una experiencia chocolatera intensa con capas de bizcocho de chocolate, ganache y cobertura de cacao puro.',
            ingredientes: ['Bizcocho de chocolate', 'Ganache de chocolate negro', 'Cacao en polvo', 'Chocolate negro 70%', 'Nata para montar', 'Azúcar moreno', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Puede contener frutos secos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 4-5 días.',
            notas: 'Ideal para los verdaderos amantes del chocolate. Intensidad de sabor garantizada.'
        },
        'unicornio-fantastico': {
            nombre: 'Unicornio Fantástico',
            tipo: 'Tarta',
            descripcion: 'Una tarta mágica con colores vibrantes, decoración especial y sabores que transportan a un mundo de fantasía.',
            ingredientes: ['Bizcocho arcoíris (varios colores)', 'Buttercream de vainilla', 'Colorantes alimentarios naturales', 'Purpurina comestible', 'Decoraciones de azúcar', 'Esencia de vainilla', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 3-4 días.',
            notas: 'Perfecta para fiestas infantiles y celebraciones especiales. Los colores pueden variar según disponibilidad.'
        },
        'naranja-que-cacao': {
            nombre: 'Naranja que Cacao',
            tipo: 'Tarta',
            descripcion: 'La perfecta armonía entre la frescura cítrica de la naranja y la intensidad del chocolate.',
            ingredientes: ['Bizcocho de naranja', 'Crema de chocolate', 'Zumo de naranja natural', 'Ralladura de naranja', 'Chocolate negro', 'Nata montada', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 3-4 días.',
            notas: 'Combinación única de sabores. Utilizamos naranjas de temporada para mayor frescura.'
        },
        'tia-misu': {
            nombre: 'Tía Misú',
            tipo: 'Tarta',
            descripcion: 'Nuestra versión del clásico tiramisú italiano, con capas de bizcocho empapado en café y crema de mascarpone.',
            ingredientes: ['Bizcocho de soletilla', 'Café expreso', 'Mascarpone', 'Nata montada', 'Cacao en polvo', 'Azúcar', 'Huevos', 'Licor de café (opcional)'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Puede contener alcohol'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 2-3 días.',
            notas: 'Versión sin alcohol disponible bajo petición. Mejor si se consume al día siguiente de su elaboración.'
        },
        'revolcon-fresnata': {
            nombre: 'Revolcón con Fresnata',
            tipo: 'Tarta',
            descripcion: 'Tarta fresca y ligera con nata montada y fresas naturales, perfecta para los días de calor.',
            ingredientes: ['Bizcocho de vainilla', 'Nata montada', 'Fresas frescas', 'Azúcar', 'Gelatina neutra', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 2-3 días.',
            notas: 'Las fresas son de temporada. En otras épocas se pueden sustituir por otras frutas del bosque.'
        },
        'que-lo-bailes': {
            nombre: 'Que lo Bailes',
            tipo: 'Cheesecake',
            descripcion: 'Cheesecake cremoso con una deliciosa cobertura de frutos rojos que te hará bailar de alegría.',
            ingredientes: ['Queso crema Philadelphia', 'Base de galletas digestive', 'Frutos rojos (arándanos, frambuesas, fresas)', 'Azúcar', 'Huevos', 'Nata agria', 'Mantequilla', 'Gelatina neutra'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 4-5 días.',
            notas: 'Los frutos rojos pueden variar según temporada. Textura extra cremosa garantizada.'
        },
        'mangotero': {
            nombre: 'Mangotero',
            tipo: 'Cheesecake',
            descripcion: 'Cheesecake tropical con mango fresco que te transportará a un paraíso de sabores exóticos.',
            ingredientes: ['Queso crema Philadelphia', 'Base de galletas de coco', 'Mango fresco', 'Pulpa de mango', 'Azúcar', 'Huevos', 'Nata agria', 'Mantequilla', 'Gelatina neutra'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Coco'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 3-4 días.',
            notas: 'Utilizamos mango de temporada para garantizar el mejor sabor. Disponible todo el año con mango congelado.'
        },
        'limon-ileso': {
            nombre: 'Limón Ileso',
            tipo: 'Cheesecake',
            descripcion: 'Cheesecake cítrico y refrescante con limón natural que despierta todos los sentidos.',
            ingredientes: ['Queso crema Philadelphia', 'Base de galletas maría', 'Zumo de limón natural', 'Ralladura de limón', 'Azúcar', 'Huevos', 'Nata agria', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 4-5 días.',
            notas: 'Utilizamos limones ecológicos para mayor intensidad de sabor. Perfecto para paladares que buscan frescura.'
        },
        'tradicional': {
            nombre: 'Tradicional',
            tipo: 'Cheesecake',
            descripcion: 'El clásico cheesecake de toda la vida, cremoso y suave, que nunca pasa de moda.',
            ingredientes: ['Queso crema Philadelphia', 'Base de galletas digestive', 'Azúcar', 'Huevos', 'Nata agria', 'Esencia de vainilla', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 5-6 días.',
            notas: 'La receta original que conquistó corazones. Simplicidad y perfección en cada bocado.'
        },
        'cacao-late': {
            nombre: 'Cacao Late',
            tipo: 'Cheesecake',
            descripcion: 'Cheesecake intenso de chocolate y cacao para los verdaderos amantes del chocolate.',
            ingredientes: ['Queso crema Philadelphia', 'Base de galletas oreo', 'Chocolate negro 70%', 'Cacao en polvo puro', 'Azúcar moreno', 'Huevos', 'Nata agria', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Puede contener frutos secos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 4-5 días.',
            notas: 'Doble intensidad de chocolate. Recomendado para auténticos chocolateros.'
        },
        'que-hore-oes': {
            nombre: 'Que Hore Oes?',
            tipo: 'Cheesecake',
            descripcion: 'Cheesecake con galletas Oreo crujientes que combina cremosidad y textura en cada bocado.',
            ingredientes: ['Queso crema Philadelphia', 'Galletas Oreo', 'Base de galletas oreo trituradas', 'Azúcar', 'Huevos', 'Nata agria', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Puede contener soja'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 4-5 días.',
            notas: 'Las galletas Oreo aportan el contraste perfecto de textura. Un clásico moderno irresistible.'
        },
        'rojo-peligroso': {
            nombre: 'Rojo Peligroso',
            tipo: 'Cupcake',
            descripcion: 'Cupcake de red velvet con su característico color rojo intenso y suave textura aterciopelada, coronado con frosting de queso crema.',
            ingredientes: ['Bizcocho red velvet', 'Colorante rojo natural', 'Cacao en polvo', 'Frosting de queso crema', 'Azúcar', 'Huevos', 'Harina de trigo', 'Mantequilla', 'Suero de leche'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en lugar fresco y seco. Consumir preferentemente en 2-3 días.',
            notas: 'El clásico red velvet americano. Su color rojo intenso lo hace perfecto para ocasiones especiales.'
        },
        'zanahoria': {
            nombre: 'Zanah\'oria',
            tipo: 'Cupcake',
            descripcion: 'Cupcake húmedo de zanahoria con especias aromáticas, coronado con frosting de queso crema y un toque de canela.',
            ingredientes: ['Zanahoria rallada fresca', 'Bizcocho especiado', 'Canela', 'Nuez moscada', 'Frosting de queso crema', 'Azúcar moreno', 'Huevos', 'Harina de trigo', 'Aceite vegetal'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Puede contener frutos secos'],
            conservacion: 'Conservar en lugar fresco y seco. Consumir preferentemente en 3-4 días.',
            notas: 'Rico en zanahoria fresca y especias naturales. Una opción más saludable sin renunciar al sabor.'
        },
        'pensamiento-citrico': {
            nombre: 'Pensamiento Cítrico',
            tipo: 'Cupcake',
            descripcion: 'Cupcake refrescante con una mezcla perfecta de limón y naranja, coronado con buttercream cítrico que despierta los sentidos.',
            ingredientes: ['Bizcocho de limón y naranja', 'Zumo de limón natural', 'Zumo de naranja natural', 'Ralladura cítrica', 'Buttercream cítrico', 'Azúcar', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en lugar fresco y seco. Consumir preferentemente en 2-3 días.',
            notas: 'Perfecto para los amantes de los sabores cítricos. Ideal para días calurosos por su frescura.'
        },
        'choco-bailes': {
            nombre: 'Choco Bailes',
            tipo: 'Cupcake',
            descripcion: 'Cupcake intenso de chocolate negro con buttercream de chocolate que hará bailar tus papilas gustativas.',
            ingredientes: ['Bizcocho de chocolate negro', 'Cacao en polvo puro', 'Chocolate negro 70%', 'Buttercream de chocolate', 'Azúcar moreno', 'Huevos', 'Harina de trigo', 'Mantequilla'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos', 'Puede contener frutos secos'],
            conservacion: 'Conservar en lugar fresco y seco. Consumir preferentemente en 3-4 días.',
            notas: 'Para los verdaderos amantes del chocolate. Doble intensidad de cacao garantizada.'
        },
        'yogurt-salvaje': {
            nombre: 'Yogurt Salvaje',
            tipo: 'Cupcake',
            descripcion: 'Cupcake esponjoso de yogurt natural con frutos del bosque frescos y frosting ligero de yogurt.',
            ingredientes: ['Bizcocho de yogurt natural', 'Frutos del bosque (arándanos, frambuesas)', 'Yogurt griego', 'Frosting de yogurt', 'Miel natural', 'Huevos', 'Harina de trigo', 'Aceite de oliva suave'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en refrigeración entre 2-4°C. Consumir preferentemente en 2-3 días.',
            notas: 'Opción más ligera y saludable. Los frutos del bosque aportan antioxidantes naturales.'
        },
        'crimen-cuqui': {
            nombre: 'Crimen Cuqui',
            tipo: 'Cupcake',
            descripcion: 'Cupcake premium de vainilla bourbon con decoración artesanal especial que lo convierte en una pequeña obra de arte.',
            ingredientes: ['Bizcocho de vainilla bourbon', 'Vainilla natural de Madagascar', 'Buttercream suizo', 'Decoraciones comestibles artesanales', 'Azúcar', 'Huevos', 'Harina de trigo premium', 'Mantequilla francesa'],
            alergenos: ['Gluten', 'Huevos', 'Lácteos'],
            conservacion: 'Conservar en lugar fresco y seco. Consumir preferentemente en 2-3 días.',
            notas: 'Nuestro cupcake más premium. Cada uno es decorado individualmente a mano con técnicas artesanales.'
        }
    },
    CUPCAKE_FLAVORS: [
        { id: 'rojo-peligroso', name: 'Rojo Peligroso', price: 3.5 },
        { id: 'zanahoria', name: 'Zanahoria', price: 3.5 },
        { id: 'pensamiento-citrico', name: 'Pensamiento Cítrico', price: 3.8 },
        { id: 'choco-bailes', name: 'Choco Bailes', price: 3.5 },
        { id: 'yogurt-salvaje', name: 'Yogurt Salvaje', price: 3.8 },
        { id: 'crimen-cuqui', name: 'Crimen Cuqui', price: 4.0 }
    ]
};

// ===============================================
// VARIABLES GLOBALES
// ===============================================

let currentOrder = {
    tipoProducto: null,
    tarta: null,
    cupcakes: null,
    personalizado: null,
    personalizacion: {},
    entrega: {},
    precioTotal: 0
};

// ===============================================
// INICIALIZACIÓN
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Inicializando formulario de pedidos...');
    
    // Configurar fecha mínima (mañana)
    const fechaInput = document.getElementById('fechaEntrega');
    if (fechaInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        fechaInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Inicializar EmailJS
    initEmailJS();
    
    // Inicializar event listeners
    initEventListeners();
    
    // Cargar estado guardado si existe
    loadSavedState();
    
    // Ocultar mensaje de éxito inicialmente
    document.getElementById('successMessage').style.display = 'none';
    
    console.log('✅ Formulario inicializado correctamente');
});

// ===============================================
// INICIALIZACIÓN DE EMAILJS
// ===============================================

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(CONFIG.EMAILJS.publicKey);
        console.log('📧 EmailJS inicializado correctamente');
        return true;
    } else {
        console.warn('⚠️ EmailJS no está cargado. Asegúrate de incluir el script de EmailJS.');
        return false;
    }
}

// ===============================================
// MANEJO DE EVENTOS
// ===============================================

function initEventListeners() {
    // Smooth scroll para navegación
    initSmoothScroll();
    
    // Event listeners para tipo de producto
    document.querySelectorAll('input[name="tipoProducto"]').forEach(radio => {
        radio.addEventListener('change', toggleProductOptions);
    });
    
    // Event listeners para tartas/cheesecakes
    document.querySelectorAll('input[name="tartaSeleccionada"]').forEach(radio => {
        radio.addEventListener('change', handleTartaSelection);
    });
    
    // Event listeners para cupcakes
    document.getElementById('cantidadCupcakes').addEventListener('change', updateFlavorOptions);
    document.getElementById('cantidadOtra')?.addEventListener('input', updateFlavorOptions);
    
    // Event listeners para personalizado
    document.querySelectorAll('input[name="formatoPersonalizado"], input[name="tamanoPersonalizado"], input[name="bizcochoPersonalizado"], input[name="rellenoPersonalizado"], input[name="coberturaPersonalizada"]').forEach(input => {
        input.addEventListener('change', calculatePrice);
    });
    
    // Event listeners para decoración personalizada
    document.querySelectorAll('input[name="decoracionPersonalizada"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculatePrice);
    });
    
    // Event listeners para campos generales
    document.getElementById('tamanoTarta').addEventListener('change', calculatePrice);
    document.getElementById('personasPersonalizado').addEventListener('input', calculatePrice);
    document.getElementById('presupuestoPersonalizado').addEventListener('input', calculatePrice);
    document.getElementById('texto').addEventListener('input', calculatePrice);
    document.getElementById('tipoEntrega').addEventListener('change', toggleDireccionSection);
    
    // Event listener para el formulario
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleFormSubmit);
        
        // Guardar estado automáticamente
        orderForm.addEventListener('input', debounce(saveState, 1000));
    }
    
    // Event listeners para el modal
    document.getElementById('productModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
    
    // Inicializar botones de info de productos
    initProductInfoButtons();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initProductInfoButtons() {
    // Los botones de info se inicializan en las funciones de creación dinámica
}

// ===============================================
// FUNCIONES DE INTERFAZ DE USUARIO
// ===============================================

function toggleProductOptions() {
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    const tartasSection = document.getElementById('tartasSection');
    const cupcakesSection = document.getElementById('cupcakesSection');
    const personalizadoSection = document.getElementById('personalizadoSection');
    
    // Ocultar todas las secciones
    tartasSection.classList.add('hidden');
    cupcakesSection.classList.add('hidden');
    personalizadoSection.classList.add('hidden');
    
    // Guardar tipo de producto
    currentOrder.tipoProducto = tipoProducto ? tipoProducto.value : null;
    
    // Mostrar sección correspondiente
    if (tipoProducto) {
        if (tipoProducto.value === 'tartas-cheesecakes') {
            tartasSection.classList.remove('hidden');
        } else if (tipoProducto.value === 'cupcakes') {
            cupcakesSection.classList.remove('hidden');
            updateFlavorOptions();
        } else if (tipoProducto.value === 'personalizado') {
            personalizadoSection.classList.remove('hidden');
        }
    }
    
    // Actualizar precio
    calculatePrice();
}

function handleTartaSelection() {
    const tartaSeleccionada = document.querySelector('input[name="tartaSeleccionada"]:checked');
    if (tartaSeleccionada) {
        selectProduct(tartaSeleccionada.value);
    }
}

function selectProduct(productValue) {
    const radioButton = document.querySelector(`input[name="tartaSeleccionada"][value="${productValue}"]`);
    if (radioButton) {
        radioButton.checked = true;
        
        // Actualizar estilo visual
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.remove('border-pink-500', 'bg-pink-50');
            card.classList.add('border-gray-200');
        });
        
        const selectedCard = radioButton.closest('.product-card');
        if (selectedCard) {
            selectedCard.classList.remove('border-gray-200');
            selectedCard.classList.add('border-pink-500', 'bg-pink-50');
        }
        
        // Guardar selección
        currentOrder.tarta = {
            tipo: productValue,
            tamano: document.getElementById('tamanoTarta').value
        };
        
        calculatePrice();
    }
}

function updateFlavorOptions() {
    const cantidadSelect = document.getElementById('cantidadCupcakes');
    const cantidadPersonalizada = document.getElementById('cantidadPersonalizada');
    const cantidadOtra = document.getElementById('cantidadOtra')?.value || '';
    const flavorLabel = document.getElementById('flavorLabel');
    const flavorsContainer = document.getElementById('flavorsContainer');
    
    // Mostrar/ocultar campo de cantidad personalizada
    if (cantidadSelect.value === 'otro') {
        cantidadPersonalizada.classList.remove('hidden');
    } else {
        cantidadPersonalizada.classList.add('hidden');
    }
    
    // Determinar cantidad
    let cantidad = 0;
    if (cantidadSelect.value === 'otro' && cantidadOtra) {
        cantidad = parseInt(cantidadOtra);
    } else if (cantidadSelect.value && cantidadSelect.value !== 'otro') {
        cantidad = parseInt(cantidadSelect.value);
    }
    
    // Calcular límite de sabores
    const flavorLimits = { 6: 1, 12: 2, 24: 4 };
    let maxFlavors = 0;
    
    if (cantidad) {
        if (flavorLimits[cantidad]) {
            maxFlavors = flavorLimits[cantidad];
        } else {
            maxFlavors = Math.min(6, Math.ceil(cantidad / 6));
        }
    }
    
    // Actualizar UI
    if (maxFlavors > 0) {
        flavorLabel.textContent = `Sabores (máximo ${maxFlavors} sabor${maxFlavors > 1 ? 'es' : ''})`;
        renderCupcakeFlavors(maxFlavors);
        
        // Guardar información de cupcakes
        currentOrder.cupcakes = {
            cantidad: cantidad,
            sabores: []
        };
    } else {
        flavorLabel.textContent = 'Sabores (selecciona la cantidad primero)';
        flavorsContainer.innerHTML = '';
        currentOrder.cupcakes = null;
    }
    
    calculatePrice();
}

function renderCupcakeFlavors(maxFlavors) {
    const flavorsContainer = document.getElementById('flavorsContainer');
    if (!flavorsContainer) return;
    
    flavorsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${CONFIG.CUPCAKE_FLAVORS.map(flavor => `
                <div class="border-2 border-gray-200 rounded-lg p-3 hover:border-pink-300 transition-colors">
                    <div class="flex justify-between items-start mb-2">
                        <label class="checkbox-custom flavor-option block cursor-pointer flex-1">
                            <input type="checkbox" name="saboresCupcakes" value="${flavor.id}" 
                                   onchange="handleCupcakeFlavorChange(this, ${maxFlavors})">
                            <span class="checkmark"></span>
                            <span class="text-sm font-medium">${flavor.name} (${flavor.price}€)</span>
                        </label>
                        <button type="button" onclick="event.stopPropagation(); openProductModal('${flavor.id}')" 
                                class="text-pink-600 hover:text-pink-800 text-sm font-medium ml-2">
                            ℹ️ Info
                        </button>
                    </div>
                    <p class="text-xs text-gray-600">${getFlavorDescription(flavor.id)}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    // Inicializar estado de checkboxes
    updateFlavorCheckboxesState(maxFlavors);
}

function getFlavorDescription(flavorId) {
    const descriptions = {
        'rojo-peligroso': 'Red velvet con frosting de queso crema',
        'zanahoria': 'Bizcocho de zanahoria con especias',
        'pensamiento-citrico': 'Refrescante cupcake de limón y naranja',
        'choco-bailes': 'Intenso chocolate con buttercream',
        'yogurt-salvaje': 'Bizcocho de yogurt con frutos del bosque',
        'crimen-cuqui': 'Vainilla premium con decoración especial'
    };
    return descriptions[flavorId] || '';
}

function handleCupcakeFlavorChange(checkbox, maxFlavors) {
    const checkedBoxes = document.querySelectorAll('input[name="saboresCupcakes"]:checked');
    
    // Actualizar estado de checkboxes
    if (checkedBoxes.length >= maxFlavors) {
        document.querySelectorAll('input[name="saboresCupcakes"]').forEach(cb => {
            if (!cb.checked) {
                cb.disabled = true;
            }
        });
    } else {
        document.querySelectorAll('input[name="saboresCupcakes"]').forEach(cb => {
            cb.disabled = false;
        });
    }
    
    // Guardar sabores seleccionados
    if (currentOrder.cupcakes) {
        currentOrder.cupcakes.sabores = Array.from(checkedBoxes).map(cb => cb.value);
    }
    
    calculatePrice();
}

function updateFlavorCheckboxesState(maxFlavors) {
    const checkboxes = document.querySelectorAll('input[name="saboresCupcakes"]');
    const checkedBoxes = document.querySelectorAll('input[name="saboresCupcakes"]:checked');
    
    if (checkedBoxes.length >= maxFlavors) {
        checkboxes.forEach(cb => {
            if (!cb.checked) {
                cb.disabled = true;
            }
        });
    }
}

function toggleDireccionSection() {
    const tipoEntrega = document.getElementById('tipoEntrega').value;
    const direccionSection = document.getElementById('direccionSection');
    
    if (tipoEntrega === 'domicilio') {
        direccionSection.classList.remove('hidden');
    } else {
        direccionSection.classList.add('hidden');
    }
    
    calculatePrice();
}

// ===============================================
// MODAL DE PRODUCTO
// ===============================================

function openProductModal(productId) {
    const product = CONFIG.PRODUCTOS_INFO[productId];
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    modalTitle.textContent = product.nombre;
    
    modalContent.innerHTML = `
        <div class="space-y-4">
            <div class="bg-pink-50 p-4 rounded-lg">
                <h4 class="font-semibold text-pink-800 mb-2">Tipo</h4>
                <p class="text-gray-700">${product.tipo}</p>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-800 mb-2">Descripción</h4>
                <p class="text-gray-700">${product.descripcion}</p>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-800 mb-2">Ingredientes principales</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${product.ingredientes.map(ingrediente => 
                        `<div class="flex items-center">
                            <span class="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                            <span class="text-sm text-gray-700">${ingrediente}</span>
                        </div>`
                    ).join('')}
                </div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 class="font-semibold text-yellow-800 mb-2 flex items-center">
                    <span class="mr-2">⚠️</span>
                    Alérgenos
                </h4>
                <p class="text-yellow-700 text-sm">
                    <strong>Contiene:</strong> ${product.alergenos.join(', ')}
                </p>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-800 mb-2">Conservación</h4>
                <p class="text-gray-700 text-sm">${product.conservacion}</p>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-800 mb-2">Notas especiales</h4>
                <p class="text-blue-700 text-sm">${product.notas}</p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ===============================================
// CÁLCULO DE PRECIOS
// ===============================================

function calculatePrice() {
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    const priceCalculator = document.getElementById('priceCalculator');
    const priceBreakdown = document.getElementById('priceBreakdown');
    const totalPriceElement = document.getElementById('totalPrice');
    
    let total = 0;
    let breakdown = [];
    
    // Verificar si hay tipo de producto seleccionado
    if (!tipoProducto) {
        hidePriceCalculator(priceCalculator);
        return;
    }
    
    // Calcular según tipo de producto
    switch(tipoProducto.value) {
        case 'tartas-cheesecakes':
            total = calculateTartaPrice(breakdown);
            break;
        case 'cupcakes':
            total = calculateCupcakePrice(breakdown);
            break;
        case 'personalizado':
            total = calculatePersonalizadoPrice(breakdown);
            break;
    }
    
    // Añadir extras
    total += calculateExtras(breakdown);
    
    // Actualizar UI
    if (total > 0) {
        updatePriceUI(priceCalculator, priceBreakdown, totalPriceElement, breakdown, total);
    } else {
        hidePriceCalculator(priceCalculator);
    }
    
    // Guardar precio total
    currentOrder.precioTotal = total;
}

function calculateTartaPrice(breakdown) {
    const tartaSeleccionada = document.querySelector('input[name="tartaSeleccionada"]:checked');
    const tamano = document.getElementById('tamanoTarta').value;
    
    if (!tartaSeleccionada || !tamano) return 0;
    
    const tartaKey = tartaSeleccionada.value;
    const esCheesecake = ['que-lo-bailes', 'mangotero', 'limon-ileso', 'tradicional', 'cacao-late', 'que-hore-oes'].includes(tartaKey);
    const precioTabla = esCheesecake ? CONFIG.PRECIOS.cheesecakes : CONFIG.PRECIOS.tartas;
    
    const precio = precioTabla[tartaKey]?.[tamano] || 0;
    
    if (precio > 0) {
        const nombreTarta = tartaSeleccionada.closest('label').querySelector('.font-medium').textContent;
        const tamanoInfo = getTamanoInfo(tamano);
        
        breakdown.push({
            producto: nombreTarta,
            tamano: tamanoInfo.tamano,
            cantidad: tamanoInfo.personas,
            precio: `${precio}€`
        });
    }
    
    return precio;
}

function calculateCupcakePrice(breakdown) {
    const cantidadSelect = document.getElementById('cantidadCupcakes').value;
    const cantidadOtra = document.getElementById('cantidadOtra')?.value || '';
    const saboresSeleccionados = document.querySelectorAll('input[name="saboresCupcakes"]:checked');
    
    // Determinar cantidad
    let cantidad = 0;
    if (cantidadSelect === 'otro' && cantidadOtra) {
        cantidad = parseInt(cantidadOtra);
    } else if (cantidadSelect && cantidadSelect !== 'otro') {
        cantidad = parseInt(cantidadSelect);
    }
    
    if (cantidad === 0 || saboresSeleccionados.length === 0) return 0;
    
    // Calcular precio promedio por sabor
    let precioTotal = 0;
    let saboresTexto = [];
    
    saboresSeleccionados.forEach(sabor => {
        const precioSabor = CONFIG.PRECIOS.cupcakes[sabor.value] || 3.5;
        const saborNombre = CONFIG.PRODUCTOS_INFO[sabor.value]?.nombre || sabor.value;
        saboresTexto.push(saborNombre);
        
        // Distribuir el precio entre la cantidad de cupcakes
        precioTotal += precioSabor * (cantidad / saboresSeleccionados.length);
    });
    
    breakdown.push({
        producto: 'Cupcakes',
        tamano: saboresTexto.join(', '),
        cantidad: `${cantidad} unidades`,
        precio: `${precioTotal.toFixed(2)}€`
    });
    
    return precioTotal;
}

function calculatePersonalizadoPrice(breakdown) {
    const personas = document.getElementById('personasPersonalizado').value;
    if (!personas) return 0;
    
    const personasNum = parseInt(personas);
    let precioBase = 0;
    let tamanoEstimado = '';
    
    if (personasNum <= 8) {
        precioBase = 35;
        tamanoEstimado = 'Pequeño';
    } else if (personasNum <= 12) {
        precioBase = 45;
        tamanoEstimado = 'Mediano';
    } else if (personasNum <= 20) {
        precioBase = 55;
        tamanoEstimado = 'Grande';
    } else {
        precioBase = 65;
        tamanoEstimado = 'Extra Grande';
    }
    
    breakdown.push({
        producto: 'Pedido Personalizado',
        tamano: tamanoEstimado,
        cantidad: `${personas} personas`,
        precio: `desde ${precioBase}€`
    });
    
    return precioBase;
}

function calculateExtras(breakdown) {
    let extrasTotal = 0;
    
    // Entrega a domicilio
    const tipoEntrega = document.getElementById('tipoEntrega').value;
    if (tipoEntrega === 'domicilio') {
        const precioEntrega = CONFIG.PRECIOS.extras.entregaDomicilio;
        breakdown.push({
            producto: 'Entrega a domicilio',
            tamano: '',
            cantidad: '',
            precio: `${precioEntrega}€`
        });
        extrasTotal += precioEntrega;
    }
    
    // Texto personalizado
    const texto = document.getElementById('texto').value;
    if (texto && texto.trim()) {
        const precioTexto = CONFIG.PRECIOS.extras.textoPersonalizado;
        breakdown.push({
            producto: 'Texto personalizado',
            tamano: '',
            cantidad: '',
            precio: `${precioTexto}€`
        });
        extrasTotal += precioTexto;
    }
    
    return extrasTotal;
}

function getTamanoInfo(tamano) {
    const info = {
        'pequena': { tamano: 'Pequeña', personas: '6-8 personas' },
        'mediana': { tamano: 'Mediana', personas: '10-12 personas' },
        'grande': { tamano: 'Grande', personas: '15-20 personas' },
        'xl': { tamano: 'Extra Grande', personas: '25+ personas' }
    };
    return info[tamano] || { tamano: '', personas: '' };
}

function updatePriceUI(priceCalculator, priceBreakdown, totalPriceElement, breakdown, total) {
    // Generar HTML del desglose
    const headers = `
        <div class="grid grid-cols-4 gap-2 py-2 border-b-2 border-pink-300 text-xs sm:text-sm font-bold text-pink-700">
            <div>Producto</div>
            <div>Tamaño</div>
            <div>Cantidad</div>
            <div class="text-right">Precio</div>
        </div>
    `;
    
    const itemsHTML = breakdown.map(item => `
        <div class="grid grid-cols-4 gap-2 py-2 border-b border-gray-200 text-xs sm:text-sm">
            <div class="font-medium">${item.producto}</div>
            <div class="text-gray-600">${item.tamano}</div>
            <div class="text-gray-600">${item.cantidad}</div>
            <div class="font-semibold text-right">${item.precio}</div>
        </div>
    `).join('');
    
    priceBreakdown.innerHTML = headers + itemsHTML;
    totalPriceElement.textContent = `${total.toFixed(2)}€`;
    priceCalculator.classList.remove('hidden');
}

function hidePriceCalculator(priceCalculator) {
    if (priceCalculator) {
        priceCalculator.classList.add('hidden');
    }
}

// ===============================================
// VALIDACIÓN DEL FORMULARIO
// ===============================================

function validateForm() {
    const errors = [];
    
    // Información personal obligatoria
    if (!document.getElementById('nombre').value.trim()) {
        errors.push('El nombre completo es obligatorio');
    }
    
    if (!document.getElementById('telefono').value.trim()) {
        errors.push('El teléfono es obligatorio');
    }
    
    if (!document.getElementById('email').value.trim()) {
        errors.push('El email es obligatorio');
    } else if (!isValidEmail(document.getElementById('email').value)) {
        errors.push('El email no es válido');
    }
    
    // Fecha de entrega
    if (!document.getElementById('fechaEntrega').value) {
        errors.push('La fecha de entrega es obligatoria');
    } else if (!isValidFutureDate(document.getElementById('fechaEntrega').value)) {
        errors.push('La fecha de entrega debe ser futura');
    }
    
    // Tipo de producto
    const tipoProducto = document.querySelector('input[name="tipoProducto"]:checked');
    if (!tipoProducto) {
        errors.push('Debes seleccionar un tipo de producto');
    } else {
        // Validaciones específicas por tipo
        switch(tipoProducto.value) {
            case 'tartas-cheesecakes':
                if (!document.querySelector('input[name="tartaSeleccionada"]:checked')) {
                    errors.push('Debes seleccionar una tarta o cheesecake');
                }
                if (!document.getElementById('tamanoTarta').value) {
                    errors.push('Debes seleccionar un tamaño');
                }
                break;
                
            case 'cupcakes':
                const cantidad = document.getElementById('cantidadCupcakes').value;
                if (!cantidad) {
                    errors.push('Debes seleccionar una cantidad de cupcakes');
                } else if (cantidad === 'otro' && !document.getElementById('cantidadOtra').value) {
                    errors.push('Debes especificar la cantidad de cupcakes');
                }
                if (document.querySelectorAll('input[name="saboresCupcakes"]:checked').length === 0) {
                    errors.push('Debes seleccionar al menos un sabor de cupcakes');
                }
                break;
                
            case 'personalizado':
                const personas = document.getElementById('personasPersonalizado').value;
                if (!personas) {
                    errors.push('Debes especificar el número de personas aproximado');
                }
                break;
        }
    }
    
    // Validar entrega a domicilio
    const tipoEntrega = document.getElementById('tipoEntrega').value;
    if (tipoEntrega === 'domicilio' && !document.getElementById('direccion').value.trim()) {
        errors.push('Debes especificar la dirección de entrega');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidFutureDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
}

function showValidationErrors(errors) {
    // Eliminar errores anteriores
    const existingError = document.querySelector('.validation-errors');
    if (existingError) {
        existingError.remove();
    }
    
    if (errors.length === 0) return;
    
    // Crear elemento de errores
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-errors bg-red-50 border border-red-200 p-4 rounded-lg text-red-700 mb-4';
    
    const errorList = errors.map(error => `<li>${error}</li>`).join('');
    errorDiv.innerHTML = `
        <h4 class="font-bold mb-2 flex items-center">
            <span class="mr-2">⚠️</span>
            Por favor, corrige los siguientes errores:
        </h4>
        <ul class="list-disc pl-5 space-y-1">
            ${errorList}
        </ul>
    `;
    
    // Insertar después del formulario
    const form = document.getElementById('orderForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Scroll to errors
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===============================================
// RECOLECCIÓN DE DATOS DEL FORMULARIO
// ===============================================

function collectFormData() {
    const formData = {
        timestamp: new Date().toISOString(),
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        tipoProducto: document.querySelector('input[name="tipoProducto"]:checked')?.value || '',
        fechaEntrega: document.getElementById('fechaEntrega').value,
        horaEntrega: document.getElementById('horaEntrega').value,
        tipoEntrega: document.getElementById('tipoEntrega').value,
        direccion: document.getElementById('direccion').value,
        tema: document.getElementById('tema').value,
        texto: document.getElementById('texto').value,
        comentarios: document.getElementById('comentarios').value,
        precioTotal: currentOrder.precioTotal
    };
    
    // Datos específicos por tipo de producto
    const tipoProducto = formData.tipoProducto;
    
    if (tipoProducto === 'tartas-cheesecakes') {
        const tartaSeleccionada = document.querySelector('input[name="tartaSeleccionada"]:checked');
        formData.tarta = {
            tipo: tartaSeleccionada ? tartaSeleccionada.value : '',
            nombre: tartaSeleccionada ? CONFIG.PRODUCTOS_INFO[tartaSeleccionada.value]?.nombre || tartaSeleccionada.value : '',
            tamano: document.getElementById('tamanoTarta').value,
            tamanoInfo: getTamanoInfo(document.getElementById('tamanoTarta').value)
        };
    }
    
    if (tipoProducto === 'cupcakes') {
        const cantidadSelect = document.getElementById('cantidadCupcakes').value;
        const cantidadOtra = document.getElementById('cantidadOtra')?.value || '';
        const saboresSeleccionados = Array.from(document.querySelectorAll('input[name="saboresCupcakes"]:checked'))
            .map(cb => cb.value);
        
        formData.cupcakes = {
            cantidad: cantidadSelect === 'otro' ? cantidadOtra : cantidadSelect,
            sabores: saboresSeleccionados.map(saborId => ({
                id: saborId,
                nombre: CONFIG.PRODUCTOS_INFO[saborId]?.nombre || saborId,
                precio: CONFIG.PRECIOS.cupcakes[saborId] || 3.5
            }))
        };
    }
    
    if (tipoProducto === 'personalizado') {
        const formatoPersonalizado = document.querySelector('input[name="formatoPersonalizado"]:checked');
        const tamanoPersonalizado = document.querySelector('input[name="tamanoPersonalizado"]:checked');
        const bizcochoPersonalizado = document.querySelector('input[name="bizcochoPersonalizado"]:checked');
        const rellenoPersonalizado = document.querySelector('input[name="rellenoPersonalizado"]:checked');
        const coberturaPersonalizada = document.querySelector('input[name="coberturaPersonalizada"]:checked');
        const decoracionPersonalizada = Array.from(document.querySelectorAll('input[name="decoracionPersonalizada"]:checked'))
            .map(cb => cb.value);
        
        formData.personalizado = {
            formato: formatoPersonalizado ? formatoPersonalizado.value : '',
            tamano: tamanoPersonalizado ? tamanoPersonalizado.value : '',
            bizcocho: bizcochoPersonalizado ? bizcochoPersonalizado.value : '',
            relleno: rellenoPersonalizado ? rellenoPersonalizado.value : '',
            cobertura: coberturaPersonalizada ? coberturaPersonalizada.value : '',
            decoracion: decoracionPersonalizada,
            descripcion: document.getElementById('descripcionPersonalizada').value,
            personas: document.getElementById('personasPersonalizado').value,
            presupuesto: document.getElementById('presupuestoPersonalizado').value
        };
    }
    
    return formData;
}

// ===============================================
// ENVÍO DE EMAILS
// ===============================================

async function sendAdminEmail(formData) {
    try {
        const templateParams = {
            to_email: CONFIG.EMAILJS.adminEmail,
            cliente_nombre: formData.nombre,
            cliente_telefono: formData.telefono,
            cliente_email: formData.email,
            tipo_producto: getTipoProductoText(formData.tipoProducto),
            detalles_producto: getDetallesProducto(formData),
            precio_total: `${formData.precioTotal.toFixed(2)}€`,
            fecha_entrega: formData.fechaEntrega,
            hora_entrega: formData.horaEntrega || 'No especificada',
            tipo_entrega: formData.tipoEntrega === 'recoger' ? 'Recoger en tienda' : 'Entrega a domicilio',
            direccion_entrega: formData.direccion || 'No aplica',
            tema: formData.tema || 'No especificado',
            texto_tarta: formData.texto || 'No especificado',
            comentarios: formData.comentarios || 'Ninguno',
            fecha_pedido: new Date().toLocaleDateString('es-ES'),
            hora_pedido: new Date().toLocaleTimeString('es-ES'),
            reply_to: formData.email
        };

        const response = await emailjs.send(
            CONFIG.EMAILJS.serviceId,
            CONFIG.EMAILJS.templateId,
            templateParams
        );

        console.log('📧 Email al administrador enviado exitosamente');
        return { success: true, message: 'Email al administrador enviado correctamente' };

    } catch (error) {
        console.error('❌ Error enviando email al administrador:', error);
        return { 
            success: false, 
            message: 'Error al enviar el email al administrador: ' + (error.text || error.message || error) 
        };
    }
}

async function sendClientConfirmationEmail(formData) {
    try {
        const templateParams = {
            to_email: formData.email,
            cliente_nombre: formData.nombre,
            tipo_producto: getTipoProductoText(formData.tipoProducto),
            detalles_producto: getDetallesProducto(formData),
            precio_total: `${formData.precioTotal.toFixed(2)}€`,
            fecha_entrega: new Date(formData.fechaEntrega).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            hora_entrega: formData.horaEntrega || 'No especificada',
            tipo_entrega: formData.tipoEntrega === 'recoger' ? 'Recoger en tienda' : 'Entrega a domicilio',
            direccion_entrega: formData.direccion || 'Recoger en nuestra tienda',
            tema: formData.tema || 'No especificado',
            texto_tarta: formData.texto || 'No especificado',
            comentarios: formData.comentarios || 'Ninguno',
            fecha_pedido: new Date().toLocaleDateString('es-ES'),
            numero_pedido: 'MD' + Date.now().toString().slice(-6),
            reply_to: CONFIG.EMAILJS.adminEmail
        };

        const response = await emailjs.send(
            CONFIG.EMAILJS.serviceId,
            CONFIG.EMAILJS.templateIdCliente,
            templateParams
        );

        console.log('📧 Email de confirmación al cliente enviado exitosamente');
        return { success: true, message: 'Email de confirmación enviado correctamente' };

    } catch (error) {
        console.error('❌ Error enviando email de confirmación al cliente:', error);
        return { 
            success: false, 
            message: 'Error al enviar el email de confirmación: ' + (error.text || error.message || error) 
        };
    }
}

async function sendOrderEmails(formData) {
    console.log('📤 Iniciando envío de emails...');
    
    const results = {
        admin: { success: false, message: '' },
        client: { success: false, message: '' }
    };

    try {
        results.admin = await sendAdminEmail(formData);
    } catch (error) {
        results.admin = { 
            success: false, 
            message: 'Error enviando email al administrador: ' + error.message 
        };
    }

    try {
        results.client = await sendClientConfirmationEmail(formData);
    } catch (error) {
        results.client = { 
            success: false, 
            message: 'Error enviando email de confirmación: ' + error.message 
        };
    }

    console.log('📬 Resultados del envío:', results);
    return results;
}

function getTipoProductoText(tipo) {
    const tipos = {
        'tartas-cheesecakes': 'Tartas y Cheesecakes',
        'cupcakes': 'Cupcakes',
        'personalizado': 'Pedido Personalizado'
    };
    return tipos[tipo] || tipo;
}

function getDetallesProducto(formData) {
    let detalles = '';
    
    if (formData.tipoProducto === 'tartas-cheesecakes' && formData.tarta) {
        detalles += `Tarta: ${formData.tarta.nombre}\n`;
        detalles += `Tamaño: ${formData.tarta.tamanoInfo.tamano} (${formData.tarta.tamanoInfo.personas})\n`;
    }
    
    if (formData.tipoProducto === 'cupcakes' && formData.cupcakes) {
        detalles += `Cantidad: ${formData.cupcakes.cantidad}\n`;
        if (formData.cupcakes.sabores && formData.cupcakes.sabores.length > 0) {
            detalles += `Sabores: ${formData.cupcakes.sabores.map(s => s.nombre).join(', ')}\n`;
        }
    }
    
    if (formData.tipoProducto === 'personalizado' && formData.personalizado) {
        if (formData.personalizado.formato) {
            detalles += `Formato: ${formatText(formData.personalizado.formato)}\n`;
        }
        
        if (formData.personalizado.tamano) {
            detalles += `Tamaño: ${formatText(formData.personalizado.tamano)}\n`;
        }
        
        if (formData.personalizado.bizcocho) {
            detalles += `Bizcocho: ${formatText(formData.personalizado.bizcocho)}\n`;
        }
        
        if (formData.personalizado.relleno) {
            detalles += `Relleno: ${formatText(formData.personalizado.relleno)}\n`;
        }
        
        if (formData.personalizado.cobertura) {
            detalles += `Cobertura: ${formatText(formData.personalizado.cobertura)}\n`;
        }
        
        if (formData.personalizado.decoracion && formData.personalizado.decoracion.length > 0) {
            detalles += `Decoración: ${formData.personalizado.decoracion.map(d => formatText(d)).join(', ')}\n`;
        }
        
        if (formData.personalizado.descripcion) {
            detalles += `Descripción adicional: ${formData.personalizado.descripcion}\n`;
        }
        
        if (formData.personalizado.personas) {
            detalles += `Personas: ${formData.personalizado.personas}\n`;
        }
        
        if (formData.personalizado.presupuesto) {
            detalles += `Presupuesto: ${formData.personalizado.presupuesto}\n`;
        }
    }
    
    return detalles || 'No hay detalles específicos';
}

function formatText(text) {
    return text.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ===============================================
// MANEJO DEL ENVÍO DEL FORMULARIO
// ===============================================

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('🔄 Procesando envío del formulario...');
    
    // Validar formulario
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
        showValidationErrors(validationErrors);
        return;
    }
    
    // Recolectar datos
    const formData = collectFormData();
    
    // Mostrar loading
    const submitButton = document.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    showLoading(submitButton, 'Enviando pedido...');
    
    try {
        // Enviar emails
        const emailResults = await sendOrderEmails(formData);
        
        // Mostrar resultado
        showResultMessage(emailResults, formData);
        
        // Guardar backup
        saveBackup(formData, emailResults);
        
        // Limpiar formulario después de éxito
        if (emailResults.admin.success || emailResults.client.success) {
            setTimeout(resetForm, 5000);
        }
        
    } catch (error) {
        console.error('❌ Error crítico al procesar el pedido:', error);
        showErrorMessage(error, formData);
        
    } finally {
        // Restaurar botón
        hideLoading(submitButton, originalButtonText);
    }
}

function showLoading(button, text) {
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `
        <span class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ${text}
        </span>
    `;
    button.disabled = true;
}

function hideLoading(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

function showResultMessage(emailResults, formData) {
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('orderForm');
    
    // Ocultar formulario
    form.style.display = 'none';
    
    // Determinar tipo de mensaje
    let messageHTML = '';
    let messageClass = '';
    
    if (emailResults.admin.success && emailResults.client.success) {
        messageClass = 'success';
        messageHTML = `
            <h3 class="text-lg sm:text-xl font-bold mb-2 text-green-800">¡Pedido Enviado Correctamente!</h3>
            <p class="text-sm sm:text-base text-green-700">Hemos recibido tu pedido y te hemos enviado un email de confirmación a <strong>${formData.email}</strong>.</p>
            <p class="mt-2 text-sm sm:text-base text-green-700">También hemos notificado a nuestro equipo para procesar tu pedido.</p>
            <div class="mt-4 p-4 bg-green-100 rounded-lg">
                <p class="text-sm font-semibold text-green-800">📋 Resumen:</p>
                <p class="text-sm text-green-700">• Producto: ${getTipoProductoText(formData.tipoProducto)}</p>
                <p class="text-sm text-green-700">• Total estimado: ${formData.precioTotal.toFixed(2)}€</p>
                <p class="text-sm text-green-700">• Fecha entrega: ${new Date(formData.fechaEntrega).toLocaleDateString('es-ES')}</p>
            </div>
            <p class="mt-3 text-sm sm:text-base font-semibold text-green-800">Te contactaremos pronto para confirmar los detalles y el presupuesto final.</p>
        `;
    } else if (emailResults.admin.success && !emailResults.client.success) {
        messageClass = 'warning';
        messageHTML = `
            <h3 class="text-lg sm:text-xl font-bold mb-2 text-yellow-800">¡Pedido Recibido!</h3>
            <p class="text-sm sm:text-base text-yellow-700">Hemos recibido tu pedido correctamente y nuestro equipo ha sido notificado.</p>
            <p class="mt-2 text-sm sm:text-base text-yellow-600">⚠️ No pudimos enviar el email de confirmación a tu dirección. Verifica que ${formData.email} sea correcta.</p>
            <div class="mt-4 p-4 bg-yellow-100 rounded-lg">
                <p class="text-sm font-semibold text-yellow-800">📋 Resumen:</p>
                <p class="text-sm text-yellow-700">• Producto: ${getTipoProductoText(formData.tipoProducto)}</p>
                <p class="text-sm text-yellow-700">• Total estimado: ${formData.precioTotal.toFixed(2)}€</p>
            </div>
            <p class="mt-3 text-sm sm:text-base font-semibold text-yellow-800">Te contactaremos pronto para confirmar los detalles y el presupuesto final.</p>
        `;
    } else if (!emailResults.admin.success && emailResults.client.success) {
        messageClass = 'warning';
        messageHTML = `
            <h3 class="text-lg sm:text-xl font-bold mb-2 text-yellow-800">¡Pedido Recibido!</h3>
            <p class="text-sm sm:text-base text-yellow-700">Te hemos enviado un email de confirmación a <strong>${formData.email}</strong>.</p>
            <p class="mt-2 text-sm sm:text-base text-yellow-600">⚠️ Hubo un problema notificando a nuestro equipo, pero hemos guardado tu pedido.</p>
            <div class="mt-4 p-4 bg-yellow-100 rounded-lg">
                <p class="text-sm font-semibold text-yellow-800">📞 Contacto directo:</p>
                <p class="text-sm text-yellow-700">pedidos@malditadulzura.com</p>
                <p class="text-sm text-yellow-700">+34 123 456 789</p>
            </div>
            <p class="mt-3 text-sm sm:text-base font-semibold text-yellow-800">Por favor, contáctanos para confirmar que recibimos tu pedido.</p>
        `;
    } else {
        messageClass = 'error';
        messageHTML = `
            <h3 class="text-lg sm:text-xl font-bold mb-2 text-red-800">¡Pedido Recibido con Advertencias!</h3>
            <p class="text-sm sm:text-base text-red-700">Hemos recibido tu pedido, pero hubo problemas con el envío de emails.</p>
            <p class="mt-2 text-sm sm:text-base text-red-600">⚠️ Por favor, contacta directamente con nosotros para confirmar que recibimos tu pedido:</p>
            <div class="mt-4 p-4 bg-red-100 rounded-lg">
                <p class="text-sm font-semibold text-red-800">📞 Contacto directo:</p>
                <p class="text-sm text-red-700">📧 pedidos@malditadulzura.com</p>
                <p class="text-sm text-red-700">📱 +34 123 456 789</p>
            </div>
            <div class="mt-4 flex gap-2">
                <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
                    Intentar de nuevo
                </button>
                <button onclick="copyOrderData()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
                    Copiar datos del pedido
                </button>
            </div>
        `;
    }
    
    // Aplicar estilos según tipo
    successMessage.className = `${messageClass}-message bg-${messageClass}-50 border border-${messageClass}-200 p-6 sm:p-8 rounded-xl shadow-lg mt-8`;
    successMessage.innerHTML = messageHTML;
    successMessage.style.display = 'block';
    
    // Scroll to message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showErrorMessage(error, formData) {
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('orderForm');
    
    form.style.display = 'none';
    successMessage.innerHTML = `
        <h3 class="text-lg sm:text-xl font-bold mb-2 text-red-800">Error al Procesar el Pedido</h3>
        <p class="text-sm sm:text-base text-red-700">Hubo un problema técnico al procesar tu pedido. Por favor, inténtalo de nuevo o contacta directamente con nosotros.</p>
        <div class="mt-4 p-4 bg-red-100 rounded-lg">
            <p class="text-sm font-semibold text-red-800">Información de contacto:</p>
            <p class="text-sm text-red-700">📧 pedidos@malditadulzura.com</p>
            <p class="text-sm text-red-700">📱 +34 123 456 789</p>
        </div>
        <button onclick="location.reload()" class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
            Intentar de Nuevo
        </button>
    `;
    successMessage.className = 'error-message bg-red-50 border border-red-200 p-6 sm:p-8 rounded-xl shadow-lg mt-8';
    successMessage.style.display = 'block';
    
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
        if (savedState) {
            const state = JSON.parse(savedState);
            console.log('📂 Cargando estado guardado...');
            
            // Restaurar campos básicos
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
            
            // Restaurar tipo de producto
            if (state.tipoProducto) {
                const radio = document.querySelector(`input[name="tipoProducto"][value="${
