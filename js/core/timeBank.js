/**
 * timeBank.js – Sistema de “time bank” para turnos
 */
export function startTimeBank(seconds) {
  const display = document.getElementById('time-bank');
  let remaining = seconds;
  display.textContent = remaining;
  const interval = setInterval(() => {
    remaining--;
    display.textContent = remaining;
    if (remaining <= 0) clearInterval(interval);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  // ejemplo: iniciar con 30s
  if (document.getElementById('time-bank')) {
    startTimeBank(30);
  }
});
