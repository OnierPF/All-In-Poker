// js/utils.js — All-In Poker Utilities v4

// — Inicialización básica —
// Fichas y nombre
if (!localStorage.getItem('fichas')) {
  localStorage.setItem('fichas', '1000');
}
if (!localStorage.getItem('nombre')) {
  localStorage.setItem('nombre', 'Jugador');
}
// Fecha de último bono diario
if (!localStorage.getItem('lastDailyBonusDate')) {
  localStorage.setItem('lastDailyBonusDate', '');
}
// CUP y registro de bono de bienvenida
if (!localStorage.getItem('cup')) {
  localStorage.setItem('cup', '0');
}
if (!localStorage.getItem('initialCUPClaimed')) {
  localStorage.setItem('initialCUPClaimed', 'false');
}

// — Fichas —
// Obtener fichas
export function obtenerFichas() {
  return parseInt(localStorage.getItem('fichas')) || 0;
}
// Modificar fichas (+/-)
export function modificarFichas(cantidad) {
  let fichas = obtenerFichas();
  fichas += cantidad;
  if (fichas < 0) fichas = 0;
  localStorage.setItem('fichas', fichas);
  return fichas;
}

// — Perfil y Balances —
// Obtener CUP
export function obtenerCUP() {
  return parseInt(localStorage.getItem('cup')) || 0;
}
// Mostrar perfil: nombre, fichas y CUP
export function mostrarPerfilEn(divId) {
  const cont = document.getElementById(divId);
  if (!cont) return;
  const nombre = localStorage.getItem('nombre') || 'Jugador';
  const fichas = obtenerFichas();
  const cup    = obtenerCUP();
  cont.innerHTML =
    `👤 <strong>${nombre}</strong> | 🪙 Fichas: <strong>${fichas}</strong>` +
    ` | 💵 CUP: <strong>${cup}</strong>`;
}

// — Animación de tablas —
// Fade-in-Up secuencial
export function initTableAnimations() {
  const cards = document.querySelectorAll('.table-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
    card.classList.add('fade-in-up');
  });
}

// — Bono diario —
// Reclamar bono diario (1×día)
export function claimDailyBonus() {
  const bonusAmount = 100;
  const today = new Date().toISOString().slice(0,10);
  const last   = localStorage.getItem('lastDailyBonusDate');
  if (last === today) return 0;
  localStorage.setItem('lastDailyBonusDate', today);
  return modificarFichas(bonusAmount);
}
export function initDailyBonus() {
  const btn = document.getElementById('daily-bonus-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const got = claimDailyBonus();
    if (got > 0) {
      alert(`🎉 ¡Bono diario! Ganaste ${got} fichas.`);
      mostrarPerfilEn('profile-info');
    } else {
      alert('⚠️ Ya reclamaste tu bono diario hoy.');
    }
  });
}

// — Bono de bienvenida en CUP —
// Reclamar 10 CUP solo una vez al registrarse
export function claimInitialCUP() {
  const claimed = localStorage.getItem('initialCUPClaimed') === 'true';
  if (claimed) return 0;
  localStorage.setItem('cup', '10');
  localStorage.setItem('initialCUPClaimed', 'true');
  return 10;
}

// — Compra de fichas con CUP —
// Precio: 10 CUP → 20 000 fichas
export function purchaseChips() {
  const cost = 10;
  const offer = 20000;
  let cup = obtenerCUP();
  if (cup < cost) return 0;
  cup -= cost;
  localStorage.setItem('cup', cup);
  modificarFichas(offer);
  return offer;
}
export function initBuyChips() {
  const btn = document.getElementById('buy-chips-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // Si nunca reclamó el bono de bienvenida, lo reclama
    const initCup = claimInitialCUP();
    if (initCup > 0) {
      alert(`🎁 Bono bienvenida: recibiste ${initCup} CUP.`);
    }
    // Intentar compra de fichas
    const got = purchaseChips();
    if (got > 0) {
      alert(`💰 Compraste ${got} fichas por 10 CUP.`);
      mostrarPerfilEn('profile-info');
    } else {
      alert('⚠️ No tienes suficientes CUP para comprar fichas.');
    }
  });
}

// — Inicialización final —
document.addEventListener('DOMContentLoaded', () => {
  // animaciones y utilidades previas
  initTableAnimations();
  initDailyBonus();
  // CUP y compra de fichas
  initBuyChips();
  // Reclama bono bienvenida si aún no lo hizo
  claimInitialCUP();
  // Mostrar perfil con balances en header
  mostrarPerfilEn('profile-info');
});
