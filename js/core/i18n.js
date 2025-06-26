/**
 * i18n.js – Selector y traducciones ES/EN
 */
document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    es: {
      'nav.home': 'Home',
      'nav.tournaments': 'Torneos',
      'nav.store': 'Tienda',
      'nav.profile': 'Perfil',
      'nav.dashboard': 'Dashboard',
      'nav.admin': 'Admin',
      'nav.contact': 'Contacto',
      'filters.title': 'Filtros',
      'filters.tableType': 'Tipo de mesa:',
      'filters.type.all': 'Todas',
      'filters.type.cash': 'Cash',
      'filters.type.tournament': 'Torneo',
      'filters.minBet': 'Apuesta mínima:',
      'filters.apply': 'Aplicar',
      'filters.quickJoin': 'Unirse Rápido'
    },
    en: {
      'nav.home': 'Home',
      'nav.tournaments': 'Tournaments',
      'nav.store': 'Store',
      'nav.profile': 'Profile',
      'nav.dashboard': 'Dashboard',
      'nav.admin': 'Admin',
      'nav.contact': 'Contact',
      'filters.title': 'Filters',
      'filters.tableType': 'Table type:',
      'filters.type.all': 'All',
      'filters.type.cash': 'Cash',
      'filters.type.tournament': 'Tournament',
      'filters.minBet': 'Minimum bet:',
      'filters.apply': 'Apply',
      'filters.quickJoin': 'Quick Join'
    }
  };

  const select = document.getElementById('lang-select');
  // Aplica traducciones a todos los elementos con data-i18n-key
  function applyLang(lang) {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    localStorage.setItem('lang', lang);
  }

  // Inicializa selector según guardado o ES por defecto
  const saved = localStorage.getItem('lang') || 'es';
  select.value = saved;
  applyLang(saved);

  select.addEventListener('change', () => {
    applyLang(select.value);
  });
});
