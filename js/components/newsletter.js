// js/components/newsletter.js

document.addEventListener('componentLoaded', (event) => {
  if (event.detail.id !== 'newsletter') return;

  console.log("✅ Newsletter component loaded - initializing EmailJS");

  // Inicialización de EmailJS (solo una vez por carga del componente)
  emailjs.init({
    publicKey: "RU3xIhpZvPCm25Otj"  // ← CAMBIA ESTO por tu Public Key REAL
  });

  const form = document.getElementById('newsletterForm');
  if (!form) {
    console.error("❌ Newsletter form (#newsletterForm) not found");
    return;
  }

  console.log("Newsletter form found - attaching submit listener");

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    console.log("Newsletter submit triggered - email:", document.getElementById('newsletterEmail')?.value);

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
      // Añade más variables si tu plantilla de EmailJS las necesita
    };

    // ← CAMBIA estos valores por los reales de tu cuenta EmailJS
    emailjs.send(
      'service_a1r8kaa',                  // ← Service ID real (ej: service_abc123xyz)
      'template_bienvenida',              // ← Template ID real (ej: bienvenida_maldita)
      templateParams
    )
    .then((response) => {
      console.log('Newsletter email sent successfully!', response.status, response.text);
      form.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
      setTimeout(() => {
        form.classList.add('hidden');
        success.classList.remove('hidden');
        success.classList.add('animate-fade-in');
      }, 500);
      form.reset();
    })
    .catch((err) => {
      console.error('Newsletter EmailJS error:', err);
      console.log('Error status:', err.status);
      console.log('Error text:', err.text);
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = `Error: ${err.text || 'Inténtalo de nuevo más tarde'}`;
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Quiero pecar →";
    });
  });
});;
