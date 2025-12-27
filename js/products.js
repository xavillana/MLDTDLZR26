// js/products.js
// BASE DE DATOS COMPLETA DE PRODUCTOS (con imágenes asignadas según las fotos proporcionadas)
const allProducts = [
    // ==================== TARTAS ====================
    {
        id: "marcos-no-me-tientes",
        name: "Marcos No Me Tientes",
        emoji: "🍰",
        category: "tartas",
        shortDescription: "Vainilla inocente que se vuelve pecadora con frutos rojos.",
        longDescription: "Bizcocho de vainilla esponjoso que finge ser angelical, pero está relleno de crema suave y frutos rojos que te hacen gemir al primer bocado. Una tarta que te mira con ojos de 'ven, si te atreves'. Prohibida para corazones débiles.",
        ingredients: "Harina, huevos, vainilla natural, crema de mantequilla, frutos rojos frescos (frambuesa, fresa, arándanos), azúcar glas.",
        formats: "Tarta, Cupcakes",
        cupcakePrice: 3.8,
        price: 35,
        badges: ["BESTSELLER"],
        bestseller: false,
        sizes: [
            { name: "Pequena", price: 25, servings: "4-6" },
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
        shortDescription: "Chocolate tan intenso que debería venir con advertencia.",
        longDescription: "Una orgía de chocolate negro, brownie húmedo y ganache brillante que te arrastra al abismo del placer prohibido. Cada cucharada es un pecado mortal que no querrás confesar. Si vas a morir, que sea así: ahogado en cacao puro.",
        ingredients: "Chocolate 70%, cacao puro, brownie, mantequilla, huevos, ganache de chocolate con leche, sal marina.",
        formats: "Tarta, Cupcakes",
        cupcakePrice: 3.8,
        price: 35,
        oldPrice: 42,
        discount: 17,
        badges: ["BESTSELLER", "DESCUENTO"],
        bestseller: true,
        image: "img/muerte-por-chocolate.jpg",
        sizes: [
            { name: "Pequena", price: 25, servings: "4-6" },
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
        shortDescription: "Colores imposibles y sabor mágico.",
        longDescription: "Explosión de colores arcoíris que esconde capas de vainilla suave, buttercream de algodón de azúcar y sprinkles que brillan como polvo de hadas traviesas. Una tarta que te hace creer en la magia... y en las calorías que no cuentan cuando algo es tan bonito.",
        ingredients: "Bizcocho vainilla multicolor, buttercream, algodón de azúcar, sprinkles comestibles, esencia de vainilla.",
        formats: "Tarta",
        price: 40,
        badges: ["NUEVO"],
        sizes: [
            { name: "Pequena", price: 30, servings: "4-6" },
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
        shortDescription: "Fusión prohibida entre cítrico y chocolate.",
        longDescription: "Chocolate intenso que se rinde ante la frescura descarada de la naranja. Un duelo de sabores donde nadie gana... excepto tu paladar. Cremosa, jugosa, adictiva. Una tarta que te besa y te deja con ganas de más.",
        ingredients: "Chocolate negro, zumo y ralladura de naranja, bizcocho húmedo, ganache de cacao.",
        formats: "Tarta",
        price: 35,
        sizes: [
            { name: "Pequena", price: 25, servings: "4-6" },
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
        shortDescription: "El tiramisú que tus noches necesitan.",
        longDescription: "Café fuerte que empapa bizcochos suaves, mascarpone cremoso que se derrite en la boca y cacao que cae como polvo de estrellas prohibidas. Clásico italiano con actitud rebelde. Una tarta que te despierta... y te deja sin dormir.",
        ingredients: "Café espresso, mascarpone, savoiardi, cacao amargo, Marsala, huevos frescos.",
        formats: "Tarta",
        price: 38,
        badges: ["CLÁSICO"],
        sizes: [
            { name: "Pequena", price: 28, servings: "4-6" },
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
        shortDescription: "Fresas frescas y nata que no pide permiso.",
        longDescription: "Bizcocho ligero, nata montada que se desborda y fresas maduras que manchan los dedos. Un verano eterno en cada bocado. Dulce, jugoso, descarado. La tarta que todos quieren probar... y nadie quiere compartir.",
        ingredients: "Fresas frescas, nata 35%, bizcocho genovés, azúcar glas, vainilla.",
        formats: "Tarta",
        price: 36,
        oldPrice: 42,
        discount: 14,
        badges: ["DESCUENTO"],
        sizes: [
            { name: "Pequena", price: 26, servings: "4-6" },
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
        shortDescription: "Frutos rojos que te hacen mover las caderas.",
        longDescription: "Base crujiente, cheesecake cremoso y salsa de frutos rojos que se derrama sin control. Dulce, ácido, sensual. Una tarta que te invita a bailar... descalzo y sin remordimientos.",
        ingredients: "Queso crema, galletas digestive, mantequilla, frutos rojos, azúcar, limón.",
        formats: "Tarta",
        price: 40,
        badges: ["BESTSELLER"],
        bestseller: false,
        sizes: [
            { name: "Pequena", price: 30, servings: "4-6" },
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
        shortDescription: "Tropical, exótico y sin pasaporte.",
        longDescription: "Mango maduro que se funde con cheesecake cremoso y una base que cruje como arena caliente. Un viaje al caribe sin salir de casa. Dulce, ácido, adictivo. La tarta que te broncea el alma.",
        ingredients: "Mango fresco, queso crema, galletas, mantequilla, pasión, lima.",
        formats: "Tarta",
        price: 42,
        badges: ["TROPICAL"],
        sizes: [
            { name: "Pequena", price: 32, servings: "4-6" },
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
        shortDescription: "Ácido que te despierta y dulce que te calma.",
        longDescription: "Cheesecake fresco con limón que pica justo lo necesario. Equilibrio perfecto entre lo que te quema y lo que te salva. Una tarta que te besa con lengua... de cítricos.",
        ingredients: "Queso crema, limón fresco, galletas, mantequilla, azúcar.",
        formats: "Tarta",
        price: 38,
        sizes: [
            { name: "Pequena", price: 28, servings: "4-6" },
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
        shortDescription: "New York clásico con actitud rebelde.",
        longDescription: "Denso, cremoso, perfecto. El cheesecake que no necesita presentación pero sí un tenedor. Base crujiente, relleno que se derrite y un sabor que te hace cerrar los ojos. Clásico nunca fue tan peligroso.",
        ingredients: "Queso crema Philadelphia, galletas digestive, mantequilla, huevos, azúcar, vainilla.",
        formats: "Tarta",
        price: 36,
        badges: ["CLÁSICO", "BESTSELLER"],
        bestseller: false,
        sizes: [
            { name: "Pequena", price: 26, servings: "4-6" },
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
        shortDescription: "Chocolate que no pide perdón.",
        longDescription: "Cheesecake de chocolate intenso con capas de ganache que brillan como pecado recién cometido. Amargo, dulce, cremoso. Una tarta que te mancha los dedos... y la conciencia.",
        ingredients: "Chocolate negro, queso crema, cacao puro, ganache, base de Oreo.",
        formats: "Tarta",
        price: 40,
        oldPrice: 48,
        discount: 17,
        badges: ["DESCUENTO"],
        sizes: [
            { name: "Pequena", price: 30, servings: "4-6" },
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
        shortDescription: "Oreo triturada y sin remordimientos.",
        longDescription: "Cheesecake con galletas Oreo enteras y trituradas que se funden en una crema negra y blanca. Crujiente, suave, adictivo. La tarta que te hace lamer el plato... y pedir otra ronda.",
        ingredients: "Galletas Oreo, queso crema, chocolate, nata, azúcar.",
        formats: "Tarta",
        price: 42,
        badges: ["BESTSELLER"],
        bestseller: false,
        sizes: [
            { name: "Pequena", price: 32, servings: "4-6" },
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
        shortDescription: "¿Podrás resistir este pecado  de pura perversión carmesí?",
        longDescription: "Red Velvet tan suave y húmedo que se desliza como un secreto prohibido. Su color rojo te advierte del peligro, pero el frosting de queso crema te convence de que vale la pena el riesgo. Un cupcake que te deja con ganas de más... siempre más.",
        ingredients: "Cacao, buttermilk, colorante natural rojo, vinagre, frosting de queso crema, vainilla.",
        formats: "Cupcakes, Tarta",
        price: 3.5,
        cupcakePrice: 3.5,
        badges: ["BESTSELLER"],
        bestseller: true,
        image: "img/red-velvet1.jpg",
    },
    {
        id: "zanahoria",
        name: "Zana OH! RIA",
        emoji: "🥕",
        category: "cupcakes",
        shortDescription: "¿Quién dijo que lo tradicional no podía ser atrevido y seductor?",
        longDescription: "Carrot Cake hecho pecado. Rebelde, húmedo, prohibido. La canela, el jengibre y las nueces conspiran para seducir tus sentidos mientras el frosting de queso te susurra obscenidades. ¿Te atreves a caer en esta tentación vegetal? Un crimen de textura que deberían prohibir.",
        ingredients: "Zanahoria fresca rallada, harina integral, azúcar moreno, nueces, canela, jengibre, huevos, aceite de girasol, frosting de queso crema.",
        formats: "Cupcakes, Tarta",
        price: 3.5,
        cupcakePrice: 3.5,
        betseller: true,
        image: "img/carrot-cake.jpg",
        badges: []
        
    },
    {
        id: "pensamiento-citrico",
        name: "Pensamiento Cítrico",
        emoji: "🍋",
        category: "cupcakes",
        shortDescription: "Limón que pica y frosting que calma.",
        longDescription: "Bizcocho de limón fresco con merengue suave que se derrite en la boca. Ácido al principio, dulce al final. Un cupcake que juega contigo: te despierta, te refresca y te deja pidiendo otro beso cítrico.",
        ingredients: "Limón fresco, harina, mantequilla, merengue italiano, ralladura de limón.",
        formats: "Cupcakes, Tarta",
        price: 3.8,
        cupcakePrice: 3.8,
        badges: ["BESTSELLER"],
        bestseller: false
    },
    {
        id: "choco-bailes",
        name: "Choco Bailes",
        emoji: "🍫",
        category: "cupcakes",
        shortDescription: "¿Por qué conformarte con lo simple si puedes pecar a lo grande?",
        longDescription: "Chocolate y licor jugando sucio en tu boca. Baileys deslizándose provocativo entre capas de pecado oscuro. Intensidad criminal en cada mordisco. Adictivo hasta el último mordisco. Una combinación perfecta y exquisita que te dejará con ganas de más. ",
        ingredients: "Chocolate 70%, ganache, cacao puro, buttercream de Bailys.",
        formats: "Cupcakes, Tarta",
        price: 3.5,
        cupcakePrice: 3.5,
        badges: [],
        bestseller: true,
        image: "img/muerte-por-chocolate.jpg"
    },
    {
        id: "yogurt-salvaje",
        name: "Yogurt Salvaje",
        emoji: "🫐",
        category: "cupcakes",
        shortDescription: "¿Alguna vez has probado el ácido sabor de una dulce venganza?",
        longDescription: "Yogurt natural cremoso con frutos del bosque que estallan en la boca. Ligero pero intenso, saludable pero goloso. Un cupcake que te hace sentir bien... mientras pecas deliciosamente.",
        ingredients: "Yogurt griego, frutos rojos frescos, bizcocho vainilla, miel.",
        formats: "Cupcakes",
        price: 3.8,
        badges: ["SALUDABLE"],
        bestseller: true,
        image: "img/yogurt-salvaje.png"
        
    },
    {
        id: "crimen-cuqui",
        name: "Crimen Cuqui",
        emoji: "🔪",
        category: "cupcakes",
        shortDescription: "El más goloso y peligroso de todos.",
        longDescription: "Chocolate, caramelo salado y una sorpresa cremosa en el centro que te hace jadear. Dulce, salado, crujiente, suave. Un cupcake que debería estar prohibido por provocar adicción inmediata.",
        ingredients: "Chocolate, caramelo salado, toffee, ganache, centro líquido.",
        formats: "Cupcakes, Tarta",
        price: 4.0,
        cupcakePrice: 4.0,
        badges: ["PREMIUM", "BESTSELLER"],
        bestseller: false
    }
];

// ===============================================
// UTILIDADES SEGURAS
// ===============================================

// Evita errores si algo no existe
const safe = (value, fallback = "") => value ?? fallback;

// Busca producto por ID
function getProductById(id) {
    return allProducts.find(p => p.id === id);
}

// ===============================================
// TARJETA DE PRODUCTO (segura y optimizada)
// ===============================================

function productCard(p) {
    const minPrice = p.sizes ? Math.min(...p.sizes.map(s => s.price)) : null;

    return `
        <div class="gallery-card card-hover cursor-pointer transition-all"
             data-id="${p.id}"
             onclick="openProductModalById('${p.id}')">

            <div class="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-64 flex items-center justify-center text-8xl">
                ${safe(p.image)}
            </div>

            <div class="p-6">
                <h3 class="text-2xl font-black text-gray-800 mb-2">${safe(p.emoji)} ${safe(p.name)}</h3>

                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    ${safe(p.shortDescription, p.description)}
                </p>

                <div class="flex justify-between items-end">
                    <div>
                        ${
                            p.sizes
                                ? `<span class="text-2xl font-black text-pink-600">Desde ${minPrice}€</span>`
                                : `<span class="text-3xl font-black text-pink-600">${p.price.toFixed(2)}€</span>`
                        }
                        ${
                            p.oldPrice
                                ? `<span class="text-gray-500 line-through ml-2">${p.oldPrice.toFixed(2)}€</span>`
                                : ""
                        }
                    </div>

                    ${
                        p.badges?.length
                            ? `<div class="flex flex-wrap gap-2">
                                ${p.badges.map(b => `<span class="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">${b}</span>`).join("")}
                               </div>`
                            : ""
                    }
                </div>
            </div>
        </div>
    `;
}

// ===============================================
// RENDER DESTACADOS (index.html)
// ===============================================

function renderFeaturedProducts() {
    const container = document.getElementById("productsContainer");
    if (!container) {
        console.warn("⚠️ productsContainer no encontrado aún");
        return;
    }

    let featured = allProducts.filter(p => p.bestseller || p.discount > 0);

    if (featured.length === 0) {
        featured = allProducts.slice(0, 8);
    }

    container.innerHTML = featured.map(productCard).join("");
}

// ===============================================
// MODAL DE PRODUCTO (optimizado y seguro)
// ===============================================

function openProductModalById(id) {
    const product = getProductById(id);
    if (!product) {
        console.error("❌ Producto no encontrado:", id);
        return;
    }
    openProductModal(product);
}

function openProductModal(product) {
    const modal = document.getElementById("productModal");
    if (!modal) return;

    // Título y emoji
    document.getElementById("modalTitle").textContent = safe(product.name);
    document.getElementById("modalEmoji").textContent = safe(product.image);

    // Descripción ampliada
    document.getElementById("modalDescription").innerHTML = `
        <p class="text-xl font-bold text-pink-600 mb-3">${safe(product.shortDescription)}</p>
        <p class="text-gray-700 leading-relaxed mb-6">${safe(product.longDescription)}</p>
        <p class="text-sm italic text-gray-600 mb-2"><strong>Ingredientes:</strong> ${safe(product.ingredients)}</p>
        <p class="text-sm italic text-gray-600"><strong>Formatos:</strong> ${safe(product.formats)}</p>
    `;

    // Imagen placeholder
    document.getElementById("modalImage").src =
        `https://via.placeholder.com/600x600/f8b4d9/ffffff?text=${encodeURIComponent(product.emoji || "Cake")}`;

    // Badges
    const badgesContainer = document.getElementById("modalBadges");
    badgesContainer.innerHTML = "";
    (product.badges || []).forEach(badge => {
        const span = document.createElement("span");
        span.className = "bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow";
        span.textContent = badge;
        badgesContainer.appendChild(span);
    });

    // PRECIOS DINÁMICOS
    const formats = Array.isArray(product.formats) ? product.formats : [];
    const hasCupcakes = formats.some(f => f.toLowerCase() === "cupcakes");
    const hasTartas = formats.some(f => f.toLowerCase() === "tarta");
    const hasBothFormats = hasCupcakes && hasTartas;

    let pricesHTML = "";

    if (hasBothFormats) {
        pricesHTML = `
            <div class="mb-8">
                <h3 class="text-2xl font-bold mb-6 text-gray-800">Precios por formato</h3>
                <div class="bg-gray-50 rounded-2xl p-8 space-y-8">

                    <div class="flex justify-between items-center border-b pb-6">
                        <p class="text-xl font-bold">Cupcake individual</p>
                        <p class="text-4xl font-black text-pink-600">${(product.cupcakePrice || product.price).toFixed(2)}€</p>
                    </div>

                    <div>
                        <p class="text-xl font-bold mb-4">Tarta completa</p>
                        <div class="grid grid-cols-2 gap-4">
                            ${(product.sizes || []).map(s => `
                                <div class="bg-white p-4 rounded-xl text-center shadow">
                                    <p class="font-bold text-lg">${s.name}</p>
                                    <p class="text-3xl font-black text-pink-600">${s.price}€</p>
                                    <p class="text-sm text-gray-600">${s.servings} personas</p>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                </div>
            </div>
        `;
    } else if (product.sizes) {
        const minPrice = Math.min(...product.sizes.map(s => s.price));
        pricesHTML = `
            <div class="mb-8">
                <p class="text-5xl font-black text-pink-600 mb-6">Desde ${minPrice}€</p>
                <h3 class="text-2xl font-bold mb-4 text-gray-800">Tamaños disponibles</h3>
                <div class="grid grid-cols-2 gap-4">
                    ${product.sizes.map(s => `
                        <div class="bg-gray-50 p-6 rounded-xl text-center">
                            <p class="font-bold text-xl">${s.name}</p>
                            <p class="text-4xl font-black text-pink-600 my-2">${s.price}€</p>
                            <p class="text-gray-600">${s.servings} personas</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    } else {
        pricesHTML = `
            <div class="mb-8">
                <p class="text-6xl font-black text-pink-600">${product.price.toFixed(2)}€</p>
                <p class="text-2xl text-gray-700 mt-2">por unidad</p>
            </div>
        `;
    }

    const pricesContainer = document.getElementById("modalPrices");
    if (pricesContainer) pricesContainer.innerHTML = pricesHTML;

    // Mostrar modal con animación segura
    modal.classList.remove("hidden");

    const card = modal.querySelector(".transform");
    if (card) {
        card.classList.remove("scale-95", "opacity-0");
        card.classList.add("scale-100", "opacity-100");
    }
}

// ===============================================
// CERRAR MODAL
// ===============================================

function closeProductModal() {
    const modal = document.getElementById("productModal");
    if (!modal) return;

    const card = modal.querySelector(".scale-100");
    if (card) {
        card.classList.replace("scale-100", "scale-95");
        card.classList.replace("opacity-100", "opacity-0");
    }

    setTimeout(() => modal.classList.add("hidden"), 300);
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeProductModal();
});
