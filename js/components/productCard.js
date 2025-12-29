import { openModal } from "../core/ui.js";

export function productCard(product) {
  return `
    <div 
      class="cursor-pointer group"
      onclick='openProductModal(${JSON.stringify(product)})'
    >
      <div class="overflow-hidden rounded-xl shadow-lg bg-white">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        >
      </div>

      <h3 class="mt-4 text-xl font-bold text-gray-800">${product.name}</h3>
      <p class="text-gray-600 text-sm">${product.short || "Dulce, rebelde y peligrosa."}</p>
    </div>
  `;
}

// Función global para abrir el modal con HTML externo
window.openProductModal = async function (product) {
  const modalHTML = await fetch("components/productModal.html").then(r => r.text());

  // Insertamos el HTML base del modal
  openModal(modalHTML, {
    onOpen: () => {
      // Rellenamos los datos dinámicos
      document.getElementById("pm-image").src = product.image;
      document.getElementById("pm-title").textContent = product.name;
      document.getElementById("pm-description").textContent =
        product.description || "Una creación rebelde, dulce y peligrosa.";
      document.getElementById("pm-category").textContent = product.category;

      // Tamaños
      const sizesContainer = document.getElementById("pm-sizes");
      if (product.sizes) {
        sizesContainer.innerHTML = product.sizes
          .map(
            s => `
            <li class="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
              <span>${s.label}</span>
              <span class="font-bold text-gray-800">${s.price}€</span>
            </li>
          `
          )
          .join("");
      } else {
        sizesContainer.innerHTML = `<p class="text-gray-500">Tamaño único</p>`;
      }

      // Botón de pedido
      document.getElementById("pm-order").href =
        "pedido.html?product=" + encodeURIComponent(product.name);
    }
  });
};
