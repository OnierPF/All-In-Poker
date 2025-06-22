/**
 * utils.js – Funciones helper compartidas
 */

// Formatea números con separador de miles
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Leer parámetros de URL
export function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// Delay/promise helper
export function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Toggle de idioma: añade <select id="lang-select"> en tu nav
export function initLanguageSwitcher() {
  const sel = document.createElement('select');
  sel.id = 'lang-select';
  sel.innerHTML = '<option value="es">ES</option><option value="en">EN</option>';
  document.querySelector('.navbar nav').append(sel);
}
