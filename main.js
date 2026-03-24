/**
 * Studio Hannes — Hamburger menu & theme (light/dark + color palette)
 */

const VALID_THEMES = ['light', 'dark', 'color'];

// ——— Hamburger menu ———
function setMenuOpen(open) {
  const nav = document.getElementById('nav-mobile');
  const btn = document.getElementById('hamburger-btn');
  const header = document.querySelector('.header-mobile');
  const container = document.querySelector('.site-container');
  if (!nav || !btn) return;

  if (open) {
    nav.removeAttribute('hidden');
    nav.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    header?.classList.add('open');
    container?.classList.add('menu-open');
    const first = nav.querySelector('a');
    if (first) requestAnimationFrame(() => first.focus());
  } else {
    nav.setAttribute('hidden', '');
    nav.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    header?.classList.remove('open');
    container?.classList.remove('menu-open');
  }
}

function toggleMenu() {
  const nav = document.getElementById('nav-mobile');
  if (!nav) return;
  setMenuOpen(!nav.classList.contains('open'));
}

document.querySelectorAll('.nav-mobile-overlay a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const nav = document.getElementById('nav-mobile');
  if (!nav?.classList.contains('open')) return;
  setMenuOpen(false);
  document.getElementById('hamburger-btn')?.focus();
});

const tabletUp = window.matchMedia('(min-width: 768px)');
function closeMobileMenuIfTablet() {
  if (tabletUp.matches) setMenuOpen(false);
}
tabletUp.addEventListener('change', closeMobileMenuIfTablet);

// ——— Theme ———
function setTheme(theme) {
  if (!VALID_THEMES.includes(theme)) return;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  syncColorThemeButton();
}

/** Light ↔ dark; if color is active, first tap returns to light */
function toggleLightDark() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  if (current === 'color') {
    setTheme('light');
  } else if (current === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

/** Color palette on / off (returns to light when off, same as desktop grid) */
function toggleColorTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'color' ? 'light' : 'color');
}

/** Color palette button: aria-pressed when warm theme is on */
function syncColorThemeButton() {
  const isColor = document.documentElement.getAttribute('data-theme') === 'color';
  document.querySelectorAll('[data-color-theme-btn]').forEach((el) => {
    el.setAttribute('aria-pressed', isColor ? 'true' : 'false');
  });
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme && VALID_THEMES.includes(savedTheme)) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
syncColorThemeButton();
