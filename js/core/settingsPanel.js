/**
 * settingsPanel.js – Panel de ajustes togglables
 */
document.addEventListener('DOMContentLoaded', () => {
  // Dark mode
  const btn = document.getElementById('toggle-theme');
  btn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Calidad gráfica
  const select = document.getElementById('graphics-quality');
  select?.addEventListener('change', e => {
    document.body.dataset.quality = e.target.value;
    localStorage.setItem('gfxQuality', e.target.value);
  });
  const saved = localStorage.getItem('gfxQuality');
  if (saved) {
    document.body.dataset.quality = saved;
    select.value = saved;
  }
});
