document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    // Navbar y footer siempre
    loadComponent("navbar", "navbar.html", initMobileMenu);
    loadComponent("footer", "footer.html");

    // Página principal
    if (path.endsWith("/") || path.endsWith("index.html")) {
        loadComponent("hero", "hero.html");
        loadComponent("sobrenosotros", "sobrenosotros.html");
        loadComponent("how-it-works", "how-it-works.html");
        loadComponent("newsletter", "newsletter.html", initStorePage);
    }

    // Tienda
    if (path.endsWith("tienda.html")) {
        loadComponent("hero-tienda", "hero-tienda.html");
        loadComponent("featured-products", "featured-products.html", initStorePage);
    }

    // Producto individual
    if (path.endsWith("producto.html")) {
        loadComponent("product-detail", "product-detail.html", initProductDetailPage);
    }

     // Producto individual
    if (path.endsWith("pedido.html")) {
        loadComponent("pedido", "pedido.html", initProductDetailPage);
    }

});
