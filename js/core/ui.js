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
// ABRIR MODAL CON FOCUS TRAP COMPLETO (Versión PRO)
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

  // Insertar contenido
  content.innerHTML = htmlContent;

  // Mostrar modal con animación
  modal.classList.remove("hidden", "opacity-0");
  modal.classList.add("flex", "opacity-100");
  document.body.classList.add("overflow-hidden");

  // === FOCUS TRAP COMPLETO (WCAG 2.1 AA) ===
  modal.focus(); // Enfocar modal para screen readers

  // Guardar elemento previo para restaurar foco al cerrar
  const previouslyFocused = document.activeElement;

  // Elementos enfocables dentro del modal
  const focusableElements = modal.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Trap de TAB: mantener foco dentro del modal
  const handleKeydown = (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab en primer elemento → ir al último
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab en último elemento → ir al primero
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }
    // Escape cierra modal
    if (e.key === "Escape") {
      closeModal();
    }
  };

  modal.addEventListener("keydown", handleKeydown);

  // Enfocar botón cerrar por defecto (mejor UX)
  if (closeBtn && closeBtn.focus) closeBtn.focus();

  // FUNCIÓN DE CIERRE CENTRALIZADA (con restore focus)
  const closeModal = () => {
    // Animación de salida
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex", "opacity-0", "opacity-100");
      document.body.classList.remove("overflow-hidden");
      content.innerHTML = "";
      
      // Restaurar foco al elemento previo
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }

      // Limpiar event listeners
      modal.removeEventListener("keydown", handleKeydown);
    }, 300);
  };

  // Cierre por botón X
  if (closeBtn) {
    const btnClickHandler = () => closeModal();
    closeBtn.addEventListener("click", btnClickHandler);
    
    // Cleanup al cerrar
    setTimeout(() => closeBtn.removeEventListener("click", btnClickHandler), 1000);
  }

  // Cierre por clic fuera (overlay)
  const overlayClickHandler = (e) => {
    if (e.target === modal || e.target.classList.contains("absolute")) {
      closeModal();
    }
  };
  modal.addEventListener("click", overlayClickHandler);

  // Callback onOpen
  if (typeof options.onOpen === "function") {
    setTimeout(options.onOpen, 150);
  }

  // Exponer closeModal globalmente por si otros scripts lo necesitan
  window.currentModalClose = closeModal;
}

// ===============================================
// Inicializador del sistema (solo eventos básicos, el resto en openModal)
// ===============================================
export function initModalSystem() {
  console.log("✅ Sistema de modales inicializado");
  // Ya no necesita hacer nada aquí - openModal maneja TODO
}
