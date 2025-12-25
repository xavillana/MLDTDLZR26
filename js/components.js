// Carga automática de todos los componentes
const components = [
  { id: 'navbar', file: 'components/navbar.html' },
  { id: 'hero', file: 'components/hero.html' },
  { id: 'how-it-works', file: 'components/how-it-works.html' },
  { id: 'featured-products', file: 'components/featured-products.html' },
  { id: 'why-choose-us', file: 'components/why-choose-us.html' },
  { id: 'testimonials', file: 'components/testimonials.html' },
  { id: 'newsletter', file: 'components/newsletter.html' },
  { id: 'footer', file: 'components/footer.html' },
  {id:'destacados', file:'components/destacados.html'}
];

components.forEach(comp => {
  fetch(comp.file)
    .then(response => response.text())
    .then(html => {
      document.getElementById(comp.id).innerHTML = html;
    })
    .catch(err => console.error('Error cargando componente ${comp.id}:', err));
});
