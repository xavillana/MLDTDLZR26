// js/core/ui.js
export function initModalSystem() {
  const modal = document.getElementById("globalModal");
  const content = document.getElementById("modalContent");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (!modal || !content) return console.warn("⚠ Modal global no encontrado");

  let previouslyFocused = document.activeElement;

  function closeModal() {
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex", "opacity-0", "opacity-100");
      document.body.classList.remove("overflow-hidden");
      content.innerHTML = "";
      if (previouslyFocused) previouslyFocused.focus();
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  window.openModal = function (innerHTML, options = {}) {
    previouslyFocused = document.activeElement;
    content.innerHTML = innerHTML;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");

    setTimeout(() => modal.classList.add("opacity-100"), 10);

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const trapFocus = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    modal.addEventListener("keydown", trapFocus);

    if (closeBtn) closeBtn.focus();
    else if (firstFocusable) firstFocusable.focus();

    if (typeof options.onOpen === "function") {
      setTimeout(options.onOpen, 100);
    }

    const originalClose = closeModal;
    modal.dataset.cleanup = () => {
      modal.removeEventListener("keydown", trapFocus);
      originalClose();
    };
  };
}
