const projects = [...document.querySelectorAll('.project-card')];
const current = document.getElementById('slide-current');
const bar = document.getElementById('slide-progress-bar');
let active = 0;
function showProject(index) {
  active = (index + projects.length) % projects.length;
  projects.forEach((card, i) => {
    card.classList.toggle('is-active', i === active);
    card.style.display = i === active || i === (active + 1) % projects.length ? 'block' : 'none';
  });
  current.textContent = String(active + 1).padStart(2, '0');
  bar.style.width = `${((active + 1) / projects.length) * 100}%`;
}
document.getElementById('slide-prev').addEventListener('click', () => showProject(active - 1));
document.getElementById('slide-next').addEventListener('click', () => showProject(active + 1));
showProject(0);
document.getElementById('project-slider').addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') showProject(active - 1);
  if (e.key === 'ArrowRight') showProject(active + 1);
});

const tilt = document.querySelector('[data-tilt]');
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tilt.addEventListener('pointermove', e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.setProperty('--ry', `${x * 2.6}deg`);
    tilt.style.setProperty('--rx', `${-y * 2.1}deg`);
  });
  tilt.addEventListener('pointerleave', () => {
    tilt.style.setProperty('--rx', '0deg');
    tilt.style.setProperty('--ry', '0deg');
  });
}

const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.querySelector('.main-nav').classList.toggle('open', open);
});
document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}));

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    reveal.unobserve(entry.target);
  }
}), {threshold:.12});
document.querySelectorAll('.section-kicker,.intro h2,.project-card,.manifesto-copy h2,.service-row,.contact-card').forEach(el => {
  el.classList.add('reveal');
  reveal.observe(el);
});
document.getElementById('year').textContent = new Date().getFullYear();
