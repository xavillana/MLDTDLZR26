// js/components/productCard.js

import { openModal } from '../core/ui.js';
import { renderPriceBlock, renderBadges } from './utils.js';

export function productCard(product) {
  const { name, emoji = '🍰', image, shortDescription = 'Dulce rebelde y peligrosamente adictivo.', badges = [] } = product;

  const minPrice = product.sizes
    ? Math.min(...product.sizes.map(s => s.price))
    : product.price || product.cupcakePrice || 0;

  const safeProductData = btoa(unescape(encodeURIComponent(JSON.stringify(product))));

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
          src="${image || 'img/placeholder.jpg'}" 
          alt="${name}"
          loading="lazy"
          class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        >
        ${renderBadges({ badges })}
      </div>
      <div class="p-6 text-center">
        <h3 class="text-2xl font-black text-gray-800 mb-2">
          <span class="text-3xl mr-2" aria-hidden="true">${emoji}</span>
          ${name}
        </h3>
        <p class="text-gray-600 line-clamp-2 mb-4">${shortDescription}</p>
        <p class="text-pink-600 font-black text-2xl">
          ${minPrice ? `Desde ${minPrice}€` : 'Consultar precio'}
        </p>
      </div>
    </article>
  `;
}

export function initProductCards() {
  document.querySelectorAll('[data-product]').forEach(card => {
    const clickHandler = () => {
      const encoded = card.getAttribute('data-product');
      const product = JSON.parse(decodeURIComponent(escape(atob(encoded))));

      // Carga el HTML del modal
      fetch('components/productModal.html')
        .then(response => {
          if (!response.ok) throw new Error('Modal no encontrado');
          return response.text();
        })
        .then(html => {
          openModal(html, {
            onOpen: () => {
              // Rellenamos todos los campos
              document.getElementById('pm-emoji').textContent = product.emoji || '🍰';
              document.getElementById('pm-name').textContent = product.name;
              document.getElementById('pm-short-desc').textContent = product.shortDescription || '';
              document.getElementById('pm-long-desc').innerHTML = (product.longDescription || 'Una delicia rebelde').replace(/\n/g, '<br>');
              document.getElementById('pm-image').src = product.image || 'img/placeholder.jpg';
              document.getElementById('pm-image').alt = product.name;

              const ingredientsEl = document.getElementById('pm-ingredients');
              ingredientsEl.innerHTML = (product.ingredients || []).map(i => `<li class="bg-gray-100 px-4 py-2 rounded-full">${i}</li>`).join('');

              document.getElementById('pm-formats').textContent = (product.formats || ['Tarta']).join(' • ');
              document.getElementById('pm-badges').innerHTML = renderBadges(product);
              document.getElementById('pm-prices').innerHTML = renderPriceBlock(product);

              document.getElementById('pm-order').href = `pedido.html?product=${encodeURIComponent(product.name)}`;
            }
          });
        })
        .catch(err => {
          console.error(err);
          openModal('<div class="text-center py-20 text-red-600 text-2xl">Error al cargar el modal 😔</div>');
        });
    };

    card.addEventListener('click', clickHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    });
  });
}
