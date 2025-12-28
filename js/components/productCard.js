// components/productCard.js

export function productCard(p) {
  return `
    <div class="gallery-card card-hover cursor-pointer transition-all"
         data-product='${JSON.stringify(p).replace(/'/g, "&apos;")}'
         onclick="handleProductClick(this)">

      <div class="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-64
                  flex items-center justify-center text-8xl">
        ${p.emoji}
      </div>

      <div class="p-6">
        <h3 class="text-2xl font-black text-gray-800 mb-2">
          ${p.emoji} ${p.name}
        </h3>

        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
          ${p.shortDescription}
        </p>

        <div class="flex justify-between items-end">
          <div>
            ${renderPrice(p)}
            ${renderOldPrice(p)}
          </div>
          ${renderBadges(p)}
        </div>
      </div>
    </div>
  `;
}

function renderPrice(p) {
  if (p.sizes?.length) {
    const min = Math.min(...p.sizes.map(s => s.price));
    return `<span class="text-2xl font-black text-pink-600">Desde ${min}€</span>`;
  }
  return `<span class="text-3xl font-black text-pink-600">${p.price}€</span>`;
}

function renderOldPrice(p) {
  return p.oldPrice
    ? `<span class="text-gray-500 line-through ml-2">${p.oldPrice}€</span>`
    : "";
}

function renderBadges(p) {
  return p.badges?.length
    ? `<div class="flex flex-wrap gap-2">
         ${p.badges.map(b => `
           <span class="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">${b}</span>
         `).join('')}
       </div>`
    : "";
}

// Handler seguro
window.handleProductClick = (el) => {
  const product = JSON.parse(el.dataset.product);
  openProductModal(product);
};
