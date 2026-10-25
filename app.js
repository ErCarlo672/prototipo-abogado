// Cabecera con fondo al bajar, aparición de secciones y cinta de opiniones sin fin
document.documentElement.classList.add('js');

const nav = document.getElementById('nav');
const fijarNav = () => nav.classList.toggle('is-fija', window.scrollY > 40);
fijarNav();
window.addEventListener('scroll', fijarNav, { passive: true });

const aparecen = document.querySelectorAll('.aparece');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  aparecen.forEach((el) => io.observe(el));
} else {
  aparecen.forEach((el) => el.classList.add('is-visible'));
}

// Duplica las opiniones para que la cinta enlace sin salto
const pista = document.querySelector('.cinta__pista');
if (pista && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  [...pista.children].forEach((li) => {
    const copia = li.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    pista.appendChild(copia);
  });
}
