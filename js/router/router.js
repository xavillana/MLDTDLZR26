import { initMobileMenu, initModalSystem } from "../core/ui.js";
import { renderFeaturedProducts } from "../components/destacados.js";
import { initStorePage } from "../components/tienda.js";

const componentCache = {};

const componentDependencies = {
  navbar: () => initMobileMenu(),
  globalModal: () => initModalSystem(),
  "featured-products-container": () => renderFeaturedProducts(),
  "store-container": () => initStorePage(),
  destacados: () => renderFeaturedProducts()
};

export function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  if (componentCache[file]) {
    element.innerHTML = componentCache[file];
    dispatchComponentLoaded(id, element);
    return;
  }

  fetch(file)
    .then(res => res.text())
    .then(html => {
      componentCache[file] = html;
      element.innerHTML = html;
      dispatchComponentLoaded(id, element);
    })
    .catch(() => {
      element.innerHTML = `
        <div class="text-center py-10">
          <p class="text-red-600 font-bold mb-4">Error al cargar sección</p>
          <button onclick="loadComponent('${id}', '${file}')"
                  class="px-4 py-2 bg-pink-600 text-white rounded-xl">
            Reintentar
          </button>
        </div>
      `;
    });
}

function dispatchComponentLoaded(id, element) {
  document.dispatchEvent(new CustomEvent("componentLoaded", { detail: { id, element } }));
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.toLowerCase();

  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
  loadComponent("globalModal", "components/global-modal.html");

  if (path.endsWith("/") || path.endsWith("index.html")) {
    loadComponent("destacados", "components/destacados.html");
    loadComponent("hero", "components/hero.html");
    loadComponent("newsletter", "components/newsletter.html");
  }

  if (path.endsWith("tienda.html")) {
    loadComponent("featured-products-container", "components/featured-products.html");
    loadComponent("store-container", "components/store.html");
  }

  if (path.endsWith("pedido.html")) {
    loadComponent("pedido", "components/pedido.html");
  }
});

document.addEventListener("componentLoaded", (e) => {
  const { id } = e.detail;
  if (componentDependencies[id]) componentDependencies[id]();
});
