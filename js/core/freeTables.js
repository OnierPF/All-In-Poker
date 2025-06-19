// js/core/freeTables.js — Gestión de Mesas Gratis (entrada fija 20 000 fichas)

const ENTRY_FEE = 20000;

// Inicializa fichas demo si no existen
if (!localStorage.getItem('freeChips')) {
  localStorage.setItem('freeChips', '0');
}

// Obtiene el saldo de fichas demo
function getFreeChips() {
  return parseInt(localStorage.getItem('freeChips')) || 0;
}

// Añade cantidad al saldo demo
function addFreeChips(amount) {
  const total = getFreeChips() + amount;
  localStorage.setItem('freeChips', total);
  return total;
}

// Arranca al cargar la página
function initFreeTables() {
  const section = document.getElementById('free-tables');
  if (!section) return;

  // muestra el contador
  const display = document.createElement('p');
  display.id = 'free-chips-display';
  display.style.color = '#00ff7f';
  display.style.margin = '0.5rem 0';
  display.textContent = `Fichas Demo: ${getFreeChips()}`;
  section.insertBefore(display, section.firstChild);

  // genera X mesas
  const tpl = document.getElementById('free-table-item-tpl');
  const tableCount = 4;
  for (let i = 1; i <= tableCount; i++) {
    const clone = tpl.content.cloneNode(true);
    const card  = clone.querySelector('.table-card');
    card.querySelector('.table-title').textContent = `Mesa Gratis #${i}`;
    card.querySelector('.table-info').textContent  = `Entrada: ${ENTRY_FEE.toLocaleString()} fichas`;

    // botón de entrada
    const btn = clone.querySelector('.join-free-btn');
    btn.textContent = `Entrar (paga ${ENTRY_FEE.toLocaleString()})`;
    btn.addEventListener('click', () => {
      const current = getFreeChips();
      if (current < ENTRY_FEE) {
        alert(`❌ No tienes suficientes fichas demo.\nNecesitas ${ENTRY_FEE} y tienes ${current}.`);
        return;
      }
      const remaining = addFreeChips(-ENTRY_FEE);
      display.textContent = `Fichas Demo: ${remaining}`;
      alert(`✅ Entraste en Mesa Gratis #${i}. Te quedan ${remaining} fichas demo.`);
    });

    section.appendChild(clone);
  }
}

document.addEventListener('DOMContentLoaded', initFreeTables);
