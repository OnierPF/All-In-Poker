/**
 * torneos-data.js – Configuración base y formatos de torneos
 */
export const tournaments = [
  {
    id: 'mtt1',
    name: 'Friday Night Fever',
    buyIn: 200,
    currency: 'CUP',
    start: '2025-07-04T20:00:00',
    prizePool: 5000
  },
  {
    id: 'mtt2',
    name: 'Sunday High Roller',
    buyIn: 500,
    currency: 'MLC',
    start: '2025-07-06T18:00:00',
    prizePool: 12000
  }
];

// Función para renderizar torneos en torneos.html
document.addEventListener('DOMContentLoaded', () => {
  const up = document.getElementById('upcoming');
  const past = document.getElementById('past');
  const now = Date.now();

  tournaments.forEach(t => {
    const tpl = document.createElement('div');
    tpl.className = 'tournament-card';
    tpl.innerHTML = `
      <h3>${t.name}</h3>
      <p>Buy-in: ${t.buyIn} ${t.currency}</p>
      <p>Inicia: ${new Date(t.start).toLocaleString()}</p>
      <p>Premio: ${t.prizePool} ${t.currency}</p>
    `;
    (new Date(t.start).getTime() > now ? up : past).append(tpl);
  });
});
