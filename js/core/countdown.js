/**
 * countdown.js – Contadores genéricos (mesas y torneos)
 */
export function startCountdown(selector, targetDate) {
  const el = document.querySelector(selector);
  if (!el) return;
  const endTime = new Date(targetDate).getTime();

  const timer = setInterval(() => {
    const now = Date.now();
    const diff = endTime - now;
    if (diff <= 0) {
      clearInterval(timer);
      el.textContent = '00:00';
      return;
    }
    const minutes = String(Math.floor(diff / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo: <span id="table-countdown"></span> data-target="2025-12-31T23:59:59"
  document.querySelectorAll('[data-target]').forEach(el => {
    startCountdown(`#${el.id}`, el.dataset.target);
  });
});
