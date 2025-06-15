// 👾 Asegura el array global
if (!window.botsActivos) window.botsActivos = [];

// 🧬 Generar un nuevo bot con nombre, estilo y fichas
function generarBot() {
  if (!window.nombresBots || window.nombresBots.length === 0) return null;

  const idx = Math.floor(Math.random() * window.nombresBots.length);
  const nombre = window.nombresBots.splice(idx, 1)[0]; // elimina para no repetir

  const bot = {
    id: Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    nombre,
    estilo: Math.random() > 0.5 ? "agresivo" : "pasivo",
    fichas: 1000,
    activo: true
  };

  botsActivos.push(bot);
  return bot;
}
