// ===============================================
// BASE DE DATOS DE PRODUCTOS
// ===============================================

const allProducts = [
    // TARTAS
    {
        id: "marcos-no-me-tientes",
        name: "Marcos No Me Tientes",
        emoji: "🍰",
        category: "tartas",
        description: "Una versión de la clásica tarta San Marcos. ¡Irresistible!",
        price: 35,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 89,
        sales: 145,
        bestseller: false,
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
        description: "¿Porqué quedarte con lo simple si puedes pecar a lo grande?",
        price: 35,
        oldPrice: null,
        discount: 0,
        rating: 5,
        reviews: 156,
        sales: 201,
        bestseller: true,
        vegan: false,
        gradient: "from-amber-800 via-amber-900 to-black",
        badges: ["BESTSELLER", "DESCUENTO"],
        image: "img/muerte-por-chocolate.jpg", // Ruta local
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
        bestseller: false,
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
        oldPrice: null,
        discount: 0,
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

    // CHEESECAKES
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
        bestseller: false,
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
        bestseller: false,
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
        bestseller: false,
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

    // CUPCAKES
    {
        id: "rojo-peligroso",
        name: "Rojo Peligroso",
        emoji: "❤️",
        category: "cupcakes",
        description: "¿Podrás resistir este pecado de pura perversión carmesí?.",
        price: 3.5,
        rating: 5,
        reviews: 201,
        sales: 456,
        bestseller: true,
        image: "img/red-velvet.jpg", // Ruta local
        badges: ["BESTSELLER"]
    },
    {
        id: "zanahoria",
        name: "Zanahoria",
        emoji: "🥕",
        category: "cupcakes",
        description: "¿Quien dijo que lo clásico no puede ser atrevido y seductor?.",
        price: 3.5,
        rating: 4.8,
        reviews: 134,
        sales: 289,
        bestseller: false,
        image: "img/carrot-cake.jpg", // Ruta local
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
        description: "Alguna vez has probado el ácido sabor de una dulce venganza?",
        price: 3.8,
        rating: 4.7,
        reviews: 76,
        sales: 123,
        bestseller: true,
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
        bestseller: false,
        badges: ["PREMIUM", "BESTSELLER"]
    }
];

// ===============================================
// TARJETA DE PRODUCTO (para grid)
// ===============================================

function productCard(p) {
    return `
        <div class="gallery-card card-hover cursor-pointer transition-all duration-300 
                hover:shadow-2xl hover:-translate-y-2" 
             onclick='openProductModal(${JSON.stringify(p).replace(/'/g, "\\'")})'>
            <div class="relative overflow-hidden rounded-t-2xl">
                <img src="${p.image || `https://via.placeholder.com/400x400/f8b4d9/ffffff?text=${encodeURIComponent(p.emoji || '🍰')}`}" 
                     alt="${p.name}" 
                     class="w-full h-64 object-cover transition-transform duration-500 hover:scale-110">
                ${p.badges?.length ? 
                    '<div class="absolute top-4 left-4 flex flex-col gap-2">' + 
                    p.badges.map(b => `<span class="bg-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">${b}</span>`).join('') + 
                    '</div>' : ''}
            </div>
            <div class="p-6 bg-white">
                <h3 class="text-2xl font-black text-gray-800 mb-2 flex items-center gap-2">
                    <span>${p.emoji || ''}</span> ${p.name}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${p.description}</p>
                <div class="flex justify-between items-end">
                    <div>
                        <span class="text-3xl font-black text-pink-600">
                            ${p.price ? p.price.toFixed(2) + '€' : 'Consultar'}
                        </span>
                        ${p.oldPrice ? 
                            `<span class="text-lg text-gray-500 line-through ml-3">${p.oldPrice.toFixed(2)}€</span>` : 
                            ''}
                    </div>
                    <span class="text-sm text-gray-500">→ Ver detalles</span>
                </div>
            </div>
        </div>
    `;
}

// ===============================================
// RENDERIZADO DE PRODUCTOS DESTACADOS (index.html)
// ===============================================

function renderFeaturedProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.warn('⚠️ productsContainer no encontrado');
        return;
    }

    let featured = allProducts.filter(p => p.bestseller || (p.discount && p.discount > 0));
    
    // Fallback: si no hay destacados, mostrar primeros 6
    if (featured.length === 0) {
        featured = allProducts.slice(0, 6);
    }

    container.innerHTML = '';
    featured.forEach(product => {
        container.innerHTML += productCard(product);
    });
}

// ===============================================
// RENDERIZADO DE LA TIENDA (Tienda.html)
// ===============================================

let filteredProducts = [...allProducts];
let currentPage = 1;
const itemsPerPage = 12;

function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    container.innerHTML = '';
    pageProducts.forEach(product => {
        container.innerHTML += productCard(product);
    });

    updatePagination();
    updateResultsCount();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const numbers = document.getElementById('paginationNumbers');

    if (!numbers) return;
    numbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `w-12 h-12 rounded-xl font-bold ${i === currentPage ? 'bg-pink-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`;
        btn.onclick = () => {
            currentPage = i;
            renderProducts();
        };
        numbers.appendChild(btn);
    }

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function updateResultsCount() {
    const el = document.getElementById('resultsCount');
    if (el) {
        el.innerHTML = `Mostrando <strong>${filteredProducts.length}</strong> delicias`;
    }
}

function initStorePage() {
    // Filtros por categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            const category = btn.dataset.category;
            if (category === 'all') {
                filteredProducts = [...allProducts];
            } else {
                filteredProducts = allProducts.filter(p => p.category === category);
            }

            currentPage = 1;
            renderProducts();
        });
    });

    // Limpiar filtros
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
            document.querySelector('[data-category="all"]').classList.add('active-filter');
            filteredProducts = [...allProducts];
            currentPage = 1;
            renderProducts();
        });
    }

    // Paginación
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    document.getElementById('nextPage')?.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
            currentPage++;
            renderProducts();
        }
    });

    // Render inicial
    renderProducts();
}

