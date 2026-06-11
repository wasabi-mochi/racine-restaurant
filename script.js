const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  document.body.classList.add('cursor-on');
});

document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-on'));

(function animateCursor() {
  cx += (mouseX - cx) * 0.12;
  cy += (mouseY - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .menu-card, .gallery-item, .phi-img').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '60px'; cursor.style.height = '60px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '40px'; cursor.style.height = '40px'; });
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.menu-grid, .philosophy-stats, .gallery-grid').forEach(container => {
  container.querySelectorAll('.reveal').forEach((item, i) => { item.dataset.delay = i * 80; });
});

window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 180);
  });
});

const heroImg = document.querySelector('.hero-image');
if (heroImg) {
  window.addEventListener('scroll', () => {
    heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}