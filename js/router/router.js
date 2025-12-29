// ===============================================
// ROUTER DINÁMICO — Maldita Dulzura (Versión PRO)
// ===============================================

const componentCache = {};
const componentDependencies = {
    navbar: () => initMobileMenu(),
    productModal: () => initProductModal(),
    destacados: () => renderFeaturedProducts(),
    featuredProducts: () => initStorePage(),
    pedido: () => initPedidoPage(),
    globalModal: () => initModalSystem()
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
        .then(res => res.ok ? res.text() : Promise.reject(res.status))
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
    document.dispatchEvent(
        new CustomEvent("componentLoaded", { detail: { id, element } })
    );
}


// ===============================================
// INICIALIZACIÓN SEGÚN LA PÁGINA
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.toLowerCase();

    loadComponent("navbar", "components/navbar.html");
    loadComponent("footer", "components/footer.html");
    loadComponent("productModal", "components/productModal.html");
    loadComponent("globalModal", "components/globalModal.html");

    if (path.endsWith("/") || path.endsWith("index.html")) {
        loadComponent("hero", "components/hero.html");
        loadComponent("destacados", "components/destacados.html");
        loadComponent("sobrenosotros", "components/sobrenosotros.html");
        loadComponent("newsletter", "components/newsletter.html");
    }

    if (path.endsWith("tienda.html")) {
        loadComponent("featuredproducts", "components/featuredProducts.html");
    }

    if (path.endsWith("pedido.html")) {
        loadComponent("pedido", "components/pedido.html");
    }
});


// ===============================================
// EVENTOS DE COMPONENTES CARGADOS
// ===============================================

document.addEventListener("componentLoaded", (e) => {
    const { id } = e.detail;

    if (componentDependencies[id]) {
        componentDependencies[id]();
    }
});
