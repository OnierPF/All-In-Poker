/**
 * filters.js – Filtros dinámicos en lobby y torneos
 */
export function applyFilters() {
  const type = document.getElementById('filter-type').value;
  const minBet = +document.getElementById('filter-min-bet').value;
  const cards = document.querySelectorAll('#tables .table-card');
  cards.forEach(card => {
    const tableType = card.dataset.type;
    const bet = +card.dataset.minBet;
    const show = (type === 'all' || tableType === type) && bet >= minBet;
    card.style.display = show ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('apply-filters');
  btn?.addEventListener('click', applyFilters);
  const range = document.getElementById('filter-min-bet');
  const out = document.getElementById('filter-min-bet-val');
  range?.addEventListener('input', () => out.value = range.value);
});
