// js/newsletter.js

// Esperamos el evento custom que ya disparas en router.js al cargar el componente
document.addEventListener('componentLoaded', (event) => {
  if (event.detail.id !== 'newsletter') return;

  console.log("Componente newsletter cargado → inicializando EmailJS");

  // Inicializa EmailJS una sola vez
  emailjs.init({
    publicKey: "RU3xIhpZvPCm25Otj"  // ← CAMBIA por tu Public Key real del dashboard
  });

  const form = document.getElementById('newsletterForm');
  if (!form) {
    console.error("Formulario newsletter no encontrado en el DOM");
    return;
  }

  console.log("Formulario newsletter encontrado, listener añadido");

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log("Submit detectado - Email:", document.getElementById('newsletterEmail').value);

    const email = document.getElementById('newsletterEmail').value;
    const consent = document.getElementById('consent').checked;
    const success = document.getElementById('success');
    const errorMsg = document.getElementById('errorMsg');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!consent) {
      alert("Debes aceptar recibir emails para continuar.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando pecado...";

    const templateParams = {
      email: email,
      nombre: "pecador/a dulce",
      discount_code: "PECADO10"
    };

    // ← CAMBIA estos dos valores por los reales de tu cuenta EmailJS
    emailjs.send(
      'service_a1r8kaa',              // ← Service ID real (ej: service_abc123xyz)
      'template_bienvenida',          // ← Template ID real (ej: bienvenida_maldita)
      templateParams
    )
      .then((response) => {
        console.log('ÉXITO - Email enviado!', response.status, response.text);
        form.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
        setTimeout(() => {
          form.classList.add('hidden');
          success.classList.remove('hidden');
          success.classList.add('animate-fade-in');
        }, 500);
        form.reset();
      })
      .catch((err) => {
        console.error('ERROR EmailJS:', err);
        console.log('Status:', err.status);
        console.log('Texto:', err.text);
        errorMsg.classList.remove('hidden');
        errorMsg.innerHTML = `Error: ${err.text || 'Inténtalo más tarde'}`;
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Quiero pecar →";
      });
  });
});
