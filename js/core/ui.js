// ===============================================
// MENÚ MÓVIL
// ===============================================

export function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");

    if (!btn || !menu) {
        console.warn("⚠ No se encontró el menú móvil");
        return;
    }

    const icon = btn.querySelector("i");

    const closeMenu = () => {
        menu.classList.add("hidden");
        if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    };

    const openMenu = () => {
        menu.classList.remove("hidden");
        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        }
    };

    btn.addEventListener("click", () => {
        menu.classList.contains("hidden") ? openMenu() : closeMenu();
    });

    menu.querySelectorAll("a")?.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) closeMenu();
    });
}


// ===============================================
// MODAL GLOBAL
// ===============================================

export function initModalSystem() {
    const modal = document.getElementById("globalModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const content = document.getElementById("modalContent");

    if (!modal || !closeBtn || !content) return;

    const closeModal = () => {
        modal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
        content.innerHTML = "";
    };

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}


// ===============================================
// ABRIR MODAL DESDE CUALQUIER PARTE
// ===============================================

export function openModal(htmlContent) {
    const modal = document.getElementById("globalModal");
    const content = document.getElementById("modalContent");

    if (!modal || !content) return;

    content.innerHTML = htmlContent;

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}
