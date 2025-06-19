// js/utils.js — All-In Poker Utilities v4

// ⚙️ Inicialización: fichas, nombre y registro de última fecha de bono
if (!localStorage.getItem('fichas')) {
  localStorage.setItem('fichas', '1000');
}
if (!localStorage.getItem('nombre')) {
  localStorage.setItem('nombre', 'Jugador');
}
if (!localStorage.getItem('lastDailyBonusDate')) {
  localStorage.setItem('lastDailyBonusDate', '');
}

// 💰 Obtener fichas
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

// 🎁 Reclamar bono diario (solo 1x por día)
export function claimDailyBonus() {
  const bonusAmount = 100;            // 👉 ajusta cantidad a tu gusto
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = localStorage.getItem('lastDailyBonusDate');
  if (lastDate === today) {
    return 0;  // ya reclamado
  }
  localStorage.setItem('lastDailyBonusDate', today);
  return modificarFichas(bonusAmount);
}

// ⚙️ Inicializa la lógica del bono diario en el botón
export function initDailyBonus() {
  const btn = document.getElementById('daily-bonus-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const gained = claimDailyBonus();
    if (gained > 0) {
      alert(`🎉 ¡Bono diario! Has ganado ${gained} fichas.`);
    } else {
      alert('⚠️ Ya reclamaste tu bono diario hoy. Vuelve mañana.');
    }
  });
}

// Arranca animaciones y bono diario al terminar de cargar
document.addEventListener('DOMContentLoaded', () => {
  initTableAnimations();
  initDailyBonus();
});
