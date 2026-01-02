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

export function openModal(htmlContent, options = {}) {
  const modal = document.getElementById("globalModal");
  const content = document.getElementById("modalContent");

  if (!modal || !content) {
    // En lugar de fallar, esperamos un poquito y reintentamos
    console.warn("Modal global aún cargando... reintentando en 50ms");
    setTimeout(() => openModal(htmlContent, options), 50);
    return;
  }

  // Todo bien → abrir modal
  content.innerHTML = htmlContent;

  modal.classList.remove("hidden");
  modal.classList.add("flex", "opacity-100");
  modal.classList.remove("opacity-0");

  document.body.classList.add("overflow-hidden");
  modal.focus(); // Accesibilidad

  if (typeof options.onOpen === "function") {
    setTimeout(options.onOpen, 100);
  }
}
  // === FOCUS TRAP (Accesibilidad esencial) ===
  // Enfocar el modal
  modal.focus();

  // Guardar elemento previamente enfocado para restaurar al cerrar
  const previouslyFocused = document.activeElement;

  // Trampa de foco: mantener dentro del modal
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  // Enfocar botón cerrar por defecto (mejor UX)
  if (closeBtn) closeBtn.focus();

  // Restaurar foco al cerrar
  const originalCloseModal = () => {
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex", "opacity-0", "opacity-100");
      document.body.classList.remove("overflow-hidden");
      content.innerHTML = "";
      if (previouslyFocused) previouslyFocused.focus();
    }, 300);
  };

  // Reemplazar listeners de cierre para usar la versión con restore focus
  // (o integrar en initModalSystem)

  if (typeof options.onOpen === "function") {
    setTimeout(options.onOpen, 100);
  }
