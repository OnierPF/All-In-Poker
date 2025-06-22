/**
 * i18n.js – Toggle y carga de idiomas
 */
import es from '../../idiomas/es.js';
import en from '../../idiomas/en.js';

const locales = { es, en };
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('lang-select');
  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = locales[lang][key] || key;
    });
    localStorage.setItem('lang', lang);
  }
  selector?.addEventListener('change', e => applyLang(e.target.value));
  const saved = localStorage.getItem('lang') || 'es';
  if (selector) selector.value = saved;
  applyLang(saved);
});
