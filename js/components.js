// ===============================================
// SISTEMA DE COMPONENTES DINÁMICOS
// ===============================================

async function loadComponent(id, file, callback = null) {
    try {
        const container = document.getElementById(id);
        if (!container) {
            console.warn(`⚠ No existe el contenedor #${id}`);
            return;
        }

        const html = await fetch(`components/${file}`).then(res => res.text());
        container.innerHTML = html;

        // Ejecutar callback si existe
        if (typeof callback === "function") {
            callback();
        }

    } catch (err) {
        console.error(`❌ Error cargando componente ${file}:`, err);
    }
}