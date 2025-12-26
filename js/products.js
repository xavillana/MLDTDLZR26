// js/products.js
// BASE DE DATOS COMPLETA DE PRODUCTOS (con imágenes asignadas según las fotos proporcionadas)

const allProducts = [
  {
    id: "marcos-no-me-tientes",
    name: "Marcos No Me Tientes",
    emoji: "🍓",
    category: "tartas",
    image: "img/berry-cupcakes-1.jpg", // Cupcakes con frutos rojos
    shortDescription: "Vainilla inocente que se vuelve pecadora con frutos rojos.",
    longDescription: "Bizcocho de vainilla esponjoso que finge ser angelical, pero está relleno de crema suave y frutos rojos frescos que te hacen cerrar los ojos al primer bocado. Una tarta traviesa, prohibida para corazones débiles.",
    ingredients: "Harina, huevos, vainilla natural, crema de mantequilla, frutos rojos frescos (fresa, frambuesa, arándanos), azúcar glas.",
    formats: "Tarta, Cupcakes",
    cupcakePrice: 3.8,
    price: 35,
    badges: ["BESTSELLER"],
    sizes: [
      { name: "Pequeña", price: 25, servings: "4-6" },
      { name: "Mediana", price: 35, servings: "8-10" },
      { name: "Grande", price: 45, servings: "12-15" },
      { name: "XL", price: 55, servings: "18-20" }
    ]
  },
  {
    id: "muerte-por-chocolate",
    name: "Muerte por Chocolate",
    emoji: "🍫",
    category: "tartas",
    image: "img/MUERTECHOCOLATE.PNG",
    shortDescription: "Chocolate intenso que te arrastra al pecado más dulce.",
    longDescription: "Capas de bizcocho de cacao puro, ganache cremoso y trozos de chocolate negro. Una experiencia oscura, densa y adictiva que no deja supervivientes.",
    ingredients: "Cacao 70%, chocolate negro, crema, mantequilla, huevos, harina.",
    formats: "Tarta",
    price: 38,
    badges: ["INTENSO"],
    sizes: [
      { name: "Pequeña", price: 28, servings: "4-6" },
      { name: "Mediana", price: 38, servings: "8-10" },
      { name: "Grande", price: 48, servings: "12-15" },
      { name: "XL", price: 58, servings: "18-20" }
    ]
  },
  {
    id: "unicornio-fantastico",
    name: "Unicornio Fantástico",
    emoji: "🦄",
    category: "tartas",
    image: "img/colorful-cupcakes-party.jpg",
    shortDescription: "Explosión de colores y sprinkles que desafía la gravedad.",
    longDescription: "Tarta multicolor con buttercream arcoíris, sprinkles brillantes y un toque de magia comestible. Perfecta para fiestas que quieren romper las reglas del buen gusto... de la mejor manera.",
    ingredients: "Colorantes naturales, vainilla, buttercream, sprinkles, bizcocho esponjoso.",
    formats: "Tarta, Cupcakes",
    cupcakePrice: 4.2,
    price: 42,
    badges: ["FIESTA"],
    sizes: [
      { name: "Pequeña", price: 32, servings: "4-6" },
      { name: "Mediana", price: 42, servings: "8-10" },
      { name: "Grande", price: 52, servings: "12-15" },
      { name: "XL", price: 65, servings: "18-20" }
    ]
  },
  {
    id: "naranja-que-cacao",
    name: "Naranja que Cacao",
    emoji: "🥕",
    category: "tartas",
    image: "img/carrot-cake-slice.jpg",
    shortDescription: "Zanahoria traviesa con crema que no pide perdón.",
    longDescription: "Bizcocho húmedo de zanahoria, nueces tostadas y especias cálidas, cubierto de crema de queso cremosa. El clásico reinventado con actitud rebelde.",
    ingredients: "Zanahoria fresca, nueces, canela, crema de queso, azúcar moreno.",
    formats: "Tarta",
    price: 36,
    sizes: [
      { name: "Pequeña", price: 26, servings: "4-6" },
      { name: "Mediana", price: 36, servings: "8-10" },
      { name: "Grande", price: 46, servings: "12-15" }
    ]
  },
  {
    id: "revolcon-fresnata",
    name: "Revolcón Fresnata",
    emoji: "🍓",
    category: "tartas",
    image: "img/strawberry-naked-cake.jpg",
    shortDescription: "Fresas frescas y crema que no se anda con rodeos.",
    longDescription: "Tarta desnuda con capas de bizcocho vainillado, crema ligera y fresas frescas en abundancia. Natural, sensual y sin artificios.",
    ingredients: "Fresas frescas, nata montada, bizcocho vainilla, mermelada casera.",
    formats: "Tarta",
    price: 40,
    sizes: [
      { name: "Pequeña", price: 30, servings: "4-6" },
      { name: "Mediana", price: 40, servings: "8-10" },
      { name: "Grande", price: 50, servings: "12-15" }
    ]
  },
  {
    id: "limon-ileso",
    name: "Limón Ileso",
    emoji: "🍋",
    category: "cheesecakes",
    image: "img/lemon-cupcakes.jpg",
    shortDescription: "Cheesecake de limón que pica justo donde debe.",
    longDescription: "Base crujiente, relleno cremoso de queso con intenso sabor a limón fresco. Ácido, dulce y con final refrescante que te despierta los sentidos.",
    ingredients: "Queso crema, limón fresco, galleta digestive, mantequilla.",
    formats: "Cheesecake",
    price: 38,
    sizes: [
      { name: "Pequeña", price: 28, servings: "4-6" },
      { name: "Mediana", price: 38, servings: "8-10" },
      { name: "Grande", price: 48, servings: "12-15" }
    ]
  },
  {
    id: "red-velvet-rebelde",
    name: "Red Velvet Rebelde",
    emoji: "❤️",
    category: "tartas",
    image: "img/REDVELVET.PNG",
    shortDescription: "Rojo pasión con crema que no se arrepiente de nada.",
    longDescription: "El clásico red velvet elevado: bizcocho rojo intenso, crema de queso suave y un toque de cacao que lo hace inolvidable.",
    ingredients: "Cacao, colorante natural rojo, crema de queso, buttermilk.",
    formats: "Tarta, Cupcakes",
    cupcakePrice: 4.0,
    price: 39,
    badges: ["CLÁSICO REBELDE"],
    sizes: [
      { name: "Pequeña", price: 29, servings: "4-6" },
      { name: "Mediana", price: 39, servings: "8-10" },
      { name: "Grande", price: 49, servings: "12-15" }
    ]
  }
];

