// Mobile menu + scroll behaviors + active link state
const menuBtn = document.querySelector('.menu-btn');
const mobileDrawer = document.querySelector('.mobile-drawer');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    mobileDrawer.classList.toggle('open');
  });
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      mobileDrawer.classList.remove('open');
      menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});
// Scroll spy for desktop nav
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector('.desktop-nav a[href="#' + id + '"]');
    if (link) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.desktop-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, { rootMargin: '-50% 0px -40% 0px', threshold: 0.01 });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

// Back-to-top button visibility
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 500 ? 'grid' : 'none';
});
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Current year
document.getElementById('year').textContent = new Date().getFullYear();
