// js/core/ui.js

export function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  const icon = btn.querySelector("i");

  const toggle = (open) => {
    menu.classList.toggle("hidden", !open);
    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-times", open);
    }
  };

  btn.addEventListener("click", () => toggle(menu.classList.contains("hidden")));
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => toggle(false)));
  window.addEventListener("resize", () => { if (window.innerWidth >= 1024) toggle(false); });
}

// js/core/ui.js

let previouslyFocused = null;

export function openModal(innerHTML = "", options = {}) {
  const modal = document.getElementById("globalModal");
  const content = modal?.querySelector("#modalContent");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (!modal || !content) {
    console.error("❌ Modal no encontrado en el DOM");
    return;
  }

  // Guardar foco anterior
  previouslyFocused = document.activeElement;

  // Inyectar contenido
  const scrollContainer = content.querySelector('.overflow-y-auto');
  if (scrollContainer) {
    scrollContainer.innerHTML = innerHTML;
  } else {
    content.innerHTML = innerHTML;
  }

  // Mostrar modal con animación
  modal.classList.remove("hidden");

  // Forzar reflow para animación
  void modal.offsetWidth;

  content.classList.remove("scale-95", "opacity-0");
  content.classList.add("scale-100", "opacity-100");

  document.body.classList.add("overflow-hidden");

  // Cerrar modal
  const close = () => {
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      if (previouslyFocused) previouslyFocused.focus();
    }, 300);
  };

  // Eventos de cierre
  closeBtn && (closeBtn.onclick = close);
  modal.onclick = (e) => e.target === modal && close();
  document.onkeydown = (e) => e.key === "Escape" && close();

  // Callback opcional
  options.onOpen?.();
}

export function initModalSystem() {
  const modal = document.getElementById("globalModal");
  if (modal) {
    modal.classList.add("hidden"); // Seguridad extra
    console.log("✅ Modal system initialized");
  }
}
