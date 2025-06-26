// js/utils.js — All-In Poker Utilities v3

// ⚙️ Inicializa el sistema (fichas y nombre)
if (!localStorage.getItem('fichas')) {
  localStorage.setItem('fichas', '1000');
}
if (!localStorage.getItem('nombre')) {
  localStorage.setItem('nombre', 'Jugador');
}

// 💰 Obtener el total actual de fichas
export function obtenerFichas() {
  return parseInt(localStorage.getItem('fichas')) || 0;
}

// 🔄 Modificar fichas (+ o -)
export function modificarFichas(cantidad) {
  let fichas = obtenerFichas();
  fichas += cantidad;
  if (fichas < 0) fichas = 0;
  localStorage.setItem('fichas', fichas);
  return fichas;
}

// 👤 Mostrar perfil en un div dado
export function mostrarPerfilEn(divId) {
  const contenedor = document.getElementById(divId);
  if (!contenedor) return;
  const nombre = localStorage.getItem('nombre') || 'Jugador';
  const fichas = obtenerFichas();
  contenedor.innerHTML =
    `👤 Bienvenido, <strong>${nombre}</strong> | 🪙 Fichas: <strong>${fichas}</strong>`;
}

// 🎬 Animación fade-in secuencial de tarjetas
export function initTableAnimations() {
  const cards = document.querySelectorAll('.table-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
    card.classList.add('fade-in-up');
  });
}

// Arranca las animaciones cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  initTableAnimations();
});
