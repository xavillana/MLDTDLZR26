// ===============================================
// ROUTER DINÁMICO — Maldita Dulzura (Versión PRO)
// ===============================================

const componentCache = {};
const componentDependencies = {
    navbar: () => initMobileMenu(),
    productModal: () => initProductModal(),
    destacados: () => renderFeaturedProducts(),
    "featured-products": () => initStorePage(),
    pedido: () => initPedidoPage()
};

// Animación brutalista pastel
function animateComponent(el) {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
        el.style.transition = "all .4s cubic-bezier(.25,.8,.25,1)";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    });
}

function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`⚠️ Elemento con id "${id}" no encontrado`);
        return;
    }

    // Cache
    if (componentCache[file]) {
        element.innerHTML = componentCache[file];
        animateComponent(element);
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
            animateComponent(element);
            dispatchComponentLoaded(id, element);
        })
        .catch(err => {
            console.error(`❌ Error cargando ${file}:`, err);
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

    if (componentDependencies[id]) {
        componentDependencies[id]();
    }
});
