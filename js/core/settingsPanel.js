/**
 * settingsPanel.js – Maneja dark-mode
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-theme');
  // Al hacer click, alterna la clase y guarda la preferencia
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(
      'darkMode',
      document.body.classList.contains('dark-mode')
    );
  });
  // Al cargar, aplica modo oscuro si estaba activo
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
});
