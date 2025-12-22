// ===============================================
// BASE DE DATOS DE PRODUCTOS
// ===============================================

const allProducts = [
    {id:"galaxia",name:"Tarta Galaxia Rebelde",emoji:"sparkles",category:"tartas",description:"Explosión cósmica de vainilla y frambuesa",price:45.99,oldPrice:59.99,discount:23,rating:5,reviews:127,sales:89,bestseller:false,vegan:false,gradient:"from-pink-300 via-purple-300 to-indigo-300",badges:["NUEVO","EDICIÓN LIMITADA"],sizes:[{name:"Pequeña",price:35.99,servings:"4-6"},{name:"Mediana",price:45.99,servings:"8-10"},{name:"Grande",price:55.99,servings:"12-15"}]},
    {id:"cupcakes-green",name:"Cupcakes Power Green",emoji:"seedling",category:"cupcakes",description:"100% veganos de matcha y limón",price:28.99,oldPrice:null,discount:0,rating:5,reviews:94,sales:156,bestseller:true,vegan:true,gradient:"from-green-200 via-lime-200 to-emerald-300",badges:["VEGANO","BESTSELLER"],sizes:[{name:"6 uds",price:28.99,servings:"6"},{name:"12 uds",price:52.99,servings:"12"},{name:"24 uds",price:98.99,servings:"24"}]},
    {id:"cheesecake-fresa",name:"Cheesecake Fresa Salvaje",emoji:"strawberry",category:"cheesecakes",description:"Cremoso y con fresas frescas",price:34.99,oldPrice:null,discount:0,rating:5,reviews:203,sales:178,bestseller:true,vegan:false,gradient:"from-red-200 to-pink-300",badges:["POPULAR"],sizes:[{name:"Individual",price:8.99,servings:"1"},{name:"Mediana",price:34.99,servings:"8-10"},{name:"Grande",price:44.99,servings:"12-14"}]},
    {id:"brownies-caramelo",name:"Brownies Caramelo Rebelde",emoji:"candy",category:"brownies",description:"Chocolate intenso + caramelo salado",price:26.99,oldPrice:32.99,discount:18,rating:4.8,reviews:86,sales:134,bestseller:false,vegan:false,gradient:"from-amber-200 to-yellow-300",badges:["INTENSO"],sizes:[{name:"6 uds",price:26.99,servings:"6"},{name:"12 uds",price:48.99,servings:"12"}]},
    {id:"red-velvet",name:"Red Velvet Diabólica",emoji:"heart",category:"tartas",description:"Rojo pasión con crema de queso",price:48.99,oldPrice:null,discount:0,rating:5,reviews:312,sales:289,bestseller:true,vegan:false,gradient:"from-red-400 to-pink-500",badges:["BESTSELLER"],sizes:[{name:"Pequeña",price:38.99,servings:"6-8"},{name:"Mediana",price:48.99,servings:"10-12"},{name:"Grande",price:62.99,servings:"15-18"}]},
    {id:"macarons-neon",name:"Macarons Neon Party",emoji:"macaron",category:"cupcakes",description:"12 macarons de colores fluorescentes",price:32.00,oldPrice:null,discount:0,rating:4.9,reviews:67,sales:201,bestseller:false,vegan:true,gradient:"from-purple-300 via-pink-300 to-cyan-300",badges:["VEGANO"],sizes:[{name:"12 uds",price:32.00,servings:"12"}]},
    {id:"unicornio",name:"Tarta Unicornio Mágico",emoji:"unicorn",category:"tartas",description:"Para los que aún creen en la magia",price:62.50,oldPrice:75.00,discount:17,rating:5,reviews:189,sales:145,bestseller:false,vegan:false,gradient:"from-pink-200 via-purple-200 to-blue-300",badges:["EDICIÓN LIMITADA"],sizes:[{name:"Mediana",price:62.50,servings:"12-15"}]},
    {id:"halloween",name:"Cupcakes Halloween Terror-Dulces",emoji:"jack-o-lantern",category:"cupcakes",description:"Edición terroríficamente deliciosa",price:30.00,oldPrice:null,discount:0,rating:4.7,reviews:54,sales:312,bestseller:true,vegan:false,gradient:"from-orange-400 to-black",badges:["TEMPORADA"],sizes:[{name:"6 uds",price:30.00,servings:"6"}]},
    {id:"limon",name:"Tarta de Limón Explosiva",emoji:"lemon",category:"tartas",description:"Ácida, dulce y refrescante",price:39.99,oldPrice:null,discount:0,rating:5,reviews:98,sales:167,bestseller:false,vegan:false,gradient:"from-yellow-200 to-lime-300",badges:[],sizes:[{name:"Pequeña",price:29.99,servings:"6-8"},{name:"Mediana",price:39.99,servings:"10-12"}]},
    {id:"cookies",name:"Cookies Gigantes con Chispas",emoji:"cookie",category:"brownies",description:"Crujientes por fuera, blanditas por dentro",price:24.99,oldPrice:29.99,discount:17,rating:4.9,reviews:201,sales:423,bestseller:true,vegan:true,gradient:"from-amber-300 to-orange-300",badges:["VEGANO","BESTSELLER"],sizes:[{name:"6 uds",price:24.99,servings:"6"}]},
    {id:"oreo",name:"Cheesecake Oreo Destroyer",emoji:"cookie",category:"cheesecakes",description:"Negro total, sabor brutal",price:36.99,oldPrice:null,discount:0,rating:5,reviews:278,sales:334,bestseller:true,vegan:false,gradient:"from-gray-800 to-black",badges:["BESTSELLER"],sizes:[{name:"Mediana",price:36.99,servings:"10-12"}]},
    {id:"banoffee",name:"Banoffee Pie Prohibido",emoji:"banana",category:"tartas",description:"Plátano, toffee y nata montada",price:41.50,oldPrice:null,discount:0,rating:4.9,reviews:145,sales:198,bestseller:false,vegan:false,gradient:"from-yellow-300 via-amber-300 to-brown-400",badges:[],sizes:[{name:"Mediana",price:41.50,servings:"8-10"}]}
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