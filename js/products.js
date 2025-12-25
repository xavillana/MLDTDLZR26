// ===============================================
// BASE DE DATOS DE PRODUCTOS
// ===============================================

const allProducts = [
    // ==================== TARTAS ====================
    {
        id: "marcos-no-me-tientes",
        name: "Marcos No Me Tientes",
        emoji: "🍰",
        category: "tartas",
        description: "Deliciosa tarta de vainilla con crema suave y toques de frutos rojos. ¡Irresistible!",
        price: 35, // precio base mediana (se ajusta por tamaño en pedido)
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 89,
        sales: 145,
        bestseller: true,
        vegan: false,
        gradient: "from-pink-300 via-red-300 to-pink-400",
        badges: ["BESTSELLER"],
        sizes: [
            { name: "Pequeña", price: 25, servings: "4-6" },
            { name: "Mediana", price: 35, servings: "8-10" },
            { name: "Grande", price: 45, servings: "12-15" },
            { name: "XL", price: 55, servings: "16-20" }
        ]
    },
    {
        id: "muerte-por-chocolate",
        name: "Muerte por Chocolate",
        emoji: "🍫",
        category: "tartas",
        description: "Intensa explosión de chocolate negro, brownie y ganache. Solo para valientes.",
        price: 35,
        oldPrice: 42,
        discount: 17,
        rating: 5,
        reviews: 156,
        sales: 201,
        bestseller: true,
        vegan: false,
        gradient: "from-amber-800 via-amber-900 to-black",
        badges: ["BESTSELLER", "DESCUENTO"],
        sizes: [
            { name: "Pequeña", price: 25, servings: "4-6" },
            { name: "Mediana", price: 35, servings: "8-10" },
            { name: "Grande", price: 45, servings: "12-15" },
            { name: "XL", price: 55, servings: "16-20" }
        ]
    },
    {
        id: "unicornio-fantastico",
        name: "Unicornio Fantástico",
        emoji: "🦄",
        category: "tartas",
        description: "Colores vibrantes, algodón de azúcar y capas de vainilla. Magia pura.",
        price: 40,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 112,
        sales: 98,
        bestseller: false,
        vegan: false,
        gradient: "from-purple-400 via-pink-400 to-cyan-400",
        badges: ["NUEVO"],
        sizes: [
            { name: "Pequeña", price: 30, servings: "4-6" },
            { name: "Mediana", price: 40, servings: "8-10" },
            { name: "Grande", price: 50, servings: "12-15" },
            { name: "XL", price: 60, servings: "16-20" }
        ]
    },
    {
        id: "naranja-que-cacao",
        name: "Naranja que Cacao",
        emoji: "🍊",
        category: "tartas",
        description: "Perfecta fusión de chocolate intenso y naranja fresca. Equilibrio divino.",
        price: 35,
        oldPrice: null,
        discount: 0,
        rating: 4.8,
        reviews: 67,
        sales: 78,
        bestseller: false,
        vegan: false,
        gradient: "from-orange-400 via-amber-600 to-amber-800",
        badges: [],
        sizes: [
            { name: "Pequeña", price: 25, servings: "4-6" },
            { name: "Mediana", price: 35, servings: "8-10" },
            { name: "Grande", price: 45, servings: "12-15" },
            { name: "XL", price: 55, servings: "16-20" }
        ]
    },
    {
        id: "tia-misu",
        name: "Tía Misú",
        emoji: "☕",
        category: "tartas",
        description: "Clásico tiramisú con café premium, mascarpone cremoso y cacao puro.",
        price: 38,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 134,
        sales: 167,
        bestseller: true,
        vegan: false,
        gradient: "from-amber-200 via-amber-400 to-amber-700",
        badges: ["CLÁSICO"],
        sizes: [
            { name: "Pequeña", price: 28, servings: "4-6" },
            { name: "Mediana", price: 38, servings: "8-10" },
            { name: "Grande", price: 48, servings: "12-15" },
            { name: "XL", price: 58, servings: "16-20" }
        ]
    },
    {
        id: "revolcon-fresnata",
        name: "Revolcón Fresnata",
        emoji: "🍓",
        category: "tartas",
        description: "Fresas frescas, nata montada y bizcocho esponjoso. Pura pasión veraniega.",
        price: 36,
        oldPrice: 42,
        discount: 14,
        rating: 4.9,
        reviews: 95,
        sales: 112,
        bestseller: false,
        vegan: false,
        gradient: "from-red-400 via-pink-300 to-red-300",
        badges: ["DESCUENTO"],
        sizes: [
            { name: "Pequeña", price: 26, servings: "4-6" },
            { name: "Mediana", price: 36, servings: "8-10" },
            { name: "Grande", price: 46, servings: "12-15" },
            { name: "XL", price: 56, servings: "16-20" }
        ]
    },

    // ==================== CHEESECAKES ====================
    {
        id: "que-lo-bailes",
        name: "Que lo Bailes",
        emoji: "💃",
        category: "cheesecakes",
        description: "Cheesecake cremoso con base crujiente y salsa de frutos rojos. ¡A mover las caderas!",
        price: 40,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 78,
        sales: 89,
        bestseller: true,
        vegan: false,
        gradient: "from-pink-500 via-red-500 to-pink-600",
        badges: ["BESTSELLER"],
        sizes: [
            { name: "Pequeña", price: 30, servings: "4-6" },
            { name: "Mediana", price: 40, servings: "8-10" },
            { name: "Grande", price: 50, servings: "12-15" },
            { name: "XL", price: 60, servings: "16-20" }
        ]
    },
    {
        id: "mangotero",
        name: "Mangotero",
        emoji: "🥭",
        category: "cheesecakes",
        description: "Exótico cheesecake de mango con pasión y toque tropical. Verano todo el año.",
        price: 42,
        oldPrice: null,
        discount: 0,
        rating: 4.9,
        reviews: 102,
        sales: 134,
        bestseller: true,
        vegan: false,
        gradient: "from-yellow-400 via-orange-400 to-pink-400",
        badges: ["TROPICAL"],
        sizes: [
            { name: "Pequeña", price: 32, servings: "4-6" },
            { name: "Mediana", price: 42, servings: "8-10" },
            { name: "Grande", price: 52, servings: "12-15" },
            { name: "XL", price: 62, servings: "16-20" }
        ]
    },
    {
        id: "limon-ileso",
        name: "Limón Ileso",
        emoji: "🍋",
        category: "cheesecakes",
        description: "Fresco, ácido y cremoso. El equilibrio perfecto entre dulce y cítrico.",
        price: 38,
        oldPrice: null,
        discount: 0,
        rating: 4.8,
        reviews: 67,
        sales: 81,
        bestseller: false,
        vegan: false,
        gradient: "from-lime-300 via-yellow-300 to-lime-400",
        badges: [],
        sizes: [
            { name: "Pequeña", price: 28, servings: "4-6" },
            { name: "Mediana", price: 38, servings: "8-10" },
            { name: "Grande", price: 48, servings: "12-15" },
            { name: "XL", price: 58, servings: "16-20" }
        ]
    },
    {
        id: "tradicional",
        name: "Tradicional",
        emoji: "🧀",
        category: "cheesecakes",
        description: "Clásico New York cheesecake: cremoso, denso y perfectamente equilibrado.",
        price: 36,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 189,
        sales: 223,
        bestseller: true,
        vegan: false,
        gradient: "from-gray-200 via-yellow-100 to-gray-300",
        badges: ["CLÁSICO", "BESTSELLER"],
        sizes: [
            { name: "Pequeña", price: 26, servings: "4-6" },
            { name: "Mediana", price: 36, servings: "8-10" },
            { name: "Grande", price: 46, servings: "12-15" },
            { name: "XL", price: 56, servings: "16-20" }
        ]
    },
    {
        id: "cacao-late",
        name: "Cacao Late",
        emoji: "🍫",
        category: "cheesecakes",
        description: "Cheesecake de chocolate intenso con capas de ganache. Pecado asegurado.",
        price: 40,
        oldPrice: 48,
        discount: 17,
        rating: 5,
        reviews: 93,
        sales: 105,
        bestseller: false,
        vegan: false,
        gradient: "from-amber-900 via-black to-amber-800",
        badges: ["DESCUENTO"],
        sizes: [
            { name: "Pequeña", price: 30, servings: "4-6" },
            { name: "Mediana", price: 40, servings: "8-10" },
            { name: "Grande", price: 50, servings: "12-15" },
            { name: "XL", price: 60, servings: "16-20" }
        ]
    },
    {
        id: "que-hore-oes",
        name: "Que Hore Oes",
        emoji: "🍪",
        category: "cheesecakes",
        description: "Cheesecake con galletas Oreo trituradas y trozos enteros. Adicción garantizada.",
        price: 42,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 145,
        sales: 178,
        bestseller: true,
        vegan: false,
        gradient: "from-black via-gray-800 to-black",
        badges: ["BESTSELLER"],
        sizes: [
            { name: "Pequeña", price: 32, servings: "4-6" },
            { name: "Mediana", price: 42, servings: "8-10" },
            { name: "Grande", price: 52, servings: "12-15" },
            { name: "XL", price: 62, servings: "16-20" }
        ]
    },

    // ==================== CUPCAKES ====================
    {
        id: "rojo-peligroso",
        name: "Rojo Peligroso",
        emoji: "❤️",
        category: "cupcakes",
        description: "Red Velvet clásico con frosting de queso crema. Peligrosamente adictivo.",
        price: 3.5,
        rating: 5,
        reviews: 201,
        sales: 456,
        bestseller: true,
        badges: ["BESTSELLER"]
    },
    {
        id: "zanahoria",
        name: "Zanahoria",
        emoji: "🥕",
        category: "cupcakes",
        description: "Esponjoso bizcocho de zanahoria con nueces y frosting cremoso.",
        price: 3.5,
        rating: 4.8,
        reviews: 134,
        sales: 289,
        bestseller: false,
        badges: []
    },
    {
        id: "pensamiento-citrico",
        name: "Pensamiento Cítrico",
        emoji: "🍋",
        category: "cupcakes",
        description: "Limón fresco con merengue suave. Ligero y refrescante.",
        price: 3.8,
        rating: 4.9,
        reviews: 98,
        sales: 167,
        bestseller: true,
        badges: ["BESTSELLER"]
    },
    {
        id: "choco-bailes",
        name: "Choco Bailes",
        emoji: "🍫",
        category: "cupcakes",
        description: "Chocolate intenso con ganache y decoraciones divertidas.",
        price: 3.5,
        rating: 5,
        reviews: 178,
        sales: 312,
        bestseller: false,
        badges: []
    },
    {
        id: "yogurt-salvaje",
        name: "Yogurt Salvaje",
        emoji: "🫐",
        category: "cupcakes",
        description: "Yogurt natural con frutos rojos salvajes. Saludable y delicioso.",
        price: 3.8,
        rating: 4.7,
        reviews: 76,
        sales: 123,
        bestseller: false,
        badges: ["SALUDABLE"]
    },
    {
        id: "crimen-cuqui",
        name: "Crimen Cuqui",
        emoji: "🔪",
        category: "cupcakes",
        description: "El más goloso: chocolate, caramelo y sorpresa en el centro.",
        price: 4.0,
        rating: 5,
        reviews: 145,
        sales: 234,
        bestseller: true,
        badges: ["PREMIUM", "BESTSELLER"]
    }
];


