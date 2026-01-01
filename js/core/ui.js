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
// SISTEMA DE MODAL GLOBAL (Versión PRO - Actualizada)
// ===============================================
export function initModalSystem() {
    const modal = document.getElementById("globalModal");
    const content = document.getElementById("modalContent");
    
    // Cambiado a modalCloseBtn para coincidir con globalModal.html
    const closeBtn = document.getElementById("modalCloseBtn");

    if (!modal || !content) {
        console.warn("⚠ Modal global no encontrado en el DOM");
        return;
    }

    const closeModal = () => {
        // Animación de salida suave
        modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");

        // Esperamos a que termine la transición antes de ocultar y limpiar
        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex", "opacity-0", "opacity-100");
            document.body.classList.remove("overflow-hidden");
            content.innerHTML = ""; // Limpia el contenido
        }, 300); // Ajustado a 300ms para coincidir con la transición del CSS
    };

    // Botón cerrar (X)
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Cerrar al hacer clic fuera del contenido (en el overlay)
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("absolute")) {
            closeModal();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

// ===============================================
// ABRIR MODAL DESDE CUALQUIER PARTE
// ===============================================

export function openModal(htmlContent, options = {}) {
  const modal = document.getElementById("globalModal");
  const content = document.getElementById("modalContent");

  if (!modal || !content) {
    console.error("Modal global no encontrado en el DOM");
    return;
  }

  // Insertar contenido
  content.innerHTML = htmlContent;

  // Mostrar modal con clases correctas
  modal.classList.remove("hidden");
  modal.classList.add("flex", "opacity-100");
  modal.classList.remove("opacity-0");

  // Bloquear scroll del body
  document.body.classList.add("overflow-hidden");

  // Callback después de abrir (ideal para inicializar cosas dentro del modal)
  if (typeof options.onOpen === "function") {
    setTimeout(options.onOpen, 100);
  }
}
