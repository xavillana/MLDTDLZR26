document.addEventListener('componentLoaded', (event) => {
  if (event.detail.id !== 'newsletter') return;  // Solo cuando se carga el componente newsletter

  console.log("Componente newsletter cargado → inicializando EmailJS");

  emailjs.init({
    publicKey: "RU3xIhpZvPCm25Otj"  // Tu Public Key real
  });

  const form = document.getElementById('newsletterForm');
  if (!form) {
    console.error("Formulario newsletter no encontrado");
    return;
  }

  console.log("Formulario encontrado, añadiendo listener submit");

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Submit detectado! Email:", document.getElementById('newsletterEmail').value);

    // ... el resto del código de submit que ya tenías (consent, templateParams, emailjs.send, etc.)
    // Copia aquí el bloque completo de submit
  });
});