// ===============================================
// VARIABLES GLOBALES
// ===============================================

let filteredProducts = [...allProducts];
let currentPage = 1;
const itemsPerPage = 8;


// ===============================================
// INICIALIZACIÓN SEGÚN LA PÁGINA
// ===============================================

function initStorePage() {
    setupFilters();
    renderProducts();
}

function initProductDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    renderProductDetail(product);
}


// ===============================================
// RENDERIZAR GRID DE PRODUCTOS
// ===============================================

function renderProducts() {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const page = filteredProducts.slice(start, end);

    container.innerHTML = "";
    page.forEach(p => container.appendChild(createProductCard(p)));

    renderPagination();
    updateResultsCount();
}


// ===============================================
// TARJETA DE PRODUCTO
// ===============================================

function createProductCard(p) {
    const card = document.createElement("div");
    card.className = `
        rounded-2xl shadow-lg p-6 cursor-pointer
        bg-gradient-to-br ${p.gradient}
        hover:scale-[1.02] transition
    `;

    card.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <span class="text-3xl">✨</span>
            ${p.discount > 0 ? `<span class="bg-red-600 text-white px-2 py-1 rounded-lg text-sm">-${p.discount}%</span>` : ""}
        </div>

        <h3 class="text-xl font-bold text-gray-900">${p.name}</h3>
        <p class="text-gray-700 text-sm mb-3">${p.description}</p>

        <div class="flex items-center gap-2 mb-3">
            <span class="text-yellow-500">★</span>
            <span class="font-semibold">${p.rating}</span>
            <span class="text-gray-600 text-sm">(${p.reviews} reseñas)</span>
        </div>

        <div class="flex items-center gap-3">
            <span class="text-2xl font-bold text-gray-900">${p.price.toFixed(2)}€</span>
            ${p.oldPrice ? `<span class="line-through text-gray-600">${p.oldPrice.toFixed(2)}€</span>` : ""}
        </div>
    `;

    card.addEventListener("click", () => {
        window.location.href = `producto.html?id=${p.id}`;
    });

    return card;
}


// ===============================================
// FILTROS Y ORDENACIÓN
// ===============================================

function setupFilters() {
    const buttons = document.querySelectorAll("#categoryButtons .filter-btn");
    const clearBtn = document.getElementById("clearFilters");

    // Evento para cada botón
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Activar estilo
            buttons.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");

            // Filtrar
            const category = btn.dataset.category;
            applyCategoryFilter(category);
        });
    });

    // Botón limpiar
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active-filter"));
            buttons[0].classList.add("active-filter"); // "Todas"
            applyCategoryFilter("all");
        });
    }
}

function applyCategoryFilter(category) {
    let list = [...allProducts];

    if (category !== "all") {
        list = list.filter(p => p.category === category);
    }

    filteredProducts = list;
    currentPage = 1;
    renderProducts();
}


// ===============================================
// PAGINACIÓN
// ===============================================

function renderPagination() {
    const container = document.getElementById("paginationNumbers");
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");

    if (!container) return;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `
            w-10 h-10 rounded-xl font-bold
            ${i === currentPage ? "bg-pink-600 text-white" : "bg-gray-200"}
        `;
        btn.addEventListener("click", () => {
            currentPage = i;
            renderProducts();
        });
        container.appendChild(btn);
    }

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function updateResultsCount() {
    const el = document.getElementById("resultsCount");
    if (!el) return;
    el.innerHTML = `Mostrando <strong>${filteredProducts.length}</strong> delicias`;
}


// ===============================================
// DETALLE DE PRODUCTO
// ===============================================

function renderProductDetail(p) {
    const container = document.getElementById("product-detail");
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-3xl mx-auto p-6">

            <h1 class="text-4xl font-black mb-4">${p.name}</h1>
            <p class="text-gray-700 mb-4">${p.description}</p>

            <div class="flex items-center gap-3 mb-4">
                <span class="text-yellow-500 text-2xl">★</span>
                <span class="font-semibold">${p.rating}</span>
                <span class="text-gray-600">(${p.reviews} reseñas)</span>
            </div>

            <div class="text-3xl font-bold mb-6">${p.price.toFixed(2)}€</div>

            <h3 class="text-xl font-bold mb-2">Tamaños disponibles</h3>
            <ul class="space-y-2">
                ${p.sizes.map(s => `
                    <li class="p-3 bg-gray-100 rounded-xl">
                        <strong>${s.name}</strong> — ${s.price.toFixed(2)}€ (${s.servings} personas)
                    </li>
                `).join("")}
            </ul>

        </div>
    `;
}

