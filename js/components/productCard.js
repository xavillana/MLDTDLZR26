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
