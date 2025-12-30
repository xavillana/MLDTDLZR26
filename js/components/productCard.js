// js/components/productCard.js

import { openModal } from '../core/ui.js'; // Cambia a openModal directamente
import { renderPriceBlock, renderBadges } from './utils.js';

/**
 * Genera el HTML de una tarjeta de producto
 * @param {Object} product - Objeto de producto desde allProducts.js
 * @returns {string} HTML de la card
 */
// js/components/productCard.js

export function productCard(product) {
  const { name, image, shortDescription = 'Dulce rebelde y peligrosamente adictivo.', badges = [] } = product;

  const minPrice = product.sizes
    ? Math.min(...product.sizes.map(s => s.price))
    : product.price || product.cupcakePrice || 0;

  // Codificamos el JSON de forma segura para HTML
  const safeProductData = JSON.stringify(product)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return `
    <article 
      class="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      role="button"
      tabindex="0"
      aria-label="Ver detalles de ${name}"
      data-product="${safeProductData}"
    >
      <div class="relative overflow-hidden">
        <img 
          src="${image || '/img/placeholder.jpg'}" 
          alt="${name}"
          loading="lazy"
          class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        >
        ${renderBadges({ badges })}
      </div>

      <div class="p-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-2">${name}</h3>
        <p class="text-gray-600 text-base line-clamp-2 mb-4">
          ${shortDescription}
        </p>
        <div class="flex justify-between items-end">
          <p class="text-3xl font-black text-pink-600">
            Desde ${minPrice}€
          </p>
          <span class="text-pink-600 font-bold text-lg">→ Ver más</span>
        </div>
      </div>
    </article>
  `;
}
 
/**
 * Inicializa los eventos de clic/teclado en todas las cards
 * Se llama automáticamente después de renderizar productos
 */
export function initProductCards() {
  document.querySelectorAll('[data-product]').forEach(card => {
    const product = JSON.parse(card.dataset.product);

    const openModal = (e) => {
      if (e.type === 'keydown' && !['Enter', ' '].includes(e.key)) return;
      e.preventDefault();
      openGlobalProductModal(product);
    };

    card.addEventListener('click', openModal);
    card.addEventListener('keydown', openModal);
  });
}

/**
 * Abre el modal global con los detalles del producto
 * @param {Object} product
 */
async function openGlobalProductModal(product) {
  let modalHTML = sessionStorage.getItem('productModalHTML');
  
  if (!modalHTML) {
    try {
      const response = await fetch('components/productModal.html');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      modalHTML = await response.text();
      sessionStorage.setItem('productModalHTML', modalHTML);
    } catch (err) {
      console.error('Error cargando productModal.html:', err);
      // Fallback simple si falla el fetch
      modalHTML = `
        <div class="p-12 text-center">
          <h2 class="text-4xl font-black text-pink-600 mb-6">${product.name}</h2>
          <img src="${product.image}" alt="${product.name}" class="w-full max-w-md mx-auto rounded-2xl mb-8">
          <p class="text-xl text-gray-700 mb-6">${product.longDescription || product.shortDescription}</p>
          <a href="pedido.html?product=${encodeURIComponent(product.name)}" 
             class="bg-pink-600 text-white font-black py-4 px-8 rounded-2xl hover:bg-pink-700 transition">
            ¡Hacer pedido!
          </a>
        </div>
      `;
    }
  }

  // Usamos openModal directamente (más seguro)
  openModal(modalHTML, {
    onOpen: () => {
      // Esperamos un tick para que el DOM se actualice
      setTimeout(() => populateProductModal(product), 50);
    }
  });
}

/**
 * Rellena el modal con los datos del producto
 * @param {Object} product
 */
function populateProductModal(product) {
  const {
    name,
    emoji = '🍰',
    image,
    shortDescription,
    longDescription = '',
    ingredients = [],
    formats = [],
    badges = [],
  } = product;

  // Imagen principal
  const imgEl = document.getElementById('pm-image');
  if (imgEl) {
    imgEl.src = image || '/img/placeholder.jpg';
    imgEl.alt = name;
  }

  // Título
  const titleEl = document.getElementById('pm-title');
  if (titleEl) titleEl.textContent = name;

  // Emoji
  const emojiEl = document.getElementById('pm-emoji');
  if (emojiEl) emojiEl.textContent = emoji;

  // Descripciones
  const shortDescEl = document.getElementById('pm-short-desc');
  if (shortDescEl) shortDescEl.textContent = shortDescription || '';

  const longDescEl = document.getElementById('pm-long-desc');
  if (longDescEl) {
    longDescEl.innerHTML = longDescription
      ? longDescription.replace(/\n/g, '<br>')
      : 'Una creación rebelde, dulce y peligrosa.';
  }

  // Ingredientes y formatos
  const ingredientsEl = document.getElementById('pm-ingredients');
  if (ingredientsEl) {
    ingredientsEl.textContent = Array.isArray(ingredients)
      ? ingredients.join(', ')
      : ingredients || 'No especificados';
  }

  const formatsEl = document.getElementById('pm-formats');
  if (formatsEl) {
    formatsEl.textContent = Array.isArray(formats)
      ? formats.join(' • ')
      : formats || 'Tarta';
  }

  // Badges
  const badgesContainer = document.getElementById('pm-badges');
  if (badgesContainer) {
    badgesContainer.innerHTML = renderBadges({ badges });
  }

  // Precios
  const pricesContainer = document.getElementById('pm-prices');
  if (pricesContainer) {
    pricesContainer.innerHTML = renderPriceBlock(product);
  }

  // Botón de pedido
  const orderBtn = document.getElementById('pm-order');
  if (orderBtn) {
    orderBtn.href = `pedido.html?product=${encodeURIComponent(name)}`;
  }
}
