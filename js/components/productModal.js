import { renderPriceBlock } from './utils.js';

export function initProductModal() {
    // Aquí puedes añadir animaciones o listeners extra si quieres
}

export function openProductModal(product = {}) {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalTitle');
    const emojiEl = document.getElementById('modalEmoji');
    const descEl = document.getElementById('modalDescription');
    const imgEl = document.getElementById('modalImage');
    const badgesContainer = document.getElementById('modalBadges');
    const pricesContainer = document.getElementById('modalPrices');

    const {
        name = 'Producto sin nombre',
        image = '',
        emoji = '🍰',
        shortDescription = '',
        longDescription = '',
        ingredients = 'No especificados',
        formats = 'No disponibles',
        badges = [],
        sizes = null,
        price = null,
        cupcakePrice = null
    } = product;

    titleEl.textContent = name;
    emojiEl.textContent = emoji;

    descEl.innerHTML = `
        <p class="text-xl font-bold text-pink-600 mb-3">${shortDescription}</p>
        <p class="text-gray-700 leading-relaxed mb-6">${longDescription}</p>
        <p class="text-sm italic text-gray-600 mb-2"><strong>Ingredientes:</strong> ${ingredients}</p>
        <p class="text-sm italic text-gray-600"><strong>Formatos:</strong> ${formats}</p>
    `;

    imgEl.src = image || `https://via.placeholder.com/600x600/f8b4d9/ffffff?text=${emoji}`;

    badgesContainer.innerHTML = badges
        .map(b => `<span class="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow">${b}</span>`)
        .join('');

    pricesContainer.innerHTML = renderPriceBlock(product);

    modal.classList.remove('hidden');
    modal.classList.add('opacity-100', 'scale-100');
}

window.openProductModal = openProductModal;
