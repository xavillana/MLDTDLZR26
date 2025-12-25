// router.js

function loadComponent(id, file, callback) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`⚠️ Elemento con id "${id}" no encontrado`);
        return;
    }

    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            element.innerHTML = html;

            // Disparamos un evento personalizado para avisar que el componente está listo
            const event = new CustomEvent('componentLoaded', {
                detail: { id, element }
            });
            document.dispatchEvent(event);

            // Ejecutamos el callback si existe (para inicializaciones específicas)
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(err => {
            console.error(`❌ Error cargando componente ${id} desde ${file}:`, err);
            element.innerHTML = `<p class="text-red-600 text-center py-8">Error al cargar sección</p>`;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    // Navbar y footer siempre se cargan en todas las páginas
    loadComponent("navbar", "components/navbar.html", initMobileMenu);
    loadComponent("footer", "components/footer.html");

    // ==================== PÁGINA PRINCIPAL (index.html) ====================
    if (path.endsWith("/") || path.endsWith("index.html")) {
        loadComponent("hero", "components/hero.html");
        loadComponent("destacados", "components/destacados.html"); // Sin callback aún
         loadComponent("sobrenosotros", "sobrenosotros/sobrenosotros.html"); // Sin callback aún
        loadComponent("how-it-works", "components/how-it-works.html");
        loadComponent("newsletter", "components/newsletter.html");
        loadComponent("productModal", "components/product-modal.html", initProductModal);
    }

    // ==================== TIENDA ====================
    if (path.endsWith("Tienda.html")) {
        loadComponent("featured-products", "components/featured-products.html", initStorePage);
        loadComponent("productModal", "components/product-modal.html", initProductModal);
    }

    // ==================== PEDIDO ====================
    if (path.endsWith("pedido.html")) {
        loadComponent("pedido", "components/pedido.html", initPedidoPage);
        loadComponent("productModal", "components/product-modal.html", initProductModal);
    }
});

// ==================== ESCUCHAMOS EVENTOS PERSONALIZADOS ====================

document.addEventListener('componentLoaded', (e) => {
    const { id } = e.detail;

    if (id === 'destacados') {
        // Ahora SÍ existe #productsContainer en el DOM
        renderFeaturedProducts();
    }

    // Puedes añadir más en el futuro:
    // if (id === 'otro-componente') { initOtraCosa(); }
});




