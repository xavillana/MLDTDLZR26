// ===============================================
// MENÚ MÓVIL DEL NAVBAR
// ===============================================

function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");

    if (!btn || !menu) {
        console.warn("⚠ No se encontró el menú móvil");
        return;
    }

    // Abrir/cerrar menú
    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");

        const icon = btn.querySelector("i");
        if (!icon) return;

        if (menu.classList.contains("hidden")) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        } else {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        }
    });

    // Cerrar al hacer clic en un enlace
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.add("hidden");

            const icon = btn.querySelector("i");
            if (!icon) return;

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        });
    });

    // Reset al pasar a desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            menu.classList.add("hidden");

            const icon = btn.querySelector("i");
            if (!icon) return;

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
}


function initModalSystem() {
    const modal = document.getElementById("globalModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const content = document.getElementById("modalContent");

    if (!modal || !closeBtn) return;

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        content.innerHTML = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            content.innerHTML = "";
        }
    });
}

// Función global para abrir el modal desde cualquier parte
function openModal(htmlContent) {
    const modal = document.getElementById("globalModal");
    const content = document.getElementById("modalContent");

    if (!modal || !content) return;

    content.innerHTML = htmlContent;
    modal.classList.remove("hidden");
}
// ===============================================
// JS GLOBAL (si necesitas más cosas)
// ===============================================

// Aquí puedes añadir funciones globales si lo necesitas