/**
 * filters.js – Maneja renderizado de mesas y filtros
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1) Datos de ejemplo; en tu versión real vendrán de tu API
  const tables = [
    { id: 1, title: 'Mesa #1', type: 'cash',       minBet: 10, info: '2/6 Jugadores' },
    { id: 2, title: 'Mesa #2', type: 'tournament', minBet: 50, info: '0/9 Jugadores' },
    { id: 3, title: 'Mesa #3', type: 'cash',       minBet: 100, info: '5/6 Jugadores' },
    { id: 4, title: 'Mesa #4', type: 'tournament', minBet: 25, info: '3/9 Jugadores' }
  ];

  // 2) Referencias al DOM
  const tpl         = document.getElementById('table-item-tpl');
  const container   = document.getElementById('tables');
  const selType     = document.getElementById('filter-type');
  const inpMinBet   = document.getElementById('filter-min-bet');
  const outMinBet   = document.getElementById('filter-min-bet-val');
  const btnApply    = document.getElementById('apply-filters');
  const btnQuick    = document.getElementById('quick-join');

  // 3) Sincroniza el valor del range con el output
  outMinBet.textContent = inpMinBet.value;
  inpMinBet.addEventListener('input', () => {
    outMinBet.textContent = inpMinBet.value;
  });

  // 4) Función para renderizar una lista de mesas
  function render(list) {
    container.innerHTML = '';  // limpia tarjetas anteriores
    list.forEach(t => {
      const clone = tpl.content.cloneNode(true);
      clone.querySelector('.table-title').textContent = t.title;
      clone.querySelector('.table-info').textContent = `${t.info} • Apuesta mínima ${t.minBet}`;
      clone.querySelector('.join-btn')
           .addEventListener('click', () => joinTable(t.id));
      container.appendChild(clone);
    });
  }

  // 5) Aplica filtros y vuelve a renderizar
  function applyFilters() {
    const type  = selType.value;
    const min   = parseInt(inpMinBet.value, 10);
    const filt  = tables.filter(t =>
      (type === 'all' || t.type === type) && t.minBet >= min
    );
    render(filt);
  }

  // 6) “Unirse rápido”: primera mesa que cumpla apuesta mínima
  function quickJoin() {
    const min = parseInt(inpMinBet.value, 10);
    const first = tables.find(t => t.minBet >= min);
    if (first) joinTable(first.id);
  }

  // 7) Redirige a mesa.html?table=ID
  function joinTable(id) {
    window.location.href = `mesa.html?table=${id}`;
  }

  // 8) Conecta eventos
  btnApply.addEventListener('click', applyFilters);
  btnQuick.addEventListener('click', quickJoin);

  // 9) Render inicial sin filtros
  render(tables);
});
