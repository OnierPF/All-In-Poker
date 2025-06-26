/**
 * interactivePanels.js – Toggle de paneles en admin y ajustes
 */
document.addEventListener('DOMContentLoaded', () => {
  // Admin: botones lateral
  document.querySelectorAll('#admin-panel aside button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#admin-panel aside button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const section = btn.dataset.section;
      const content = document.getElementById('admin-content');
      content.innerHTML = `<h2>Cargando ${section}…</h2>`;
      // fetch y renderizar panel según sección
      // fetch(`/api/admin/${section}`).then(…)
    });
  });
  
  // Settings: dark mode toggle
  const toggle = document.getElementById('toggle-theme');
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  if (localStorage.getItem('darkMode')==='true') {
    document.body.classList.add('dark-mode');
  }
});