// ===============================================
// MODAL DE DETALLE DE PRODUCTO
// ===============================================

function openProductModal(product) {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalEmoji').textContent = product.emoji || '';
    document.getElementById('modalDescription').textContent = product.description || 'Delicia irresistible hecha con amor rebelde.';
    
    const img = document.getElementById('modalImage');
    img.src = product.image || `https://via.placeholder.com/600x600/f8b4d9/ffffff?text=${product.emoji || 'Cake'}`;

    document.getElementById('modalPrice').textContent = product.price ? `${product.price.toFixed(2)}€` : 'Consultar';
    const oldPriceEl = document.getElementById('modalOldPrice');
    if (product.oldPrice) {
        oldPriceEl.textContent = `${product.oldPrice.toFixed(2)}€`;
        oldPriceEl.classList.remove('hidden');
    } else {
        oldPriceEl.classList.add('hidden');
    }

    const badgesContainer = document.getElementById('modalBadges');
    badgesContainer.innerHTML = '';
    (product.badges || []).forEach(badge => {
        const span = document.createElement('span');
        span.className = 'bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow';
        span.textContent = badge;
        badgesContainer.appendChild(span);
    });

    const sizesContainer = document.getElementById('modalSizes');
    const sizesGrid = sizesContainer.querySelector('.grid');
    sizesGrid.innerHTML = '';
    if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach(s => {
            const div = document.createElement('div');
            div.className = 'bg-gray-50 p-4 rounded-xl text-center';
            div.innerHTML = `<strong>${s.name}</strong><br><span class="text-pink-600 font-bold">${s.price}€</span><br><small class="text-gray-600">${s.servings} pers.</small>`;
            sizesGrid.appendChild(div);
        });
        sizesContainer.classList.remove('hidden');
    } else {
        sizesContainer.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.querySelector('.scale-95').classList.replace('scale-95', 'scale-100');
        modal.querySelector('.opacity-0').classList.replace('opacity-0', 'opacity-100');
    }, 10);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const card = modal.querySelector('.scale-100, .opacity-100');
    if (card) {
        card.classList.replace('scale-100', 'scale-95');
        card.classList.replace('opacity-100', 'opacity-0');
    }
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
});



