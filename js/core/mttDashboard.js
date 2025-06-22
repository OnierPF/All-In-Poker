/**
 * mttDashboard.js – Dashboard MTT con Socket.io y Chart.js
 */
import Chart from 'chart.js/auto';

let socket;
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('grafico-ganancias').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Ganancias', data: [], borderColor: '#ffbe0b' }] },
    options: { responsive: true }
  });

  // Conexión Socket.io
  socket = io();  // asume <script src="/socket.io/socket.io.js">
  socket.on('mtt:update', data => {
    chart.data.labels.push(data.time);
    chart.data.datasets[0].data.push(data.amount);
    chart.update();
    // Actualizar resumen
    document.getElementById('torneos-activos').textContent = data.active;
    document.getElementById('premios').textContent = data.prizePool;
  });
});
