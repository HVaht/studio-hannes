/**
 * Studio Hannes — Hamburger menu & theme switching
 */

// ——— Hamburger menu ———
function toggleMenu() {
  const nav = document.getElementById('nav-mobile');
  const btn = document.getElementById('hamburger-btn');
  if (nav) nav.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-mobile-overlay a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-mobile')?.classList.remove('open');
    document.getElementById('hamburger-btn')?.classList.remove('open');
  });
});

// ——— Theme cycling (Light → Dark → Color → Light) ———
const themes = ['light', 'dark', 'color'];

function cycleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'light';
  const i = themes.indexOf(current);
  const next = themes[(i + 1) % themes.length];
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Restore saved theme
const saved = localStorage.getItem('theme');
if (saved && themes.includes(saved)) {
  document.documentElement.setAttribute('data-theme', saved);
}
