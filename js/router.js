// ===============================================
// ROUTER DINÁMICO — Maldita Dulzura
// ===============================================

const componentCache = {};

function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`⚠️ Elemento con id "${id}" no encontrado`);
        return;
    }

    // Si ya está cacheado → no recargar
    if (componentCache[file]) {
        element.innerHTML = componentCache[file];
        dispatchComponentLoaded(id, element);
        return;
    }

    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(html => {
            componentCache[file] = html;
            element.innerHTML = html;
            dispatchComponentLoaded(id, element);
        })
        .catch(err => {
            console.error(`❌ Error cargando ${file}:`, err);
            element.innerHTML = `<p class="text-red-600 text-center py-8">Error al cargar sección</p>`;
        });
}

function dispatchComponentLoaded(id, element) {
    document.dispatchEvent(
        new CustomEvent("componentLoaded", {
            detail: { id, element }
        })
    );
}

// ===============================================
// INICIALIZACIÓN SEGÚN LA PÁGINA
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.toLowerCase();

    // Siempre presentes
    loadComponent("navbar", "components/navbar.html");
    loadComponent("footer", "components/footer.html");
    loadComponent("productModal", "components/product-modal.html");

    // Página principal
    if (path.endsWith("/") || path.endsWith("index.html")) {
        loadComponent("hero", "components/hero.html");
        loadComponent("destacados", "components/destacados.html");
        loadComponent("sobrenosotros", "components/sobrenosotros.html");
        loadComponent("newsletter", "components/newsletter.html");
    }

    // Tienda
    if (path.endsWith("tienda.html")) {
        loadComponent("featured-products", "components/featured-products.html");
    }

    // Pedido
    if (path.endsWith("pedido.html")) {
        loadComponent("pedido", "components/pedido.html");
    }
});

// ===============================================
// EVENTOS DE COMPONENTES CARGADOS
// ===============================================

document.addEventListener("componentLoaded", (e) => {
    const { id } = e.detail;

    switch (id) {
        case "navbar":
            initMobileMenu();
            break;

        case "productModal":
            initProductModal();
            break;

        case "destacados":
            renderFeaturedProducts();
            break;

        case "featured-products":
            initStorePage();
            break;

        case "pedido":
            initPedidoPage();
            break;
    }
});




