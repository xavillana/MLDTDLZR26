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
    const closeBtn = document.getElementById("modalCloseBtn");

    if (!modal || !content) {
        console.warn("⚠ Modal global no encontrado en el DOM");
        return;
    }

    const closeModal = () => {
        modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");

        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex", "opacity-0", "opacity-100");
            document.body.classList.remove("overflow-hidden");
            content.innerHTML = "";
        }, 300);
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("absolute")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

// ===============================================
// ABRIR MODAL CON FOCUS TRAP COMPLETO
// ===============================================
export function openModal(htmlContent, options = {}) {
    const modal = document.getElementById("globalModal");
    const content = document.getElementById("modalContent");
    const closeBtn = document.getElementById("modalCloseBtn");

    if (!modal || !content) {
        console.warn("Modal global aún cargando... reintentando en 50ms");
        setTimeout(() => openModal(htmlContent, options), 50);
        return;
    }

    // Inyectar contenido
    content.innerHTML = htmlContent;

    // Mostrar modal
    modal.classList.remove("hidden");
    modal.classList.add("flex", "opacity-100");
    modal.classList.remove("opacity-0");
    document.body.classList.add("overflow-hidden");

    // === FOCUS TRAP COMPLETO ===
    const previouslyFocused = document.activeElement;

    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const trapFocus = (e) => {
        if (e.key === "Tab") {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable?.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable?.focus();
                }
            }
        }
    };

    modal.addEventListener("keydown", trapFocus);

    // Enfocar botón cerrar por defecto (mejor UX)
    if (closeBtn) {
        closeBtn.focus();
    } else if (firstFocusable) {
        firstFocusable.focus();
    }

    // Guardar función para limpiar al cerrar
    const cleanup = () => {
        modal.removeEventListener("keydown", trapFocus);
        if (previouslyFocused && previouslyFocused.focus) {
            previouslyFocused.focus();
        }
    };

    // Sobrescribir closeModal temporalmente para limpiar focus trap
    const originalClose = () => {
        modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");
        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex", "opacity-0", "opacity-100");
            document.body.classList.remove("overflow-hidden");
            content.innerHTML = "";
            cleanup();
        }, 300);
    };

    // Reemplazar temporalmente los listeners (o mejor: usar initModalSystem como base)
    // Nota: esto es una simplificación. Lo ideal es integrar todo en initModalSystem.

    if (typeof options.onOpen === "function") {
        setTimeout(options.onOpen, 100);
    }
}
