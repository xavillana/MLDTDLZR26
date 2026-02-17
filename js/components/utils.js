// js/components/utils.js

export const renderPrice = (p) => {
  if (p.sizes?.length) {
    const minPrice = Math.min(...p.sizes.map(s => s.price));
    return `<span class="text-2xl font-black text-pink-600">Desde ${minPrice}€</span>`;
  }
  return `<span class="text-3xl font-black text-pink-600">${p.price?.toFixed(2)}€</span>`;
};

export const renderOldPrice = (p) =>
  p.oldPrice ? `<span class="text-gray-500 line-through ml-2">${p.oldPrice.toFixed(2)}€</span>` : '';

export const renderBadges = (p) =>
  p.badges?.length
    ? `<div id="modalBadges" class="flex flex-wrap gap-2 justify-center">
        ${p.badges.map((b, i) => `
          <span style="--i:${i}" class="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">${b}</span>
        `).join('')}
       </div>`
    : '';

export const renderPriceBlock = (product) => {
  const { formats = [], sizes, price, cupcakePrice } = product;

  const hasBoth = formats.includes('Tarta') && formats.includes('Cupcakes');

  if (hasBoth && sizes) {
    return `
      <div class="mb-8">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Precios por formato</h3>
        <div class="bg-gray-50 rounded-2xl p-8 space-y-8">
          <div class="flex justify-between items-center border-b pb-6">
            <p class="text-xl font-bold">Cupcake individual</p>
            <p class="text-4xl font-black text-pink-600">
              ${(cupcakePrice || price).toFixed(2)}€
            </p>
          </div>
          <div>
            <p class="text-xl font-bold mb-6">Tarta completa</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              ${sizes.map(s => `
                <div class="bg-white p-4 rounded-xl text-center shadow">
                  <p class="font-bold text-lg">${s.size || s.name}</p>
                  <p class="text-3xl font-black text-pink-600">${s.price}€</p>
                  <p class="text-sm text-gray-600">${s.servings} personas</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (sizes) {
    return `
      <div class="mb-8">
        <p class="text-5xl font-black text-pink-600 mb-6">
          Desde ${Math.min(...sizes.map(s => s.price))}€
        </p>
        <h3 class="text-2xl font-bold mb-4 text-gray-800">Tamaños disponibles</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${sizes.map(s => `
            <div class="bg-gray-50 p-6 rounded-xl text-center">
              <p class="font-bold text-xl">${s.size || s.name}</p>
              <p class="text-4xl font-black text-pink-600 my-2">${s.price}€</p>
              <p class="text-gray-600">${s.servings} personas</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="mb-8">
      <p class="text-6xl font-black text-pink-600">${price?.toFixed(2)}€</p>
      <p class="text-2xl text-gray-700 mt-2">por unidad</p>
    </div>
  `;
};
