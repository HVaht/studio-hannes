/**
 * Studio Hannes — Hamburger menu & theme switching
 */

// ——— Hamburger menu ———
function toggleMenu() {
  const nav = document.getElementById('nav-mobile');
  const btn = document.getElementById('hamburger-btn');
  const header = document.querySelector('.header-mobile');
  const container = document.querySelector('.site-container');
  if (nav) nav.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
  if (header) header.classList.toggle('open');
  if (container) container.classList.toggle('menu-open');
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-mobile-overlay a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-mobile')?.classList.remove('open');
    document.getElementById('hamburger-btn')?.classList.remove('open');
    document.querySelector('.header-mobile')?.classList.remove('open');
    document.querySelector('.site-container')?.classList.remove('menu-open');
  });
});

// ——— Theme (Light → Dark → Color) ———
const themes = ['light', 'dark', 'color'];

function cycleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'light';
  const i = themes.indexOf(current);
  const next = themes[(i + 1) % themes.length];
  setTheme(next);
}

function setTheme(theme) {
  if (!themes.includes(theme)) return;
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// Restore saved theme & sync mobile toggle
const savedTheme = localStorage.getItem('theme');
if (savedTheme && themes.includes(savedTheme)) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
document.addEventListener('DOMContentLoaded', () => {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
});

// ——— Language (FI / EN) ———
function setLang(lang) {
  if (!['fi', 'en'].includes(lang)) return;
  const html = document.documentElement;
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // TODO: Swap content via translations when Finnish copy is ready
}

// Restore saved language
const savedLang = localStorage.getItem('lang');
if (savedLang && ['fi', 'en'].includes(savedLang)) {
  setLang(savedLang);
} else {
  setLang('en');
}
