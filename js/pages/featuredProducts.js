import { allProducts } from '../data/allProducts.js';
import { productCard } from '../components/productCard.js';

export function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    let featured = allProducts.filter(p => p.bestseller);

    if (featured.length === 0) {
        featured = allProducts.slice(0, 8);
    }

    container.innerHTML = featured.map(productCard).join('');
}
