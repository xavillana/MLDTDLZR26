// ===============================================
// MENÚ MÓVIL (Optimizado y robusto)
// ===============================================

export function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");

    if (!btn || !menu) {
        console.warn("⚠ Menú móvil no encontrado en el DOM");
        return;
    }

    const icon = btn.querySelector("i");

    const toggleIcon = (open) => {
        if (!icon) return;
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-times", open);
    };

    const openMenu = () => {
        menu.classList.remove("hidden");
        toggleIcon(true);
    };

    const closeMenu = () => {
        menu.classList.add("hidden");
        toggleIcon(false);
    };

    btn.addEventListener("click", () => {
        const isHidden = menu.classList.contains("hidden");
        isHidden ? openMenu() : closeMenu();
    });

    // Cerrar al hacer clic en un enlace
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Cerrar al cambiar a escritorio
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) closeMenu();
    });
}



// ===============================================
// SISTEMA DE MODAL GLOBAL (Versión PRO)
// ===============================================

export function initModalSystem() {
    const modal = document.getElementById("globalModal");
    const content = document.getElementById("modalContent");
    const closeBtn = document.getElementById("closeModalBtn");

    if (!modal || !content) {
        console.warn("⚠ Modal global no encontrado");
        return;
    }

    const closeModal = () => {
        modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");

        setTimeout(() => {
            modal.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
            content.innerHTML = "";
        }, 200);
    };

    // Botón cerrar
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Cerrar clicando fuera del contenido
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}



// ===============================================
// ABRIR MODAL DESDE CUALQUIER PARTE
// ===============================================

// ... todo el código anterior ...

export function openModal(htmlContent, options = {}) {
  const modal = document.getElementById("globalModal");
  const content = document.getElementById("modalContent");

  if (!modal || !content) {
    console.error("Modal global no encontrado");
    return;
  }

  content.innerHTML = htmlContent;

  modal.classList.remove("hidden", "opacity-0");
  modal.classList.add("opacity-100");
  document.body.classList.add("overflow-hidden");

  if (typeof options.onOpen === "function") {
    setTimeout(options.onOpen, 100);
  }
}

// ← ESTA LÍNEA ES LA IMPORTANTE
export { openModal as openProductModal };
