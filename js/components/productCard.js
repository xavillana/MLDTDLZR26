import { renderPrice, renderOldPrice, renderBadges } from './utils.js';

export function productCard(p) {
    return `
        <div class="gallery-card card-hover cursor-pointer transition-all"
             data-product='${JSON.stringify(p).replace(/'/g, "&apos;")}'
             onclick="handleProductClick(this)">

            <div class="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-64 overflow-hidden">
                <img src="${p.image}" 
                     alt="${p.name}" 
                     class="w-full h-full object-cover rounded-t-2xl" />
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

export function handleProductClick(el) {
    const product = JSON.parse(el.dataset.product);
    window.openProductModal(product);
}