// ====== RENDERIZADO DE PRODUCTOS (para destacados y tienda) ======
function renderProducts(containerId, products = allProducts, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const toRender = limit ? products.slice(0, limit) : products;

  container.innerHTML = toRender.map(product => `
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
         onclick="openProductModal('${product.id}')">
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
        <div class="absolute top-4 left-4 flex gap-2">
          ${product.badges ? product.badges.map(b => 
            `<span class="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">${b}</span>`
          ).join('') : ''}
        </div>
      </div>
      <div class="p-6 text-center">
        <h3 class="text-2xl font-black text-gray-800 mb-2">${product.name}</h3>
        <p class="text-4xl mb-3">${product.emoji}</p>
        <p class="text-gray-600 mb-4 line-clamp-2">${product.shortDescription}</p>
        <p class="text-3xl font-bold text-pink-600">
          Desde ${product.sizes ? product.sizes[0].price : product.price}€
        </p>
      </div>
    </div>
  `).join('');
}

// Para destacados (index.html)
function renderFeaturedProducts() {
  renderProducts('productsContainer', allProducts.filter(p => p.badges?.includes('BESTSELLER')), 4);
}

// ====== MODAL DE PRODUCTO ======
function openProductModal(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('productModal');
  if (!modal) return;

  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.name;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalEmoji').textContent = product.emoji;
  document.getElementById('modalDescription').textContent = product.longDescription;

  // Badges
  const badgesContainer = document.getElementById('modalBadges');
  badgesContainer.innerHTML = product.badges ? product.badges.map(b => 
    `<span class="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold">${b}</span>`
  ).join('') : '';

  // Precios
  let pricesHTML = '';
  if (product.sizes) {
    pricesHTML = '<div class="grid grid-cols-2 gap-4 mt-6">' +
      product.sizes.map(size => `
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-lg font-semibold">${size.name}</p>
          <p class="text-3xl font-black text-pink-600">${size.price}€</p>
          <p class="text-sm text-gray-600">${size.servings} porciones</p>
        </div>
      `).join('') + '</div>';
  } else if (product.cupcakePrice) {
    pricesHTML = `
      <div class="text-center mb-6">
        <p class="text-2xl">Tarta desde <span class="text-4xl font-black text-pink-600">${product.price}€</span></p>
        <p class="text-xl mt-2">Cupcake unidad: <span class="font-bold text-pink-600">${product.cupcakePrice}€</span></p>
      </div>
    `;
  } else {
    pricesHTML = `<p class="text-5xl font-black text-pink-600 mb-4">${product.price}€</p>`;
  }
  document.getElementById('modalPrices').innerHTML = pricesHTML;

  // Mostrar modal
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.querySelector('.transform').classList.replace('scale-95', 'scale-100');
    modal.querySelector('.opacity-0').classList.replace('opacity-0', 'opacity-100');
  }, 10);
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  modal.querySelector('.transform').classList.replace('scale-100', 'scale-95');
  modal.querySelector('.opacity-100').classList.replace('opacity-100', 'opacity-0');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProductModal();
});
