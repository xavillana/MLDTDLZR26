import { initMobileMenu, initModalSystem } from "../core/ui.js";
import { initStorePage } from "../components/tienda.js";
import { renderFeaturedProducts } from "../components/destacados.js";

const componentCache = {};

const componentDependencies = {
  navbar: () => initMobileMenu(),
  globalModal: () => initModalSystem(),
  "featured-products-container": () => renderFeaturedProducts(),
  "store-container": () => initStorePage()
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

  if (path.endsWith("tienda.html")) {
    loadComponent("featured-products-container", "components/featured-products.html");
    loadComponent("store-container", "components/store.html");
  }
});

document.addEventListener("componentLoaded", (e) => {
  const { id } = e.detail;
  if (componentDependencies[id]) componentDependencies[id]();
});
